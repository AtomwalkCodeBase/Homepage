import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components';
import { FaWarehouse, FaRegCheckCircle } from 'react-icons/fa';
import { theme } from '../../styles/Theme';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Card from '../../components/Card';
import { getStatusVariant } from '../ProjectManagement/utils/utils';
import { getActivitiQcData, getActivityList, postActivtyInventory } from '../../services/productServices';
import Modal from '../../components/modals/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmPopup from '../../components/modals/ConfirmPopup';

const Container = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
  min-height: 100vh;
  font-family: ${theme.fonts.body};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${theme.spacing.md};
  }
`;

const CardContainer = styled.div`
  background: ${theme.colors.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
  overflow: hidden;
  transition: box-shadow ${theme.transitions.normal};

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;
const AnimatedCardContainer = styled(Card)`
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

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const ProjectCodeRowHeader = styled.div`
  display: flex;
  align-items: center;
    justify-content: space-between;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing?.md || "12px 15px"};
        color: ${({ theme }) => theme.colors.textLight};
      font-weight: 600;
      margin-bottom: ${theme.spacing.sm};

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.xs};
  }
`;

const ProjectCodeRow = styled.div`
  display: flex;
  align-items: center;
    justify-content: space-between;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.xs};
  }
`;

const ProjectCode = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: ${theme.fontSizes.xs};
  }
`;

const ActivityTitle = styled.h2`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text};
  margin: ${theme.spacing.xs} 0 0 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
  }

  @media (max-width: 480px) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSizes.sm};

  @media (max-width: 480px) {
    font-size: ${theme.fontSizes.xs};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
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

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`

const LmsActivityList = () => {
  const location = useLocation();
  const activityList = location.state?.activityList || [];
  const urlParams = new URLSearchParams(window.location.search);
  const project_code = urlParams.get("project_code");
  const Navigate = useNavigate();
  const [filterValue, setFilterValue] = useState({
    project_code: project_code ? project_code : "", status: "", searchTerm: ""
  });
  
  
  const [qcData, setQcData] = useState([]);
  const [activities, setActivities] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  // console.log("activityList", filterValue)

    const filteredData = useMemo(() => {
      return activities.filter(item => {
        const matchesStatus =
      !filterValue.status ||
      (filterValue.status === "OVER_DUE"
        ? item.is_over_due === true
        : item.activity_status?.toString() === filterValue.status);

            console.log(filterValue.status)
  
        const matchesProject =
          !filterValue.project_code ||
          item.ref_num === filterValue.project_code;
  
        const matchesSearch =
          !filterValue.searchTerm ||
          item.customer?.name?.toLowerCase().includes(filterValue.searchTerm.toLowerCase());
  
        return matchesStatus && matchesProject && matchesSearch;
      });
    }, [activities, filterValue]);

    const getUniqueValues = (data, key) => {
    if (!Array.isArray(data)) return [];
    return [...new Set(data.map(item => item[key]).filter(Boolean))];
  };

  //   const PROJECT_STATUS = {
  //   START: "01",
  //   IN_PROGRESS: "02",
  //   COMPLETED: "03",
  // };

    const getStatusDisplay = (statusNum,) => {
    switch (statusNum) {
      case "02":
        return {
          status_display: "IN PROGRESS",
          variant: "info" // or "primary", "warning" - choose appropriate variant
        };
      case "01":
        return {
          status_display: "PLANNED",
          variant: "warning" // or "info", "default"
        };
      case "03":
        return {
          status_display: "COMPLETED",
          variant: "success"
        };
      default:
        return {
          status_display: "Default",
          variant: "default"
        };
    }
  }

    const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValue(prev => ({
      ...prev,
      [name]: value
    }));
  };

    useEffect(() => {
      fetchActivityDetails();
    }, [])

    const fetchActivityDetails = async () => {
      try {
        const res = await getActivityList();
        let fetchedActivities = res?.data?.a_list || [];
        // console.log(JSON.stringify(res.data))
        setActivities(fetchedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };


const handleOpenModal = (activity) => {
  setSelectedActivity(activity);
  fetchQcData(activity.activity_id);
};

  const fetchQcData = async (activity_id) => {
    try {
      const payload = {
      activity_id,
      call_mode: "QC_DATA",
    };
      const res = await getActivitiQcData(payload);
       if (res.data?.length > 0) {
    setQcData(res.data);
    setIsModalOpen(true);   // OPEN HERE
  } else {
    setShowConfirm(true);
  }

      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching QC data:', error);
    }
  };

    const handleMarkAsCompleted = async () => {
        if (!selectedActivity) return;

    const payload = {
    activity_id: selectedActivity.activity_id,
    call_mode: "MARK_COMPLETE",
  };

    try {
      const res = await postActivtyInventory(payload);
       toast.success("Activity completed successfully");
       fetchActivityDetails();
    } catch (error) {
      toast.error(`Failed to update Activity. ${error.response?.data?.message || 'Please try again later.'}`)
    }
  };

  return (
    
    <Layout title={`Activity List of ${project_code}`}>
 {/* <Container> */}
      <Card hoverable={false}>
         <FilterContainer>
          <FilterSelect
            name="project_code"
            value={filterValue.project_code}
            onChange={handleFilterChange}
          >
            <option value="">All Project</option>
            {getUniqueValues(activities, "ref_num").map((code, index) => (
              <option key={index} value={code}>{code}</option>
            ))}
          </FilterSelect>

          <FilterSelect
            name="status"
            value={filterValue.status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="02">IN PROGRESS</option>
            <option value="OVER_DUE">OVER-DUE</option>
            <option value="01">PLANNED</option>
            <option value="03">COMPLETED</option>
          </FilterSelect>
          {/* <Button variant="outline" size="sm" onClick={handleFilter}>
                <FaFilter /> Filter
              </Button> */}
        </FilterContainer>
        {filteredData.map((activity) => {
          const statusInfo = getStatusDisplay(activity.activity_status, activity.is_over_due);
          return(
          <AnimatedCardContainer key={activity.activity_id}>
            <CardHeader>
              <LeftSection>
                <ProjectCodeRowHeader>
                  <ActivityTitle>Activity name</ActivityTitle>
                  <ActivityTitle>Is Activity Over Due</ActivityTitle>
                  <ActivityTitle>Status</ActivityTitle>
                </ProjectCodeRowHeader>
                <ProjectCodeRow>
                <ActivityTitle>{activity.activity_name}</ActivityTitle>
                 
                  {activity.is_over_due ? <Badge variant='error'>Yes</Badge> : <Badge variant='success'>No</Badge>}
                  <Badge variant={statusInfo.variant}>
                    {statusInfo.status_display}
                  </Badge>
                  {/* <Badge variant={statusInfo.variant}>
                    {statusInfo.status_display}
                  </Badge> */}
                </ProjectCodeRow>
                 <ProjectCode>
                    {activity.ref_num}
                    {/* <strong>({filteredData.title})</strong> */}
                  </ProjectCode>
              </LeftSection>

            </CardHeader>

            <CardBody>
              <InfoRow>
                <span>Planned Due Date -</span>
                <strong>{activity.due_date || "not found"}</strong>
              </InfoRow>

                <ButtonGroup>
                <Button variant='ghost' onClick={() => Navigate(`/InventoryUpdate`, {state: {id: activity.activity_id , call_type: "INV_IN"}} )}>
                  <FaWarehouse />
                  <span>Inventory Update</span>
                </Button>

                {( activity.inventory_activity === "P") && 
                <Button variant='outline' onClick={() => Navigate(`/equipmentBooking/?id=${activityList.title}_${activityList.project_code}`)}>
                  <FaWarehouse />
                  <span>Inventory Procurement</span>
                </Button>}
                
                {/* <Button 
                  onClick={() => handleActivity(activity.id)}
                  bg={theme.colors.warning}
                >
                  <FaList />
                  <span>Activity Reading [0]</span>
                </Button> */}
                
                {/* {activity.activity_status === "04" && */}
               {activity.activity_status !== "03" &&  <SuccessBtn onClick={() => handleOpenModal(activity)}>
                  <FaRegCheckCircle />
                  <span>Mark as Complete</span>
                </SuccessBtn>}
              </ButtonGroup>
            </CardBody>
          </AnimatedCardContainer>
        )})}
      </Card>
    {/* </Container> */}

    {isModalOpen && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <h3>QC Details</h3>

    {qcData.map((qc, index) => (
      <div key={index}>
        <strong>{qc.qc_name}</strong>
        <p>Permissible Value: {qc.qc_value}</p>
      </div>
    ))}

    <Button onClick={handleMarkAsCompleted}>
      Mark as Completed
    </Button>
  </Modal>
)}
{showConfirm && (
  <ConfirmPopup
    isOpen={showConfirm}
    onClose={() => setShowConfirm(false)}
    onConfirm={handleMarkAsCompleted}
    title="Complete Activity"
    message="Are you sure you want to complete this activity?"
    confirmLabel="Yes"
  />
)}


    </Layout>
  )
}

export default LmsActivityList;