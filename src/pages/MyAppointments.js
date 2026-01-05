"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaClock, FaCalendarAlt, FaUserMd, FaFilter } from "react-icons/fa"
import Layout from "../components/Layout"
import { getEquipmentListView } from "../services/productServices"
import { useTheme } from "../context/ThemeContext"
import { toast } from "react-toastify"
import AppointmentDateTimeModal from "../components/modals/AppointmentDateTimeModal"

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    pointer-events: none;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
`

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  font-weight: 400;
`

const SpecialtyContainer = styled.div`
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
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
  padding: 8px 0;
  min-width: min-content;
`

const SpecialtyCard = styled.div`
  padding: 12px 20px;
  background: ${({ active, theme }) => 
    active 
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)` 
      : 'rgba(255, 255, 255, 0.1)'
  };
  color: ${({ active, theme }) => (active ? theme.colors.card : theme.colors.text)};
  border-radius: 16px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)')};
  box-shadow: ${({ active }) => active ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: ${({ active, theme }) => 
      active 
        ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)` 
        : 'rgba(255, 255, 255, 0.2)'
    };
    transform: translateY(-2px);
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-weight: 600;

  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
  }
`

const DoctorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const DoctorCard = styled.div`
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

const DoctorImage = styled.div`
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

const DoctorInfo = styled.div`
  flex: 1;
`

const DoctorName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: ${({ theme }) => theme.colors.text};
`

const DoctorSpecialty = styled.p`
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

const DoctorDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin: 15px 0;
`

const DoctorDetail = styled.div`
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
    getEquipmentListView()
      .then((res) => {
        setDoctorList(res.data || [])
        console.log("setDoctorList", res.data)
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
      console.log("unique",[{ label: "All", value: "All" }, ...specialtyOptions]);
      setSpecialties([{ label: "All", value: "All" }, ...specialtyOptions])
    }
  }, [doctorList])

  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctorList
      : doctorList.filter((doctor) => doctor.equipment_type === selectedSpecialty)

      console.log(filteredDoctors)

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  return (
    <Layout>
      <PageContainer theme={theme}>
        <ContentWrapper>
          <PageHeader theme={theme}>
            <PageTitle theme={theme}>Book an Appointment</PageTitle>
            <PageSubtitle theme={theme}>Choose your doctor and schedule with ease</PageSubtitle>
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
                    setIsModalOpen(false)
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
            <LoadingContainer theme={theme}>
              <LoadingSpinner theme={theme} />
              <h3>Loading doctors...</h3>
              <p>Please wait while we fetch the available doctors</p>
            </LoadingContainer>
          ) : filteredDoctors.length > 0 ? (
            <DoctorGrid>
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  selected={selectedDoctor?.id === doctor.id}
                  onClick={() => handleDoctorSelect(doctor)}
                  theme={theme}
                >
                  <DoctorImage theme={theme}>
                    <img
                      src={doctor.image || "/placeholder.svg?height=70&width=70"}
                      alt={doctor.name}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/placeholder.svg?height=70&width=70"
                      }}
                    />
                  </DoctorImage>
                  <DoctorInfo>
                    <DoctorName theme={theme}>{doctor.name}</DoctorName>
                    <DoctorSpecialty theme={theme}>{doctor.equipment_type}</DoctorSpecialty>
                    <DoctorDetails>
                      <DoctorDetail theme={theme}>
                        <FaClock />
                        <span>Start: {doctor.start_time}</span>
                      </DoctorDetail>
                      <DoctorDetail theme={theme}>
                        <FaCalendarAlt />
                        <span>Duration: {doctor.min_usage_period} {doctor.unit_of_usage}</span>
                      </DoctorDetail>
                      <DoctorDetail theme={theme}>
                        <FaUserMd />
                        <span>Slots: {doctor.no_of_slots}</span>
                      </DoctorDetail>
                    </DoctorDetails>
                  </DoctorInfo>
                </DoctorCard>
              ))}
            </DoctorGrid>
          ) : (
            <EmptyState theme={theme}>
              <FaUserMd />
              <h3>No Doctors Available</h3>
              <p>No doctors available for the selected specialty.</p>
            </EmptyState>
          )}

          {isModalOpen && (
            <AppointmentDateTimeModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
                setSelectedDoctor(null)
              }}
              doctor={selectedDoctor}
            />
          )}
        </ContentWrapper>
      </PageContainer>
    </Layout>
  )
}

export default MyAppointments