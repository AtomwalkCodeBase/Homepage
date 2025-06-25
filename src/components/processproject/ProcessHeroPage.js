import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import TagImg from '../../assets/img/ProcessProject.png';
import LetsConnect from "../LetsConnect";
import KeyFeaturesProcess from "./KeyFeaturesProcess";
import NewFAQSection from "../hrm/NewFAQSection";

const ProcessHeroPage = () => {

  return (
    <>
       <LetsConnect title={"Streamline Your Workorder Execution with Atomwalk Project Management"} description={"Streamline your workflows, track progress, and ensure seamless project execution with Atomwalk’s comprehensive work order and project management solution. Optimize your team’s performance, manage resources, and stay on top of deadlines with complete visibility."} background={"#ADEBF3"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Process and Project"} />
      <KeyFeaturesProcess/>
      
      <NewFAQSection data={'Project'}/>
    </>
  );
};

export default ProcessHeroPage;