import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRequestCategory, postEmpRequest } from '../../services/productServices';
import { FaTimes, FaUpload } from 'react-icons/fa';
import Button from '../Button';

const RequestModal = ({ call_type, empId, onClose, onSuccess,dropdownValue  }) => {
  const [requestText, setRequestText] = useState('');
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(dropdownValue);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isHelpRequest = call_type;
  const headerTitle = isHelpRequest=='H' ? 'Add Help Request' : 'Add General Request';
  useEffect(() => {
    fetchRequestCategories();
  }, []);

  const fetchRequestCategories = async () => {
    try {
      const res = await getRequestCategory();
      const filtered = res.data.filter(cat => cat.request_type === call_type);
      setCategories(filtered);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedCategory) newErrors.category = 'Please select a category';
    if (!requestText.trim()) newErrors.requestText = 'Please describe your request';
    if (!remark.trim()) newErrors.remarks = 'Please add remarks';
    if (!file) newErrors.file = 'Please attach a file';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('emp_id', empId);
    formData.append('request_category_id', selectedCategory);
    formData.append('call_mode', 'ADD');
    formData.append('request_type', call_type);
    formData.append('request_id', '0');
    formData.append('request_text', requestText);
    formData.append('remarks', remark);
    if (file) formData.append('uploaded_file', file);

    try {
      const res = await postEmpRequest(formData);
      if (res.status === 200) {
        onSuccess();
      } else {
        throw new Error(res.statusText || 'Request failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const removeFile = (index) => {
    setFile(null)
  }
 
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{headerTitle}</ModalTitle>
          <CloseButton onClick={onClose}>   <FaTimes /></CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <Label>{isHelpRequest ? "Help Category" : "Request Category"}</Label>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                error={errors.category}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              {errors.category && <ErrorText>{errors.category}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>{isHelpRequest ? "Help Request Details" : "Request Details"}</Label>
              <TextArea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder={isHelpRequest 
                  ? "Describe your help request in detail..." 
                  : "Describe your request in detail..."}
                error={errors.requestText}
                maxLength={100}
              />
              <div style={{ fontSize: "0.8rem", color: "#888", textAlign: "right" }}>
                {requestText.length}/100
              </div>
              {errors.requestText && <ErrorText>{errors.requestText}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Remarks</Label>
              <TextArea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Additional remarks or comments..."
                error={errors.remarks}
                 maxLength={100}
              />
              <div style={{ fontSize: "0.8rem", color: "#888", textAlign: "right" }}>
                {requestText.length}/100
              </div>
              {errors.remarks && <ErrorText>{errors.remarks}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Attach Supporting Document</Label>
              

               <FileUploadContainer onClick={() => document.getElementById("file-upload").click()}>
               <FileInput id="file-upload" type="file" onChange={handleFileChange} />
                              <FileUploadIcon>
                                <FaUpload />
                              </FileUploadIcon>
                              <FileUploadText>Click to upload or drag and drop files here</FileUploadText>
                              <div style={{ fontSize: "0.8rem", color: "#666" }}>Supported formats: JPG, PNG, PDF (Max 5MB)</div>
                            </FileUploadContainer>
              {errors.file && <ErrorText>{errors.file}</ErrorText>}
            </FormGroup>
            {file&& (
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                    Uploaded Files (1)
                  </div>
                    <UploadedFile>
                      <FaUpload />
                      <span>{file.name}</span>
                      <button type="button" onClick={() => removeFile(0)}>
                        <FaTimes />
                      </button>
                    </UploadedFile>
                </div>
              )}
            <ButtonGroup>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 
                isHelpRequest ? 'Submit Help Request' : 'Submit Request'}
              </SubmitButton>
            </ButtonGroup>
          </FormContainer>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

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
`;

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
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  background: ${({ theme }) => theme.colors.primaryLight || '#f1f7ff'};
  border-radius: 16px 16px 0 0;
`;

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
`;

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
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid ${props => props.error ? "red": '#ddddd'};
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    border-color:${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid ${props => props.error ? "red" : '#ddd'};
  border-radius: 6px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

// const FileInput = styled.input`
//   padding: 10px;
//   width: 100%;
// `;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #f5f5f5;
  color: #666;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
const FileUploadContainer = styled.div`
border: 2px dashed ${({ theme }) => theme.colors.border};
border-radius: 4px;
padding: 1.5rem;
text-align: center;
cursor: pointer;
transition: all 0.2s;

&:hover {
  border-color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
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

export default RequestModal;