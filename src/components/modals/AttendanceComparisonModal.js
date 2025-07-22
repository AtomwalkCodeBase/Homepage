"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { FaTimes, FaBalanceScale, FaClock, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa"
import Button from "../Button"
import Badge from "../Badge"
import { useTheme } from "../../context/ThemeContext"

const AttendanceComparisonModal = ({ isOpen, onClose, timesheetData, attendanceData, weekDates }) => {
  const { theme } = useTheme()
  const [comparisonData, setComparisonData] = useState([])
console.log(attendanceData,"timesheetData")
  useEffect(() => {
    if (isOpen && timesheetData && attendanceData && weekDates) {
      calculateComparison()
    }
  }, [isOpen, timesheetData, attendanceData, weekDates])

  const calculateComparison = () => {
    
    const { startDate, endDate } = weekDates
    const comparison = []

    // Generate all weekdays (Monday to Saturday)
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      const dateStr = formatDate(currentDate)
      const attendancedateStr = attformatDate(currentDate)
      const displayDate = currentDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })

      // Find timesheet entries for this date
      const timesheetEntries = timesheetData.filter((entry) => entry.a_date === dateStr)
      const timesheetHours = timesheetEntries.reduce((sum, entry) => sum + entry.effort, 0)

      // Find attendance entry for this date
      const attendanceEntry = attendanceData.find((entry) => entry.a_date === attendancedateStr)

      let attendanceHours = 0
      let attendanceStatus = "Absent"

      if (attendanceEntry) {
        if (attendanceEntry.start_time && attendanceEntry.end_time) {
          attendanceHours = calculateWorkingHours(attendanceEntry.start_time, attendanceEntry.end_time)
          attendanceStatus = "Present"
        } else if (attendanceEntry.start_time && !attendanceEntry.end_time) {
          attendanceStatus = "Checked In Only"
        } else if (attendanceEntry.attendance_type_display === "On Leave") {
          attendanceStatus = "On Leave"
        }
      }

      const difference = attendanceHours - timesheetHours
      const discrepancy = Math.abs(difference) > 0.5 // Consider 0.5 hour difference as discrepancy

      comparison.push({
        date: dateStr,
        displayDate,
        timesheetHours: timesheetHours.toFixed(1),
        attendanceHours: attendanceHours.toFixed(1),
        difference: difference.toFixed(1),
        discrepancy,
        attendanceStatus,
        timesheetEntries: timesheetEntries.length,
        checkIn: attendanceEntry?.start_time || "N/A",
        checkOut: attendanceEntry?.end_time || "N/A",
      })
    }

    setComparisonData(comparison)
  }

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}
  const attformatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }
  const calculateWorkingHours = (startTime, endTime) => {
    if (!startTime || !endTime) return 0

    const start = new Date(`2000-01-01 ${startTime}`)
    const end = new Date(`2000-01-01 ${endTime}`)

    // Handle next day checkout
    if (end < start) {
      end.setDate(end.getDate() + 1)
    }

    const diffMs = end - start
    const diffHours = diffMs / (1000 * 60 * 60)

    // Subtract lunch break (assuming 1 hour lunch break for 8+ hour days)
    // return diffHours > 8 ? diffHours - 1 : diffHours
    return diffHours 
  }

  const getTotalSummary = () => {
    const totalTimesheet = comparisonData.reduce((sum, day) => sum + Number.parseFloat(day.timesheetHours), 0)
    const totalAttendance = comparisonData.reduce((sum, day) => sum + Number.parseFloat(day.attendanceHours), 0)
    const totalDiscrepancies = comparisonData.filter((day) => day.discrepancy).length

    return {
      totalTimesheet: totalTimesheet.toFixed(1),
      totalAttendance: totalAttendance.toFixed(1),
      totalDifference: (totalAttendance - totalTimesheet).toFixed(1),
      totalDiscrepancies,
    }
  }

  const summary = getTotalSummary()

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>
            <FaBalanceScale style={{ marginRight: "0.5rem" }} />
            Attendance vs Timesheet Comparison
          </ModalTitle>
          <CloseButton onClick={onClose} theme={theme}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {/* Summary Cards */}
          <SummarySection>
            <SummaryCard theme={theme}>
              <SummaryIcon color="primary" theme={theme}>
                <FaClock />
              </SummaryIcon>
              <SummaryValue theme={theme}>{summary.totalTimesheet}h</SummaryValue>
              <SummaryLabel theme={theme}>Total Timesheet Hours</SummaryLabel>
            </SummaryCard>

            <SummaryCard theme={theme}>
              <SummaryIcon color="secondary" theme={theme}>
                <FaCalendarAlt />
              </SummaryIcon>
              <SummaryValue theme={theme}>{summary.totalAttendance}h</SummaryValue>
              <SummaryLabel theme={theme}>Total Attendance Hours</SummaryLabel>
            </SummaryCard>

            <SummaryCard theme={theme}>
              <SummaryIcon color={Number.parseFloat(summary.totalDifference) >= 0 ? "success" : "error"} theme={theme}>
                <FaBalanceScale />
              </SummaryIcon>
              <SummaryValue theme={theme}>
                {Number.parseFloat(summary.totalDifference) >= 0 ? "+" : ""}
                {summary.totalDifference}h
              </SummaryValue>
              <SummaryLabel theme={theme}>Difference</SummaryLabel>
            </SummaryCard>

            <SummaryCard theme={theme}>
              <SummaryIcon color={summary.totalDiscrepancies > 0 ? "warning" : "success"} theme={theme}>
                {summary.totalDiscrepancies > 0 ? <FaExclamationTriangle /> : <FaCheckCircle />}
              </SummaryIcon>
              <SummaryValue theme={theme}>{summary.totalDiscrepancies}</SummaryValue>
              <SummaryLabel theme={theme}>Discrepancies</SummaryLabel>
            </SummaryCard>
          </SummarySection>

          {/* Comparison Table */}
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Attendance Hours</th>
                  <th>Timesheet Hours</th>
                  <th>Difference</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((day, index) => (
                  <TableRow key={index} $hasDiscrepancy={day.discrepancy} theme={theme}>
                    <td>
                      <strong>{day.displayDate}</strong>
                    </td>
                    <td>{day.checkIn}</td>
                    <td>{day.checkOut}</td>
                    <td>
                      <HoursCell theme={theme}>{day.attendanceHours}h</HoursCell>
                    </td>
                    <td>
                      <HoursCell theme={theme}>
                        {day.timesheetHours}h
                        {day.timesheetEntries > 0 && (
                          <EntryCount theme={theme}>({day.timesheetEntries} entries)</EntryCount>
                        )}
                      </HoursCell>
                    </td>
                    <td>
                      <DifferenceCell
                        $isPositive={Number.parseFloat(day.difference) >= 0}
                        $hasDiscrepancy={day.discrepancy}
                        theme={theme}
                      >
                        {Number.parseFloat(day.difference) >= 0 ? "+" : ""}
                        {day.difference}h
                      </DifferenceCell>
                    </td>
                    <td>
                      <StatusBadge
                        variant={
                          day.discrepancy
                            ? "warning"
                            : day.attendanceStatus === "Present"
                              ? "success"
                              : day.attendanceStatus === "On Leave"
                                ? "secondary"
                                : "error"
                        }
                      >
                        {day.discrepancy
                          ? "Discrepancy"
                          : day.attendanceStatus === "Present"
                            ? "Match"
                            : day.attendanceStatus}
                      </StatusBadge>
                    </td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          {/* Legend */}
          <Legend theme={theme}>
            <LegendTitle theme={theme}>Legend:</LegendTitle>
            <LegendItems>
              <LegendItem theme={theme}>
                <LegendColor color="#28a745" />
                Match: Attendance and timesheet hours are similar (±0.5h)
              </LegendItem>
              <LegendItem theme={theme}>
                <LegendColor color="#ffc107" />
                Discrepancy: Significant difference between attendance and timesheet
              </LegendItem>
              <LegendItem theme={theme}>
                <LegendColor color="#dc3545" />
                Absent: No attendance record found
              </LegendItem>
            </LegendItems>
          </Legend>
        </ModalBody>

        <ModalFooter theme={theme}>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  )
}

// Styled Components
const ModalOverlay = styled.div`
   position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background || "#ffffff"};
  border-radius: ${({ theme }) => theme.borderRadius || "12px"};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.4s ease-out;
  
  @keyframes fadeIn {
    from {
      transform: translateY(-30px) scale(0.97);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  background: ${({ theme }) => theme.colors.primaryLight || '#f1f7ff'};
  border-radius: 16px 16px 0 0;
`

const ModalTitle = styled.h2`
 margin: 0;
  color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary || '#3a86ff'};
    border-radius: 4px;
    margin-right: 12px;
  }
`
const CloseButton = styled.button`
    background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight || '#8e98a4'};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: ${({ theme }) => theme.colors.error || '#ff5252'};
    transform: rotate(90deg);
  }
`

const ModalBody = styled.div`
  padding: 1.5rem;
`

const SummarySection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border || "#e2e8f0"};
`

const SummaryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  
  ${(props) =>
    props.color === "primary" &&
    `
    background: ${props.theme.colors.primaryLight || "#dbeafe"};
    color: ${props.theme.colors.primary || "#3b82f6"};
  `}
  
  ${(props) =>
    props.color === "secondary" &&
    `
    background: ${props.theme.colors.secondaryLight || "#f3e8ff"};
    color: ${props.theme.colors.secondary || "#8b5cf6"};
  `}
  
  ${(props) =>
    props.color === "success" &&
    `
    background: #dcfce7;
    color: #16a34a;
  `}
  
  ${(props) =>
    props.color === "warning" &&
    `
    background: #fef3c7;
    color: #d97706;
  `}
  
  ${(props) =>
    props.color === "error" &&
    `
    background: #fee2e2;
    color: #dc2626;
  `}
`

const SummaryValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text || "#1e293b"};
`

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight || "#64748b"};
  font-size: 0.9rem;
`

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 2rem;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background: #f8fafc;
    font-weight: 600;
    color: #374151;
  }
`

const TableRow = styled.tr`
  ${({ $hasDiscrepancy, theme }) =>
    $hasDiscrepancy &&
    `
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
  `}
  
  &:hover {
    background: #f8fafc;
  }
`

const HoursCell = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text || "#1e293b"};
`

const EntryCount = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight || "#64748b"};
  margin-top: 0.25rem;
`

const DifferenceCell = styled.div`
  font-weight: 600;
  color: ${({ $isPositive, $hasDiscrepancy }) => ($hasDiscrepancy ? "#d97706" : $isPositive ? "#16a34a" : "#dc2626")};
`

const StatusBadge = styled(Badge)`
  font-size: 0.75rem;
`

const Legend = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border || "#e2e8f0"};
`

const LegendTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.text || "#1e293b"};
  font-size: 0.9rem;
`

const LegendItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight || "#64748b"};
`

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
  margin-right: 0.5rem;
  flex-shrink: 0;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border || "#e2e8f0"};
  background: ${({ theme }) => theme.colors.background || "#ffffff"};
  border-radius: 0 0 12px 12px;
`

export default AttendanceComparisonModal
