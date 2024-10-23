import React from 'react';
import styled from 'styled-components';
import Compliance from './../assets/img/consulting.png'
import Excellence from './../assets/img/service.png'
import Grow from './../assets/img/grow.png'
import Payroll from './../assets/img/human-resources.png'
import Arrow from './../assets/img/arrows.png'

// Container for the entire section
const SectionContainer = styled.div`
  padding: 110px 20px;
  background-color: #fff7e6;
  text-align: center;
`;

// Main title styling
const MainTitle = styled.h2`
  font-size: 2.5em;
  font-weight: bold;
  color: #333;

  span {
    color: #7d3eff; /* Purple color for "greytHR" */
  }

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

// Subtitle styling
const Subtitle = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-top: 10px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

// Container for the features
const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
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

const ProductPage = () => {
  return (
    <SectionContainer>
      <MainTitle>
      Why Atomwalk Office ERP?
      </MainTitle>
      <Subtitle>
      Atomwalk Office is more than just an ERP; it’s a comprehensive solution that automates and 
      optimizes your entire business operation. Our platform offers:
      </Subtitle>

      <FeaturesContainer>
        <FeatureBox>
          <IconContainer bgColor="#D8F5E3">
            <img src={Compliance} alt="Speed" />
          </IconContainer>
          <FeatureTitle>Financial Compliance:</FeatureTitle>
          <FeatureDescription>
          Automated e-Invoice, GST reconciliation, and real-time financial management.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox>
          <IconContainer bgColor="#F0E7FF">
            <img src={Excellence} alt="Trust" />
          </IconContainer>
          <FeatureTitle>Operational Excellence:</FeatureTitle>
          <FeatureDescription>
          Project and work order management, BOM generation, and process optimization.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox>
          <IconContainer bgColor="#E0F7FC">
            <img src={Grow} alt="Accuracy" />
          </IconContainer>
          <FeatureTitle>Business Growth:</FeatureTitle>
          <FeatureDescription>
          Integrated CRM for lead management, sales performance tracking, and customer communication.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox>
          <IconContainer bgColor="#FFF2E0">
            <img src={Payroll} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>HR & Payroll:</FeatureTitle>
          <FeatureDescription>
          From recruitment to payroll, manage the full employee lifecycle effortlessly.
          </FeatureDescription>
        </FeatureBox>
        <FeatureBox>
          <IconContainer bgColor="#ffe0f5">
            <img src={Arrow} alt="Reliability" />
          </IconContainer>
          <FeatureTitle>Multi-location Flexibility:</FeatureTitle>
          <FeatureDescription>
          Handle operations across multiple branches or locations with ease.
          </FeatureDescription>
        </FeatureBox>
      </FeaturesContainer>
    </SectionContainer>
  );
};

export default ProductPage;
