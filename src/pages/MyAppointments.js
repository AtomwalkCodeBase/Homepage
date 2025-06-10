"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaClock, FaCalendarAlt, FaUserMd, FaFilter } from "react-icons/fa"
import Layout from "../components/Layout"
import { getequipmentlistview } from "../services/productServices"
import { useTheme } from "../context/ThemeContext"
import { toast } from "react-toastify"
import AppointmentDateTimeModal from "../components/modals/AppointmentDateTimeModal"


const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const SpecialtyContainer = styled.div`
  margin-bottom: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`

const SpecialtyList = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px 0;
  min-width: min-content;
`

const SpecialtyCard = styled.div`
  padding: 8px 16px;
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.primary : "#d1d1d1")};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  
  &:hover {
    background-color: ${({ active, theme }) => (active ? theme.colors.primary : "#e0e0e0")};
    transform: translateY(-2px);
  }
`

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const DoctorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const DoctorCard = styled.div`
  display: flex;
  padding: 15px;
  background-color: ${({ selected, theme }) => (selected ? "#e3f2fd" : "#f8f9fa")};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${({ selected, theme }) => (selected ? theme.colors.secondary : "#d1d1d1")};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const DoctorImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
  background-color: #e0e0e0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const DoctorInfo = styled.div`
  flex: 1;
`

const DoctorName = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 5px 0;
  color: ${({ theme }) => theme.colors.text};
`

const DoctorSpecialty = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 8px 0;
`

const DoctorDetail = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin: 0 0 3px 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const BookingSection = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

const BookButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ disabled, theme }) => (disabled ? "#95a5a6" : theme.colors.secondary)};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  width: 100%;
  max-width: 400px;
  
  &:hover {
    background-color: ${({ disabled, theme }) => (disabled ? "#95a5a6" : theme.colors.secondaryDark || "#1e8449")};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #777;
`

const MyAppointments = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [doctorList, setDoctorList] = useState([])
  const [specialties, setSpecialties] = useState([{ label: "All", value: "All" }])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setLoading(true)
    getequipmentlistview()
      .then((res) => {
        console.log("API Response:", res.data)
        setDoctorList(res.data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Equipment list load failed:", error)
        toast.error("Failed to load doctors. Please try again later.")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (doctorList.length > 0) {
      const uniqueSpecialties = [...new Set(doctorList.map((doctor) => doctor.equipment_type))]
      const specialtyOptions = uniqueSpecialties.map((specialty) => ({
        label: specialty,
        value: specialty,
      }))
      setSpecialties([{ label: "All", value: "All" }, ...specialtyOptions])
    }
  }, [doctorList])

  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctorList
      : doctorList.filter((doctor) => doctor.equipment_type === selectedSpecialty)

  const handleBookAppointment = () => {
    if (!selectedDoctor) {
      toast.warning("Please select a doctor first.")
      return
    }

    setIsModalOpen(true)
  }

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Book an Appointment</PageTitle>
        </PageHeader>

        <SectionTitle theme={theme}>
          <FaFilter /> Select Specialty
        </SectionTitle>
        <SpecialtyContainer theme={theme}>
          <SpecialtyList>
            {specialties.map((specialty) => (
              <SpecialtyCard
                key={specialty.value}
                active={selectedSpecialty === specialty.value}
                onClick={() => {
                  setSelectedSpecialty(specialty.value)
                  setSelectedDoctor(null)
                }}
                theme={theme}
              >
                {specialty.label}
              </SpecialtyCard>
            ))}
          </SpecialtyList>
        </SpecialtyContainer>

        <SectionTitle theme={theme}>
          <FaUserMd /> Available Doctors
        </SectionTitle>

        {loading ? (
          <LoadingContainer>
            <p>Loading doctors...</p>
          </LoadingContainer>
        ) : filteredDoctors.length > 0 ? (
          <DoctorGrid>
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                selected={selectedDoctor?.id === doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                theme={theme}
              >
                <DoctorImage>
                  <img
                    src={doctor.image || "/placeholder.svg?height=80&width=80"}
                    alt={doctor.name}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg?height=80&width=80"
                    }}
                  />
                </DoctorImage>
                <DoctorInfo>
                  <DoctorName theme={theme}>{doctor.name}</DoctorName>
                  <DoctorSpecialty>{doctor.equipment_type}</DoctorSpecialty>
                  <DoctorDetail theme={theme}>
                    <FaClock /> Start: {doctor.start_time}
                  </DoctorDetail>
                  <DoctorDetail theme={theme}>
                    <FaCalendarAlt /> Duration: {doctor.min_usage_period} {doctor.unit_of_usage}
                  </DoctorDetail>
                  <DoctorDetail theme={theme}>
                    <FaUserMd /> Slots: {doctor.no_of_slots}
                  </DoctorDetail>
                </DoctorInfo>
              </DoctorCard>
            ))}
          </DoctorGrid>
        ) : (
          <EmptyState>
            <p>No doctors available for the selected specialty.</p>
          </EmptyState>
        )}

        <BookingSection>
          <BookButton onClick={handleBookAppointment} disabled={!selectedDoctor} theme={theme}>
            {selectedDoctor ? `Book Appointment with ${selectedDoctor.name}` : "Select a Doctor to Book"}
          </BookButton>
        </BookingSection>

        {isModalOpen && (
          <AppointmentDateTimeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            doctor={selectedDoctor}
          />
        )}
      </PageContainer>
    </Layout>
  )
}

export default MyAppointments
