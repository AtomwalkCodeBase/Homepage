import React, { useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaFileExport, FaCheckCircle, FaPaperPlane, FaEye } from 'react-icons/fa';
import Card from '../../components/Card';
import { formatToApiDate, formatWeekLabel, mapEmployeeCustomerOrderItemData, normalizeDate, parseApiDate } from './utils/utils';
import { createPortal } from 'react-dom';
import EmployeeWiseTSView from '../../components/modals/ModalForProjectmanagemnt/EmployeeWiseTSView';
import { theme } from '../../styles/Theme';

// Styled Components

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  position: relative;
    z-index: 1000;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
  }

  thead {
    background: #f8f9fa;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #666;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #e0e0e0;
    white-space: nowrap;
  }

  tbody tr {
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }

    &:last-child {
      border-bottom: 2px solid #333;
      background-color: #f8f9fa;
      font-weight: 600;
    }
  }

  td {
    padding: 12px 16px;
    color: #333;
    font-size: 0.9rem;
    position: relative;
  }
`;

const TotalBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  background: ${props => props.color};
  color: #fff;
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
`;

const TableActions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${props => props.size === 'sm' ? '8px 16px' : '10px 20px'};
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => {
    if (props.variant === 'primary') {
      return `
        background: #6C63FF;
        color: #fff;
        &:hover {
          background: #5B52E8;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(108, 99, 255, 0.3);
        }
      `;
    } else if (props.variant === 'outline') {
      return `
        background: transparent;
        color: #6C63FF;
        border: 2px solid #6C63FF;
        &:hover {
          background: #6C63FF;
          color: #fff;
        }
      `;
    }
  }}

  &:active {
    transform: translateY(0);
  }
`;

const WeekSelect = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d0d7e0;
  background: white;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
  }
`;
const WeekSelectorContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

const WeekLabel = styled.strong`
  font-weight: 600;
  color: #333;
`;

const HoverCell = styled.td`
  cursor: ${props => props.$hasDetails ? 'pointer' : 'default'};
  transition: background-color ${props => props.theme.transitions.fast};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  user-select: none;

  &:hover {
    background-color: ${props => props.$hasDetails ? props.theme.colors.primaryLight : 'inherit'} !important;
  }
`;

const CellContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};
`;

const ValueText = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ItemCountBadge = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 700;
  padding: 1px 6px;
  border-radius: ${props => props.theme.borderRadius.full};
  min-width: 18px;
  text-align: center;
  line-height: 1.6;
`;

/* ── Overlay (mobile backdrop + desktop click-outside) ── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0,0,0,0.25);

  @media (min-width: 768px) {
    background: transparent;
  }
`;

/* ── Shared panel base ── */
const Panel = styled.div`
  position: fixed;
  z-index: 9999;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 32px rgba(0,0,0,0.18);
  width: 100%;
  left: 0;
  bottom: 0;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.25s cubic-bezier(0.32, 0.72, 0, 1);

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  @media (min-width: 768px) {
    width: 480px;
    border-radius: 14px;
    bottom: auto;
    left: ${props => props.$x}px;
    top: ${props => props.$y}px;
    max-height: 420px;
    box-shadow: 0 8px 40px rgba(108,99,255,0.18), 0 2px 8px rgba(0,0,0,0.08);
    animation: popIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    @keyframes popIn {
      from { transform: scale(0.88) translateY(6px); opacity: 0; }
      to   { transform: scale(1)    translateY(0);   opacity: 1; }
    }
  }
`;

const PanelHandle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: #ddd;
  margin: 10px auto 0;
  flex-shrink: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

const PanelHeader = styled.div`
  padding: 14px 16px 10px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const PanelTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const TotalChip = styled.div`
  background: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
`;

const PanelBody = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 8px 0 12px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primaryLight};
    border-radius: 4px;
  }
`;

/* Accent colors cycling per customer */
const ACCENT_COLORS = ['#6C63FF', '#FF6584', '#00C853', '#FF9800', '#2196F3', '#9C27B0'];

const CustomerBlock = styled.div`
  margin: 6px 12px;
  border-radius: 10px;
  border-left: 3px solid ${props => props.$accent};
  background: #fafafa;
  overflow: hidden;
`;

const CustomerBlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.$accent}12;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$accent};
  flex-shrink: 0;
`;

const CustName = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: #333;
  flex: 1;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const CustHours = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: ${props => props.$accent};
  background: white;
  border: 1px solid ${props => props.$accent}44;
  padding: 1px 7px;
  border-radius: 20px;
`;

const OrderItem = styled.div`
  padding: 6px 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 8px;
  border-top: 1px dashed #eee;
  align-items: center;

  &:first-of-type {
    border-top: none;
  }
`;

const OrderField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
`;

const FieldLabel = styled.span`
  font-size: 0.62rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FieldValue = styled.span`
  font-size: 0.75rem;
  color: #444;
  font-weight: 500;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;


const EffortBadge = styled.span`
  display: inline-block;
  background: ${props => props.$accent};
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
  justify-self: end;
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: center;
  justify-self: end;
`;
// Add these new styled components
const ScrollablePanel = styled(Panel)`
  max-height: 420px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollablePanelBody = styled(PanelBody)`
  overflow-y: auto;
  flex: 1;
  padding-right: ${({ theme }) => theme.spacing.sm};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    opacity: 0.5;
  }
`;

const CheckInOut = styled.div`
  display: flex;
  gap: 12px;
  
  span {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }
`;

const convertToDDMMMYYYY = (dateStr) => {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  const date = new Date(year, month - 1, day);

  const dayFormatted = String(date.getDate()).padStart(2, "0");
  const monthFormatted = date.toLocaleString("en-GB", { month: "short" });
  const yearFormatted = date.getFullYear();

  return `${dayFormatted}-${monthFormatted}-${yearFormatted}`;
};

// Main Component
const WeeklyTimesheetSummary = ({ structuredData, onExport, onExportWeek, onExportMonth, selectedMonth, handleApproveWeekly }) => {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [selectedSessionItem, setSelectedSessionItem] = useState(null);
  const [sessionDayLogStatuses, setSessionDayLogStatuses] = useState({});
  const [employeeDayLogsModal, setEmployeeDayLogsModal] = useState(false)
  const [monthDate, setMonthDate] = useState(new Date());
  const [weekStartDay, setWeekStartDay] = useState("sunday");

  useEffect(() => {
    if (selectedMonth) {
      setMonthDate(new Date(selectedMonth));
      setSelectedWeekIndex(0);
    }
  }, [selectedMonth]); 

  // console.log("structuredData", structuredData)

  const getStartOfWeek = (date, weekStart = "monday") => {
  const d = new Date(date);
  const day = d.getDay();

  const diff =
    weekStart === "monday"
      ? d.getDate() - day + (day === 0 ? -6 : 1)
      : d.getDate() - day;

  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getWeeksOfMonth = (monthDate, weekStart = "monday") => {
  const startOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  );

  const weeks = [];
  let current = getStartOfWeek(startOfMonth, weekStart);

  while (current <= endOfMonth) {
    weeks.push(new Date(current));
    current = new Date(current);
    current.setDate(current.getDate() + 7);
  }

  return weeks;
};



  // Helper: Format date to YYYY-MM-DD (your API format)
  const formatToApiDate = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const groupByDate = (employeeData) => {
    const dateMap = new Map();

    employeeData?.forEach(emp => {
      const employeeInfo = {
        empId: emp.emp_id,
        name: emp.employee_name
      };

      emp.customers?.forEach(customer => {
        customer.order_items?.forEach(orderItem => {
          Object.values(orderItem?.actual?.day_logs || {}).forEach(log => {
            const rawDate = log.date;
            if (!rawDate) return;

            const dateObj = parseApiDate(rawDate);
            if (!dateObj) {
              console.warn("Invalid date format:", rawDate);
              return;
            }

            const key = formatToApiDate(dateObj);   // ← "16-Feb-2026"

            const effort = Number(log.effort || 0);
            if (effort <= 0) return;

            const detail = {
              customer: customer.customer_name,
              orderItem: orderItem.order_item_key,
              key: orderItem.activity_id,
              location: orderItem.location,
              efforts: effort,

              // 🔥 attach session directly
              check_in: log.check_in,
              check_out: log.check_out,
              remarks: log.remarks
            };

            if (!dateMap.has(key)) {
              dateMap.set(key, []);
            }

            dateMap.get(key).push({
              employee: employeeInfo,
              customer,
              orderItem,
              effort,
              detail
            });
          });
        });
      });
    });

    return dateMap;
  };

const dateGrouped = useMemo(() => {
    return groupByDate(structuredData || []);
  }, [structuredData]);

  // console.log("dateGrouped", dateGrouped);

const weeks = useMemo(() => {
  return getWeeksOfMonth(monthDate, weekStartDay);
}, [monthDate, weekStartDay]);


  const weekDays = useMemo(() => {
    if (!weeks[selectedWeekIndex]) return [];

    const monday = weeks[selectedWeekIndex];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [weeks, selectedWeekIndex]);



const { employeeGroups, dailyTotals } = useMemo(() => {
  const employeeGroups = {};
  const dailyTotals = { total: 0 };

  // ── Step 1: Create entry for EVERY employee ───────────────────────────────
  structuredData?.forEach(emp => {
    const empId = emp.emp_id;

    if (!employeeGroups[empId]) {
      employeeGroups[empId] = {
        name: emp.employee_name || "Unknown",
        empId,
        total: 0,
        days: {}
      };

      // Initialize all 7 days with 0 (so they appear even if no logs)
      weekDays.forEach(day => {
        const dateStr = formatToApiDate(day);
        employeeGroups[empId].days[dateStr] = {
          total: 0,
          details: []
        };
      });
    }
  });

  // ── Step 2: Add actual efforts only where they exist ───────────────────────
  const weekDateStrings = weekDays.map(formatToApiDate);

weekDateStrings.forEach(dateStr => {
  const logs = dateGrouped.get(dateStr) || [];
  
  // logs.forEach(({ employee, detail, effort }) => {
  //   const empId = employee.empId;
  //   const dayEntry = employeeGroups[empId].days[dateStr];
    
  //   dayEntry.total += effort;
  //   employeeGroups[empId].total += effort;

  //   const existing = dayEntry.details.find(
  //     d => d.orderItem === detail.orderItem
  //   );

  //   const dayLogs = detail?.allDetails?.actual?.day_logs || {};

  //   const formattedDate = convertToDDMMMYYYY(dateStr);
  //   const sessionsForThisDate = Object.values(dayLogs).filter(
  //     log => log.date === formattedDate
  //   );

  //   const formattedSessions = sessionsForThisDate.map(log => ({
  //     check_in: log.check_in,
  //     check_out: log.check_out,
  //     effort: log.effort,
  //     remarks: log.remarks
  //   }));

  //   if (existing) {
  //     existing.efforts = (existing.efforts || 0) + effort;
  //     existing.sessions = [
  //       ...(existing.sessions || []),
  //       ...formattedSessions
  //     ];
  //   } else {
  //     dayEntry.details.push({
  //       ...detail,
  //       efforts: effort,
  //       sessions: formattedSessions
  //     });
  //   }

  //   if (!dailyTotals[dateStr]) dailyTotals[dateStr] = 0;
  //   dailyTotals[dateStr] += effort;
  //   dailyTotals.total += effort;
  // });

logs.forEach(({ employee, detail, effort }) => {
  const empId = employee.empId;
  const dayEntry = employeeGroups[empId].days[dateStr];

  dayEntry.total += effort;
  employeeGroups[empId].total += effort;

  const existing = dayEntry.details.find(
    d => d.orderItem === detail.orderItem
  );

  const session = {
    check_in: detail.check_in,
    check_out: detail.check_out,
    effort,
    remarks: detail.remarks
  };

  if (existing) {
    existing.efforts = (existing.efforts || 0) + effort;
    existing.sessions = [...(existing.sessions || []), session];
  } else {
    dayEntry.details.push({
      customer: detail.customer,
      orderItem: detail.orderItem,
      location: detail.location,
      efforts: effort,
      sessions: [session]
    });
  }

  if (!dailyTotals[dateStr]) dailyTotals[dateStr] = 0;
  dailyTotals[dateStr] += effort;
  dailyTotals.total += effort;
});
});
  return { employeeGroups, dailyTotals };
}, [structuredData, dateGrouped, weekDays]);

const employeeCount = Object.keys(employeeGroups).length;

  const weekExportRows = useMemo(() => {
    const weekDateStrings = weekDays.map(formatToApiDate);
    const rows = [];

    Object.values(employeeGroups).forEach((emp) => {
      const { empId, name, days } = emp;
      weekDateStrings.forEach((dateStr) => {
        const dayData = days[dateStr];
        if (!dayData || !dayData.details || dayData.details.length === 0) return;

        dayData.details.forEach((detail) => {
          rows.push({
            customer_name: detail.customer || "",
            audit_type: "",
            order_item_key: detail.orderItem || "",
            employee_name: name || "",
            employee_id: empId || "",
            planned_start_date: "",
            planned_end_date: "",
            planned_start_time: "",
            planned_end_time: "",
            actual_start_date: dateStr,
            actual_end_date: dateStr,
            planned_no_of_items: "",
            actual_no_of_items: "",
            remarks: "",
          });
        });
      });
    });

    return rows;
  }, [employeeGroups, weekDays]);

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
  // Get all order items for this employee from structuredData
  const employeeData = structuredData?.find(emp => emp.emp_id === employee.empId);

  // console.log("employee", employee)
  
  if (!employeeData) return;

  // Map selected week to API date format so we can filter logs
  const weekDateStrings = weekDays.map(formatToApiDate);

  // console.log("weekDateStrings",weekDateStrings)

  
  // Transform customer data to match the expected format for EmployeeWiseTSView
  const orderItems = [];
  
  employeeData.customers?.forEach(customer => {
    customer.order_items?.forEach(item => {
      // Process day logs to match the expected structure
      const dayLogsArray = Object.values(item?.actual?.day_logs || {})
        .map(log => {
          const apiDate = formatToApiDate(parseApiDate(log.date));
          return {
            ...log,
            date: log.date,
            apiDate,
            check_in: log.check_in?.time || log.check_in || '',
            check_out: log.check_out?.time || log.check_out || '',
            no_of_items: log.no_of_items || 0,
            timeSheetStatus: log.status || 'S',
          };
        })
        .filter(log => log.apiDate && weekDateStrings.includes(log.apiDate));

        // console.log("dayLogsArray", dayLogsArray)

      // Only include order items that have logs in the selected week
      if (dayLogsArray.length === 0) return;

      orderItems.push({
        customer_name: customer.customer_name,
        audit_type: item.audit_type,
        order_item_key: item.order_item_key,
        store_name: item.location,
        original_A: item?.actual?.original_A,
        original_P: item?.planned?.original_P,
        planned_start_date: item.planned_start_date,
        planned_end_date: item.planned_end_date,
        planned_start_time: item.planned_start_time,
        planned_end_time: item.planned_end_time,
        actual_start_date: item.actual?.start_date,
        actual_end_date: item.actual?.end_date,
        remark: item.remarks,
        day_logs: dayLogsArray
      });
    });
  });

  setSelectedSessionItem({
    employee: {
      employee_name: employee.name,
      emp_id: employee.empId
    },
    orderItems: orderItems
  });
  
  setEmployeeDayLogsModal(true);
};

  const handleCloseSessionModal = () => {
    setSelectedSessionItem(null);
    setSessionDayLogStatuses({});
    setEmployeeDayLogsModal(false);
  };

  return (
    <>
      <Card title="Weekly Timesheet Summary by Employee" style={{ marginTop: '2rem' }}>
        <WeekSelectorContainer>
          {/* Week Start Selector */}
          <select
            value={weekStartDay}
            onChange={(e) => {
              setWeekStartDay(e.target.value);
              setSelectedWeekIndex(0);
            }}
          >
            <option value="monday">Start Monday</option>
            <option value="sunday">Start Sunday</option>
          </select>

          {/* Week Dropdown */}
          <WeekSelect
            value={selectedWeekIndex}
            onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}
          >
            {weeks.map((startDate, idx) => {
              const endDate = new Date(startDate);
              endDate.setDate(startDate.getDate() + 6);

              return (
                <option key={idx} value={idx}>
                  {formatWeekLabel(startDate, endDate)}
                </option>
              );
            })}
          </WeekSelect>
        </WeekSelectorContainer>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                {weekDays.map((day, index) => (
                  <th key={index}>
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    <br />
                    <span style={{ fontSize: '0.75rem', color: '#999', fontWeight: 400 }}>
                      ({day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                    </span>
                  </th>
                ))}
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(employeeGroups).map(([employeeKey, employeeData]) => (
                <tr key={employeeKey}>
                  <td>
                    <div>
                      <strong>{employeeData.name}</strong>
                      <br />
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>
                        ({employeeData.empId})
                      </span>
                    </div>
                  </td>
                  {weekDays.map((day, index) => {
                    const dayStr = formatToApiDate(day);
                    const dayData = employeeData.days[dayStr];
                    // console.log("employeeData", employeeData);
                    return (
                      <HoverableCell
                        key={index}
                        value={dayData?.total || 0}
                        details={dayData?.details}
                        date={dayStr}
                      />
                    );
                  })}
                  <td>
                    <TotalBadge color={getTotalColour(employeeData.total, "time")}>
                      {employeeData.total.toFixed(1)}
                    </TotalBadge>
                  </td>
                  <td>
                  <Button variant="outline" size="sm" title="View" onClick={() => handleViewItem(employeeData)} >
                    <FaEye />
                  </Button>
                </td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Daily Total</strong>
                </td>
                {weekDays.map((day, index) => {
                  const dayStr = formatToApiDate(day);
                  const total = dailyTotals[dayStr] || 0;

                  const maxPossible = employeeCount * 8.5;
                  const percentage = maxPossible > 0 ? (total / maxPossible) * 100 : 0;
                  return (
                    <td key={index}>
                      <TotalBadge color={getTotalColour(percentage, "percentage")}>
                        <strong>{total} ({percentage.toFixed(0)}%)</strong>
                      </TotalBadge>
                    </td>
                  );
                })}
                <td>
                  <strong>{dailyTotals.total.toFixed(1)}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <TableActions>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (onExportWeek) return onExportWeek(weekExportRows);
                return onExport ? onExport(weekExportRows) : null;
              }}
            >
              <FaFileExport /> Export Week
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (onExportMonth) return onExportMonth();
                return onExport ? onExport(structuredData) : null;
              }}
            >
              <FaFileExport /> Export Month
            </Button>
          </TableActions>
        </TableContainer>
      </Card>

      {selectedSessionItem && employeeDayLogsModal &&
              <EmployeeWiseTSView
                sessionItem={selectedSessionItem}
                onClose={handleCloseSessionModal}
                showApproveAllButton={true}
                // onApproveSession={(date) => console.log('Approved:', date)}
                // onApproveSession={handleApproveWeekly}
                onRejectSession={(date) => console.log('Rejected:', date)}
                onApproveAll={handleApproveWeekly}
              />}
    </>
  );
};

// Helper function to get color based on total hours
const getTotalColour = (value, type) => {
  if (!value) return '#FF3D00'; // Red for empty
  const numeric = parseFloat(value);

  if (numeric === 0) return '#FF3D00'; // Red

  if (type === 'time') {
    if (numeric > 51) return '#FFD600';   // Yellow
    if (numeric > 45) return '#00C853';   // Green
    if (numeric < 45) return '#FF9800';   // Orange
  }

  if (type === 'percentage') {
    if (numeric > 100) return '#FFD600';  // Yellow
    if (numeric > 90) return '#00C853';   // Green
    if (numeric < 90) return '#FF9800';   // Orange
  }

  return '#FF9800'; // Default Orange
};


// Component for hoverable cell with tooltip
const HoverableCell = ({ value, details, date }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cellRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const hoverRef = useRef(false);
  const closeTimeoutRef = useRef(null);

  const groupedByCustomer = useMemo(() => {
    if (!details) return [];
    const map = {};
    details.forEach(d => {
      const key = d.customer || 'Unknown';
      if (!map[key]) map[key] = [];
      map[key].push(d);
    });
    return Object.entries(map);
  }, [details]);

  if (!value || value === 0) return <td>-</td>;

  const totalHours = details?.reduce((sum, d) => sum + (d.efforts || 0), 0) || 0;

  const calcPos = (rect) => {
    const panelW = 480;
    const panelH = 420; // Fixed max height
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 10;

    let x = rect.right + pad;
    let y = rect.top;

    if (x + panelW > vw - pad) x = rect.left - panelW - pad;
    if (x < pad) x = pad;
    if (y + panelH > vh - pad) y = vh - panelH - pad;
    if (y < pad) y = pad;

    return { x, y };
  };

  const handleClick = (e) => {
    if (!details || details.length === 0) return;
    e.stopPropagation();
    if (!isMobile && cellRef.current) {
      setPos(calcPos(cellRef.current.getBoundingClientRect()));
    }
    setOpen(o => !o);
  };

  const openTooltip = () => {
    if (isMobile || !details || details.length === 0) return;

    hoverRef.current = true;

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    if (cellRef.current) {
      setPos(calcPos(cellRef.current.getBoundingClientRect()));
    }

    setOpen(true);
  };

  const closeTooltip = () => {
    hoverRef.current = false;

    closeTimeoutRef.current = setTimeout(() => {
      if (!hoverRef.current) {
        setOpen(false);
      }
    }, 150);
  };

  // console.log("groupedByCustomer", JSON.stringify(details))
  // console.log("details", details)

  return (
    <>
      <HoverCell
        ref={cellRef}
        onClick={handleClick}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        $hasDetails={details && details.length > 0}
      >
        <CellContent>
          <ValueText>{value}</ValueText>
          {details && details.length > 0 && (
            <ItemCountBadge>{details.length}</ItemCountBadge>
          )}
        </CellContent>
      </HoverCell>

      {open && details && details.length > 0 && createPortal(
        <>
          {isMobile && (
            <Overlay onClick={() => setOpen(false)} />
          )}
          <ScrollablePanel
            $x={pos.x}
            $y={pos.y}
            onMouseEnter={() => {
              hoverRef.current = true;
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
              }
            }}
            onMouseLeave={closeTooltip}
          >
            <PanelHandle />
            <PanelHeader>
              <PanelTitle>Work breakdown</PanelTitle>
              <TotalChip>{totalHours.toFixed(1)} hrs</TotalChip>
            </PanelHeader>
            <ScrollablePanelBody>
              {groupedByCustomer.map(([custName, items], cIdx) => {
                const accent = ACCENT_COLORS[cIdx % ACCENT_COLORS.length];
                const custTotal = items.reduce((s, i) => s + (i.efforts || 0), 0);
                return (
                  <CustomerBlock key={custName} $accent={accent}>
                    <CustomerBlockHeader $accent={accent}>
                      <Dot $accent={accent} />
                      <CustName>{custName}</CustName>
                      <CustHours $accent={accent}>{custTotal.toFixed(1)}h</CustHours>
                    </CustomerBlockHeader>
                    {items.map((item, iIdx) => {
                      const formattedDate = convertToDDMMMYYYY(date);
                      // const dayLogs = item.allDetails?.actual?.day_logs || {};
                      // const dayLogForThisDate = dayLogs[formattedDate];

                      // const checkIn = dayLogForThisDate?.check_in?.time || '--:--';
                      // const checkOut = dayLogForThisDate?.check_out?.time || '--:--';
                      const sessions = item?.sessions || [];
                      // console.log(sessions)
                    
                    return(
                      <OrderItem key={iIdx}>
                        <OrderField>
                          <FieldLabel>Order Item</FieldLabel>
                          <FieldValue title={item.orderItem}>{item.orderItem || 'N/A'}</FieldValue>
                        </OrderField>
                        <EffortBadge $accent={accent}>{item.efforts || 0}h</EffortBadge>
                        <OrderField>
                          <FieldLabel>Location</FieldLabel>
                          <FieldValue title={item.location}>{item.location || 'N/A'} 
                      {/* {dayLogForThisDate && (
                              <CheckInOut>
                                <span>IN ⬇️ {checkIn}</span>
                                <span>OUT ⬆️ {checkOut}</span>
                              </CheckInOut>
                            )} */}
                            {  sessions.map((s, idx) => (
                              <CheckInOut key={idx}>
                                <span>IN ⬇️ {s.check_in?.time || '--:--'}</span>
                                <span>OUT ⬆️ {s.check_out?.time || '--:--'}</span>
                              </CheckInOut>
                            ))}
                          </FieldValue>
                        </OrderField>
                      </OrderItem>
                    )})}
                  </CustomerBlock>
                );
              })}
            </ScrollablePanelBody>
          </ScrollablePanel>
        </>,
        document.body
      )}
    </>
  );
};

export default WeeklyTimesheetSummary;