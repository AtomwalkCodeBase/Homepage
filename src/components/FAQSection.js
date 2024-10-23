// FAQSection.js

import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 40px 20px;
  }
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #663399;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FAQList = styled.div`
  width: 100%;
  max-width: 700px;
`;

const FAQItem = styled.div`
  background-color: #f8f5ff;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Question = styled.div`
  padding: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #eae3ff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd1ff;
  }

  @media (min-width: 768px) {
    font-size: 1.3rem;
    padding: 20px;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #663399;
  }
`;

const Answer = styled.div`
  background-color: white;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '15px' : '0 15px')};
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const claimFaqData = [
    { question: "What is Merchlink?", answer: "Merchlink is a platform that connects brands with customers..." },
    { question: "How can I partner with brands on Merchlink?", answer: "You can partner with brands by signing up..." },
    { question: "How does Merchlink work?", answer: "Merchlink helps manage connections..." },
    { question: "How do you make money?", answer: "Merchlink generates revenue through partnerships..." },
    { question: "How do I get access to Merchlink’s network?", answer: "Access is granted after completing your profile..." },
  ];

  return (
    <Container>
      <Heading>All the A's to your Q's</Heading>
      <FAQList>
        {claimFaqData.map((item, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggleFAQ(index)}>
              {item.question}
              <span>{openIndex === index ? '-' : '+'}</span>
            </Question>
            <Answer isOpen={openIndex === index}>
              {item.answer}
            </Answer>
          </FAQItem>
        ))}
      </FAQList>
    </Container>
  );
};

export default FAQSection;
