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
  FaUpload,
  FaTimes,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Modal from "../components/modals/Modal"
import { addCustomerTicket, getTaskCategory, getTasksList } from "../services/productServices"

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
  color: ${({ theme }) => theme.colors.text};
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


const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`
const FileUploadContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight}22;
  }
`

const FileUploadIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`

const FileUploadText = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`

const FileInput = styled.input`
  display: none;
`

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  
  span {
    flex: 1;
    margin-left: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;
  }
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-weight: 500;
  display: ${props => props.show ? 'block' : 'none'};
  margin-bottom: 1rem;`

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
  const cid = localStorage.getItem("custId")
  
  // State for dynamic categories and statuses from API
  const [categories, setCategories] = useState({ main: [], sub: [] });
  const [statuses, setStatuses] = useState([])
  const [isFileError, setIsFileError] = useState(false)
  const [formData, setFormData] = useState({
      category: "",
      sub_category: "",
      description: "",
      files:null,
    })
  const [editForm, setEditForm] = useState({
    remarks: "",
    ref_file: null,
  });
  const [showViewImageModal, setShowViewImageModal] = useState(false);
// console.log(categories,"setCategories")
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


    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const res = await getTaskCategory();
          const mainCategories = res?.data?.filter((item) => item.e_type === 'TASK') || [];
          const subCategories = res?.data?.filter((item) => item.e_type === 'T_SUB') || [];
          setCategories({
            main: mainCategories,
            sub: subCategories,
          });
        } catch (error) {
          console.error("error fetching category: ", error);
        }
      };
      fetchCategory();
    }, []);

    const subCategoriesForSelected = categories.sub.filter(
      (sub) => {
        const selectedCategory = categories.main.find(cat => cat.id === parseInt(formData.category));
        return selectedCategory ? sub.parent_category_name === selectedCategory.name : false;
      }
    );


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const response = await getTasksList("ALL", cid)
        // console.log(response.data,"response")
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

        // console.log("ticket", processedTickets)
        
        setTickets(processedTickets)
        setFilteredTickets(processedTickets)
        // Extract unique categories from tickets
        // const uniqueCategories = [...new Set(response?.data?.map(t => t.task_category_name || "General"))]
        // setCategories(uniqueCategories)
        
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
    console.log("jhsdkhc",ticket);
    setEditForm({
    remarks: ticket.description || "",
    ref_file: null,
  });
    
    setShowEditModal(true)
  }

  
// Handle file change for edit
const handleEditFileChange = (e) => {
  setEditForm((prev) => ({
    ...prev,
    ref_file: e.target.files[0],
  }));
};

  const removeEditFile = () => {
    setEditForm((prev) => ({
      ...prev,
      ref_file: null,
    }));
  };

 const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewImageModal(true);
    console.log(`Viewing ticket ${ticket.id} image:`, ticket.apiData.ref_file);
  };

  
  const handleFileChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        files: (e.target.files[0]),
      }))
    }

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      files: null,
    }))
  }

  const onClose = () => {
    setShowNewTicketModal(false);
    setShowEditModal(false);
    setShowViewImageModal(false);
     setFormData({
        category: "",
        sub_category: "",
        description: "",
        files:null,
      })

  }
  

  const handleSubmitNewTicket = async () => {
    if (!formData.category || !formData.description || !formData.files) {
      alert("Please fill in all required fields")
      return
    }

    const formDatas = new FormData();
    formDatas.append('cust_id', cid);
    formDatas.append('call_mode', 'TICKET_ADD');
    formDatas.append('remarks', formData.description.trim());
    formDatas.append('task_category_id', formData.category);
     if (formData.sub_category) {
    formDatas.append('task_sub_category_id', formData.sub_category);
  }

    if (formDatas.file) {
      formData.append('uploaded_file', formData.files);
    }

    try {

      const res = await addCustomerTicket(formDatas)
      if(res.status === 200){
        setFormData({
        category: "",
        sub_category: "",
        description: "",
        files:null,
      })
    }

    } catch (error) {
      console.error("Error creating ticket:", error)
      alert("Failed to create ticket. Please try again.")
    }
  }

  const handleUpdateTicket = async () => {
    if (!selectedTicket) return

    const formData = new FormData();
    formData.append('cust_id', cid);
    formData.append('call_mode', 'TICKET_UPDATE');
    formData.append('remarks', editForm.remarks.trim());
    formData.append('task_id', selectedTicket.apiData.id?.toString() || "");
    if (editForm.ref_file) {
      formData.append('uploaded_file', editForm.ref_file);
    }

    // Log FormData contents
    const formDataEntries = {};
    for (const [key, value] of formData.entries()) {
      formDataEntries[key] = value instanceof File ? value.name : value;
    }
    console.log("update data", formData);

    try {

      const response = await addCustomerTicket(formData); // Assuming this handles updates
      if (response.status === 200) {
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === selectedTicket.id
            ? {
                ...ticket,
                description: editForm.remarks,
                apiData: {
                  ...ticket.apiData,
                  remarks: editForm.remarks,
                  ref_file: editForm.ref_file,
                },
              }
            : ticket
        );
     

      setTickets(updatedTickets)
      setShowEditModal(false)
      setSelectedTicket(null)
      setEditForm({ remarks: "", ref_file: null });
}
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
              {categories.main.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
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
          <Modal onClose={onClose} title="Submit New Ticket">
            <ModalContent>
              <FormGroup>
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, sub_category: "" })}
                >
                  <option value="">Select Category</option>
                  {categories.main.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormGroup>

              {formData.category && subCategoriesForSelected.length > 0 && (
                <FormGroup>
                  <label>Sub Category</label>
                  <select
                    value={formData.sub_category}
                    onChange={(e) =>
                      setFormData({ ...formData, sub_category: e.target.value })
                    }
                  >
                    <option value="">Select Sub Category</option>
                    {subCategoriesForSelected.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              )}

              {/* <FormGroup>
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief description of the issue"
                />
              </FormGroup> */}

              {/* <FormGroup>
                <label>Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </FormGroup> */}

              <FormGroup>
                <label>remarks *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the issue or request"
                />
              </FormGroup>

              <FormGroup>
                            <FormLabel>Receipts/Attachments</FormLabel>
                            <FileUploadContainer onClick={() => document.getElementById("file-upload").click()}>
                              <FileInput id="file-upload" type="file"  onChange={handleFileChange} />
                              <FileUploadIcon>
                                <FaUpload />
                              </FileUploadIcon>
                              <FileUploadText>Click to upload or drag and drop files here</FileUploadText>
                              <div style={{ fontSize: "0.8rem", color: "#666" }}>Supported formats: JPG, PNG, PDF (Max 5MB)</div>
                            </FileUploadContainer>
                            <ErrorMessage show={isFileError}>please upload or drag and drop files here</ErrorMessage>
              
                            {formData.files && (
                              <div style={{ marginTop: "1rem" }}>
                                <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                                  Uploaded Files (1)
                                </div>
                                  <UploadedFile >
                                    <FaUpload />
                                    <span>{formData?.files.name}</span>
                                    <button type="button" onClick={() => removeFile(1)}>
                                      <FaTimes />
                                    </button>
                                  </UploadedFile>
                              </div>
                            )}
                          </FormGroup>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitNewTicket}>Submit Ticket</Button>
              </div>
            </ModalContent>
          </Modal>
        )}

        {/* Edit Ticket Modal */}
        {showEditModal && selectedTicket && (
          <Modal onClose={onClose} title="Edit Ticket">
            <ModalContent>

              <FormGroup>
                <label>Category</label>
                <input 
                 type="text"
                 value={selectedTicket.category}
                 disabled
                />
              </FormGroup>

              {selectedTicket.apiData.task_sub_category_name && (
                <FormGroup>
                  <label>Sub Category</label>
                  <input
                    type="text"
                    value={selectedTicket.apiData.task_sub_category_name}
                    disabled
                  />
                </FormGroup>
              )}

              <FormGroup>
               <label>Description</label>
                <textarea
                  value={editForm.remarks}
                  onChange={(e) => setEditForm({ ...editForm, remarks: e.target.value })}
                  placeholder="Ticket description"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Attachment</FormLabel>
                <FileUploadContainer onClick={() => document.getElementById("edit-file-upload").click()}>
                  <FileInput id="edit-file-upload" type="file" onChange={handleEditFileChange} />
                  <FileUploadIcon>
                    <FaUpload />
                  </FileUploadIcon>
                  <FileUploadText>Click to upload or drag and drop files here</FileUploadText>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>Supported formats: JPG, PNG, PDF (Max 5MB)</div>
                </FileUploadContainer>
                {/* Show uploaded file if present */}
                {editForm.ref_file && (
                  <div style={{ marginTop: "1rem" }}>
                    <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                      Uploaded File
                    </div>
                    <UploadedFile>
                      <FaUpload />
                      <span>{editForm.ref_file.name}</span>
                      <button type="button" onClick={removeEditFile}>
                        <FaTimes />
                      </button>
                    </UploadedFile>
                    {/* If image, show preview */}
                    {editForm.ref_file.type && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <img
                          src={URL.createObjectURL(editForm.ref_file)}
                          alt="Preview"
                          style={{ maxWidth: "200px", maxHeight: "120px", borderRadius: "6px", border: "1px solid #eee" }}
                        />
                      </div>
                    )}
    </div>
  )}
            {/* Show existing file if present and no new file selected */}
            {!editForm.ref_file && selectedTicket.apiData.ref_file && (
              <div style={{ marginTop: "1rem" }}>
                <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                  Existing File
                </div>
                <UploadedFile>
                  <FaUpload />
                  <span>{selectedTicket.apiData.ref_file}</span>
                </UploadedFile>
                {/* If existing file is image, show preview */}
                {(selectedTicket.apiData.ref_file) && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <img
                      src={selectedTicket.apiData.ref_file}
                      alt="Preview"
                      style={{ maxWidth: "200px", maxHeight: "120px", borderRadius: "6px", border: "1px solid #eee" }}
                    />
                  </div>
                )}
              </div>
            )}
          </FormGroup>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateTicket}>Update Ticket</Button>
              </div>
            </ModalContent>
          </Modal>
        )}

        {/* View Image Modal */}
        {showViewImageModal && selectedTicket && (
          <Modal onClose={onClose} title={`View Image for Ticket ${selectedTicket.id}`}>
            <ModalContent>
              <div style={{ textAlign: "center" }}>
                {selectedTicket.apiData.ref_file ? (
                  <div>
                    <img
                      src={selectedTicket.apiData.ref_file}
                      alt={`Attachment for ${selectedTicket.id}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "500px",
                        borderRadius: "6px",
                        border: "1px solid #eee",
                        marginBottom: "1rem",
                      }}
                      onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback for broken images
                    />
                    <a
                      href={selectedTicket.apiData.ref_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#3B82F6", textDecoration: "none" }}
                    >
                      View Full Image
                    </a>
                  </div>
                ) : (
                  <p style={{ color: "#666", fontSize: "1rem" }}>
                    {selectedTicket.apiData.ref_file
                      ? "No image available. File is not an image."
                      : "No attachment available for this ticket."}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </ModalContent>
          </Modal>
        )}
      </TicketsContainer>
    </Layout>
  )
}

export default Tickets
