import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import TagImg from '../../assets/img/Step1_image.png'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import FmsDetails from './FmsDetails'

function Fmsheropage() {
  return (
    <>
            <LetsConnect title={"Next-Gen Facility Management: Smarter Spaces, Safer Systems"} description={"Atomwalk Technologies’ Facility Management ERP streamlines asset maintenance, space planning, vendor coordination, and compliance. With real-time dashboards, mobile access, and intelligent scheduling, organizations can reduce downtime, control costs, and run smarter, more efficient facilities."} background={"#faf0b1"} lead={true} img={TagImg}></LetsConnect>
            <FeatureBenifits data={"Facility"} />
            <KeyFeaturesWaste title={"Facility Management Ecosystem Stakeholders"} description={"Our ERP solution connects all key players in the waste management value chain, enabling seamless collaboration between:"}></KeyFeaturesWaste>
            <FmsDetails></FmsDetails>
    </>
  )
}

export default Fmsheropage
