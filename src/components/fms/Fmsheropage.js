import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import TagImg from '../../assets/img/Step1_image.png'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import FmsDetails from './FmsDetails'

function Fmsheropage() {
  return (
    <>
            <LetsConnect title={"Smart Facility Management: Plan, Assign, Execute"} description={"Atomwalk FMS provides a centralized platform to assign, track, and update operational tasks across residential properties. Designed for service companies managing multiple apartments or buildings, our system ensures clear task visibility, status updates, and streamlined workflows between managers and field workers."} background={"#faf0b1"} lead={true} img={TagImg}></LetsConnect>
            <FeatureBenifits data={"Facility"} />
            <KeyFeaturesWaste title={"FMS in Action: The People & Their Roles"} description={"Our Facility Management System connects all essential players in the operations ecosystem—ensuring seamless coordination between administrators, on-ground teams, and clients."}></KeyFeaturesWaste>
            <FmsDetails></FmsDetails>
    </>
  )
}

export default Fmsheropage
