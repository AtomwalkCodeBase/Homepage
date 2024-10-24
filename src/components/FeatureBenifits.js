import React from 'react';
import styled from 'styled-components';

// Icons
import Icon1 from '../assets/img/clock.png'; // You can replace this with your icons

const Section = styled.section`
  text-align: center;
  padding: 50px 20px;
  margin-top: 90px;
  background-color: #fff;
  @media (max-width: 768px) {
   margin-top: -30px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #000;
  margin-bottom: 10px;
  font-weight: 600;

  span {
    color: #6a1b9a; /* Purple highlight */
  }
`;

const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${props => props.bgColor || '#6a1b9a'};
  margin-bottom: 15px;

  img {
    width: 40px;
    height: 40px;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 10px;
  font-weight: 600;
`;

const BenefitText = styled.p`
  color: #6e6e6e;
  font-size: 0.9rem;
  line-height: 1.4;
`;

// Data sets for different responses
const claimBenefits = [
  { title: 'Save', text: 'time & effort', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Administer', text: 'easy claim processing', bgColor: '#f2e3ff', icon: Icon1 },
  { title: 'Ensure', text: 'accurate claim accounting', bgColor: '#ffe8cc', icon: Icon1 },
  { title: 'Reduce', text: 'claim processing time', bgColor: '#fff1d0', icon: Icon1 },
  { title: 'Deliver', text: 'better claim experience', bgColor: '#d7faff', icon: Icon1 },
  { title: 'Improve', text: 'claim transparency', bgColor: '#d9f5e3', icon: Icon1 },
];

const leaveBenefits = [
  { title: 'Save', text: 'time & effort', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Administer', text: 'uniform leave policy', bgColor: '#f2e3ff', icon: Icon1 },
  { title: 'Ensure', text: 'accurate leave accounting', bgColor: '#ffe8cc', icon: Icon1 },
  { title: 'Reduce', text: 'unnecessary expense', bgColor: '#fff1d0', icon: Icon1 },
  { title: 'Deliver', text: 'an outstanding employee experience', bgColor: '#d7faff', icon: Icon1 },
  { title: 'Improve', text: 'employer brand image', bgColor: '#d9f5e3', icon: Icon1 },
];

const FeatureBenifits = ({ data }) => {
  // Determine which set of benefits to display based on the response data
  const benefits = data === 'Claim' ? claimBenefits : leaveBenefits;

  return (
    <Section>
      <Title>All-in-One {data} Management, <span>Faster and Easier.</span></Title>
      <BenefitGrid>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index}>
            <BenefitIcon bgColor={benefit.bgColor}>
              <img src={benefit.icon} alt={`${benefit.title} Icon`} />
            </BenefitIcon>
            <BenefitTitle>{benefit.title}</BenefitTitle>
            <BenefitText>{benefit.text}</BenefitText>
          </BenefitCard>
        ))}
      </BenefitGrid>
    </Section>
  );
};

export default FeatureBenifits;
