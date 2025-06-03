"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import {
  FaQuestion,
  FaTicketAlt,
  FaSearch,
  FaPlus,
  FaFilter,
  FaEye,
  FaFileAlt,
  FaBook,
  FaHeadset,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaLaptop,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getEmployeeRequest } from "../services/productServices"
import Modal from "../components/modals/Modal"
import { toast } from "react-toastify"
import RequestModal from "../components/modals/RequestModal"
import { useNavigate } from "react-router-dom"

const HelpDeskHeader = styled.div`
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
  p{
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;
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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const CategoryCard = styled.div`
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

const CategoryIcon = styled.div`
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

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

const CategoryDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`
const HelpDesk = () => {
  const [activeTab, setActiveTab] = useState("tickets")
  const [searchTerm, setSearchTerm] = useState("")
  const [allRequests, setAllRequests] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpens, setIsModalOpens] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [pageref, setPageRef] = useState(1)
  // Add these state variables after the existing state declarations
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")
  const [filteredTickets, setFilteredTickets] = useState([])
  const navigatin = useNavigate()
  const handleSuccess = () => {
    setIsModalOpens(false)
    toast.success("Request submitted successfully!")
    setPageRef(pageref + 1)
  }
  const emp_id = localStorage.getItem("empId")
  useEffect(() => {
    fetchRequest()
  }, [pageref])

  const fetchRequest = async () => {
    try {
      const res = await getEmployeeRequest()
      setAllRequests(res.data)
    } catch (err) {
      console.log("Error fetching requests:", err)
    }
  }

  const tickets = allRequests.filter((request) => request?.emp_id == emp_id && request?.request_type === "H")

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Add function to get unique categories
  const getUniqueCategories = () => {
    const categories = ["All Categories"]
    tickets.forEach((ticket) => {
      if (ticket.request_sub_type && !categories.includes(ticket.request_sub_type)) {
        categories.push(ticket.request_sub_type)
      }
    })
    return categories
  }

  // Add function to get unique statuses
  const getUniqueStatuses = () => {
    const statuses = ["All Status"]
    tickets.forEach((ticket) => {
      let status = ""
      switch (ticket.request_status) {
        case "S":
          status = "Submitted"
          break
        case "A":
          status = "Assigned"
          break
        case "X":
          status = "Rejected"
          break
        case "C":
          status = "Completed"
          break
        default:
          status = ticket.status_display || "Unknown"
      }
      if (!statuses.includes(status)) {
        statuses.push(status)
      }
    })
    return statuses
  }

  // Replace the existing filteredTickets definition with a useEffect
  useEffect(() => {
    let filtered = tickets.filter(
      (ticket) =>
        ticket.request_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.request_sub_type.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Apply category filter
    if (categoryFilter !== "All Categories") {
      filtered = filtered.filter((ticket) => ticket.request_sub_type === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== "All Status") {
      filtered = filtered.filter((ticket) => {
        let status = ""
        switch (ticket.request_status) {
          case "S":
            status = "Submitted"
            break
          case "A":
            status = "Assigned"
            break
          case "X":
            status = "Rejected"
            break
          case "C":
            status = "Completed"
            break
          default:
            status = ticket.status_display || "Unknown"
        }
        return status === statusFilter
      })
    }

    setFilteredTickets(filtered)
  }, [tickets, searchTerm, categoryFilter, statusFilter, priorityFilter])

  // Add handleFilter function
  const handleFilter = () => {
    // Filtering is already handled by the useEffect
    toast.info("Filters applied")
  }

  const getStatusInfo = (request) => {
    switch (request.request_status) {
      case "S":
        return { text: "Submitted", variant: "warning" }
      case "A":
        return { text: "Assigned", variant: "info" }
      case "X":
        return { text: "Rejected", variant: "error" }
      case "C":
        return { text: "Completed", variant: "success" }
      default:
        return { text: request.status_display, variant: "warning" }
    }
  }

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

  const openModal = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }
  const categories = [
    {
      id: 1,
      title: "Getting Started",
      description: "Basic guides and tutorials for new employees",
      icon: <FaBook />,
      articles: 12,
      link: "/manual.html",
    },
    {
      id: 2,
      title: "Leave Management",
      description: "How to apply, approve and manage leaves",
      icon: <FaCalendarAlt />,
      articles: 8,
      link: "/manualsteps.html?topic=Apply%20Leave",
    },
    {
      id: 3,
      title: "Payroll & Benefits",
      description: "Information about salary, taxes and benefits",
      icon: <FaMoneyBillWave />,
      articles: 15,
      link:'/hrmanual.html'
    },
    {
      id: 4,
      title: "IT Support",
      description: "Technical support and troubleshooting guides",
      icon: <FaHeadset />,
      articles: 10,
      link:"/contactUs.html"
    },
    {
      id: 5,
      title: "HR Policies",
      description: "Company policies and procedures",
      icon: <FaFileAlt />,
      articles: 20,
      link:"/hrm.html"
    },
    {
      id: 6,
      title: "FAQs",
      description: "Frequently asked questions",
      icon: <FaQuestion />,
      articles: 25,
      link: "/faq.html",
    },
  ]

  const handleCategoryClick = (category) => {
      navigatin(category)
  }
  return (
    <Layout title="Help Desk">
      <HelpDeskHeader>
        <div>
          <p>Get support and find answers to your questions</p>
        </div>

        <Button onClick={() => setIsModalOpens(true)} variant="primary">
          <FaPlus /> Create New Ticket
        </Button>
      </HelpDeskHeader>

      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input
            type="text"
            placeholder="Search tickets or knowledge base..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchInput>
      </SearchContainer>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "tickets"} onClick={() => setActiveTab("tickets")}>
            <FaTicketAlt style={{ marginRight: "0.5rem" }} />
            My Tickets
          </Tab>
          <Tab active={activeTab === "knowledge"} onClick={() => setActiveTab("knowledge")}>
            <FaBook style={{ marginRight: "0.5rem" }} />
            Knowledge Base
          </Tab>
        </TabContainer>

        {activeTab === "tickets" && (
          <>
            <FilterContainer>
              <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                {getUniqueCategories().map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </FilterSelect>

              <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                {getUniqueStatuses().map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>

              {/* <FilterSelect value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </FilterSelect> */}

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
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((request) => {
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
                            <ActionButtons>
                              <Button variant="ghost" size="sm" title="View" onClick={() => openModal(request)}>
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
                        No tickets found for the selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableContainer>
          </>
        )}

        {activeTab === "knowledge" && (
          <>
            <CategoryGrid>
              {categories.map((category) => (
                <CategoryCard key={category.id} onClick={() => handleCategoryClick(category.link)}>
                  <CategoryIcon>{category.icon}</CategoryIcon>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryDescription>{category.description}</CategoryDescription>
                  <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>{category.articles} articles</div>
                </CategoryCard>
              ))}
            </CategoryGrid>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h3>Can't find what you're looking for?</h3>
              <p style={{ margin: "1rem 0" }}>
                Create a new support ticket and our team will assist you as soon as possible.
              </p>
              <Button variant="primary" onClick={() => setIsModalOpens(true)}>
                <FaPlus /> Create New Ticket
              </Button>
            </div>
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
            alt="Request Image"
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
        <RequestModal call_type="H" empId={emp_id} onClose={() => setIsModalOpens(false)} onSuccess={handleSuccess} />
      )}
    </Layout>
  )
}

export default HelpDesk
