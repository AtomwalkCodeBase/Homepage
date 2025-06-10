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

const AppointmentDateTimeModal = ({ isOpen, onClose, doctor }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const { theme } = useTheme()

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

  // Generate time slots
  const generateTimeSlots = () => {
    // This would normally come from the doctor's availability
    // For now, we'll generate some sample slots
    const slots = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour}:00`
      const time24h = `${hour.toString().padStart(2, "0")}:00`

      slots.push({
        time: time,
        time24h: time24h,
        available: Math.random() > 0.3, // Randomly make some slots unavailable
      })
    }

    return slots
  }

  const dates = generateDates()
  const timeSlots = generateTimeSlots()

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
        <TimeSelector>
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
