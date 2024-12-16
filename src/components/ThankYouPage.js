import React from 'react';
import styled, { keyframes } from 'styled-components';

// Background fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Text slide-in animation
const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://img.freepik.com/premium-photo/colorful-abstract-background-with-blue-yellow-geometric-pattern_481527-28428.jpg?semt=ais_hybrid') no-repeat center center/cover;
  animation: ${fadeIn} 2s ease-in-out;
  text-align: center;
`;

const MessageContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 40px 60px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 1s ease-in-out;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const SubHeading = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin: 0;
`;

const ThankYouPage = () => {
  return (
    <PageWrapper>
      <MessageContainer>
        <Heading>Thank You!</Heading>
        <SubHeading>We appreciate your time and effort.</SubHeading>
      </MessageContainer>
    </PageWrapper>
  );
};

export default ThankYouPage;
