import React from 'react';
import styled from 'styled-components';
import ManualImage from './../assets/img/ManualHeroImg.png'; // replace with your manual illustration image

// Main container for the hero section
const HeroSection = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 120px 5% 200px; /* Increased bottom padding to 200px */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2d3748;
  position: relative;
  overflow: hidden;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    padding: 100px 5% 180px; /* Adjusted for tablet */
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 80px 5% 80px; /* Adjusted for mobile */
  }
`;

// Text container
const TextContainer = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a202c;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  span {
    display: block;
    font-weight: 600;
    font-size: 2.8rem;
    background: linear-gradient(90deg, #1a202c, #4a5568);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 1024px) {
    font-size: 2.8rem;
    
    span {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    
    span {
      font-size: 1.8rem;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #4a5568;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

// Button styles
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.a`
  padding: 0.8rem 1.8rem;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
  color: white;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(90deg, #4338ca, #0891b2);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

// Feature list
const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: 0.95rem;
  color: #4a5568;
  margin-bottom: 0.5rem;

  &:before {
    content: "✓";
    color: #4f46e5;
    margin-right: 0.75rem;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

// Image container
const ImageContainer = styled.div`
  position: relative;
  max-width: 550px;
  z-index: 2;

  @media (max-width: 1024px) {
    max-width: 450px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ManualImageStyled = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: perspective(1000px) rotateY(-10deg);
  transition: transform 0.5s ease;
  position: relative; // Add this
  z-index: 1; // Add this

  &:hover {
    transform: perspective(1000px) rotateY(-5deg);
  }

  @media (max-width: 768px) {
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #4f46e5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 3; // Increased z-index to ensure it's above the image

  @media (max-width: 768px) {
    top: -15px;
    right: 10px;
    font-size: 0.9rem;
  }
`;

// Stats container
const StatsContainer = styled.div`
  position: absolute;
  bottom: -60px;
  left: 0;
  margin-bottom: 110px;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  z-index: 3;

  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 150px;

  @media (max-width: 640px) {
    padding: 1rem;
    min-width: 120px;
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 0.25rem;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
`;

// Main component
const HeroManual = () => {
  return (
    <HeroSection>
      <TextContainer>
        <Title>Comprehensive User Manual <span>For All Your Needs</span></Title>
        <Subtitle>
          Access our detailed manuals and documentation to get the most out of our products. 
          Step-by-step guides, troubleshooting tips, and best practices at your fingertips.
        </Subtitle>
        
        <ButtonContainer>
          <PrimaryButton href="https://www.youtube.com/@AtomwalkTechnologies" target='blank'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            View Online
          </PrimaryButton>
          {/* <SecondaryButton href="/demo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Online
          </SecondaryButton> */}
        </ButtonContainer>
        
        <FeatureList>
          <FeatureItem>Step-by-step instructions</FeatureItem>
          <FeatureItem>Troubleshooting guides</FeatureItem>
          <FeatureItem>Frequently asked questions</FeatureItem>
          <FeatureItem>Best practices & tips</FeatureItem>
          <FeatureItem>Regularly updated content</FeatureItem>
          <FeatureItem>Available in multiple formats</FeatureItem>
        </FeatureList>
      </TextContainer>

      <ImageContainer>
        <Badge>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Latest Version
        </Badge>
        <ManualImageStyled src={ManualImage} alt="User Manual Preview" />
      </ImageContainer>

      <StatsContainer>
        {/* <StatItem>
          <StatNumber>50+</StatNumber>
          <StatLabel>Pages of Content</StatLabel>
        </StatItem> */}
        <StatItem>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Access Available</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>100%</StatNumber>
          <StatLabel>Customer Satisfaction</StatLabel>
        </StatItem>
      </StatsContainer>
    </HeroSection>
  );
};

export default HeroManual;