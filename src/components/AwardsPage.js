import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Main container with professional background
const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #f0f4f8, #e5e9f0);
  background-size: 400% 400%;
  animation: ${gradientShift} 20s ease infinite;
  padding: 20px 0;
`;

// Page container
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  padding: 20px;
  color: #2d3748;
  position: relative;
  z-index: 2;
`;

// Header Section
const HeaderSection = styled.section`
  text-align: center;
  padding: 60px 20px 50px;
  margin-bottom: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.9);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #1e40af, #3b82f6, #1e40af);
    border-radius: 20px 20px 0 0;
  }

  @media (max-width: 768px) {
    padding: 40px 15px 30px;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1e293b;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 5px;
    background: linear-gradient(90deg, #1e40af, #3b82f6);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 30px auto 0;
  line-height: 1.7;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Awards List Section
const AwardsListSection = styled.section`
  margin-bottom: 80px;
  animation: ${fadeIn} 0.8s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-weight: 700;
  color: #1e293b;
  position: relative;
  display: inline-block;
  padding-bottom: 12px;
  text-align: center;
  width: 100%;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 5px;
    background: linear-gradient(90deg, #1e40af, #3b82f6);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

// Award Item (List Format)
const AwardItem = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease both;
  animation-delay: ${props => props.delay || '0ms'};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #1e40af, #3b82f6);
  }

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 25px;
    text-align: center;
  }
`;

const AwardImageContainer = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-right: 30px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  background: white;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 220px;
    margin-right: 0;
    margin-bottom: 25px;
  }
`;

const AwardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.color ? `linear-gradient(45deg, ${props.color}15, ${props.color}08)` : 'linear-gradient(45deg, #1e40af15, #3b82f608)'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const AwardCertificate = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CertificateImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${AwardImage}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  color: #64748b;
  font-size: 1rem;
  text-align: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: ${shimmer} 2s infinite;
  }
`;

const AwardContent = styled.div`
  flex: 1;
`;

const AwardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  line-height: 1.3;
`;

const AwardDescription = styled.p`
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 18px;
  font-size: 1.05rem;
`;

const AwardYear = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(90deg, #1e40af10, #3b82f610);
  color: #1e40af;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 15px;
  border: 1px solid #1e40af20;
`;

const AwardOrganization = styled.div`
  color: #475569;
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '🏆';
    margin-right: 8px;
  }
`;

// CTA Section
const CTASection = styled.section`
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border-radius: 20px;
  animation: ${fadeIn} 0.8s ease;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
  margin-bottom: 50px;

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
  font-size: 1.2rem;
  opacity: 0.9;
  position: relative;
  z-index: 2;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #1e40af;
  border: none;
  padding: 16px 40px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const AwardsPage = () => {
  const [imageLoaded, setImageLoaded] = useState({});

  const reqdemo = () => {
    window.location.href = "/demo.html";
  };
  
  const recognition = [
    {
      id: 1,
      title: "ISO 9001:2015 Recognition",
      description: "Atomwalk Technologies Private Limited has been independently assessed by QRO and is compliant with the requirements of ISO 9001:2015 for Quality Management System. This certification covers cloud-based ERP solutions, HRM, CRM, lab management, compliance monitoring, equipment and inventory management, hospital management, waste management, financial accounting, and business automation services.",
      year: "2025",
      organization: "QRO Certification LLP",
      color: "#0ea5e9",
      imageUrl: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/ISO_9001.jpg"
    },
    {
      id: 2,
      title: "ISO 13485:2016 Recognition",
      year: "2025",
      organization: "QRO Certification LLP",
      description: "Certified for compliance with ISO 13485:2016 standards for medical devices, covering design and development of medical software related to health devices, cancer detection kits, chatbots, and mobile applications.",
      imageUrl: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/ISO_13485.jpg"
    },
    {
      id: 3,
      title: "DPIIT Certificate of Recognition",
      description: "Atomwalk Technologies (OPC) Private Limited was recognized as a startup by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India. The recognition highlights Atomwalk's role in driving innovation within the Agriculture and Agri-Tech sector.",
      year: "2019",
      organization: "Government of India, DPIIT",
      color: "#3b82f6",
      imageUrl: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/DIPP_Certificate1.jpg"
    },    
  ];
  
  const awards = [
    {
      id: 1,
      title: "Awarded by Nasscom as a Software Solution providers to MSME",
      description: "Atomwalk Technologies is selected by Nasscom as a Software Solution providers to MSME through SME Connect Challenge, and Awarded by Union ministers, DY CM at Invest Karnataka Summit 2025. Total 2000+ SME participated in the challange. It was a great recognition to be selected by K- Tech and Nasscom to be in top 17 team.",
      year: "2025",
      organization: "Nasscom",
      color: "#1e40af",
      imageUrl: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/NASCOM_Award.jpg"
    },
    {
      id: 2,
      title: "500 Startup Award – Certificate of Nomination",
      description: "Atomwalk Technologies (OPC) Private Limited was successfully nominated as part of the prestigious India 500 Startup Awards, recognizing quality and excellence among emerging startups.",
      year: "2020",
      organization: "Benchmark Trust, with support from CNBC Awaaz, TQV, and BSE SME",
      color: "#3b82f6",
      imageUrl: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/500_Startup_Award.png"
    },
  ];

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <MainContainer>
      <PageContainer>
        <HeaderSection>
          <PageTitle>Our Awards & Recognitions</PageTitle>
          <PageSubtitle>
            Celebrating excellence and innovation in technology. Our commitment to advancing 
            digital solutions has been recognized by leading organizations worldwide.
          </PageSubtitle>
        </HeaderSection>

        <AwardsListSection>
          <SectionTitle>Our Certifications</SectionTitle>
          {recognition.map((recognition, index) => (
            <AwardItem key={recognition.id} delay={`${index * 100}ms`}>
              <AwardImageContainer>
                <AwardImage color={recognition.color}>
                  <AwardCertificate>
                    {recognition.imageUrl ? (
                      <>
                        {!imageLoaded[recognition.id] && (
                          <ImagePlaceholder>
                            Loading certificate...
                          </ImagePlaceholder>
                        )}
                        <CertificateImage 
                          src={recognition.imageUrl} 
                          alt={`${recognition.title} certificate`}
                          onLoad={() => handleImageLoad(recognition.id)}
                          style={{ display: imageLoaded[recognition.id] ? 'block' : 'none' }}
                        />
                      </>
                    ) : (
                      <ImagePlaceholder>
                        Certificate image not available
                      </ImagePlaceholder>
                    )}
                  </AwardCertificate>
                </AwardImage>
              </AwardImageContainer>
              <AwardContent>
                <AwardYear>{recognition.year}</AwardYear>
                <AwardTitle>{recognition.title}</AwardTitle>
                <AwardOrganization>By {recognition.organization}</AwardOrganization>
                <AwardDescription>{recognition.description}</AwardDescription>
              </AwardContent>
            </AwardItem>
          ))}
        </AwardsListSection>

        <AwardsListSection>
          <SectionTitle>Our Awards</SectionTitle>
          {awards.map((award, index) => (
            <AwardItem key={award.id} delay={`${index * 100}ms`}>
              <AwardImageContainer>
                <AwardImage color={award.color}>
                  <AwardCertificate>
                    {award.imageUrl ? (
                      <>
                        {!imageLoaded[award.id] && (
                          <ImagePlaceholder>
                            Loading award...
                          </ImagePlaceholder>
                        )}
                        <CertificateImage 
                          src={award.imageUrl} 
                          alt={`${award.title} certificate`}
                          onLoad={() => handleImageLoad(award.id)}
                          style={{ display: imageLoaded[award.id] ? 'block' : 'none' }}
                        />
                      </>
                    ) : (
                      <ImagePlaceholder>
                        Award image not available
                      </ImagePlaceholder>
                    )}
                  </AwardCertificate>
                </AwardImage>
              </AwardImageContainer>
              <AwardContent>
                <AwardYear>{award.year}</AwardYear>
                <AwardTitle>{award.title}</AwardTitle>
                <AwardOrganization>By {award.organization}</AwardOrganization>
                <AwardDescription>{award.description}</AwardDescription>
              </AwardContent>
            </AwardItem>
          ))}
        </AwardsListSection>

        <CTASection>
          <CTATitle>Celebrating Excellence Together</CTATitle>
          <CTAText>
            At Atomwalk Technologies, our achievements reflect our relentless dedication to innovation, 
            sustainability, and customer success. Join us as we continue our mission to 
            transform enterprises with next-generation digital solutions.
          </CTAText>

          <CTAButton onClick={reqdemo}>Request a Demo</CTAButton>
        </CTASection>
      </PageContainer>
    </MainContainer>
  );
};

export default AwardsPage;