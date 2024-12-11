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
  color: #333;
  background-color: #CCBDF9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9D7EFD;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #663399;
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
      'General': [
    { question: "What is Atomwalk CRM?", answer: "Atomwalk CRM is a customer relationship management platform designed to help businesses manage their interactions with customers, leads, suppliers, and partners. It offers a comprehensive set of tools for task management, lead tracking, customer support, and sales process automation, allowing businesses to improve communication, streamline operations, and increase productivity." },
    { question: "How can I use Atomwalk CRM?", answer: "You can use Atomwalk CRM by signing up for an account and accessing its features either through a web app or mobile application. Once logged in, you can create customer profiles, manage leads, assign tasks, and track the progress of deals. Atomwalk CRM provides intuitive dashboards and reporting tools that help users oversee customer interactions, sales pipelines, and team activities efficiently." },
    { question: "How does CRM work?", answer: "A CRM works by consolidating customer and lead data into a centralized system. It records and tracks all interactions—emails, calls, meetings—making it easier for teams to access important information at any time. With Atomwalk CRM, you can manage leads through each stage of the sales pipeline, assign tasks to team members, automate follow-ups, and generate reports. By organizing all your customer-related data in one place, CRM systems help businesses improve customer service, boost sales, and drive growth." },
    { question: "How to add a Lead?", answer: "To add a lead in Atomwalk CRM, go to the Lead List section, where you can click on Add Lead. Fill in the required details such as name, contact information, and relevant notes about the lead's interest or status. You can also upload bulk leads if you have a file prepared. Once added, you can assign tasks to follow up on the lead and track its progress in the sales pipeline." },
    { question: "How do I track  a lead?", answer: "In Atomwalk CRM, leads can be tracked through the sales pipeline. You can view all leads in the Lead List and monitor their status, such as active or inactive, and see which tasks or follow-ups are assigned to them. The system also provides a visual representation of where each lead is in the sales cycle, and you can set reminders for future actions or update the lead's status based on recent interactions. This ensures that no lead is neglected and helps optimize conversion rates." },
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
