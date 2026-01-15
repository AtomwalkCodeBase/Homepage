import React from 'react';
import styled from 'styled-components';
import HRMHeadBG from '../../assets/img/hr.png';
import KeyFeatureHrm from './KeyFeatureHrm';
import FeatureBenifits from '../FeatureBenifits';
import LetsConnect from '../LetsConnect';
import NewFAQSection from './NewFAQSection';
import HRMAccessMedium from './HRMAccessMedium';
import { Helmet } from 'react-helmet-async';

const Page = styled.div`
  background-color: #eae3ff;
  color: blue;
  width: 100%;
  /* padding-top: 10px; */
  padding-bottom: 10px;
  padding-top: 3%;
  /* height: 1472px; */
`;


const HrmComponent = () => {

  return (
    <>
      <Helmet>
        <title>HRM | Atomwalk Technologies</title>
        <meta name="description" content="Manage employee data, performance, and HR processes efficiently with Atomwalk HRM." />
        <meta name="keywords" content="HRM software, Online HRMS solution, Human resource management system, HRM software for startups, HR management software, HR software for manufacturing, HR analytics software, Workforce analytics" />
        <link rel="canonical" href="https://home.atomwalk.com/hrm.html" />
      </Helmet>
      <Page>

        <LetsConnect title={"Streamline Your Workforce with Atomwalk HRM On-The-Go"} description={"Manage the entire employee lifecycle from onboarding to exit, anytime-anywhere. Atomwalk HRM encompasses various functions like recruitment, performance management, payroll, exit process, and compliances. Access our powerful HRM features on the web or through our mobile app for convenient leave, claims, attendance, and holiday management. We help to maximize employee performance and their contribute to achieving organizational goals."} background={"#eae3ff"} lead={true} img={HRMHeadBG}></LetsConnect>
        {/* </Header> */}
      </Page>
      <FeatureBenifits data={`HR`} />
      <KeyFeatureHrm />
      <HRMAccessMedium userRole="Employee" />

      <NewFAQSection data={`HR`} />
    </>



  );
};

export default HrmComponent;
