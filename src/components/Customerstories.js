import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background-color: #f9f5f0;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TextSection = styled.div`
  max-width: 500px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  color: #ec7042;
  font-weight: 700;
`;

const Subtitle = styled.h3`
  font-size: 28px;
  color: #333;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 15px 25px;
  background-color: #046300;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #034a00;
  }
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 600px;
`;

const CentralCircle = styled.div`
  width: 300px;
  height: 300px;
  background-color: #ec7042;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const BrandLogo = styled.img`
  position: absolute;
  width: 100px;
  height: auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  ${({ top, right, bottom, left }) => `
    top: ${top || 'auto'};
    right: ${right || 'auto'};
    bottom: ${bottom || 'auto'};
    left: ${left || 'auto'};
  `}
`;

const Customerstories = () => {
  return (
<Container>
      <TextSection>
        <Title>Real Stories of Success with HROne</Title>
        <Subtitle>Achieve Business Goals Faster</Subtitle>
        <Description>
          Dive into our industry-specific case studies to unleash the potential
          of HROne for your organization.
        </Description>
        <Button>Get Free Trial</Button>
      </TextSection>
      <ImageSection>
        <CentralCircle>
          Trusted by over 1500+ BRANDS
        </CentralCircle>
        <BrandLogo src="brand1.png" top="10%" left="50%" />
        <BrandLogo src="brand2.png" top="25%" right="5%" />
        <BrandLogo src="brand3.png" bottom="15%" left="10%" />
        <BrandLogo src="brand1.png" top="20%" left="50%" />
        <BrandLogo src="brand2.png" top="35%" right="5%" />
        <BrandLogo src="brand3.png" bottom="45%" left="10%" />
        {/* Add more logos as needed */}
      </ImageSection>
    </Container>
  )
}

export default Customerstories
