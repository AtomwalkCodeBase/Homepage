"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimes, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa"
import Button from "../Button"
import { toast } from "react-toastify"
import { getProjectlist, getTravelMode, postTravelRequests } from "../../services/productServices"
import ConfirmPopup from "./ConfirmPopup"

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
`
const Checkbox = styled.input`
  margin-right: 0.75rem;
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-weight: 500;
  display: ${props => props.show ? 'block' : 'none'};
  margin-bottom: 1rem;`

const AddTravelModal = ({ onClose, onSuccess, isUpdate, updateTicket }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [projects, setProjects] = useState([]);
  const [travelMode, setTravelMode] = useState([]);
  const [formData, setFormData] = useState({
    project: "",
    travelMode: "",
    amount: "",
    start_date: "",
    end_date: "",
    purpose: "",
    emp_id: localStorage.getItem("empId"),
    accommodationRequired: false,
    advanceRequired: false,
    remarks: "",
    city: ""
  })

  useEffect(() => {
    fetchprojectCategories();
    fetchTravelMode();

    // Helper for date conversion
    const convertDate = (dateStr) => {
      if (!dateStr) return "";
      const [day, monStr, year] = dateStr.split("-");
      const months = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
      };
      const month = months[monStr] || "01";
      return `${year}-${month}-${day}`;
    };

    if (isUpdate) {
      setFormData({
        project: updateTicket.project_code,
        travelMode: updateTicket.travel_mode,
        amount: updateTicket.advance_amt,
        start_date: convertDate(updateTicket.start_date),
        end_date: convertDate(updateTicket.end_date),
        purpose: updateTicket.travel_purpose,
        accommodationRequired: updateTicket.is_accommodation,
        advanceRequired: updateTicket.advance_required,
        remarks: updateTicket.remarks,
        city: updateTicket.to_city,
        emp_id: localStorage.getItem("empId"),
      });
    } else {
      setFormData({
        project: "",
        travelMode: "",
        amount: "",
        start_date: "",
        end_date: "",
        purpose: "",
        emp_id: localStorage.getItem("empId"),
        accommodationRequired: false,
        advanceRequired: false,
        remarks: "",
        city: ""
      });
    }
  }, []);

  const fetchprojectCategories = async () => {
    try {
      const assignedRes = await getProjectlist();
      setProjects(assignedRes.data);
    } catch (err) {
      console.error("Error fetching project categories:", err);
    }
  };

  const fetchTravelMode = async () => {
    try {
      const assignedRes = await getTravelMode();
      setTravelMode(assignedRes.data);
    } catch (err) {
      console.error("Error fetching project categories:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateField = (name, value, current = formData) => {
    switch (name) {
      // case "project":
      //   if (!value || value.toString().trim() === "") return "Project is required";
      //   break;
      case "travelMode":
        if (!value || value.toString().trim() === "") return "Travel mode is required";
        break;
      case "start_date":
        if (!value || value.toString().trim() === "") return "Start date is required";
        if (current.end_date && value > current.end_date) return "Start date cannot be after end date";
        break;
      case "end_date":
        if (!value || value.toString().trim() === "") return "End date is required";
        if (current.start_date && value < current.start_date) return "End date cannot be before start date";
        break;
      case "purpose":
        if (!value || value.trim() === "") return "Travel Purpose is required";
        break;
      case "amount":
        // if (!value || value.toString().trim() === "") return "Amount is required";
        if (isNaN(Number(value)) || Number(value) <= 0) return "Amount must be a positive number";
        break;
      case "city":
        if (!value || value.trim() === "") return "Travel to city is required";
        break;
      default:
        return "";
    }
    return "";
  };

  const validateAll = () => {
    const newErrors = {};
    [ "travelMode", "start_date", "end_date", "purpose", "city"].forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value, formData) }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  function formatDate(dateStr) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split("-");
      return `${day}-${month}-${year}`;
    }
    return dateStr;
  }

  const handleSubmit = async (e, mode) => {

     e.preventDefault();
    // Validate all fields before submit
    if (mode !== "CANCEL" && !validateAll()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    const payload = {
      project_code: formData.project || '',
      travel_mode: formData.travelMode,
      start_date: formatDate(formData.start_date),
      end_date: formatDate(formData.end_date),
      to_city: formData.city,
      is_accommodation: formData.accommodationRequired,
      advance_required: formData.advanceRequired,
      advance_amt: formData.amount || '0',
      travel_purpose: formData.purpose,
      remarks: formData.remarks,
      call_mode: getCallMode(isUpdate, updateTicket ? updateTicket.status : "", mode),
      emp_id: formData.emp_id,
    }

    if (isUpdate || updateTicket?.buttonMode === "cancel"){
      payload.travel_id = updateTicket.travel_id
    }


    // console.log(payload)

    setIsLoading(true)
    try {
      const res = await postTravelRequests(payload);
       if (res.status === 200) {
        onSuccess();
        onClose();
        setFormData({
          project: "",
          travelMode: "",
          amount: "",
          start_date: "",
          end_date: "",
          purpose: "",
          emp_id: localStorage.getItem("empId"),
          accommodationRequired: false,
          advanceRequired: false,
          remarks: "",
          city: ""
        })
      } else {
        throw new Error(res.statusText || 'Request failed');
      }
    } catch (error) {
     console.log(error)
    //  toast.error("Failed to add a travel request")
     toast.error("Unable to Proceed your request, try again later")
    } finally {
      setIsLoading(false);
    }

  }

  const getButtonsConfig = (isUpdate, status) => {
    const safeStatus = status || "";
    if (isUpdate) {
      if (safeStatus === "S") {
        return [
          { label: "Update", mode: "UPDATE_DRAFT" },
          // { label: "Submit", mode: "UPDATE_SUBMIT" }
        ];
      }
      return [
        { label: "Save", mode: "UPDATE_DRAFT" },
        { label: "Submit", mode: "UPDATE_SUBMIT" }
      ];
    }
    return [
      { label: "Save as Draft", mode: "SAVE_DRAFT" },
      { label: "Submit", mode: "SUBMIT" }
    ];
  };

  const getCallMode = (isUpdate, status, mode) => {
    if (mode === "CANCEL") {
      return "CANCEL"
    }
    const safeStatus = status || "";
    if (isUpdate) {
      return safeStatus === "S" ? "UPDATE_SUBMIT" : "UPDATE_DRAFT";
    }
    return mode;
  };

  if (updateTicket?.buttonMode === "cancel") {
    return (
       <ConfirmPopup
        isOpen={true}
        onClose={onClose}
        onConfirm={(e) => handleSubmit(e, "CANCEL")}
        approve={false}
        isLoading={isLoading}
        title="Cancel Travel Request"
        message="Are you sure you want to cancel this travel request? This action cannot be undone."
        confirmLabel="Yes, Cancel"
      />
    )
  }

  //   if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>{isUpdate? "Update travel details" : "Add Travel"}</ModalTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <FormLabel htmlFor="project">Travel Project</FormLabel>
              <FormSelect id="project" name="project" value={formData.project} onChange={handleChange} onBlur={handleBlur} required>
                <option value="">Select Travel Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.project_code}>
                    {project.title} ({project.project_code})
                  </option>
                ))}
              </FormSelect>
              <ErrorMessage show={!!errors.project}>{errors.project}</ErrorMessage>
            </FormGroup>
            {travelMode.length > 0 && (
              <FormGroup>
                <FormLabel htmlFor="travelMode">Travel Mode</FormLabel>
                <FormSelect id="travelMode" name="travelMode" value={formData.travelMode} onChange={handleChange} onBlur={handleBlur} required>
                  <option value="">Select Travel Mode</option>
                  {travelMode.map(([id, title], index) => (
                    <option key={index} value={id}>
                      {title}
                    </option>
                  ))}
                </FormSelect>
                <ErrorMessage show={!!errors.travelMode}>{errors.travelMode}</ErrorMessage>
              </FormGroup>
            )}

            <FormGroup>
              <FormLabel htmlFor="startDate">Start Date</FormLabel>
              <div style={{ position: "relative" }}>
                <FormInput
                  id="startDate"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                <FaCalendarAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
              </div>
              <ErrorMessage show={!!errors.start_date}>{errors.start_date}</ErrorMessage>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="endDate">End Date</FormLabel>
              <div style={{ position: "relative" }}>
                <FormInput
                  id="endDate"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                <FaCalendarAlt style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
              </div>
              <ErrorMessage show={!!errors.end_date}>{errors.end_date}</ErrorMessage>
            </FormGroup>

            <FormGroup>
              <FormLabel  htmlFor="travelToCity">
                Travel to city
                </FormLabel>
                <TextArea
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your city name"
                  rows="1"
                />
                <ErrorMessage show={!!errors.city}>{errors.city}</ErrorMessage>
            </FormGroup>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Checkbox
                  type="checkbox"
                  id="accommodationRequired"
                  checked={formData.accommodationRequired}
                  onChange={(e) => setFormData((prev) => ({ ...prev, accommodationRequired: e.target.checked }))}
                  onClick={(e) => e.stopPropagation()}
                />
                <FormLabel htmlFor="accommodationRequired" style={{ marginBottom: 0, marginLeft: '0.5rem', cursor: 'pointer' }}>
                  Accommodation Required
                </FormLabel>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Checkbox
                  type="checkbox"
                  id="advanceRequired"
                  checked={formData.advanceRequired}
                  onChange={(e) => setFormData((prev) => ({ ...prev, advanceRequired: e.target.checked }))}
                  onClick={(e) => e.stopPropagation()}
                />
                <FormLabel htmlFor="advanceRequired" style={{ marginBottom: 0, marginLeft: '0.5rem', cursor: 'pointer' }}>
                  Advance Required
                </FormLabel>
              </div>
            </div>

           {formData.advanceRequired &&  <FormGroup>
              <FormLabel htmlFor="amount">Advance Amount</FormLabel>
              <div style={{ position: "relative" }}>
                <FormInput
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  style={{ paddingLeft: "2rem" }}
                />
                <FaMoneyBillWave style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#666" }} />
              </div>
              <ErrorMessage show={!!errors.amount}>{errors.amount}</ErrorMessage>
            </FormGroup>}

            <FormGroup>
              <FormLabel htmlFor="purpose">Travel Purpose</FormLabel>
              <FormTextarea
                id="purpose"
                name="purpose"
                placeholder="Provide details about your travel purpose"
                value={formData.purpose}
                onChange={e => {
                  if (e.target.value.length <= 100) {
                    handleChange(e)
                  }
                }}
                onBlur={handleBlur}
                required
                maxLength={100}
              />
              <div style={{ fontSize: "0.8rem", color: "#888", textAlign: "right" }}>
                {formData.purpose.length}/100
              </div>
              <ErrorMessage show={!!errors.purpose}>{errors.purpose}</ErrorMessage>
            </FormGroup>


            <FormGroup>
              <FormLabel htmlFor="remarks">
                Remarks
              </FormLabel>
              <TextArea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Add any additional notes or comments about your work..."
                rows="4"
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            {getButtonsConfig(isUpdate, updateTicket ? updateTicket.status : "").map(({ label, mode }) => (
              <Button
                key={mode}
                variant="primary"
                type="button"
                disabled={isLoading}
                onClick={(e) => handleSubmit(e, mode)}
              >
                {isLoading ? `${label}...` : label}
              </Button>
            ))}
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default AddTravelModal
