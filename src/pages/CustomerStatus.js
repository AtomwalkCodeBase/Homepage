"use client"

import { useState } from "react"
import styled from "styled-components"
import {
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaPlayCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"
import Layout from "../components/Layout"
import { getcustomerstatus } from "../services/productServices"
import { useTheme } from "../context/ThemeContext"
import { toast } from "react-toastify"

const PageContainer = styled.div`
  margin: 0 auto;
`

const PageHeader = styled.div`
  margin-bottom: 30px;
`

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 10px 0;
`

const PageDescription = styled.p`
  color: #777;
  font-size: 0.95rem;
  margin: 0;
`

const SearchSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`

const SearchTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const DateTimeInputContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-end;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const InputGroup = styled.div`
  flex: 1;
  min-width: 200px;
`

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
`

const DateInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`

const TimeInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`

const SearchButton = styled.button`
  padding: 12px 32px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark || "#1e8449"};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`

const ResultsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`

const ResultsTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const ResultsCount = styled.span`
  font-size: 0.9rem;
  color: #777;
  background: #f0f0f0;
  padding: 5px 12px;
  border-radius: 20px;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${({ status }) => {
    switch (status) {
      case "S":
        return "#d4edda"
      case "Y":
        return "#fff3cd"
      case "N":
        return "#e2e3e5"
      default:
        return "#f8d7da"
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case "S":
        return "#155724"
      case "Y":
        return "#856404"
      case "N":
        return "#383d41"
      default:
        return "#721c24"
    }
  }};
  
  svg {
    font-size: 0.9rem;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.5;
`

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  margin: 0;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #777;
`

const FilterSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
`

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const FilterInput = styled.input`
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`

const FilterSelect = styled.select`
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  min-width: 180px;
  cursor: pointer;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`

const SampleGroup = styled.div`
  margin-bottom: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`

const SampleHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary}15;
  padding: 18px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}25;
  }
`

const SampleHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const SampleId = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const SampleRef = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`

const ActivityCount = styled.span`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`

const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`

const ActivitiesContainer = styled.div`
  padding: 0;
  background: white;
`

const ActivityRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 15px;
  padding: 18px 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f9f9f9;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`

const ActivityName = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  display: flex;
  align-items: center;
`

const ActivityTime = styled.div`
  font-size: 0.9rem;
  color: #777;
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`

const ActivityStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`

const CustomerStatus = () => {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [statusData, setStatusData] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { theme } = useTheme()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedSamples, setExpandedSamples] = useState({})

  const formatDateTime = (date, time) => {
    if (!date || !time) return ""

    const [year, month, day] = date.split("-")
    const formattedTime = time
    return `${day}-${month}-${year} ${formattedTime}`
  }

  const handleSearch = async () => {
    if (!selectedDate || !selectedTime) {
      toast.warning("Please select both date and time")
      return
    }

    setLoading(true)
    setHasSearched(true)

    const formattedDateTime = formatDateTime(selectedDate, selectedTime)

    try {
      const response = await getcustomerstatus(formattedDateTime)
      setStatusData(response.data || [])

      const initialExpanded = {}
      const grouped = groupBySampleId(response.data || [])
      Object.keys(grouped).forEach((sampleId) => {
        initialExpanded[sampleId] = true
      })
      // setExpandedSamples(initialExpanded)

      toast.success("Customer status loaded successfully")
    } catch (error) {
      console.error("Customer Status Error:", error)
      toast.error("Failed to load customer status. Please try again.")
      setStatusData([])
    } finally {
      setLoading(false)
    }
  }

  const groupBySampleId = (data) => {
    return data.reduce((acc, item) => {
      const sampleId = item.sample_item_id
      if (!acc[sampleId]) {
        acc[sampleId] = {
          sample_item_id: sampleId,
          sample_item_ext_ref: item.sample_item_ext_ref,
          activities: [],
        }
      }
      acc[sampleId].activities.push(item)
      return acc
    }, {})
  }

  const getFilteredData = () => {
    let filtered = statusData

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.sample_item_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sample_item_ext_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.activity_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return groupBySampleId(filtered)
  }

  const toggleSample = (sampleId) => {
    setExpandedSamples((prev) => ({
      ...prev,
      [sampleId]: !prev[sampleId],
    }))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "S":
        return <FaCheckCircle />
      case "Y":
        return <FaPlayCircle />
      case "N":
        return <FaTimesCircle />
      default:
        return <FaClock />
    }
  }

  const today = new Date().toISOString().split("T")[0]
  const currentTime = new Date().toTimeString().slice(0, 5)

  const groupedData = getFilteredData()
  const totalActivities = Object.values(groupedData).reduce((sum, group) => sum + group.activities.length, 0)

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Customer Status Tracking</PageTitle>
          <PageDescription>
            View sample item activities and their current status by selecting a date and time
          </PageDescription>
        </PageHeader>

        <SearchSection>
          <SearchTitle theme={theme}>
            <FaCalendarAlt />
            Select Date and Time
          </SearchTitle>
          <DateTimeInputContainer>
            <InputGroup>
              <Label>Date</Label>
              <DateInput
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={today}
                theme={theme}
              />
            </InputGroup>
            <InputGroup>
              <Label>Time</Label>
              <TimeInput
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                theme={theme}
              />
            </InputGroup>
            <SearchButton onClick={handleSearch} disabled={loading} theme={theme}>
              <FaSearch />
              {loading ? "Searching..." : "Search Status"}
            </SearchButton>
          </DateTimeInputContainer>

          {hasSearched && statusData.length > 0 && (
            <FilterSection>
              <FilterLabel theme={theme}>
                <FaFilter />
                Search:
              </FilterLabel>
              <FilterInput
                type="text"
                placeholder="Search by Sample ID, Reference, or Activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                theme={theme}
              />
              <FilterLabel theme={theme}>Status:</FilterLabel>
              <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} theme={theme}>
                <option value="all">All Status</option>
                <option value="S">Completed</option>
                <option value="Y">Started</option>
                <option value="N">Not Started</option>
                <option value="F">Failed</option>
              </FilterSelect>
            </FilterSection>
          )}
        </SearchSection>

        {hasSearched && (
          <ResultsSection>
            <ResultsHeader>
              <ResultsTitle theme={theme}>Activity Status Results</ResultsTitle>
              <ResultsCount>
                {totalActivities} activities in {Object.keys(groupedData).length} samples
              </ResultsCount>
            </ResultsHeader>

            {loading ? (
              <LoadingContainer>
                <p>Loading customer status...</p>
              </LoadingContainer>
            ) : Object.keys(groupedData).length > 0 ? (
              <>
                {Object.values(groupedData).map((sampleGroup) => (
                  <SampleGroup key={sampleGroup.sample_item_id}>
                    <SampleHeader theme={theme} onClick={() => toggleSample(sampleGroup.sample_item_id)}>
                      <SampleHeaderInfo>
                        <SampleId theme={theme}>{sampleGroup.sample_item_id}</SampleId>
                        <SampleRef>Ref: {sampleGroup.sample_item_ext_ref}</SampleRef>
                      </SampleHeaderInfo>
                      <ToggleIcon theme={theme}>
                        <ActivityCount theme={theme}>
                          {sampleGroup.activities.length}{" "}
                          {sampleGroup.activities.length === 1 ? "activity" : "activities"}
                        </ActivityCount>
                        {expandedSamples[sampleGroup.sample_item_id] ? <FaChevronUp /> : <FaChevronDown />}
                      </ToggleIcon>
                    </SampleHeader>

                    {expandedSamples[sampleGroup.sample_item_id] && (
                      <ActivitiesContainer>
                        {sampleGroup.activities.map((activity, index) => (
                          <ActivityRow key={index}>
                            <ActivityName theme={theme}>{activity.activity_name}</ActivityName>
                            <ActivityTime theme={theme}>
                              <FaClock />
                              {activity.last_updated}
                            </ActivityTime>
                            <ActivityStatus>
                              <StatusBadge status={activity.status}>
                                {getStatusIcon(activity.status)}
                                {activity.status_display}
                              </StatusBadge>
                            </ActivityStatus>
                          </ActivityRow>
                        ))}
                      </ActivitiesContainer>
                    )}
                  </SampleGroup>
                ))}
              </>
            ) : (
              <EmptyState>
                <EmptyStateIcon>
                  <FaSearch />
                </EmptyStateIcon>
                <EmptyStateText>No customer status data found for the selected criteria</EmptyStateText>
              </EmptyState>
            )}
          </ResultsSection>
        )}
      </PageContainer>
    </Layout>
  )
}

export default CustomerStatus
