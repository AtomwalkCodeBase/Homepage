// OurBeliefs.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Organic animations
const drift = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(2%, 3%) rotate(2deg); }
  66% { transform: translate(-2%, 1%) rotate(-2deg); }
`;

const sway = keyframes`
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(5deg) scale(1.05); }
`;



// Main container with warm background
const Section = styled.section`
  padding: 140px 20px;
  background: linear-gradient(to bottom, #e9e5dc, #fff7ed);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* font-family: 'Playfair Display', 'Cormorant Garamond', serif; */
`;

// Organic background elements
const OrganicShape = styled.div`
  position: absolute;
  background: ${props => props.color || 'rgba(225, 29, 46, 0.03)'};
  border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  width: ${props => props.size || '600px'};
  height: ${props => props.size || '600px'};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  animation: ${drift} ${props => props.duration || '20s'} infinite ease-in-out;
  z-index: 0;
  filter: blur(${props => props.blur || '60px'});
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  width: 100%;
`;

// Hand-drawn style header
const HeaderSection = styled.div`
  margin-bottom: 120px;
  position: relative;
  font-family: 'Playfair Display', 'Cormorant Garamond', serif;
`;

const Title = styled.h2`
  font-size: clamp(80px, 15vw, 180px);
  font-weight: 400;
  line-height: 0.8;
  margin: 0;
  color: #2c2c2c;
  position: relative;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  
  span {
    display: block;
    font-style: italic;
    color: #e11d2e;
    font-size: 0.4em;
    margin-left: 20px;
    letter-spacing: 0.3em;
    font-weight: 300;
  }
`;

const Subtitle = styled.p`
  font-size: 24px;
  color: #5c5c5c;
  max-width: 600px;
  margin: 40px 0 0;
  font-weight: 300;
  line-height: 1.6;
  position: relative;
  padding-left: 40px;
  
  &::before {
    content: '✧';
    position: absolute;
    left: 0;
    top: 0;
    color: #e11d2e;
    font-size: 32px;
    opacity: 0.5;
  }
`;

// Main beliefs grid with artistic layout
const BeliefsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin: 80px 0;
  position: relative;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Unique belief containers
const BeliefContainer = styled.div`
  position: relative;
  cursor: pointer;
  
  &:nth-child(odd) {
    transform: translateY(40px);
  }
  
  &:nth-child(2) {
    transform: translateY(20px);
  }
  
  &:nth-child(4) {
    transform: translateY(60px);
  }
`;

const BeliefNumber = styled.div`
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  color: rgba(225, 29, 46, 0.1);
  position: absolute;
  top: -80px;
  left: -20px;
  z-index: 1;
  user-select: none;
  transition: all 0.5s ease;
  
  ${BeliefContainer}:hover & {
    color: rgba(225, 29, 46, 0.3);
    transform: translate(-10px, -10px);
  }
`;

const BeliefContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 60px 30px 40px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(225, 29, 46, 0.1);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  // Unique shape for each belief
  clip-path: ${props => {
    const shapes = [
      'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
      'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
      'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
      'polygon(15% 0%, 75% 0%, 100% 15%, 100% 75%, 75% 100%, 15% 100%, 0% 75%, 0% 15%)'
    ];
    return shapes[props.index % shapes.length];
  }};
  
  &:hover {
    background: white;
    border-color: #e11d2e;
    transform: scale(1.05) rotate(${props => props.index % 2 === 0 ? '1deg' : '-1deg'});
    box-shadow: 30px 30px 60px -30px rgba(225, 29, 46, 0.3);
    
    .belief-icon {
      transform: rotate(5deg) scale(1.1);
      color: #e11d2e;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 48px;
  margin-bottom: 25px;
  color: #2c2c2c;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  
  svg {
    width: 60px;
    height: 60px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1;
  }
`;

const BeliefTitle = styled.h3`
  font-size: 32px;
  font-weight: 400;
  color: #2c2c2c;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: #e11d2e;
    transition: width 0.3s ease;
  }
  
  ${BeliefContainer}:hover &::after {
    width: 80px;
  }
`;

const BeliefDescription = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #5c5c5c;
  font-weight: 300;
`;

// Artistic divider
const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 80px 0;
  color: #e11d2e;
  opacity: 0.3;
  
  .line {
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, transparent, #e11d2e, transparent);
  }
  
  .symbol {
    font-size: 24px;
    animation: ${sway} 4s infinite ease-in-out;
  }
`;

// Unique stats display
const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  margin: 100px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: repeating-linear-gradient(90deg, #e11d2e 0px, #e11d2e 10px, transparent 10px, transparent 20px);
    opacity: 0.2;
    transform: translateY(-50%);
  }
`;

const StatItem = styled.div`
  flex: 1;
  min-width: 200px;
  text-align: center;
  position: relative;
  background: white;
  padding: 40px 20px;
  border-radius: 50% 50% 30% 30%;
  transform: rotate(${props => props.rotate || '-2deg'});
  box-shadow: 20px 20px 40px -20px rgba(225, 29, 46, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 30px 30px 50px -20px #e11d2e;
  }
  
  &::before {
    content: '●';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #e11d2e;
    opacity: 0.3;
    font-size: 12px;
  }
`;

const StatNumber = styled.div`
  font-size: 64px;
  font-weight: 300;
  color: #e11d2e;
  line-height: 1;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #5c5c5c;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 300;
`;



// Floating quote
const QuoteSection = styled.div`
  text-align: center;
  margin: 100px 0;
  position: relative;
  /* padding: 60px 20px; */
  
  &::before, &::after {
    content: '"';
    position: absolute;
    font-size: 120px;
    color: #e11d2e;
    opacity: 0.1;
  }
  
  &::before {
    top: 0;
    left: 0;
  }
  
  &::after {
    bottom: 0;
    right: 0;
    transform: rotate(180deg);
  }
`;

const Quote = styled.p`
  font-size: 36px;
  color: #2c2c2c;
  font-style: italic;
  line-height: 1.4;
  max-width: 800px;
  margin: 0 auto;
`;

const QuoteAuthor = styled.div`
  font-size: 18px;
  color: #5c5c5c;
  margin-top: 20px;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const AdvantageSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const beliefs = [
    {
      number: "01",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "Radical Humanity",
      description: "We place human experience at the center of every innovation, creating technology that feels less like Program and more like conversation."
    },
    {
      number: "02",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Fearless Curiosity",
      description: "We ask 'what if' instead of 'what is,' exploring the spaces between imagination and reality where true innovation lives."
    },
    {
      number: "03",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
          <line x1="2" y1="20" x2="2" y2="20" />
        </svg>
      ),
      title: "Connected Impact",
      description: "Every action creates ripples. We design our work to create waves of positive change that extend far beyond our immediate reach."
    },
    {
      number: "04",
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Timeless Wisdom",
      description: "We build for permanence in a disposable world, creating solutions that grow more valuable with each passing day."
    }
  ];

  const stats = [
    { number: "2018", label: "BORN" },
    { number: "50+", label: "COMPANIES" },
    { number: "13+", label: "PATENT" },
    { number: "30K+", label: "USER" }
  ];

  return (
    <Section>
      {/* Organic background shapes */}
      <OrganicShape size="800px" top="-200px" right="-200px" color="rgba(225, 29, 46, 0.02)" blur="80px" />
      <OrganicShape size="600px" bottom="-100px" left="-100px" color="rgba(225, 29, 46, 0.03)" blur="60px" />
      <OrganicShape size="400px" top="30%" left="20%" color="rgba(225, 29, 46, 0.02)" blur="40px" duration="25s" />

      <Container>
        <HeaderSection>
          <Title>
            our truth
            <span>in code we trust</span>
          </Title>
          <Subtitle>
            Not manifestos written in boardrooms, but beliefs carved
            through years of building, failing, and rising again.
          </Subtitle>
        </HeaderSection>

        <BeliefsGrid>
          {beliefs.map((belief, index) => (
            <BeliefContainer
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <BeliefNumber>{belief.number}</BeliefNumber>
              <BeliefContent index={index}>
                <IconWrapper className="belief-icon">
                  {belief.icon}
                </IconWrapper>
                <BeliefTitle>{belief.title}</BeliefTitle>
                <BeliefDescription>{belief.description}</BeliefDescription>
              </BeliefContent>
            </BeliefContainer>
          ))}
        </BeliefsGrid>

        <Divider>
          <span className="line" />
          <span className="symbol">✧</span>
          <span className="symbol">✦</span>
          <span className="symbol">✧</span>
          <span className="line" />
        </Divider>

        <StatsContainer>
          {stats.map((stat, index) => (
            <StatItem key={index} rotate={index % 2 === 0 ? '-2deg' : '2deg'}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsContainer>
        <QuoteSection>
          <Quote>
            We don't just write Programs. We write the future, one belief at a time.
          </Quote>
          <QuoteAuthor>— FOUNDERS' Atomwalk</QuoteAuthor>
        </QuoteSection>

        {/* Floating signature element */}
        <div style={{
          position: 'absolute',
          right: '50px',
          fontSize: '14px',
          color: '#e11d2e',
          opacity: 0.3,
          transform: 'rotate(-5deg)',
          fontFamily: 'Playfair Display',
          fontStyle: 'italic'
        }}>
          Built with ♥ since 2018
        </div>
      </Container>
    </Section>
  );
};

export default AdvantageSection;