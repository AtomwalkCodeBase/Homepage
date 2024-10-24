import React from 'react'
import LetsConnect from '../LetsConnect'
import KeyFeatureCrm from './KeyFeatureCrm'

const HerosectionCrm = () => {
  return (
    <div>
          <LetsConnect title={"Comprehensive CRM platform"} description={"Atomwalk CRM is a comprehensive Customer Relationship Management (CRM) system designed to streamline and manage various business operations, focusing on customer, supplier, partner, and lead management. It offers functionalities that support task management, order processing, and tracking of product interests and payments."} background={"#d6e7ff"} crm={true}></LetsConnect>
          <KeyFeatureCrm></KeyFeatureCrm>
    </div>
  )
}

export default HerosectionCrm
