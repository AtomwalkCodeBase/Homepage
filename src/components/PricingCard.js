import React from 'react';
import styled from 'styled-components';

const PricingSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background-color: #f7f7f7;
`;

const Card = styled.div`
  background: ${({ color }) => color || '#fff'};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const PlanName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  font-size: 1rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;

  &::before {
    content: '✔';
    color: #4CAF50;
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

const PricingCard = ({ name, price, description, features, color }) => (
  <Card color={color}>
    <PlanName>{name}</PlanName>
    <Price>{price}</Price>
    <Description>{description}</Description>
    <Features>
      {features.map((feature, index) => (
        <FeatureItem key={index}>{feature}</FeatureItem>
      ))}
    </Features>
    <Button>Get Started</Button>
  </Card>
);

const Pricing = () => {
  return (
    <PricingSection>
      <PricingCard
        name="HRM Basic"
        price="Free"
        description="Ideal for individual users."
        features={[
          '2 Workspaces',
          '10 collaborators',
          'Unlimited data',
          'Unified Analytics'
        ]}
        color="#fdf1e6"
      />
      <PricingCard
        name="HRM Pro"
        price="$25/month"
        description="Works best for enterprise companies."
        features={[
          'Unlimited workspaces',
          'Unlimited collaboration',
          'Unlimited data storage',
          'Time tracking module',
          'Unified Analytics',
          'HR & Payroll'
        ]}
        color="#d6f5f4"
      />
      <PricingCard
        name="CRM Standard"
        price="$15/month"
        description="Ideal for small businesses."
        features={[
          'Unlimited workspaces',
          'Unlimited collaboration',
          '15 GB data storage',
          'Unified Analytics',
          'Mobile app access'
        ]}
        color="#e4e0ff"
      />
      <PricingCard
        name="CRM Enterprise"
        price="$35/month"
        description="For large organizations."
        features={[
          'Unlimited workspaces',
          'Unlimited data storage',
          'Advanced analytics',
          'Priority support',
          'Customizable dashboard'
        ]}
        color="#ddeeff"
      />
    </PricingSection>
  );
};

export default Pricing;
