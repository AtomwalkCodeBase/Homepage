import React from 'react';
import styled from 'styled-components';
import Payroll from '../../assets/img/payroll.png'
import AttIcon from '../../assets/img/attendance1.png'
import OnboardingIcon from '../../assets/img/onboarding.png'
import EmployeeDataIcon from '../../assets/img/empdata.png'
import LeaveManagementIcon from '../../assets/img/leave-management.png'
import ClaimManagementIcon from '../../assets/img/claimmanage.png'
import ExitProcessIcon from '../../assets/img/exit-process.png'
import PerformanceManagementIcon from '../../assets/img/performance-management.png'



// Container for the entire section
const SectionContainer = styled.div`
  padding: 110px 20px;
  background-color: #f0ebf7;
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

// Container for the features
const FeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
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
            <img src={OnboardingIcon} alt="Onboarding" />
          </IconContainer>
          <FeatureTitle>On-Boarding Process:</FeatureTitle>
          <FeatureDescription>
          Seamlessly onboard new employees by setting up departments, grades, and HR policies from one place.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={()=>{handleCardPress('employeehr')}}>
          <IconContainer bgColor="#F0E7FF">
            <img src={EmployeeDataIcon} alt="EmployeeData" />
          </IconContainer>
          <FeatureTitle>Employee Data:</FeatureTitle>
          <FeatureDescription>
          Maintain accurate employee records with the ability to add, update, and delete employee details. Easily manage employee data for better decision-making.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={()=>{handleCardPress('attendance')}}>
          <IconContainer bgColor="#E0F7FC">
            <img src={AttIcon} alt="Attendance" />
          </IconContainer>
          <FeatureTitle>Attendance:</FeatureTitle>
          <FeatureDescription>
          Track employee attendance in real time with integrated location tracking and the option to mark attendance remotely.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox
        onClick={()=>{handleCardPress('leave')}}>
          <IconContainer bgColor="#FFF2E0">
            <img src={LeaveManagementIcon} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Leave Management:</FeatureTitle>
          <FeatureDescription>
          Easily handle leave requests—employees can apply for leave, while managers can approve or reject requests, review leave history, and ensure compliance with company policies.
          </FeatureDescription>
        </FeatureBox>
        
        
      </FeaturesContainer>

      <FeaturesContainer>
      <FeatureBox 
      onClick={()=>{handleCardPress('claim')}}>
          <IconContainer bgColor="#EFF498">
            <img src={ClaimManagementIcon} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Claim Management:</FeatureTitle>
          <FeatureDescription>
          Submit and manage claims, such as travel or expense reimbursements, with ease. Employees can upload receipts, managers can review and approve claims, and claim settlements with employee advance is also supported.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={()=>{handleCardPress('payroll')}}>
          <IconContainer bgColor="#D99B80">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Payroll:</FeatureTitle>
          <FeatureDescription>
          Automate payroll processing with integrated features for salary calculations, deductions, and disbursements, ensuring timely and accurate payroll management.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={()=>{handleCardPress('appraisal')}}>
          <IconContainer bgColor="#F7DAF4">
            <img src={PerformanceManagementIcon} alt="Performance Mangement" />
          </IconContainer>
          <FeatureTitle>Performance Mangement System:</FeatureTitle>
          <FeatureDescription>
          The appraisal system supporting KPI-based evaluations, with self-assessment, manager scoring, and grade normalization for fair, transparent performance reviews and structured reporting.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={()=>{handleCardPress('employeehr')}}>
          <IconContainer bgColor="#F7DADB">
            <img src={ExitProcessIcon} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Exit Process:</FeatureTitle>
          <FeatureDescription>
          Simplify the employee exit process, from resignation submission to final clearance. Atomwalk HRM allows companies to set up exit process documentation, ensuring all required documents and company assets are managed efficiently and securely stored for future reference.
          </FeatureDescription>
        </FeatureBox>
        
      </FeaturesContainer>

      <FeaturesContainer>
      <FeatureBox 
      onClick={()=>{handleCardPress('emphelp')}}>
          <IconContainer bgColor="#EFF498">
            <img src={ClaimManagementIcon} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Help & Request Desk:</FeatureTitle>
          <FeatureDescription>
          Intelligent ticketing system for employee support with automated routing, SLA tracking, and knowledge base integration. Real-time status updates and analytics for HR service management.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={()=>{handleCardPress('empevent')}}>
          <IconContainer bgColor="#D99B80">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Event Updates:</FeatureTitle>
          <FeatureDescription>
          Foster employee engagement through company announcements, birthday and work anniversary recognitions, and interactive features like employee interaction.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox onClick={()=>{handleCardPress('empliteapp')}}>
          <IconContainer bgColor="#F7DAF4">
            <img src={PerformanceManagementIcon} alt="Performance Mangement" />
          </IconContainer>
          <FeatureTitle>HRM Lite App:</FeatureTitle>
          <FeatureDescription>
          Mobile-first HR solution with all essential features in a lightweight interface. Employee self-service portal with secure authentication and offline capabilities.
          </FeatureDescription>
        </FeatureBox>
      
        
      </FeaturesContainer>
      
    </SectionContainer>
  );
};

export default KeyFeatureHrm;
