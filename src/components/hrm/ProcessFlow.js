import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";

const PageContainer = styled.div`
  padding: 20px;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : "#f0ebf7"};
  @media (min-width: 768px) {
    padding: 50px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  margin-top: 80px;
  font-size: 35px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 45px;
  }
`;

const IndustryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const FlowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 25px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;


// Each step box
const Step = styled.div`
  background-color: #ffffff;
  
  /* text-align: center; */
  height: 100px;
  padding: 10px;
  padding-top: 20px;
  margin: 10px;
  border-radius: 8px;
  border: 1px solid #4A90E2;
  width: 185px;
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    min-width: 100%;
    max-height: fit-content;
  }
`;

const DocText =styled.p`
text-align: center;
color: #4A90E2;
font-weight: bold;

`;


// Arrow between steps
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #4A90E2;
  margin: 0 10px;
  transform: rotate(-90deg);

  @media (max-width: 768px) {
    transform: rotate(360deg);
  }
`;

export const ProcessFlow = ({ data,bgcolors}) => {
  // Define different flows for each type
  const flows = {
    Claim: [
      { step: 'Expense Item Setup'},
      { step: 'Expense Advance for Employee' },
      { step: 'Claim Expense'},
      { step: 'Approval Of Claim'},
      { step: 'Settlement of Claims'},
      { step: 'Reports & Dashboards'},
    ],
    Leave: [
      { step: 'Setup Holiday Calendar'},
      { step: 'Leave Dashboard'},
      { step: 'Manage Leave by Employee'},
      { step: 'Manage Leave by Manager'},
      { step: 'Reports & Analysis'},
    ],
    Payroll: [
      { step: 'Payroll Setup & Controls'},
      { step: 'Generate Monthly Salary'},
      { step: 'Post Salary'},
    ],
    Attendance: [
      { step: 'Check-in'},
      { step: 'Attendance Dashboard'},
      { step: 'Manage Attendance'},
    ],
    Appraisal: [
      { step: 'Performance Mangement System'},
      { step: 'Self Appraisal Process '},
      { step: 'Manager Appriasl Process '},
      { step: 'Appriasl Rivew Process and Reports '},
    ],
    HR: [
        
        { step: 'On-Boarding'},
        { step: 'Employee Data'},
        { step: 'Exit Process'},
    ],
    Lead: [
      { step: 'Lead Capture', color: '#4A90E2' },
      { step: 'Lead Tracking', color: '#4A90E2' },
      { step: 'Obtain Customer Management', color: '#4A90E2' },
      { step: 'Lead Lifecycle Management ', color: '#4A90E2' },
      { step: 'Lost Lead Recovery and Management', color: '#4A90E2' },
    ],
    Campaign: [
      { step: 'Flexible Template Creation by User (No Restrictions)', color: '#4A90E2' },
      { step: 'Universal Template Access for All Users', color: '#4A90E2' },
      { step: 'Target Audience Segmentation', color: '#4A90E2' },
      { step: 'Campaign Template Review Process', color: '#4A90E2' },
      { step: 'Automated Campaign Trigger with Predefined Scheduler', color: '#4A90E2' }
    ],
    Partner : [
      { step: ' Add Partner', color: '#4A90E2' },
      { step: 'Order Information Tracking', color: '#4A90E2' },
      { step: 'Commission Management', color: '#4A90E2' },
      { step: 'Multi-Report Generation', color: '#4A90E2' },
    ],
    Customer : [
      { step: ' Customer Uploading (Upload Customer Data)', color: '#4A90E2' },
      { step: 'Order Management (Manage Reservations)', color: '#4A90E2' },
      { step: ' Process-wise Order Management (Resale and Cross-Selling)', color: '#4A90E2' },
      { step: 'Ticket Tracking (AMC Tracking)', color: '#4A90E2' },
      { step: 'Reports and Dashboards', color: '#4A90E2' }
    ],
    UserManagement:[
      { step: 'User Group Setup', color: '#4A90E2' },
      { step: 'User Profile Creation', color: '#4A90E2' },
      { step: 'Update/ Delete Profile', color: '#4A90E2' },

    ]
    ,
    EquipmentManagement:[
      { step: 'Equipment Setup', color: '#4A90E2' },
      { step: 'Booking', color: '#4A90E2' },
      { step: ' Cancellation', color: '#4A90E2' },
    ],
    EquipmentMaintenance:[
      { step: 'preventive Maintenance', color: '#4A90E2' },
      { step: 'Emergency maintenance', color: '#4A90E2' },
    ],
    ReportandDashboard:[
      { step: ' Usage Trends', color: '#4A90E2' },
      { step: 'Audit ready records', color: '#4A90E2' },
      { step: 'Data purge ', color: '#4A90E2' },
      { step: 'Analytics', color: '#4A90E2' },
    ]
   
  };

  // Get the appropriate flow based on the data prop
  const processSteps = flows[data] || [];
  const navigate = useNavigate();
  const location = useLocation();

  const handleStepClick = (index) => {
    navigate(`${location.pathname}?${index + 1}`);
  };

  return (
    <PageContainer bgcolor={bgcolors}>
      <Title>Process Flow for {data}</Title>
      <Section>
        <IndustryContainer style={{ backgroundColor: "#ffffff" }}>
          
          <FlowContainer>
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
              <Step onClick={() => handleStepClick(index)}>
                  <DocText>{step.step}</DocText>
                </Step>
                {index < processSteps.length - 1 && (
                  <Arrow/>
                )}
              </React.Fragment>
            ))}
          </FlowContainer>
        </IndustryContainer>
      </Section>
    </PageContainer>
  );
};