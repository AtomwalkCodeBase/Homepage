import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Animations
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.98); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main container with full-width background
const FullWidthContainer = styled.div`
  width: 100%;
  background-color: ${({ pageType }) =>
    pageType === "HOME_PAGE" ? "rgb(234 244 255)" : "transparent"};
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

// Content container with max-width
const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(270deg, #1f2937, #ea580c, #1f2937, #ea580c);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientShift} 8s ease infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #1f2937, #ea580c);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
`;

// Grid layout for cards
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// Enhanced card with hover effects
const Card = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease both;
  animation-delay: ${props => props.delay || '0ms'};
  height: 350px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
    
    img {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 1024px) {
    height: 300px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
`;

// Background image with improved transition
const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

// Enhanced overlay with gradient
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.1) 0%,
    rgba(0,0,0,0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  transition: all 0.5s ease;
  
  @media (max-width: 1024px) {
    padding: 25px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

// Title with improved typography
const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  
  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 12px;
  }
`;

// Enhanced subtitle box - now clickable
const SubtitleBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 12px 20px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 1024px) {
    font-size: 0.95rem;
    padding: 10px 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 14px;
  }
`;

const PatentAndPublications = ({ pageType }) => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };


  const cards = [
    {
      title: "Intellectual Property",
      subtitle: "Our Patents & Innovations",
      image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Patent_Img.jpg",
      delay: "100ms",
      path: "/intellectual-property"
    },
    {
      title: "Awards",
      subtitle: "Industry Recognition",
      image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Award_Img.jpg",
      delay: "200ms",
      path: "/awards"
    },
    {
      title: "News & Events",
      subtitle: "Latest Updates",
      image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/News_Img.jpg",
      delay: "300ms",
      path: "/news-events.html"
    },
    // {
    //   title: "Publications",
    //   subtitle: "Scientific Publication",
    //   image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   delay: "400ms",
    //   path: "/publications"
    // },
  ];

  return (
    <FullWidthContainer pageType={pageType}>
      <ContentContainer>
        <SectionTitle>Our Achievements</SectionTitle>
        <CardsGrid>
          {cards.map((card, index) => (
            <Card key={index} delay={card.delay}>
              <BackgroundImage src={card.image} alt={card.title} />
              <Overlay>
                <Title>{card.title}</Title>
                <SubtitleBox onClick={() => navigateTo(card.path)}>
                  {card.subtitle}
                </SubtitleBox>

              </Overlay>
            </Card>
          ))}
        </CardsGrid>
      </ContentContainer>
    </FullWidthContainer>
  );
};

export default PatentAndPublications;