import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaUpload } from 'react-icons/fa';
import Button from '../Button';

const AppriaisalModal = ({ isOpen, onClose, onSuccess, kpi }) => {
  const [score, setScore] = useState('');
  const [remarks, setRemarks] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (kpi) {
      const numeric = typeof kpi.myValue === 'string' ? kpi.myValue.replace('%', '') : kpi.myValue;
      setScore(numeric || '');
      setRemarks(kpi.remarks || '');
      setFile(null);
    }
  }, [kpi]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};
    if (score === '' || isNaN(Number(score))) nextErrors.score = 'Enter a valid numeric score';
    if (!remarks.trim()) nextErrors.remarks = 'Remarks are required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      onSuccess && onSuccess({ ...kpi, myValue: `${score}%`, remarks, file });
      setIsLoading(false);
      onClose && onClose();
    }, 300);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>{`Edit KPI - ${kpi?.kpiName || ''}`}</ModalTitle>
            <CloseButton type="button" onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label>Your Evaluated KPI score (Numeric)</Label>
              <FormInput
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="e.g. 45"
                min="0"
                step="0.01"
              />
              {errors.score && <ErrorText>{errors.score}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Remarks*</Label>
              <TextArea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add your remarks..."
                maxLength={200}
              />
              <div style={{ fontSize: '0.8rem', color: '#888', textAlign: 'right' }}>{remarks.length}/200</div>
              {errors.remarks && <ErrorText>{errors.remarks}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Document File</Label>
              <FileUploadContainer onClick={() => document.getElementById('kpi-file-input').click()}>
                <FileInput id="kpi-file-input" type="file" onChange={handleFileChange} />
                <FileUploadIcon>
                  <FaUpload />
                </FileUploadIcon>
                <FileUploadText>Click to upload or drag and drop files here</FileUploadText>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Supported formats: JPG, PNG, PDF (Max 5MB)</div>
              </FileUploadContainer>
              {file && (
                <UploadedFile>
                  <FaUpload />
                  <span>{file.name}</span>
                  <button type="button" onClick={removeFile}>
                    <FaTimes />
                  </button>
                </UploadedFile>
              )}
            </FormGroup>
          </ModalBody>

          <ButtonGroup>
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <SubmitButton type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</SubmitButton>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components (matching ClaimModal look and feel)
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
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight || '#e3f0ff'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight || '#e3f0ff'};
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
    background: ${({ theme }) => theme.colors.primaryLight}22;
  }
`;

const FileUploadIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const FileUploadText = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`;

const FileInput = styled.input`
  display: none;
`;

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
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-weight: 500;
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

export default AppriaisalModal;