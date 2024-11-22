import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Lead  from '../../assets/img/Mockup5-Lead.png'
import Customer  from '../../assets/img/SimplifiedEquipmentManagement.png'
import Partner  from '../../assets/img/labmentanat.png'
import Campaign  from '../../assets/img/Dashboardaand.png'
import { ProcessFlow } from '../hrm/ProcessFlow'
import LmsFeatures from './LmsFeatures'

const LmsSytem = () => {
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
      <ProcessFlow bgcolors={"#e8fcec"} data={currentPageConfig.titles}></ProcessFlow>
      <LmsFeatures data={showData}></LmsFeatures>
    </div>
  )
}

export default LmsSytem;
