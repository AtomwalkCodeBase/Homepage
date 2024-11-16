import React from 'react';
import styled from 'styled-components';
import Compliance from '../../assets/img/Leadmanagement.png'
import Excellence from '../../assets/img/CustomerMangement.png'
import Grow from '../../assets/img/partnership.png'
import Payroll from '../../assets/img/asset-management.png'
import Arrow from '../../assets/img/content-management.png'

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
  display: flex;
  justify-content: space-around;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Individual feature box styling
const FeatureBox = styled.div`
  width: 285px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 20px 0;
    width: 80%;
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
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
`;

// Feature description styling
const FeatureDescription = styled.p`
  font-size: 1em;
  color: #666;
`;

const KeyFeaturelems = () => {
  const handelNvigation=(data)=>{
    window.location.href=`/${data}`
  }
  return (
    <SectionContainer>
    <MainTitle>
    Key Features
    </MainTitle>
    <Subtitle>
    Atomwalk Office is more than just an ERP; it’s a comprehensive solution that automates and 
    optimizes your entire business operation. Our platform offers:
    </Subtitle>
    <FeaturesContainer>
      <FeatureBox onClick={()=>handelNvigation('leadManagement.html')}> 
        <IconContainer bgColor="#D8F5E3">
          <img src={Compliance} alt="Speed" />
        </IconContainer>
        <FeatureTitle> Enhanced User Management</FeatureTitle>
        <FeatureDescription>
        Streamline and track leads from acquisition to conversion, ensuring efficient follow-ups and maximizing sales opportunities.
        </FeatureDescription>
      </FeatureBox>
      <FeatureBox onClick={()=>handelNvigation('CustomerManagement.html')}>
        <IconContainer bgColor="#F0E7FF">
          <img src={Excellence} alt="Trust"/>
        </IconContainer>
        <FeatureTitle>Simplified Equipment Management</FeatureTitle>
        <FeatureDescription>
        Manage customer relationships by storing interaction histories, preferences, and communication details in one centralized platform
        </FeatureDescription>
      </FeatureBox>
      <FeatureBox onClick={()=>handelNvigation('Channelpartner.html')}>
        <IconContainer bgColor="#E0F7FC">
          <img src={Grow} alt="Accuracy" />
        </IconContainer>
        <FeatureTitle>Equipment Maintenance</FeatureTitle>
        <FeatureDescription>
        Collaborate effectively with business partners by tracking their contributions, agreements, and communication to ensure successful partnerships.
        </FeatureDescription>
      </FeatureBox>
      <FeatureBox>
        <IconContainer bgColor="#FFF2E0">
          <img src={Payroll} alt="Reliability" />
        </IconContainer>
        <FeatureTitle>Gain Insights with Report & Analytics</FeatureTitle>
        <FeatureDescription>
        Efficiently manage assets, investments, and portfolios while tracking performance and ensuring regulatory compliance
        </FeatureDescription>
      </FeatureBox>
    </FeaturesContainer>
  </SectionContainer>
  )
}

export default KeyFeaturelems;
