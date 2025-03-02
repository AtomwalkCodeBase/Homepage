import React, { useState } from 'react';
import styled from 'styled-components';
import faqimg from '../../assets/img/faq.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: aliceblue;

  @media (min-width: 768px) {
    padding: 40px 20px;
  }
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #663399;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FAQList = styled.div`
  width: 100%;
  max-width: 700px;
`;

const Category = styled.div`
  margin-bottom: 15px;
  background-color: #f8f5ff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background-color: #7b1fa2;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(140, 64, 172);
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color:rgb(255, 255, 255);
  }
`;

const Questions = styled.div`
  background-color: #f8f5ff;
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const QuestionItem = styled.div`
  border-top: 1px solid #ddd;
`;

const QuestionHeader = styled.div`
  padding: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #eae3ff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd1ff;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #663399;
  }
`;

const Answer = styled.div`
  background-color: white;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '15px' : '0 15px')};
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;

  ul {
    padding-left: 20px;
    list-style-type: disc;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  width: 100%;
  max-width: 700px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const CTAHeading = styled.h2`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 20px;
`;

const CTAText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
`;

const CTAButton = styled.a`
  padding: 10px 20px;
  background-color: #663399;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #552288;
  }
`;

const CTAImage = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
`;

const NewFAQSection = ({ data }) => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(0); // Open the first category by default
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const demo = () => {
    window.location.href = '/demo.html';
  };
  const faqData = {
    HR: {
      General: [
        { question: 'What is an HRM system, and how does it help employees?', answer: 'Atomwalk HRM is an all-in-one Human Resource Management system designed to streamline HR processes. It helps employees manage attendance, leave, payroll, claims, appraisals, and more through a user-friendly interface. The mobile app enhances accessibility, allowing employees to complete HR tasks on the go.' },
        { question: 'How do I access the HRM portal or mobile app?', answer: 'You can access Atomwalk HRM via the web portal using your own login credentials. The mobile app can be downloaded from the Google Play Store. Log in with the same credentials as the web portal. Further you can add the Bio-metric and set your pin also.' },
        { question: 'What are the key features available in this HRM module?', answer: 'Atomwalk HRM includes attendance tracking, leave management, payroll processing, claims and reimbursements, performance management, recruitment, onboarding, and employee self-service.' },
        { question: 'Can I access the HRM system from outside the office?', answer: 'Yes, the HRM system and mobile app are accessible from anywhere with an internet connection, ensuring flexibility for employees working remotely or traveling.' },
        { question: 'What should I do if I forget my HRM login credentials?', answer: 'Click the “Forgot Password” option on the login page and follow the instructions to reset your password but you should have access to the registered mail-Id. For further assistance, contact your HR department.' },
        { question: 'Who do I contact for technical support or system issues?', answer: `For any technical issues, reach out to the Atomwalk HRM support team via the ‘Help & Support’ section in the system or contact your HR representative. Or you can contact to ‘support@atomwalk.com’ mail id.` },
        { question: 'Is my system capable of tracking allocated assets during the employee exit process?', answer: `Yes, if any company asset has been allocated to an employee, the system will automatically notify the manager about the allocated assets during the employee exit approval process. The exit approval can only be completed once all allocated assets are returned.` },
      ],
      'Attendance and Leave Management': [
        { question: 'How do I mark my attendance through the HRM system?', answer: `Use the "My Attendance" feature in the Atomwalk HRM web portal to mark your attendance. For added convenience, Atomwalk also provides a mobile app. Through the mobile app, users can check in and check out by accessing the "My Attendance" section. In some setups, biometric integration or geolocation may also be used for marking attendance.` },
        { question: 'Can I edit or correct attendance entries?', answer: 'Attendance entries cannot be edited directly. If there are discrepancies, submit an "Attendance Correction Request" via email to your manager for approval. Once approved, the manager can update the attendance through the "Attendance Records" section in their portal.' },
        { question: 'How do I apply for leave?', answer: `In the mobile app, navigate to the "My Leaves" section, select "Apply Leave," fill out the form, and submit it. Users have the option to apply for different types of leave, such as Earned Leave, Work from Home, or Loss of Pay. After submitting the application, users can view their leave details, including the status, on the "My Leaves" screen. Similarly, in the web app, users can navigate to the "My Leave Details" section to apply for leave using the same process as the mobile app.` },
        { question: 'What is the leave approval process?', answer: 'After submitting your leave request, it is sent to your reporting manager for review and approval. The manager can either "Approve" or "Reject" the leave application by navigating to the "Approve Leave" section in the mobile app. In the web app, the manager needs to access the "Approve Leave" section under the "Manager (HRMS)" menu.' },
        { question: 'How can I check my leave balance?', answer: `Your leave balance is displayed in the "My Leave Details" section of the web app, providing a detailed breakdown of leave types, including the maximum allowed, leave applied, approved leave, and pending approval. In the mobile app, you can view only the maximum allowed leave for each leave type.` },
        { question: 'Can I reject a leave request?', answer: 'Yes, manager can reject the leave request providing the rejection remark.' },
      ],
      'Payroll and Claims': [
        { question: `How are payroll TDS calculation?`, answer: `Yes, Atomwalk HRM supports TDS calculations. The system automatically calculates TDS based on both the old and new tax regimes.` },
        { question: `Do you support PF?`, answer: `Yes, Atomwalk HRM supports Provident Fund (PF) management, including PF calculations.` },
        { question: `Do you support Ledger Entries?`, answer: `Yes, Atomwalk HRM supports Ledger Entries, ensuring accurate financial record-keeping and seamless integration with payroll and accounting processes.` },
        { question: `Do you support Employee Advance?`, answer: `Yes, Atomwalk HRM supports Employee Advance. During claim settlement, the system automatically adjusts the claims against the advance amount, ensuring accurate reconciliation.` },
      ],
      'Employee Self-Service': [
        { question: `Do you have provision to update the personal information, such as address or contact details?`, answer: `Yes, we support to update the personal information, such as address or contact details. For updating any other information, you must send a request via email to your HR manager. Only the HR manager has the authority to update these details in the system.` },
        { question: `Where can I view my performance reviews or appraisal details?`, answer: `For performance reviews, employees can visit the "My Weekly Score" section, where they can view their "Performance Score." Appraisal details are available under the "My Appraisal" section.` },
        { question: `Can I view my team’s details if I am a manager?`, answer: `Yes, managers have access to team details under the "Manager (HRMS)" sections, depending on system configuration.` },
        
      ],
      'Performance Management': [
        { question: `How do I view my goals or Key Responsibility Area (KRA)?`, answer: `Goals and KRA are accessible in the "My Attendance" section at the weekly attendance submission.` },
        { question: `Can I provide feedback or update of my goals in the HRM system?`, answer: `Yes, you can provide feedback and suggest updates to your goals. After submitting the form, it will be forwarded to the "Manager Dashboard" for review.` },
        { question: `How do I participate in the appraisal process?`, answer: `Once the HR manager sets up the "Appraisal Structure", employees can "Initiate the Appraisal". Proceed with the required steps, which include completing self-assessment forms and providing inputs & documents on important performance parameter.` },
        { question: `Where can I view my performance history?`, answer: `There are two types of "Performance History": Weekly Performance and Appraisal History. The Weekly Performance score can be accessed through the "My Weekly Score" dashboard, while the Appraisal History can be accessed through the "My Appraisal" dashboard.` },
        { question: `Do you have review process in the appraisal?`, answer: `Yes, it is supported. Appraisal required review can be accessed from the reviewer dashboard. The final score with normalization can be given by the reviewer.` },
      ],
      'Recruitment and Onboarding': [
        { question: `Do you support maintaining the data of selected candidate & creation of job offer/ appointment letter?`, answer: `Yes, we support maintaining the data of selected candidate & creation of job offer/ appointment letter. Company can customise the offer letter as per the requirements including the details of salary structure.` },
      ],  
    },
    CRM: {
      'General Overview': [
        { question: "What is CRM, and how does it help my business?", answer: "Customer Relationship Management (CRM) solution manages Lead, Customer and Channel Partner data efficiently on a real time basis and can be accessed by all the stakeholders. Hence eliminating the risk of duplication of data . Operations like lead and customer tasks and Campaign Management can be tracked/completed efficiently. By consolidating these functions, CRM enhances customer satisfaction, boosts sales effectiveness, and improves overall business efficiency, leading to better customer retention and increased profitability." },
        { question: "Who can benefit from using the CRM module?", answer: "The CRM module benefits a wide range of users across various roles within an organization, including sales teams, customer service representatives, marketing departments, channel partners, and managers. Sales teams can use it to manage leads, track opportunities, and enhance customer interactions. Customer service representatives benefit from improved case management and better tracking of customer issues. Marketing departments can leverage CRM for targeted campaigns, lead nurturing, and performance tracking. Channel partners gain from streamlined lead distribution and incentive management. Managers benefit from comprehensive insights into sales performance, customer satisfaction, and team productivity, enabling them to make informed decisions and drive business growth." },
      ],
      'Customer Management': [
        { question: "How can I add or update customer details?", answer: "To add or update customer details, navigate to the CRM section in the left menu and select the ‘Customer List’ tab. A comprehensive list of customers will be displayed. To update an existing customer’s information, click on the desired customer’s name to view their details. You will then find an “Update” button; click this to access and modify any of the fields as needed. After making the required changes, simply click “Save” to update the customer details. To add a new customer, click the “Add Customer” button located in the top-right corner of the screen. Fill out the necessary details in the provided fields and click “Save” to record the new customer. The newly added customer will now appear in the Customer Details screen." },
        { question: "Can I import/export customer data?", answer: "Yes, you can import and export customer data. On the Customer Details page, there is an option available in the top right corner. To import data, simply click on the “Upload” option, and then provide the necessary details in the format required. After submitting the information, the system will fetch and upload the customer data into the CRM. To export data, a similar process can be followed from the same menu, allowing you to download customer details in a compatible format for backup or external use. This feature ensures seamless management of customer information across your business systems." },
        { question: "Does the CRM support customer segmentation?", answer: "Yes, our CRM supports customer segmentation through fields like Customer Group, and Customer Group (Secondary). While adding a new customer, you can assign values to these fields to categorize customers based on your segmentation criteria. This enables you to organize customers effectively, tailor your marketing strategies, and provide personalized services based on their group or type." },
        { question: "How can I track sales leads in the CRM?", answer: "To track sales leads in the CRM, navigate to the CRM section from the left menu and select the Leads tab. Here, you can view all your leads in a centralized dashboard, organized by their status in the sales pipeline. Each lead entry provides details like contact information, lead source, and current stage. You can update the status of a lead as it progresses through the sales funnel, add notes or tasks for follow-ups, and scheou to focus on high-priority opportunities. This streamlined process ensures efficient tracking and management of sales leads." },
    ],
    'Sales and Leads': [
      { question: "Can I create and send marketing campaigns through the CRM?", answer: "Yes, you can create and send marketing campaigns through the CRM. Users can choose to create custom templates or use system-generated templates for their campaigns. To get started, navigate to the CRM section in the left panel and click on Customer Campaigns. This will display a list of existing campaigns. To create a new one, click on the Add Campaign button in the top right corner. Fill in all the " },
      { question: "Does it support email templates and personalization?", answer: "Yes, the CRM supports email templates and personalization. You can create custom email templates or use predefined system templates to streamline your marketing and communication efforts. These templates can be personalized by including dynamic fields such as the recipient’s name, company, or other customer-specific details, ensuring each email feels tailored and relevant. This functionality makes it easy to maintain consistency in branding while delivering a personalized experience to your audience. Additionally, templates can be saved for reuse, improving efficiency and enhancing the effectiveness of your email campaigns." },
      { question: "How can I track campaign performance?", answer: "You can track campaign performance easily within the CRM. When creating a campaign, there are two options: Response Yes Button Text and Response No Button Text, where you can specify the labels for user reactions, such as Like and Dislike or any other relevant terms. Once the campaign is sent, recipients can interact with these buttons. To view the responses, go to the campaign list and click on List Responses for the specific campaign. This will display all the recipient responses, allowing you to gauge the campaign's success and gather valuable feedback for future improvements."},
       ],
  //      'Automation and Workflow': [
  //   { question: "Can I automate customer lifecycle management? ", answer: "Yes, the CRM allows you to automate customer lifecycle management. It enables you to set up automated workflows that manage the entire customer journey from initial lead capture, through the sales process, to customer onboarding, and ongoing relationship management. You can automate follow-up actions, send personalized communications, track customer interactions, and manage renewals or upgrades based on predefined criteria. This automation ensures a consistent and efficient approach to managing customer relationships, enhances customer satisfaction, and drives retention and growth throughout the customer lifecycle."},
  // ],
  'Customization and Scalability': [
    { question: "Can I add custom fields or modules?", answer: "Yes, the CRM allows you to add custom fields or modules to tailor the system to your specific business needs. You can create and modify custom fields for existing modules, such as adding additional contact details, notes, or custom attributes related to leads, customers, or opportunities. Additionally, you can create entirely new modules to track unique data or processes specific to your business, such as custom project tracking or additional support metrics. These customizations enable the CRM to align more closely with your workflows and data management requirements, enhancing its functionality and usability."},
  ],
  },
    sales: {
      'Sales Process': [
        { question: 'What is a sales module in an ERP system?', answer: 'In the Sales module, Atomwalk helps manage processes such as sales orders, quotations, invoices, and customer interactions.' },
        { question: 'How can I create a sales order?', answer: 'You can create a sales order by navigating to the Sales module, selecting the customer, and adding the products/services along with their quantities and prices. While creating sales order you can also give the details like Shipment address & is it a Part Delivery or not.' },
        { question: 'Can I automate the creation of quotations or proforma invoices?', answer: 'Yes, you can generate quotations or proforma invoices directly from the system, which can later be converted into sales orders.' },
        { question: 'How does the module handle tax calculations (e.g., GST)? ', answer: 'Atomwalk supports automated tax calculations based on configured tax rates (e.g., GST) for items or services being sold. Additionally, it provides users with the option to set a specific tax category, if required.' },
        { question: 'Does it support tracking pending payments and sending reminders? ', answer: 'Yes, Atomwalk allows you to track unpaid invoices and send payment reminders through different platform.' },
        { question: 'Can I generate sales reports?', answer: `Atomwalk offers robust reporting tools to analyze sales performance and revenue trends. Users can view sales reports on a monthly or quarterly basis, along with customer-wise sales breakdowns, customer outstanding details, debtor aging charts, and Days Sales Outstanding (DSO) charts. Additionally, the system includes the option to print sales reports for easy sharing and documentation.` },
        { question: 'How are returns or refunds processed? ', answer: 'Returns or refunds are managed through credit notes in the system.' },
        { question: 'How do you support Bad Debt Expense?', answer: `Atomwalk allows users to process a 'Write-Off' against an invoice. If necessary, users can create a 'Write-Off' entry to close outstanding invoice bills. The pending payments are then transferred to the Bad Debt Expense Ledger for accurate financial tracking.` },
        { question: 'How do you support Bad Debt Expense?', answer: `Atomwalk allows users to process a 'Write-Off' against an invoice. If necessary, users can create a 'Write-Off' entry to close outstanding invoice bills. The pending payments are then transferred to the Bad Debt Expense Ledger for accurate financial tracking.` },
        { question: 'Does it support multiple currencies for international sales?', answer: 'Yes, the system can handle transactions in multiple currencies.' },
      ],
      'Procurement Process': [
        { question: 'What is a procurement module in an ERP system? ', answer: `The procurement module streamlines the purchasing process, including purchase orders, vendor management, and goods receipt.` },
        { question: 'How do I create a purchase order (PO)? ', answer: `To create a Purchase Order, go to the Sales & Purchase section and select the 'Purchase Order' option. Click on the 'Add Purchase Order' button, choose a vendor/supplier, add the items or services to be purchased, and then generate the Purchase Order (PO).` },
        { question: 'Can I track the status of purchase orders?', answer: `Yes, you can track POs from creation to delivery and payment within the system.` },
        { question: 'What is a GRN, and how is it recorded? ', answer: 'A Goods Receipt Note (GRN) confirms the receipt of goods. It is recorded in the system when the items are delivered and verified or at the time of Order-In, depending on the process flow.' },
        { question: 'How does the module handle vendor payments? ', answer: `Atomwalk integrates with finance to manage vendor payments, including tracking due dates, making partial or full payments, and reconciling accounts.` },
        { question: 'Can I manage service-based procurement?', answer: 'Yes, the module supports purchase service orders for services instead of physical goods.' },
        { question: 'Is it manage the Bin-Location on a Purchase?', answer: 'Yes, the module helps to mange the Bin-Location. While doing Order-In it automatilacally mange the allocated bin Location.' },
        { question: 'Can I manage the return or damage quantity?', answer: 'Yes, you can effectively manage the return and damage quantity.' },
        
      ],
      'Compliance Process': [
        { question: 'What is a compliance module in an ERP system?', answer: `The compliance module ensures the organization adheres the rules, regulations, and standards.` },
        { question: 'How does the system handle GST filing?', answer: `Atomwalk automatically calculates GST for transactions, and helps users stay updated with compliance requirements.` },
        { question: 'Can it manage TDS calculation? ', answer: `Yes, the module supports TDS calculation and provides reports.` },        
        { question: 'For a service are you able to calculate the TDS?', answer: 'Yes, Atomwalk help you calculate the TDS in a service also.' },
        { question: 'What types of regulatory reports can I generate?', answer: 'The system can generate reports for GST, TDS, audit trails, and other compliance-related requirements.' },
        { question: 'Can the module be configured for industry-specific compliance needs? ', answer: `Yes, the module is customizable to meet the compliance needs of specific industries, like healthcare, manufacturing, retail, service or any industry-specific.` },
        { question: 'How does it ensure data security for compliance records?', answer: 'The system implements role-based access, encryption, and audit trails to secure sensitive compliance data.' },
        
      ],
      
    },
    Project: {
      'General Overview': [
        { question: "What is the Workorder Execution/Project Management module?", answer: "This module in Atomwalk Technology helps manage and execute projects or work orders by defining processes, assigning tasks, tracking progress, and ensuring timely delivery. It supports efficient collaboration and resource management." },
        { question: "What is a process template, and how is it used?", answer: "A process template is a predefined workflow that outlines steps, milestones, and responsibilities for recurring or standard projects. It simplifies project setup, ensures consistency, and reduces manual errors." },
        { question: "What are the key features of the module?", answer: "Customizable process templates for various projects, Task assignment and tracking,	Milestone-based progress monitoring,	Resource and cost allocation tools, Reports and dashboards for insights, Seamless integration with other Atomwalk ERP modules." },
      ],
      'Setup and Configuration': [
        { question: "How do I create a new project or work order?", answer: "Navigate to the module, select “Create New Project/Workorder”, define the project scope, assign tasks, and set deadlines and milestones." },
        { question: "How do I configure a process template for a recurring project?", answer: "Go to Process Templates, click Create New, define steps, assign roles, and set default timelines. Save it for future use." },
        { question: "Can I customize the fields and workflow in the process template?", answer: "Yes, Atomwalk allows customization of fields, task priorities, workflows, and deadlines in the process template to match your organizational needs." },
        { question: "How do I assign team members or departments to a project or task?", answer: "Within the project/task setup, assign team members or departments using the Assignment tab. You can search and add members based on skills or department availability." },
    ],
    'Execution and Monitoring': [
      { question: "How do I track the progress of a work order/project?", answer: "Use the Project Dashboard to monitor task completion, milestone achievements, and overall progress in real time. " },
      { question: "What reports can I generate for a project or work order?", answer: "Task status reports, Milestone tracking reports, Resource utilization reports, Budget vs. actual expenditure reports" },
      { question: "How can I update the status of tasks or milestones?", answer: "Navigate to the task or milestone, select Update Status, and choose from predefined options like “In Progress,” “Completed,” or “Delayed.” Add comments if needed."},
      { question: "What happens if there’s a delay in completing a task?", answer: "The system flags the delay and sends notifications to relevant stakeholders. The timeline is recalculated, considering dependencies and adjusted deadlines." },
      { question: "Can I integrate the module with other tools or systems?", answer: "Yes, the module integrates seamlessly with Atomwalk’s other ERP modules like Sales, Procurement, and HRM, ensuring streamlined workflows. APIs are also available for third-party tool integration."},
       ],
       
  },
  Inventory: {
    'General Overview': [
      { question: "What is an Inventory Management module?", answer: "The Inventory Management module by Atomwalk Technology helps businesses efficiently track, manage, and control their inventory across multiple locations, ensuring accurate stock levels and smooth operations." },
      { question: "What types of businesses can use this module?", answer: "Our module is versatile and suitable for businesses of all sizes, including retail, manufacturing, distribution, e-commerce, and service-based industries." },
      { question: "How does the module help in inventory tracking?", answer: "Atomwalk’s module provides real-time tracking of inventory movement, from procurement to sales, using tools like barcode scanning, stock logs, and automated updates." },
      { question: "Can it handle multiple warehouses or locations?", answer: "Yes, the module supports multi-warehouse management, allowing you to track and manage inventory across various locations seamlessly." },
    ],
    'Features & Functionalities': [
      // { question: "5.	Does it support barcode scanning integration?", answer: "Yes, the module integrates with barcode scanners for faster and more accurate inventory updates." },
      { question: "Can I track stock levels in real-time?", answer: "Absolutely! Real-time stock updates ensure that you always have accurate data on inventory availability." },
      { question: "Does the module handle stock reordering or generate low-stock alerts?", answer: "Yes, it includes automatic reorder suggestions and low-stock alerts based on predefined thresholds." },
      { question: "Is there support for batch and serial number tracking?", answer: "Yes, the module supports batch and serial number tracking for better traceability and quality control." },
      { question: "How does the system manage product categories and variants?", answer: "Products can be categorized into multiple levels, with support for variants such as size, color, and other attributes." },
      { question: "Can it track inventory valuation methods?", answer: "Yes, the module supports various inventory valuation methods batchwise to match your accounting preferences." },
      { question: "Are damaged, expired, or returned goods tracked separately?", answer: "Yes, the module categorizes and tracks damaged, expired, and returned goods for better accountability." },
  ],
  'Integrations': [
    { question: "Can the module integrate with sales, procurement, and accounting modules?", answer: "Yes, seamless integration with Atomwalk’s Sales, Procurement, and Accounting modules ensures end-to-end inventory control." },
    { question: "Is there integration with e-commerce platforms or point-of-sale systems?", answer: "Yes, the module integrates with popular e-commerce platforms and POS systems to sync stock levels automatically." },
    { question: "Can the system sync with third-party shipping or logistics tools?", answer: "Yes, integrations with logistics platforms enable real-time shipment tracking and automated updates."},
     ],
     
    'Reports & Analytics': [
      { question: "What types of inventory reports are available?", answer: "The module offers comprehensive reports such as stock aging, inventory turnover, valuation, and discrepancy analysis." },
      { question: "How are inventory discrepancies reported and resolved?", answer: "Discrepancies are flagged automatically, with tools for physical investigation and adjustment to maintain accuracy." },
    ],
     
},
  };

  const faqCategories = faqData[data] || {};

  const toggleCategory = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    setOpenQuestionIndex(null); // Reset open question when switching category
  };

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <Container>
      <Heading>All the A's to your Q's</Heading>

      <FAQList>
        {Object.keys(faqCategories).map((category, categoryIndex) => (
          <Category key={categoryIndex}>
            <CategoryHeader onClick={() => toggleCategory(categoryIndex)}>
              {category}
              <span>{openCategoryIndex === categoryIndex ? '-' : '+'}</span>
            </CategoryHeader>
            <Questions isOpen={openCategoryIndex === categoryIndex}>
              {faqCategories[category].map((item, questionIndex) => (
                <QuestionItem key={questionIndex}>
                  <QuestionHeader onClick={() => toggleQuestion(questionIndex)}>
                    {item.question}
                    <span>{openQuestionIndex === questionIndex ? '-' : '+'}</span>
                  </QuestionHeader>
                  <Answer isOpen={openQuestionIndex === questionIndex}>
                    <p>{item.answer}</p>
                  </Answer>
                </QuestionItem>
              ))}
            </Questions>
          </Category>
        ))}
      </FAQList>

      <CTASection>
        <CTAImage src={faqimg} alt="FAQ" />
        <CTAHeading>Still have questions?</CTAHeading>
        <CTAText>
          Book a call with our team to learn how to integrate Atomwalk <span>{data}</span> with your business.
        </CTAText>
        <CTAButton onClick={demo}>Book a demo</CTAButton>
      </CTASection>
    </Container>
  );
};

export default NewFAQSection;
