import React, { useEffect, useMemo, useState } from 'react'
import { getTasksList } from '../../services/productServices';
import Layout from '../../components/Layout';
import styled from "styled-components"
import Button from '../../components/Button';
import { FiSun } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronRight, FaEye, FaRegCalendarAlt, FaRegListAlt, FaSearch, FaTasks, FaUserMinus, FaUsers } from 'react-icons/fa';
import { FaClockRotateLeft, FaRegCircleCheck, } from "react-icons/fa6";
import { LuClipboardCheck, LuClipboardX } from "react-icons/lu";
import { MdClear, MdOutlinePending } from "react-icons/md";
import { IoCalendarNumberOutline, IoTicketOutline } from "react-icons/io5";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from "chart.js";
import Card from '../../components/Card';
import { Pie, Doughnut } from "react-chartjs-2";
import moment from 'moment/moment';
import FmsModal from '../../components/modals/FmsModal';
import { MultiSelectDropdown } from '../../components/MultiSelectDropdown';
import { useAuth } from '../../context/AuthContext';

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

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
const TableContainer = styled.div`
  overflow-x: auto;
`
const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
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

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
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
  width: 100%;
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

const FmsDashBoard = () => {
  const { fetchTasks, taskResponse,loading } = useAuth()
  // const [isLoading, setIsLoading] = useState(false)
  const [allTasks, setAllTasks] = useState([]);
  const [error, setError] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [ticket, setTickets] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(new Set())
  const [uniqueData, setUniqueData] = useState({taskStatus: [],customers: [],category: []});
// const [searchCustomer, setSearchCustomer] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [offset, setOffset] = useState(0);
  const [periodType, setPeriodType] = useState('day');
  const [activeTab, setActiveTab] = useState('analysis');
  const [tableActiveTab, setTableActiveTab] = useState('task');
  const [filters, setFilters] = useState({ status: 'All Status', customer: '', searchTerm: '' });

  
useEffect(() => {
  const loadData = async () => {
    if (!taskResponse || taskResponse.length === 0) {
      await fetchTasks();
    }
  };
  loadData();
}, [fetchTasks, taskResponse]);

useEffect(() => {
  if (taskResponse && taskResponse.length > 0) {
    const tasks = [...taskResponse].reverse();
    setAllTasks(tasks);

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

  // Filter data based on tab and status
  const filteredData = useMemo(() => {
    const periodData = filterByPeriod(allTasks, selectedPeriod, offset, periodType);
    let today = moment()

    return periodData.filter((item) => {
    const taskDate = parseTaskDate(item.task_date);
    const isOverdue = taskDate.isBefore(today, "day");

    // derive a normalized status
    let derivedStatus = item.task_status;
    if (item.task_status === "Planned" && isOverdue) {
      derivedStatus = "SLA not meet";
    }
      const matchesTab = tableActiveTab === 'task' ? !item.is_ticket_task : item.is_ticket_task;
      const matchesStatus = filters.status === 'All Status' || derivedStatus === filters.status;
      // const matchesCustomer = filters.customer === 'All Customer' || item.customer?.name === filters.customer;
      const matchesCustomer = selectedCustomers.length === 0 || selectedCustomers.includes(item.customer?.name);
      const matchesSearchTerm =
        filters.searchTerm === "" ||
        item.customer?.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.task_category_name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.task_sub_category_name?.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesTab && matchesStatus && matchesCustomer && matchesSearchTerm;
    });
  }, [allTasks, selectedPeriod, offset, periodType, tableActiveTab, filters.status, filters.searchTerm, selectedCustomers]);

  const toggleExpand = (customerName) => {
    setExpandedCustomer((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(customerName)) {
        newSet.delete(customerName);
      } else {
        newSet.add(customerName);
      }
      return newSet;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const groupByTaskName = (tasks, tableActiveTab, isTicket) => {
    const grouped = {};

    tasks.forEach((task) => {
      const key = tableActiveTab === "task"
        ? `${task.customer?.name || "Unknown"}|${task.name}`
        : `${task.customer?.name || "Unknown"}|${task.task_category_name}`;
      if (!grouped[key]) {
        grouped[key] = {
          ...(tableActiveTab === 'task'
            ? { task_name: task.name }
            : { task_category_name: task.task_category_name }),
          customer_name: task.customer?.name || "Unknown",
          tasks: [],
        };
      }
      grouped[key].tasks.push(task);
    });

    return Object.values(grouped).map((group) => {
      const summary = getSummary(group.tasks, isTicket);
      return {
        ...group,
        total: summary.total,
        complete: summary.complete,
        planned: summary.planned,
        notPlanned: summary.notPlanned,
        pending: summary.pending,
      };
    });
  };

  const handleViewDetails = (data) => {
    setTickets(data)
    setOpenModal(true)
  }

  // const filteredTasks = filterTasksByTab(tasks, activeTab);
  return (
    <Layout title="Dashboard">
      <RequestDeskHeader>
        <div>
          <Paragraphdata>View All your task </Paragraphdata>
        </div>

        <div style={{ display: "flex", gap: 10 , flexWrap: "wrap"}}>
          <Button onClick={() => { setSelectedPeriod("yesterday"); setPeriodType('yestday'); setOffset(0) }} variant={periodType === "yestday" ? "primary" : "outline"}>
            <FaClockRotateLeft /> Yesterday
          </Button>

          <Button onClick={() => { setSelectedPeriod('today'); setPeriodType('day'); setOffset(0); }} variant={periodType === "day" ? "primary" : "outline"}>
            <FiSun /> Today
          </Button>

          <Button onClick={() => { setSelectedPeriod('week'); setPeriodType('week'); setOffset(0); }} variant={periodType === "week" ? "primary" : "outline"}>
            <FaRegCalendarAlt /> Weekly
          </Button>

          <Button onClick={() => { setSelectedPeriod('month'); setPeriodType('month'); setOffset(0); }} variant={periodType === "month" ? "primary" : "outline"}>
            <IoCalendarNumberOutline /> Monthly
          </Button>
        </div>
      </RequestDeskHeader>

      {selectedPeriod === "week" && (
        <div style={{ display: "flex", gap: 10, marginTop: 10, justifyContent: "space-between" }}>
          <Button onClick={() => setOffset(prev => prev - 1)} variant="primary">
            <FaArrowLeft /> Previous Week
          </Button>

          <h4>{getPeriodLabel("week", offset)}</h4>

          <Button onClick={() => {if (offset < 0) setOffset(prev => prev + 1);}} variant="primary" disabled={offset === 0}>
            Next Week <FaArrowRight />
          </Button>
        </div>
      )}

      {selectedPeriod === "month" && (
        <div style={{ display: "flex", gap: 10, marginTop: 10, justifyContent: "space-between" }}>
          <Button onClick={() => setOffset(prev => prev - 1)} variant="primary">
            <FaArrowLeft /> Previous Month
          </Button>

          <h4>{getPeriodLabel("month", offset)}</h4>

          <Button onClick={() => {if (offset < 0) setOffset(prev => prev + 1);}} variant="primary" disabled={offset === 0}>
            Next Month <FaArrowRight />
          </Button>
        </div>
      )}

      <div style={{ padding: '20px' }}>
        <SummaryCards data={allTasks} isTicket={false} monthOffset={offset} periodType={periodType} period={selectedPeriod} title="Tasks Summary" onFilterStatus={(status) => {setFilters((prev) => ({ ...prev, status })); setActiveTab("list"); setTableActiveTab("task")}} />
        <SummaryCards data={allTasks} isTicket={true} monthOffset={offset} periodType={periodType} period={selectedPeriod} title="Customer Tickets Summary" onFilterStatus={(status) => {setFilters((prev) => ({ ...prev, status })); setActiveTab("list"); setTableActiveTab("tickets")}} />
      </div>
      <Card>

        <TabContainer>
          <Tab active={activeTab === "analysis"} onClick={() => setActiveTab("analysis")}>
            Report analysis
          </Tab>
          <Tab active={activeTab === "list"} onClick={() => setActiveTab("list")}>
            List View
          </Tab>
        </TabContainer>
        {activeTab === "analysis" ?
          <>
            <div>
              <ChartGrid>

                <ChartContainer>
                  <PieChart title="Tasks Status" isTicket={false} monthOffset={offset} periodType={periodType} data={allTasks} period={selectedPeriod} />
                </ChartContainer>

                <ChartContainer>
                  <PieChart title="Customer Tickets Status" isTicket={true} monthOffset={offset} periodType={periodType} data={allTasks} period={selectedPeriod} />
                </ChartContainer>

                <ChartContainer>
                  <SlaChart data={allTasks} title="SLA Status" monthOffset={offset} period={selectedPeriod} />
                </ChartContainer>

              </ChartGrid>
            </div>
          </>
          :
          <>
            <h3>Customer {tableActiveTab === 'task' ? "task" : "tickets"}</h3>
            <FilterContainer>
              <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
              <FilterSelect name="status" value={filters.status} onChange={handleFilterChange}>
                <option>All Status</option>
                <option>SLA not meet</option>
                {uniqueData.taskStatus?.map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>

              {/* <FilterSelect name="customer" value={filters.customer} onChange={handleFilterChange}>
                <option>All Customer</option>
                {uniqueData.customers?.map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect> */}

              <MultiSelectDropdown customers={uniqueData.customers || []} selectedCustomers={selectedCustomers} setSelectedCustomers={setSelectedCustomers}/>


              <FilterSelect name="customer" value={filters.customer} onChange={handleFilterChange}>
                <option>All Category</option>
                {uniqueData.category?.map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </FilterSelect>
              </div>


              <div style={{ display: "flex", gap: 10 }}>
                <Button onClick={() => setTableActiveTab("task")} variant={tableActiveTab === "task" ? "primary" : "outline"}>
                  <FaTasks /> Customer Task
                </Button>
                <Button onClick={() => setTableActiveTab("tickets")} variant={tableActiveTab === "tickets" ? "primary" : "outline"}>
                  <IoTicketOutline /> Customer Ticket
                </Button>
              </div>

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

            </FilterContainer>
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
                  {["today", "yesterday"].includes(selectedPeriod) ? (
                    <tr>
                      <th>Customer</th>
                      <th>{tableActiveTab === "task" ? "Task Name" : "Category"}</th>
                      <th>Status</th>
                      <th>Employee</th>
                      <th>Task Date</th>
                    </tr>
                  ) : (
                    <tr>
                      <th></th>
                      <th>Customer</th>
                      <th>{tableActiveTab === "task" ? "Task Name" : "Category"}</th>
                      <th>Total</th>
                      <th>Completed</th>
                      <th>SLA not meet</th>
                      <th>Planned</th>
                    </tr>
                  )}
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
                        No tickets found for the selected date range
                      </td>
                    </tr>
                  ) : (
                    <>
                      {/* Case 1: Today / Yesterday */}
                      {["today", "yesterday"].includes(selectedPeriod) &&
                        filteredData.map((task) => (
                          <tr key={task.id}>
                            <td>{task.customer?.name || '--'}</td>
                            <td>{tableActiveTab === "task" ? task.name : task.task_category_name}</td>
                            <td>{task.task_status}</td>
                            <td>{task.emp_assigned || '--'}</td>
                            <td>{task.task_date || '--'}</td>
                          </tr>
                        ))}

                      {/* Case 2: Weekly / Monthly */}
                      {["week", "month", "previous_month", "next_month"].includes(selectedPeriod) &&
                        groupByTaskName(filteredData, tableActiveTab, tableActiveTab === "task" ? false : true).map((group) => {
                          const expandKey = tableActiveTab === "task" ? `${group.customer_name}|${group.task_name}` : `${group.customer_name}|${group.task_category_name}`;
                          const isExpanded = expandedCustomer.has(expandKey);

                          return (
                            <React.Fragment key={group.task_name}>
                              {/* Parent summary row */}
                              <ExpandableRow>
                                <td>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleExpand(expandKey)}
                                  >
                                    {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                                  </Button>
                                </td>
                                <td>{group.customer_name || '--'}</td>
                                <td>{tableActiveTab === "task" ? group.task_name : group.task_category_name}</td>
                                <td>{group.total}</td>
                                <td>{group.complete}</td>
                                <td>{group.pending}</td>
                                <td>{group.planned}</td>
                              </ExpandableRow>

                              {/* Expanded details */}
                              {isExpanded && (
                                <tr>
                                  <td colSpan={7}>
                                    <ClaimItemsTable>
                                      <thead>
                                        <tr>
                                          <th>{tableActiveTab === "task" ? "Task Name" : "Category"}</th>
                                          {tableActiveTab === "ticket" && <th>Sub Category</th>}
                                          <th>Task Date</th>
                                          <th>Status</th>
                                          <th>Employee</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {group.tasks.map((t) => (
                                          <tr key={t.id}>
                                            <td>{tableActiveTab === "task" ? t.name : t.task_category_name}</td>
                                            {tableActiveTab === "ticket" && <td>{t.task_sub_category_name || '--'}</td>}
                                            <td>{t.task_date}</td>
                                            <td>{t.task_status}</td>
                                            <td>{t.emp_assigned || '--'}</td>
                                            <td>
                                              <ActionButtons>
                                                <Button
                                                  onClick={() => handleViewDetails(t)}
                                                  variant="ghost"
                                                  size="sm"
                                                  title="View"
                                                >
                                                  <FaEye />
                                                </Button>
                                              </ActionButtons>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </ClaimItemsTable>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </>
                  )}
                </tbody>
              </table>
            </TableContainer>
          </>}
      </Card>
      {openModal && <FmsModal onClose={() => setOpenModal(false)} ticket={ticket} isTicket={tableActiveTab === "task" ? false : true} />}
    </Layout>
  )
}

const PieChart = ({ title, isTicket, data, period, monthOffset, periodType }) => {
  const chartData = getPieChartData(data, isTicket, period, monthOffset, periodType);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}`,
        },
      },
    },
  };

  return (
    <Card>
      <h4 style={{ marginBottom: '1rem' }}>{title}</h4>
      <div style={{ height: '250px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </Card>
  );
};

const parseTaskDate = (dateStr) => {
  return moment(dateStr, 'DD-MM-YYYY');
}

// Utility function to get start and end dates for a given period
const getPeriodDates = (period, offset = 0, periodType = null, today = moment()) => {
  const base = moment(today);
  let start, end;

  switch (period) {
    case 'month':   // one unified case
      start = base.clone().add(offset, 'months').startOf('month');
      end   = base.clone().add(offset, 'months').endOf('month');
      break;

    case 'week':    // unified week case
      start = base.clone().add(offset, 'weeks').startOf('isoWeek');
      end   = base.clone().add(offset, 'weeks').endOf('isoWeek');
      break;

    case 'today':
      start = base.clone().startOf('day');
      end   = base.clone().endOf('day');
      break;

    case 'yesterday':
      start = base.clone().subtract(1, 'days').startOf('day');
      end   = base.clone().subtract(1, 'days').endOf('day');
      break;

    default:
      start = base.clone().startOf('day');
      end   = base.clone().endOf('day');
  }

  return { start, end };
};


// Utility function to filter data by period
const filterByPeriod = (data, period, monthOffset, periodType) => {
  const { start, end } = getPeriodDates(period, monthOffset, periodType);
  return data.filter((item) => {
    const taskDate = parseTaskDate(item.task_date);
    return taskDate.isSameOrAfter(start, 'day') && taskDate.isSameOrBefore(end, 'day');
  });
}

// Utility function to get summary counts (reusable for both tickets and tasks)
const getSummary = (items, isTicket,period, today = moment()) => {
  let total = 0;
  let complete = 0;
  let planned = 0;
  let notPlanned = 0;
  let pending = 0;

  items.forEach((item) => {
    // ✅ Filter tasks vs tickets
    const isTicketTask = !!item.is_ticket_task;
    if (isTicket && !isTicketTask) return;   // only include tickets
    if (!isTicket && isTicketTask) return;   // only include tasks

    total++;

    const taskDate = parseTaskDate(item.task_date);
    const isOverdue = taskDate.isBefore(today, "day");
    const status = item.task_status;

    if (status === "Completed") {
      complete++;
    } else if (status === "Planned") {
      if (isOverdue) {
        pending++;
      } else {
        planned++;
      }
    } else if (status === "Not Planned") {
      notPlanned++;
    }
  });

  return { total, complete, planned, notPlanned, pending };
};


const SummaryCards = ({ data, isTicket, title, period, monthOffset, periodType, onFilterStatus }) => {
  // Compute summary stats using getSummary
  const filteredData = filterByPeriod(data, period, monthOffset, periodType);
  const { total, complete, planned, notPlanned, pending } = getSummary(filteredData, isTicket, period);

  // Card data array for rendering
  const cardData = [
    {
      label: 'Total',
      number: total,
      bgColor: '#e6f7ff',
      iconColor: '#1890ff',
      // icon: <FolderOpenOutlined />,
      icon: <FaRegListAlt size={24} />,
    },
    {
      label: 'Planned',
      number: planned,
      bgColor: '#e6fffb',
      iconColor: '#13c2c2',
      // icon: <ClockCircleOutlined />,
      icon: <LuClipboardCheck size={24} />
    },
    {
      label: 'Not Planned',
      number: notPlanned,
      bgColor: '#fff7e6',
      iconColor: '#fa8c16',
      // icon: <ExclamationCircleOutlined />,
      icon: <LuClipboardX size={24} />
    },
    {
      label: 'SLA not meet',
      number: pending,
      bgColor: '#fff1f0',
      iconColor: '#f5222d',
      // icon: <ExclamationCircleOutlined />,
      icon: <MdOutlinePending size={24} />,
    },
    {
      label: 'Completed',
      number: complete,
      bgColor: '#f6ffed',
      iconColor: '#52c41a',
      // icon: <CheckCircleOutlined />,
      icon: <FaRegCircleCheck size={24} />,
    },
  ];

  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{title}</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {cardData.map((item, index) => (
          <Card
            key={index}
            onClick={() => (item.label !== 'Total'&& item.number > 0) && onFilterStatus?.(item.label)}
            style={{
              flex: '1',
              minWidth: '200px',
              background: '#fff',
              borderRadius: '10px',
              padding: '20px 20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              flexBasis: '15%',
              cursor: item.label !== 'Total' ? 'pointer' : 'default',
              opacity: item.number === 0 ? 0.5 : 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>{item.label}</p>
                <h3 style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 'bold', color: '#000' }}>
                  {item.number}
                </h3>
              </div>
              <div
                style={{
                  background: item.bgColor,
                  borderRadius: '50%',
                  padding: '10px 13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: item.iconColor }}>{item.icon}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const getPieChartData = (data, isTicket, period, monthOffset, periodType) => {
  const filteredData = filterByPeriod(data, period, monthOffset, periodType);
  const { complete, pending, planned, notPlanned } = getSummary(filteredData, isTicket);

  if (complete === 0 && pending === 0 && planned === 0 && notPlanned === 0) {
    return {
      labels: ["No Data Available"],
      datasets: [
        {
          data: [0],
          backgroundColor: ["#e0e0e0"],
          borderWidth: 1,
        },
      ],
      noData: true, // you can still keep a flag if you want
    };
  }

  return {
    labels: ['Complete', 'SLA not meet', 'Planned', 'Not Planned'],
    datasets: [
      {
        data: [complete, pending, planned, notPlanned],
        backgroundColor: ['#4CAF50', '#F44336', "#13c2c2", "#fa8c16"], // Green for Complete, Red for Pending
        borderWidth: 1,
      },
    ],
  };
};

// Get the current period label for display
const getPeriodLabel = (period, offset) => {
  if (period === 'week') {
    const start = moment().add(offset, 'weeks').startOf('isoWeek');
    const end   = moment().add(offset, 'weeks').endOf('isoWeek');
    return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
  }
  if (period === 'month') {
    return moment().add(offset, 'months').format('MMMM YYYY');
  }
  if (period === 'today') {
    return moment().format('MMM D, YYYY');
  }
  if (period === 'yesterday') {
    return moment().subtract(1, 'days').format('MMM D, YYYY');
  }
  return '';
};


const getSlaData = (data, period, monthOffset) => {
  // Filter tasks by period and is_ticket_task
  const filteredData = filterByPeriod(data, period, monthOffset).filter((task) => task.is_ticket_task === true);

  // Group by unique task_category_name
  const grouped = {};
  filteredData.forEach((task) => {
    const key = task.task_category_name || 'Unknown';
    if (!grouped[key]) {
      grouped[key] = {
        task_category_name: key,
        tasks: [],
      };
    }
    grouped[key].tasks.push(task);
  });

  // Aggregate SLA counts across all categories
  let met = 0;
  let notMet = 0;
  Object.values(grouped).forEach((group) => {
    group.tasks.forEach((task) => {
      if (task.is_sla_met === true) {
        met++;
      } else if (task.is_sla_met === false || task.task_status) {
        notMet++;
      }
    });
  });

  
  // Calculate percentages
  const total = met + notMet;
  const metPercentage = total > 0 ? (met / total) * 100 : 0;
  const notMetPercentage = total > 0 ? (notMet / total) * 100 : 0;

    if (total === 0 && metPercentage === 0 && notMetPercentage === 0) {
    return {
      labels: ["No Data Available"],
      datasets: [
        {
          data: [0],
          backgroundColor: ["#e0e0e0"],
          borderWidth: 1,
        },
      ],
      noData: true, // you can still keep a flag if you want
    };
  }

  return {
    labels: ['Met', 'Not Met'],
    datasets: [
      {
        data: [metPercentage, notMetPercentage],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],
  };
}

// ✅ Doughnut wrapper component
export const SlaChart = ({ data, title, monthOffset, period }) => {
  const slaData = getSlaData(data, period, monthOffset);

  return (
    <Card>
      <h4 style={{ marginBottom: '1rem' }}>{title}</h4>
      <div style={{ height: '250px' }}>
        <Doughnut
          data={slaData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              tooltip: {
                callbacks: {
                  label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(1)}%`,
                },
              },
            },
          }}
        />
      </div>
    </Card>
  );
};

export default FmsDashBoard