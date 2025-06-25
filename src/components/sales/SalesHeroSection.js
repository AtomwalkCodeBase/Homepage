import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import KeyFeatureSales from "./KeyFeatureSales";
import TagImg from '../../assets/img/Sales&Procurement.png';
import LetsConnect from "../LetsConnect";
import NewFAQSection from "../hrm/NewFAQSection";


const SalesHeroSection = () => {
  // const [selectedIndustry, setSelectedIndustry] = useState("Manufacturing");

  return (
    <>
       <LetsConnect title={"Simplify & Efficient Your Sales and Procurement Operations"} description={"Take control of your business with a seamless ERP solution that helps you manage sales orders, quotations, invoices, payments, procurement, inventory, and compliance—all in one place."} background={"#83f28f"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Sales and Procurement"} />
      <KeyFeatureSales/>

      <NewFAQSection data={"sales"} />
    </>
  );
};

export default SalesHeroSection;