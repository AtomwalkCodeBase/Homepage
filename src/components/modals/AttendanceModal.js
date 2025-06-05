"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaTimes, FaCalendarAlt, FaClock, FaCommentAlt } from "react-icons/fa"
import Button from "../Button"
import { useTheme } from "../../context/ThemeContext"

const AttendanceModal = ({ isOpen, onClose, onSubmit }) => {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    startTime: "",
    endTime: "",
    remark: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.checkInDate) {
      newErrors.checkInDate = "Check-in date is required"
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required"
    }

    if (!formData.remark.trim()) {
      newErrors.remark = "Remark is required"
    }

    // If check-out date is provided, end time should also be provided
    if (formData.checkOutDate && !formData.endTime) {
      newErrors.endTime = "End time is required when check-out date is provided"
    }

    // If end time is provided, check-out date should also be provided
    if (formData.endTime && !formData.checkOutDate) {
      newErrors.checkOutDate = "Check-out date is required when end time is provided"
    }

    // Validate that check-out date is not before check-in date
    if (formData.checkInDate && formData.checkOutDate) {
      const checkInDate = new Date(formData.checkInDate)
      const checkOutDate = new Date(formData.checkOutDate)

      if (checkOutDate < checkInDate) {
        newErrors.checkOutDate = "Check-out date cannot be before check-in date"
      }
    }

    // Validate time logic for same day
    if (
      formData.checkInDate &&
      formData.checkOutDate &&
      formData.checkInDate === formData.checkOutDate &&
      formData.startTime &&
      formData.endTime
    ) {
      const startTime = new Date(`2000-01-01T${formData.startTime}`)
      const endTime = new Date(`2000-01-01T${formData.endTime}`)

      if (endTime <= startTime) {
        newErrors.endTime = "End time must be after start time"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Format data for API call
      const attendanceData = {
        emp_id: localStorage.getItem("empNoId"),
        call_mode: "ADD",
        time: formData.startTime,
        geo_type: "I", // Check-in
        a_date: formatDateForAPI(formData.checkInDate),
        latitude_id: "",
        longitude_id: "",
        remarks: formData.remark,
        end_time: formData.endTime || null,
        check_out_date: formData.checkOutDate ? formatDateForAPI(formData.checkOutDate) : null,
      }

      await onSubmit(attendanceData)

      // Reset form
      setFormData({
        checkInDate: "",
        checkOutDate: "",
        startTime: "",
        endTime: "",
        remark: "",
      })
      setErrors({})
      onClose()
    } catch (error) {
      console.error("Error submitting attendance:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        checkInDate: "",
        checkOutDate: "",
        startTime: "",
        endTime: "",
        remark: "",
      })
      setErrors({})
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>
            <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
            Add Attendance
          </ModalTitle>
          <CloseButton onClick={handleClose} disabled={isSubmitting} theme={theme}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label theme={theme}>
                  <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                  Check-In Date *
                </Label>
                <Input
                  type="date"
                  value={formData.checkInDate}
                  onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                  theme={theme}
                  $hasError={!!errors.checkInDate}
                  disabled={isSubmitting}
                />
                {errors.checkInDate && <ErrorText theme={theme}>{errors.checkInDate}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label theme={theme}>
                  <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                  Check-Out Date
                </Label>
                <Input
                  type="date"
                  value={formData.checkOutDate}
                  onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                  theme={theme}
                  $hasError={!!errors.checkOutDate}
                  disabled={isSubmitting}
                />
                {errors.checkOutDate && <ErrorText theme={theme}>{errors.checkOutDate}</ErrorText>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label theme={theme}>
                  <FaClock style={{ marginRight: "0.5rem" }} />
                  Start Time *
                </Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  theme={theme}
                  $hasError={!!errors.startTime}
                  disabled={isSubmitting}
                />
                {errors.startTime && <ErrorText theme={theme}>{errors.startTime}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label theme={theme}>
                  <FaClock style={{ marginRight: "0.5rem" }} />
                  End Time
                </Label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  theme={theme}
                  $hasError={!!errors.endTime}
                  disabled={isSubmitting}
                />
                {errors.endTime && <ErrorText theme={theme}>{errors.endTime}</ErrorText>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label theme={theme}>
                <FaCommentAlt style={{ marginRight: "0.5rem" }} />
                Remark *
              </Label>
              <TextArea
                value={formData.remark}
                onChange={(e) => handleInputChange("remark", e.target.value)}
                placeholder="Enter attendance remark..."
                rows={3}
                theme={theme}
                $hasError={!!errors.remark}
                disabled={isSubmitting}
              />
              {errors.remark && <ErrorText theme={theme}>{errors.remark}</ErrorText>}
            </FormGroup>

            <ButtonGroup>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Attendance"}
              </Button>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

// Styled Components
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

const ModalContent = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text || "#374151"};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error || "#ef4444" : theme.colors.border || "#d1d5db"};
  border-radius: ${({ theme }) => theme.borderRadius || "6px"};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background || "#ffffff"};
  color: ${({ theme }) => theme.colors.text || "#374151"};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || "#3b82f6"};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight || "rgba(59, 130, 246, 0.1)"};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border || "#f9fafb"};
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error || "#ef4444" : theme.colors.border || "#d1d5db"};
  border-radius: ${({ theme }) => theme.borderRadius || "6px"};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background || "#ffffff"};
  color: ${({ theme }) => theme.colors.text || "#374151"};
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || "#3b82f6"};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight || "rgba(59, 130, 246, 0.1)"};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border || "#f9fafb"};
    opacity: 0.7;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight || "#9ca3af"};
  }
`

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error || "#ef4444"};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

export default AttendanceModal
