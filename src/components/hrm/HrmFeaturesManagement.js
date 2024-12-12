import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
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
  }, [isClaimPage, isLeavePage,isEmployeePage]);

  const demo = () => {
    window.location.href = '/demo.html';
  };
  const navigate = useNavigate();
const navback=()=>{
  navigate(-1);
}
  return (
    <>
      <LetsConnect title={content.title} description={content.description} background={"#eae3ff"} lead={true} img={content.image}></LetsConnect>

      <ProcessFlow data={content.data} />
      <FeatureDescription data={content.data} />
    </>
  );
};

export default HrmFeaturesManagement;
