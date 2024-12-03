import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom';
import Customer  from '../../assets/img/SimplifiedEquipmentManagement.png'
import Partner  from '../../assets/img/labmentanat.png'
import Campaign  from '../../assets/img/Dashboardaand.png'
import { ProcessFlow } from '../hrm/ProcessFlow';
import SalesFeatures from './SalesFeatures';
import Sales from '../../assets/img/Sales_Lifecycle.png';
import Procurement from '../../assets/img/Procurement.png';
import Compliance from '../../assets/img/complience.png';
import { SalesProcessFlow } from './SalesProcessFlow'

const SalesSytem = () => {
  const[showData,setShowData]=useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      title: "Enhance Your Sales Lifecycle Management",
      titles: "Sales",
      description: "From work orders to invoicing, streamline your sales process for better control and business growth.",
      background: "#C7F98E",
      backgrounds: "#cefad0",
      img: `${Sales}`  // Add your image path here
    },
    {
      title: "Streamlined Procurement, Smarter Decisions",
      titles: "Procurement",
      description: "From supplier identification to payment settlement, manage every step of your procurement lifecycle with efficiency and control.",
      background: "#fc6ae2",
      backgrounds: "#FED7F7",
      img: `${Procurement}`  // Add your image path here
    },
    {
      title: "Master Your Compliance Lifecycle",
      titles: "Compliance",
      description: "Streamline GST, TDS, and e-way bill management with Atomwalk to ensure effortless adherence to regulatory requirements.",
      background: "#FFF176",
      backgrounds: "#fff9c4",
      img: `${Compliance}`  // Add your image path here
    },
    {
      title: "Gain Insights with Report of Sales & Procurement",
      titles: "Report",
      description: "Unlock the power of data with Atomwalk’s detailed reports and Dashboard. Gain clear insights into usage pattern of equpments and labs  ",
      background: "#FFF176",
      backgrounds: "#fff9c4",
      img: `${Campaign}`  // Add your image path here
    },
    
    
    // You can add more management types if needed
  ];

  // Function to determine which page configuration to use based on URL
  useEffect(()=>{
    if(location.pathname.includes('saleslifecycle')){
      setShowData('saleslifecycle')
    }
    else if(location.pathname.includes('procurement')){
        setShowData('procurement')
    }
    else if(location.pathname.includes('compliance')){
        setShowData('compliance')
        
    }
    else if(location.pathname.includes('salesreport')){
      setShowData('salesreport')
      
  }
    else if(location.pathname.includes('invoicemanage')){
      setShowData('invoicemanage')
    }
    else if(location.pathname.includes('invoiceaction')){
      setShowData('invoiceaction')
    }
    else if(location.pathname.includes('paymentmanage')){
        setShowData('paymentmanage')
    }
  },[location.pathname])
  const getCurrentPageConfig = () => {
    if (location.pathname.includes('saleslifecycle')) {
      return managementPages[0];
    } else if (location.pathname.includes('procurement')) {
      return managementPages[1];
    }
    else if (location.pathname.includes('compliance')) {
      return managementPages[2]; // Customer Management data
    }
    else if (location.pathname.includes('salesreport')) {
      return managementPages[3]; // Customer Management data
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
      {/* <ProcessFlow bgcolors={"#e8fcec"} data={currentPageConfig.titles}></ProcessFlow> */}
      <SalesProcessFlow data={currentPageConfig.titles} bgcolors={currentPageConfig.backgrounds}/>
      <SalesFeatures data={showData} bgcolors={currentPageConfig.backgrounds}></SalesFeatures>
    </div>
  )
}

export default SalesSytem;
