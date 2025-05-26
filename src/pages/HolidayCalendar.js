"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { 
  FaDownload, 
  FaFilter, 
  FaChevronLeft, 
  FaChevronRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaStar,
  FaRegStar
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getEmpHoliday, postEmpLeave } from "../services/productServices"
import { toast } from "react-toastify"

// Enhanced styling for a modern, cleaner look
const PageHeader = styled.div`
  margin-bottom: 2rem;
  position: relative;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const HeaderTitle = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
`

const CalendarActions = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: white;
  font-size: 0.9rem;
  min-width: 150px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StatCard = styled(Card)`
  flex: 1;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ color, theme }) => color || theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ iconColor, theme }) => iconColor || theme.colors.primary};
  font-size: 1.5rem;
`

const StatContent = styled.div`
  h4 {
    margin: 0;
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;
  }
`

const CalendarContainer = styled(Card)`
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
`

const MonthTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`

const NavButton = styled.button`
  background: white;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 768px) {
    display: none;
  }
`

const WeekdayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 1rem 0.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:nth-child(1), &:nth-child(7) {
    color: ${({ theme }) => theme.colors.danger};
  }
`

const CalendarDay = styled.div`
  padding: 0.5rem;
  min-height: 100px;
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: background 0.2s ease;
  
  ${(props) =>
    props.isToday &&
    `
    background: ${props.theme.colors.primaryLight};
  `}
  
  ${(props) =>
    props.isWeekend &&
    `
    background: ${props.theme.colors.backgroundAlt};
  `}
  
  ${(props) =>
    !props.isCurrentMonth &&
    `
    opacity: 0.4;
    background: ${props.theme.colors.backgroundAlt};
  `}
  
  &:hover {
    background: ${({ theme, isCurrentMonth }) => 
      isCurrentMonth ? theme.colors.primaryLighter : theme.colors.backgroundAlt};
  }
`

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const DayNumber = styled.div`
  font-weight: ${(props) => (props.isToday ? "600" : "400")};
  color: ${(props) => (props.isToday ? props.theme.colors.primary : props.theme.colors.text)};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${(props) =>
    props.isToday &&
    `
    background: ${props.theme.colors.primary};
    color: white;
    border-radius: 50%;
  `}
`

const HolidayTag = styled.div`
    background: ${({ isMandatory, isSaturday, theme }) => 
    isMandatory ? theme.colors.dangerLight : 
    isSaturday ? theme.colors.warningLight : theme.colors.infoLight};
    color: ${({ isMandatory, isSaturday, theme }) => 
    isMandatory ?"green" :
    isSaturday ? theme.colors.warning : theme.colors.info};
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${({ isMandatory }) => isMandatory ? 'default' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  ${({ isSelected, theme }) => isSelected && `
    background: ${theme.colors.successLight};
    color: ${theme.colors.success};
    font-weight: 500;
  `}
  
  &:hover {
    opacity: ${({ isMandatory }) => isMandatory ? '1' : '0.9'};
  }
`

const HolidaySection = styled.div`
  /* display: flex; */
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HolidayTypeCard = styled(Card)`
  flex: 1;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.95rem;
    
    th {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      padding: 1.2rem 1rem;
      text-align: left;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.85rem;
      
      &:first-child {
        border-top-left-radius: 8px;
      }
      
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
    
    td {
      padding: 1.2rem 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
      vertical-align: middle;
      transition: background-color 0.2s ease;
    }
    
    tr:last-child td {
      border-bottom: none;
      
      &:first-child {
        border-bottom-left-radius: 8px;
      }
      
      &:last-child {
        border-bottom-right-radius: 8px;
      }
    }
    
    tr:hover td {
      background: ${({ theme }) => theme.colors.backgroundHover};
    }
    
    tr:nth-child(even) {
      background: ${({ theme }) => theme.colors.backgroundAlt};
    }
  }
`;

const SelectionProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  
  .progress-bar {
    flex-grow: 1;
    height: 8px;
    background: ${({ theme }) => theme.colors.borderLight};
    border-radius: 4px;
    overflow: hidden;
    
    .filled {
      height: 100%;
      background: ${({ theme }) => theme.colors.success};
      width: ${({ progress }) => progress}%;
      transition: width 0.3s ease;
    }
  }
  
  .progress-text {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textLight};
    white-space: nowrap;
  }
`;

const ListViewToggle = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin-left: auto;
  color: #333;
`;

const ViewButton = styled.button`
  background: ${({ active, theme }) => active ? theme.colors.primary : 'white'};
  color: ${({ active }) => active ? 'white' : 'inherit'};
  border: none;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.backgroundAlt};
  }
`;

const Skeleton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  width: 100%;
  height: ${props => props.height || '20px'};
  border-radius: 4px;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const MobileCalendarList = styled.div`
  /* display: none; */
  
  @media (max-width: 768px) {
    display: block;
  }
  
  .date-item {
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    .date-header {
      display: flex;
      justify-content: space-between;
      
      .date {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.2rem;
      }
      
      .day {
        color: ${({ theme }) => theme.colors.textLight};
      }
    }
  }
`;

const OptionalHolidayCard = styled(Card)`
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.successLight};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: ${({ theme }) => theme.colors.success};
    opacity: 0.1;
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.success};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const MonthListView = styled.div`
  padding: 1rem;
`;

const NoHolidaysMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
`;
const Message = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
  font-size: 1.1rem;
  font-weight: 500;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
  `;

const HolidayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [holidayData, setHolidayData] = useState({
    h_list: [],
    holiday_saturday_list: "",
    no_optional_holidays: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("calendar");
  const [viewType, setViewType] = useState("grid");
  const [holidayFilter, setHolidayFilter] = useState("all");
   const[relode, setRelode] = useState(0);
  const [formData, setFormData] = useState({
    leave_type: "OH",
    from_date: "",
    hrm_lite: "",
    to_date: "",
    remarks: "Optional Holiday",
    contactInfo: "",
    call_mode: "ADD",
    emp_id: localStorage.getItem("empNoId")
  });
      console.log("Date String:", holidayData);
    // Accepts date in "YYYY-MMM-DD" (e.g., "2025-Apr-18") and returns "18-03-2025"
    const formatDate = (dateString) => {

      if (!dateString) return "";
      const [day, monthAbbr,year ] = dateString.split("-");
      // Convert month abbreviation to month number
      const monthMap = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
      };
      const monthNum = monthMap[monthAbbr] || "01";
      return `${day}-${monthNum}-${year}`;
    };
const handleSubmit = (formattedDate,type,id) => {
    // e.preventDefault();
    // Prepare data for submission with formatted dates
    const submissionData = {
      ...formData,
      call_mode: type,
      from_date: formatDate(formattedDate),
      to_date: formatDate(formattedDate),
      leave_id: id? id : "",
    };
    const adddata = {
      ...formData,
      from_date: formatDate(formattedDate),
      to_date: formatDate(formattedDate),
    };
    postEmpLeave(id?submissionData:adddata)
      .then(() => {
        toast.success("Leave application submitted successfully!");
        setRelode(relode + 1);
      })
      .catch((error) => {
       toast.error(error.response.data.message);
        console.log('Error==', error);
      });
  };
  const fetchAttendanceDetails = async (data) => {
    try {
      setLoading(true);
      const res = await getEmpHoliday(data);
      setHolidayData(res.data || {
        h_list: [],
        holiday_saturday_list: "",
        no_optional_holidays: 0
      });
    } catch (error) {
      console.log("Holiday Error:", error);
      setHolidayData({
        h_list: [],
        holiday_saturday_list: "",
        no_optional_holidays: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const emp_id = localStorage.getItem('empNoId');
    const currentYear = new Date().getFullYear();
    const data = { 
      year: currentYear, 
      eId: emp_id
    };
    fetchAttendanceDetails(data);
  }, [relode]);

  const holidaySaturdayList = holidayData?.holiday_saturday_list?.split('|')?.filter(Boolean) || [];

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const allHolidays = holidayData.h_list || [];
  const mandatoryLeaves = allHolidays.filter(h => h.h_type === "M");
  const optionalLeaves = allHolidays.filter(h => h.h_type === "O");

  // Filter holidays based on selected filter
  const filteredHolidays = holidayFilter === "all" 
    ? allHolidays 
    : allHolidays.filter(h => 
        holidayFilter === "mandatory" ? h.h_type === "M" : h.h_type === "O"
      );

  // Get month name
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[currentMonth];

  // Function to navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Function to navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Toggle optional holiday selection
  const toggleOptionalHoliday = (key) => {
    if (selectedHolidays.includes(key)) {
      setSelectedHolidays(selectedHolidays.filter(k => k !== key));
    } else if (selectedHolidays.length < (holidayData.no_optional_holidays || 0)) {
      setSelectedHolidays([...selectedHolidays, key]);
    }
  };

  // Filter holidays for the current month
  const currentMonthHolidays = (holidayData.h_list || []).filter(holiday => {
    const holidayDate = new Date(holiday.day.split('-').reverse().join('-'));
    return holidayDate.getMonth() === currentMonth && holidayDate.getFullYear() === currentYear;
  });

  // Function to generate calendar days for the current month
  const generateCalendarDays = () => {
    if (loading) {
      return Array.from({ length: 42 }).map((_, i) => (
        <CalendarDay key={`loading-${i}`} isCurrentMonth={false}>
          <Skeleton height="100%" />
        </CalendarDay>
      ));
    }

    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add weekday headers
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
      days.push(<WeekdayHeader key={`header-${day}`}>{day}</WeekdayHeader>);
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<CalendarDay key={`empty-${i}`} isCurrentMonth={false} />);
    }

    // Get current date for comparison
    const today = new Date();
    const isToday = (someDate) => {
      return someDate.getDate() === today.getDate() && 
             someDate.getMonth() === today.getMonth() && 
             someDate.getFullYear() === today.getFullYear();
    };

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${day}-${monthNames[currentMonth].substring(0, 3)}-${currentYear}`;
      const dateKey = `${day.toString().padStart(2, '0')}-${monthNames[currentMonth].substring(0, 3)}-${currentYear}`;
      const fullDate = new Date(currentYear, currentMonth, day);
      const isWeekend = fullDate.getDay() === 0 || fullDate.getDay() === 6;
      const isHolidaySaturday = holidaySaturdayList.includes(dateKey);
      const todayCheck = isToday(fullDate);
      
      // Find holidays for this day
      const dayHolidays = (holidayData.h_list || []).filter(holiday => {
        const holidayDate = new Date(holiday.day.split('-').reverse().join('-'));
        return holidayDate.getDate() === day && 
               holidayDate.getMonth() === currentMonth && 
               holidayDate.getFullYear() === currentYear;
      });

      days.push(
        <CalendarDay 
          key={`day-${day}`} 
          isCurrentMonth={true} 
          isWeekend={isWeekend}
          isToday={todayCheck}
          isHoliday={dayHolidays.length > 0 || isHolidaySaturday}
        >
          <DayHeader>
            <DayNumber isToday={todayCheck}>{day}</DayNumber>
            {isWeekend && <span style={{ fontSize: '0.75rem', color: '#999' }}>{weekdays[fullDate.getDay()]}</span>}
          </DayHeader>
          {dayHolidays.map(holiday => (
            <HolidayTag 
              key={holiday.key} 
              isMandatory={holiday.h_type === "M"}
              isSelected={selectedHolidays.includes(holiday.key)}
              onClick={() => holiday.h_type === "O" && toggleOptionalHoliday(holiday.key)}
            >
              {selectedHolidays.includes(holiday.key) && holiday.h_type === "O" && <FaCheckCircle size={10} />}
              {holiday.remarks}
            </HolidayTag>
          ))}
          {isHolidaySaturday && !dayHolidays.some(h => h.h_type === "M") && (
            <HolidayTag isSaturday>Holiday (Saturday)</HolidayTag>
          )}
        </CalendarDay>
      );
    }

    return days;
  };

  // Generate list of dates with holidays for mobile view
  const generateMobileCalendarList = () => {
    const dates = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(currentYear, currentMonth, day);
      const dateKey = `${day.toString().padStart(2, '0')}-${monthNames[currentMonth].substring(0, 3)}-${currentYear}`;
      const isHolidaySaturday = holidaySaturdayList.includes(dateKey);
      
      // Find holidays for this day
      const dayHolidays = (holidayData.h_list || []).filter(holiday => {
        const holidayDate = new Date(holiday.day.split('-').reverse().join('-'));
        return holidayDate.getDate() === day && 
               holidayDate.getMonth() === currentMonth && 
               holidayDate.getFullYear() === currentYear;
      });
      
      if (dayHolidays.length > 0 || isHolidaySaturday) {
        const formattedDate = fullDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const dayName = fullDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        dates.push(
          <div className="date-item" key={`mobile-${day}`}>
            <div className="date-header">
              <span className="date">{formattedDate}</span>
              <span className="day">{dayName}</span>
            </div>
            <div className="holiday-list">
              {dayHolidays.map(holiday => (
                <HolidayTag 
                  key={holiday.key} 
                  isMandatory={holiday.h_type === "M"}
                  isSelected={selectedHolidays.includes(holiday.key)}
                  onClick={() => holiday.h_type === "O" && toggleOptionalHoliday(holiday.key)}
                >
                  {selectedHolidays.includes(holiday.key) && holiday.h_type === "O" && <FaCheckCircle size={10} />}
                  {holiday.remarks}
                </HolidayTag>
              ))}
              {isHolidaySaturday && !dayHolidays.some(h => h.h_type === "M") && (
                <HolidayTag isSaturday>Holiday (Saturday)</HolidayTag>
              )}
            </div>
          </div>
        );
      }
    }
    
    return dates.length > 0 ? dates : <p style={{ padding: '1rem', textAlign: 'center' }}>No holidays in this month</p>;
  };

  // Calculate progress percentage
  const selectionProgress = holidayData.no_optional_holidays > 0 
    ? (filteredHolidays.filter(h => h.is_opted ==true).length / holidayData.no_optional_holidays) * 100 
    : 0;

  if (loading) {
    return (
      <Layout>
        <PageHeader>
          <HeaderContent>
            <HeaderTitle>
              <h2><FaCalendarAlt /> Holiday Calendar</h2>
              <p>Loading your holiday information...</p>
            </HeaderTitle>
          </HeaderContent>
        </PageHeader>
        <Card>
          <Skeleton height="300px" />
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader>
        <HeaderContent>
          <HeaderTitle>
            <h2><FaCalendarAlt /> Holiday Calendar</h2>
            <p>Plan your holidays and select optional leaves for {currentYear}</p>
          </HeaderTitle>
          {/* <CalendarActions>
            <Button variant="primary">
              Save Selections
            </Button>
            <Button variant="outline">
              <FaDownload /> Export
            </Button>
          </CalendarActions> */}
        </HeaderContent>
      </PageHeader>

      <TabsContainer>
        <Tab active={activeTab === "calendar"} onClick={() => setActiveTab("calendar")}>
          Calendar View
        </Tab>
        <Tab active={activeTab === "list"} onClick={() => setActiveTab("list")}>
          List View
        </Tab>
      </TabsContainer>

      <StatsContainer>
        <StatCard>
          <StatIcon color="#f6ffed" iconColor="#52c41a">
            <FaStar />
          </StatIcon>
          <StatContent>
            <h4>{mandatoryLeaves.length}</h4>
            <p>Mandatory Holidays</p>
          </StatContent>
        </StatCard>
        <StatCard>
          <StatIcon color="#a5d4fa" iconColor=" #2196F3">
            <FaRegStar />
          </StatIcon>
          <StatContent>
            <h4>{optionalLeaves.length}</h4>
            <p>Optional Holidays</p>
          </StatContent>
        </StatCard>
        <StatCard>
          <StatIcon color="#fff7e6" iconColor="#ffaa00">
            <FaCheckCircle />
          </StatIcon>
          <StatContent>
            <h4>{filteredHolidays.filter(h => h.is_opted ==true).length}/{holidayData.no_optional_holidays || 0}</h4>
            <p>Selected Optional Holidays</p>
          </StatContent>
        </StatCard>
      </StatsContainer>
        <OptionalHolidayCard>
          <h3><FaCheckCircle /> Your Selected Optional Holidays</h3>
          <SelectionProgress progress={selectionProgress}>
            <div className="progress-bar">
              <div className="filled"></div>
            </div>
            <div className="progress-text">
              {filteredHolidays.filter(h => h.is_opted ==true).length} of {holidayData.no_optional_holidays} selected
            </div>
              </SelectionProgress>
                   <TableContainer>
                {filteredHolidays.filter(h => h.is_opted ==true).length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Holiday Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHolidays
                        .filter(h => h.is_opted ==true)
                        .sort((a, b) => {
                          const dateA = new Date(a.day.split('-').reverse().join('-'));
                          const dateB = new Date(b.day.split('-').reverse().join('-'));
                          return dateA - dateB;
                        })
                        .map(holiday => {
                          const holidayDate = new Date(holiday.day.split('-').reverse().join('-'));
                          const dayName = holidayDate.toLocaleDateString('en-US', { weekday: 'long' });
                          const formattedDate = holidayDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });
                          const isSelected = holiday.is_opted;

                          return (
                            <tr key={holiday.key}>
                              <td>{formattedDate}</td>
                              <td>{dayName}</td>
                              <td>{holiday.remarks}</td>
                              <td>
                                {isSelected ? (
                                  <Button 
                                    variant="outlines" size="sm"
                                    onClick={() =>  handleSubmit(holiday.day,"CANCEL",999999999)}
                                  >
                                     ❌ Remove
                                  </Button>
                                ) : (
                                  <Button 
                                   variant="primary" size="sm"
                                    disabled={selectedHolidays.length >= (holidayData.no_optional_holidays || 0) && !isSelected}
                                    onClick={() => handleSubmit(holiday.day)}
                                  >
                                    ✅ Select
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <NoHolidaysMessage>No optional holidays to display</NoHolidaysMessage>
                )}
              </TableContainer>
             </OptionalHolidayCard>
{activeTab === "calendar" && (
        <CalendarContainer>
          <MonthNavigation>
            <NavButton onClick={prevMonth}>
              <FaChevronLeft /> Previous
            </NavButton>
            <MonthTitle>{monthName} {currentYear}</MonthTitle>
            <NavButton onClick={nextMonth}>
              Next <FaChevronRight />
            </NavButton>
          </MonthNavigation>

          <FilterContainer style={{ margin: '1rem', marginBottom: '0' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
              <strong>Note:</strong> Mandatory holidays are marked in green. You can select up to {holidayData.no_optional_holidays || 0} optional holidays.
            </p>
            <ListViewToggle>
              <ViewButton 
                active={viewType === "grid"} 
                onClick={() => setViewType("grid")}
              >
                Grid
              </ViewButton>
              <ViewButton 
                active={viewType === "list"} 
                onClick={() => setViewType("list")}
              >
                List
              </ViewButton>
            </ListViewToggle>
          </FilterContainer>

          {viewType === "grid" ? (
            <>
            <CalendarGrid>
              {generateCalendarDays()}
            </CalendarGrid>
             <Message>To access the list, please navigate to the List View.</Message>
             </>
          ) : (
            <MobileCalendarList>
              {generateMobileCalendarList()}
            </MobileCalendarList>
          )}
        </CalendarContainer>
      )}

      {activeTab === "list" && (
        <>
          <FilterContainer>
            <Button variant="outline" size="sm">
              <FaFilter /> Filter
            </Button>
            <FilterSelect 
              value={holidayFilter} 
              onChange={(e) => setHolidayFilter(e.target.value)}
            >
              <option value="all">All Holidays</option>
              <option value="mandatory">Mandatory Holidays</option>
              <option value="optional">Optional Holidays</option>
            </FilterSelect>
          </FilterContainer>

          <HolidaySection>
            <HolidayTypeCard>
              <h3><FaStar /> Mandatory Holidays</h3>
              <TableContainer>
                {filteredHolidays.filter(h => h.h_type === "M").length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Holiday Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHolidays
                        .filter(h => h.h_type === "M")
                        .sort((a, b) => {
                          const dateA = new Date(a.day.split('-').reverse().join('-'));
                          const dateB = new Date(b.day.split('-').reverse().join('-'));
                          return dateA - dateB;
                        })
                        .map(holiday => {
                          const holidayDate = new Date(holiday.day.split('-').reverse().join('-'));
                          const dayName = holidayDate.toLocaleDateString('en-US', { weekday: 'long' });
                          const formattedDate = holidayDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });

                          return (
                            <tr key={holiday.key}>
                              <td>{formattedDate}</td>
                              <td>{dayName}</td>
                              <td>{holiday.remarks}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <NoHolidaysMessage>No mandatory holidays to display</NoHolidaysMessage>
                )}
              </TableContainer>
            </HolidayTypeCard>

            <HolidayTypeCard>
              <h3><FaRegStar /> Optional Holidays</h3>
              <SelectionProgress progress={selectionProgress}>
                <div className="progress-bar">
                  <div className="filled"></div>
                </div>
                <div className="progress-text">
                  {selectedHolidays.length} of {holidayData.no_optional_holidays} selected
                </div>
              </SelectionProgress>
              <TableContainer>
                {filteredHolidays.filter(h => h.h_type === "O").length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Holiday Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHolidays
                        .filter(h => h.h_type === "O")
                        .sort((a, b) => {
                          const dateA = new Date(a.day.split('-').reverse().join('-'));
                          const dateB = new Date(b.day.split('-').reverse().join('-'));
                          return dateA - dateB;
                        })
                        .map(holiday => {
                          const holidayDate = new Date(holiday.day.split('-').reverse().join('-'));
                          const dayName = holidayDate.toLocaleDateString('en-US', { weekday: 'long' });
                          const formattedDate = holidayDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });
                          const isSelected = holiday.is_opted;

                          return (
                            <tr key={holiday.key}>
                              <td>{formattedDate}</td>
                              <td>{dayName}</td>
                              <td>{holiday.remarks}</td>
                              <td>
                                {isSelected ? (
                                  <Button 
                                    variant="outlines" size="sm"
                                    onClick={() =>  handleSubmit(holiday.day,"CANCEL",999999999)}
                                  >
                                     ❌ Remove
                                  </Button>
                                ) : (
                                  <Button 
                                   variant="primary" size="sm"
                                    disabled={selectedHolidays.length >= (holidayData.no_optional_holidays || 0) && !isSelected}
                                    onClick={() => handleSubmit(holiday.day)}
                                  >
                                    ✅ Select
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <NoHolidaysMessage>No optional holidays to display</NoHolidaysMessage>
                )}
              </TableContainer>
            </HolidayTypeCard>
          </HolidaySection>
        </>
      )}
    </Layout>
  );
};

export default HolidayCalendar;