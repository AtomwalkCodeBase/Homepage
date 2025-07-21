"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimes, FaUpload, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa"
import Button from "../Button"
import { toast } from "react-toastify"
import { postClaim } from "../../services/productServices"

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
  background: ${({ theme }) => theme.colors.primaryLight || '#f1f7ff'};
  border-radius: 16px 16px 0 0;
`

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary || '#3a86ff'};
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
  color: ${({ theme }) => theme.colors.textLight || '#8e98a4'};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: ${({ theme }) => theme.colors.error || '#ff5252'};
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
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

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`
const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-weight: 500;
  display: ${props => props.show ? 'block' : 'none'};
  margin-bottom: 1rem;`

const ClaimModal = ({ isOpen, onClose, dropdownValue, projecttype,setIsLoadings,isLoadings,masterClaimId,claimupdate }) => {
  console.log(claimupdate,"dropdownValue")
  const [isLoading, setIsLoading] = useState(false)
  const [isFileError, setIsFileError] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    projecttype: "",
    amount: "",
    date: "",
    description: "",
    files:null,
    emp_id:localStorage.getItem("empId"),
  })

  const selectedItem = Array.isArray(dropdownValue)? dropdownValue.find(item => item.id == formData.type) : null;
  const isReceiptRequired = selectedItem ? selectedItem.is_exp_bill_required : false;


useEffect(() => {
  const fileFromUrl = (url) => {
    if (!url) return null;
    const name = url.split("/").pop().split("?")[0];
    return { uri: url, name };
  };

  if (claimupdate?.item_id) {
    setFormData({
      type: claimupdate.item_id ?? "",
      projecttype: claimupdate.project_id ?? "",
      amount: claimupdate.expense_amt ?? "",
      date: claimupdate.expense_date
        ? (() => {
            // Convert "03-Jul-2025" to "yyyy-mm-dd"
            const [day, monStr, year] = claimupdate.expense_date.split("-");
            const months = {
              Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
              Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
            };
            const month = months[monStr] || "01";
            return `${year}-${month}-${day}`;
          })()
        : "",
      description: claimupdate.remarks ?? "",
      files: fileFromUrl(claimupdate.submitted_file_1),
      emp_id: localStorage.getItem("empId"),
    });
  } else {
    setFormData({
      type: "",
      projecttype: "",
      amount: "",
      date: "",
      description: "",
      files: null,
      emp_id: localStorage.getItem("empId"),
    });
  }
}, [claimupdate]);
console.log(formData," formData")
  const handleSubmit = async (e) => {
    const { value } = e.nativeEvent.submitter;
    e.preventDefault()
    setIsLoading(true) // Show loader during submission

    // Validate file only if required
    if (isReceiptRequired && !formData.files) {
      setIsFileError(true);
      setIsLoading(false);
      return;
    } else {
      setIsFileError(false);
    }

    const dateObj = new Date(formData.date)
    const expense_date = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`
    const formDatas = new FormData() 
    formDatas.append("file_1",  formData.files)
    formDatas.append("remarks", formData.description)
    formDatas.append("item", formData.type)
    formDatas.append("quantity", "1")
    formDatas.append("expense_amt", formData.amount)
    formDatas.append("expense_date", expense_date)
    formDatas.append("emp_id", formData.emp_id)
    formDatas.append("quantity", 1)
    if (value === "save") {
       formDatas.append("call_mode",claimupdate?.item_id?"CLAIM_UPDATE": "CLAIM_SAVE");
    }

    if (formData.projecttype) {
      formDatas.append("project_id", formData.projecttype)
    }
    if(masterClaimId) {
        formDatas.append('m_claim_id', masterClaimId);
    }
    if( claimupdate?.item_id) {
      formDatas.append("claim_id", claimupdate.id)
    }

    try {
      const res = await postClaim(formDatas)
      if (res.status === 200) {
        setIsLoadings(isLoadings + 1)
        toast.success("Add claim successfully")
        onClose() // Show success modal on successful submission
        setIsFileError(false)
        setFormData({
          type: "",
          projecttype: "",
          amount: "",
          date: "",
          description: "",
          files:null,
          emp_id:localStorage.getItem("empId"),
        })
      } else {
        console.log("Unexpected response:", res)
        toast.error("Claim Submission Error", "Failed to claim. Unexpected response.")
      }
    } catch (error) {
      toast.error(`${error.response?.data?.message || error.message}`)
      setIsFileError("Please upload a file")
      return
    } finally {
      setIsLoading(false)
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        files: (e.target.files[0]),
      }))
    }
  

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      files: null,
    }))
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle> Add New Claim</ModalTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <FormLabel htmlFor="type">Expense Item</FormLabel>
              <FormSelect id="type" name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Select Expense Item</option>
                {dropdownValue.map((value, index) => (
                  <option key={index} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            {projecttype.length > 0 && (
              <FormGroup>
                <FormLabel htmlFor="projecttype">Project Type</FormLabel>
                <FormSelect id="projecttype" name="projecttype" value={formData.projecttype} onChange={handleChange}>
                  <option value="">Select Project Type</option>
                  {projecttype.map((value, index) => (
                    <option key={index} value={value.id}>
                      {value.title}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
            )}
            <FormGroup>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <div style={{ position: "relative" }}>
                <FormInput
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                <FaMoneyBillWave style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
              </div>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="date">Date of Expense</FormLabel>
              <div style={{ position: "relative" }}>
                <FormInput
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                <FaCalendarAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
              </div>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormTextarea
                id="description"
                name="description"
                placeholder="Provide details about your expense claim"
                value={formData.description}
                onChange={e => {
                  if (e.target.value.length <= 100) {
                    handleChange(e)
                  }
                }}
                required
                maxLength={100}
              />
              <div style={{ fontSize: "0.8rem", color: "#888", textAlign: "right" }}>
                {formData.description.length}/100
              </div>
            </FormGroup>

            <FormGroup>
              <FormLabel>Receipts/Attachments</FormLabel>
              <FileUploadContainer onClick={() => document.getElementById("file-upload").click()}>
                <FileInput id="file-upload" name="file-upload" type="file"  onChange={handleFileChange}/>
                <FileUploadIcon>
                  <FaUpload />
                </FileUploadIcon>
                <FileUploadText>Click to upload or drag and drop files here</FileUploadText>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>Supported formats: JPG, PNG, PDF (Max 5MB)</div>
              </FileUploadContainer>
              <ErrorMessage show={isFileError && isReceiptRequired}>please upload or drag and drop files here</ErrorMessage>

              {formData.files && (
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                    Uploaded Files (1)
                  </div>
                    <UploadedFile >
                      <FaUpload />
                      <span>{formData?.files.name}</span>
                      <button type="button" onClick={() => removeFile(1)}>
                        <FaTimes />
                      </button>
                    </UploadedFile>
                </div>
              )}
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            {/* <Button  variant="primary" type="submit" disabled={isLoading} value="submit">
              {isLoading ? "Submitting..." : "Submit Claim"}
            </Button> */}
            <Button  variant="primary" type="submit" disabled={isLoading} value="save">
              {claimupdate.item_id?isLoading ? "Update..." : "Update Claim":isLoading ? "Saveing..." : "Save Claim"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default ClaimModal
