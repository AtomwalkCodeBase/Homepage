import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdAccountBalanceWallet, MdRecordVoiceOver, MdEventNote } from 'react-icons/md';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  FaChevronDown,
  FaChevronRight,
  FaUsersCog,
  FaBook,
  FaCogs,
  FaUsers,
  FaBookOpen,
  FaBoxOpen,
  FaRocket,
  FaUserCheck,
  FaClock,
  FaFileInvoiceDollar,
  FaTasks,
  FaBriefcase,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaChartLine,
  FaHeartbeat,
  FaCog,
  FaFileAlt,
  FaLayerGroup,
  FaSearch,
  FaHome,
  FaQuestionCircle,
  FaBuilding,     
  FaTachometerAlt, 
  FaWarehouse,    
  FaProjectDiagram, 
  FaCalendarCheck,
  FaMoneyBillWave,
  FaHeadset,
  FaUserCircle,
} from "react-icons/fa";

// Modern Theme
const theme = {
  colors: {
    primary: "#4F46E5",
    primaryLight: "#6366F1",
    primaryDark: "#4338CA",
    secondary: "#1E293B",
    accent: "#10B981",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#334155",
    textLight: "#64748B",
    borderColor: "#E2E8F0",
    success: "#10B981",
    danger: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.04)",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.background};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.25;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

// Layout Components
const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

// const MainContainer = styled.main`
//   flex: 1;
//   padding: ${(props) => props.theme.spacing.xxl};
//   padding-top: 80px;
//   max-width: 1600px;
//   margin: 0 auto;
//   width: 100%;

//   @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
//     padding: ${(props) => props.theme.spacing.xl};
//     padding-top: 80px;
//   }

//   @media (max-width: ${(props) => props.theme.breakpoints.md}) {
//     padding: ${(props) => props.theme.spacing.lg};
//     padding-top: 70px;
//   }
// `;
const MainContainer = styled.main`
  margin-left: 280px; /* Leave space for sidebar */
  flex: 1;
  padding: ${(props) => props.theme.spacing.xxl};
  padding-top: 80px;
  max-width: 1600px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-left: 240px;
    padding: ${(props) => props.theme.spacing.xl};
    padding-top: 80px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-left: 0;
    padding: ${(props) => props.theme.spacing.lg};
    padding-top: 70px;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textLight};
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};

  svg {
    animation: spin 1s linear infinite;
    color: ${(props) => props.theme.colors.primary};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Navigation Components
// const SidebarNav = styled.nav`
//   width: 280px;
//   background: ${(props) => props.theme.colors.card};
//   border-right: 1px solid ${(props) => props.theme.colors.borderColor};
//   height: 100vh;
//   position: sticky;
//   margin-top: 120px;
//   top: 0;
//   overflow-y: auto;
//   padding: ${(props) => props.theme.spacing.lg} 0;

//   @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
//     width: 240px;
//   }

//   @media (max-width: ${(props) => props.theme.breakpoints.md}) {
//     position: fixed;
//     z-index: 100;
//     width: 280px;
//     transform: ${(props) =>
//       props.isOpen ? "translateX(0)" : "translateX(-100%)"};
//     transition: transform 0.3s ease;
//     box-shadow: ${(props) => props.theme.shadows.lg};
//   }
// `;
const SidebarNav = styled.nav`
  width: 280px;
  background: ${(props) => props.theme.colors.card};
  border-right: 1px solid ${(props) => props.theme.colors.borderColor};
  height: calc(100vh - 120px);
  position: fixed;
  top: 120px; 
  left: 0;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.lg} 0;
  z-index: 100;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    width: 240px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    top: 0;
    width: 280px;
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease;
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;


const NavHeader = styled.div`
  padding: 0 ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const NavTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.secondary};
`;

const NavSearch = styled.div`
  padding: 0 ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }
`;

const NavSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.colors.textLight};
  padding: 0 ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  background: ${(props) =>
    props.active ? props.theme.colors.primary + "10" : "transparent"};
  border-right: 3px solid
    ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  font-weight: ${(props) => (props.active ? "600" : "500")};

  &:hover {
    background: ${(props) => props.theme.colors.primary + "08"};
  }

  svg {
    margin-right: ${(props) => props.theme.spacing.sm};
    color: ${(props) =>
      props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  }
`;

const MobileNavToggle = styled.button`
  position: fixed;
  bottom: ${(props) => props.theme.spacing.lg};
  left: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.lg};
  z-index: 90;
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

// Content Components
const ContentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  svg {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textLight};
  margin-top: ${(props) => props.theme.spacing.sm};

  span {
    margin: 0 ${(props) => props.theme.spacing.xs};
  }

  a {
    color: ${(props) => props.theme.colors.textLight};
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing.lg};
`;

const ModuleCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;

const ModuleHeader = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.primary + "08"};
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

const ModuleIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.primary + "20"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};
  flex-shrink: 0;
`;

const ModuleTitle = styled.h2`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.secondary};
  margin: 0;
`;

const ModuleDescription = styled.p`
  margin: ${(props) => props.theme.spacing.xs} 0 0;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textLight};
`;

const TopicList = styled.div`
  padding: ${(props) => props.theme.spacing.md};
`;

const TopicItem = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const TopicButton = styled.button`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) =>
    props.active ? props.theme.colors.primary + "10" : "transparent"};
  color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary + "08"};
  }
`;

const SubtopicList = styled.div`
  padding-left: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.xs};
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SubtopicItem = styled.a`
  display: block;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.textLight};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary + "08"};
    color: ${(props) => props.theme.colors.primary};
  }
`;

const HelpCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const HelpTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const HelpText = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textLight};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const HelpButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.primary + "10"};
  color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary + "20"};
  }
`;

// Data for different modules including subtopics
const getModuleData = () => ({
  hrmanual: {
    title: "HR Manual",
    icon: <FaUsers size={20} />,
    description: "Complete guide to HR processes, policies, and Application usage",
    subModules: {
      "Getting Started": {
        icon: <FaRocket size={16} />,
        topics: [
          {
            name: "Accessing the Application",
            subtopics: ["Accessing the Application"],
          },
          {
            name: "User Profile Management",
            subtopics: ["Add User Profile","Edit User Profile", "Change Password"],
          },
        ],
      },
      "Employee Guide": {
        icon: <FaUserCheck size={16} />,
        topics: [
          {
            name: "Attendance",
            subtopics: [
              "Add Attendance",
              "Weekly Attendance",
              "Employee Attendance Record (Upload Attendance)",
              "Schema Detail for Employee Attendance",
              "Attendance Dashboard",
            ],
          },
          {
            name: "Leave Management",
            subtopics: [
              "Apply Leave",
              "Apply Half Day Leave",
              "Apply WFH",
              "Apply LOP",
              "Employee Approve Leave",
              "Yearly Leave Data",
            ],
          },
          {
            name: "My Weekly Score",
            subtopics: [
              "Weekly Score Data",
              "Employee Weekly Score List Dashboard",
            ],
          },
          // {
          //   name: "My Appraisal",
          //   subtopics: ["Appraisal List(INIT Appraisal)", "Appraisal for reviews"],
          // },
        ],
      },
      "Manager Guide": {
        icon: <FaBriefcase size={16} />,
        topics: [
          {
            name: "Setup Department",
            subtopics: ["Department List", "Add Department", "Update Department"],
          },
          {
            name: "Setup Grade",
            subtopics: ["Grade List", "Add Grade", "Update Grade"],
          },
          {
            name: "Setup Holiday Calendar",
            subtopics: ["Holiday Calendar List", "Add Holiday Calendar", "Update Holiday Calendar", "Add New Holiday", "Edit Holiday", "Add Shift", "Edit Shift"],
          },
          {
            name: "Setup HR Policy Documents",
            subtopics: ["HR Policy Documents Setup", "Add HR Policy Documents", "Update HR Policy Documents"],
          },
          {
            name: "Setup Approval Limit",
            subtopics: ["Approval Limit Setup", "Add Approval Limit","Update Approval Limit"],
          },
          {
            name: "Setup Appraisal Structure",
            subtopics: ["Appraisal Structure Setup", "Add Appraisal Structure", "Update Appraisal Structure"],
          },
          {
            name: "Setup Exit Process",
            subtopics: ["Exit process Setup", "Add Exit Process", "Update Exit Process"],
          },
          {
            name: "Appointee List",
            subtopics: ["Appointee List Dashboard", "Add Appointee", "Update Appointee Details","Update Documents of Appointee", "Update Bank Account of Appointee", "Restore Status","Update Status of Appointee","Appointee Offer and Appointment Letter"],
          },
          {
            name: "Employee Documents",
            subtopics: ["Employee Documents Dashboard","Employee Documents"],
          },
          {
            name: "Shift Views",
            subtopics: ["Shift Views Dashboard"],
          },
          {
            name: "Employee Lists",
            subtopics: ["Add Employee"],
          },
          
        ],
      },
      "Payroll (HRMS)": {
        icon: <MdAccountBalanceWallet size={16} />,
        topics: [
          {
            name: "Payroll Setup",
            subtopics: ["Salary Structure Setup","Add Salary Structure", "Add Salary Groups","Update Salary Groups","View Provident Fund","Provident Fund Setup (Add)","Provident Fund Setup (Update)", "View Gratuity List","Gratuity Setup","Update Gratuity","View Employees State Insurance List","Employees State Insurance Setup"],
          },
          {
            name: "Payroll Setup(Tax)",
            subtopics: ["View Tax Setup (TDS/PT) List","Tax Setup (TDS/PT) Setup","Tax Setup (TDS/PT) Update","Add New Tax Slab"],
          },
          
          {
            name: "Payroll HRMS",
            subtopics: ["Variable Pay", "Additional Pay","Generate Salary","Post Salary Payable"],
          },
          
        ],
      },
      "Claims System": {
        icon: <FaFileAlt size={16} />,
        topics: [
          {
            name: "Claim Setup",
            subtopics: ["Add Expense Category","Add Expense Item"],
          },
          {
            name: "Claims Expense",
            subtopics: ["Claim Expense","Add New Claim"],
          },
          {
            name: "Employee Advances",
            subtopics: ["Employee Advances - Dashboard","New Advance"],
          },
          {
            name: "Approve Claims",
            subtopics: ["Approve Claims Dashboard","New Approve Claim"],
          },
          {
            name: "Settle Claims",
            subtopics: ["Settle Claims Dashboard"],
          },
          
        ],
      },
      "Emp Help And Requests": {
        icon: <MdRecordVoiceOver size={16} />,
        topics: [
          {
            name: "Help Dashboard",
            subtopics: ["Employee Help Tickets Dashboard", "View Help Ticket Details", "Assign Request for Help Ticket"],
          },
          {
            name: "My Help Tickets",
            subtopics: ["View Help Tickets", "Add Help Ticket", "Update Help Ticket"],
          },
          
          {
            name: "Resolve Help Tickets",
            subtopics: ["View resolved Help Ticket"],
          },
          {
            name: "My Request",
            subtopics: ["View Request", "Update Request", "View Employee request Details"],
          },
          
          {
            name: "Resolve Request",
            subtopics: ["Resolve Request Dashboard", "Complete Request", "Views Employees Request details"],
          },
          {
            name: "Request Dashboard",
            subtopics: ["View Request Dashboard", "Assign Request", "Add Request", "View Request Details"],
          },
        ],
      },

      "Asset": {
        icon: <FaBox  size={16} />,
        
        topics: [
          {
            name: "Setup",
            subtopics: ["Set Up (Item Category)", "Set Up (Location Code)"],
          },
          {
            name: "Asset Item Type",
            subtopics: ["Add Item", "Inventory Items - Dashboard"],
          },
          {
            name: "Asset List",
            subtopics: ["Add Asset Item", "Asset Items Dashboard", "Update Warranty Details"],
          },
        ],
      },

       "Events": {
        icon: <MdEventNote  size={16} />,
        
        topics: [
          {
            name: "Event",
            subtopics: ["Personal Events"],
          },
          
        ],
      },

      // "HR/Admin Guide": {
      //   icon: <FaBuilding size={16} />,
      //   topics: [
      //     {
      //       name: "Employee Management",
      //       subtopics: ["Add Employee", "Edit Details", "Offboarding"],
      //     },
      //     {
      //       name: "Policy Setup",
      //       subtopics: ["Create Policies", "Define Rules", "Set Notifications"],
      //     },
      //     {
      //       name: "Attendance Settings",
      //       subtopics: ["Working Hours", "Holidays", "Special Days"],
      //     },
      //     {
      //       name: "Payroll Configuration",
      //       subtopics: ["Salary Components", "Deductions", "Bonus Setup"],
      //     },
      //     {
      //       name: "Appraisal System",
      //       subtopics: [
      //         "Create Templates",
      //         "Schedule Cycles",
      //         "Review Process",
      //       ],
      //     },
      //   ],
      // },
      // "Reports & Analytics": {
      //   icon: <FaChartBar size={16} />,
      //   topics: [
      //     {
      //       name: "Standard Reports",
      //       subtopics: [
      //         // "Attendance Reports",
      //         // "Leave Reports",
      //         // "Payroll Reports",
      //         "Standard Reports",
      //       ],
      //     },
      //     {
      //       name: "Custom Reports",
      //       // subtopics: ["Report Builder", "Schedule Reports", "Export Options"],
      //       subtopics: ["Custom Reports"],
      //     },
      //   ],
      // },
      // Integrations: {
      //   icon: <FaPlug size={16} />,
      //   topics: [
      //     {
      //       name: "Biometric device setup",
      //       subtopics: [
      //         "Device Configuration",
      //         "User Registration",
      //         "Troubleshooting",
      //       ],
      //     },
      //   ],
      // },
    },
  },
  crmanual: {
    title: "Client Relations Manual",
    icon: <FaHeartbeat size={20} />,
    description:
      "Guide to managing client relationships and using the CRM Application",
    subModules: {
      "Getting Started": {
        icon: <FaRocket size={16} />,
        topics: [
          {
            name: "Overview",
            subtopics: ["CRM Overview and Dashboard Navigation"],
          },
          {
            name: "Accessing Client Portal",
            subtopics: ["Accessing Client Portal"],
          },
          // {
          //   name: "Dashboard Navigation",
          //   subtopics: ["Dashboard Navigation"],
          // },
        ],
      },
      "Client Management": {
        icon: <FaUsers size={16} />,
        topics: [
          {
            name: "Customer List",
            subtopics: [
              "Add Customer",
              "Customer List Dashboard",
              "Customer Task List",
              "Customer Product Interest",
              "Customer Add Product Interest",
              "Customer TDS Received",
              "Customer Add TDS Record",
              "Update Customer",
              "Customer Document List",
              "Add New Document",
              "Customer View Audit",
              "Customer Generate Agreement",
              "Add Account",
            ],
          },
          {
            name: "Supplier",
            subtopics: [
              "Add Supplier",
              "Supplier List View",
              "Update Information",
              "Delete Information",
              "Document List",
              "Document List Updates",
              "Generate Supplier Agreement",
              "Add Task Detail",
              "View Product Interest",
              "Add Product Interest",
              "View TDS Received",
              "Add TDS Record",
            ],
          },
          {
            name: "My Partner List",
            subtopics: ["Add Channel Partner", "Add My Partner Task Detail", "My Partner Product Interest","Customer ProductInterest Data Dashboard","PartnerList - TDS Received", "PartnerList- Add TDS","Update Channel Partner","My PartnerList (Update Address)","My PartnerList (Add Address)","PartnerList (Update Other Contacts)","PartnerList (Add Other Contacts)","PartnerList (Add Bank Account)","PartnerList (Owned By)","PartnerList (Update Bank Account)"],
          },
          {
            name: "My Lead Management",
            subtopics: ["Lead Analytics and Actions Overview", "My Lead Management (Product Interest List)", "My LeadManagement (Add Product Interest)","My Lead Management (Task List View)","My Lead Management (Add Task List)","My Lead Management (Update)","My Lead Management (Add Leads)","My Lead Management (Status History)","My Lead Management (Current Task)","My Lead Management (Contact Details)"],
          },
          {
            name: "My Task Calender",
            subtopics: ["Task Calendar Overview"],
          },
          {
            name: "AMC item List",
            subtopics: ["AMC Item List Overview", "Add AMC Details", "AMC Item List (Updates)"],
          },
          {
            name: "GEM Tender List",
            subtopics: ["GEM Tender Data Overview", "Add GEM Tender", "GEM Tender Data List Update"],
          },
          {
            name: "Customer Mail Compaign",
            subtopics: ["Customer Mail Campaign Overview", "Customer Mail Campaign(List Response)","Add Campaign", "Update Customer Mail Campaign"],
          },
        ],
      },
      "CRM Setup": {
        icon: <FaCogs size={16} />,
        topics: [ 
           {
            name: "Customer Group",
            subtopics: ["Customer Group (View Record List)","Customer Group (Add)","Customer Group (Update)",],
          }, 
          {
            name: "Customer Secondary Group",
            subtopics: ["Customer Secondary Group (View Record List)","Customer Secondary Group (Add)","Customer Secondary Group (Update)",],
          },
          {
            name: "Lead Group",
            subtopics: ["Lead Group (View Record List)","Lead Group (Add)","Lead Group (Update)"],
          },
          {
            name: "Lead Secondary Group",
            subtopics: ["Lead Secondary Group (View Record List)","Lead Secondary Group (Add)","Lead Secondary Group (Update)"],
          },    
          {
            name: "Campaign Template",
            subtopics: [
              "Campaign Template (View Record List)","Add Campaign Template","Update Campaign Template"],
          },
          {
            name: "Task Category",
            subtopics: ["Task Category (View Record List)","Add Task Category","Update Task Category","Add Task SLA"],
          },
          {
            name: "Task Sub Category",
            subtopics: ["Task Sub Category (View Record List)","Add Task Sub Category","Update Task Sub Category"],
          }, 
        ],
      },
      // Reporting: {
      //   icon: <FaFileAlt size={16} />,
      //   topics: [
      //     {
      //       name: "Client Activity Reports",
      //       subtopics: [
      //         "Generate Reports",
      //         "Scheduled Reports",
      //         "Custom Filters",
      //       ],
      //     },
      //     {
      //       name: "Satisfaction Metrics",
      //       subtopics: [
      //         "NPS Score",
      //         "Satisfaction Trends",
      //         "Comparative Analysis",
      //       ],
      //     },
      //   ],
      // },
    },
  },

  projectmanual: {
    title: "Project Manual",
    icon: <FaBoxOpen size={20} />,
    description: "Complete documentation for project management system",
    subModules: {

      // officeSetup: {
      //   icon: <FaBuilding size={16} />,
      //   topics: [
          
      //     {
      //       name: "Equipments SetUp",
      //       subtopics: ["Add Equipments","Book Equipment"],
      //     },
          
          
          
      //   ],
      // },
     
      Product: {
        icon: <FaBoxOpen size={16} />,
        topics: [
          { name: "Product Category",
            subtopics: ["Add Product Category"],
          },
          {
            name: "Coupon Code",
            subtopics: ["Add Coupon Code"],
          },
          {
            name: "Tax Rate Code",
            subtopics: ["Add Tax Rate Code"],
          },
          {
            name: "Variation Name",
            subtopics: ["Add Variation Name"],
          },
          {
            name: "Product",
            subtopics: ["Add Product"],
          },
          {
            name: "Document Setup",
            subtopics: ["Add Document Type"],
          },
          //  {
          //   name: "Activity Creation",
          //   subtopics: ["Add Activity"],
          // },
          // {
          //   name: "Cretion of Process",
          //   subtopics: ["Add Process Template"],
          // },
          
          
        ],
      },
      Inventory: {
        icon: <FaWarehouse size={16} />,
        topics: [
          {
            name: "Inventory Setup",
            subtopics: ["Add Item Category","Add Location Code"],
          },
          {
            name: "Equipments SetUp",
            subtopics: ["Add Equipments","Book Equipment"],
          },
        ],
      },
      Project: {
        icon: <FaTasks  size={16} />,
        topics: [
          {
            name: "Project/work Under creation",
            subtopics: ["Add Project"],
          },
          
          {
            name: "Project Docket",
            subtopics: ["Add Docket"],
          },
          {
            name: "Project Alerts",
            subtopics: ["Add Project Alerts"],
          },
          {
            name: "Document Management",
            subtopics: ["New Folder"],
          },
           {
            name: "Activity Creation",
            subtopics: ["Add Activity"],
          },
          {
            name: "Cretion of Process",
            subtopics: ["Add Process Template"],
          },
        ],
      },
       Dashboard: {
        icon: <FaTachometerAlt size={16} />,
        topics: [
          {
            name: "Activity Dashboard",
            subtopics: ["My Activity Dashboard"],
          },
          {
            name: "Project Dashboard",
            subtopics: ["Project Margin Dashboard"],
          },
          {
            name: "Resource Utilisation",
            subtopics: ["Resource Utilisation Dashboard"],
          },
          {
            name: "item biling Dashboard",
            subtopics: ["Contract Items (Billing) Dashboard"],
          },
          {
            name: "User Activity management",
            subtopics: ["My Project Activity","My Docket Activity","My Review"],
          },
          
        ],
      },
      Dashboard: {
        icon: <FaBook size={16} />,
        topics: [
          {
            name: "Activity Dashboard",
            subtopics: ["My Activity Dashboard"],
          },
          {
            name: "Project Dashboard",
            subtopics: ["Project Margin Dashboard"],
          },
          {
            name: "Resource Utilisation",
            subtopics: ["Resource Utilisation Dashboard"],
          },
          {
            name: "item biling Dashboard",
            subtopics: ["Contract Items (Billing) Dashboard"],
          },
          {
            name: "User Activity management",
            subtopics: ["My Project Activity","My Docket Activity","My Review"],
          },
          
        ],
      },
    },
  },

  salesmanual: {
    title: "Sales Order and Purchases Manual",
    icon: <FaFileInvoiceDollar size={20} />,
    description: "Complete documentation for project management system",
    subModules: {

      Sales: {
        icon: <FaChartLine size={16} />,
        topics: [
          {
            name: "Sales Order",
            subtopics: ["Add Sales Order (Order Detail)","Add Sales Order (Order Item Detail)"],
          },
          //  {
          //   name: "Purchase Order",
          //   subtopics: ["Add Purchase Order (PO Detail)"],
          // },
          // {
          //   name: "Purchase Service",
          //   subtopics: ["Add Service Order"],
          // },
          // {
          //   name: "Delivery challan",
          //   subtopics: ["Add Delivery Challan"],
          // },
        ],
      },

      Purchase: {
        icon: <FaShoppingCart size={16} />,
        topics: [
          
           {
            name: "Purchase Order",
            subtopics: ["Add Purchase Order (PO Detail)"],
          },
          {
            name: "Purchase Service",
            subtopics: ["Add Service Order"],
          },
          {
            name: "Delivery challan",
            subtopics: ["Add Delivery Challan"],
          },
        ],
      },
     
      
    },
  },

  inventorymanual: {
    title: "Inventory Manual",
    icon: <FaBoxOpen size={20} />,
    description: "Complete documentation for inventory management system",
    subModules: {
      Introduction: {
        icon: <FaBook size={16} />,
        topics: [
          { name: "System Overview", subtopics: [] },
          {
            name: "Access Levels",
            subtopics: ["Admin Access", "User Access", "Limited Access"],
          },
          {
            name: "Basic Navigation",
            subtopics: ["Main Dashboard", "Quick Search", "Favorites"],
          },
        ],
      },
      "Inventory Management": {
        icon: <FaLayerGroup size={16} />,
        topics: [
          {
            name: "Adding Items",
            subtopics: ["Create New Item", "Bulk Upload", "Categories Setup"],
          },
          {
            name: "Stock Tracking",
            subtopics: [
              "Real-time Tracking",
              "Low Stock Alerts",
              "Stock Transfer",
            ],
          },
          {
            name: "Inventory Audits",
            subtopics: [
              "Schedule Audit",
              "Conduct Audit",
              "Resolve Discrepancies",
            ],
          },
          {
            name: "Supplier Management",
            subtopics: [
              "Add Supplier",
              "Performance Metrics",
              "Contact Records",
            ],
          },
          {
            name: "Reorder Process",
            subtopics: ["Set Thresholds", "Generate PO", "Track Orders"],
          },
        ],
      },
      Reporting: {
        icon: <FaChartBar size={16} />,
        topics: [
          {
            name: "Stock Levels",
            subtopics: ["Current Stock", "Historical Levels", "Forecasting"],
          },
          {
            name: "Movement History",
            subtopics: ["In/Out Logs", "Usage Patterns", "Seasonal Analysis"],
          },
          {
            name: "Custom Inventory Reports",
            subtopics: [
              "Report Builder",
              "Scheduled Exports",
              "Data Visualization",
            ],
          },
        ],
      },
    },
  },

  employeehrmsmanual: {
    title: "Employee Manual",
    icon: <FaBookOpen size={20} />,
    description: "Comprehensive guide for managing employee information, roles, attendance, and HR operations.",
    subModules: {
      "Getting started": {
        icon: <FaBook size={16} />,
        topics: [
          {
            name: "Dashboard",
            subtopics: ["Dashboard Overview HRMS"],
          },
          {
            name: "Login",
            subtopics: ["Login Module HRMS", "Forget PIN Module HRMS"],
          },
          
        ],
      },

      "Time Management": {
        icon: <FaClock  size={16} />,
        topics: [
          {
            name: "Attendance",
            subtopics: ["Attendance View For Employee HRMS", "Add Attendance For Employee HRMS"],
          },
          {
            name: "TimeSheet",
            subtopics: ["TimeSheet View", "Add Time Entry"],
          },
        ],
      },

      "Leave ": {
        icon: <FaCalendarCheck  size={16} />,
        topics: [
          {
            name: "Leave & Holidays",
            subtopics: ["Leave Management View","Apply for Leave","Holiday Calendar (Calendar View)","Holiday Calendar (List View)"],
          },
        ],
      },

      "Finance": {
        icon: <FaMoneyBillWave size={16} />,
        topics: [
          {
            name: "Finance",
            subtopics: ["My Claims View","Add New Claims", "Pay Slip View"],
          },
        ],
      },

      "Support": {
        icon: <FaHeadset  size={16} />,
        topics: [
          {
            name: "Support",
            subtopics: ["Help Desk", "Create New Ticket","Request Desk","New Request"],
          },
        ],
      },

      "Personal": {
        icon: <FaUserCircle  size={16} />,
        topics: [
          {
            name: "Profile & Wishes",
            subtopics: ["My Wishes","My Profile"],
          },
        ],
      },

    },
  },


});

const ManualModuleDetails = () => {
  const location = useLocation();
  const [moduleData, setModuleData] = useState(null);
  const [activeSubModule, setActiveSubModule] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMainModule, setActiveMainModule] = useState("hrmanual");
  const modules = getModuleData();

  useEffect(() => {
    // Determine which module to display based on URL
    const path = location.pathname;
    if (path.includes("hrmanual")) {
      setModuleData(modules.hrmanual);
      setActiveSubModule(Object.keys(modules.hrmanual.subModules)[0]);
      setActiveMainModule("hrmanual");
    } else if (path.includes("crmanual")) {
      setModuleData(modules.crmanual);
      setActiveSubModule(Object.keys(modules.crmanual.subModules)[0]);
      setActiveMainModule("crmanual");
    } else if (path.includes("projectmanual")) {
      setModuleData(modules.projectmanual);
      setActiveSubModule(Object.keys(modules.projectmanual.subModules)[0]);
      setActiveMainModule("projectmanual");
    } else if (path.includes("salesmanual")) {
      setModuleData(modules.salesmanual);
      setActiveSubModule(Object.keys(modules.salesmanual.subModules)[0]);
      setActiveMainModule("salesmanual");
    } else if (path.includes("employeehrmsmanual")) {
      setModuleData(modules.employeehrmsmanual);
      setActiveSubModule(Object.keys(modules.employeehrmsmanual.subModules)[0]);
      setActiveMainModule("employeehrmsmanual");
    } else if (path.includes("inventorymanual")) {
      setModuleData(modules.inventorymanual);
      setActiveSubModule(Object.keys(modules.inventorymanual.subModules)[0]);
      setActiveMainModule("inventorymanual");
    }
  }, [location.pathname]);

  const toggleTopicExpansion = (topicName) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicName]: !prev[topicName],
    }));
  };

  // Search across all sub-modules of the current main module
  const getAllTopicsForCurrentModule = () => {
    if (!moduleData) return [];

    let allTopics = [];
    // Iterate through all sub-modules of the current main module
    Object.entries(moduleData.subModules).forEach(
      ([subModuleName, subModuleData]) => {
        subModuleData.topics.forEach((topic) => {
          allTopics.push({
            ...topic,
            subModuleName: subModuleName, // Store the sub-module name with each topic
          });
        });
      }
    );
    return allTopics;
  };

  const filteredTopics = searchQuery
    ? getAllTopicsForCurrentModule().filter((topic) => {
        const query = searchQuery.toLowerCase();
        return (
          topic.name.toLowerCase().includes(query) ||
          (topic.subtopics &&
            topic.subtopics.some((subtopic) =>
              subtopic.toLowerCase().includes(query)
            ))
        );
      })
    : moduleData?.subModules[activeSubModule]?.topics || [];

  if (!moduleData) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <MainContainer>
            <LoadingState>
              <FaCog size={24} />
              Loading manual data...
            </LoadingState>
          </MainContainer>
        </AppContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <SidebarNav isOpen={sidebarOpen}>
          <NavHeader>
            <FaBook size={20} />
            <NavTitle>Knowledge Base</NavTitle>
          </NavHeader>

          <NavSearch>
            <SearchInput
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </NavSearch>

          <NavSection>
            <SectionTitle>Main Modules</SectionTitle>
            <NavItem
              active={activeMainModule === "hrmanual"}
              onClick={() => {
                setModuleData(modules.hrmanual);
                setActiveSubModule(Object.keys(modules.hrmanual.subModules)[0]);
                setActiveMainModule("hrmanual");
                setSidebarOpen(false);
                setSearchQuery("");
              }}
            >
              <FaUsers /> HR Manual
            </NavItem>
            <NavItem
              active={activeMainModule === "crmanual"}
              onClick={() => {
                setModuleData(modules.crmanual);
                setActiveSubModule(Object.keys(modules.crmanual.subModules)[0]);
                setActiveMainModule("crmanual");
                setSidebarOpen(false);
                setSearchQuery("");
              }}
            >
              <FaHeartbeat /> Client Relations
            </NavItem>
            
            <NavItem
              active={activeMainModule === "inventorymanual"}
              onClick={() => {
                setModuleData(modules.inventorymanual);
                setActiveSubModule(
                  Object.keys(modules.inventorymanual.subModules)[0]
                );
                setActiveMainModule("inventorymanual");
                setSidebarOpen(false);
                setSearchQuery("");
              }}
            >
              <FaBoxOpen /> Inventory
            </NavItem>

            <NavItem
              active={activeMainModule === "projectmanual"}
              onClick={() => {
                setModuleData(modules.projectmanual);
                setActiveSubModule(
                  Object.keys(modules.projectmanual.subModules)[0]
                );
                setActiveMainModule("projectmanual");
                setSidebarOpen(false);
                setSearchQuery("");
              }}
            >
              <FaProjectDiagram  /> Project Management
            </NavItem>

            <NavItem
              active={activeMainModule === "salesmanual"}
              onClick={() => {
                setModuleData(modules.salesmanual);
                setActiveSubModule(
                  Object.keys(modules.salesmanual.subModules)[0]
                );
                setActiveMainModule("salesmanual");
                setSidebarOpen(false);
                setSearchQuery("");
              }}
            >
              <FaFileInvoiceDollar  /> Sales Order and Purchases 
            </NavItem>

            <NavItem
              active={activeMainModule === "employeehrmsmanual"}
              onClick={() => {
                setModuleData(modules.employeehrmsmanual);
                setActiveSubModule(
                  Object.keys(modules.employeehrmsmanual.subModules)[0]
                );
                setActiveMainModule("employeehrmsmanual");
                setSidebarOpen(false);
                setSearchQuery("");
              }}
            >
              <FaUsersCog   /> Employee HRMS 
            </NavItem>

          </NavSection>

          {!searchQuery && (
            <NavSection>
              <SectionTitle>Sub-Modules</SectionTitle>
              {Object.entries(moduleData.subModules).map(
                ([subModule, data]) => (
                  <NavItem
                    key={subModule}
                    active={activeSubModule === subModule && !searchQuery}
                    onClick={() => {
                      setActiveSubModule(subModule);
                      setSidebarOpen(false);
                    }}
                  >
                    {data.icon}
                    {subModule}
                  </NavItem>
                )
              )}
            </NavSection>
          )}
        </SidebarNav>

        <MainContainer>
          <ContentHeader>
            <div>
              <PageTitle>
                {moduleData.icon}
                {moduleData.title}
              </PageTitle>
              <Breadcrumbs>
                <a href="/">
                  <FaHome size={14} /> Home
                </a>
                <span>/</span>
                <a href="/manual.html">Manuals</a>
                <span>/</span>
                <p>{moduleData.title}</p>
                {searchQuery && <span>/ Search: "{searchQuery}"</span>}
              </Breadcrumbs>
            </div>
          </ContentHeader>

          <ContentGrid>
            <ModuleCard>
              <ModuleHeader>
                <ModuleIcon>
                  {searchQuery ? (
                    <FaSearch size={20} />
                  ) : (
                    moduleData.subModules[activeSubModule].icon
                  )}
                </ModuleIcon>
                <div>
                  <ModuleTitle>
                    {searchQuery
                      ? `Search Results for "${searchQuery}"`
                      : activeSubModule}
                  </ModuleTitle>
                  <ModuleDescription>
                    {searchQuery
                      ? `Showing results from all ${moduleData.title} sub-modules`
                      : `Detailed instructions and procedures for ${activeSubModule.toLowerCase()}`}
                  </ModuleDescription>
                </div>
              </ModuleHeader>

              <TopicList>
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => {
                    const isExpanded = expandedTopics[topic.name] || false;
                    const hasSubtopics =
                      topic.subtopics && topic.subtopics.length > 0;

                    return (
                      <TopicItem key={`${topic.subModuleName}-${topic.name}`}>
                        {searchQuery && (
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: theme.colors.textLight,
                              marginBottom: "4px",
                            }}
                          >
                            {topic.subModuleName}
                          </div>
                        )}
                        <TopicButton
                          active={isExpanded}
                          onClick={() => toggleTopicExpansion(topic.name)}
                        >
                          <span>{topic.name}</span>
                          {hasSubtopics &&
                            (isExpanded ? (
                              <FaChevronDown size={16} />
                            ) : (
                              <FaChevronRight size={16} />
                            ))}
                        </TopicButton>

                        {hasSubtopics && (
                          <SubtopicList isOpen={isExpanded}>
                            {topic.subtopics.map((subtopic) => (
                              <SubtopicItem
                                key={subtopic}
                                href={`manualsteps.html?topic=${encodeURIComponent(
                                  subtopic
                                )}`}
                              >
                                {subtopic}
                              </SubtopicItem>
                            ))}
                          </SubtopicList>
                        )}
                      </TopicItem>
                    );
                  })
                ) : (
                  <p
                    style={{
                      padding: theme.spacing.md,
                      color: theme.colors.textLight,
                    }}
                  >
                    No topics found matching your search.
                  </p>
                )}
              </TopicList>
            </ModuleCard>

            <HelpCard>
              <HelpTitle>
                <FaQuestionCircle size={18} />
                Need Help?
              </HelpTitle>
              <HelpText>
                Can't find what you're looking for? Our support team is here to
                assist you with any questions or issues you may have.
              </HelpText>
              <HelpButton href="mailto:support@atomwalk.com">
                Contact Support
              </HelpButton>
            </HelpCard>
          </ContentGrid>
        </MainContainer>

        <MobileNavToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBook size={20} />
        </MobileNavToggle>
      </AppContainer>
    </ThemeProvider>
  );
};

export default ManualModuleDetails;