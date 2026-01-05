import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import { getBookingListView, getEquipmentListView } from '../../services/productServices'
import Card from '../../components/Card';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { FaCalendarAlt, FaCalendarCheck, FaClock, FaTools, FaUsers } from 'react-icons/fa';
import AppointmentDateTimeModal from '../../components/modals/AppointmentDateTimeModal';

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
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.text};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  svg {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.8;
    margin: 0;
  }
`
const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const EquipmentCard = styled.div`
  background: ${({ selected, theme }) =>
    selected 
      ? `linear-gradient(135deg, ${theme.colors.primaryLight} 0%, ${theme.colors.accentLight} 100%)` 
      : 'rgba(255, 255, 255, 0.95)'
  };
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 25px;
  border: 1px solid ${({ selected, theme }) => (selected ? theme.colors.primary : 'rgba(255, 255, 255, 0.3)')};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ selected, theme }) =>
      selected 
        ? `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` 
        : `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accentLight})`
    };
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`

const EquipmentImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  border: 3px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const EquipmentInfo = styled.div`
  flex: 1;
`

const EquipmentName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: ${({ theme }) => theme.colors.text};
`

const EquipmentSpecialty = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    margin-right: 8px;
  }
`

const EquipmentDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin: 15px 0;
`

const EquipmentDetail = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  svg {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1rem;
  }
`
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

const LabEquimentBookingScreen = () => {
    const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
 const project_title = id ? id.split("_")[0] : ""

 const [equipmentArray, setEquipmentArray] = useState([]);
 const [bookingArray, setBookingArray] = useState([]);
 const [mergedData, setMergedData] = useState([]);
 const [loading, setLoading] = useState(false)
 const { theme } = useTheme()
 const [filterValue, setFilterValue] = useState({
     project_title , status: "", searchTerm: ""
    });
    const [activeTab, setActiveTab] = useState("equipment")

    const [selectedEquipment,setSelectedEquipment] = useState(null)
    const [showEquipmentModal,setShowEquipmentModal] = useState(false)


    
    // console.log(filterValue.project_title)

    useEffect(() => {
        fetchEquipmentList();
        fetchBookingList()
    },[])

      useEffect(() => {
    // Function to merge the arrays based on name and eq_name match
    const mergeEquipmentData = () => {
      // Group bookings by eq_name
      const bookingsByEquipment = bookingArray.reduce((acc, booking) => {
        const eqName = booking.eq_name;
        if (!acc[eqName]) {
          acc[eqName] = [];
        }
        acc[eqName].push(booking);
        return acc;
      }, {});

      // Merge equipment data with matching bookings
      const merged = equipmentArray.map(equipment => {
        const matchingBookings = bookingsByEquipment[equipment.name] || [];
        
        return {
          ...equipment,
          bookings: matchingBookings // Array of all matching bookings
        };
      });

      setMergedData(merged);
    };

    mergeEquipmentData();
  }, [equipmentArray, bookingArray]);

      const fetchEquipmentList = async () => {
        try {
          const res = await getEquipmentListView();
          let fetchedActivities = res?.data || [];
          // console.log(JSON.stringify(res.data))
          setEquipmentArray(fetchedActivities);
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
      };

      const fetchBookingList = async () => {
        try {
          const res = await getBookingListView();
          let fetchedActivities = res?.data || [];
          // console.log(JSON.stringify(res.data))
          setBookingArray(fetchedActivities);
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
      };


const getUniqueProjectTitles = (data = []) => {
  const titles = []

  data.forEach(item => {
    if (Array.isArray(item.bookings)) {
      item.bookings.forEach(b => {
        if (b.project_title) titles.push(b.project_title)
      })
    }
  })

  return [...new Set(titles)]
}

  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValue(prev => ({
      ...prev,
      [name]: value
    }));
  };

        const filteredData = useMemo(() => {

              if (!filterValue.project_title) {
    return mergedData
  }
  
          return mergedData.filter(item => {
            // const matchesStatus =
            //   !filterValue.status ||
            //   item.project_status?.toString() === filterValue.status;
      
            const matchesProject = item.bookings.some(
      booking => booking.project_title === filterValue.project_title
    );
      
            // const matchesSearch =
            //   !filterValue.searchTerm ||
            //   item.customer?.name?.toLowerCase().includes(filterValue.searchTerm.toLowerCase());
      
            return  matchesProject ;
          });
        }, [ mergedData, filterValue.project_title]);

        // console.log("mergedData", JSON.stringify(mergedData[0]))

        const handleEquipmentSelect = (equipment) => {
          setSelectedEquipment(equipment);
          setShowEquipmentModal(true);
        }

  return (
    <Layout title="Book Equipment">
       <Card>
        <TabContainer>
          <Tab active={activeTab === "sample"} onClick={() => setActiveTab("sample")}>
            Sample Booking
          </Tab>
          <Tab active={activeTab === "equipment"} onClick={() => setActiveTab("equipment")}>
            Equipment Booking
          </Tab>
          </TabContainer>

                  <FilterContainer>
          <FilterSelect
            name="project_title"
            value={filterValue.project_title}
            onChange={handleFilterChange}
            >
            <option value="">All Project</option>
            {getUniqueProjectTitles(mergedData).map((code, index) => (
                <option key={index} value={code}>{code}</option>
            ))}
            </FilterSelect>


          {/* <Button variant="outline" size="sm" onClick={handleFilter}>
                <FaFilter /> Filter
              </Button> */}
        </FilterContainer>



         {activeTab === "equipment" && (
  loading ? (
    <LoadingContainer theme={theme}>
      <LoadingSpinner theme={theme} />
      <h3>Loading equipment...</h3>
      <p>Please wait while we fetch the available equipment</p>
    </LoadingContainer>
  ) : filteredData.length > 0 ? (
    <EquipmentGrid>
      {filteredData.map((equipment) => (
        <EquipmentCard
          key={equipment.id}
        //   selected={selectedEquipment?.id === equipment.id}
          onClick={() => handleEquipmentSelect(equipment)}
          theme={theme}
        >
          <EquipmentImage theme={theme}>
            <img
              src={equipment.image || "/placeholder.svg?height=70&width=70"}
              alt={equipment.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg?height=70&width=70";
              }}
            />
          </EquipmentImage>
          <EquipmentInfo>
            <EquipmentName theme={theme}>{equipment.name}</EquipmentName>
            <EquipmentSpecialty theme={theme}>{equipment.equipment_type}</EquipmentSpecialty>
            <EquipmentDetails>
              <EquipmentDetail theme={theme}>
                <FaClock />
                <span>Start: {equipment.start_time}</span>
              </EquipmentDetail>
              <EquipmentDetail theme={theme}>
                <FaCalendarAlt />
                <span>Usage: {equipment.min_usage_period}-{equipment.max_usage_period} {equipment.unit_of_usage}</span>
              </EquipmentDetail>
              <EquipmentDetail theme={theme}>
                <FaUsers />
                <span>Max Users: {equipment.max_users_per_slot}</span>
              </EquipmentDetail>
             {filterValue.project_title && <EquipmentDetail theme={theme}>
                <FaUsers />
                <span>Activity Name: {equipment.bookings.filter((item) => item.project_title === filterValue.project_title).map(b => b.activity_name).join(', ')}</span>
              </EquipmentDetail>}
            </EquipmentDetails>
            {/* Show bookings count if available */}
            {equipment.bookings && equipment.bookings.length > 0 && (
              <EquipmentDetails theme={theme}>
                <FaCalendarCheck />
                <span>{equipment.bookings.length} Booking{equipment.bookings.length !== 1 ? 's' : ''}</span>
              </EquipmentDetails>
            )}
          </EquipmentInfo>
        </EquipmentCard>
      ))}
    </EquipmentGrid>
  ) : (
    <EmptyState theme={theme}>
      <FaTools />
      <h3>No Equipment Available</h3>
      <p>No equipment available for the selected criteria.</p>
    </EmptyState>
  )
)}


       </Card>
       {
         selectedEquipment && showEquipmentModal && 
         <AppointmentDateTimeModal
         isOpen={showEquipmentModal} onClose={() => setShowEquipmentModal(false)} doctor={selectedEquipment} show={true}
         
         /> 
       }
    </Layout>
  )
}

export default LabEquimentBookingScreen