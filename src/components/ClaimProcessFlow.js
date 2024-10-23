import React from 'react';
import styled from 'styled-components';

// Container for the whole flowchart
const FlowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

// Each step box
const Step = styled.div`
  background-color: ${props => props.bgColor || '#f3f3f3'};
  color: white;
  font-weight: 300;
  text-align: center;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  min-width: 100px;
  flex: 1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

// Arrow between steps
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid ${props => props.arrowColor || '#000'};
  margin: 0 10px;
  transform: rotate(-90deg);

  @media (max-width: 768px) {
    transform: rotate(360deg);
  }
`;

// Main component
const ClaimProcessFlow = () => {
  return (
    <FlowContainer>
      <Step bgColor="#4A90E2">Setup of Claim Expense</Step>
      <Arrow arrowColor="#4A90E2" />
      <Step bgColor="#7EDfff">Advance is Issued to employee</Step>
      <Arrow arrowColor="#7ED321" />
      <Step bgColor="#7ED321">Claim Expense by Employee</Step>
      <Arrow arrowColor="#7ED321" />
      <Step bgColor="#B8E986">Claim Approval by Manager</Step>
      <Arrow arrowColor="#F5A623" />
      <Step bgColor="#F8E71C">Settlement of Claim by Accounts</Step>
      <Arrow arrowColor="#8B572A" />
      <Step bgColor="#50E3C2">Post Accounting Entries</Step>
      <Arrow arrowColor="#4A90E2" />
      <Step bgColor="#4A90E2">Report Dashboard Available</Step>
    </FlowContainer>
  );
};

export default ClaimProcessFlow;
