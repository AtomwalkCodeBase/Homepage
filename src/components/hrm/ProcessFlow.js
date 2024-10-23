import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f0ebf7;
  font-family: Arial, sans-serif;

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

export const ProcessFlow = ({ data }) => {
  // Define different flows for each type
  const flows = {
    Claim: [
      { step: 'Setup of Expenses', color: '#4A90E2' },
      { step: 'Advance is Issued', color: '#7EDfff' },
      { step: 'Expense of Claim', color: '#7ED321' },
      { step: 'Approval Of Claim', color: '#a970ff' },
      { step: 'Approval Of Claim', color: '#F8E71C' },
      { step: 'Post Entries', color: '#50E3C2' },
      { step: 'Dashboard Available', color: '#4A90E2' },
    ],
    Leave: [
      { step: 'View Holiday Calender', color: '#F5A623' },
      { step: 'Leave Dashboard', color: '#D0021B' },
      { step: 'Apply Leave', color: '#8B572A' },
      { step: 'Approve Leave', color: '#417505' },
      { step: 'Leave Report', color: '#7ED321' },
    ],
    HR: [
      { step: 'On-Boarding', color: '#50E3C2' },
      { step: 'Employee Data', color: '#F8E71C' },
      { step: 'Attendance', color: '#B8E986' },
      { step: 'Payroll', color: '#417505' },
      { step: 'Exit Process', color: '#D0021B' },
    ],
  };

  // Get the appropriate flow based on the `data` prop
  const processSteps = flows[data] || [];

  return (
    <PageContainer>
      <Title>Process Flow for {data}</Title>
      <Section>
        <IndustryContainer style={{ backgroundColor: "#ffffff" }}>
          
          <FlowContainer>
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                <Step bgColor={step.color}>
                  <DocText bgColor={step.color}>{step.step}</DocText>
                </Step>
                {index < processSteps.length - 1 && (
                  <Arrow arrowColor={step.color} />
                )}
              </React.Fragment>
            ))}
          </FlowContainer>
        </IndustryContainer>
      </Section>
    </PageContainer>
  );
};
