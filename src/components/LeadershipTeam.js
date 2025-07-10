import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Team from './../assets/img/TemIcon.jpg';
import Linkind from './../assets/img/linkedin.png';
import Lipika from './../assets/img/lipika.png';
import Sk from './../assets/img/Sk.svg';
import Jaganath from './../assets/img/sk2.svg';
import Satish from './../assets/img/Satish (1).jpg';
import Jayanthi from './../assets/img/freepik__enhance__57693.png';

// Enhanced Keyframe Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const morphing = keyframes`
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const slideInFromLeft = keyframes`
  0% { 
    opacity: 0; 
    transform: translateX(-100px); 
  }
  100% { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const slideInFromRight = keyframes`
  0% { 
    opacity: 0; 
    transform: translateX(100px); 
  }
  100% { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const scaleIn = keyframes`
  0% { 
    opacity: 0; 
    transform: scale(0.8); 
  }
  100% { 
    opacity: 1; 
    transform: scale(1); 
  }
`;

const rotateIn = keyframes`
  0% { 
    opacity: 0; 
    transform: rotate(-180deg) scale(0.5); 
  }
  100% { 
    opacity: 1; 
    transform: rotate(0deg) scale(1); 
  }
`;

const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
  50% { text-shadow: 0 0 20px rgba(251, 146, 60, 0.8), 0 0 30px rgba(251, 146, 60, 0.6); }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Enhanced Container with Parallax Effect
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff8f0 0%, #fef3e2 50%, #fff8f0 100%);
  position: relative;
  overflow: hidden;
`;

// Enhanced Background Elements with Morphing
const BackgroundElement = styled.div`
  position: absolute;
  animation: ${morphing} 8s ease-in-out infinite, ${pulse} 4s ease-in-out infinite;
  filter: blur(40px);
  
  &:first-child {
    top: 10%;
    left: 10%;
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, rgba(251, 146, 60, 0.1), rgba(249, 115, 22, 0.15));
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    top: 60%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: linear-gradient(45deg, rgba(251, 146, 60, 0.08), rgba(249, 115, 22, 0.12));
    animation-delay: 2s;
  }
  
  &:nth-child(3) {
    bottom: 10%;
    left: 30%;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, rgba(251, 146, 60, 0.12), rgba(249, 115, 22, 0.18));
    animation-delay: 4s;
  }
`;

// Floating Particles
const Particle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(251, 146, 60, 0.6);
  border-radius: 50%;
  animation: ${float} 3s ease-in-out infinite;
  
  ${props => css`
    top: ${props.top}%;
    left: ${props.left}%;
    animation-delay: ${props.delay}s;
    animation-duration: ${props.duration}s;
  `}
`;

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

// Enhanced Content Wrapper
const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 16px;
`;

// Enhanced Section Header with Glowing Effect
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  animation: ${scaleIn} 1s ease-out;
`;

const HeaderContainer = styled.div`
  display: inline-block;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    //background: linear-gradient(45deg, transparent, rgba(251, 146, 60, 0.1), transparent);
    border-radius: 20px;
    animation: ${shimmer} 3s ease-in-out infinite;
  }
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
  height: 6px;
  background: linear-gradient(90deg, transparent, #fb923d, #ea580c, #fb923d, transparent);
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: ${shimmer} 2s ease-in-out infinite;
  }
`;

const SectionDescription = styled.p`
  color: #4b5563;
  margin-top: 32px;
  font-size: 1.25rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  font-weight: 400;
`;

// Enhanced Member Container with Magnetic Effect
const MemberContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  ${props => css`
    animation: ${props.index % 2 === 0 ? slideInFromLeft : slideInFromRight} 0.8s ease-out;
    animation-delay: ${props.index * 0.2}s;
    animation-fill-mode: both;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(251, 146, 60, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 32px 64px -12px rgba(0, 0, 0, 0.15),
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(251, 146, 60, 0.1);
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

// Enhanced Image Container with Hover Effects
const ImageContainer = styled.div`
  flex: 0 0 320px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.05), rgba(251, 146, 60, 0.1));
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 280px;
    height: 280px;
    background: linear-gradient(45deg, rgba(251, 146, 60, 0.1), transparent, rgba(251, 146, 60, 0.1));
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${morphing} 6s ease-in-out infinite;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    padding: 24px;
  }
`;

const SquareImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 260px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2);
  }
`;

// Enhanced Details Container
const DetailsContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 32px;
  }
`;

// Enhanced Member Name with Gradient
const MemberName = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(45deg, #1f2937, #ea580c);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 12px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #fb923d, #ea580c);
    transition: width 0.3s ease;
  }
  
  ${MemberContainer}:hover &::after {
    width: 100%;
  }
`;

// Enhanced Role Badge
const MemberRole = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(45deg, #fed7aa, #fff8f0);
  border-radius: 20px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
  }
  
  ${MemberContainer}:hover &::before {
    left: 100%;
  }
`;

const RoleText = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #c2410c;
  margin: 0;
  position: relative;
  z-index: 1;
`;

// Enhanced Descriptions
const ShortDescription = styled.p`
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 20px;
  font-weight: 500;
`;

const FullDescription = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.8;
  margin-bottom: 32px;
  text-align: justify;
`;

// Enhanced LinkedIn Button
const LinkedInButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: linear-gradient(45deg, #2563eb, #1d4ed8);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: auto;
  align-self: flex-start;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(45deg, #1d4ed8, #1e40af);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const LinkedInIcon = styled.svg`
  width: 18px;
  height: 18px;
  fill: currentColor;
  transition: transform 0.3s ease;
  
  ${LinkedInButton}:hover & {
    transform: scale(1.2);
  }
`;

// Section Wrapper with Stagger Animation
const SectionWrapper = styled.div`
  margin-bottom: ${props => props.isLast ? '0' : '100px'};
  animation: ${bounceIn} 0.8s ease-out;
  animation-fill-mode: both;
`;

// Sparkle Effect Component
const SparkleEffect = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fb923d;
  border-radius: 50%;
  animation: ${sparkle} 2s ease-in-out infinite;
  
  ${props => css`
    top: ${props.top}%;
    left: ${props.left}%;
    animation-delay: ${props.delay}s;
  `}
`;

const LeadershipAdvisors = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
  }));

  // Generate sparkle effects
  const sparkles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

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
      name: "Dr. M R Jaganath",
      role: "Director Strategy",
      image: `${Jaganath}`,
      shortDesc: "Dr. M R Jaganath has an illustrious career as a Scientist managing deep Technology, Translational Medicine, Drug development, Drug discovery",
      fullDesc: "Dr. M.R. Jaganath, Technical Specialist on Atomwalk's Board, is an expert in lab management, GLP, and GMP. As former CSO of Connexios Life Sciences, he contributed to translational network biology and led a team developing drug candidates for type 2 diabetes. He holds a PhD from IISc Bangalore and degrees in Agriculture and Agricultural Microbiology from UAS Bangalore. His career spans banking at RBI, startup support in distillery effluent treatment and plant tissue culture, and extensive work in drug discovery and development. A prolific scientist, he has numerous publications in esteemed journals.",
      linkedin: null,
      isExecutive: true
    },
    {
      id: 3,
      name: "Dr. Lipika Sahoo",
      role: "Co-Founder , Director Innovation",
      image: `${Lipika}`,
      shortDesc: "Dr. Lipika Sahoo, with 24 years of academia and industry experience in technology, innovation, and intellectual property, holds a PhD from IISc",
      fullDesc: "Dr. Lipika Sahoo, Co-Founder and Director of Atomwalk, brings 24 years of experience in academia and industry, specializing in technology, innovation, and intellectual property. She holds a PhD from the Indian Institute of Science (IISc) and has earned multiple advanced degrees, including an MSc, PGDIPR, PGCBM, and certifications from WIPO and IIM Bangalore. Dr. Sahoo serves as a reviewer for various innovation programs. Her extensive expertise supports Atomwalk's mission of driving impactful, socially relevant technological innovations.",
      linkedin: null,
      isExecutive: true
    },
    {
      id: 4,
      name: "SK Patnaik",
      role: "Business, Product and Sales Strategy",
      image: `${Sk}`,
      shortDesc: "SK has led Business Management roles in the IT Services industry and lived in the US, UK, South-East Asia, India. He has successfully set-up new business divisions",
      fullDesc: "SK Patnaik, who joined Atomwalk's Board in 2021, brings expertise in business strategy, product innovation, and revenue growth. He led key roles in client relations, sales, and P&L management in IT Services across global markets in a career of 25 years. At Infosys, he established the APAC and India operations for Manufacturing Vertical and led the adoptions of Digital & Cloud, IoT, Smart Manufacturing, Automation & AI at several Fortune 500 Customers. He has long involvement in the ERP space with SAP, Oracle; platforms like Salesforce, and other SaaS solutions. SK also co-founded a deep-tech telecom start-up. He holds an MBA in Marketing and Systems from the Xavier Institute of Management, Bhubaneswar, India.",
      linkedin: null,
      isExecutive: true
    },
    {
      id: 5,
      name: "Mr. Satish Murthy V.",
      role: "Quality Specialist",
      image: `${Satish}`,
      shortDesc: "Mr. Satish Murthy V was instrumental in establishing ISO 17025:2005 system at the test facility and accreditation by NABL",
      fullDesc: "Mr. Satish Murthy V., M.Sc., RQAP-GLP, joined Atomwalk's Board as Quality Specialist, brings 28 years of expertise in Quality Management. Satish Murthy V started his career in the year 1995 in the Quality Assurance Unit of Rallis Research, Eurofins Advinus Limited and Adgyl Lifesciences Private Limited. He has expertise in Quality Assurance functions like Safety Assessment, Analytical RD, DMPK and Clinical Pharmacology and is well versed with the OECD Principles of GLP, US FDA 21 CFR part 58, US EPA 40 CFR part 160 and 40 CFR Part 792 GLP standards. He serves as a faculty at the various GLP training programs conducted by the National GLP Compliance Monitoring Authority, India.",
      linkedin: null,
      isExecutive: true
    },
    {
      id: 6,
      name: "Jayanthi S Vel",
      role: "Human Resources Officer (HRO)",
      image: `${Jayanthi}`,
      shortDesc: "Ms Jayanthi is a senior executive responsible for overseeing all aspects of an organization's human resource functions",
      fullDesc: "Ms Jayanthi is a senior executive responsible for overseeing all aspects of an organization's human resource functions, including recruitment, employee relations, talent development, compensation and benefits, and workforce planning, all while aligning HR strategies with the company's overall business goals. Setting up performance evaluation processes Implementing, Key Performance Indicators (KPIs), Identifying training and development needs.",
      linkedin: null,
      isExecutive: true
    }
  ];

  const executiveMembers = teamMembers.filter(member => member.isExecutive);

  return (
    <Container>
      <BackgroundContainer>
        <BackgroundElement />
        <BackgroundElement />
        <BackgroundElement />
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            top={particle.top}
            left={particle.left}
            delay={particle.delay}
            duration={particle.duration}
          />
        ))}
        
        {/* Sparkle Effects */}
        {sparkles.map((sparkle) => (
          <SparkleEffect
            key={sparkle.id}
            top={sparkle.top}
            left={sparkle.left}
            delay={sparkle.delay}
          />
        ))}
      </BackgroundContainer>

      <ContentWrapper>
        <SectionWrapper>
          <SectionHeader>
            <HeaderContainer>
              <SectionTitle>Our Teams</SectionTitle>
              <HeaderLine />
            </HeaderContainer>
            <SectionDescription>
              Visionary leaders driving innovation and excellence in enterprise solutions
            </SectionDescription>
          </SectionHeader>

          <div>
            {executiveMembers.map((member, index) => (
              <MemberContainer key={member.id} index={index}>
                <ImageContainer>
                  <SquareImage src={member.image} alt={member.name} />
                </ImageContainer>
                <DetailsContainer>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>
                    <RoleText>{member.role}</RoleText>
                  </MemberRole>
                  <ShortDescription>{member.shortDesc}</ShortDescription>
                  <FullDescription>{member.fullDesc}</FullDescription>
                  {member.linkedin && (
                    <LinkedInButton 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                      </LinkedInIcon>
                      View LinkedIn Profile
                    </LinkedInButton>
                  )}
                </DetailsContainer>
              </MemberContainer>
            ))}
          </div>
        </SectionWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default LeadershipAdvisors;