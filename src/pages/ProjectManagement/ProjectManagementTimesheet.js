import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import { FaEye, FaFilter, FaProjectDiagram, FaUsers} from 'react-icons/fa';
import { MdAccessTime } from "react-icons/md";
import ProjectDetailsModal from '../../components/modals/ModalForProjectmanagemnt/ProjectDetailsModal';
import ProjectModal from '../../components/modals/ProjectModal';
import AssignUserModal from '../../components/modals/AssignUserModal';
import { getEmpAllocationData } from '../../services/productServices';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { formatToDDMMYYYY, getMonthRange, getStatusVariant, mapAllocationData } from './utils/utils';
import Badge from '../../components/Badge';
import EmployeeProjectModal from '../../components/modals/ModalForProjectmanagemnt/EmployeeProjectModal';
import StatsCard from '../../components/StatsCard';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fonts.body};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const TableHead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const TeamMembers = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  border: 2px solid white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-left: -8px;

  &:first-child {
    margin-left: 0;
  }
`;
const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1.5rem;
  overflow-x: auto;
`

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.text)};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EmployeeAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  flex-shrink: 0;
`;

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const EmployeeEmail = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ProjectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const ProjectItemName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const ProjectItemHours = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 600;
`;

const UtilizationBar = styled.div`
  width: 100%;
  max-width: 100px;
  height: 8px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  position: relative;
`;

const UtilizationFill = styled.div`
  height: 100%;
  width: ${({ percentage }) => Math.min(percentage, 100)}%;
  background: ${({ percentage }) => {
    if (percentage >= 100) return '#FF3D00';
    if (percentage >= 90) return '#FFD600';
    if (percentage >= 70) return '#00C853';
    return '#2196F3';
  }};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
`;

const UtilizationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const UtilizationText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  min-width: 35px;
`;

const PerformanceBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  white-space: nowrap;
  background: ${({ performance }) => {
    switch (performance) {
      case 'Excellent':
        return '#E6F7ED';
      case 'Good':
        return '#E3F2FD';
      case 'Overloaded':
        return '#FFEBEE';
      case 'Underutilized':
        return '#FFF3E0';
      default:
        return '#F5F5F5';
    }
  }};
  color: ${({ performance }) => {
    switch (performance) {
      case 'Excellent':
        return '#00C853';
      case 'Good':
        return '#2196F3';
      case 'Overloaded':
        return '#D32F2F';
      case 'Underutilized':
        return '#FF8F00';
      default:
        return '#666666';
    }
  }};
`;

const HoursText = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const WeeklyHours = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 2px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text};
`
const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`
const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const EmptyState = styled.div`
  text-align: center; padding: 4rem 2rem; color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.1rem/1.5 ${({ theme }) => theme.fonts.body};
`;

const ProjectManagementTimesheet = () => {
  const { theme } = useTheme();
  const { profile, companyInfo } = useAuth();
  const isAPMManager = profile?.is_manager && companyInfo?.business_type === 'APM';
  const [activeTab, setActiveTab] = useState("activeProject");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false)
  const [showEmployeeDetailsModal, setShowEmployeeDetailsModal] = useState(false)
  const [timePeriod, setTimePeriod] = useState("current")
  const [dateRange, setDateRange] = useState(() => {
    const { start, end } = getMonthRange("current")
    return { start, end }
  })
  const [showModal, setShowModal] = useState(true);

  const [originalData, setOriginalData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const [stats, setStats] = useState({
    activeProjects: 0,
    teamMembers: 0,
    totalHours: 0,
  });

  useEffect(() => {
    // if (dateRange?.start && dateRange?.end) {
    fetchEmpAllocation();
    // }
  }, []);

  const statsData = [
    {
      id: 1,
      label: 'Active Projects',
      value: stats.activeProjects,
      change: '+2 this month',
      isPositive: true,
      color: "primary",
      // color: "#6C63FF",
      icon: <FaProjectDiagram />
    },
    {
      id: 2,
      label: 'Team Members',
      value: stats.teamMembers,
      change: '+1 new member',
      isPositive: true,
      color: "accent" ,
      // color: "#63FFDA",
      icon: <FaUsers />
    },
    {
      id: 3,
      label: 'Total Hours Logged',
      value: stats.totalHours,
      change: '-5% this week',
      isPositive: false,
      color: "secondary",
      // color: "#FF6584",
      icon: <MdAccessTime />
    },
  ];

  const fetchEmpAllocation = async (startOverride, endOverride) => {

    const start = startOverride || dateRange.start
    const end = endOverride || dateRange.end


    const startDateObj = new Date(start)
    const endDateObj = new Date(end)

    if (endDateObj < startDateObj) {
      toast.info("End date cannot be earlier than start date")
      return
    }
    const payload = {
      start_date: formatToDDMMYYYY(start),
      end_date: formatToDDMMYYYY(end),
    }
    try {
      const res = await getEmpAllocationData(payload);

      // Extract data array from response
      const allocationData = res?.data || [];

      setOriginalData(res?.data)

      if (Array.isArray(allocationData)) {
        const { projectsData, employeeData } = mapAllocationData(allocationData);
        const uniqueProjects = projectsData.length;
        const uniqueEmployees = new Set(employeeData.map(e => e.emp_id)).size;
        const totalHours = projectsData.reduce((sum, p) => sum + (p.totalHours || 0), 0);

        setStats({
          activeProjects: uniqueProjects,
          teamMembers: uniqueEmployees,
          totalHours,
        });
        // console.log("projectsData", (projectsData))
        console.log("employeeData", (employeeData))
        // console.log("rawNormalizedData", JSON.stringify(res?.data))
        setProjectsData(projectsData)
        setEmployeeData(employeeData)
      } else {
        console.error("Invalid data format:", allocationData);
        setProjectsData([]);
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching allocation data:", error);
      setProjectsData([]);
      setEmployeeData([]);
    }
  };

  const handleViewProject = (project, employee) => {
    if(project){
      setSelectedProject({
      ...project,
    });

    setShowProjectDetailsModal(true);
  }

    if(employee){
      setSelectedEmployee(employee);
      setShowEmployeeDetailsModal(true)
    }
  };

  // console.log(projectsData)

  const tabs = isAPMManager
    ? [
      { key: 'activeProject', label: 'Active Projects' },
      { key: 'EmployeeProject', label: 'Employee Details' },
      // { key: 'Analysis', label: 'Analysis' },
      // { key: 'approve', label: 'Approve Employee Activity' },
    ]
    : [];

  const handlePeriodChange = (value) => {
    setTimePeriod(value);

    if (value === "current_month") {
      const { start, end } = getMonthRange("current")
      setDateRange({ start, end })
      fetchEmpAllocation(start, end)
    }

    if (value === "previous_month") {
      const { start, end } = getMonthRange("previous")
      setDateRange({ start, end })
      fetchEmpAllocation(start, end)
    }

    if (value === "next_month") {
      const { start, end } = getMonthRange("next")
      setDateRange({ start, end })
      fetchEmpAllocation(start, end)
    }
  }

  return (
    <Layout title="Project Management Timesheet">
      <ProjectHeader>
        <div>
          <Paragraphdata>Manage and track all your projects</Paragraphdata>
        </div>
      </ProjectHeader>
      <DashboardContainer >
        <StatsGrid >
          {statsData.map((stat) => (
            <StatsCard icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} />
            // <StatCardComponent key={stat.id} {...stat} />
          ))}
        </StatsGrid>

        <Card>
          <TabContainer>
            {tabs.map(t => (
              <Tab key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}>
                {t.label}
              </Tab>
            ))}
          </TabContainer>

          <FilterContainer>
            <FilterSelect name="timePeriod" value={timePeriod} onChange={(e) => { handlePeriodChange(e.target.value) }}>
              <option value="current_month">Current Month</option>
              <option value="previous_month">Previous Month</option>
              <option value="next_month">Next Month</option>
            </FilterSelect>
            <DateInput
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
            />
            <span>to</span>
            <DateInput
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
            />
            <Button variant="outline" size="sm" onClick={() => fetchEmpAllocation(dateRange.start, dateRange.end)}>
              <FaFilter /> Filter
            </Button>
          </FilterContainer>

          {activeTab === "activeProject" && (
            projectsData.length === 0 ? (
              <EmptyState>No projects found for the selected period.</EmptyState>
            ) :
              <>
                <SectionTitle >Active Projects</SectionTitle>
                <ProjectTable projects={projectsData} onViewProject={handleViewProject} onAssignTeam={() => setIsAssignModalOpen(true)} />
              </>)
          }

          {activeTab === "EmployeeProject" && (
            employeeData.length === 0 ? (
              <EmptyState>No employee data available.</EmptyState>
            ) : (
              <>
                <SectionTitle >Employee Base Details</SectionTitle>
                <EmployeeTable employees={employeeData} setShowModal={setShowModal} onViewProject={handleViewProject} />
              </>
            )
          )
          }
          {/* {activeTab === "Analysis" &&
            <>
              <EmptyState>Analysis dashboard – coming soon</EmptyState>
              <SectionTitle >Analysis Screen</SectionTitle>
              <EmployeeTable employees={employeeData} /> 
            </>
          } */}
          {/* {activeTab === "approve" &&
            <>
           {employeeData
          .filter(employee =>
            Array.isArray(employee.projects) &&
            employee.projects.length > 0 &&
            employee.projects.every(project => project.complete === true)
          )
          .map(employee => {
            console.log(employee)
            return(
            <p key={employee.emp_id}>{employee.employee_name}</p>
          )})}

            </>
          } */}
        </Card>
      </DashboardContainer>

      {showProjectDetailsModal &&
        <ProjectDetailsModal project={selectedProject} onClose={() => setShowProjectDetailsModal(false)} />
      }

      {isOpen &&
        <ProjectModal isOpen={isOpen} onClose={() => {
            setIsOpen(false)
            setSelectedProject(null)
          }}
          editData={selectedProject}
        />
      }
{/* 
      <AssignUserModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false)
          setSelectedProject(null)
        }}
        project={selectedProject}
      /> */}

      {showEmployeeDetailsModal && (
        <EmployeeProjectModal 
          EmployeeData={selectedEmployee}
          onClose={() => setShowEmployeeDetailsModal(false)}
        />
      )}

    </Layout>
  )
}

export default ProjectManagementTimesheet

const ProjectTable = ({ projects, onViewProject, onAssignTeam }) =>(
  <TableContainer>
  <Table>
    <TableHead >
      <TableRow>
        <TableHeader >Project Name (Order item)</TableHeader>
        <TableHeader >Team</TableHeader>
        <TableHeader >Assigned Employee</TableHeader>
        <TableHeader >Active Employee</TableHeader>
        <TableHeader >Total Hours</TableHeader>
        <TableHeader >Status</TableHeader>
        <TableHeader >Actions</TableHeader>
      </TableRow>
    </TableHead>
    <tbody>
      {projects.map((project) => {
        const statusLabel = project.project_period_status || project.project_status;
        return (
          <TableRow key={project.id} >
            <TableCell >
              <ProjectName >{project.project_name}</ProjectName>
              <EmployeeEmail >({project.order_item_key})</EmployeeEmail>
            </TableCell>
            <TableCell >
              <TeamMembers >
                {project.teamMembers.slice(0, 5).map((member, index) => (
                  <Avatar key={index} color={member.color} >
                    {member.employee_name.split(' ').map(n => n[0]).join('')} 
                  </Avatar>
                ))}
                {project.teamMembers.length > 5 &&  <Avatar color="#bbbbbbff" style={{cursor: "pointer"}} onClick={() => onViewProject(project, null)}>+{project.teamMembers.length - 3}</Avatar>}
              </TeamMembers>
            </TableCell>
            <TableCell >{project.total_assigned_employees || 0}</TableCell>
            <TableCell >{project.total_working_employees || 0}</TableCell>
            <TableCell >{project.totalHours || 0}h</TableCell>
            <TableCell >
              <Badge variant={getStatusVariant(statusLabel)}>
                {statusLabel}
              </Badge>
            </TableCell>
            <TableCell >
              <Button onClick={() => onViewProject(project, null)} variant="ghost" size="sm" title="View">
                <FaEye />
              </Button>
              {/* <Button
              variant="primary"
              size="sm"
              title="Assign user"
              onClick={() => onAssignTeam(project)}
            >
              <FaUserEdit />
            </Button> */}
            </TableCell>
          </TableRow>
        )
      })}
    </tbody>
  </Table>
  </TableContainer>
);

const EmployeeTable = ({ employees, setShowModal, onViewProject }) => (
  <TableContainer>
  <Table>
    <TableHead >
      <TableRow>
        <TableHeader >Employee</TableHeader>
        <TableHeader >Projects & Hours</TableHeader>
        <TableHeader >Total Hours</TableHeader>
        {/* <TableHeader >Utilization</TableHeader> */}
        {/* <TableHeader >Performance</TableHeader> */}
        <TableHeader >Actions</TableHeader>
      </TableRow>
    </TableHead>
    <tbody>
      {employees.map((employee) => (
        <TableRow key={employee.id} >
          <TableCell >
            <EmployeeInfo >
              <EmployeeAvatar color={employee.color} >
                {employee.employee_name.split(' ').map(n => n[0]).join('')}
              </EmployeeAvatar>
              <EmployeeDetails>
                <EmployeeName >{employee.employee_name}</EmployeeName>
                <EmployeeEmail >{employee.emp_id}</EmployeeEmail>
              </EmployeeDetails>
            </EmployeeInfo>
          </TableCell>
          <TableCell >
            <ProjectsList >
              {employee.projects.map((project, index) => (
                <ProjectItem key={index} >
                  <ProjectItemName >{project.customer_name} ({project.order_item_key})</ProjectItemName>
                  <ProjectItemHours >{project.effort}h</ProjectItemHours>
                </ProjectItem>
              ))}
            </ProjectsList>
          </TableCell>
          <TableCell >
            <HoursText >{employee.projects.totalHoursPerProject}h</HoursText>
            {/* <WeeklyHours >This month: {employee.thisWeekHours}h</WeeklyHours> */}
          </TableCell>
          {/* <TableCell >
            <UtilizationWrapper >
              <UtilizationBar >
                <UtilizationFill percentage={employee.utilization} />
              </UtilizationBar>
              <UtilizationText >{employee.utilization}%</UtilizationText>
            </UtilizationWrapper>
          </TableCell> */}
          {/* <TableCell >
            <PerformanceBadge performance={employee.performance} >
              {employee.performance}
            </PerformanceBadge>
          </TableCell> */}
          {/* <TableCell >
            <IconButton >
              <MoreVertical size={20} />
            </IconButton>
          </TableCell> */}
          <TableCell>
              <Button onClick={() => onViewProject(null, employee)} variant="ghost" size="sm" title="View">
                <FaEye />
              </Button>
          </TableCell>
        </TableRow>
      ))}
    </tbody>
  </Table>
  </TableContainer>
);

