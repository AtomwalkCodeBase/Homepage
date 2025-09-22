import React from 'react';
import styled from 'styled-components';
import {
    FiSmartphone,
    FiCode,
    FiCloud,
    FiLayers,
    FiServer,
    FiShield
} from 'react-icons/fi';

// Section Container
const SectionContainer = styled.div`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f9faff 0%, #f0f4ff 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(125, 62, 255, 0.05);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(125, 62, 255, 0.03);
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 60px 15px;
    
    &::before {
      top: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
    }
    
    &::after {
      bottom: -50px;
      left: -50px;
      width: 250px;
      height: 250px;
    }
  }

  @media (max-width: 480px) {
    padding: 50px 10px;
    
    &::before {
      top: -30px;
      right: -30px;
      width: 150px;
      height: 150px;
    }
    
    &::after {
      bottom: -30px;
      left: -30px;
      width: 180px;
      height: 180px;
    }
  }
`;

const MainTitle = styled.h2`
  font-size: 2.5em;
  font-weight: bold;
  color: #333;
  margin: 0 auto;
  max-width: 90%;

  span {
    color: #7d3eff;
  }

  @media (max-width: 1024px) {
    font-size: 2.2em;
  }

  @media (max-width: 768px) {
    font-size: 1.8em;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    font-size: 1.6em;
    max-width: 100%;
    padding: 0 5px;
  }
`;

// Subtitle styling
const Subtitle = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-top: 10px;
  margin-bottom: 60px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;

  @media (max-width: 1024px) {
    font-size: 1.1em;
    max-width: 95%;
  }

  @media (max-width: 768px) {
    font-size: 1em;
    margin-bottom: 40px;
    max-width: 100%;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.95em;
    margin-bottom: 35px;
    padding: 0 5px;
    line-height: 1.5;
  }
`;

// Container for features
const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  justify-items: center;

  /* For desktop view with exactly 6 items (2 rows of 3) */
  &:has(> :nth-child(6):last-child) {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: 25px;
    padding: 0 20px;
    
    &:has(> :nth-child(6):last-child) {
      grid-template-columns: repeat(2, minmax(280px, 1fr));
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 0 15px;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    gap: 18px;
    padding: 0 10px;
  }
`;

// Feature Card
const FeatureBox = styled.div`
  background-color: #fff;
  padding: 40px 25px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 380px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => props.color};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
    
    div {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1024px) {
    padding: 35px 20px;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 30px 20px;
    margin: 0;
  }

  @media (max-width: 480px) {
    padding: 25px 15px;
    border-radius: 12px;
    width: 100%;
  }
`;

// Icon Circle
const IconContainer = styled.div`
  width: 90px;
  height: 90px;
  background: ${props => props.bgColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px auto;
  transition: all 0.3s ease;
  
  svg {
    font-size: 40px;
    color: ${props => props.color};
  }

  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    
    svg {
      font-size: 35px;
    }
  }

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    margin-bottom: 15px;
    
    svg {
      font-size: 30px;
    }
  }
`;

// Title
const FeatureTitle = styled.h3`
  font-size: 1.4em;
  color: #222;
  margin-bottom: 15px;
  font-weight: 700;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 1.3em;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    font-size: 1.25em;
  }

  @media (max-width: 480px) {
    font-size: 1.15em;
    margin-bottom: 10px;
    padding: 0 5px;
  }
`;

// Description
const FeatureDescription = styled.p`
  font-size: 1.05em;
  color: #666;
  line-height: 1.6;

  @media (max-width: 1024px) {
    font-size: 1em;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    font-size: 0.95em;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
    line-height: 1.5;
    padding: 0 5px;
  }
`;

const WhatAtomwalkCovers = () => {
    const features = [
        {
            icon: <FiCloud />,
            title: "Cloud-Powered Business Solutions",
            description: "Atomwalk delivers secure and scalable cloud services that ensure 24/7 accessibility and reliability for your enterprise.",
            iconBg: "#ffe0f5",
            iconColor: "#e84393"
        },
        {
            icon: <FiCode />,
            title: "Customized Software Development",
            description: "From ERP modules to mobile apps, Atomwalk builds tailor-made software to address unique business requirements.",
            iconBg: "#F0E7FF",
            iconColor: "#9b59b6"
        },
        {
            icon: <FiSmartphone />,
            title: "Downloadable Mobile Applications & Software",
            description: "Comprehensive mobile applications and enterprise software designed to support diverse business and operational needs.",
            iconBg: "#D8F5E3",
            iconColor: "#2ecc71"
        },
        {
            icon: <FiLayers />,
            title: "R&D in Business Automation",
            description: "Our research focuses on innovating in ERP, HRM, and sustainable tech to streamline business automation and management.",
            iconBg: "#FFF5D6",
            iconColor: "#f1c40f"
        },
        {
            icon: <FiServer />,
            title: "Custom Hardware cum Software Development",
            description: "Customized computer hardware cum software services tailored to meet specific business needs.",
            iconBg: "#D6F0FF",
            iconColor: "#2980b9"
        },
        {
            icon: <FiShield />,
            title: "Data Security & Compliance",
            description: "Atomwalk ensures enterprise-grade security, regulatory compliance, and data protection across all business operations.",
            iconBg: "#E6F4FF",
            iconColor: "#1abc9c"
        }
    ];

    return (
        <SectionContainer>
            <MainTitle>Technology & Solutions We Offer</MainTitle>
            <Subtitle>
                Atomwalk provides a wide spectrum of technology-driven products and services,
                empowering businesses with both software and hardware solutions.
            </Subtitle>

            <FeaturesContainer>
                {features.map((feature, index) => (
                    <FeatureBox key={index} color={feature.iconColor}>
                        <IconContainer bgColor={feature.iconBg} color={feature.iconColor}>
                            {feature.icon}
                        </IconContainer>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                    </FeatureBox>
                ))}
            </FeaturesContainer>
        </SectionContainer>
    );
};

export default WhatAtomwalkCovers;