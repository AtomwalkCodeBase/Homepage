import React from 'react';
import styled from 'styled-components';
import Compliance from '../../assets/img/consulting.png'
import Excellence from '../../assets/img/service.png'
import Grow from '../../assets/img/grow.png'
import Payroll from '../../assets/img/human-resources.png'
import Arrow from '../../assets/img/arrows.png'

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
  margin-top: 30px;
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
  cursor: pointer;
  margin: 20px;

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

const KeyFeatureHrm = () => {

  const handleCardPress=(data)=>{
    window.location.href=`/${data}.html`
  }
  return (
    <SectionContainer>
      <MainTitle>
      Key Features
      </MainTitle>
      {/* <Subtitle>
      Atomwalk Office is more than just an ERP; it’s a comprehensive solution that automates and 
      optimizes your entire business operation. Our platform offers:
      </Subtitle> */}

      <FeaturesContainer>
        <FeatureBox onClick={()=>{handleCardPress('employeehr')}}>
          <IconContainer bgColor="#D8F5E3">
            <img src={Compliance} alt="Speed" />
          </IconContainer>
          <FeatureTitle>On-Boarding Process:</FeatureTitle>
          <FeatureDescription>
          Seamlessly onboard new employees by setting up departments, grades, and HR policies from one place.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={()=>{handleCardPress('employeehr')}}>
          <IconContainer bgColor="#F0E7FF">
            <img src={Excellence} alt="Trust" />
          </IconContainer>
          <FeatureTitle>Employee Data:</FeatureTitle>
          <FeatureDescription>
          Maintain accurate employee records with the ability to add, update, and delete employee details. Easily manage employee data for better decision-making.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={()=>{handleCardPress('employeehr')}}>
          <IconContainer bgColor="#E0F7FC">
            <img src={Grow} alt="Accuracy" />
          </IconContainer>
          <FeatureTitle>Attendance:</FeatureTitle>
          <FeatureDescription>
          Track employee attendance in real-time, with built-in GPS tracking and the ability to mark attendance remotely.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox
        onClick={()=>{handleCardPress('leave')}}>
          <IconContainer bgColor="#FFF2E0">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Leave Management:</FeatureTitle>
          <FeatureDescription>
          Handle leave requests with ease. Managers can approve or reject requests, view leave history, and ensure employees stay within allotted time off.
          </FeatureDescription>
        </FeatureBox>
        
        
      </FeaturesContainer>

      <FeaturesContainer>
      <FeatureBox 
      onClick={()=>{handleCardPress('claim')}}>
          <IconContainer bgColor="#FFF2E0">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Claim Management:</FeatureTitle>
          <FeatureDescription>
          Submit and manage claims such as travel or expense reimbursements. Employees can upload receipts, and managers can review and approve claim
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={()=>{handleCardPress('employeehr')}}>
          <IconContainer bgColor="#FFF2E0">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Payroll:</FeatureTitle>
          <FeatureDescription>
          Description: Automate payroll processing with integrated features for salary calculations, deductions, and disbursements. Ensure timely and accurate payments.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={()=>{handleCardPress('employeehr')}}>
          <IconContainer bgColor="#FFF2E0">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Exit Process:</FeatureTitle>
          <FeatureDescription>
          Description: Simplify the employee exit process, from resignation submission to final clearance. Ensure smooth offboarding with documented workflows
          </FeatureDescription>
        </FeatureBox>
        
      </FeaturesContainer>
      
    </SectionContainer>
  );
};

export default KeyFeatureHrm;
