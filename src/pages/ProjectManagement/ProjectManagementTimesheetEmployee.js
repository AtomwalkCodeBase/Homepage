import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import Button from '../../components/Button'
import { FaFilter, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getEmpAllocationData, postAllocationData } from '../../services/productServices'
import { normalizeProjects, formatToDDMMYYYY, getMonthRange, formatRetainerActivities } from './utils/utils'
import Card from '../../components/Card'
import { ActivityCard } from './ActivityCard'
import { isAfter, isBefore, isWithinInterval, parse } from 'date-fns'
import { formatAPITime } from './utils/utils'
import { getCurrentDateTimeDefaults } from './utils/utils'
import ConfirmPopup from '../../components/modals/ConfirmPopup'
import { getYesterday } from './utils/utils'
import ProjectManagementAddForm from '../../components/modals/ModalForProjectmanagemnt/ProjectManagementAddForm'
import { MdFilterAltOff } from 'react-icons/md'
import { GroupedRetainerAccordion } from '../../components/modals/ModalForProjectmanagemnt/GroupedRetainerAccordion'
import EmployeeLogStatusCard from './EmployeeLogStatusCard'
import { useAuth } from '../../context/AuthContext'
import OPEActual from './OPEActual'
import Modal from '../../components/modals/Modal'

const Tagline = styled.p`
 color: ${({ theme }) => theme.colors.textLight};
`
const FilterRow = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CustomRangeRow = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-radius: 8px;
  background: #fafafa;
  border: 1px dashed ${({ theme }) => theme.colors.border};

  span {
    color: #666;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    gap: 0.7rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }
`;
const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: white;
  min-width: 150px;

  @media (max-width: 768px) {
    width: 45%;
    min-width: unset;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Container = styled.div`
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes?.xl || '1.5rem'};
  font-weight: ${({ theme }) => theme.fontWeights?.heading || '600'};
  color: ${({ theme }) => theme.colors?.primary || '#6C63FF'};
`;

const ClaimsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
`;
const DateInput = styled.input`
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: white;

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const TopDateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
  flex-direction: column;
  align-items: center;
  }
`;
const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1.5rem;
  overflow-x: auto;
`

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.text)};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`
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

const parseDateSafe = (dateStr) => {
  if (!dateStr) return null;
  return parse(dateStr, "dd-MMM-yyyy", new Date());
};

const hasOverlap = (projStart, projEnd, rangeStart, rangeEnd) => {
  if (!projStart || !projEnd) return false;
  return isWithinInterval(projStart, { start: rangeStart, end: rangeEnd }) ||
    isWithinInterval(projEnd, { start: rangeStart, end: rangeEnd }) ||
    (isBefore(projStart, rangeStart) && isAfter(projEnd, rangeEnd));
};

const ProjectManagementTimesheetEmployee = () => {
  const { profile } = useAuth();
  const [employeeActivity, setEmployeeActivity] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [isFormModalOpen, setIsFromModalOpen] = useState(false);
  const [selectedProject, setSelectdeProject] = useState(null);
  const [activeTab, setActiveTab] = useState("myActivity");
  const [activeRetainerParentId, setActiveRetainerParentId] = useState(null);
  const [globalRetainerCache, setGlobalRetainerCache] = useState({});
  const [isGlobalRetainerLoading, setIsGlobalRetainerLoading] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeProject, setPincodeProject] = useState(null);



  const { dayLogKey } = getCurrentDateTimeDefaults();

  const [confirmPopup, setConfirmPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // console.log(dayFilter)

  const [dateRange, setDateRange] = useState(() => getMonthRange({ type: "current" }));

  const emp_id = localStorage.getItem('empId');
  const urlParams = new URLSearchParams(window.location.search)
  const empidParam = urlParams.get("empid");
  const empName = urlParams.get("name");
  const pathName = urlParams.get("path");
  const navigate = useNavigate()

  const [dayFilter, setDayFilter] = useState(empidParam ? "custom" : "today");

  useEffect(() => {
    if (emp_id) {
      fetchEmpAllocationData()
    }
  }, [emp_id, empidParam]);


  const fetchEmpAllocationData = async (startOverride, endOverride) => {
    const emp_id = localStorage.getItem("empId")
    const start = startOverride || dateRange.start
    const end = endOverride || dateRange.end

    const startDateObj = new Date(start)
    const endDateObj = new Date(end)

    if (endDateObj < startDateObj) {
      toast.info("End date cannot be earlier than start date")
      return false;
    }
    const payload = {
      emp_id: empidParam ? empidParam : emp_id,
      start_date: formatToDDMMYYYY(start),
      end_date: formatToDDMMYYYY(end),
    }

    try {
      const response = await getEmpAllocationData(payload);
      setEmployeeActivity(normalizeProjects(response.data))
      // console.log("normalizeProjects(response.data)", normalizeProjects(response.data))
    } catch (error) {
      toast.error("No data found...")
    }
  }

  const handleActivitySubmit = async ({ project, mode, data = {}, extraFields = {} }) => {
    if (!project) return false

    const isAddMode = mode === "ADD"
    const empIdentifier = project.original_P?.emp_id || project.original_A?.emp_id || empidParam || emp_id

    if (!empIdentifier) {
      toast.error("Employee not found")
      return false
    }

    if (isAddMode && !project?.original_P?.id) {
      toast.error("Unable to start this activity. Something went wrong try again later !!! ")
      return false
    }

    if (!isAddMode && !project?.original_A?.id) {
      toast.error("Unable to complete this activity. Activity did not start yet !!!")
      return false
    }

    // SPECIAL MODE
    if (mode === "FORCE_COMPLETE" || mode === "REVERSE_COMPLETE") {
      const formData = new FormData();

      if (!project?.original_A?.id) {
        toast.error("Activity not found");
        return false;
      }

      formData.append("emp_id", empIdentifier);
      formData.append("a_id", project.original_A.id);
      formData.append("call_mode",  mode === "REVERSE_COMPLETE" ? "REVERSE_COMPLETE" :"FORCE_COMPLETE");
      if(mode === "REVERSE_COMPLETE"){
        formData.append("geo_type", "O")
      }
      if(data.remarks){
        formData.append("remarks", data.remarks || "");
      }

      if (data.file) {
        formData.append("submitted_file", data.file);
      }

      try {
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        // const res = { status: 200 };
        const res = await postAllocationData(formData);

        if (res?.status === 200) {
          toast.success(mode === "REVERSE_COMPLETE" ? "Status update successfully" : "Activity completed");
          await fetchEmpAllocationData();
          return true;
        }

        return false;
      } catch (error) {
        toast.error("Unable to force complete activity");
        return false;
      }
    }

    try {
      const { apiDate: defaultApiDate, currentTime } = getCurrentDateTimeDefaults()
      const formData = new FormData()

      const activityDate = data.activityDate || defaultApiDate
      // For UPDATE, we only want to send start_time when it's explicitly provided
      const explicitStartTime = data.startTime || null

      formData.append("emp_id", empIdentifier)
      formData.append("activity_date", activityDate)
      formData.append("remarks", data.remarks ?? (isAddMode ? "Project Started from Web" : ""))
      formData.append("longitude_id", "")
      formData.append("latitude_id", "")

      if(mode === "DATA_CORRECT"){
        formData.append("no_of_items", Number(data.noOfItems || 0));
        formData.append("geo_type", "O");
      }

      if (data.file) {
        formData.append("submitted_file", data.file)
      }

      if (isAddMode) {
        // ADD (Start Activity) → always send start_time, defaulting to current time
        const startTimeForAdd = explicitStartTime || currentTime
        formData.append("call_mode", "ADD")
        formData.append("p_id", project.original_P.id)
        formData.append("start_time", formatAPITime(startTimeForAdd))
        formData.append("geo_type", "I")
      } else {
        formData.append("no_of_items", Number(data.noOfItems || 0))
        formData.append("call_mode", "UPDATE")
        formData.append("a_id", project.original_A.id)
        if (data.endTime) {
          formData.append("end_time", formatAPITime(data.endTime))
        }
        // For UPDATE:
        // - Resume Activity (from card) sends an explicit startTime → include start_time + resume remark + geo_type = "I"
        // - Complete / Continue from modal should NOT send start_time at all (only end_time) → geo_type = "O"
        if (explicitStartTime) {
          formData.append("start_time", formatAPITime(explicitStartTime))
          formData.append("remarks", "Project resume from Web")
          formData.append("geo_type", "I")
        } else {
          formData.append("geo_type", "O")
        }
      }

      Object.entries(extraFields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      })
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const res = await postAllocationData(formData)
      // const res = { status: 200 }

      if (res?.status === 200) {
        toast.success(isAddMode ? "Check-in Successful" : "Activity Completed")
        return true
      }
      return false
    } catch (error) {
      const backendMessage = error?.response?.data?.error || error?.response?.data?.message || "";
        if (backendMessage.includes("No Time Sheet record found for previous Date") || backendMessage.includes("E00001")) {
          toast.error("Previous activity record was incomplete due to missing check-in days. The system has marked earlier records as completed. You can now click 'Start Again' to continue the activity.");
        }else {
          toast.error(backendMessage || "Unable to submit activity. Try again later..")
        }
      await fetchEmpAllocationData();
      // toast.error("Something went wrong")
      return false
    }
  }

  const handlePincodeSubmit = async () => {
    if (!pincode) {
      toast.error("Please enter pincode");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Pincode must be exactly 6 digits");
      return;
    }
    if (pincode === "000000") {
      toast.error("Pincode cannot be all zeros");
      return;
    }
    try {
      const formData = new FormData();

      const aId = pincodeProject?.original_A?.id;
      const empIdentifier = pincodeProject.original_P?.emp_id || pincodeProject.original_A?.emp_id || empidParam || emp_id
      const { apiDate: defaultApiDate } = getCurrentDateTimeDefaults();
      const activityDate = defaultApiDate;

      if (!aId) {
        toast.error("Please start the activity to add pin code.");
        return;
      }

      formData.append("emp_id", empIdentifier);
      formData.append("a_id", String(aId));
      formData.append("activity_date", activityDate);
      formData.append("call_mode", "DATA_CORRECT");
      formData.append("geo_type", "O");
      formData.append("pin_code", pincode);

      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const res = await postAllocationData(formData);

      // const res = { status: 200 }

      if (res?.status === 200) {
        setIsPincodeModalOpen(false);
        setPincode("");
        setPincodeProject(null);
        await fetchEmpAllocationData();
      } else {
        const apiMsg = res?.data?.error || res?.data?.message || "Failed to add pincode.";
        toast.error(apiMsg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add pincode.");
    }
  };

  const refreshActivities = async () => {
    await fetchEmpAllocationData();
    setIsFromModalOpen(false);
    setConfirmPopup(prev => ({ ...prev, isOpen: false }));
  };

  const ACTIVITY_ACTIONS = {

    start: {
      title: "Start Activity",
      message: "Are you sure you want to start this activity?",
      handler: async (activity, submit, refresh, retainerPage) => {
        if (!retainerPage) {
          const hasActivityStart = employeeActivity.some((p) => p.todaysStatus === "Active" || p.hasPendingCheckout === true);
          if (hasActivityStart) {
            toast.info("Complete pending activity first.");
            return false;
          }
        }
        return submit({ project: activity, mode: "ADD" });
      },
    },
    start_a: {
      title: "Start Activity",
      message: "Are you sure, Again you want to start the activity ?",
      handler: async (activity, submit, refresh, retainerPage) => {
        if (!retainerPage) {
          const hasActivityStart = employeeActivity.some((p) => p.todaysStatus === "Active" || p.hasPendingCheckout === true);
          if (hasActivityStart) {
            toast.info("Complete pending activity first.");
            return false;
          }
        }
        return submit({ project: activity, mode: "ADD" });
      },
    },

    resume: {
      title: "Resume Activity",
      message: "Do you want to resume this activity?",
      handler: async (activity, submit, refresh, retainerPage) => {
        if (!retainerPage) {
          const hasActivityStart = employeeActivity.some((p) => p.todaysStatus === "Active" || p.hasPendingCheckout === true);
          if (hasActivityStart) {
            toast.info("Complete pending activity first.");
            return false;
          }
        }
        const { currentTime } = getCurrentDateTimeDefaults();
        return submit({
          project: activity,
          mode: "UPDATE",
          data: { startTime: currentTime }
        });
      },
    },

    reverse: {
      title: "Reverse Audit status",
      message: `⚠️ You are about to undo the completed audit. The status will be changed to In Progress.\n\nDo you want to continue?`,
      handler: async (activity, submit, refresh, retainerPage) => {
        const { currentTime } = getCurrentDateTimeDefaults();
        return submit({
          project: activity,
          mode: "REVERSE_COMPLETE",
          data: { startTime: currentTime }
        });
      },
    },

    continue: {
      modal: true,
      modalContext: { type: "continue" }
    },
    force_complete: {
      modal: true,
      modalContext: { type: "force_complete" }
    },
    update_retainer: {
      modal: true,
      modalContext: { type: "update_retainer" }
    },

    complete: {
      modal: true,
      modalContext: { type: "complete" }
    },
    complete_y: {
      modal: true,
      modalContext: { type: "complete_y" }
    },

    checkout_yesterday: {
      modal: true,
      modalContext: {
        type: "checkout_yesterday",
        forceMode: "UPDATE",
        forcedDate: getYesterday().apiDate
      }
    }

  };

  // In your component — SUPER CLEAN
  const handleActivityAction = ({ type, activity, retainerPage, retainer, onRetainerUpdate, isMaxAuditEndDatePass }) => {
    const action = ACTIVITY_ACTIONS[type];
    const overrideMessages = {
      start_a: `Audit end date has passed.${'\n\n'} Are you sure again you want to start this activity?`,
      start: `Audit end date has passed.${'\n\n'} Are you sure you want to start this activity?`,
      resume: `Audit end date has passed.${'\n\n'} Are you sure you want to resume this activity?`,
    };

    const finalMessage = isMaxAuditEndDatePass ? overrideMessages[type] : action.message;

    if (action?.modal) {
      setSelectdeProject({
        ...activity,
        retainerData: retainer,
        modalContext: action.modalContext,
        retainerPage: !!retainerPage,
      });
      setIsFromModalOpen(true);
      return;
    }

    if (action?.handler) {
      // const contextLabel = getActivityContextLabel(activity);
      setConfirmPopup({
        isOpen: true,
        title: action.title,
        message: finalMessage,
        onConfirm: async () => {
          const success = await action.handler(activity, handleActivitySubmit, refreshActivities, retainerPage);
          if (success) {
            await refreshActivities(); // This does everything
          }
          if (onRetainerUpdate && retainer) {
            onRetainerUpdate(retainer.emp_id);
          }
          setConfirmPopup(prev => ({ ...prev, isOpen: false }));
        }
      });
    }
  };

  const getFilteredAndSortedActivities = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Next 7 rolling days: tomorrow → +7 days
    const next7Start = new Date(today);
    next7Start.setDate(today.getDate() + 1);
    const next7End = new Date(today);
    next7End.setDate(today.getDate() + 7);

    return employeeActivity
      .filter(activity => {
        const startDate = parseDateSafe(activity.planned_start_date);
        const endDate = parseDateSafe(activity.planned_end_date);

        if (!startDate) return false;

        const isIncomplete = !activity.project_period_status === "In Progress";
        const IncompleteActivity = activity.project_period_status === "In Progress";
        // const isTodayComplete = activity.todaysStatus === "Complete";

        if (selectedStatus !== "All" && activity.project_period_status !== selectedStatus) return false;

        // 2. Period Filter Rules
        // if (dayFilter === "today") {
        //   const isTodayInRange = startDate && endDate &&
        //     (isSameDay(today, startDate) || 
        //      isSameDay(today, endDate) || 
        //      (isAfter(today, startDate) && isBefore(today, endDate)));

        //   return isIncomplete || isTodayInRange;
        // }
        if (dayFilter === "today") {
          const isTodayInRange = isWithinInterval(today, { start: startDate, end: endDate });
          const isTodayRelevant = IncompleteActivity || isTodayInRange || activity.todaysStatus === "Active" || activity.todaysStatus === "Complete";
          return isTodayRelevant;

        }

        if (dayFilter === "next7") {
          // if (isIncomplete) return false; // Never show incomplete

          const hasOverlapWithNext7 = startDate && endDate && (
            (isAfter(startDate, today) && isBefore(startDate, next7End)) ||
            (isAfter(endDate, today) && isBefore(endDate, next7End)) ||
            (isBefore(startDate, next7Start) && isAfter(endDate, next7End))
          );
          return hasOverlapWithNext7;
        }

        if (dayFilter === "past7") {
          // Show past activities (you already handle logs separately)
          return isBefore(startDate, today) || isBefore(endDate, today);
        }

        if (dayFilter === "custom") {
          if (isIncomplete) return true;
          if (!startDate || !endDate) return false;

          const rangeStart = new Date(dateRange.start);
          const rangeEnd = new Date(dateRange.end);
          return hasOverlap(startDate, endDate, rangeStart, rangeEnd);
        }

        return true; // fallback
      })
      .sort((a, b) => {
        // Rule: In "Today" tab → Completed projects go to bottom
        if (dayFilter === "today") {
          const aCompleteToday = a.todaysStatus === "Complete";
          const bCompleteToday = b.todaysStatus === "Complete";

          if (aCompleteToday && !bCompleteToday) return 1;
          if (!aCompleteToday && bCompleteToday) return -1;
        }
        return 0;
      });
  };

  const filteredActivities = getFilteredAndSortedActivities();

  const totalRetainerCount = filteredActivities.reduce((total, activity) => {
    const list = activity?.original_P?.retainer_list || [];

    for (const retainer of list) {
      if (retainer.a_type === "P") total++;
    }

    return total;
  }, 0);

  const allRetainers = useMemo(() => {
    const retainers = [];
    filteredActivities.forEach(activity => {
      if (activity.original_P?.retainer_list) {
        activity.original_P.retainer_list
          .filter(r => r.a_type === "P")
          .forEach(retainer => {
            retainers.push({
              ...retainer,
              parentActivity: activity // Keep reference to parent for context if needed
            });
          });
      }
    });
    return retainers;
  }, [filteredActivities]);

  const uniqueEmpIds = useMemo(() => {
    return [...new Set(allRetainers.map(r => r.emp_id))];
  }, [allRetainers]);

  const fetchAllRetainerAllocationData = async (forceEmpId = null) => {
    if (uniqueEmpIds.length === 0) return;

    let empIdsToFetch = [];

    if (forceEmpId) {
      empIdsToFetch = [forceEmpId];
    } else {
      empIdsToFetch = uniqueEmpIds.filter(
        empId => !globalRetainerCache[empId]
      );
    }

    if (empIdsToFetch.length === 0) return;

    setIsGlobalRetainerLoading(true);

    const promises = empIdsToFetch.map(async (empId) => {
      const payload = {
        emp_id: empId,
        start_date: formatToDDMMYYYY(dateRange.start),
        end_date: formatToDDMMYYYY(dateRange.end),
      };

      try {
        const response = await getEmpAllocationData(payload);
        const normalized = formatRetainerActivities(response.data);

        setGlobalRetainerCache(prev => ({
          ...prev,
          [empId]: { allocations: normalized }
        }));
      } catch (err) {
        console.error(`Failed to load retainer data for emp ${empId}`, err);
      }
    });

    await Promise.all(promises);
    setIsGlobalRetainerLoading(false);
  };

  // console.log("GlobalRetainerCache", globalRetainerCache)

  useEffect(() => {
    // if (activeTab === "retainer") {
    if (activeTab !== "retainer") return;
    fetchAllRetainerAllocationData();
    // }
  }, [activeTab, uniqueEmpIds, dateRange]);

  const isOPE = filteredActivities.filter((item) => item.is_ope_actual === true);

  // console.log("isOPE", isOPE)

  const tabs = [
    { key: 'myActivity', label: `My Activity(${filteredActivities?.length})`, },
    ...(isOPE)? [{ key: 'ope_actual', label: `OPE Actual(${isOPE.length})`, }] : [],
    ...(totalRetainerCount !== 0 && !empidParam ? [{ key: 'retainer', label: `Assigned retainer(${totalRetainerCount})`, }] : []),
    ...((profile.grade_level < 100) ? [] : [{ key: 'emp_attend', label: `Employee Work status`, }] ),
  ].filter(Boolean);

  // console.log("filteredActivities", filteredActivities)

  return (
    <Layout title="My Audit Activities">
      <ClaimsHeader>
        <Tagline>Track and manage your assigned audit tasks</Tagline>
        {empName &&
          <Button variant="outline" style={{ marginRight: "0.5rem" }} onClick={() => pathName === "modal" ? navigate("/managers/timesheet/dashboard") : navigate("/employees")}>
            <FaUserCircle /> {empName}
          </Button>}
      </ClaimsHeader>

      <Card hoverable={false} >
        <TabContainer>
          {tabs.map(t => (
            <Tab key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </Tab>
          ))}
        </TabContainer>
        <Container>
          <CardTop>
            <TopDateInfo>
              <span style={{ color: '#999' }}>Today:</span>
              <Title style={{ padding: "0rem", marginBottom: "0rem" }}>{dayLogKey}</Title>
            </TopDateInfo>
            {activeTab !== "emp_attend" &&
              <FilterContainer>
                <FilterRow>
                  {activeTab !== "ope_actual" && <FilterSelect
                    name="selectedStatus"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Complete</option>
                  </FilterSelect>}
                  <FilterSelect
                    name="dayFilter"
                    value={dayFilter}
                    onChange={(e) => {
                      const value = e.target.value
                      setDayFilter(value)
                      if (value === "custom") {
                        setShowCustomRange(true)
                      } else {
                        setShowCustomRange(false)
                      }
                    }}
                  >
                    <option value="past7">Past Activity</option>
                    <option value="today">Today</option>
                    <option value="next7">Upcoming 7 Days Activity</option>
                    <option value="custom">Custom Range</option>
                  </FilterSelect>

                  <Button variant="outline" size="sm" onClick={() => {
                    setDayFilter("today");
                    setSelectedStatus("All");
                    setShowCustomRange(false);
                    setDateRange(getMonthRange({ type: "current" }));
                    fetchEmpAllocationData()
                  }}>
                    <MdFilterAltOff /> Clear Filter
                  </Button>
                </FilterRow>

                {showCustomRange && (
                  <CustomRangeRow>
                    <DateInput type="date" value={dateRange.start} onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))} />
                    <span>to</span>
                    <DateInput type="date" value={dateRange.end} onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))} />

                    <Button variant="outline" size="sm" onClick={() => {
                      if (dayFilter === "custom") {
                        fetchEmpAllocationData(dateRange.start, dateRange.end)
                      }
                    }}>
                      <FaFilter /> Filter
                    </Button>
                  </CustomRangeRow>
                )}

              </FilterContainer>
            }

          </CardTop>
          {activeTab === "myActivity" ? (
            filteredActivities.length === 0 ? (
              <Card style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                No activities found.
              </Card>
            ) : (
              filteredActivities.map(activity => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  filterType={empidParam ? "custom" : dayFilter}
                  onAction={handleActivityAction}
                  isManager={empidParam}
                  onNavigateToRetainer={() => { setActiveTab('retainer'); setActiveRetainerParentId(activity.id || activity.p_id) }}
                  onNavigateToOpe={() => { setActiveTab('ope_actual') }}
                  onAddPincode={(activity) => {
                    setPincodeProject(activity);
                    setIsPincodeModalOpen(true);
                  }}
                />
              ))
            )
          ) :
            activeTab === "emp_attend" ? <EmployeeLogStatusCard /> : 
            activeTab === "ope_actual" ?  <OPEActual data={filteredActivities} refreshActivities={fetchEmpAllocationData} /> :
              (
                <>
                  {isGlobalRetainerLoading ? (
                    <Card style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                      Loading retainer details...
                    </Card>
                  ) : allRetainers.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                      No retainers assigned in the current filter.
                    </Card>
                  ) : (
                    <GroupedRetainerAccordion
                      allRetainers={allRetainers}
                      retainerCache={globalRetainerCache}
                      onAction={handleActivityAction}
                      onRetainerUpdate={fetchAllRetainerAllocationData}
                      activeParentId={activeRetainerParentId}
                    />
                  )}
                </>
              )}


        </Container>
      </Card>

      {isFormModalOpen && selectedProject && (
        <ProjectManagementAddForm
          isOpen={isFormModalOpen}
          onClose={() => setIsFromModalOpen(false)}
          activity={selectedProject}
          onSubmit={() => { refreshActivities() }}
          onActivitySubmit={handleActivitySubmit}
          // isSubmitting={submittingProjectId === selectedProject?.id}
          modalContext={selectedProject?.modalContext}
          forceMode={selectedProject?.modalContext?.forceMode}
          allRetainers={allRetainers}
          retainerCache={globalRetainerCache}
          retainerPage={selectedProject?.retainerPage}
        />
      )}

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
      {isPincodeModalOpen && <Modal onClose={() => { setIsPincodeModalOpen(false); setPincode("") }}>
        <FormGroup>
          <Label>Pincode</Label>
          <Input type="number" min={100000} max={999999} value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" />
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" onClick={handlePincodeSubmit}>
            Submit
          </Button>
        </div>
      </Modal>}

    </Layout>
  )
}

export default ProjectManagementTimesheetEmployee