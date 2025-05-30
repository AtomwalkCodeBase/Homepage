"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  FaPlus,
  FaEdit,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaLifeRing,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Modal from "../components/modals/Modal"
import { getTasksList } from "../services/productServices"

const TicketsContainer = styled.div`
  width: 100%;
  max-width: none;
  padding: 0;
`

const Header = styled.div`
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

  h1 {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.8rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: 100%;
  }

  label {
    font-size: 0.9rem;
    font-weight: 500;
     color: ${({ theme }) => theme.colors.text};
  }
`

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled(Card)`
  text-align: center;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
  }
`

const TicketsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const TicketCard = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`

const TicketInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const TicketTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  word-wrap: break-word;
`

const TicketId = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
  font-family: monospace;
`

const TicketDescription = styled.p`
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
`

const TicketDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`

const DetailItem = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    font-size: 0.95rem;
  }
`

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
  white-space: nowrap;
  
  ${({ status, theme }) => {
    switch (status) {
      case "open":
        return `
          background: ${theme.colors.primary || "#3B82F6"}20;
          color: ${theme.colors.primary || "#3B82F6"};
          border: 1px solid ${theme.colors.primary || "#3B82F6"}40;
        `
      case "in-progress":
        return `
          background: ${theme.colors.warning || "#F59E0B"}20;
          color: ${theme.colors.warning || "#F59E0B"};
          border: 1px solid ${theme.colors.warning || "#F59E0B"}40;
        `
      case "resolved":
        return `
          background: ${theme.colors.success || "#10B981"}20;
          color: ${theme.colors.success || "#10B981"};
          border: 1px solid ${theme.colors.success || "#10B981"}40;
        `
      case "closed":
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error}40;
        `
      default:
        return `
          background: ${theme.colors.primaryLight}20;
          color: ${theme.colors.primaryLight};
          border: 1px solid ${theme.colors.primaryLight}40;
        `
    }
  }}
`

const PriorityBadge = styled.span`
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ priority, theme }) => {
    switch (priority) {
      case "high":
        return `
          background: ${theme.colors.error || "#EF4444"}20;
          color: ${theme.colors.error || "#EF4444"};
          border: 1px solid ${theme.colors.error || "#EF4444"}40;
        `
      case "medium":
        return `
          background: ${theme.colors.warning || "#F59E0B"}20;
          color: ${theme.colors.warning || "#F59E0B"};
          border: 1px solid ${theme.colors.warning || "#F59E0B"}40;
        `
      case "low":
        return `
          background: ${theme.colors.success || "#10B981"}20;
          color: ${theme.colors.success || "#10B981"};
          border: 1px solid ${theme.colors.success || "#10B981"}40;
        `
      default:
        return `
          background: ${theme.colors.textSecondary}20;
          color: ${theme.colors.textSecondary};
          border: 1px solid ${theme.colors.textSecondary}40;
        `
    }
  }}
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  border: 2px dashed ${({ theme }) => theme.colors.border};

  svg {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
`

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
`

const ModalContent = styled.div`
  padding: 1rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    font-size: 1rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
  }
`
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [newTicket, setNewTicket] = useState({
    category: "",
    title: "",
    description: "",
    priority: "medium",
  })
  const cid = localStorage.getItem("custId")
  
  // State for dynamic categories and statuses from API
  const [categories, setCategories] = useState([])
  const [statuses, setStatuses] = useState([])
console.log(categories,"setCategories")
  // Map API status to simplified status for UI
  const statusMap = {
    "Planned": "open",
    "In Progress": "in-progress",
    "Completed": "resolved",
    "Closed- Not Successful": "closed",
    "Waiting for Response": "open",
    "On Hold": "in-progress",
    "Reassigned to User": "in-progress",
    "Deleted": "closed",
    "Not Planned": "closed",
    "WhatsApp Sent": "in-progress",
    "Email Sent": "in-progress"
  }

  // Map priority from API to UI values
  const priorityMap = {
    "01": "high",
    "02": "medium",
    "03": "low"
  }

  // Reverse priority map for submitting
  const reversePriorityMap = {
    "high": "01",
    "medium": "02",
    "low": "03"
  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const response = await getTasksList("ALL", cid)
        console.log(response,"response")
        // Process API response to match our UI format
        const processedTickets = response?.data?.map(ticket => ({
          id: ticket.task_ref_id || `TKT-${ticket.id}`,
          category: ticket.task_category_name || "General",
          title: ticket.name || "No title",
          description: ticket.remarks || "No description provided",
          status: statusMap[ticket.task_status] || "open",
          originalStatus: ticket.task_status, // Keep original status for API calls
          priority: priorityMap[ticket.priority] || "medium",
          dateSubmitted: ticket.task_date || new Date().toISOString().split('T')[0],
          lastUpdated: ticket.task_date || new Date().toISOString().split('T')[0],
          apiData: ticket // Keep original API data for reference
        }))
        
        setTickets(processedTickets)
        setFilteredTickets(processedTickets)
        // Extract unique categories from tickets
        const uniqueCategories = [...new Set(response?.data?.map(t => t.task_category_name || "General"))]
        setCategories(uniqueCategories)
        
        // Extract unique statuses from API
        const uniqueStatuses = [...new Set(response?.data?.map(t => t.task_status))]
        setStatuses(uniqueStatuses)
        
        setLoading(false)
      } catch (error) {
        console.error("Error fetching tickets:", error)
        setLoading(false)
      }
    }
    
    fetchTickets()
  }, [])

  useEffect(() => {
    let filtered = tickets

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.category === categoryFilter)
    }

    // Filter by status
    if (statusFilter !== "all") {
      if (statusFilter === "open") {
        filtered = filtered.filter(ticket => 
          ticket.originalStatus === "Planned" || 
          ticket.originalStatus === "Waiting for Response"
        )
      } else if (statusFilter === "in-progress") {
        filtered = filtered.filter(ticket => 
          ticket.originalStatus === "In Progress" || 
          ticket.originalStatus === "On Hold" ||
          ticket.originalStatus === "Reassigned to User" ||
          ticket.originalStatus === "WhatsApp Sent" ||
          ticket.originalStatus === "Email Sent"
        )
      } else if (statusFilter === "resolved") {
        filtered = filtered.filter(ticket => ticket.originalStatus === "Completed")
      } else if (statusFilter === "closed") {
        filtered = filtered.filter(ticket => 
          ticket.originalStatus === "Closed- Not Successful" || 
          ticket.originalStatus === "Deleted" ||
          ticket.originalStatus === "Not Planned"
        )
      }
    }

    setFilteredTickets(filtered)
  }, [tickets, searchTerm, categoryFilter, statusFilter])

  const handleNewTicket = () => {
    setShowNewTicketModal(true)
  }

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket)
    setShowEditModal(true)
  }

  const handleViewTicket = (ticket) => {
    // Implement view functionality
    console.log(`Viewing ticket ${ticket.id}`)
  }

  const handleSubmitNewTicket = async () => {
    if (!newTicket.category || !newTicket.title || !newTicket.description) {
      alert("Please fill in all required fields")
      return
    }

    try {
      // Here you would call your API to create a new ticket
      // This is a mock implementation - replace with actual API call
      const newTicketData = {
        name: newTicket.title,
        remarks: newTicket.description,
        task_category_name: newTicket.category,
        priority: reversePriorityMap[newTicket.priority] || "02",
        task_status: "Planned", // Default status
        task_type: "TICKET",
        task_date: new Date().toISOString().split('T')[0]
      }

      // Simulate API response
      const response = { 
        id: Math.floor(Math.random() * 1000),
        task_ref_id: `TICKET${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}_${new Date().getFullYear()}`,
        ...newTicketData
      }

      const processedTicket = {
        id: response.task_ref_id || `TKT-${response.id}`,
        category: response.task_category_name,
        title: response.name,
        description: response.remarks,
        status: statusMap[response.task_status] || "open",
        originalStatus: response.task_status,
        priority: priorityMap[response.priority] || "medium",
        dateSubmitted: response.task_date,
        lastUpdated: response.task_date,
        apiData: response
      }

      setTickets([processedTicket, ...tickets])
      setNewTicket({ category: "", title: "", description: "", priority: "medium" })
      setShowNewTicketModal(false)
    } catch (error) {
      console.error("Error creating ticket:", error)
      alert("Failed to create ticket. Please try again.")
    }
  }

  const handleUpdateTicket = async () => {
    if (!selectedTicket) return

    try {
      // Here you would call your API to update the ticket
      // This is a mock implementation - replace with actual API call
      const updatedTicket = {
        ...selectedTicket.apiData,
        task_status: selectedTicket.originalStatus,
        priority: reversePriorityMap[selectedTicket.priority] || "02",
        remarks: selectedTicket.description
      }

      // Simulate API response
      const response = updatedTicket

      const updatedTickets = tickets.map(ticket => 
        ticket.id === selectedTicket.id ? {
          ...ticket,
          description: response.remarks,
          priority: priorityMap[response.priority] || ticket.priority,
          status: statusMap[response.task_status] || ticket.status,
          originalStatus: response.task_status,
          lastUpdated: new Date().toISOString().split('T')[0],
          apiData: response
        } : ticket
      )

      setTickets(updatedTickets)
      setShowEditModal(false)
      setSelectedTicket(null)
    } catch (error) {
      console.error("Error updating ticket:", error)
      alert("Failed to update ticket. Please try again.")
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <FaExclamationCircle />
      case "in-progress":
        return <FaSpinner />
      case "resolved":
        return <FaCheckCircle />
      case "closed":
        return <FaCheckCircle />
      default:
        return <FaClock />
    }
  }

  const getStats = () => {
    const openTickets = tickets.filter(ticket => 
      ticket.originalStatus === "Planned" || 
      ticket.originalStatus === "Waiting for Response"
    ).length
    
    const inProgressTickets = tickets.filter(ticket => 
      ticket.originalStatus === "In Progress" || 
      ticket.originalStatus === "On Hold" ||
      ticket.originalStatus === "Reassigned to User" ||
      ticket.originalStatus === "WhatsApp Sent" ||
      ticket.originalStatus === "Email Sent"
    ).length
    
    const resolvedTickets = tickets.filter(ticket => 
      ticket.originalStatus === "Completed"
    ).length
    
    const closedTickets = tickets.filter(ticket => 
      ticket.originalStatus === "Closed- Not Successful" || 
      ticket.originalStatus === "Deleted" ||
      ticket.originalStatus === "Not Planned"
    ).length

    return { openTickets, inProgressTickets, resolvedTickets, closedTickets }
  }

  const stats = getStats()

  if (loading) {
    return (
      <Layout title="Support Tickets">
        <LoadingState>Loading tickets...</LoadingState>
      </Layout>
    )
  }

  return (
    <Layout title="Support Tickets">
      <TicketsContainer>
        <Header>
          <div>
            <Paragraphdata>Manage your Ticket</Paragraphdata>
          </div>
          <Button onClick={handleNewTicket}>
            <FaPlus />
            New Ticket
          </Button>
        </Header>

        <StatsContainer>
          <StatCard>
            <h3>{stats.openTickets}</h3>
            <p>Open</p>
          </StatCard>
          <StatCard>
            <h3>{stats.inProgressTickets}</h3>
            <p>In Progress</p>
          </StatCard>
          <StatCard>
            <h3>{stats.resolvedTickets}</h3>
            <p>Resolved</p>
          </StatCard>
          <StatCard>
            <h3>{stats.closedTickets}</h3>
            <p>Closed</p>
          </StatCard>
        </StatsContainer>

        <FilterSection>
          <FilterGroup>
            <label>Search Tickets</label>
            <SearchInput
              type="text"
              placeholder="Search by title, description, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>
          <FilterGroup>
            <label>Filter by Category</label>
            <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <label>Filter by Status</label>
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </FilterSelect>
          </FilterGroup>
        </FilterSection>

        {filteredTickets.length === 0 ? (
          <EmptyState>
            <FaLifeRing />
            <h3>No Tickets Found</h3>
            <p>No tickets match your current filters. Try adjusting your search criteria.</p>
          </EmptyState>
        ) : (
          <TicketsGrid>
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketTitle>{ticket.title}</TicketTitle>
                    <TicketId>{ticket.id}</TicketId>
                  </TicketInfo>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                    <StatusBadge status={ticket.status}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.replace("-", " ")}
                    </StatusBadge>
                    <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                  </div>
                </TicketHeader>

                <TicketDescription>{ticket.description}</TicketDescription>

                <TicketDetails>
                  <DetailItem>
                    <h4>Category</h4>
                    <p>{ticket.category}</p>
                  </DetailItem>
                  <DetailItem>
                    <h4>Date Submitted</h4>
                    <p>{formatDate(ticket.dateSubmitted)}</p>
                  </DetailItem>
                  <DetailItem>
                    <h4>Last Updated</h4>
                    <p>{formatDate(ticket.lastUpdated)}</p>
                  </DetailItem>
                </TicketDetails>

                <ActionButtons>
                  <Button variant="outline" size="sm" onClick={() => handleViewTicket(ticket)}>
                    <FaEye />
                    View
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleEditTicket(ticket)}>
                    <FaEdit />
                    Edit
                  </Button>
                </ActionButtons>
              </TicketCard>
            ))}
          </TicketsGrid>
        )}

        {/* New Ticket Modal */}
        {showNewTicketModal && (
          <Modal onClose={() => setShowNewTicketModal(false)} title="Submit New Ticket">
            <ModalContent>
              <FormGroup>
                <label>Category *</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup>
                <label>Title *</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                  placeholder="Brief description of the issue"
                />
              </FormGroup>

              <FormGroup>
                <label>Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Description *</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Detailed description of the issue or request"
                />
              </FormGroup>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <Button variant="outline" onClick={() => setShowNewTicketModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitNewTicket}>Submit Ticket</Button>
              </div>
            </ModalContent>
          </Modal>
        )}

        {/* Edit Ticket Modal */}
        {showEditModal && selectedTicket && (
          <Modal onClose={() => setShowEditModal(false)} title="Edit Ticket">
            <ModalContent>
              <FormGroup>
                <label>Ticket ID</label>
                <input type="text" value={selectedTicket.id} disabled />
              </FormGroup>

              <FormGroup>
                <label>Status</label>
                <select 
                  value={selectedTicket.originalStatus}
                  onChange={(e) => setSelectedTicket({
                    ...selectedTicket,
                    originalStatus: e.target.value,
                    status: statusMap[e.target.value] || "open"
                  })}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup>
                <label>Priority</label>
                <select 
                  value={selectedTicket.priority}
                  onChange={(e) => setSelectedTicket({
                    ...selectedTicket,
                    priority: e.target.value
                  })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Description</label>
                <textarea
                  value={selectedTicket.description}
                  onChange={(e) => setSelectedTicket({
                    ...selectedTicket,
                    description: e.target.value
                  })}
                  placeholder="Ticket description"
                />
              </FormGroup>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateTicket}>Update Ticket</Button>
              </div>
            </ModalContent>
          </Modal>
        )}
      </TicketsContainer>
    </Layout>
  )
}

export default Tickets
