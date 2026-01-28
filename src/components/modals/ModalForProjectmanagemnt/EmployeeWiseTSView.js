import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaCheck, FaFileAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Button from '../../Button';
import { processTimesheetApproval } from '../../../services/productServices';
import { toast } from 'react-toastify';
import ConfirmPopup from '../ConfirmPopup';
import Badge from '../../Badge';
import ConfirmationPopup from '../ConfirmationPopup';

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primaryLight};
  
  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const HeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CustomerName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const AuditType = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SessionsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  flex: 1;
  
  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const SessionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const SessionsTitle = styled.div`
  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const NestedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const NestedTableHead = styled.thead`
  background: ${({ theme }) => theme.colors.primaryLight};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  vertical-align: top;
`;

const ResponsiveCell = styled(TableCell)`
  @media (max-width: 1200px) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xs};
  }
`;
const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

// Helper function to process day logs
const processDayLogs = (dayLogs) => {
  console.log(dayLogs)
  const groupedByDate = {};

  Object.entries(dayLogs).forEach(([key, log]) => {
    const date = log.date;
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(log);
  });

  return Object.entries(groupedByDate).map(([date, sessions]) => {
    const sortedSessions = sessions.sort((a, b) => {
      const timeA = a.check_in?.time || '';
      const timeB = b.check_in?.time || '';
      return timeA.localeCompare(timeB);
    });

    const firstSession = sortedSessions[0];
    const lastSession = sortedSessions[sortedSessions.length - 1];

    return {
      date,
      checkInTime: firstSession.check_in || 'N/A',
      checkOutTime: lastSession.check_out || 'N/A',
      totalItems: sessions.reduce((sum, s) => sum + (s.no_of_items || 0), 0),
      status: firstSession.timeSheetStatus || 'PENDING',
      ts_id: firstSession.ts_id, // Ensure ts_id is passed through
    };
  });
};

// Main Component
const EmployeeWiseTSView = ({ sessionItem, onClose, onApproveSession, onRejectSession, onApproveAll}) => {

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedSessionDate, setSelectedSessionDate] = useState(null);
  const [selectedTsId, setSelectedTsId] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState(null); // 'APPROVED' or 'REJECTED'
  const [isLoading, setIsLoading] = useState(false);

  const processedSessions = useMemo(() =>
    processDayLogs(sessionItem.orderItem.day_logs || {}),
    [sessionItem]
  );

  if (!sessionItem) return null;

  const pendingCount = processedSessions.filter(s => s.status === 'PENDING').length;


  const handleApproval = (date, status, ts_id) => {
    setSelectedSessionDate(date);
    setSelectedTsId(ts_id);
    setConfirmStatus(status);
    setConfirmModalOpen(true);
  };
  console.log("sessionItem", sessionItem)

  const handleConfirm = async (remark) => {
    setIsLoading(true);
    const approverId = localStorage.getItem("emp_id")
    try {
      const payload = {
        a_emp_id: approverId,
        a_date: selectedSessionDate,
        ts_id: selectedTsId ,
        a_remark: remark,
        call_mode: confirmStatus,
        emp_id: sessionItem.employee.emp_id 
      };

      // const response = await processTimesheetApproval(payload);

      console.log(payload)

      const response = {status: 200}

      if (response?.status === 200) {
        toast.success(`Session ${confirmStatus === 'APPROVED' ? 'Approved' : 'Rejected'} Successfully`);
        if (confirmStatus === 'APPROVED') {
          onApproveSession?.(selectedSessionDate);
        } else {
          onRejectSession?.(selectedSessionDate);
        }
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error processing request");
    } finally {
      setIsLoading(false);
      setConfirmModalOpen(false);
      setSelectedSessionDate(null);
      setSelectedTsId(null);
      setConfirmStatus(null);
    }
  };

  const statusMap = {
    'S': 'SUBMITTED',
    'A': 'APPROVED',
    'R': 'REJECTED',
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderInfo>
            <CustomerName>{sessionItem.orderItem.customer_name || 'Customer Name'}</CustomerName>
            <AuditType>
              <FaFileAlt />
              {sessionItem.orderItem.audit_type || 'Audit Type'}
            </AuditType>
          </HeaderInfo>
          <CloseBtn onClick={onClose}>
            <IoClose />
          </CloseBtn>
        </Header>

        <SessionsContainer>
          <SessionsHeader>
            <SessionsTitle>
              <h4>Logged Sessions</h4>
              <p>{processedSessions.length} session{processedSessions.length !== 1 ? 's' : ''} recorded</p>
            </SessionsTitle>
            {processedSessions.length !== 0 && <Button
              onClick={() => onApproveAll(sessionItem?.employee, sessionItem?.orderItem, "WEEKLY_APPROVE")}
            >
              <FaCheck /> Approve All
            </Button>}
          </SessionsHeader>

          <NestedTable>
            <NestedTableHead>
              <TableRow>
                <TableHeader>Date</TableHeader>
                <TableHeader>Check in</TableHeader>
                <TableHeader>Check out</TableHeader>
                <TableHeader>No of item Audited</TableHeader>
                <TableHeader>Status</TableHeader>
                {/* <TableHeader>Actions</TableHeader> */}
              </TableRow>
            </NestedTableHead>
            {processedSessions.map((session) => {
              const status = statusMap[session.status] || 'PENDING';
              return (
                <tbody>
                  <TableRow key={session.date}>
                    <ResponsiveCell>
                      <DetailRow>
                        {session.date}
                      </DetailRow>
                    </ResponsiveCell>
                    <ResponsiveCell>
                      <DetailRow>
                        {session.checkInTime}
                      </DetailRow>
                    </ResponsiveCell>
                    <ResponsiveCell>
                      <DetailRow>
                        {session.checkOutTime}
                      </DetailRow>
                    </ResponsiveCell>
                    <ResponsiveCell>
                      <DetailRow>
                        {session.totalItems}
                      </DetailRow>
                    </ResponsiveCell>
                    <ResponsiveCell>
                      {/* <DetailRow> */}
                        <Badge variant={status === "SUBMITTED" ? 'warning' : status === "APPROVED" ? "success"  : "error"}>{status}</Badge>
                      {/* </DetailRow> */}
                    </ResponsiveCell>
                    {/* <ResponsiveCell>
                      <ActionsGroup>
                        {status === 'SUBMITTED' && (
                          <>
                            <Button variant="primary" size="sm" title="Approve" onClick={() => handleApproval(session.date, 'APPROVED', session.ts_id)}>
                              <FaCheck /> Approve
                            </Button>
                            <Button variant="outlines" size="sm" title="Reject" onClick={() => handleApproval(session.date, 'REJECTED', session.ts_id)}>
                              <FaTimes /> Reject
                            </Button>
                          </>
                        )}
                      </ActionsGroup>
                    </ResponsiveCell> */}
                  </TableRow>
                </tbody>
              );
            })}
          </NestedTable>
        </SessionsContainer>
      </ModalContainer>
      {/* <ConfirmPopup
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        approve={confirmStatus === 'APPROVED' ? "APPROVE" : "REJECT"}
        isLoading={isLoading}
        title={confirmStatus === 'APPROVED' ? "Approve Day Session" : "Reject Day Session"}
        message={`Are you sure you want to ${confirmStatus === 'APPROVED' ? 'approve' : 'reject'} the session for ${selectedSessionDate}?`}
        confirmLabel={confirmStatus === 'APPROVED' ? "Approve" : "Reject"}
      /> */}
     {confirmModalOpen && <ConfirmationPopup
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        approve={confirmStatus === 'APPROVED' ? "APPROVE" : "REJECT"}
        timesheet={true}
        isLoading={isLoading}
        date={selectedSessionDate}
      />}
    </Overlay>
  );
};

export default EmployeeWiseTSView;