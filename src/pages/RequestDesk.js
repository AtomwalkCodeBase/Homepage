"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTicketAlt, FaSearch, FaPlus, FaFilter, FaEye, FaLaptop, FaFileAlt } from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getEmployeeRequest, getRequestCategory } from "../services/productServices"
import { toast } from "react-toastify"
import RequestModal from "../components/modals/RequestModal"
import Modal from "../components/modals/Modal"

const RequestDeskHeader = styled.div`
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

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 0 1rem;
  
  svg {
    color: ${({ theme }) => theme.colors.textLight};
    margin-right: 0.5rem;
  }
  
  input {
    flex: 1;
    border: none;
    padding: 0.75rem 0;
    outline: none;
  }
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

const RequestTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const RequestTypeCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`
const RequestTypeTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const RequestDesk = () => {
  const [activeTab, setActiveTab] = useState("my-requests")
  const [searchTerm, setSearchTerm] = useState("")
  const [allRequests, setAllRequests] = useState([])
  const [requestTypes, setRequestTypes] = useState([])
  const [isModalOpens, setIsModalOpens] = useState(false)
  const [dropdownValue, setDropdownValue] = useState("")
  const emp_id = localStorage.getItem("empId")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pageref, setPageRef] = useState(1)
  // Add these state variables after the existing state declarations
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [filteredRequestsData, setFilteredRequestsData] = useState([])

  const handleSuccess = () => {
    setIsModalOpens(false)
    toast.success("Request submitted successfully!")
    setPageRef(pageref + 1)
  }
  useEffect(() => {
    fetchRequest()
    fetchRequestCategory()
  }, [pageref])

  const fetchRequestCategory = async () => {
    try {
      const res = await getRequestCategory()
      const filtered = res.data.filter((category) => category.request_type === "R")
      setRequestTypes(filtered)
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }
  const fetchRequest = async () => {
    try {
      const res = await getEmployeeRequest()
      setAllRequests(res.data)
    } catch (err) {
      console.log("Error fetching requests:", err)
    }
  }
  const myRequests = allRequests.filter((request) => request?.emp_id === emp_id && request?.request_type === "R")
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Get icon based on request sub type
  const getRequestIcon = (subType) => {
    switch (subType) {
      case "Asset Request":
        return <FaLaptop />
      case "Document Request":
        return <FaFileAlt />
      default:
        return <FaTicketAlt />
    }
  }

  // Get status info for badge
  const getStatusInfo = (request) => {
    switch (request.request_status) {
      case "S":
        return { text: "Submitted", variant: "warning" }
      case "A":
        return { text: "Assigned", variant: "info" }
      case "X":
        return { text: "Cancelled", variant: "error" }
      case "C":
        return { text: "Completed", variant: "success" }
      default:
        return { text: request.status_display, variant: "warning" }
    }
  }

  // Filter requests based on search term and active tab
  const filteredRequests = (activeTab === "my-requests" ? myRequests : allRequests).filter(
    (request) =>
      request.request_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.request_sub_type.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const openModal = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  // Add function to get unique request types
  const getUniqueRequestTypes = () => {
    const types = ["All Types"]
    allRequests.forEach((request) => {
      if (request.request_sub_type && !types.includes(request.request_sub_type)) {
        types.push(request.request_sub_type)
      }
    })
    return types
  }

  // Add function to get unique statuses
  const getUniqueStatuses = () => {
    const statuses = ["All Status"]
    allRequests.forEach((request) => {
      let status = ""
      switch (request.request_status) {
        case "S":
          status = "Submitted"
          break
        case "A":
          status = "Assigned"
          break
        case "X":
          status = "Cancelled"
          break
        case "C":
          status = "Completed"
          break
        default:
          status = request.status_display || "Unknown"
      }
      if (!statuses.includes(status)) {
        statuses.push(status)
      }
    })
    return statuses
  }

  // Add this useEffect to handle filtering
  useEffect(() => {
    const requests = activeTab === "my-requests" ? myRequests : allRequests

    let filtered = requests.filter(
      (request) =>
        request.request_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.request_sub_type.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Apply type filter
    if (typeFilter !== "All Types") {
      filtered = filtered.filter((request) => request.request_sub_type === typeFilter)
    }

    // Apply status filter
    if (statusFilter !== "All Status") {
      filtered = filtered.filter((request) => {
        let status = ""
        switch (request.request_status) {
          case "S":
            status = "Submitted"
            break
          case "A":
            status = "Assigned"
            break
          case "X":
            status = "Cancelled"
            break
          case "C":
            status = "Completed"
            break
          default:
            status = request.status_display || "Unknown"
        }
        return status === statusFilter
      })
    }

    setFilteredRequestsData(filtered)
  }, [myRequests, allRequests, activeTab, searchTerm, typeFilter, statusFilter])

  // Add handleFilter function
  const handleFilter = () => {
    // Filtering is already handled by the useEffect
    toast.info("Filters applied")
  }

  return (
    <Layout title="Resource Request Desk">
      <RequestDeskHeader>
        <div>
          <Paragraphdata>Submit and track your resource requests</Paragraphdata>
        </div>

        <Button onClick={() => setIsModalOpens(true)} variant="primary">
          <FaPlus /> New Request
        </Button>
      </RequestDeskHeader>

      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input type="text" placeholder="Search resource requests..." value={searchTerm} onChange={handleSearch} />
        </SearchInput>
      </SearchContainer>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "my-requests"} onClick={() => setActiveTab("my-requests")}>
            <FaTicketAlt style={{ marginRight: "0.5rem" }} />
            My Requests
          </Tab>
          <Tab active={activeTab === "new-request"} onClick={() => setActiveTab("new-request")}>
            <FaPlus style={{ marginRight: "0.5rem" }} />
            New Request
          </Tab>
          {/* For managers or admins */}
          <Tab active={activeTab === "all-requests"} onClick={() => setActiveTab("all-requests")}>
            <FaTicketAlt style={{ marginRight: "0.5rem" }} />
            All Requests
          </Tab>
        </TabContainer>

        {activeTab === "my-requests" && (
          <>
            <FilterContainer>
              <FilterSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                {getUniqueRequestTypes().map((type, index) => (
                  <option key={index}>{type}</option>
                ))}
              </FilterSelect>

              <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                {getUniqueStatuses().map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>

              <Button variant="outline" size="sm" onClick={handleFilter}>
                <FaFilter /> Filter
              </Button>
            </FilterContainer>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Remarks</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequestsData.length > 0 ? (
                    filteredRequestsData.map((request) => {
                      const statusInfo = getStatusInfo(request)
                      return (
                        <tr key={request.id}>
                          <td>{request.request_id}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <span style={{ marginRight: "0.5rem" }}>{getRequestIcon(request.request_sub_type)}</span>
                              {request.request_sub_type}
                            </div>
                          </td>
                          <td>{request.request_text}</td>
                          <td>{request.remarks || "-"}</td>
                          <td>{request.created_date}</td>
                          <td>
                            <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                          </td>
                          <td>
                            <ActionButtons onClick={() => openModal(request)}>
                              <Button variant="ghost" size="sm" title="View">
                                <FaEye />
                              </Button>
                            </ActionButtons>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                        No requests found for the selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableContainer>
          </>
        )}

        {activeTab === "new-request" && (
          <RequestTypeGrid>
            {requestTypes.map((type) => (
              <RequestTypeCard key={type.id}>
                <img
                  src={type.image || "/placeholder.svg"}
                  alt={type.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    margin: "0 auto 1rem",
                  }}
                />
                <RequestTypeTitle>{type.name}</RequestTypeTitle>
                <Button variant="primary" style={{ marginTop: "1rem" }} onClick={() => { setIsModalOpens(true); setDropdownValue(type.id); }}>    
                  Submit Request
                </Button>
              </RequestTypeCard>
            ))}
          </RequestTypeGrid>
        )}

        {activeTab === "all-requests" && (
          <>
            <FilterContainer>
              <FilterSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                {getUniqueRequestTypes().map((type, index) => (
                  <option key={index}>{type}</option>
                ))}
              </FilterSelect>

              <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                {getUniqueStatuses().map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>

              <Button variant="outline" size="sm" onClick={handleFilter}>
                <FaFilter /> Filter
              </Button>
            </FilterContainer>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Employee ID</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Remarks</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => {
                    const statusInfo = getStatusInfo(request)
                    return (
                      <tr key={request.id}>
                        <td>{request.request_id}</td>
                        <td>{request.emp_id}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>{getRequestIcon(request.request_sub_type)}</span>
                            {request.request_sub_type}
                          </div>
                        </td>
                        <td>{request.request_text}</td>
                        <td>{request.remarks || "-"}</td>
                        <td>{request.created_date}</td>
                        <td>
                          <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                        </td>
                        <td>
                          <ActionButtons onClick={() => openModal(request)}>
                            <Button variant="ghost" size="sm" title="View">
                              <FaEye />
                            </Button>
                            {/* {request.request_status === "S" && (
                              <Button variant="ghost" size="sm" title="Assign">
                                <FaEdit />
                              </Button>
                            )} */}
                          </ActionButtons>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </TableContainer>
          </>
        )}
      </Card>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Ticket Details</h2>
          <p>
            <strong>Request ID:</strong> {selectedTicket.request_id}
          </p>
          <p>
            <strong>Type:</strong> {selectedTicket.request_sub_type}
          </p>
          <p>
            <strong>Description:</strong> {selectedTicket.request_text}
          </p>
          <p>
            <strong>Remarks:</strong> {selectedTicket.remarks || "-"}
          </p>
          <p>
            <strong>Created Date:</strong> {selectedTicket.created_date}
          </p>
          <p>
            <strong>Status:</strong> {getStatusInfo(selectedTicket).text}
          </p>
          <img
            src={selectedTicket.submitted_file_1 || "/placeholder.svg"}
            // alt="Request Image"
            style={{ width: "100%", height: "auto", borderRadius: "8px", marginTop: "1rem" }}
          />
          <div style={{ marginTop: "1rem" }}>
            <Button variant="primary" onClick={closeModal}>
              Close
            </Button>
          </div>
        </Modal>
      )}
      {isModalOpens && (
        <RequestModal call_type="R" empId={emp_id} onClose={() => setIsModalOpens(false)} onSuccess={handleSuccess} dropdownValue={dropdownValue} />
      )}
    </Layout>
  )
}

export default RequestDesk
