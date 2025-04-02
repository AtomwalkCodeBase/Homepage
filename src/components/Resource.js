import React, { useState } from 'react';
import styled from 'styled-components';
import TagImag from './../assets/img/FevIimg.png';
import CrmApp from './../assets/img/localPageHero.svg';
import HrAPP from './../assets/img/HrApp.svg';
import EcommApp from './../assets/img/EcommApp.svg';
import Crm from './../assets/img/crm.png';
import Hr from './../assets/img/search-job.png';
import Ecom from './../assets/img/experiment_16584785.png';
import Lab from './../assets/img/labtest2.png';
import UnderConstructionPopup from './UnderConstructionPopup';

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background: ${({ background }) => background || 'linear-gradient(180deg, #fceabb, rgb(255 246 247))'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LeftSection = styled.div`
  max-width: 50%;
  margin-top: 100px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 150px;
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.5;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background-color: #333;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 40px;

  &:hover {
    background-color: #555;
  }
`;

const Features = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeatureItem = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 30%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ background }) => background || 'linear-gradient(180deg, #fceabb, rgb(255 246 247))'};
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const FeatureIcon = styled.img`
  width: 70px;
  margin-bottom: 10px;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #333;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const ProfileImage = styled.img`
  width: 600px;
  height: auto;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Main Component
const HeroSection = () => {
  const [background, setBackground] = useState('linear-gradient(180deg, #fceabb, rgb(255 246 247))');
  const [profileImg, setProfileImg] = useState(TagImag);
  const[openpop,setopenpop]=useState(false);
  const handleMouseEnter = (bgColor, imgSrc) => {
    setBackground(bgColor);
    setProfileImg(imgSrc);
  };

  const handleMouseLeave = () => {
    setBackground('linear-gradient(180deg, #fceabb, rgb(255 246 247))');
    setProfileImg(TagImag);
  };

  return (
    <Container background={background}>
      <LeftSection>
        <Heading>Streamline your Business Operations on One Platform</Heading>
        <SubHeading>
        Atomwalk Office is a cloud-based software solution, designed to transform the way startups, small – large sized businesses operate. Built on cutting-edge technologies like AI and Blockchain. Our Intuitive System seamlessly manages all your core business functions – Lead/Customer Relationship, Sales, Purchasing, Inventory, Manufacturing, Project Management, Accounting, and HR. 
        </SubHeading>
        <CTAButton onClick={()=>{window.location.href='/demo.html'}}>Get Started</CTAButton>
        <Features>
          <FeatureItem
            background={background}
            onMouseEnter={() => handleMouseEnter('linear-gradient(180deg, #4382f8, rgb(255 246 247))', CrmApp)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>{window.location.href='/crm.html'}}
          >
            <FeatureIcon src={Crm} alt="CRM" />
            <FeatureText>Comprehensive CRM platform for customer-facing teams.</FeatureText>
          </FeatureItem>
          <FeatureItem
            background={background}
            onMouseEnter={() => handleMouseEnter('linear-gradient(180deg, #a970ff, rgb(255 246 247))', HrAPP)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>{window.location.href='/hrm.html'}}
          >
            <FeatureIcon src={Hr} alt="HR" />
            <FeatureText>HR management software streamlining payroll, attendance, leave, claims.</FeatureText>
          </FeatureItem>
          <FeatureItem
            // onClick={()=>{setopenpop(!openpop)}}
            onClick={()=>{window.location.href='/lms.html'}}
            background={background}
            onMouseEnter={() => handleMouseEnter('linear-gradient(180deg, #90ee90, rgb(255 246 247))', Lab)}
            onMouseLeave={handleMouseLeave}
          >
            <FeatureIcon src={Ecom} alt="E-Commerce" />
            <FeatureText>Manage lab operations and equipment effortlessly in one platform</FeatureText>
          </FeatureItem>
        </Features>
      </LeftSection>
      <RightSection>
        <ProfileImage src={profileImg} alt="Profile" />
      </RightSection>
      <UnderConstructionPopup visible={openpop} setvisible={setopenpop}></UnderConstructionPopup>
    </Container>
  );
};

export default HeroSection;
