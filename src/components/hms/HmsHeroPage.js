import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import TagImg from '../../assets/img/HMS_step1.png'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import HmsDetails from './HmsDetails'
import { Helmet } from 'react-helmet-async'

const HmsHeroPage = () => {
  return (
    <>
      <Helmet>
        <title>Hospital Management | Atomwalk Technologies</title>
        <meta name="description" content="Atomwalk HMS provides a centralized platform to manage every aspect of hospital operations, from patient registration to staff scheduling. Designed for hospitals and healthcare providers, it streamlines patient data management, treatment planning, resource allocation, and workforce coordination, offering real-time visibility, automated workflows, and secure data handling to deliver superior care and operational excellence." />
        <meta name="keywords" content="hospital management software, hospital information system, hospital operations management" />
        <link rel="canonical" href="https://home.atomwalk.com/hospitalmanagement.html" />
      </Helmet>
      <LetsConnect title={"Unified Healthcare: Register, Treat, Manage"} description={"Atomwalk HMS provides a centralized platform to manage every aspect of hospital operations, from patient registration to staff scheduling. Designed for hospitals and healthcare providers, it streamlines patient data management, treatment planning, resource allocation, and workforce coordination, offering real-time visibility, automated workflows, and secure data handling to deliver superior care and operational excellence."} background={"#6DE1D2"} lead={true} img={TagImg}></LetsConnect>
      <FeatureBenifits data={"Hospital"} />
      <KeyFeaturesWaste title={"HMS in Action: Connecting People and Processes"} description={"Our Healthcare Management System unites all stakeholders in a cohesive ecosystem, ensuring flawless collaboration and efficient healthcare delivery across roles."}></KeyFeaturesWaste>
      <HmsDetails />
    </>
  )
}

export default HmsHeroPage
