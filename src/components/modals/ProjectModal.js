"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaTimes, FaProjectDiagram, FaUser, FaCalendarAlt, FaFileAlt, FaTags } from "react-icons/fa"
import Button from "../Button"
import { toast } from "react-toastify"

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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
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

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const ProjectModal = ({ isOpen, onClose, onSubmit, isLoading, setIsLoading }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    employeeId: "",
    assignedEmployee: "",
    status: "Active",
    endDate: "",
  })

  // Mock employee data
  const employees = [
    { id: 1, name: "John Doe", department: "Development" },
    { id: 2, name: "Jane Smith", department: "Design" },
    { id: 3, name: "Mike Johnson", department: "Development" },
    { id: 4, name: "Sarah Wilson", department: "Analytics" },
    { id: 5, name: "David Brown", department: "Testing" },
    { id: 6, name: "Lisa Davis", department: "Project Management" },
    { id: 7, name: "Tom Wilson", department: "Development" },
    { id: 8, name: "Emma Taylor", department: "Design" },
  ]

  const projectTypes = [
    "Web Development",
    "Mobile Development",
    "Desktop Application",
    "Data Analytics",
    "Machine Learning",
    "DevOps",
    "Testing & QA",
    "UI/UX Design",
    "Database Design",
    "API Development",
    "E-commerce",
    "CRM System",
    "ERP System",
    "Other",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.name || !formData.type || !formData.description || !formData.employeeId) {
      toast.error("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSubmit(formData)

      // Reset form
      setFormData({
        name: "",
        type: "",
        description: "",
        employeeId: "",
        assignedEmployee: "",
        status: "Active",
        endDate: "",
      })
    } catch (error) {
      toast.error(`${error.response?.data?.detail || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value
    const selectedEmployee = employees.find((emp) => emp.id.toString() === employeeId)

    setFormData((prev) => ({
      ...prev,
      employeeId: employeeId,
      assignedEmployee: selectedEmployee ? selectedEmployee.name : "",
    }))
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Add New Project</ModalTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <FormLabel htmlFor="name">Project Name *</FormLabel>
              <div style={{ position: "relative" }}>
                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                <FaProjectDiagram style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
              </div>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="type">Project Code *</FormLabel>
                <div style={{ position: "relative" }}>
                  <FormInput
                  id="type"
                  name="type"
                  type="text"
                  placeholder="Enter project code"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                  <FaTags style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                </div>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="employeeId">Assign Employee *</FormLabel>
                <div style={{ position: "relative" }}>
                  <FormSelect
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleEmployeeChange}
                    required
                    style={{ paddingLeft: "2rem" }}
                  >
                    <option value="">Select employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} - {employee.department}
                      </option>
                    ))}
                  </FormSelect>
                  <FaUser style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                </div>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel htmlFor="description">Project Description *</FormLabel>
              <div style={{ position: "relative" }}>
                <FormTextarea
                  id="description"
                  name="description"
                  placeholder="Enter detailed project description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2rem", paddingTop: "0.75rem" }}
                />
                <FaFileAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
              </div>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="status">Status</FormLabel>
                <FormSelect id="status" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="endDate">Expected Start Date</FormLabel>
                <div style={{ position: "relative" }}>
                  <FormInput
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    style={{ paddingLeft: "2rem" }}
                  />
                  <FaCalendarAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                </div>
              </FormGroup>
            </FormRow>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default ProjectModal
