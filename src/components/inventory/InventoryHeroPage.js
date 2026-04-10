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
      <LetsConnect
        title={"Smart Inventory Management"}
        description={"Track stock, optimize workflows, and gain real-time visibility to keep operations smooth and efficient."}
        background={"#9DF9F0"}
        lead={true}
        img={TagImg}
      />
      <KeyFeaturesInventory />
      <FeatureBenifits data={"Inventory"} />
      <NewFAQSection data={"Inventory"} />
    </>
  );
};

export default InventoryHeroPage;
