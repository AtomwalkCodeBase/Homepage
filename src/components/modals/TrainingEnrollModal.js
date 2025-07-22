"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FaTimes,
  FaGraduationCap,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaAward,
  FaBook,
  FaSpinner,
} from "react-icons/fa"
import Button from "../Button"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import { getenrollmentList, processenrollment } from "../../services/productServices"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const ModalHeader = styled.div`
  padding: 20px 25px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary}05;
`

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: 600;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error}10;
    color: ${({ theme }) => theme.colors.error};
  }
`

const ModalContent = styled.div`
  padding: 25px;
  max-height: calc(90vh - 140px);
  overflow-y: auto;
`

const SearchContainer = styled.div`
  margin-bottom: 25px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  color:${({ theme }) => theme.colors.text}; 

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TrainingCard = styled.div`
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}40;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`

const TrainingImage = styled.div`
  height: 140px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.secondary}20);
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}30, ${({ theme }) => theme.colors.secondary}30);
  }
`

const TrainingContent = styled.div`
  padding: 20px;
`

const TrainingTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
`

const TrainingCode = styled.div`
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 12px;
`

const TrainingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 15px;
`

const TrainingDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.8rem;
    width: 12px;
  }
`

const MandatoryBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  z-index: 1;
`

const EnrollButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-direction: column;
  gap: 15px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    font-size: 3rem;
    margin-bottom: 15px;
    opacity: 0.5;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
`

const TrainingEnrollModal = ({ isOpen, onClose, onEnrollSuccess }) => {
  const [availableTrainings, setAvailableTrainings] = useState([])
  const [filteredTrainings, setFilteredTrainings] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrollingIds, setEnrollingIds] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const { theme } = useTheme()
  const { profile } = useAuth()

  useEffect(() => {
    if (isOpen) {
      fetchAvailableTrainings()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTrainings(availableTrainings)
    } else {
      const filtered = availableTrainings.filter(
        (training) =>
          training.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          training.t_module_data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          training.t_module_data.training_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          training.trainer_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredTrainings(filtered)
    }
  }, [searchTerm, availableTrainings])

  const fetchAvailableTrainings = async () => {
    try {
      setLoading(true)
      const response = await getenrollmentList()
      if (response.status === 200) {
        setAvailableTrainings(response.data || [])
        setFilteredTrainings(response.data || [])
      }
    } catch (error) {
      console.error("Error fetching available trainings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (training) => {
    try {
      setEnrollingIds((prev) => new Set([...prev, training.id]))

      const formData = new FormData()
      formData.append("emp_id", profile?.emp_id || localStorage.getItem("empId"))
      formData.append("call_mode", "ENROLL")
      formData.append("t_session_id", training.id.toString())
      formData.append("training_id", "")
      formData.append("remarks", "")

      const response = await processenrollment(formData)

      if (response.status === 200) {
        // Remove the enrolled training from available list
        setAvailableTrainings((prev) => prev.filter((t) => t.id !== training.id))
        setFilteredTrainings((prev) => prev.filter((t) => t.id !== training.id))

        if (onEnrollSuccess) {
          onEnrollSuccess()
        }
      }
    } catch (error) {
      console.error("Error enrolling in training:", error)
    } finally {
      setEnrollingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(training.id)
        return newSet
      })
    }
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>
            <FaGraduationCap />
            Available Training Programs
          </ModalTitle>
          <CloseButton onClick={onClose} theme={theme}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search training programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              theme={theme}
            />
          </SearchContainer>

          {loading ? (
            <LoadingContainer theme={theme}>
              <FaSpinner className="fa-spin" style={{ fontSize: "2rem" }} />
              <div>Loading available training programs...</div>
            </LoadingContainer>
          ) : filteredTrainings.length === 0 ? (
            <EmptyState theme={theme}>
              <FaGraduationCap />
              <h3>No Training Programs Found</h3>
              <p>
                {searchTerm
                  ? "No training programs match your search criteria."
                  : "There are no available training programs at the moment."}
              </p>
            </EmptyState>
          ) : (
            <TrainingGrid>
              {filteredTrainings.map((training) => (
                <TrainingCard key={training.id} theme={theme}>
                  <TrainingImage src={training.image} theme={theme}>
                    {training.t_module_data.is_mandatory && <MandatoryBadge theme={theme}>Mandatory</MandatoryBadge>}
                  </TrainingImage>

                  <TrainingContent>
                    <TrainingTitle theme={theme}>{training.name}</TrainingTitle>

                    <TrainingCode theme={theme}>{training.t_module_data.training_code}</TrainingCode>

                    <TrainingDetails>
                      <TrainingDetail theme={theme}>
                        <FaBook />
                        <span>{training.t_module_data.name}</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaUser />
                        <span>{training.trainer_name}</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaMapMarkerAlt />
                        <span>{training.location}</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaCalendarAlt />
                        <span>{training.session_date}</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaClock />
                        <span>{training.t_module_data.no_of_days} days</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaAward />
                        <span>{training.t_module_data.no_of_credit} credits</span>
                      </TrainingDetail>
                    </TrainingDetails>

                    <EnrollButton
                      variant="primary"
                      onClick={() => handleEnroll(training)}
                      disabled={enrollingIds.has(training.id)}
                    >
                      {enrollingIds.has(training.id) ? (
                        <>
                          <FaSpinner className="fa-spin" />
                          Enrolling...
                        </>
                      ) : (
                        <>
                          <FaGraduationCap />
                          Enroll Now
                        </>
                      )}
                    </EnrollButton>
                  </TrainingContent>
                </TrainingCard>
              ))}
            </TrainingGrid>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default TrainingEnrollModal
