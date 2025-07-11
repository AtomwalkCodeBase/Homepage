import React, { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/img1.svg';
import img3 from '../../assets/img/emp_advance.svg';
import img7 from '../../assets/img/holiday_calender.svg';
import img8 from '../../assets/img/leave_dashboard.svg';
import img9 from '../../assets/img/add_leave.svg';
import img10 from '../../assets/img/approval_leave.svg';
import img11 from '../../assets/img/leave_report.svg';
import img21 from '../../assets/img/onboarding.svg';
import img22 from '../../assets/img/employeeData.svg';
import img23 from '../../assets/img/exit_process.svg';
import img24 from '../../assets/img/assetman.svg';
import img31 from '../../assets/img/payroll-seup.svg';
import img32 from '../../assets/img/generate-salary.svg';
import img33 from '../../assets/img/post-salary.svg';
import img41 from '../../assets/img/appraisal-setup-feature.svg';
import img42 from '../../assets/img/self-appraisal.svg';
import img43 from '../../assets/img/emp-appraisal.svg';
import img44 from '../../assets/img/manager-evaluation.svg';
import img51 from '../../assets/img/check-in.svg';
import img52 from '../../assets/img/attendance-dashboard.svg';
import img53 from '../../assets/img/emp-attendance.svg';
import img54 from '../../assets/img/WeeklyScore.svg';
import { useLocation } from "react-router-dom";
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
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
    /* gap: 20px; */
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 160px; */
    gap: 2px;
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
  const isAppraisal = data === 'Appraisal';
  const isEmployeeData = data === 'HR';
  const isAttendanceData = data === 'Attendance';
  const isEmpHelpData = data === 'Help & Request';
  const isEmpEventData = data === 'Event Updates';

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
          imageSrc: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/add_claim_img.svg",
          imageAlt: "Add Claim",
          imgPosition: "left"
      },
      {
          title: "Smart Claim Flow for Quick, Transparent Approvals",
          subtitle: "Automated workflows simplify review and referral based on approval limit setup.",
          description: "Submitted claims are automatically routed to managers for review, with options to approve, reject, or send back for clarification. The system verifies manager approval authority based on grade and approval limits, forwarding claims to a higher-level manager if needed. This process maintains digital records for easy tracking and transparent decision-making. Approval process is enabled through Mobile app for real-time approval and quick settlement process.",
          benefits: ["Flexible Review/Approval Flows", "Approval limits based on Amount", "Anytime, anywhere approval for speedy settlement"],
          imageSrc: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/approve_claim.svg",
          imageAlt: "Advance Tracking Icon",
          imgPosition: "right"
      },
      {
          title: "Accurate and Streamlined Claim Settlements",
          subtitle: "Efficient settlement process with auto flow of data to accounts and linked projects.",
          description: "Once approved, claims move to the settlement phase where user can view all claims and advance records side by side for easy and effective settlement processing. The screen provides direct access to claim details and attached documents, with a bulk settlement feature to handle multiple claims efficiently. This seamless process with Accounts and Project management modules.",
          benefits: ["Clear Claim View", "Direct Document Access", "Bulk Settlement Option", "Reliable Processing with auto Account ledger processing"],
          imageSrc: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/sattle_claim.svg",
          imageAlt: "Settle Claim",
          imgPosition: "left"
      },
      {
          title: "Efficient Dashboard to Track All Expense Items",
          subtitle: "Instant insights on claim status and trends.",
          description: "The Expense Claim Dashboard provides graphical charts view for claim status and monthly trends, helping employee/Manager track claims at a glance. Extensive filter criteria based on expense category, expense item, departments, etc., for analysis and managing your expenses in a better way.",
          benefits: ["Graphical Overviews with real-time update", "Extensive Filter criteria for reports", "Download reports in PDF/XLS"],
          imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/expense_claim.svg',
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
          imageSrc: img31,
          imageAlt: "Payroll & Compliance",
          imgPosition: "left"
      },
      {
          title: "Streamlined Monthly Salary Generation with Real-Time Error Validation",
          subtitle: "Seamless access to Attendance data for accurate and quick Payroll processing.",
          description: "Our payroll processing tool enables quick salary generation while minimizing errors through integration with attendance and leave data. This facilitates managers with accurate data for decision-making. The system supports importing employee data from Attendance, HRM, and Leave Management modules for Payroll processing. Along with the full salary computation, the payroll system integrates with Payment Disbursement to enable online transfer, checks with employee pay account details for direct salary disbursement through net banking etc.",
          benefits: ["Accurate Payroll Generation", "Reduced Manual Errors", "Integrated with Attendance and Leave", "Direct Salary Disbursement"],
          imageSrc: img32,
          imageAlt: "Salary Process",
          imgPosition: "right"
      },
      {
          title: "Accurate Accounting Entries for Financial Clarity",
          subtitle: "Ensuring error-free records with detailed reporting.",
          description: "After generating salaries, the HR manager creates accounting entries to maintain precise financial records. The system displays all payable heads, showing amounts already posted and pending. Managers can download detailed reports in PDF or Excel formats and include specific posting remarks for transparency, ensuring a well-documented and accurate accounting process.",
          benefits: ["Precise Accounting Entries", "Payable Overview", "Detailed Reporting",' Transparent Documentation','Error-Free Financial Management'],
          imageSrc: img33,
          imageAlt: "Post Salary ",
          imgPosition: "left"
      },

  ] : isEmployeeData?
  [
    {
      title: "Job Offer Records - Onboarding Process",
      subtitle: "Smooth Onboarding and Integration of New Employees into the Organization",
      description: "Enables you to keep the Job offer records with unique reference ID for easy traceability and managing the offer letter and onboarding process. Custom templates for offer and joining letters allow HR to handle onboarding smoothly and efficiently. Provides data for analysis for the recruitment process.",
      benefits: ["Thorough Appointee Management", "Link Salary structure to include CTC details in offer letter", "Dynamic Offer, Appointment Letters", "One-click employee data creation from offer details"],
      imageSrc: img21,
      imageAlt: "Onboarding",
      imgPosition: "left"
  },
  {
          title: "Complete Employee Lifecycle Management",
          subtitle: "Centralized Employee Data Management - with Multi Location.",
          description: "This module enables streamlined employee data management, allowing HR and Employee managers to sort, search, and filter employee records by various criteria like Department and Grade for easy analysis and reports. Both permanent and contract employees can be managed with different salary structures. All lifecycle stages like onboarding process, initiating separation processes, completion of probation period, etc., can be managed smoothly for each employee data by the authorized manager. Optional fields for documents and bank details ensure comprehensive record-keeping while simplifying management.",
          benefits: ["Department and Grade structure - for data segregation and easy management.", "Automatic ID Generation for Employee, and Contract Employee.", "Centralized Information - Data Accuracy and Integrity", "Compliance and Record-Keeping - integrated with document management system.", "Manage Employee Billing Rates", "Contract Employee Management", "Audit Tracing for employee data. Supports bulk record uploads from existing system."],
          imageSrc: img22,
          imageAlt: "Employee data",
          imgPosition: "right"
      },
      {
        title: "Comprehensive Asset Management with Atomwalk HRM",
        subtitle: "Efficient Asset Tracking & Transparent Employee Exit Process.",
        description: "Atomwalk HRM supports comprehensive asset management, allowing companies to efficiently manage their assets category-wise. The system also facilitates seamless asset allocation to employees, ensuring transparency. During the employee exit approval process, the system automatically tracks allocated assets, ensuring all assets are returned before approval, enhancing operational clarity and control.",
        benefits: ["Category & type wise asset management", "Employee-wise asset allocation", "Automatic asset tracking during exit process & Ensures asset return before exit approval", "Enhances transparency and accountability"],
        imageSrc: img24,
        imageAlt: "Asset Management",
        imgPosition: "left"
    },
      {
          title: "Streamlined Exit Process with Customized Setup",
          subtitle: "Ensuring Smooth Exit with Assets and KT Transfer",
          description: "With customized exit process setup, you can track and complete all the steps needed to be done by the employee before he/she exits the system. This can be knowledge transfer, handover of assets, exit interview, to name a few. Employee can initiate the separation process, which can be managed by approval/review flow.",
          benefits: ["Customized exit process setup", "Smooth Transitions and completion of activity by departments.", "Facility to capture document evidence at each step.", "If the asset is not returned to the company, the exit approval cannot be completed."],
          imageSrc: img23,
          imageAlt: "Exit Process",
          imgPosition: "right"
      },
      
  ] : isAppraisal?
  [
      {
          title: "Efficient Appraisal System for Accurate Assessments",
          subtitle: "Completely Configurable Appraisal KPI Structure Definition.",
          description: "Highly flexible and configurable appraisal structure to set up your KPI targets for each employee grade level. Supports and is configurable for quarterly, half-yearly, and yearly appraisal cycles. Self-assessment, and provides scores for key performance indicators (KPIs), and submits the appraisal to the Employee manager, who evaluates and gives scores for each KPI. Review process by Reviewer to normalize the grades for an appraisal cycle for a particular employee grade. This structured process ensures accurate and fair evaluations, fostering transparency in performance-based benefits.",
          benefits: ["Flexible Appraisal structure with KPI weightage.", "Historical appraisal records reference for employee improvement and training plan.", "Provision to upload supporting documents.", "Structured Process, Fair Performance Assessment"],
          imageSrc: img41,
          imageAlt: "Holiday Calendar",
          imgPosition: "left"
      },
      {
          title: "Self-Evaluation for Each KPI Goal",
          subtitle: "Transparent and KPI Goals for Each Cycle.",
          description: "Employee can self-initiate and give his own score. Document evidence, if required, can be uploaded. Historical appraisal data for earlier cycles is accessible.",
          benefits: ["Overall score is rule-based calculation", "Seamlessly flows to employee manager", "Historical Appraisal Data access"],
          imageSrc: img42,
          imageAlt: "Leave Dashboard",
          imgPosition: "right"
      },
      {
          title: "Manager Evaluation for Each KPI Goal.",
          subtitle: "Flexible Structure and Score for Each KPI.",
          description: "Manager evaluates and provides the score for each KPI Goal. The final score is auto-calculated based on rule setup. After providing the score, Manager sends the appraisal to the employee for final sign-off and remarks.",
          benefits: ["Overall score for Manager is rule-based calculation", "Seamlessly flows between employee and manager", "Historical Appraisal Data access"],
          imageSrc: img44,
          imageAlt: "Leave Application",
          imgPosition: "left"
      },
      {
          title: "Review Process for Grade Evaluation",
          subtitle: "Normalization of Appraisal Grades by Reviewer.",
          description: "Normalization of appraisal grades by Reviewer at each employee grade level. Performance-linked salary components (like variable pay) evaluation process. Reports for each appraisal cycle and employee grade levels.",
          benefits: ["Review process", "Reports for performance-based salary components.", "Customizable Reports"],
          imageSrc: img43,
          imageAlt: "Leave Approval",
          imgPosition: "right"
      },
  ]: isEmpHelpData?
  [
      {
        title: "Streamlined Request Category Setup for Efficient Issue Management",
        subtitle: "Flexible and Structured Configuration of Request Categories.",
        description: "Managers can easily create and manage multiple request categories through Atomwalk HRMS Desktop. Configure each category with details like Request Category Name, Request Type (Help Desk or Request Desk), Default Allocation Employee, Department, Resolution Time Limit, Next Level Employee for Escalation, Remarks, and optional Image. If a request isn’t resolved within the specified days, it automatically escalates to the next level. A bulk upload feature is also available for adding multiple categories at once, enhancing efficiency in large-scale setups.",
        benefits: [
          "Add unlimited customizable request categories.",
          "Auto-escalation on resolution time expiry.",
          "Assign default and next-level employees for better tracking.",
          "Bulk upload support for faster configuration."
        ],
        imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Help-Image-1.png',
        imageAlt: "Request Category Setup",
        imgPosition: "left"
      },
      {
        title: "Unified Ticket Management via Web and Mobile",
        subtitle: "Seamless Help & Request Ticket Submission Across Platforms.",
        description: "Employees can raise both Help Desk and Request Desk tickets using the Atomwalk HRMS Web or Mobile application. While creating a new ticket, the employee needs to select the appropriate Request Help Category from predefined options, provide the Request Date, and enter detailed Request Information. They can also upload a reference file related to the issue and add additional remarks. This integrated system ensures transparency and quicker issue resolution.",
        benefits: [
          "Submit Help or Request tickets from web or mobile app.",
          "Select from predefined Request Categories for better routing.",
          "Attach supporting files to describe issues accurately.",
          "User-friendly interface for faster ticket creation."
        ],
        imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Help-Image-2.png',
        imageAlt: "Employee Help Ticket Submission",
        imgPosition: "right"
      },
      {
        title: "Smart Ticket Assignment for Faster Resolution",
        subtitle: "Automated and Manual Employee Assignment Workflow.",
        description: "Tickets raised by employees are automatically assigned to the designated employee if a Default Allocation Employee was set during the request category setup. If the issue is not resolved within the defined time limit, and a Next Level Employee is specified, the system escalates the ticket to the next level automatically. In cases where no default or next-level assignment exists, managers have the flexibility to manually assign the ticket to any suitable employee, ensuring every request is handled efficiently.",
        benefits: [
          "Automatic assignment based on category setup.",
          "Auto-escalation to next level if unresolved within the time limit.",
          "Manual assignment option available for managers.",
          "Ensures no ticket is left unattended."
        ],
        imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Help-Image-3.png',
        imageAlt: "Automated Ticket Assignment",
        imgPosition: "left"
      },
      {
        title: "Comprehensive Help & Request Resolution Interface",
        subtitle: "Empowering Employees to Track and Resolve Assigned Tickets Efficiently.",
        description: "Assigned employees can access and manage their tickets through the 'Employee Help & Request' section in the Atomwalk Web App. Here, they can view critical information like Request Date, Escalation Date, Submitted Files, Forward Remarks (if the ticket was forwarded), Request Details, and Employee Remarks. When resolving a ticket, they must enter the Completion Date, Completion Remarks, and optionally upload a Completion Reference File. The system also allows the assigned employee to mark the ticket as Completed, send it Back to the Employee, or Reject the Request, ensuring full control and accountability in the resolution process.",
        benefits: [
          "Clear visibility of all ticket-related details and history.",
          "Structured resolution form for consistency and documentation.",
          "Multiple resolution actions: Complete, Back to Employee, or Reject.",
          "Supports upload of resolution files for evidence and record-keeping."
        ],
        imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Help-Image-4.png',
        imageAlt: "Help and Request Resolution",
        imgPosition: "right"
      },
      {
        title: "Powerful Help & Request Dashboards for Managers",
        subtitle: "Real-Time Insights and Control Over Ticket Management.",
        description: "Managers can access the Help Tickets Dashboard and Requests Dashboard in the Atomwalk HRM Web App. These dashboards provide a comprehensive view of all submitted tickets, with advanced filter options such as Request ID, Employee Name, Employee ID, Category, Status, and sorting by Record Created or Employee Name. For better data visualization, two pie charts display the current Request Status distribution and the Request Category distribution. Managers can also reassign tickets to different employees directly from the dashboard, ensuring optimal workload distribution and timely resolution.",
        benefits: [
          "Advanced filtering by multiple criteria for quick access to specific tickets.",
          "Real-time ticket tracking with visual summaries using pie charts.",
          "Easy reassignment of tickets to ensure timely handling.",
          "Centralized control panel for monitoring and managing all employee requests."
        ],
        imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Help-Image-5.png',
        imageAlt: "Manager Ticket Dashboard",
        imgPosition: "left"
      },
  ]: isEmpEventData?
  [
      {
        title: "Company Event Management & Notifications",
        subtitle: "Keep Employees Informed with Real-Time Event Updates.",
        description: "Managers can create and schedule company events directly from the Manager HRMS panel. Once an event is created, all employees are instantly notified through both the Atomwalk mobile app and web app. This feature ensures that employees stay updated with important company activities, celebrations, meetings, and announcements, enhancing overall communication and engagement within the organization.",
        benefits: [
          "Easy event creation through Manager HRMS.",
          "Instant notifications to all employees on mobile and web platforms.",
          "Improves internal communication and employee participation.",
          "Ideal for meetings, celebrations, announcements, and more."
        ],
        imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Company-Events.png',
        imageAlt: "Company Event Notification",
        imgPosition: "left"
      },
      {
        title: "Customizable Employee Event Creation",
        subtitle: "Celebrate and Acknowledge Key Employee Milestones.",
        description: "Managers can create various types of employee-centric events in the Manager HRMS, such as Work Anniversary, Birthday, Marriage Anniversary, Promotion Events, or any Other Custom Event. Once created, notifications are sent instantly to all relevant employees via the Atomwalk mobile app and web app. This helps build a positive work culture by recognizing important personal and professional milestones, fostering employee morale and engagement.",
        benefits: [
          "Supports multiple event types like Birthday, Work Anniversary, Promotions, and more.",
          "Instant notifications to employees across web and mobile platforms.",
          "Boosts employee engagement and company culture.",
          "Fully configurable event messages and timing."
        ],
        imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/EMP-Events.png',
        imageAlt: "Employee Event Notifications",
        imgPosition: "right"
      },
      {
        title: "Interactive Employee Events with Social Engagement",
        subtitle: "Encourage Peer Acknowledgment Through Comments and Wishes.",
        description: "On published employee events such as Birthdays, Work Anniversaries, Promotions, and more, fellow employees can engage by adding comments or posting wishes through both the Atomwalk mobile app and web app. This interactive feature promotes a sense of community, encourages peer recognition, and fosters a positive and inclusive workplace culture.",
        benefits: [
          "Employees can post comments or wishes on events.",
          "Fosters team bonding and workplace positivity.",
          "Available on both mobile and web platforms.",
          "Drives employee engagement through social interaction."
        ],
        imageSrc: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-event.png",
        imageAlt: "Employee Event Engagement",
        imgPosition: "left"
      }

      
  ] : isAttendanceData?
  [
      {
          title: "Attendance- Anytime- Anywhere",
          subtitle: "Streamlined Check-In with Location Tracking and Daily Task Insights.",
          description: "Our attendance system combines flexibility and precision, allowing employees to mark their workdays from the web or mobile app. The mobile app's check-in and check-out features are equipped with real-time location tracking, automatically capturing the exact location, date, and time to ensure accurate and efficient attendance records. Additionally, during check-out, employees are prompted to fill out a remarks field, providing a brief summary of their day’s tasks. This feature enables managers to gain valuable insights into daily productivity, fostering accountability and enhancing team management.",
          benefits: ["Accurate Time & Location Tracking", "Enhanced Flexibility", " Improved Productivity Monitoring", "Efficient Reporting"],
          imageSrc: img51,
          imageAlt: "Check-in",
          "imgPosition": "left"
      },
      {
          title: "Stay Informed, Stay Organized",
          subtitle: "Dynamic Calendar View for Attendance, Holidays, and Leave Management.",
          description: "Our attendance system offers a dynamic calendar view that allows employees to easily track their attendance status, view holiday lists, and monitor their leave days. After checking in and out, employees can submit their attendance records weekly for manager review, ensuring accountability and streamlined communication. This feature not only keeps employees informed but also helps managers efficiently oversee attendance and leave management, fostering a productive work environment.",
          benefits: ["Weekly Submission for Review", "Dynamic Calendar View",'Multiple Status Display: On-Time, Weekly Duration, Mobile Check-ins '],
          imageSrc: img52,
          imageAlt: "Attendance View",
          imgPosition: "right"
      },
      {
          title: "Comprehensive Attendance Insights",
          subtitle: "Efficient Review and Approval for Enhanced Team Productivity.",
          description: "Our attendance management system provides managers with a complete overview of their team’s attendance records. Once an employee submits their attendance, it is forwarded for review, ensuring accountability. If an employee encounters issues completing the process, managers can seamlessly update attendance for previous days through the manager portal, including remarks for full transparency. With access to detailed attendance records, managers can also update check-in and check-out times with geo-location data as needed. This system supports weekly approvals, streamlining the management of attendance and promoting effective team oversight.",
          benefits: ["Streamlined Review Process", "Flexibility in Attendance Management", "Transparency with Remarks","Geo-Location Updates",' Weekly Approval Workflow', 'Employee Status: On-Time, Weekly Duration, Mobile Check-ins'],
          imageSrc: img53,
          imageAlt: "Approval Attendance",
          imgPosition: "left"
      },
      {
        title: "Transform Task Management & Performance Tracking with Atomwalk HRM",
        subtitle: "Empower your team with clear task assignments and insightful performance evaluations.",
        description: "With Atomwalk Technology HRM, task allocation and performance tracking become seamless. Managers can easily assign weekly tasks, monitor progress, and assess employee performance, all within a structured framework. Employees are able to track their task completion and attendance efficiently, while managers have a clear overview of their team's weekly outputs. The Weekly Score Dashboard offers both employees and managers a comprehensive view of performance scores, with insightful graphical charts to help identify trends and growth opportunities. This feature creates a transparent and engaging performance management system, driving organizational success.",
        benefits: ["Allocate up to three tasks per week, with detailed tracking and notes.", "Employees can mark tasks complete and submit weekly attendance in one step.","Managers can review, approve/reject submissions, and assign performance ratings.","Personalized performance scores and interactive charts for both employees and managers.","Graphical performance scores highlight trends, growth, and team achievements."],
        imageSrc: img54,
        imageAlt: "Weekly Score Dashboard",
        imgPosition: "right"
    },
  ]:[
    {
      title: "Job Offer Records - Onboarding Process",
      subtitle: "Smooth Onboarding and Integration of New Employees into the Organization",
      description: "Enables you to keep the Job offer records with unique reference ID for easy traceability and managing the offer letter and onboarding process. Custom templates for offer and joining letters allow HR to handle onboarding smoothly and efficiently. Provides data for analysis for the recruitment process.",
      benefits: ["Thorough Appointee Management", "Link Salary structure to include CTC details in offer letter", "Dynamic Offer, Appointment Letters", "One-click employee data creation from offer details"],
      imageSrc: img21,
      imageAlt: "Onboarding",
      imgPosition: "left"
  },
  {
          title: "Complete Employee Lifecycle Management",
          subtitle: "Centralized Employee Data Management - with Multi Location.",
          description: "This module enables streamlined employee data management, allowing HR and Employee managers to sort, search, and filter employee records by various criteria like Department and Grade for easy analysis and reports. Both permanent and contract employees can be managed with different salary structures. All lifecycle stages like onboarding process, initiating separation processes, completion of probation period, etc., can be managed smoothly for each employee data by the authorized manager. Optional fields for documents and bank details ensure comprehensive record-keeping while simplifying management.",
          benefits: ["Department and Grade structure - for data segregation and easy management.", "Automatic ID Generation for Employee, and Contract Employee.", "Centralized Information - Data Accuracy and Integrity", "Compliance and Record-Keeping - integrated with document management system.", "Manage Employee Billing Rates", "Contract Employee Management", "Audit Tracing for employee data. Supports bulk record uploads from existing system."],
          imageSrc: img22,
          imageAlt: "Employee data",
          imgPosition: "right"
      },
      {
        title: "Comprehensive Asset Management with Atomwalk HRM",
        subtitle: "Efficient Asset Tracking & Transparent Employee Exit Process.",
        description: "Atomwalk HRM supports comprehensive asset management, allowing companies to efficiently manage their assets category-wise. The system also facilitates seamless asset allocation to employees, ensuring transparency. During the employee exit approval process, the system automatically tracks allocated assets, ensuring all assets are returned before approval, enhancing operational clarity and control.",
        benefits: ["Category & type wise asset management", "Employee-wise asset allocation", "Automatic asset tracking during exit process & Ensures asset return before exit approval", "Enhances transparency and accountability"],
        imageSrc: img24,
        imageAlt: "Asset Management",
        imgPosition: "left"
    },
      {
          title: "Streamlined Exit Process with Customized Setup",
          subtitle: "Ensuring Smooth Exit with Assets and KT Transfer",
          description: "With customized exit process setup, you can track and complete all the steps needed to be done by the employee before he/she exits the system. This can be knowledge transfer, handover of assets, exit interview, to name a few. Employee can initiate the separation process, which can be managed by approval/review flow.",
          benefits: ["Customized exit process setup", "Smooth Transitions and completion of activity by departments.", "Facility to capture document evidence at each step.", "If the asset is not returned to the company, the exit approval cannot be completed."],
          imageSrc: img23,
          imageAlt: "Exit Process",
          imgPosition: "right"
      },
      
  ];
      const location = useLocation(); // Get the current URL

      useEffect(() => {
        // Get the query string (e.g., "?5")
        const queryString = location.search;
    
        // Extract the step manually if no key exists
        const stepMatch = queryString.match(/\?(\d+)/);
        const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;
    
        console.log(step, "Step value parsed from URL");
    
        // Calculate scroll offset
        const scrollOffset = !isNaN(step) ? 700 + (step - 1) * 700 : 0;
    
        // Scroll the page
        if (scrollOffset > 0) {
          window.scrollTo({
            top: scrollOffset,
            behavior: "smooth",
          });
        }
      }, [location.search]);
  return <Container>{features.map(getFeatureContent)}</Container>;
};

export default FeatureDescription;
