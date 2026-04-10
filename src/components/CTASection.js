import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  padding: 80px 120px;
  color: white;

  display: flex;
  align-items: center;

  background: linear-gradient(
      90deg,
      rgba(0, 20, 45, 0.95) 0%,
      rgba(0, 20, 45, 0.9) 40%,
      rgba(0, 20, 45, 0.6) 60%
    ),
    url("https://www.rtinsights.com/wp-content/uploads/2026/01/20260115-RTI-CQV-Depositphotos_572887008_S.jpg");

  background-size: cover;
  background-position: right center;
`;

const Content = styled.div`
  max-width: 610px;
`;

const Title = styled.h3`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #cfd6e4;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;

  color: #e53935;
  background: #ffffff;

  border: 2px solid #e53935;
  /* border-radius: 10px; */

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e53935;
    color: white;
  }
`;

const CTASection = () => {
  return (
    <Section>
      <Content>
        <Title>Transform the Way You Operate</Title>
        <Subtitle>
          Book your free demo today and take the first step toward success.
        </Subtitle>

        <Button onClick={() => { window.location.href = "/demo.html" }}>Request A Demo</Button>
      </Content>
    </Section>
  );
};

export default CTASection;