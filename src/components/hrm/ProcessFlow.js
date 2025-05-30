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
  width: 100%;
  overflow-x: auto;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const FlowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Step = styled.div`
  background-color: #ffffff;
  text-align: center;
  min-height: 100px;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  border: 1px solid #4A90E2;
  min-width: 160px;
  max-width: 200px;
  flex: 1 0 auto;
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
    min-width: 160px;
    min-height: 80px;
    margin: 8px;
    padding: 10px;
    flex: 0 0 auto;
  }
`;

const DocText = styled.p`
  text-align: center;
  color: #4A90E2;
  font-weight: bold;
  margin: 0;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 20px solid #4A90E2;
  margin: 0 5px;
  flex-shrink: 0;
  transform: rotate(-90deg);

  @media (max-width: 768px) {
    transform: rotate(360deg);
    margin: 0 3px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #4A90E2;
  }
`;

export const ProcessFlow = ({ data, bgcolors }) => {
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
      { step: 'Weekly Score'},
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
        { step: 'Asset Management'},
        { step: 'Exit Process'},
    ],
    "Help & Request":[
      { step: 'Request Category Setup'},
      { step: 'Add New Help/ Request Ticket'},
      { step: 'Assign to a Employee'},
      { step: 'Resolve Help/ Request'},
      { step: 'Help/ Request Dashboard'},
    ],
    "Event Updates":[
      { step: 'Company Event Creation'},
      { step: 'Employee Event Creation'},
      { step: 'Employee Response'},
    ],
    Lead: [
      { step: 'Lead Capture', color: '#4A90E2' },
      { step: 'Lead Enrichment and Task Assignment', color: '#4A90E2' },
      // { step: 'Obtain Customer Management', color: '#4A90E2' },
      { step: 'Lead Tracking and Status Management ', color: '#4A90E2' },
      { step: 'Lead Closure', color: '#4A90E2' },
    ],
    Campaign: [
      { step: 'Create Campaign', color: '#4A90E2' },
      { step: 'Custom and Default Campaign Template', color: '#4A90E2' },
      { step: 'Response interface', color: '#4A90E2' },
    ],
    Partner : [
      { step: ' Add Partner', color: '#4A90E2' },
      { step: 'Order Information Tracking', color: '#4A90E2' },
      // { step: 'Commission Management', color: '#4A90E2' },
      { step: 'Multi-Report Generation', color: '#4A90E2' },
    ],
    Customer : [
      { step: 'Customer Data Management', color: '#4A90E2' },
      { step: 'Customer Task & TDS Management', color: '#4A90E2' },
      { step: 'Invoice, Payment & Product Interests', color: '#4A90E2' },
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
    ],
    UserManagements:[
      { step: 'Admin', color: '#4A90E2' },
      { step: 'Manager', color: '#4A90E2' },
      { step: 'User', color: '#4A90E2' },
    ],
    LabProcess:[
      { step: 'Add Equipment & Inventory Items', color: '#4A90E2' },
      { step: 'Document Setup', color: '#4A90E2' },
      { step: 'Experiment Workflow (Activity) Creation', color: '#4A90E2' },
      { step: 'Quality Management', color: '#4A90E2' },
    ],
    LabExperiment:[
      { step: 'Creation of Lab Experiment Project ', color: '#4A90E2' },
      { step: 'Lab Project Objective Defination', color: '#4A90E2' },
      { step: 'Experiment Steps (Activity) Management', color: '#4A90E2' },
    ],
    SalesLifecycleService:[
      { step: 'Quotation/Sales Order', color: '#4A90E2' },
      { step: 'Sales Invoice', color: '#4A90E2' },
      { step: 'Payment Management', color: '#4A90E2' },
    ],
    Sales:[
      { step: 'Quotation/Sales Order', color: '#4A90E2' },
      { step: 'Work Order Creation (Project)', color: '#4A90E2' },
      { step: 'Sales Invoice', color: '#4A90E2' },
      { step: 'Delivery Chalan', color: '#4A90E2' },
      // { step: 'Allocate Inventory', color: '#4A90E2' },
      { step: 'Shipment Details', color: '#4A90E2' },
      { step: 'Payment Management', color: '#4A90E2' },
    ],
    Procurement:[
      { step: 'Supplier(Vendor) Identification', color: '#4A90E2' },
      { step: 'Purchase Order Creation', color: '#4A90E2' },
      { step: 'Order-In (GRN)', color: '#4A90E2' },
      { step: 'Return Handling', color: '#4A90E2' },
      { step: 'Payment Tracking (Payables)', color: '#4A90E2' },
    ],
    Compliance:[
      { step: 'E-Way Bill', color: '#4A90E2' },
      { step: 'TDS', color: '#4A90E2' },
      { step: 'GST', color: '#4A90E2' },
    ],
    Report:[
      { step: 'Sales Report', color: '#4A90E2' },
      { step: 'Procurement Report', color: '#4A90E2' },
      { step: 'GST', color: '#4A90E2' },
      { step: 'TDS', color: '#4A90E2' },
    ],
    AnnualMaintenance:[ { step: 'Add and Update AMC Details', color: '#4A90E2' },
      { step: 'View All AMC Records', color: '#4A90E2' },],
    "Work Order":[
      { step: 'Product Category', color: '#4A90E2' },
      { step: 'Inventory Setup', color: '#4A90E2' },
      { step: 'Equipment Setup', color: '#4A90E2' },
      { step: 'Document Setup', color: '#4A90E2' },
      { step: 'Activity Creation', color: '#4A90E2' },
      { step: 'Creation of Process', color: '#4A90E2' },
    ],
    "Project Management":[
      { step: 'Project/Work Order Creation', color: '#4A90E2' },
      { step: 'User Activity Management', color: '#4A90E2' },
      { step: 'Project Management', color: '#4A90E2' },
    ],
    "Report & Dashboard":[
      { step: 'Activity Dashboard', color: '#4A90E2' },
      { step: 'Project Dashboard', color: '#4A90E2' },
      { step: 'Resource Utilisation', color: '#4A90E2' },
    ],
    "Inventory Operation":[
      { step: 'Inventory Item Category', color: '#4A90E2' },
      { step: 'Inventory Item', color: '#4A90E2' },
      // { step: 'Stock Management', color: '#4A90E2' },
      { step: 'Adding Inventory to Stock ', color: '#4A90E2' },
      { step: 'Physical Inspection', color: '#4A90E2' },
      { step: 'Consumption of Inventory', color: '#4A90E2' },
    ],
    "Inventory Report & Dashboard":[
      { step: 'Stock Item Report', color: '#4A90E2' },
      { step: 'Valuation Report', color: '#4A90E2' },
      { step: 'Expiry Report', color: '#4A90E2' },
      { step: 'Safety Stock Report', color: '#4A90E2' },
      { step: 'Stock Aging Report ', color: '#4A90E2' },
    ],

  };

  const processSteps = flows[data] || flows["Work Order"] || flows["Project Management"] || flows["Report & Dashboard"] || flows["Inventory Operation"] || [];
  const navigate = useNavigate();
  const location = useLocation();

  const handleStepClick = (index) => {
    navigate(`${location.pathname}?${index + 1}`);
  };

  return (
    <PageContainer bgcolor={bgcolors}>
      <Title>Process Flow for {data}</Title>
      <Section>
        <IndustryContainer>
          <FlowContainer>
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                <Step onClick={() => handleStepClick(index)}>
                  <DocText>{step.step}</DocText>
                </Step>
                {index < processSteps.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
          </FlowContainer>
        </IndustryContainer>
      </Section>
    </PageContainer>
  );
};