"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import {
  FaPlus,
  FaEye,
  FaFileUpload,
  FaFilter,
  FaMoneyBillWave,
  FaReceipt,
  FaCarAlt,
  FaUtensils,
  FaHotel,
  FaTimes,
  FaCheck,
  FaBan,
  FaFileExport,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getEmpClaim, getExpenseItem, getExpenseProjectList } from "../services/productServices"
import ClaimModal from "../components/modals/ClaimModal"
import ClaimActionModal from "../components/modals/ClaimActionModal"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"
import { useExport } from "../context/ExportContext"

const ClaimsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`

const TableContainer = styled.div`
  overflow-x: auto;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const SummaryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  ${(props) =>
    props.color === "primary" &&
    `
    background: ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primary};
  `}
  
  ${(props) =>
    props.color === "secondary" &&
    `
    background: ${props.theme.colors.secondaryLight};
    color: ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.color === "success" &&
    `
    background: ${props.theme.colors.success}22;
    color: ${props.theme.colors.success};
  `}
  
  ${(props) =>
    props.color === "warning" &&
    `
    background: ${props.theme.colors.warning}22;
    color: ${props.theme.colors.warning};
  `}
`
const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`
const SummaryValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1.5rem;
  overflow-x: auto;
`

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.text)};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const DetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  
  @keyframes fadeIn {
    from {
      transform: translateY(-30px) scale(0.97);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
`

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ModalSection = styled.div`
  margin-bottom: 1.5rem;
`

const ModalTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary || "#3a86ff"};
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary || "#3a86ff"};
    border-radius: 4px;
    margin-right: 12px;
  }
`

const ModalLabel = styled.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const ModalValue = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const ReceiptImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const MyClaims = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isOpen, setIsOpen] = useState(false)
  const [claims, setClaims] = useState([])
  const [empClaims, setEmpClaims] = useState([])
  const empId = localStorage.getItem("empNoId")
  const [dropdownValue, setDropdownValue] = useState("All Types")
  const [projecttype, setProjecttype] = useState("All Types")
  const [isLoadings, setIsLoadings] = useState(1)
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [timeFilter, setTimeFilter] = useState("All Time")
  const [filteredClaims, setFilteredClaims] = useState([])
  const { profile } = useAuth()
  const { exportClaimsData } = useExport()
  // Claim Action Modal States
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState("")
  const [selectedClaimForAction, setSelectedClaimForAction] = useState(null)

  const fetchProjectList = async () => {
    try {
      const response = await getExpenseProjectList()
      const data = response.data
      setProjecttype(data)
    } catch (error) {
      console.log("Error fetching project list:", error)
    }
  }

  const fetchClaimItemList = async () => {
    try {
      const response = await getExpenseItem()
      const data = response.data
      setDropdownValue(data)
    } catch (error) {
      console.log("Error fetching expense items:", error)
    }
  }

  const handleClosePopup = () => {
    setIsOpen(false)
  }

  const handleConfirm = () => {
    setIsOpen(true)
  }

  const fetchClaimDetails = () => {
    getEmpClaim("GET", empId)
      .then((res) => {
        setClaims(res.data)
      })
      .catch((err) => {
        console.log("Error fetching claim data:", err)
      })
  }

  const fetchClaimDetailsofemp = () => {
    getEmpClaim("APPROVE", empId)
      .then((res) => {
        setEmpClaims(res.data.filter((claim) => {
      return !claim.is_approved && claim.expense_status === "S"
      }))
      })
      .catch((err) => {
        console.log("Error fetching claim data:", err)
      })
  }

  useEffect(() => {
    fetchClaimItemList()
    fetchClaimDetails()
    fetchProjectList()
    fetchClaimDetailsofemp()
  }, [isLoadings])

  useEffect(() => {
    if (claims.length > 0) {
      let filtered = claims.filter((claim) => {
        if (activeTab === "all") return true
        if (activeTab === "pending") return !claim.is_approved && claim.expense_status === "S"
        if (activeTab === "approved") return claim.expense_status === "A"
        if (activeTab === "rejected") return claim.expense_status === "R"
        if (activeTab === "Unsubmitted") return claim.expense_status === "N"
        return true
      })

      if (typeFilter !== "All Types") {
        filtered = filtered.filter((claim) => claim.item_name === typeFilter)
      }

      if (timeFilter !== "All Time") {
        const today = new Date()
        const getDateFromString = (dateStr) => {
          if (!dateStr) return null
          const parts = dateStr.split("-")
          if (parts.length !== 3) return null
          return new Date(parts[2], parts[1] - 1, parts[0])
        }

        if (timeFilter === "This Month") {
          filtered = filtered.filter((claim) => {
            const claimDate = getDateFromString(claim.submitted_date)
            if (!claimDate) return false
            return claimDate.getMonth() === today.getMonth() && claimDate.getFullYear() === today.getFullYear()
          })
        } else if (timeFilter === "Last Month") {
          const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
          filtered = filtered.filter((claim) => {
            const claimDate = getDateFromString(claim.submitted_date)
            if (!claimDate) return false
            return claimDate.getMonth() === lastMonth.getMonth() && claimDate.getFullYear() === lastMonth.getFullYear()
          })
        } else if (timeFilter === "Last 3 Months") {
          const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
          filtered = filtered.filter((claim) => {
            const claimDate = getDateFromString(claim.submitted_date)
            if (!claimDate) return false
            return claimDate >= threeMonthsAgo
          })
        } else if (timeFilter === "This Year") {
          filtered = filtered.filter((claim) => {
            const claimDate = getDateFromString(claim.submitted_date)
            if (!claimDate) return false
            return claimDate.getFullYear() === today.getFullYear()
          })
        }
      }

      setFilteredClaims(filtered)
    }
  }, [claims, activeTab, typeFilter, timeFilter])

  const handleFilter = () => {
    toast.info("Filters applied")
  }

  const getUniqueItemTypes = () => {
    const uniqueTypes = new Set(claims.map((claim) => claim.item_name))
    return ["All Types", ...Array.from(uniqueTypes)]
  }

  // Calculate summary data based on actual claims
  const totalAmount = claims.reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt), 0)
  const approvedAmount = claims
    .filter((claim) => claim.expense_status === "A")
    .reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt), 0)
  const pendingAmount = claims
    .filter((claim) => !claim.is_approved && claim.expense_status === "S")
    .reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt), 0)
  const rejectedAmount = claims
    .filter((claim) => claim.expense_status === "R")
    .reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt), 0)

  const summaryData = [
    {
      icon: <FaMoneyBillWave />,
      value: `₹${totalAmount.toFixed(2)}`,
      label: "Total Claims",
      color: "primary",
    },
    {
      icon: <FaReceipt />,
      value: `₹${approvedAmount.toFixed(2)}`,
      label: "Approved Claims",
      color: "success",
    },
    {
      icon: <FaFileUpload />,
      value: `₹${pendingAmount.toFixed(2)}`,
      label: "Pending Claims",
      color: "warning",
    },
    {
      icon: <FaMoneyBillWave />,
      value: `₹${rejectedAmount.toFixed(2)}`,
      label: "Rejected Claims",
      color: "secondary",
    },
  ]

  const getItemIcon = (itemName) => {
    switch (itemName) {
      case "Travel Expense":
        return <FaCarAlt />
      case "Meal Expense":
        return <FaUtensils />
      case "Accommodation":
        return <FaHotel />
      default:
        return <FaReceipt />
    }
  }

  const getStatusInfo = (claim) => {
    if (claim.expense_status === "A") {
      return { text: "Approved", variant: "success" }
    }
    if (claim.expense_status === "R") {
      return { text: "Rejected", variant: "error" }
    }
    if (claim.expense_status === "N") {
      return { text: "unsubmitted", variant: "info" }
    }
    return { text: "Pending", variant: "warning" }
  }

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailModalOpen(false)
    setSelectedClaim(null)
  }

  // Claim Action Handlers
  const handleApprove = (claim) => {
    setSelectedClaimForAction(claim)
    setActionType("APPROVE")
    setIsActionModalOpen(true)
  }
const handeleDetele = (claim) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this claim?")
  if (confirmDelete) {
    // Implement delete logic here
    toast.success("Claim deleted successfully")
    // Refresh the claims data after deletion
    fetchClaimDetailsofemp()
}
}
  const handleReject = (claim) => {
    setSelectedClaimForAction(claim)
    setActionType("REJECT")
    setIsActionModalOpen(true)
  }

  const handleCloseActionModal = () => {
    setIsActionModalOpen(false)
    setSelectedClaimForAction(null)
    setActionType("")
  }

  const handleActionSuccess = () => {
    // Refresh the claims data after successful action
    fetchClaimDetailsofemp()
    setIsLoadings((prev) => prev + 1)
    handleCloseActionModal()
  }
      const handleExport = (data) => {
        const result = exportClaimsData(data, "Claim_data")
        if (result.success) {
        toast.success("Exported successfully")
        } else {
          toast.error("Export failed: " + result.message)
        }
      }
  return (
    <Layout title="My Claims">
      <ClaimsHeader>
        <div>
          <Paragraphdata>Manage your expense claims and reimbursements</Paragraphdata>
        </div>

        <Button onClick={handleConfirm} variant="primary">
          <FaPlus /> Add New Claim
        </Button>
      </ClaimsHeader>

      <SummaryGrid>
        {summaryData.map((item, index) => (
          <SummaryCard key={index}>
            <SummaryIcon color={item.color}>{item.icon}</SummaryIcon>
            <SummaryValue>{item.value}</SummaryValue>
            <SummaryLabel>{item.label}</SummaryLabel>
          </SummaryCard>
        ))}
      </SummaryGrid>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            MY Claims
          </Tab>
          <Tab active={activeTab === "pending"} onClick={() => setActiveTab("pending")}>
            Pending
          </Tab>
          <Tab active={activeTab === "approved"} onClick={() => setActiveTab("approved")}>
            Approved
          </Tab>
          <Tab active={activeTab === "rejected"} onClick={() => setActiveTab("rejected")}>
            Rejected
          </Tab>
           <Tab active={activeTab === "Unsubmitted"} onClick={() => setActiveTab("Unsubmitted")}>
            Unsubmitted
          </Tab>
          {profile.is_manager && <Tab active={activeTab === "empdata"} onClick={() => setActiveTab("empdata")}>
            Employee Claims
          </Tab>}
        </TabContainer>

        <FilterContainer>
          <FilterSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            {getUniqueItemTypes().map((type, index) => (
              <option key={index}>{type}</option>
            ))}
          </FilterSelect>

          {/* <FilterSelect value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option>All Time</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </FilterSelect> */}

          <Button variant="outline" size="sm" onClick={handleFilter}>
            <FaFilter /> Filter
          </Button>
        </FilterContainer>

        <TableContainer>
          {activeTab === "empdata" ? (
            <table>
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Expense Type</th>
                  <th>Amount</th>
                  <th>Expense Date</th>
                  <th>Submitted Date</th>
                  <th>Employee Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {empClaims.length > 0 ? (
                  empClaims.map((claim) => {
                    const statusInfo = getStatusInfo(claim)
                    return (
                      <tr key={claim.id}>
                        <td>{claim.claim_id}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>{getItemIcon(claim.item_name)}</span>
                            {claim.item_name}
                          </div>
                        </td>
                        <td>₹{claim.expense_amt}</td>
                        <td>{claim.expense_date}</td>
                        <td>{claim.submitted_date}</td>
                        <td>{claim.employee_name}</td>
                        <td>
                          <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                        </td>
                        <td>
                          <ActionButtons>
                            <Button onClick={() => handleViewDetails(claim)} variant="ghost" size="sm" title="View">
                              <FaEye />
                            </Button>
                            {statusInfo.text !== "Approved" && statusInfo.text !== "Rejected" && (
                              <>
                                <Button
                                  onClick={() => handleApprove(claim)}
                                  variant="primary"
                                  size="sm"
                                  title="Approve"
                                >
                                  <FaCheck />
                                </Button>
                                <Button onClick={() => handleReject(claim)} variant="outline" size="sm" title="Reject">
                                  <FaBan />
                                </Button>
                              </>
                            )}
                          </ActionButtons>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "1rem" }}>
                      No claims found for the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Expense Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Expense Date</th>
                  <th>Submitted Date</th>
                  <th>Receipt</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((claim) => {
                    const statusInfo = getStatusInfo(claim)
                    return (
                      <tr key={claim.id}>
                        <td>{claim.claim_id}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>{getItemIcon(claim.item_name)}</span>
                            {claim.item_name}
                          </div>
                        </td>
                        <td>{claim.remarks}</td>
                        <td>₹{claim.expense_amt}</td>
                        <td>{claim.expense_date}</td>
                        <td>{claim.submitted_date}</td>
                        <td>
                          {claim.submitted_file_1 ? (
                            <Badge variant="success">Yes</Badge>
                          ) : (
                            <Badge variant="error">No</Badge>
                          )}
                        </td>
                        <td>
                          <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                        </td>
                        <td>
                          <ActionButtons>
                            <Button onClick={() => handleViewDetails(claim)} variant="ghost" size="sm" title="View">
                              <FaEye />
                            </Button>
                             {activeTab === "Unsubmitted" &&<Button onClick={() => handeleDetele(claim)} variant="ghost" size="sm" title="Delete">
                              <FaTrash />
                            </Button>}
                          </ActionButtons>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                      No claims found for the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
            <TableActions style={{float:"right"}}> 
              {activeTab === "Unsubmitted"&&<Button variant="outline" size="sm" >
                        <FaPaperPlane style={{ marginRight: 4 }} /> Submit All Claims
                        </Button>}
          <Button variant="primary" size="sm" onClick={()=>handleExport(activeTab === "empdata" ? empClaims : filteredClaims)}>
           <FaFileExport /> Export
          </Button>
          </TableActions>
        </TableContainer>
      </Card>

      {/* Claim Submission Modal */}
      <ClaimModal
        isOpen={isOpen}
        onClose={handleClosePopup}
        onConfirm={handleConfirm}
        dropdownValue={dropdownValue}
        projecttype={projecttype}
        setIsLoadings={setIsLoadings}
        isLoadings={isLoadings}
      />

      {/* Claim Action Modal */}
      <ClaimActionModal
        isOpen={isActionModalOpen}
        onClose={handleCloseActionModal}
        claim={selectedClaimForAction}
        actionType={actionType}
        onSuccess={handleActionSuccess}
      />

      {/* Claim Details Modal */}
      {isDetailModalOpen && selectedClaim && (
        <DetailModal>
          <ModalContent>
            <CloseButton onClick={handleCloseDetails}>
              <FaTimes />
            </CloseButton>

            <ModalTitle>Claim Details</ModalTitle>

            <ModalGrid>
              <div>
                <ModalSection>
                  <ModalLabel>Claim ID</ModalLabel>
                  <ModalValue>{selectedClaim.claim_id}</ModalValue>

                  <ModalLabel>Expense Type</ModalLabel>
                  <ModalValue>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "0.5rem" }}>{getItemIcon(selectedClaim.item_name)}</span>
                      {selectedClaim.item_name}
                    </div>
                  </ModalValue>

                  <ModalLabel>Description</ModalLabel>
                  <ModalValue>{selectedClaim.remarks}</ModalValue>
                </ModalSection>

                <ModalSection>
                  <ModalLabel>Amount</ModalLabel>
                  <ModalValue>₹{selectedClaim.expense_amt}</ModalValue>

                  <ModalLabel>Expense Date</ModalLabel>
                  <ModalValue>{selectedClaim.expense_date}</ModalValue>

                  <ModalLabel>Submitted Date</ModalLabel>
                  <ModalValue>{selectedClaim.submitted_date}</ModalValue>
                </ModalSection>
              </div>

              <div>
                <ModalSection>
                  <ModalLabel>Status</ModalLabel>
                  <ModalValue>
                    <Badge variant={getStatusInfo(selectedClaim).variant}>{getStatusInfo(selectedClaim).text}</Badge>
                  </ModalValue>

                  <ModalLabel>Project</ModalLabel>
                  <ModalValue>{selectedClaim.project_name || "N/A"}</ModalValue>

                  <ModalLabel>Approver Notes</ModalLabel>
                  <ModalValue>{selectedClaim.approver_notes || "N/A"}</ModalValue>
                </ModalSection>

                <ModalSection>
                  <ModalLabel>Receipt</ModalLabel>
                  {selectedClaim.submitted_file_1 ? (
                    <ReceiptImage src={selectedClaim.submitted_file_1} alt="Receipt" width={400} height={300} />
                  ) : (
                    <ModalValue>No receipt attached</ModalValue>
                  )}
                </ModalSection>
              </div>
            </ModalGrid>
          </ModalContent>
        </DetailModal>
      )}
    </Layout>
  )
}

export default MyClaims
