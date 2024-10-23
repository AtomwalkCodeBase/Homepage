import React from 'react';
import styled from 'styled-components';
import Atomation from './../assets/img/phone-call.png'
import Server from './../assets/img/email2.png'
import Scel from './../assets/img/location.png'

// Styled Components
const Section = styled.section`
  padding: 100px 20px;
  background-color:rgb(225 255 246);
  text-align: center;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  color: #666;
  margin-top: 10px;
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 70px;
`;

const FeatureItem = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    min-width: 90%;
  }
`;

const FeatureIcon = styled.img`
  max-width: 80px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const FeatureText = styled.p`
  color: #666;
`;

// React Component
const ContactCard = () => {
  return (
    <Section>
      <ContentContainer>
        <Heading>Reach Our Team</Heading>
        <Paragraph>We love questions and feedback - and we're always happy to help! Here are some ways to contact us.</Paragraph>
        <Features>
          <FeatureItem style={{backgroundColor:"rgb(181 255 206)"}}>
            <FeatureIcon src={Atomation} alt="Automated Processes" />
            <FeatureTitle>Call Us</FeatureTitle>
            <FeatureText>Call us to discover how our products can work best for you.</FeatureText>
            <FeatureText>Phone: +91-7259555003</FeatureText>
          </FeatureItem>
          <FeatureItem style={{backgroundColor:"rgb(188 216 255)"}}>
            <FeatureIcon src={Server} alt="Centralized Data" />
            <FeatureTitle>Mail Us</FeatureTitle>
            <FeatureText>We are waiting to help you and your team - so don't hesitate to reach out!</FeatureText>
            <FeatureText>Email: info@atomwalk.com</FeatureText>
          </FeatureItem>
          <FeatureItem style={{backgroundColor:"rgb(255 211 168)"}}>
            <FeatureIcon src={Scel} alt="Scalability" />
            <FeatureTitle>Our Main Office</FeatureTitle>
            <FeatureText>Visit our main office, where our team is always ready to welcome you and assist with any inquiries.</FeatureText>
            <FeatureText>Bengaluru, Marathahalli, 560037</FeatureText>
          </FeatureItem>
        </Features>
      </ContentContainer>
    </Section>
  );
};

export default ContactCard;
