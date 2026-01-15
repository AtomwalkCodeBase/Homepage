import React, { useEffect, useState } from 'react'
import LetsConnect from '../LetsConnect'
import { useLocation } from 'react-router-dom';
import Campaign from '../../assets/img/Dashboardaand.png'
import { ProcessFlow } from '../hrm/ProcessFlow';
import SalesFeatures from './SalesFeatures';
import Sales from '../../assets/img/Sales_Lifecycle.png';
import Procurement from '../../assets/img/Procurement.png';
import Compliance from '../../assets/img/complience.png';
import { Helmet } from "react-helmet-async";
const SalesSytem = () => {
  const location = useLocation();

  // Array of configurations for different pages
  const salesPages = [
    {
      path: "/saleslifecycle.html",
      seoTitle: "Sales Lifecycle Management Software | Atomwalk",
      metaDescription: "Manage work orders, invoicing, and payments with Atomwalk Sales Lifecycle Management.",
      keywords: "sales lifecycle management, sales process automation, sales ERP",
      canonical: "https://home.atomwalk.com/saleslifecycle.html",
      title: "Enhance Your Sales Lifecycle Management",
      titles: "Sales",
      description: "From work orders to invoicing, streamline your sales process for better control and business growth.",
      background: "#C7F98E",
      backgrounds: "#cefad0",
      img: Sales,
      showData: "saleslifecycle"
    },
    {
      path: "/procurement.html",
      seoTitle: "Procurement Management Software | Atomwalk",
      metaDescription: "Manage supplier sourcing, purchase orders, and payments efficiently with Atomwalk Procurement.",
      keywords: "procurement management system, purchase management software",
      canonical: "https://home.atomwalk.com/procurement.html",
      title: "Streamlined Procurement, Smarter Decisions",
      titles: "Procurement",
      description: "From supplier identification to payment settlement, manage every step of your procurement lifecycle.",
      background: "#fc6ae2",
      backgrounds: "#FED7F7",
      img: Procurement,
      showData: "procurement"
    },
    {
      path: "/compliance.html",
      seoTitle: "GST, TDS & Compliance Management | Atomwalk",
      metaDescription: "Ensure GST, TDS, and e-way bill compliance with automated workflows using Atomwalk.",
      keywords: "GST compliance software, TDS management system, e-way bill software",
      canonical: "https://home.atomwalk.com/compliance.html",
      title: "Master Your Compliance Lifecycle",
      titles: "Compliance",
      description: "Streamline GST, TDS, and e-way bill management to ensure effortless regulatory compliance.",
      background: "#FFF176",
      backgrounds: "#fff9c4",
      img: Compliance,
      showData: "compliance"
    },
    {
      path: "/salesreport.html",
      seoTitle: "Sales & Procurement Reports | Atomwalk",
      metaDescription: "Gain actionable insights with real-time sales and procurement reports and dashboards.",
      keywords: "sales reports dashboard, procurement analytics",
      canonical: "https://home.atomwalk.com/salesreport.html",
      title: "Gain Insights with Report of Sales & Procurement",
      titles: "Report",
      description: "Unlock the power of data with detailed reports and dashboards for better decisions.",
      background: "#FFF176",
      backgrounds: "#fff9c4",
      img: Campaign,
      showData: "salesreport"
    }
  ];
  const currentPage =
    salesPages.find(page => page.path === location.pathname) || salesPages[0];



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
        bgcolors={currentPage.backgrounds}
        data={currentPage.titles}
      />

      <SalesFeatures
        data={currentPage.showData}
        bgcolors={currentPage.backgrounds}
      />

    </div>
  )
}

export default SalesSytem;
