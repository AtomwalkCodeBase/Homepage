import React from 'react';
import styled from 'styled-components';
import People from './../assets/img/Backgroundpeople.png';
import product from './../assets/img/Product.png';
import Crm from './../assets/img/CrmHero.png';
import Sales from './../assets/img/Sales&Procurement.png';
import { useNavigate } from 'react-router-dom';

// Styled Components

const Section = styled.section`
  background-color: ${(props) => props.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  padding: 50px 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    height: 600px;
    padding: 50px 10%;
  }
`;

const TextContainer = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin-top: 70px;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  border: none;
  border-radius: 22px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-top: 20px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #a233db;
  top: 0;
  right: -10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PeopleImage = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 300px;

  @media (min-width: 768px) {
    max-width: 650px;
  }
`;

// Component
const LetsConnect = (props) => {
  const navigate = useNavigate();
  const navigationback=()=>{
    navigate(-1);
  }
  const reqdemo=()=>{
    window.location.href="/demo.html"
    
  }
  return (
    <Section background={props.background}>
      <TextContainer>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
        <ButtonContainer>
          <Button primary onClick={reqdemo}>
            Request a Demo
          </Button>
          <Button onClick={navigationback}>Back</Button>
        </ButtonContainer>
      </TextContainer>
      <ImageContainer>
        <PeopleImage
          src={props.data ? product : props.sales ? Sales : props.crm ? Crm : props.lead ? props.img : People}
          alt="People talking"
        />
      </ImageContainer>
    </Section>
  );
};

export default LetsConnect;
