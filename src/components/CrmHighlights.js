import React from 'react';
import styled from 'styled-components';
import paymentsIcon from './../assets/img/gps.png';
import insightsIcon from './../assets/img/delegation.png';
import invoicesIcon from './../assets/img/invoice.png';
import payablesIcon from './../assets/img/to-do-list.png';
// import financialsIcon from './../assets/financials-icon.png';

// Styled Components
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #d6e7ff;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HighlightsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 48%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const IconWrapper = styled.div`
  background-color: #ffcc00;
  padding: 15px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Icon = styled.img`
  width: 50px;
  height: auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

// React Component
const CrmHighlights = () => {
  return (
    <Section>
      <Heading>The highlights of our CRM app</Heading>
      <HighlightsContainer>
        <HighlightItem>
          <IconWrapper>
            <Icon src={paymentsIcon} alt="Make payments easier" />
          </IconWrapper>
          <TextContainer>
            <Title>Location-Based Check-In and Check-Out</Title>
            <Description>
            Easily track employee attendance or project milestones with our seamless location-based check-in and check-out system. Whether you're in the office or on the go, ensure accurate time logging through GPS-enabled features that simplify workforce management.
            </Description>
          </TextContainer>
        </HighlightItem>

        <HighlightItem>
          <IconWrapper>
            <Icon src={insightsIcon} alt="Gain instant insights" />
          </IconWrapper>
          <TextContainer>
            <Title>Assign Tasks to Another User</Title>
            <Description>
            Empower your team with efficient task delegation. Assign tasks with a few clicks, track progress, and ensure smooth collaboration, whether working remotely or on-site. Get more done with clear accountability and seamless handovers.
            </Description>
          </TextContainer>
        </HighlightItem>

        <HighlightItem>
          <IconWrapper>
            <Icon src={invoicesIcon} alt="Send beautifully crafted invoices" />
          </IconWrapper>
          <TextContainer>
            <Title>Track Your Invoice and Leads in One Place</Title>
            <Description>
            Manage your finances and sales pipeline effortlessly. Track invoices, monitor lead progress, and keep everything in one organized place, helping you stay on top of your business metrics without missing a beat.
            </Description>
          </TextContainer>
        </HighlightItem>

        <HighlightItem>
          <IconWrapper>
            <Icon src={payablesIcon} alt="Track your payables effectively" />
          </IconWrapper>
          <TextContainer>
            <Title>Check Your To-Do List</Title>
            <Description>
            Keep your priorities in check with an organized, easy-to-navigate To-Do list. Never miss a deadline or task with a feature that lets you manage your personal and professional responsibilities in one place.
            </Description>
          </TextContainer>
        </HighlightItem>

        {/* <HighlightItem>
          <IconWrapper>
            <Icon src={financialsIcon} alt="Understand your financials" />
          </IconWrapper>
          <TextContainer>
            <Title>Understand your financials</Title>
            <Description>
              Generate key financial reports like balance sheets, cash flow statements, and income statements to know where your business stands.
            </Description>
          </TextContainer>
        </HighlightItem> */}
      </HighlightsContainer>
    </Section>
  );
};

export default CrmHighlights;
