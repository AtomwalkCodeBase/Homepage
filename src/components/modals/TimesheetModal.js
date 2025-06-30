

import { useState, useEffect } from "react"
import styled from "styled-components"
import { FaTimes, FaClock, FaProjectDiagram, FaTasks, FaCalendarAlt, FaStickyNote } from "react-icons/fa"
import Button from "../Button"
import { getActivitylist, getProjectlist, posttimelist } from "../../services/productServices"
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

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &:invalid {
    border-color: ${({ theme }) => theme.colors.error};
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0 0 12px 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 0.25rem;
`

const TimesheetModal = ({ isOpen, onClose, initialData ,setRelode}) => {
  const [formData, setFormData] = useState({
    project_code: "",
    activity_id: "",
    a_date: "",
    effort: "",
    remarks: "",
    call_mode: "SUBMIT",
    emp_id: localStorage.getItem("empId") || "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activities, setActivities] = useState([])
  const [projects, setProjects] = useState([])
  console.log(initialData,"formDatads")
  useEffect(() => {
    fetchactivityCategories();
    fetchprojectCategories()
  }, []);

  const fetchactivityCategories = async () => {
    try {
      const res = await getActivitylist();
      setActivities(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchprojectCategories = async () => {
    try {
      const res = await getProjectlist();
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };


  // Get date from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const dateParam = urlParams.get("date")

    if (dateParam) {
      // Ensure date is in DD-MM-YYYY
      setFormData((prev) => ({ ...prev, a_date: dateParam }))
    } else {
      // Set today's date as default in DD-MM-YYYY
      const today = new Date()
      const day = String(today.getDate()).padStart(2, "0")
      const month = String(today.getMonth() + 1).padStart(2, "0")
      const year = today.getFullYear()
      const formattedDate = `${day}-${month}-${year}`
      setFormData((prev) => ({ ...prev, a_date: formattedDate }))
    }
  }, [])

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
      // Convert a_date from DD-MMM-YYYY to YYYY-MM-DD if needed
      let formattedDate = initialData.a_date || "";
      if (/^\d{2}-[A-Za-z]{3}-\d{4}$/.test(formattedDate)) {
        const [day, mon, year] = formattedDate.split("-");
        const months = {
          Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
          Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        };
        formattedDate = `${year}-${months[mon]}-${day}`;
      }
      setFormData({
        project: initialData.project_code || "",
        activity: initialData.activity_id || "",
        remarks: initialData.remarks || "",
        a_date: formattedDate,
        effort: initialData.effort || "",
        ts_id: initialData.id || "",
        emp_id: localStorage.getItem("empId")
      })
    }
  }, [initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { value } = e.nativeEvent.submitter;
    try {
      // Convert a_date from YYYY-MM-DD to DD-MM-YYYY if needed
      let formattedDate = formData.a_date;
      if (/^\d{4}-\d{2}-\d{2}$/.test(formData.a_date)) {
        const [year, month, day] = formData.a_date.split("-");
        formattedDate = `${day}-${month}-${year}`;
      }
      const submissionData = {
        ...formData,
        a_date: formattedDate,
        call_mode:value || "SUBMIT",
        effort: Number.parseFloat(formData.effort),
      }
      await posttimelist(submissionData)
      setFormData({
         project_code: "",
         activity_id: "",
         a_date: "",
         effort: "",
         remarks: "",
         call_mode: "SUBMIT",
         emp_id: localStorage.getItem("empId") || "",
      })
      onClose()
      toast.success("Timesheet entry submitted successfully!");
    } catch (error) {
      console.error("Error submitting timesheet:", error)
      setErrors({ submit: "Failed to submit timesheet. Please try again." })
    } finally {
      setRelode(Math.random())
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
    project_code: "",
    activity_id: "",
    a_date: "",
    effort: "",
    remarks: "",
    call_mode: "SUBMIT",
    emp_id: localStorage.getItem("empId") || "",
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {initialData ? "Edit Timesheet Entry" : "Add Timesheet Entry"}
          </ModalTitle>
          <CloseButton onClick={handleClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>
                <FaProjectDiagram />
                Choose Project<RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Select name="project_code" value={formData.project} onChange={handleInputChange} required>
                <option value="">Select a project</option>
                {projects.map((projectArray, index) => (
                  <option key={index} value={projectArray.title}>
                    {projectArray.title} ({projectArray.project_code})
                  </option>
                ))}
              </Select>
              {errors.project && <ErrorMessage>{errors.project}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                <FaTasks />
                Activity<RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Select name="activity_id" value={formData.activity} onChange={handleInputChange} required>
                <option value="">Select an activity</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.activity_id}>
                    {activity.name}
                  </option>
                ))}
              </Select>
              {errors.activity && <ErrorMessage>{errors.activity}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                <FaCalendarAlt />
                Date<RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Input type="date" name="a_date" value={formData.a_date} onChange={handleInputChange} required />
              {errors.a_date && <ErrorMessage>{errors.a_date}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                <FaClock />
                Working Hours<RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Input
                type="number"
                name="effort"
                value={formData.effort}
                onChange={handleInputChange}
                placeholder="Enter hours (e.g., 8 or 7.5)"
                min="0.5"
                max="24"
                step="0.5"
                required
              />
              {errors.effort && <ErrorMessage>{errors.effort}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                <FaStickyNote />
                Remarks
              </Label>
              <TextArea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Add any additional notes or comments about your work..."
                rows="4"
              />
            </FormGroup>

            {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
             {initialData?<Button type="submit" variant="primary" disabled={isSubmitting} value="UPDATE">
              {isSubmitting ? "Submitting..." : initialData ? "Update" : "Add Entry"}
            </Button>:<> <Button type="submit" variant="primary" disabled={isSubmitting} value="ADD_AND_SAVE">
              {isSubmitting ? "Saving..." : initialData ? "Update Entry" : "Save"}
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}  >
              {isSubmitting ? "Submit" : initialData ? "Update Submit" : "Submit"}
            </Button></>}
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default TimesheetModal
