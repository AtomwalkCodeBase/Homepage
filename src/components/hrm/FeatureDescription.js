import React from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../../assets/img/Claim_Image_demo.png';
import ClaimImgDemo2 from '../../assets/img/Claim_Image_Demo2.png';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/img1.svg';
import img2 from '../../assets/img/add_claim_img.svg';
import img3 from '../../assets/img/emp_advance.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0ebf7; 
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
  background-color: #fff;
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
    width: 30px;
    height: 30px;
  }

  li span {
    color: #1E90FF; 
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
    color: #6a1b9a;
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

const FeatureDescription = ({ data }) => {
  const isClaim = data === 'Claim';

  const getFeatureContent = (feature) => (
    <Features>
      {feature.imgPosition === 'left' ? (
        <>
          <ImageSection>
            <img src={feature.imageSrc} alt={feature.imageAlt} />
          </ImageSection>
          <TextSection>
            <h1>{feature.title}</h1>
            <h2>{feature.subtitle}</h2>
            <p>{feature.description}</p>
            <BenefitsContainer>
              <p>Key Benefits</p>
              <ul>
                {feature.benefits.map((benefit, index) => (
                  <li key={index}>
                    <img src={CheckMark} alt="Check mark" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </BenefitsContainer>
          </TextSection>
        </>
      ) : (
        <>
          <TextSection>
            <h1>{feature.title}</h1>
            <h2>{feature.subtitle}</h2>
            <p>{feature.description}</p>
            <BenefitsContainer>
              <p>Key Benefits</p>
              <ul>
                {feature.benefits.map((benefit, index) => (
                  <li key={index}>
                    <img src={CheckMark} alt="Check mark" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </BenefitsContainer>
          </TextSection>
          <ImageSection>
            <img src={feature.imageSrc} alt={feature.imageAlt} />
          </ImageSection>
        </>
      )}
    </Features>
  );

  const features = isClaim
    ? [
        {
          title: 'Simplify Claim Expense Setup',
          subtitle: 'Effortlessly Manage Your Company’s Claim Categories',
          description:
            'With our Claim Expense Setup functionality, your company can efficiently manage claim types and categories, streamlining the entire process. Whether you need to Add, Update, Delete, or View claim types, this setup provides all the essential tools in a user-friendly interface.',
          benefits: ['Upload Receipts', 'Real-time Tracking', 'Multi-Claim Support'],
          imageSrc: img1,
          imageAlt: 'Expense Setup',
          imgPosition: 'left',
        },
        {
          title: 'Manage Employee Advances with Ease',
          subtitle: 'Track and record advances issued to employees in real-time.',
          description:
            ' With Atomwalk HRM On-The-Go, employers can easily issue and manage cash advances for employees. The platform allows you to track advance payments, link them to employee records, and ensure seamless recovery through payroll.',
          benefits: ['Upload Receipts', 'Real-time Tracking', 'Multi-Claim Support'],
          imageSrc: img3,
          imageAlt: 'Advance',
          imgPosition: 'right',
        },
        {
          title: 'Submit Expense Claims with Ease',
          subtitle: 'Simplified Claim Submission for Fast Reimbursement.',
          description:
            ' Empower employees to submit expense claims directly from their mobile devices or desktops. With an intuitive interface, employees can quickly upload receipts, enter claim details, and track the status of their submissions in real-time. This functionality streamlines the reimbursement process, ensuring that employees are compensated for their expenses efficiently.',
          benefits: ['Advance Tracking Icon', 'Payroll Integration Icon', 'Real-Time Reporting Icon'],
          imageSrc: img2,
          imageAlt: 'Add Claim',
          imgPosition: 'left',
        },
        {
          title: 'Simplify Expense Management with Seamless Claim Approvals',
          subtitle: 'Quick, Transparent, and Efficient Claim Processing for Managers',
          description:
            'Empower managers to effortlessly manage and approve employee claims with just a few clicks. Review detailed claim submissions, verify receipts, and approve or reject claims in real-time, all from within the mobile or web platform. The streamlined approval process ensures transparency, timely responses, and hassle-free expense management.',
          benefits: ['Real-Time Notifications', 'Claim Review Dashboard', 'Approval/Reject Options','Real-Time Reporting Icon','Audit Trails'],
          imageSrc: ClaimImgDemo2,
          imageAlt: 'Advance Tracking Icon"',
          imgPosition: 'right',
        },
        {
          title: 'Streamlined Claim Processing for Faster Reimbursements',
          subtitle: 'Empower your employees to submit and settle claims with ease.',
          description:
            'Managing expense claims has never been easier. With Atomwalk HRM On-The-Go, employees can submit claims for reimbursement by uploading receipts directly through the app. Managers can approve or reject claims instantly, ensuring transparency and accountability at every step. The entire process is automated and recorded for future audits, allowing for efficient tracking and settlement of employee expenses.',
          benefits: ['Quick Submission', 'Approval Workflow', 'Transparency','Audit Support','Mobile-Friendly'],
          imageSrc: img3,
          imageAlt: 'Advance',
          imgPosition: 'left',
        },
        {
          title: 'Ensure Accurate Financial Tracking with Seamless Accounting Entries',
          subtitle: 'Automate and streamline your accounting processes with real-time financial updates.',
          description:
            "  The Post Accounting Entries feature simplifies your financial management by automatically generating accounting entries for every transaction. Whether it's payroll disbursements, claims, or expense tracking, this feature ensures that all financial movements are accurately recorded in the system. Say goodbye to manual bookkeeping and embrace a streamlined, error-free accounting process that saves time and reduces discrepancies.",
          benefits: ['Automated Accounting', 'Real-Time Updates', 'Compliance Ready','Integration'],
          imageSrc: img2,
          imageAlt: 'Post Accounting',
          imgPosition: 'right',
        },
       
      ]
    : [
        {
          title: 'Submit Leave Applications with Ease',
          subtitle: 'Fast and Efficient Leave Application Process',
          description:
            'Empower employees to submit leave requests quickly from their mobile devices or desktops. Track the status of leave applications in real-time, and streamline approvals with our efficient leave management system.',
          benefits: ['Real-Time Tracking', 'Leave Balance Updates', 'Multi-Leave Support'],
          imageSrc: img2,
          imageAlt: 'Leave Application',
          imgPosition: 'left',
        },
        {
          title: 'Simplify Leave Approvals',
          subtitle: 'Quick and Transparent Leave Approval Process',
          description:
            'Managers can easily approve or reject leave requests in real-time. With our streamlined leave approval process, transparency is ensured, and responses are timely, making leave management hassle-free.',
          benefits: ['Approval/Reject Options', 'Audit Trails', 'Mobile Convenience'],
          imageSrc: ClaimImgDemo,
          imageAlt: 'Leave Approval',
          imgPosition: 'right',
        },
      ];

  return <Container>{features.map(getFeatureContent)}</Container>;
};

export default FeatureDescription;
