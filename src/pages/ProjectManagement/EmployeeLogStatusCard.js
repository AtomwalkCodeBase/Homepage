import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiHash, FiUsers, FiPackage, FiXCircle } from 'react-icons/fi';
import { getEmpAllocationData } from '../../services/productServices';
import { formatToDDMMYYYY, getMonthRange } from './utils/utils';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { MdFilterAltOff } from 'react-icons/md';
import { theme } from '../../styles/Theme';
import { IoLogInOutline, IoLogOutOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

// --- NEW STYLED COMPONENTS FOR GROUPING ---

const GroupContainer = styled.div`
  background: ${theme.colors.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
  margin-top: ${theme.spacing.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
`;

const GroupHeader = styled.div`
  background: ${theme.colors.backgroundAlt};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomerName = styled.h2`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.primary}; // Using theme primary color
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const OrderKey = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  font-weight: 500;
  background: white;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.border};
  margin-top: ${theme.spacing.xs};
  display: inline-block;
  width: fit-content;
`;

const GroupContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const Container = styled.div`
  font-family: ${theme.fonts.body};
  background: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.xl};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.backgroundAlt};
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  background: ${props => props.checkedIn ? theme.colors.accentLight : theme.colors.secondaryLight};
  color: ${props => props.checkedIn ? theme.colors.success : theme.colors.error};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.sm};
`;

const IconWrapper = styled.div`
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  min-width: 20px;
`;

const Label = styled.span`
  color: ${theme.colors.textLight};
  font-weight: 500;
  min-width: 80px;
`;

const Value = styled.span`
  color: ${theme.colors.text};
  font-weight: 600;
`;

const EmployeeName = styled.h3`
  margin: 0;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
  font-weight: 700;
`;

const TimeInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;

const TimeBlock = styled.div`
  flex: 1;
  text-align: center;
  padding: ${theme.spacing.sm};
  background: ${props => props.highlight ? theme.colors.primaryLight : theme.colors.backgroundAlt};
  border-radius: ${theme.borderRadius.lg};
`;

const TimeLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.xs};
`;

const TimeValue = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 700;
  color: ${theme.colors.text};
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
const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing?.md || '1rem'};
  color: ${({ theme }) => theme.colors?.textLight || '#999'};
  background: ${({ theme }) => theme.colors?.card || '#fff'};
`;
const SessionTitle = styled.span`
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || '4px'};
  color: ${({ theme }) => theme.colors?.textLight || '#666'};
`;

// Main App Component
const EmployeeLogStatusCard = () => {
  const [employeesLoginData, setEmployeesLoginData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [filters, setFilters] = useState({ order_item_id: "", });
  const [uniqueData, setUniqueData] = useState({
    order_item_id: [],
  });
  const [dayFilter, setDayFilter] = useState("today");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    return { start: formatToDDMMYYYY(today), end: formatToDDMMYYYY(today) };
  });

  const fetchAllocation = async (payload) => {
    const res = await getEmpAllocationData(payload);
    // return normalizeProjects(res.data || []);
    return res.data || [];

  };

  useEffect(() => {
    (async () => {
      try {
        setInitialLoading(true);

        const data = await fetchAllocation({
          emp_id: localStorage.getItem("empId"),
          start_date: typeof dateRange.start === 'string' ? dateRange.start : formatToDDMMYYYY(dateRange.start),
          end_date: typeof dateRange.end === 'string' ? dateRange.end : formatToDDMMYYYY(dateRange.end),
        });

        const getUniqueOrderItems = (data) => {
          const map = new Map();

          data.forEach(item => {
            const id = item?.order_item_id;
            const key = item?.order_item_key;

            if (!id) return;

            // Deduplicate by order_item_id
            if (!map.has(id)) {
              map.set(id, {
                order_item_id: id,
                order_item_key: key,
              });
            }
          });

          return Array.from(map.values());
        };

        setUniqueData({ order_item_id: getUniqueOrderItems(data) });
      } catch (err) {
        toast.error("Failed to fetch order item key")
      } finally {
        setInitialLoading(false);
      }
    })();
  }, [dateRange]);

  // 2nd api call to get the employee according to selected order item id
  function buildDayLogs(ts_data_list = []) {
    const dayLogs = {};
    const sessionCountByDate = {};

    ts_data_list.forEach((item) => {
      const { a_date, geo_data = "", no_of_items } = item;

      if (!a_date || !geo_data) return;

      // Track session count per date
      sessionCountByDate[a_date] = (sessionCountByDate[a_date] || 0) + 1;
      const sessionIndex = sessionCountByDate[a_date];

      const sessionKey =
        sessionIndex === 1
          ? a_date
          : `${a_date} session ${sessionIndex}`;

      // geo_data format: IN|time|lat|lng^OUT|time|lat|lng
      const [checkInRaw = "", checkOutRaw = ""] = geo_data.split("^");

      const [, inTime, inLat, inLng] = checkInRaw.split("|");
      const [, outTime, outLat, outLng] = checkOutRaw.split("|");

      dayLogs[sessionKey] = {
        date: a_date,
        session: sessionKey,
        check_in: {
          time: inTime || "",
          lat: inLat ? Number(inLat) : null,
          lng: inLng ? Number(inLng) : null,
        },
        check_out: {
          time: outTime || "",
          lat: outLat ? Number(outLat) : null,
          lng: outLng ? Number(outLng) : null,
        },
        remarks: "",
        effort: 0,
        no_of_items: no_of_items || 0,
      };
    });

    return { day_logs: dayLogs };
  }

  const getLatestStatus = (day_logs) => {
    const logs = Object.values(day_logs);
    if (logs.length === 0) {
      return {
        checkedIn: false,
        checkedOut: false,
        activeSession: null,
      };
    }

    const parseDate = (dStr) => {
      const parts = dStr.split('-');
      // new Date(year, monthIndex, day)
      return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    logs.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    // Pick the latest day
    const latestLog = logs[0];

    // Determine status from this latest log
    const hasCheckIn = !!latestLog.check_in?.time;
    const hasActiveSession = hasCheckIn && !latestLog.check_out?.time;

    return {
      checkedIn: hasCheckIn,
      checkedOut: !hasActiveSession,
      activeSession: latestLog // Show the latest session details
    };
  };

  useEffect(() => {
    if (!filters.order_item_id) return;

    (async () => {
      try {
        setEmployeeLoading(true);

        const data = await fetchAllocation({
          start_date: typeof dateRange.start === 'string' ? dateRange.start : formatToDDMMYYYY(dateRange.start),
          end_date: typeof dateRange.end === 'string' ? dateRange.end : formatToDDMMYYYY(dateRange.end),
          order_item_id: filters.order_item_id,
          is_team_lead: 1,
        });

        const loggedInEmpId = localStorage.getItem("empId");

        const loggedInEmployee = data.find(emp => emp.emp_id === loggedInEmpId);

        const retainerEmpIds = new Set((loggedInEmployee?.retainer_list || [])
          .filter(r => r.a_type === "P")
          .map(r => r.emp_id)
      );

      const formattedEmployees = data
        .filter(emp => emp.emp_id !== loggedInEmpId)
        .map(emp => {
          const { day_logs } = buildDayLogs(emp.ts_data_list || []);
          const todayStatus = getLatestStatus(day_logs);

          return {
            ...emp,
            day_logs,
            todayStatus,
            isRetainer: retainerEmpIds.has(emp.emp_id),
          };
        });


        setEmployeesLoginData(formattedEmployees);
      } catch (err) {
        toast.error("Failed to fetch employee check in data")
      } finally {
        setEmployeeLoading(false);
      }
    })();
  }, [filters.order_item_id, dateRange]);

  const handleDayFilterChange = (e) => {
    const value = e.target.value;
    setDayFilter(value);

    const today = new Date();

    if (value === "today") {
      setShowCustomRange(false);
      setDateRange({
        start: formatToDDMMYYYY(today),
        end: formatToDDMMYYYY(today)
      });
    } else if (value === "past7") {
      setShowCustomRange(false);
      const past = new Date(today);
      past.setDate(today.getDate() - 7);
      setDateRange({
        start: formatToDDMMYYYY(past),
        end: formatToDDMMYYYY(today)
      });
    } else if (value === "next7") {
      setShowCustomRange(false);
      const next = new Date(today);
      next.setDate(today.getDate() + 7);
      setDateRange({
        start: formatToDDMMYYYY(today),
        end: formatToDDMMYYYY(next)
      });
    } else if (value === "custom") {
      setShowCustomRange(true);
      // Keep current range or reset? Usually clear or keep.
      // Let's set to month range as default for custom
      const { start, end } = getMonthRange();
      setDateRange({ start, end });
    }
  };

  // console.log("employeesLoginData", employeesLoginData)

  // Grouping Logic
  const groupedEmployees = useMemo(() => {
    if (!employeesLoginData || employeesLoginData.length === 0) return {};

    return employeesLoginData.reduce((acc, emp) => {
      // Create a unique key for grouping (Customer + Order Item)
      // Assuming one order item ID implies one order item key, but grouping by customer is key.
      const key = `${emp.customer_name}||${emp.order_item_key}`;

      if (!acc[key]) {
        acc[key] = {
          customer_name: emp.customer_name,
          order_item_key: emp.order_item_key,
          employees: []
        };
      }

      acc[key].employees.push(emp);
      return acc;
    }, {});
  }, [employeesLoginData]);

  const hasGroups = Object.keys(groupedEmployees).length > 0;

  return (
    <>
      <FilterContainer>
        <FilterRow>
          <FilterSelect
            name="dayFilter"
            value={dayFilter}
            onChange={handleDayFilterChange}
          >
            <option value="past7">Past Activity Logs</option>
            <option value="today">Today</option>
            <option value="next7">Upcoming 7 Days Activity</option>
            <option value="custom">Custom Range</option>
          </FilterSelect>

          <FilterSelect
            name="order_item_id"
            value={filters.order_item_id}
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                order_item_id: e.target.value
              }))
            }
          >
            <option value="">Select Order Item ID</option>
            {uniqueData.order_item_id.length === 0 ? <option disabled={true}>No order item found</option> : 
            (uniqueData.order_item_id.map((item) => (
              <option key={item.order_item_id} value={item.order_item_id}>
                {item.order_item_key}
              </option>
            )))}
          </FilterSelect>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilters({ order_item_id: "" });
              setEmployeesLoginData([]);

              // Also reset day filter to today
              setDayFilter("today");
              setShowCustomRange(false);
              const today = new Date();
              setDateRange({
                start: formatToDDMMYYYY(today),
                end: formatToDDMMYYYY(today)
              });
            }}
          >
            <MdFilterAltOff /> Clear Filter
          </Button>
        </FilterRow>

        {showCustomRange && (
          <CustomRangeRow>
            <DateInput type="date" value={dateRange.start} onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))} />
            <span>to</span>
            <DateInput type="date" value={dateRange.end} onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))} />
          </CustomRangeRow>
        )}
      </FilterContainer>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {(initialLoading || employeeLoading) && (
          <EmptyState>Loading...</EmptyState>
        )}

        {/* Fix here: Ensure loading is FALSE before showing this */}
        {!initialLoading && !employeeLoading && !filters.order_item_id && (
          <EmptyState>Please select the Order Item ID</EmptyState>
        )}

        {/* Empty State when filter is selected but no data */}
        {!employeeLoading &&
          filters.order_item_id &&
          !hasGroups && (
            <EmptyState>no employee checked in yet</EmptyState>
          )}

        {/* Render Groups */}
        {!employeeLoading && hasGroups && Object.values(groupedEmployees).map((group, index) => (
          <GroupContainer key={index}>
            <GroupHeader>
              <GroupInfo>
                <CustomerName>
                  <FiUsers size={20} />
                  {group.customer_name}
                </CustomerName>
                <OrderKey>
                  <FiPackage size={12} style={{ marginRight: '4px' }} />
                  {group.order_item_key}
                </OrderKey>
              </GroupInfo>
            </GroupHeader>

            <GroupContent>
              <CardGrid style={{ margin: 0 }}>
                {group.employees.map((employee) => (
                  <EmployeeStatusCard
                    key={employee.p_id || employee.emp_id}
                    employee={employee}
                  />
                ))}
              </CardGrid>
            </GroupContent>
          </GroupContainer>
        ))}
      </div>

    </>
  );
};


export default EmployeeLogStatusCard;

const InfoRowComponent = ({ icon: Icon, label, value }) => (
  <InfoRow>
    <IconWrapper>
      <Icon size={16} />
    </IconWrapper>
    <Label>{label}:</Label>
    <Value>{value}</Value>
  </InfoRow>
);

const TimeBlockComponent = ({ label, value, highlight }) => (
  <TimeBlock highlight={highlight}>
    <TimeLabel>{label}</TimeLabel>
    <TimeValue>{value || '--:--'}</TimeValue>
  </TimeBlock>
);

const EmployeeStatusCard = ({ employee }) => {
  const { employee_name, emp_id, customer_name, order_item_key, day_logs = {}, todayStatus = {}, } = employee;
  const { checkedIn = false, checkedOut = false, activeSession = null, } = todayStatus;

  return (
    <Card>
      <CardHeader>
        <EmployeeName>{employee_name}</EmployeeName>
        <StatusBadge>
          {!activeSession ? (
            <>
              <FiXCircle size={14} /> Not checked in yet
            </>
          ) : checkedIn && !checkedOut ? (
            <>
              <IoLogInOutline size={14} /> Checked In
            </>
          ) : (
            <>
              <IoLogOutOutline size={14} /> Checked Out
            </>
          )}
        </StatusBadge>

      </CardHeader>

      <InfoRowComponent icon={FiHash} label="Employee ID" value={emp_id} />
      <InfoRowComponent icon={FiUsers} label="Customer" value={customer_name} />
      <InfoRowComponent icon={FiPackage} label="Order Key" value={order_item_key} />

      {activeSession && (
        <TimeInfo>
          <SessionTitle>
            {activeSession.session}
          </SessionTitle>

          <TimeBlockComponent
            label="Check In"
            value={activeSession.check_in?.time || "--"}
            highlight
          />

          <TimeBlockComponent
            label="Check Out"
            value={activeSession.check_out?.time || "In Progress"}
          />
        </TimeInfo>
      )}
    </Card>
  );
};