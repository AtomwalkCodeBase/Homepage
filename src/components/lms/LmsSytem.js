import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Lead  from '../../assets/img/Mockup5-Lead.png'
import User  from '../../assets/img/user-mangerole.png'
import Customer  from '../../assets/img/SimplifiedEquipmentManagement.png'
import Partner  from '../../assets/img/labmentanat.png'
import Campaign  from '../../assets/img/Dashboardaand.png'
import Lab  from '../../assets/img/labexp.png'
import { ProcessFlow } from '../hrm/ProcessFlow'
import LmsFeatures from './LmsFeatures'

const LmsSytem = ({data}) => {
  const[showData,setShowData]=useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      title: "Enhanced User Management",
      titles: "UserManagement",
      description: "Atomwalk’s LEM ensures every role in the lab gets precisely what they need—empowering admins, managers, and users to focus on productivity without any roadblocks.",
      background: "#bbfcc0",
      img: `${Lead}`  // Add your image path here
    },
    {
      title: "Simplified Equipment Management",
      titles: "EquipmentManagement",
      description: "Say goodbye to scheduling conflicts. With Atomwalk’s LEM, you’ll always know which equipment is available, making the booking process seamless.",
      background: "#bbfcc0",
      img: `${Customer}`  // Add your image path here
    },
    {
      title: "Equipment Maintenance",
      titles: "EquipmentMaintenance",
      description: "Don’t let unexpected breakdowns slow you down. Atomwalk’s LEM sends alerts for maintenance and calibrations, ensuring minimal downtime and maximum lab productivity.",
      background: "#bbfcc0",
      img: `${Partner}`  // Add your image path here
    },
    {
      title: "Gain Insights with Report & Dashboard",
      titles: "ReportandDashboard",
      description: "Unlock the power of data with Atomwalk’s detailed reports and Dashboard. Gain clear insights into usage pattern of equpments and labs  ",
      background: "#bbfcc0",
      img: `${Campaign}`  // Add your image path here
    },
    {
      title: "User and Role Management",
      titles: "UserManagements",
      description: "Atomwalk’s LMS ensures Role-based access control to restrict data access based on user roles, and manage permissions to ensure secure and appropriate data access.",
       background: "#e8f4fc",
      img: `${User}`  // Add your image path here
    },
    {
      title: "Lab Process Template",
      titles: "LabProcess",
      description: "Provide a simplified way to manage experiment templates required for the laboratory. Include various experiment templates with necessary steps, required inventory, and equipment. This ensures optimized and error-free execution of experiments by lab users.",
      background: "#e8f4fc",
      img: `${Lab}`  // Add your image path here
    },
    {
      title: "Lab Experiment Project Execution",
      titles: "LabExperiment",
      description: "Provide a simplified way to manage experiment templates required for the laboratory. Include various experiment templates with necessary steps, required inventory, and equipment. This ensures optimized and error-free execution of experiments by lab users.",
      background: "#e8f4fc",
      img: `${Partner}`  // Add your image path here
    },
    {
      title: "PI with Report & Dashboard",
      titles: "LabExperiment",
      description: "Provides a Performance Indicator (PI) system integrated with detailed reports and interactive dashboards, offering real-time insights and tracking of key metrics for informed decision-making.",
      background: "#e8f4fc",
      img: `${Campaign}`  // Add your image path here
    },    
    // You can add more management types if needed
  ];

  // Function to determine which page configuration to use based on URL
  useEffect(()=>{
    if(location.pathname.includes('userManagement')){
      setShowData('userManagement')
    }
    else if(location.pathname.includes('equipmentManagement')){
        setShowData('equipmentManagement')
    }
    else if(location.pathname.includes('equipmentMaintenance')){
        setShowData('equipmentMaintenance')  
    }
    else if(location.pathname.includes('reportandDashboard')){
        setShowData('reportandDashboard')
    }
    else if(location.pathname.includes('userroleManagement')){
      setShowData('userroleManagement')
  }
   else if(location.pathname.includes('labProcessemplate')){
    setShowData('labProcessemplate')
   }
   else if(location.pathname.includes('labExperimentProject')){
     setShowData('labExperimentProject')
   }
   else if(location.pathname.includes('pIwithReport')){
     setShowData('pIwithReport')
   }
     },[location.pathname])
  const getCurrentPageConfig = () => {
    if (location.pathname.includes('userManagement')) {
      return managementPages[0]; // Lead Management data
    } else if (location.pathname.includes('equipmentManagement')) {
      return managementPages[1]; // Customer Management data
    }
    else if (location.pathname.includes('equipmentMaintenance')) {
      return managementPages[2]; // Customer Management data
    }
    else if (location.pathname.includes('reportandDashboard')) {
    return  managementPages[3]; // Customer Management data
}
else if (location.pathname.includes('userroleManagement')) {
  return managementPages[4]; // Customer Management data
}
else if (location.pathname.includes('labProcessemplate')) {
  return managementPages[5]; // Customer Management data
}
else if (location.pathname.includes('labExperimentProject')) {
  return managementPages[6]; // Customer Management data
}
else if (location.pathname.includes('pIwithReport')) {
  return managementPages[7]; // Customer Management data
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
      <ProcessFlow bgcolors={data?"#e8fafc":"#e8fcec"} data={currentPageConfig.titles}></ProcessFlow>
      <LmsFeatures bgcolors={data?"#e8fafc":"#e8fcec"} data={showData}></LmsFeatures>
    </div>
  )
}

export default LmsSytem;
