"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FaGraduationCap,
  FaPlus,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaAward,
  FaBook,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { getmyenrollmentList, getmyenrollmentLists } from "../services/productServices"
import TrainingEnrollModal from "../components/modals/TrainingEnrollModal"

const PageContainer = styled.div`
  padding: 10px;
  /* max-width: 1200px;
  margin: 0 auto; */
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color:${({ theme }) => theme.colors.text}; 

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: ${({ color }) => color};
`

const StatContent = styled.div`
  flex: 1;
`

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 25px;
  overflow-x: auto;
`

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.textSecondary)};
  border-bottom: 3px solid ${({ active, theme }) => (active ? theme.colors.primary : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TrainingCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`

const TrainingImage = styled.div`
  height: 180px;
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
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}40, ${({ theme }) => theme.colors.secondary}40);
  }
`

const TrainingContent = styled.div`
  padding: 20px;
  color:${({ theme }) => theme.colors.text}; 
`

const TrainingTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
`

const TrainingCode = styled.div`
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 12px;
`

const TrainingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`

const TrainingDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
  }
`
const TrainingLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
`

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ status, theme }) => {
    switch (status) {
      case "E":
        return `${theme.colors.warning}20`
      case "C":
        return `${theme.colors.success}20`
      case "P":
        return `${theme.colors.info}20`
      default:
        return `${theme.colors.textSecondary}20`
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "E":
        return theme.colors.warning
      case "C":
        return theme.colors.success
      case "P":
        return theme.colors.info
      default:
        return theme.colors.textSecondary
    }
  }};
`

const MandatoryBadge = styled.span`
  background: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
`

const MyTraining = () => {
  const [activeTab, setActiveTab] = useState("enrolled")
  const [myEnrollments, setMyEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const { theme } = useTheme()
  const { profile } = useAuth()

  useEffect(() => {
    fetchMyEnrollments()
  }, [])

  const fetchMyEnrollments = async () => {
    try {
      setLoading(true)
      const response = await getmyenrollmentLists()
      if (response.status === 200) {
        setMyEnrollments(response.data || [])
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "E":
        return "Enrolled"
      case "C":
        return "Completed"
      case "P":
        return "In Progress"
      default:
        return "Unknown"
    }
  }

  const getStats = () => {
    const total = myEnrollments.length
    const completed = myEnrollments.filter((item) => item.training_status === "C").length
    const inProgress = myEnrollments.filter((item) => item.training_status === "P").length
    const enrolled = myEnrollments.filter((item) => item.training_status === "E").length

    return { total, completed, inProgress, enrolled }
  }

  const stats = getStats()

  const handleEnrollSuccess = () => {
    fetchMyEnrollments()
    setShowEnrollModal(false)
  }

  const filteredEnrollments = myEnrollments.filter((item) => {
    switch (activeTab) {
      case "completed":
        return item.training_status === "C"
      case "inProgress":
        return item.training_status === "P"
      case "enrolled":
      default:
        return item.training_status === "E"
    }
  })

  return (
    <Layout title="My Training">
      <PageContainer>
        <Header>
          <div>
          <Paragraphdata>Track your learning and unlock your potential</Paragraphdata>
        </div>

        <Button
              variant="primary"
              onClick={() => setShowEnrollModal(true)}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FaPlus />
              Enroll Training
            </Button>

        </Header>

        <StatsContainer>
          <StatCard>
            <StatIcon color={theme.colors.primary}>
              <FaBook />
            </StatIcon>
            <StatContent>
              <StatValue theme={theme}>{stats.total}</StatValue>
              <StatLabel theme={theme}>Total Enrollments</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon color={theme.colors.success}>
              <FaAward />
            </StatIcon>
            <StatContent>
              <StatValue theme={theme}>{stats.completed}</StatValue>
              <StatLabel theme={theme}>Completed</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon color={theme.colors.warning}>
              <FaClock />
            </StatIcon>
            <StatContent>
              <StatValue theme={theme}>{stats.inProgress}</StatValue>
              <StatLabel theme={theme}>In Progress</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon color={theme.colors.info}>
              <FaGraduationCap />
            </StatIcon>
            <StatContent>
              <StatValue theme={theme}>{stats.enrolled}</StatValue>
              <StatLabel theme={theme}>Enrolled</StatLabel>
            </StatContent>
          </StatCard>
        </StatsContainer>

        <Card>
          <TabContainer>
            <Tab active={activeTab === "enrolled"} onClick={() => setActiveTab("enrolled")} theme={theme}>
              Enrolled ({stats.enrolled})
            </Tab>
            <Tab active={activeTab === "inProgress"} onClick={() => setActiveTab("inProgress")} theme={theme}>
              In Progress ({stats.inProgress})
            </Tab>
            <Tab active={activeTab === "completed"} onClick={() => setActiveTab("completed")} theme={theme}>
              Completed ({stats.completed})
            </Tab>
          </TabContainer>

          {loading ? (
            <LoadingContainer theme={theme}>Loading training data...</LoadingContainer>
          ) : filteredEnrollments.length === 0 ? (
            <EmptyState theme={theme}>
              <FaGraduationCap />
              <h3>No Training Found</h3>
              <p>You don't have any training in this category yet.</p>
            </EmptyState>
          ) : (
            <TrainingGrid>
              {filteredEnrollments.map((enrollment) => (
                <TrainingCard key={enrollment.id}>
                  <TrainingImage src={enrollment.t_session_data.image} theme={theme}>
                    {enrollment.t_session_data.t_module_data.is_mandatory && (
                      <MandatoryBadge theme={theme}>Mandatory</MandatoryBadge>
                    )}
                  </TrainingImage>

                  <TrainingContent>
                    <TrainingTitle theme={theme}>{enrollment.t_session_data.name}</TrainingTitle>

                    <TrainingCode theme={theme}>{enrollment.t_session_data.t_module_data.training_code}</TrainingCode>

                    <TrainingDetails>
                      <TrainingDetail theme={theme}>
                        <FaUser /><TrainingLabel>Trainer: -</TrainingLabel>
                        <p>{enrollment.t_session_data.trainer_name}</p>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaMapMarkerAlt /><TrainingLabel>Location: -</TrainingLabel>
                        <span>{enrollment.t_session_data.location}</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaCalendarAlt /><TrainingLabel>Session Date: -</TrainingLabel>
                        <span>{enrollment.t_session_data.session_date}</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaClock /><TrainingLabel>No of days: -</TrainingLabel>
                        <span>{enrollment.t_session_data.t_module_data.no_of_days} days</span>
                      </TrainingDetail>

                      <TrainingDetail theme={theme}>
                        <FaAward /><TrainingLabel>Credit: -</TrainingLabel>
                        <span>{enrollment.t_session_data.t_module_data.no_of_credit} credits</span>
                      </TrainingDetail>
                    </TrainingDetails>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "15px",
                      }}
                    >
                      <StatusBadge status={enrollment.training_status} theme={theme}>
                        {getStatusText(enrollment.training_status)}
                      </StatusBadge>

                      {enrollment.t_score && (
                        <div style={{ fontSize: "0.9rem", color: theme.colors.textSecondary }}>
                          Score: <strong>{enrollment.t_score}</strong>
                        </div>
                      )}
                    </div>
                  </TrainingContent>
                </TrainingCard>
              ))}
            </TrainingGrid>
          )}
        </Card>

        {showEnrollModal && (
          <TrainingEnrollModal
            isOpen={showEnrollModal}
            onClose={() => setShowEnrollModal(false)}
            onEnrollSuccess={handleEnrollSuccess}
          />
        )}
      </PageContainer>
    </Layout>
  )
}

export default MyTraining
