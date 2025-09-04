import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Modal from "./modals/Modal";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const cardHover = keyframes`
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-5px) rotate(0.5deg); }
  100% { transform: translateY(-8px) rotate(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Main container with animated background
const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #e0e7ff, #dbeafe);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  padding: 20px 0;
  overflow-x: hidden;
`;

// Page container
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 90px auto;
  padding: 20px;
  color: #2d3748;
  position: relative;
  z-index: 2;
`;

// Floating particles background
const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(79, 70, 229, 0.15);
  border-radius: 50%;
  animation: ${float} 10s infinite ease-in-out;
  animation-delay: ${props => props.delay || '0s'};
  
  &:nth-child(1) {
    top: 20%;
    left: 10%;
  }
  &:nth-child(2) {
    top: 60%;
    left: 5%;
    width: 8px;
    height: 8px;
  }
  &:nth-child(3) {
    top: 40%;
    left: 15%;
    width: 10px;
    height: 10px;
  }
  &:nth-child(4) {
    top: 80%;
    left: 20%;
  }
  &:nth-child(5) {
    top: 30%;
    right: 10%;
  }
  &:nth-child(6) {
    top: 70%;
    right: 5%;
    width: 8px;
    height: 8px;
  }
  &:nth-child(7) {
    top: 50%;
    right: 15%;
    width: 10px;
    height: 10px;
  }
  &:nth-child(8) {
    top: 20%;
    right: 20%;
  }
`;

// Header Section
const HeaderSection = styled.section`
  text-align: center;
  padding: 60px 20px 60px;
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #4f46e5, #3b82f6, #0ea5e9);
  }

  @media (max-width: 768px) {
    padding: 60px 15px 40px;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #3b82f6);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Statistics Section
const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 70px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease both;
  animation-delay: ${props => props.delay || '0ms'};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #3b82f6);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  color: #64748b;
  font-weight: 500;
  font-size: 1.1rem;
`;

// Patent Section
const PatentSection = styled.section`
  margin-bottom: 70px;
  animation: ${fadeIn} 0.8s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 35px;
  font-weight: 700;
  color: #1e293b;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #3b82f6);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
`;

const PatentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const PatentCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation-delay: ${props => props.delay || '0ms'};
  cursor: ${props => props.isGranted ? 'pointer' : 'default'};
  
  &:hover {
    transform: ${props => props.isGranted ? 'translateY(-8px)' : 'translateY(-3px)'};
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    ${props => props.isGranted && css`
      animation: ${cardHover} 0.8s ease forwards;
    `}
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${props => props.isGranted 
      ? 'linear-gradient(90deg, #10b981, #059669)' 
      : 'linear-gradient(90deg, #4f46e5, #3b82f6)'};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0));
    background-size: 200% 100%;
    animation: ${shimmer} 8s infinite;
    pointer-events: none;
    opacity: 0.5;
  }
`;

const PatentIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: ${props => props.isGranted ? '#10b981' : '#4f46e5'};
  animation: ${pulse} 2s infinite ease-in-out;
`;

const PatentNumber = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.isGranted ? '#059669' : '#1e40af'};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: ${props => props.isGranted ? "'🏆'" : "'📄'"};
    font-size: 1.4rem;
  }
`;

const PatentTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const PatentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const PatentDetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #64748b;
  
  &::before {
    content: '${props => props.icon}';
    margin-right: 10px;
    font-size: 1.1rem;
    width: 20px;
    text-align: center;
  }
`;

const PatentStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => {
    if (props.status === "Granted") return "#dcfce7";
    if (props.status === "Filled") return "#dbeafe";
    return "#fef3c7";
  }};
  color: ${props => {
    if (props.status === "Granted") return "#166534";
    if (props.status === "Filled") return "#1e40af";
    return "#92400e";
  }};
  margin-top: 10px;
  animation: ${slideIn} 0.5s ease both;
  
  &::before {
    content: "${props => {
      if (props.status === "Granted") return "✓";
      if (props.status === "Filled") return "⏳";
      return "⚠";
    }}";
  }
`;

const ViewCertificateButton = styled.button`
  background: linear-gradient(90deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(5, 150, 105, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(5, 150, 105, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Info Section
const InfoSection = styled.section`
  background: rgba(248, 250, 252, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 50px;
  margin-bottom: 70px;
  animation: ${fadeIn} 0.8s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #4f46e5, #3b82f6, #0ea5e9);
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 25px;
  color: #1e293b;
  font-weight: 700;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #3b82f6);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const InfoText = styled.p`
  color: #475569;
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

// CTA Section
const CTASection = styled.section`
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  border-radius: 20px;
  animation: ${fadeIn} 0.8s ease;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(79, 70, 229, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    transform: rotate(30deg);
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const CTATitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CTAText = styled.p`
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
  opacity: 0.9;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled.button`
  background: white;
  color: #4f46e5;
  border: none;
  padding: 16px 36px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(79, 70, 229, 0.4);
  }
`;

const PatentPage = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState(null);

  const patents = [
    {
      number: "201941005203",
      title: "FACILITATING FINANCING IN SUPPLY CHAIN MANAGEMENT USING BLOCKCHAIN",
      filingDate: "10th Feb 2019",
      jurisdiction: "India",
      isGranted: false,
      status: "Filled",
      icon: "🔗"
    },
    {
      number: "PCT/IN2020/050134",
      title: "FACILITATING FINANCING IN SUPPLY CHAIN MANAGEMENT USING BLOCKCHAIN",
      filingDate: "10th Feb 2020",
      jurisdiction: "Entered to PCT",
      isGranted: false,
      status: "Filled",
      icon: "🌐"
    },
    {
      number: "17/429,751",
      title: "FACILITATING FINANCING IN SUPPLY CHAIN MANAGEMENT USING BLOCKCHAIN",
      filingDate: "10th Aug 2021",
      jurisdiction: "NP Entry- US",
      isGranted: false,
      status: "Filled",
      icon: "🇺🇸"
    },
    {
      number: "202141060251",
      title: "A CLOUD-BASED ERP SYSTEM FOR SECURE DATA EXCHANGE BETWEEN ENTITIES",
      filingDate: "23rd Dec 2021",
      jurisdiction: "India",
      isGranted: false,
      status: "Filled",
      icon: "☁️"
    },
    {
      number: "PCT/IB2022/062742",
      title: "A CLOUD-BASED ERP SYSTEM FOR SECURE DATA EXCHANGE BETWEEN ENTITIES",
      filingDate: "23rd Dec 2022",
      jurisdiction: "Entered to PCT",
      isGranted: false,
      status: "Filled",
      icon: "🌐"
    },
    {
      number: "202447056087",
      title: "A CLOUD-BASED ERP SYSTEM FOR SECURE DATA EXCHANGE BETWEEN ENTITIES",
      filingDate: "23rd July 2024",
      jurisdiction: "NP Entry- India",
      isGranted: false,
      status: "Filled",
      icon: "🇮🇳"
    },
    {
      number: "18/723,533",
      title: "A CLOUD-BASED ERP SYSTEM FOR SECURE DATA EXCHANGE BETWEEN ENTITIES",
      filingDate: "24th June 2024",
      jurisdiction: "NP Entry- US",
      isGranted: false,
      status: "Filled",
      icon: "🇺🇸"
    },
    {
      number: "202141060263",
      title: "A CLOUD-BASED ERP SYSTEM FOR DATA SHARING BETWEEN BUSINESS ENTITIES TO ENABLE MARKET PLACE FEATURE",
      filingDate: "23rd Dec 2021",
      jurisdiction: "India",
      isGranted: true,
      status: "Granted",
      icon: "🏆",
      certificateImage: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Patent_202141060263.jpeg"
    },
    {
      number: "PCT/IB2022/062744",
      title: "A CLOUD-BASED ERP SYSTEM FOR DATA SHARING BETWEEN BUSINESS ENTITIES TO ENABLE MARKET PLACE FEATURE",
      filingDate: "23rd Dec 2022",
      jurisdiction: "Entered to PCT",
      isGranted: false,
      status: "Filled",
      icon: "🌐"
    },
    {
      number: "202141060570",
      title: "AI – BASED BANK ACCOUNT RECONCILIATION AND CREATION OF LEDGER ENTRY IN ERP SYSTEM",
      filingDate: "24th Dec 2021",
      jurisdiction: "India",
      isGranted: false,
      status: "Filled",
      icon: "🤖"
    },
    {
      number: "PCT/IB2022/062780",
      title: "AI – BASED BANK ACCOUNT RECONCILIATION AND CREATION OF LEDGER ENTRY IN ERP SYSTEM",
      filingDate: "26th Dec 2022",
      jurisdiction: "Entered to PCT",
      isGranted: false,
      status: "Filled",
      icon: "🌐"
    },
    {
      number: "202541083534",
      title: "AI-BASED IMAGING AND PATHOLOGY DIAGNOSTIC SYSTEM FOR EARLY AND ACCURATE ORAL CANCER DETECTION",
      filingDate: "2nd Sept 2025",
      jurisdiction: "India",
      isGranted: false,
      status: "Filled",
      icon: "🏥"
    }
  ];

  const handlePatentClick = (patent) => {
    if (patent.isGranted) {
      setSelectedPatent(patent);
      setShowCertificate(true);
    }
  };

  const closeCertificate = () => {
    setShowCertificate(false);
    setSelectedPatent(null);
  };

  const reqdemo = () => {
    window.location.href = "/demo.html";
  };

  return (
    <MainContainer>
      <ParticlesContainer>
        <Particle delay="0s" />
        <Particle delay="1s" />
        <Particle delay="2s" />
        <Particle delay="3s" />
        <Particle delay="4s" />
        <Particle delay="5s" />
        <Particle delay="6s" />
        <Particle delay="7s" />
      </ParticlesContainer>

      <PageContainer>
        <HeaderSection>
          <PageTitle>Intellectual Property</PageTitle>
          <PageSubtitle>
            Our growing intellectual property portfolio protects innovations in blockchain,
            cloud-based ERP systems, AI technologies, and healthcare diagnostics that advance
            our mission of digital transformation across industries.
          </PageSubtitle>
        </HeaderSection>

        <StatsSection>
          <StatCard delay="100ms">
            <StatNumber>12</StatNumber>
            <StatLabel>Patent Applications</StatLabel>
          </StatCard>
          <StatCard delay="200ms">
            <StatNumber>30+ Countries</StatNumber>
            <StatLabel>Trademarks Filed</StatLabel>
          </StatCard>
          <StatCard delay="300ms">
            <StatNumber>10+</StatNumber>
            <StatLabel>Technology Domains</StatLabel>
          </StatCard>
        </StatsSection>

        <PatentSection>
          <SectionTitle>Patent Portfolio</SectionTitle>
          <PatentGrid>
            {patents.map((patent, index) => (
              <PatentCard 
                key={index} 
                isGranted={patent.isGranted}
                delay={`${index * 100}ms`}
                onClick={() => handlePatentClick(patent)}
              >
                <PatentIcon isGranted={patent.isGranted}>
                  {patent.icon}
                </PatentIcon>
                <PatentNumber isGranted={patent.isGranted}>
                  {patent.number}
                </PatentNumber>
                <PatentTitle>{patent.title}</PatentTitle>
                <PatentDetails>
                  <PatentDetailItem icon="📅">
                    Filed: {patent.filingDate}
                  </PatentDetailItem>
                  <PatentDetailItem icon="🗺️">
                    Jurisdiction: {patent.jurisdiction}
                  </PatentDetailItem>
                </PatentDetails>
                <PatentStatus status={patent.status}>
                  {patent.status}
                </PatentStatus>
                {patent.isGranted && (
                  <ViewCertificateButton>
                    View Certificate
                  </ViewCertificateButton>
                )}
              </PatentCard>
            ))}
          </PatentGrid>
        </PatentSection>

        <InfoSection>
          <InfoTitle>Our Intellectual Property Strategy</InfoTitle>
          <InfoText>
            We pursue a comprehensive intellectual property strategy to protect our innovations across
            multiple technology platforms and geographic regions. Our patent portfolio covers blockchain
            applications, cloud-based ERP systems, AI technologies, and healthcare diagnostics that
            form the foundation of our product offerings.
          </InfoText>
          <InfoText>
            We work with leading intellectual property law firms to develop and execute our IP strategy,
            ensuring strong protection for our innovations while maintaining the freedom to operate in
            our core areas of research and development.
          </InfoText>
        </InfoSection>

        <CTASection>
          <CTATitle>Partner with Us</CTATitle>
          <CTAText>
            Interested in licensing our technology or exploring collaboration opportunities?
            Contact us to know more.
          </CTAText>
          <CTAButton onClick={reqdemo}>Contact Us</CTAButton>
        </CTASection>
      </PageContainer>

      {showCertificate && (
        <Modal onClose={closeCertificate} position="top">
          <img
            src={selectedPatent.certificateImage}
            alt="Patent Certificate"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </Modal>
      )}
    </MainContainer>
  );
};

export default PatentPage;