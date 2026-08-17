"use client"

import { useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import {
  FaChevronLeft,
  FaChevronRight,
  FaFileExport,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaSearch,
  FaEye,
  FaCalendarDay,
  FaCalendarAlt,
  FaTable,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
// import { useAuth } from "../context/AuthContext"
import { getEmpHoliday, getEmpsAttendance, getemployeeList } from "../services/productServices"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import moment from "moment/moment"
import { getCompanyInfo } from "../services/authServices"

/* ------------------------------------------------------------------ */
/*  NOTE ON DATA SOURCE                                                */
/*  This screen assumes that calling `getEmpsAttendance` without an     */
/*  `empId` (manager / admin context) returns attendance records for   */
/*  every employee in the company for the given month/year - which     */
/*  matches the shape of the sample response you shared (a flat array  */
/*  of records, each carrying its own `emp_id`). If your backend       */
/*  exposes a dedicated endpoint for this (e.g. `getCompanyAttendance` */
/*  / `getAllEmpAttendance`), just swap the call inside `fetchAll()`.  */
/*                                                                      */
/*  Employee names/images/department/grade aren't part of the          */
/*  attendance payload, so this screen also calls `getemployeeList`    */
/*  once (same call used on the Employee Management screen) and joins  */
/*  it in-memory against `emp_id` to fill those in.                    */
/* ------------------------------------------------------------------ */

/* ------------------------------- Styling --------------------------- */

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
`

const StatIconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

const StatValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 0.15rem;
`

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const MonthText = styled.h3`
  margin: 0;
  min-width: 160px;
  text-align: center;
`

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
`

const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : "white")};
  color: ${({ $active, theme }) => ($active ? "white" : theme.colors.text)};
  transition: all 0.2s ease;
`

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  align-items: center;
`

const SearchWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;
`

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.55rem 0.75rem 0.55rem 2.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`

const FilterSelect = styled.select`
  padding: 0.55rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: white;
`

const DateInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
`

const TableContainer = styled.div`
  overflow-x: auto;
`

const EmployeeInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
`

const EmployeeAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const NameCell = styled.div`
  display: flex;
  flex-direction: column;
`

const EmpIdText = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const SubText = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const AttendanceBarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
`

const AttendanceBar = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
  display: flex;
`

const AttendanceBarSegment = styled.div`
  height: 100%;
  width: ${({ $pct }) => `${$pct}%`};
  background: ${({ $color }) => $color};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textLight};
`

/* ------------------------------ Constants ---------------------------- */

const LATE_GRACE_MINUTES = 10 // buffer after company start_time before marking "late"
const STATUS_COLORS = {
  present: "#4CAF50",
  leave: "#FF9800",
  absent: "#F44336",
  holiday: "#9C27B0",
}

const monthNameMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }

/* ------------------------------ CSV export ------------------------------ */

const escapeCsvValue = (value) => {
  if (value === null || value === undefined) return ""
  const str = String(value)
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
}

const downloadCSV = (filename, columns, rows) => {
  if (!rows || rows.length === 0) {
    toast.error("There's no data to export for the current filters")
    return
  }
  const headerLine = columns.map((c) => escapeCsvValue(c.label)).join(",")
  const dataLines = rows.map((row) => columns.map((c) => escapeCsvValue(row[c.key])).join(","))
  const csvContent = [headerLine, ...dataLines].join("\r\n")

  // Prefix with a BOM so Excel opens UTF-8 content (names, remarks, etc.) correctly
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  toast.success(`Exported ${rows.length} row(s) successfully`)
}

/* ------------------------------------------------------------------ */

const ManagerAttendanceTracking = () => {
  // const { profile } = useAuth()
  const navigate = useNavigate()

  const [date, setDate] = useState(new Date())
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  const [rawRecords, setRawRecords] = useState([])
  const [holidayMap, setHolidayMap] = useState({})
  const [loading, setLoading] = useState(true)

  const [employeeList, setEmployeeList] = useState([])

  const [viewMode, setViewMode] = useState("summary") // "summary" | "daily"
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"))
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")

  const [lateThreshold, setLateThreshold] = useState("10:00") // default until company info loads / if start_time missing

useEffect(() => {
  const fetchCompanyInfo = async () => {
    try {
      const res = await getCompanyInfo()
      const startTime = res?.data?.start_time
      // Only trust it if it looks like a valid "HH:mm" string, else keep default
      if (startTime && moment(startTime, "HH:mm", true).isValid()) {
        setLateThreshold(startTime)
      }
    } catch (err) {
      console.error("Failed to fetch company info, using default late threshold:", err)
    }
  }
  fetchCompanyInfo()
}, [])

  /* -------------------------------- Fetching ------------------------------- */

  const fetchAll = () => {
    setLoading(true)
    // Company-wide attendance for the month (no empId => all employees).
    // Swap this call for a dedicated "all employees" endpoint if you have one.
    getEmpsAttendance({ month: currentMonth + 1, year: currentYear })
      .then((res) => setRawRecords(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error("Failed to load attendance records"))
      .finally(() => setLoading(false))

    getEmpHoliday({ month: currentMonth + 1, year: currentYear })
      .then((res) => processHolidayData(res.data))
      .catch(() => {})
  }

  useEffect(() => {
    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, currentYear])

  // Employee master list (name, image, department, grade) - doesn't change
  // per month, so this is fetched once on mount, same call as Employee
  // Management screen uses.
  useEffect(() => {
    getemployeeList()
      .then((res) => setEmployeeList(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error("Failed to load employee list"))
  }, [])

const employeeMap = useMemo(() => {
  const map = {}
  employeeList.forEach((emp) => {
    if (emp?.emp_id) map[emp.emp_id] = emp
  })
  return map
}, [employeeList])

// Total headcount = whatever the employee list API returns, not just
// employees who happen to have an attendance record this month.
// const totalEmployees = employeeList.length

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  const processHolidayData = (data) => {
    const map = {}
    if (data?.holiday_list && Array.isArray(data.holiday_list)) {
      data.holiday_list.forEach((holidayDate) => {
        if (!holidayDate) return
        const [day, monthName, year] = holidayDate.split("-")
        const month = monthNameMap[monthName]
        if (month === currentMonth && Number.parseInt(year, 10) === currentYear) {
          map[Number.parseInt(day, 10)] = "C"
        }
      })
    }
    if (data?.holiday_saturday_list) {
      data.holiday_saturday_list.split("|").forEach((saturdayDate) => {
        if (!saturdayDate) return
        const [day, monthName] = saturdayDate.split("-")
        const month = monthNameMap[monthName]
        if (month === currentMonth) map[Number.parseInt(day, 10)] = "H"
      })
    }
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(currentYear, currentMonth, day)
      if (d.getDay() === 0) map[day] = "H"
    }
    setHolidayMap(map)
  }

  /* ------------------------------ Aggregation ------------------------------ */

  // Keep only the latest record per (emp_id, date) - a checked-in-then-out day
  // can appear more than once in some payloads.
  const dedupedRecords = useMemo(() => {
    const byKey = {}
    rawRecords.forEach((rec) => {
      const key = `${rec.emp_id}_${rec.a_date}`
      if (!byKey[key] || rec.id > byKey[key].id) byKey[key] = rec
    })
    return Object.values(byKey)
  }, [rawRecords])

const employeeSummaries = useMemo(() => {
  const map = {}
  dedupedRecords.forEach((rec) => {
    if (!map[rec.emp_id]) {
      map[rec.emp_id] = {
        emp_id: rec.emp_id,
        presentDays: 0,
        leaveDays: 0,
        lateDays: 0,
        records: [],
        latest: rec,
      }
    }
    const entry = map[rec.emp_id]
    entry.records.push(rec)
    if (rec.attendance_type === "A") entry.presentDays += 1
    if (rec.attendance_type === "L") entry.leaveDays += 1

    if (rec.attendance_type === "A" && rec.start_time) {
      const checkIn = moment(rec.start_time, "HH:mm")
      const threshold = moment(lateThreshold, "HH:mm").add(LATE_GRACE_MINUTES, "minutes")
      if (checkIn.isValid() && checkIn.isAfter(threshold)) entry.lateDays += 1
    }
    

    const currentDateVal = moment(rec.a_date, "DD-MM-YYYY")
    const latestDateVal = moment(entry.latest.a_date, "DD-MM-YYYY")
    if (currentDateVal.isAfter(latestDateVal)) entry.latest = rec
  })

  const today = new Date()
  const isSameMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear
  const lastDay = isSameMonth ? today.getDate() : getDaysInMonth(currentMonth, currentYear)
  let workingDaysSoFar = 0
  for (let d = 1; d <= lastDay; d++) {
    if (!holidayMap[d]) workingDaysSoFar += 1
  }

  return Object.values(map)
    .map((entry) => {
      const empInfo = employeeMap[entry.emp_id]
      // Employee exists in attendance data but not in the active employee
      // master list (e.g. deactivated/offboarded, or a sync delay) - still
      // show their attendance, just flag it instead of guessing a name.
      const isKnownEmployee = Boolean(empInfo)
      return {
        ...entry,
        absentDays: Math.max(workingDaysSoFar - entry.presentDays - entry.leaveDays, 0),
        workingDaysSoFar,
        name: empInfo?.name || entry.emp_id,
        empNoId: empInfo?.id || entry.emp_id,
        gradeName: empInfo?.grade_name || "",
        image: empInfo?.image || "",
        departmentName: empInfo?.department_name || "",
        isKnownEmployee,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}, [dedupedRecords, holidayMap, currentMonth, currentYear, employeeMap, lateThreshold])

  const filteredSummaries = useMemo(() => {
    return employeeSummaries.filter((e) => {
      if (
        search &&
        !e.emp_id.toLowerCase().includes(search.toLowerCase()) &&
        !e.name.toLowerCase().includes(search.toLowerCase())
      )
        return false
      if (statusFilter === "Present" && e.latest.attendance_type_display !== "Present") return false
      if (statusFilter === "On Leave" && e.latest.attendance_type_display !== "On Leave") return false
      if (statusFilter === "Late" && e.lateDays === 0) return false
      return true
    })
  }, [employeeSummaries, search, statusFilter])

  const dailyRecords = useMemo(() => {
    const target = moment(selectedDay, "YYYY-MM-DD").format("DD-MM-YYYY")
    return dedupedRecords
      .filter((rec) => rec.a_date === target)
      .filter((rec) => {
        if (!search) return true
        const empInfo = employeeMap[rec.emp_id]
        const name = empInfo?.name || ""
        return (
          rec.emp_id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase())
        )
      })
      .filter((rec) => statusFilter === "All Status" || rec.attendance_type_display === statusFilter)
      .sort((a, b) => a.emp_id.localeCompare(b.emp_id))
  }, [dedupedRecords, selectedDay, search, statusFilter, employeeMap])

/* --------------------------------- Stats --------------------------------- */

// Total headcount = whatever the employee list API returns, not just
// employees who happen to have an attendance record this month.
const totalEmployees = employeeList.length

// Unique employees who have at least one attendance record this month
const markedThisMonth = employeeSummaries.length

// Sum of leave days taken across everyone this month
const totalLeaveDaysThisMonth = employeeSummaries.reduce((sum, e) => sum + e.leaveDays, 0)

// Active employees with zero attendance records this month at all
const notMarkedThisMonth = Math.max(totalEmployees - markedThisMonth, 0)

  /* -------------------------------- Handlers -------------------------------- */

  const changeMonth = (direction) => {
    setDate(new Date(currentYear, currentMonth + direction, 1))
  }

  // Reuses the existing employee attendance screen in read-only mode via query
  // params (the same ones the Employee Management screen already passes:
  // empid / empnoid / name / employeegrade / image / department), plus the
  // month/year currently being viewed here so the target page opens on the
  // right month instead of defaulting to "today".
  const handleViewAttendance = (empId, name = "", empNoId = "", gradeName = "", image = "", departmentName = "") => {
    const myEmpId = localStorage.getItem("empId")

    const params = new URLSearchParams({
      empid: empId,
      empnoid: empNoId || empId,
      name: name || empId,
      month: String(currentMonth + 1),
      year: String(currentYear),
    })
    if (gradeName) params.set("employeegrade", gradeName)
    if (image) params.set("image", image)
    if (departmentName) params.set("department", departmentName)

    if (empId === myEmpId) {
      navigate(`/attendance-tracking?${params.toString()}`)
      return
    }
    navigate(`/attendance-tracking?${params.toString()}`)
  }

const SUMMARY_COLUMNS = [
  { key: "emp_id", label: "Employee ID" },
  { key: "emp_name", label: "Employee Name" },
  { key: "present_days", label: "Present Days" },
  { key: "leave_days", label: "Leave Days" },
  { key: "absent_days", label: "Absent Days" },
  { key: "late_days", label: "Late Days" },
  { key: "working_days_so_far", label: "Working Days So Far" },
  // { key: "last_status", label: "Latest Status" },
  { key: "note", label: "Note" },
]

const handleExportSummary = () => {
  const exportRows = filteredSummaries.map((e) => ({
    emp_id: e.emp_id,
    emp_name: e.name,
    present_days: e.presentDays,
    leave_days: e.leaveDays,
    absent_days: e.absentDays,
    late_days: e.lateDays,
    working_days_so_far: e.workingDaysSoFar,
    // last_status: e.latest.attendance_type_display,
    note: e.isKnownEmployee ? "" : "Not in active employee list",
  }))
  downloadCSV(`Attendance_Summary_${moment(date).format("MMM_YYYY")}`, SUMMARY_COLUMNS, exportRows)
}
  const DAILY_COLUMNS = [
    { key: "emp_id", label: "Employee ID" },
    { key: "emp_name", label: "Employee Name" },
    { key: "date", label: "Date" },
    { key: "check_in", label: "Check In" },
    { key: "check_out", label: "Check Out" },
    { key: "status", label: "Status" },
    { key: "remarks", label: "Remarks" },
  ]


  const handleExportDaily = () => {
    const exportRows = dailyRecords.map((r) => ({
      emp_id: r.emp_id,
      emp_name: employeeMap[r.emp_id]?.name || r.emp_id,
      date: r.a_date,
      check_in: r.start_time || "N/A",
      check_out: r.end_time || "N/A",
      status: r.attendance_type_display,
      remarks: r.remarks || "-",
    }))
    downloadCSV(`Attendance_${selectedDay}`, DAILY_COLUMNS, exportRows)
  }

  // Employee-wise, day-by-day sheet for the whole month: one row per
  // employee, one column per calendar day. Every day defaults to "A"
  // (Absent) - a Present/Leave record overrides that day, and a day that's
  // a weekly/company holiday (and has no attendance record) is marked
  // accordingly instead of Absent. `dedupedRecords` groups by `emp_id`, so
  // each employee's own attendance only ever fills their own row/columns.
  const handleExportMonthlySheet = () => {
    try {
      const daysInMonth = getDaysInMonth(currentMonth, currentYear)

      const dayColumns = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        return {
          key: `day_${day}`,
          label: moment(new Date(currentYear, currentMonth, day)).format("DD-MMM"),
        }
      })

      const columns = [
        { key: "emp_id", label: "Employee ID" },
        { key: "emp_name", label: "Employee Name" },
        ...dayColumns,
        { key: "present_count", label: "Present" },
        { key: "leave_count", label: "Leave" },
        { key: "absent_count", label: "Absent" },
        { key: "holiday_count", label: "Holiday" },
      ]

      // emp_id -> { day: "P" | "L" | "A" }, built from that employee's own records only
      const statusByEmpAndDay = {}
      dedupedRecords.forEach((rec) => {
        if (!rec?.emp_id || !rec?.a_date || typeof rec.a_date !== "string") return // skip malformed rows

        const parsed = moment(rec.a_date, "DD-MM-YYYY", true) // strict parse
        if (!parsed.isValid()) return

        const day = parsed.date()
        if (!statusByEmpAndDay[rec.emp_id]) statusByEmpAndDay[rec.emp_id] = {}
        const code = rec.attendance_type === "A" ? "P" : rec.attendance_type === "L" ? "L" : "A"
        statusByEmpAndDay[rec.emp_id][day] = code
      })

      const rows = employeeSummaries
        .filter(
          (e) =>
            !search ||
            e.emp_id.toLowerCase().includes(search.toLowerCase()) ||
            e.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((emp) => {
          const row = { emp_id: emp.emp_id, emp_name: emp.name }
          let presentCount = 0
          let leaveCount = 0
          let absentCount = 0
          let holidayCount = 0

          for (let day = 1; day <= daysInMonth; day++) {
            let status = statusByEmpAndDay[emp.emp_id]?.[day]
            if (!status) {
              status = holidayMap[day] ? holidayMap[day] : "A" // "C" or "H" from holidayMap, else Absent
            }
            row[`day_${day}`] = status

            if (status === "P") presentCount += 1
            else if (status === "L") leaveCount += 1
            else if (status === "A") absentCount += 1
            else holidayCount += 1
          }

          row.present_count = presentCount
          row.leave_count = leaveCount
          row.absent_count = absentCount
          row.holiday_count = holidayCount
          return row
        })

      downloadCSV(`Attendance_MonthSheet_${moment(date).format("MMM_YYYY")}`, columns, rows)
    } catch (err) {
      console.error("Monthly sheet export failed:", err)
      toast.error("Couldn't generate the monthly sheet — check console for details")
    }
  }

  /* ---------------------------------- Render --------------------------------- */

  return (
    <Layout title="Manager Attendance Dashboard">
      <PageHeader>
        <p>Track and review attendance for every employee in one place</p>
        <HeaderActions>
          <MonthNav>
            <Button variant="ghost" onClick={() => changeMonth(-1)}>
              <FaChevronLeft />
            </Button>
            <MonthText>{date.toLocaleDateString([], { month: "long", year: "numeric" })}</MonthText>
            <Button variant="ghost" onClick={() => changeMonth(1)}>
              <FaChevronRight />
            </Button>
          </MonthNav>
          <Button variant="outline" onClick={handleExportMonthlySheet}>
            <FaTable style={{ marginRight: "0.5rem" }} />
            Monthly Sheet (Day-wise)
          </Button>
          <Button variant="primary" onClick={viewMode === "summary" ? handleExportSummary : handleExportDaily}>
            <FaFileExport style={{ marginRight: "0.5rem" }} />
            Export
          </Button>
        </HeaderActions>
      </PageHeader>

<StatsGrid>
  <StatCard>
    <StatIconWrap $color="#2196F3">
      <FaUsers />
    </StatIconWrap>
    <div>
      <StatValue>{totalEmployees}</StatValue>
      <StatLabel>Total Employees</StatLabel>
    </div>
  </StatCard>
  <StatCard>
    <StatIconWrap $color={STATUS_COLORS.present}>
      <FaUserCheck />
    </StatIconWrap>
    <div>
      <StatValue>{markedThisMonth}</StatValue>
      <StatLabel>Marked Attendance This Month</StatLabel>
    </div>
  </StatCard>
  <StatCard>
    <StatIconWrap $color={STATUS_COLORS.leave}>
      <FaUserClock />
    </StatIconWrap>
    <div>
      <StatValue>{totalLeaveDaysThisMonth}</StatValue>
      <StatLabel>Total Leave Days This Month</StatLabel>
    </div>
  </StatCard>
  <StatCard>
    <StatIconWrap $color={STATUS_COLORS.absent}>
      <FaUserTimes />
    </StatIconWrap>
    <div>
      <StatValue>{notMarkedThisMonth}</StatValue>
      <StatLabel>Not Marked This Month</StatLabel>
    </div>
  </StatCard>
</StatsGrid>

      <Card
        title="Employee Attendance"
        extra={
          <ViewToggle>
            <ToggleButton $active={viewMode === "summary"} onClick={() => setViewMode("summary")}>
              <FaCalendarAlt /> Monthly Summary
            </ToggleButton>
            <ToggleButton $active={viewMode === "daily"} onClick={() => setViewMode("daily")}>
              <FaCalendarDay /> Daily Log
            </ToggleButton>
          </ViewToggle>
        }
      >
        <FilterBar>
          <SearchWrap>
            <SearchIcon />
            <SearchInput
              placeholder="Search by employee ID or name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrap>

          {viewMode === "summary" ? (
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Status</option>
              <option>Present</option>
              <option>On Leave</option>
              <option>Late</option>
            </FilterSelect>
          ) : (
            <>
              <DateInput
                type="date"
                value={selectedDay}
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => setSelectedDay(e.target.value)}
              />
              <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All Status</option>
                <option>Present</option>
                <option>On Leave</option>
              </FilterSelect>
            </>
          )}
        </FilterBar>

        {loading ? (
          <EmptyState>Loading attendance data…</EmptyState>
        ) : viewMode === "summary" ? (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Present</th>
                  <th>Leave</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Attendance</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredSummaries.length > 0 ? (
                  filteredSummaries.map((e) => {
                    const total = e.workingDaysSoFar || 1
                    const presentPct = (e.presentDays / total) * 100
                    const leavePct = (e.leaveDays / total) * 100
                    const absentPct = (e.absentDays / total) * 100
                    return (
                      <tr key={e.emp_id}>
                        <td>
  <EmployeeInfoWrap>
    <EmployeeAvatar>
      {e.image ? (
        <img src={e.image} alt={e.name} />
      ) : (
        (e.name || e.emp_id).charAt(0).toUpperCase()
      )}
    </EmployeeAvatar>
    <NameCell>
      <EmpIdText>{e.name}</EmpIdText>
      <SubText>
        {e.emp_id} · {e.records.length} record(s) this month
      </SubText>
      {!e.isKnownEmployee && (
        <SubText style={{ color: "#F44336" }}>
          ⚠ Not found in active employee list
        </SubText>
      )}
    </NameCell>
  </EmployeeInfoWrap>
</td>
                        <td>{e.presentDays}</td>
                        <td>{e.leaveDays}</td>
                        <td>{e.absentDays}</td>
                        <td>{e.lateDays > 0 ? <Badge variant="warning">{e.lateDays}</Badge> : 0}</td>
                        <td>
                          <AttendanceBarWrap>
                            <AttendanceBar>
                              <AttendanceBarSegment $pct={presentPct} $color={STATUS_COLORS.present} />
                              <AttendanceBarSegment $pct={leavePct} $color={STATUS_COLORS.leave} />
                              <AttendanceBarSegment $pct={absentPct} $color={STATUS_COLORS.absent} />
                            </AttendanceBar>
                            <SubText>{Math.round(presentPct)}%</SubText>
                          </AttendanceBarWrap>
                        </td>
                        
                        <td>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleViewAttendance(e.emp_id, e.name, e.empNoId, e.gradeName, e.image, e.departmentName)
                            }
                          >
                            <FaEye style={{ marginRight: "0.4rem" }} />
                            View Attendance Screen
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={8}>
                      <EmptyState>No employees match the current filters</EmptyState>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableContainer>
        ) : (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {dailyRecords.length > 0 ? (
                  dailyRecords.map((rec) => {
                    const empInfo = employeeMap[rec.emp_id]
                    return (
                    <tr key={rec.id}>
                      <td>
                        <NameCell>
                          <EmpIdText>{empInfo?.name || rec.emp_id}</EmpIdText>
                          <SubText>{rec.emp_id}</SubText>
                          {!empInfo && (
                            <SubText style={{ color: "#F44336" }}>
                              ⚠ Not found in active employee list
                            </SubText>
                          )}
                        </NameCell>
                      </td>
                      <td>{rec.start_time || "N/A"}</td>
                      <td>{rec.end_time || "N/A"}</td>
                      <td>
                        <Badge
                          variant={
                            rec.attendance_type_display === "Present"
                              ? "success"
                              : rec.attendance_type_display === "On Leave"
                                ? "warning"
                                : "error"
                          }
                        >
                          {rec.attendance_type_display}
                        </Badge>
                      </td>
                      <td>{rec.remarks || "-"}</td>
                    </tr>
                  )}))
                  : (
                  <tr>
                    <td colSpan={5}>
                      <EmptyState>No attendance records for {moment(selectedDay).format("DD MMM YYYY")}</EmptyState>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableContainer>
        )}
      </Card>
    </Layout>
  )
}

export default ManagerAttendanceTracking