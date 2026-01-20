import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import TagImg from '../../assets/img/Step1_image.png'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import FmsDetails from './FmsDetails'
import { Helmet } from 'react-helmet-async'

function Fmsheropage() {
  return (
    <>
      <Helmet>
        <title>Facility Management | Atomwalk Technologies</title>
        <meta name="description" content="Atomwalk Technologies’ Facility Management ERP streamlines asset maintenance, space planning, vendor coordination, and compliance. With real-time dashboards, mobile access, and intelligent scheduling, organizations can reduce downtime, control costs, and run smarter, more efficient facilities." />
        <meta name="keywords" content="facility management software, facility management system, facility tracking software, facility disposal management software, facility monitoring system" />
        <link rel="canonical" href="https://home.atomwalk.com/facilitymanagement.html" />
      </Helmet>
      <LetsConnect title={"Next-Gen Facility Management: Smarter Spaces, Safer Systems"} description={"Atomwalk Technologies’ Facility Management ERP streamlines asset maintenance, space planning, vendor coordination, and compliance. With real-time dashboards, mobile access, and intelligent scheduling, organizations can reduce downtime, control costs, and run smarter, more efficient facilities."} background={"#faf0b1"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Facility"} />
      <KeyFeaturesWaste title={"Facility Management Ecosystem Stakeholders"} description={"Our ERP solution connects all key players in the waste management value chain, enabling seamless collaboration between:"}></KeyFeaturesWaste>
      <FmsDetails></FmsDetails>
    </>
  )
}

export default Fmsheropage
