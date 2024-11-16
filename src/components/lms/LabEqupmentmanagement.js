import React from "react";
import styled from "styled-components";
import mainImage from "../../assets/img/Labtest.png"; // Your main image path
import abstractShape from "../../assets/img/Logo placeholder.png"; // Abstract shapes in the top left
import FeatureBenifits from "../FeatureBenifits";
import FAQSection from "../hrm/FAQSection";
import KeyFeaturelems from "./KeyFeaturelems";
const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bbfcc0;
  padding:90px 40px 0px 40px ;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding:130px 40px 0px 40px ;
  }
`;

const TextContainer = styled.div`
  max-width: 50%;
  z-index: 2;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: #213e6d;
  font-weight: bold;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
const Description = styled.p`
  font-size: 18px;
  color: #6d7278;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const Button = styled.button`
  background-color: #337af3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #2863c7;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 16px;
  }
`;

const ImageContainer = styled.div`
  max-width: 50%;
  position: relative;
  z-index: 2;
  bottom: 0px;
  @media (max-width: 768px) {
    max-width: 80%;
    margin-top: 20px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const AbstractShape = styled.img`
  position: absolute;
  top: 150px;
  left: 40px;
  width: 130px;
  z-index: 1;
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const LabEqupmentmanagement = () => {
  return (
    <>
    <Section>
      <AbstractShape src={abstractShape} alt="Abstract Shape" />
      <TextContainer>
        <Title>Lab Equipment Management System</Title>
        <Description>
         Optimize utilization, minimize downtime, and simplify equipment management with
         real-time tracking and maintenance.  </Description>
        <Button>Learn more</Button>
      </TextContainer>
      <ImageContainer>
        <Image src={mainImage} alt="Laboratory Technician" />
      </ImageContainer>
    </Section>
    <FeatureBenifits data={'Equipment'}></FeatureBenifits>
        <KeyFeaturelems></KeyFeaturelems>
    <FAQSection data={"equipment"}></FAQSection>
    </>
  );
};

export default LabEqupmentmanagement;
