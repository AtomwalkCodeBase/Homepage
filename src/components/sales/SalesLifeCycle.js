import React, { useState } from "react";
import styled from "styled-components";
import abstractShape from "../../assets/img/Logo placeholder.png"; // Abstract shapes in the top left
import FeatureBenifits from "../FeatureBenifits";
import FAQSection from "../hrm/FAQSection";
import SalesImage from "../../assets/img/Sales_Life_Cycle.png";
import KeyFeatureSales from "./KeyFeatureSales";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6BEFED;
  padding: 90px 40px 0px 40px;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 130px 40px 0px 40px;
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

const ButtonGroup = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const IndustryButton = styled(Button)`
  background-color: ${(props) => (props.active ? "#1e90ff" : "#4682b4")};
  color: white;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: ${(props) => (props.active ? "#0d71c8" : "#1c6ca1")};
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }
  &:active {
    transform: scale(0.95);
    transition: transform 0.2s ease-in-out;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 16px;
  }
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
`;


const SalesLifeCycle = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("Manufacturing");

  return (
    <>
      <Section>
        {/* <AbstractShape src={abstractShape} alt="Abstract Shape" /> */}
        <TextContainer>
          <Title>Enhance Your Sales Lifecycle Management</Title>
          <Description>
            From lead to closure, effortlessly manage every stage of your sales process with tools designed for accuracy, efficiency, and growth.
          </Description>
          <Button>Learn more</Button>
          <ButtonGroup>
        <IndustryButton
          active={selectedIndustry === "Manufacturing"}
          onClick={() => setSelectedIndustry("Manufacturing")}
        >
          Manufacturing Industry
        </IndustryButton>
        <IndustryButton
          active={selectedIndustry === "Retail"}
          onClick={() => setSelectedIndustry("Retail")}
        >
          Retail Industry
        </IndustryButton>
        <IndustryButton
          active={selectedIndustry === "Service"}
          onClick={() => setSelectedIndustry("Service")}
        >
          Service Industry
        </IndustryButton>
      </ButtonGroup>
        </TextContainer>
        <ImageContainer>
          <Image src={SalesImage} alt="Laboratory Technician" />
        </ImageContainer>
      </Section>

      

      {/* <FeatureBenifits data={"Equipment"} /> */}
      
      {selectedIndustry && <KeyFeatureSales industry={selectedIndustry} />}

      <FAQSection data={"equipment"} />
    </>
  );
};

export default SalesLifeCycle;
