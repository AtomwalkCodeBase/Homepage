import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { FaCheck, FaFileAlt, FaChevronDown, FaUser, FaIdBadge, FaBuilding, FaCalendarAlt, FaClock, FaStore, FaClipboardList, FaListAlt, FaUsers } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Button from '../../Button';
import Badge from '../../Badge';
import { formatAPITime } from '../../../pages/ProjectManagement/utils/utils';
import { LuBox } from 'react-icons/lu';


// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusMap = { S: 'SUBMITTED', A: 'APPROVED', R: 'REJECTED' };

const processDayLogs = (dayLogs = {}) => {
  const grouped = {};
  Object.values(dayLogs).forEach(log => {
    const date = log.date;
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(log);
  });

  return Object.entries(grouped).map(([date, sessions]) => {
    const sorted = sessions.sort((a, b) => (a.check_in?.time || '').localeCompare(b.check_in?.time || ''));
    return {
      date,
      checkInTime: sorted[0].check_in || 'N/A',
      checkOutTime: sorted[sorted.length - 1].check_out || 'N/A',
      effort: sorted[0].effort || 0,
      totalItems: sessions.reduce((sum, s) => sum + (s.no_of_items || 0), 0),
      status: sorted[0].timeSheetStatus || 'PENDING',
    };
  });
};

const fmt = (val) => val || '—';

// ─── Overlay & Modal ──────────────────────────────────────────────────────────
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 100%;
  max-width: 1024px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);
  overflow: clip;
`;

// ─── Modal Header ──────────────────────────────────────────────────────────────
const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, #8b83ff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const EmpInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EmpAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
`;

const EmpMeta = styled.div``;

const EmpName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
  }
`;

const EmpId = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 3px;
`;

const CloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover { background: rgba(255, 255, 255, 0.28); }
`;

// ─── Body ──────────────────────────────────────────────────────────────────────
const ModalBody = styled.div`
  flex: 1;
  min-height: 0;          /* critical: lets flex child honour parent's height ceiling */
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.backgroundAlt}; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    opacity: 0.5;
  }
`;

// ─── Accordion ────────────────────────────────────────────────────────────────
const AccordionWrap = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  overflow: clip;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const AccordionTrigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, $open }) => $open ? theme.colors.primaryLight : theme.colors.card};
  border: none;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};
  text-align: left;

  &:hover { background: ${({ theme }) => theme.colors.primaryLight}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const TriggerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

const AccordionIcon = styled(FaChevronDown)`
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  font-size: 0.75rem;
  transition: transform 0.25s ease;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const AccordionBody = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

// ─── Customer Header in Trigger ───────────────────────────────────────────────
const CustomerTitle = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CustomerSubtitle = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 2px;
`;

const CustomerIndexBadge = styled.div`
  width: 26px;
  height: 26px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

// ─── Info Grid ────────────────────────────────────────────────────────────────
const SectionLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const InfoItemLabel = styled.span`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  gap: 4px;

  svg { color: ${({ theme }) => theme.colors.primary}; opacity: 0.7; }
`;

const InfoItemValue = styled.span`
  font-size: 0.85rem;
  color: ${({ theme, highlight }) =>
    highlight ? theme.colors.card : theme.colors.text
  };
  font-weight: 500;

  ${({ highlight, theme, color }) => highlight && `
    padding: ${theme.spacing.sm};
    background: ${theme.colors[color] || theme.colors.primary};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

// ─── Day Logs Table ───────────────────────────────────────────────────────────
const TableContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  /* Both axes scroll independently */
  overflow-x: auto;
  overflow-y: auto;
  max-height: 280px;

  &::-webkit-scrollbar { width: 6px; height: 6px; }
  &::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.backgroundAlt}; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;

  thead {
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    z-index: 1;
  }
`;

const LogsHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LogsTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SessionCount = styled.span`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const Th = styled.th`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  vertical-align: middle;

  &:last-child { border-bottom: none; }
  tr:last-child & { border-bottom: none; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.85rem;
`;

const Section = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, actual }) => actual ? `${theme.colors.success}30` : theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// ─── Sub-components ────────────────────────────────────────────────────────────
const InfoField = ({ icon: Icon, label, value, highlight, color }) => (
  <InfoItem>
    <InfoItemLabel>
      {Icon && <Icon size={10} />}
      {label}
    </InfoItemLabel>
    <InfoItemValue highlight={highlight} color={color}>{fmt(value)}</InfoItemValue>
  </InfoItem>
);

const DayLogsTable = ({ dayLogs, onApproveAll, employee, orderItem, showApproveAllButton }) => {
  const sessions = useMemo(() => processDayLogs(dayLogs), [dayLogs]);

  return (
    <>
      <LogsHeaderRow>
        <LogsTitle>
          <FaListAlt size={11} />
          Day Logs
          <SessionCount>{sessions.length} Day{sessions.length !== 1 ? 's' : ''}</SessionCount>
        </LogsTitle>
        {sessions.length > 0 && showApproveAllButton && (
          <Button onClick={() => onApproveAll(employee, orderItem, 'WEEKLY_APPROVE')}>
            <FaCheck /> Approve All
          </Button>
        )}
      </LogsHeaderRow>

      {sessions.length === 0 ? (
        <EmptyState>No sessions recorded yet.</EmptyState>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                {['Date', 'Check In', 'Check Out', 'Effort', 'Items Audited', 'Status'].map(h => (
                  <Th key={h}>{h}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => {
                const status = statusMap[s.status] || 'PENDING';
                const badgeVariant = status === 'SUBMITTED' ? 'warning' : status === 'APPROVED' ? 'success' : 'error';
                return (
                  <tr key={s.date}>
                    <Td>{s.date}</Td>
                    <Td>{s.checkInTime}</Td>
                    <Td>{s.checkOutTime}</Td>
                    <Td>{s.effort}</Td>
                    <Td>{s.totalItems}</Td>
                    <Td><Badge variant={badgeVariant}>{status}</Badge></Td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </>
  );
};

const CustomerAccordion = ({ orderItem, index, defaultOpen, employee, onApproveAll, showApproveAllButton }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [logsOpen, setLogsOpen] = useState(true);

  const planned_start_date = orderItem?.original_P?.start_date || orderItem?.planned_start_date;
  const planned_end_date   = orderItem?.original_P?.end_date   || orderItem?.planned_end_date;
  const planned_start_time = orderItem?.original_P?.start_time || orderItem?.planned_start_time;
  const planned_end_time   = orderItem?.original_P?.end_time   || orderItem?.planned_end_time;
  const actual_start_date  = orderItem?.original_A?.start_date || orderItem?.actual_start_date;
  const actual_end_date    = orderItem?.original_A?.end_date   || orderItem?.actual_end_date;
  const planned_no_of_items    = orderItem?.original_P?.no_of_items;
  const actual_no_of_items    = orderItem?.original_A?.no_of_items;

  const calculateDaysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return 0 ;
    const months = { jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11 };
    const parseDate = (ds) => { const [d,m,y] = ds.split('-'); return new Date(+y, months[m.toLowerCase()], +d); };
    const diffTime = Math.abs(parseDate(endDate) - parseDate(startDate));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <AccordionWrap>
      <AccordionTrigger onClick={() => setOpen(v => !v)} $open={open}>
        <TriggerLeft>
          <div>
            <CustomerTitle>{orderItem.customer_name || 'Customer'}</CustomerTitle>
            <CustomerSubtitle>
              {orderItem.audit_type || ''}
              {orderItem.order_item_key ? ` · ${orderItem.order_item_key}` : ''}
            </CustomerSubtitle>
          </div>
        </TriggerLeft>
        <AccordionIcon $open={open} />
      </AccordionTrigger>

      {open && (
        <AccordionBody>
          {/* Day Logs nested accordion */}
          <AccordionWrap>
            <AccordionTrigger onClick={() => setLogsOpen(v => !v)} $open={logsOpen}>
              <TriggerLeft>
                <FaListAlt size={13} style={{ color: '#6C63FF', flexShrink: 0 }} />
                <div>
                  <CustomerTitle style={{ fontSize: '0.88rem' }}>Day Logs</CustomerTitle>
                </div>
              </TriggerLeft>
              <AccordionIcon $open={logsOpen} />
            </AccordionTrigger>
            {logsOpen && (
              <AccordionBody>
                <DayLogsTable
                  dayLogs={orderItem.day_logs}
                  onApproveAll={onApproveAll}
                  employee={employee}
                  orderItem={orderItem}
                  showApproveAllButton={showApproveAllButton}
                />
              </AccordionBody>
            )}
          </AccordionWrap>

          <Divider />

          {/* Customer Info */}
          <SectionLabel><FaBuilding size={11} /> Customer Details</SectionLabel>
          <InfoGrid>
            <InfoField icon={FaBuilding}      label="Customer Name"   value={orderItem.customer_name} />
            <InfoField icon={FaFileAlt}       label="Audit Type"      value={orderItem.audit_type} />
            <InfoField icon={FaClipboardList} label="Order Item Key"  value={orderItem.order_item_key} />
            <InfoField icon={FaStore}         label="Store Name"      value={orderItem.store_name || orderItem.location} />
          </InfoGrid>

          <Section>
            <SectionLabel><FaCalendarAlt size={11} /> Planned Schedule</SectionLabel>
            <InfoGrid>
              <InfoField icon={FaCalendarAlt} label="Start Date"  value={planned_start_date} />
              <InfoField icon={FaCalendarAlt} label="End Date"    value={planned_end_date} />
              <InfoField icon={FaClock}       label="Start Time"  value={formatAPITime(planned_start_time)} />
              <InfoField icon={FaClock}       label="End Time"    value={formatAPITime(planned_end_time)} />
              <InfoField icon={LuBox}       label="Planned no of items"    value={planned_no_of_items} />
              <InfoField icon={FaCalendarAlt} label="Duration" highlight color="primary"
                value={calculateDaysBetween(planned_start_date, planned_end_date) + ' days'} />
            </InfoGrid>
          </Section>

          <Section actual>
            <SectionLabel><FaCalendarAlt size={11} /> Actual Schedule</SectionLabel>
            <InfoGrid>
              <InfoField icon={FaCalendarAlt} label="Start Date" value={actual_start_date} />
              <InfoField icon={FaCalendarAlt} label="End Date"   value={actual_end_date} />
              <InfoField icon={FaCalendarAlt} label="Actual no of items"   value={actual_no_of_items} />
              <InfoField icon={LuBox} label="Duration" highlight color="success"
                value={calculateDaysBetween(actual_start_date, actual_end_date) + ' days'} />
            </InfoGrid>
          </Section>

          {orderItem.remark && (
            <>
              <SectionLabel><FaFileAlt size={11} /> Remark</SectionLabel>
              <InfoItemValue style={{ fontSize: '0.85rem', color: '#555' }}>{orderItem.remark}</InfoItemValue>
            </>
          )}
        </AccordionBody>
      )}
    </AccordionWrap>
  );
};

// ─── Main ──────────────────────────────────────────────────────────────────────
const EmployeeWiseTSView = ({ sessionItem, onClose, onApproveSession, onRejectSession, onApproveAll, showApproveAllButton }) => {
  if (!sessionItem) return null;

  const { employee, orderItems = [] } = sessionItem;
  const items = orderItems.length > 0 ? orderItems : sessionItem.orderItem ? [sessionItem.orderItem] : [];

  // console.log(items)

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>

        <ModalHeader>
          <EmpInfo>
            <EmpAvatar>{(employee?.employee_name || employee?.name || 'E').charAt(0).toUpperCase()}</EmpAvatar>
            <EmpMeta>
              <EmpName>{employee?.employee_name || employee?.name || 'Employee'}<Badge variant={items[0]?.original_P.emp_grade > 100 ? "settle" : "forward"} style={{marginLeft: "0.5rem"}}>{items[0]?.original_P.emp_grade > 100 ? "Team Lead" : "Executive"}</Badge></EmpName>
              <EmpId><FaIdBadge size={10} /> {employee?.emp_id || '—'}</EmpId>
              <EmpId><FaUsers size={10} /> Total number of customer: {items.length || '—'}</EmpId>
            </EmpMeta>
          </EmpInfo>
          <CloseBtn onClick={onClose}><IoClose /></CloseBtn>
        </ModalHeader>

        <ModalBody>
          {items.length === 0 ? (
            <EmptyState>No customer data available.</EmptyState>
          ) : (
            items.map((orderItem, idx) => (
              <CustomerAccordion
                key={orderItem.order_item_key || idx}
                orderItem={orderItem}
                index={idx}
                defaultOpen={idx === 0}
                employee={employee}
                onApproveAll={onApproveAll}
                showApproveAllButton={showApproveAllButton}
              />
            ))
          )}
        </ModalBody>

      </ModalContainer>
    </Overlay>
  );
};

export default EmployeeWiseTSView;