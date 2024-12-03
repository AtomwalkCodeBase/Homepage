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
  margin-top: 10px;
  font-size: 30px;
  font-weight: 800;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 40px;
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

export const SalesProcessFlow = ({ data,bgcolors}) => {
  // Define different flows for each type
  const flows = {
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
      { step: 'Supplier Identification', color: '#4A90E2' },
      { step: 'Purchase Order Creation', color: '#4A90E2' },
      { step: 'Order-In', color: '#4A90E2' },
      { step: 'Return Handling', color: '#4A90E2' },
      { step: 'Payable Process Tracking', color: '#4A90E2' },
    ],
    Compliance:[
      { step: 'E-Way Bill', color: '#4A90E2' },
      { step: 'E-Invoice', color: '#4A90E2' },
      { step: 'GST', color: '#4A90E2' },
      { step: 'TDS', color: '#4A90E2' },
    ],
    Report:[
      { step: 'Sales Report', color: '#4A90E2' },
      { step: 'Procurement Report', color: '#4A90E2' },
      { step: 'GST', color: '#4A90E2' },
      { step: 'TDS', color: '#4A90E2' },
    ],
   
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
      <Title>{data} Lifecycle</Title>
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