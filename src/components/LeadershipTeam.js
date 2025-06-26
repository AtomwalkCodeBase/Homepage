import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Team from './../assets/img/TemIcon.jpg';
import Linkind from './../assets/img/linkedin.png';
import Lipika from './../assets/img/lipika.jpg';
import Sk from './../assets/img/Sk.svg';
import Jaganath from './../assets/img/sk2.svg';
import Satish from './../assets/img/Satish (1).jpg';
import Jayanthi from './../assets/img/freepik__enhance__57693.png';

// Keyframe Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
`;

// Main Container
const Container = styled.div`
  min-height: 100vh;
  background-color: #fff8f0;
  position: relative;
  overflow: hidden;
`;

// Animated Background Elements
const BackgroundElement = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: ${pulse} 4s ease-in-out infinite;
  
  &:first-child {
    top: 25%;
    left: 25%;
    width: 256px;
    height: 256px;
    background-color: rgba(251, 146, 60, 0.1);
  }
  
  &:last-child {
    bottom: 25%;
    right: 25%;
    width: 384px;
    height: 384px;
    background-color: rgba(251, 146, 60, 0.15);
    animation-delay: 2s;
  }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

// Content Wrapper
const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 16px;
`;

// Section Wrapper
const SectionWrapper = styled.div`
  margin-bottom: ${props => props.isLast ? '0' : '80px'};
`;

// Section Header
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const HeaderContainer = styled.div`
  display: inline-block;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(to right, #1f2937, #ea580c, #1f2937);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeaderLine = styled.div`
  height: 4px;
  background: linear-gradient(to right, transparent, #fb923d, transparent);
  border-radius: 9999px;
`;

const SectionDescription = styled.p`
  color: #4b5563;
  margin-top: 24px;
  font-size: 1.125rem;
  max-width: 512px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

// Grid Layout
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  max-width: ${props => props.isExecutive ? '1024px' : '1536px'};
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

// Card Container
const CardContainer = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.7s ease;
  transform: ${props => props.isVisible ? 'translateY(0) scale(1)' : 'translateY(48px) scale(0.95)'};
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition-delay: ${props => props.index * 150}ms;
  perspective: 1000px;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
  }
`;

// Card Inner (3D Container)
const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 384px;
  transition: transform 0.7s ease;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

// Card Side Base
const CardSideBase = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

// Front Side
const CardFront = styled(CardSideBase)`
  background: white;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent, transparent, rgba(251, 146, 60, 0.1));
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  ${CardContainer}:hover &::before {
    opacity: 1;
  }
`;

// Back Side
const CardBack = styled(CardSideBase)`
  background: linear-gradient(135deg, #fff8f0, white);
  transform: rotateY(180deg);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

// Content Container
const ContentContainer = styled.div`
  position: relative;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Profile Image Container
const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const ProfileImageWrapper = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  border: 4px solid #fed7aa;
  overflow: hidden;
  transition: all 0.5s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
    border-color: #fdba74;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

// Floating Dots
const FloatingDotsContainer = styled.div`
  position: absolute;
  inset: -16px;
  opacity: 0;
  transition: opacity 0.5s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const FloatingDot = styled.div`
  position: absolute;
  border-radius: 50%;
  animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  
  &:first-child {
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #fdba74;
  }
  
  &:last-child {
    bottom: 0;
    left: 0;
    width: 6px;
    height: 6px;
    background-color: #fb923d;
    animation-delay: 0.5s;
  }
`;

// Name
const PersonName = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
  transition: color 0.3s ease;
  
  ${CardContainer}:hover & {
    color: #ea580c;
  }
`;

// Role Badge
const RoleBadge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(to right, #fed7aa, #fff8f0);
  border-radius: 9999px;
  margin-bottom: 16px;
`;

const RoleText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #c2410c;
  margin: 0;
`;

// Description
const Description = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

// Hover Indicator
const HoverIndicator = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const IndicatorContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f97316;
`;

const IndicatorText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
`;

const IndicatorIcon = styled.svg`
  width: 16px;
  height: 16px;
  animation: ${bounce} 2s infinite;
`;

// Back Card Content
const BackContent = styled.div`
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BackHeader = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const BackName = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
`;

const BackRole = styled.p`
  font-size: 0.875rem;
  color: #ea580c;
  font-weight: 500;
  margin: 0;
`;

const BackDescription = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 16px 0;
`;

const BackDescriptionText = styled.p`
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.6;
  text-align: justify;
  margin: 0;
`;

const BackFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #fed7aa;
`;

const LinkedInLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2563eb;
  transition: color 0.2s ease;
  text-decoration: none;
  
  &:hover {
    color: #1d4ed8;
  }
`;

const LinkedInIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;

const LinkedInText = styled.span`
  font-size: 0.75rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ea580c;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #c2410c;
  }
`;

const BackIcon = styled.svg`
  width: 16px;
  height: 16px;
`;

const BackText = styled.span`
  font-size: 0.75rem;
`;

// Floating Background
const FloatingBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 24px;
  background: linear-gradient(to right, rgba(251, 146, 60, 0.05), rgba(251, 146, 60, 0.1));
  filter: blur(20px);
  transform: scale(1.05);
  opacity: 0;
  transition: all 0.5s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const LeadershipAdvisors = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Manoj Kumar Sahoo",
      role: "Founder and Director",
      image: `${Team}`,
      shortDesc: "Manoj has 25+ years of experience in Product solution, Engineering and Development in two of the India's leading Products, Finacle (INFOSYS) and Tally",
      fullDesc: "Manoj K. Sahoo, Founder and Director of Atomwalk, drives product development and innovation with over 25 years of experience in engineering and software solutions. He was instrumental in building two of India's iconic software products: Finacle, Infosys's global banking solution, and Tally, a leading business tool for SMBs. Manoj's expertise spans payments, supply chain management, and delivery excellence, with multiple patents in product innovation. Holding a B-Tech from NIT Rourkela and an MS from BITS Pilani, he leads Atomwalk's mission to deliver ERP solutions that enhance business efficiency and digital transformation.",
      linkedin: "https://www.linkedin.com/in/manojksahoo",
      isExecutive: true
    },
    {
      id: 2,
      name: "Dr. Lipika Sahoo",
      role: "Co-Founder and Director",
      image: `${Lipika}`,
      shortDesc: "Dr. Lipika Sahoo, with 24 years of academia and industry experience in technology, innovation, and intellectual property, holds a PhD from IISc",
      fullDesc: "Dr. Lipika Sahoo, Co-Founder and Director of Atomwalk, brings 24 years of experience in academia and industry, specializing in technology, innovation, and intellectual property. She holds a PhD from the Indian Institute of Science (IISc) and has earned multiple advanced degrees, including an MSc, PGDIPR, PGCBM, and certifications from WIPO and IIM Bangalore. Dr. Sahoo serves as a reviewer for various innovation programs. Her extensive expertise supports Atomwalk's mission of driving impactful, socially relevant technological innovations.",
      linkedin: null,
      isExecutive: true
    },
    {
      id: 3,
      name: "SK Patnaik",
      role: "Business, Product and Sales Strategy",
      image: `${Sk}`,
      shortDesc: "SK has led Business Management roles in the IT Services industry and lived in the US, UK, South-East Asia, India. He has successfully set-up new business divisions",
      fullDesc: "SK Patnaik, who joined Atomwalk's Board in 2021, brings expertise in business strategy, product innovation, and revenue growth. He led key roles in client relations, sales, and P&L management in IT Services across global markets in a career of 25 years. At Infosys, he established the APAC and India operations for Manufacturing Vertical and led the adoptions of Digital & Cloud, IoT, Smart Manufacturing, Automation & AI at several Fortune 500 Customers. He has long involvement in the ERP space with SAP, Oracle; platforms like Salesforce, and other SaaS solutions. SK also co-founded a deep-tech telecom start-up. He holds an MBA in Marketing and Systems from the Xavier Institute of Management, Bhubaneswar, India.",
      linkedin: null,
      isExecutive: false
    },
    {
      id: 4,
      name: "Dr. M R Jaganath",
      role: "Technical Specialist",
      image: `${Jaganath}`,
      shortDesc: "He has an illustrious career as a Scientist managing deep Technology, Translational Medicine, Drug development, Drug discovery",
      fullDesc: "Dr. M.R. Jaganath, Technical Specialist on Atomwalk's Board, is an expert in lab management, GLP, and GMP. As former CSO of Connexios Life Sciences, he contributed to translational network biology and led a team developing drug candidates for type 2 diabetes. He holds a PhD from IISc Bangalore and degrees in Agriculture and Agricultural Microbiology from UAS Bangalore. His career spans banking at RBI, startup support in distillery effluent treatment and plant tissue culture, and extensive work in drug discovery and development. A prolific scientist, he has numerous publications in esteemed journals.",
      linkedin: null,
      isExecutive: false
    },
    {
      id: 6,
      name: "Mr. Satish Murthy V.",
      role: "Quality Specialist",
      image: `${Satish}`,
      shortDesc: "He was instrumental in establishing ISO 17025:2005 system at the test facility and accreditation by NABL",
      fullDesc: "Mr. Satish Murthy V., M.Sc., RQAP-GLP, joined Atomwalk's Board as Quality Specialist, brings 28 years of expertise in Quality Management. Satish Murthy V started his career in the year 1995 in the Quality Assurance Unit of Rallis Research, Eurofins Advinus Limited and Adgyl Lifesciences Private Limited. He has expertise in Quality Assurance functions like Safety Assessment, Analytical RD, DMPK and Clinical Pharmacology and is well versed with the OECD Principles of GLP, US FDA 21 CFR part 58, US EPA 40 CFR part 160 and 40 CFR Part 792 GLP standards. He serves as a faculty at the various GLP training programs conducted by the National GLP Compliance Monitoring Authority, India.",
      linkedin: null,
      isExecutive: false
    },
     {
      id: 5,
      name: "Jayanthi S Vel",
      role: "Human Resources Officer (HRO)",
      image: `${Jayanthi}`,
      shortDesc: "Ms Jayanthi is a senior executive responsible for overseeing all aspects of an organization's human resource functions",
      fullDesc: "Ms Jayanthi is a senior executive responsible for overseeing all aspects of an organization's human resource functions, including recruitment, employee relations, talent development, compensation and benefits, and workforce planning, all while aligning HR strategies with the company's overall business goals. Setting up performance evaluation processes Implementing, Key Performance Indicators (KPIs), Identifying training and development needs.",
      linkedin: null,
      isExecutive: false
    }
  ];

  const executiveMembers = teamMembers.filter(member => member.isExecutive);
  const advisors = teamMembers.filter(member => !member.isExecutive);

  const PersonCard = ({ member, index, isExecutive }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <CardContainer
        isVisible={visibleCards.includes(index)}
        index={index}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardInner isFlipped={isFlipped}>
          {/* Front Side */}
          <CardFront>
            <ContentContainer>
              <ProfileImageContainer>
                <ProfileImageWrapper isHovered={isHovered}>
                  <ProfileImage src={member.image} alt={member.name} />
                </ProfileImageWrapper>
                <FloatingDotsContainer>
                  <FloatingDot />
                  <FloatingDot />
                </FloatingDotsContainer>
              </ProfileImageContainer>

              <PersonName>{member.name}</PersonName>

              <RoleBadge>
                <RoleText>{member.role}</RoleText>
              </RoleBadge>

              <Description>{member.shortDesc}</Description>

              <HoverIndicator>
                <IndicatorContent>
                  <IndicatorText>Click to read more</IndicatorText>
                  <IndicatorIcon fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </IndicatorIcon>
                </IndicatorContent>
              </HoverIndicator>
            </ContentContainer>
          </CardFront>

          {/* Back Side */}
          <CardBack>
            <BackContent>
              <BackHeader>
                <BackName>{member.name}</BackName>
                <BackRole>{member.role}</BackRole>
              </BackHeader>

              <BackDescription>
                <BackDescriptionText>{member.fullDesc}</BackDescriptionText>
              </BackDescription>

              <BackFooter>
                {member.linkedin && (
                  <LinkedInLink 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkedInIcon viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                    </LinkedInIcon>
                    <LinkedInText>LinkedIn</LinkedInText>
                  </LinkedInLink>
                )}
                <BackButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <BackIcon fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </BackIcon>
                  <BackText>Back</BackText>
                </BackButton>
              </BackFooter>
            </BackContent>
          </CardBack>
        </CardInner>

        <FloatingBackground />
      </CardContainer>
    );
  };

  return (
    <Container>
      <BackgroundContainer>
        <BackgroundElement />
        <BackgroundElement />
      </BackgroundContainer>

      <ContentWrapper>
        {/* Executive Board Section */}
        <SectionWrapper>
          <SectionHeader>
            <HeaderContainer>
              <SectionTitle>Executive Board</SectionTitle>
              <HeaderLine />
            </HeaderContainer>
            <SectionDescription>
              Visionary leaders driving innovation and excellence in enterprise solutions
            </SectionDescription>
          </SectionHeader>

          <Grid isExecutive={true}>
            {executiveMembers.map((member, index) => (
              <PersonCard 
                key={member.id} 
                member={member} 
                index={index}
                isExecutive={true}
              />
            ))}
          </Grid>
        </SectionWrapper>

        {/* Board of Advisors Section */}
        <SectionWrapper isLast={true}>
          <SectionHeader>
            <HeaderContainer>
              <SectionTitle>Board of Advisors</SectionTitle>
              <HeaderLine />
            </HeaderContainer>
            <SectionDescription>
              Expert advisors providing strategic guidance and specialized knowledge
            </SectionDescription>
          </SectionHeader>

          <Grid isExecutive={false}>
            {advisors.map((member, index) => (
              <PersonCard 
                key={member.id} 
                member={member} 
                index={index + 2}
                isExecutive={false}
              />
            ))}
          </Grid>
        </SectionWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default LeadershipAdvisors;