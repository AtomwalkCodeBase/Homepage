import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Lead  from '../../assets/img/Mockup5-Lead.png'
import Customer  from '../../assets/img/Customermage-removebg-preview.png'
import Partner  from '../../assets/img/Pattner.png'
import Campaign  from '../../assets/img/Campain.png'
import { ProcessFlow } from '../hrm/ProcessFlow'
// import CrmFeatures from './CrmFeatures'
const ProcessManagementSystem = () => {
  const[showData,setShowData]=useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      title: "Work Order Process Tamplete",
      titles: "Work Order",
      description: "Streamline workflows with customizable process templates for consistent and efficient project execution.",
      background: "#d6e7ff",
      img: `${Lead}`  // Add your image path here
    },
    {
      title: "Project Management",
      titles: "Project Management",
      description: "Efficiently plan, track, and manage projects with real-time progress monitoring, task allocation, and performance insights.",
      background: "#d6e7ff",
      img: `${Customer}`  // Add your image path here
    },
    {
      title: "User Activities",
      titles: "User Activities",
      description: "Track and manage user activities, assign tasks, monitor progress, and ensure alignment with organizational goals for better efficiency.",
      background: "#d6e7ff",
      img: `${Partner}`  // Add your image path here
    },
    {
      title: "Report & Dashboard",
      titles: "Report & Dashboard",
      description: "Gain actionable insights with comprehensive reports and interactive dashboards, enabling data-driven decision-making and performance tracking.",
      background: "#d6e7ff",
      img: `${Campaign}`  // Add your image path here
    },
    
  ];

  const getCurrentPageConfig = () => {
    if (location.pathname.includes('process')) {
      return managementPages[0]; // Lead Management data
    } else if (location.pathname.includes('project')) {
      return managementPages[1]; // Customer Management data
    }
    else if (location.pathname.includes('useractivities')) {
      return managementPages[2]; // Customer Management data
    }
    else if (location.pathname.includes('activityreport')) {
    return  managementPages[3]; // Customer Management data
}
    // Default to Lead Management if no match
    return managementPages[0];
  };

  const currentPageConfig = getCurrentPageConfig();

  return (
    <div>
      <LetsConnect 
        title={currentPageConfig.title} 
        description={currentPageConfig.description} 
        background={currentPageConfig.background} 
        img={currentPageConfig.img}
        lead={true}
      />
      <ProcessFlow bgcolors={"#e8f1fe"} data={currentPageConfig.titles}></ProcessFlow>
      {/* <CrmFeatures data={showData}></CrmFeatures> */}
    </div>
  )
}

export default ProcessManagementSystem;
