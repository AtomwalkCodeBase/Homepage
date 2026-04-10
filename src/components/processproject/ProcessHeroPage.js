import React from "react";
import FeatureBenifits from "../FeatureBenifits";
import TagImg from '../../assets/img/ProcessProject.png';
import LetsConnect from "../LetsConnect";
import KeyFeaturesProcess from "./KeyFeaturesProcess";
import NewFAQSection from "../hrm/NewFAQSection";

const ProcessHeroPage = () => {

  return (
    <>
      <LetsConnect
        title={"Smarter Workorder Management"}
        description={"Plan, track, and execute projects with real-time visibility—keep teams aligned and deliver on time."}
        background={"#ADEBF3"}
        lead={true}
        img={TagImg}
      />
      <KeyFeaturesProcess />
      <FeatureBenifits data={"Process and Project"} />
      <NewFAQSection data={'Project'} />
    </>
  );
};

export default ProcessHeroPage;