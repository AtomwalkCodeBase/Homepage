import React from "react";
import styled from "styled-components";
import mainImage from "../../assets/img/Lab_Management_System_illustration.png"; // Your main image path
import abstractShape from "../../assets/img/Logo placeholder.png"; // Abstract shapes in the top left
import FeatureBenifits from "../FeatureBenifits";
import FAQSection from "../hrm/FAQSection";
import KeyFetureLms from "./KeyFetureLms";
// import labApparatus from "./../assets/img/machine.png"; // The lab apparatus image

// Styled Components
const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e8f4fc;
  padding:90px 40px 0px 40px ;
  /* border-radius: 20px; */
  /* margin: 20px; */
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

const LabApparatus = styled.img`
position: absolute;
    right: 436px;
    bottom: 0;
    width: 275px;
    z-index: 1;
  @media (max-width: 768px) {
    width: 100px;
  }
`;
const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Header = styled.h1`
  text-align: center;
  color: #2f3b82;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Section2 = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title2 = styled.h2`
  color: #2f3b82;
  margin-bottom: 10px;
`;

const Description2 = styled.p`
  color: #333;
`;

const BookingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #2f3b82;
    color: #fff;
  }
`;

const EmailButton = styled.button`
  padding: 10px 20px;
  background-color: #2f3b82;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1e2870;
  }
`;

const LabManagement = () => {
  return (
    <>
    <Section>
      <AbstractShape src={abstractShape} alt="Abstract Shape" />
      <TextContainer>
        <Title>Lab Management System</Title>
        <Description>
         Laboratories require meticulous organization and data management. A robust Lab Management System (LMS) can automate processes such as sample tracking, data entry, and reporting, which streamlines operations and ensures compliance with industry standards.
        </Description>
        <Button onClick={()=>{window.location.href="/userManagement.html"}}>Learn more</Button>
      </TextContainer>
      <ImageContainer>
        <Image src={mainImage} alt="Laboratory Technician" />
      </ImageContainer>
    </Section>
    <FeatureBenifits data={'LMS'}></FeatureBenifits>
    <KeyFetureLms></KeyFetureLms>
    <FAQSection data={"equipment"}></FAQSection>
    </>
  );
};

export default LabManagement;
