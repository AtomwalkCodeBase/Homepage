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
      <LetsConnect title={"Comprehensive CRM platform"} description={"Atomwalk CRM is a comprehensive Customer Relationship Management (CRM) system that streamlines and manages various business operations, focusing on lead, customer, and channel partner management. Atomwalk also supports critical business functionalities like AMC management, campaign management, sales manager performance dashboard and task management."} background={"#d6e7ff"} crm={true}></LetsConnect>
      <FeatureBenifits data={'Customer'}></FeatureBenifits>
      <KeyFeatureCrm></KeyFeatureCrm>
      <NewFAQSection data={"CRM"}></NewFAQSection>
    </div>
  )
}

export default HerosectionCrm
