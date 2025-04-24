import React from 'react';
import styled from 'styled-components';

// Icons
import Icon1 from '../assets/img/clock.png'; // You can replace this with your icons
import Primium from '../assets/img/premium.gif';
import optimizing from '../assets/img/optimization.png';
import Access from '../assets/img/access.png';
import exprieance from '../assets/img/best-customer-experience.png';
import Accessbule from '../assets/img/accessible.png';
import easy from '../assets/img/easy-to-use.png';
import Icon2 from '../assets/img/administer.png';
import Icon3 from '../assets/img/reconciliation.png';
import Icon4 from '../assets/img/reduce-time.png';
import Icon5 from '../assets/img/better_experience.png';
import Icon6 from '../assets/img/transparency.png';
import Icon7 from '../assets/img/brand_reputaion.png';
import Icon8 from '../assets/img/money_saving.png';
import Icon9 from '../assets/img/customize.png';
import Icon10 from '../assets/img/encrypted.png';
import Icon11 from '../assets/img/quality.png';
import Icon12 from '../assets/img/scalability1.png';
import Icon13 from '../assets/img/waste-tracking.png';
import Icon14 from '../assets/img/bin.png';
import Icon15 from '../assets/img/smart-trash.png';
import Icon16 from '../assets/img/dashboard.png';
import Icon17 from '../assets/img/safety.png';
import Icon18 from '../assets/img/fm_step_1.png';
import Icon19 from '../assets/img/fm_step_2.png';
import Icon20 from '../assets/img/fm_step_3.png';
import Icon21 from '../assets/img/fm_step_4.png';
import Icon22 from '../assets/img/fm_step_5.png';
import Icon50 from '../assets/img/Step2(1).png';
import Icon23 from '../assets/img/solar-step2(1).png';
import Icon24 from '../assets/img/solar-step2(2).png';
import Icon25 from '../assets/img/solar-step2(3).png';
import Icon26 from '../assets/img/step2_4_solarpng.png';
import Icon27 from '../assets/img/solar-step2(5).png';
import Icon28 from '../assets/img/step2_6_solarpng.png';
import Icon29 from '../assets/img/H_Step2(1).png';
import Icon30 from '../assets/img/H_Step2(2).png';
import Icon31 from '../assets/img/H_Step2(3).png';
import Icon32 from '../assets/img/step2_(4).png';
import Icon33 from '../assets/img/step2_(5).png';
import Icon34 from '../assets/img/step2_(6).png';
import Icon35 from '../assets/img/Mobile_Icon.png';



const Section = styled.section`
  text-align: center;
  padding: 50px 20px;
  background-color: #fff;
  
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #000;
  margin-bottom: 10px;
  font-weight: 600;

  span {
    color: #6a1b9a; /* Purple highlight */
  }
`;

const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${props => props.bgColor || '#6a1b9a'};
  margin-bottom: 15px;

  img {
    width: 40px;
    height: 40px;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 10px;
  font-weight: 600;
`;

const BenefitText = styled.p`
  color: #6e6e6e;
  font-size: 0.9rem;
  line-height: 1.4;
`;

// Data sets for different responses
const claimBenefits = [
  { title: 'Optimize', text: 'maximize time & effort efficiency', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Streamline', text: 'simplify claim management', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Verify', text: 'ensure precise claim reconciliation', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Accelerate', text: 'minimize claim processing delays', bgColor: '#fff1d0', icon: Icon4 },
  { title: 'Enhance', text: 'deliver a seamless claim experience', bgColor: '#d7faff', icon: Icon5 },
  { title: 'Elevate', text: 'increase claim transparency', bgColor: '#d9f5e3', icon: Icon6 }
];

const leaveBenefits = [
  { title: 'Save', text: 'time & effort', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Administer', text: 'uniform leave policy', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Ensure', text: 'accurate leave accounting', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Reduce', text: 'unnecessary expense', bgColor: '#fff1d0', icon: Icon4 },
  { title: 'Deliver', text: 'an outstanding employee experience', bgColor: '#d7faff', icon: Icon5 },
  { title: 'Improve', text: 'employer brand image', bgColor: '#d9f5e3', icon: Icon6 },
];
const leadBenefits = [
  { title: 'Maximize Efficiency', text: 'Save valuable time and effort with seamless processes', bgColor: '#d9f5e3', icon: optimizing },
  { title: 'Unmatched Quality', text: 'We consistently deliver top-notch results for every user', bgColor: '#f2e3ff', icon: Primium },
  { title: 'Lightning-Fast Access', text: 'Enjoy quick and easy access to our application anywhere, anytime', bgColor: '#ffe8cc', icon: Access },
  { title: 'Seamless Experience', text: 'Experience flawless and intuitive user interactions', bgColor: '#fff1d0', icon: exprieance },
  { title: 'User-Centric Design', text: 'Delivering an outstanding and effortless user experience', bgColor: '#d7faff', icon: easy },
  { title: 'Universal Accessibility', text: 'Access our platform seamlessly on both mobile and web', bgColor: '#d9f5e3', icon: Accessbule },
];
const employeeBenefits = [
  { title: 'Save', text: 'time & effort', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Administer', text: 'uniform leave policy', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Ensure', text: 'accurate leave accounting', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Reduce', text: 'unnecessary expense', bgColor: '#fff1d0', icon: Icon4 },
  { title: 'Deliver', text: 'an outstanding employee experience', bgColor: '#d7faff', icon: Icon5 },
  { title: 'Improve', text: 'employer brand image', bgColor: '#d9f5e3', icon: Icon6 },
];
const hrmBenefits = [
  { title: 'Streamline', text: 'eliminate time-consuming paperwork', bgColor: '#d9f5e3', icon: Icon1 },
  { title: 'Optimize', text: 'cut unnecessary operational expenses', bgColor: '#fff1d0', icon: Icon8 },
  { title: 'Boost', text: 'elevate employer brand reputation', bgColor: '#d9f5e3', icon: Icon7 },
  { title: 'Standardize', text: 'enforce a consistent company policy', bgColor: '#f2e3ff', icon: Icon2 },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Reliabilty', text: '24/7 availability with 100% uptime on mobile and web ', bgColor: '#d7faff', icon: Icon5 },
];
const labEquipment = [
  { title: '24/7 Access with less man power', text: 'Schedule Equipment Anytime, Seamlessly', bgColor: '#d7faff', icon: Icon1 },
  { title: 'Real-Time Availability!', text: 'Stay Updated, Avoid Surprises', bgColor: '#d9f5e3', icon: Icon7 },
  { title: 'Hassle-Free User Management!', text: 'Group, Control, Assign Roles', bgColor: '#fff1d0', icon: Icon2 },
  { title: 'Zero Booking Conflicts!', text: 'Smart Scheduling, Uninterrupted Operations', bgColor: '#f2e3ff', icon: Icon8 },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Stay Audit-Ready', text: 'Automated Logs, Effortless Records ', bgColor: '#d9f5e3', icon: Icon5 },
];
const labManagement = [
  { title: 'Quality', text: 'Schedule Equipment Anytime, Seamlessly', bgColor: '#d7faff', icon: Icon11 },
  { title: 'Data Security', text: 'Stay Updated, Avoid Surprises', bgColor: '#d9f5e3', icon: Icon10 },
  { title: 'Scalability ', text: 'Group, Control, Assign Roles', bgColor: '#fff1d0', icon: Icon12 },
  { title: 'Customization', text: 'Smart Scheduling, Uninterrupted Operations', bgColor: '#f2e3ff', icon: Icon9 },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ffe8cc', icon: Icon3 },
  { title: 'Stay Audit-Ready', text: 'Automated Logs, Effortless Records ', bgColor: '#d9f5e3', icon: Icon5 },
];
const wasteManagement = [
  { title: "Waste Tracking", text: "Monitor collection, segregation, and disposal in real-time.", bgColor: "#d7faff", "icon": Icon13 },
  { title: "Optimized Collection Routes", text: "AI-driven route planning for fuel efficiency and reduced costs.", bgColor: "#d9f5e3", icon: Icon14 },
  { title: "Smart Bin Alerts", text: "IoT-enabled bins notify when full, ensuring timely collection.", bgColor: "#fff1d0", icon: Icon15 },
  { title: "Seamless Compliance Reporting", text: "Automated documentation for regulatory authorities.", bgColor: "#f2e3ff", icon: Icon5 },
  { title: "Real-Time Dashboards", text: "Gain insights into waste management performance instantly.", bgColor: "#ffe8cc", icon: Icon16 },
  { title: "Worker Safety Monitoring", text: "Track health check-ups and hazardous exposure for workers.", bgColor: "#d9f5e3", icon: Icon17 }
];
const sales = [
  { title: '24/7 Access with less man power', text: 'Schedule Equipment Anytime, Seamlessly', bgColor: '#d7faff', icon: Icon1 },
  { title: 'Real-Time Availability!', text: 'Stay Updated, Avoid Surprises', bgColor: '#d9f5e3', icon: Icon3 },
  { title: 'Efficiency', text: 'Automate tasks like orders creation or generating invoices', bgColor: '#fff1d0', icon: Icon2 },
  { title: 'Business Growth', text: 'Payment reminders and tax invoice creation simplify cash flow management.', bgColor: '#f2e3ff', icon: Icon8 },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ffe8cc', icon: Icon7 },
  { title: 'Stay Audit-Ready', text: 'Tracking all the detailed changes', bgColor: '#d9f5e3', icon: Icon5 },
];
const Facility = [
  { title: 'Asset Lifecycle Tracking', text: 'Monitor and manage asset performance, maintenance history, and status in real time.', bgColor: '#d7faff', icon: Icon18 },
  { title: 'Work Order Automation', text: 'Automate task creation and assignment for scheduled and emergency maintenance.', bgColor: '#d9f5e3', icon: Icon19 },
  { title: 'Predictive Maintenance', text: 'Prevent equipment failure with smart scheduling based on usage patterns and alerts.', bgColor: '#fff1d0', icon: Icon20 },
  { title: 'Space Planning & Utilization', text: 'Optimize floor plans and space usage with interactive layouts and occupancy insights.', bgColor: '#f2e3ff', icon: Icon21 },
  { title: 'Vendor Management', text: 'Track service partner performance, contract terms, and SLA compliance digitally.', bgColor: '#ffe8cc', icon: Icon22 },
  { title: 'Real-Time Dashboards', text: 'View operations performance, task status, and cost analytics at a glance.', bgColor: '#d9f5e3', icon: Icon50 },
];
const Hospital = [
  { title: 'Real-Time Patient Dashboard', text: 'Monitor patient records, vitals, test results, and treatment plans in real time for informed care decisions.', bgColor: '#d7faff', icon: Icon29 },
  { title: 'Automated Scheduling System', text: 'Coordinate appointments, lab tests, surgeries, and staff shifts seamlessly to optimize hospital operations.', bgColor: '#d9f5e3', icon: Icon30 },
  { title: 'Instant Notification Alerts', text: 'Receive timely updates on critical patient conditions, test results, or staff schedule changes.', bgColor: '#fff1d0', icon: Icon31 },
  { title: 'Accurate Tracking', text: 'Track medications and samples with QR code scanning for accurate verification and error-free workflows.', bgColor: '#f2e3ff', icon: Icon32 },
  { title: 'Data-Driven Analytics', text: 'Analyze bed occupancy, patient outcomes, and staff performance in real time to drive operational excellence.', bgColor: '#ffe8cc', icon: Icon33 },
  { title: 'Integrated Billing Operations', text: 'Streamline financial workflows with itemized invoices and insurance claim tracking for efficiency.', bgColor: '#d9f5e3', icon: Icon34 },
];
const Solar = [
  { title: 'Real-Time Monitoring', text: 'Live tracking of voltage, current,temperature, and solar irradiance.', bgColor: '#d7faff', icon: Icon23 },
  { title: 'Fault Detection & Alerts', text: 'Instant alerts for issues like shading, dirt, or overheating.', bgColor: '#d9f5e3', icon: Icon24 },
  { title: 'Sales Analysis Dashboard', text: 'Sales analysis of the solar system vendor, showing total products sold and total income earned .', bgColor: '#fff1d0', icon: Icon25 },
  { title: 'Seamless connectivity', text: 'Seamless connectivity in a solar management system ensures smooth communication between components .', bgColor: '#f2e3ff', icon: Icon26 },
  { title: 'Predictive Maintenance', text: 'Uses data and analytics to anticipate equipment issues before they occur.', bgColor: '#ffe8cc', icon: Icon27 },
  { title: 'Employee management', text: 'In solar operations, it ensures tasks are efficiently assigned to the right team members for smooth workflow', bgColor: '#d9f5e3', icon: Icon28 },
];

const FeatureBenifits = ({ data }) => {
  // Determine which set of benefits to display based on the response data
  const benefits = data == 'Solar' ? Solar : data == 'Hospital' ? Hospital : data == 'Facility' ? Facility : data === 'LMS' ? labManagement : data === 'Claim' ? claimBenefits : data == 'Customer' ? leadBenefits : data == 'HR' ? hrmBenefits : data == 'Equipment' ? labEquipment : data == 'Waste' ? wasteManagement : data == 'Sales and Procurement' ? sales : leaveBenefits;

  return (
    <Section>
      {data === 'Solar' ? (<Title>Solar Intelligence <span>Optimize, Control, and Grow.</span></Title>
      ) : data === 'Facility' ? (
        <Title>All-in-One Facility Management, <span>Streamlined and Smarter.</span></Title>
      ) : (
        <Title>All-in-One {data} Management, <span>Faster and Easier.</span></Title>
      )}
      <BenefitGrid>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index}>
            <BenefitIcon bgColor={benefit.bgColor}>
              <img src={benefit.icon} alt={`${benefit.title} Icon`} />
            </BenefitIcon>
            <BenefitTitle>{benefit.title}</BenefitTitle>
            <BenefitText>{benefit.text}</BenefitText>
          </BenefitCard>
        ))}
      </BenefitGrid>
    </Section>
  );
};

export default FeatureBenifits;
