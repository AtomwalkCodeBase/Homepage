import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import { getEmpClaim, getemployeeLists } from '../../services/productServices';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Card from '../../components/Card';
import { theme } from '../../styles/Theme';
import Button from '../../components/Button';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../components/Pagination';
import { useActivity } from '../../context/ActivityClaimContext';
import { formatMonthLabel, formatToDDMMYYYY, formatWeekLabel, getMonthRange, groupByOrderItemId, matchClaimsToActivity } from './utils/utils';
import Badge from '../../components/Badge';
import { useFilter } from './hooks/useFilter';
import { usePagination } from './hooks/usePagination';
import { FaMoneyBillWave } from 'react-icons/fa';


const Subtitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
  p{
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;
  }
`
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
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 680px;

  th {
    text-align: left;
    padding: 12px;
    background: #f3f4f6;
    white-space: nowrap;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
  }
`;
const BUttonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const DateInput = styled.input`
  padding: 0.35rem 0.6rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm || '4px'};
  font-family: inherit;
  font-size: 0.9rem;
  color: ${theme.colors.text};
  background: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const getTodayDateStr = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const shiftDateByDays = (dateStr, days) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const getApiThreeDayRange = (dateStr) => {
  if (!dateStr) return { start_date: "", end_date: "" };
  const [y, m, d] = dateStr.split("-").map(Number);
  const prevDate = new Date(y, m - 1, d - 1);
  const nextDate = new Date(y, m - 1, d + 1);
  return {
    start_date: formatToDDMMYYYY(prevDate),
    end_date: formatToDDMMYYYY(nextDate),
  };
};

const getMonthStartAndEnd = (dateStr) => {
  if (!dateStr) return { start: "", end: "" };
  const [y, m, d] = dateStr.split("-").map(Number);
  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 0);
  const format = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  return {
    start: format(start),
    end: format(end),
  };
};

const CHANNEL_PARTNER_LIST_STORAGE_KEY = "ChannelPartnerListSelection";

const ChannelPatnerListScreen = ({ BrachManager = true }) => {
  const navigate = useNavigate();
  const { activityState, fetchEmpActivityAllocations, fetchContractAllocations, getStoredActivityListSelection, setStoredActivityListSelection } = useActivity();
  const { data: assignedActivity, loading, error } = activityState;
  const storedSelection = getStoredActivityListSelection ? getStoredActivityListSelection(CHANNEL_PARTNER_LIST_STORAGE_KEY) || {} : {};

  const [activeTab, setActiveTab] = useState(storedSelection?.activeTab || "R");
  const [searchTerm, setSearchTerm] = useState(storedSelection?.searchTerm || '');
  const [isLoading, setIsLoading] = useState(false)
  const [isClaimsLoading, setIsClaimsLoading] = useState(false);
  const [activeRangeType, setActiveRangeType] = useState(storedSelection?.activeRangeType || "month");
  const [offset, setOffset] = useState(storedSelection?.offset || 0);

  const [employeeList, setEmployeeList] = useState([]);
  const [resourcePlannedList, setResourcePlannedList] = useState([]);
  const [groupedEmployeeList, setGroupedEmployeeList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    return storedSelection?.selectedDate || getTodayDateStr();
  });

  const monthRange = useMemo(() => {
    return getMonthStartAndEnd(selectedDate);
  }, [selectedDate]);


  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    setIsLoading(true)
    try {
      const res = await getemployeeLists({ "rm_emp_id": "ALL_CONTRACT" });
      setEmployeeList(res.data)

    } catch (error) {
      toast.error(error.response.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Save activeTab to storage
  useEffect(() => {
    if (setStoredActivityListSelection) {
      const current = getStoredActivityListSelection(CHANNEL_PARTNER_LIST_STORAGE_KEY) || {};
      setStoredActivityListSelection(CHANNEL_PARTNER_LIST_STORAGE_KEY, { ...current, activeTab });
    }
  }, [activeTab]);

  // Save searchTerm to storage
  useEffect(() => {
    if (setStoredActivityListSelection) {
      const current = getStoredActivityListSelection(CHANNEL_PARTNER_LIST_STORAGE_KEY) || {};
      setStoredActivityListSelection(CHANNEL_PARTNER_LIST_STORAGE_KEY, { ...current, searchTerm });
    }
  }, [searchTerm]);

  // Save month/range selection to storage
  useEffect(() => {
    if (setStoredActivityListSelection) {
      const current = getStoredActivityListSelection(CHANNEL_PARTNER_LIST_STORAGE_KEY) || {};
      setStoredActivityListSelection(CHANNEL_PARTNER_LIST_STORAGE_KEY, {
        ...current,
        activeRangeType,
        offset,
        selectedDate,
      });
    }
  }, [activeRangeType, offset, selectedDate, getStoredActivityListSelection, setStoredActivityListSelection]);

  const [isDataLoading, setIsDataLoading] = useState(false);
  const fetchedDate = React.useRef(null);

  const getAuditAllocationData = async (dateOverride) => {
    const targetDate = dateOverride || selectedDate;
    if (!targetDate) return;

    const { start_date, end_date } = getApiThreeDayRange(targetDate);
    if (!start_date || !end_date) return;

    const payload = {
      start_date,
      end_date,
    };

    setIsDataLoading(true);
    try {
      const resourceData = await fetchContractAllocations(payload);
      const filteredData = resourceData.filter((data) => data.is_active);
      setResourcePlannedList(filteredData);
      await fetchEmpActivityAllocations(payload, resourceData);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch activity allocations");
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (BrachManager) {
      if (fetchedDate.current !== selectedDate) {
        fetchedDate.current = selectedDate;
        getAuditAllocationData(selectedDate);
      }
    }
  }, [selectedDate, BrachManager]);

  const getEmployeesGroupedData = useCallback(() => {
    if (!employeeList.length || !resourcePlannedList.length) {
      setGroupedEmployeeList([]);
      return;
    }

    const groupedData = employeeList.map((employee) => {
      const matchedResources = resourcePlannedList.filter(
        (resource) => String(resource.ra_emp_id) === String(employee.emp_id)
      );

      if (!matchedResources.length) {
        return {
          ...employee,
          resourcePlannedList: [], groupedData: []
        };
      }

      const grouped = groupByOrderItemId(assignedActivity, matchedResources, employee.emp_id);

      return {
        ...employee,
        resourcePlannedList: matchedResources,
        groupedData: grouped,
      };
    });

    setGroupedEmployeeList(groupedData);
  }, [employeeList, resourcePlannedList, assignedActivity]);

  useEffect(() => {
    if (employeeList.length && resourcePlannedList.length && assignedActivity.length) {
      getEmployeesGroupedData();
    }
  }, [employeeList, resourcePlannedList, assignedActivity]);

  const submittedEmployeeCount = useMemo(() => {
    const counts = { R: 0, A: 0, };

    groupedEmployeeList.forEach((employee) => {
      const jobTitle = employee.job_title?.toLowerCase() || "";
      const resources = employee.groupedData || [];

      // Employee has submitted at least one plan
      const hasSubmittedPlan = resources.some(
        (item) => item.statusDisplay === "Plan Submitted"
      );

      if (!hasSubmittedPlan) return;

      if (jobTitle.includes("retainer")) {
        counts.R += 1;
      }

      if (jobTitle.includes("associate")) {
        counts.A += 1;
      }
    });

    //    resources.forEach((item) => {
    //     if (item.statusDisplay === "Plan Submitted") {
    //       if (jobTitle.includes("retainer")) {
    //         counts.R += 1;
    //       }
    //       if (jobTitle.includes("associate")) {
    //         counts.A += 1;
    //       }
    //     }
    //   });
    // });
    return counts;
  }, [groupedEmployeeList]);

  const baseData = useMemo(() => {
    let list = BrachManager ? groupedEmployeeList : employeeList;
    if (BrachManager) {
      list = list.filter(emp => emp.groupedData?.some(item => item.statusDisplay !== "Not Planned"));
    }
    return list.map(emp => {
      const jobTitle = emp.job_title?.toLowerCase() || "";
      let partnerType = "";
      if (jobTitle.includes("retainer")) partnerType = "R";
      else if (jobTitle.includes("associate")) partnerType = "A";
      return {
        ...emp,
        partnerType
      };
    });
  }, [BrachManager, groupedEmployeeList, employeeList]);

  const filteredEmployees = useFilter({
    data: baseData,
    fields: ["name", "emp_id", "mobile_number"],
    search: searchTerm,
    extraFilters: {
      partnerType: activeTab
    }
  });

  const sortedEmployees = useMemo(() => {
    if (BrachManager) {
      return [...filteredEmployees].sort((a, b) => {
        const aPlanSubmitted = a.groupedData?.some(
          (item) => item.statusDisplay === "Plan Submitted"
        );
        const bPlanSubmitted = b.groupedData?.some(
          (item) => item.statusDisplay === "Plan Submitted"
        );
        if (aPlanSubmitted !== bPlanSubmitted) {
          return Number(bPlanSubmitted) - Number(aPlanSubmitted);
        }
        return (a.name || "").localeCompare(b.name || "");
      });
    }
    return [...filteredEmployees].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [BrachManager, filteredEmployees]);

  const { currentPage, itemsPerPage, paginatedData: paginatedActivities, totalItems, handlePageChange, setCurrentPage } = usePagination(sortedEmployees, 10);

  const handleNavigateDay = (direction) => {
    setSelectedDate((prev) => shiftDateByDays(prev, direction));
  };

  const tabs = useMemo(() => {
    if (BrachManager) {
      return [
        { key: "R", label: `Retainer Submitted Plan (${submittedEmployeeCount.R})` },
        { key: "A", label: `Associate Submitted Plan (${submittedEmployeeCount.A})` },
      ];
    }

    return [
      { key: "R", label: "Retainer" },
      { key: "A", label: "Associate" },
    ];
  }, [BrachManager, submittedEmployeeCount]);


  // console.log("paginatedActivities", paginatedActivities)
  return (
    <Layout title="Associate/Retainer Screen">
      <Subtitle>
        <div>
          <p>All Associates/Retainers List</p>
        </div>

        {BrachManager && (
          <MonthToggleComponent
            selectedDate={selectedDate}
            onDateChange={(newDate) => setSelectedDate(newDate)}
            handleNavigate={handleNavigateDay}
          />
        )}
      </Subtitle>

      <Card hoverable={false}>

        <TabContainer>
          {tabs.map(t => (
            <Tab key={t.key} active={activeTab === t.key} onClick={() => { setActiveTab(t.key); setCurrentPage(1) }}>
              {t.label}
            </Tab>
          ))}
        </TabContainer>
        <FilterRow>
          <SearchBox
            type="text"
            placeholder="Search name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button variant="outline" onClick={() => {
            setSearchTerm("");

            if (BrachManager) {
              setSelectedDate(getTodayDateStr());
            }
          }}>
            Clear Filters
          </Button>
        </FilterRow>
        <TableContainer>
          <Table>
            <thead>
            <tr>
              <th>{activeTab === "R" ? "Retainer" : "Associate"}'s ID</th>
              <th>Name</th>
              {!BrachManager && <th>Mobile</th>}
              {!BrachManager && <th>Email</th>}
              {BrachManager && <th>Assigned Items</th>}
              {BrachManager && <th>Plan Submitted</th>}
              {BrachManager && <th>Actual Submitted</th>}
              {BrachManager && <th>Plan Not Submitted</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || loading || isClaimsLoading || isDataLoading ?
              (<tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                  Loading...
                </td>
              </tr>
              ) : paginatedActivities.length ?
                (paginatedActivities.map((employee) => {
                  const groupedData = employee.groupedData || [];
                  const planSubmittedCount = getStatusCount(groupedData, "Plan Submitted");
                  const notAssignedCount = getStatusCount(groupedData, "Not Planned");
                  const actualSubmittedCount = getStatusCount(groupedData, "Actual Submitted");
                  return (
                    <tr>
                      <td>{employee.emp_id}</td>
                      <td>{employee.name}</td>
                      {!BrachManager && <td>{employee.mobile_number || "--"}</td>}
                      {!BrachManager && <td>{employee.email_id || "--"}</td>}
                      {BrachManager && <td><Badge variant='primary' style={{ cursor: "pointer", marginLeft: "0.9rem" }} onClick={() => navigate("/retainer/allocation-list", { state: { ...employee, groupedData, activeTab: "all", partnerActiveTab: activeTab, cp_id: employee.emp_id, start_date: monthRange.start, end_date: monthRange.end, selectedDate } })}>{groupedData.length || 0}</Badge></td>}
                      {BrachManager && <td><Badge variant='info' style={{ cursor: "pointer", marginLeft: "0.9rem" }} onClick={() => navigate("/retainer/allocation-list", { state: { ...employee, groupedData, activeTab: "submitted", partnerActiveTab: activeTab, cp_id: employee.emp_id, start_date: monthRange.start, end_date: monthRange.end, selectedDate } })}>{planSubmittedCount || 0} </Badge></td>}
                      {BrachManager && <td><Badge variant='success' style={{ cursor: "pointer", marginLeft: "0.9rem" }} onClick={() => navigate("/retainer/allocation-list", { state: { ...employee, groupedData, activeTab: "actual", partnerActiveTab: activeTab, cp_id: employee.emp_id, start_date: monthRange.start, end_date: monthRange.end, selectedDate } })}>{actualSubmittedCount || 0} </Badge></td>}
                      {BrachManager && <td><Badge variant='error' style={{ cursor: "pointer", marginLeft: "0.9rem" }} onClick={() => navigate("/retainer/allocation-list", { state: { ...employee, groupedData, activeTab: "pending", partnerActiveTab: activeTab, cp_id: employee.emp_id, start_date: monthRange.start, end_date: monthRange.end, selectedDate } })}>{notAssignedCount || 0}</Badge></td>}
                      <td>
                        {!BrachManager && <BUttonGroup>
                          <Button title="View Employee" iconOnly={true} onClick={() => navigate("/finance/employee-verification", { state: employee })}>
                            <IoEyeOutline />
                          </Button>
                        </BUttonGroup>}

                        {BrachManager &&
                          <BUttonGroup>
                            <Button title="View Retainer Allocation" iconOnly={true} onClick={() => navigate("/retainer/allocation-list", { state: { ...employee, groupedData, partnerActiveTab: activeTab, cp_id: employee.emp_id, start_date: monthRange.start, end_date: monthRange.end, selectedDate } })}>
                              <IoEyeOutline />
                            </Button>
                            <Button title="View Retainer Payable" iconOnly={true} onClick={() => {
                              if (typeof window !== "undefined") {
                                window.sessionStorage.removeItem("ReceivableListSelection");
                              }
                              navigate("/retainer/payable", {
                                state: {
                                  cp_id: employee.emp_id, cp_name: employee.name,
                                  start_date: monthRange?.start,
                                  end_date: monthRange?.end,
                                },
                              });
                            }}>
                              <FaMoneyBillWave />
                            </Button>
                          </BUttonGroup>}

                      </td>
                    </tr>)
                }))

                :
                (<tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                    No data found
                  </td>
                </tr>
                )
            }
          </tbody>
        </Table>
        </TableContainer>
        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={2}
        />
      </Card>


    </Layout >
  )
}

export default ChannelPatnerListScreen

const getStatusCount = (arr, status) => {
  return arr.filter(item => item.statusDisplay === status).length;
}

export const MonthToggleComponent = ({ selectedDate, onDateChange, handleNavigate, activeRangeType, dateRange }) => {
  return (
    <div>
      <div style={{ marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
        <Button variant="outline" size="sm" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleNavigate(-1)}>
          &lt; Prev
        </Button>
        {selectedDate !== undefined ? (
          <DateInput
            type="date"
            value={selectedDate || ""}
            onChange={(e) => onDateChange && onDateChange(e.target.value)}
          />
        ) : (
          <span>
            {activeRangeType === 'month' ? formatMonthLabel(dateRange.start) : formatWeekLabel(dateRange.start, dateRange.end)}
          </span>
        )}
        <Button variant="outline" size="sm" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleNavigate(1)}>
          Next &gt;
        </Button>
      </div>
    </div>
  )
}