import styled from 'styled-components';
import { FaUsers, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeContext';
import Card from '../../Card';
import { formatDate, getCurrentDateTimeDefaults, getTodayApiDateStr, } from '../../../pages/ProjectManagement/utils/utils';
import { ActivityLogs, TodayActionButtons } from '../../../pages/ProjectManagement/ActivityCard';
import { useAuth } from '../../../context/AuthContext';
import { useMemo, useState } from 'react';

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const EmployeeId = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const StatusBadge = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'active': return `${theme.colors.success}20`;
      case 'pending': return `${theme.colors.warning}20`;
      case 'completed': return `${theme.colors.info}20`;
      case 'cancelled': return `${theme.colors.error}20`;
      default: return theme.colors.backgroundAlt;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'active': return theme.colors.success;
      case 'pending': return theme.colors.warning;
      case 'completed': return theme.colors.info;
      case 'cancelled': return theme.colors.error;
      default: return theme.colors.textLight;
    }
  }};
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ color, theme }) => color ? `${theme.colors[color]}20` : theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color, theme }) => color ? theme.colors[color] : theme.colors.text};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 32px;
    height: 32px;
  }
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2px;
`;

const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

// const AdditionalInfo = styled.div`
//   background: ${({ theme }) => theme.colors.backgroundAlt};
//   border-radius: ${({ theme }) => theme.borderRadius.md};
//   padding: ${({ theme }) => theme.spacing.md};
//   margin-bottom: ${({ theme }) => theme.spacing.lg};
// `;

// const AdditionalInfoTitle = styled.h4`
//   margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
//   font-size: ${({ theme }) => theme.fontSizes.sm};
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.text};
// `;

// const AdditionalGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//   gap: ${({ theme }) => theme.spacing.sm};

//   @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
//     grid-template-columns: 1fr;
//   }
// `;

// const AdditionalItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: ${({ theme }) => theme.spacing.xs} 0;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.border};

//   &:last-child {
//     border-bottom: none;
//   }
// `;

// const AdditionalLabel = styled.span`
//   font-size: ${({ theme }) => theme.fontSizes.sm};
//   color: ${({ theme }) => theme.colors.textLight};
// `;

// const AdditionalValue = styled.span`
//   font-size: ${({ theme }) => theme.fontSizes.sm};
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.text};
// `;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;


const RetainerCard = ({ retainer, onAction, retainerCache, onRetainerUpdate }) => {
   const { profile } = useAuth()
  const { theme } = useTheme();
  const { todayISO } = getCurrentDateTimeDefaults();
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  const employeeData = retainerCache?.[retainer.emp_id];

// const allocation = useMemo(() => {
//   return employeeData?.allocations?.find(a => a.p_id === retainer.a_id);
// }, [employeeData, retainer.a_id]);

  const allocation = useMemo(() => {
    return employeeData?.allocations?.find(
      a => a.p_id === retainer.a_id
    );
  }, [employeeData, retainer.a_id]);

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // const allocation = retainer?.parentActivity;

  const isActivityStart = !!allocation?.original_A;

  const todayApiDate = getTodayApiDateStr();
  const todayLog = allocation?.day_logs?.[todayApiDate] || {};

  const todayCheckedIn = !!todayLog.check_in;
  const todayCheckedOut = !!todayLog.check_out;
  console.log("retainer", retainer)
  console.log("retainerData", allocation)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        {!allocation ? (
          <Card style={{ margin: "1rem", padding: theme.spacing.lg }}>
            <div style={{ textAlign: 'center', color: theme.colors.textLight }}>
              Loading...
            </div>
          </Card>
        ) : (
          <Card style={{ margin: "1rem" }}>
            <CardHeader theme={theme}>
              <EmployeeInfo theme={theme}>
                <Avatar theme={theme}>
                  {getInitials(retainer?.employee_name)}
                </Avatar>
                <NameContainer>
                  <EmployeeName theme={theme}>
                    {retainer?.employee_name || 'Unknown Employee'}
                  </EmployeeName>
                  <EmployeeId theme={theme}>
                    Employee ID: {retainer?.emp_id || 'N/A'}
                  </EmployeeId>
                </NameContainer>
              </EmployeeInfo>
              <StatusBadge status={allocation?.original_P?.project_period_status} >{allocation?.original_P?.project_period_status} </StatusBadge>
            </CardHeader>

            <DetailsGrid theme={theme}>
              <DetailItem>
                <IconWrapper color="primary" theme={theme}>
                  <FaUsers />
                </IconWrapper>
                <DetailContent>
                  <DetailLabel theme={theme}>Resources</DetailLabel>
                  <DetailValue theme={theme}>
                    {retainer?.no_resource || 0} {retainer?.no_resource === 1 ? 'person' : 'people'}
                  </DetailValue>
                </DetailContent>
              </DetailItem>

              <DetailItem>
                <IconWrapper color="success" theme={theme}>
                  <FaCalendarAlt />
                </IconWrapper>
                <DetailContent>
                  <DetailLabel theme={theme}>Start Date</DetailLabel>
                  <DetailValue theme={theme}>
                    {formatDate(retainer?.start_date)}
                  </DetailValue>
                </DetailContent>
              </DetailItem>

              <DetailItem>
                <IconWrapper color="error" theme={theme}>
                  <FaCalendarAlt />
                </IconWrapper>
                <DetailContent>
                  <DetailLabel theme={theme}>End Date</DetailLabel>
                  <DetailValue theme={theme}>
                    {formatDate(retainer?.end_date)}
                  </DetailValue>
                </DetailContent>
              </DetailItem>

                  <DetailItem>
                    <IconWrapper color="accent" theme={theme}>
                      <FaClipboardList />
                    </IconWrapper>
                    <DetailContent>
                      <DetailLabel theme={theme}>Audit Items</DetailLabel>
                      <DetailValue theme={theme}>
                        {retainer?.no_of_items || 0} items
                      </DetailValue>
                    </DetailContent>
                  </DetailItem>
                </DetailsGrid>

                {/* {Object.keys(defaultAdditionalInfo).length > 0 && (
                  <AdditionalInfo theme={theme}>
                    <AdditionalInfoTitle theme={theme}>
                      Additional Information
                    </AdditionalInfoTitle>
                    <AdditionalGrid theme={theme}>
                      {Object.entries(defaultAdditionalInfo).map(([key, value]) => (
                        <AdditionalItem key={key} theme={theme}>
                          <AdditionalLabel theme={theme}>{key}</AdditionalLabel>
                          <AdditionalValue theme={theme}>{value}</AdditionalValue>
                        </AdditionalItem>
                      ))}
                    </AdditionalGrid>
                  </AdditionalInfo>
                )} */}
                <ActivityLogs retainer={retainer} logs={allocation?.day_logs} isOpen={isLogsOpen} onToggle={() => setIsLogsOpen(!isLogsOpen)} />

          {!retainer?.parentActivity?.complete && retainer?.parentActivity?.todaysStatus === "Active" &&
            <ActionsContainer theme={theme}>
              {allocation && (
                <TodayActionButtons
                  activity={allocation}
                  todayCheckedIn={todayCheckedIn}
                  todayCheckedOut={todayCheckedOut}
                  isActivityStart={isActivityStart}
                  hasPendingCheckout={allocation.hasPendingCheckout}
                  pendingCheckoutDate={allocation.pendingCheckoutDate}
                  complete={allocation.complete}
                  onAction={onAction}
                  todayISO={todayISO}
                  getTodayApiDateStr={getTodayApiDateStr}
                  retainerPage={true}
                  retainer={retainer}
                  onRetainerUpdate={onRetainerUpdate}
                  isManager={profile?.is_manager}
                />
              )}
            </ActionsContainer>
            } 
          </Card>
        )}
      </div>
    </>
    // <h1>hello</h1>
  );
};

export default RetainerCard;