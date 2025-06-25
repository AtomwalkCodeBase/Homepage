"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import Card from "../components/Card"
import { FaEye, FaSearch, FaList, FaCheckCircle, FaClock } from "react-icons/fa"
import Button from "../components/Button"
import { getbookedlistview } from "../services/productServices"
import { getEmployeeInfo } from "../services/authServices"

const AppointmentsContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 15px;
  }
`

const SearchAndFilter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  transition: transform 0.2s ease, background 0.2s ease;
  cursor: pointer;
  background: ${({ active, theme }) => (active ? theme.colors.primaryLight : theme.colors.card)};
  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.primaryLighter};
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

const SearchWrapper = styled.div`
  position: relative;
  width: 200px;
`

const SearchInput = styled.input`
  padding: 8px 12px 8px 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
`

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
`

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  width: 150px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  overflow: hidden;
`

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.primaryLight};
  font-size: 0.9rem;
`

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.card};
  }
`

const TableCell = styled.td`
  padding: 12px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
 `

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ status }) => (status === "Completed" ? "#f5f5f5" : "#ffe6e6")};
  color: ${({ status }) => (status === "Completed" ? "#666" : "#ff4d4f")};
`

const Appointments = () => {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  })
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get employee profile data first
        const profileResponse = await getEmployeeInfo();
        const employeeName = profileResponse?.data?.[0]?.name;

        if (!employeeName) {
          console.error("Could not fetch employee name");
          setLoading(false);
          return;
        }

        const response = await getbookedlistview(false);
        let bookings = response.data || response || [];
        if (!Array.isArray(bookings) && Array.isArray(response)) {
          bookings = response;
        }

        // Convert selected date (YYYY-MM-DD) to DD-MM-YYYY for comparison
        const [year, month, day] = selectedDate.split("-");
        const formattedSelectedDate = `${day}-${month}-${year}`;

        const filtered = bookings.filter(item => {
          if (!item.equipment_data || !item.customer_data || !item.booking_date) {
            return false;
          }
          return item.equipment_data.name === employeeName && item.booking_date === formattedSelectedDate;
        });

        const mapped = filtered.map(item => ({
          id: item.id || Math.random().toString(36).substr(2, 9),
          name: item.customer_data?.name || "Unknown",
          date: item.booking_date || formattedSelectedDate,
          time: `${item.start_time || ""} - ${item.end_time || ""}`,
          status: "--", // Assuming default status as API doesn't provide it
        }));

        // Convert 24-hour format to 12-hour format
        const convertTo12Hour = (time24) => {
          if (!time24) return "";
          const [hours, minutes] = time24.split(":");
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes}${ampm}`;
        };

        // Format appointments
        const formattedAppointments = mapped.map(appt => ({
          ...appt,
          time: appt.time
            .split(" - ")
            .map(t => convertTo12Hour(t))
            .join("-"),
        }));

        // Sort by start time
        const sortedAppointments = formattedAppointments.sort((a, b) => {
          const timeA = a.time.split("-")[0];
          const timeB = b.time.split("-")[0];
          const convertToMinutes = (time) => {
            const match = time.match(/(\d+):(\d+)(AM|PM)/);
            if (!match) return 0;
            let [_, hours, minutes, ampm] = match;
            hours = parseInt(hours);
            minutes = parseInt(minutes);
            if (ampm === "PM" && hours !== 12) hours += 12;
            if (ampm === "AM" && hours === 12) hours = 0;
            return hours * 60 + minutes;
          };
          return convertToMinutes(timeA) - convertToMinutes(timeB);
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [selectedDate]);

  const filteredAppointments = appointments
    .filter((appointment) =>
      filter === "All" ? true : appointment.status === filter
    )
    .filter((appointment) =>
      appointment.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Layout title="Out-patient Appointments">
      <AppointmentsContainer>
        <StatsContainer>
          <StatCard
            active={filter === "All"}
            onClick={() => setFilter("All")}
          >
            <StatIcon color="#f6ffed" iconColor="#52c41a">
              <FaList />
            </StatIcon>
            <StatContent>
              <h4>{appointments.length}</h4>
              <p>All Appointments</p>
            </StatContent>
          </StatCard>
          <StatCard
            active={filter === "Completed"}
            onClick={() => setFilter("Completed")}
          >
            <StatIcon color="#a5d4fa" iconColor="#2196F3">
              <FaCheckCircle />
            </StatIcon>
            <StatContent>
              <h4>{appointments.filter(a => a.status === "Completed").length}</h4>
              <p>Completed Appointments</p>
            </StatContent>
          </StatCard>
          <StatCard
            active={filter === "Pending"}
            onClick={() => setFilter("Pending")}
          >
            <StatIcon color="#fff7e6" iconColor="#ffaa00">
              <FaClock />
            </StatIcon>
            <StatContent>
              <h4>{appointments.filter(a => a.status === "Pending").length}</h4>
              <p>Pending Appointments</p>
            </StatContent>
          </StatCard>
        </StatsContainer>

        <SearchAndFilter>
          <SearchBar>
            <SearchWrapper>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchWrapper>
            <DateInput
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </SearchBar>
        </SearchAndFilter>

        <Table>
          <thead>
            <tr>
              <TableHeader>SL No.</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Time</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>View</TableHeader>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>No appointments found</TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <TableRow key={appointment.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <StatusBadge status={appointment.status}>
                      {appointment.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <FaEye /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </AppointmentsContainer>
    </Layout>
  )
}

export default Appointments