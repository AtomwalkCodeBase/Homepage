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

const FAQItem = styled.div`
  background-color: #f8f5ff;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Question = styled.div`
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

  @media (min-width: 768px) {
    font-size: 1.3rem;
    padding: 20px;
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

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

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

const FAQSection = ({data,res}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const demo =()=>{
    window.location.href='/demo.html'
  }

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const claimFaqData =data=="crm"? [
    { question: "What is Atomwalk CRM?", answer: "Atomwalk CRM is a customer relationship management platform designed to help businesses manage their interactions with customers, leads, suppliers, and partners. It offers a comprehensive set of tools for task management, lead tracking, customer support, and sales process automation, allowing businesses to improve communication, streamline operations, and increase productivity." },
    { question: "How can I use Atomwalk CRM?", answer: "You can use Atomwalk CRM by signing up for an account and accessing its features either through a web app or mobile application. Once logged in, you can create customer profiles, manage leads, assign tasks, and track the progress of deals. Atomwalk CRM provides intuitive dashboards and reporting tools that help users oversee customer interactions, sales pipelines, and team activities efficiently." },
    { question: "How does CRM work?", answer: "A CRM works by consolidating customer and lead data into a centralized system. It records and tracks all interactions—emails, calls, meetings—making it easier for teams to access important information at any time. With Atomwalk CRM, you can manage leads through each stage of the sales pipeline, assign tasks to team members, automate follow-ups, and generate reports. By organizing all your customer-related data in one place, CRM systems help businesses improve customer service, boost sales, and drive growth." },
    { question: "How to add a Lead?", answer: "To add a lead in Atomwalk CRM, go to the Lead List section, where you can click on Add Lead. Fill in the required details such as name, contact information, and relevant notes about the lead's interest or status. You can also upload bulk leads if you have a file prepared. Once added, you can assign tasks to follow up on the lead and track its progress in the sales pipeline." },
    { question: "How do I track  a lead?", answer: "In Atomwalk CRM, leads can be tracked through the sales pipeline. You can view all leads in the Lead List and monitor their status, such as active or inactive, and see which tasks or follow-ups are assigned to them. The system also provides a visual representation of where each lead is in the sales cycle, and you can set reminders for future actions or update the lead's status based on recent interactions. This ensures that no lead is neglected and helps optimize conversion rates." },
  ]:data=="equipment"?[
    { 
      "question": "How to create a user ID?", 
      "answer": "Only admin has the access to create user ID using user’s email."
    },
    { 
      "question": "Can a user change his username and email?", 
      "answer": "No. User can’t modify the username and email once it’s created. User has to contact the admin for any modification."
    },
    { 
      "question": "What if I forget my username?", 
      "answer": "Our system lets you create a nickname to log in. So, if Ram forgets his default username, he can still access the system using his personalized nickname."
    },
    { 
      "question": "Is it possible to restrict certain users from accessing specific equipment?", 
      "answer": "Yes, Admins can restrict specific users or user groups from accessing certain equipment. For example, if Ram is not trained to use the high-powered laser machine, the admin can restrict him from booking it."
    },
    { 
      "question": "Can I view available booking slots for the current and upcoming week?", 
      "answer": "Absolutely! Users can view available booking slots for both the current and the upcoming week. For instance, if Ram wants to plan ahead, he can check the available slots for the next week and book equipment accordingly."
    },
    { 
      "question": "Can I cancel or reschedule a booking?", 
      "answer": "Yes! You can cancel or reschedule your booking at any time. For instance, if Jenny booked equipment for Thursday but needs it for Friday instead, she can cancel the original booking and create a new one."
    },
    { 
      "question": "Can the system block timeslots for scheduled maintenance?", 
      "answer": "Yes! The system automatically blocks time slots for scheduled maintenance. For example, if the centrifuge is scheduled for maintenance at 2 PM, it will block 1 PM to 4 PM, preventing any bookings during that period to ensure uninterrupted maintenance."
    },
    { 
      "question": "Can I set up different user groups for each department?", 
      "answer": "Yes, you can set up different user groups for each department in your lab equipment management system. For example, if the Biology Department requires access to specific equipment, you can create a user group specifically for them. This ensures that members of the Biology Department can manage and book equipment relevant to their research while restricting access to other departments."
    },
    { 
      "question": "How many times can I book equipment in a week?", 
      "answer": "Each user can book equipment as per the policy set up in your setup. For example, if Ram books for HPLC on Monday, Tuesday, and Friday then he won't be able to book again until the next week. Because for HPLC the max slot per week is 3."
    },
    { 
      "question": "Can I share my booked slot with another user?", 
      "answer": "No, each booking is tied to the specific user who made it. For example, if Ram booked the HPLC machine, only he has access to it during his time slot. However, Managers or Admins can make changes to the schedule if necessary."
    },
    { 
      "question": "Can I book equipment outside of working hours?", 
      "answer": "Yes! Our system allows 24/7 booking. For instance, if Ram prefers working late, he can book equipment at 11 PM on Tuesday, as long as it’s available."
    },
    { 
      "question": "Can I see past bookings?", 
      "answer": "Yes, users can view their booking history in the system. For example, if Ram wants to check when he last used the PCR machine, he can log in and view his past bookings."
    },
    { 
      "question": "Can I generate reports for the required field?", 
      "answer": "Yes, you can generate custom reports based on specific fields like equipment usage, booking frequency, and maintenance schedules. For example, if Ram wants to analyze the usage of the PCR machine over the past month and he has access as a manager, then he can generate a report for that specific data."
    },
    { 
      "question": "Can I delete the unnecessary data from the software?", 
      "answer": "Yes, Admins can purge unnecessary or outdated data to keep the system running smoothly. For instance, if a large volume of old booking logs is slowing the system down, the admin can remove those logs without affecting current operations."
    }
  ]
  : [
    { 
      "question": "What is Atomwalk HRM?", 
      "answer": "Atomwalk HRM is an all-in-one Human Resource Management solution designed to streamline HR processes such as employee attendance tracking, leave management, claims submission, payroll, and more. With its mobile app, Atomwalk HRM On-The-Go, employees and managers can manage HR tasks like real-time attendance, leave requests, approvals, and claims from anywhere, enhancing accessibility and efficiency. This system simplifies workflows from onboarding to exit, making it ideal for businesses looking to automate and optimize their HR operations while improving overall employee experience."
    },
    { 
      "question": "How can I use Atomwalk HRM?", 
      "answer": "You can use Atomwalk HRM by accessing it through its web-based platform or the Atomwalk HRM On-The-Go mobile app. Once logged in, employees can manage their attendance, apply for leave, submit claims, and access payroll information. Managers can approve or reject leave and claims, view reports, and monitor employee attendance in real-time. The system is designed to be user-friendly, with a dashboard that provides easy navigation to the HR functionalities relevant to your role."
    },
    { 
      "question": "How does HRM work?", 
      "answer": "Atomwalk HRM works by automating core HR processes like attendance tracking, leave management, claims submission, and payroll handling. The system integrates employee data and allows for real-time updates on various HR activities. It helps managers approve requests, generate reports, and track employee productivity, while employees can manage their own data through the self-service portal. The solution is designed to reduce paperwork and manual effort, improving efficiency and accuracy across HR operations."
    },
    { 
      "question": "Why should I choose Atomwalk HRM?", 
      "answer": [
        "Zero Paperwork, managing the details anytime/anywhere digitally.",
        "Documents are stored in the document management system (S3 bucket), accessible anytime by authorized personnel for future audit needs.",
        "Expenses can be linked to respective projects (if using Project Management modules), aiding in project margin tracking and efficient cost control.",
        "Automatic integration with accounting systems.",
        "Email and WhatsApp integration.",
        "Mobile app available for ESS (Employee Self-Service) for instant use.",
        "Referral System.",
        "Unlimited expense heads can be added as per the need."
      ]
    },
    { 
      "question": "How to add a claim?", 
      "answer": "To add a claim in Atomwalk HRM, go to the 'Claims' section from the dashboard. Click on 'Submit New Claim,' then fill in the details such as claim type, amount, and description. You can also attach relevant receipts or documents. Once done, submit the claim for approval, and you’ll be notified of its status in real-time. The system supports various claim categories, ensuring easy tracking and management of expenses."
    },
    { 
      "question": "How do I apply for a leave?", 
      "answer": "To apply for leave in Atomwalk HRM, log in to your account and navigate to the 'Leave' section. Select 'Apply Leave,' choose the type of leave (e.g., vacation, sick leave, WFH), specify the dates, and provide any necessary details or attachments. Submit the request, and you will be able to track its status as it moves through the approval process."
    },
    { 
      "question": "How can a manager approve a leave?", 
      "answer": "A manager can approve a leave in Atomwalk HRM by logging in and navigating to the 'Leave Approvals' section. There, they can review pending leave requests, check the employee's leave balance and history, and either approve or reject the request with a single click. The system provides options to add comments, and employees are notified instantly about the approval status."
    },
    { 
      "question": "Why and how does Atomwalk handle the company exit process?", 
      "answer": "Atomwalk’s Exit Process module is designed to ensure a structured, seamless, and compliant offboarding experience for employees. It handles every aspect of the process, from resignation or termination to final settlement, asset handover, and exit interviews. With automated tracking and task management, it guarantees a smooth transition, protects company data and assets, and ensures legal compliance, leaving both the organization and the departing employee with a positive experience."
    }
  ];

  return (
    <Container>
      <Heading>All the A's to your Q's</Heading>
      <FAQList>
        {claimFaqData.map((item, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggleFAQ(index)}>
              {item.question}
              <span>{openIndex === index ? '-' : '+'}</span>
            </Question>
            <Answer isOpen={openIndex === index}>
              {Array.isArray(item.answer) ? (
                <ul>
                  {item.answer.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.answer}</p>
              )}
            </Answer>
          </FAQItem>
        ))}
      </FAQList>

      <CTASection>
        <CTAImage src={faqimg} alt="FAQ" />
        <CTAHeading>Still have questions?</CTAHeading>
        <CTAText>
          Book a call with our team to learn how to integrate ATOMWALK <span>{data=="crm"?"CRM":data=="equipment"?"LEMS":"HRM"}</span> with your business.
        </CTAText>
        <CTAButton onClick={demo}>Book a demo</CTAButton>
      </CTASection>
    </Container>
  );
};

export default FAQSection;
