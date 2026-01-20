import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import TagImg from '../../assets/img/waste_man.png';
import LetsConnect from "../LetsConnect";
import KeyFeaturesWaste from "../wasteManagement/KeyFeaturesWaste";
import GlpDetails from "./GlpDetails";
import { Helmet } from "react-helmet-async";

const GlpHeroPage = () => {

  return (
    <>
      <Helmet>
        <title>Good Laboratory Practice | Atomwalk Technologies</title>
        <meta name="description" content="Atomwalk Technologies is a cloud-based ERP platform designed to bring efficiency, compliance, and data integrity to modern laboratories. With a dedicated GLP Study Module, Atomwalk helps labs streamline workflows while adhering to international quality standards." />
        <meta name="keywords" content="good laboratory practice, GLP software, GLP management system, GLP compliance, laboratory data integrity" />
        <link rel="canonical" href="https://home.atomwalk.com/glp.html" />
      </Helmet>
      <LetsConnect title={"Effortless compliance. Unwavering data"} description={"Atomwalk Technologies is a cloud-based ERP platform designed to bring efficiency, compliance, and data integrity to modern laboratories. With a dedicated GLP Study Module, Atomwalk helps labs streamline workflows while adhering to international quality standards."} background={"#fec55cff"} lead={true} img="https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/GLP_Hero_Img-1.png" />
      <FeatureBenifits data={"GLP"} />
      <KeyFeaturesWaste title={"GLP Unlocked for R&D, Clinical & Beyond"} description={"Unifying GLP standards to ensure data integrity from research bench to final report."}></KeyFeaturesWaste>
      <GlpDetails />

    </>
  );
};

export default GlpHeroPage;