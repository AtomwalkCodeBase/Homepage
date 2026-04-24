import React from 'react';
import styled from 'styled-components';
import HRMHeadBG from '../../assets/img/hr.png';
import KeyFeatureHrm from './KeyFeatureHrm';
import FeatureBenifits from '../FeatureBenifits';
import LetsConnect from '../LetsConnect';
import NewFAQSection from './NewFAQSection';
import HRMAccessMedium from './HRMAccessMedium';
import { Helmet } from 'react-helmet-async';



const HrmComponent = () => {

  return (
    <>
      <Helmet>
        <title>HRM | Atomwalk Technologies</title>
        <meta name="description" content="Manage employee data, performance, and HR processes efficiently with Atomwalk HRM." />
        <meta name="keywords" content="HRM software, Online HRMS solution, Human resource management system, HRM software for startups, HR management software, HR software for manufacturing, HR analytics software, Workforce analytics" />
        <link rel="canonical" href="https://home.atomwalk.com/hrm.html" />
      </Helmet>
      {/* <Page> */}

      <LetsConnect title={"Work Smarter with Atomwalk HRM Anytime, Anywhere"} description={"Manage hiring, payroll, performance, and compliance in one place. Empower your workforce with seamless web and mobile access."} background={"#eae3ff"} lead={true} img={HRMHeadBG} ></LetsConnect>
      {/* </Header> */}
      {/* </Page> */}
      <KeyFeatureHrm />
      <FeatureBenifits data={`HR`} />
      <HRMAccessMedium userRole="Employee" />

      <NewFAQSection data={`HR`} />
    </>



  );
};

export default HrmComponent;
