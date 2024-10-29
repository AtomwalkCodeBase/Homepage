import React from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../../assets/img/Claim_Image_demo.png';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/img1.svg';
import img2 from '../../assets/img/add_claim_img.svg';
import img3 from '../../assets/img/emp_advance.svg';
import img4 from '../../assets/img/approve_claim.svg'
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
            <p style={{color:"#666"}}>{feature.description}</p>
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
            <p style={{color:"#666"}}>{feature.description}</p>
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
          title: "Simplify Claim Expense Item Setup",
          subtitle: "Efficiently manage and control Expense Items with Service Item category setup.",
          description: "Define Service Item Categories to streamline Expense Items, giving employees a quick selection process for claim submissions. This setup enables you to capture GST Applicability, Submit of Expense Document Applicability, Limits for Approval, etc., to simplify and streamline your Claim Management Process.",
          "benefits": ["Define Service Item Categories", "Flexible Expense Item Setup", "Analysis of expense based on expense category/Item"],
          imageSrc: img1,
          imageAlt: "Expense Setup",
          imgPosition: "left"
      },
      {
          title: "Employee Advance Tracking and Expense Claim Offset Against Advance",
          subtitle: "Employee Advance upload, tracking, and history of offset against Expense Claims.",
          description: "Manage Employee expense advance and efficiently track advance offset against each claim, offering a clear view of balances and outstanding advance amount. Enables decision-making process for effective advance amount.",
          benefits: ["Advance Tracking", "Clear offset records with claim details"],
          imageSrc: img3,
          imageAlt: "Advance",
          imgPosition: "right"
      },
      {
          title: "Simplified Claim Expenses by Employee",
          subtitle: "Submit and track expense claims easily, anytime, anywhere.",
          description: "Employee can submit expense claims by selecting an Expense item, adding project details if needed, and uploading supporting documents like bills and receipts. The mobile app feature allows employee to capture and submit receipts instantly, making the process faster and more efficient for both employee and approval & settlement process for company on real-time basis.",
          benefits: ["Simple Claim Submission", "Upload Supporting Documents", "Mobile-Friendly Convenience, Instant Receipt Capture", "Expense auto linkage to projects and efficient project margin tracking"],
          imageSrc: img2,
          imageAlt: "Add Claim",
          imgPosition: "left"
      },
      {
          title: "Smart Claim Flow for Quick, Transparent Approvals",
          subtitle: "Automated workflows simplify review and referral based on approval limit setup.",
          description: "Submitted claims are automatically routed to managers for review, with options to approve, reject, or send back for clarification. The system verifies manager approval authority based on grade and approval limits, forwarding claims to a higher-level manager if needed. This process maintains digital records for easy tracking and transparent decision-making. Approval process is enabled through Mobile app for real-time approval and quick settlement process.",
          benefits: ["Flexible Review/Approval Flows", "Approval limits based on Amount", "Anytime, anywhere approval for speedy settlement"],
          imageSrc: img4,
          imageAlt: "Advance Tracking Icon",
          imgPosition: "right"
      },
      {
          title: "Accurate and Streamlined Claim Settlements",
          subtitle: "Efficient settlement process with auto flow of data to accounts and linked projects.",
          description: "Once approved, claims move to the settlement phase where user can view all claims and advance records side by side for easy and effective settlement processing. The screen provides direct access to claim details and attached documents, with a bulk settlement feature to handle multiple claims efficiently. This seamless process with Accounts and Project management modules.",
          benefits: ["Clear Claim View", "Direct Document Access", "Bulk Settlement Option", "Reliable Processing with auto Account ledger processing"],
          imageSrc: img5,
          imageAlt: "Settle Claim",
          imgPosition: "left"
      },
      {
          title: "Efficient Dashboard to Track All Expense Items",
          subtitle: "Instant insights on claim status and trends.",
          description: "The Expense Claim Dashboard provides graphical charts view for claim status and monthly trends, helping employee/Manager track claims at a glance. Extensive filter criteria based on expense category, expense item, departments, etc., for analysis and managing your expenses in a better way.",
          benefits: ["Graphical Overviews with real-time update", "Extensive Filter criteria for reports", "Download reports in PDF/XLS"],
          imageSrc: img6,
          imageAlt: "Post Accounting",
          imgPosition: "right"
      }
  ] : isLeave?
  [
      {
          title: "Location-Wise - Simplified Management of Your Holiday Calendar",
          subtitle: "Easy and exhaustive way to take care of your complex organisational need of Holiday management (Single/Multi location).",
          description: "Manage Holiday setup digitally for your business for each Year across single/multiple locations. Holiday setup supports Mandatory and Optional holidays for each location. Supports Multiple leave types and yearly limit for each leave type. Setup enables better Project execution planning for the organisation and provides transparency for the employee to plan/utilise their Leave.",
          benefits: ["Easy Exhaustive Setup across Single/Multi Location", "Supports Audit trails and track changes in setup", "Optional Holiday setup enables for each location", "Transparent and accessible by all users/employees"],
          imageSrc: img7,
          imageAlt: "Holiday Calendar",
          "imgPosition": "left"
      },
      {
          title: "Dashboard for Complete Leave Overview",
          subtitle: "Easily track, manage, and plan your time off/utilisation of Leave.",
          description: "Employee can view detailed summary dashboard of their leave status, including total applied, approved, and pending leave categorized by leave type. Month-wise trend analysis enables the Manager to manage risk at project planning level. The system also provides a year-wise holiday list which is accessible through Mobile app, making it simple to manage leave information and plan time off effectively. Leave details are shared with Billing/Payroll modules seamlessly to eliminate any processing errors.",
          benefits: ["Comprehensive Overview, Detailed for each leave type", "Trend Analysis for better planning and risk management", "Accessible from Mobile app", "Shared with Payroll and Project Management modules seamlessly"],
          imageSrc: img8,
          imageAlt: "Leave Dashboard",
          imgPosition: "right"
      },
      {
          title: "Apply Leave from Anywhere Anytime",
          subtitle: "Simple Leave Application: easy to apply and cancel from anywhere & anytime.",
          description: "Employee can apply for multiple types of leaves like Earned Leave, Work From Home, and Loss of Pay through both web and mobile apps. On submitted, the leave request automatically moves to manager's dashboard for approval, streamlining the process.",
          benefits: ["Both Web and Mobile Convenience", "Multiple leave types", "Easy Application process with Holiday List Integration, to alter users"],
          imageSrc: img9,
          imageAlt: "Leave Application",
          imgPosition: "left"
      },
      {
          title: "Swift Leave Approvals from Anywhere Anytime",
          subtitle: "Approve/Reject Leave Requests with Ease and Precision from Approver Dashboard.",
          description: "Managers can easily filter leave requests by individual employee or leave type, providing a clear view of total leave applied, approved, and pending for each employee. This organized approach allows for efficient navigation and prompt action. Managers can review details before making decisions, with a mandatory remark field to ensure clear communication with employees during the approval or rejection process.",
          benefits: ["Organized and Filter View", "Comprehensive Overview", "Streamlined Approval Process", "Efficient Leave Approval", "Mobile Convenience", "Approval History"],
          imageSrc: img10,
          imageAlt: "Leave Approval",
          imgPosition: "right"
      },
      {
          title: "Organized Leave Insights for Efficient Management",
          subtitle: "Gain Complete Insights into Leave Patterns and Usage",
          description: "Managers can sort leave requests by individual employee or leave type, providing a clear and organized view. They also have access to a comprehensive annual leave report that includes all leave details across departments. This feature ensures efficient record-keeping and supports transparent leave management, helping managers make informed decisions.",
          benefits: ["Informed Decision-Making", "Exportable Reports", "Leave Balances at a Glance", "Customizable Reports"],
          imageSrc: img11,
          imageAlt: "Leave Reports",
          imgPosition: "left"
      }
  ] : isPayroll?
  [
      {
          title: "Flexible and Compliant Payroll Management",
          subtitle: "Configurable Salary structure with predefined integrated TDS/PT/PF/Gratuity calculation for seamless employee compensation.",
          description: "Our HR management offers a comprehensive system for managing employee salary structures, and compliance setup in accordance with government regulations. Companies can create tailored salary structures for different employee grades. The platform also facilitates setting up Provident Fund, Gratuity, Employee State Insurance (ESI), and TDS, PT tax parameters, ensuring full compliance and transparency in payroll management. In addition to this, any other salary components like Variable Pay and custom deductions can be configured in the system, making it highly flexible for any complex scenario.",
          benefits: ["Configurable pay scale grades", "Configurable salary structures with formula builder", "Customizable payslip design", "Dynamic Salary Structures to include compliance like PF, Gratuity, ESI, PT, and TDS", "Audit trails for Setup control", "Contract Rate setup for contract employee"],
          imageSrc: img12,
          imageAlt: "Payroll & Compliance",
          imgPosition: "left"
      },
      {
          title: "Streamlined Monthly Salary Generation with Real-Time Error Validation",
          subtitle: "Seamless access to Attendance data for accurate and quick Payroll processing.",
          description: "Our payroll processing tool enables quick salary generation while minimizing errors through integration with attendance and leave data. This facilitates managers with accurate data for decision-making. The system supports importing employee data from Attendance, HRM, and Leave Management modules for Payroll processing. Along with the full salary computation, the payroll system integrates with Payment Disbursement to enable online transfer, checks with employee pay account details for direct salary disbursement through net banking etc.",
          benefits: ["Accurate Payroll Generation", "Reduced Manual Errors", "Integrated with Attendance and Leave", "Direct Salary Disbursement"],
          imageSrc: img13,
          imageAlt: "Salary Process",
          imgPosition: "right"
      },
      {
          title: "Detailed Pay Slips and Statements",
          subtitle: "Comprehensive and clear statements for employee and admin access.",
          description: "Payroll management provides both employees and administrators with access to comprehensive payslips, enabling clarity around salary details, deductions, and compliance contributions. This system supports bulk processing of payslips and customized templates. Integrated with the attendance and leave management, it enables real-time pay corrections for missing attendance to ensure complete transparency for the entire payroll month.",
          benefits: ["Detailed Payslip Generation", "Easy Salary Reconciliation", "Payslip Printing Option"],
          imageSrc: img13,
          imageAlt: "Payslip Generation",
          imgPosition: "left"
      },
      {
          title: "Extensive Payroll Reporting",
          subtitle: "Get insights from payroll data for better workforce planning and compliance.",
          description: "Our payroll system provides flexible reporting options that include the detailed payroll reconciliation report, tax and deductions summary report, and annual pay analysis. Reports can be customized to fit different departments and roles, making it easier to maintain records and plan effectively.",
          benefits: ["Payroll Tax Summary", "Salary Audit Reports", "Yearly Analysis"],
          imageSrc: img13,
          imageAlt: "Payroll Reports",
          imgPosition: "right"
      }
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
