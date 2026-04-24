import React from 'react';
import styled, { keyframes } from 'styled-components';
import People from './../assets/img/Backgroundpeople.png';
import product from './../assets/img/Product.png';
import Crm from './../assets/img/CrmHero.png';
import { useNavigate } from 'react-router-dom';

// Bubble animation
const float = keyframes`
  0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.5; }
  25% { transform: translateY(-30px) translateX(15px) scale(1.05); }
  50% { transform: translateY(-60px) translateX(-10px) scale(1.1); opacity: 0.9; }
  75% { transform: translateY(-30px) translateX(10px) scale(1.05); }
  100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.5; }
`;

// Styled Components

const Wrapper = styled.div`
  background-color: #f6f2ea;
  position: relative;
`;

const BreadcrumbContainer = styled.div`
  padding: 20px 10%;
  background-color: #f6f2ea;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

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

const Section = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  padding: 50px 20px;
  background-image: repeating-linear-gradient(
    to right,
    rgba(0, 0, 0, 0.05) 0px,
    rgba(0, 0, 0, 0.05) 1px,
    transparent 1px,
    transparent 40px
  );

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    height: 600px;
    padding: 50px 10%;
  }
`;

// Bubble Elements
const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(228, 28, 57, 0.08);
  animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

// Text
const TextContainer = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #2c2c2c;
  margin-bottom: 15px;
  font-weight: 600;

  @media (max-width: 768px) {
    margin-top: 70px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: justify;
  color: #555;
  line-height: 1.6;
`;

// Buttons
const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  color: #fff;
  border: none;
  cursor: pointer;
  background-color: #e41c39;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(228, 28, 57, 0.3);

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 24px rgba(228, 28, 57, 0.5);
    background-color: #c5162f;
  }
`;

// Image
const ImageContainer = styled.div`
  position: relative;
  margin-top: 20px;
  z-index: 2;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const PeopleImage = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 300px;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    max-width: 650px;
  }
`;

// Component
const LetsConnect = (props) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const navigationback = () => {
    navigate(-1);
  };

  const reqdemo = () => {
    window.location.href = "/demo.html";
  };

  return (
    <Wrapper>
      {/* Breadcrumb Section */}
      <BreadcrumbContainer>
        <BreadcrumbList>
          <BreadcrumbItem onClick={() => handleNavigate('/')}>
            <HomeIcon>🏠</HomeIcon> Home
          </BreadcrumbItem>
          <Separator>›</Separator>
          {props.breadcrumbTitle && (
            <>
              <BreadcrumbItem onClick={() => handleNavigate(props.link || '/')}>
                {props.breadcrumbTitle || props.title}
              </BreadcrumbItem>

              <Separator>›</Separator>
            </>)}
          <BreadcrumbItem active>
            {props.title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbContainer>

      {/* Main Section */}
      <Section>
        {/* Bubble Effects */}
        <Bubble size={120} top="10%" left="5%" duration={6} />
        <Bubble size={80} top="70%" left="10%" duration={8} />
        <Bubble size={150} top="20%" left="80%" duration={7} />
        <Bubble size={60} top="75%" left="85%" duration={5} />

        <TextContainer>
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>

          <ButtonContainer>
            <Button onClick={reqdemo}>Request a Demo</Button>
            <Button
              style={{
                backgroundColor: 'transparent',
                color: '#e41c39',
                border: '2px solid #e41c39',
              }}
              onClick={navigationback}
            >
              Back
            </Button>
          </ButtonContainer>
        </TextContainer>

        <ImageContainer>
          <PeopleImage
            src={
              props.data
                ? product
                : props.crm
                  ? Crm
                  : props.lead
                    ? props.img
                    : People
            }
            alt="People talking"
          />
        </ImageContainer>
      </Section>
    </Wrapper>
  );
};

export default LetsConnect;