import React from 'react'
import styled from 'styled-components';
import Team from './../assets/img/TemIcon.jpg'

// Main Container for the section
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ade8f4;
  padding: 20px;
  height: 530px;
  color: #2c3e50;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 40px;
  }
`;

// Container for the testimonial card
const TestimonialCard = styled.div`
  background-color: #fff;
  color: #333;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  text-align: left;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

// Image for the avatar
const Avatar = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

// Container for the testimonial content
const TestimonialContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

// Quote Text
const Quote = styled.p`
  font-size: 1em;
  margin: 0;
`;

// Author details
const Author = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const AuthorTitle = styled.div`
  font-size: 0.9em;
  color: #666;
`;

// Container for the pricing section
const PricingSection = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    width: 559.66px;
    position: relative;
    left: -84px;
    top: 8px;
    transition: none;
  }
`;

// Pricing Heading
const PricingHeading = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
`;

// Pricing description
const PricingDescription = styled.p`
  font-size: 1em;
  margin-bottom: 20px;
`;

// Button styles
const Button = styled.a`
  background-color: #ea5c49;
  color: #fff;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;

  &:hover {
    background-color: #ee442d;
  }

  &.secondary {
    background-color: transparent;
    border: 1px solid #280043;
    color: #454545;
    &:hover{
      background-color: #90e0ef;
      /* color: #fff; */
    }
  }
`;

const PricingAvtar = () => {
  return (
    <Section>
    <TestimonialCard>
      <TestimonialContent>
        <Avatar src={Team} alt="Manoja" />
        <div style={{  color: "#2c3e50"}}>
          <Quote>With a user-friendly application, a dedicated support team, and an unmatched price-to-value ratio, we provide exceptional value. Plus, there are no hidden fees!</Quote>
        </div>
      </TestimonialContent>
      <Author>Manoj Kumar Sahoo</Author>
      <AuthorTitle>Co-Founder and Director of Atomwalk Technologies - Atomwalk Technologies</AuthorTitle>
    </TestimonialCard>

    <PricingSection>
      <PricingHeading>Looking to evaluate our pricing? We'll gladly take the price challenge!</PricingHeading>
      <PricingDescription>Our customers consistently affirm that we deliver outstanding software and service at unbeatable prices. Our license fees are the most competitive in the industry.</PricingDescription>
      <Button href="/pricing.html">Plans and pricing</Button>
      <Button href="/demo.html" className="secondary">Discuss pricing</Button>
    </PricingSection>
  </Section>
  )
}

export default PricingAvtar
