import React from 'react';
import styled from 'styled-components';
import ClaimProcessFlow from './ClaimProcessFlow';

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

export const ProcessFlow = ({ data }) => {
  return (
    <PageContainer>
      <Title>Process Flow for {data}</Title>
      <Section>
        <IndustryContainer style={{ backgroundColor: "#ffffff" }}>
          {data === 'Claim' && <ClaimProcessFlow />}
        </IndustryContainer>
      </Section>
    </PageContainer>
  );
};
