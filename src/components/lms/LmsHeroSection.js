import React, { useState } from 'react';
import styled from 'styled-components';
import TagImag from '../../assets/img/HeroLabSection.png';
import Crm from '../../assets/img/science.png';
import Hr from '../../assets/img/laboratory.png';
import EcommApp from '../../assets/img/EcommApp.svg';
import CrmApp from '../../assets/img/labmagement.png';
import HrAPP from '../../assets/img/equpment.png';
import Ecom from '../../assets/img/online-shop.png';
import UnderConstructionPopup from '../UnderConstructionPopup';

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
  justify-content: left;
  gap: 30px;

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
  width: 550px;
  height: auto;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Main Component
const LmsHeroSection = () => {
  const [background, setBackground] = useState('linear-gradient(180deg, #d2f5fa, rgb(255 246 247))');
  const [profileImg, setProfileImg] = useState(TagImag);
  const[openpop,setopenpop]=useState(false);

  const handleMouseEnter = (bgColor, imgSrc) => {
    setBackground(bgColor);
    setProfileImg(imgSrc);
  };

  const handleMouseLeave = () => {
    setBackground('linear-gradient(180deg, #d2f5fa, rgb(255 246 247))');
    setProfileImg(TagImag);
  };

  return (
    <Container background={background}>
      <LeftSection>
        <Heading>Complete Lab & Equipment Management Hub</Heading>
        <SubHeading>
        Manage lab operations and equipment effortlessly in one platform. From sample tracking to inventory control, LabSync keeps your lab running smoothly and efficiently.
        </SubHeading>
        <CTAButton onClick={()=>{window.location.href='https://www.atomwalk.com/login/'}}>Get started</CTAButton>
        <Features>
          <FeatureItem
            background={background}
            onMouseEnter={() => handleMouseEnter('linear-gradient(180deg, #bbfcc0, rgb(255 246 247))', HrAPP)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>{window.location.href='/labequipmentmangement.html'}}
          >
            <FeatureIcon src={Hr} alt="HR" />
            <FeatureText>Lab Equipment Management System: Precision Tracking for Lab Equipment Efficiency.</FeatureText>
          </FeatureItem>
          <FeatureItem
            background={background}
            onMouseEnter={() => handleMouseEnter('linear-gradient(180deg, #edd4fc, rgb(255 246 247))', CrmApp)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>{setopenpop(!openpop)}}
          >
            <FeatureIcon src={Crm} alt="CRM" />
            <FeatureText>Lab Management System: Streamlined Solutions for Modern Lab Operations.</FeatureText>
          </FeatureItem>
          {/* <FeatureItem
            background={background}
            onMouseEnter={() => handleMouseEnter('linear-gradient(180deg, #90ee90, rgb(255 246 247))', EcommApp)}
            onMouseLeave={handleMouseLeave}
          >
            <FeatureIcon src={Ecom} alt="E-Commerce" />
            <FeatureText>Your one-stop shop for easy, fast, and secure online shopping.</FeatureText>
          </FeatureItem> */}
        </Features>
      </LeftSection>
      <RightSection>
        <ProfileImage src={profileImg} alt="Profile" />
      </RightSection>
      <UnderConstructionPopup visible={openpop} setvisible={setopenpop}></UnderConstructionPopup>
    </Container>
  );
};

export default LmsHeroSection;
