"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBuilding, FaIdCard, FaCalendarAlt } from "react-icons/fa"
import Button from "../Button"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
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
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const EmployeeModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",

    // Employment Details
    employeeId: "",
    department: "",
    position: "",
    joinDate: "",
    employmentType: "",
    reportingManager: "",

    // Address Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process form submission
    console.log("Adding employee:", formData)
    // In a real app, you would send this data to your API
    onClose()
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Add Employee</ModalTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <TabContainer>
              <Tab active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
                <FaUser style={{ marginRight: "0.5rem" }} />
                Personal Information
              </Tab>
              <Tab active={activeTab === "employment"} onClick={() => setActiveTab("employment")}>
                <FaBuilding style={{ marginRight: "0.5rem" }} />
                Employment Details
              </Tab>
              <Tab active={activeTab === "address"} onClick={() => setActiveTab("address")}>
                <FaIdCard style={{ marginRight: "0.5rem" }} />
                Address Information
              </Tab>
            </TabContainer>

            {activeTab === "personal" && (
              <>
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <FormInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <div style={{ position: "relative" }}>
                    <FormInput
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "2rem" }}
                    />
                    <FaEnvelope style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                  </div>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <div style={{ position: "relative" }}>
                    <FormInput
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "2rem" }}
                    />
                    <FaPhone style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                  </div>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                  <div style={{ position: "relative" }}>
                    <FormInput
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "2rem" }}
                    />
                    <FaCalendarAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                  </div>
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <FormSelect id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="maritalStatus">Marital Status</FormLabel>
                    <FormSelect
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </FormSelect>
                  </FormGroup>
                </FormRow>
              </>
            )}

            {activeTab === "employment" && (
              <>
                <FormGroup>
                  <FormLabel htmlFor="employeeId">Employee ID</FormLabel>
                  <FormInput
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="department">Department</FormLabel>
                    <FormSelect
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="position">Position</FormLabel>
                    <FormInput
                      id="position"
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel htmlFor="joinDate">Join Date</FormLabel>
                  <div style={{ position: "relative" }}>
                    <FormInput
                      id="joinDate"
                      name="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "2rem" }}
                    />
                    <FaCalendarAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                  </div>
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="employmentType">Employment Type</FormLabel>
                    <FormSelect
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="reportingManager">Reporting Manager</FormLabel>
                    <FormInput
                      id="reportingManager"
                      name="reportingManager"
                      type="text"
                      value={formData.reportingManager}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
              </>
            )}

            {activeTab === "address" && (
              <>
                <FormGroup>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <FormInput
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <FormInput
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="state">State/Province</FormLabel>
                    <FormInput
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="zipCode">Zip/Postal Code</FormLabel>
                    <FormInput
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <FormSelect id="country" name="country" value={formData.country} onChange={handleChange} required>
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="India">India</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="Other">Other</option>
                    </FormSelect>
                  </FormGroup>
                </FormRow>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {activeTab === "address" ? "Add Employee" : "Next"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default EmployeeModal
