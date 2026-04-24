import React, { useState } from 'react';
import styled from 'styled-components';
import HeadBG from '../assets/img/pricingelusrtion.png';
import Testimonial from './Testimonial';
import Pricing from './Pricing';
import PricingCard from './PricingCard';
import Hrprice from './Hrprice';
import { motion } from "framer-motion";

const Page = styled.div`
  background-color: #f6f2ea;
   background-image: repeating-linear-gradient(
    to right,
    rgba(0, 0, 0, 0.05) 0px,
    rgba(0, 0, 0, 0.05) 1px,
    transparent 1px,
    transparent 40px
  );
  width: 100%;
  overflow-x: hidden;
`;

const Header = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
    background-size: cover;
    opacity: 0.3;
  }
`;

const HeadBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 968px) {
    flex-direction: column;
    padding: 80px 30px;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const HeadTextArea = styled(motion.div)`
  flex: 1;
  color: white;
  
  h1 {
    font-size: 56px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #000000 0%, #fcc5c3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 768px) {
      font-size: 40px;
    }
  }
  
  p {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 32px;
    opacity: 0.95;
    max-width: 500px;
    color: #000000;
  }
`;

const ButtonOne = styled(motion.button)`
  background: white;
  color: #e71e1e;
  border: none;
  padding: 16px 40px;
  /* border-radius: 50px; */
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const HeadImageArea = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  
  img {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2));
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TabArea = styled.div`
  background: white;
  border-radius: 50px 50px 0 0;
  padding: 60px 20px 40px;
  margin-top: -50px;
  position: relative;
  z-index: 2;
`;

const Title2 = styled(motion.h2)`
  text-align: center;
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ca1414 0%, #dc7c73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  background: #f8f9fa;
  padding: 8px;
  border-radius: 60px;
  width: fit-content;
  margin: 0 auto 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const TabButton = styled(motion.button)`
  background: ${({ active }) => active ? 'white' : 'transparent'};
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 50px;
  color: ${({ active }) => active ? '#ea2e19' : '#666'};
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${({ active }) => active ? '0 5px 15px rgba(102, 126, 234, 0.2)' : 'none'};
  
  &:hover {
    color: #9c110a;
  }
`;

const PricingRoute = () => {
  const [selectedRegion, setSelectedRegion] = useState("IN");

  const demo = () => {
    window.location.href = '/demo.html';
  };

  return (
    <Page>
      <Header>
        <HeadBox>
          <HeadTextArea
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Innovation Meets Affordability</h1>
            <p>
              Get access to premium features without breaking the bank. We believe in providing
              powerful tools at every level, so you get the value you deserve. Explore our plans
              to find the right fit for your needs and budget.
            </p>
            <ButtonOne
              onClick={demo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discuss Price
            </ButtonOne>
          </HeadTextArea>
          <HeadImageArea
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={HeadBG} alt="Pricing Challenge Background" />
          </HeadImageArea>
        </HeadBox>
      </Header>

      <TabArea>
        <Title2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Simple, Transparent Pricing
        </Title2>
        <Subtitle>
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </Subtitle>

        <TabContainer>
          {regions.map((region) => (
            <TabButton
              key={region.code}
              active={selectedRegion === region.code}
              onClick={() => setSelectedRegion(region.code)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: selectedRegion === region.code
                  ? "0 5px 15px rgba(102, 126, 234, 0.2)"
                  : "none"
              }}
            >
              {region.label}
            </TabButton>
          ))}
        </TabContainer>

        <Pricing region={selectedRegion} />
        <PricingCard region={selectedRegion} />
        {selectedRegion === "IN" && <Hrprice />}
      </TabArea>

      <Testimonial />
    </Page>
  );
};

const regions = [
  { label: "India", code: "IN" },
  { label: "United States", code: "US" }
];

export default PricingRoute;