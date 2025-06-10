import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import TagImg from '../../assets/img/inventory-management-img.png';
import LetsConnect from "../LetsConnect";
import KeyFeaturesInventory from "./KeyFeaturesInventory";
import NewFAQSection from "../hrm/NewFAQSection";
// import KeyFeaturesProcess from "./KeyFeaturesProcess";




const InventoryHeroPage = () => {

  return (
    <>
       <LetsConnect title={"Inventory Management"} description={"Streamline your workflows, track progress, and ensure seamless project execution with Atomwalk’s comprehensive work order and project management solution. Optimize your team’s performance, manage resources, and stay on top of deadlines with complete visibility."} background={"#9DF9F0"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Inventory"} />
      <KeyFeaturesInventory/>
      

      <NewFAQSection data={"Inventory"} />
    </>
  );
};

export default InventoryHeroPage;
