import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import styled from "styled-components"
import Button from '../../components/Button'
import { FaEye, FaFileExport, FaSearch, FaUserMinus, FaUsers } from 'react-icons/fa'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from "chart.js";
import { Bar } from 'react-chartjs-2'
import moment from 'moment/moment'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import FmsModal from '../../components/modals/FmsModal'
import { useAuth } from '../../context/AuthContext'
import { MultiSelectDropdown } from '../../components/MultiSelectDropdown'
import { MdClear } from 'react-icons/md'
import { getSummary } from './FmsDashBoard'

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
// const DateInput = styled.input`
//   padding: 0.5rem 1rem;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: 4px;
//   background: white;
// `
const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const PaginationInfo = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${(props) => (props.active ? props.theme.colors.primary : "white")};
  color: ${(props) => (props.active ? "white" : props.theme.colors.text)};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${(props) => (props.active ? "white" : props.theme.colors.primary)};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 12px;
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
        return { text: "SLA not meet", variant: "warning" }
      } else {
        return { text: "Planned", variant: "info" }
      }
    // break; // no return here, just counters

    case "Not Planned":
      return { text: "Not Planned", variant: "notPlanned" }
    // break;

    default:
      return { text: request.task_status, variant: "warning" };
  }

}

const TaskScreen = () => {
  const { taskResponse, loading, profile } = useAuth();
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [ticket, setTickets] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('analysis');
  const [filters, setFilters] = useState({ status: 'All Status', customer: '', searchTerm: '', category: 'All Category'});
  const [uniqueData, setUniqueData] = useState({ taskStatus: [], customers: [], category: [] });
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const currentUrl = window.location.pathname;
  const isTicketScreen = currentUrl === "/ticketList";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const customer_name = urlParams.get("customer");

    if (customer_name) {
      setSelectedCustomers([customer_name]);
      setActiveTab('list')
    } else {
      setSelectedCustomers([]);
    }
  }, []);

  // console.log("allTasks", allTasks);



  useEffect(() => {
    if (taskResponse && taskResponse.length > 0) {
      const tasks = [...taskResponse];
      setAllTasks(tasks.filter(item => item.is_ticket_task === (isTicketScreen ? true : false)));

      const getUniqueValues = (data, key) => {
        return [...new Set(data.map((entry) => key.split(".").reduce((obj, k) => obj?.[k], entry)).filter(Boolean)),
        ];
      };

      setUniqueData({
        taskStatus: getUniqueValues(tasks, "task_status"),
        customers: getUniqueValues(tasks, "customer.name"),
        category: getUniqueValues(tasks, "task_category_name"),
      });
    }
    setCurrentPage(1);
    setFilters({ status: 'All Status', searchTerm: '', category: 'All Category' })

  }, [taskResponse, isTicketScreen]);

  // Reset pagination when switching between task and ticket screens
  // useEffect(() => {
  // }, [isTicketScreen]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Reset pagination when filters change
    setCurrentPage(1);
  }

  const handleViewDetails = (data) => {
    setTickets(data)
    setOpenModal(true)
  }

  // console.log("filters", filters)
  const filteredData = useMemo(() => {
    return allTasks.filter((item) => {
      const matchesStatus = filters.status === 'All Status' || item.task_status === filters.status;
      const matchesCustomer = selectedCustomers.length === 0 || selectedCustomers.includes(item.customer?.name);
      const matchesCategory = filters.category === 'All Category' || item.task_category_name === filters.category;
      const matchesSearchTerm =
        filters.searchTerm === "" ||
        item.customer?.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.task_category_name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.task_sub_category_name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.emp_assigned?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.task_ref_id?.toLowerCase().includes(filters.searchTerm.toLowerCase()) 

      return matchesStatus && matchesCustomer && matchesSearchTerm && matchesCategory;
    });
  }, [allTasks, filters.status, selectedCustomers, filters.searchTerm, filters.category]);

  // Reset pagination when filtered data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData.length]);


  // Pagination
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  return (
    <Layout title={isTicketScreen ? "Customer Tickets" : "Employee Task List"}>
      <RequestDeskHeader>
        <div>
          <Paragraphdata>{isTicketScreen ? "View All Customer Tickets" : "View All Employee Task"} </Paragraphdata>
        </div>

        {/* <div style={{ display: "flex", gap: 10 }}>
          <Button variant="primary">
            <FaPlus /> Add New Task
          </Button>
        </div> */}
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
        <div>
          <ChartGrid>
            {/* <ChartContainer> */}
            <BarChart data={allTasks} isTicket={isTicketScreen ? true : false} title={isTicketScreen ? "Ticket Completions" : "Tasks Completion"} />
            {/* </ChartContainer> */}

            {profile?.is_manager &&
              // <ChartContainer>
                <EmployeeBarChart data={allTasks} isTicket={isTicketScreen ? true : false} title="Employee task distribution(Today)" />
              // </ChartContainer>
              }
          </ChartGrid>
        </div>
        :
        <Card>
          <FilterContainer>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <FilterSelect name="status" value={filters.status} onChange={handleFilterChange}>
                <option>All Status</option>
                {uniqueData.taskStatus?.map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>

              <MultiSelectDropdown customers={uniqueData.customers || []} selectedCustomers={selectedCustomers} setSelectedCustomers={setSelectedCustomers} />

              <FilterSelect name="category" value={filters.category} onChange={handleFilterChange}>
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
            <Button variant="primary" onClick={() => { setFilters({ status: 'All Status', customer: '', searchTerm: '', category: 'All Category' }); setSelectedCustomers([]) }}>
              <MdClear /> Clear All
            </Button>
          </SearchContainer>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  {isTicketScreen ?
                    <>
                      {/* <th>Ticket ID</th> */}
                      <th>Customer Name</th>
                      <th>Category</th>
                      {/* <th>Description</th> */}
                      <th>Employee Assign</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>SLA Meet</th>
                      <th>Actions</th>
                    </>
                    :
                    <>
                      <th>Ticket ID</th>
                      <th>Customer Name</th>
                      <th>Description</th>
                      <th>Assigned to</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </>
                  }
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
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      No {isTicketScreen ? "tickets" : "tasks"} found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((ticket, index) => (
                    <tr key={index}>
                      {!isTicketScreen && <td>
                        <strong>{ticket.task_ref_id}</strong>
                      </td>}
                      <td>{ticket.customer?.name}</td>
                      {isTicketScreen &&
                        <td>{ticket.task_category_name}</td>}
                      {!isTicketScreen &&
                        <td style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{ticket.remarks || '--'}</td>}
                      <td>{ticket.emp_assigned || '--'}</td>
                      <td><Badge variant={getStatusTravelInfo(ticket).variant}>{getStatusTravelInfo(ticket).text}</Badge></td>
                      <td>{ticket.task_date}</td>
                      {isTicketScreen &&
                        <td>
                          {ticket.is_sla_met ? (
                            <Badge variant="success">Yes</Badge>) :
                            (
                              <Badge variant="error">No</Badge>)
                          }
                        </td>}
                      <td>
                        <ActionButtons>
                          <Button onClick={() => handleViewDetails(ticket)} variant="ghost" size="sm" title="View">
                            <FaEye />
                          </Button>

                          {/* <Button onClick={() => handleViewDetails(ticket)} variant="primary" size="sm" title="Assign Employee">
                                                  <LuUserRoundPlus />
                                                </Button> */}
                        </ActionButtons>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* <TableActions style={{ float: "right" }}>
              <Button variant="primary" size="sm">
                <FaFileExport /> Export
              </Button>
            </TableActions> */}
          </TableContainer>

          {filteredData.length !== 0 && (
          <Pagination>
            <PaginationInfo>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} entries
            </PaginationInfo>

            <PaginationButtons>
              <PageButton onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                &lt;
              </PageButton>

              {(() => {
                const maxVisiblePages = 5;
                const pages = [];
                
                if (totalPages <= maxVisiblePages) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(
                      <PageButton key={i} active={currentPage === i} onClick={() => setCurrentPage(i)}>
                        {i}
                      </PageButton>
                    );
                  }
                } else {
                  // Show pages with ellipsis
                  const startPage = Math.max(1, currentPage - 2);
                  const endPage = Math.min(totalPages, currentPage + 2);
                  
                  // Always show first page
                  if (startPage > 1) {
                    pages.push(
                      <PageButton key={1} active={currentPage === 1} onClick={() => setCurrentPage(1)}>
                        1
                      </PageButton>
                    );
                    if (startPage > 2) {
                      pages.push(<span key="ellipsis1" style={{ padding: '0 8px', color: '#666' }}>...</span>);
                    }
                  }
                  
                  // Show middle pages
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <PageButton key={i} active={currentPage === i} onClick={() => setCurrentPage(i)}>
                        {i}
                      </PageButton>
                    );
                  }
                  
                  // Always show last page
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(<span key="ellipsis2" style={{ padding: '0 8px', color: '#666' }}>...</span>);
                    }
                    pages.push(
                      <PageButton key={totalPages} active={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PageButton>
                    );
                  }
                }
                
                return pages;
              })()}

              <PageButton
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </PageButton>
            </PaginationButtons>
          </Pagination>
        )}

        </Card>
      }
      {openModal && <FmsModal onClose={() => setOpenModal(false)} ticket={ticket} isTicket={isTicketScreen ? true : false} />}
    </Layout>
  )
}

export default TaskScreen

export const taskOptions = {
  indexAxis: "y", // horizontal bars
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const getBarChartData = (data, isTicket, view = "weekly", selectedDate) => {
  const today = moment();
  let labels = [];
  let completeData = [];
  let pendingData = [];
  let plannedData = [];
  let notPlannedData = [];

  // console.log(JSON.stringify(data[1]))
  // Filter tasks by type
  const filteredData = data.filter((item) => item.is_ticket_task === isTicket);

  if (view === "today") {
    const employees = [...new Set(filteredData.map((task) => task.emp_assigned).filter((name) => !!name))];

    // console.log(filteredData)

    // console.log(employees)

    employees.forEach((employee) => {
      const employeeTasks = filteredData.filter((task) => {
        const taskDate = moment(task.task_date, "DD-MM-YYYY", true);
        return (
          (task.emp_assigned || 'Unknown') === employee &&
          taskDate.isSame(today, "day") // ✅ Only today’s tasks
        );
      });

      const summary = getSummary(employeeTasks);
      completeData.push(summary.complete);
      pendingData.push(summary.pending);
      plannedData.push(summary.planned);
    });

    return {
      labels: employees,
      datasets: [
        { label: 'Completed', data: completeData, backgroundColor: '#52c41a' },
        { label: 'Pending', data: pendingData, backgroundColor: '#FF6384' },
        { label: 'Planned', data: plannedData, backgroundColor: '#36A2EB' },
      ],
    };
  }
  else if (view === "weekly") {
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    completeData = Array(7).fill(0);
    pendingData = Array(7).fill(0);
    plannedData = Array(7).fill(0);
    notPlannedData = Array(7).fill(0);

    const startOfWeek = selectedDate.clone().startOf("week"); // Sunday
    const endOfWeek = selectedDate.clone().endOf("week"); // Saturday

    filteredData.forEach((item) => {
      const taskDate = moment(item.task_date, "DD-MM-YYYY", true);
      if (!taskDate.isValid()) return;

      if (taskDate.isBetween(startOfWeek, endOfWeek, "day", "[]")) {
        const dayOfWeek = taskDate.day();
        const status = (item.task_status || '').toLowerCase().trim();
        if (status === "completed") {
          completeData[dayOfWeek]++;
        } else if (status === "planned") {
          if (taskDate.isBefore(today, "day")) {
            // Overdue planned → count as pending (SLA not meet)
            pendingData[dayOfWeek]++;
          } else {
            // Today or future within the range → planned
            plannedData[dayOfWeek]++;
          }
        } else if (status === "not planned" || status === 'not_planned' || status === 'notplanned') {
          notPlannedData[dayOfWeek]++;
        }
      }
    });
      //  console.log("not palnned in weekly", notPlannedData)
    return {
      labels,
      datasets: [
        { label: 'Completed', data: completeData, backgroundColor: '#52c41a' },
        { label: 'Pending', data: pendingData, backgroundColor: '#FF6384' },
        { label: 'Planned', data: plannedData, backgroundColor: '#36A2EB' },
        { label: 'Not Planned', data: notPlannedData, backgroundColor: '#d0d8ddff' },
      ],
    };
  } else if (view === "monthly") {
    const daysInMonth = selectedDate.daysInMonth();
    labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    completeData = Array(daysInMonth).fill(0);
    pendingData = Array(daysInMonth).fill(0);
    plannedData = Array(daysInMonth).fill(0);
    notPlannedData = Array(daysInMonth).fill(0);

    filteredData.forEach((item) => {
      const taskDate = moment(item.task_date, "DD-MM-YYYY", true);
      if (!taskDate.isValid()) return;

      if (taskDate.isSame(selectedDate, "month")) {
        const dateIndex = taskDate.date() - 1;
        const status = (item.task_status || '').toLowerCase().trim();
        if (status === "completed") {
          completeData[dateIndex]++;
        } else if (status === "planned") {
          if (taskDate.isBefore(today, "day")) {
            // Overdue planned → count as pending (SLA not meet)
            pendingData[dateIndex]++;
          } else {
            // Today or future within the month → planned
            plannedData[dateIndex]++;
          }
        } else if (status === "not planned" || status === 'not_planned' || status === 'notplanned') {
          notPlannedData[dateIndex]++;
        }
      }
    });

      //  console.log("not palnned in monthly", plannedData)
    return {
      labels,
      datasets: [
        { label: 'Completed', data: completeData, backgroundColor: '#52c41a' },
        { label: 'Pending', data: pendingData, backgroundColor: '#FF6384' },
        { label: 'Planned', data: plannedData, backgroundColor: '#36A2EB' },
        { label: 'Not Planned', data: notPlannedData, backgroundColor: '#d0d8ddff' },
      ],
    };
  }

  return {
    labels,
    datasets: [
      { label: "Completed", data: [], backgroundColor: "#52c41a" },
      { label: "SLA not meet", data: [], backgroundColor: "#FF6384" },
      { label: "Planned", data: [], backgroundColor: "#36A2EB" },
      { label: 'Not Planned', data: notPlannedData, backgroundColor: '#d0d8ddff' },
    ],
  };
};

export const getPeriodLabel = (view, date) => {
  if (view === "weekly") {
    const start = date.clone().startOf("week");
    const end = date.clone().endOf("week");
    return `${start.format("MMM D")} - ${end.format("MMM D, YYYY")}`;
  }
  if (view === "monthly") {
    return date.format("MMMM YYYY");
  }
  return date.format("LL");
};

export const BarChart = ({ data, isTicket, title }) => {
  const [view, setView] = useState("weekly");
  const [offset, setOffset] = useState(0);

  // 👉 Compute selectedDate based on offset + view
  const selectedDate =
    view === "weekly"
      ? moment().add(offset, "weeks")
      : moment().add(offset, "months");

  const chartData = getBarChartData(data, isTicket, view, selectedDate);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          title: (ctx) => `Day: ${ctx[0].label}`,
          label: (ctx) => `Total ${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, title: { display: true, text: "Tasks" } },
    },
  };

    const noData =
    !chartData?.datasets?.length ||
    chartData.datasets.every(
      (ds) => !ds.data || ds.data.every((val) => val === 0)
    );

  const fallbackData = {
    labels: ["No Data Available"],
    datasets: [
      {
        label: "No Data",
        data: [0],
        backgroundColor: ["#e0e0e0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    // <ChartGrid>
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{title}</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => { setView("weekly"); setOffset(0); }} variant={view === "weekly" ? "primary" : "outline"}>Weekly</Button>
          <Button onClick={() => { setView("monthly"); setOffset(0); }} variant={view === "monthly" ? "primary" : "outline"}>Monthly</Button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0" }}>
        <Button onClick={() => setOffset((prev) => prev - 1)}>
          <BsFillCaretLeftFill /> Previous
        </Button>
        <h4>{getPeriodLabel(view, selectedDate)}</h4>
        <Button onClick={() => setOffset((prev) => (prev < 0 ? prev + 1 : 0))} disabled={offset === 0}>
          Next <BsFillCaretRightFill />
        </Button>
      </div>

      <ChartContainer>
        <Bar data={noData ? fallbackData : chartData} options={options} />
      </ChartContainer>
    </Card>
    // </ChartGrid>
  );
};

export const EmployeeBarChart = ({ data, isTicket, title }) => {
  const chartData = getBarChartData(data, isTicket, "today");

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: "Total assign task" },
      },
      y: { stacked: true },
    },
  };

  const noData =
    !chartData?.datasets?.length ||
    chartData.datasets.every(
      (ds) => !ds.data || ds.data.every((val) => val === 0)
    );

  const fallbackData = {
    labels: ["No Data Available"],
    datasets: [
      {
        label: "No Data",
        data: [0],
        backgroundColor: ["#e0e0e0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <h3>{title}</h3>
      <Bar data={noData ? fallbackData : chartData} options={options} />
    </Card>
  );
};
