import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #e8f1f8;
  font-family: "Arial", sans-serif;
  justify-content: center;
  padding: 20px;
`;

const ContentArea = styled.div`
  background: #fff;
  padding: 40px;
  overflow-y: auto;
  max-height: 100vh;
  animation: ${fadeIn} 0.6s ease-out;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #1e3a5f;
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  color: #27496d;
  margin-top: 20px;
  border-left: 4px solid #1e3a5f;
  padding-left: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.8;
`;

const TermsAndConditions = () => {
  return (
    <PageWrapper>
      <ContentArea>
        <Title>Terms and Conditions of Service</Title>
        <Text>
          This agreement governs your use of ATOMWALK services through its website. By
          using the service, you agree to these terms and the privacy policy.
        </Text>
        <SectionTitle>1. Acceptance</SectionTitle>
        <Text>
          By subscribing to any plan or visiting our website, you agree to these
          terms. ATOMWALK may revise these terms at any time by publishing them
          online.
        </Text>
        <SectionTitle>2. Price and Payment</SectionTitle>
        <Text>
          Subscription prices are determined solely by ATOMWALK. Payments are
          non-refundable and non-transferable. We accept online payments through
          available options on the website.
        </Text>
        <SectionTitle>3. Registration</SectionTitle>
        <Text>
          Users must complete registration to use services. The information provided
          must be accurate and updated promptly.
        </Text>
        <SectionTitle>4. Password and Security</SectionTitle>
        <Text>
          Users are responsible for maintaining the security of their accounts.
          Unauthorized use should be reported immediately.
        </Text>
        <SectionTitle>5. User Conduct</SectionTitle>
        <Text>
          Users shall not post unlawful, abusive, or offensive content. ATOMWALK
          reserves the right to remove such material.
        </Text>
        <SectionTitle>6. Service Availability</SectionTitle>
        <Text>
          ATOMWALK strives for uninterrupted service but does not guarantee
          availability at all times due to external factors.
        </Text>
        <SectionTitle>7. Intellectual Property Rights</SectionTitle>
        <Text>
          ATOMWALK retains all intellectual property rights related to its services,
          including trademarks, patents, and copyrighted material.
        </Text>
        <SectionTitle>8. Limitation of Liability</SectionTitle>
        <Text>
          ATOMWALK is not liable for direct or indirect damages resulting from the
          use of its services, including data loss or interruptions.
        </Text>
        <SectionTitle>9. Governing Law</SectionTitle>
        <Text>
          These terms are governed by Indian law, and disputes will be resolved in
          Bangalore courts.
        </Text>
      </ContentArea>
    </PageWrapper>
  );
};

export default TermsAndConditions;
