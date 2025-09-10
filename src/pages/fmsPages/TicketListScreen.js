import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import styled from "styled-components"
import Button from '../../components/Button'
import { FaEye, FaFileExport, FaFilter, FaPlus, FaSearch, FaUserMinus, FaUsers } from 'react-icons/fa'
import { LuUserRoundPlus } from "react-icons/lu";
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from "chart.js";
import { Doughnut } from 'react-chartjs-2'
import { getTasksList } from '../../services/productServices'
import { BarChart } from './TaskScreen'
import moment from 'moment/moment'
import Modal from '../../components/modals/Modal'
import FmsModal from '../../components/modals/FmsModal'
import { useAuth } from '../../context/AuthContext'
import { MdClear } from 'react-icons/md'
import { MultiSelectDropdown } from '../../components/MultiSelectDropdown'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`
const TableContainer = styled.div`
  overflow-x: auto;
`
const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`
const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};
`
const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text};
`
const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`
const ChartContainer = styled.div`
  height: 300px;
  margin-bottom: 2rem;
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
const AssignedUsersSection = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.colors.success};
`
const SectionTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  font-size: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.success};
  }
`
const AssignedUserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const AssignedUserPill = styled.div`
  display: flex;
  align-items: center;
  background: white;
  color: black;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.errorDark};
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

const getStatusTravelInfo = (request) => {

  const today = moment();
  const taskDate = moment(request.task_date, 'DD-MM-YYYY');

  switch (request.task_status) {
    case "Completed":
      return { text: "Complete", variant: "success" };

    case "Planned":
      if (taskDate.isBefore(today, 'day')) {
        return { text: "Pending", variant: "error" }
      } else {
        return { text: "Planned", variant: "info" }
      }
    // break; // no return here, just counters

    case "Not Planned":
      return { text: "Not Planned", variant: "warning" }
    // break;

    default:
      return { text: request.task_status, variant: "warning" };
  }

}

  export const slaData = {
  labels: ["complete", "Pending", "Planned", "Not Planned", "On Hold"],
  datasets: [
    {
      data: [85, 15, 20, 40, 10], // % SLA met vs not met
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      borderWidth: 1,
    },
  ],
};


const TicketListScreen = () => {
    const { fetchTasks,taskResponse, loading } = useAuth();
	const [error, setError] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	const [ticket, setTickets] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [filters, setFilters] = useState({ status: 'All Status', customer: 'All Customer', searchTerm: '' });
  const [uniqueData, setUniqueData] = useState({taskStatus: [],customers: [],category: []});
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedCustomers, setSelectedCustomers] = useState([]);

useEffect(() => {
  const loadData = async () => {
    if (!taskResponse || taskResponse.length === 0) {
      await fetchTasks(); // ✅ trigger API if context is empty
    }
  };
  loadData();
}, [fetchTasks, taskResponse]);

useEffect(() => {
  if (taskResponse && taskResponse.length > 0) {
    // Always clone before reverse to avoid mutating context data
    const tasks = [...taskResponse].reverse();
    setAllTasks(tasks.filter(item => item.is_ticket_task === true));

    const getUniqueValues = (data, key) => {
      return [...new Set(data.map((entry) =>key.split(".").reduce((obj, k) => obj?.[k], entry)).filter(Boolean)),
      ];
    };

    setUniqueData({
      taskStatus: getUniqueValues(tasks, "task_status"),
      customers: getUniqueValues(tasks, "customer.name"),
      category: getUniqueValues(tasks, "task_category_name"),
    });
  }
}, [taskResponse]);

	const handleViewDetails = (data) => {
    setTickets(data)
    setOpenModal(true)
  }

    const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

    const filteredData = useMemo(() => {
      return allTasks.filter((item) => {
        const matchesStatus = filters.status === 'All Status' || item.task_status === filters.status;
        const matchesCustomer = selectedCustomers.length === 0 || selectedCustomers.includes(item.customer?.name);
        const matchesSearchTerm =
          filters.searchTerm === "" ||
          item.customer?.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          item.task_category_name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          item.task_sub_category_name?.toLowerCase().includes(filters.searchTerm.toLowerCase());
  
        return  matchesStatus && matchesCustomer && matchesSearchTerm;
      });
    }, [allTasks, filters.status, selectedCustomers, filters.searchTerm]);
  
  return (
	<Layout title="Customer Tickets">
		<RequestDeskHeader>
        <div>
          <Paragraphdata>View All Customer Tickets </Paragraphdata>
        </div>
      </RequestDeskHeader>

       <TabContainer>
          <Tab active={activeTab === "analysis"} onClick={() => setActiveTab("analysis")}>
            Report analysis
          </Tab>
          <Tab active={activeTab === "list"} onClick={() => setActiveTab("list")}>
            List View
          </Tab>
        </TabContainer>
        {activeTab === "analysis" ?
	      //  <div style={{ padding: '20px' }}>
        <BarChart data={allTasks} isTicket={true} title="Ticket Completions" />
    // </div> 
    :
	  <Card>
        <FilterContainer>
              <div style={{display: "flex", gap: "10px"}}>
              <FilterSelect name="status" value={filters.status} onChange={handleFilterChange}>
                <option>All Status</option>
                {uniqueData.taskStatus?.map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>

              <MultiSelectDropdown customers={uniqueData.customers || []} selectedCustomers={selectedCustomers} setSelectedCustomers={setSelectedCustomers}/>
              

              <FilterSelect name="customer" value={filters.customer} onChange={handleFilterChange}>
                <option>All Category</option>
                {uniqueData.category?.map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>
              </div>

            </FilterContainer>
               {selectedCustomers.length !== 0 && 
                                               <AssignedUsersSection>
                                                 <SectionTitle>
                                                   <FaUsers />
                                                   Currently Selected Customers
                                                 </SectionTitle>
                                                 <AssignedUserList>
                                                   {selectedCustomers.map((customer, index) => (
                                                     <AssignedUserPill key={index}>
                                                       {customer}
                                                       <RemoveButton
                                                         onClick={(e) => {
                                                           e.stopPropagation();
                                                           setSelectedCustomers((prev) => prev.filter((c) => c !== customer));
                                                         }}
                                                         title="Remove"
                                                       >
                                                         <FaUserMinus size={12} />
                                                       </RemoveButton>
                                                     </AssignedUserPill>
                                                   ))}
                                                 </AssignedUserList>
                                               </AssignedUsersSection>
                                               }
                               <SearchContainer>
                           <SearchInput>  
                             <FaSearch /><input type="text" name="searchTerm" placeholder="Search..." value={filters.searchTerm} onChange={handleFilterChange} />
                           </SearchInput>
                           <Button variant="primary" onClick={() => {setFilters({ status: 'All Status', customer: '', searchTerm: '' }); setSelectedCustomers([])}}>
                             <MdClear /> Clear All
                           </Button>
                         </SearchContainer>
		<TableContainer>
          <table>
            <thead>
              <tr>
                {/* <th>Ticket ID</th> */}
                <th>Customer Name</th>
                <th>Category</th>
                {/* <th>Description</th> */}
                <th>Emp_Assign</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>SLA Setup</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Loading ticket data...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "red" }}>
                    {error}
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No tickets found
                  </td>
                </tr>
              ) : (
                filteredData.map((ticket, index) => (
                  <tr key={index}>
                    {/* <td>
                      <strong>{ticket.task_ref_id}</strong>
                    </td> */}
                    <td>{ticket.customer?.name}</td>
                    <td>{ticket.task_category_name}</td>
                    {/* <td style={{whiteSpace: "nowrap",overflow: "hidden", textOverflow: "ellipsis",  maxWidth: "200px" }}>{ticket.remarks}</td> */}
                    <td>{ticket.emp_assigned || '--'}</td>
                    <td><Badge variant={getStatusTravelInfo(ticket).variant}>{getStatusTravelInfo(ticket).text}</Badge></td>
                    <td>{ticket.task_date}</td>
                    <td>
						{ticket.is_sla_met ? (
                          <Badge variant="success">Yes</Badge>) : 
						  (
                            <Badge variant="error">No</Badge>)
							}
                  </td>
                    {/* <td>{new Date(ticket.due_date).toLocaleDateString()}</td> */}
                    <td>
                      <ActionButtons>
                        <Button onClick={() => handleViewDetails(ticket)} variant="ghost" size="sm" title="View">
                          <FaEye />
                        </Button>
                       
					   <Button onClick={() => handleViewDetails(ticket)} variant="primary" size="sm" title="Assign Employee">
                          <LuUserRoundPlus />
                        </Button>
                      </ActionButtons>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <TableActions style={{ float: "right" }}>
            <Button variant="primary" size="sm">
              <FaFileExport /> Export
            </Button>
          </TableActions>
        </TableContainer>
		
	  </Card>
}
      {openModal && <FmsModal onClose={() => setOpenModal(false)} ticket={ticket} isTicket={true} />}
	</Layout>
  )
}

export default TicketListScreen