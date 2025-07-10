"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaFileExport,
  FaClock,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaCheckCircle,
  FaPaperPlane,
  FaEye,
  FaBalanceScale,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import TimesheetModal from "../components/modals/TimesheetModal"
import AttendanceComparisonModal from "../components/modals/AttendanceComparisonModal"
import { getTimesheetData, posttimelist, getEmpAttendance } from "../services/productServices"
import ConfirmationPopup from "../components/modals/ConfirmationPopup"
import { toast } from "react-toastify"
import { TbClockCancel } from "react-icons/tb"
import { useExport } from "../context/ExportContext"
import { useNavigate } from "react-router-dom"
import Modal from "../components/modals/Modal"

const TimeSheetHeader = styled.div`
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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const WeekNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const WeekTitle = styled.h3`
  margin: 0;
`

const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const SummaryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  ${(props) =>
    props.color === "primary" &&
    `
    background: ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primary};
  `}
  
  ${(props) =>
    props.color === "secondary" &&
    `
    background: ${props.theme.colors.secondaryLight};
    color: ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.color === "success" &&
    `
    background: ${props.theme.colors.success}22;
    color: ${props.theme.colors.success};
  `}
  
  ${(props) =>
    props.color === "warning" &&
    `
    background: ${props.theme.colors.warning}22;
    color: ${props.theme.colors.warning};
  `}
  ${(props) =>
    props.color === "error" &&
    `
    background: ${props.theme.colors.error}22;
    color: ${props.theme.colors.error};
  `}
`

const SummaryValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`
const Tagline = styled.p`
 color: ${({ theme }) => theme.colors.textLight};
`
const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`

const TimeSheetManagement = () => {
  const [currentWeek, setCurrentWeek] = useState("")
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false)
  const [timesheetEntries, setTimesheetEntries] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [projects, setProjects] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [relode, setRelode] = useState(1)
  const [showPopup, setShowPopup] = useState(false)
  const [handeleEditdata, sethandeleEditdata] = useState(null)
  const urlParams = new URLSearchParams(window.location.search)
  const empidParam = urlParams.get("empid")
  const empnoidParam = urlParams.get("empnoid")
  const empName = urlParams.get("name")
  const [startdate, setStartdate] = useState({
    startTime: "",
    endTime: "",
  })
  const [filters, setFilters] = useState({
    project: "All Projects",
    status: "All Status",
    activity: "All Activities",
    month: "",
  })
  const [approve, setApprove] = useState(false)
  const [formData, setFormData] = useState({
    a_emp_id: "",
    a_remarks: "",
    call_mode: "",
    emp_id: localStorage.getItem("empId") || "",
  })

  const [reject, setReject] = useState({})
  const navigate = useNavigate()
  const { exportTimesheetData } = useExport()
  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentWeekStart(newDate)

    const { startDate, endDate } = getWeekDates(newDate)
    setStartdate({ startTime: startDate, endTime: endDate })
    const empid = localStorage.getItem("empId") || "default_emp_id"
    fetchTimeSheetData(startDate, endDate, empid)
  }
  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentWeekStart(newDate)

    const { startDate, endDate } = getWeekDates(newDate)
    setStartdate({ startTime: startDate, endTime: endDate })
    const empid = localStorage.getItem("empId") || "default_emp_id"
    fetchTimeSheetData(startDate, endDate, empid)
  }
  const getWeekDates = (date) => {
    const dayOfWeek = date.getDay() // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

    const monday = new Date(date)
    monday.setDate(date.getDate() + diffToMonday)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    return { startDate: monday, endDate: sunday }
  }
  const getCurrentWeekDates = () => {
    const now = new Date()
    const dayOfWeek = now.getDay() // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

    const monday = new Date(now)
    monday.setDate(now.getDate() + diffToMonday)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    return { startDate: monday, endDate: sunday }
  }

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const formatDisplayDate = (date) => {
    const options = { month: "short", day: "2-digit" }
    return date.toLocaleDateString("en-US", options)
  }

  const closeModal = () => {
    sethandeleEditdata(null)
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const fetchTimeSheetData = async (startDate, endDate) => {
    const empId = empidParam ? empidParam : localStorage.getItem("empId") // Replace with actual emp_id logic
    try {
      setLoading(true)
      const formattedStartDate = formatDate(startDate)
      const formattedEndDate = formatDate(endDate)

      // Fetch timesheet data
      const response = await getTimesheetData(formattedStartDate, formattedEndDate, empId)
      const data = await response.data

      setTimesheetEntries(data)

      // Extract unique projects and activities
      const uniqueProjects = [...new Set(data.map((entry) => entry.project_code))]
      const uniqueActivities = [...new Set(data.map((entry) => entry.activity_name))]

      setProjects(uniqueProjects)
      setActivities(uniqueActivities)

      // Set current week display string
      const weekDisplay = `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}, ${endDate.getFullYear()}`
      setCurrentWeek(weekDisplay)

      setLoading(false)
    } catch (error) {
      console.error("Error fetching timesheet data:", error)
      setLoading(false)
    }
  }

  const fetchAttendanceData = async (startDate, endDate) => {
    const empId = empnoidParam ? empnoidParam : localStorage.getItem("empId")
      const startdate = formatDate(startDate)
      const enddate = formatDate(endDate)
    try {
      // Get the month and year from the start date for attendance API
      const month = ""
      const year = startDate.getFullYear()

      const response = await getEmpAttendance({ month, year,empId, startdate, enddate })
      const data = response.data

      // // Filter attendance data for the current week
      // const weekAttendance = data.filter((entry) => {
      //   const entryDate = new Date(entry.a_date.split("-").reverse().join("-"))
      //   return entryDate >= startDate && entryDate <= endDate
      // })

      setAttendanceData(data)
    } catch (error) {
      console.error("Error fetching attendance data:", error)
      setAttendanceData([])
    }
  }

  useEffect(() => {
    const { startDate, endDate } = getCurrentWeekDates()
    fetchTimeSheetData(
      startdate.startTime ? startdate.startTime : startDate,
      startdate.endTime ? startdate.endTime : endDate,
    )
  }, [relode])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const filteredEntries = timesheetEntries.filter((entry) => {
    return (
      (filters.project === "All Projects" || entry.project_code === filters.project) &&
      (filters.status === "All Status" || entry.status_display === filters.status) &&
      (filters.activity === "All Activities" || entry.activity_name === filters.activity)
    )
  })

  // Calculate summary data
  const calculateSummary = () => {
    const hoursThisWeek = filteredEntries.reduce((sum, entry) => sum + entry.effort, 0)
    const approvedHours = filteredEntries
      .filter((entry) => entry.status === "A")
      .reduce((sum, entry) => sum + entry.effort, 0)
    const pendingHours = filteredEntries
      .filter(({ status }) => ["N", "S"].includes(status))
      .reduce((sum, { effort }) => sum + effort, 0)
    const notsubmited = filteredEntries
      .filter((entry) => entry.status === "R")
      .reduce((sum, entry) => sum + entry.effort, 0)

    const uniqueDates = [...new Set(filteredEntries.map((entry) => entry.a_date))]
    const daysWorked = uniqueDates.length

    return [
      {
        icon: <FaClock />,
        value: hoursThisWeek.toFixed(1),
        label: "Hours This Week",
        color: "primary",
      },
      {
        icon: <FaCheck />,
        value: approvedHours.toFixed(1),
        label: "Approved Hours",
        color: "success",
      },
      {
        icon: <FaTimes />,
        value: pendingHours.toFixed(1),
        label: "Pending + Not Submitted",
        color: "warning",
      },
      {
        icon: <TbClockCancel />,
        value: notsubmited.toFixed(1),
        label: "Reject Hours",
        color: "error",
      },
      {
        icon: <FaCalendarAlt />,
        value: daysWorked,
        label: "Days Worked",
        color: "secondary",
      },
    ]
  }

  const summaryData = calculateSummary()

  // Group data for weekly summary table
  const getWeeklySummaryData = () => {
    // Use currentWeekStart for accurate week navigation
    const { startDate } = getWeekDates(currentWeekStart)
    const weekDays = []

    // Generate all days of the current week (Monday to Saturday)
    for (let i = 0; i < 6; i++) {
      // Monday (0) to Saturday (5)
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      weekDays.push(day)
    }

    // Group by project
    const projectGroups = {}
    filteredEntries.forEach((entry) => {
      if (!projectGroups[entry.project_code]) {
        projectGroups[entry.project_code] = {}
        weekDays.forEach((day) => {
          const dayStr = formatDate(day)
          projectGroups[entry.project_code][dayStr] = 0
        })
        projectGroups[entry.project_code].total = 0
      }

      const entryDate = new Date(entry.a_date)
      const entryDayStr = formatDate(entryDate)

      if (projectGroups[entry.project_code][entryDayStr] !== undefined) {
        projectGroups[entry.project_code][entryDayStr] += entry.effort
        projectGroups[entry.project_code].total += entry.effort
      }
    })

    // Calculate daily totals
    const dailyTotals = {}
    weekDays.forEach((day) => {
      const dayStr = formatDate(day)
      dailyTotals[dayStr] = 0
    })
    dailyTotals.total = 0

    Object.values(projectGroups).forEach((project) => {
      weekDays.forEach((day) => {
        const dayStr = formatDate(day)
        dailyTotals[dayStr] += project[dayStr]
      })
      dailyTotals.total += project.total
    })

    return { projectGroups, dailyTotals, weekDays }
  }
  const { projectGroups, dailyTotals, weekDays } = getWeeklySummaryData()

  const handeleapprove = async (entryId) => {
    setFormData({
      a_emp_id: empidParam,
      a_date: (() => {
        const today = new Date()
        return formatDate(today)
      })(),
      ts_id: entryId.id,
      a_remarks: "",
      call_mode: "APPROVE",
      emp_id: localStorage.getItem("empId") || "",
    })
    setApprove("APPROVE")
    setShowPopup(true)
  }
  const handelreject = (entryId) => {
    setFormData({
      a_emp_id: empidParam,
      a_date: (() => {
        const today = new Date()
        return formatDate(today)
      })(),
      ts_id: entryId.id,
      a_remarks: "",
      call_mode: "REJECT",
      emp_id: localStorage.getItem("empId") || "",
    })
    setApprove("REJECT")
    setShowPopup(true)
  }
  const handelDelete = (entryId) => {
    setFormData({
      a_emp_id: empidParam,
      a_date: (() => {
        const today = new Date()
        return formatDate(today)
      })(),
      ts_id: entryId.id,
      a_remarks: "",
      call_mode: "DELETE",
      emp_id: localStorage.getItem("empId") || "",
    })
    setApprove("DELETE")
    setShowPopup(true)
  }
  const handeleEdit = (entryId) => {
    setIsOpen(true)
    sethandeleEditdata(entryId)
  }
  const handleClosePopup = () => {
    setShowPopup(false)
  }
  const handleConfirm = async (remark) => {
    setShowPopup(false)
    if (approve == "APPROVE") {
      // Handle approval logic here
      try {
        const response = await posttimelist({ ...formData, a_remarks: remark })
        if (response.status === 200) {
          toast.success("Timesheet entry approved successfully!")
          setRelode(relode + 1)
        } else {
          toast.error("Failed to approve timesheet entry.")
        }
      } catch (error) {
        alert("An error occurred while approving the timesheet entry.")
      }
    } else {
      try {
        const response = await posttimelist({ ...formData, a_remarks: remark })
        if (response.status === 200) {
          toast.success("Timesheet entry rejected successfully!")
          setRelode(relode + 1)
        } else {
          toast.error("Failed to reject timesheet entry.")
        }
      } catch (error) {
        console.error("Error rejecting timesheet entry:", error)
        alert("An error occurred while rejecting the timesheet entry.")
      }
    }
  }
  const handeleweeklyapprove = async () => {
    const { startDate, endDate } = getCurrentWeekDates()
    const formattedStartDate = formatDate(startdate.startTime ? startdate.startTime : startDate)
    const formattedEndDate = formatDate(startdate.endTime ? startdate.endTime : endDate)
    const response = await posttimelist({
      emp_id: empidParam ? empidParam : localStorage.getItem("empId"),
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      call_mode: empidParam ? "WEEKLY_APPROVE" : "WEEKLY_SUBMIT",
      a_emp_id: empidParam ? empidParam : "",
    })
    if (response.status === 200) {
      toast.success("Timesheet entry Submit successfully!")
      setRelode(relode + 1)
    } else {
      toast.error("Failed to Submit timesheet entry.")
    }
  }
  const handleExport = () => {
    const result = exportTimesheetData(filteredEntries, "timesheet_data")
    if (result.success) {
      toast.success("Exported successfully")
    } else {
      toast.error("Export failed: " + result.message)
    }
  }

  const navigates = () => {
    navigate("/employees")
  }
  // helper – put it above your component or inside it
  const getTotalColour = (hours) => {
    if (hours < 5) return "#d32f2f" // red
    if (hours < 8) return "#ef6c00" // orange
    if (hours <= 10) return "#388e3c" // green
    if (hours <= 15) return "#ef6c00" // orange
    return "#d32f2f" // red
  }

  const handleMonthChange = (e) => {
    const empid = empidParam ? empidParam : localStorage.getItem("empId")
    const monthStr = e.target.value
    if (monthStr === "") {
      setRelode(relode + 1)
    } // user cleared the picker
    setFilters((f) => ({ ...f, month: monthStr }))

    if (!monthStr) return // user cleared the picker

    const [year, month] = monthStr.split("-").map(Number)

    // JS months are 0‑based
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0) // day 0 of next month = last day

    console.log(firstDay, "yyyyy")
    fetchTimeSheetData(firstDay, lastDay, empid)
  }

  const handleViewDetails = (data) => {
    console.log("data", data)
    setReject(data)
    setShowImageModal(true)
  }

  const handleCompareWithAttendance = async () => {
    const { startDate, endDate } = getWeekDates(currentWeekStart)
    await fetchAttendanceData(startDate, endDate)
    setIsComparisonModalOpen(true)
  }

  const hasNotSubmitted = filteredEntries.some((entry) => entry.status === "N")
  const hasSubmitted = filteredEntries.some((entry) => entry.status === "S")
  const hasApproved = filteredEntries.some((entry) => entry.status === "A")
  console.log("filteredEntries", !filteredEntries.length > 0, hasNotSubmitted)
  return (
    <Layout title="Timesheet Management">
      <TimeSheetHeader>
        <div>
          <Tagline>Track and manage your working hours</Tagline>
        </div>

        <HeaderActions>
          {empName ? (
            <Button variant="outline" style={{ marginRight: "0.5rem" }} onClick={navigates}>
              <FaUserCircle /> {empName}
            </Button>
          ) : (
            ((hasNotSubmitted && !hasSubmitted && !hasApproved) || !filteredEntries.length > 0) && (
              <Button variant="primary" onClick={openModal}>
                <FaPlus /> Add Time Entry
              </Button>
            )
          )}

          {empidParam && filteredEntries.length > 0 && (
            <Button variant="secondary" onClick={handleCompareWithAttendance}>
              <FaBalanceScale style={{ marginRight: "0.5rem" }} />
              Compare with Attendance
            </Button>
          )}
        </HeaderActions>
      </TimeSheetHeader>

      <SummaryGrid>
        {summaryData.map((item, index) => (
          <SummaryCard key={index}>
            <SummaryIcon color={item.color}>{item.icon}</SummaryIcon>
            <SummaryValue>{item.value}</SummaryValue>
            <SummaryLabel>{item.label}</SummaryLabel>
          </SummaryCard>
        ))}
      </SummaryGrid>

      <Card>
        <WeekNavigation>
          <NavButton onClick={handlePreviousWeek}>&lt; Previous Week</NavButton>
          <WeekTitle>
            <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
            {currentWeek}
          </WeekTitle>
          <NavButton onClick={handleNextWeek}>Next Week &gt;</NavButton>
        </WeekNavigation>

        <FilterContainer>
          <FilterSelect name="project" value={filters.project} onChange={handleFilterChange}>
            <option>All Projects</option>
            {projects.map((project, index) => (
              <option key={index}>{project}</option>
            ))}
          </FilterSelect>

          <FilterSelect name="status" value={filters.status} onChange={handleFilterChange}>
            <option>All Status</option>
            <option>APPROVED</option>
            <option>SUBMITTED</option>
            <option>REJECTED</option>
          </FilterSelect>

          <FilterSelect name="activity" value={filters.activity} onChange={handleFilterChange}>
            <option>All Activities</option>
            {activities.map((activity, index) => (
              <option key={index}>{activity}</option>
            ))}
          </FilterSelect>
          <input
            type="month"
            name="month"
            value={filters.month}
            onChange={handleMonthChange}
            style={{ minWidth: 140, padding: "0.4rem" }}
          />
        </FilterContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Activity</th>
                <th>Hours</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => {
                const entryDate = new Date(entry.a_date)
                const formattedDate = entryDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })

                return (
                  <tr key={entry.id}>
                    <td>{formattedDate}</td>
                    <td>
                      {entry.project_name}({entry.project_code})
                    </td>
                    <td>{entry.activity_name}</td>
                    <td>{entry.effort}</td>
                    <td>{entry.remarks}</td>
                    <td>
                      <Badge variant={entry.status === "A" ? "success" : entry.status === "S" ? "warning" : "error"}>
                        {entry.status == "N" ? "Draft" : entry.status_display}
                      </Badge>
                    </td>
                    <td>
                      {entry.status === "S" || entry.status === "N" ? (
                        <ActionButtons>
                          {empidParam
                            ? entry.status === "S" && (
                                <>
                                  <Button
                                    onClick={() => handeleapprove(entry)}
                                    variant="ghost"
                                    size="sm"
                                    title="Approve"
                                  >
                                    <FaCheck />
                                  </Button>
                                  <Button onClick={() => handelreject(entry)} variant="ghost" size="sm" title="Reject">
                                    <FaTrash />
                                  </Button>
                                </>
                              )
                            : entry.status !== "S" && (
                                <>
                                  <Button onClick={() => handelDelete(entry)} variant="ghost" size="sm" title="Delete">
                                    <FaTrash />
                                  </Button>
                                  <Button onClick={() => handeleEdit(entry)} variant="ghost" size="sm" title="Edit">
                                    <FaEdit />
                                  </Button>
                                </>
                              )}
                        </ActionButtons>
                      ) : (
                        <Button onClick={() => handleViewDetails(entry)} variant="ghost" size="sm" title="View">
                          <FaEye />
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredEntries.length > 0 ? (
            <TableActions style={{ float: "right" }}>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <FaFileExport /> Export
              </Button>
              {(() => {
                if (empidParam) {
                  // Approver view - show approve button if there are any submitted entries
                  // and no not-submitted entries
                  if (hasSubmitted && !hasNotSubmitted) {
                    return (
                      <Button variant="primary" size="sm" onClick={handeleweeklyapprove}>
                        <FaCheckCircle style={{ marginRight: 4 }} /> Approve Weekly Timesheet
                      </Button>
                    )
                  }
                } else {
                  // Employee view - show submit button if there are any not-submitted entries
                  // and no already-submitted entries
                  if (hasNotSubmitted && !hasSubmitted && !hasApproved) {
                    return (
                      <Button variant="primary" size="sm" onClick={handeleweeklyapprove}>
                        <FaPaperPlane style={{ marginRight: 4 }} /> Submit Weekly Timesheet
                      </Button>
                    )
                  }
                }
                return null
              })()}
            </TableActions>
          ) : (
            <TableActions style={{ justifyContent: "center" }}>
              {" "}
              There are no timesheet entries to display.{" "}
            </TableActions>
          )}
        </TableContainer>
      </Card>

      <Card title="Weekly Timesheet Summary by Project" style={{ marginTop: "2rem" }}>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                {weekDays.map((day, index) => (
                  <th key={index}>{day.toLocaleDateString("en-US", { weekday: "short" })}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(projectGroups).map(([project, days]) => (
                <tr key={project}>
                  <td>{project}</td>
                  {weekDays.map((day, index) => {
                    const dayStr = formatDate(day)
                    return <td key={index}>{days[dayStr] || 0}</td>
                  })}
                  <td>
                    {/* <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 4,
                        background: getTotalColour(days.total),
                        color: '#fff',
                        fontWeight: 600
                      }}
                    > */}
                    {days.total.toFixed(1)}
                    {/* </span> */}
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Daily Total</strong>
                </td>
                {weekDays.map((day, index) => {
                  const dayStr = formatDate(day)
                  return (
                    <td key={index}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: 4,
                          background: getTotalColour(dailyTotals[dayStr].toFixed(1)),
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        <strong>{dailyTotals[dayStr].toFixed(1)}</strong>
                      </span>
                    </td>
                  )
                })}
                <td>
                  <strong>{dailyTotals.total.toFixed(1)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          {filteredEntries.length > 0 && (
            <TableActions style={{ float: "right" }}>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <FaFileExport /> Export
              </Button>
              {(() => {
                if (empidParam) {
                  // Approver view - show approve button if there are any submitted entries
                  // and no not-submitted entries
                  if (hasSubmitted && !hasNotSubmitted) {
                    return (
                      <Button variant="primary" size="sm" onClick={handeleweeklyapprove}>
                        <FaCheckCircle style={{ marginRight: 4 }} /> Approve Weekly Timesheet
                      </Button>
                    )
                  }
                } else {
                  // Employee view - show submit button if there are any not-submitted entries
                  // and no already-submitted entries
                  if (hasNotSubmitted && !hasSubmitted && !hasApproved) {
                    return (
                      <Button variant="primary" size="sm" onClick={handeleweeklyapprove}>
                        <FaPaperPlane style={{ marginRight: 4 }} /> Submit Weekly Timesheet
                      </Button>
                    )
                  }
                }
                return null
              })()}
            </TableActions>
          )}
        </TableContainer>
      </Card>
      <TimesheetModal
        isOpen={isOpen}
        onClose={closeModal}
        initialData={handeleEditdata}
        setRelode={setRelode}
      ></TimesheetModal>
      <ConfirmationPopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        onConfirm={handleConfirm}
        approve={approve}
        timesheet={true}
      ></ConfirmationPopup>
      {showImageModal && (
        <Modal onClose={() => setShowImageModal(false)}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            {reject.a_remarks}
          </div>
          <Button variant="primary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal>
      )}

      <AttendanceComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        timesheetData={filteredEntries}
        attendanceData={attendanceData}
        weekDates={getWeekDates(currentWeekStart)}
      />
    </Layout>
  )
}

export default TimeSheetManagement
