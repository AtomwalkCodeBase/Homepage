"use client"

import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { FaTimes, FaUsers, FaSearch, FaUserMinus } from "react-icons/fa"
import { useTheme } from "../../context/ThemeContext"
import Button from "../Button"
import { toast } from "react-toastify"
import { getemployeeList } from "../../services/productServices"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.4s ease-out;
  
  @keyframes fadeIn {
    from {
      transform: translateY(-30px) scale(0.97);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  background: ${({ theme }) => theme.colors.primaryLight || "#f1f7ff"};
  border-radius: 16px 16px 0 0;
`

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary || "#3a86ff"};
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary || "#3a86ff"};
    border-radius: 4px;
    margin-right: 12px;
  }
`

const CloseButton = styled.button`
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight || "#8e98a4"};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: ${({ theme }) => theme.colors.error || "#ff5252"};
    transform: rotate(90deg);
  }
`

const ModalBody = styled.div`
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
`

const ProjectInfo = styled.div`
  background: ${({ theme }) => theme.colors.background || "#f8f9fa"};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`

const ProjectName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`

const ProjectCode = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
`

const EmployeeList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: white;
`

const EmployeeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  ${(props) =>
    props.selected &&
    `
    background-color: ${props.theme.colors.primaryLight};
    border-color: ${props.theme.colors.primary};
  `}
`

const Checkbox = styled.input`
  margin-right: 0.75rem;
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const EmployeeInfo = styled.div`
  flex: 1;
`

const EmployeeName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`

const EmployeeDepartment = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const SelectedCount = styled.div`
  margin: 1rem 0;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.success}22;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 500;
  text-align: center;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const AssignedUsersSection = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.colors.success};
`

const SectionTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  font-size: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.success};
  }
`

const AssignedUserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const AssignedUserPill = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.errorDark};
  }
`

const AssignUserModal = ({ isOpen, onClose, onSubmit, project }) => {
  const { theme } = useTheme()
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [assignedEmployees, setAssignedEmployees] = useState([])

  useEffect(() => {
    if (isOpen) {
      fetchEmployees()
      // Pre-populate selected employees if project has existing assignments
      if (project && project.additional_fld_list) {
        const existingEmployees = project.additional_fld_list.split("|").filter((emp) => emp.trim())
        setSelectedEmployees(existingEmployees)
        // Find the employee details for the assigned users
        const fetchAssignedEmployees = async () => {
          try {
            const response = await getemployeeList()
            const assigned = response.data.filter(emp => existingEmployees.includes(emp.emp_id))
            setAssignedEmployees(assigned)
          } catch (error) {
            console.error("Error fetching assigned employees:", error)
          }
        }
        fetchAssignedEmployees()
      } else {
        setSelectedEmployees([])
        setAssignedEmployees([])
      }
    }
  }, [isOpen, project])

  useEffect(() => {
    if (searchTerm) {
      const filtered = employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.emp_id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredEmployees(filtered)
    } else {
      setFilteredEmployees(employees)
    }
  }, [searchTerm, employees])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await getemployeeList()
      setEmployees(response.data || [])
    } catch (error) {
      toast.error("Failed to fetch employees")
      console.error("Error fetching employees:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEmployeeToggle = (empId) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(empId)) {
        return prev.filter((id) => id !== empId)
      } else {
        return [...prev, empId]
      }
    })
  }

  const handleUnassign = (empId) => {
    setSelectedEmployees(prev => prev.filter(id => id !== empId))
    setAssignedEmployees(prev => prev.filter(emp => emp.emp_id !== empId))
  }

  const handleSubmit = () => {
    if (selectedEmployees.length === 0) {
      toast.warning("Please select at least one employee")
      return
    }
    onSubmit(selectedEmployees)
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.emp_id))
    }
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Assign Team Members</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {project && (
            <ProjectInfo>
              <ProjectName>{project.title}</ProjectName>
              <ProjectCode>Project Code: {project.project_code}</ProjectCode>
            </ProjectInfo>
          )}

          {/* New section for assigned users */}
          {(assignedEmployees.length > 0 || selectedEmployees.length > 0) && (
            <AssignedUsersSection>
              <SectionTitle>
                <FaUsers />
                Currently Assigned Team Members
              </SectionTitle>
              <AssignedUserList>
                {[...assignedEmployees, ...employees.filter(emp => 
                  selectedEmployees.includes(emp.emp_id) && !assignedEmployees.some(a => a.emp_id === emp.emp_id)
                )].map((employee) => (
                  <AssignedUserPill key={employee.emp_id}>
                    {employee.name} ({employee.emp_id})
                    <RemoveButton 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUnassign(employee.emp_id)
                      }}
                      title="Unassign"
                    >
                      <FaUserMinus size={12} />
                    </RemoveButton>
                  </AssignedUserPill>
                ))}
              </AssignedUserList>
            </AssignedUsersSection>
          )}

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
          </SearchContainer>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedEmployees.length === filteredEmployees.length ? "Deselect All" : "Select All"}
            </Button>
            <span style={{ color: theme.colors.textLight, fontSize: "0.9rem" }}>
              {filteredEmployees.length} employees found
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p>Loading employees...</p>
            </div>
          ) : (
            <EmployeeList>
              {filteredEmployees.map((employee) => (
                <EmployeeItem
                  key={employee.emp_id}
                  selected={selectedEmployees.includes(employee.emp_id)}
                  onClick={() => handleEmployeeToggle(employee.emp_id)}
                >
                  <Checkbox
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.emp_id)}
                    onChange={() => handleEmployeeToggle(employee.emp_id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <EmployeeInfo>
                    <EmployeeName>{employee.name}</EmployeeName>
                    <EmployeeDepartment>
                      {employee.emp_id} • {employee.department_name || "No Department"}
                    </EmployeeDepartment>
                  </EmployeeInfo>
                </EmployeeItem>
              ))}
            </EmployeeList>
          )}

          {selectedEmployees.length > 0 && (
            <SelectedCount>
              <FaUsers style={{ marginRight: "0.5rem" }} />
              {selectedEmployees.length} employee{selectedEmployees.length > 1 ? "s" : ""} selected
            </SelectedCount>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={selectedEmployees.length === 0}>
            {project?.additional_fld_list ? "Update Assignments" : "Assign Selected"} ({selectedEmployees.length})
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default AssignUserModal
