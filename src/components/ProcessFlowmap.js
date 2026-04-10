import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* SECTION */
const Section = styled.section`
  padding: 5rem 8rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  @media (max-width: 1200px) {
    padding: 4rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

/* DECORATIVE BACKGROUND ELEMENTS */
const BackgroundCircle = styled.div`
  position: absolute;
  top: 10%;
  right: -5%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(228,28,57,0.02) 0%, rgba(228,28,57,0) 70%);
  pointer-events: none;
`;

const BackgroundCircle2 = styled.div`
  position: absolute;
  bottom: 10%;
  left: -5%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(228,28,57,0.02) 0%, rgba(228,28,57,0) 70%);
  pointer-events: none;
`;

/* HEADER */
const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const Title = styled.h2`
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    /* margin-bottom: 60px; */
    color: #454545;


  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  max-width: 650px;
  margin: 0 auto;
  color: #6b7280;
  font-size: 1.05rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
`;

/* CREATIVE LAYOUT CONTAINER */
const CreativeLayout = styled.div`
  position: relative;
  min-height: 600px;
  margin: 4rem 0;

  @media (max-width: 968px) {
    min-height: auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;

/* SVG CONNECTION LINES */
const ConnectionSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 968px) {
    display: none;
  }
`;

/* STEP STYLES - DIFFERENT POSITIONS */
const Step1 = styled.div`
  position: absolute;
  top: 0;
  left: 5%;
  width: 280px;
  z-index: 2;

  @media (max-width: 968px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    margin: 0 auto;
  }
`;

const Step2 = styled.div`
  position: absolute;
  top: 15%;
  right: 8%;
  width: 280px;
  z-index: 2;

  @media (max-width: 968px) {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    margin: 0 auto;
  }
`;

const Step3 = styled.div`
  position: absolute;
  bottom: 15%;
  left: 12%;
  width: 280px;
  z-index: 2;

  @media (max-width: 968px) {
    position: relative;
    bottom: auto;
    left: auto;
    width: 100%;
    margin: 0 auto;
  }
`;

const Step4 = styled.div`
  position: absolute;
  bottom: 5%;
  right: 15%;
  width: 280px;
  z-index: 2;

  @media (max-width: 968px) {
    position: relative;
    bottom: auto;
    right: auto;
    width: 100%;
    margin: 0 auto;
  }
`;

/* CENTRAL ELEMENT */
const CentralElement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #e41c39 0%, #ff6b6b 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  box-shadow: 0 20px 40px rgba(228, 28, 57, 0.3);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 20px 40px rgba(228, 28, 57, 0.3);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      box-shadow: 0 30px 50px rgba(228, 28, 57, 0.5);
    }
  }

  @media (max-width: 968px) {
    display: none;
  }
`;

const DaysNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  line-height: 1;
`;

const DaysText = styled.div`
  font-size: 0.9rem;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
`;

/* STEP CARD */
const StepCard = styled.div`
  background: white;
  border-radius: 28px;
  padding: 1.8rem;
  box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
  cursor: pointer;
  position: relative;
  border: 2px solid ${props => props.active ? '#e41c39' : 'rgba(228, 28, 57, 0.1)'};
  transform: ${props => props.active ? 'scale(1.05)' : 'scale(1)'};

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 45px -12px rgba(228, 28, 57, 0.2);
    border-color: rgba(228, 28, 57, 0.3);
  }

  @media (max-width: 968px) {
    transform: scale(1) !important;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const StepBadge = styled.div`
  display: inline-block;
  background: ${props => props.active ? '#e41c39' : '#f3f4f6'};
  color: ${props => props.active ? 'white' : '#e41c39'};
  padding: 0.3rem 1rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
  color: #1f2937;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StepDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const StepNumber = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  width: 45px;
  height: 45px;
  background: ${props => props.active ? '#e41c39' : 'white'};
  border: 2px solid #e41c39;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  color: ${props => props.active ? 'white' : '#e41c39'};
  background: ${props => props.active ? '#e41c39' : 'white'};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
`;

/* PROGRESS DOTS */
const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  position: relative;
  z-index: 10;

  @media (min-width: 969px) {
    display: none;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#e41c39' : '#e5e7eb'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    background: #e41c39;
  }
`;

/* STATS SECTION */
const StatsSection = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0;
  /* border-top: 2px solid #f3f4f6; */
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 4rem;
  }
`;

const StatItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(228, 28, 57, 0.2);
    box-shadow: 0 10px 25px -12px rgba(228, 28, 57, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #e41c39;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatLabel = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const JourneyProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "STEP 01",
      title: "Activation",
      description: "Choose your industry and license type to go live instantly",
    },
    {
      step: "STEP 02",
      title: "Migration",
      description: "Upload your data to the system with just one click",
    },
    {
      step: "STEP 03",
      title: "Training",
      description: "Role-based tutorials for your teams.",
    },
    {
      step: "STEP 04",
      title: "Launch",
      description: "Go live with full operational visibility and generate your first report.",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const stats = [
    { number: "7 Days", label: "Complete Implementation" },
    { number: "Zero Disruption", label: "Business Continuity" },
    { number: "24/7 Support", label: "Expert Assistance" },
    { number: "100% Success", label: "Client Satisfaction" }
  ];

  // SVG Paths for connections
  const getPath = (startX, startY, endX, endY) => {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 - 50;
    return `M ${startX} ${startY} Q ${midX} ${midY}, ${endX} ${endY}`;
  };

  return (
    <Section>
      <BackgroundCircle />
      <BackgroundCircle2 />

      <Header>
        <Title>
          Go from Setup to Live in 7 Days.
        </Title>
        {/* <Subtitle>
                    Our streamlined ERP implementation gets critical operations up and running without the usual headaches.
                </Subtitle> */}
      </Header>

      <CreativeLayout>
        {/* SVG Connections - Desktop only */}
        <ConnectionSvg viewBox="0 0 1200 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e41c39" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#e41c39" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Connection paths with animation */}
          <path
            d={getPath(180, 100, 600, 280)}
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 8"
          >
            <animate attributeName="stroke-dashoffset" values="0;16" dur="1s" repeatCount="indefinite" />
          </path>

          <path
            d={getPath(950, 200, 600, 280)}
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 8"
          >
            <animate attributeName="stroke-dashoffset" values="0;16" dur="1s" repeatCount="indefinite" delay="0.3s" />
          </path>

          <path
            d={getPath(250, 550, 600, 280)}
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 8"
          >
            <animate attributeName="stroke-dashoffset" values="0;16" dur="1s" repeatCount="indefinite" delay="0.6s" />
          </path>

          <path
            d={getPath(900, 550, 600, 280)}
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 8"
          >
            <animate attributeName="stroke-dashoffset" values="0;16" dur="1s" repeatCount="indefinite" delay="0.9s" />
          </path>
        </ConnectionSvg>

        {/* Central Element */}
        <CentralElement>
          <DaysNumber>7</DaysNumber>
          <DaysText>DAYS</DaysText>
        </CentralElement>

        {/* Steps in creative positions */}
        <Step1>
          <StepCard active={activeStep === 0} onClick={() => handleStepClick(0)}>
            <StepNumber active={activeStep === 0}>1</StepNumber>
            <StepBadge active={activeStep === 0}>STEP 01</StepBadge>
            <StepTitle>Activation</StepTitle>
            <StepDescription>Choose your industry and license type to go live instantly.</StepDescription>
          </StepCard>
        </Step1>

        <Step2>
          <StepCard active={activeStep === 1} onClick={() => handleStepClick(1)}>
            <StepNumber active={activeStep === 1}>2</StepNumber>
            <StepBadge active={activeStep === 1}>STEP 02</StepBadge>
            <StepTitle>Migration</StepTitle>
            <StepDescription>Upload your data to the system with just one click.</StepDescription>
          </StepCard>
        </Step2>

        <Step3>
          <StepCard active={activeStep === 2} onClick={() => handleStepClick(2)}>
            <StepNumber active={activeStep === 2}>3</StepNumber>
            <StepBadge active={activeStep === 2}>STEP 03</StepBadge>
            <StepTitle>Training</StepTitle>
            <StepDescription>Role-based tutorials for your teams.</StepDescription>
          </StepCard>
        </Step3>

        <Step4>
          <StepCard active={activeStep === 3} onClick={() => handleStepClick(3)}>
            <StepNumber active={activeStep === 3}>4</StepNumber>
            <StepBadge active={activeStep === 3}>STEP 04</StepBadge>
            <StepTitle>Launch</StepTitle>
            <StepDescription>Go live with full operational and visibility .</StepDescription>
          </StepCard>
        </Step4>
      </CreativeLayout>

      {/* Mobile Progress Dots */}
      <ProgressDots>
        {steps.map((_, idx) => (
          <Dot
            key={idx}
            active={activeStep === idx}
            onClick={() => handleStepClick(idx)}
          />
        ))}
      </ProgressDots>

      <StatsSection>
        {stats.map((stat, idx) => (
          <StatItem key={idx}>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsSection>
    </Section>
  );
};

export default JourneyProcess;