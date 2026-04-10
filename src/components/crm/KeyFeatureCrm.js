import React from 'react';
import styled from 'styled-components';
import Compliance from '../../assets/img/Leadmanagement.png'
import Excellence from '../../assets/img/CustomerMangement.png'
import Grow from '../../assets/img/partnership.png'
import Payroll from '../../assets/img/asset-management.png'
import Arrow from '../../assets/img/content-management.png'
import dasboard from '../../assets/img/dashboard.png'
import OnboardingIcon from '../../assets/img/onboarding.png'

// Container for the entire section
const SectionContainer = styled.div`
  padding: 110px 20px;
  background-color: #fff7e6;
  text-align: center;
`;

// Main title styling
const MainTitle = styled.h2`
  font-size: 2.5em;
  font-weight: bold;
  color: #333;

  span {
    color: #7d3eff; /* Purple color for "greytHR" */
  }

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

// Subtitle styling
const Subtitle = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-top: 10px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

// Container for the features
const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  align-items: stretch; /* IMPORTANT */

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Individual feature box styling
const FeatureBox = styled.div`
  width: 100%;
  height: 100%; /* IMPORTANT */

  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column; /* IMPORTANT */

  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.12);
  }
`;
// Icon container
const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.bgColor || "#ccc"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px auto;

  img {
    width: 50px;
    height: 50px;
  }
`;

// Feature title styling
const FeatureTitle = styled.h3`
  font-size: 1.4em;
  color: #333;
  margin-bottom: 10px;
  min-height: 50px; /* keeps titles aligned */
`;

const FeatureDescription = styled.p`
  font-size: 0.95em;
  color: #666;
  flex-grow: 1; /* pushes content evenly */
`;

const KeyFeatureCrm = () => {
  const handelNvigation = (data) => {
    window.location.href = `/${data}`
  }
  return (
    <SectionContainer>
      <MainTitle>
        Key Modules of Atomwalk CRM
      </MainTitle>
      {/* <Subtitle>
        Atomwalk Office is more than just an ERP; it’s a comprehensive solution that automates and
        optimizes your entire business operation. Our platform offers:
      </Subtitle> */}
      <FeaturesContainer>
        <FeatureBox onClick={() => handelNvigation('leadManagement.html')}>
          <IconContainer bgColor="#D8F5E3">
            <img src={Compliance} alt="Speed" />
          </IconContainer>
          <FeatureTitle> Lead Management:</FeatureTitle>
          <FeatureDescription>
            Streamline and track leads from acquisition to conversion, ensuring efficient follow-ups and maximizing sales opportunities.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={() => handelNvigation('CustomerManagement.html')}>
          <IconContainer bgColor="#F0E7FF">
            <img src={Excellence} alt="Trust" />
          </IconContainer>
          <FeatureTitle>Customer Management:</FeatureTitle>
          <FeatureDescription>
            Efficiently manage your customer data with receivable tracking, Manage customer tasks. AMC, multiple addresses, and support  effortlessly.</FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={() => handelNvigation('Channelpartner.html')}>
          <IconContainer bgColor="#E0F7FC">
            <img src={Grow} alt="Accuracy" />
          </IconContainer>
          <FeatureTitle>Channel partner management:</FeatureTitle>
          <FeatureDescription>
            Manage channel partners as extended arms to grow your business with Atomwalk CRM.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={() => handelNvigation('aMCTracking.html')}>
          <IconContainer bgColor="#FFF2E0">
            <img src={OnboardingIcon} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Opportunity to Order Conversion:</FeatureTitle>
          <FeatureDescription>
            Convert sales opportunities into orders with streamlined workflows, ensuring efficient sales processes and improved conversion rates.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={() => handelNvigation('aMCTracking.html')}>
          <IconContainer bgColor="#FFF2E0">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Annual Maintenance Contract:</FeatureTitle>
          <FeatureDescription>
            Efficiently manage, update, and view Annual Maintenance Contracts with Atomwalk CRM.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={() => handelNvigation('campaignManagement.html')}>
          <IconContainer bgColor="#ffe0f5">
            <img src={Arrow} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Campaign Management:</FeatureTitle>
          <FeatureDescription>
            Plan, execute, and analyze marketing campaigns to reach target audiences, track results, and optimize strategies for higher engagement and ROI.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={() => handelNvigation('managerPerformanceDashboard.html')}>
          <IconContainer bgColor="#ffe0f5">
            <img src={dasboard} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Manager Performance Dashboard:</FeatureTitle>
          <FeatureDescription>
            Monitor, analyze, and optimize team performance with a comprehensive manager dashboard in Atomwalk CRM.
          </FeatureDescription>
        </FeatureBox>
      </FeaturesContainer>
    </SectionContainer>
  )
}

export default KeyFeatureCrm
