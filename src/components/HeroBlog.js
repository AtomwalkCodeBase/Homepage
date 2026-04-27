import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BlogImage from './../assets/img/Bloghreos.jpg';

/* ================= Animations ================= */
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(228, 28, 57, 0.4); }
  50% { box-shadow: 0 0 0 20px rgba(228, 28, 57, 0); }
`;

/* ================= Layout ================= */
const Wrapper = styled.div`
  background: #ffffff;
`;

const BreadcrumbContainer = styled.div`
  padding: 20px 10%;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const BreadcrumbList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.li`
  font-size: 0.9rem;
  color: ${(props) => (props.active ? '#e41c39' : '#64748b')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${(props) => (props.active ? '#e41c39' : '#e41c39')};
  }
`;

const Separator = styled.span`
  color: #cbd5e1;
  font-size: 0.85rem;
  margin: 0 4px;
`;

const HomeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  margin-right: 2px;
`;

const HeroSection = styled.section`
  background: #ffffff;
  padding: 50px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
  min-height: 600px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(228, 28, 57, 0.03) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(228, 28, 57, 0.03) 0%, transparent 70%);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 20px;
    gap: 40px;
    text-align: center;
  }
`;

/* ================= Text Section ================= */
const TextContainer = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease forwards;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff5f5;
  border: 1px solid #fecdd3;
  color: #e41c39;
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #e41c39;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 24px;
  color: #0f172a;
  letter-spacing: -0.02em;

  span {
    color: #e41c39;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 4px;
      background: #e41c39;
      opacity: 0.15;
      border-radius: 2px;
    }
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 32px;
  line-height: 1.7;
  color: #64748b;
  max-width: 500px;

  @media (max-width: 768px) {
    margin: 0 auto 32px;
  }
`;

/* ================= Buttons ================= */
const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const PrimaryButton = styled.a`
  padding: 14px 28px;
  background: #e41c39;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 15px rgba(228, 28, 57, 0.2);

  &:hover {
    background: #c41230;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(228, 28, 57, 0.3);
  }
`;

const SecondaryButton = styled.a`
  padding: 14px 28px;
  background: transparent;
  color: #e41c39;
  border: 2px solid #e41c39;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;

  &:hover {
    background: #e41c39;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(228, 28, 57, 0.2);
  }
`;

/* ================= Features ================= */
const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: #475569;
  font-weight: 500;
`;

const CheckCircle = styled.span`
  width: 24px;
  height: 24px;
  background: #e41c39;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
`;

/* ================= Image Section ================= */
const ImageContainer = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease forwards, ${float} 6s ease-in-out infinite;

  @media (max-width: 768px) {
    max-width: 400px;
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
    border: 3px solid #e41c39;
    border-radius: 20px;
    opacity: 0.1;
    transition: all 0.3s ease;
  }

  &:hover::before {
    top: 15px;
    left: 15px;
    opacity: 0.2;
  }
`;

const BlogImageStyled = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

/* ================= Stats ================= */
const StatsRow = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 25px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: left;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 4px;
`;

/* ================= Component ================= */
const HeroBlog = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Wrapper>
      {/* Hero Section */}
      <HeroSection>
        <TextContainer>
          {/* <Badge>Latest Insights</Badge> */}
          <Title>
            Stay Informed with the Latest <span>Blog Highlights</span>
          </Title>
          <Subtitle>
            Discover essential insights, expert analysis, and industry trends to keep your business ahead of the curve.
          </Subtitle>

          <ButtonContainer>
            <PrimaryButton href="https://play.google.com/store/search?q=atomwalk&c=apps&hl=en">
              Download App →
            </PrimaryButton>
            <SecondaryButton href="/demo.html">
              Try Free Demo
            </SecondaryButton>
          </ButtonContainer>

          <FeatureList>
            <FeatureItem>
              <CheckCircle>✓</CheckCircle>
              Eliminate repetitive tasks with automation
            </FeatureItem>
            <FeatureItem>
              <CheckCircle>✓</CheckCircle>
              Build a productive and enthusiastic team
            </FeatureItem>
            <FeatureItem>
              <CheckCircle>✓</CheckCircle>
              Streamline lead tracking and management
            </FeatureItem>
          </FeatureList>

          {/* <StatsRow>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Articles Published</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50k+</StatNumber>
              <StatLabel>Monthly Readers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>4.9</StatNumber>
              <StatLabel>User Rating</StatLabel>
            </StatItem>
          </StatsRow> */}
        </TextContainer>

        <ImageContainer>
          <ImageWrapper>
            <BlogImageStyled src={BlogImage} alt="Blog Preview" />
          </ImageWrapper>
        </ImageContainer>
      </HeroSection>
    </Wrapper>
  );
};

export default HeroBlog;