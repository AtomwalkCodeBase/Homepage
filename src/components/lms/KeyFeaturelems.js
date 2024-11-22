import React from 'react';
import styled from 'styled-components';
import Compliance from '../../assets/img/userManagement.png'
import Excellence from '../../assets/img/equipmentManagement.png'
import Grow from '../../assets/img/maintenance.png'
import Payroll from '../../assets/img/dashboard.png'
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
      <FeatureBox onClick={()=>handelNvigation('userManagement.html')}> 
        <IconContainer bgColor="#D8F5E3">
          <img src={Compliance} alt="Speed" />
        </IconContainer>
        <FeatureTitle> Enhanced User Management</FeatureTitle>
        <FeatureDescription>
        Atomwalk’s LEM ensures every role in the lab gets precisely what they
need—empowering admins, managers, and users to focus on productivity without any
roadblocks.
        </FeatureDescription>
      </FeatureBox>
      <FeatureBox onClick={()=>handelNvigation('equipmentManagement.html')}>
        <IconContainer bgColor="#F0E7FF">
          <img src={Excellence} alt="Trust"/>
        </IconContainer>
        <FeatureTitle>Rule Based Equipment Management</FeatureTitle>
        <FeatureDescription>
        Say goodbye to scheduling conflicts. With Atomwalk’s LEM, you’ll always know
which equipment is available, making the booking process seamless.
        </FeatureDescription>
      </FeatureBox>
      <FeatureBox onClick={()=>handelNvigation('equipmentMaintenance.html')}>
        <IconContainer bgColor="#E0F7FC">
          <img src={Grow} alt="Accuracy" />
        </IconContainer>
        <FeatureTitle>Equipment Maintenance</FeatureTitle>
        <FeatureDescription>
        Don’t let unexpected breakdowns slow you down. Atomwalk’s LEM sends alerts for
maintenance and calibrations, ensuring minimal downtime and maximum lab
productivity.</FeatureDescription>
      </FeatureBox>
      <FeatureBox onClick={()=>handelNvigation('reportandDashboard.html')}>
        <IconContainer bgColor="#FFF2E0">
          <img src={Payroll} alt="Reliability" />
        </IconContainer>
        <FeatureTitle>Gain Insights with Report & Dashboard</FeatureTitle>
        <FeatureDescription>
        Unlock the power of data with Atomwalk’s detailed reports and Dashboard. Gain clear insights into usage pattern of equipments and labs </FeatureDescription>
      </FeatureBox>
    </FeaturesContainer>
  </SectionContainer>
  )
}

export default KeyFeaturelems;
