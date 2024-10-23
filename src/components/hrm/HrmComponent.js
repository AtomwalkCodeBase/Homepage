import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
// import "@fontsource/Centra";
import HRMHeadBG from '../../assets/img/hrm_hero_img.png';
import KeyFeatureHrm from './KeyFeatureHrm';
import FeatureBenifits from '../FeatureBenifits';

const Page = styled.div`
  background-color: white;
  color: blue;
  width: 100%;
  /* padding-top: 10px; */
  padding-bottom: 10px;
  /* height: 1472px; */
`;

const Header = styled.div`
  height: 472px;
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
  height: 125%;
  width: 100%;
  background-color: #a970ff;
  padding: 90px;
  padding-top: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  
  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 20px; /* Reduce padding for smaller screens */
    padding-top: 50px; /* Adjust top padding */
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
  width: 65%;
  font-size: 21px;
  word-wrap: normal;
  line-height: 31.504px;
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
    width: 100%;
    height: auto;
    border-radius: 15px;
  }
`;


const HrmComponent = () => {
   
const demo =()=>{
  window.location.href='/demo.html'
}
  return (
    <Page>
      <Header>
        <HeadBox>
          <HeadTextArea>
            <HeadTextOne>Atomwalk HRM On-The-Go</HeadTextOne>
            <HeadPara>
            A smart, mobile-first solution for managing employee attendance, leave requests, claims, and real-time location tracking—right from your phone
            </HeadPara>
            <ButtonOne onClick={demo}>
              <ButtonText>Request a Demo</ButtonText>
            </ButtonOne>
          </HeadTextArea>
          <HeadImageArea>
            <HeadImage>
              <img src={HRMHeadBG} alt="Pricing Challenge Background" />
            </HeadImage>
          </HeadImageArea>
        </HeadBox>
      </Header>
      <KeyFeatureHrm/>
      <FeatureBenifits data={`HR`} />


      {/* <AddOnData>
              <AddOnLeft>
                <BoxOne>
                <AddOnTitle>Some <TitleTwo>greyt Add-ons</TitleTwo> to go?</AddOnTitle>
                <BoxOnePara>Give your Atomwalk account actual superpowers! Explore plan Add-Ons for attendance, performance management and employee engagement.</BoxOnePara>
                </BoxOne>
                <BoxTwo>
                  <BoxTitle>Performance Management System</BoxTitle>
                  <BoxHeading>Starts at ₹3000 for 50 employees</BoxHeading>
                  <BoxPara>360° Reportee-Manager Feedback and Reviews</BoxPara>
                </BoxTwo>
                <BoxThree>
                  <BoxTitle>Visage</BoxTitle>
                  <BoxHeading>₹20/user/month</BoxHeading>
                  <BoxPara>Al-powered Facial Recognition-Based attendance Marking</BoxPara>
                </BoxThree>
              </AddOnLeft>
              <AddOnRight>
                <BoxFour>
                  <BoxTitle>Visage</BoxTitle>
                  <BoxHeading>₹20/user/month</BoxHeading>
                  <BoxPara>Al-powered Facial Recognition-Based attendance Marking</BoxPara>
                </BoxFour>
                <BoxFive>
                <BoxTitle>Visage</BoxTitle>
                  <BoxHeading>₹20/user/month</BoxHeading>
                  <BoxPara>Al-powered Facial Recognition-Based attendance Marking</BoxPara>
                </BoxFive>
                <BoxSix>
                  <ListSpace>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>GPS-based Attendance Marking</ListText>
                    </ListRow>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>Workflows for Manager Review</ListText>
                    </ListRow>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>Attendance Scheme-level Customizations</ListText>
                    </ListRow>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>Geo Swipe Reports for Due Diligence</ListText>
                    </ListRow>
                  </ListSpace>
                </BoxSix>
              </AddOnRight>
      </AddOnData>

      <Feature>
      <TitleOne><TitleTwo>Exceptional software</TitleTwo> doesn't have to come at a cost</TitleOne>
      <TitlePara>Atomwalk offers the lowest cost-per-license (PEPM) in category</TitlePara>
        <FeatureBoxArea>
              <FeatureBox>
                <FeatureBoxInner>
                  <FeatureImage><img src={Logo1} alt="Feature Box" /></FeatureImage>
                  <TitleOne>77.78% lower cost</TitleOne>
                  <SubTitle>than Zoho</SubTitle>
                </FeatureBoxInner>
              </FeatureBox>
              <FeatureBox>
              <FeatureBoxInner>
                  <FeatureImage><img src={Logo2} alt="Feature Box" /></FeatureImage>
                  <TitleOne>183.33% lower cost</TitleOne>
                  <SubTitle>than HROne</SubTitle>
                </FeatureBoxInner>
              </FeatureBox>
              <FeatureBox>
              <FeatureBoxInner>
                  <FeatureImage><img src={Logo3} alt="Feature Box" /></FeatureImage>
                  <TitleOne>50% lower cost</TitleOne>
                  <SubTitle>than Keka</SubTitle>
                </FeatureBoxInner>
              </FeatureBox>
        </FeatureBoxArea>
      </Feature>

      <Testimonial></Testimonial> */}
    </Page>
  );
};

export default HrmComponent;
