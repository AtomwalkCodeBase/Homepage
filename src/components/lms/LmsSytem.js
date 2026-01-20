import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Lead from '../../assets/img/Mockup5-Lead.png'
import User from '../../assets/img/user-mangerole.png'
import Customer from '../../assets/img/SimplifiedEquipmentManagement.png'
import Partner from '../../assets/img/labmentanat.png'
import Campaign from '../../assets/img/Dashboardaand.png'
import Lab from '../../assets/img/labexp.png'
import { ProcessFlow } from '../hrm/ProcessFlow'
import LmsFeatures from './LmsFeatures'
import { Helmet } from 'react-helmet-async'

const LmsSytem = ({ data }) => {
  const [showData, setShowData] = useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const lmsPages = [
    {
      path: "/userManagement.html",
      seoTitle: "User Management System | Atomwalk LMS",
      metaDescription: "Role-based user management system for labs with secure access control using Atomwalk LMS.",
      keywords: "user management system, role based access, lab user management",
      canonical: "https://home.atomwalk.com/userManagement.html",
      title: "Enhanced User Management",
      titles: "UserManagement",
      description: "Atomwalk’s LEM ensures every role in the lab gets precisely what they need—empowering admins, managers, and users to focus on productivity without any roadblocks.  ",
      background: "#bbfcc0",
      img: Lead,
      showData: "userManagement",
      isLms: false
    },
    {
      path: "/equipmentManagement.html",
      seoTitle: "Equipment Management Software | Atomwalk LMS",
      metaDescription: "Manage lab equipment availability, booking, and usage with Atomwalk LMS.",
      keywords: "Real-Time Equipment Availability & Booking, Smart Equipment Scheduling with Live Calendar, Easy Booking, Modification & Cancellation, Admin & Manager Control Over Equipment Usage, Lab Admin User Management Software",
      canonical: "https://home.atomwalk.com/equipmentManagement.html",
      title: "Simplified Equipment Management",
      titles: "EquipmentManagement",
      description: "Say goodbye to scheduling conflicts. With Atomwalk’s LEM, you’ll always know which equipment is available, making the booking process seamless.",
      background: "#bbfcc0",
      img: Customer,
      showData: "equipmentManagement",
      isLms: false
    },
    {
      path: "/equipmentMaintenance.html",
      seoTitle: "Equipment Maintenance Management | Atomwalk LMS",
      metaDescription: "Automated alerts for lab equipment maintenance and calibration.",
      keywords: "Automated Maintenance & Calibration Alerts, Preventive Maintenance Scheduling for Lab Equipment, Block Equipment During Maintenance Periods, Reduce Downtime & Extend Equipment Lifespan",
      canonical: "https://home.atomwalk.com/equipmentMaintenance.html",
      title: "Equipment Maintenance",
      titles: "EquipmentMaintenance",
      description: "Don’t let unexpected breakdowns slow you down. Atomwalk’s LEM sends alerts for maintenance and calibrations, ensuring minimal downtime and maximum lab productivity.",
      background: "#bbfcc0",
      img: Partner,
      showData: "equipmentMaintenance",
      isLms: false
    },
    {
      path: "/reportandDashboard.html",
      seoTitle: "Lab Reports & Dashboard | Atomwalk LMS",
      metaDescription: "Real-time dashboards and reports for lab usage and performance insights.",
      keywords: "Real-Time Lab Equipment Usage Reports, Centralized Dashboard for Lab Operations, Audit-Ready Logs & Compliance Records, Data-Driven Insights for Equipment Optimization, Improve Efficiency & Reduce Equipment Downtime",
      canonical: "https://home.atomwalk.com/reportandDashboard.html",
      title: "Gain Insights with Report & Dashboard",
      titles: "ReportandDashboard",
      description: "Unlock the power of data with Atomwalk’s detailed reports and Dashboard. Gain clear insights into usage pattern of equpments and labs ",
      background: "#bbfcc0",
      img: Campaign,
      showData: "reportandDashboard",
      isLms: false
    },
    {
      path: "/userroleManagement.html",
      seoTitle: "User & Role Management | Atomwalk LMS",
      metaDescription: "Role-based access control with secure permission management.",
      keywords: "Role-Based Lab Management System, Laboratory User Access Management, Equipment Booking Management System, Laboratory Equipment Usage Tracking, Lab Admin User Management Software",
      canonical: "https://home.atomwalk.com/userroleManagement.html",
      title: "User and Role Management",
      titles: "UserManagements",
      description: "Atomwalk’s LMS ensures Role-based access control to restrict data access based on user roles, and manage permissions to ensure secure and appropriate data access.",
      background: "#e8f4fc",
      img: User,
      showData: "userroleManagement",
      isLms: true
    },
    {
      path: "/labProcessemplate.html",
      seoTitle: "Lab Process Templates | Atomwalk LMS",
      metaDescription: "Manage standardized lab experiment templates efficiently.",
      keywords: "lab process templates, experiment workflow management,electronic lab documentation software,SOP management software for laboratories",
      canonical: "https://home.atomwalk.com/labProcessemplate.html",
      title: "Lab Process Template",
      titles: "LabProcess",
      description: "Provide a simplified way to manage experiment templates required for the laboratory. Include various experiment templates with necessary steps, required inventory, and equipment. This ensures optimized and error-free execution of experiments by lab users.",
      background: "#e8f4fc",
      img: Lab,
      showData: "labProcessemplate",
      isLms: true
    },
    {
      path: "/labExperimentProject.html",
      seoTitle: "Lab Experiment Project Execution | Atomwalk LMS",
      metaDescription: "Execute and monitor lab experiment projects with real-time tracking.",
      keywords: "LIMS project management, laboratory project management software, lab research project tracking system, multi experiment project management LIMS, research lab management software, Lab students, research Students",
      canonical: "https://home.atomwalk.com/labExperimentProject.html",
      title: "Lab Experiment Project Execution",
      titles: "LabExperiment",
      description: "Provide a simplified way to manage experiment templates required for the laboratory. Include various experiment templates with necessary steps, required inventory, and equipment. This ensures optimized and error-free execution of experiments by lab users.",
      background: "#e8f4fc",
      img: Partner,
      showData: "labExperimentProject",
      isLms: true
    },
    {
      path: "/pIwithReport.html",
      seoTitle: "Performance Indicators & Reports | Atomwalk LMS",
      metaDescription: "Track KPIs with real-time performance dashboards and reports.",
      keywords: "best LIMS software for research labs, LIMS software demo for laboratories, LIMS experiment management solution, LIMS software India",
      canonical: "https://home.atomwalk.com/pIwithReport.html",
      title: "PI with Report & Dashboard",
      titles: "LabExperiment",
      description: "Provides a Performance Indicator (PI) system integrated with detailed reports and interactive dashboards, offering real-time insights and tracking of key metrics for informed decision-making.",
      background: "#e8f4fc",
      img: Campaign,
      showData: "pIwithReport",
      isLms: true
    }
  ];

  const currentPage =
    lmsPages.find(page => page.path === location.pathname) || lmsPages[0];


  return (
    <div>
      <Helmet>
        <title>{currentPage.seoTitle}</title>
        <meta name="description" content={currentPage.metaDescription} />
        <meta name="keywords" content={currentPage.keywords} />
        <link rel="canonical" href={currentPage.canonical} />
      </Helmet>
      <LetsConnect
        title={currentPage.title}
        description={currentPage.description}
        background={currentPage.background}
        img={currentPage.img}
        lead={true}
      />

      <ProcessFlow
        bgcolors={currentPage.isLms ? "#e8fafc" : "#e8fcec"}
        data={currentPage.titles}
      />

      <LmsFeatures
        bgcolors={currentPage.isLms ? "#e8fafc" : "#e8fcec"}
        data={currentPage.showData}
      />

    </div>
  )
}

export default LmsSytem;
