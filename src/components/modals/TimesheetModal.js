

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
const TimeRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimeInput = styled.input`
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
`;

const TimesheetModal = ({ isOpen, onClose, initialData, setRelode }) => {
  const handealedate=()=>{
  const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
}
  const [formData, setFormData] = useState({
    project_code: "",
    activity_id: "",
    a_date: handealedate(),
    effort: "",
    start_time: "",
    end_time: "",
    remarks: "",
    call_mode: "SUBMIT",
    emp_id: localStorage.getItem("empId") || "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchactivityCategories();
    fetchprojectCategories();
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
      const data={emp_id: localStorage.getItem("empId")}
      const res = await getProjectlist(data);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Get date from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get("date");

    if (dateParam) {
       setFormData((prev) => ({ ...prev, a_date: dateParam }));
    }
    handealedate();
  }, [isOpen]);

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
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
        project_code: initialData.project_code || "",
        activity_id: initialData.activity_id || "",
        remarks: initialData.remarks || "",
        a_date: formattedDate,
        effort: initialData.effort || "",
        start_time: initialData.start_time || "",
        end_time: initialData.end_time || "",
        ts_id: initialData.id || "",
        emp_id: localStorage.getItem("empId") || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const calculateEffortFromTimes = () => {
    if (formData.start_time && formData.end_time) {
      const start = new Date(`2000-01-01T${formData.start_time}`);
      const end = new Date(`2000-01-01T${formData.end_time}`);
      
      // Handle overnight case (end time is next day)
      if (end < start) {
        end.setDate(end.getDate() + 1);
      }
      
      const diffMs = end - start;
      const diffHours = diffMs / (1000 * 60 * 60);
      return diffHours.toFixed(1);
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.project_code) {
      newErrors.project_code = "Project is required";
    }
    
    if (!formData.activity_id) {
      newErrors.activity_id = "Activity is required";
    }
    
    if (!formData.a_date) {
      newErrors.a_date = "Date is required";
    }
    
    // Either effort or both start/end times are required
    if (!formData.effort && (!formData.start_time || !formData.end_time)) {
      newErrors.effort = "Either working hours or start/end time is required";
    }
    
    // If both effort and times are provided, validate they match
    if (formData.effort && formData.start_time && formData.end_time) {
      const calculatedEffort = calculateEffortFromTimes();
      if (Math.abs(parseFloat(formData.effort) - parseFloat(calculatedEffort)) > 0.1) {
        newErrors.effort = "Working hours don't match the time range";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    const { value } = e.nativeEvent.submitter;

    try {

      // Convert a_date from YYYY-MM-DD to DD-MM-YYYY if needed
      let formattedDate = formData.a_date;
      if (/^\d{4}-\d{2}-\d{2}$/.test(formData.a_date)) {
        const [year, month, day] = formData.a_date.split("-");
        formattedDate = `${day}-${month}-${year}`;
      }
      // Function to convert time to HH:MM A format
    const formatTime = (timeString) => {
      if (!timeString) return '';
      
      // If already in HH:MM A format, return as is
      if (/^\d{1,2}:\d{2}\s[AP]M$/i.test(timeString)) {
        return timeString.toUpperCase();
      }
      
      // If in 24-hour format (HH:MM or HH:MM:SS)
      if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(timeString)) {
        const [hours, minutes] = timeString.split(':');
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 || 12;
        return `${displayHour.toString().padStart(2, '0')}:${minutes.padStart(2, '0')} ${period}`;
      }
      
      return timeString; // fallback  
    };
      const submissionData = {
        ...formData,
      a_date: formattedDate,
      start_time: formatTime(formData.start_time),
      end_time: formatTime(formData.end_time),
      call_mode: value || "SUBMIT",
      };
 

      await posttimelist(submissionData);
      setFormData({
        project_code: "",
        activity_id: "",
        a_date: "",
        effort: "",
        start_time: "",
        end_time: "",
        remarks: "",
        call_mode: "SUBMIT",
        emp_id: localStorage.getItem("empId") || "",
      });
      onClose();
      toast.success(`Timesheet entry ${value === "UPDATE" ? "Updated" : "Added"} successfully. on ${submissionData.a_date}`);
    } catch (error) {
      // console.error("Error submitting timesheet:", error);
      setErrors({ submit: "Duplicate entry detected try adding something unique." });
      toast.error("Duplicate entry detected try adding something unique.");
    } finally {
      setRelode(Math.random());
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      project_code: "",
      activity_id: "",
      a_date: "",
      effort: "",
      start_time: "",
      end_time: "",
      remarks: "",
      call_mode: "SUBMIT",
      emp_id: localStorage.getItem("empId") || "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  const minDateObj = new Date(today);
  minDateObj.setDate(today.getDate() - 7);
  const minDate = minDateObj.toISOString().split("T")[0];

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
      <Select 
      name="project_code" 
      value={formData.project_code} 
      onChange={handleInputChange} 
      required
      >
      <option value="">Select a project</option>
      {projects.map((project) => (
      <option key={project.id} value={project.project_code}>
      {project.title} ({project.project_code})
      </option>
      ))}
      </Select>
      {errors.project_code && <ErrorMessage>{errors.project_code}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
      <Label>
      <FaTasks />
      Activity<RequiredIndicator>*</RequiredIndicator>
      </Label>
      <Select 
      name="activity_id" 
      value={formData.activity_id} 
      onChange={handleInputChange} 
      required
      >
      <option value="">Select an activity</option>
      {activities.map((activity) => (
      <option key={activity.id} value={activity.activity_id}>
      {activity.name}
      </option>
      ))}
      </Select>
      {errors.activity_id && <ErrorMessage>{errors.activity_id}</ErrorMessage>}
      </FormGroup>
      <TimeRangeContainer>
      <FormGroup>
      <Label>
      <FaCalendarAlt />
      Date<RequiredIndicator>*</RequiredIndicator>
      </Label>
      <Input 
      type="date" 
      name="a_date" 
      value={formData.a_date} 
      onChange={handleInputChange} 
      required 
      // min={minDate}
      max={maxDate}
      />
      {errors.a_date && <ErrorMessage>{errors.a_date}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
      <Label>
      <FaClock />
      Working Hours
      </Label>
      <Input
      type="number"
      name="effort"
      value={formData.effort}
      onChange={handleInputChange}
      placeholder="Enter hours (e.g., 8 or 9)"
      min="0.1"
      max="24"
      step="0.1"
      />
      {errors.effort && <ErrorMessage>{errors.effort}</ErrorMessage>}
      </FormGroup>
      </TimeRangeContainer>
      <FormGroup>
      <Label>
      <FaClock />
      Start Time - End Time {!formData.effort && <RequiredIndicator>*</RequiredIndicator>}
      </Label>
      <TimeRangeContainer>
      <TimeInput
      type="time"
      name="start_time"
      value={formData.start_time}
      onChange={handleInputChange}
      required={!formData.effort}
      placeholder="Start Time"
      />
      <TimeInput
      type="time"
      name="end_time"
      value={formData.end_time}
      onChange={handleInputChange}
      required={!formData.effort}
      placeholder="End Time"
      />
      </TimeRangeContainer>
      {errors.start_time && <ErrorMessage>{errors.start_time}</ErrorMessage>}
      {errors.end_time && <ErrorMessage>{errors.end_time}</ErrorMessage>}
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
      {initialData ? (
        <>
      <Button type="submit" variant="primary" disabled={isSubmitting} value="UPDATE">
      {isSubmitting ? "Updating..." : "Update"}
      </Button>
        {/* <Button type="submit" variant="primary" disabled={isSubmitting} value="SUBMIT">
      {isSubmitting ? "Updating..." : "Update And Submit"}
      </Button> */}
      </>
      ) : (
      <>
      <Button type="submit" variant="primary" disabled={isSubmitting} value="ADD_AND_SAVE">
      {isSubmitting ? "Saving..." : "Save"}
      </Button>
      {/* <Button type="submit" variant="primary" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit"}
      </Button> */}
      </>
      )}
      </ModalFooter>
      </form>
      </ModalContainer>
    </ModalOverlay>
    );
};

export default TimesheetModal
