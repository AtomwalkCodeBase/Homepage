"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaIdCard,
  FaMapMarkerAlt,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
  FaBuilding,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
  FaFilter
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { useAuth } from "../context/AuthContext"
import { getEmpAttendance, getEmpHoliday } from "../services/productServices"
import Modal from "../components/modals/Modal"
// import Modal from "../components/Modal"
// import Input from "../components/Input"

const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const CurrentTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 8px;
  color: white;
  margin-bottom: 2rem;
`

const CurrentTime = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const CurrentDate = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
`

const ProfileCard = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 2.5rem;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.secondary};
`

const ProfileInfo = styled.div`
  /* flex: 1; */
`

const EmployeeName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 1.5rem;
`

const EmployeeId = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
`

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  width: 100%;
`

const DetailItem = styled.div`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const DetailLabel = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.85rem;
`

const DetailValue = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const AttendanceActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: none;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.border};
  }
`

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

const ActionText = styled.span`
  font-weight: 500;
`

const StatusBadge = styled.div`
  display: inline-block;
  /* padding: 0.25rem 0.75rem; */
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
  background: ${({ theme, $status }) =>
    $status === 'present' ? theme.colors.successLight :
      $status === 'leave' ? theme.colors.warningLight :
        theme.colors.errorLight};
  color: ${({ theme, $status }) =>
    $status === 'present' ? theme.colors.success :
      $status === 'leave' ? theme.colors.warning :
        theme.colors.error};
`

const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const MonthText = styled.h3`
  margin: 0;
`

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  width: 100%;
  margin-top: 30px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  margin-bottom: 1rem;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    opacity: 0.7;
  }`;
const DayCell = styled.div`
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  background: ${({ $isCurrent, $isHoliday, $isWeekend, theme }) =>
    $isCurrent ? theme.colors.primaryLight :
      $isHoliday ? theme.colors.secondaryLight :
        $isWeekend ? theme.colors.border :
          'white'};
  color: ${({ $isCurrent, $isHoliday, theme }) =>
    $isCurrent ? theme.colors.primary :
      $isHoliday ? theme.colors.secondary :
        theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const DayNumber = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const DayStatus = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${({ $status, theme }) =>
    $status === 'P' ? theme.colors.success :
      $status === 'L' ? theme.colors.warning :
        $status === 'C' ? theme.colors.secondary :
          $status === 'H' ? theme.colors.secondary :
            theme.colors.error};
`

const StatusGuide = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: 8px;
`

const StatusGuideTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

const StatusGuideItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  
  &:before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
    background: ${({ $status, theme }) =>
    $status === 'P' ? theme.colors.success :
      $status === 'L' ? theme.colors.warning :
        $status === 'C' ? theme.colors.secondary :
          $status === 'H' ? theme.colors.secondary :
            theme.colors.error};
  }
`

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`

const TableContainer = styled.div`
  overflow-x: auto;
`

const HistoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const AttendanceTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [checkedIn, setCheckedIn] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [attendance, setAttendance] = useState({})
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false)
  const [remark, setRemark] = useState('')
  const [date, setDate] = useState(new Date())
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const [attData, setAttData] = useState([])
  const [employeeDatas, setEmployeeDatas] = useState([])
  const [holiday, setHoliday] = useState({})
  const { profile } = useAuth()
  // Mock employee data
  console.log("currentMonth",currentMonth)

  const employeeData = {
    id: profile?.emp_id,
    name: profile?.name,
    emp_id: profile?.emp_id,
    grade_name: profile?.grade_name,
    department: profile?.department_name,
    image: profile?.image || 'https://via.placeholder.com/100'
  }


  const monthNameMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [date])

  const fetchAttendanceDetails = (data) => {
    getEmpAttendance(data).then((res) => {
      setEmployeeDatas(res.data);
      processAttendanceData(res.data);
    });
    getEmpHoliday(data).then((res) => {
      // console.log('Holiday Data---',res.data)
      processHolidayData(res.data);
    });
  };
  const processAttendanceData = (data) => {
    const attendanceMap = {};
    data.forEach((item) => {
      const day = parseInt(item.a_date.split('-')[0], 10);
      attendanceMap[day] = item.attendance_type;
    });
    setAttData(attendanceMap);
  };
  useEffect(() => {
    fetchAttendanceDetails({
      month: currentMonth+1,
      year: currentYear
    });
  }, [currentMonth, currentYear]);
  const processHolidayData = (data) => {
    const holidayMap = {};

    // Process holiday_list
    if (data.holiday_list && Array.isArray(data.holiday_list)) {
      data.holiday_list.forEach((holidayDate) => {
        if (holidayDate) {
          const [day, monthName, year] = holidayDate.split('-');
          const month = monthNameMap[monthName];

          if (month !== undefined && month === currentMonth && parseInt(year, 10) === currentYear) {
            holidayMap[parseInt(day, 10)] = 'C';
          } else {
            // console.log(`Skipping holiday: ${holidayDate} (month mismatch or invalid month)`);
          }
        } else {
          // console.log('Skipping empty holiday date');
        }
      });
    }

    // Process holiday_saturday_list
    if (data.holiday_saturday_list) {
      const saturdayDates = data.holiday_saturday_list.split('|');

      saturdayDates.forEach((saturdayDate) => {
        if (saturdayDate) {
          const [day, monthName] = saturdayDate.split('-');
          const year = currentYear; // Use the current year for Saturday holidays
          const month = monthNameMap[monthName];

          if (month !== undefined && month === currentMonth) {
            holidayMap[parseInt(day, 10)] = 'H';
          } else {
            // console.log(`Skipping Saturday holiday: ${saturdayDate} (month mismatch or invalid month)`);
          }
        } else {
          // console.log('Skipping empty Saturday holiday date');
        }
      });
    }

    // Mark all Sundays in the current month as 'H'
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);

      // Check if the day is Sunday (0 represents Sunday)
      if (date.getDay() === 0) {
        holidayMap[day] = 'H'; // Mark this day as a holiday
        // console.log(`Marking ${day}-${currentMonth + 1}-${currentYear} as holiday (Sunday)`);
      }
    }

    setHoliday(holidayMap);
    // console.log('Processed Holiday Map:', holidayMap);
  };
  const handleCheckIn = () => {
    setCheckedIn(true)
    setStartTime(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    setAttendance({
      ...attendance,
      start_time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      geo_status: 'I'
    })
  }

  const handleCheckOut = () => {
    setIsRemarkModalOpen(true)
  }

  const confirmCheckOut = () => {
    setCheckedIn(false)
    setAttendance({
      ...attendance,
      end_time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      geo_status: 'O',
      remarks: remark
    })
    setIsRemarkModalOpen(false)
    setRemark('')
  }

  const changeMonth = (direction) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + direction, 1))
  }

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear())
  const firstDayOfMonth = getFirstDayOfMonth(date.getMonth(), date.getFullYear())

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const isCurrentDay = (day) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isWeekend = (day) => {
    const dateObj = new Date(date.getFullYear(), date.getMonth(), day)
    return dateObj.getDay() === 0 || dateObj.getDay() === 6
  }

  const getStatusForDay = (day) => {
    // Check if it's a holiday first
    if (holiday[day]) {
      return holiday[day]
    }

    // Then check attendance data
    if (attData[day]) {
      return attData[day]
    }

    // Default to not submitted if it's a past day
    const today = new Date()
    const dateObj = new Date(date.getFullYear(), date.getMonth(), day)
    return dateObj < today ? 'N' : ''
  }

  return (
    <Layout title="Attendance Tracking">
      <AttendanceHeader>
        <p>Track your daily attendance and view your history</p>
      </AttendanceHeader>

      {/* Current Time Display */}
      <CurrentTimeContainer>
        <CurrentTime>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </CurrentTime>
        <CurrentDate>
          {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </CurrentDate>
      </CurrentTimeContainer>
      <ProfileCard>
        <ProfileImage src={employeeData.image} alt={employeeData.name} />
        <ProfileInfo>
          <EmployeeName>{employeeData.name}</EmployeeName>
          {attendance.start_time ? (
            <StatusBadge $status="present">
              Checked In at {attendance.start_time}
            </StatusBadge>
          ) : attendance.end_time ? (
            <StatusBadge $status="leave">
              Checked Out at {attendance.end_time}
            </StatusBadge>
          ) : (
            <StatusBadge $status="absent">
              Not Checked In Today
            </StatusBadge>
          )}
        </ProfileInfo>
        <ProfileDetails>
          <DetailItem>
            <DetailLabel>My Id</DetailLabel>
            <DetailValue>
              {employeeData.emp_id}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Designation</DetailLabel>
            <DetailValue>{employeeData.grade_name}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Department</DetailLabel>
            <DetailValue>{employeeData.department}</DetailValue>
          </DetailItem>
        </ProfileDetails>
      </ProfileCard>
      <AttendanceActions>
        <ActionButton
          onClick={handleCheckIn}
          disabled={checkedIn || attendance.start_time}
        >
          <ActionIcon>
            <FaCheckCircle style={{ color: checkedIn ? '#ccc' : '#4CAF50' }} />
          </ActionIcon>
          <ActionText>
            {checkedIn || attendance.start_time
              ? `Checked In at ${attendance.start_time}`
              : 'Check In'}
          </ActionText>
        </ActionButton>

        <ActionButton
          onClick={handleCheckOut}
          disabled={!checkedIn || attendance.end_time}
        >
          <ActionIcon>
            <FaTimesCircle style={{ color: !checkedIn ? '#ccc' : '#F44336' }} />
          </ActionIcon>
          <ActionText>
            {attendance.end_time
              ? `Checked Out at ${attendance.end_time}`
              : 'Check Out'}
          </ActionText>
        </ActionButton>
      </AttendanceActions>

      {/* Calendar View */}
      <Card title="Monthly Attendance">
        <CalendarContainer>
          <Button variant="ghost" onClick={() => changeMonth(-1)}>
            <FaChevronLeft />
          </Button>
          <MonthText>
            {date.toLocaleDateString([], { month: 'long', year: 'numeric' })}
          </MonthText>
          <Button variant="ghost" onClick={() => changeMonth(1)}>
            <FaChevronRight />
          </Button>
        </CalendarContainer>

        <WeekDays>
          {weekDays.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </WeekDays>

        <CalendarGrid>
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <DayCell key={`empty-${index}`} />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1
            const status = getStatusForDay(day)

            return (
              <DayCell
                key={day}
                $isCurrent={isCurrentDay(day)}
                $isHoliday={holiday[day]}
                $isWeekend={isWeekend(day) && !holiday[day]}
              >
                <DayNumber>{day}</DayNumber>
                {status && <DayStatus $status={status=='A'?"P":status}>{status=='A'?"P":status}</DayStatus>}
              </DayCell>
            )
          })}
        </CalendarGrid>

        <StatusGuide>
          <StatusGuideTitle>Status Guide</StatusGuideTitle>
          <StatusGuideItem $status="P">P - Present</StatusGuideItem>
          <StatusGuideItem $status="L">L - On Leave</StatusGuideItem>
          <StatusGuideItem $status="C">C - Company Holiday</StatusGuideItem>
          <StatusGuideItem $status="H">H - Weekly Holiday</StatusGuideItem>
          <StatusGuideItem $status="N">N - Not Submitted</StatusGuideItem>
        </StatusGuide>
      </Card>

      {/* History Button */}
      <HistoryButton>
        <FaHistory /> View Attendance History
      </HistoryButton>
      <Card title="Recent Attendance">
        <FilterContainer>
          <FilterSelect>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </FilterSelect>
          <FilterSelect>
            <option>All Status</option>
            <option>Present</option>
            <option>Leave</option>
            <option>Holiday</option>
          </FilterSelect>
          <Button variant="outline">
            <FaFilter /> Filter
          </Button>
        </FilterContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeDatas.map((data, index) => {
                const dateObj = new Date(data.year, data.month - 1, data.day);
                const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                const isHoliday = holiday[data.day];
                const startTime = data.start_time || "N/A";
                const endTime = data.end_time || "N/A";
                const statusDisplay =
                  data.attendance_type_display === "Present" ? "Present" :
                    data.attendance_type_display === "On Leave" ? "Leave" :
                      isHoliday ? "Holiday" :
                        isWeekend ? "Weekend" :
                          "Absent";
                return (
                  <tr key={index}>
                    <td>{
                      new Date(
                        data.a_date.split('-')[2],  // Year
                        data.a_date.split('-')[1] - 1, // Month (0-based)
                        data.a_date.split('-')[0]   // Day
                      ).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
                    }</td>
                    <td>{startTime}</td>
                    <td>{endTime}</td>
                    <td>
                      <Badge
                        variant={
                          data.attendance_type_display === "Present" ? 'success' :
                            data.attendance_type_display === "On Leave" ? 'warning' :
                              statusDisplay === "Absent" ? 'error' :
                                isHoliday || isWeekend ? 'secondary' : 'error'
                        }
                      >
                        {statusDisplay}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </Card>
      {isRemarkModalOpen&& <Modal 
        isOpen={isRemarkModalOpen} 
        onClose={() => setIsRemarkModalOpen(false)}
        title="Check Out Remarks"
      >
        <Input
          label="Remarks"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter reason for check out"
          textarea
        />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button variant="outline" onClick={() => setIsRemarkModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmCheckOut}>
            Confirm Check Out
          </Button>
        </div>
      </Modal>}
    </Layout>
  )
}

export default AttendanceTracking