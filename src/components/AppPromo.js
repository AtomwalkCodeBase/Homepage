import React from 'react';
import styled from 'styled-components';
import AndroidImage from './../assets/img/appicon.svg';
import iOSImage from './../assets/img/Playstoer.png'; // Replace with your image path
import CrmHighlights from './CrmHighlights';
//import AndroidImage from './../assets/img/Playstoer.png'; // Replace with your image path

// Styled Components
const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background-color: #d6e7ff;
  height:700px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    text-align: center;
  }
`;

const TextSection = styled.div`
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top:130px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StoreButton = styled.img`
  width: 150px;
  height: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 130px;
  }
`;

const ImageSection = styled.div`
  display: flex;
  gap: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
`;

const AppImage = styled.img`
  width: 500px;
  height: auto;

  @media (max-width: 768px) {
    width: 180px;
  }
`;

// React Component
const AppPromo = () => {
  return (
    <>
    <Section>
      <TextSection>
        <Title>Comprehensive CRM platform</Title>
        <Subtitle>Manage customer relationships efficiently with our all-in-one CRM solution.</Subtitle>
        <ButtonContainer onClick={()=>{window.location.href='https://play.google.com/store/apps/details?id=com.atomwalk.crm&hl=en'}}>
          <StoreButton src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play Store" />
        </ButtonContainer>
      </TextSection>
      <ImageSection>
        <AppImage src={AndroidImage} alt="Android App" />
      </ImageSection>
    </Section>
    <CrmHighlights></CrmHighlights>
    </>
  );
};

export default AppPromo;
