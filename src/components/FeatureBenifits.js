// FeatureSection.js

import React from 'react';
import styled from 'styled-components';

// You can replace these icons with your own imported image files or URLs
import Icon1 from '../assets/img/clock.png';

const Section = styled.section`
  text-align: center;
  padding: 50px 20px;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #000;
  margin-bottom: 10px;
  font-weight: 600;

  span {
    color: #6a1b9a; /* Purple highlight */
  }
`;

const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #fff;
  border-radius: 12px; */
  padding: 20px;
  /* box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; */

  /* &:hover {
    transform: translateY(-10px);
  } */
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${props => props.bgColor || '#6a1b9a'};
  margin-bottom: 15px;

  img {
    width: 40px;
    height: 40px;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 10px;
  font-weight: 600;
`;

const BenefitText = styled.p`
  color: #6e6e6e;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const FeatureBenifits = (res) => {
  return (
    <Section>
      <Title>All-in-One {res?.data} Management, <span>Faster and Easier.</span></Title>
      <BenefitGrid>
        <BenefitCard>
          <BenefitIcon bgColor="#d9f5e3">
            <img src={Icon1} alt="Save Icon" />
          </BenefitIcon>
          <BenefitTitle>Save</BenefitTitle>
          <BenefitText>time & effort</BenefitText>
        </BenefitCard>

        <BenefitCard>
          <BenefitIcon bgColor="#f2e3ff">
            <img src={Icon1} alt="Administer Icon" />
          </BenefitIcon>
          <BenefitTitle>Administer</BenefitTitle>
          <BenefitText>uniform leave policy</BenefitText>
        </BenefitCard>

        <BenefitCard>
          <BenefitIcon bgColor="#ffe8cc">
            <img src={Icon1} alt="Ensure Icon" />
          </BenefitIcon>
          <BenefitTitle>Ensure</BenefitTitle>
          <BenefitText>accurate leave accounting</BenefitText>
        </BenefitCard>

        <BenefitCard>
          <BenefitIcon bgColor="#fff1d0">
            <img src={Icon1} alt="Reduce Icon" />
          </BenefitIcon>
          <BenefitTitle>Reduce</BenefitTitle>
          <BenefitText>unnecessary expense</BenefitText>
        </BenefitCard>

        <BenefitCard>
          <BenefitIcon bgColor="#d7faff">
            <img src={Icon1} alt="Deliver Icon" />
          </BenefitIcon>
          <BenefitTitle>Deliver</BenefitTitle>
          <BenefitText>an outstanding employee experience</BenefitText>
        </BenefitCard>

        <BenefitCard>
          <BenefitIcon bgColor="#d9f5e3">
            <img src={Icon1} alt="Improve Icon" />
          </BenefitIcon>
          <BenefitTitle>Improve</BenefitTitle>
          <BenefitText>employer brand image</BenefitText>
        </BenefitCard>
      </BenefitGrid>
    </Section>
  );
};

export default FeatureBenifits;
