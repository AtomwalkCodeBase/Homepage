import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Report  from '../../assets/img/Dashboardaand.png'
import Project  from '../../assets/img/ProjectManage.png'
import Process  from '../../assets/img/ProcessTamplete.png'

import { ProcessFlow } from '../hrm/ProcessFlow'
import ProcessFeatures from './ProcessFeatures'
// import CrmFeatures from './CrmFeatures'
const ProcessManagementSystem = () => {
  const[showData,setShowData]=useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      title: "Process Operations for Every Business Need",
      titles: "Work Order",
      description: "Comprehensive Solutions for Inventory, Equipment, Documentation, and Process Management.",
      background: "#ADEBF3",
      img: `${Process}`  // Add your image path here
    },
    {
      title: "Integrated Project and Activity Management",
      titles: "Project Management",
      description: "Efficiently Link Sales Orders, Track Progress, and Optimize Resources for Manufacturing Excellence.",
      background: "#ADEBF3",
      img: `${Project}`  // Add your image path here
    },
    // {
    //   title: "User Activities",
    //   titles: "User Activities",
    //   description: "Track and manage user activities, assign tasks, monitor progress, and ensure alignment with organizational goals for better efficiency.",
    //   background: "#d6e7ff",
    //   img: `${Partner}`  // Add your image path here
    // },
    {
      title: "Advanced Dashboards for Project and Resource Management",
      titles: "Report & Dashboard",
      description: "Gain Real-Time Insights into Activity Progress, Project Margins, and Resource Utilization for Optimized Manufacturing Performance.",
      background: "#ADEBF3",
      img: `${Report}`  // Add your image path here
    },
    
  ];

  useEffect(()=>{
    if(location.pathname.includes('process')){
      setShowData('process')
    }
    else if(location.pathname.includes('project')){
      setShowData('project')
    }
    else{
      setShowData('activityreport')
    }
  },[location.pathname])

  const getCurrentPageConfig = () => {
    if (location.pathname.includes('process')) {
      return managementPages[0]; // Lead Management data
    } else if (location.pathname.includes('project')) {
      return managementPages[1]; // Customer Management data
    }
    // else if (location.pathname.includes('useractivities')) {
    //   return managementPages[2]; // Customer Management data
    // }
    else if (location.pathname.includes('activityreport')) {
    return  managementPages[2]; // Customer Management data
    }
    // Default to Lead Management if no match
    return managementPages[2];
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
      <ProcessFlow bgcolors={"#EAFCFF"} data={currentPageConfig.titles}></ProcessFlow>
      {/* <CrmFeatures data={showData}></CrmFeatures> */}
      <ProcessFeatures data={showData}/>
    </div>
  )
}

export default ProcessManagementSystem;
