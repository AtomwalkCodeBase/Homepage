"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaFileExport, FaFilter, FaChartBar, FaProjectDiagram } from "react-icons/fa"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getprojectreport } from "../services/productServices"
import { useExport } from "../context/ExportContext"
import { theme } from "../styles/Theme"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const ReportHeader = styled.div`
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

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text};
`

const FilterSelect = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`

const TableContainer = styled.div`
  overflow-x: auto;
`

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

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const SummaryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  ${(props) =>
    props.color === "primary" &&
    `
    background: ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primary};
  `}
  
  ${(props) =>
    props.color === "secondary" &&
    `
    background: ${props.theme.colors.secondaryLight};
    color: ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.color === "success" &&
    `
    background: ${props.theme.colors.success}22;
    color: ${props.theme.colors.success};
  `}
  
  ${(props) =>
    props.color === "warning" &&
    `
    background: ${props.theme.colors.warning}22;
    color: ${props.theme.colors.warning};
  `}
`

const SummaryValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`

const ChartContainer = styled.div`
  height: 300px;
  margin-bottom: 2rem;
`

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const ProjectReport = () => {
  const [activeTab, setActiveTab] = useState("table")
  const [projectData, setProjectData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { exportToExcel } = useExport()

  // Get current month's date range
  const getCurrentMonthRange = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()

    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)

    // Format as DD-MM-YYYY for display
    const formatDisplayDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      return `${year}-${month}-${day}`
    }

    return {
      start: formatDisplayDate(startDate),
      end: formatDisplayDate(endDate),
    }
  }

  const [dateRange, setDateRange] = useState(getCurrentMonthRange())

  useEffect(() => {
    fetchProjectReport()
  }, [dateRange])

  const fetchProjectReport = async () => {
    try {
      setLoading(true)
      setError(null)

      // Format dates for API call (DD-MM-YYYY)
      const formatApiDate = (dateStr) => {
        const date = new Date(dateStr)
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      }

      const startDate = formatApiDate(dateRange.start)
      const endDate = formatApiDate(dateRange.end)

      const response = await getprojectreport(startDate, endDate)

      if (response && response.data) {
        setProjectData(response.data)
      } else {
        setError("Failed to fetch project report data")
      }
    } catch (err) {
      console.error("Error fetching project report:", err)
      setError("Error loading project report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    fetchProjectReport()
  }

  const handleExport = () => {
    // Prepare data for export
    const exportData = []

    projectData.forEach((project) => {
      project.emp_list.forEach((emp) => {
        emp.record_list.forEach((record) => {
          exportData.push({
            project_code: project.project_code,
            project_title: project.title,
            project_manager: project.project_manager,
            employee_id: emp.emp_id,
            date: record.a_date,
            effort_hours: record.effort,
            total_project_effort: project.total_effort,
            employee_total_effort: emp.total_effort,
          })
        })
      })
    })

    exportToExcel(exportData, "project_report", "Project Report")
  }

  // Calculate summary data
  const totalProjects = projectData.length
  const totalEffort = projectData.reduce((sum, project) => sum + Number(project.total_effort || 0), 0)
  const totalEmployees = new Set(projectData.flatMap((project) => project.emp_list.map((emp) => emp.emp_id))).size
  const avgEffortPerProject = totalProjects > 0 ? (totalEffort / totalProjects).toFixed(1) : 0

  // Prepare chart data
  const prepareProjectChartData = () => {
    return {
      labels: projectData.map((p) => p.project_code),
      datasets: [
        {
          label: "Total Effort (Hours)",
          data: projectData.map((p) => p.total_effort),
          backgroundColor: theme.colors.primary + "80",
          borderColor: theme.colors.primary,
          borderWidth: 1,
        },
      ],
    }
  }

  const prepareEmployeeChartData = () => {
    const employeeData = {}
    projectData.forEach((project) => {
      project.emp_list.forEach((emp) => {
        employeeData[emp.emp_id] = (employeeData[emp.emp_id] || 0) + emp.total_effort
      })
    })

    return {
      labels: Object.keys(employeeData),
      datasets: [
        {
          data: Object.values(employeeData),
          backgroundColor: [
            theme.colors.primary + "80",
            theme.colors.secondary + "80",
            "#10B98180",
            "#F59E0B80",
            "#EF444480",
            "#8B5CF680",
          ],
          borderColor: [theme.colors.primary, theme.colors.secondary, "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
          borderWidth: 1,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }

  const summaryData = [
    {
      icon: <FaProjectDiagram />,
      value: totalProjects,
      label: "Total Projects",
      color: "primary",
    },
    {
      icon: <FaChartBar />,
      value: totalEffort,
      label: "Total Hours",
      color: "secondary",
    },
    {
      icon: <FaChartBar />,
      value: totalEmployees,
      label: "Active Employees",
      color: "success",
    },
    {
      icon: <FaChartBar />,
      value: avgEffortPerProject,
      label: "Avg Hours/Project",
      color: "warning",
    },
  ]

  return (
    <Layout title="Project Report">
      <ReportHeader>
        <div>
          <FilterSelect>View and analyze project effort data</FilterSelect>
        </div>
        <Button variant="primary" onClick={handleExport}>
          <FaFileExport /> Export Report
        </Button>
      </ReportHeader>

      <SummaryGrid>
        {summaryData.map((item, index) => (
          <SummaryCard key={index}>
            <SummaryIcon color={item.color}>{item.icon}</SummaryIcon>
            <SummaryValue>{item.value}</SummaryValue>
            <SummaryLabel>{item.label}</SummaryLabel>
          </SummaryCard>
        ))}
      </SummaryGrid>

      <Card>
        <FilterContainer>
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
          <Button variant="outline" size="sm" onClick={handleFilter}>
            <FaFilter /> Filter
          </Button>
        </FilterContainer>

        <TabContainer>
          <Tab active={activeTab === "table"} onClick={() => setActiveTab("table")}>
            Project Table
          </Tab>
          <Tab active={activeTab === "charts"} onClick={() => setActiveTab("charts")}>
            Charts & Analytics
          </Tab>
          <Tab active={activeTab === "details"} onClick={() => setActiveTab("details")}>
            Detailed Report
          </Tab>
        </TabContainer>

        {activeTab === "table" && (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Project Code</th>
                  <th>Title</th>
                  <th>Project Manager</th>
                  <th>Team Size</th>
                  <th>Total Effort</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Loading project data...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "red" }}>
                      {error}
                    </td>
                  </tr>
                ) : projectData.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No project data found for the selected date range
                    </td>
                  </tr>
                ) : (
                  projectData.map((project, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{project.project_code}</strong>
                      </td>
                      <td>{project.title}</td>
                      <td>{project.project_manager}</td>
                      <td>{project.emp_list.length}</td>
                      <td>
                        <Badge variant="primary">{project.total_effort} hours</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableContainer>
        )}

        {activeTab === "charts" && (
          <div>
            <ChartGrid>
              <Card>
                <h3 style={{ marginBottom: "1rem" }}>Project Effort Distribution</h3>
                <ChartContainer>
                  <Bar data={prepareProjectChartData()} options={chartOptions} />
                </ChartContainer>
              </Card>

              <Card>
                <h3 style={{ marginBottom: "1rem" }}>Employee Effort Distribution</h3>
                <ChartContainer>
                  <Pie data={prepareEmployeeChartData()} options={chartOptions} />
                </ChartContainer>
              </Card>
            </ChartGrid>
          </div>
        )}

        {activeTab === "details" && (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Project Code</th>
                  <th>Employee ID</th>
                  <th>Date</th>
                  <th>Effort (Hours)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      Loading detailed data...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "red" }}>
                      {error}
                    </td>
                  </tr>
                ) : projectData.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      No detailed data found for the selected date range
                    </td>
                  </tr>
                ) : (
                  projectData.flatMap((project) =>
                    project.emp_list.flatMap((emp) =>
                      emp.record_list.map((record, recordIndex) => (
                        <tr key={`${project.project_code}-${emp.emp_id}-${recordIndex}`}>
                          <td>{project.project_code}</td>
                          <td>{emp.emp_id}</td>
                          <td>{record.a_date}</td>
                          <td>{record.effort}</td>
                        </tr>
                      )),
                    ),
                  )
                )}
              </tbody>
            </table>
          </TableContainer>
        )}
      </Card>
    </Layout>
  )
}

export default ProjectReport
