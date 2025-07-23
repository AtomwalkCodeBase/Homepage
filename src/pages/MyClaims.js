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
  FaChevronDown,
  FaChevronRight,
  FaPaperPlane,
  FaTrash,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import { RiShareForward2Line } from "react-icons/ri";
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getEmpClaim, getExpenseItem, getExpenseProjectList, postClaimAction, validateClaimItem } from "../services/productServices"
import ClaimModal from "../components/modals/ClaimModal"
import ClaimActionModal from "../components/modals/ClaimActionModal"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"
import { useExport } from "../context/ExportContext"
import ConfirmationPopup from "../components/modals/ConfirmationPopup"

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
  /* justify-content: space-between; */
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
  max-width: 1000px;
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

const ExpandableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`

const ClaimItemsTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  
  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  th {
    background-color: ${({ theme }) => theme.colors.background};
    font-weight: 600;
  }
`

const ClaimItemRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.background}22;
`

const MyClaims = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isOpen, setIsOpen] = useState(false)
  const [claims, setClaims] = useState([])
  const [empClaims, setEmpClaims] = useState([])
  const empId = localStorage.getItem("empNoId")
  const EmpId = localStorage.getItem("empId")
  const [dropdownValue, setDropdownValue] = useState("All Types")
  const [projecttype, setProjecttype] = useState("All Types")
  const [isLoadings, setIsLoadings] = useState(1)
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [timeFilter, setTimeFilter] = useState("All Time")
  const [filteredClaims, setFilteredClaims] = useState([])
  const [expandedClaims, setExpandedClaims] = useState(new Set())
  const { profile } = useAuth()
  const { exportClaimsData } = useExport()
  const [deleteopen , setDeleteopen] = useState(false)
  const [masterClaimIds, setMasterClaimIds] = useState({masterClaimId: null,
    id: null,
  })
  const [claimupdate, setClaimupdate] = useState(null)

  // Claim Action Modal State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState("")
  const [selectedClaimForAction, setSelectedClaimForAction] = useState(null)
  const [selectedClaimForEdit, setSelectedClaimForEdit] = useState(null)
  const [masterClaimId, setMasterClaimId] = useState(null)
  const [validationResponse, setValidationResponse] = useState([]);
  const [isApproveAllPopupOpen, setIsApproveAllPopupOpen] = useState(false);
  const [approveAllClaim, setApproveAllClaim] = useState(null);

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
    setClaimupdate(null)
    setIsOpen(false)
    setSelectedClaimForEdit(null)
  }

  const handleConfirm = (claim) => {
    setIsOpen(true)
    setMasterClaimId(claim.master_claim_id? claim.master_claim_id : null)
    setClaimupdate(claim)
  }
  const handeleDelete = (claim,id) => {
    setDeleteopen(true)
    setMasterClaimIds({
      masterClaimIds: claim.master_claim_id, // Use the selected master claim ID
      id: id, // Use the selected claim ID
    })
  }
    const handeleDeleteclose = () => {
    setDeleteopen(false)
  }
  const handeleconform=()=>{
    handlesubmitall(masterClaimIds.masterClaimId,masterClaimIds.id)
    setDeleteopen(false)
  }
 const handlesubmitall = (claim,id) => {
  if(id){
      const claimPayload = {
    claim_id: id, // item claim ID
    call_mode: "DELETE",
  };
   postClaimAction(claimPayload).then((res) => {
    toast.success("claims Delete successfully")
    setIsLoadings(isLoadings+1)
      })
      .catch((err) =>  toast.error("Failed to Delete  claim"))
  }
  else{ const claimPayload = {
    m_claim_id: claim.master_claim_id, // Use the selected master claim ID
    call_mode: "SUBMIT_ALL",
  };
   postClaimAction(claimPayload).then((res) => {
    toast.success("All claims submitted successfully")
    setIsLoadings(isLoadings+1)
      })
      .catch((err) =>  toast.error("Failed to submit all claims"))
  }
  }
 
  const fetchClaimDetails = () => {
    getEmpClaim("GET", empId)
      .then((res) => {
        // Filter out claims with empty claim_items
        const validClaims = res.data.filter((claim) => claim.claim_items && claim.claim_items.length > 0)
        setClaims(validClaims)
      })
      .catch((err) => {
        console.log("Error fetching claim data:", err)
      })
  }

  const fetchClaimDetailsofemp = () => {
    getEmpClaim("APPROVE", empId)
      .then((res) => {
        if (!res.data) return;

        // Filter claims based on the active tab
        if (activeTab === "empdata") {
          const validClaims = res.data.filter(
            (claim) =>
              claim.claim_items && claim.claim_items.length > 0 && !claim.is_approved && (claim.expense_status === "S" || claim.expense_status === "F")
          );
          setEmpClaims(validClaims);
        } else if (activeTab === "empApprovedData") {
          const validClaims = res.data.filter(
            (claim) =>
              claim.claim_items && claim.claim_items.length > 0 &&claim.expense_status === "A"
          );
          setEmpClaims(validClaims);
        }
      })
      .catch((err) => {
        console.log("Error fetching claim data:", err);
      });
  };

  const validApproveClaim = async (masterClaimId) => {
    const validationData = {
      emp_id: EmpId,
      m_claim_id: masterClaimId
    };
    console.log("validationData", validationData)
    try {
      const validationResponse = await validateClaimItem(validationData);
      setValidationResponse(validationResponse.data)
       console.log("validationResponse",validationResponse.data);
    } catch (error) {
      console.log("Error validating claim data:", error);
    }
  };

  useEffect(() => {
      fetchClaimDetailsofemp();
  }, [activeTab]);

  useEffect(() => {
    fetchClaimItemList()
    fetchClaimDetails()
    fetchProjectList()
    // fetchClaimDetailsofemp()
    validApproveClaim()
  }, [isLoadings])

  useEffect(() => {
    if (claims.length > 0) {
      let filtered = claims.filter((claim) => {
        if (activeTab === "all") return true
        if (activeTab === "pending") return !claim.is_approved && claim.expense_status === "S"
        if (activeTab === "approved") return claim.expense_status === "A"
        if (activeTab === "rejected") return claim.expense_status === "R"
        if (activeTab === "unsubmitted") return claim.expense_status === "N"
        return true
      })

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
            const claimDate = getDateFromString(claim.claim_date)
            if (!claimDate) return false
            return claimDate.getMonth() === today.getMonth() && claimDate.getFullYear() === today.getFullYear()
          })
        }
      }

      setFilteredClaims(filtered)
    }
  }, [claims, activeTab, typeFilter, timeFilter])

  const handleFilter = () => {
    toast.info("Filters applied")
  }

  // Calculate summary data based on actual claims
  const totalAmount = claims.reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt || 0), 0)
  const approvedAmount = claims
    .filter((claim) => claim.expense_status === "A")
    .reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt || 0), 0)
  const pendingAmount = claims
    .filter((claim) => !claim.is_approved && claim.expense_status === "S")
    .reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt || 0), 0)
  const rejectedAmount = claims
    .filter((claim) => claim.expense_status === "R")
    .reduce((sum, claim) => sum + Number.parseFloat(claim.expense_amt || 0), 0)

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
      case "Outstation Travel Exp.":
      case "City Travel Expense":
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
      return { text: "Not Submitted", variant: "info" }
    }
    if (claim.expense_status === "F") {
      return { text: "Forwarded", variant: "error" }
    }

    return { text: "Submitted", variant: "warning" }
  }

  // Find the validation entry for this claimId
  const isFinalApproval = (claimId) => {
    const entry = validationResponse.find(v => v.claim_id === claimId);
    return entry && entry.approval_type === "F";
  };

  const allItemsFinalApproval = (claim) => {
    // If every claim item has approve_type "F" in validationResponse, return true
    return claim.claim_items.every(item => {
      const validation = validationResponse.find(v => v.claim_id === item.claim_id);
      return validation && validation.approval_type === "F";
    });
  };

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailModalOpen(false)
    setSelectedClaim(null)
  }

  const toggleClaimExpansion = (claimId, claim) => {
    const newExpanded = new Set(expandedClaims);
    const isExpanding = !newExpanded.has(claimId);
    if (newExpanded.has(claimId)) {
      newExpanded.delete(claimId);
    } else {
      newExpanded.add(claimId);
      if (activeTab === "empdata" && isExpanding && claim?.master_claim_id) {
        validApproveClaim(claim.master_claim_id);
        console.log("claim master id", claim.master_claim_id)
      }
    }
    setExpandedClaims(newExpanded);
  };

  // Claim Action Handlers
  const handleApprove = (claim, masterId) => {
    setMasterClaimId(masterId?.master_claim_id)
    setSelectedClaimForAction(claim)
    setActionType("APPROVE")
    setIsActionModalOpen(true)
  }

  const handleReject = (claim, masterId) => {
    setMasterClaimId(masterId?.master_claim_id)
    setSelectedClaimForAction(claim)
    setActionType("REJECT")
    setIsActionModalOpen(true)
  }

  const handleForward = (claim, masterId) => {
    setMasterClaimId(masterId?.master_claim_id)
    setSelectedClaimForAction(claim)
    setActionType("FORWARD")
    setIsActionModalOpen(true)
  }
  
  const handleApproveAll = (remark) => {
    if (!approveAllClaim) return;
    const claimPayload = {
      m_claim_id: approveAllClaim.master_claim_id,
      remarks: remark,
      call_mode: 'APPROVE_CLAIM',
      claim_list: approveAllClaim.claim_items
        .map(item => {
          const validation = validationResponse.find(v => v.claim_id === item.claim_id);
          return {
            claim_id: item.claim_id,
            approve_type: validation ? validation.approval_type : 'A',
            approved_amt: item.expense_amt,
            remarks: item.remarks || ''
          };
        })
        .filter(item => item.approve_type === 'A')
    };
    console.log("Approve all claims:", claimPayload)
      
   postClaimAction(claimPayload)
    .then((res) => {
      toast.success("Claims approved successfully");
      setIsLoadings(isLoadings + 1);
    })
    .catch((err) => toast.error("Failed to approve claims"));
  setIsApproveAllPopupOpen(false);
  setApproveAllClaim(null);
  }

  const handleCloseActionModal = () => {
    setIsActionModalOpen(false)
    setSelectedClaimForAction(null)
    setActionType("")
  }

  const handleActionSuccess = () => {
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
            All Claims
          </Tab>
          <Tab active={activeTab === "approved"} onClick={() => setActiveTab("approved")}>
            Approved
          </Tab>
          <Tab active={activeTab === "pending"} onClick={() => setActiveTab("pending")}>
            Pending
          </Tab>
          <Tab active={activeTab === "rejected"} onClick={() => setActiveTab("rejected")}>
            Rejected
          </Tab>
          <Tab active={activeTab === "unsubmitted"} onClick={() => setActiveTab("unsubmitted")}>
            Not Submitted
          </Tab>
          {profile?.is_manager && (
            <Tab active={activeTab === "empdata"} onClick={() => setActiveTab("empdata")}>
              Employee Claims
            </Tab>
          )}
          {profile?.is_manager && (
            <Tab active={activeTab === "empApprovedData"} onClick={() => setActiveTab("empApprovedData")}>
              Employee Approved Claims
            </Tab>
          )}
        </TabContainer>

        <FilterContainer>
          <FilterSelect value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option>All Time</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </FilterSelect>

          <Button variant="outline" size="sm" onClick={handleFilter}>
            <FaFilter /> Filter
          </Button>
        </FilterContainer>

        <TableContainer>
          {(activeTab === "empdata" || activeTab === "empApprovedData") ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Master Claim ID</th>
                  <th>Employee Name</th>
                  <th>Total Amount</th>
                  <th>Claim Date</th>
                  <th>Items Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {empClaims.length > 0 ? (
                  empClaims.map((claim) => {
                    const statusInfo = getStatusInfo(claim)
                    const isExpanded = expandedClaims.has(claim.id)

                    return (
                      <>
                        <ExpandableRow key={claim.id}>
                          <td>
                            <Button variant="ghost" size="sm" onClick={() => toggleClaimExpansion(claim.id, claim)}>
                              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                            </Button>
                          </td>
                          <td>{claim.master_claim_id}</td>
                          <td>{claim.employee_name}</td>
                          <td>₹{claim.expense_amt}</td>
                          <td>{claim.claim_date}</td>
                          <td>{claim.claim_items?.length || 0}</td>
                          <td>
                            <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                          </td>
                          <td>
                            <ActionButtons>
                              <Button onClick={() => handleViewDetails(claim)} variant="ghost" size="sm" title="View">
                                <FaEye />
                              </Button>
                              {/* {statusInfo.text !== "Approved" && statusInfo.text !== "Rejected" && (
                                <>
                                  <Button
                                    onClick={() => handleApprove(claim)}
                                    variant="primary"
                                    size="sm"
                                    title="Approve"
                                  >
                                    <FaCheck />
                                  </Button>
                                  <Button
                                    onClick={() => handleReject(claim)}
                                    variant="outline"
                                    size="sm"
                                    title="Reject"
                                  >
                                    <FaBan />
                                  </Button>
                                </>
                              )} */}
                            </ActionButtons>
                          </td>
                        </ExpandableRow>
                        {isExpanded && (
                          <tr>
                            <td colSpan={8}>
                              <ClaimItemsTable>
                                <thead>
                                  <tr>
                                    <th>Item Name</th>
                                    <th>Project</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    {/* <th>Remarks</th> */}
                                    <th>Receipt</th>
                                    <th>Status</th>
                                    <th>Actions</th>  
                                  </tr>
                                </thead>
                                <tbody>
                                  {claim.claim_items?.map((item) => {
                                    const subStatus = getStatusInfo(item)

                                    return (
                                      <ClaimItemRow key={item.id}>
                                        <td>
                                          <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginRight: "0.5rem" }}>{getItemIcon(item.item_name)}</span>
                                          {item.item_name}
                                        </div>
                                      </td>
                                      <td>{item.project_name || "N/A"}</td>
                                      <td>₹{item.expense_amt}</td>
                                      <td>{item.expense_date}</td>
                                      {/* <td>{item.remarks}</td> */}
                                      <td>
                                        {item.submitted_file_1 ? (
                                          <Badge variant="success">Yes</Badge>
                                        ) : (
                                          <Badge variant="error">No</Badge>
                                        )}
                                      </td>
                                      <td>
                                        <Badge variant={subStatus.variant}>{subStatus.text}</Badge>
                                      </td>
                                      <td>
                               <ActionButtons>
                              {!isFinalApproval(item.claim_id) && subStatus.text !== "Approved" && subStatus.text !== "Rejected" ?
                                <>
                                  <Button
                                    onClick={() => handleApprove(item, claim)}
                                    variant="primary"
                                    size="sm"
                                    title="Approve"
                                  >
                                    <FaCheck />
                                  </Button>
                                  <Button
                                    onClick={() => handleReject(item, claim)}
                                    variant="outline"
                                    size="sm"
                                    title="Reject"
                                  >
                                    <FaBan />
                                  </Button>
                                  <Button
                                    onClick={() => handleForward(item, claim)}
                                    variant="outline"
                                    size="sm"
                                    title="Forward"
                                  >
                                    <RiShareForward2Line />
                                  </Button>
                                </>
                            :isFinalApproval(item.claim_id)&&     <Button
                                    onClick={() => handleForward(item, claim)}
                                    variant="primary"
                                    size="sm"
                                    title="Forward"
                                  >
                                    <RiShareForward2Line />
                                  </Button> }
                            </ActionButtons>
                                      </td>
                                    </ClaimItemRow>
                              )})}
                                </tbody>
                                  {!allItemsFinalApproval(claim) && statusInfo.text === "Submitted" && (
                                  <TableActions style={{margin:"1rem"}}>
                                    <Button onClick={() => { 
                                      setApproveAllClaim(claim); 
                                      setIsApproveAllPopupOpen(true)}} 
                                      variant="primary" size="sm">
                                      <FaCheckCircle style={{ marginRight: 4 }} /> Approve All Claims
                                    </Button>
                                  </TableActions>)}
                              </ClaimItemsTable>
                            </td>
                          </tr>
                        )}
                      </>
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
                  <th></th>
                  <th>Claim ID</th>
                  <th>Total Amount</th>
                  <th>Claim Date</th>
                  <th>Items Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((claim) => {
                    const statusInfo = getStatusInfo(claim)
                    const isExpanded = expandedClaims.has(claim.id)
                    return (
                      <>
                        <ExpandableRow key={claim.id}>
                          <td>
                            <Button variant="ghost" size="sm" onClick={() => toggleClaimExpansion(claim.id)}>
                              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                            </Button>
                          </td>
                          <td>{claim.master_claim_id}</td>
                          <td>₹{claim.expense_amt}</td>
                          <td>{claim.claim_date}</td>
                          <td>{claim.claim_items?.length || 0}</td>
                          <td>
                            <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                          </td>
                          <td>
                            <ActionButtons>
                               <Button onClick={() => handleViewDetails(claim)} variant="ghost" size="sm" title="View">
                                <FaEye />
                              </Button>
                                  {/* <Button
                                    onClick={()=>toggleClaimExpansion(claim.id)}
                                    variant="primary"
                                    size="sm"
                                    title="See Details"
                                  >
                                    <FaEdit/>
                                  </Button> */}
                            
                            </ActionButtons>
                          </td>
                        </ExpandableRow>
                        {isExpanded && (
                          <tr>
                            <td colSpan={7}>
                              <ClaimItemsTable>
                                <thead>
                                  <tr>
                                    <th>Item Name</th>
                                    <th>Project</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    {/* <th>Remarks</th> */}
                                    <th>Status</th>
                                    <th>Receipt</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {claim.claim_items?.map((item) => {
                                    const substatus = getStatusInfo(item)
                                    return (
                                      <ClaimItemRow key={item.id}>
                                        <td>
                                          <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginRight: "0.5rem" }}>{getItemIcon(item.item_name)}</span>
                                            {item.item_name}
                                          </div>
                                        </td>
                                        <td>{item.project_name || "N/A"}</td>
                                        <td>₹{item.expense_amt}</td>
                                        <td>{item.expense_date}</td>
                                        {/* <td>{item.remarks}</td> */}
                                        <td>
                                          <Badge variant={substatus.variant}>{substatus.text}</Badge>
                                        </td>
                                        <td>
                                          {item.submitted_file_1 ? (
                                             <a href={item.submitted_file_1} target="_blank" rel="noopener noreferrer">
                                            <Badge variant="success">Yes</Badge>
                                            </a>
                                          ) : (
                                            <Badge variant="error">No</Badge>
                                          )}
                                        </td>
                                        <td>
                                <ActionButtons>
                              {substatus.text === "Not Submitted" && (
                                <>
                                  <Button
                                    onClick={() => handeleDelete(claim,item.id)}
                                    variant="primary"
                                    size="sm"
                                    title="Delete claim"
                                  >
                                    <FaTrash />
                                  </Button>
                                  <Button
                                    onClick={()=>handleConfirm(item)}
                                    variant="primary"
                                    size="sm"
                                    title="Update claim"
                                  >
                                    <FaEdit />
                                  </Button>
                                </>
                              )}
                            </ActionButtons>
                                        </td>
                                      </ClaimItemRow>
                                    )
                                  })}
                                </tbody>
                                  {statusInfo.text === "Not Submitted" &&<TableActions style={{margin:"1rem"}}><Button onClick={()=>handleConfirm(claim)} variant="primary" size="sm">
                                        <FaPlus /> Add New Claim
                                      </Button>
                                       <Button variant="primary" size="sm" onClick={()=>handlesubmitall(claim)}>
                                                            <FaPaperPlane/> Submit All Claims
                                                          </Button>
                                      </TableActions>}
                              </ClaimItemsTable>
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                      No claims found for the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <TableActions style={{ float: "right", marginTop: "1rem" }}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleExport(activeTab === "empdata" ? empClaims : filteredClaims)}
            >
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
        editData={selectedClaimForEdit}
        masterClaimId={masterClaimId}
        claimupdate={claimupdate}
      />

      {/* Claim Action Modal */}
      <ClaimActionModal
        isOpen={isActionModalOpen}
        onClose={handleCloseActionModal}
        claim={selectedClaimForAction}
        masterClaimId={masterClaimId}
        validationResponse={validationResponse}
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

            <ModalTitle>Master Claim Details</ModalTitle>

            <ModalGrid>
              <div>
                <ModalSection>
                  <ModalLabel>Master Claim ID</ModalLabel>
                  <ModalValue>{selectedClaim.master_claim_id}</ModalValue>

                  <ModalLabel>Employee Name</ModalLabel>
                  <ModalValue>{selectedClaim.employee_name}</ModalValue>

                  <ModalLabel>Total Amount</ModalLabel>
                  <ModalValue>₹{selectedClaim.expense_amt}</ModalValue>

                  <ModalLabel>Claim Date</ModalLabel>
                  <ModalValue>{selectedClaim.claim_date}</ModalValue>
                </ModalSection>
              </div>

              <div>
                <ModalSection>
                  <ModalLabel>Status</ModalLabel>
                  <ModalValue>
                    <Badge variant={getStatusInfo(selectedClaim).variant}>{getStatusInfo(selectedClaim).text}</Badge>
                  </ModalValue>

                  <ModalLabel>Items Count</ModalLabel>
                  <ModalValue>{selectedClaim.claim_items?.length || 0}</ModalValue>

          {(() => {
              const statusText = getStatusInfo(selectedClaim).text;
              if (statusText === "Approved"||statusText === "Rejected"||statusText === "Forwarded" || statusText === "Submitted") {
                return (
              <>
                <ModalLabel>{statusText} {statusText === "Forwarded"? "To" : "By"}</ModalLabel>
                <ModalValue>{statusText === "Submitted" ? EmpId : selectedClaim.approved_by || "N/A"}</ModalValue>
              </>
                );
              }
              
            })()}
                  <ModalLabel>Approval Remarks</ModalLabel>
                  <ModalValue>{selectedClaim.approval_remarks || "N/A"}</ModalValue>
                </ModalSection>
              </div>
            </ModalGrid>

            <ModalSection>
              <ModalLabel>Claim Items</ModalLabel>
              <ClaimItemsTable>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Project</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Remarks</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedClaim.claim_items?.map((item) => {
                    const substatus = getStatusInfo(item)
                    return(
                    <ClaimItemRow key={item.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "0.5rem" }}>{getItemIcon(item.item_name)}</span>
                          {item.item_name}
                        </div>
                      </td>
                      <td>{item.project_name || "N/A"}</td>
                      <td>₹{item.expense_amt}</td>
                      <td>{item.expense_date}</td>
                      <td>{item.remarks}</td>
                      <td>
                        <Badge variant={substatus.variant}>{substatus.text}</Badge>
                      </td>
                      <td>
                        {item.submitted_file_1 ? (
                          <a href={item.submitted_file_1} target="_blank" rel="noopener noreferrer">
                            <Badge variant="success">View</Badge>
                          </a>
                        ) : (
                          <Badge variant="error">No</Badge>
                        )}
                      </td>
                    </ClaimItemRow>
                  )})}
                </tbody>
              </ClaimItemsTable>
            </ModalSection>
          </ModalContent>
        </DetailModal>
      )}
      <ConfirmationPopup isOpen={deleteopen} onClose={handeleDeleteclose} onConfirm={handeleconform} timesheet={true}></ConfirmationPopup>

      <ConfirmationPopup isOpen={isApproveAllPopupOpen} onClose={() => {setIsApproveAllPopupOpen(false); setApproveAllClaim(null);}} onConfirm={handleApproveAll} approve="APPROVE" timesheet={true}/>
    </Layout>
  )
}

export default MyClaims
