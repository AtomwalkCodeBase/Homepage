import React from "react";
import styled from "styled-components";

const PrivacyPolicyContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  margin-top: 140px;
  padding: 40px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
  font-family: 'Roboto', sans-serif;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
  color: #222;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 25px;
  background: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #007bff;
`;

const Text = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.8;
  text-align: justify;
  margin-bottom: 10px;
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyContainer>
      <Title>Privacy Policy</Title>
      <Section>
        <Text>
          The personal data provided by the clients at the beginning of, or during the course of,
          consultation, training, implementation process shall be processed and stored. All your
          personnel data including, names, phone numbers, and email addresses entered in this site
          will be used exclusively for the stated purpose only and will not be made available to any
          other party.
        </Text>
      </Section>
    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicy;
