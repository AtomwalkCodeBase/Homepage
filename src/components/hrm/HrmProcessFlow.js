import React from 'react';
import styled from 'styled-components';

// Container for the whole flowchart
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
  border: 1px solid ${props => props.bgColor || '#f3f3f3'};
  width: 125px;
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
color: ${props => props.bgColor || '#f3f3f3'};
font-weight: bold;

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
      <Step bgColor="#4A90E2">
        <DocText bgColor="#4A90E2">Setup of Expenses</DocText>
      </Step>
      <Arrow arrowColor="#4A90E2" />
      <Step bgColor="#7EDfff">
        <DocText bgColor="#7EDfff">Advance is Issued</DocText>
      </Step>
      <Arrow arrowColor="#7EDfff" />
      <Step bgColor="#7ED321">
      <DocText bgColor="#7ED321">Expense of Claim</DocText></Step>
      <Arrow arrowColor="#7ED321" />
      <Step bgColor="#a970ff">
      <DocText bgColor="#a970ff">Approval Of Claim</DocText></Step>
      <Arrow arrowColor="#a970ff" />
      <Step bgColor="#F8E71C">
      <DocText bgColor="#F8E71C">Approval Of Claim</DocText></Step>
      <Arrow arrowColor="#F8E71C" />
      <Step bgColor="#50E3C2">
      <DocText bgColor="#50E3C2">Post Entries</DocText></Step>
      <Arrow arrowColor="#4A90E2" />
      <Step bgColor="#4A90E2">
      <DocText bgColor="#4A90E2">Dashboard Available</DocText></Step>
    </FlowContainer>
  );
};

export default ClaimProcessFlow;
