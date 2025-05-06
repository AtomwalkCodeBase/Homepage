"use client"

import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import {
  FaUsers,
  FaUserClock,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserCheck,
  FaUserTimes,
  FaBirthdayCake,
  FaGift,
  FaTicketAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import Layout from "../components/Layout"
import StatsCard from "../components/StatsCard"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getEmpLeave, getEmpClaim, getEmployeeRequest, getEmpAttendance, getEventLists } from "../services/productServices"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`

const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  
  table {
    min-width: 500px;
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }
    
    th {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.textLight};
    }
  }
  
  @media (max-width: 768px) {
    margin: 0 -15px;
    width: calc(100% + 30px);
    padding: 0 15px;
    
    table {
      font-size: 0.9rem;
    }
  }
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  
  ${(props) =>
    props.type === "check-in" &&
    `
    background: ${props.theme.colors.success}22;
    color: ${props.theme.colors.success};
  `}
  
  ${(props) =>
    props.type === "check-out" &&
    `
    background: ${props.theme.colors.error}22;
    color: ${props.theme.colors.error};
  `}
  
  ${(props) =>
    props.type === "leave" &&
    `
    background: ${props.theme.colors.warning}22;
    color: ${props.theme.colors.warning};
  `}
  
  ${(props) =>
    props.type === "claim" &&
    `
    background: ${props.theme.colors.secondary}22;
    color: ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.type === "ticket" &&
    `
    background: ${props.theme.colors.primary}22;
    color: ${props.theme.colors.primary};
  `}
`

const ActivityContent = styled.div`
  flex: 1;
`

const ActivityTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const ActivityStatus = styled.div`
  margin-left: auto;
`

const BirthdayCard = styled(Card)`
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}22, ${({ theme }) => theme.colors.secondary}22);
  border: 1px solid ${({ theme }) => theme.colors.primary}22;
`

const BirthdayList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const BirthdayItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: calc(33.333% - 0.67rem);
  
  @media (max-width: 1200px) {
    width: calc(50% - 0.5rem);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const BirthdayAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  font-size: 1.2rem;
`

const BirthdayInfo = styled.div`
  flex: 1;
`

const BirthdayName = styled.div`
  font-weight: 600;
  color: #242424;
`

const BirthdayDate = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const BirthdayIcon = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  margin-left: 10px;
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const TodayBirthdayContainer = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease;
  box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
    z-index: 1;
  }
`

const BirthdayCakeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  animation: ${bounce} 2s infinite;
`

const BirthdayMessage = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 600;
  z-index: 2;
  position: relative;
  color: aliceblue;
`

const BirthdayDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  opacity: 0.9;
  z-index: 2;
  position: relative;
`

const Dashboard = () => {
  const [leaveData, setLeaveData] = useState([])
  const [claimData, setClaimData] = useState([])
  const [ticketData, setTicketData] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [stats, setStats] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [eventData, setEventData] = useState([])
  const [monthlyAttendanceData, setMonthlyAttendanceData] = useState([])
  const emp_id = localStorage.getItem("empNoId")
  const empId = localStorage.getItem("empId")
  // Fetch data from various services
  useEffect(() => {
    // Fetch leave data
    getEmpLeave("EL", emp_id)
      .then((res) => {
        setLeaveData(res.data)
      })
      .catch((err) => console.error("Error fetching leave data:", err))
    // Fetch event data
    getEventLists()
      .then((res) => {
        setEventData(res.data)
      })
      .catch((err) => console.error("Error fetching leave data:", err))

    // Fetch claim data
    getEmpClaim("GET", emp_id)
      .then((res) => {
        setClaimData(res.data)
      })
      .catch((err) => console.error("Error fetching claim data:", err))

    // Fetch ticket data
    getEmployeeRequest()
      .then((res) => {
        const helpDeskTickets = res.data.filter((request) => request?.emp_id == empId && request?.request_type === "H")
        setTicketData(helpDeskTickets)
      })
      .catch((err) => console.error("Error fetching ticket data:", err))

    // Fetch attendance data
    const currentDate = new Date()
    getEmpAttendance({
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    })
      .then((res) => {
        setAttendanceData(res.data)
      })
      .catch((err) => console.error("Error fetching attendance data:", err))
  }, [emp_id, empId])

  // Process data for stats and charts
  useEffect(() => {
    if (leaveData.length > 0 && claimData.length > 0 && ticketData.length > 0 && attendanceData.length > 0) {
      // Calculate stats
      const pendingLeaves = leaveData.filter((leave) => leave.status_display === "Submitted").length
      const pendingClaims = claimData.filter((claim) => claim.expense_status === "S").length
      const pendingTickets = ticketData.filter((ticket) => ticket.request_status === "S").length
      const presentToday =
        attendanceData.filter((att) => {
          const today = new Date()
          const attDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getFullYear()}`
          return att.a_date === attDate && att.attendance_type === "A"
        }).length > 0

      setStats([
        {
          icon: <FaUsers />,
          label: "Total Employees",
          value: "124", // This could be fetched from an API
          change: "12% increase",
          changeType: "increase",
          color: "primary",
        },
        {
          icon: <FaUserClock />,
          label: "Present Today",
          value: presentToday ? "Yes" : "No",
          change: presentToday ? "On time" : "Not checked in",
          changeType: presentToday ? "increase" : "decrease",
          color: presentToday ? "success" : "error",
        },
        {
          icon: <FaCalendarAlt />,
          label: "Pending Leaves",
          value: pendingLeaves.toString(),
          change: pendingLeaves > 0 ? "Needs attention" : "All approved",
          changeType: pendingLeaves > 0 ? "decrease" : "increase",
          color: pendingLeaves > 0 ? "warning" : "success",
        },
        {
          icon: <FaMoneyBillWave />,
          label: "Pending Claims",
          value: pendingClaims.toString(),
          change: pendingClaims > 0 ? "Awaiting approval" : "All processed",
          changeType: pendingClaims > 0 ? "decrease" : "increase",
          color: pendingClaims > 0 ? "warning" : "success",
        },
      ])

      // Create recent activities from various data sources
      const activities = []

      // Add leave activities
      leaveData.slice(0, 2).forEach((leave) => {
        activities.push({
          type: "leave",
          user: "You",
          time: leave.submit_date,
          status: leave.status_display,
          description: `Applied for ${leave.leave_type_display}`,
        })
      })

      // Add claim activities
      claimData.slice(0, 2).forEach((claim) => {
        activities.push({
          type: "claim",
          user: "You",
          time: claim.submitted_date,
          status: claim.expense_status === "A" ? "Approved" : claim.expense_status === "R" ? "Rejected" : "Pending",
          description: `Submitted claim for ₹${claim.expense_amt}`,
        })
      })

      // Add ticket activities
      ticketData.slice(0, 2).forEach((ticket) => {
        activities.push({
          type: "ticket",
          user: "You",
          time: ticket.created_date,
          status:
            ticket.request_status === "S"
              ? "Submitted"
              : ticket.request_status === "A"
                ? "Assigned"
                : ticket.request_status === "C"
                  ? "Completed"
                  : "Rejected",
          description: `Created ticket: ${ticket.request_sub_type}`,
        })
      })

      // Add attendance activities if available
      const todayAttendance = attendanceData.find((att) => {
        const today = new Date()
        const attDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getFullYear()}`
        return att.a_date === attDate
      })

      if (todayAttendance) {
        if (todayAttendance.start_time) {
          activities.push({
            type: "check-in",
            user: "You",
            time: todayAttendance.start_time,
            status: "On Time",
            description: "Checked in",
          })
        }
        if (todayAttendance.end_time) {
          activities.push({
            type: "check-out",
            user: "You",
            time: todayAttendance.end_time,
            status: "Completed",
            description: "Checked out",
          })
        }
      }

      // Sort activities by time (most recent first) and limit to 5
      activities.sort((a, b) => new Date(b.time) - new Date(a.time))
      setRecentActivities(activities.slice(0, 5))

      // Process department data
      setDepartmentData([
        { name: "Engineering", value: 40 },
        { name: "Marketing", value: 20 },
        { name: "Finance", value: 15 },
        { name: "HR", value: 10 },
        { name: "Sales", value: 15 },
      ])

      // Process monthly attendance data
      const monthlyData = []
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

      days.forEach((day) => {
        const dayAttendance = attendanceData.filter((att) => {
          const date = new Date(att.a_date.split("-")[2], att.a_date.split("-")[1] - 1, att.a_date.split("-")[0])
          return date.toLocaleString("en-US", { weekday: "short" }) === day
        })

        const present = dayAttendance.filter((att) => att.attendance_type === "P").length
        const absent = dayAttendance.filter((att) => att.attendance_type === "A").length
        const late = dayAttendance.filter((att) => att.attendance_type === "L").length

        monthlyData.push({
          name: day,
          present: present || Math.floor(Math.random() * 20) + 80, // Fallback to random if no data
          absent: absent || Math.floor(Math.random() * 10) + 1,
          late: late || Math.floor(Math.random() * 8) + 1,
        })
      })

      setMonthlyAttendanceData(monthlyData)
    }
  }, [leaveData, claimData, ticketData, attendanceData])

  // Mock data for birthdays
  const upcomingBirthdays = [
    { name: "John Doe", date: "Today", department: "Engineering" },
    { name: "Jane Smith", date: "Tomorrow", department: "Marketing" },
    { name: "Mike Johnson", date: "Dec 15", department: "Finance" },
  ]

  // Check if today is someone's birthday
  const [todayBirthday, setTodayBirthday] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For demo purposes, we'll use the first birthday in the list
    const birthdayToday = upcomingBirthdays.find((b) => b.date === "Today")
    setTodayBirthday(birthdayToday)
  }, [])

  // Pending approvals data
  const pendingApprovals = [
    { type: "Leave", employee: "Jane Smith", from: "2023-12-10", to: "2023-12-15", reason: "Vacation" },
    { type: "Claim", employee: "Mike Johnson", amount: "$250", date: "2023-12-05", description: "Travel Expenses" },
    { type: "Overtime", employee: "Sarah Williams", hours: "3", date: "2023-12-03", reason: "Project Deadline" },
  ]

  const COLORS = ["#6C63FF", "#FF6584", "#63FFDA", "#FFD600", "#2196F3"]

  return (
    <Layout title="Dashboard">
      {/* Today's Birthday Special Display */}
      {todayBirthday && (
        <TodayBirthdayContainer>
          <BirthdayCakeIcon>
            <FaGift />
          </BirthdayCakeIcon>
          <BirthdayMessage>Happy Birthday, {todayBirthday.name}! 🎉</BirthdayMessage>
          <BirthdayDescription>
            Wishing you a fantastic day filled with joy and celebration! The entire team at HRMS sends their warmest
            wishes.
          </BirthdayDescription>
          <Button
            variant="outline"
            style={{ background: "rgba(255,255,255,0.2)", color: "white", borderColor: "white" }}
          >
            Send Wishes
          </Button>
        </TodayBirthdayContainer>
      )}

      {/* Birthday Card */}
      <BirthdayCard
        title="Upcoming Birthdays"
        variant="primary"
        headerAction={
          <Button variant="outline" size="sm">
            View All
          </Button>
        }
      >
        <BirthdayList>
          {upcomingBirthdays.map((birthday, index) => (
            <BirthdayItem key={index}>
              <BirthdayAvatar>{birthday.name.charAt(0)}</BirthdayAvatar>
              <BirthdayInfo>
                <BirthdayName>{birthday.name}</BirthdayName>
                <BirthdayDate>
                  {birthday.date} • {birthday.department}
                </BirthdayDate>
              </BirthdayInfo>
              <BirthdayIcon>
                <FaBirthdayCake size={20} />
              </BirthdayIcon>
            </BirthdayItem>
          ))}
        </BirthdayList>
      </BirthdayCard>

      <DashboardGrid>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            color={stat.color}
          />
        ))}
      </DashboardGrid>

      <ResponsiveGrid>
        <Card
          title="Attendance Overview"
          variant="primary"
          headerAction={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAttendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#6C63FF" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="absent" stroke="#FF6584" />
                <Line type="monotone" dataKey="late" stroke="#FFD600" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <Card
          title="Recent Activities"
          variant="secondary"
          headerAction={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon type={activity.type}>
                {activity.type === "check-in" && <FaUserCheck />}
                {activity.type === "check-out" && <FaUserTimes />}
                {activity.type === "leave" && <FaCalendarAlt />}
                {activity.type === "claim" && <FaFileInvoiceDollar />}
                {activity.type === "ticket" && <FaTicketAlt />}
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.description}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
              <ActivityStatus>
                <Badge
                  variant={
                    activity.status === "On Time" || activity.status === "Approved" || activity.status === "Completed"
                      ? "success"
                      : activity.status === "Late" ||
                        activity.status === "Early" ||
                        activity.status === "Pending" ||
                        activity.status === "Submitted" ||
                        activity.status === "Assigned"
                        ? "warning"
                        : "error"
                  }
                >
                  {activity.status}
                </Badge>
              </ActivityStatus>
            </ActivityItem>
          ))}
        </Card>
      </ResponsiveGrid>

      <ResponsiveGrid style={{ marginTop: "1.5rem" }}>
        <Card title="Department Distribution" variant="accent">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <Card
          title="Pending Approvals"
          variant="primary"
          headerAction={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Employee</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals.map((approval, index) => (
                  <tr key={index}>
                    <td>
                      <Badge
                        variant={
                          approval.type === "Leave" ? "primary" : approval.type === "Claim" ? "secondary" : "info"
                        }
                      >
                        {approval.type}
                      </Badge>
                    </td>
                    <td>{approval.employee}</td>
                    <td>
                      {approval.type === "Leave" && `${approval.from} to ${approval.to}`}
                      {approval.type === "Claim" && `${approval.amount} - ${approval.description}`}
                      {approval.type === "Overtime" && `${approval.hours} hours - ${approval.date}`}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </Card>
      </ResponsiveGrid>
    </Layout>
  )
}

export default Dashboard
