import React from 'react';
import styled from 'styled-components';
import Like from './../assets/img/like.png'
import Sale from './../assets/img/sales.png'
import Focus from './../assets/img/concentrate.png'
import Gole from './../assets/img/goal.png'
import Learn from './../assets/img/online-learning.png'

// Styled Components

const Section = styled.section`
  padding: 70px 40px ;
  background-color: rgb(225 255 246);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 110px;
`;

const ValuesContainer = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom:100px;
  /* display: flex;
  align-items: flex-start;
  text-align: left; */
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor};
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;

const ValueTitle = styled.h3`
  font-size: 1.2rem;
  margin: 15px 0 10px;
  color: #333;
`;

const ValueDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
`;

// Sample icons (replace with actual paths)
const icons = {
  improve: `${Sale}`,
  excellence: `${Like}`,
  impact: `${Focus}`,
  customerSuccess: `${Gole}`,
  learning: `${Learn}`,
};

const values = [
  {
    title: "Constant Improvement",
    description: "Growth isn’t a one-time effort. We’re committed to evolving every day, both as a company and as individuals.",
    icon: icons.improve,
    bgColor: "#f3d0ff",
  },
  {
    title: "Pursue Excellence",
    description: "Excellence guides our actions, shaping our products and driving our customer success.",
    icon: icons.excellence,
    bgColor: "#ffe2c4",
  },
  {
    title: "Prioritize Meaningful Impact",
    description: "Our core metric is the value we create for customers by solving their most pressing needs.",
    icon: icons.impact,
    bgColor: "#f5efb8",
  },
  {
    title: "Champion Customer Success",
    description: "We see every interaction as a chance to build lasting, impactful relationships with our customers.",
    icon: icons.customerSuccess,
    bgColor: "#daf7e2",
  },
  {
    title: "Cultivate Learning & Collaboration",
    description: "We grow together through trust, open knowledge-sharing, and a spirit of collaboration.",
    icon: icons.learning,
    bgColor: "#d3f4ff",
  },
];


const OurValues = () => {
  return (
    <Section>
      <Title>Our Values</Title>
      <ValuesContainer>
        {values.map((value, index) => (
          <Card key={index}>
            <IconWrapper bgColor={value.bgColor}>
              <Icon src={value.icon} alt={value.title} />
            </IconWrapper>
            <ContentWrapper>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ContentWrapper>
          </Card>
        ))}
      </ValuesContainer>
    </Section>
  );
};

export default OurValues;
