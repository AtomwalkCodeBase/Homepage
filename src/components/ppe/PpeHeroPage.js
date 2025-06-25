import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import PpeDetails from './PpeDetails'

function PpeHeroPage() {
  return (
    <>
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