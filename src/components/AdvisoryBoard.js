import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Sophisticated Keyframe Animations
const fadeInUp = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(40px);
  }
  100% { 
    opacity: 1; 
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  0% { 
    opacity: 0; 
    transform: scale(0.95);
  }
  100% { 
    opacity: 1; 
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;




// Premium Container with Subtle Gold Accents
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #faf8f5 0%, #f9f6f0 50%, #faf8f5 100%);
  position: relative;
  overflow: hidden;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Premium Content Wrapper
const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// Elegant Section Header
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeInUp} 1s ease-out;
`;

const HeaderContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 20px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #b8860b, transparent);
  }
  
  &::before {
    left: -80px;
  }
  
  &::after {
    right: -80px;
  }
  
  @media (max-width: 768px) {
    &::before, &::after {
      width: 40px;
    }
    
    &::before {
      left: -60px;
    }
    
    &::after {
      right: -60px;
    }
  }
  
  @media (max-width: 480px) {
    &::before, &::after {
      width: 30px;
    }
    
    &::before {
      left: -40px;
    }
    
    &::after {
      right: -40px;
    }
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

const SectionSubtitle = styled.p`
  color: #6b6b6b;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 16px;
  }
`;

// Advisor Cards Container
const AdvisorCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 60px;
  width: 100%;
`;

// Premium Advisor Card
const AdvisorCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  animation: ${fadeInScale} 0.8s ease-out;
  animation-delay: ${props => props.delay * 0.1}s;
  animation-fill-mode: both;
  display: flex;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d4af37, #b8860b, #d4af37);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    
    &::before {
      transform: scaleX(1);
    }
    
    .advisor-image {
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

// Elegant Image Container
const ImageContainer = styled.div`
  flex: 0 0 300px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #f5f2e8, #e8e2d1);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%);
  }
  
  @media (max-width: 900px) {
    flex: 0 0 280px;
  }
  
  @media (max-width: 480px) {
    flex: 0 0 220px;
  }
`;

const AdvisorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const DefaultIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4af37;
  
  svg {
    width: 80px;
    height: 80px;
    opacity: 0.3;
  }
`;

// Advisor Details
const AdvisorDetails = styled.div`
  padding: 32px;
  position: relative;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const AdvisorName = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 10px;
  animation: ${slideIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;


const AdvisorDescription = styled.div`
  color: #5a5a5a;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
  animation: ${slideIn} 0.6s ease-out 0.2s;
  animation-fill-mode: both;
  
  p {
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ReadMoreButton = styled.button`
  background: transparent;
  border: none;
  color: #b8860b;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.6s ease-out 0.3s;
  animation-fill-mode: both;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #b8860b;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #8b6914;
    
    &::after {
      transform: translateX(0);
    }
  }
  
  svg {
    margin-left: 6px;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const FullBio = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  color: #5a5a5a;
  line-height: 1.7;
  font-size: 0.95rem;
  animation: ${fadeInUp} 0.6s ease-out;
  
  p {
    margin-bottom: 15px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const AdvisorLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 25px;
  animation: ${slideIn} 0.6s ease-out 0.4s;
  animation-fill-mode: both;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const LinkedInButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #0077b5, #006097);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 118, 181, 0.3);
  }
  
  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

const ProfileButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: transparent;
  color: #b8860b;
  border: 1px solid #e8e2d1;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(184, 134, 11, 0.05);
    border-color: #b8860b;
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
  
  @media (max-width: 480px) {
    justify-content: center;
    padding: 10px 16px;
  }
`;

// Navigation Controls
const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e8e2d1;
  background: white;
  color: #b8860b;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(184, 134, 11, 0.05);
    border-color: #b8860b;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const AdvisoryBoard = () => {
  const [expandedBios, setExpandedBios] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleBio = (id) => {
    setExpandedBios(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const nextAdvisor = () => {
    setCurrentIndex(prev => (prev + 1) % advisors.length);
  };

  const prevAdvisor = () => {
    setCurrentIndex(prev => (prev - 1 + advisors.length) % advisors.length);
  };

  const advisors = [
    {
      id: 1,
      name: "Dr. Raghuveer Rao P",
      role: "Strategic Advisor",
      image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/prvrao-photo.jpg",
      shortDesc: [
        "Raghuveer Rao Pallepati has over 35 years of experience in teaching, research and consultancy in geotechnical, geoenvironmental and pipeline engineering.",
        "He has been with the Department of Civil Engineering, Indian Institute of Science, Bengaluru since 1989 and teaches masters and doctoral students various courses in geotechnical engineering."
      ],
      fullBio: [
        "His research interests include fundamentals of soil behaviour, contaminant transport through subsoil, foundation engineering, slope stability analysis, numerical analysis and geotechnical instrumentation.",
        "He was consultant for several projects of national importance in the areas of site investigation, foundation design, field and laboratory testing, transient analysis and design of surge protection systems for water transmission mains, lift irrigation schemes and circulating water systems for thermal and nuclear power projects."
      ],
    //   linkedin: "https://www.linkedin.com",
    //   profileLink: "/advisors/eleanor-richmond"
    },
    // {
    //   id: 2,
    //   name: "Raghuveer Rao",
    //   role: "Strategic Advisor",
    //   image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/prvrao-photo.jpg",
    //   shortDesc: "Raghuveer Rao Pallepati has over 35 years of experience in teaching, research and consultancy in geotechnical, geoenvironmental and pipeline engineering.",
    //   fullBio: [
    //     "He has been with the Department of Civil Engineering, Indian Institute of Science, Bengaluru since 1989 and teaches masters and doctoral students various courses in geotechnical engineering.",
    //     "His research interests include fundamentals of soil behaviour, contaminant transport through subsoil, foundation engineering, slope stability analysis, numerical analysis and geotechnical instrumentation.",
    //     "He was consultant for several projects of national importance in the areas of site investigation, foundation design, field and laboratory testing, transient analysis and design of surge protection systems for water transmission mains, lift irrigation schemes and circulating water systems for thermal and nuclear power projects."
    //   ],
    // //   linkedin: "https://www.linkedin.com",
    // //   profileLink: "/advisors/eleanor-richmond"
    // },
    // {
    //   id: 3,
    //   name: "Raghuveer Rao",
    //   role: "Strategic Advisor",
    //   image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/prvrao-photo.jpg",
    //   shortDesc: "Raghuveer Rao Pallepati has over 35 years of experience in teaching, research and consultancy in geotechnical, geoenvironmental and pipeline engineering.",
    //   fullBio: [
    //     "He has been with the Department of Civil Engineering, Indian Institute of Science, Bengaluru since 1989 and teaches masters and doctoral students various courses in geotechnical engineering.",
    //     "His research interests include fundamentals of soil behaviour, contaminant transport through subsoil, foundation engineering, slope stability analysis, numerical analysis and geotechnical instrumentation.",
    //     "He was consultant for several projects of national importance in the areas of site investigation, foundation design, field and laboratory testing, transient analysis and design of surge protection systems for water transmission mains, lift irrigation schemes and circulating water systems for thermal and nuclear power projects."
    //   ],
    // //   linkedin: "https://www.linkedin.com",
    // //   profileLink: "/advisors/eleanor-richmond"
    // },
    // {
    //   id: 4,
    //   name: "Raghuveer Rao",
    //   role: "Strategic Advisor",
    //   image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/prvrao-photo.jpg",
    //   shortDesc: "Raghuveer Rao Pallepati has over 35 years of experience in teaching, research and consultancy in geotechnical, geoenvironmental and pipeline engineering.",
    //   fullBio: [
    //     "He has been with the Department of Civil Engineering, Indian Institute of Science, Bengaluru since 1989 and teaches masters and doctoral students various courses in geotechnical engineering.",
    //     "His research interests include fundamentals of soil behaviour, contaminant transport through subsoil, foundation engineering, slope stability analysis, numerical analysis and geotechnical instrumentation.",
    //     "He was consultant for several projects of national importance in the areas of site investigation, foundation design, field and laboratory testing, transient analysis and design of surge protection systems for water transmission mains, lift irrigation schemes and circulating water systems for thermal and nuclear power projects."
    //   ],
    // //   linkedin: "https://www.linkedin.com",
    // //   profileLink: "/advisors/eleanor-richmond"
    // },
  ];

  return (
    <Container>
      <ContentWrapper>
        <SectionHeader>
          <HeaderContainer>
            <SectionTitle>Advisory Board</SectionTitle>
          </HeaderContainer>
          <SectionSubtitle>
            Our distinguished advisors bring decades of expertise across industries and technology domains, providing strategic guidance that shapes our vision and direction.
          </SectionSubtitle>
        </SectionHeader>

        <AdvisorCardsContainer>
          {advisors.map((advisor, index) => {
            const isExpanded = expandedBios[advisor.id];
            
            return (
              <AdvisorCard 
                key={advisor.id} 
                delay={index}
                hasImage={advisor.image}
                style={{ display: index === currentIndex ? 'flex' : 'none' }}
              >
                <ImageContainer>
                  {advisor.image ? (
                    <AdvisorImage 
                      src={advisor.image} 
                      alt={advisor.name}
                      className="advisor-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <DefaultIcon style={{ display: advisor.image ? 'none' : 'flex' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </DefaultIcon>
                </ImageContainer>
                
                <AdvisorDetails>
                  <AdvisorName>{advisor.name}</AdvisorName>
         
                  <AdvisorDescription>
                    {Array.isArray(advisor.shortDesc) 
                      ? advisor.shortDesc.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))
                      : advisor.shortDesc
                    }
                  </AdvisorDescription>
                  
                  <ReadMoreButton onClick={() => toggleBio(advisor.id)}>
                    {isExpanded ? 'Read Less' : 'Read Full Bio'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      {isExpanded ? (
                        <path d="M18 15l-6-6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      ) : (
                        <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                  </ReadMoreButton>
                  
                  {isExpanded && (
                    <FullBio>
                      {advisor.fullBio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </FullBio>
                  )}
                  
                  <AdvisorLinks>
                    {advisor.linkedin && (
                      <LinkedInButton 
                        href={advisor.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`${advisor.name} LinkedIn`}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </LinkedInButton>
                    )}
                    
                    {advisor.profileLink && (
                      <ProfileButton href={advisor.profileLink}>
                        View Profile
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </ProfileButton>
                    )}
                  </AdvisorLinks>
                </AdvisorDetails>
              </AdvisorCard>
            );
          })}
        </AdvisorCardsContainer>

        {/* <NavigationControls>
          <NavButton onClick={prevAdvisor} disabled={currentIndex === 0}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
          <NavButton onClick={nextAdvisor} disabled={currentIndex === advisors.length - 1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
        </NavigationControls> */}
      </ContentWrapper>
    </Container>
  );
};

export default AdvisoryBoard;