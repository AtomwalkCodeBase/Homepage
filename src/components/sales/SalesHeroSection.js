import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import KeyFeatureSales from "./KeyFeatureSales";
import TagImg from '../../assets/img/Sales&Procurement.png';
import LetsConnect from "../LetsConnect";
import NewFAQSection from "../hrm/NewFAQSection";
import { Helmet } from "react-helmet-async";



const SalesHeroSection = () => {
  // const [selectedIndustry, setSelectedIndustry] = useState("Manufacturing");

  return (
    <>
      <Helmet>
        <title>Sales & Procurement | Atomwalk Technologies</title>
        <meta name="description" content="Manages selling, buying, and supply of goods efficiently." />
        <meta name="keywords" content="sales and inventory management software, manufacturing sales procurement software, procurement and inventory management system, cloud procurement solution, order to cash software, cloud based sales software, procure to pay software, purchase order management software, PO management system" />
        <link rel="canonical" href="https://home.atomwalk.com/sales.html" />
      </Helmet>
      <LetsConnect title={"Simplify & Efficient Your Sales and Procurement Operations"} description={"Take control of your business with a seamless ERP solution that helps you manage sales orders, quotations, invoices, payments, procurement, inventory, and compliance—all in one place."} background={"#83f28f"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Sales and Procurement"} />
      <KeyFeatureSales />

      <NewFAQSection data={"sales"} />
    </>
  );
};

export default SalesHeroSection;