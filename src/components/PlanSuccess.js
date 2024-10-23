import React from 'react';
import styled from 'styled-components';
import Real from './../assets/img/time.png'
import Money from './../assets/img/money.png'
import Prefit from './../assets/img/profits.png'
import Login from './../assets/img/login.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 70px;
  /* max-width: 1500px; */
  width: 100%;
  margin: auto;
  text-align: center;
  background-color: #f5e9fd;
  @media (max-width: 768px) {
    padding: 100px 30px;
  }
`;

const Title = styled.h2`
  font-size: 2.5em;
  font-weight: bold;
  color:#333;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.2em;
  color: #666;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
@media (max-width: 768px) {
  flex-wrap: wrap;
}
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 10px;
  padding: 20px;
  /* background-color: #f0f4f8; */
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const FeatureIcon = styled.img`
  width: 90px;
  height: 90px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const FeatureTitle = styled.h4`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1em;
  color: #666;
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const PlanSuccess = () => {
  return (
    <Container>
      <Title>Unite advantages</Title>
      <Subtitle>Features Tailored to Your Business Needs</Subtitle>
      <FeaturesContainer>
        <Feature>
          <FeatureIcon src={Money} alt="Centralized access" />
          <FeatureTitle>AI & Blockchain Integration:</FeatureTitle>
          <FeatureDescription>
          Leverage advanced technologies for automated data entry, secure transactions, and business innovation.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon src={Real}alt="Vetted providers" />
          <FeatureTitle>Real-time Insights:</FeatureTitle>
          <FeatureDescription>
          Make informed decisions with real-time data, analytics, and reporting.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon src={Prefit} alt="Simplified workflows" />
          <FeatureTitle>Cost-Effective:</FeatureTitle>
          <FeatureDescription>
          Low setup costs with no upfront investment and all updates included at no additional charge.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon src={Login} alt="Simplified workflows" />
          <FeatureTitle>User-Friendly Interface</FeatureTitle>
          <FeatureDescription>
          Simplified, integrated, and accessible from any device, anywhere.
          </FeatureDescription>
        </Feature>
      </FeaturesContainer>
    </Container>
  );
};

export default PlanSuccess;
