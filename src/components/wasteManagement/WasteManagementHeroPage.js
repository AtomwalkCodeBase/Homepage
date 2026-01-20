import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import TagImg from '../../assets/img/waste_man.png';
import LetsConnect from "../LetsConnect";
import KeyFeaturesWaste from "./KeyFeaturesWaste";
import WasteManagementDetails from "./WasteManagementDetails";
import { Helmet } from 'react-helmet-async';

const WasteManagementHeroPage = () => {

  return (
    <>
      <Helmet>
        <title>Waste Management | Atomwalk Technologies</title>
        <meta name="description" content="Handles collection, disposal, and recycling of waste efficiently." />
        <meta name="keywords" content="waste management software, waste management system, waste tracking software, waste disposal management software, waste monitoring system" />
        <link rel="canonical" href="https://home.atomwalk.com/wastemanagement.html" />
      </Helmet>
      <LetsConnect title={"Smart Waste Management: Optimize, Track, Sustain"} description={"Atomwalk Technologies’ Waste Management System streamlines the processes of waste collection, tracking, disposal, and recycling. With real-time monitoring, automated compliance, and blockchain security, businesses can reduce environmental impact, lower costs, and ensure responsible waste handling for a cleaner, greener future."} background={"#81EDFE"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Waste"} />
      <KeyFeaturesWaste />
      <WasteManagementDetails />

    </>
  );
};

export default WasteManagementHeroPage;