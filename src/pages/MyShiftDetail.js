import { useState, useEffect } from "react"
import styled from "styled-components"
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns"
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaBriefcase,
  FaHome,
  FaUmbrella,
  FaPlus,
} from "react-icons/fa"
import Layout from "../components/Layout"
import { useTheme } from "../context/ThemeContext"
import { empshiftData } from "../services/productServices"
import { toast } from "react-toastify"
import RequestModal from "../components/modals/RequestModal"

const PageContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  overflow-x: hidden;
`

const DateControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const DateDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => {
    const { uiPreferences } = props
    const buttonStyle = uiPreferences?.components?.buttonStyle || "default"

    if (buttonStyle === "square") return "0"
    if (buttonStyle === "pill") return "20px"
    return "4px" // default
  }};
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const ShiftCalendarContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
`

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 0;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const DayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 5px;
`

const ShiftGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: ${({ theme }) => theme.colors.text};
`

const ShiftCell = styled.div`
  border: 1px solid #eee;
  padding: 10px;
  min-height: 80px;
  background-color: ${(props) => {
    if (props.isToday) return "rgba(255, 236, 179, 0.2)"
    return "white"
  }};
  
  @media (max-width: 768px) {
    min-height: 60px;
    padding: 5px;
  }
`

const DateLabel = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: ${(props) => (props.isToday ? "#ff6b6b" : "inherit")};
`

const ShiftBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 5px;
  background-color: ${(props) => {
    switch (props.shiftType) {
      case 1:
        return "rgba(255, 193, 7, 0.2)" // Morning
      case 2:
        return "rgba(255, 87, 51, 0.2)" // Evening
      case 3:
        return "rgba(106, 90, 205, 0.2)" // Night
      case "COMPANY_OFF":
        return "rgba(76, 175, 80, 0.2)" // Company Off
      case "WEEKLY_OFF":
        return "rgba(33, 150, 243, 0.2)" // Weekly Off
      default:
        return "rgba(158, 158, 158, 0.2)" // Working day
    }
  }};
  color: ${(props) => {
    switch (props.shiftType) {
      case 1:
        return "#e65100" // Morning
      case 2:
        return "#d32f2f" // Evening
      case 3:
        return "#4527a0" // Night
      case "COMPANY_OFF":
        return "#2e7d32" // Company Off
      case "WEEKLY_OFF":
        return "#1565c0" // Weekly Off
      default:
        return "#424242" // Working day
    }
  }};
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 3px 6px;
  }
`

const ShiftIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 80px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`

const ErrorContainer = styled.div`
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  margin-bottom: 20px;
`
const ShiftHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
// Styled Components







const MyShiftDetail = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [weekDates, setWeekDates] = useState([])
  const [shiftData, setShiftData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { theme, uiPreferences } = useTheme()
  const [isModalOpens, setIsModalOpens] = useState(false)
  const emp_id = localStorage.getItem("empId")

  useEffect(() => {
    // Calculate the dates for the current week
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }) // Week starts on Monday
    const dates = Array.from({ length: 7 }, (_, i) => addDays(start, i))
    setWeekDates(dates)

    // Format the date for API call (YYYYMMDD)
    const apiDateFormat = format(start, "yyyyMMdd")
    fetchShiftData(apiDateFormat)
  }, [currentDate])

  const fetchShiftData = async (dateString) => {
    setLoading(true)
    setError(null)
    try {
      const response = await empshiftData(dateString)
      if (response && response.data) {
        setShiftData(response.data)
      } else {
        setError("No shift data available")
      }
    } catch (error) {
      console.error("Error fetching shift data:", error)
      setError("Failed to load shift data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => subWeeks(prevDate, 1))
  }

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const getShiftInfo = (date) => {
    if (!shiftData || !shiftData.w_shift_list || shiftData.w_shift_list.length === 0) {
      return null
    }

    const formattedDate = format(date, "yyyy-MM-dd") // Use consistent format
    const employeeShift = shiftData.w_shift_list[0] // Assuming we're showing the current employee's shift

    if (!employeeShift.shift_list) {
      return null
    }

    return employeeShift.shift_list.find((shift) => {
      if (!shift.date) return false
      
      // Compare dates directly as strings in the same format
      const shiftDate = new Date(shift.date)
      const shiftDateFormatted = format(shiftDate, "yyyy-MM-dd")
      return shiftDateFormatted === formattedDate
    })
  }

  const getShiftLabel = (shiftNo) => {
    switch (shiftNo) {
      case 1:
        return "Morning Shift"
      case 2:
        return "Evening Shift"
      case 3:
        return "Night Shift"
      default:
        return "Working Day"
    }
  }

  const getShiftIcon = (shiftInfo) => {
    if (!shiftInfo) return null

    if (shiftInfo.holiday_type === "COMPANY_OFF") {
      return <FaUmbrella />
    } else if (shiftInfo.holiday_type === "WEEKLY_OFF") {
      return <FaHome />
    } else if (shiftInfo.holiday_type === "NA") {
      switch (shiftInfo.shift_no) {
        case 1:
          return <FaSun />
        case 2:
          return <FaCloudSun />
        case 3:
          return <FaMoon />
        default:
          return <FaBriefcase />
      }
    }

    return <FaBriefcase />
  }

  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
    const handleSuccess = () => {
      toast.success("Request submitted successfully!")
      setIsModalOpens(false)
    }
  return (
    <Layout title="My Shift Schedule">
       <ShiftHeader>
        <div>
          <Paragraphdata>Manage your shift schedules and change requests</Paragraphdata>
        </div>

        <Button onClick={() => setIsModalOpens(true)} variant="primary">
          <FaPlus /> Request Shift Change
        </Button>
      </ShiftHeader>
      <PageContainer>
        <DateControlsContainer>
          <DateDisplay>
            <FaCalendarAlt />
            {weekDates[0] ? format(weekDates[0], "MMMM d, yyyy") : ""} -{" "}
            {weekDates[6] ? format(weekDates[6], "MMMM d, yyyy") : ""}
          </DateDisplay>
          <ButtonGroup>
            <Button onClick={handlePreviousWeek} uiPreferences={uiPreferences}>
              <FaChevronLeft /> Previous
            </Button>
            <Button onClick={handleToday} uiPreferences={uiPreferences}>
              Today
            </Button>
            <Button onClick={handleNextWeek} uiPreferences={uiPreferences}>
              Next <FaChevronRight />
            </Button>
          </ButtonGroup>
        </DateControlsContainer>

        {error && (
          <ErrorContainer>
            <p>{error}</p>
          </ErrorContainer>
        )}

        {loading ? (
          <LoadingContainer theme={theme}>Loading shift data...</LoadingContainer>
        ) : (
          <>
            <Legend>
              <LegendItem>
                <ShiftBadge shiftType={1} style={{ minWidth: "auto" }}>
                  <ShiftIcon>
                    <FaSun />
                  </ShiftIcon>
                </ShiftBadge>
                Morning Shift
              </LegendItem>
              <LegendItem>
                <ShiftBadge shiftType={2} style={{ minWidth: "auto" }}>
                  <ShiftIcon>
                    <FaCloudSun />
                  </ShiftIcon>
                </ShiftBadge>
                Evening Shift
              </LegendItem>
              <LegendItem>
                <ShiftBadge shiftType={3} style={{ minWidth: "auto" }}>
                  <ShiftIcon>
                    <FaMoon />
                  </ShiftIcon>
                </ShiftBadge>
                Night Shift
              </LegendItem>
              <LegendItem>
                <ShiftBadge shiftType="COMPANY_OFF" style={{ minWidth: "auto" }}>
                  <ShiftIcon>
                    <FaUmbrella />
                  </ShiftIcon>
                </ShiftBadge>
                Company Holiday
              </LegendItem>
              <LegendItem>
                <ShiftBadge shiftType="WEEKLY_OFF" style={{ minWidth: "auto" }}>
                  <ShiftIcon>
                    <FaHome />
                  </ShiftIcon>
                </ShiftBadge>
                Weekly Off
              </LegendItem>
            </Legend>
            <ShiftCalendarContainer>
              <CalendarHeader theme={theme}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                  <DayHeader key={index}>{window.innerWidth <= 480 ? day.substring(0, 3) : day}</DayHeader>
                ))}
              </CalendarHeader>

              <ShiftGrid>
                {weekDates.map((date, index) => {
                  const shiftInfo = getShiftInfo(date)
                  const todayFlag = isToday(date)

                  return (
                    <ShiftCell key={index} isToday={todayFlag}>
                      <DateLabel isToday={todayFlag}>{format(date, "d")}</DateLabel>

                      {shiftInfo ? (
                        <ShiftBadge
                          shiftType={shiftInfo.holiday_type !== "NA" ? shiftInfo.holiday_type : shiftInfo.shift_no}
                        >
                          <ShiftIcon>{getShiftIcon(shiftInfo)}</ShiftIcon>
                          {shiftInfo.holiday_type === "COMPANY_OFF"
                            ? "Company Holiday"
                            : shiftInfo.holiday_type === "WEEKLY_OFF"
                              ? "Weekly Off"
                              : getShiftLabel(shiftInfo.shift_no)}
                        </ShiftBadge>
                      ) : (
                        <ShiftBadge shiftType="default">
                          <ShiftIcon>
                            <FaBriefcase />
                          </ShiftIcon>
                          No shift data
                        </ShiftBadge>
                      )}
                    </ShiftCell>
                  )
                })}
              </ShiftGrid>
            </ShiftCalendarContainer>
{/* 
            {shiftData && shiftData.w_shift_list && shiftData.w_shift_list.length > 0 && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  color: theme.colors.text,
                }}
              >
                <h3 style={{ marginBottom: "10px", color: theme.colors.primary }}>Employee Details</h3>
                <p>
                  <strong>Name:</strong> {shiftData.w_shift_list[0].emp_name}
                </p>
                <p>
                  <strong>Employee ID:</strong> {shiftData.w_shift_list[0].emp_id}
                </p>
                <p>
                  <strong>Employee Type:</strong>{" "}
                  {shiftData.w_shift_list[0].emp_type === "P" ? "Permanent" : "Contract"}
                </p>
              </div>
            )} */}
          </>
        )}
      </PageContainer>
            {isModalOpens && (
              <RequestModal call_type="R" empId={emp_id} onClose={() => setIsModalOpens(false)} onSuccess={handleSuccess} />
            )}
    </Layout>
  )
}

export default MyShiftDetail
