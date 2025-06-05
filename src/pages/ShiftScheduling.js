"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns"
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaBriefcase,
  FaUmbrellaBeach,
  FaHome,
  FaStarOfDavid,
  // FaToday,
} from "react-icons/fa"
import Layout from "../components/Layout"
import { empshiftData, empshiftDatas } from "../services/productServices"
import Button from "../components/Button"
// Styled Components
const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin: 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem;
    padding: 1rem;
  }
`

const WeekNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const NavButton = styled.button`
  background:${({ theme }) => theme.colors.primary};;
  border: ${({ theme }) => theme.colors.primary};;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const NavButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`

const TodayButton = styled(NavButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`

const WeekTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
    justify-content: center;
  }
`

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  min-width: 250px;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`

const EmployeeInfo = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
`

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const EmployeeName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`

const EmployeeId = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`

const ShiftApplicable = styled.div`
  font-size: 0.875rem;
  color: #059669;
  font-weight: 500;
`

const ShiftCalendar = styled.div`
  margin-bottom: 2rem;
`

const CalendarHeader = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
  }
`

const CalendarDay = styled.div`
  border: 2px solid ${({ isToday,theme }) => (isToday ? theme.colors.primary : "#e2e8f0")};
  border-radius: 8px;
  overflow: hidden;
  background: ${({ isToday }) => (isToday ? "#eff6ff" : "white")};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const DayHeader = styled.div`
  background: ${({ isToday, theme }) => (isToday ? theme.colors.primary : "#f8fafc")};
  color: ${({ isToday }) => (isToday ? "white" : "#64748b")};
  padding: 0.5rem;
  text-align: center;
  font-weight: 600;

  @media (max-width: 768px) {
    padding: 0.25rem;
  }
`

const DayName = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`

const DayDate = styled.div`
  font-size: 0.875rem;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const ShiftContent = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;

  @media (max-width: 768px) {
    padding: 0.5rem 0.25rem;
    min-height: 50px;
  }
`

const ShiftBadge = styled.div`
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${({ variant }) =>
    variant === "orange"
      ? "#ffedd5"
      : variant === "blue"
        ? "#dbeafe"
        : variant === "purple"
          ? "#ede9fe"
          : variant === "green"
            ? "#dcfce7"
            : variant === "red"
              ? "#fee2e2"
              : "#f1f5f9"};
  color: ${({ variant }) =>
    variant === "orange"
      ? "#9a3412"
      : variant === "blue"
        ? "#1e40af"
        : variant === "purple"
          ? "#5b21b6"
          : variant === "green"
            ? "#166534"
            : variant === "red"
              ? "#991b1b"
              : "#475569"};

  @media (max-width: 768px) {
    padding: 0.25rem;
    font-size: 0.625rem;
    flex-direction: column;
    gap: 0.25rem;
  }
`

const ShiftText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`

const Legend = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
`

const LegendTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`

const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`

const LegendBadge = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  background: ${({ variant }) =>
    variant === "orange"
      ? "#ffedd5"
      : variant === "blue"
        ? "#dbeafe"
        : variant === "purple"
          ? "#ede9fe"
          : variant === "green"
            ? "#dcfce7"
            : variant === "red"
              ? "#fee2e2"
              : "#f1f5f9"};
  color: ${({ variant }) =>
    variant === "orange"
      ? "#9a3412"
      : variant === "blue"
        ? "#1e40af"
        : variant === "purple"
          ? "#5b21b6"
          : variant === "green"
            ? "#166534"
            : variant === "red"
              ? "#991b1b"
              : "#475569"};
`

const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 1rem;
`

const ErrorMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #dc2626;
  background: #fee2e2;
  border-radius: 8px;
  font-size: 1rem;
`



const MyShiftDetail = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [weekDates, setWeekDates] = useState([])
  const [shiftData, setShiftData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // Define shift types based on API data
  const shiftTypes = {
    0: { name: "Not Applicable", color: "gray", icon: FaBriefcase },
    1: { name: "Morning Shift", color: "orange", icon: FaSun },
    2: { name: "Evening Shift", color: "blue", icon: FaCloudSun },
    3: { name: "Night Shift", color: "purple", icon: FaMoon },
  }

  const holidayTypes = {
    NA: { name: "Working Day", color: "default", icon: FaBriefcase },
    WEEKLY_OFF: { name: "Weekly Off", color: "green", icon: FaHome },
    COMPANY_OFF: { name: "Company Holiday", color: "red", icon: FaUmbrellaBeach },
  }

  // Days of the week
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  useEffect(() => {
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
      const response = await empshiftDatas(dateString)
      if (response && response.data) {
        setShiftData(response.data)
        // Auto-select first employee if available
        if (response.data.w_shift_list && response.data.w_shift_list.length > 0) {
          setSelectedEmployee(response.data.w_shift_list[0])
        }
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

  const getShiftForDay = (employee, dayIndex) => {
    if (!employee?.shift_list || dayIndex >= employee.shift_list.length) return null
    return employee.shift_list[dayIndex]
  }

  const getShiftBadgeProps = (shift) => {
    if (shift.holiday_type !== "NA") {
      const holidayInfo = holidayTypes[shift.holiday_type]
      return {
        variant: holidayInfo.color,
        icon: holidayInfo.icon,
        children: holidayInfo.name,
      }
    }
    const shiftInfo = shiftTypes[shift.shift_no] || shiftTypes[0]
    return {
      variant: shiftInfo.color,
      icon: shiftInfo.icon,
      children: shiftInfo.name,
    }
  }

  const isToday = (date) => {
    const today = new Date()
    return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
  }

  return (
    <Layout title="Shift Details">
      <Card>
        <WeekNavigation>
          <Button onClick={handlePreviousWeek}>
            <FaChevronLeft /> Previous Week
          </Button>
          <WeekTitle>
            <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
            {weekDates.length === 7
              ? `${format(weekDates[0], "MMM dd")} - ${format(weekDates[6], "MMM dd, yyyy")}`
              : "Loading week..."}
          </WeekTitle>
          <NavButtonGroup>
            <Button onClick={handleToday}>
               Today
            </Button>
            <Button onClick={handleNextWeek}>
              Next Week <FaChevronRight />
            </Button>
          </NavButtonGroup>
        </WeekNavigation>

        {/* Employee Selection */}
        {shiftData?.w_shift_list && shiftData.w_shift_list.length > 1 && (
          <FilterContainer>
            <FilterSelect
              value={selectedEmployee?.emp_id || ""}
              onChange={(e) => {
                const employee = shiftData.w_shift_list.find((emp) => emp.emp_id === e.target.value)
                setSelectedEmployee(employee)
              }}
            >
              {shiftData.w_shift_list.map((employee) => (
                <option key={employee.emp_id} value={employee.emp_id}>
                  {employee.emp_name} ({employee.emp_id})
                </option>
              ))}
            </FilterSelect>
          </FilterContainer>
        )}

        {loading ? (
          <LoadingMessage>Loading shift data...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : selectedEmployee ? (
          <>
            {/* Employee Info */}
            <EmployeeInfo>
              <EmployeeDetails>
                <EmployeeName>{selectedEmployee.emp_name}</EmployeeName>
                <EmployeeId>
                  ID: {selectedEmployee.emp_id} | Type: {selectedEmployee.emp_type}
                </EmployeeId>
                <ShiftApplicable>
                  Shift Applicable: {selectedEmployee.is_shift_applicable ? "Yes" : "No"}
                </ShiftApplicable>
              </EmployeeDetails>
            </EmployeeInfo>

            {/* Weekly Calendar View */}
            <ShiftCalendar>
              <CalendarHeader>Weekly Schedule</CalendarHeader>
              <CalendarGrid>
                {weekDates.map((date, index) => {
                  const shift = getShiftForDay(selectedEmployee, index)
                  const shiftProps = shift ? getShiftBadgeProps(shift) : null
                  const IconComponent = shiftProps?.icon || FaBriefcase

                  return (
                    <CalendarDay key={index} isToday={isToday(date)}>
                      <DayHeader isToday={isToday(date)}>
                        <DayName>{weekdaysShort[index]}</DayName>
                        <DayDate>{format(date, "dd")}</DayDate>
                      </DayHeader>
                      <ShiftContent>
                        {shift ? (
                          <ShiftBadge variant={shiftProps.variant}>
                            <IconComponent style={{ marginRight: "0.5rem", fontSize: "0.875rem" }} />
                            <ShiftText>{shiftProps.children}</ShiftText>
                          </ShiftBadge>
                        ) : (
                          <ShiftBadge variant="gray">
                            <FaBriefcase style={{ marginRight: "0.5rem", fontSize: "0.875rem" }} />
                            <ShiftText>No Data</ShiftText>
                          </ShiftBadge>
                        )}
                      </ShiftContent>
                    </CalendarDay>
                  )
                })}
              </CalendarGrid>
            </ShiftCalendar>

            {/* Legend */}
            <Legend>
              <LegendTitle>Shift Types</LegendTitle>
              <LegendGrid>
                {Object.entries(shiftTypes).map(([key, shift]) => {
                  const IconComponent = shift.icon
                  return (
                    <LegendItem key={key}>
                      <LegendBadge variant={shift.color}>
                        <IconComponent style={{ marginRight: "0.5rem" }} />
                        {shift.name}
                      </LegendBadge>
                    </LegendItem>
                  )
                })}
                {Object.entries(holidayTypes)
                  .filter(([key]) => key !== "NA")
                  .map(([key, holiday]) => {
                    const IconComponent = holiday.icon
                    return (
                      <LegendItem key={key}>
                        <LegendBadge variant={holiday.color}>
                          <IconComponent style={{ marginRight: "0.5rem" }} />
                          {holiday.name}
                        </LegendBadge>
                      </LegendItem>
                    )
                  })}
              </LegendGrid>
            </Legend>
          </>
        ) : (
          <ErrorMessage>No employee data available</ErrorMessage>
        )}
      </Card>
    </Layout>
  )
}

export default MyShiftDetail