import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import PpeDetails from './PpeDetails'
import { Helmet } from 'react-helmet-async'

function PpeHeroPage() {
  return (
    <>
      <Helmet>
        <title>Smart Manufacturing System | Atomwalk Technologies</title>
        <meta name="description" content="Atomwalk Technologies' Smart Manufacturing AI Management System streamlines production processes with real-time monitoring, predictive analytics, and automated safety checks. Designed for modern manufacturing floors, it enhances efficiency, reduces downtime, and ensures worker safety through intelligent automation." />
        <meta name="keywords" content="manufacturing management software, manufacturing system, manufacturing tracking software, manufacturing disposal management software, manufacturing monitoring system" />
        <link rel="canonical" href="https://home.atomwalk.com/aimanagement.html" />
      </Helmet>
      <LetsConnect
        title={"Smart AI Management System for Manufacturing"}
        description={
          "The Atomwalk Smart AI Management System is designed for modern manufacturing floors. Built using advanced computer vision, machine learning, and intelligent automation, it delivers real-time safety checks, operational monitoring, anomaly detection, and predictive analytics. Whether you're preventing bottlenecks, ensuring worker safety, or forecasting machine failures—our system brings it all together in one powerful platform."
        }
        background={"rgb(248 244 235)"}
        lead={true}
        img={"https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ppe-1.png"}
      />
      <FeatureBenifits data={"AI"} />
      <KeyFeaturesWaste title={"Key Collaborators to AI-Driven Manufacturing Infrastructure"} description={"Our AI Management System connects all key players in manufacturing on a unified platform—enhancing coordination, safety, and efficiency across the production lifecycle. "}></KeyFeaturesWaste>
      <PpeDetails></PpeDetails>
    </>
  )
}

export default PpeHeroPage