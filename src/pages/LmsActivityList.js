import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout'
import styled from 'styled-components';
import { FaEdit, FaWarehouse, FaList, FaRegCheckCircle } from 'react-icons/fa';
import { theme } from '../styles/Theme';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { getStatusVariant } from './ProjectManagement/utils/utils';
import { getActivitiQcData, getActivityList } from '../services/productServices';
import Modal from '../components/modals/Modal';

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

// const Button = styled.button`
//   display: inline-flex;
//   align-items: center;
//   gap: ${theme.spacing.sm};
//   padding: ${theme.spacing.sm} ${theme.spacing.lg};
//   border: none;
//   border-radius: ${theme.borderRadius.sm};
//   background: ${props => props.bg || theme.colors.textLight};
//   color: white;
//   font-family: ${theme.fonts.body};
//   font-size: ${theme.fontSizes.sm};
//   font-weight: 600;
//   cursor: pointer;
//   transition: all ${theme.transitions.fast};
//   white-space: nowrap;

//   &:hover {
//     opacity: 0.9;
//     transform: translateY(-1px);
//     box-shadow: ${theme.shadows.sm};
//   }

//   &:active {
//     transform: translateY(0);
//   }

//   svg {
//     font-size: ${theme.fontSizes.md};
//   }

//   @media (max-width: 768px) {
//     padding: ${theme.spacing.sm} ${theme.spacing.md};
//     font-size: ${theme.fontSizes.xs};
    
//     svg {
//       font-size: ${theme.fontSizes.sm};
//     }
//   }

//   @media (max-width: 576px) {
//     width: 100%;
//     justify-content: center;
//   }
// `;


const LmsActivityList = () => {
  // const location = useLocation();
  // const activityList = location.state?.activityList || [];
  const urlParams = new URLSearchParams(window.location.search);
  const project_code = urlParams.get("project_code");

    const [qcData, setQcData] = useState([]);
      const [activities, setActivities] = useState([]);

    const [selectedActivity, setSelectedActivity] = useState([]);
      const [filterValue, setFilterValue] = useState({
        project_code: project_code ? project_code : "", status: "", searchTerm: ""
      });


  const [isModalOpen, setIsModalOpen] = useState(false)
  // console.log("activityList", activityList)

    const filteredData = useMemo(() => {
      return activities.filter(item => {
        const matchesStatus =
          !filterValue.status ||
          item.project_status?.toString() === filterValue.status;
  
        const matchesProject =
          !filterValue.project_code ||
          item.ref_num === filterValue.project_code;
  
        const matchesSearch =
          !filterValue.searchTerm ||
          item.customer?.name?.toLowerCase().includes(filterValue.searchTerm.toLowerCase());
  
        return matchesStatus && matchesProject && matchesSearch;
      });
    }, [activities, filterValue]);

  const handleInventory = (id) => console.log("Inventory Procurement clicked", id);
  const handleActivity = (id) => console.log("Activity Reading clicked", id);
  const handleUpdate = (id) => console.log("Update clicked", id);

    const getUniqueValues = (data, key) => {
    if (!Array.isArray(data)) return [];
    return [...new Set(data.map(item => item[key]).filter(Boolean))];
  };

    const getStatusDisplay = (statusNum) => {
    switch (statusNum) {
      case "01":
        return {
          status_display: "IN PROGRESS",
          variant: "info" // or "primary", "warning" - choose appropriate variant
        };
      case "02":
        return {
          status_display: "OVER-DUE",
          variant: "error" // or "error", "warning"
        };
      case "03":
        return {
          status_display: "PLANNED",
          variant: "secondary" // or "info", "default"
        };
      case "04":
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


  const handleOpenModal =(activity) => {
    selectedActivity(activity)
    const data = {
    activity_id: activity.id,
    call_mode: 'QC_DATA',
  };
  fetchQcData(data);
  handleMarkAsCompleted(data.activity_id)
  setIsModalOpen(true);
}

  const fetchQcData = async (data) => {
    try {
      const response = await getActivitiQcData(data);
      setQcData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching QC data:', error);
    }
  };

    const handleMarkAsCompleted = async (activity_id) => {

    const payload = {
      activity_id: activity_id,
      call_mode: 'MARK_COMPLETE',
    };

    // try {
    //   const res = await postActivtyInventory(payload);
    //   Alert.alert('Success', `Activity Completed Successfully`);
    //   handleBackPress();
    // } catch (error) {
    //   Alert.alert(
    //     'Error',
    //     `Failed to update Activity. ${error.response?.data?.message || 'Please try again later.'}`
    //   );
    // }
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
            <option value="01">IN PROGRESS</option>
            <option value="02">OVER-DUE</option>
            <option value="03">PLANNED</option>
            <option value="04">COMPLETED</option>
          </FilterSelect>
          {/* <Button variant="outline" size="sm" onClick={handleFilter}>
                <FaFilter /> Filter
              </Button> */}
        </FilterContainer>
        {filteredData.map((activity) => {
          const statusInfo = getStatusDisplay(activity.activity_status);
          return(
          <Card key={activity.id}>
            <CardHeader>
              <LeftSection>
                <ProjectCodeRow>
                  <ProjectCode>
                    {activity.ref_num}
                    {/* <strong>({filteredData.title})</strong> */}
                  </ProjectCode>
                  <Badge variant={getStatusVariant(activity.status)}>
                    {activity.status}
                  </Badge>
                  {/* <Badge variant={statusInfo.variant}>
                    {statusInfo.status_display}
                  </Badge> */}
                </ProjectCodeRow>
                <ActivityTitle>{activity.activity_name}</ActivityTitle>
              </LeftSection>

            </CardHeader>

            <CardBody>
              <InfoRow>
                <span>Planned Due Date -</span>
                <strong>{activity.due_date || "not found"}</strong>
              </InfoRow>

                <ButtonGroup>
                <Button variant='ghost' onClick={() => handleInventory(activity.id)}>
                  <FaWarehouse />
                  <span>Inventory Update</span>
                </Button>
                
                {/* <Button 
                  onClick={() => handleActivity(activity.id)}
                  bg={theme.colors.warning}
                >
                  <FaList />
                  <span>Activity Reading [0]</span>
                </Button> */}
                
                {/* {activity.activity_status === "04" && */}
                <SuccessBtn onClick={() => handleOpenModal(activity)}>
                  <FaRegCheckCircle />
                  <span>Mark as Complete</span>
                </SuccessBtn>
              </ButtonGroup>
            </CardBody>
          </Card>
        )})}
      </Card>
    {/* </Container> */}

    {isModalOpen && <>
    {qcData ? <></> : <Modal></Modal>}
    
    
    </>}

    </Layout>
  )
}

export default LmsActivityList;