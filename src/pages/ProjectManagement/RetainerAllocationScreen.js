import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaClipboardList, FaEye, FaEyeSlash, FaHourglassEnd, FaMinusCircle, FaMoneyBillWave, FaUserCheck, FaUserPlus, FaUserTimes } from 'react-icons/fa';
import { BsListCheck } from "react-icons/bs";
import { PiClockClockwise } from 'react-icons/pi';
import { useActivity } from '../../context/ActivityClaimContext';
import { formatDate, formatMonthLabel, formatToDDMMYYYY, formatWeekLabel, getMonthRange, getStatusVariant, getStatusVariant1, groupByOrderItemId, matchClaimsToActivity } from './utils/utils';
import { useFilter } from './hooks/useFilter';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import StatsCard from '../../components/StatsCard';
import Card from '../../components/Card';
import DataTable, { Td } from '../../components/DataTable';
import PaginationComponent from '../../components/Pagination';
import { usePagination } from './hooks/usePagination';
import Badge from '../../components/Badge';
import { ArrowRight, CheckCircle, Clock, Send, User } from 'lucide-react';
import { getEmpClaim } from '../../services/productServices';

const Tagline = styled.p`
 color: ${({ theme }) => theme.colors.textLight};
`

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
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

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

const SearchBox = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing?.sm || '0.5rem'};
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  line-height: 1.3;
`;

const OrderItemId = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-family: monospace;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.2rem 0.2rem;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
`;

const StoreLocation = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-family: monospace;
  background: ${({ theme }) => theme.colors.accentLight};
  padding: 0.2rem 0.2rem;
  border-radius: 4px;
  display: inline-block;
  max-width: 150px; /* Adjust this value as needed */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ResourcesValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  /* background: ${({ theme, variant }) => `${theme.colors.primary}10`}; */
`;

const ResourceCount = styled.span`
  font-weight: 600;
  color: ${({ theme, variant }) =>
        variant === "primary" ? theme.colors.primary :
            variant === "success" ? theme.colors.success :
                theme.colors.primary
    };
  background: white;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  min-width: 24px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
`;

const EmpInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: #111827;

  span {
    font-weight: 400;
    color: #6b7280;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 14px;
  color: #4b5563;

  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  b {
    color: #111827;
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

const ACTIVITY_LIST_STORAGE_KEY = 'activityListSelection';

const RetainerAllocationScreen = () => {
    const location = useLocation();
    const activityData = location?.state;
    const emp_id = activityData?.emp_id;
    const clickedTab = activityData?.activeTab;
    const partnerActiveTab = activityData?.partnerActiveTab;
    const jobTitle = activityData?.job_title?.toLowerCase() || "";
    const emp_type = jobTitle?.includes("retainer") ? "Retainer" : "Associate";
    const groupedData = activityData?.groupedData || [];
    const loading = false;
    const TAB_STORAGE_KEY = `retainer_tab_${emp_id}`;
    // const resourcePlannedList = activityData?.resourcePlannedList;


    // console.log("activityData RetainerAllocationScreen", activityData)

    const navigate = useNavigate();
    const { getStoredActivityListSelection } = useActivity();
    // const { data: assignedActivity, loading, error } = activityState;
    const storedSelection = getStoredActivityListSelection(ACTIVITY_LIST_STORAGE_KEY) || {};


    const [activeTab, setActiveTab] = useState(clickedTab || sessionStorage.getItem(TAB_STORAGE_KEY) || "submitted");
    const [filter, setFilter] = useState({ search: "", status: "" })
    const [offset, setOffset] = useState(storedSelection?.offset || 0);
    const [activeRangeType, setActiveRangeType] = useState(storedSelection?.activeRangeType || "month");
    const [expandedRow, setExpandedRow] = useState(null);

    // const [resourcePlannedList, setResourcePlannedList] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [claimList, setClaimList] = useState([]);

    const activityColumn = [
        <>Customer<br />Order Item ID</>,
        <>Audit Type<br />Store Location</>,
        "Planned Date",
        "Allocations",
        "Audit Status",
        ...(activeTab === "actual" ? ["Claim Status"] : []),
        "Actions"
    ];

    const [dateRange, setDateRange] = useState(() => {
        if (storedSelection?.dateRange?.start && storedSelection?.dateRange?.end) {
            return storedSelection.dateRange;
        }

        return getMonthRange({
            type: "current",
            mode: storedSelection?.activeRangeType || "month",
            offset: storedSelection?.offset || 0,
        });
    });

    // useEffect(() => {
    //     if (emp_id && dateRange?.start && dateRange?.end) {
    //         getAuditAllocationData();
    //         fetchProfileAndClaims();
    //     }
    // }, [dateRange, emp_id]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem(
                ACTIVITY_LIST_STORAGE_KEY,
                JSON.stringify({ activeRangeType, offset, dateRange, })
            );
        }
    }, [activeRangeType, offset, dateRange]);

    useEffect(() => {
        if (emp_id) fetchProfileAndClaims();
    }, [emp_id]);

    // const getAuditAllocationData = async (startOverride, endOverride) => {
    //     const start = startOverride || dateRange.start;
    //     const end = endOverride || dateRange.end;

    //     if (!start || !end) return;

    //     const payload = {
    //         emp_id: emp_id,
    //         start_date: formatToDDMMYYYY(start),
    //         end_date: formatToDDMMYYYY(end),
    //     }
    //     try {
    //         const resourceData = await fetchContractAllocations(payload);
    //         setResourcePlannedList(resourceData);
    //         await fetchEmpActivityAllocations(payload, resourceData);
    //     } catch (error) {
    //         toast.error(error?.response?.data?.message || "Failed to fetch activity allocations");
    //     }
    // }

    const fetchProfileAndClaims = useCallback(async () => {
        if (!emp_id) return;
        try {
            const claimRes = await getEmpClaim("GET", activityData.id, "CY");
            const fetchedClaims = claimRes?.data || [];
            setClaimList(fetchedClaims);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load claims");
            setClaimList([]);
        }
    }, [emp_id]);

    const handleClearFilters = () => {
        // if (typeof window !== "undefined") {
        //     window.sessionStorage.removeItem(ACTIVITY_LIST_STORAGE_KEY);
        // }

        const currentMonthRange = getMonthRange({ type: "current", mode: "month" });

        setFilter({ search: "", status: "ALL", });
        setActiveRangeType("month");
        setOffset(0);
        setDateRange(currentMonthRange);

        sessionStorage.removeItem(TAB_STORAGE_KEY);

        // getAuditAllocationData();
    };

    const handleExpandRow = (row) => {
        setExpandedRow((prev) => prev === row.order_item_id ? null : row.order_item_id,);
    };

    const handleAssignResources = (employee, e, tabMode) => {
        e.stopPropagation();
        setSelectedActivity(employee);
        navigate('/resource-list', { state: { data: employee, mode: "VIEW", tabMode: tabMode, partnerActiveTab } });
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
        sessionStorage.setItem(TAB_STORAGE_KEY, key);
    };

    // const groupedData = groupByOrderItemId(assignedActivity, resourcePlannedList);

    const enrichedAssignedActivity = useMemo(() => {
        if (!Array.isArray(groupedData)) return [];

        return groupedData.map((activity) => {
            const matchedClaims = matchClaimsToActivity(
                claimList,
                activity
            );

            return {
                ...activity,
                claims: matchedClaims,
                hasClaim: matchedClaims.length > 0,
            };
        });
    }, [claimList]);

    const tabFilteredData = useMemo(() => {
        switch (activeTab) {
            case "submitted":
                return enrichedAssignedActivity.filter(
                    (item) => item.activityStatus === "PS" || item.activityStatus === "PA");

            case "pending":
                return enrichedAssignedActivity.filter(
                    (item) => item.activityStatus !== "PS" && item.activityStatus !== "PA" && item.activityStatus !== "AP" && item.activityStatus !== "AS"
                );

            case "actual":
                return enrichedAssignedActivity.filter(
                    (item) => item.activityStatus !== "NS" && item.activityStatus !== "PS" && item.activityStatus !== "PA"
                );

            case "all":
            default:
                return enrichedAssignedActivity;
        }
    }, [enrichedAssignedActivity, activeTab]);

    const FilteredData = useFilter({
        data: tabFilteredData,
        fields: ["customer_name", "order_item_key", "product_name", "store_name", "audit_type",],
        search: filter.search,
        extraFilters: {
            activityStatus: filter.status,
        },
    });

    const sortedFilteredData = useMemo(() => {
        return [...FilteredData].sort((a, b) => {
            // 1. NS status always comes first
            if (a.activityStatus === "NS" && b.activityStatus !== "NS") return -1;
            if (a.activityStatus !== "NS" && b.activityStatus === "NS") return 1;

            // 2. Within same status priority, latest start date first
            const dateA = new Date(a.planned_start_date);
            const dateB = new Date(b.planned_start_date);

            return dateB - dateA;
        });
    }, [FilteredData]);

    const { paginatedData, currentPage, itemsPerPage, totalItems, handlePageChange, } = usePagination(sortedFilteredData, 10);

    const notAssignedCount = getStatusCount(groupedData, "Not Planned");
    // const assignedCount = getStatusCount(filteredActivities, "Not Started", "Completed");
    // const notStartedCount = getStatusCount(groupedData, "Not Started");
    const actualSubmittedCount = getStatusCount(groupedData, "Actual Submitted");
    // const planApprovedCount = getStatusCount(groupedData, "Plan Approved");
    const planSubmittedCount = getStatusCount(groupedData, "Plan Submitted");

    const tabs = [
        { key: 'submitted', label: `Plan Review (${planSubmittedCount})`, },
        { key: 'actual', label: `Actual Review (${actualSubmittedCount})`, },
        { key: 'pending', label: `Pending Submission (${notAssignedCount})`, },
        { key: 'all', label: `All Assigned (${groupedData.length})`, },
    ].filter(Boolean);


    return (
        <Layout title="Retainer/Associate Audit Allocations">
            <ClaimsHeader>
                <Tagline>Review plans, actuals and claims submitted by the {emp_type}</Tagline>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button size="md" onClick={() => { window.history.back(); sessionStorage.removeItem(TAB_STORAGE_KEY) }}>
                        <FaArrowLeft />Back
                    </Button>
                </div>

            </ClaimsHeader>

            <StyledCard>
                <EmpInfo>
                    <User size={14} />
                    {activityData?.name} <span>· {emp_id} · {emp_type}</span>
                </EmpInfo>
                <Stats>
                    <div><Send size={12} /> <b>Assigned: {groupedData.length}</b></div>
                    <div><CheckCircle size={12} /> <b>Submitted: {planSubmittedCount}</b></div>
                    <div><Clock size={12} /> <b>Not Submitted: {notAssignedCount}</b></div>
                </Stats>
            </StyledCard>

            <Card style={{ marginTop: "1rem" }} >
                <TabContainer>
                    {tabs.map(t => (
                        <Tab key={t.key} active={activeTab === t.key} onClick={() => handleTabChange(t.key)}>
                            {t.label}
                        </Tab>
                    ))}
                </TabContainer>

                <FilterRow style={{ marginBottom: "1rem" }}>
                    <SearchBox type="text" placeholder="Search customer name, audit type, location, order item id ..." value={filter.search} onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value, }))} />

                    <Button variant="outline" size='sm' onClick={handleClearFilters}>
                        Clear Filters
                    </Button>
                </FilterRow>

                <DataTable
                    columns={activityColumn}
                    // data={[...paginatedData].reverse()}
                    data={[...paginatedData]}
                    isLoading={loading}
                    modifiedId
                    modifiedIdName="order_item_id"
                    expandedRow={expandedRow}
                    rowAction={handleExpandRow}
                    renderRow={(employee) => {
                        const firstItem = employee?.grouped_data?.[0] || {};
                        const claim = employee.claims[0];

                        return (
                            <>
                                <Td>
                                    <CustomerName>{employee.customer_name}</CustomerName> <OrderItemId>{employee?.order_item_key}</OrderItemId>
                                </Td>
                                <Td>
                                    {employee.product_name}<br />
                                    <StoreLocation title={firstItem.store_name || '-'}>
                                        {firstItem?.store_name || '-'}
                                    </StoreLocation>
                                </Td>
                                <Td>
                                    {employee.planned_start_date === employee.planned_end_date ? (
                                        formatDate(employee.planned_start_date)
                                    ) : (
                                        <>
                                            {formatDate(employee.planned_start_date)}
                                            <br />
                                            {formatDate(employee.planned_end_date)}
                                        </>
                                    )}
                                </Td>
                                <Td style={{ paddingLeft: "2.5rem" }}>
                                    {employee.total_planned_item || 0}
                                </Td>
                                <Td>
                                    <Badge variant={getStatusVariant1(employee.activityStatus)}>
                                        {employee.statusDisplay}
                                    </Badge>
                                </Td>
                                {activeTab === "actual" && <Td>
                                    {(() => {
                                        const claim = employee.claims?.length > 0 ? employee.claims[0] : null;

                                        if (!claim) {
                                            return <Badge variant="default">No Claim</Badge>;
                                        }

                                        const { variant, label } = getClaimStatusVariant(claim.expense_status);
                                        return (
                                            <Badge variant={variant}>
                                                {claim.status_display || label}
                                            </Badge>
                                        );
                                    })()}
                                </Td>}
                                <Td>
                                    <ButtonGroup>
                                        {activeTab === "actual" && (employee.activityStatus === "C" || employee.activityStatus === "AP" || employee.activityStatus === "AS") ? (
                                            <Button
                                                size='sm'
                                                onClick={() => navigate('/clamDetails', { state: { data: { ...employee, mode: "ADD", emp_id: emp_id } } })}
                                            >
                                                <FaMoneyBillWave />
                                                Claim
                                            </Button>
                                        ) : null
                                            // <div style={{ width: '100px' }} />
                                        }

                                        {activeTab !== "pending" && (employee.total_planned_item > 1 ? (
                                            <Button
                                                size='sm'
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleExpandRow(employee);
                                                }}
                                            >
                                                {expandedRow === employee.order_item_id ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                                {expandedRow === employee.order_item_id ? "Hide Allocations" : "View Allocations"}
                                            </Button>
                                        ) : <Button
                                            size="sm"
                                            variant="primary"
                                            onClick={(e) => {
                                                const firstItem = employee?.grouped_data?.[0];
                                                handleAssignResources(firstItem || employee, e, activeTab);
                                            }}
                                        >
                                            Review {activeTab === "actual" ? "Actual" : "Plan"}
                                            <ArrowRight />
                                        </Button>
                                        )}
                                    </ButtonGroup>
                                </Td >
                            </>
                        )
                    }}

                    renderExpandedRow={(employee) => {
                        const groupedData = employee?.grouped_data || [];

                        return (
                            <DataTable
                                columns={["Sl No.", "Planned Date", "Planned Resource", "Status", "Action"]}
                                data={groupedData}
                                renderRow={(item) => {
                                    const index = groupedData.findIndex((data) => data === item);
                                    const plannedResource = getMatchingRetainerList(item?.original_P);
                                    const resource = plannedResource?.[0];
                                    const isResourceAssigned = item?.original_A?.resource_list?.length > 0;

                                    const displayPlannedDate = item.planned_start_date === item.planned_end_date
                                        ? formatDate(item.planned_start_date)
                                        : `${formatDate(item.planned_start_date)} to ${formatDate(item.planned_end_date)}`;

                                    return (
                                        <>
                                            <Td style={{ paddingLeft: "1.5rem" }}>{index + 1}</Td>
                                            <Td>{displayPlannedDate}</Td>

                                            <Td>
                                                <ResourcesValue>
                                                    <ResourceCount variant="primary">{resource?.tl_count || 0}</ResourceCount>
                                                    {" "}TL /{" "}
                                                    <ResourceCount variant="primary">{resource?.ex_count || 0}</ResourceCount>
                                                    {" "}EX
                                                </ResourcesValue>
                                            </Td>

                                            <Td>
                                                <Badge variant={getStatusVariant1(item.activityStatus)}>
                                                    {item.statusDisplay}
                                                </Badge>
                                            </Td>

                                            <Td>
                                                {(activeTab === "actual" || activeTab === "submitted" || activeTab === "pending") &&
                                                    (item.activityStatus === "AA" || item.activityStatus === "AS" || item.activityStatus === "PS" || item.activityStatus === "PA") && (
                                                        <Button
                                                            size="sm"
                                                            variant="primary"
                                                            onClick={(e) => handleAssignResources(item, e, activeTab)}
                                                        >
                                                            Review {(activeTab === "actual" || (item.activityStatus === "AA" || item.activityStatus === "AP")) ? "Actual" : "Plan"}
                                                            <ArrowRight />
                                                        </Button>)
                                                }
                                            </Td>
                                        </>
                                    );
                                }}
                            />
                        );
                    }}
                />

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

export default RetainerAllocationScreen;

function getMatchingRetainerList(original_P = {}) {
    const {
        start_date: originalStartDate,
        end_date: originalEndDate,
        retainer_list = []
    } = original_P;

    return retainer_list.filter(item => {
        return (
            item.a_type === "P" &&
            item.start_date === originalStartDate &&
            item.end_date === originalEndDate
        );
    });
}

const getStatusCount = (arr, status) => {
    return arr.filter(item => item.statusDisplay === status).length;
}

const getClaimStatusVariant = (expense_status) => {
    const statusMap = {
        'N': { variant: 'warning', label: 'Draft' },
        'S': { variant: 'info', label: 'Submitted' },
        'A': { variant: 'success', label: 'Approved' },
        'R': { variant: 'error', label: 'Rejected' },
        // 'P': { variant: 'info', label: 'Pending' },
    };

    return statusMap[expense_status] || { variant: 'default', label: 'Unknown' };
};