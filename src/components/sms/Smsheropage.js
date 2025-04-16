import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import TagImg from '../../assets/img/Step1_image.png'
import TagImgSms from '../../assets/img/solar-step1 img.png'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import SmsDetails from './SmsDetails'

function Smsheropage() {
  return (
    <>
            <LetsConnect title={"Smart Solar Management: Track, Manage, Maximize"} description={"Atomwalk Solar Management System provides a robust platform to monitor and manage solar energy production through intelligent automation and real-time data insights. Designed for both industrial and residential setups, our system ensures that solar energy is harnessed efficiently and monitored sustainably."} background={"#BEE4D0"} lead={true} img={TagImgSms}></LetsConnect>
            <FeatureBenifits data={"Solar"} />
            <KeyFeaturesWaste title={"Solar Management Ecosystem Stakeholders"} description={"Our Facility Management System connects all essential players in the operations ecosystem—ensuring seamless coordination between administrators, on-ground teams, and clients."}></KeyFeaturesWaste>
            <SmsDetails></SmsDetails>
    </>
  )
}

export default Smsheropage
