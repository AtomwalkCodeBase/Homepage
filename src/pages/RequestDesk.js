"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import {
  FaTicketAlt,
  FaSearch,
  FaPlus,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaLaptop,
  FaIdCard,
  FaFileAlt,
  FaTools,
  FaUserPlus,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { use } from "react"
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

const RequestTypeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
`

const RequestTypeTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

const RequestTypeDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const RequestDesk = () => {
  const [activeTab, setActiveTab] = useState("my-requests")
  const [searchTerm, setSearchTerm] = useState("")
  const[allRequests,setAllRequests]=useState([])
  const[requestTypes,setRequestTypes]=useState([])
  const [isModalOpens, setIsModalOpens] = useState(false);
  const emp_id=localStorage.getItem("empId")
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[pageref,setPageRef] = useState(1);
    const handleSuccess = () => {
      setIsModalOpens(false);
      toast.success("Request submitted successfully!");
      setPageRef(pageref + 1);
    };
  useEffect(() => { 
    fetchRequest()
    fetchRequestCategory()
  } ,[pageref])
  
  const fetchRequestCategory = async () => {
    try {
      const res = await getRequestCategory();
      const filtered = res.data.filter(category => category.request_type === 'R');
      setRequestTypes(filtered);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  const fetchRequest = async () => {
    try {
      const res = await getEmployeeRequest();
      setAllRequests(res.data);
    } catch (err) {
      console.log("Error fetching requests:", err);
    }
  };
  const myRequests = allRequests.filter(request => request?.emp_id == emp_id&& request?.request_type === "R")
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Get icon based on request sub type
  const getRequestIcon = (subType) => {
    switch(subType) {
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
    switch(request.request_status) {
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
      request.request_sub_type.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };
  return (
    <Layout title="Resource Request Desk">
      <RequestDeskHeader>
        <div>
          <Paragraphdata>Submit and track your resource requests</Paragraphdata>
        </div>

        <Button onClick={() => setIsModalOpens(true)}  variant="primary">
          <FaPlus /> New Request
        </Button>
      </RequestDeskHeader>

      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search resource requests..." 
            value={searchTerm} 
            onChange={handleSearch} 
          />
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
              <FilterSelect>
                <option>All Types</option>
                {requestTypes.map(type => (
                  <option key={type.id}>{type.name}</option>
                ))}
              </FilterSelect>

              <FilterSelect>
                <option>All Status</option>
                <option>Submitted</option>
                <option>Assigned</option>
                <option>Completed</option>
                <option>Rejected</option>
              </FilterSelect>

              <Button variant="outline" size="sm">
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
                  {filteredRequests.map((request) => {
                    const statusInfo = getStatusInfo(request)
                    return (
                      <tr key={request.id}>
                        <td>{request.request_id}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>
                              {getRequestIcon(request.request_sub_type)}
                            </span>
                            {request.request_sub_type}
                          </div>
                        </td>
                        <td>{request.request_text}</td>
                        <td>{request.remarks || "-"}</td>
                        <td>{request.created_date}</td>
                        <td>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.text}
                          </Badge>
                        </td>
                        <td>
                          <ActionButtons onClick={() => openModal(request)}>
                            <Button variant="ghost" size="sm" title="View">
                              <FaEye />
                            </Button>
                            {/* {request.request_status === "S" && (
                              <>
                                <Button variant="ghost" size="sm" title="Edit">
                                  <FaEdit />
                                </Button>
                                <Button variant="ghost" size="sm" title="Cancel">
                                  <FaTrash />
                                </Button>
                              </>
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

        {activeTab === "new-request" && (
          <RequestTypeGrid>
            {requestTypes.map((type) => (
              <RequestTypeCard key={type.id}>
                <img 
                  src={type.image} 
                  alt={type.name} 
                  style={{ 
                    width: "80px", 
                    height: "80px", 
                    objectFit: "cover", 
                    borderRadius: "8px",
                    margin: "0 auto 1rem"
                  }} 
                />
                <RequestTypeTitle>{type.name}</RequestTypeTitle>
                <Button variant="primary" style={{ marginTop: "1rem" }}>
                  Submit Request
                </Button>
              </RequestTypeCard>
            ))}
          </RequestTypeGrid>
        )}

        {activeTab === "all-requests" && (
          <>
            <FilterContainer>
              <FilterSelect>
                <option>All Types</option>
                {requestTypes.map(type => (
                  <option key={type.id}>{type.name}</option>
                ))}
              </FilterSelect>

              <FilterSelect>
                <option>All Status</option>
                <option>Submitted</option>
                <option>Assigned</option>
                <option>Completed</option>
                <option>Rejected</option>
              </FilterSelect>

              <Button variant="outline" size="sm">
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
                            <span style={{ marginRight: "0.5rem" }}>
                              {getRequestIcon(request.request_sub_type)}
                            </span>
                            {request.request_sub_type}
                          </div>
                        </td>
                        <td>{request.request_text}</td>
                        <td>{request.remarks || "-"}</td>
                        <td>{request.created_date}</td>
                        <td>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.text}
                          </Badge>
                        </td>
                        <td>
                          <ActionButtons>
                            <Button variant="ghost" size="sm" title="View">
                              <FaEye />
                            </Button>
                            {request.request_status === "S" && (
                              <Button variant="ghost" size="sm" title="Assign">
                                <FaEdit />
                              </Button>
                            )}
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
                <p><strong>Request ID:</strong> {selectedTicket.request_id}</p>
                <p><strong>Type:</strong> {selectedTicket.request_sub_type}</p>
                <p><strong>Description:</strong> {selectedTicket.request_text}</p>
                <p><strong>Remarks:</strong> {selectedTicket.remarks || "-"}</p>
                <p><strong>Created Date:</strong> {selectedTicket.created_date}</p>
                <p><strong>Status:</strong> {getStatusInfo(selectedTicket).text}</p>
                <div style={{ marginTop: "1rem" }}>
                <Button variant="primary" onClick={closeModal}>Close</Button>
                </div>
              </Modal>
            )}
      {isModalOpens && (
              <RequestModal 
                call_type="R" 
                empId={emp_id} 
                onClose={() => setIsModalOpens(false)}
                onSuccess={handleSuccess}
              />
            )}
    </Layout>
  )
}

export default RequestDesk
