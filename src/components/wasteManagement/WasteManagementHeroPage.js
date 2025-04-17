import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import TagImg from '../../assets/img/waste_man.png';
import LetsConnect from "../LetsConnect";
import KeyFeaturesWaste from "./KeyFeaturesWaste";
import WasteManagementDetails from "./WasteManagementDetails";




const WasteManagementHeroPage = () => {

  return (
    <>
       <LetsConnect title={"Smart Waste Management: Optimize, Track, Sustain"} description={"Atomwalk Technologies’ Waste Management System streamlines the processes of waste collection, tracking, disposal, and recycling. With real-time monitoring, automated compliance, and blockchain security, businesses can reduce environmental impact, lower costs, and ensure responsible waste handling for a cleaner, greener future."} background={"#81EDFE"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Waste"} />
      <KeyFeaturesWaste/>
      {/* <ProcessFlow bgcolors={"#D0FEF9"} data={`Inventory Operation`}></ProcessFlow> */}
      <WasteManagementDetails/>
      
    </>
  );
};

export default WasteManagementHeroPage;
