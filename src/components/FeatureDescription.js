// FeatureDescription.js

import React from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../assets/img/Claim_Image_demo.png';
import ClaimImgDemo2 from '../assets/img/Claim_Image_Demo2.png';
import CheckMark from '../assets/img/check.png';
import img1 from '../assets/img/img1.svg';
import img2 from '../assets/img/add_claim_img.svg'
import img3 from '../assets/img/emp_advance.svg'

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f4f5; 
  padding: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 50px;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const BenefitsContainer = styled.div`
    background-color:#fff;
    border-color: #e8e8e9;
    border-radius: 20px;
    border-style: solid;
    border-width: 0.8px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    line-height: 26px;
    /* margin: 24px 0px 0px; */
    padding: 24px;
    text-align: center;

    p {
        color: #1c1b1f;
        line-height: 24px;
        font-weight: bold;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 160px;
        gap: 8px;
    }

    li img {
        width: 20px;
        height: 20px;
    }

    li span {
        color: #6a1b9a; /* Purple color */
        font-size: 0.9rem;
        font-weight: 400;

    }

    @media (max-width: 768px) {
      flex-direction: column;
      ul {
        justify-content: space-around;
      }
    }
`;

const TextSection = styled.div`
  text-align: center;
  color: #000;
  margin-top: 20px;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.5rem;
    color: #6a1b9a; /* Purple color */
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    text-align: left;
    width: 50%;

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

const FeatureDescription = () => {
  return (
    <Container>
      <Features>
        <ImageSection>
          <img src={img1} alt="Expense Setup" />
        </ImageSection>
        <TextSection>
          <h1>Simplify Claim Expense Setup</h1>
          <h2>Effortlessly Manage Your Company’s Claim Categories</h2>
          <p>
            With our Claim Expense Setup functionality, your company can efficiently manage claim types and categories, streamlining the entire process. Whether you need to Add, Update, Delete, or View claim types, this setup provides all the essential tools in a user-friendly interface.
          </p>
          
        </TextSection>
      </Features>

      <Features>
        <TextSection>
          <h1>Manage Employee Advances with Ease</h1>
          <h2>Track and record advances issued to employees in real-time.</h2>
          <p>
            With Atomwalk HRM On-The-Go, employers can easily issue and manage cash advances for employees. The platform allows you to track advance payments, link them to employee records, and ensure seamless recovery through payroll.
          </p>
          
        </TextSection>
        <ImageSection>
          <img src={img3} alt="Employee Advance" />
        </ImageSection>
      </Features>

      <Features>
            <ImageSection>
            <img src={img2} alt="Annual Leave Rules" />
            </ImageSection>
            <TextSection>
                <h1>Submit Expense Claims with Ease</h1>
                <h2>Simplified Claim Submission for Fast Reimbursement</h2>
                <p>
                Empower employees to submit expense claims directly from their mobile devices or desktops. With an intuitive interface, employees can quickly upload receipts, enter claim details, and track the status of their submissions in real-time. This functionality streamlines the reimbursement process, ensuring that employees are compensated for their expenses efficiently.
                </p>
                <BenefitsContainer>
            <p>Key Benefits</p>
            <ul>
              <li>
                <img src={CheckMark} alt="Advance Tracking Icon" />
                <span>Upload Receipts</span>
              </li>
              <li>
                <img src={CheckMark} alt="Payroll Integration Icon" />
                <span>Real-time Tracking</span>
              </li>
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Multi-Claim Support</span>
              </li>
              
            </ul>
          </BenefitsContainer>
            </TextSection>
        </Features>
        <Features>
            <TextSection>
                <h1>Simplify Expense Management with Seamless Claim Approvals</h1>
                <h2>Quick, Transparent, and Efficient Claim Processing for Managers</h2>
                <p>
                Empower managers to effortlessly manage and approve employee claims with just a few clicks. Review detailed claim submissions, verify receipts, and approve or reject claims in real-time, all from within the mobile or web platform. The streamlined approval process ensures transparency, timely responses, and hassle-free expense management.
                </p>
                <BenefitsContainer>
            <p>Key Benefits</p>
            <ul>
              <li>
                <img src={CheckMark} alt="Advance Tracking Icon" />
                <span>Real-Time Notifications</span>
              </li>
              <li>
                <img src={CheckMark} alt="Payroll Integration Icon" />
                <span>Claim Review Dashboard</span>
              </li>
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Approval/Reject Options</span>
              </li>
              
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Mobile Convenience </span>
              </li>
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Audit Trails</span>
              </li>
            </ul>
          </BenefitsContainer>
            </TextSection>
            <ImageSection>
            <img src={ClaimImgDemo2} alt="Annual Leave Rules" />
            </ImageSection>
        </Features>
        <Features>
            <ImageSection>
            <img src={ClaimImgDemo} alt="Annual Leave Rules" />
            </ImageSection>
            <TextSection>
                <h1>Streamlined Claim Processing for Faster Reimbursements</h1>
                <h2>Empower your employees to submit and settle claims with ease.</h2>
                <p>
                Managing expense claims has never been easier. With Atomwalk HRM On-The-Go, employees can submit claims for reimbursement by uploading receipts directly through the app. Managers can approve or reject claims instantly, ensuring transparency and accountability at every step. The entire process is automated and recorded for future audits, allowing for efficient tracking and settlement of employee expenses.
                </p>
                <BenefitsContainer>
            <p>Key Benefits</p>
            <ul>
              <li>
                <img src={CheckMark} alt="Advance Tracking Icon" />
                <span>Quick Submission</span>
              </li>
              <li>
                <img src={CheckMark} alt="Payroll Integration Icon" />
                <span>Approval Workflow</span>
              </li>
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Transparency</span>
              </li>
              
              <li>
                <img src={CheckMark} alt="Payroll Integration Icon" />
                <span>Audit Support</span>
              </li>
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Mobile-Friendly</span>
              </li>
            </ul>
          </BenefitsContainer>
            </TextSection>
        </Features>
        <Features>
            <TextSection>
                <h1>Ensure Accurate Financial Tracking with Seamless Accounting Entries</h1>
                <h2>Automate and streamline your accounting processes with real-time financial updates.</h2>
                <p>
                The Post Accounting Entries feature simplifies your financial management by automatically generating accounting entries for every transaction. Whether it's payroll disbursements, claims, or expense tracking, this feature ensures that all financial movements are accurately recorded in the system. Say goodbye to manual bookkeeping and embrace a streamlined, error-free accounting process that saves time and reduces discrepancies.
                </p>
                <BenefitsContainer>
            <p>Key Benefits</p>
            <ul>
              <li>
                <img src={CheckMark} alt="Advance Tracking Icon" />
                <span>Automated Accounting</span>
              </li>
              <li>
                <img src={CheckMark} alt="Payroll Integration Icon" />
                <span>Real-Time Updates</span>
              </li>
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Compliance Ready</span>
              </li>
              <li>
                <img src={CheckMark} alt="Real-Time Reporting Icon" />
                <span>Integration</span>
              </li>
            </ul>
          </BenefitsContainer>
            </TextSection>
            <ImageSection>
            <img src={ClaimImgDemo2} alt="Annual Leave Rules" />
            </ImageSection>
        </Features>


    </Container>
  );
};

export default FeatureDescription;
