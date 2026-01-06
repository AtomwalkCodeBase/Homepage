import { useState, useEffect } from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import {
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxes,
  FaClipboardList,
} from "react-icons/fa"
import { getusersampleevent, processsampleevt } from "../../services/productServices"
import Layout from "../../components/Layout"
import RemarksModal from "../../components/modals/RemarksModal"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SampleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const SampleCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`

const SampleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.cardBg};
  border-bottom: ${(props) => (props.expanded ? `1px solid ${props.theme.colors.border}` : "none")};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.cardHoverBg};
  }
`

const SampleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

const SampleName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const SampleMeta = styled.div`
  display: flex;
  gap: 20px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  background: ${(props) => {
    switch (props.status?.toLowerCase()) {
      case "completed":
        return props.theme.colors.successBg
      case "started":
        return props.theme.colors.warningBg
      case "not started":
        return props.theme.colors.infoBg
      default:
        return props.theme.colors.mutedBg
    }
  }};
  color: ${(props) => {
    switch (props.status?.toLowerCase()) {
      case "completed":
        return props.theme.colors.success
      case "in progress":
        return props.theme.colors.warning
      case "not started":
        return props.theme.colors.info
      default:
        return props.theme.colors.text
    }
  }};
`

const ExpandIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: transform 0.3s ease;
  transform: ${(props) => (props.expanded ? "rotate(0)" : "rotate(-90deg)")};
`

const SampleBody = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
`

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const ActivityCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const ActivityName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`

const ActivityStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.8rem;
  background: ${(props) => {
    switch (props.status?.toUpperCase()) {
      case "COMPLETED":
        return props.theme.colors.successBg
      case "IN_PROGRESS":
        return props.theme.colors.warningBg
      case "NOT_STARTED":
        return props.theme.colors.infoBg
      case "FAILED":
        return props.theme.colors.dangerBg
      default:
        return props.theme.colors.mutedBg
    }
  }};
  color: ${(props) => {
    switch (props.status?.toUpperCase()) {
      case "COMPLETED":
        return props.theme.colors.success
      case "IN_PROGRESS":
        return props.theme.colors.warning
      case "NOT_STARTED":
        return props.theme.colors.info
      case "FAILED":
        return props.theme.colors.error
      default:
        return props.theme.colors.warning
    }
  }};
`

const Section = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
`

const SectionTitle = styled.h5`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th {
    background: ${({ theme }) => theme.colors.mutedBg};
    padding: 8px;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.background};
  }
`

const QCCheckList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const QCItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`

const QCCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${(props) => (props.checked ? props.theme.colors.success : props.theme.colors.mutedBg)};
  color: ${(props) => (props.checked ? "white" : props.theme.colors.border)};
  font-weight: bold;
  font-size: 0.8rem;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const StartButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
  }
`

const CompleteButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.success};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.successDark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.success}40;
  }
`

const FailButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.error};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.dangerDark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.danger}40;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
`

const LmsDashBoard = () => {
  const [samples, setSamples] = useState([])
  const [expandedSamples, setExpandedSamples] = useState({})
  const [loading, setLoading] = useState(true)
  const [remarksModal, setRemarksModal] = useState({
    isOpen: false,
    title: "",
    activity: null, // Changed from activityId to activity object
    action: null,
  })

  useEffect(() => {
    fetchSamples()
  }, [])

  const fetchSamples = async () => {
    try {
      setLoading(true)
      const response = await getusersampleevent()
      if (response) {
        // Transform the API data into the expected structure
        const transformedData = transformApiData(response.data)
        setSamples(transformedData)
      }
    } catch (error) {
      console.error("Error fetching samples:", error)
      toast.error("Failed to load samples")
    } finally {
      setLoading(false)
    }
  }

  // Transform API data to match component structure
  const transformApiData = (apiData) => {
    // Group activities by sample_item_id
    const samplesMap = {}
    
    apiData.forEach((activity) => {
      const sampleId = activity.sample_item_id
      
      if (!samplesMap[sampleId]) {
        samplesMap[sampleId] = {
          sample_id: sampleId,
          sample_name: activity.sample_name,
          collection_date: activity.start_date, // Using start_date as collection date
          status: getSampleStatus(activity.status),
          activities: []
        }
      }
      
      // Transform activity data - IMPORTANT: Preserve original QC structure for modal
      const transformedActivity = {
        activity_id: activity.id,
        activity_name: activity.activity_name,
        status: mapActivityStatus(activity.status),
        status_display: activity.status_display,
        event_items: activity.event_items?.map(item => ({
          item_id: item.id,
          item_name: item.item_name,
          system_quantity: item.sys_quantity,
          user_quantity: item.user_quantity,
          available_quantity: item.available_qty
        })) || [],
        // Preserve original QC structure for modal usage
        qc_checklist: activity.qc_check_list?.map(qc => ({
          qc_name: qc.qc_name, // Keep original name
          qc_type: qc.qc_type, // Keep original type
          qc_value: qc.qc_value, // Keep original value
          qc_actual: qc.qc_actual || "", // Keep original actual value
          item: qc.qc_name, // For display in checklist
          status: qc.qc_actual === "YES" // For checkbox display
        })) || [],
        remarks: activity.remarks,
        start_date: activity.start_date,
        end_date: activity.end_date,
        actual_start_date: activity.a_start_date,
        actual_end_date: activity.a_end_date,
        planned_duration: activity.planned_duration,
        srl_num: activity.srl_num,
        util_sample_qty: activity.util_sample_qty
      }
      
      samplesMap[sampleId].activities.push(transformedActivity)
    })
    
    // Sort activities by srl_num (sequence number)
    Object.values(samplesMap).forEach(sample => {
      sample.activities.sort((a, b) => a.srl_nSTARTEDum - b.srl_num)
    })
    
    return Object.values(samplesMap)
  }

  // Map API status to component status
  const mapActivityStatus = (apiStatus) => {
    const statusMap = {
      'N': 'NOT_STARTED',
      'Y': 'STARTED',
      'I': 'IN_PROGRESS',
      'C': 'COMPLETED',
      'F': 'FAILED'
    }
    return statusMap[apiStatus] || 'NOT_STARTED'
  }

  // Determine sample status based on its activities
  const getSampleStatus = (activityStatus) => {
    const statusMap = {
      'N': 'Not Started',
      'Y': 'In Progress',
      'C': 'Completed',
      'F': 'Failed'
    }
    return statusMap[activityStatus] || 'Not Started'
  }

  const toggleSample = (sampleId) => {
    setExpandedSamples((prev) => ({
      ...prev,
      [sampleId]: !prev[sampleId],
    }))
  }

  const handleActivityAction = (activity, action) => {
    const actionTitles = {
      START: "Start Activity",
      COMPLETED: "Complete Activity",
      FAILED: "Mark as Failed",
    }

    setRemarksModal({
      isOpen: true,
      title: actionTitles[action] || "Activity Action",
      activity: activity, // Pass the entire activity object
      action: action,
    })
  }

  const submitActivityAction = async (formData) => {
    try {
      // The formData already contains all necessary fields from the modal
      // You might need to extract values or use it directly based on your API
      const response = await processsampleevt(formData)
      if (response.success) {
        toast.success(`Activity ${remarksModal.action.toLowerCase()} successfully!`)
        setRemarksModal({ 
          isOpen: false, 
          title: "", 
          activity: null, 
          action: null 
        })
        fetchSamples() // Refresh data
      }
    } catch (error) {
      console.error("Error processing activity:", error)
      toast.error(error.error || "Failed to process activity")
    }
  }

  if (loading) {
    return (
      <Layout title="Sample Dashboard">
        <LoadingContainer>Loading samples...</LoadingContainer>
      </Layout>
    )
  }

  return (
    <Layout title="Sample Dashboard">
      <Container>
        <SampleList>
          {samples.length === 0 ? (
            <LoadingContainer>No samples available</LoadingContainer>
          ) : (
            samples.map((sample) => (
              <SampleCard key={sample.sample_id}>
                <SampleHeader
                  onClick={() => toggleSample(sample.sample_id)}
                  expanded={expandedSamples[sample.sample_id]}
                >
                  <SampleInfo>
                    <SampleName>{sample.sample_name} <StatusBadge status={sample.status}>{sample.status}</StatusBadge></SampleName>
                    <SampleMeta>
                      <span>ID: {sample.sample_id}</span>
                      <span>Collected: {sample.collection_date}</span>
                    </SampleMeta>
                  </SampleInfo>
                  <ExpandIcon expanded={expandedSamples[sample.sample_id]}>
                    {expandedSamples[sample.sample_id] ? <FaChevronUp /> : <FaChevronDown />}
                  </ExpandIcon>
                </SampleHeader>

                {expandedSamples[sample.sample_id] && (
                  <SampleBody>
                    <ActivitiesList>
                      {sample.activities.map((activity) => (
                        <ActivityCard key={activity.activity_id}>
                          <ActivityHeader>
                            <ActivityName>{activity.activity_name}</ActivityName>
                            <ActivityStatus status={activity.status}>
                              {activity.status_display}
                            </ActivityStatus>
                            <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: 'auto' }}>
                              Seq: {activity.srl_num} | Duration: {activity.planned_duration} days
                            </div>
                          </ActivityHeader>
                          
                          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                            <span>Planned: {activity.start_date} to {activity.end_date}</span>
                            {activity.actual_start_date && (
                              <span style={{ marginLeft: '1rem' }}>
                                Actual: {activity.actual_start_date} 
                                {activity.actual_end_date && ` to ${activity.actual_end_date}`}
                              </span>
                            )}
                          </div>

                          {activity.event_items && activity.event_items.length > 0 && (
                            <Section>
                              <SectionTitle>
                                <FaBoxes /> Inventory Items
                              </SectionTitle>
                              <InventoryTable>
                                <thead>
                                  <tr>
                                    <th>Item Name</th>
                                    <th>System Qty</th>
                                    <th>User Qty</th>
                                    <th>Available Qty</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {activity.event_items.map((item) => (
                                    <tr key={item.item_id}>
                                      <td>{item.item_name}</td>
                                      <td>{item.system_quantity}</td>
                                      <td>{item.user_quantity}</td>
                                      <td>{item.available_quantity}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </InventoryTable>
                            </Section>
                          )}

                          {activity.qc_checklist && activity.qc_checklist.length > 0 && (
                            <Section>
                              <SectionTitle>
                                <FaClipboardList /> QC Checklist
                              </SectionTitle>
                              <QCCheckList>
                                {activity.qc_checklist.map((item, index) => (
                                  <QCItem key={index}>
                                    <QCCheckbox checked={item.status}>
                                      {item.status ? "✓" : "-"}
                                    </QCCheckbox>
                                    <span>{item.item}</span>
                                  </QCItem>
                                ))}
                              </QCCheckList>
                            </Section>
                          )}

                          {activity.remarks && activity.remarks.trim() && (
                            <Section>
                              <SectionTitle>Remarks</SectionTitle>
                              <div style={{ fontSize: "0.9rem", color: "#666", fontStyle: "italic" }}>
                                {activity.remarks}
                              </div>
                            </Section>
                          )}

                          {activity.util_sample_qty && parseFloat(activity.util_sample_qty) > 0 && (
                            <Section>
                              <SectionTitle>Sample Usage</SectionTitle>
                              <div style={{ fontSize: "0.9rem", color: "#666" }}>
                                Utilized Sample Quantity: {activity.util_sample_qty}
                              </div>
                            </Section>
                          )}

                          <ActionButtons>
                            {activity.status === "NOT_STARTED" && (
                              <StartButton onClick={() => handleActivityAction(activity, "START")}>
                                <FaPlay /> Start Activity
                              </StartButton>
                            )}

                            {(activity.status === "IN_PROGRESS" || activity.status === "STARTED") && (
                              <>
                                <CompleteButton onClick={() => handleActivityAction(activity, "COMPLETED")}>
                                  <FaCheckCircle /> Complete Activity
                                </CompleteButton>
                                <FailButton onClick={() => handleActivityAction(activity, "FAILED")}>
                                  <FaTimesCircle /> Mark as Failed
                                </FailButton>
                              </>
                            )}

                            {activity.status === "COMPLETED" && (
                              <span style={{ color: "#22c55e", fontWeight: 600 }}>
                                <FaCheckCircle /> Completed
                              </span>
                            )}

                            {activity.status === "FAILED" && (
                              <span style={{ color: "#ef4444", fontWeight: 600 }}>
                                <FaTimesCircle /> Failed
                              </span>
                            )}
                          </ActionButtons>
                        </ActivityCard>
                      ))}
                    </ActivitiesList>
                  </SampleBody>
                )}
              </SampleCard>
            ))
          )}
        </SampleList>
      </Container>

      <RemarksModal
        isOpen={remarksModal.isOpen}
        title={remarksModal.title}
        actionType={remarksModal.action}
        activity={remarksModal.activity}
        onSubmit={submitActivityAction} // or use submitActivityActionAlternative
        onClose={() => setRemarksModal({ 
          isOpen: false, 
          title: "", 
          activity: null, 
          action: null 
        })}
      />
    </Layout>
  )
}

export default LmsDashBoard


