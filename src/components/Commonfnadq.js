import { useState } from "react"
import styled, { keyframes, css } from "styled-components"
import { ChevronDown, Sparkles } from "lucide-react"

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`


// Styled components
const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #e0e7ff 100%);
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
    z-index: 0;
  }
  
  &::before {
    top: -100px;
    left: -100px;
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::after {
    bottom: -100px;
    right: -100px;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
`

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
`

const Title = styled.h1`
  font-size: 2.75rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 2px;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 600px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`

const SparkleIcon = styled(Sparkles)`
  position: absolute;
  color: #4f46e5;
  animation: ${float} 3s ease-in-out infinite;
`

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const FAQItem = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background: white;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${(props) => props.delay}ms;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`

const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4f46e5;
  }
  
  ${(props) =>
    props.isOpen &&
    css`
    color: #4f46e5;
    background: linear-gradient(90deg, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0) 100%);
  `}
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => (props.isOpen ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" : "#f3f4f6")};
  color: ${(props) => (props.isOpen ? "white" : "#6b7280")};
  transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  
  &:hover {
    animation: ${pulse} 1.5s infinite;
  }
`

const Answer = styled.div`
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s;
  padding: ${(props) => (props.isOpen ? "0 1.5rem 1.5rem" : "0 1.5rem")};
  color: #4b5563;
  line-height: 1.7;
  font-size: 1.05rem;
  
  p {
    margin-top: 0;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});
    transition: opacity 0.4s ease-in, transform 0.4s ease-in;
    transition-delay: ${(props) => (props.isOpen ? "0.2s" : "0")};
    border-left: 3px solid #e0e7ff;
    padding-left: 1rem;
    background: linear-gradient(90deg, rgba(224, 231, 255, 0.3) 0%, rgba(224, 231, 255, 0) 100%);
    border-radius: 0 8px 8px 0;
    padding: 0.75rem 1rem;
  }
`
const ModuleHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: #7c3aed;
    margin-top: 4px;
  }
`;

export default function Commonfnadq({ data }) {
  const [openItems, setOpenItems] = useState([]);

  const faqData = {
    hrm: [
      {
        id: "hrm-1",
        question: "What is an HRM system, and how does it help employees?",
        answer:
          "Atomwalk HRM is an all-in-one Human Resource Management system designed to streamline HR processes. It helps employees manage attendance, leave, payroll, claims, appraisals, and more through a user-friendly interface. The mobile app enhances accessibility, allowing employees to complete HR tasks on the go.",
      },
      {
        id: "hrm-2",
        question: "How do I access the HRM portal or mobile app?",
        answer:
          "You can access Atomwalk HRM via the web portal using your own login credentials. The mobile app can be downloaded from the Google Play Store. Log in with the same credentials as the web portal. Further you can add the Bio-metric and set your pin also.",
      },
      {
        id: "hrm-3",
        question: "What are the key features available in this HRM module?",
        answer:
          "Atomwalk HRM includes attendance tracking, leave management, payroll processing, claims and reimbursements, performance management, recruitment, onboarding, and employee self-service.",
      },
      {
        id: "hrm-4",
        question: "Can I access the HRM system from outside the office?",
        answer: "Yes, the HRM system and mobile app are accessible from anywhere with an internet connection, ensuring flexibility for employees working remotely or traveling.",
      },
      {
        id: "hrm-5",
        question: "What should I do if I forget my HRM login credentials?",
        answer:
          "Click the “Forgot Password” option on the login page and follow the instructions to reset your password but you should have access to the registered mail-Id. For further assistance, contact your HR department.",
      },
      {
        id: "hrm-6",
        question: "Who do I contact for technical support or system issues?",
        answer:
          `For any technical issues, reach out to the Atomwalk HRM support team via the ‘Help & Support’ section in the system or contact your HR representative. Or you can contact to ‘support@atomwalk.com’ mail id.`,
      },
      {
        id: "hrm-7",
        question: "How do I mark my attendance through the HRM system?",
        answer:
          `Use the "My Attendance" feature in the Atomwalk HRM web portal to mark your attendance. For added convenience, Atomwalk also provides a mobile app. Through the mobile app, users can check in and check out by accessing the "My Attendance" section. In some setups, biometric integration or geolocation may also be used for marking attendance.`,
      },
      {
        id: "hrm-8",
        question: 'Can I edit or correct attendance entries?',
        answer:
          'Attendance entries cannot be edited directly. If there are discrepancies, submit an "Attendance Correction Request" via email to your manager for approval. Once approved, the manager can update the attendance through the "Attendance Records" section in their portal.',
      },
      {
        id: "hrm-9",
        question: 'How do I apply for leave?',
        answer:
          `In the mobile app, navigate to the "My Leaves" section, select "Apply Leave," fill out the form, and submit it. Users have the option to apply for different types of leave, such as Earned Leave, Work from Home, or Loss of Pay. After submitting the application, users can view their leave details, including the status, on the "My Leaves" screen. Similarly, in the web app, users can navigate to the "My Leave Details" section to apply for leave using the same process as the mobile app.`,
      },
      {
        id: "hrm-10",
        question: 'What is the leave approval process?',
        answer:
          'After submitting your leave request, it is sent to your reporting manager for review and approval. The manager can either "Approve" or "Reject" the leave application by navigating to the "Approve Leave" section in the mobile app. In the web app, the manager needs to access the "Approve Leave" section under the "Manager (HRMS)" menu.',
      },
      {
        id: "hrm-11",
        question: 'How can I check my leave balance?',
        answer:
          `Your leave balance is displayed in the "My Leave Details" section of the web app, providing a detailed breakdown of leave types, including the maximum allowed, leave applied, approved leave, and pending approval. In the mobile app, you can view only the maximum allowed leave for each leave type.`,
      },
      {
        id: "hrm-12",
        question: 'Can I reject a leave request?',
        answer:
          'Yes, manager can reject the leave request providing the rejection remark.',
      },
      {
        id: "hrm-13",
        question: `How are payroll TDS calculation?`,
        answer:
          `Yes, Atomwalk HRM supports TDS calculations. The system automatically calculates TDS based on both the old and new tax regimes.`,
      },
      {
        id: "hrm-14",
        question: `Do you support PF?`,
        answer:
          `Yes, Atomwalk HRM supports Provident Fund (PF) management, including PF calculations.`,
      },
      {
        id: "hrm-15",
        question: `Do you support Ledger Entries?`,
        answer:
          `Yes, Atomwalk HRM supports Ledger Entries, ensuring accurate financial record-keeping and seamless integration with payroll and accounting processes.`,
      },
      {
        id: "hrm-16",
        question: `Do you support Employee Advance?`,
        answer: `Yes, Atomwalk HRM supports Employee Advance. During claim settlement, the system automatically adjusts the claims against the advance amount, ensuring accurate reconciliation.`,
      },
      {
        id: "hrm-17",
        question: `Do you have provision to update the personal information, such as address or contact details?`,
        answer:
          `Yes, we support to update the personal information, such as address or contact details. For updating any other information, you must send a request via email to your HR manager. Only the HR manager has the authority to update these details in the system.`,
      },
      {
        id: "hrm-18",
        question: `Where can I view my performance reviews or appraisal details?`,
        answer:
          `For performance reviews, employees can visit the "My Weekly Score" section, where they can view their "Performance Score." Appraisal details are available under the "My Appraisal" section.`,
      },
      {
        id: "hrm-19",
        question: `Can I view my team’s details if I am a manager?`,
        answer:
          `Yes, managers have access to team details under the "Manager (HRMS)" sections, depending on system configuration.`,
      },
      {
        id: "hrm-20",
        question: 'How do I view my goals or Key Responsibility Area (KRA)?',
        answer:
          `Goals and KRA are accessible in the "My Attendance" section at the weekly attendance submission.`,
      },
      {
        id: "hrm-21",
        question: `Can I provide feedback or update of my goals in the HRM system?`,
        answer:
          `Yes, you can provide feedback and suggest updates to your goals. After submitting the form, it will be forwarded to the "Manager Dashboard" for review.`,
      },
      {
        id: "hrm-22",
        question: `How do I participate in the appraisal process?`,
        answer:
          `Once the HR manager sets up the "Appraisal Structure", employees can "Initiate the Appraisal". Proceed with the required steps, which include completing self-assessment forms and providing inputs & documents on important performance parameter.`,
      },
      {
        id: "hrm-23",
        question: `Where can I view my performance history?`,
        answer:
          `There are two types of "Performance History": Weekly Performance and Appraisal History. The Weekly Performance score can be accessed through the "My Weekly Score" dashboard, while the Appraisal History can be accessed through the "My Appraisal" dashboard.`,
      },
      {
        id: "hrm-24",
        question: `Do you have review process in the appraisal?`,
        answer:
          `Yes, it is supported. Appraisal required review can be accessed from the reviewer dashboard. The final score with normalization can be given by the reviewer.`,
      },
      {
        id: "hrm-25",
        question: `Do you support maintaining the data of selected candidate & creation of job offer/ appointment letter?`,
        answer:
          `Yes, we support maintaining the data of selected candidate & creation of job offer/ appointment letter. Company can customise the offer letter as per the requirements including the details of salary structure.`,
      },
      
    ],
    crm: [
      {
        id: "crm-1",
        question: "What is CRM, and how does it help my business?",
        answer:
          "Customer Relationship Management (CRM) solution manages Lead, Customer and Channel Partner data efficiently on a real time basis and can be accessed by all the stakeholders. Hence eliminating the risk of duplication of data . Operations like lead and customer tasks and Campaign Management can be tracked/completed efficiently. By consolidating these functions, CRM enhances customer satisfaction, boosts sales effectiveness, and improves overall business efficiency, leading to better customer retention and increased profitability.",
      },
      {
        id: "crm-2",
        question: "Who can benefit from using the CRM module?",
        answer:
          "The CRM module benefits a wide range of users across various roles within an organization, including sales teams, customer service representatives, marketing departments, channel partners, and managers. Sales teams can use it to manage leads, track opportunities, and enhance customer interactions. Customer service representatives benefit from improved case management and better tracking of customer issues. Marketing departments can leverage CRM for targeted campaigns, lead nurturing, and performance tracking. Channel partners gain from streamlined lead distribution and incentive management. Managers benefit from comprehensive insights into sales performance, customer satisfaction, and team productivity, enabling them to make informed decisions and drive business growth.",
      },
      {
        id: "crm-3",
        question: "How can I add or update customer details?",
        answer:
          "To add or update customer details, navigate to the CRM section in the left menu and select the ‘Customer List’ tab. A comprehensive list of customers will be displayed. To update an existing customer’s information, click on the desired customer’s name to view their details. You will then find an “Update” button; click this to access and modify any of the fields as needed. After making the required changes, simply click “Save” to update the customer details. To add a new customer, click the “Add Customer” button located in the top-right corner of the screen. Fill out the necessary details in the provided fields and click “Save” to record the new customer. The newly added customer will now appear in the Customer Details screen.",
      },
      {
        id: "crm-4",
        question: "Can I import/export customer data?",
        answer:
          "Yes, you can import and export customer data. On the Customer Details page, there is an option available in the top right corner. To import data, simply click on the “Upload” option, and then provide the necessary details in the format required. After submitting the information, the system will fetch and upload the customer data into the CRM. To export data, a similar process can be followed from the same menu, allowing you to download customer details in a compatible format for backup or external use. This feature ensures seamless management of customer information across your business systems.",
      },
      {
        id: "crm-5",
        question: "Does the CRM support customer segmentation?",
        answer:
          "Yes, our CRM supports customer segmentation through fields like Customer Group, and Customer Group (Secondary). While adding a new customer, you can assign values to these fields to categorize customers based on your segmentation criteria. This enables you to organize customers effectively, tailor your marketing strategies, and provide personalized services based on their group or type.",
      },
      {
        id: "crm-6",
        question: "How can I track sales leads in the CRM?",
        answer:
          "To track sales leads in the CRM, navigate to the CRM section from the left menu and select the Leads tab. Here, you can view all your leads in a centralized dashboard, organized by their status in the sales pipeline. Each lead entry provides details like contact information, lead source, and current stage. You can update the status of a lead as it progresses through the sales funnel, add notes or tasks for follow-ups, and scheou to focus on high-priority opportunities. This streamlined process ensures efficient tracking and management of sales leads.",
      },
      {
        id: "crm-7",
        question: "Can I create and send marketing campaigns through the CRM?",
        answer:
          "Yes, you can create and send marketing campaigns through the CRM. Users can choose to create custom templates or use system-generated templates for their campaigns. To get started, navigate to the CRM section in the left panel and click on Customer Campaigns. This will display a list of existing campaigns. To create a new one, click on the Add Campaign button in the top right corner. Fill in all the ",
      },
      {
        id: "crm-8",
        question: "Does it support email templates and personalization?",
        answer:
          "Yes, the CRM supports email templates and personalization. You can create custom email templates or use predefined system templates to streamline your marketing and communication efforts. These templates can be personalized by including dynamic fields such as the recipient’s name, company, or other customer-specific details, ensuring each email feels tailored and relevant. This functionality makes it easy to maintain consistency in branding while delivering a personalized experience to your audience. Additionally, templates can be saved for reuse, improving efficiency and enhancing the effectiveness of your email campaigns.",
      },
      {
        id: "crm-9",
        question: "How can I track campaign performance?",
        answer:
          "You can track campaign performance easily within the CRM. When creating a campaign, there are two options: Response Yes Button Text and Response No Button Text, where you can specify the labels for user reactions, such as Like and Dislike or any other relevant terms. Once the campaign is sent, recipients can interact with these buttons. To view the responses, go to the campaign list and click on List Responses for the specific campaign. This will display all the recipient responses, allowing you to gauge the campaign's success and gather valuable feedback for future improvements.",
      },
      {
        id: "crm-10",
        question: "Can I add custom fields or modules?",
        answer:
          "Yes, the CRM allows you to add custom fields or modules to tailor the system to your specific business needs. You can create and modify custom fields for existing modules, such as adding additional contact details, notes, or custom attributes related to leads, customers, or opportunities. Additionally, you can create entirely new modules to track unique data or processes specific to your business, such as custom project tracking or additional support metrics. These customizations enable the CRM to align more closely with your workflows and data management requirements, enhancing its functionality and usability.",
      },      
    ],
    sales: [
      {
        id: "equipment-1",
        question: "What is a sales module in an ERP system?",
        answer:
          "In the Sales module, Atomwalk helps manage processes such as sales orders, quotations, invoices, and customer interactions.",
      },
      {
        id: "equipment-2",
        question: "How can I create a sales order?",
        answer:
          "You can create a sales order by navigating to the Sales module, selecting the customer, and adding the products/services along with their quantities and prices. While creating sales order you can also give the details like Shipment address & is it a Part Delivery or not.",
      },
      {
        id: "equipment-3",
        question: "Can I automate the creation of quotations or proforma invoices?",
        answer:
          "Yes, you can generate quotations or proforma invoices directly from the system, which can later be converted into sales orders.",
      },
      {
        id: "equipment-4",
        question: "How does the module handle tax calculations (e.g., GST)?",
        answer:
          "Atomwalk supports automated tax calculations based on configured tax rates (e.g., GST) for items or services being sold. Additionally, it provides users with the option to set a specific tax category, if required.",
      },
      {
        id: "equipment-5",
        question: "Does it support tracking pending payments and sending reminders?",
        answer:
          "Yes, Atomwalk allows you to track unpaid invoices and send payment reminders through different platform.",
      },
      {
        id: "equipment-6",
        question: "Can I generate sales reports?",
        answer:
          "Atomwalk offers robust reporting tools to analyze sales performance and revenue trends. Users can view sales reports on a monthly or quarterly basis, along with customer-wise sales breakdowns, customer outstanding details, debtor aging charts, and Days Sales Outstanding (DSO) charts. Additionally, the system includes the option to print sales reports for easy sharing and documentation.",
      },
      {
        id: "equipment-7",
        question: "How are returns or refunds processed?",
        answer:
          "Returns or refunds are managed through credit notes in the system.",
      },
      {
        id: "equipment-8",
        question: "How do you support Bad Debt Expense?",
        answer:
          "Atomwalk allows users to process a 'Write-Off' against an invoice. If necessary, users can create a 'Write-Off' entry to close outstanding invoice bills. The pending payments are then transferred to the Bad Debt Expense Ledger for accurate financial tracking.",
      },
      {
        id: "equipment-9",
        question: "How do you support Bad Debt Expense?",
        answer:
          "Atomwalk allows users to process a 'Write-Off' against an invoice. If necessary, users can create a 'Write-Off' entry to close outstanding invoice bills. The pending payments are then transferred to the Bad Debt Expense Ledger for accurate financial tracking.",
      },
      {
        id: "equipment-10",
        question: "Does it support multiple currencies for international sales?",
        answer:
          "Yes, the system can handle transactions in multiple currencies.",
      },
      {
        id: "equipment-11",
        question: "What is a procurement module in an ERP system?",
        answer:
          "The procurement module streamlines the purchasing process, including purchase orders, vendor management, and goods receipt.",
      },
      {
        id: "equipment-12",
        question: "How do I create a purchase order (PO)?",
        answer:
          "To create a Purchase Order, go to the Sales & Purchase section and select the 'Purchase Order' option. Click on the 'Add Purchase Order' button, choose a vendor/supplier, add the items or services to be purchased, and then generate the Purchase Order (PO).",
      },
      {
        id: "equipment-13",
        question: "Can I track the status of purchase orders?",
        answer:
          "Yes, you can track POs from creation to delivery and payment within the system.",
      },
      {
        id: "equipment-14",
        question: "What is a GRN, and how is it recorded?",
        answer:
          "A Goods Receipt Note (GRN) confirms the receipt of goods. It is recorded in the system when the items are delivered and verified or at the time of Order-In, depending on the process flow.",
      },
      {
        id: "equipment-15",
        question: "How does the module handle vendor payments?",
        answer:
          "Atomwalk integrates with finance to manage vendor payments, including tracking due dates, making partial or full payments, and reconciling accounts.",
      },
      {
        id: "equipment-16",
        question: "Can I manage service-based procurement?",
        answer:
          "Yes, the module supports purchase service orders for services instead of physical goods.",
      },
      {
        id: "equipment-17",
        question: "Is it manage the Bin-Location on a Purchase?",
        answer:
          "Yes, the module helps to mange the Bin-Location. While doing Order-In it automatilacally mange the allocated bin Location.",
      },
    ],
    project: [
      {
        id: "project-1",
        question: "What is the Workorder Execution/Project Management module?",
        answer: "This module in Atomwalk Technology helps manage and execute projects or work orders by defining processes, assigning tasks, tracking progress, and ensuring timely delivery. It supports efficient collaboration and resource management.",
      },
      {
        id: "project-2",
        question: "What is a process template, and how is it used?",
        answer: "A process template is a predefined workflow that outlines steps, milestones, and responsibilities for recurring or standard projects. It simplifies project setup, ensures consistency, and reduces manual errors.",
      },
      {
        id: "project-3",
        question: "What are the key features of the module?",
        answer: "Customizable process templates for various projects, Task assignment and tracking, Milestone-based progress monitoring, Resource and cost allocation tools, Reports and dashboards for insights, Seamless integration with other Atomwalk ERP modules.",
      },
      {
        id: "project-4",
        question: "How do I create a new project or work order?",
        answer: "Navigate to the module, select 'Create New Project/Workorder', define the project scope, assign tasks, and set deadlines and milestones.",
      },
      {
        id: "project-5",
        question: "How do I configure a process template for a recurring project?",
        answer: "Go to Process Templates, click Create New, define steps, assign roles, and set default timelines. Save it for future use.",
      },
      {
        id: "project-6",
        question: "Can I customize the fields and workflow in the process template?",
        answer: "Yes, Atomwalk allows customization of fields, task priorities, workflows, and deadlines in the process template to match your organizational needs.",
      },
      {
        id: "project-7",
        question: "How do I assign team members or departments to a project or task?",
        answer: "Within the project/task setup, assign team members or departments using the Assignment tab. You can search and add members based on skills or department availability.",
      },
      {
        id: "project-8",
        question: "How do I track the progress of a work order/project?",
        answer: "Use the Project Dashboard to monitor task completion, milestone achievements, and overall progress in real time.",
      },
      {
        id: "project-9",
        question: "What reports can I generate for a project or work order?",
        answer: "Task status reports, Milestone tracking reports, Resource utilization reports, Budget vs. actual expenditure reports.",
      },
      {
        id: "project-10",
        question: "How can I update the status of tasks or milestones?",
        answer: "Navigate to the task or milestone, select Update Status, and choose from predefined options like 'In Progress,' 'Completed,' or 'Delayed.' Add comments if needed.",
      },
      {
        id: "project-11",
        question: "What happens if there’s a delay in completing a task?",
        answer: "The system flags the delay and sends notifications to relevant stakeholders. The timeline is recalculated, considering dependencies and adjusted deadlines.",
      },
      {
        id: "project-12",
        question: "Can I integrate the module with other tools or systems?",
        answer: "Yes, the module integrates seamlessly with Atomwalk’s other ERP modules like Sales, Procurement, and HRM, ensuring streamlined workflows. APIs are also available for third-party tool integration.",
      },
    ],
    inventory: [
      {
        id: "inventory-1",
        question: "What is an Inventory Management module?",
        answer: "The Inventory Management module by Atomwalk Technology helps businesses efficiently track, manage, and control their inventory across multiple locations, ensuring accurate stock levels and smooth operations.",
      },
      {
        id: "inventory-2",
        question: "What types of businesses can use this module?",
        answer: "Our module is versatile and suitable for businesses of all sizes, including retail, manufacturing, distribution, e-commerce, and service-based industries.",
      },
      {
        id: "inventory-3",
        question: "How does the module help in inventory tracking?",
        answer: "Atomwalk’s module provides real-time tracking of inventory movement, from procurement to sales, using tools like barcode scanning, stock logs, and automated updates.",
      },
      {
        id: "inventory-4",
        question: "Can it handle multiple warehouses or locations?",
        answer: "Yes, the module supports multi-warehouse management, allowing you to track and manage inventory across various locations seamlessly.",
      },
      {
        id: "inventory-5",
        question: "Can I track stock levels in real-time?",
        answer: "Absolutely! Real-time stock updates ensure that you always have accurate data on inventory availability.",
      },
      {
        id: "inventory-6",
        question: "Does the module handle stock reordering or generate low-stock alerts?",
        answer: "Yes, it includes automatic reorder suggestions and low-stock alerts based on predefined thresholds.",
      },
      {
        id: "inventory-7",
        question: "Is there support for batch and serial number tracking?",
        answer: "Yes, the module supports batch and serial number tracking for better traceability and quality control.",
      },
      {
        id: "inventory-8",
        question: "How does the system manage product categories and variants?",
        answer: "Products can be categorized into multiple levels, with support for variants such as size, color, and other attributes.",
      },
      {
        id: "inventory-9",
        question: "Can it track inventory valuation methods?",
        answer: "Yes, the module supports various inventory valuation methods batchwise to match your accounting preferences.",
      },
      {
        id: "inventory-10",
        question: "Are damaged, expired, or returned goods tracked separately?",
        answer: "Yes, the module categorizes and tracks damaged, expired, and returned goods for better accountability.",
      },
      {
        id: "inventory-11",
        question: "Can the module integrate with sales, procurement, and accounting modules?",
        answer: "Yes, seamless integration with Atomwalk’s Sales, Procurement, and Accounting modules ensures end-to-end inventory control.",
      },
      {
        id: "inventory-12",
        question: "Is there integration with e-commerce platforms or point-of-sale systems?",
        answer: "Yes, the module integrates with popular e-commerce platforms and POS systems to sync stock levels automatically.",
      },
      {
        id: "inventory-13",
        question: "Can the system sync with third-party shipping or logistics tools?",
        answer: "Yes, integrations with logistics platforms enable real-time shipment tracking and automated updates.",
      },
      {
        id: "inventory-14",
        question: "What types of inventory reports are available?",
        answer: "The module offers comprehensive reports such as stock aging, inventory turnover, valuation, and discrepancy analysis.",
      },
      {
        id: "inventory-15",
        question: "How are inventory discrepancies reported and resolved?",
        answer: "Discrepancies are flagged automatically, with tools for physical investigation and adjustment to maintain accuracy.",
      },
    ],
    
    
  };


  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };


  return (
    <PageBackground>
      <FAQContainer>
        <FAQHeader>
          <SparkleIcon size={24} style={{ top: 10, left: "30%" }} />
          <SparkleIcon size={18} style={{ top: 40, right: "28%" }} />
          <Title>Got Questions? We've Got Answers!</Title>
          <Subtitle>
            Find answers to common questions about our products, services, and
            how we can help you.
          </Subtitle>
        </FAQHeader>

        {/* Module-wise display */}
        {Object.entries(faqData).map(([moduleKey, moduleFaqs]) => (
          <div key={moduleKey} style={{ marginBottom: "2rem" }}>
            <ModuleHeader>{getModuleTitle(moduleKey)}</ModuleHeader>
            <FAQList>
              {moduleFaqs.map((item, index) => (
                <FAQItem key={item.id} delay={200 + index * 100}>
                  <QuestionButton
                    isOpen={openItems.includes(item.id)}
                    onClick={() => toggleItem(item.id)}
                  >
                    {item.question}
                    <IconWrapper isOpen={openItems.includes(item.id)}>
                      <ChevronDown size={18} />
                    </IconWrapper>
                  </QuestionButton>
                  <Answer isOpen={openItems.includes(item.id)}>
                    {Array.isArray(item.answer) ? (
                      <ul>
                        {item.answer.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </Answer>
                </FAQItem>
              ))}
            </FAQList>
          </div>
        ))}

      </FAQContainer>
    </PageBackground>
  );
}

// Helper function to convert keys into proper section titles
function getModuleTitle(moduleKey) {
  switch (moduleKey) {
    case "crm":
      return "CRM FAQs";
    case "sales":
      return "Sales & Procurement FAQs";
    case "hrm":
      return "HRM FAQs";
    case "inventory":
      return "Inventory Management FAQs";
    case "project":
      return "Project Management FAQs";
    default:
      return "FAQs";
  }
}

