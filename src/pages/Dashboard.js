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
  FaPaperPlane,
  FaTimes,
  FaGifts,
  FaGrinStars,
  FaSmile,
  FaTrash,
  FaCloudUploadAlt,
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
import Modal from "../components/modals/Modal"
import { getEmployeesInfo } from "../services/authServices"
import { useNavigate } from "react-router-dom"

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`

const swing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

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

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

// const ModalHeader = styled.div`
//   padding: 16px 24px;
//   border-bottom: 1px solid #eee;
//   font-size: 18px;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const WishForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WishFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
  }

  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    min-height: 100px;
  }
`;

const BirthdayImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid white;
`;

const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;
const Balloon = styled.div`
  width: ${(props) => props.size || 30}px;
  height: ${(props) => props.size * 1.2 || 36}px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: ${(props) => props.color};
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 20px;
    background: rgba(255, 255, 255, 0.7);
  }
  
  animation: ${float} ${(props) => props.duration || 5}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
`

const Chocolate = styled.div`
  width: 24px;
  height: 14px;
  background: #5D4037;
  position: absolute;
  bottom: ${(props) => props.bottom || 20}%;
  right: ${(props) => props.right || 15}%;
  border-radius: 3px;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    height: 2px;
    background: #8D6E63;
    border-radius: 1px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 7px;
    width: 2px;
    height: 6px;
    background: #8D6E63;
    border-radius: 1px;
  }
  
  animation: ${swing} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
`

const Teddy = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #A1887F;
  bottom: 10%;
  left: ${(props) => props.left || 10}%;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #A1887F;
    top: -5px;
  }
  
  &::before {
    left: 5px;
  }
  
  &::after {
    right: 5px;
  }
  
  animation: ${swing} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
`
// Modal Container
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Header
const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

// const BirthdayIcon = styled.span`
//   color: #ff6b6b;
//   display: flex;
//   align-items: center;
// `;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  padding: 5px;
  transition: all 0.2s;

  &:hover {
    color: #333;
    transform: rotate(90deg);
  }
`;

// Body
// const ModalBody = styled.div`
//   padding: 20px;
// `;

const RecipientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const RecipientAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffd166;
`;

const RecipientDetails = styled.div`
  flex: 1;
`;

const RecipientName = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const RecipientOccasion = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
`;

// const WishForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
`;

const MessageTextarea = styled.textarea`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

// Upload Components
const UploadContainer = styled.div`
  margin-top: 5px;
`;

const UploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  background: #f9f9f9;
  min-height: 150px;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #6c63ff;
    background: #f5f3ff;
  }
`;

const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #666;
  text-align: center;

  p {
    margin: 0;
    font-size: 0.95rem;
  }

  small {
    font-size: 0.8rem;
    color: #999;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 200px;
  border-radius: 8px;
`;

const UploadActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

// Wish Options
const WishOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const WishOption = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }
`;

// Footer
// const ModalFooter = styled.div`
//   padding: 15px 20px;
//   border-top: 1px solid #f0f0f0;
//   display: flex;
//   justify-content: flex-end;
//   gap: 15px;
// `;

const ActionButton = styled(Button)`
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;
const Dashboard = () => {
  const[selectedFile,setSelectedFile] = useState(null);
  const [leaveData, setLeaveData] = useState([])
  const [claimData, setClaimData] = useState([])
  const [ticketData, setTicketData] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [stats, setStats] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [eventData, setEventData] = useState([])
  const [monthlyAttendanceData, setMonthlyAttendanceData] = useState([])
  const [showWishPopup, setShowWishPopup] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [wishMessage, setWishMessage] = useState("");
  const [empInfo, setEmpInfo] = useState([])
  const emp_id = localStorage.getItem("empNoId")
  const empId = localStorage.getItem("empId")
  const navigation= useNavigate()
  // Fetch data from various services
  console.log(stats, "attendanceData")
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
          // Fetch employees data data
          getEmployeesInfo()
    .then((res) => {
      setEmpInfo(res.data)
    })
    .catch((err) => console.error("Error fetching claim data:", err))
  }, [emp_id, empId])

  // Process data for stats and charts
  useEffect(() => {
    // if (leaveData.length > 0 && claimData.length > 0 && ticketData.length > 0 && attendanceData.length > 0) {
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
          icon: <FaMoneyBillWave />,
          label: "Pending Tickets",
          value: pendingTickets, // This could be fetched from an API
          change: pendingTickets > 0 ? "Needs attention" : "All approved",
          changeType: pendingTickets > 0 ? "decrease" : "increase",
          color: pendingTickets > 0 ? "warning" : "success",
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
          icon: <FaFileInvoiceDollar />,
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
      setRecentActivities(activities.length>5?activities.slice(0, 5):activities)

      // Process department data
      const gradeCounts = empInfo.reduce((acc, emp) => {
        if (emp.grade_name) {
          acc[emp.grade_name] = (acc[emp.grade_name] || 0) + 1;
        }
        return acc;
      }, {});

      const departmentData = Object.keys(gradeCounts).map((gradeName) => ({
        name: gradeName,
        value: gradeCounts[gradeName],
      }));

      setDepartmentData(departmentData);

      // Process monthly attendance data
      const monthlyData = []
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri","sat"]

      days.forEach((day) => {
        const dayAttendance = attendanceData.filter((att) => {
          const date = new Date(att.a_date.split("-")[2], att.a_date.split("-")[1] - 1, att.a_date.split("-")[0])
          return date.toLocaleString("en-US", { weekday: "short" }) === day
        })

        const present = dayAttendance.filter((att) => att.attendance_type === "A").length
        const absent = dayAttendance.filter((att) => att.attendance_type === "N").length
        const late = dayAttendance.filter((att) => att.attendance_type === "H").length

        monthlyData.push({
          name: day,
          present: present , // Fallback to random if no data
          absent: absent,
          Holiday: late ,
        })
      })

      setMonthlyAttendanceData(monthlyData)
    }
  , [leaveData, claimData, ticketData, attendanceData])
  // Check if today is someone's birthday
  const [todayBirthday, setUpcomingBirthdays] = useState([])
  console.log(todayBirthday,"upcomingBirthdays")

  useEffect(() => {
    if (eventData.length > 0) {
      // Format today's date to match event_date format (DD-MM-YYYY)
      const today = new Date();
      const todayFormatted = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
      
      // Find today's birthdays
      const birthdaysToday = eventData.filter(
        event => event.event_type === 'B' && event.event_date === todayFormatted
      );
      
      // Find upcoming birthdays (excluding today)
      const upcoming = eventData.filter(
        event => event.event_type === 'B' && event.event_date !== todayFormatted
      ).slice(0, 3); // Limit to 3 upcoming birthdays
      
      setUpcomingBirthdays({
        today: birthdaysToday,
        upcoming: upcoming
      });
    }
  }, [eventData]);
  const handleSendWish = () => {
    if (wishMessage.trim() && selectedBirthday) {
      // Here you would typically call an API to send the wish
      console.log(`Sending wish to ${selectedBirthday.emp_id}: ${wishMessage}`);
      
      // Close the popup and reset
      setShowWishPopup(false);
      setSelectedBirthday(null);
      setWishMessage("");
    }
  };

  // Pending approvals data
  const pendingApprovals = [
    { type: "Leave", employee: "Jane Smith", from: "2023-12-10", to: "2023-12-15", reason: "Vacation" },
    { type: "Claim", employee: "Mike Johnson", amount: "$250", date: "2023-12-05", description: "Travel Expenses" },
    { type: "Overtime", employee: "Sarah Williams", hours: "3", date: "2023-12-03", reason: "Project Deadline" },
  ]

  const COLORS = ["#6C63FF", "#FF6584", "#63FFDA", "#FFD600", "#2196F3"]
const navigatetoattendance = () => {
  navigation ("/attendance-tracking");
}
  return (
    <Layout title="Dashboard">
      {/* Today's Birthday Special Display */}
      {todayBirthday.today && todayBirthday.today.length > 0 && (
        <>
          {todayBirthday.today.map((birthday) => (
            <TodayBirthdayContainer key={birthday.event_id}>
               <Balloon size={40} color="#FF6B6B" top={10} left={10} duration={6} />
               <Teddy left={15} delay={0.8} />
                <Balloon size={30} color="#4ECDC4" top={15} left={80} duration={7} delay={0.5} />
                <Balloon size={35} color="#FFD166" top={20} left={30} duration={5} delay={1} />
                <Balloon size={25} color="#FF70A6" top={5} left={60} duration={8} delay={1.5} />
                <Chocolate bottom={15} right={5} delay={0.5} />
                <Teddy left={75} delay={1.5} />
                <Chocolate bottom={25} right={35} delay={1.2} />
              <BirthdayCakeIcon>
                <FaGift />
              </BirthdayCakeIcon>
              <BirthdayMessage>
                {`${birthday.event_text} ${birthday.emp_name}! 🎉`|| `Happy Birthday, ${birthday.emp_name}! 🎉`}
              </BirthdayMessage>
              <BirthdayDescription>
                Wishing you a fantastic day filled with joy and celebration!
              </BirthdayDescription>
              <Button
                variant="outline"
                style={{ background: "rgba(255,255,255,0.2)", color: "white", borderColor: "white" }}
                onClick={() => {
                  setSelectedBirthday(birthday);
                  setShowWishPopup(true);
                }}
              >
                Send Wishes
              </Button>
            </TodayBirthdayContainer>
          ))}
        </>
      )}

      {/* Birthday Card */}
      <BirthdayCard
        title="Upcoming Birthdays"
        variant="primary"
      >
        {todayBirthday.upcoming && todayBirthday.upcoming.length > 0 ? (
          <BirthdayList>
            {todayBirthday.upcoming.map((birthday) => (
              <BirthdayItem key={birthday.event_id}>
                <BirthdayAvatar>
                  <img src={birthday.image} alt={birthday.emp_id} />
                </BirthdayAvatar>
                <BirthdayInfo>
                  <BirthdayName>{birthday.emp_id}</BirthdayName>
                  <BirthdayDate>
                    {birthday.event_date} • {birthday.event_type_display}
                  </BirthdayDate>
                </BirthdayInfo>
                <BirthdayIcon>
                  <FaBirthdayCake size={20} />
                </BirthdayIcon>
              </BirthdayItem>
            ))}
          </BirthdayList>
        ) : (
          <EmptyState>No upcoming birthdays</EmptyState>
        )}
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
            <Button onClick={navigatetoattendance} variant="outline" size="sm">
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
                <Line type="monotone" dataKey="Holiday" stroke="#FFD600" />
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
      {showWishPopup && selectedBirthday && (
  <ModalOverlay>
    <ModalContainer>
      <ModalHeader>
        <BirthdayIcon>
          <FaGifts />
        </BirthdayIcon>
        <h3>Send Birthday Wishes</h3>
        <CloseButton onClick={() => setShowWishPopup(false)}>
          <FaTimes color="red" />
        </CloseButton>
      </ModalHeader>
      
      <ModalBody>
        <RecipientInfo>
          <RecipientAvatar src={selectedBirthday.image || "https://via.placeholder.com/80"} alt={selectedBirthday.emp_name} />
          <RecipientDetails>
            <RecipientName>To: {selectedBirthday.emp_name}</RecipientName>
            <RecipientOccasion>Birthday • {selectedBirthday.event_date}</RecipientOccasion>
          </RecipientDetails>
        </RecipientInfo>
        
        <WishForm>
          <FormGroup>
            <Label>Your Message</Label>
            <MessageTextarea
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              placeholder="Write your heartfelt birthday wish here..."
              rows="5"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Add a Photo/GIF (Optional)</Label>
            <UploadContainer>
              <UploadBox htmlFor="wish-upload">
                {selectedFile ? (
                  <PreviewImage src={URL.createObjectURL(selectedFile)} alt="Preview" />
                ) : (
                  <UploadContent>
                    <FaCloudUploadAlt size={32} />
                    <p>Click to upload or drag and drop</p>
                    <small>JPG, PNG or GIF (max. 5MB)</small>
                  </UploadContent>
                )}
                <HiddenInput 
                  id="wish-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </UploadBox>
              {selectedFile && (
                <UploadActions>
                  <Button variant="text" onClick={() => setSelectedFile(null)}>
                    <FaTrash /> Remove
                  </Button>
                </UploadActions>
              )}
            </UploadContainer>
          </FormGroup>
          
          <WishOptions>
            <WishOption onClick={() => setWishMessage(prev => prev + " 🎉")}>
              <FaBirthdayCake /> Add Celebration
            </WishOption>
            <WishOption onClick={() => setWishMessage(prev => prev + " 🎂")}>
              <FaSmile /> Add Cake
            </WishOption>
            <WishOption onClick={() => setWishMessage(prev => prev + " 🥳")}>
              <FaGrinStars /> Add Party
            </WishOption>
          </WishOptions>
        </WishForm>
      </ModalBody>
      
      <ModalFooter>
        <ActionButton variant="outline" onClick={() => setShowWishPopup(false)}>
          Cancel
        </ActionButton>
        <ActionButton 
          variant="primary" 
          onClick={handleSendWish}
          disabled={!wishMessage.trim()}
        >
          <FaPaperPlane /> Send Wish
        </ActionButton>
      </ModalFooter>
    </ModalContainer>
  </ModalOverlay>
)}
    </Layout>
  )
}

export default Dashboard
