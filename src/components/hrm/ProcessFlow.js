import React from 'react';
import styled from 'styled-components';

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
    HR: [
        { step: 'On-Boarding'},
        { step: 'Employee Data'},
        { step: 'Attendance'},
        // { step: 'Payroll'},
        { step: 'Exit Process'},
    ],
    Lead: [
      { step: 'Lead Capture', color: '#4A90E2' },
      { step: 'Lead Tracking', color: '#4A90E2' },
      { step: 'Lead Scoring', color: '#4A90E2' },
      { step: 'Lead Distribytion ', color: '#4A90E2' },
      { step: 'Lead Nurturing', color: '#4A90E2' },
    ],
    Campaign: [
      { step: 'Planning and Audience Segmentation', color: '#4A90E2' },
      { step: 'Designing Campaign Content', color: '#4A90E2' },
      { step: 'Campaign Setup in CRM', color: '#4A90E2' },
      { step: 'Execution and Sending', color: '#4A90E2' },
      { step: 'Monitoring and Engagement Tracking', color: '#4A90E2' },
      { step: 'Follow-up and Lead Nurturing', color: '#4A90E2' },
      { step: 'Campaign Analysis and Reporting', color: '#4A90E2' },

    ],
  };

  // Get the appropriate flow based on the `data` prop
  const processSteps = flows[data] || [];

  return (
    <PageContainer bgcolor={bgcolors}>
      <Title>Process Flow for {data}</Title>
      <Section>
        <IndustryContainer style={{ backgroundColor: "#ffffff" }}>
          
          <FlowContainer>
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                <Step>
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
