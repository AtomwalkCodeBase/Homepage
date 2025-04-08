import React from "react";
import styled from "styled-components";
import FeatureBenifits from "../FeatureBenifits";
import FAQSection from "../hrm/FAQSection";
import TagImg from '../../assets/img/waste_man.png';
import LetsConnect from "../LetsConnect";
import NewFAQSection from "../hrm/NewFAQSection";
import KeyFeaturesWaste from "./KeyFeaturesWaste";
import WasteManagementDetails from "./WasteManagementDetails";
import { ProcessFlow } from "../hrm/ProcessFlow";




const WasteManagementHeroPage = () => {

  return (
    <>
       <LetsConnect title={"Smart Waste Management: Optimize, Track, Sustain"} description={"Atomwalk Technologies’ Waste Management System streamlines waste tracking, disposal, and recycling. With real-time monitoring, compliance automation, and blockchain security, businesses can minimize environmental impact, reduce costs, and ensure responsible waste handling for a cleaner, greener future."} background={"#81EDFE"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Waste"} />
      <KeyFeaturesWaste/>
      {/* <ProcessFlow bgcolors={"#D0FEF9"} data={`Inventory Operation`}></ProcessFlow> */}
      <WasteManagementDetails/>
      
    </>
  );
};

export default WasteManagementHeroPage;
