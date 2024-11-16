import React from 'react';
import styled from 'styled-components';

// Icons
import Icon1 from '../assets/img/clock.png'; // You can replace this with your icons
import Primium from '../assets/img/premium.gif';
import optimizing from '../assets/img/optimization.png';
import Access from '../assets/img/access.png';
import exprieance from '../assets/img/best-customer-experience.png';
import Accessbule from '../assets/img/accessible.png';
import easy from '../assets/img/easy-to-use.png';
import Icon2 from '../assets/img/administer.png';
import Icon3 from '../assets/img/reconciliation.png';
import Icon4 from '../assets/img/reduce-time.png';
import Icon5 from '../assets/img/better_experience.png';
import Icon6 from '../assets/img/transparency.png';
import Icon7 from '../assets/img/brand_reputaion.png';
import Icon8 from '../assets/img/money_saving.png';



const Section = styled.section`
  text-align: center;
  padding: 50px 20px;
  background-color: #fff;
  
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
  { title: 'Optimize', text: 'maximize time & effort efficiency', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Streamline', text: 'simplify claim management', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Verify', text: 'ensure precise claim reconciliation', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Accelerate', text: 'minimize claim processing delays', bgColor: '#fff1d0', icon: Icon4 },
  { title: 'Enhance', text: 'deliver a seamless claim experience', bgColor: '#d7faff', icon: Icon5 },
  { title: 'Elevate', text: 'increase claim transparency', bgColor: '#d9f5e3', icon: Icon6 }
];

const leaveBenefits = [
  { title: 'Save', text: 'time & effort', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Administer', text: 'uniform leave policy', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Ensure', text: 'accurate leave accounting', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Reduce', text: 'unnecessary expense', bgColor: '#fff1d0', icon: Icon4 },
  { title: 'Deliver', text: 'an outstanding employee experience', bgColor: '#d7faff', icon: Icon5 },
  { title: 'Improve', text: 'employer brand image', bgColor: '#d9f5e3', icon: Icon6 },
];
const leadBenefits = [
  { title: 'Maximize Efficiency', text: 'Save valuable time and effort with seamless processes', bgColor: '#d9f5e3', icon: optimizing },
  { title: 'Unmatched Quality', text: 'We consistently deliver top-notch results for every user', bgColor: '#f2e3ff', icon: Primium },
  { title: 'Lightning-Fast Access', text: 'Enjoy quick and easy access to our application anywhere, anytime', bgColor: '#ffe8cc', icon: Access },
  { title: 'Seamless Experience', text: 'Experience flawless and intuitive user interactions', bgColor: '#fff1d0', icon: exprieance },
  { title: 'User-Centric Design', text: 'Delivering an outstanding and effortless user experience', bgColor: '#d7faff', icon: easy },
  { title: 'Universal Accessibility', text: 'Access our platform seamlessly on both mobile and web', bgColor: '#d9f5e3', icon: Accessbule },
];
const employeeBenefits = [
  { title: 'Save', text: 'time & effort', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Administer', text: 'uniform leave policy', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Ensure', text: 'accurate leave accounting', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Reduce', text: 'unnecessary expense', bgColor: '#fff1d0', icon: Icon4 },
  { title: 'Deliver', text: 'an outstanding employee experience', bgColor: '#d7faff', icon: Icon5 },
  { title: 'Improve', text: 'employer brand image', bgColor: '#d9f5e3', icon: Icon6 },
];
const hrmBenefits = [
  { title: 'Streamline', text: 'eliminate time-consuming paperwork', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Optimize', text: 'cut unnecessary operational expenses', bgColor: '#fff1d0', icon: Icon8 },
  { title: 'Boost', text: 'elevate employer brand reputation', bgColor: '#d9f5e3', icon: Icon7 },
  { title: 'Standardize', text: 'enforce a consistent company policy', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Reliabilty', text: '24/7 availability with 100% uptime on mobile and web ', bgColor: '#d7faff', icon: Icon5 },
];
const labEquipment = [
  { title: '24/7 Access with less man power', text: 'Schedule Equipment Anytime, Seamlessly', bgColor: '#d7faff', icon: Icon1 },
  { title: 'Real-Time Availability!', text: 'Stay Updated, Avoid Surprises', bgColor: '#d9f5e3', icon: Icon7 },
  { title: 'Hassle-Free User Management!', text: 'Group, Control, Assign Roles', bgColor: '#fff1d0', icon:  Icon2 },
  { title: 'Zero Booking Conflicts!', text: 'Smart Scheduling, Uninterrupted Operations', bgColor: '#f2e3ff', icon: Icon8 },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Stay Audit-Ready', text: 'Automated Logs, Effortless Records ', bgColor: '#d9f5e3', icon: Icon5 },
];


const FeatureBenifits = ({ data }) => {
  // Determine which set of benefits to display based on the response data
  const benefits = data === 'Claim' ? claimBenefits :data=='lead'?leadBenefits:data =='HR' ? hrmBenefits:data =='Equipment' ? labEquipment: leaveBenefits;

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
