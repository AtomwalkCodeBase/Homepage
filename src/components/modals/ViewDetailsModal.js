"use client"
import styled from "styled-components"
import { FaTimes, FaCheckCircle, FaClock, FaTimesCircle, FaBoxes } from "react-icons/fa"

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

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.card};
`

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SampleHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  padding: 20px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`

const HeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const HeaderLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const HeaderValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const EventCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-left: 4px solid ${({ status, theme }) => {
        switch (status) {
            case "S":
                return theme.colors.success
            case "N":
                return theme.colors.warning
            case "I":
                return theme.colors.info
            case "F":
                return theme.colors.error
            default:
                return theme.colors.border
        }
    }};
  border-radius: 8px;
  padding: 16px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 12px;
  margin-bottom: 12px;
`

const EventTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
`

const StatusBadge = styled.span`
  background: ${({ status, theme }) => {
        switch (status) {
            case "S":
                return theme.colors.success
            case "N":
                return theme.colors.warning
            case "I":
                return theme.colors.info
            case "F":
                return theme.colors.error
            default:
                return theme.colors.border
        }
    }};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`

const EventDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }

  span {
    color: ${({ theme }) => theme.colors.textLight};
  }
`

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 12px 0;

  thead {
    background: ${({ theme }) => theme.colors.border};
  }

  th {
    padding: 10px;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

const QCChecklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
`

const QCItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const QCIcon = styled.div`
  color: ${({ status }) => (status ? "#10B981" : "#EF4444")};
  font-size: 16px;
  display: flex;
  align-items: center;
`

const RemarksBox = styled.div`
  background: #FFF8E1;
  border-left: 4px solid #FFC107;
  padding: 12px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: #F57F17;
  }
`

const ViewDetailsModal = ({ sample, isOpen, onClose }) => {
    if (!isOpen || !sample) return null

    const getStatusIcon = (status) => {
        switch (status) {
            case "S":
                return <FaCheckCircle />
            case "N":
                return <FaClock />
            case "I":
                return <FaClock />
            case "F":
                return <FaTimesCircle />
            default:
                return null
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "S":
                return "Completed"
            case "N":
                return "Not Started"
            case "I":
                return "In Progress"
            case "F":
                return "Failed"
            default:
                return "Not Assigned"
        }
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Sample Details</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    {/* Sample Header */}
                    <SampleHeader>
                        <HeaderItem>
                            <HeaderLabel>Sample ID</HeaderLabel>
                            <HeaderValue>{sample.s_item_id}</HeaderValue>
                        </HeaderItem>
                        <HeaderItem>
                            <HeaderLabel>Customer</HeaderLabel>
                            <HeaderValue>{sample.customer_name.substring(0, 30)}</HeaderValue>
                        </HeaderItem>
                        <HeaderItem>
                            <HeaderLabel>Batch Number</HeaderLabel>
                            <HeaderValue>{sample.batch_no}</HeaderValue>
                        </HeaderItem>
                        <HeaderItem>
                            <HeaderLabel>Quantity</HeaderLabel>
                            <HeaderValue>{sample.no_of_qty}</HeaderValue>
                        </HeaderItem>
                    </SampleHeader>

                    {/* Events Section */}
                    {sample.event_list && sample.event_list.length > 0 && (
                        <>
                            <SectionTitle>
                                <FaBoxes style={{ marginRight: "8px" }} />
                                Activities & Events
                            </SectionTitle>
                            <EventContainer>
                                {sample.event_list.map((event, index) => (
                                    <EventCard key={event.id || index} status={event.status}>
                                        <EventHeader>
                                            <EventTitle>
                                                {index + 1}. {event.activity_name}
                                            </EventTitle>
                                            <StatusBadge status={event.status}>
                                                {getStatusIcon(event.status)}
                                                {getStatusText(event.status)}
                                            </StatusBadge>
                                        </EventHeader>

                                        <EventDetails>
                                            <DetailItem>
                                                <strong>Planned Duration:</strong>
                                                <span>{event.planned_duration} days</span>
                                            </DetailItem>
                                            <DetailItem>
                                                <strong>Start Date:</strong>
                                                <span>{event.start_date || "N/A"}</span>
                                            </DetailItem>
                                            <DetailItem>
                                                <strong>End Date:</strong>
                                                <span>{event.end_date || "N/A"}</span>
                                            </DetailItem>
                                            <DetailItem>
                                                <strong>Actual Start:</strong>
                                                <span>{event.a_start_date || "Not started"}</span>
                                            </DetailItem>
                                            <DetailItem>
                                                <strong>Quantity Used:</strong>
                                                <span>{event.util_sample_qty || "0"}</span>
                                            </DetailItem>
                                        </EventDetails>

                                        {/* Inventory Items */}
                                        {event.event_items && event.event_items.length > 0 && (
                                            <div>
                                                <strong style={{ fontSize: "12px", color: "#666" }}>Inventory Items:</strong>
                                                <InventoryTable>
                                                    <thead>
                                                        <tr>
                                                            <th>Item Name</th>
                                                            <th>Item No.</th>
                                                            <th>Sys Qty</th>
                                                            <th>User Qty</th>
                                                            {/* <th>Available</th>
                                                            <th>Flow Type</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {event.event_items.map((item, idx) => (
                                                            <tr key={item.id || idx}>
                                                                <td>{item.item_name}</td>
                                                                <td>{item.item_number}</td>
                                                                <td>{item.sys_quantity}</td>
                                                                <td>{item.user_quantity}</td>
                                                                {/* <td>{item.available_qty}</td>
                                                                <td>{item.flow_type}</td> */}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </InventoryTable>
                                            </div>
                                        )}

                                        {/* QC Checklist */}
                                        {event.qc_check_list && event.qc_check_list.length > 0 && (
                                            <div>
                                                <strong style={{ fontSize: "12px", color: "#666" }}>QC Checklist:</strong>
                                                <QCChecklist>
                                                    {event.qc_check_list.map((qc, idx) => (
                                                        <QCItem key={idx}>
                                                            <QCIcon status={qc.qc_actual === "YES" || qc.qc_actual === "YES"}>
                                                                {qc.qc_actual === "YES" ? <FaCheckCircle /> : <FaClock />}
                                                            </QCIcon>
                                                            <span>
                                                                <strong>{qc.qc_name}</strong> ({qc.qc_type})
                                                            </span>
                                                        </QCItem>
                                                    ))}
                                                </QCChecklist>
                                            </div>
                                        )}

                                        {/* Remarks */}
                                        {event.remarks && (
                                            <RemarksBox>
                                                <strong>Remarks:</strong> {event.remarks}
                                            </RemarksBox>
                                        )}
                                    </EventCard>
                                ))}
                            </EventContainer>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    )
}

export default ViewDetailsModal
