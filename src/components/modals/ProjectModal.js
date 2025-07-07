"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimes, FaProjectDiagram, FaUser, FaCalendarAlt, FaFileAlt, FaTags } from "react-icons/fa"
import Button from "../Button"
import { toast } from "react-toastify"
import { getemployeeList, postProject } from "../../services/productServices"

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

const ProjectModal = ({ isOpen, onClose,setRefresh,refresh }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name:"",
    project_code: "",
    start_date: "",
    end_date: "",
    call_mode:"ADD_PROJECT",
    employee_list:"",
    emp_id:""
  })
  const [employees, setEmployees] = useState([])
  console.log(employees,"data")
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Replace this with your actual API call
        const response = await getemployeeList()
        setEmployees(response.data)
        setLoading(false)
      } catch (err) {
        toast.error(`Failed to fetch employees: ${err.message}`)
        setLoading(false)
      }
    }

    fetchEmployees()
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // // Validation
    // if (!formData.name || !formData.type || !formData.description || !formData.employeeId) {
    //   toast.error("Please fill in all required fields")
    //   setLoading(false)
    //   return
    // }
   const submissionData = {
        ...formData,
        start_date: formData.start_date ? formatDate(new Date(formData.start_date)) : "",
        end_date: formData.end_date ? formatDate(new Date(formData.end_date)) : "",
      }
    try {
     const response= await postProject(submissionData)
     if (response.status === 200) {
        toast.success("Project created successfully")
        setRefresh((prev) => prev + 1) // Trigger refresh 
      // Reset form
    setFormData({
    name:"",
    project_code: "",
    start_date: "",
    end_date: "",
    call_mode:"ADD_PROJECT",
    employee_list:"",
    emp_id:""
      })
    onClose() // Close modal after submission
    }
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
    setFormData((prev) => ({
      ...prev,
      emp_id: employeeId,
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
                  id="project_code"
                  name="project_code"
                  type="text"
                  placeholder="Enter project code"
                  value={formData.project_code}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                  <FaTags style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                </div>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="emp_id">Project Lead</FormLabel>
                <div style={{ position: "relative" }}>
                  <FormSelect
                    id="emp_id"
                    name="emp_id"
                    // value={formData.emp_id}
                    onChange={handleEmployeeChange}
                    required
                    style={{ paddingLeft: "2rem" }}
                  >
                    <option value="">Select employee</option>
                    {employees.map((employee) => (
                      <option key={employee.emp_id} value={employee.emp_id}>
                        {employee.name}
                      </option>
                    ))}
                  </FormSelect>
                  <FaUser style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                </div>
              </FormGroup>
            </FormRow>

           
                <FormGroup>
                <FormLabel htmlFor="status">Status</FormLabel>
                <FormSelect id="status" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </FormSelect>
              </FormGroup>
            

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="start_date">Start Date</FormLabel>
                <div style={{ position: "relative" }}>
                  <FormInput
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    style={{ paddingLeft: "2rem" }}
                  />
                  <FaCalendarAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                </div>
              </FormGroup>
                 <FormGroup>
                <FormLabel htmlFor="end_date">End Date</FormLabel>
                <div style={{ position: "relative" }}>
                  <FormInput
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
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
