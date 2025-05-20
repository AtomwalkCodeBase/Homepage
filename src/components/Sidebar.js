"use client"

import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import {
  FaHome,
  FaClock,
  FaCalendarAlt,
  FaCalendarCheck,
  FaFileAlt,
  FaMoneyBillWave,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTicketAlt,
  FaUserCircle,
  FaComments,
  FaGift,
} from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

const SidebarContainer = styled.div`
  width: ${(props) => {
    const { isOpen, uiPreferences } = props
    const sidebarStyle = uiPreferences?.layout?.sidebarStyle || "standard"

    if (!isOpen) {
      return "70px"
    }

    if (sidebarStyle === "compact") {
      return "200px"
    } else if (sidebarStyle === "expanded") {
      return "280px"
    } else {
      return "250px" // standard
    }
  }};
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: ${(props) => {
    const { uiPreferences } = props
    const shadowIntensity = uiPreferences?.components?.shadowIntensity || "medium"

    if (shadowIntensity === "none") {
      return "none"
    } else if (shadowIntensity === "heavy") {
      return "3px 0 15px rgba(0, 0, 0, 0.2)"
    } else {
      return "2px 0 10px rgba(0, 0, 0, 0.1)" // medium
    }
  }};
  overflow-x: hidden;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? "250px" : "0")};
    left: ${(props) => (props.isOpen ? "0" : "-70px")};
    box-shadow: ${(props) => (props.isOpen ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none")};
  }
`

const SidebarHeader = styled.div`
  padding: ${(props) => {
    const { uiPreferences } = props
    const layoutDensity = uiPreferences?.layout?.density || "comfortable"

    if (layoutDensity === "compact") {
      return "15px"
    } else if (layoutDensity === "spacious") {
      return "25px"
    } else {
      return "20px" // comfortable
    }
  }};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOpen ? "space-between" : "center")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Logo = styled.div`
  font-size: ${(props) => {
    const { uiPreferences } = props
    const fontSize = uiPreferences?.typography?.fontSize || "medium"

    if (fontSize === "small") {
      return "1.3rem"
    } else if (fontSize === "large") {
      return "1.7rem"
    } else {
      return "1.5rem" // medium
    }
  }};
  font-weight: bold;
  color: white;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  font-family: ${(props) => {
    const { uiPreferences } = props
    const fontFamily = uiPreferences?.typography?.fontFamily || "Poppins"
    return `${fontFamily}, sans-serif`
  }};
`

const ToggleButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: ${(props) => {
    const { uiPreferences } = props
    const iconSize = uiPreferences?.components?.iconSize || "medium"

    if (iconSize === "small") {
      return "1rem"
    } else if (iconSize === "large") {
      return "1.4rem"
    } else {
      return "1.2rem" // medium
    }
  }};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${(props) => {
    const { uiPreferences } = props
    const animations = uiPreferences?.components?.animations !== false
    return animations ? "all 0.3s ease" : "none"
  }};
  
  &:hover {
    transform: ${(props) => {
      const { uiPreferences } = props
      const animations = uiPreferences?.components?.animations !== false
      return animations ? "scale(1.1)" : "none"
    }};
  }
`

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: ${(props) => {
    const { uiPreferences } = props
    const layoutDensity = uiPreferences?.layout?.density || "comfortable"

    if (layoutDensity === "compact") {
      return "15px"
    } else if (layoutDensity === "spacious") {
      return "25px"
    } else {
      return "20px" // comfortable
    }
  }};
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
  margin-bottom: ${(props) => {
    const { uiPreferences } = props
    const layoutDensity = uiPreferences?.layout?.density || "comfortable"

    if (layoutDensity === "compact") {
      return "3px"
    } else if (layoutDensity === "spacious") {
      return "8px"
    } else {
      return "5px" // comfortable
    }
  }};
`

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${(props) => {
    const { uiPreferences } = props
    const layoutDensity = uiPreferences?.layout?.density || "comfortable"

    if (layoutDensity === "compact") {
      return "10px 15px"
    } else if (layoutDensity === "spacious") {
      return "14px 25px"
    } else {
      return "12px 20px" // comfortable
    }
  }};
  color: white;
  text-decoration: none;
  transition: ${(props) => {
    const { uiPreferences } = props
    const animations = uiPreferences?.components?.animations !== false
    return animations ? "all 0.3s ease" : "none"
  }};
  border-left: 3px solid transparent;
  font-family: ${(props) => {
    const { uiPreferences } = props
    const fontFamily = uiPreferences?.typography?.fontFamily || "Poppins"
    return `${fontFamily}, sans-serif`
  }};
  font-size: ${(props) => {
    const { uiPreferences } = props
    const fontSize = uiPreferences?.typography?.fontSize || "medium"

    if (fontSize === "small") {
      return "0.9rem"
    } else if (fontSize === "large") {
      return "1.1rem"
    } else {
      return "1rem" // medium
    }
  }};
  
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
    font-size: ${(props) => {
      const { uiPreferences } = props
      const iconSize = uiPreferences?.components?.iconSize || "medium"

      if (iconSize === "small") {
        return "1rem"
      } else if (iconSize === "large") {
        return "1.4rem"
      } else {
        return "1.2rem" // medium
      }
    }};
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
  padding: ${(props) => {
    const { uiPreferences } = props
    const layoutDensity = uiPreferences?.layout?.density || "comfortable"

    if (layoutDensity === "compact") {
      return "10px"
    } else if (layoutDensity === "spacious") {
      return "20px"
    } else {
      return "15px" // comfortable
    }
  }};
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
  font-family: ${(props) => {
    const { uiPreferences } = props
    const fontFamily = uiPreferences?.typography?.fontFamily || "Poppins"
    return `${fontFamily}, sans-serif`
  }};
`

const UserName = styled.span`
  font-size: ${(props) => {
    const { uiPreferences } = props
    const fontSize = uiPreferences?.typography?.fontSize || "medium"

    if (fontSize === "small") {
      return "0.8rem"
    } else if (fontSize === "large") {
      return "1rem"
    } else {
      return "0.9rem" // medium
    }
  }};
  font-family: ${(props) => {
    const { uiPreferences } = props
    const fontFamily = uiPreferences?.typography?.fontFamily || "Poppins"
    return `${fontFamily}, sans-serif`
  }};
`

const LogoutButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${(props) => {
    const { uiPreferences } = props
    const animations = uiPreferences?.components?.animations !== false
    return animations ? "all 0.3s ease" : "none"
  }};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: ${(props) => {
      const { uiPreferences } = props
      const animations = uiPreferences?.components?.animations !== false
      return animations ? "scale(1.1)" : "none"
    }};
  }
  
  svg {
    font-size: ${(props) => {
      const { uiPreferences } = props
      const iconSize = uiPreferences?.components?.iconSize || "medium"

      if (iconSize === "small") {
        return "1rem"
      } else if (iconSize === "large") {
        return "1.4rem"
      } else {
        return "1.2rem" // medium
      }
    }};
  }
`

const Sidebar = ({ onToggle, initialOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const location = useLocation()
  const { currentUser, logout, profile,companyInfo  } = useAuth()
  const { theme, uiPreferences } = useTheme();

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
    <SidebarContainer isOpen={isOpen} theme={theme} uiPreferences={uiPreferences}>
      <SidebarHeader isOpen={isOpen} uiPreferences={uiPreferences}>
        <Logo isOpen={isOpen} uiPreferences={uiPreferences}>
         <img src={companyInfo.image} alt="Company Logo" style={{ width: "70px", marginRight: "1rem",borderRadius:"10px" }} /> HRMS
        </Logo>
        <ToggleButton onClick={toggleSidebar} uiPreferences={uiPreferences}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </ToggleButton>
      </SidebarHeader>

      <SidebarMenu uiPreferences={uiPreferences}>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} uiPreferences={uiPreferences}>
            <SidebarLink
              to={item.path}
              active={location.pathname === item.path ? 1 : 0}
              isOpen={isOpen}
              theme={theme}
              uiPreferences={uiPreferences}
            >
              {item.icon}
              <span>{item.name}</span>
            </SidebarLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter isOpen={isOpen} theme={theme} uiPreferences={uiPreferences}>
        <UserInfo isOpen={isOpen}>
          <UserAvatar theme={theme} uiPreferences={uiPreferences}>
            {profile?.name?.charAt(0) || "U"}
          </UserAvatar>
          <UserName uiPreferences={uiPreferences}>{profile?.name || "User"}</UserName>
        </UserInfo>
        <LogoutButton onClick={logout} title="Logout" theme={theme} uiPreferences={uiPreferences}>
          <FaSignOutAlt />
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  )
}

export default Sidebar
