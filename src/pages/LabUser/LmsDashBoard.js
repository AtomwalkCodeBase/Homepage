"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import {
  FaSearch,
  FaFilter,
  FaPlay,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxes,
  FaClipboardList,
  FaFlask,
  FaClock,
  FaCheckDouble,
  FaExclamationTriangle,
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
  FaUser,
} from "react-icons/fa"
import { getusersampleevent, processsampleevt } from "../../services/productServices"
import Layout from "../../components/Layout"
import RemarksModal from "../../components/modals/RemarksModal"


const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FilterSection = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 10px 15px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}22;
  }

  input {
    border: none;
    background: transparent;
    flex: 1;
    outline: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.text};
    margin-right: 10px;
  }
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.background)};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${(props) => {
    switch (props.type) {
      case "active":
        return props.theme.colors.primary + "22"
      case "pending":
        return props.theme.colors.warning + "22"
      case "completed":
        return props.theme.colors.success + "22"
      case "failed":
        return props.theme.colors.error + "22"
      default:
        return props.theme.colors.infoBg
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case "active":
        return props.theme.colors.primary
      case "pending":
        return props.theme.colors.warning
      case "completed":
        return props.theme.colors.success
      case "failed":
        return props.theme.colors.error
      default:
        return props.theme.colors.info
    }
  }};
`

const StatContent = styled.div`
  flex: 1;
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const SamplesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const SamplesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`




const ActivityName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`

const ActivityStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${(props) => {
    switch (props.status?.toUpperCase()) {
      case "COMPLETED":
        return props.theme.colors.successBg
      case "IN_PROGRESS":
      case "STARTED":
        return props.theme.colors.warningBg
      case "NOT_STARTED":
        return props.theme.colors.infoBg
      case "FAILED":
        return props.theme.colors.dangerBg
      default:
        return props.theme.colors.mutedBg
    }
  }};
  color: ${(props) => {
    switch (props.status?.toUpperCase()) {
      case "COMPLETED":
        return props.theme.colors.success
      case "IN_PROGRESS":
      case "STARTED":
        return props.theme.colors.warning
      case "NOT_STARTED":
        return props.theme.colors.info
      case "FAILED":
        return props.theme.colors.error
      default:
        return props.theme.colors.warning
    }
  }};
`

const Section = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
`

const SectionTitle = styled.h5`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th {
    background: ${({ theme }) => theme.colors.mutedBg};
    padding: 8px;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.background};
  }
`

const QCCheckList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const QCItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`

const QCCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${(props) => (props.checked ? props.theme.colors.success : props.theme.colors.mutedBg)};
  color: ${(props) => (props.checked ? "white" : props.theme.colors.border)};
  font-weight: bold;
  font-size: 0.8rem;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`
// Add these styled components
const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 8px;
  font-size: 0.85rem;
  color: #666;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
`;

const ItemsPerPageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  select {
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background: white;
  }
  label {
    color: #333;
  }
`;

const PaginationInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  label {
    font-size: 0.9rem;
    color: #555;
    font-weight: 500;
  }
  
  input {
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;

const ClearDateButton = styled.button`
  padding: 6px 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #dc2626;
  }
`;

const FilterButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 2rem;
  padding: 1rem;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.disabled ? '#f3f4f6' : '#3b82f6'};
  color: ${props => props.disabled ? '#9ca3af' : 'white'};
  border: none;
  border-radius: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  
  &:hover:not(:disabled) {
    background: #2563eb;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 5px;
`;

const PageNumber = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#3b82f6' : '#ddd'};
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#555'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: ${props => props.active ? '#3b82f6' : '#f3f4f6'};
  }
`;

// Update ActivityCard style if needed (make it look like SampleCard but for individual activities)
const ActivityCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

const ActivityHeader = styled.div`
  padding: 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ActivityBody = styled.div`
  padding: 20px;
`;
const StartButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
  }
`

const CompleteButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.success};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.successDark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.success}40;
  }
`

const FailButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.error};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.dangerDark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.danger}40;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.text};
`

const LmsDashBoard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [remarksModal, setRemarksModal] = useState({
    isOpen: false,
    title: "",
    activity: null,
    action: null,
  });
  const [counter, setCounter] = useState([]);
  const [sampleCounter, setSampleCounter] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Date filter state
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: ""
  });

  console.log(activities, "activities data");
  console.log(sampleCounter, "counter data");

  useEffect(() => {
    fetchActivities(statusFilter === "completed" || statusFilter === "failed");
  }, [statusFilter]);

  useEffect(() => {
    getusersampleevent(true).then((response) => {
      if (response) {
        const transformedData = transformActivitiesData(response.data);
        setCounter(transformedData);
      }
    });

    getusersampleevent(false).then((response) => {
      if (response) {
        const transformedDatas = transformActivitiesData(response.data);
        setSampleCounter(transformedDatas);
      }
    });
  }, []);

  const fetchActivities = async (completedData) => {
    try {
      setLoading(true);
      const response = await getusersampleevent(completedData);
      if (response) {
        const transformedData = transformActivitiesData(response.data);
        setActivities(transformedData);
        setCurrentPage(1); // Reset to first page on new data
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const transformActivitiesData = (apiData) => {
    return apiData.map((activity) => ({
      id: activity.id,
      sample_id: activity.sample_item_id,
      sample_name: activity.sample_name,
      customer_name: activity.customer_name,
      collection_date: activity.start_date,
      activity_id: activity.id,
      activity_name: activity.activity_name,
      status: mapActivityStatus(activity.status),
      status_display: activity.status_display,
      is_previous_completed: activity.is_previous_completed,
      event_items: activity.event_items?.map((item) => ({
        item_id: item.id,
        item_name: item.item_name,
        system_quantity: item.sys_quantity,
        user_quantity: item.user_quantity,
        available_quantity: item.available_qty,
      })) || [],
      qc_checklist: activity.qc_check_list?.map((qc) => ({
        qc_name: qc.qc_name,
        qc_type: qc.qc_type,
        qc_value: qc.qc_value,
        qc_actual: qc.qc_actual || "",
        item: qc.qc_name,
        status: qc.qc_actual,
      })) || [],
      remarks: activity.remarks,
      start_date: activity.start_date,
      end_date: activity.end_date,
      actual_start_date: activity.a_start_date,
      actual_end_date: activity.a_end_date,
      planned_duration: activity.planned_duration,
      srl_num: activity.srl_num,
      util_sample_qty: activity.util_sample_qty,
    }));
  };

  const mapActivityStatus = (apiStatus) => {
    const statusMap = {
      N: "NOT_STARTED",
      Y: "STARTED",
      I: "IN_PROGRESS",
      S: "COMPLETED",
      F: "FAILED",
    };
    return statusMap[apiStatus] || "NOT_STARTED";
  };

  // Apply filters to activities
  const filteredActivities = activities.filter((activity) => {
    // Search filter
    const matchesSearch =
      activity.sample_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.sample_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.activity_name.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    let matchesStatus = true;
    if (statusFilter !== "all") {
      const statusMapping = {
        "not started": "NOT_STARTED",
        "in progress": ["IN_PROGRESS", "STARTED"],
        "completed": "COMPLETED",
        "failed": "FAILED"
      };

      const statusToCheck = statusMapping[statusFilter];
      if (Array.isArray(statusToCheck)) {
        matchesStatus = statusToCheck.includes(activity.status);
      } else {
        matchesStatus = activity.status === statusToCheck;
      }
    }

    // Date filter
    let matchesDate = true;
    if (dateFilter.startDate && dateFilter.endDate) {
      const activityDate = new Date(activity.start_date);
      const startDate = new Date(dateFilter.startDate);
      const endDate = new Date(dateFilter.endDate);
      endDate.setHours(23, 59, 59, 999); // Include entire end day

      matchesDate = activityDate >= startDate && activityDate <= endDate;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const stats = {
    total: sampleCounter.length + counter.length,
    active: sampleCounter.length,
    completed: counter.filter((s) => s.status === "COMPLETED").length,
    failed: counter.filter((s) => s.status === "FAILED").length,
  };

  const handleActivityAction = (activity, action) => {
    const actionTitles = {
      START: "Start Activity",
      COMPLETED: "Complete Activity",
      FAILED: "Mark as Failed",
    };

    setRemarksModal({
      isOpen: true,
      title: actionTitles[action] || "Activity Action",
      activity: activity,
      action: action,
    });
  };

  const submitActivityAction = async (formData) => {
    try {
      const response = await processsampleevt(formData);
      if (response) {
        toast.success(`Activity ${remarksModal.action.toLowerCase()} successfully!`);
        setRemarksModal({
          isOpen: false,
          title: "",
          activity: null,
          action: null,
        });
        fetchActivities(statusFilter === "completed" || statusFilter === "failed");
      }
    } catch (error) {
      console.error("Error processing activity:", error);
      toast.error(error.error || "Failed to process activity");
    }
  };

  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when date filter changes
  };

  const clearDateFilter = () => {
    setDateFilter({
      startDate: "",
      endDate: ""
    });
  };

  if (loading) {
    return (
      <Layout title="Activity Dashboard">
        <LoadingContainer>Loading activities...</LoadingContainer>
      </Layout>
    );
  }

  return (
    <Layout title="Activity Dashboard">
      <DashboardContainer>
        <StatsGrid>
          <StatCard>
            <StatIcon type="active">
              <FaFlask />
            </StatIcon>
            <StatContent>
              <StatLabel>Total Activities</StatLabel>
              <StatValue>{stats.total}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon type="pending">
              <FaClock />
            </StatIcon>
            <StatContent>
              <StatLabel>Pending</StatLabel>
              <StatValue>{stats.active}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon type="completed">
              <FaCheckDouble />
            </StatIcon>
            <StatContent>
              <StatLabel>Completed</StatLabel>
              <StatValue>{stats.completed}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon type="failed">
              <FaExclamationTriangle />
            </StatIcon>
            <StatContent>
              <StatLabel>Failed</StatLabel>
              <StatValue>{stats.failed}</StatValue>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <FilterSection>
          <SearchBox>
            <FaSearch />
            <input
              type="text"
              placeholder="Search by sample, activity, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBox>

          {/* Date Filter */}
          <DateFilterContainer>
            <DateInputWrapper>
              <label>From:</label>
              <input
                type="date"
                name="startDate"
                value={dateFilter.startDate}
                onChange={handleDateFilterChange}
              />
            </DateInputWrapper>
            <DateInputWrapper>
              <label>To:</label>
              <input
                type="date"
                name="endDate"
                value={dateFilter.endDate}
                onChange={handleDateFilterChange}
                min={dateFilter.startDate}
              />
            </DateInputWrapper>
            {(dateFilter.startDate || dateFilter.endDate) && (
              <ClearDateButton onClick={clearDateFilter}>
                <FaTimesCircle /> Clear
              </ClearDateButton>
            )}
          </DateFilterContainer>

          {/* Status Filter Buttons */}
          <FilterButtonsRow>
            <FilterButton active={statusFilter === "all"} onClick={() => setStatusFilter("all")}>
              <FaFilter /> All Activities
            </FilterButton>

            <FilterButton active={statusFilter === "not started"} onClick={() => setStatusFilter("not started")}>
              Pending
            </FilterButton>

            <FilterButton active={statusFilter === "in progress"} onClick={() => setStatusFilter("in progress")}>
              In Progress
            </FilterButton>

            <FilterButton active={statusFilter === "completed"} onClick={() => setStatusFilter("completed")}>
              Completed
            </FilterButton>

            <FilterButton active={statusFilter === "failed"} onClick={() => setStatusFilter("failed")}>
              Failed
            </FilterButton>
          </FilterButtonsRow>
        </FilterSection>

        {/* Items per page selector */}
        <PaginationControls>
          <ItemsPerPageSelector>
            <label>Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </ItemsPerPageSelector>

          <PaginationInfo>
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredActivities.length)} of {filteredActivities.length} activities
          </PaginationInfo>
        </PaginationControls>

        <SamplesSection>
          <SamplesList>
            {currentActivities.length === 0 ? (
              <EmptyState>
                <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>No activities found</div>
                <div style={{ fontSize: "0.9rem" }}>Try adjusting your search or filter criteria</div>
              </EmptyState>
            ) : (
              currentActivities.map((activity) => (
                <ActivityCard key={`${activity.sample_id}-${activity.activity_id}`}>
                  <ActivityHeader>
                    <ActivityInfo>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <ActivityName>
                          <FaFlask /> {activity.activity_name}
                        </ActivityName>
                        <ActivityStatus status={activity.status}>
                          {activity.status_display}
                        </ActivityStatus>
                      </div>
                      <ActivityMeta>
                        <MetaItem>
                          <FaTag /> Sample: {activity.sample_name} (ID: {activity.sample_id})
                        </MetaItem>
                        <MetaItem>
                          <FaUser /> Customer: {activity.customer_name}
                        </MetaItem>
                        <MetaItem>
                          <FaCalendar /> Start Date: {activity.start_date}
                        </MetaItem>
                        {activity.planned_duration && (
                          <MetaItem>
                            <FaClock /> Duration: {activity.planned_duration} days
                          </MetaItem>
                        )}
                      </ActivityMeta>
                    </ActivityInfo>
                  </ActivityHeader>

                  <ActivityBody>
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                        <strong>Planned:</strong> {activity.start_date} to {activity.end_date}
                      </div>
                      {activity.actual_start_date && (
                        <div style={{ fontSize: "0.9rem", color: "#666" }}>
                          <strong>Actual:</strong> {activity.actual_start_date}
                          {activity.actual_end_date && ` to ${activity.actual_end_date}`}
                        </div>
                      )}
                    </div>

                    {activity.event_items && activity.event_items.length > 0 && (
                      <Section>
                        <SectionTitle>
                          <FaBoxes /> Inventory Items
                        </SectionTitle>
                        <InventoryTable>
                          <thead>
                            <tr>
                              <th>Item Name</th>
                              <th>System Qty</th>
                              <th>User Qty</th>
                              <th>Available Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activity.event_items.map((item) => (
                              <tr key={item.item_id}>
                                <td>{item.item_name}</td>
                                <td>{item.system_quantity}</td>
                                <td>{item.user_quantity}</td>
                                <td>{item.available_quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </InventoryTable>
                      </Section>
                    )}

                    {activity.qc_checklist && activity.qc_checklist.length > 0 && (
                      <Section>
                        <SectionTitle>
                          <FaClipboardList /> QC Checklist
                        </SectionTitle>
                        <QCCheckList>
                          {activity.qc_checklist.map((item, index) => (
                            <QCItem key={index}>
                              <QCCheckbox checked={item.status}>{item.status ? "✓" : "-"}</QCCheckbox>
                              <span>{item.item}</span> {item.qc_actual && <span>({item.qc_actual})</span>}
                            </QCItem>
                          ))}
                        </QCCheckList>
                      </Section>
                    )}

                    {activity.remarks && activity.remarks.trim() && (
                      <Section>
                        <SectionTitle>Remarks</SectionTitle>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            fontStyle: "italic",
                          }}
                        >
                          {activity.remarks}
                        </div>
                      </Section>
                    )}

                    {activity.util_sample_qty && Number.parseFloat(activity.util_sample_qty) > 0 && (
                      <Section>
                        <SectionTitle>Sample Usage</SectionTitle>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                          }}
                        >
                          Utilized Sample Quantity: {activity.util_sample_qty}
                        </div>
                      </Section>
                    )}

                    <ActionButtons>
                      {activity.status === "NOT_STARTED" && activity.is_previous_completed && (
                        <StartButton onClick={() => handleActivityAction(activity, "START")}>
                          <FaPlay /> Start Activity
                        </StartButton>
                      )}

                      {(activity.status === "IN_PROGRESS" || activity.status === "STARTED") && (
                        <>
                          <CompleteButton onClick={() => handleActivityAction(activity, "COMPLETED")}>
                            <FaCheckCircle /> Complete Activity
                          </CompleteButton>
                          <FailButton onClick={() => handleActivityAction(activity, "FAILED")}>
                            <FaTimesCircle /> Mark as Failed
                          </FailButton>
                        </>
                      )}
                    </ActionButtons>
                  </ActivityBody>
                </ActivityCard>
              ))
            )}
          </SamplesList>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft /> Previous
              </PaginationButton>

              <PageNumbers>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <PageNumber
                      key={pageNumber}
                      active={currentPage === pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </PageNumber>
                  );
                })}
              </PageNumbers>

              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <FaChevronRight />
              </PaginationButton>
            </Pagination>
          )}
        </SamplesSection>

        <RemarksModal
          isOpen={remarksModal.isOpen}
          title={remarksModal.title}
          actionType={remarksModal.action}
          activity={remarksModal.activity}
          onSubmit={submitActivityAction}
          onClose={() => setRemarksModal({
            isOpen: false,
            title: "",
            activity: null,
            action: null
          })}
        />
      </DashboardContainer>
    </Layout>
  );
};
export default LmsDashBoard
