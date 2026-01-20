import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import TagImgSms from '../../assets/img/solar-step1 img.png'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import SmsDetails from './SmsDetails'
import { Helmet } from 'react-helmet-async'

function Smsheropage() {
  return (
    <>
      <Helmet>
        <title>Solar Management | Atomwalk Technologies</title>
        <meta name="description" content="Atomwalk Smart Solar Management System streamlines solar operations with an all-in-one AIoT-powered platform. It combines real-time monitoring, smart inventory tracking, and customer management in one place. Built-in AI and sensors turn data into actionable insights for early issue detection and smarter decisions. Ideal for scaling your business or optimizing daily operations." />
        <meta name="keywords" content="solar management software, solar monitoring system, solar inventory management, solar operations management, solar data analytics" />
        <link rel="canonical" href="https://home.atomwalk.com/solarmanagement.html" />
      </Helmet>
      <LetsConnect title={"Smart Solar Management: Real-Time Insight "} description={"Atomwalk Smart Solar Management System streamlines solar operations with an all-in-one AIoT-powered platform. It combines real-time monitoring, smart inventory tracking, and customer management in one place. Built-in AI and sensors turn data into actionable insights for early issue detection and smarter decisions. Ideal for scaling your business or optimizing daily operations."} background={"#d9f2e6"} lead={true} img={TagImgSms}></LetsConnect>
      <FeatureBenifits data={"Solar"} />
      <KeyFeaturesWaste title={"Key Collaborators to Intelligent Solar Infrastructure."} description={"Our Smart Solar Management System unifies all stakeholders on a single, user-friendly platform, ensuring seamless communication and efficient collaboration throughout the project lifecycle."}></KeyFeaturesWaste>
      <SmsDetails></SmsDetails>
    </>
  )
}

export default Smsheropage