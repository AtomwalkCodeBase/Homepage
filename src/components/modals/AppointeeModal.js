"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaIdCard, FaPercentage, FaFileAlt } from "react-icons/fa"
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
  max-width: 600px;
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

const FileUploadContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight}22;
  }
`

const FileUploadIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`

const FileUploadText = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`

const FileInput = styled.input`
  display: none;
`

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  
  span {
    flex: 1;
    margin-left: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;
  }
`

const AppointeeModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("appointee")
  const [formData, setFormData] = useState({
    // Appointee Information
    name: "",
    relation: "",
    email: "",
    phone: "",
    address: "",
    type: "Primary",

    // Nominee Information
    percentage: "",
    documentType: "",
    documentNumber: "",
    files: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files)],
      }))
    }
  }

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process form submission
    // In a real app, you would send this data to your API
    onClose()
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Add New Appointee</ModalTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <TabContainer>
              <Tab active={activeTab === "appointee"} onClick={() => setActiveTab("appointee")}>
                <FaUser style={{ marginRight: "0.5rem" }} />
                Appointee Information
              </Tab>
              <Tab active={activeTab === "nominee"} onClick={() => setActiveTab("nominee")}>
                <FaIdCard style={{ marginRight: "0.5rem" }} />
                Nominee Details
              </Tab>
            </TabContainer>

            {activeTab === "appointee" && (
              <>
                <FormGroup>
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <FormInput id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="relation">Relation</FormLabel>
                  <FormSelect id="relation" name="relation" value={formData.relation} onChange={handleChange} required>
                    <option value="">Select Relation</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </FormSelect>
                </FormGroup>

                <FormRow>
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
                </FormRow>

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

                <FormGroup>
                  <FormLabel htmlFor="type">Appointee Type</FormLabel>
                  <FormSelect id="type" name="type" value={formData.type} onChange={handleChange} required>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </FormSelect>
                </FormGroup>
              </>
            )}

            {activeTab === "nominee" && (
              <>
                <FormGroup>
                  <FormLabel htmlFor="percentage">Percentage Share</FormLabel>
                  <div style={{ position: "relative" }}>
                    <FormInput
                      id="percentage"
                      name="percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.percentage}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "2rem" }}
                    />
                    <FaPercentage style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                  </div>
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="documentType">Document Type</FormLabel>
                    <FormSelect
                      id="documentType"
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Document Type</option>
                      <option value="ID Card">ID Card</option>
                      <option value="Passport">Passport</option>
                      <option value="Birth Certificate">Birth Certificate</option>
                      <option value="Marriage Certificate">Marriage Certificate</option>
                      <option value="Other">Other</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="documentNumber">Document Number</FormLabel>
                    <div style={{ position: "relative" }}>
                      <FormInput
                        id="documentNumber"
                        name="documentNumber"
                        type="text"
                        value={formData.documentNumber}
                        onChange={handleChange}
                        required
                        style={{ paddingLeft: "2rem" }}
                      />
                      <FaIdCard style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
                    </div>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel>Document Upload</FormLabel>
                  <FileUploadContainer onClick={() => document.getElementById("document-upload").click()}>
                    <FileInput id="document-upload" type="file" multiple onChange={handleFileChange} />
                    <FileUploadIcon>
                      <FaFileAlt />
                    </FileUploadIcon>
                    <FileUploadText>Click to upload or drag and drop files here</FileUploadText>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>Supported formats: JPG, PNG, PDF (Max 5MB)</div>
                  </FileUploadContainer>

                  {formData.files.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                      <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                        Uploaded Files ({formData.files.length})
                      </div>
                      {formData.files.map((file, index) => (
                        <UploadedFile key={index}>
                          <FaFileAlt />
                          <span>{file.name}</span>
                          <button type="button" onClick={() => removeFile(index)}>
                            <FaTimes />
                          </button>
                        </UploadedFile>
                      ))}
                    </div>
                  )}
                </FormGroup>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {activeTab === "nominee" ? "Add Appointee" : "Next"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default AppointeeModal
