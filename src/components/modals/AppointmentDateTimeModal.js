import { useState } from "react"
import styled from "styled-components"
import { FaCalendarAlt, FaClock, FaCheck } from "react-icons/fa"
import Modal from "./Modal"
import { useTheme } from "../../context/ThemeContext"
import { toast } from "react-toastify"

const ModalContent = styled.div`
  padding: 20px;
`

const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`

const DoctorImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const DoctorDetails = styled.div`
  flex: 1;
`

const DoctorName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`

const DoctorSpecialty = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`

const SectionTitle = styled.h4`
  margin: 20px 0 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const DateSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`

const DateOption = styled.div`
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ selected, theme }) => (selected ? theme.colors.primary : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ selected, theme }) => (selected ? theme.colors.primary : "#e0e0e0")};
  }
`

const DateText = styled.div`
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
  font-size: 0.9rem;
`

const TimeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`

const TimeOption = styled.div`
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
  background-color: ${({ selected, available, theme }) => {
    if (!available) return "#f5f5f5"
    return selected ? theme.colors.secondary : "#f0f0f0"
  }};
  color: ${({ selected, available }) => {
    if (!available) return "#aaa"
    return selected ? "#fff" : "#333"
  }};
  opacity: ${({ available }) => (available ? "1" : "0.6")};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ selected, available, theme }) => {
      if (!available) return "#f5f5f5"
      return selected ? theme.colors.secondary : "#e0e0e0"
    }};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
`

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
  }
`

const ConfirmButton = styled(Button)`
  background-color: ${({ theme, disabled }) => (disabled ? "#95a5a6" : theme.colors.secondary)};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  
  &:hover {
    background-color: ${({ theme, disabled }) => (disabled ? "#95a5a6" : theme.colors.secondaryDark || "#1e8449")};
  }
`
const TimeRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimeInput = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme, $hasError }) =>
  $hasError ? theme.colors.error || "#ef4444" : theme.colors.border || "#d1d5db"};
  border-radius: ${({ theme }) => theme.borderRadius || "6px"};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background || "#ffffff"};
  color: ${({ theme }) => theme.colors.text || "#374151"};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || "#3b82f6"};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight || "rgba(59, 130, 246, 0.1)"};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border || "#f9fafb"};
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const AppointmentDateTimeModal = ({ isOpen, onClose, doctor, show=false }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const { theme } = useTheme()

        const [formData, setFormData] = useState({
          start_time: "",
          end_time: "",
        });

  console.log("doctor", doctor)

  // Generate next 7 days for date selection
  const generateDates = () => {
  const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      dates.push({
        date: date,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        dateNum: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        full: date.toISOString().split("T")[0],
      })
    }

    return dates
  }

  const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number)
  return h * 60 + m
}

const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}


  // Generate time slots
const generateTimeSlots = ( startTime, endTime, minUsagePeriod, maxUsersPerSlot ) => {
  const slots = []

  const startMinutes = timeToMinutes(startTime)
  const endMinutes = timeToMinutes(endTime)

  const intervalMinutes = minUsagePeriod * 60

  let current = startMinutes

  while (current + intervalMinutes <= endMinutes) {
    const from = minutesToTime(current)
    const to = minutesToTime(current + intervalMinutes)

    slots.push({
      time: `${from} - ${to}`,
      time24h: from,
      from,
      to,
      available: maxUsersPerSlot > 0,
      maxUsers: maxUsersPerSlot,
    })

    current += intervalMinutes
  }

  return slots
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };


  const dates = generateDates()
const timeSlots = generateTimeSlots( doctor.booking_start_time, doctor.max_slot_time, parseFloat(doctor.min_usage_period), doctor.max_users_per_slot)

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast.warning("Please select both date and time")
      return
    }

    // In a real app, this would make an API call to book the appointment
    toast.success(`Appointment booked with ${doctor.name} on ${selectedDate.full} at ${selectedTime.time}`)
    onClose()
  }

  if (!doctor) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Appointment">
      <ModalContent>
        <DoctorInfo>
          <DoctorImage>
            <img
              src={doctor.image || "/placeholder.svg?height=60&width=60"}
              alt={doctor.name}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/placeholder.svg?height=60&width=60"
              }}
            />
          </DoctorImage>
          <DoctorDetails>
            <DoctorName theme={theme}>{doctor.name}</DoctorName>
            <DoctorSpecialty>{doctor.equipment_type}</DoctorSpecialty>
          </DoctorDetails>
        </DoctorInfo>

        <SectionTitle theme={theme}>
          <FaCalendarAlt style={{ marginRight: "8px" }} /> Select Date
        </SectionTitle>
        <DateSelector>
          {dates.map((date) => (
            <DateOption
              key={date.full}
              selected={selectedDate?.full === date.full}
              onClick={() => setSelectedDate(date)}
              theme={theme}
            >
              <DateText selected={selectedDate?.full === date.full}>{date.day}</DateText>
              <DateText selected={selectedDate?.full === date.full}>
                {date.dateNum} {date.month}
              </DateText>
            </DateOption>
          ))}
        </DateSelector>

        <SectionTitle theme={theme}>
          <FaClock style={{ marginRight: "8px" }} /> Select Time
        </SectionTitle>
      {!show ?  <TimeSelector>
          {timeSlots.map((slot) => (
            <TimeOption
              key={slot.time24h}
              selected={selectedTime?.time24h === slot.time24h}
              available={slot.available}
              onClick={() => slot.available && setSelectedTime(slot)}
              theme={theme}
            >
              {slot.time}
              {selectedTime?.time24h === slot.time24h && <FaCheck style={{ marginLeft: "5px" }} />}
            </TimeOption>
          ))}
        </TimeSelector>
        : 
              <TimeRangeContainer>
      <TimeInput
      type="time"
      name="start_time"
      value={formData.start_time}
      onChange={handleInputChange}
      // required={!formData.effort}
      placeholder="Start Time"
      />
      <TimeInput
      type="time"
      name="end_time"
      value={formData.end_time}
      onChange={handleInputChange}
      // required={!formData.effort}
      placeholder="End Time"
      />
      </TimeRangeContainer>
}
        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton onClick={handleConfirm} disabled={!selectedDate || !selectedTime} theme={theme}>
            Confirm Booking
          </ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  )
}

export default AppointmentDateTimeModal
