import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  PlayCircle,
  PauseCircle,
  ChevronDown,
  Package,
  Timer,
  FileText,
  Play,
  TrendingUp,
  PenBox,
  MapPin,
} from 'lucide-react';
import { getCurrentDateTimeDefaults, getTodayApiDateStr, formatToDDMMYYYY, getMonthRange, normalizeProjects, formatDate } from './utils/utils';
import Button from '../../components/Button';
import { CalendarEvent } from 'react-bootstrap-icons';
import { FaBan, FaCheck, FaRegFile, FaUsers } from 'react-icons/fa';
import Badge from '../../components/Badge';
import RetainerCard from '../../components/modals/ModalForProjectmanagemnt/RetainerCard';
import { getEmpAllocationData } from '../../services/productServices';
import { FiEye, FiUsers } from 'react-icons/fi';

const CardHover = styled.div`
  background: ${({ theme }) => theme.colors?.card || '#fff'};
  border: 1px solid ${({ theme }) => theme.colors?.border || '#e0e0e0'};
  border-radius: ${({ theme }) => theme.cardStyle?.borderRadius || '12px'};
  padding: ${({ theme }) => theme.spacing?.lg || '1rem'};
  margin-bottom: ${({ theme }) => theme.spacing?.md || '1rem'};
  box-shadow: ${({ theme }) => theme.shadows?.md || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  transition: ${({ theme }) => theme.transitions?.normal || 'all 0.3s ease'};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors?.primary || '#6C63FF'};
    box-shadow: ${({ theme }) =>
    theme.cardStyle?.shadow === 'heavy' ? '0 10px 20px rgba(108,99,255,0.2)' :
      theme.shadows?.lg || '0 4px 12px rgba(108,99,255,0.15)'};
    transform: ${({ theme }) =>
    theme.cardStyle?.animation ? 'translateY(-2px)' : 'none'};
  }
`;

const Flex = styled.div`
  display: grid;
 grid-template-columns: ${({ filterType }) => filterType === 'today' || "custom" ? '5fr 1fr' : '1fr'};
  gap: ${({ theme }) => theme.spacing?.xl || '3rem'};
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing?.md || '1rem'};
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing?.sm || '0.5rem'};
  min-width: 180px;
  
  @media (max-width: 968px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const Company = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes?.lg || '1.125rem'};
  font-weight: ${({ theme }) => theme.fontWeights?.heading || '600'};
  margin: 0 0 ${({ theme }) => theme.spacing?.xs || '0.25rem'};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.sm || '0.5rem'};
  color: ${({ theme }) => theme.colors?.text || '#333'};
`;

const Order = styled.div`
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.8rem'};
  color: ${({ theme }) => theme.colors?.textLight || '#666'};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || '0.4rem'};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing?.md || '0.75rem'};
  margin: ${({ theme }) => theme.spacing?.md || '1rem'} 0;
`;

const Item = styled.div`
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.85rem'};
  color: ${({ theme }) => theme.colors?.text || '#000'};
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors?.textLight || '#666'};
  font-size: ${({ theme }) => theme.fontSizes?.xs || '0.75rem'};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || '0.25rem'};
  margin-bottom: ${({ theme }) => theme.spacing?.xs || '0.2rem'};
`;

const StatusBadge = styled(Badge)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-weight: 600;

  ${({ status }) =>
    status === "Started" &&
    `
    background: #2196F3;
    color: #fff;
  `}

  ${({ status }) =>
    status === "In Progress" &&
    `
    background: #2196F3;
    color: #fff;
  `}

  ${({ status }) =>
    status === "Completed" &&
    `
    background: #00C853;
    color: #fff;
  `}

  ${({ status }) =>
    status === "Planned" &&
    `
    background: #FFD600;
    color: #000;
  `}

  ${({ status }) =>
    status === "Pending" &&
    `
    background: #9333EA; /* amber/orange */
    color: #fff;
  `}
`


const Progress = styled.div`
  margin: ${({ theme }) => theme.spacing?.md || '0.75rem'} 0;
`;

const Bar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#f0f2f8'};
  border-radius: ${({ theme }) => theme.borderRadius?.full || '999px'};
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ p }) => p}%;
  background: ${({ theme }) => theme.colors?.primary || '#6C63FF'};
  transition: ${({ theme }) => theme.transitions?.normal || 'width 0.4s ease'};
`;

const LogsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing?.md || '1rem'};
  border: 1px solid ${({ theme }) => theme.colors?.border || '#e0e0e0'};
  border-radius: ${({ theme }) => theme.borderRadius?.md || '8px'};
  overflow: hidden;
`;

const LogsHeader = styled.div`
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#f8f9fc'};
  padding: ${({ theme }) => theme.spacing?.sm || '0.5rem'} ${({ theme }) => theme.spacing?.md || '0.75rem'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.85rem'};
  transition: ${({ theme }) => theme.transitions?.fast || '0.2s ease'};
  
  &:hover {
    background: ${({ theme }) => theme.colors?.primaryLight || '#E8E6FF'};
  }
`;

const LogsToggle = styled.div`
color: "#666";
  transition: ${({ theme }) => theme.transitions?.normal || 'transform 0.3s ease'};
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const LogsContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '400px' : '0')};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions?.normal || 'max-height 0.3s ease'};
`;

const LogsGrid = styled.div`
  display: grid;
  gap: 1px;
  background-color: ${({ theme }) => theme.colors?.border || '#e0e0e0'};
`;

const LogRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: ${({ theme }) => theme.spacing?.md || '1rem'};
  align-items: center;
  padding: ${({ theme }) => theme.spacing?.sm || '0.5rem'} ${({ theme }) => theme.spacing?.md || '0.75rem'};
  background: ${({ theme }) => theme.colors?.card || '#fff'};
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.8rem'};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing?.xs || '4px'};
  }
`;

const LogDate = styled.span`
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || '4px'};
  color: ${({ theme }) => theme.colors?.textLight || '#666'};
`;

const LogTime = styled.span`
  color: ${({ theme }) => theme.colors?.textLight || '#666'};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || '4px'};
`;

const LogStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing?.sm || '0.5rem'};
  align-items: center;
`;

const LogBadge = styled.span`
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#f0f2f8'};
  color: ${({ theme }) => theme.colors?.text || '#333'};
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.borderRadius?.sm || '4px'};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes?.xs || '0.75rem'};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || '4px'};
`;

const LogRemark = styled.div`
  grid-column: 1 / -1;
  color: ${({ theme }) => theme.colors?.textLight || '#666'};
  font-style: italic;
  padding-top: ${({ theme }) => theme.spacing?.xs || '4px'};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing?.xs || '4px'};
`;

const NoLogsMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing?.md || '1rem'};
  color: ${({ theme }) => theme.colors?.textLight || '#999'};
  background: ${({ theme }) => theme.colors?.card || '#fff'};
`;

const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.875rem'};
  color: ${({ theme }) => theme.colors?.text || '#333333'};
  font-weight: 500;
`;

const PrimaryBtn = styled(Button)`
  background: ${({ theme }) => theme.colors?.primary || '#6C63FF'};
  color: #fff;
  
  &:hover:not(:disabled) {
    background:  '#5a52e0';
  }
      @media (max-width: 768px) {
    width: 100%;
  }
`;

const SuccessBtn = styled(Button)`
  background: ${({ theme }) => theme.colors?.success || '#00C853'};
  color: #fff;
  font-size: 16px;
  
  &:hover:not(:disabled) {
    background: #00b347;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SecondaryBtn = styled(Button)`
  background: ${({ theme }) => theme.colors?.card || '#fff'};
  color: ${({ theme }) => theme.colors?.text || '#333'};
  border: 1px solid ${({ theme }) => theme.colors?.border || '#ddd'};
  font-size: 16px;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors?.backgroundAlt || '#f5f5f5'};
  }
      @media (max-width: 768px) {
    width: 100%;
  }
`;



export const ActivityCard = ({ activity, filterType, onAction, isManager, onNavigateToRetainer }) => {
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isRetainerOpen, setIsRetainerOpen] = useState(false);
  const [retainerDataCache, setRetainerDataCache] = useState({});
  const [dateRange, setDateRange] = useState(() => {
    const { start, end } = getMonthRange("current")
    return { start, end }
  })
  const progress = activity.total_no_of_items || 0;
  const totalEffort = activity.original_P.no_of_items || 0;

  const isActivityStart = !!activity.original_A;

  // today's log (safe)
  const todayLog = activity.day_logs?.[getTodayApiDateStr()] || {};
  const todayCheckedIn = !!todayLog.check_in;
  const todayCheckedOut = !!todayLog.check_out;

  const { todayISO } = getCurrentDateTimeDefaults();

  const fetchEmpAllocationDataForRetainer = async (retainer) => {
    const payload = {
      emp_id: retainer.emp_id,
      start_date: formatToDDMMYYYY(dateRange.start),
      end_date: formatToDDMMYYYY(dateRange.end),
    };

    try {
      const response = await getEmpAllocationData(payload);
      const normalizedAllocation = normalizeProjects(response.data);
      const matchRetainer = normalizedAllocation.find((allocation) => allocation.p_id === retainer.a_id)
      setRetainerDataCache(prev => ({ ...prev, [retainer.emp_id]: { retainer, allocation: matchRetainer } }));
    } catch (error) {
      console.error("Failed to fetch retainer data", error);
    }
  };

  const fetchAllRetainerData = () => {
    const retainers = activity.original_P.retainer_list.filter(r => r.a_type === "P");
    retainers.forEach(retainer => {
      if (!retainerDataCache[retainer.emp_id]) {
        fetchEmpAllocationDataForRetainer(retainer);
      } else {
        // Always refetch to update data
        fetchEmpAllocationDataForRetainer(retainer);
      }
    });
  };

  useEffect(() => {
    if (isRetainerOpen) {
      fetchAllRetainerData();
    }
  }, [isRetainerOpen, activity.original_P.retainer_list]);

  const isImageFile = (url = "") => /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);

  const getFileNameFromUrl = (url = "") => decodeURIComponent(url.split("/").pop().split("?")[0]);

  const handleFileClick = (url) => {
  if (isImageFile(url)) {
    // Open image in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    // Force download for non-image files
    const link = document.createElement("a");
    link.href = url;
    link.download = getFileNameFromUrl(url);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


  return (
    <CardHover>
      <Flex filterType={filterType}>
        <Info>
          <div>
            <Company><Building2 size={18} />{activity.customer_name} <StatusBadge status={activity.project_period_status || activity.todaysStatus}>
              <StatusIcon status={activity.project_period_status || activity.todaysStatus} />
              {activity.project_period_status || activity.todaysStatus}
            </StatusBadge>
{activity.original_P.retainer_list.filter(r => r.a_type === "P").length !== 0   &&      <Badge variant='info' style={{cursor:"pointer"}} onClick={onNavigateToRetainer} ><FiUsers size={14} style={{marginRight: "0.4rem"}} />Retainer assigned: {activity.original_P.retainer_list.filter(r => r.a_type === "P").length}</Badge>}
</Company>            
<Order>
              <FileText size={14} />{activity.project_code || activity.order_item_key}
            </Order>
          </div>

          <Grid>
            <Item><Label><FileText size={14} />Audit Type</Label><DetailValue>{activity.audit_type}</DetailValue></Item>
            <Item><Label><Package size={14} />Total No. of Item Audit</Label><DetailValue>{activity.original_P.no_of_items || 0}</DetailValue></Item>
      

            <Item><Label><CalendarEvent size={14} />Planned Date</Label><DetailValue>{formatDate(activity.planned_start_date)} to {(activity.planned_end_date)}</DetailValue></Item>
              <Item><Label><CalendarEvent size={14} />Actual Date</Label><DetailValue>{ activity.actual_start_date  ?  `${activity.actual_start_date} to ${activity.actual_end_date}` : "Not started"}</DetailValue></Item>
          {activity.original_P.store_name && <Item><Label><MapPin size={14} />Location</Label><DetailValue>{activity.original_P.store_name}</DetailValue></Item>}
            {activity?.original_A?.is_file_applicable === true &&
              <Item>
                <Label><FaRegFile size={14} /> File Uploaded</Label>
                {activity?.original_A?.submitted_file ?
                  <DetailValue
                    style={{ cursor: "pointer" }}
                    onClick={() => handleFileClick(activity?.original_A.submitted_file)}
                  >
                    ✅ <FiEye /> View
                  </DetailValue> :
                  <DetailValue>
                    ❌
                  </DetailValue>
                }
              </Item>
          }
        {/* {activity?.original_A?.submitted_file ? 
          <Item>
            <Label>
              <FaRegFile size={14} /> File Uploaded
            </Label>
            <DetailValue
              style={{ cursor: "pointer" }}
              onClick={() => handleFileClick(activity?.original_A.submitted_file)}
            >
              ✅ <FiEye /> View 
            </DetailValue>
          </Item> : 
          <Item>
            <Label>
              <FaRegFile size={14} /> File Uploaded
            </Label>
            <DetailValue>
             ❌
            </DetailValue>
          </Item>
        } */}
          </Grid>
          {activity.original_P.store_remarks && <Item><Label><PenBox size={14} />Remark</Label><DetailValue>{activity.original_P.store_remarks}</DetailValue></Item>}

          {!totalEffort === 0 && <ProgressBar completed={progress} total={totalEffort} label="Effort Progress" />}

        </Info>

        <Actions>
          {isManager && (
            <>
              <Button variant="primary" size="sm" title="Approve" disabled={!activity.complete}>
                <FaCheck /> Approve
              </Button>
              <Button variant="outlines" size="sm" title="Reject" disabled={!activity.complete}>
                <FaBan /> Reject
              </Button>
            </>
          )}
          {!isManager && (
            <TodayActionButtons
              activity={activity}
              todayCheckedIn={todayCheckedIn}
              todayCheckedOut={todayCheckedOut}
              isActivityStart={isActivityStart}
              hasPendingCheckout={activity.hasPendingCheckout}
              pendingCheckoutDate={activity.pendingCheckoutDate}
              complete={activity.complete}
              onAction={onAction}
              todayISO={todayISO}
              getTodayApiDateStr={getTodayApiDateStr}
              retainerPage={false}
              isManager={isManager}
            />
          )}
        </Actions>
      </Flex>
      {(isManager && !activity.complete) &&
        <Label style={{ marginTop: 5, color: "red" }}>Note*:- Employee did not complete the activity so you can't approve or reject the activity</Label>}


      {/* {(filterType === "past7" || isManager) &&  */}
      <ActivityLogs
        logs={activity.day_logs}
        isOpen={isLogsOpen}
        onToggle={() => setIsLogsOpen(!isLogsOpen)}
      />
      {/* } */}

      {/* {activity.original_P.retainer_list.length !== 0 &&
        <RetainerList
          retainerList={activity.original_P.retainer_list}
          isOpen={isRetainerOpen}
          onToggle={() => setIsRetainerOpen(!isRetainerOpen)}
          onAction={onAction}
          retainerDataCache={retainerDataCache}
          onRetainerUpdate={fetchAllRetainerData}
        />

      } */}
    </CardHover>
  );
};

//Status Icon
const StatusIcon = ({ status }) => {
  switch (status) {
    case "Planned":
      return <Calendar size={14} />;
    case "Started":
      return <Play size={14} />;
    case "In Progress":
      return <TrendingUp size={14} />;
    case "Pending":
      return <PauseCircle size={14} />;
    case "Completed":
      return <CheckCircle2 size={14} />;
    default:
      return null;
  }
};

//ProgressBar for audit Items
const ProgressBar = ({ completed, total, label = 'Progress' }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <Progress>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem' }}>
        <span style={{ color: "#666" }}>{label}</span>
        {/* <strong style={{color: "#666"}}>{percentage}%</strong> */}
      </div>
      <Bar><Fill p={percentage} /></Bar>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
        {/* <span>{completed}h spent</span> */}
        <span>{completed}</span>
        {/* <span>{total}h total</span> */}
        <span>{total}</span>
      </div>
    </Progress>
  );
};

export const ActivityLogs = ({ retainer, logs, isOpen, onToggle }) => {
  const logEntries = Object.values(logs || {});

  return (
    <LogsSection>
      <LogsHeader onClick={onToggle}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: "#666" }}>
          <FileText size={16} /> Activity Logs <span style={{ fontWeight: 400 }}>({logEntries.length})</span>
        </span>
        <LogsToggle isOpen={isOpen}><ChevronDown size={18} color="#666" /></LogsToggle>
      </LogsHeader>
      <LogsContent isOpen={isOpen}>
        {logEntries.length === 0 ? (
          <NoLogsMessage>No activity recorded yet</NoLogsMessage>
        ) : (
          <LogsGrid>
            {logEntries.map((log, i) => {
              return (
                <LogRow key={i}>
                  <LogDate><Calendar size={14} />{log.section}</LogDate>
                 {!retainer && <LogTime><Clock size={14} />{log.check_in?.time || "Not Check in"} - {log.check_out?.time || 'Not Check Out'}</LogTime>}
                  <LogStats>
                    {/* <LogBadge><Timer size={12} />Effort : {log.effort}h</LogBadge> */}
                    <LogBadge><Package size={12} />No of item audit: {log.no_of_items}</LogBadge>
                    {retainer && 
                    <LogBadge><FaUsers size={12} />No of resources: {log?.effort}</LogBadge>}
                  </LogStats>
                  {log.remarks && (
                    <LogRemark><FileText size={14} />{log.remarks || "No Remarks found"}</LogRemark>
                  )}
                </LogRow>
              )
            })}
          </LogsGrid>
        )}
      </LogsContent>
    </LogsSection>
  );
};
const StatusMessage = ({ children }) => (
  <div style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
    <CheckCircle2 size={24} />
    {children}
  </div>
);

export const TodayActionButtons = ({
  activity,
  todayCheckedIn,
  todayCheckedOut,
  isActivityStart,
  hasPendingCheckout,
  pendingCheckoutDate,
  complete,
  onAction,
  todayISO,
  getTodayApiDateStr, isManager,
  retainerPage=false,
  retainer,
  onRetainerUpdate
}) => {
  const todayApiDate = getTodayApiDateStr();
  const plannedEnd = activity.planned_end_date || activity.original_P?.planned_end_date;
  const isPlannedEndToday = plannedEnd === todayISO;

  const todayLogs = Object.entries(activity.day_logs || {})
    .filter(([key]) => key.startsWith(todayApiDate))
    .map(([, log]) => log);

    const hasOngoingSessionToday = todayLogs.some(
    (log) => log.check_in && !log.check_out
  );

  // for Retainer flow
  if (retainer) {
    if(isManager){
      return(
        <> </>
      );
    }
    if(complete){
      return(
        <StatusMessage>Activity is completed for today</StatusMessage>
      );
    }

    const { ui } = activity;
    if (ui?.showCompleteBtn) {
      return (
        <SuccessBtn
          size="md"
          onClick={() => onAction({ type: "complete", activity, retainerPage, retainer, onRetainerUpdate })}
        >
          <CheckCircle2 /> Complete
        </SuccessBtn>
      );
    }

    if(ui?.showStartBtn){
      return (
        <PrimaryBtn
          size="md"
          onClick={() => onAction({ type: "start", activity, retainerPage, retainer, onRetainerUpdate })}
        >
          <PlayCircle /> Start Activity
        </PrimaryBtn>
      );
    }

    return <></>;
  }

    // 1. Fully complete
  if (complete) {
    return <StatusMessage>Activity is completed</StatusMessage>;
  }

  // 2. Completed for today
  // if (todayCheckedIn && todayCheckedOut ) {
  //   return <StatusMessage>Activity is completed for today</StatusMessage>;
  // }

  // 3. Pending checkout from yesterday
  if (hasPendingCheckout && pendingCheckoutDate !== todayApiDate) {
    return (
      <PrimaryBtn size="md" onClick={() => onAction({ type: "checkout_yesterday", activity, retainerPage, retainer, onRetainerUpdate })}>
        <CheckCircle2 /> Checkout For Yesterday
      </PrimaryBtn>
    );
  }

  // 4. Checked in today → Show Complete / Pause Activity
  if (hasOngoingSessionToday) {
    return isPlannedEndToday ? (
      <>
        <SuccessBtn size="lg" onClick={() => onAction({ type: "complete", activity, retainerPage, retainer, onRetainerUpdate })}>
          <CheckCircle2 /> Completed
        </SuccessBtn>
        <SecondaryBtn size="sm" onClick={() => onAction({ type: "continue", activity, retainerPage, retainer, onRetainerUpdate })}>
          <PauseCircle /> Pause Activity
        </SecondaryBtn>
      </>
    ) : (
      <>
        <SuccessBtn size="sm" onClick={() => onAction({ type: "continue", activity, retainerPage, retainer, onRetainerUpdate })}>
          <PauseCircle /> Pause Activity
        </SuccessBtn>
        <SecondaryBtn size="lg" onClick={() => onAction({ type: "complete", activity, retainerPage, retainer, onRetainerUpdate })}>
          <CheckCircle2 /> Completed
        </SecondaryBtn>
      </>
    );
  }

  // 5. Not checked in today
  if (!todayCheckedIn) {
    if (isActivityStart) {
      return (
        <PrimaryBtn size="md" onClick={() => onAction({ type: "resume", activity , retainerPage, retainer, onRetainerUpdate })}>
          <PlayCircle /> Resume Activity
        </PrimaryBtn>
      );
    }
    return (
      <PrimaryBtn size="md" onClick={() => onAction({ type: "start", activity, retainerPage, retainer })}>
        <PlayCircle /> Start Activity
      </PrimaryBtn>
    );
  }

  // 6. Fallback: Awaiting start (future scheduled)
  return (
    // <SecondaryBtn size="md" disabled>
    //   <Clock /> Awaiting Start
    // </SecondaryBtn>
    <PrimaryBtn size="md" onClick={() => onAction({ type: "resume", activity, retainerPage, retainer, onRetainerUpdate })}>
      <PlayCircle /> Resume Activity
    </PrimaryBtn>
  );
};