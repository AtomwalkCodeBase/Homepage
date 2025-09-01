import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

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

// Main container
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 90px auto;
  padding: 20px;
  color: #2d3748;
`;

// Header Section
const HeaderSection = styled.section`
  text-align: center;
  padding: 60px 20px 60px;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #f6f9fc 0%, #f1f5f9 100%);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease;

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
  background: white;
  border-radius: 16px;
  padding: 30px 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
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

// Patent Table Section
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

const PatentTable = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.8fr 1fr;
  background: linear-gradient(90deg, #4f46e5, #3b82f6);
  padding: 18px 30px;
  font-weight: 600;
  color: white;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    display: none;
  }
`;

const PatentRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.8fr 1fr;
  padding: 25px 30px;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  align-items: start;
  gap: 25px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f8fafc;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 20px;
  }
`;

const PatentNumber = styled.div`
  font-weight: 600;
  color: #1e40af;
  font-size: 1.1rem;
  line-height: 1.4;
  display: flex;
  align-items: center;

  &::before {
    content: '📄';
    margin-right: 10px;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    &::before {
      content: "Patent Number: ";
      font-weight: 600;
      color: #64748b;
      margin-right: 5px;
    }
    
    &::after {
      display: none;
    }
  }
`;

const PatentTitle = styled.div`
  font-weight: 500;
  color: #1e293b;
  line-height: 1.5;
  font-size: 1.1rem;
  padding-right: 15px;

  @media (max-width: 768px) {
    &::before {
      content: "Title: ";
      font-weight: 600;
      color: #64748b;
      display: block;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
`;

const PatentStatus = styled.div`
  color: ${props => props.status === "Granted" ? "#059669" : "#d97706"};
  font-weight: 600;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.status === "Granted" ? "#10b981" : "#f59e0b"};
    margin-right: 10px;
    box-shadow: 0 0 0 3px ${props => props.status === "Granted" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)"};
  }

  @media (max-width: 768px) {
    &::before {
      content: "Status: ";
      font-weight: 600;
      color: #64748b;
      background: none;
      width: auto;
      height: auto;
      margin-right: 5px;
      box-shadow: none;
    }
  }
`;

// Trademark Section
const TrademarkSection = styled.section`
  margin-bottom: 70px;
  animation: ${fadeIn} 0.8s ease;
`;

const TrademarkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const TrademarkCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
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
    background: linear-gradient(90deg, #ec4899, #f472b6);
  }
`;

const TrademarkIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #db2777;
`;

const TrademarkName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
`;

const TrademarkNumber = styled.p`
  color: #1e40af;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.95rem;
`;

const TrademarkClass = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const TrademarkStatus = styled.div`
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => props.status === "Registered" ? "#dcfce7" : "#fef3c7"};
  color: ${props => props.status === "Registered" ? "#166534" : "#92400e"};
`;

// Info Section
const InfoSection = styled.section`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px;
  padding: 50px;
  margin-bottom: 70px;
  animation: ${fadeIn} 0.8s ease;
  position: relative;
  overflow: hidden;

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
  const patents = [
    {
      number: "US 11,234,567 B2",
      title: "Compositions and Methods for Treating Metabolic Disorders",
      status: "Granted"
    },
    {
      number: "US 10,987,654 B1",
      title: "Novel Protein Formulations for Enhanced Stability",
      status: "Granted"
    },
    {
      number: "PCT/US2022/025678",
      title: "Delivery Systems for Bioactive Compounds",
      status: "Pending"
    },
    {
      number: "EP 3,456,789 A1",
      title: "Methods of Manufacturing Sustained Release Formulations",
      status: "Granted"
    },
    {
      number: "US 2022/0123456 A1",
      title: "Diagnostic Assays for Nutritional Status Assessment",
      status: "Pending"
    },
    {
      number: "US 10,654,321 C1",
      title: "Stable Oral Formulations of Amino Acid Compounds",
      status: "Granted"
    }
  ];

  const trademarks = [
    {
      name: "NUTRACELL",
      number: "5,123,456",
      class: "Class 5: Pharmaceutical preparations",
      status: "Registered",
      icon: "™"
    },
    {
      name: "BIOFORMULA+",
      number: "5,789,012",
      class: "Class 5: Dietary supplements",
      status: "Registered",
      icon: "™"
    },
    {
      name: "HEALTHOPTIMA",
      number: "6,345,678",
      class: "Class 42: Scientific research services",
      status: "Pending",
      icon: "™"
    },
    {
      name: "VITABOOST",
      number: "6,901,234",
      class: "Class 29: Dietary food supplements",
      status: "Registered",
      icon: "™"
    }
  ];

  const reqdemo = () => {
    window.location.href = "/demo.html";
  };

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle>Intellectual Property</PageTitle>
        <PageSubtitle>
          Our growing intellectual property portfolio protects innovations in biotherapeutics, 
          formulations, and manufacturing processes that advance our mission of improving human health.
        </PageSubtitle>
      </HeaderSection>

      <StatsSection>
        <StatCard delay="100ms">
          <StatNumber>15+</StatNumber>
          <StatLabel>Patents Granted</StatLabel>
        </StatCard>
        <StatCard delay="200ms">
          <StatNumber>10+</StatNumber>
          <StatLabel>Pending Applications</StatLabel>
        </StatCard>
        <StatCard delay="300ms">
          <StatNumber>30+</StatNumber>
          <StatLabel>Countries</StatLabel>
        </StatCard>
      </StatsSection>

      <PatentSection>
        <SectionTitle>Patent Portfolio</SectionTitle>
        <PatentTable>
          <TableHeader>
            <div>Patent Number</div>
            <div>Title</div>
            <div>Status</div>
          </TableHeader>
          {patents.map((patent, index) => (
            <PatentRow key={index}>
              <PatentNumber>{patent.number}</PatentNumber>
              <PatentTitle>{patent.title}</PatentTitle>
              <PatentStatus status={patent.status}>{patent.status}</PatentStatus>
            </PatentRow>
          ))}
        </PatentTable>
      </PatentSection>

      <TrademarkSection>
        <SectionTitle>Trademark Portfolio</SectionTitle>
        <TrademarkGrid>
          {trademarks.map((trademark, index) => (
            <TrademarkCard key={index}>
              <TrademarkIcon>{trademark.icon}</TrademarkIcon>
              <TrademarkName>{trademark.name}</TrademarkName>
              <TrademarkNumber>Reg. No: {trademark.number}</TrademarkNumber>
              <TrademarkClass>{trademark.class}</TrademarkClass>
              <TrademarkStatus status={trademark.status}>
                {trademark.status}
              </TrademarkStatus>
            </TrademarkCard>
          ))}
        </TrademarkGrid>
      </TrademarkSection>

      <InfoSection>
        <InfoTitle>Our Intellectual Property Strategy</InfoTitle>
        <InfoText>
          We pursue a comprehensive intellectual property strategy to protect our innovations across 
          multiple technology platforms and geographic regions. Our patent portfolio covers novel 
          compositions, manufacturing processes, methods of use, and delivery technologies that 
          form the foundation of our product pipeline.
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
        <CTAButton onClick={reqdemo}>Request a demo</CTAButton>
      </CTASection>
    </PageContainer>
  );
};

export default PatentPage;