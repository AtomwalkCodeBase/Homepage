import React from 'react'
import LetsConnect from '../LetsConnect'
import KeyFeatureCrm from './KeyFeatureCrm'
import FeatureBenifits from '../FeatureBenifits'
import NewFAQSection from '../hrm/NewFAQSection'

const HerosectionCrm = () => {
  return (
    <div>
          <LetsConnect title={"Comprehensive CRM platform"} description={"Atomwalk CRM is a comprehensive Customer Relationship Management (CRM) system that streamlines and manages various business operations, focusing on lead, customer, and channel partner management. Atomwalk also supports critical business functionalities like AMC management, campaign management, sales manager performance dashboard and task management."} background={"#d6e7ff"} crm={true}></LetsConnect>
          <FeatureBenifits data={'Customer'}></FeatureBenifits>
          <KeyFeatureCrm></KeyFeatureCrm>
          <NewFAQSection data={"CRM"}></NewFAQSection>
    </div>
  )
}

export default HerosectionCrm
