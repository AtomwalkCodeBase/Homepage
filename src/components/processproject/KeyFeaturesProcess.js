import React from 'react';
import styled from 'styled-components';
import Compliance from '../../assets/img/Leadmanagement.png'
import Proj from '../../assets/img/Project_icon.png'
import UserA from '../../assets/img/User_Activity_icon.png'
import Report from '../../assets/img/sales_report_icon.png';

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

const KeyFeaturesProcess = () => {
  const handelNvigation=(data)=>{
    window.location.href=`/${data}`
  }
  return (
    <SectionContainer>
    <MainTitle>
    Key Features
    </MainTitle>
    <Subtitle>
    Atomwalk Office is more than just an ERP; it’s a comprehensive solution that streamlines and optimizes your entire process and project management. Our platform offers:
    </Subtitle>
    <FeaturesContainer>
      <FeatureBox onClick={()=>handelNvigation('process.html')}> 
        <IconContainer bgColor="#D8F5E3">
          <img src={Compliance} alt="Process" />
        </IconContainer>
        <FeatureTitle>Work Order / Process Template:</FeatureTitle>
        <FeatureDescription>
        Streamline workflows with customizable process templates for consistent and efficient project execution.
        </FeatureDescription>
      </FeatureBox>
      <FeatureBox onClick={()=>handelNvigation('project.html')}>
        <IconContainer bgColor="#F0E7FF">
          <img src={Proj} alt="Project"/>
        </IconContainer>
        <FeatureTitle>Project Management:</FeatureTitle>
        <FeatureDescription>
        Efficiently plan, track, and manage projects with real-time progress monitoring, task allocation, and performance insights.
        </FeatureDescription>
      </FeatureBox>
      {/* <FeatureBox onClick={()=>handelNvigation('useractivities.html')}>
        <IconContainer bgColor="#F0E7FF">
          <img src={UserA} alt="User Activities"/>
        </IconContainer>
        <FeatureTitle>User Activities:</FeatureTitle>
        <FeatureDescription>
        Track and manage user activities, assign tasks, monitor progress, and ensure alignment with organizational goals for better efficiency.
        </FeatureDescription>
      </FeatureBox> */}
      <FeatureBox onClick={()=>handelNvigation('activityreport.html')}>
        <IconContainer bgColor="#F0E7FF">
          <img src={Report} alt="Activity Report"/>
        </IconContainer>
        <FeatureTitle>Report & Dashboard:</FeatureTitle>
        <FeatureDescription>
        Gain actionable insights with comprehensive reports and interactive dashboards, enabling data-driven decision-making and performance tracking.
        </FeatureDescription>
      </FeatureBox>
      
    </FeaturesContainer>
  </SectionContainer>
  )
}

export default KeyFeaturesProcess
