"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import {
  FaHome,
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaCalendarCheck,
  FaFileAlt,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaUserPlus,
  FaChartBar,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaQuestion,
  FaTicketAlt,
  FaUserCircle,
  FaComments,
  FaGift
} from "react-icons/fa"
import { useAuth } from "../context/AuthContext"

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? "250px" : "70px")};
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? "250px" : "0")};
    left: ${(props) => (props.isOpen ? "0" : "-70px")};
    box-shadow: ${(props) => (props.isOpen ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none")};
  }
`

const SidebarHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOpen ? "space-between" : "center")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const ToggleButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`

const SidebarMenuItem = styled.li`
  margin-bottom: 5px;
`

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  
  ${(props) =>
    props.active &&
    `
    background: rgba(255, 255, 255, 0.1);
    border-left-color: ${props.theme.colors.secondary};
  `}
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    margin-right: ${(props) => (props.isOpen ? "10px" : "0")};
    font-size: 1.2rem;
  }
  
  span {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    white-space: nowrap;
  }
`

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOpen ? "space-between" : "center")};
  background: ${({ theme }) => theme.colors.primary};
`

const UserInfo = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
`

const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
`

const UserName = styled.span`
  font-size: 0.9rem;
`

const LogoutButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const Sidebar = ({ onToggle, initialOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const location = useLocation()
  const { currentUser, logout,profile,companyInfo } = useAuth()

  useEffect(() => {
    setIsOpen(initialOpen)
  }, [initialOpen])

  const toggleSidebar = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (onToggle) {
      onToggle(newState)
    }
  }

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
    // { path: "/employees", name: "Employees", icon: <FaUsers /> },
    { path: "/attendance-tracking", name: "Attendance", icon: <FaClock /> },
    { path: "/leave-management", name: "Leave Management", icon: <FaCalendarAlt /> },
    { path: "/holidays", name: "Holiday Calendar", icon: <FaCalendarCheck /> },
    // { path: "/timesheet", name: "Timesheet", icon: <FaFileAlt /> },
    // { path: "/shifts", name: "Shift Scheduling", icon: <FaExchangeAlt /> },
    { path: "/claims", name: "My Claims", icon: <FaMoneyBillWave /> },
    // { path: "/appointees", name: "Appointees", icon: <FaUserPlus /> },
    // { path: "/analytics", name: "Analytics", icon: <FaChartBar /> },
    { path: "/helpdesk", name: "Help Desk", icon: <FaComments/> },
    { path: "/requestdesk", name: "Request Desk", icon: <FaTicketAlt /> },
    { path: "/payslip", name: "Pay Slip", icon: <FaFileAlt /> },
    { path: "/wishes", name: "My Wishes", icon: <FaGift /> },
    { path: "/profile", name: "My Profile", icon: <FaUserCircle />, section: "Account" },
  ]

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader isOpen={isOpen}>
        <Logo isOpen={isOpen}><img src={companyInfo.image} alt="Company Logo" style={{ width: "70px", marginRight: "1rem",borderRadius:"10px" }} />HRMS</Logo>
        <ToggleButton onClick={toggleSidebar}>{isOpen ? <FaTimes /> : <FaBars />}</ToggleButton>
      </SidebarHeader>

      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path}>
            <SidebarLink to={item.path} active={location.pathname === item.path ? 1 : 0} isOpen={isOpen}>
              {item.icon}
              <span>{item.name}</span>
            </SidebarLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter isOpen={isOpen}>
        <UserInfo isOpen={isOpen}>
          <UserAvatar>{profile?.name?.charAt(0) || "U"}</UserAvatar>
          <UserName>{profile?.name || "User"}</UserName>
        </UserInfo>
        <LogoutButton onClick={logout} title="Logout">
          <FaSignOutAlt />
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  )
}

export default Sidebar
