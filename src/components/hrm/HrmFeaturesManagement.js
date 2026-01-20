import ClaimHeadBG from '../../assets/img/claim.png';
import LeaveHeadBG from '../../assets/img/leave1.png';
import HrHeadBG from '../../assets/img/hrm_hero_img.png';
import { ProcessFlow } from './ProcessFlow';
import FeatureDescription from './FeatureDescription';
import { useLocation } from 'react-router-dom';
import LetsConnect from '../LetsConnect';
import { Helmet } from "react-helmet-async";


const HrmFeaturesManagement = () => {
  const location = useLocation();

  const hrmPages = [
    {
      path: "/claim.html",
      seoTitle: "Expense & Claim Management | Atomwalk HRM",
      metaDescription: "Streamline employee expense claims with fast approvals, secure uploads, and real-time tracking using Atomwalk HRM.",
      keywords: "expense claim management, HRM claims software, employee reimbursement system",
      canonical: "https://home.atomwalk.com/claim.html",
      title: "Comprehensive Expense and Claim Management",
      description: "Streamline your expense claim process with fast approvals, secure uploads, and real-time tracking all in one place.",
      image: ClaimHeadBG,
      data: "Claim"
    },
    {
      path: "/leave.html",
      seoTitle: "Leave & Holiday Management | Atomwalk HRM",
      metaDescription: "Digitally manage employee leave, holidays, approvals, and balances with Atomwalk HRM leave management.",
      keywords: "leave management system, HR leave tracking software",
      canonical: "https://home.atomwalk.com/leave.html",
      title: "Streamlined Leave and Holiday Management System",
      description: "Digitally track holidays, manage leave requests, and ensure transparency with streamlined workflows for employees and managers.",
      image: LeaveHeadBG,
      data: "Leave"
    },
    {
      path: "/employeehr.html",
      seoTitle: "Employee Management System | Atomwalk HRM",
      metaDescription: "Manage employee lifecycle, records, and HR operations efficiently with Atomwalk HRM.",
      keywords: "Employee onboarding software, HR onboarding system, Job offer management software, Onboarding HRM module, Employee onboarding HRM, HRM software integration, CRM system integration, Existing system integration, Business software integration, HRM CRM integrations",
      canonical: "https://home.atomwalk.com/employeehr.html",
      title: "Empowering HR with Comprehensive Employee Management",
      description: "Streamline records, simplify processes, and ensure transparency across every stage of the employee lifecycle.",
      image: HrHeadBG,
      data: "HR"
    },
    {
      path: "/attendance.html",
      seoTitle: "Attendance Management | Atomwalk HRM",
      metaDescription: "Track employee attendance and productivity in real time using Atomwalk HRM.",
      keywords: "Attendance management software, Employee attendance tracking system, HR attendance software, Attendance tracking HRM, Performance tracking software, Attendance with geo-location, Real-time check-in and check-out, Manager review and approval system, Task and attendance integration, Transparent employee performance scores, Weekly task management software, Mobile and web attendance solution",
      canonical: "https://home.atomwalk.com/attendance.html",
      title: "Smart Attendance Management",
      description: "Seamlessly track attendance and monitor productivity with real-time insights and dynamic tools.",
      image: HrHeadBG,
      data: "Attendance"
    },
    {
      path: "/payroll.html",
      seoTitle: "Payroll Management | Atomwalk HRM",
      metaDescription: "Automate payroll processing, deductions, and payslips with Atomwalk HRM payroll system.",
      keywords: "Payroll setup and salary control, Employee salary parameter management, Monthly salary processing software, Automated salary posting system, API-based payroll entries, Cloud-based payroll system India, Payroll tax calculation software, PF ESI payroll management, Statutory payroll compliance software, Payroll management software, Employee payroll processing system, HR payroll software",
      canonical: "https://home.atomwalk.com/payroll.html",
      title: "Accurate and Automated Payroll Solutions",
      description: "Simplify payroll with Atomwalk HRM's automated system, handling salaries, deductions, and taxes with accuracy. Real-time integration ensures seamless reporting and easy payslip access for employees",
      image: HrHeadBG,
      data: "Payroll"
    },
    {
      path: "/appraisal.html",
      seoTitle: "Performance Appraisal System | Atomwalk HRM",
      metaDescription: "KPI-based employee appraisals with transparent evaluations and reporting.",
      keywords: "Self appraisal process software, Manager appraisal workflow, Employee performance reviews, KPI-based appraisal system, Customizable appraisal structure, Performance management software for SMEs, HR appraisal software India",
      canonical: "https://home.atomwalk.com/appraisal.html",
      title: "Dynamic and Transparent Appraisal System",
      description: "The appraisal system supporting KPI-based evaluations, with self-assessment, manager scoring, and grade normalization for fair, transparent performance reviews and structured reporting.",
      image: HrHeadBG,
      data: "Appraisal"
    },
    {
      path: "/emphelp.html",
      seoTitle: "HR Helpdesk & Ticketing System | Atomwalk HRM",
      metaDescription: "Employee helpdesk with SLA tracking, ticketing, and HR support management.",
      keywords: "HR service request desk, Employee ticket management system, Helpdesk ticket creation software, Ticket assignment and resolution, HR helpdesk dashboard, HRMS desktop and mobile app, Employee self-service helpdesk",
      canonical: "https://home.atomwalk.com/emphelp.html",
      title: "Help & Request Desk",
      description: "Intelligent ticketing system for employee support with automated routing, SLA tracking, and knowledge base integration. Real-time status updates and analytics for HR service management.",
      image: HrHeadBG,
      data: "Help & Request"
    },
    {
      path: "/empevent.html",
      seoTitle: "Employee Engagement & Events | Atomwalk HRM",
      metaDescription: "Boost employee engagement with events, announcements, and celebrations.",
      keywords: "Company event creation software, Employee engagement event management, Birthday and anniversary reminders, Promotion and milestone events, Employee event notifications, HRMS web and mobile app, Employee events mobile app",
      canonical: "https://home.atomwalk.com/empevent.html",
      title: "Employee Engagement & Events",
      description: "Keep your workforce informed and connected with real-time company announcements, personalized birthday and work anniversary recognitions, and interactive features that promote team bonding and employee participation.",
      image: "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/HRM-Events.png",
      data: "Event Updates"
    }
  ];

  const currentPage =
    hrmPages.find(page => page.path === location.pathname) || hrmPages[0];

  return (
    <>

      <Helmet>
        <title>{currentPage.seoTitle}</title>
        <meta name="description" content={currentPage.metaDescription} />
        <meta name="keywords" content={currentPage.keywords} />
        <link rel="canonical" href={currentPage.canonical} />
      </Helmet>

      <LetsConnect
        title={currentPage.title}
        description={currentPage.description}
        background="#eae3ff"
        lead={true}
        img={currentPage.image}
      />

      <ProcessFlow data={currentPage.data} />
      <FeatureDescription data={currentPage.data} />

    </>
  );
};

export default HrmFeaturesManagement;
