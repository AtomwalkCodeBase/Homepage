import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components';
import { FiZap, FiClock, FiCheckCircle, } from 'react-icons/fi';
import { theme } from '../../styles/Theme';
import StatsCard from '../../components/StatsCard';
import { buildActivityGroupMap, buildStatsSummary, deriveActivityStatusForDate, filterActivities, formatAPITime, formatDate, formatMonthLabel, formatToApiDate, formatToDDMMYYYY, formatWeekLabel, getMonthRange, getStatusLabelVariant, getTodayApiDateStr, mapEmployeeCustomerOrderItemData, parseApiDate } from './utils/utils';
import Badge from '../../components/Badge';
import { getEmpAllocationData, getemployeeList, processTimesheetApproval } from '../../services/productServices';
import PaginationComponent from '../../components/Pagination';
import Button from '../../components/Button';
import { FaChevronLeft, FaChevronRight, FaEye, FaFileExport } from 'react-icons/fa';
import EmployeeWiseTSView from '../../components/modals/ModalForProjectmanagemnt/EmployeeWiseTSView';
import WeeklyTimesheetSummary from './WeeklyTimesheetSummary';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { MdFilterAltOff } from 'react-icons/md';
import ConfirmPopup from '../../components/modals/ConfirmPopup';
import { useExport } from '../../context/ExportContext';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
`;

const Main = styled.main`
  padding: ${theme.spacing.xs};
   / * max-width: 1400px; */ 
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xs};
  }
`;

const PageSubtitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FilterSection = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
  
  &::placeholder {
    color: ${theme.colors.textLight};
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  background: white;
  cursor: pointer;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  /* smooth scrolling on mobile */
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 6px;
  }
`;

const GridTable = styled.div`
  min-width: 1100px; 
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;


const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 1.7fr) minmax(200px, 1.5fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(120px, 0.8fr) minmax(140px, 1fr) minmax(100px, 0.3fr);
  background: ${theme.colors.backgroundAlt};
  border-bottom: 1px solid ${theme.colors.border};
`;

const DataRow = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 1.7fr) minmax(200px, 1.5fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(120px, 0.8fr) minmax(140px, 1fr) minmax(100px, 0.3fr);
  border-bottom: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.backgroundAlt}50;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  min-width: 0; /* prevents overflow breaking grid */
`;

const HeaderCell = styled(Cell)`
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  color: ${theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CustomerInfo = styled.div`
  .name {
    font-weight: 600;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.text};
    margin-bottom: 2px;
  }
  
  .location {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textLight};
    display: flex;
    align-items: center;
    gap: 4px;
  }

`;

const AuditorInfo = styled.div`
  .name {
    font-weight: 500;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.text};
    margin-bottom: 2px;
  }
  
  .id {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textLight};
  }
  
  .type {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.primary};
    font-weight: 600;
    margin-top: 2px;
  }
      
  .key {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textLight};
    margin-top: 2px;
  }
`;

const TimeInfo = styled.div`
  .date {
    font-weight: 500;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.text};
    margin-bottom: 2px;
  }
  
  .time {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textLight};
  }
`;

const ProgressBar = styled.div`
  .bar-container {
    width: 100%;
    height: 8px;
    background: ${theme.colors.backgroundAlt};
    border-radius: ${theme.borderRadius.full};
    overflow: hidden;
    margin-bottom: 4px;
  }
  
  .bar-fill {
    height: 100%;
    background: ${props => {
    if (props.status === 'OVERDUE') return theme.colors.error;
    if (props.status === 'ON TIME') return theme.colors.success;
    if (props.status === 'IN PROGRESS') return theme.colors.warning;
    return theme.colors.primary;
  }};
    transition: ${theme.transitions.normal};
    border-radius: ${theme.borderRadius.full};
  }
  
  .text {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textLight};
    text-align: right;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
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
const FullWidthCell = styled(Cell)`
  grid-column: 1 / -1;
  justify-content: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.textLight};
`;
const CalendarContainer = styled.div`
  display: flex;
   gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`

const MonthText = styled.h4`
  margin: 0;
`
const TableActions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;


const ManagerDashboard = () => {
  const { profile } = useAuth();
  const { exportEmployeeAuditData } = useExport();
  const [activeTab, setActiveTab] = useState("daily");
  const [employees, setEmployees] = useState([])
  const [m_employee_id, setM_Employee_id] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allEmployeeAllocationData, setAllEmployeeAllocationData] = useState([]);
  const [WeeklyTimesheetSummaryData, setWeeklyTimesheetSummaryData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [customerFilter, setCustomerFilter] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayApiDateStr());
  const todayDate = getTodayApiDateStr();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const currentDate = useMemo(() => {
    const selectedDateObj = parseApiDate(selectedDate);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const selectedMonth = selectedDateObj.getMonth();
    const selectedYear = selectedDateObj.getFullYear();
    const offset = (selectedYear - currentYear) * 12 + (selectedMonth - currentMonth);
    return getMonthRange({ type: "current", mode: "month", offset });
  }, [activeTab, selectedDate]);

  const [selectedSessionItem, setSelectedSessionItem] = useState(null);
  const [sessionDayLogStatuses, setSessionDayLogStatuses] = useState({});
  const [employeeDayLogsModal, setEmployeeDayLogsModal] = useState(false)
  const m_emp_id = localStorage.getItem("empId")
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [confirmType, setConfirmType] = useState(null);

  const groupedActivities = useMemo(() => {
    return buildActivityGroupMap(allEmployeeAllocationData);
  }, [allEmployeeAllocationData]);

  const derivedActivities = useMemo(() => {
    return deriveActivityStatusForDate(
      groupedActivities,
      selectedDate,
      // currentDate.start,
      new Date()
    );
  }, [groupedActivities, selectedDate]);

  const statsSummary = useMemo(() => {
    return buildStatsSummary(derivedActivities);
  }, [derivedActivities]);

  const filteredActivities = useMemo(() => {
    return filterActivities(derivedActivities, statusFilter, customerFilter, employeeFilter, searchTerm);
  }, [derivedActivities, statusFilter, customerFilter, employeeFilter, searchTerm]);

  // Calculate paginated data
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredActivities.slice(startIndex, endIndex);
  }, [filteredActivities, currentPage, itemsPerPage]);

  const handlePageChange = (page, perPage = itemsPerPage) => {
    setCurrentPage(page);
    if (perPage !== itemsPerPage) {
      setItemsPerPage(perPage);
      setCurrentPage(1); // Reset to first page when changing items per page
    }
  };

  const handlePreviousDay = () => {
    if (activeTab === "daily") {
      const date = parseApiDate(selectedDate);
      date.setDate(date.getDate() - 1);
      setSelectedDate(formatToApiDate(date));
    } else {
      // For weekly/monthly view, navigate by month
      const date = parseApiDate(selectedDate);
      date.setMonth(date.getMonth() - 1);
      date.setDate(1); // Set to first day of the month
      setSelectedDate(formatToApiDate(date));
    }
  };

  const handleNextDay = () => {
    if (activeTab === "daily") {
      const date = parseApiDate(selectedDate);
      date.setDate(date.getDate() + 1);
      setSelectedDate(formatToApiDate(date));
    } else {
      // For weekly/monthly view, navigate by month
      const date = parseApiDate(selectedDate);
      date.setMonth(date.getMonth() + 1);
      date.setDate(1); // Set to first day of the month
      setSelectedDate(formatToApiDate(date));
    }
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, customerFilter, employeeFilter, searchTerm]);

    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await getemployeeList()
          const filteredData = response.data.filter((emp) => emp.is_manager && emp.emp_id !== m_emp_id )
          setEmployees(filteredData)
          // console.log(filteredData)
          setLoading(false)
        } catch (err) {
          toast.error("Failed to fetch Employee List")
          setLoading(false)
        }
      }
  
      fetchEmployees()
    }, [])

  useEffect(() => {
    fetchEmpAllocation(currentDate.start, currentDate.end);
  }, [currentDate.start, currentDate.end, m_employee_id]);

  const fetchEmpAllocation = async (startOverride, endOverride) => {

    const start = startOverride || currentDate.start
    const end = endOverride || currentDate.end

    const payload = {
      m_emp_id: m_employee_id ? m_employee_id : m_emp_id,
      start_date: formatToDDMMYYYY(start),
      end_date: formatToDDMMYYYY(end),
    }
    setIsLoading(true)
    try {
      const res = await getEmpAllocationData(payload);
      const WeeklyTimesheetSummary = mapEmployeeCustomerOrderItemData(res.data);

      setWeeklyTimesheetSummaryData(WeeklyTimesheetSummary)

      const allocationData = res?.data || [];

      setAllEmployeeAllocationData(allocationData)

    } catch (error) {
      // console.error("Error fetching allocation data:", error);
      toast.error("Something went wrong. Try again later!!!")
      setAllEmployeeAllocationData([])
    } finally {
      setIsLoading(false)
    }
  };

  const uniqueCustomers = Array.from(new Set(derivedActivities.map(a => a.customer_name).filter(Boolean))).sort();

  const employeeMap = new Map();

  derivedActivities.forEach(a => {
    if (!employeeMap.has(a.emp_id)) {
      employeeMap.set(a.emp_id, {
        id: a.emp_id,
        name: a.employee_name
      });
    }
  });

  const uniqueEmployees = Array.from(employeeMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const statsData = [
    {
      icon: <FiZap />,
      label: "Started",
      value: statsSummary.STARTED.total,
      color: "primary",
      sections: [
        {
          items: [
            { label: "On Time", value: statsSummary.STARTED.ON_TIME, status: "success", subStatus: "ON_TIME" },
            { label: "Delayed", value: statsSummary.STARTED.DELAYED, status: "warning", subStatus: "DELAYED" }
          ]
        },
      ],
      onClick: () => setStatusFilter({ main: "STARTED", sub: null }),
      onItemClick: (item) => setStatusFilter({ main: "STARTED", sub: item.subStatus })
    },
    {
      icon: <FiClock />,
      label: "Not Started",
      value: statsSummary.NOT_STARTED.total,
      color: "secondary",
      sections: [
        {
          items: [
            { label: "Planned", value: statsSummary.NOT_STARTED.PLANNED, status: "info", subStatus: "PLANNED" },
            { label: "Over Due", value: statsSummary.NOT_STARTED.OVERDUE, status: "error", subStatus: "OVERDUE" }
          ]
        },
      ],
      onClick: () => setStatusFilter({ main: "NOT_STARTED", sub: null }),
      onItemClick: (item) => setStatusFilter({ main: "NOT_STARTED", sub: item.subStatus })
    },
    {
      icon: <FiCheckCircle />,
      label: "Check out",
      value: statsSummary.CHECK_OUT.total,
      color: "success",
      sections: [
        {
          items: [
            { label: "On Time", value: statsSummary.CHECK_OUT.ON_BEFORE_TIME, status: "success", subStatus: "ON_BEFORE_TIME" },
            { label: "Delay", value: statsSummary.CHECK_OUT.DELAYED, status: "warning", subStatus: "DELAYED" }
          ]
        },
      ],
      onClick: () => setStatusFilter({ main: "CHECK_OUT", sub: null }),
      onItemClick: (item) => setStatusFilter({ main: "CHECK_OUT", sub: item.subStatus })
    },
  ]


  const handleViewSession = (employee, orderItem) => {
    const rawDayLogs = orderItem.dayLogs || {};
    const dayLogsArray = Object.values(rawDayLogs).map(log => ({
      ...log,
      check_in: log.check_in?.time || log.check_in || '',
      check_out: log.check_out?.time || log.check_out || '',
      units_counted: log.no_of_items || 0,
      approval_status: log.approval_status || 'PENDING'
    }));

    const normalizedOrderItem = { ...orderItem, day_logs: dayLogsArray };

    setSelectedSessionItem({ employee, orderItem: normalizedOrderItem });

    const statuses = {};
    dayLogsArray.forEach(log => {
      statuses[log.date] = log.approval_status;
    });
    setSessionDayLogStatuses(statuses);
    setEmployeeDayLogsModal(true);
  };

  const handleViewItem = (employee, orderItem) => {
    handleViewSession(employee, orderItem);
  };


  const handleCloseSessionModal = () => {
    setSelectedSessionItem(null);
    setSessionDayLogStatuses({});
    setEmployeeDayLogsModal(false);
  };

    const handleApproveWeekly = (employee, orderItem, call_mode) => {
    setSelectedItem({ employee, orderItem });
    setConfirmType(call_mode);
    setConfirmModalOpen(true);
  };

    const handleConfirm = async () => {
      if (!selectedItem) return;
      const approverId = localStorage.getItem("empId")
  
      setIsLoading(true);
      try {
        const payload = {
          emp_id: selectedItem.employee.emp_id,
          // start_date: formatToDDMMYYYY(selectedItem.orderItem.actual_start_date),
          start_date: selectedItem.orderItem.actual_start_date,
          // end_date: formatToDDMMYYYY(selectedItem.orderItem.actual_end_date),
          end_date: selectedItem.orderItem.actual_end_date,
          call_mode: confirmType,
          a_emp_id: approverId,
        };
  
        const response = await processTimesheetApproval(payload);
  
        // console.log(payload)
  
        // const response = { status: 200 }
  
        if (response?.status === 200) {
          toast.success(`Timesheet Approved from ${payload.start_date} to ${payload.end_date} Successfully`);
          // Optionally refresh data here
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
  
      } catch (error) {
        console.error("Error processing timesheet:", error);
        toast.error("An error occurred while processing the request.");
      } finally {
        setIsLoading(false);
        setConfirmModalOpen(false);
        setSelectedItem(null);
        setConfirmType(null);
      }
    };

  const STATUS_META = {
    NOT_STARTED: {
      PLANNED: {
        label: "Not Started - Planned",
        shortLabel: "Planned",
        variant: "info"
      },
      OVERDUE: {
        label: "Not Started - Overdue",
        shortLabel: "Overdue",
        variant: "error"
      }
    },

    STARTED: {
      ON_TIME: {
        label: "In - On Time",
        shortLabel: "On Time",
        variant: "success"
      },
      DELAYED: {
        label: "In - Delayed",
        shortLabel: "Delayed",
        variant: "warning"
      }
    },

    CHECK_OUT: {
      ON_BEFORE_TIME: {
        label: "Out - On Time",
        shortLabel: "On Time",
        variant: "success"
      },
      DELAYED: {
        label: "Out - Delayed",
        shortLabel: "Delayed",
        variant: "warning"
      }
    },
  };

  const MAIN_STATUS_META = {
    NOT_STARTED: { label: "Not Started", shortLabel: "Not Started", variant: "info" },
    STARTED: { label: "Started", shortLabel: "Started", variant: "primary" },
    CHECK_OUT: { label: "Checked Out", shortLabel: "Checked Out", variant: "success" },
  };

  const getStatusMeta = (status) => {
    if (!status?.main) {
      return { label: "Unknown", shortLabel: "Unknown", variant: "info" };
    }

    // If only main is provided, return a generic main-level label
    if (!status?.sub) {
      return MAIN_STATUS_META[status.main] || { label: status.main, shortLabel: status.main, variant: "info" };
    }

    return STATUS_META?.[status.main]?.[status.sub] || { label: status.sub, shortLabel: status.sub, variant: "info" };
  };

  const tabs = [
    { key: 'daily', label: `Daily Status`, },
    { key: 'weekly', label: `Weekly Timesheet`, }
  ].filter(Boolean);

    const buildAuditExportData = (data = []) => {
    const rows = [];

    console.log("data", data)

    if (!Array.isArray(data) || data.length === 0) return rows;

    // Support both hierarchical (employees → customers → order_items)
    // and flattened activity row structures.
    const first = data[0];

    const isEmployeeStructured = Boolean(first?.customers);

    if (isEmployeeStructured) {
      console.log("come block 1")
      data.forEach((employee) => {
        const { emp_id, employee_name, customers = [] } = employee;

        customers.forEach((customer) => {
          const { order_items = [] } = customer;

          order_items.forEach((item) => {
            const planned = item.planned || {};
            const actual = item.original_A || {};
            rows.push({
              customer_name: item.customer_name || "",
              audit_type: item.audit_type || "",
              order_item_key: item.order_item_key || "",
              employee_name,
              employee_id: emp_id,
              planned_start_date: item.planned_start_date || planned.startDate || "",
              planned_end_date: item.planned_end_date || planned.endDate || "",
              planned_start_time: item.planned_start_time || planned.startTime || "",
              planned_end_time: item.planned_end_time || planned.endTime || "",
              actual_start_date: item.actual_start_date || actual.start_date || "",
              actual_end_date: item.actual_end_date || actual.end_date || "",
              planned_no_of_items: planned.no_of_items || "",
              actual_no_of_items: actual.no_of_items || "",
              remarks: item.store_remarks || "",
            });
          });
        });
      });
    } else {
      // Flat list (derived activities / filtered rows)
      data.forEach((item) => {
              console.log("come block 2")
        const planned = item.planned || {};
        const actual = item.original_A|| {};

        rows.push({
          customer_name: item.customer_name || "",
          audit_type: item.audit_type || "",
          order_item_key: item.order_item_key || item.project_code || "",
          employee_name: item.employee_name || "",
          employee_id: item.emp_id || item.employee_id || "",
          planned_start_date: item.planned_start_date || planned.startDate || "",
          planned_end_date: item.planned_end_date || planned.endDate || "",
          planned_start_time: item.planned_start_time || planned.startTime || "",
          planned_end_time: item.planned_end_time || planned.endTime || "",
          actual_start_date: item.actual_start_date || actual.start_date || "",
          actual_end_date: item.actual_end_date || actual.end_date || "",
          planned_no_of_items: item.planned_no_of_items ?? item.audit_item_no_planned ?? "",
          actual_no_of_items: item.actual_no_of_items ?? item.audit_item_no_actual ?? "",
          remarks: item.store_remarks || "",
        });
      });
    }

    return rows;
  };
  
  
    const handleAuditExport = (data = null) => {
      // If no data is passed, choose based on the active tab
      const toExport = Array.isArray(data)
        ? data
        : activeTab === "weekly"
        ? WeeklyTimesheetSummaryData
        : paginatedActivities;

      const transformData = buildAuditExportData(toExport);

      const result = exportEmployeeAuditData(transformData, "Audit_Report");

      if (result.success) {
        toast.success("Exported successfully");
      } else {
        toast.error("Export failed: " + result.message);
      }
    };


  // console.log("paginatedActivities", profile);
  return (
    <Layout title="Allocation Dashboard">
      <PageSubtitle>
        <Paragraphdata>See all employee allocation data </Paragraphdata>
        <h4>Today: {formatDate(todayDate)}</h4>
      </PageSubtitle>
      <Container>
        <Main>
          <StatsGrid>
            {statsData.map((stats) => <StatsCard icon={stats.icon} label={stats.label} value={stats.value} color={stats.color}
              sections={stats.sections} onClick={() => { stats.onClick(); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }} onItemClick={(item) => { stats.onItemClick(item); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }) }}
            />)}
          </StatsGrid>

           {activeTab === "daily" && <FilterSection>
             <FilterRow>
              <SearchBox
                type="text"
                placeholder="Search audits, customers, or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)}>
                <option value="">All Customers</option>
                {uniqueCustomers.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
              <Select value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)}>
                <option value="">All Employees</option>
                {uniqueEmployees.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}

              </Select>
            </FilterRow>
            <div style={{ display: "flex", justifyContent: "space-between",flexWrap: "wrap", alignItems: "center", marginTop: "1rem" }}>
          {profile.grade_level > 500 && 
          <Select value={m_employee_id} onChange={(e) => setM_Employee_id(e.target.value)}>
                <option value="">All Manager</option>
                {employees.map(e => (
                  <option key={e.emp_id} value={e.emp_id}>{e.name}({e.emp_id})</option>
                ))}

              </Select>}
              {/* {activeTab === "daily" ?
                <DateToggle>
                  <DateButton onClick={handlePreviousDay}>
                    <FiChevronLeft />
                  </DateButton>
                  <DateDisplay>{selectedDate}</DateDisplay>
                  <DateButton onClick={handleNextDay}>
                    <FiChevronRight />
                  </DateButton>
                </DateToggle> : <DateToggle>
                   <DateButton onClick={handlePreviousDay}>
                    <FiChevronLeft />
                  </DateButton>
                  <DateDisplay>{formatMonthLabel(currentDate.start)}</DateDisplay>
                  <DateButton onClick={handleNextDay}>
                    <FiChevronRight />
                  </DateButton>
                  </DateToggle>
                  } */}

              <Button style={{marginLeft: "auto"}} onClick={() => { setStatusFilter(null); setCustomerFilter(''); setEmployeeFilter(''); setSearchTerm(''); setCurrentPage(1); setM_Employee_id(""); }}><MdFilterAltOff /> Clear All</Button>
            </div>
          </FilterSection>
           }
          <Card hoverable={false}>
            
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <CalendarContainer>
                        <Button size='sm' variant="primary" iconOnly={true} onClick={handlePreviousDay}>
                          <FaChevronLeft />
                        </Button>
                        <MonthText>{activeTab === "daily" ? selectedDate : formatMonthLabel(currentDate.start)}</MonthText>
                        <Button size="sm" variant="primary" iconOnly={true} onClick={handleNextDay}>
                          <FaChevronRight />
                        </Button>
                      </CalendarContainer>
                        <Button onClick={() => {setSelectedDate(todayDate)}}><MdFilterAltOff /> Clear filter</Button>
                        </div>
            <TabContainer>
              {tabs.map(t => (
                <Tab key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}>
                  {t.label}
                </Tab>
              ))}
            </TabContainer>

            {activeTab === "daily" ?

              <TableScroll>
                <GridTable>
                  <HeaderRow>
                    <HeaderCell>Customer & Location</HeaderCell>
                    <HeaderCell>Audit Details</HeaderCell>
                    <HeaderCell>Planned Schedule</HeaderCell>
                    <HeaderCell>Actual</HeaderCell>
                    <HeaderCell>Audit Progress</HeaderCell>
                    <HeaderCell>Status<br/>Today's status</HeaderCell>
                    <HeaderCell>Actions</HeaderCell>
                  </HeaderRow>
                  {isLoading ?
                    (<DataRow>
                      <FullWidthCell>Loading...</FullWidthCell>
                    </DataRow>)
                    : paginatedActivities.length ? (paginatedActivities.map(audit => {
                      const { variant, status_label } = getStatusLabelVariant(audit?.project_period_status);
                      const statusMeta = getStatusMeta(audit.status);
                      return (
                        <DataRow key={audit.id}>
                          <Cell>
                            <CustomerInfo>
                              <div className="name">{audit.customer_name}</div>
                              <div className="location">📍 {audit.store_name}</div>
                            </CustomerInfo>
                          </Cell>
                          <Cell>
                            <AuditorInfo>
                              <div className="name">{audit.employee_name}</div>
                              <div className="id">ID: {audit.emp_id} <Badge variant={audit.emp_grade > 100 ? "settle" : "forward"} style={{marginLeft: "0.5rem"}}>{audit.emp_grade > 100 ? "Team Lead" : "Executive"}</Badge></div>
                              <div className="type">{audit.original_P.audit_type}</div>
                              <div className="key">{audit.order_item_key}</div>
                            </AuditorInfo>
                          </Cell>
                          <Cell>
                            <TimeInfo>
                              <div className="date">{formatWeekLabel(audit?.original_P.start_date, audit?.original_P.end_date) || "--"}</div>
                              <div className="time">{formatAPITime(audit?.original_P.start_time) || "--"} to {formatAPITime(audit.original_P.end_time) || "--"}</div>
                              {/* <div className="time">{"--"}</div> */}
                            </TimeInfo>
                          </Cell>
                          <Cell>
                            <TimeInfo>
                              <div className="date">{audit?.actual?.CheckInDate || '-'}</div>
                              <div className="time">{audit?.actual?.firstCheckIn?.time ? `${audit?.actual?.firstCheckIn?.time || "--"} to ${audit?.actual?.lastCheckOut?.time || "--"}` : "--"}</div>
                              {/* <div className="time">{'-'}</div> */}
                            </TimeInfo>
                          </Cell>
                          <Cell>
                            <ProgressBar status={audit.status}>
                              {/* <div className="bar-container">
                          <div 
                            className="bar-fill" 
                            style={{ width: `${(audit.progress / audit.total) * 100}%` }}
                          />
                        </div> */}
                              <div className="text">{audit?.original_A?.no_of_items || 0}/{audit?.original_P?.no_of_items || 0}</div>
                            </ProgressBar>
                          </Cell>
                          <Cell style={{ display: "flex", flexDirection: "column", gap: "0.5rem", justifyContent: "center", alignItems: "flex-start" }}>
                            <Badge variant={variant}>{status_label}</Badge>
                            <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
                          </Cell>
                          <Cell>
                            <ActionButtons>
                              <Button variant="outline" size="sm" title="View" onClick={() => handleViewItem(audit, audit)} >
                                <FaEye />
                              </Button>
                            </ActionButtons>
                          </Cell>
                        </DataRow>
                      )
                    })) : (
                      <DataRow>
                        <FullWidthCell>No data found</FullWidthCell>
                      </DataRow>
                    )}
                </GridTable>
                <PaginationComponent
                  totalItems={filteredActivities.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  siblingCount={2}
                />
                          <TableActions>
                            <Button variant="outline" size="sm" onClick={() => handleAuditExport(paginatedActivities)}>
                              <FaFileExport /> Export XLS
                            </Button>
                          </TableActions>
              </TableScroll> :

              <WeeklyTimesheetSummary
                structuredData={WeeklyTimesheetSummaryData}
                selectedMonth={currentDate.start}
                handleApproveWeekly={handleApproveWeekly}
                onExportWeek={(weekRows) => handleAuditExport(weekRows)}
                onExportMonth={() => handleAuditExport(WeeklyTimesheetSummaryData)}
              />

            }
          </Card>
        </Main>

      </Container>

      {selectedSessionItem && employeeDayLogsModal &&
        <EmployeeWiseTSView
          sessionItem={selectedSessionItem}
          onClose={handleCloseSessionModal}
          showApproveAllButton={false}
          // onApproveSession={(date) => console.log('Approved:', date)}
          // onApproveSession={handleApproveWeekly}
          onRejectSession={(date) => console.log('Rejected:', date)}
        />}

        
              <ConfirmPopup
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleConfirm}
                approve={confirmType === 'WEEKLY_APPROVE' ? "APPROVE" : "REJECT"}
                isLoading={isLoading}
                title="Weekly Approve Activity"
                message="Are you sure you want to Approve this activity"
                confirmLabel="Approve"
              />
    </Layout>
  )
}

export default ManagerDashboard