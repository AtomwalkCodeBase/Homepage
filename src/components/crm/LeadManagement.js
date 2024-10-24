import React from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Lead  from '../../assets/img/Mockup5-Lead.png'
import { ProcessFlow } from '../hrm/ProcessFlow'
const LeadManagement = () => {
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      title: "Lead Management",
      description: "Atomwalk CRM's Lead Management system helps businesses efficiently track and manage leads throughout their sales pipeline. Users can add, update, and categorize leads, mark them as active or inactive, and assign ownership for better accountability. This system ensures that leads are properly followed up, improving conversion rates and optimizing the sales process.",
      background: "#d6e7ff",
      img: `${Lead}`  // Add your image path here
    },
    {
      title: "Customer Management",
      description: "Atomwalk CRM's Customer Management system helps businesses organize and manage customer data, interactions, and communication history. It allows users to track customer preferences, purchase history, and provides tools to enhance customer retention and satisfaction.",
      background: "#ffe6cc",
      img: "customer-management-img.png"  // Add your image path here
    },
    // You can add more management types if needed
  ];

  // Function to determine which page configuration to use based on URL
  const getCurrentPageConfig = () => {
    if (location.pathname.includes('leadManagement')) {
      return managementPages[0]; // Lead Management data
    } else if (location.pathname.includes('customerManagement')) {
      return managementPages[1]; // Customer Management data
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
      <ProcessFlow data={"Claim"}></ProcessFlow>
    </div>
  )
}

export default LeadManagement;
