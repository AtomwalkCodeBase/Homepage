import React from 'react'
import LetsConnect from '../LetsConnect'
import KeyFeatureCrm from './KeyFeatureCrm'
import FeatureBenifits from '../FeatureBenifits'
import NewFAQSection from '../hrm/NewFAQSection'
import { Helmet } from 'react-helmet-async';
const HerosectionCrm = () => {
  return (
    <div>
      <Helmet>
        <title>Comprehensive CRM Platform | Atomwalk Technologies</title>
        <meta name="description" content="Manage leads, track sales, and boost customer engagement" />
        <meta name="keywords" content="All-in-One CRM Software, Smart Sales & Customer CRM, CRM with AMC management, CRM with channel partner management, Affordable CRM software India, Business operations CRM, Custom CRM solution" />
        <link rel="canonical" href="https://home.atomwalk.com/crm.html" />
      </Helmet>
      <LetsConnect title={"Comprehensive CRM platform"} description={"Smart CRM for Lead & Client Management Atomwalk CRM streamlines lead tracking, client engagement, and opportunity management in a unified platform, enabling teams to close deals faster with complete visibility and control"} background={"#d6e7ff"} crm={true}></LetsConnect>
      <KeyFeatureCrm></KeyFeatureCrm>
      <FeatureBenifits data={'Customer'}></FeatureBenifits>
      <NewFAQSection data={"CRM"}></NewFAQSection>
    </div>
  )
}

export default HerosectionCrm
