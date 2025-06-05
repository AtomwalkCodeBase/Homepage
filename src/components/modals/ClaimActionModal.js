"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { FaTimes, FaFileImage, FaExclamationTriangle, FaCheck } from "react-icons/fa"
import Button from "../Button"
import { getClaimApprover, postClaimAction } from "../../services/productServices"
import { toast } from "react-toastify"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
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

const ModalTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    margin-right: 12px;
  }
`

const ClaimDetailContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
`

const ClaimDetailText = styled.div`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const ClaimDetailLabel = styled.span`
  font-weight: 600;
`

const ClaimDetailValue = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`

const ViewFileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;
  margin-bottom: 1rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.primary)};
    box-shadow: 0 0 0 2px ${({ theme, error }) => (error ? theme.colors.error + "33" : theme.colors.primary + "33")};
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.primary)};
    box-shadow: 0 0 0 2px ${({ theme, error }) => (error ? theme.colors.error + "33" : theme.colors.primary + "33")};
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.primary)};
    box-shadow: 0 0 0 2px ${({ theme, error }) => (error ? theme.colors.error + "33" : theme.colors.primary + "33")};
  }
`

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`

const ImagePreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`

const ImagePreview = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
`

const CloseImageButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const AlertBox = styled.div`
  background: ${({ theme, type }) =>
    type === "warning"
      ? theme.colors.warning + "22"
      : type === "error"
        ? theme.colors.error + "22"
        : theme.colors.info + "22"};
  border-left: 4px solid ${({ theme, type }) =>
    type === "warning" ? theme.colors.warning : type === "error" ? theme.colors.error : theme.colors.info};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`

const AlertIcon = styled.div`
  color: ${({ theme, type }) =>
    type === "warning" ? theme.colors.warning : type === "error" ? theme.colors.error : theme.colors.info};
  font-size: 1.25rem;
  margin-top: 0.125rem;
`

const AlertContent = styled.div`
  flex: 1;
`

const AlertTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
`

const AlertMessage = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const SuccessModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`

const SuccessContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success + "22"};
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
`

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1.5rem;
`

const ClaimActionModal = ({ isOpen, onClose, claim, actionType, onSuccess }) => {
  const [approveAmount, setApproveAmount] = useState("")
  const [remarks, setRemarks] = useState("")
  const [selectedManager, setSelectedManager] = useState("")
  const [managers, setManagers] = useState([])
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [eligible, setEligible] = useState(false)
  const [claimGradeLevel, setClaimGradeLevel] = useState(0)
  const [profile, setProfile] = useState({})

  // Reset form when modal opens with new claim
  useEffect(() => {
    if (claim) {
      setApproveAmount(claim.expense_amt || "")
      setRemarks("")
      setSelectedManager("")
      setErrors({})

      // Fetch managers for approval
      fetchManagers()
    }
  }, [claim, actionType])

  const fetchManagers = async () => {
    try {
      setIsLoading(true)
      const response = await getClaimApprover()
      if (response && response.data) {
        setManagers(response.data)
      }
    } catch (error) {
      console.error("Error fetching managers:", error)
      toast.error("Failed to load approvers list")
    } finally {
      setIsLoading(false)
    }
  }

  // Check if the claim needs manager approval
  useEffect(() => {
    if (claim && profile?.emp_data) {
      const approveGradeLevel = profile?.emp_data?.approve_data?.find(
        (data) => data.claim_grade_level,
      )?.claim_grade_level
      const maxClaimAmount = profile?.emp_data?.approve_data?.find((data) => data.max_claim_amt)?.max_claim_amt

      // Check if the manager's grade level is lower than the claim grade level
      if (approveGradeLevel > claimGradeLevel) {
        setEligible(true)
      }

      // Check if the claim amount exceeds the manager's approval limit
      if (Number.parseFloat(claim.expense_amt) > maxClaimAmount) {
        setEligible(true)
      }
    }
  }, [claim, profile, claimGradeLevel])

  const validateForm = () => {
    const newErrors = {}

    if (actionType === "APPROVE") {
      if (!approveAmount || approveAmount.trim() === "") {
        newErrors.approveAmount = "Approve amount is required"
      } else if (Number.parseFloat(approveAmount) > Number.parseFloat(claim.expense_amt)) {
        newErrors.approveAmount = "The approved amount must be less than or equal to the claim amount"
      }
    }

    if (!remarks || remarks.trim() === "") {
      newErrors.remarks = "Remarks are required"
    }

    if (eligible && !selectedManager) {
      newErrors.selectedManager = "Please select a manager"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    const claimPayload = {
      approve_by_id: selectedManager,
      approve_amt: approveAmount,
      claim_id: claim.id,
      remarks: remarks,
      call_mode: actionType === "APPROVE" ? "APPROVE" : "REJECT",
    }

    try {
      await postClaimAction(claimPayload)
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error processing claim action:", error)
      toast.error(`Failed to ${actionType.toLowerCase()} claim`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccessModal(false)
    if (onSuccess) onSuccess()
  }

  const handleViewFile = (fileUrl) => {
    if (!fileUrl) return

    const fileExtension = fileUrl.split(".").pop().split("?")[0].toLowerCase()

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      setShowImagePreview(true)
    } else if (fileExtension === "pdf") {
      window.open(fileUrl, "_blank")
    } else {
      toast.info("Unsupported file type")
    }
  }

  if (!isOpen || !claim) return null

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>

          <ModalTitle>
            {actionType === "APPROVE" ? "Approve Claim" : "Reject Claim"} ({claim.claim_id})
          </ModalTitle>

          <ClaimDetailContainer>
            {claim.submitted_file_1 && (
              <ViewFileButton onClick={() => handleViewFile(claim.submitted_file_1)}>
                <FaFileImage /> View Receipt
              </ViewFileButton>
            )}

            <ClaimDetailText>
              <ClaimDetailLabel>Expense Type:</ClaimDetailLabel>
              <ClaimDetailValue>{claim.item_name}</ClaimDetailValue>
            </ClaimDetailText>

            <ClaimDetailText>
              <ClaimDetailLabel>Expense Date:</ClaimDetailLabel>
              <ClaimDetailValue>{claim.expense_date}</ClaimDetailValue>
            </ClaimDetailText>

            <ClaimDetailText>
              <ClaimDetailLabel>Employee:</ClaimDetailLabel>
              <ClaimDetailValue>{claim.employee_name}</ClaimDetailValue>
            </ClaimDetailText>

            <ClaimDetailText>
              <ClaimDetailLabel>Claim Amount:</ClaimDetailLabel>
              <ClaimDetailValue>₹{claim.expense_amt}</ClaimDetailValue>
            </ClaimDetailText>

            <ClaimDetailText>
              <ClaimDetailLabel>Claim Remark:</ClaimDetailLabel>
              <ClaimDetailValue>{claim.remarks}</ClaimDetailValue>
            </ClaimDetailText>
          </ClaimDetailContainer>

          {actionType === "APPROVE" && (
            <FormGroup>
              <FormLabel htmlFor="approveAmount">Approve Amount:</FormLabel>
              <FormInput
                id="approveAmount"
                type="number"
                value={approveAmount}
                onChange={(e) => setApproveAmount(e.target.value)}
                error={errors.approveAmount}
                placeholder="Enter approved amount"
              />
              {errors.approveAmount && <ErrorText>{errors.approveAmount}</ErrorText>}
            </FormGroup>
          )}

          <FormGroup>
            <FormLabel htmlFor="remarks">
              {actionType === "APPROVE" ? "Approval Remarks:" : "Rejection Reason:"}
            </FormLabel>
            <FormTextarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              error={errors.remarks}
              placeholder={actionType === "APPROVE" ? "Enter approval remarks" : "Enter rejection reason"}
            />
            {errors.remarks && <ErrorText>{errors.remarks}</ErrorText>}
          </FormGroup>

          {eligible && (
            <FormGroup>
              <FormLabel htmlFor="manager">Select Manager:</FormLabel>
              <FormSelect
                id="manager"
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
                error={errors.selectedManager}
              >
                <option value="">Select a manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name} [{manager.emp_id}]
                  </option>
                ))}
              </FormSelect>
              {errors.selectedManager && <ErrorText>{errors.selectedManager}</ErrorText>}

              <AlertBox type="info">
                <AlertIcon>
                  <FaExclamationTriangle />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>Manager Approval Required</AlertTitle>
                  <AlertMessage>
                    This claim requires additional approval due to amount or grade level restrictions.
                  </AlertMessage>
                </AlertContent>
              </AlertBox>
            </FormGroup>
          )}

          <ButtonContainer>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant={actionType === "APPROVE" ? "primary" : "secondary"}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <LoadingSpinner />}
              {actionType === "APPROVE" ? "Approve Claim" : "Reject Claim"}
            </Button>
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>

      {showImagePreview && claim.submitted_file_1 && (
        <ImagePreviewModal>
          <CloseImageButton onClick={() => setShowImagePreview(false)}>
            <FaTimes />
          </CloseImageButton>
          <ImagePreview src={claim.submitted_file_1 || "/placeholder.svg"} alt="Receipt" />
        </ImagePreviewModal>
      )}

      {showSuccessModal && (
        <SuccessModal>
          <SuccessContent>
            <SuccessIcon>
              <FaCheck />
            </SuccessIcon>
            <SuccessTitle>Success!</SuccessTitle>
            <SuccessMessage>
              {actionType === "APPROVE"
                ? "Claim has been successfully approved."
                : "Claim has been successfully rejected."}
            </SuccessMessage>
            <Button variant="primary" onClick={handleCloseSuccess}>
              Close
            </Button>
          </SuccessContent>
        </SuccessModal>
      )}
    </>
  )
}

export default ClaimActionModal
