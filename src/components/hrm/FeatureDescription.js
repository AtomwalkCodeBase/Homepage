import React from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../../assets/img/Claim_Image_demo.png';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/img1.svg';
import img2 from '../../assets/img/add_claim_img.svg';
import img3 from '../../assets/img/emp_advance.svg';
import img4 from '../../assets/img/approve_claim.svg';
import img5 from '../../assets/img/sattle_claim.svg';
import img6 from '../../assets/img/expense_claim.svg';
import img7 from '../../assets/img/holiday_calender.svg';
import img8 from '../../assets/img/leave_dashboard.svg';
import img9 from '../../assets/img/add_leave.svg';
import img10 from '../../assets/img/approval_leave.svg';
import img11 from '../../assets/img/leave_report.svg';
import img12 from '../../assets/img/payroll_setup.svg';
import img13 from '../../assets/img/appraisal_setup.svg';



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
  margin-top: 10px;

  img {
    width: 100%;
    max-width: 500px;
  }

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const BenefitsContainer = styled.div`
  /* background-color: #fff; */
  /* border-color: #e8e8e9;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.8px; */
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  /* gap: 5px; */
  justify-content: center;
  line-height: 26px;
  /* padding: 5px; */
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
    /* flex-wrap: wrap; */
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    gap: 20px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 160px; */
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
  const isLeave = data === 'Leave';
  const isPayroll = data === 'Payroll';

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
              {/* <p>Key Benefits</p> */}
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
              {/* <p>Key Benefits</p> */}
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
            `This process enables the company to efficiently manage expenses through the setup of service categories. The first step is to define the Service Category, which includes fields such as Service Category Name, Tax Applicability (with an option to select whether tax applies or not), Applicable Tax Rate, TDS Threshold Limit, TDS Rate for the service, Category Alias, and Expense Ledger. Additionally, the company can specify whether the category is excluded from expense claims and if a bill is required for submission.Once the service category is set up, the company can add specific Expense Items or Services (e.g., Consultancy) with details like Name, Service Code, Service Category (linked to the previously defined category), Service Cost, and Description. Employees can then select these predefined expense items when submitting claims.This setup not only simplifies the expense claim process but also aids in project cost analysis, making it a valuable tool for the company's financial management and decision-making.`,
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
          imageSrc: img4,
          imageAlt: 'Advance Tracking Icon"',
          imgPosition: 'right',
        },
        {
          title: 'Streamlined Claim Processing for Faster Reimbursements',
          subtitle: 'Empower your employees to submit and settle claims with ease.',
          description:
            'Managing expense claims has never been easier. With Atomwalk HRM On-The-Go, employees can submit claims for reimbursement by uploading receipts directly through the app. Managers can approve or reject claims instantly, ensuring transparency and accountability at every step. The entire process is automated and recorded for future audits, allowing for efficient tracking and settlement of employee expenses.',
          benefits: ['Quick Submission', 'Approval Workflow', 'Transparency','Audit Support','Mobile-Friendly'],
          imageSrc: img5,
          imageAlt: 'Sattle Claim',
          imgPosition: 'left',
        },
        {
          title: 'Ensure Accurate Financial Tracking with Seamless Accounting Entries',
          subtitle: 'Automate and streamline your accounting processes with real-time financial updates.',
          description:
            "  The Post Accounting Entries feature simplifies your financial management by automatically generating accounting entries for every transaction. Whether it's payroll disbursements, claims, or expense tracking, this feature ensures that all financial movements are accurately recorded in the system. Say goodbye to manual bookkeeping and embrace a streamlined, error-free accounting process that saves time and reduces discrepancies.",
          benefits: ['Automated Accounting', 'Real-Time Updates', 'Compliance Ready','Integration'],
          imageSrc: img6,
          imageAlt: 'Post Accounting',
          imgPosition: 'right',
        },
       
      ]
    : isLeave?
    [
      {
        title: 'Location Wise  - Simplified Management of your Holiday Calendar',
        subtitle: 'Easy and exhaustive way to take care of your complex organisational need of Holiday management (Single/Multi location).',
        description:
          'Manage Holiday setup digitally for your business for each Year across single/ multiple location. Holiday setup supports Mandatory and Optional holiday for each location. Supports Multiple leave types and yearly limit for each leave types. Setup enables, better Project execution planning for the organisation and provides transparency for the employee to plan/utilise their Leave.',
        benefits: ['Easy Exhaustive Setup across Single/Multi Location', 'Supports Audit trails and track changes in setup', 'Optional Holiday setup enables for each location.', 'Transparent and accessible by all users/employees.'],
        imageSrc: img7,
        imageAlt: 'Holiday Calendar',
        imgPosition: 'left',
      },
      {
        title: 'Dashboard for Complete Leave overview ',
        subtitle: 'Easily track, manage, and plan your time off/ Utilisation of Leave.',
        description:
          'Employee can view detailed summary dashboard of their leave status, including total applied, approved, and pending leave categorized by leave type. Month wise trend analysis enables the Manager to manage risk at project planning level. The system also provides a year-wise holiday list which is accessible through  Mobile app, making it simple to manage leave information and plan time off effectively. Leave details are shared with Billing/Payroll modules seamlessly to eliminate any processing errors.',
        benefits: ['Comprehensive Overview, Detailed for each leave types. ', 'Trend Analysis for better planning and risk management.', 'Accessible from Mobile app', 'Shared with Payroll and Project Management modules seamlessly.'],
        imageSrc: img8,
        imageAlt: 'Leave Dashboard',
        imgPosition: 'right',
      },
      {
        title: 'Apply leave from Anywhere Any time',
        subtitle: 'Simple Leave Application: easy to apply and cancel from anywhere & anytime.',
        description:
          `Employee can apply for multiple types of leaves like  Earned Leave, Work From Home and Loss of Pay through both web and mobile apps. On submitted, the leave request automatically move to manager's dashboard for approval,  streamlining the process.`,
        benefits: ['Both Web and Mobile Convenience', 'Multiple leave types', ' Easy Application process with Holiday List Integration, to alter users.'],
        imageSrc: img9,
        imageAlt: 'Leave Application',
        imgPosition: 'left',
      },
      {
        title: 'Swift Leave Approvals from Anywhere Anytime',
        subtitle: 'Approve/ Reject Leave Requests with Ease and Precision from Approver Dashboard.',
        description:
          'Managers can easily filter leave requests by individual employee or leave type, providing a clear view of total leave applied, approved, and pending for each employee. This organized approach allows for efficient navigation and prompt action. Managers can review details before making decisions, with a mandatory remark field to ensure clear communication with employees during the approval or rejection process.',
        benefits: ['Organized and Filter View', 'Comprehensive Overview', 'Streamlined Approval Process', 'Efficient Leave Approval', 'Mobile Convenience', 'Approval History'],
        imageSrc: img10,
        imageAlt: 'Leave Approval',
        imgPosition: 'right',
      },
      {
        title: 'Organized Leave Insights for Efficient Management',
        subtitle: 'Gain Complete Insights into Leave Patterns and Usage',
        description:
          ' Managers can sort leave requests by individual employee or leave type, providing a clear and organized view. They also have access to a comprehensive annual leave report that includes all leave details across departments. This feature ensures efficient record-keeping and supports transparent leave management, helping managers make informed decisions.',
        benefits: ['Informed Decision-Making', 'Exportable Reports', ' Leave Balances at a Glance', 'Customizable Reports'],
        imageSrc: img11,
        imageAlt: 'Leave Reports',
        imgPosition: 'left',
      },
    ]: isPayroll?
      [
        {
          title: 'Payroll & Compliance Management',
          subtitle: 'Seamless Payroll and Compliance Configurations for Efficient HR Operations',
          description: (
            <ul>
              <li>Approval Limit: Set approval thresholds to streamline payroll decisions, ensuring only authorized personnel handle sensitive changes.</li>
              <li>Appraisal Structure: Customize and manage the employee appraisal process to align performance reviews with salary increments and promotions.</li>
              <li>KPI Data: Configure and manage Key Performance Indicators (KPIs) to track and evaluate employee performance effectively.</li>
              <li>Salary Structure: Standardize salary management by setting up structured pay plans based on departments, grades, or roles.</li>
              <li>PF Parameter: Configure Provident Fund parameters to automate deductions and ensure compliance with statutory regulations.</li>
              <li>Gratuity Parameter: Set up gratuity eligibility and payout structures to simplify calculations and ensure compliance with regulations.</li>
              <li>ESI Parameter: Manage Employee State Insurance (ESI) contributions and eligibility to provide health coverage in compliance with government laws.</li>
              <li>Tax Setup: Configure income tax settings and other statutory deductions to ensure payroll compliance with tax laws.</li>
            </ul>
          ),
          benefits: ['Automated Payroll Processing', 'Compliance Assurance', 'Real-Time Updates'],
          imageSrc: img12,
          imageAlt: 'Payroll & Compliance',
          imgPosition: 'left',
        },
        {
            title: 'Appraisal System',
            subtitle: 'Streamlined Employee Performance Evaluation',
            description:
              'The Appraisal System enables organizations to systematically evaluate employee performance, link individual achievements to corporate goals, and manage salary increments, promotions, and developmental feedback. This module supports setting up an appraisal framework, customizing review processes, and automating approval workflows for performance reviews.',
            benefits: ['Performance Alignment', 'Structured Appraisals', 'Data-Driven Decisions','Improved Employee Engagement','Compliance and Documentation'],
            imageSrc: img13,
            imageAlt: 'Appraisal System',
            imgPosition: 'right',
          },
          {
            title: 'Generate Salary',
            subtitle: 'Automated Payroll Generation for Accurate Salary Processing',
            description:
              'The Generate Salary module enables organizations to automatically calculate and disburse employee salaries based on predefined salary structures, attendance records, deductions, and statutory compliances. This ensures timely and accurate payroll processing, minimizing errors and reducing administrative workload.',
            benefits: ['Automated Calculations', 'Accurate and Compliant', 'Time-Efficient','Reduced Errors','Improved Employee Transparency'],
            imageSrc: img2,
            imageAlt: 'Generate Salary',
            imgPosition: 'left',
          },
          {
            title: 'Post Salary Payable',
            subtitle: 'Efficiently manage and track employee payroll with advanced search and filter capabilities.',
            description:
              'Our advanced salary management system empowers HR managers to effortlessly search, filter, and access employee salary records using a variety of criteria such as date, month, grade, and department. With user-friendly navigation, switching between different months is seamless. A comprehensive header provides a clear overview of payroll status, displaying the total number of employees with processed salaries and those pending. This system enhances the overall accuracy and efficiency of payroll management, ensuring smooth and precise operations.',
            benefits: ['Effortless Search and Filter', 'Seamless Navigation', 'Comprehensive Overview','Instant Notifications','Enhanced Payroll Accuracy'],
            imageSrc: ClaimImgDemo,
            imageAlt: 'Post Salary',
            imgPosition: 'right',
          },
          
        ]:[
        {
          title: 'On-Boarding Process',
          subtitle: 'Smooth Onboarding and Integration of New Employees into the Organization',
          description:
            'This module enables streamlined management of departments, grades, HR policies, and appointees. Departments can be created with essential details for organized tracking, while comprehensive grade records support decision-making. HR policies are stored for easy access, and managers can maintain detailed appointee records, including documents, bank details, and offer statuses. The employee list can be sorted by grade, department, or specific employee details, with filters to categorize by status, offering efficient list management and quick status updates. Custom templates for offer and joining letters allow HR to handle onboarding smoothly and efficiently.',
          benefits: ['Efficient Department Management', 'Detailed Grade Tracking', 'Convenient Policy Access','Thorough Appointee Management','Dynamic Offer Letters','Streamlined Status Updates','Flexible Employee List Management with Quick Filter Reset'],
          imageSrc: img2,
          imageAlt: 'On-Boarding',
          imgPosition: 'left',
        },
        {
          title: 'Employee Data',
          subtitle: 'Centralized Employee Information Management',
          description:
            'This module enables streamlined employee management, allowing managers to sort, search, and filter employee records by various criteria, track regular and contract employees, manage billing rates, and initiate separation processes. It supports centralized data maintenance, automatic employee ID generation, department and grade associations, and bulk uploads for efficient data handling. Optional fields for documents and bank details ensure comprehensive record-keeping while simplifying management.',
          benefits: ['Automatic Employee ID Generation','Centralized Information', 'Data Accuracy and Integrity', 'Compliance and Record-Keeping','Manage Employee Billing Rates','Contract Employee Management','Audit Tracing','Department and Grade Association','Bulk Record Uploads'],
          imageSrc: ClaimImgDemo,
          imageAlt: 'Employee Data',
          imgPosition: 'right',
        },
        {
          title: 'Attendance Management',
          subtitle: 'Automated Attendance Tracking and Compliance',
          description:
            'The Attendance Management module allows organizations to track employee attendance, working hours, and leaves accurately. By integrating with biometric devices, time-tracking systems, or manual input methods, this module ensures that employee attendance is recorded in real time, automating the process of tracking punctuality, absenteeism, and overtime, while supporting payroll calculations and compliance.',
          benefits: ['Automated Attendance Tracking', 'Compliance with Labor Laws', 'Accurate Payroll Processing','Improved Workforce Management','Enhanced Employee Engagement'],
          imageSrc: img2,
          imageAlt: 'Attendance Management',
          imgPosition: 'left',
        },
        {
          title: 'Exit Process',
          subtitle: 'Structured and Seamless Employee Offboarding',
          description:
            'The Exit Process module ensures a smooth, structured, and compliant offboarding of employees from the organization. It covers the entire process, from resignation or termination to the final clearance and exit interview, ensuring a transparent and positive exit experience for both the employee and the organization. The module also tracks key tasks like documentation handover, knowledge transfer, and compliance with company policies.',
          benefits: ['Streamlined Offboarding', 'Improved Compliance', 'Enhanced Data Security','Feedback for Continuous Improvement','Accurate Final Settlements','Clear Communication'],
          imageSrc: ClaimImgDemo,
          imageAlt: 'Exit Process',
          imgPosition: 'right',
        },
        
      ];

  return <Container>{features.map(getFeatureContent)}</Container>;
};

export default FeatureDescription;
