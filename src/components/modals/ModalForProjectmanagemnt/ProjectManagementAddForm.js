import React, { useEffect, useState } from 'react';
import {  FiFileText, FiCheck, FiUser, FiAlertTriangle } from 'react-icons/fi';
import { FaFileAlt, FaTimes, FaUpload } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../Button';
import Badge from '../../Badge';
import {
  getStatusVariant,
  getCurrentDateTimeDefaults,
  getYesterday
} from '../../../pages/ProjectManagement/utils/utils';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  width: 100%;
  max-width: 750px;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const ModalHeader = styled.div`
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
  flex-shrink: 0;
`

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.colors.error || '#ff3d00'};
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0 0 16px 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    button { width: 100%; }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: ${props => props.theme.colors.text};
`;

const Required = styled.span`
  color: ${props => props.theme.colors.error};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s;

  &:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     transform: none;
   }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  min-height: 70px;
  resize: vertical;
  font-family: inherit;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const ActivityInfoCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primaryLight} 0%, #ffffff 100%);
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px ${props => props.theme.colors.shadow || 'rgba(108,99,255,0.08)'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.colors.primary};
  }
`;

const ActivityTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem 1rem;
  font-size: 0.85rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.textLight};
  min-width: 75px;
  font-size: 0.82rem;
`;

const InfoValue = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CompactRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FileUploadContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.background};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight}22;
  }
`;
const FileUploadContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FileUploadIcon = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 8px;
  flex-shrink: 0;
`;

const FileUploadTextWrapper = styled.div`
  flex: 1;
`;

const FileUploadText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.15rem;
`;

const FileUploadHint = styled.div`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const FileInput = styled.input`
  display: none;
`;

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${props => props.theme.colors.text};
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

const FilePreview = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WarningBox = styled.div`
  background: #fdecea;
  padding: 0.75rem;
  border-left: 4px solid red;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text}
`

const WarningBox2 = styled.div`
  background: linear-gradient(90deg, #fff5f5 0%, #ffe5e5 100%);
  border: 2px solid ${({ theme }) => theme.colors.error};
  border-left: 5px solid ${({ theme }) => theme.colors.error};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 2px 8px rgba(255, 61, 0, 0.12);
`;

const WarningIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.error};
  border-radius: 50%;
  color: white;
  font-size: 1.1rem;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 61, 0, 0.4);
    }
    50% {
      transform: scale(1.08);
      box-shadow: 0 0 0 6px rgba(255, 61, 0, 0);
    }
  }
`;

const WarningContent = styled.div`
  flex: 1;
  font-size: 0.85rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
`;

const WarningTitle = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.error};
  margin-right: 0.5rem;
`;

const EmployeeNames = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectManagementAddForm = ({ isOpen, onClose, activity, onSubmit, onActivitySubmit, modalContext, forceMode, retainerCache, retainerPage }) => {
  const theme = useTheme();
  const { profile } = useAuth();
  const { todayISO, dayLogKey: todayDayLogKey, apiDate: todayApiDate, currentTime } = getCurrentDateTimeDefaults()
  const [formData, setFormData] = useState({
    date: "",
    endTime: "",
    noOfItems: "",
    noOfResources: "",
    remarks: "",
    file: null
  })

  // console.log("formData", formData)
  // console.log("allRetainers", allRetainers)
  // console.log("activity", activity)
  // console.log("retainerCache", retainerCache)

  const yesterday = getYesterday()
  const dayLogToday = activity?.day_logs?.[todayDayLogKey]
  const dayLogYesterday = activity?.day_logs?.[yesterday.dayLogKey]
  const isTodayPlannedEnd = activity.planned_end_date === todayISO;
  const isActivityCompleted = activity?.status_display === "COMPLETED" || activity?.project_period_status === "COMPLETED"
  const forcedUpdateYesterday = !!dayLogYesterday?.check_in && !dayLogYesterday?.check_out
  const derivedUpdateMode = !isActivityCompleted && (forcedUpdateYesterday || (dayLogToday?.check_in && !dayLogToday?.check_out))
  const isUpdateMode = forceMode ? forceMode === "UPDATE" : derivedUpdateMode
  const forcedDate = modalContext?.forcedDate;
  const isExecutive = profile.grade_level < 100;

  // const getIncompleteEmployees = (data = {}) =>
  // Object.entries(data)
  //   .filter(([_, value]) => value?.allocation?.complete === false)
  //   .map(([empId, value]) => ({
  //     emp_id: empId,
  //     employee_name: value?.allocation?.original_P?.employee_name || ""
  //   }));

  const getIncompleteEmployees = (data = {}) =>
  Object.entries(data)
    .filter(([_, value]) => value?.allocations?.some(allocation => allocation.complete === false))
    .map(([empId, value]) => {
      const firstIncomplete = value.allocations.find( a => a.complete === false);
      return {
        emp_id: empId,
        employee_name: firstIncomplete?.original_P?.employee_name || ""
      };
    });


  const incompleteEmployees = getIncompleteEmployees(retainerCache);

  console.log("incompleteEmployees",incompleteEmployees);
  console.log("retainerCache",JSON.stringify(retainerCache));

  const activeDate = forcedDate
    ? forcedDate
    : forcedUpdateYesterday
      ? yesterday.input
      : todayISO;

  const activeAPIDate = forcedDate
    ? forcedDate
    : forcedUpdateYesterday
      ? yesterday.apiDate
      : todayApiDate;

  const totalAssignedItems = Number(activity?.original_P?.no_of_items || 0);
  const enteredItems = Number(formData.noOfItems || 0);

    const isContinueAction = modalContext?.type === "continue";
  const isLessThanAssigned = enteredItems > 0 && enteredItems < totalAssignedItems;
  const isZeroItems = totalAssignedItems === 0;

  const isRemarksRequired = (isContinueAction && isTodayPlannedEnd) || (isUpdateMode && isLessThanAssigned);

  const hasRemarks = formData.remarks.trim().length > 0;

  const isDisabled =
    !formData.endTime ||
    (!isZeroItems && !formData.noOfItems) ||
    (isRemarksRequired && !hasRemarks) || (activity?.original_P?.is_file_applicable && !formData?.file);


  useEffect(() => {
    if (!isActivityCompleted && isOpen) {
      setFormData({
        date: activeDate,
        endTime: currentTime,
        noOfResources: activity?.retainerData?.no_resource,
        noOfItems: activity?.original_P?.no_of_items ? activity?.original_P?.no_of_items : 0,
        remarks: "",
      })
    }
  }, [isOpen])

  if (!isOpen || !activity) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    handleChange("file", file);
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }))
  }

  const handleSubmit = async () => {
    if (isDisabled || !onActivitySubmit) return;

    const extraFields = {}
    if (modalContext?.type === "complete") {
      extraFields.is_completed = 1
    }

    if(retainerCache){
      extraFields.no_of_resources = Number(formData.noOfResources)
    }

    const success = await onActivitySubmit({
      project: activity,
      mode: "UPDATE",
      data: {
        activityDate: activeAPIDate,
        endTime: formData.endTime,
        noOfItems: isZeroItems ? 0 : Number(formData.noOfItems),
        remarks: formData.remarks.trim() || "",
        file: formData.file
      },
      extraFields
    })

    if (success) {
      onSubmit?.();
      onClose();
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {activity.modalContext.type === "continue" ? "End Today's Activity" : "Complete Activity"}
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {forcedUpdateYesterday && (
            <WarningBox>
              ⚠️ Yesterday is still open. You must close it first.
            </WarningBox>
          )}

          {/* Compact Activity Info Card */}
          <ActivityInfoCard>
            <ActivityTitle>📋 Activity Details</ActivityTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Company:</InfoLabel>
                <InfoValue title={activity.original_P.customer_name}>
                  {activity.original_P.customer_name || "Company Name"}
                </InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Activity:</InfoLabel>
                <InfoValue title={activity.original_P.product_name}>
                  {activity.original_P.product_name}
                </InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Code:</InfoLabel>
                <InfoValue>{activity.original_P.order_item_key || '-'}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Status:</InfoLabel>
                <Badge variant={getStatusVariant(activity.project_period_status)}>
                  {activity.project_period_status}
                </Badge>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Period:</InfoLabel>
                <InfoValue title={`${activity.planned_start_date} → ${activity.planned_end_date}`}>
                  {activity.planned_start_date} → {activity.planned_end_date}
                </InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Total number of items assigned:</InfoLabel>
                <InfoValue>{activity.original_P?.no_of_items || 0}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </ActivityInfoCard>

         {incompleteEmployees.length !== 0 && !retainerPage && (
          <RetainerWarning incompleteEmployees={incompleteEmployees} />
        )}
          {/* Compact Form Fields in Row */}
          <CompactRow>
            <FormGroup>
              <Label>Date <Required>*</Required></Label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={(e) => handleChange("date", e.target.value)} 
                disabled={isExecutive} 
              />
            </FormGroup>

            <FormGroup>
              <Label>End Time <Required>*</Required></Label>
              <Input
                type="time"
                value={formData.endTime}
                disabled={isExecutive}
                onChange={(e) => handleChange("endTime", e.target.value)}
              />
            </FormGroup>

           {retainerPage &&
           <FormGroup>
                <Label>Number of Resources <Required>*</Required></Label>
                <Input
                  type="number"
                  min={0}
                  value={formData.noOfResources}
                  onChange={(e) => handleChange("noOfResources", e.target.value)}
                  placeholder="Enter no of resources"
                />
              </FormGroup>
             } 
           
           { totalAssignedItems > 0 && (
              <FormGroup>
                <Label>Number of Items <Required>*</Required></Label>
                <Input
                  type="number"
                  min={0}
                  value={formData.noOfItems}
                  onChange={(e) => handleChange("noOfItems", e.target.value)}
                  placeholder="Enter completed items"
                />
              </FormGroup>
            )}
          </CompactRow>

          <FormGroup>
            <Label>
              <FiFileText /> Remarks {isRemarksRequired ? <Required>*</Required> : "(Optional)"}
            </Label>
            <TextArea
              value={formData.remarks}
              onChange={e => handleChange('remarks', e.target.value)}
              placeholder="Add any notes..."
            />
          </FormGroup>

          {activity.original_P.is_file_applicable && 
            <FormGroup>
              <Label>
                Receipts/Attachments
                {activity.original_P.is_file_applicable && <Required>*</Required>}
              </Label>
                  <FileUploadContainer onClick={() => document.getElementById("file-upload").click()}>
        <FileInput 
          id="file-upload" 
          name="file" 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.ppt,.pptx" 
          required={activity.original_P.is_file_applicable} 
        />
        <FileUploadContent>
          <FileUploadIcon>
            <FaUpload />
          </FileUploadIcon>
          <FileUploadTextWrapper>
            <FileUploadText>Click to upload file</FileUploadText>
            <FileUploadHint>JPG, PNG, PDF, EXCEL, WORD • Max 5MB</FileUploadHint>
          </FileUploadTextWrapper>
        </FileUploadContent>
      </FileUploadContainer>

              {formData.file && (
                <UploadedFile>
                  {formData.file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(formData.file)}
                      alt="preview"
                      style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }}
                    />
                  ) : (
                    <FaFileAlt color={(theme) => theme.color.text}/>
                  )}
                  <span title={formData.file.name}>{formData.file.name}</span>
                  <button type="button" onClick={() => removeFile(1)}>
                    <FaTimes />
                  </button>
                </UploadedFile>
              )}
            </FormGroup>
          }
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            <FiCheck style={{ marginRight: 6 }} />
            Submit 
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProjectManagementAddForm;

export const RetainerWarning = ({ incompleteEmployees }) => {
  if (!incompleteEmployees || incompleteEmployees.length === 0) return null;

  const employeeText = incompleteEmployees
    .map(emp => `${emp.employee_name} (${emp.emp_id})`)
    .join(", ");

  return (
    <WarningBox2>
      {/* <WarningIconWrapper>
        <FiAlertTriangle />
      </WarningIconWrapper> */}
      <WarningContent>
        <WarningTitle>⚠️ Incomplete Retainer Activities:</WarningTitle>
        <EmployeeNames>{employeeText}</EmployeeNames>
      </WarningContent>
    </WarningBox2>
  );
};