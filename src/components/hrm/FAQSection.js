import React, { useState } from 'react';
import styled from 'styled-components';
import faqimg from '../../assets/img/faq.png'

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

// New section styles for "Still have questions?"
const CTASection = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  /* background-color: #f8f5ff; */
  border-radius: 12px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
  width: 100%;
  max-width: 700px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const CTAHeading = styled.h2`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 20px;
`;

const CTAText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
`;

const CTAButton = styled.a`
  padding: 10px 20px;
  background-color: #663399;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #552288;
  }
`;

// New styled component for the image
const CTAImage = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
`;

const FAQSection = (res) => {
  const [openIndex, setOpenIndex] = useState(null);

  const demo =()=>{
    window.location.href='/demo.html'
  }

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const claimFaqData = [
    { question: "What is Atomwalk HRM?", answer: "Answer..." },
    { question: "How can I use Atomwalk HRM?", answer: "Answer..." },
    { question: "How does HRM work?", answer: "Answer..." },
    { question: "How to add a claim?", answer: "Answer..." },
    { question: "How do I apply for a leave?", answer: "Answer..." },
    { question: "How a manager can approve a leave?", answer: "Answer..." },
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

      {/* Adding the new "Still have questions?" section */}
      <CTASection>
        {/* Adding the image */}
        <CTAImage src={faqimg} alt="FAQ" />
        <CTAHeading>Still have questions?</CTAHeading>
        <CTAText>
          Book a call with our team to learn how Merchnlink can help you
          change the way you manage your e-commerce business—forever.
        </CTAText>
        <CTAButton onClick={demo}>Book a demo</CTAButton>
      </CTASection>
    </Container>
  );
};

export default FAQSection;
