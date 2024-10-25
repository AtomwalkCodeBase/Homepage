import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
// import "@fontsource/Centra";
import ClaimHeadBG from '../../assets/img/claim.png'; 
import LeaveHeadBG from '../../assets/img/leave1.png';
import HrHeadBG from '../../assets/img/hrm_hero_img.png';
import KeyFeatureHrm from './KeyFeatureHrm';
import { ProcessFlow } from './ProcessFlow';
import FeatureDescription from './FeatureDescription';
import FeatureBenifits from '../FeatureBenifits';
import FAQSection from './FAQSection';
import { useLocation } from 'react-router-dom';

const Page = styled.div`
  background-color: white;
  color: blue;
  width: 100%;
  padding-bottom: 10px;
`;

const Header = styled.div`
  height: 472px;
  background-color: white;
  color: blue;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
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

  @media (max-width: 768px) {
    padding: 20px;
    padding-top: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 38px;
    margin-left: 0px;
    margin-top: 40px;
    text-align: center;
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

const HrmFeaturesManagement = () => {
  const location = useLocation();

  // Determine which content to render based on the pathname
  const isClaimPage = location.pathname === '/claim.html';
  const isLeavePage = location.pathname === '/leave.html';
  const isEmployeePage = location.pathname === '/employeehr.html';
  const isPayrollPage = location.pathname === '/payroll.html';

  const content = useMemo(() => {
    if (isClaimPage) {
      return {
        title: "Effortless Claim Management for Your Organization",
        description: "Streamline your expense claim process with fast approvals, secure uploads, and real-time tracking all in one place.",
        image: ClaimHeadBG,
        data: "Claim"
      };
    } else if (isLeavePage) {
      return {
        title: "Simplified Leave Management for Employees",
        description: "Manage leave requests, approvals, and balances with ease, all in one centralized system.",
        image: LeaveHeadBG,
        data: "Leave"
      };
    }
    else if (isEmployeePage) {
      return {
        title: "Welcome to Employee Management",
      description: "Explore our various modules designed to simplify your HR processes.",
      image: HrHeadBG,
      data: "HR"
      };
    }
    else if (isPayrollPage) {
      return {
        title: "Accurate and Automated Payroll Solutions",
      description: "Simplify payroll with Atomwalk HRM's automated system, handling salaries, deductions, and taxes with accuracy. Real-time integration ensures seamless reporting and easy payslip access for employees",
      image: HrHeadBG,
      data: "Payroll"
      };
    }
    return {
      title: "Welcome to Employee Management",
      description: "Explore our various modules designed to simplify your HR processes.",
      image: HrHeadBG,
      data: "HR"
    };
  }, [isClaimPage, isLeavePage,isEmployeePage]);

  const demo = () => {
    window.location.href = '/demo.html';
  };

  return (
    <Page>
      <Header>
        <HeadBox>
          <HeadTextArea>
            <HeadTextOne>{content.title}</HeadTextOne>
            <HeadPara>{content.description}</HeadPara>
            <ButtonOne onClick={demo}>
              <ButtonText>Request a Demo</ButtonText>
            </ButtonOne>
          </HeadTextArea>
          <HeadImageArea>
            <HeadImage>
              <img src={content.image} alt="Page Background" />
            </HeadImage>
          </HeadImageArea>
        </HeadBox>
      </Header>

      <ProcessFlow data={content.data} />
      <FeatureBenifits data={content.data} />
      <FeatureDescription data={content.data} />
      {/* <FAQSection data={content.data} /> */}
    </Page>
  );
};

export default HrmFeaturesManagement;
