"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import Card from "../components/Card"
import StatsCard from "../components/StatsCard"
import { FaUsers, FaUserMd, FaBed, FaClock, FaArrowRight, FaChevronLeft, FaChevronRight, FaProcedures, FaUserFriends } from "react-icons/fa"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { getbookedlistview } from "../services/productServices"
import { getEmployeeInfo } from "../services/authServices"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 15px;
  }
`

const Section = styled.div`
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 20px;
  }
`

const MainContent = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const LeftContent = styled.div`
  flex: 1;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`

const GraphAndReportRow = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 15px;
  }
`

const ClinicalReportCard = styled(Card)`
  height: 200px;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const GraphTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
`

const GraphCard = styled(Card)`
  height: 200px;
  padding: 20px;
  width: 800px;
  min-width: 400px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  @media (max-width: 1024px) {
    width: 100%;
    max-width: none;
    min-width: 0;
    height: auto;
  }
`

const ClinicalReportHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
`

const ClinicalInnerCard = styled.div`
  background: ${({ color }) => (color === "blue" ? "#E6F0FA" : "#FFE6E6")};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px 18px;
  justify-content: space-between;
  margin-bottom: 4px;
  gap: 8px;
  min-height: 16px;
  font-size: 0.82rem;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
  &:last-child {
    margin-bottom: 4px;
  }
  &:hover {
    background: ${({ color }) => (color === "blue" ? "#D6E4F0" : "#FFD6D6")};
  }
`

const ClinicalIcon = styled.div`
  font-size: 1.6rem;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
`

const ClinicalText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ClinicalLabel = styled.div`
  font-size: 0.86rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`

const ClinicalCount = styled.div`
  font-size: 0.98rem;
  font-weight: 700;
  color: #222;
  margin-top: 0;
  padding-left: 20px;
`

const ClinicalArrow = styled.div`
  font-size: 0.85rem;
  color: #222;
  margin-left: auto;
  margin-right: -1px;
`

const PatientListsGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`

const PatientListCard = styled(Card)`
  padding: 20px;
  flex: 1;
  height: 480px; /* Increased height to display 6 appointments */
  display: flex;
  flex-direction: column;
`

const PatientListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const PatientListTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const PatientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  max-height: 400px; 
  padding-right: 8px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.border};
  }
`

const PatientItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
`

const PatientIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme, color }) => color === "error" ? "#FF4D4F" : color === "secondary" ? "#1890FF" : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`

const PatientInfo = styled.div`
  flex: 1;
`

const PatientName = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

const PatientTime = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const CalendarCard = styled(Card)`
  padding: 20px;
  margin-bottom: 20px;
`

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const CalendarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const CalendarNav = styled.div`
  display: flex;
  gap: 10px;
`

const CalendarNavButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(108, 99, 255, 0.1);
  }
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 20px;
`

const CalendarDay = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  ${({ theme }) => `color: ${theme.colors.text};`}
  ${({ isHeader, theme }) =>
    isHeader &&
    `
    font-weight: 600;
    color: ${theme.colors.text};
    cursor: default;
    `}
  ${({ isToday, theme }) =>
    isToday &&
    `
    background: ${theme.colors.primary};
    color: white;
    font-weight: 600;
    `}
  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background: ${theme.colors.secondary};
    color: white;
    `}
  &:hover {
    ${({ isHeader }) => !isHeader && `background: rgba(108, 99, 255, 0.1);`}
  }
`

const ActivitiesCard = styled(Card)`
  padding: 20px;
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: ${({ highlighted }) => highlighted ? "#FFFBE6" : "#F5F5F5"};
  margin-bottom: 10px;
`

const ActivityTime = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: 15px;
  min-width: 70px;
`

const ActivityDetails = styled.div`
  flex: 1;
`

const ActivityTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

const ActivityDescription = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const AddActivityForm = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const ActivityInput = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  flex: 1;
  min-width: 100px;
`

const AddButton = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const DoctorDashboard = () => {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(today)
  const [activities, setActivities] = useState([])
  const [newActivityTime, setNewActivityTime] = useState("")
  const [newActivityTitle, setNewActivityTitle] = useState("")
  const [newActivityDescription, setNewActivityDescription] = useState("")
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState({
    totalPatients: 33,
    outPatients: 0,
    inPatients: 21,
    surgeries: 8,
  })

  const chartData = {
    labels: ["In-Patients", "Out-Patients", "Surgeries"],
    datasets: [
      {
        label: "Patients Need Immediate Action",
        data: [19, statsData.outPatients, 9],
        backgroundColor: ["#FFD600", "#1890FF", "#FF3D00"],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  const inPatients = [
    { id: 1, name: "2 Patients with Critical Vitals", icon: "vitals", status: "error" },
    { id: 2, name: "3 Unreviewed Critical Labs", icon: "labs", status: "error" },
    { id: 3, name: "1 Discharge Summary Ready", icon: "discharge", status: "success" },
    { id: 4, name: "402 ICU Transfer for Bed", icon: "icu", status: "warning" },
    { id: 5, name: "217 Rapid Deterioration Flag in Bed", icon: "flag", status: "error" },
    { id: 6, name: "1864 - New Admission Initial Review", icon: "admission", status: "info" },
  ]

  const surgeryList = [
    { id: 1, name: "2 Surgeries Scheduled Today", icon: "scheduled", status: "primary" },
    { id: 2, name: "1 Surgery Completed", icon: "completed", status: "success" },
    { id: 3, name: "2 Surgical Clearance Pending", icon: "pending", status: "warning" },
    { id: 4, name: "Consent Not Yet Signed - Scheduled Surgery at 3 PM", icon: "consent", status: "error" },
    { id: 5, name: "Post-Op Note Pending", icon: "postop", status: "info" },
  ]

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get employee profile data first
        const profileResponse = await getEmployeeInfo();
        const employeeName = profileResponse?.data?.[0]?.name;
        
        if (!employeeName) {
          console.error('Could not fetch employee name');
          setLoading(false);
          return;
        }

        const response = await getbookedlistview(false);
        let bookings = response.data || response || [];
        if (!Array.isArray(bookings) && Array.isArray(response)) {
          bookings = response;
        }

        // Get today's date in DD-MM-YYYY format
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const todayString = `${day}-${month}-${year}`;

        const filtered = bookings.filter(item => {
          if (!item.equipment_data || !item.customer_data || !item.booking_date) {
            return false;
          }
          return item.equipment_data.name === employeeName && item.booking_date === todayString;
        });

        const mapped = filtered.map(item => ({
          id: item.id || Math.random().toString(36).substr(2, 9),
          name: item.customer_data?.name || 'Unknown',
          time: `${item.start_time || ''} - ${item.end_time || ''}`,
          status: 'secondary',
        }));

        // Convert 24-hour format to 12-hour format
        const convertTo12Hour = (time24) => {
          if (!time24) return '';
          const [hours, minutes] = time24.split(':');
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes}${ampm}`;
        };

        // Format appointments
        const formattedAppointments = mapped.map(appt => ({
          ...appt,
          time: appt.time
            .split(' - ')
            .map(t => convertTo12Hour(t))
            .join(' - '),
        }));

        // Sort by start time
        const sortedAppointments = formattedAppointments.sort((a, b) => {
          const timeA = a.time.split(' - ')[0];
          const timeB = b.time.split(' - ')[0];
          const convertToMinutes = (time) => {
            const match = time.match(/(\d+):(\d+)(AM|PM)/);
            if (!match) return 0;
            let [_, hours, minutes, ampm] = match;
            hours = parseInt(hours);
            minutes = parseInt(minutes);
            if (ampm === 'PM' && hours !== 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0;
            return hours * 60 + minutes;
          };
          return convertToMinutes(timeA) - convertToMinutes(timeB);
        });

        setAppointments(sortedAppointments);
        setStatsData(prev => ({
          ...prev,
          outPatients: sortedAppointments.length,
        }));
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - firstDay.getDay())

    const days = []
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    dayHeaders.forEach((day) => {
      days.push(<CalendarDay key={day} isHeader>{day}</CalendarDay>)
    })

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()
      const isCurrentMonth = date.getMonth() === month
      days.push(
        <CalendarDay
          key={i}
          isToday={isToday}
          isSelected={isSelected}
          onClick={() => setSelectedDate(date)}
          style={{ opacity: isCurrentMonth ? 1 : 0.3 }}
        >
          {date.getDate()}
        </CalendarDay>
      )
    }
    return days
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  const handleAddActivity = () => {
    if (newActivityTime && newActivityTitle) {
      const newActivity = {
        time: newActivityTime,
        title: newActivityTitle,
        description: newActivityDescription || `${newActivityTime} - Activity`,
        highlighted: true,
        date: selectedDate.toISOString().split('T')[0]
      }
      setActivities([...activities, newActivity].sort((a, b) => a.time.localeCompare(b.time)))
      setNewActivityTime("")
      setNewActivityTitle("")
      setNewActivityDescription("")
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })
  }

  return (
    <Layout title="Doctor Dashboard">
      <DashboardContainer>
        <MainContent>
          <LeftContent>
            <Section>
              <StatsGrid>
                <StatsCard icon={<FaUsers />} label="Total Patients" value={statsData.totalPatients} color="primary" />
                <StatsCard icon={<FaUserMd />} label="Out-Patients" value={statsData.outPatients} color="secondary" />
                <StatsCard icon={<FaBed />} label="In-Patients" value={statsData.inPatients} color="accent" />
                <StatsCard icon={<FaBed />} label="Surgeries" value={statsData.surgeries} color="error" />
              </StatsGrid>
            </Section>
            <Section>
              <GraphAndReportRow>
                <GraphCard>
                  <GraphTitle>Patients analysis</GraphTitle>
                  <div style={{ height: "100px" }}>
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </GraphCard>
                <ClinicalReportCard>
                  <ClinicalReportHeader>Clinical Report</ClinicalReportHeader>
                  <Link to="/OPDappointments" style={{ textDecoration: 'none' }}>
                    <ClinicalInnerCard color="blue">
                      <ClinicalIcon color="#1890FF"><FaUserFriends /></ClinicalIcon>
                      <ClinicalText>
                        <ClinicalLabel>Out-Patients</ClinicalLabel>
                        <ClinicalCount>{statsData.outPatients}</ClinicalCount>
                      </ClinicalText>
                      <ClinicalArrow><FaArrowRight /></ClinicalArrow>
                    </ClinicalInnerCard>
                  </Link>
                  <Link to="/in-patients" style={{ textDecoration: 'none' }}>
                    <ClinicalInnerCard color="red">
                      <ClinicalIcon color="#FF4D4F"><FaProcedures /></ClinicalIcon>
                      <ClinicalText>
                        <ClinicalLabel>In-Patients</ClinicalLabel>
                        <ClinicalCount>{statsData.inPatients}</ClinicalCount>
                      </ClinicalText>
                      <ClinicalArrow><FaArrowRight /></ClinicalArrow>
                    </ClinicalInnerCard>
                  </Link>
                </ClinicalReportCard>
              </GraphAndReportRow>
            </Section>
            <Section>
              <PatientListsGrid>
                <PatientListCard>
                  <PatientListHeader>
                    <PatientListTitle>In-Patients</PatientListTitle>
                  </PatientListHeader>
                  <PatientList>
                    {inPatients.map((patient) => (
                      <PatientItem key={patient.id}>
                        <PatientIcon color={patient.status}>
                          <FaBed color="white" />
                        </PatientIcon>
                        <PatientInfo>
                          <PatientName>{patient.name}</PatientName>
                        </PatientInfo>
                      </PatientItem>
                    ))}
                  </PatientList>
                </PatientListCard>
                <PatientListCard>
                  <PatientListHeader>
                    <PatientListTitle>Out-Patients</PatientListTitle>
                  </PatientListHeader>
                  <PatientList>
                    {loading ? (
                      <PatientItem>Loading...</PatientItem>
                    ) : appointments.length === 0 ? (
                      <PatientItem>No appointments today</PatientItem>
                    ) : (
                      appointments.map((appt) => (
                        <PatientItem key={appt.id}>
                          <PatientIcon color={appt.status}>
                            <FaUserMd color="white" />
                          </PatientIcon>
                          <PatientInfo>
                            <PatientName>{appt.name}</PatientName>
                            <PatientTime>{appt.time}</PatientTime>
                          </PatientInfo>
                        </PatientItem>
                      ))
                    )}
                  </PatientList>
                </PatientListCard>
                <PatientListCard>
                  <PatientListHeader>
                    <PatientListTitle>Surgery</PatientListTitle>
                  </PatientListHeader>
                  <PatientList>
                    {surgeryList.map((surgery) => (
                      <PatientItem key={surgery.id}>
                        <PatientIcon color={surgery.status}>
                          <FaClock color="white" />
                        </PatientIcon>
                        <PatientInfo>
                          <PatientName>{surgery.name}</PatientName>
                        </PatientInfo>
                      </PatientItem>
                    ))}
                  </PatientList>
                </PatientListCard>
              </PatientListsGrid>
            </Section>
          </LeftContent>
          <RightColumn>
            <Section>
              <CalendarCard>
                <CalendarHeader>
                  <CalendarTitle>{currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</CalendarTitle>
                  <CalendarNav>
                    <CalendarNavButton onClick={() => navigateMonth(-1)}><FaChevronLeft /></CalendarNavButton>
                    <CalendarNavButton onClick={() => navigateMonth(1)}><FaChevronRight /></CalendarNavButton>
                  </CalendarNav>
                </CalendarHeader>
                <CalendarGrid>{generateCalendar()}</CalendarGrid>
              </CalendarCard>
              <ActivitiesCard>
                <div style={{ marginBottom: "20px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{formatDate(selectedDate)}</h3>
                </div>
                <AddActivityForm>
                  <ActivityInput
                    type="time"
                    value={newActivityTime}
                    onChange={(e) => setNewActivityTime(e.target.value)}
                    placeholder="Time"
                    required
                  />
                  <ActivityInput
                    type="text"
                    value={newActivityTitle}
                    onChange={(e) => setNewActivityTitle(e.target.value)}
                    placeholder="Activity Title"
                    required
                  />
                  <ActivityInput
                    type="text"
                    value={newActivityDescription}
                    onChange={(e) => setNewActivityDescription(e.target.value)}
                    placeholder="Description (optional)"
                  />
                  <AddButton onClick={handleAddActivity}>Add</AddButton>
                </AddActivityForm>
                {activities
                  .filter(activity => activity.date === selectedDate.toISOString().split('T')[0])
                  .map((activity, index) => (
                    <ActivityItem key={index} highlighted={activity.highlighted}>
                      <ActivityTime>{activity.time}</ActivityTime>
                      <ActivityDetails>
                        <ActivityTitle>{activity.title}</ActivityTitle>
                        <ActivityDescription>{activity.description}</ActivityDescription>
                      </ActivityDetails>
                    </ActivityItem>
                  ))}
              </ActivitiesCard>
            </Section>
          </RightColumn>
        </MainContent>
      </DashboardContainer>
    </Layout>
  )
}

export default DoctorDashboard