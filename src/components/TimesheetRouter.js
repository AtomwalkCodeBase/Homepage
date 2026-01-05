import { useAuth } from "../context/AuthContext";
// import Dashboard from "../pages/Dashboard";
// import LmsDashBoard from "../pages/LmsDashBoard";
import ProjectManagementTimesheetEmployee from "../pages/ProjectManagement/ProjectManagementTimesheetEmployee";
import TimeSheetManagement from "../pages/TimeSheetManagement";


export const TimesheetRouter = () => {
  const { companyInfo } = useAuth();

  if (!companyInfo) return null; // or loader

  return companyInfo.business_type === "APM" ? <ProjectManagementTimesheetEmployee /> : <TimeSheetManagement />;
}

// export const DashboardRouter = () => {
//     const { companyInfo } = useAuth();

//   if (!companyInfo) return null; // or loader

//   return companyInfo.business_type === "LMS" ? <LmsDashBoard /> : <Dashboard />


// }