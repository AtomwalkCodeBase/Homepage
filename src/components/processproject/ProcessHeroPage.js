import React from "react";
import styled from "styled-components";
import FeatureBenifits from "../FeatureBenifits";
import FAQSection from "../hrm/FAQSection";
import TagImg from '../../assets/img/ProcessProject.png';
import LetsConnect from "../LetsConnect";
import KeyFeaturesProcess from "./KeyFeaturesProcess";




const ProcessHeroPage = () => {

  return (
    <>
       <LetsConnect title={"Streamline Your Workorder Execution with Atomwalk Project Management"} description={"treamline your workflows, track progress, and ensure seamless project execution with Atomwalk’s comprehensive work order and project management solution. Optimize your team’s performance, manage resources, and stay on top of deadlines with complete visibility."} background={"#52f52f"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Process and Project"} />
      <KeyFeaturesProcess/>
      

      <FAQSection data={"equipment"} />
    </>
  );
};

export default ProcessHeroPage;