import { useAuth } from "../context/AuthContext";
import ProjectManagementTimesheetEmployee from "../pages/ProjectManagement/ProjectManagementTimesheetEmployee";
import TimeSheetManagement from "../pages/TimeSheetManagement";


export const TimesheetRouter = () => {
  const { companyInfo } = useAuth();

  if (!companyInfo) return null; // or loader

  return companyInfo.business_type === "APM" ? <ProjectManagementTimesheetEmployee /> : <TimeSheetManagement />;
}