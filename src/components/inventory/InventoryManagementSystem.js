import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Report  from '../../assets/img/Dashboardaand.png'
import Project  from '../../assets/img/ProjectManage.png'
import Process  from '../../assets/img/inventory_operation.png'

import { ProcessFlow } from '../hrm/ProcessFlow'
import InventoryFeatures from './InventoryFeatures'
// import ProcessFeatures from './ProcessFeatures'
// import CrmFeatures from './CrmFeatures'
const InventoryManagementSystem = () => {
  const[showData,setShowData]=useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      title: "Inventory Operations: Precision in Stock Management",
      titles: "Inventory Operation",
      description: "Comprehensive solutions for tracking inventory, managing stock adjustments, and optimizing resources to meet the dynamic needs of manufacturing and production processes.",
      background: "#9DF9F0",
      img: `${Process}`  // Add your image path here
    },
    {
      title: "Integrated Warehouse Management",
      titles: "Warehouse Management",
      description: "Efficiently Link Sales Orders, Track Progress, and Optimize Resources for Manufacturing Excellence.",
      background: "#9DF9F0",
      img: `${Project}`  // Add your image path here
    },
    {
      title: "Advanced Dashboards for Project and Resource Management",
      titles: "Inventory Report & Dashboard",
      description: "Gain Real-Time Insights into Activity Progress, Project Margins, and Resource Utilization for Optimized Manufacturing Performance.",
      background: "#9DF9F0",
      img: `${Report}`  // Add your image path here
    },
    
  ];

  useEffect(()=>{
    if(location.pathname.includes('inventoryop')){
      setShowData('inventoryop')
    }
    else if(location.pathname.includes('warehouse')){
      setShowData('warehouse')
    }
    else{
      setShowData('inventoryreport')
    }
  },[location.pathname])

  const getCurrentPageConfig = () => {
    if (location.pathname.includes('inventoryop')) {
      return managementPages[0]; // Lead Management data
    } else if (location.pathname.includes('warehouse')) {
      return managementPages[1]; // Customer Management data
    }
    // else if (location.pathname.includes('useractivities')) {
    //   return managementPages[2]; // Customer Management data
    // }
    else if (location.pathname.includes('inventoryreport')) {
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
      <ProcessFlow bgcolors={"#D0FEF9"} data={currentPageConfig.titles}></ProcessFlow>
      {/* <CrmFeatures data={showData}></CrmFeatures> */}
      <InventoryFeatures data={showData}/>
      
    </div>
  )
}

export default InventoryManagementSystem;
