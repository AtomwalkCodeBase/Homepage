"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaPlus, FaEye, FaEdit, FaFilter, FaProjectDiagram, FaUser, FaSpinner, FaUserEdit, FaFileExport } from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import ProjectModal from "../components/modals/ProjectModal"
import AssignUserModal from "../components/modals/AssignUserModal"
import ViewProjectModal from "../components/modals/ViewProjectModal"
import { useExport } from "../context/ExportContext"
import { toast } from "react-toastify"
import { getProjectlist, postProject } from "../services/productServices"
const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};
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

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
`

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  min-width: 250px;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`

const TableContainer = styled.div`
  overflow-x: auto;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
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

const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isOpen, setIsOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [isLoading, setIsLoading] = useState(true)
  const [refresh, setRefresh] = useState(1)
  const { exportToExcel } = useExport()

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await getProjectlist() // Assuming this is your API call function
      setProjects(response.data || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast.error("Failed to fetch projects")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [refresh])

  useEffect(() => {
    let filtered = projects

    // Filter by active tab
    if (activeTab === "active") {
      filtered = filtered.filter((project) => project.project_status === "02")
    } else if (activeTab === "completed") {
      filtered = filtered.filter((project) => project.project_status === "03")
    } else if (activeTab === "onhold") {
      filtered = filtered.filter((project) => project.project_status === "04")
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          project?.project_code?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          project?.project_manager?.toLowerCase().includes(searchTerm?.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "All Status") {
      filtered = filtered.filter((project) => getStatusLabel(project.project_status) === statusFilter)
    }

    // Filter by type
    if (typeFilter !== "All Types") {
      filtered = filtered.filter((project) => getTypeLabel(project.project_type) === typeFilter)
    }

    setFilteredProjects(filtered)
  }, [projects, activeTab, searchTerm, statusFilter, typeFilter])

  const handleExport = () => {
    const exportData = filteredProjects.map((project) => ({
      "Project ID": project.id,
      "Project Name": project.title,
      "Project Code": project.project_code,
      "Project Type": getTypeLabel(project.project_type),
      Status: getStatusLabel(project.project_status),
      "Start Date": project.start_date,
      "End Date": project.end_date || "N/A",
      "Project Manager": project.project_manager,
      "Team Members": project.additional_fld_list ? project.additional_fld_list.split("|").join(", ") : "N/A",
    }))

    exportToExcel(exportData, "project_list")
    toast.success("Project list exported successfully")
  }

  const handleAssignUser = (project) => {
    setSelectedProject(project)
    setIsAssignModalOpen(true)
  }

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setIsOpen(true)
  }

  const handleViewProject = (project) => {
    setSelectedProject(project)
    setIsViewModalOpen(true)
  }

  const handleAssignSubmit = async (selectedEmployees) => {
    if (!selectedProject) return

    const employeeList = selectedEmployees.join("|")
    const empId = selectedEmployees.length > 0 ? selectedEmployees[0] : ""

    const updateData = {
      project_code: selectedProject.project_code,
      call_mode: "UPDATE_EMP_LIST",
      start_date: selectedProject.start_date,
      end_date: selectedProject.end_date || "",
      name: selectedProject.title,
      emp_id: empId,
      employee_list: employeeList,
    }

    try {
      const response = await postProject(updateData)
      if (response.status === 200) {
        toast.success("Employees assigned successfully")
        setRefresh((prev) => prev + 1)
        setIsAssignModalOpen(false)
        setSelectedProject(null)
      }
    } catch (error) {
      toast.error(`Failed to assign employees: ${error.response?.data?.detail || error.message}`)
    }
  }

  // Helper functions to map codes to labels
  const getStatusLabel = (statusCode) => {
    switch (statusCode) {
      case "02":
        return "Active"
      case "03":
        return "Completed"
      case "04":
        return "On Hold"
      default:
        return "Unknown"
    }
  }

  const getTypeLabel = (typeCode) => {
    switch (typeCode) {
      case "N":
        return "Normal"
      case "P":
        return "Premium"
      case "E":
        return "Express"
      default:
        return "Other"
    }
  }

  const getUniqueTypes = () => {
    const uniqueTypes = new Set(projects.map((project) => getTypeLabel(project.project_type)))
    return ["All Types", ...Array.from(uniqueTypes)]
  }

  // Calculate summary data
  const totalProjects = projects.length
  const activeProjects = projects.filter((p) => p.project_status === "02").length
  const completedProjects = projects.filter((p) => p.project_status === "03").length
  const onHoldProjects = projects.filter((p) => p.project_status === "04").length

  const summaryData = [
    {
      icon: <FaProjectDiagram />,
      value: totalProjects,
      label: "Total Projects",
      color: "primary",
    },
    {
      icon: <FaProjectDiagram />,
      value: activeProjects,
      label: "Active Projects",
      color: "success",
    },
    {
      icon: <FaProjectDiagram />,
      value: completedProjects,
      label: "Completed Projects",
      color: "secondary",
    },
    // {
    //   icon: <FaProjectDiagram />,
    //   value: onHoldProjects,
    //   label: "On Hold Projects",
    //   color: "warning",
    // },
  ]

  const getStatusInfo = (statusCode) => {
    switch (statusCode) {
      case "02":
        return { variant: "success", label: "Active" }
      case "03":
        return { variant: "primary", label: "Completed" }
      case "04":
        return { variant: "warning", label: "On Hold" }
      default:
        return { variant: "secondary", label: "Unknown" }
    }
  }

  return (
    <Layout title="Project Management">
      <ProjectHeader>
        <div>
          <Paragraphdata>Manage and track all your projects</Paragraphdata>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {/* <Button variant="outline" onClick={handleExport}>
            <FaFileExport /> Export
          </Button> */}
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            <FaPlus /> Add Project
          </Button>
        </div>
      </ProjectHeader>

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
        <TabContainer>
          <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            All Projects
          </Tab>
          <Tab active={activeTab === "active"} onClick={() => setActiveTab("active")}>
            Active
          </Tab>
          <Tab active={activeTab === "completed"} onClick={() => setActiveTab("completed")}>
            Completed
          </Tab>
          {/* <Tab active={activeTab === "onhold"} onClick={() => setActiveTab("onhold")}>
            On Hold
          </Tab> */}
        </TabContainer>

        <FilterContainer>
          <SearchInput
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Active</option>
            <option>Completed</option>
            {/* <option>On Hold</option> */}
          </FilterSelect>

          {/* <FilterSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            {getUniqueTypes().map((type, index) => (
              <option key={index}>{type}</option>
            ))}
          </FilterSelect> */}

          <Button variant="outline" size="sm">
            <FaFilter /> Filter
          </Button>
        </FilterContainer>

        {isLoading ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <FaSpinner size="lg" />
            <p>Loading projects...</p>
          </div>
        ) : (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Project Code</th>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Project Manager</th>
                  {/* <th>Team Members</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => {
                    const statusInfo = getStatusInfo(project.project_status)
                    return (
                      <tr key={project.id}>
                        <td>{project.project_code}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>
                              <FaProjectDiagram />
                            </span>
                            {project.title}
                          </div>
                        </td>
                        <td>
                          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                        </td>
                        <td>{project.start_date}</td>
                        <td>{project.end_date || "N/A"}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>
                              <FaUser />
                            </span>
                            {project.project_manager}
                          </div>
                        </td>
                        {/* <td>
                          {project.additional_fld_list
                            ? project.additional_fld_list.split("|").map((emp, i) => (
                                <Badge key={i} variant="outline" style={{ margin: "0.2rem" }}>
                                  {emp}
                                </Badge>
                              ))
                            : "N/A"}
                        </td> */}
                        <td>
                          <ActionButtons>
                            <Button
                              variant="primary"
                              size="sm"
                              title="Assign user"
                              onClick={() => handleAssignUser(project)}
                            >
                              <FaUserEdit />
                            </Button>
                            <Button variant="ghost" size="sm" title="View" onClick={() => handleViewProject(project)}>
                              <FaEye />
                            </Button>
                            <Button variant="outline" size="sm" title="Edit" onClick={() => handleEditProject(project)}>
                              <FaEdit />
                            </Button>
                          </ActionButtons>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", padding: "2rem" }}>
                      No projects found for the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <TableActions style={{float:"right"}}>
          <Button variant="primary" onClick={handleExport} size="sm">
            <FaFileExport /> Export
          </Button>
          </TableActions>
          </TableContainer>
        )}
      </Card>
      <ProjectModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setSelectedProject(null)
        }}
        setRefresh={setRefresh}
        refresh={refresh}
        editData={selectedProject}
      />

      <AssignUserModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false)
          setSelectedProject(null)
        }}
        onSubmit={handleAssignSubmit}
        project={selectedProject}
      />

      <ViewProjectModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedProject(null)
        }}
        project={selectedProject}
      />
    </Layout>
  )
}

export default ProjectManagement
