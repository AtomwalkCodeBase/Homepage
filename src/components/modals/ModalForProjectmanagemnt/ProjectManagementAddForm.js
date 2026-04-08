import React, { useEffect, useMemo, useState } from 'react';
import { FiFileText, FiCheck, FiX, FiUsers } from 'react-icons/fi';
import { FaFileAlt, FaPlus, FaTimes, FaUpload } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../Button';
import Badge from '../../Badge';
import { getStatusVariant, getCurrentDateTimeDefaults, getYesterday, convert12To24Hour, formatToDDMMYYYY, normalizeToDDMMYYYY, DateForApiFormate } from '../../../pages/ProjectManagement/utils/utils';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import Modal from '../Modal';
import { FaRegPenToSquare } from 'react-icons/fa6';
import ConfirmPopup from '../ConfirmPopup';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
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

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

    &:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     transform: none;
   }
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

const ResourceCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryLight} 0%, ${({ theme }) => theme.colors.accentLight} 100%);
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    z-index: -1;
    opacity: 0.3;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  min-height: 60px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const ResourceCount = styled.span`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  margin-left: auto;
`;

const EmptyState = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-style: italic;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: white;
  margin-top: 10px;

      &:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     transform: none;
   }
`

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
    retainerNames: "",
    is_completed: false,
    file: null
  })
  const [isRetainerModalOpen, setIsRetainerModalOpen] = useState(false);
  const [retainerInputs, setRetainerInputs] = useState([]);
  const [confirmPopup, setConfirmPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });


  const yesterday = getYesterday()
  const dayLogToday = activity?.day_logs?.[todayDayLogKey]
  const dayLogYesterday = activity?.day_logs?.[yesterday.dayLogKey]
  const isTodayPlannedEnd = activity.planned_end_date === todayISO || activity.planned_end_date < todayISO;
  const isActivityCompleted = activity?.status_display === "COMPLETED" || activity?.project_period_status === "COMPLETED"
  const forcedUpdateYesterday = !!dayLogYesterday?.check_in && !dayLogYesterday?.check_out
  const derivedUpdateMode = !isActivityCompleted && (forcedUpdateYesterday || (dayLogToday?.check_in && !dayLogToday?.check_out))
  const isUpdateMode = forceMode ? forceMode === "UPDATE" : derivedUpdateMode
  const forcedDate = modalContext?.forcedDate;
  const isExecutive = profile.grade_level < 100;
  const isPlannedEndExceed = DateForApiFormate(activity?.planned_end_date, true) <= DateForApiFormate(todayApiDate, true);

  const isRetainerUpdate = modalContext?.type === "update_retainer";

  const incompleteEmployees = useMemo(() => {
    if (!activity?.original_P || !retainerCache) return [];

    const retainerPIds = (activity.original_P.retainer_list || []).filter(r => r.a_type === "P").map(r => r.a_id);

    if (retainerPIds.length === 0) return [];

    const activityOrderItemId = activity.order_item_id;

    return Object.entries(retainerCache).map(([empId, empData]) => {
        const matched = (empData.allocations || []).find(a =>
          a.order_item_id === activityOrderItemId &&
          retainerPIds.includes(a.p_id) &&
          !a.complete
        );

        if (!matched) return null;

        return {
          emp_id: empId,
          employee_name: matched.original_P?.employee_name || "",
          matchedAllocation: matched,
        };
      })
      .filter(Boolean);
  }, [retainerCache, activity]);

  const totalAssignedItems = Number(activity?.original_P?.no_of_items || 0);
  const enteredItems = Number(formData.noOfItems || 0);

  const isContinueAction = modalContext?.type === "continue";
  const isLessThanAssigned = enteredItems > 0 && enteredItems < totalAssignedItems;
  const isZeroItems = totalAssignedItems === 0;

  const isRemarksRequired = (isContinueAction && isTodayPlannedEnd) || (isUpdateMode && isLessThanAssigned);
  const isFileRequired = isTodayPlannedEnd && activity?.original_P?.is_file_applicable && !formData?.file;
  // const fileUploadRequired = activity?.original_P?.is_file_applicable && activity?.original_A?.sub

  const hasRemarks = formData.remarks.trim().length > 0;

  const isNoOfItemsEmpty = formData.noOfItems === "" || formData.noOfItems === null;

  const isForceCom = modalContext?.type === "force_complete";
  const isDisabled = (
    isForceCom
      ? (incompleteEmployees.length !== 0 && !retainerPage)
      : (!formData.date || !formData.endTime || (!isZeroItems && isNoOfItemsEmpty) ||
        (isRemarksRequired && !hasRemarks) || isFileRequired || (incompleteEmployees.length !== 0 && !retainerPage))
  );


  const pendingCheckoutDate = activity?.pendingCheckoutDate;
  const dayLog = activity?.day_logs?.[pendingCheckoutDate];
  const selectedDate = formData.date;

  const activeDate = pendingCheckoutDate ? "" : todayISO

useEffect(() => {
  if (!isActivityCompleted && isOpen) {

      const rawResources = activity?.original_A?.resource_list || [];
      const existingResources = Array.isArray(rawResources) ? rawResources : typeof rawResources === 'string' ? rawResources.split('|') : [];

      const formattedResources = existingResources.map(res => {
        const [name = "", items = "", resourceType = ""] = res.split("^");

        return {
          name: name.trim(),
          items: items.trim(),
          resourceType: resourceType.trim(),
        };
      });

      setFormData({
        date: activeDate,
        endTime: currentTime,
        noOfResources: formattedResources.length || 0,
        noOfItems: 0,
        is_completed: false,
        retainerNames: formattedResources.map(r => `${r.name}^${r.items}^${r.resourceType}`).join("|"),
        remarks: "",
      });

      setRetainerInputs(formattedResources);
    }
  }, [isOpen, activity]);

  if (
    (modalContext?.type === "continue" || modalContext?.type === "complete") && activity?.hasPendingCheckout) {
    toast.error("Session started on a previous day. Please reload the page.");
    return;
  }


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

  const removeFile = () => { setFormData((prev) => ({ ...prev, file: null, })) }

  const getJoinedRetainerNames = () => retainerInputs.filter(r => String(r.name || "").trim() && r.items !== "" && r.resourceType !== "").map(r => `${String(r.name).trim()}^${r.items}^${r.resourceType}`).join("|");

  const getResourceTypeCounts = () => {
    let tl = 0;
    let ex = 0;

    retainerInputs.forEach(r => {
      if (!r.name?.trim() || !r.items || !r.resourceType) return;

      if (r.resourceType === "TL") tl++;
      if (r.resourceType === "EX") ex++;
    });

    return { tl_count: tl, ex_count: ex };
  };
  const handleSubmit = async () => {
    if (isDisabled || !onActivitySubmit) return;

    if (totalAssignedItems > 0 && isNoOfItemsEmpty) {
      toast.error("Please enter the number of items completed");
      return;
    }

    const formattedSelectedDate = formatToDDMMYYYY(selectedDate);
    const normalizedPending = normalizeToDDMMYYYY(pendingCheckoutDate);

    if (
      normalizedPending &&
      formattedSelectedDate === normalizedPending &&
      dayLog?.check_in?.time &&
      formData.endTime
    ) {
      const checkIn24 = convert12To24Hour(dayLog.check_in.time);
      const checkInDate = new Date(`1970-01-01T${checkIn24}:00`);
      const checkOutDate = new Date(`1970-01-01T${formData.endTime}:00`);

      if (checkOutDate <= checkInDate) {
        toast.error("Check-out time must be strictly greater than check-in time");
        return;
      }
    }

    if (retainerPage) {
      const expectedResources = Number(formData.noOfResources || 0);

      for (let i = 0; i < retainerInputs.length; i++) {
        const item = retainerInputs[i];

        if (!item.name?.trim()) {
          toast.error(`Please enter name for Resource ${i + 1}`);
          return;
        }

        if (!item.items?.toString().trim()) {
          toast.error(`Please enter ${activity?.original_P?.product_unit ? `${activity?.original_P?.product_unit} Audited` : "Number of Items Audited"} for Resource ${i + 1}`);
          return;
        }

        if (!item.resourceType?.toString().trim()) {
          toast.error(`Please select Resource Type (TL/EX) for Resource ${i + 1}`);
          return;
        }
      }
      const enteredResourceCount = retainerInputs.filter(r => r.name?.trim() && r.items && r.resourceType?.toString().trim()).length;

      if (expectedResources !== enteredResourceCount) {
        toast.error(`Number of resources (${expectedResources}) must match entered resource names (${enteredResourceCount})`);
        return;
      }
    }

    if (modalContext?.type?.includes("complete")) {
      const message = retainerPage
        ? `Are you sure you want to mark today’s activity as complete for this retainer?`
        : !isPlannedEndExceed
          ? `Are you sure you want to complete this audit item?\n\nThis audit is planned till ${activity?.planned_end_date}.\n\n After this you won't able to perform any activity for this audit item`
          : "Are you sure you want to complete this activity";

      setConfirmPopup({
        isOpen: true,
        title: "Confirm Completion",
        message: message,
        onConfirm: () => {
          setConfirmPopup(prev => ({ ...prev, isOpen: false }));
          processSubmit();
        }
      });
      return;
    }

    processSubmit();
  };

  const processSubmit = async () => {
    const formattedSelectedDate = formatToDDMMYYYY(selectedDate); // ALWAYS DD-MM-YYYY
    let activityDateToSend = formattedSelectedDate;
    const extraFields = {};

    const mode = modalContext?.type;

    if (mode === "continue") {
      activityDateToSend = formattedSelectedDate;
    }

    else if (mode === "checkout_yesterday") {

      if (!pendingCheckoutDate) {
        activityDateToSend = formattedSelectedDate;
      } else {

        const pendingFormatted = normalizeToDDMMYYYY(pendingCheckoutDate);

        if (formattedSelectedDate === pendingFormatted) {
          activityDateToSend = pendingFormatted;
        } else {
          activityDateToSend = pendingFormatted;
          extraFields.end_date = formattedSelectedDate;
        }
      }
    }

    else if (mode === "complete" || mode === "complete_y") {

      // always send is_completed
      extraFields.is_completed = 1;

      if (!pendingCheckoutDate) {
        activityDateToSend = formattedSelectedDate;
      } else {

        const pendingFormatted = normalizeToDDMMYYYY(pendingCheckoutDate);

        if (formattedSelectedDate === pendingFormatted) {
          activityDateToSend = pendingFormatted;
        } else {
          activityDateToSend = pendingFormatted;
          extraFields.end_date = formattedSelectedDate;
        }
      }
    }
    const resourceList = getJoinedRetainerNames() || "";
    if (resourceList && String(resourceList).trim()) {
      extraFields.resource_list = resourceList;
    }

    const { tl_count, ex_count } = getResourceTypeCounts();

    if (tl_count > 0) extraFields.tl_count = tl_count;
    if (ex_count > 0) extraFields.ex_count = ex_count;

    // console.log({
    //   activityDate: activityDateToSend,
    //   endTime: formData.endTime,
    //   noOfItems: isZeroItems ? 0 : Number(formData.noOfItems),
    //   remarks: formData.remarks.trim() || "",
    //   // resource_list: getJoinedRetainerNames() || "",
    //   file: formData.file
    // },
    //   extraFields
    // );
    let success;
    if (isRetainerUpdate) {
      success = await onActivitySubmit({
        project: activity,
        mode: "DATA_CORRECT",
        data: {
          activityDate: activityDateToSend,
          // endTime: formData.endTime,
          noOfItems: isZeroItems ? 0 : Number(formData.noOfItems),
          // remarks: formData.remarks.trim() || "",
          // file: formData.file
        },
        extraFields
      })
    } else if (mode === "force_complete") {
      success = await onActivitySubmit({
        project: activity,
        mode: "FORCE_COMPLETE",
        data: {
          remarks: formData.remarks.trim() || "",
          file: formData.file
        },
        extraFields
      })
    } else {
      success = await onActivitySubmit({
        project: activity,
        mode: "UPDATE",
        data: {
          activityDate: activityDateToSend,
          endTime: formData.endTime,
          noOfItems: isZeroItems ? 0 : Number(formData.noOfItems),
          remarks: formData.remarks.trim() || "",
          file: formData.file
        },
        extraFields
      })
    }

    if (success) {
      onSubmit?.();
      onClose();
    }
  }

  const handleRetainerChange = (index, field, value) => {
    setRetainerInputs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  const handleRetainerModalSubmit = () => {
    const formatted = getJoinedRetainerNames();
    setFormData(prev => ({ ...prev, retainerNames: formatted }));
    setIsRetainerModalOpen(false);
  };

  const handleAddOrUpdateResources = () => {
    const count = Number(formData.noOfResources || 0);
    if (count <= 0) {
      toast.error("Please enter number of resources first");
      return;
    }

    setRetainerInputs(prev => {
      const arr = [...prev];
      while (arr.length < count) { arr.push({ name: "", items: "", resourceType: "" }); }
      return arr.slice(0, count);
    });

    setIsRetainerModalOpen(true);
  };

  const handleRemoveRetainer = (indexToRemove) => {
    setRetainerInputs(prev => prev.filter((_, index) => index !== indexToRemove));
  };


  return (
    <>
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {activity.modalContext.type === "continue" ? "End Today's Activity" : activity.modalContext.type === "force_complete" ? "Mark as Complete" : "Complete Activity"}
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

          <ActivityInfoCard>
            <ActivityTitle>📋 Activity Details</ActivityTitle>
            <InfoGrid>

              <InfoDetails label="Customer" value={activity.original_P.customer_name || "Customer Name"} />

              <InfoDetails label="Audit type" value={activity.original_P.product_name || ""} />

              <InfoDetails label="Order Item" value={activity.original_P.order_item_key || '-'} />

              <InfoDetails label="Status" value={<Badge variant={getStatusVariant(!retainerPage ? activity.project_period_status : activity.complete)}>
                  {!retainerPage ? activity.project_period_status : activity.complete}
              </Badge>} />

              <InfoDetails label="Planned Date" value={`${activity.planned_start_date} → ${activity.planned_end_date}`} />

              <InfoDetails label="Total number of items assigned" value={activity.original_P?.no_of_items || 0} />
            </InfoGrid>
          </ActivityInfoCard>

         {incompleteEmployees.length !== 0 && !retainerPage && (
          <RetainerWarning incompleteEmployees={incompleteEmployees} />
        )}

          <CompactRow>
           {modalContext?.type !== "force_complete" && <FormGroup>
              <Label>End Date <Required>*</Required></Label>
              <Input type="date" value={formData.date} onChange={(e) => handleChange("date", e.target.value)} disabled={(modalContext?.type === "continue" || modalContext?.type === "complete") && (isExecutive || isRetainerUpdate)} />
            </FormGroup>}

            {modalContext?.type !== "force_complete" && <FormGroup>
              <Label>End Time <Required>*</Required></Label>
              {/* <Input type="time" value={formData.endTime} disabled={isExecutive || isRetainerUpdate} onChange={(e) => handleChange("endTime", e.target.value)} /> */}
              <Input type="time" value={formData.endTime} onChange={(e) => handleChange("endTime", e.target.value)} />
            </FormGroup>}

           {modalContext?.type !== "force_complete" && totalAssignedItems > 0 && (
              <FormGroup>
                <Label>{!!activity.original_P.product_unit ? activity.original_P.product_unit : "Number of Items"} Audited <Required>*</Required></Label>
                <Input type="number" min={0} value={formData.noOfItems} onChange={(e) => handleChange("noOfItems", e.target.value)} placeholder={!!activity.original_P.product_unit ? `Enter ${activity.original_P.product_unit} items Audited` : "Enter completed items"} />
              </FormGroup>
            )}

           {retainerPage &&
           <FormGroup>
                <Label>Number of Resources <Required>*</Required></Label>
                <Input type="number" min={0} value={formData.noOfResources} onChange={(e) => handleChange("noOfResources", e.target.value)} placeholder="Enter no of resources" />
              </FormGroup>
             }

          </CompactRow>

            {retainerPage && (
            <ResourceCard>
              <CardHeader>
                <FiUsers />Resource List
              </CardHeader>

              <FormGroup>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Label>
                    <FiFileText />Add Resources (Enter Names)<Required>*</Required>
                  </Label>
                <Button size='sm' onClick={handleAddOrUpdateResources}>{retainerInputs.length !== 0 ? <FaRegPenToSquare /> : <FaPlus />} {retainerInputs.length !== 0 ? "Update" : "Add"}</Button>
                </div>

                <TagsContainer>
                  {retainerInputs.length > 0 ? (
                    <>
                      {retainerInputs.filter(r => String(r.name || "").trim() && String(r.items || "").trim() && String(r.resourceType || "").trim())
                        .map((item, index) => (
                          <Tag key={index}>
                            {item.name} ({item.items}) ({item.resourceType})
                            <RemoveButton
                              type="button"
                              onClick={() => handleRemoveRetainer(index)}
                            >
                              <FiX />
                            </RemoveButton>
                          </Tag>
                      ))}
                      {retainerInputs.filter(r => r.name?.trim() && r.items &&  r.resourceType?.toString().trim()).length > 0 && (
                        <ResourceCount>
                          {retainerInputs.filter(r => r.name?.trim() && r.items && r.resourceType?.toString().trim()).length} of {formData.noOfResources || 0} resources added
                        </ResourceCount>
                      )}
                    </>
                  ) : (
                    <EmptyState>No retainer added</EmptyState>
                  )}
                </TagsContainer>
              </FormGroup>
            </ResourceCard>
          )}

          <FormGroup>
            <Label>
              <FiFileText /> Remarks {isRemarksRequired ? <Required>*</Required> : "(Optional)"}
            </Label>
            <TextArea
              value={formData.remarks}
              onChange={e => handleChange('remarks', e.target.value)}
              placeholder="Add any notes..."
              disabled={isRetainerUpdate}
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
          disabled={isRetainerUpdate}
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
                    <FaFileAlt color={(theme) => theme.color.text} />
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
          <Button variant="primary" onClick={handleSubmit} disabled={isDisabled}>
            <FiCheck style={{ marginRight: 6 }} />
            {modalContext?.type === "force_complete" ? "Mark as Complete" : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>

    {isRetainerModalOpen &&
    <RetainerListNameModal
      retainerInputs={retainerInputs}
      setRetainerInputs={setRetainerInputs}
      handleRetainerNameChange={handleRetainerChange}
      handleRetainerModalSubmit={handleRetainerModalSubmit} handleClose={() => { setIsRetainerModalOpen(false); }}
      />}

      <ConfirmPopup
        isOpen={confirmPopup.isOpen}
        title={confirmPopup.title}
        message={confirmPopup.message}
        onConfirm={confirmPopup.onConfirm}
        confirmLabel="Yes"
        onClose={() =>
          setConfirmPopup(prev => ({ ...prev, isOpen: false }))
        }
      />
    </>
  );
};

export default ProjectManagementAddForm;

export const InfoDetails = ({ label, value }) => {
  return (
    <InfoItem>
      <InfoLabel>{label}: </InfoLabel>
      <InfoValue title={value}>{value}</InfoValue>
    </InfoItem>
  );
}

export const RetainerWarning = ({ incompleteEmployees }) => {
  if (!incompleteEmployees || incompleteEmployees.length === 0) return null;

  const employeeText = incompleteEmployees.map(emp => `${emp.employee_name} (${emp.emp_id})`).join(", ");

  return (
    <WarningBox2>
      <WarningContent>
        <WarningTitle>⚠️ Incomplete Retainer Activities:</WarningTitle>
        <EmployeeNames>{employeeText}</EmployeeNames>
      </WarningContent>
    </WarningBox2>
  );
};

const RetainerListNameModal = ({ retainerInputs, setFormData, setRetainerInputs, handleRetainerNameChange, handleRetainerModalSubmit, handleClose }) => {
  return (
    <Modal onClose={handleClose}>
      {retainerInputs.map((item, index) => (
        <FormGroup key={index}>
          <Label>Resource {index + 1}</Label>
          <Input value={item.name} onChange={(e) => handleRetainerNameChange(index, "name", e.target.value)} placeholder="Enter retainer name" />
          <Grid2>
            <Input type="number" value={item.items} onChange={(e) => handleRetainerNameChange(index, "items", e.target.value)} placeholder="Enter completed items" style={{ marginTop: "10px" }} />
            <FilterSelect value={item.resourceType || ""} onChange={(e) => handleRetainerNameChange(index, "resourceType", e.target.value)}>
              <option value="" disabled hidden>Select Resource Type</option>
              <option value="TL">Team Lead</option>
              <option value="EX">Executive</option>
            </FilterSelect>
          </Grid2>
        </FormGroup>
      ))}
      <ModalFooter>
        <Button variant="outline" onClick={handleClose}>Cancel</Button>
        <Button variant="outline" onClick={() => { handleClose(); setRetainerInputs([]) }}>Clear</Button>
        <Button
          variant="primary"
          onClick={handleRetainerModalSubmit}
        // disabled={isDisabled}
        >
          <FiCheck style={{ marginRight: 6 }} />
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )
}
