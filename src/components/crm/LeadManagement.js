import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Lead  from '../../assets/img/Mockup5-Lead.png'
import Customer  from '../../assets/img/Customermage-removebg-preview.png'
import Partner  from '../../assets/img/Pattner.png'
import Campaign  from '../../assets/img/Campain.png'
import { ProcessFlow } from '../hrm/ProcessFlow'
import CrmFeatures from './CrmFeatures'
const LeadManagement = () => {
  const[showData,setShowData]=useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      title: "Lead Management",
      titles: "Lead",
      description: "Atomwalk CRM's Lead Management system helps businesses efficiently track and manage leads throughout their sales pipeline. Users can add, update, and categorize leads, mark them as active or inactive, and assign ownership for better accountability. This system ensures that leads are properly followed up, improving conversion rates and optimizing the sales process.",
      background: "#d6e7ff",
      img: `${Lead}`  // Add your image path here
    },
    {
      title: "Customer Management",
      titles: "Customer",
      description: "Atomwalk CRM's Customer Management system helps businesses organize and manage customer data, interactions, and communication history. It allows users to track customer preferences, purchase history, and provides tools to enhance customer retention and satisfaction.",
      background: "#d6e7ff",
      img: `${Customer}`  // Add your image path here
    },
    {
      title: "Channel Partner Management",
      titles: "Partner",
      description: "Atomwalk CRM's Channel Partner Management system enables businesses to effectively manage their relationships with partners. It helps track partner activities, agreements, and contributions, streamlining collaboration to drive mutual growth. The system also provides visibility into partner performance, ensuring transparency and maximizing the value of partnerships.",
      background: "#d6e7ff",
      img: `${Partner}`  // Add your image path here
    },
    {
      title: "Campaign Management",
      titles: "Campaign",
      description: "Atomwalk CRM's Campaign Management system allows businesses to plan, execute, and analyze marketing campaigns across multiple channels. It enables users to track campaign performance, manage budgets, and segment audiences for targeted outreach. The system provides real-time insights, helping to optimize strategies for better engagement and higher ROI.",
      background: "#d6e7ff",
      img: `${Campaign}`  // Add your image path here
    },
    
    // You can add more management types if needed
  ];

  // Function to determine which page configuration to use based on URL
  useEffect(()=>{
    if(location.pathname.includes('leadManagement')){
      setShowData('leadManagement')
    }
    else if(location.pathname.includes('CustomerManagement')){
      setShowData('CustomerManagement')
    }
    else if(location.pathname.includes('Channelpartner')){
      setShowData('Channelpartner')
    }
    else{
      setShowData('campaignManagement')
    }
  },[location.pathname])
  const getCurrentPageConfig = () => {
    if (location.pathname.includes('leadManagement')) {
      return managementPages[0]; // Lead Management data
    } else if (location.pathname.includes('CustomerManagement')) {
      return managementPages[1]; // Customer Management data
    }
    else if (location.pathname.includes('Channelpartner')) {
      return managementPages[2]; // Customer Management data
    }
    else if (location.pathname.includes('campaignManagement')) {
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
      <CrmFeatures data={showData}></CrmFeatures>
    </div>
  )
}

export default LeadManagement;
