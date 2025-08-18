import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaUserNurse,
  FaChevronDown,
  FaSpinner,
  FaCalendar,
  FaClock,
  FaUser
} from 'react-icons/fa';
import { 
  getActivityListView
} from '../services/productServices';
import { toast } from 'react-toastify';
import Button from './Button';

const CONTROL_HEIGHT = '42px';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ActivityCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ActivityName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const StatusBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  background: ${({ $status, theme }) => {
    if ($status === 'ALLOCATED') return theme.colors.success;
    if ($status === 'NOT ALLOCATED') return theme.colors.warning;
    return theme.colors.error;
  }};
  color: #fff;
`;

const ActivityDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const NurseAssignmentSection = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const AssignmentTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-right: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  appearance: none;
  width: 100%;
  height: ${CONTROL_HEIGHT};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textLight};
  transition: ${({ theme }) => theme.transitions.fast};
  
  ${Select}:focus + & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;

  & > .left,
  & > .right {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.md};
    & > * {
      width: 100%;
      justify-content: stretch;
    }
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
`;

 

const NurseAllocation = ({ onNext, onBack, readOnly = false, projectCode, patientData }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [nurses, setNurses] = useState([
    { id: 1, name: 'Nurse Sarah Johnson' },
    { id: 2, name: 'Nurse Michael Chen' },
    { id: 3, name: 'Nurse Emily Rodriguez' },
    { id: 4, name: 'Nurse David Thompson' },
    { id: 5, name: 'Nurse Lisa Wang' }
  ]);

  

  // Fetch activities using project_code
  useEffect(() => {
    const fetchActivities = async () => {
      if (!projectCode) {
        toast.error('Project code not found. Please complete patient details first.');
        return;
      }

      setActivitiesLoading(true);
      try {
        const response = await getActivityListView(projectCode);
        if (response && response.data) {
          setActivities(response.data);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        toast.error('Failed to fetch activities');
      } finally {
        setActivitiesLoading(false);
      }
    };

    fetchActivities();
  }, [projectCode]);

  const handleNurseAssignment = (activityIndex, nurseId) => {
    if (readOnly) return;
    setActivities(prev => {
      const updated = [...prev];
      const selectedNurse = nurses.find(nurse => nurse.id === parseInt(nurseId));
      
      updated[activityIndex] = {
        ...updated[activityIndex],
        user_name: selectedNurse ? selectedNurse.name : null,
        activity_status: selectedNurse ? '10' : '09', // 10 for allocated, 09 for not allocated
        status_display: selectedNurse ? 'ALLOCATED' : 'NOT ALLOCATED'
      };
      
      return updated;
    });
  };

  const handleSaveAssignments = async () => {
    const allocatedActivities = activities.filter(activity => activity.user_name);
    
    if (allocatedActivities.length === 0) {
      toast.warning('Please assign at least one nurse to an activity.');
      return;
    }

    try {
      setLoading(true);
      
      // Here you would typically call an API to save the assignments
      // For now, we'll simulate the save operation
      console.log('Saving nurse assignments:', activities);
      
      toast.success('Nurse assignments saved successfully!');
      
      // Move to next step
      onNext({
        activities: activities,
        projectCode: projectCode,
        patientData: patientData
      });
      
    } catch (error) {
      console.error('Error saving nurse assignments:', error);
      toast.error('Failed to save nurse assignments');
    } finally {
      setLoading(false);
    }
  };

  if (activitiesLoading) {
    return (
      <FormContainer>
        <SectionTitle>Nurse Allocation</SectionTitle>
        <LoadingContainer>
          <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '1rem' }} />
          <p>Loading activities...</p>
        </LoadingContainer>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <SectionTitle>Nurse Allocation</SectionTitle>
      
      {!projectCode && (
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          borderRadius: '8px', 
          padding: '12px', 
          marginBottom: '20px',
          color: '#856404'
        }}>
          <strong>⚠️ Warning:</strong> No project code found. Please complete patient details first.
        </div>
      )}
      
      {activities.length === 0 && !activitiesLoading && (
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '8px', 
          padding: '20px', 
          textAlign: 'center',
          color: '#6c757d'
        }}>
          <FaUserNurse style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <p>No activities found for this project.</p>
        </div>
      )}

      {activities.map((activity, index) => (
        <ActivityCard key={index}>
          <ActivityHeader>
            <ActivityName>{activity.activity_name}</ActivityName>
            <StatusBadge $status={activity.status_display}>
              {activity.status_display}
            </StatusBadge>
          </ActivityHeader>
          
          <ActivityDetails>
            <DetailItem>
              <FaCalendar />
              <DetailLabel>Start Date:</DetailLabel>
              <span>{activity.start_date}</span>
            </DetailItem>
            
            <DetailItem>
              <FaClock />
              <DetailLabel>Duration:</DetailLabel>
              <span>{activity.duration} day{activity.duration > 1 ? 's' : ''}</span>
            </DetailItem>
            
            <DetailItem>
              <FaUser />
              <DetailLabel>Assigned Nurse:</DetailLabel>
              <span>{activity.user_name || 'Not assigned'}</span>
            </DetailItem>
          </ActivityDetails>

          <NurseAssignmentSection>
            <AssignmentTitle>
              <FaUserNurse />
              Assign Nurse
            </AssignmentTitle>
            
            <SelectWrapper>
              <Select
                value={nurses.find(nurse => nurse.name === activity.user_name)?.id || ''}
                onChange={(e) => handleNurseAssignment(index, e.target.value)}
                disabled={readOnly}
              >
                <option value="">Select a nurse</option>
                {nurses.map((nurse) => (
                  <option key={nurse.id} value={nurse.id}>
                    {nurse.name}
                  </option>
                ))}
              </Select>
              <SelectIcon>
                <FaChevronDown />
              </SelectIcon>
            </SelectWrapper>
          </NurseAssignmentSection>
        </ActivityCard>
      ))}

      <ActionButtons>
        <div className="left">
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
          >
            Back
          </Button>
        </div>
        <div className="right">
          {!readOnly && (
            <Button
              type="button"
              variant="primary"
              onClick={handleSaveAssignments}
              disabled={loading || activities.length === 0}
            >
              {loading ? <FaSpinner /> : <FaUserNurse />}
              {loading ? 'Saving...' : 'Save Assignments & Continue'}
            </Button>
          )}
        </div>
      </ActionButtons>
    </FormContainer>
  );
};

export default NurseAllocation;