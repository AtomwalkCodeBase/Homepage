import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import HeadBG from '../assets/img/pricingelusrtion.png';
import Testimonial from './Testimonial';
import Pricing from './Pricing';
import PricingCard from './PricingCard';
import Hrprice from './Hrprice';
import { motion } from "framer-motion";

const Page = styled.div`
  background-color: white;
  color: blue;
  width: 100%;
  /* padding-top: 10px; */
  padding-bottom: 10px;
  /* height: 1472px; */
`;

const Header = styled.div`
  height: 572px;
  background-color: white;
  color: blue;
  display: flex;
  justify-content: center;
  
  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    height: auto; /* Allow height to adjust based on content */
   // padding: 20px; /* Add some padding for smaller screens */
  }
`;

const HeadBox = styled.div`
  height: 572px;
  width: 100%;
  background-color: #96ddbc;
  padding: 90px;
  padding-top: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  
  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 20px; /* Reduce padding for smaller screens */
    padding-top: 130px; /* Adjust top padding */
    flex-direction: column; /* Stack items vertically */
    justify-content: center; /* Center items */
    align-items: center; /* Center items */
  }
`;

const HeadTextArea = styled.div`
  color: #1c1b1f;
  font-family: Centra;
  font-size: 51.008px;
  font-weight: 400;
  line-height: 61.2px;
  margin-left: 40px;
  margin-top: 25px;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    font-size: 32px; /* Reduce font size for smaller screens */
    line-height: 38px; /* Adjust line height accordingly */
    margin-left: 0px; /* Center text by removing left margin */
    margin-top: 40px; /* Adjust top margin */
    text-align: center; /* Center align the text */
  }
`;



const HeadTextOne = styled.div`
  color: #1c1b1f;
  font-family: Centra;
  font-size: 51.008px;
  font-weight: 600;
  line-height: 61.2px;
  margin: 0px 0px 16px;
`;

const HeadPara = styled.p`
  color: #1c1b1f;
  width: 73%;
  font-size: 21px;
  word-wrap: normal;
  margin: 0px 0px 24px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeadImageArea = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  width: 60%;
  line-height: 26px;
  padding: 44px 0px 0px;
`;

const ButtonOne = styled.button`
  align-items: center;
  background-color: #aa00ea;
  border-color: #f3a3ff;
  border-radius: 100px;
  border-style: solid;
  border-width: 1.6px;
  color: #fff;
  font-weight: 500;
  line-height: 24px;
  padding: 14px 32px;
  text-align: center;
`;

const ButtonText = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;

const HeadImage = styled.div`
  line-height: 26px;
  img {
    width: 120%;
    height: auto;
    border-radius: 15px;
  }
  @media (max-width:768px) {
    display: none;
  }
`;

const regions = [
  { label: "India", code: "IN" },
  { label: "United States", code: "US" }
];

const TabArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #caf0f8;
`;

const Title2 = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 10px;
  color: #2c3e50;
`;


const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #caf0f8;  /* Updated Background Color */
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 300px;
  }
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ active }) => (active ? "#222222" : "#666666")}; /* Darker active color */
  position: relative;
  z-index: 2;
  transition: color 0.25s ease-in-out;

  &:hover {
    color: ${({ active }) => (active ? "#005A8D" : "#0077B6")}; /* Darker shade for active */
  }
`;


const Indicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: #007BFF;
  border-radius: 2px;
`;


const PricingRoute = () => {


  const [selectedRegion, setSelectedRegion] = useState("IN");

  const data = useMemo(
    () => [
      {
        modulePlane: 'Number of Employees',
        starter: 'Limited',
        essential: 'Unlimited',
        growth: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        modulePlane: 'Cost Per Additional Employee',
        starter: 'Not Applicable',
        essential: '₹30/ month',
        growth: '₹60/ month',
        enterprise: '₹100/ month',
      },
      {
        modulePlane: 'Core HR',
        starter: 'Limited',
        essential: '✓',
        growth: '✓',
        enterprise: '✓',
      },
      // Add more rows as needed
    ],
    []
  );
  
const Counnt=styled.div`
color: #454545;
font-size: 15px;
margin-bottom: 5px;
`
  const columns = useMemo(
    () => [
      {
        Header: 'Modules and Features',
        accessor: 'modulePlane',
      },
      {
        Header: (
          <>
            <div>Starter</div>
            <div>₹ 0 / month</div>
            <Counnt>(Includes 25 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'starter',
      },
      {
        Header: (
          <>
            <div>Essential</div>
            <div>₹ 3495 / month</div>
            <Counnt>(Includes 50 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'essential',
      },
      {
        Header: (
          <>
            <div>Growth</div>
            <div>₹ 5495 / month</div>
            <Counnt>(Includes 50 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'growth',
      },
      {
        Header: (
          <>
            <div>Enterprise</div>
            <div>₹ 7495 / month</div>
            <Counnt>(Includes 50 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'enterprise',
      },
    ],
    []
  );
  
  

  // const {
  // } = useTable({ columns, data });

const demo =()=>{
  window.location.href='/demo.html'
}
  return (
    <Page>
      <Header>
        <HeadBox>
          <HeadTextArea>
            <HeadTextOne>Innovation Meets Affordability</HeadTextOne>
            <HeadPara>
             Get access to premium features without breaking the bank. We believe in providing powerful tools at every level, so you get the value you deserve. Explore our plans to find the right fit for your needs and budget.
            </HeadPara>
            <ButtonOne onClick={demo}>
              <ButtonText>Discuss Price</ButtonText>
            </ButtonOne>
          </HeadTextArea>
          <HeadImageArea>
            <HeadImage>
              <img src={HeadBG} alt="Pricing Challenge Background" />
            </HeadImage>
          </HeadImageArea>
        </HeadBox>
      </Header>
      <TabArea>
      <Title2>PRICING</Title2>
      <TabContainer>
        {regions.map((region) => (
          <div key={region.code} style={{ position: "relative" }}>
            <TabButton
              active={selectedRegion === region.code}
              onClick={() => setSelectedRegion(region.code)}
            >
              {region.label}
              {selectedRegion === region.code && (
                <Indicator
                  layoutId="indicator"
                  initial={false}
                  animate={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </TabButton>
          </div>
        ))}
      </TabContainer>
      </TabArea>
      <Pricing  region={selectedRegion}></Pricing>
      <PricingCard region={selectedRegion}></PricingCard>
      {selectedRegion === "IN" && <Hrprice />}
      
      <Testimonial></Testimonial>
    </Page>
  );
};

export default PricingRoute;