"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaTimes, FaCalendarAlt, FaInfoCircle, FaRegClock } from "react-icons/fa"
import Button from "../Button"
import { postEmpLeave } from "../../services/productServices"
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
  padding: 2rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.8rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 500;
  color: #495057;
  font-size: 0.95rem;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  transition: all 0.3s;
  font-size: 1rem;
  color: #343a40;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight || 'rgba(58, 134, 255, 0.15)'};
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  transition: all 0.3s;
  font-size: 1rem;
  color: #343a40;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23495057' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight || 'rgba(58, 134, 255, 0.15)'};
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s;
  font-size: 1rem;
  color: #343a40;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight || 'rgba(58, 134, 255, 0.15)'};
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const LeaveBalanceInfo = styled.div`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primaryLight || '#f1f7ff'}, ${({ theme }) => theme.colors.primaryLighter || '#f8fbff'});
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  border-left: 4px solid ${({ theme }) => theme.colors.primary || '#3a86ff'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`

const BalanceIcon = styled(FaInfoCircle)`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
`

const BalanceDetails = styled.div`
  flex: 1;
`

const BalanceTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #343a40;
`

const BalanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
`

const BalanceItem = styled.div`
  text-align: center;
  background: white;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const BalanceValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
`

const BalanceLabel = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
`

const InputIcon = styled.div`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
  pointer-events: none;
`

const InputWrapper = styled.div`
  position: relative;
  
  input {
    padding-left: 2.5rem;
  }
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`

const CustomCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ checked, theme }) => 
    checked ? theme.colors.primary || '#3a86ff' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 4px;
  margin-right: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ checked, theme }) => 
    checked ? theme.colors.primary || '#3a86ff' : 'white'};
  transition: all 0.2s;
  
  &:after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    margin-top: -2px;
  }
`

const CheckboxLabel = styled.label`
  cursor: pointer;
  user-select: none;
  font-weight: 500;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  background: #f8f9fa;
  border-radius: 0 0 16px 16px;
`

// Enhanced Button styles that will work with your existing Button component
const StyledButton = styled(Button)`
  &.primary {
    background: ${({ theme }) => theme.colors.primary || '#3a86ff'};
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(58, 134, 255, 0.3);
    }
  }
  
  &.outline {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary || '#3a86ff'};
    border: 1px solid ${({ theme }) => theme.colors.primary || '#3a86ff'};
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primaryLight || '#f1f7ff'};
    }
  }
`

const LeaveModal = ({ isOpen, onClose }) => {
  const[error, setError] = useState("");
  const [formData, setFormData] = useState({
    leave_type: "",
    from_date: "",
    to_date: "",
    remarks: "",
    contactInfo: "",
    call_mode: "ADD",
    emp_id: localStorage.getItem("empNoId")
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to convert date from yyyy-mm-dd to dd-mm-yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for submission with formatted dates
    const submissionData = {
      ...formData,
      from_date: formatDate(formData.from_date),
      to_date: formatDate(formData.to_date)
    };

    postEmpLeave(submissionData)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log('Error==', error);
      });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Apply for Leave</ModalTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <FormLabel htmlFor="leave_type">Leave Type</FormLabel>
              <FormSelect 
                id="leave_type" 
                name="leave_type" 
                value={formData.leave_type} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Leave Type</option>
                <option value="EL">Earned Leave</option>
                <option value="WH">Work From Home</option>
                <option value="LP">Loss of Pay</option>
                <option value="HL">Half Day</option>
              </FormSelect>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="from_date">Start Date</FormLabel>
                <InputWrapper>
                  <InputIcon>
                    <FaCalendarAlt />
                  </InputIcon>
                  <FormInput
                    id="from_date"
                    name="from_date"
                    type="date"
                    value={formData.from_date}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="to_date">End Date</FormLabel>
                <InputWrapper>
                  <InputIcon>
                    <FaCalendarAlt />
                  </InputIcon>
                  <FormInput
                    id="to_date"
                    name="to_date"
                    type="date"
                    value={formData.to_date}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>
              </FormGroup>
            </FormRow>
            <FormGroup>
              <FormLabel htmlFor="remarks">Reason for Leave</FormLabel>
              <FormTextarea
                id="remarks"
                name="remarks"
                placeholder="Please provide details about your leave request..."
                value={formData.remarks}
                onChange={handleChange}
                required
              />
            </FormGroup>
           {error&& <p style={{color:"rgb(232, 27, 27)"}}>{error}</p>}
          </ModalBody>
          <ModalFooter>
            <StyledButton className="outline" type="button" onClick={onClose}>
              Cancel
            </StyledButton>
            <StyledButton className="primary" type="submit">
              Submit Application
            </StyledButton>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LeaveModal