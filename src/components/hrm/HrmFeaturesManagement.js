import React, { useMemo } from 'react';
import ClaimHeadBG from '../../assets/img/claim.png'; 
import LeaveHeadBG from '../../assets/img/leave1.png';
import HrHeadBG from '../../assets/img/hrm_hero_img.png';
import { ProcessFlow } from './ProcessFlow';
import FeatureDescription from './FeatureDescription';
import { useLocation, useNavigate } from 'react-router-dom';
import LetsConnect from '../LetsConnect';


const HrmFeaturesManagement = () => {
  const location = useLocation();

  // Determine which content to render based on the pathname
  const isClaimPage = location.pathname === '/claim.html';
  const isLeavePage = location.pathname === '/leave.html';
  const isEmployeePage = location.pathname === '/employeehr.html';
  const isPayrollPage = location.pathname === '/payroll.html';
  const isAttendancePage = location.pathname === '/attendance.html';
  const isAppraisalPage = location.pathname === '/appraisal.html';
  const isHelpDeskPage = location.pathname === '/emphelp.html';
  const isEventPage = location.pathname === '/empevent.html';

  const content = useMemo(() => {
    if (isClaimPage) {
      return {
        title: "Comprehensive Expense and Claim Management",
        description: "Streamline your expense claim process with fast approvals, secure uploads, and real-time tracking all in one place.",
        image: ClaimHeadBG,
        data: "Claim"
      };
    } else if (isLeavePage) {
      return {
        title: "Streamlined Leave and Holiday Management System",
        description: "Digitally track holidays, manage leave requests, and ensure transparency with streamlined workflows for employees and managers.",
        image: LeaveHeadBG,
        data: "Leave"
      };
    }
    else if (isEmployeePage) {
      return {
        title: "Empowering HR with Comprehensive Employee Management",
      description: "Streamline records, simplify processes, and ensure transparency across every stage of the employee lifecycle.",
      image: HrHeadBG,
      data: "HR"
      };
    }
    else if (isAttendancePage) {
      return {
        title: "Smart Attendance Management",
      description: "Seamlessly track attendance and monitor productivity with real-time insights and dynamic tools.",
      image: HrHeadBG,
      data: "Attendance"
      };
    }
    else if (isHelpDeskPage) {
      return {
        title: "Help & Request Desk",
      description: "Intelligent ticketing system for employee support with automated routing, SLA tracking, and knowledge base integration. Real-time status updates and analytics for HR service management.",
      image: HrHeadBG,
      data: "Help & Request"
      };
    }
    else if (isEventPage) {
      return {
        title: "Employee Engagement & Events",
        description: "Keep your workforce informed and connected with real-time company announcements, personalized birthday and work anniversary recognitions, and interactive features that promote team bonding and employee participation.",
        image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/HRM-Events.png',
        data: "Event Updates"
      };
    }


    else if (isPayrollPage) {
      return {
        title: "Accurate and Automated Payroll Solutions",
      description: "Simplify payroll with Atomwalk HRM's automated system, handling salaries, deductions, and taxes with accuracy. Real-time integration ensures seamless reporting and easy payslip access for employees",
      image: HrHeadBG,
      data: "Payroll"
      };
    }
    else if (isAppraisalPage) {
      return {
        title: "Dynamic and Transparent Appraisal System",
      description: "The appraisal system supporting KPI-based evaluations, with self-assessment, manager scoring, and grade normalization for fair, transparent performance reviews and structured reporting.",
      image: HrHeadBG,
      data: "Appraisal"
      };
    }
    return {
      title: "Welcome to Employee Management",
      description: "Explore our various modules designed to simplify your HR processes.",
      image: HrHeadBG,
      data: "HR"
    };
  }, [isClaimPage, isLeavePage,isEmployeePage, isPayrollPage, isAttendancePage, isAppraisalPage, isHelpDeskPage, isEventPage]);

  const navigate = useNavigate();
  return (
    <>
      <LetsConnect title={content.title} description={content.description} background={"#eae3ff"} lead={true} img={content.image}/>
      <ProcessFlow data={content.data} />
      <FeatureDescription data={content.data} />
    </>
  );
};

export default HrmFeaturesManagement;
