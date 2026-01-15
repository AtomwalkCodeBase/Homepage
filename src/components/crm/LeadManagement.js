import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom'
import Lead from '../../assets/img/Mockup5-Lead.png'
import Customer from '../../assets/img/Customermage-removebg-preview.png'
import Partner from '../../assets/img/Pattner.png'
import Campaign from '../../assets/img/Campain.png'
import AMC from '../../assets/img/amc.png'
import { ProcessFlow } from '../hrm/ProcessFlow'
import CrmFeatures from './CrmFeatures'
import { Helmet } from 'react-helmet-async';
const LeadManagement = () => {
  const [showData, setShowData] = useState("");
  const location = useLocation();

  // Array of configurations for different pages
  const managementPages = [
    {
      path: "leadManagement",
      heding: "Lead Management",
      title: "Lead Management | Atomwalk Technologies",
      metaDescription: "Efficiently track, manage, and convert leads to boost sales and grow your business.",
      keywords: "Lead management software, CRM lead management, sales lead tracking",
      canonical: "https://home.atomwalk.com/leadManagement.html",
      pageTitle: "Lead Management",
      titles: "Lead",
      background: "#d6e7ff",
      img: Lead,
      description: "Atomwalk CRM's Lead Management system helps businesses efficiently track and manage leads throughout their sales pipeline. Users can add, update, and categorize leads, mark them as active or inactive, and assign ownership for better accountability. This system ensures that leads are properly followed up, improving conversion rates and optimizing the sales process.",

    },
    {
      path: "CustomerManagement",
      heding: "Customer Management",
      title: "Customer Management | Atomwalk Technologies",
      metaDescription: "Manage customer data, invoices, payments, and relationships with Atomwalk CRM.",
      keywords: "Customer management CRM, customer data management software",
      canonical: "https://home.atomwalk.com/CustomerManagement.html",
      pageTitle: "Customer Management",
      titles: "Customer",
      description: 'Atomwalk CRM simplifies organizing and maintaining customer data. Users can view, import, and update customer lists, manage tasks, add and upload TDS details, handle invoices and payments, and associate product interests for personalized engagement. These features streamline customer operations and enhance service efficiency.',
      background: "#d6e7ff",
      img: Customer
    },
    {
      path: "Channelpartner",
      heding: "Channel Partner Management",
      title: "Channel Partner Management | Atomwalk Technologies",
      metaDescription: "Track, manage, and grow channel partner relationships using Atomwalk CRM.",
      keywords: "Channel partner CRM, partner management system",
      canonical: "https://home.atomwalk.com/Channelpartner.html",
      pageTitle: "Channel Partner Management",
      titles: "Partner",
      description: "Atomwalk CRM's Channel Partner Management system enables businesses to effectively manage their relationships with partners. It helps track partner activities, agreements, and contributions, streamlining collaboration to drive mutual growth. The system also provides visibility into partner performance, ensuring transparency and maximizing the value of partnerships.",
      background: "#d6e7ff",
      img: Partner
    },
    {
      path: "campaignManagement",
      heding: "Campaign Management",
      title: "Campaign Management | Atomwalk Technologies",
      metaDescription: "Plan, execute, and analyze marketing campaigns with real-time insights.",
      keywords: "Campaign management CRM, marketing campaign tracking",
      canonical: "https://home.atomwalk.com/campaignManagement.html",
      pageTitle: "Campaign Management",
      titles: "Campaign",
      description: "Atomwalk CRM's Campaign Management system allows businesses to plan, execute, and analyze marketing campaigns across multiple channels. It enables users to track campaign performance, manage budgets, and segment audiences for targeted outreach. The system provides real-time insights, helping to optimize strategies for better engagement and higher ROI.",
      background: "#d6e7ff",
      img: Campaign
    },
    {
      path: "aMCTracking",
      heding: "Annual Maintenance Contract",
      title: "AMC Tracking | Atomwalk Technologies",
      metaDescription: "Manage Annual Maintenance Contracts efficiently with Atomwalk CRM.",
      keywords: "AMC tracking software, annual maintenance CRM",
      canonical: "https://home.atomwalk.com/aMCTracking.html",
      pageTitle: "Annual Maintenance Contract",
      titles: "AnnualMaintenance",
      description: "Efficiently manage, update, and view Annual Maintenance Contracts with Atomwalk CRM.",
      background: "#d6e7ff",
      img: AMC
    }
  ];


  // Function to determine which page configuration to use based on URL
  useEffect(() => {
    if (location.pathname.includes('leadManagement')) {
      setShowData('leadManagement')
    }
    else if (location.pathname.includes('CustomerManagement')) {
      setShowData('CustomerManagement')
    }
    else if (location.pathname.includes('Channelpartner')) {
      setShowData('Channelpartner')
    }
    else if (location.pathname.includes('aMCTracking')) {
      setShowData('aMCTracking')
    }
    else {
      setShowData('campaignManagement')
    }
  }, [location.pathname])
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
      return managementPages[3]; // Customer Management data
    }
    else if (location.pathname.includes('aMCTracking')) {
      return managementPages[4]; // Customer Management data
    }
    // Default to Lead Management if no match
    return managementPages[0];
  };

  const currentPageConfig =
    managementPages.find(page =>
      location.pathname.includes(page.path)
    ) || managementPages[0];


  return (
    <div>
      <Helmet>
        <title>{currentPageConfig.title}</title>
        <meta name="description" content={currentPageConfig.metaDescription} />
        <meta name="keywords" content={currentPageConfig.keywords} />
        <link rel="canonical" href={currentPageConfig.canonical} />
      </Helmet>

      <LetsConnect
        title={currentPageConfig.heding}
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
