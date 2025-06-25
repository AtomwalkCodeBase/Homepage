import React from 'react';
import styled from 'styled-components';
import { FaUserTie, FaUsersCog, FaUserShield } from 'react-icons/fa';

const userRoles = [
  {
    role: 'Employee',
    description: 'Access attendance, leaves, timesheet, events, and training modules.',
    icon: <FaUserTie />,
    link: '/employee-accessibility',
    color: '#4e73df'
  },
  {
    role: 'Employee Manager',
    description: 'Manage team leaves, claims, timesheets, and approvals.',
    icon: <FaUsersCog />,
    link: '/employee-manager-accessibility',
    color: '#1cc88a'
  },
  {
    role: 'HR Manager',
    description: 'Full access including payroll, setup, and complete HR operations.',
    icon: <FaUserShield />,
    link: '/hr-manager-accessibility',
    color: '#e74a3b'
  }
];

// Styled Components
const Section = styled.section`
  padding: clamp(3rem, 5vw, 5rem) 1.5rem;
  background: linear-gradient(135deg, #f8f9fc 0%, #e9ecef 100%);
  text-align: center;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`;

const Heading = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  color: #2e3a4d;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #4e73df;
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  color: #6c757d;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  max-width: min(700px, 90%);
  margin: 0 auto clamp(2rem, 4vw, 3rem);
  line-height: 1.6;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
  margin-top: 2rem;
  width: 100%;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 2vw, 2rem);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.03);
  min-height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    &:before {
      height: 100%;
      opacity: 0.1;
    }
    
    .icon-wrapper {
      background: white;
      color: ${props => props.color};
      transform: scale(1.1);
    }
    
    h3 {
      color: ${props => props.color};
    }
    
    p {
      color: #2e3a4d;
      font-weight: 500;
    }
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => props.color};
    transition: all 0.3s ease;
    z-index: -1;
  }
`;

const IconWrapper = styled.div`
  width: clamp(60px, 10vw, 80px);
  height: clamp(60px, 10vw, 80px);
  margin: 0 auto clamp(1rem, 2vw, 1.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.color};
  color: white;
  font-size: clamp(1.5rem, 3vw, 2rem);
  transition: all 0.3s ease;
`;

const FeatureTitle = styled.h3`
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  color: #2e3a4d;
  margin-bottom: clamp(0.75rem, 1.5vw, 1rem);
  font-weight: 600;
  transition: color 0.3s ease;
`;

const FeatureText = styled.p`
  color: #6c757d;
  line-height: 1.6;
  font-size: clamp(0.85rem, 1.75vw, 1rem);
  transition: all 0.3s ease;
`;

// Component
const HRMAccessMedium = () => {
  return (
    <Section>
      <ContentContainer>
        <Heading>Role-Based Access Control</Heading>
        <Subtitle>
          Select your role to access tailored HRM features and functionalities designed 
          specifically for your position within the organization.
        </Subtitle>
        
        <Features>
          {userRoles.map((item, index) => (
            <FeatureCard 
              key={index}
              onClick={() => window.location.href = item.link}
              color={item.color}
            >
              <IconWrapper className="icon-wrapper" color={item.color}>
                {item.icon}
              </IconWrapper>
              <FeatureTitle>{item.role}</FeatureTitle>
              <FeatureText>{item.description}</FeatureText>
            </FeatureCard>
          ))}
        </Features>
      </ContentContainer>
    </Section>
  );
};

export default HRMAccessMedium;