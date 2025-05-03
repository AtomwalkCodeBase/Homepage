"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import {
  FaCalendarPlus,
  FaCalendarCheck,
  FaCalendarTimes,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import LeaveModal from "../components/modals/LeaveModal"
import { getEmpLeave, postEmpLeave } from "../services/productServices"
import { use } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import ConfirmationPopup from "../components/modals/ConfirmationPopup"
import { toast } from "react-toastify"
import { theme } from "../styles/Theme"

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const LeaveHeader = styled.div`
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

const LeaveBalanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const LeaveBalanceCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const LeaveType = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme, color }) => theme.colors[color] || theme.colors.primary};
  }
`

const LeaveTypeTitle = styled.div`
  font-weight: 500;
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.text};
`

const LeaveBalance = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.text};
`

const LeaveTotal = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
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
  color: ${({ theme }) => theme.colors.textLight};
`

const FilterSelect = styled.p`
 color: ${({ theme }) => theme.colors.textLight};
`

const TableContainer = styled.div`
  overflow-x: auto;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("my-requests")
  const [isOpen, setIsOpen] = useState(false)
  const emp_id = localStorage.getItem("empNoId") 
  const [leaveRequests, setLeaveRequests] = useState([])
  const [workleaveRequests, setworkleaveRequests] = useState([])
  const[teamLeaveRequests, setTeamLeaveRequests] = useState([])
  const [relode, setRelode] = useState(1)
  const [showPopup, setShowPopup] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  const count = leaveRequests.reduce((acc, request) => {
    acc[request.leave_type_display] = (acc[request.leave_type_display] || 0) + 1;
    return acc;
  }, {});
  const [formData, setFormData] = useState({
      leave_type: "",
      from_date: "",
      to_date: "",
      remarks: "",
      call_mode: "CANCEL",
      hrm_lite:"",
      emp_id: localStorage.getItem("empNoId"),
      leave_id: ""
    });
    const handleOpenPopup = (leaveRequests) => {
      setShowPopup(true);
      setFormData({
        ...formData,
        leave_type: leaveRequests.leave_type,
        from_date: leaveRequests.from_date,
        to_date: leaveRequests.to_date,
        remarks: leaveRequests.remarks,
        call_mode: "CANCEL",
        hrm_lite:"",
        leave_id: leaveRequests.id,
        emp_id: localStorage.getItem("empNoId")
      });
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    // const handleConfirm = () => {
    //   console.log('Live cancelled!');
    //   // Add your cancellation logic here
    //   setShowPopup(false);
    // };
    const handleConfirm=()=>{
      postEmpLeave(formData)
            .then(() => {
              setRelode(relode + 1);
              handleClosePopup();
              toast.success("Leave cancelled successfully");
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
    }
  const leaveBalances = [
    {
      type: "Earned Leave",
      icon: <FaCalendarAlt />,
      balance:count["Earned Leave"] ?count["Earned Leave"] + " " +"Applied": "No Earned Leave Applied", 
      color: "primary",
    },
    {
      type: "Work from Home",
      icon: <FaCalendarPlus  />,
      balance: workleaveRequests.length + " " +"Applied",
      color: "success",
    },
    {
      type: "Leave without Pay",
      icon: <FaCalendarCheck />,
      balance: count["Leave without Pay"]?count["Leave without Pay"]+ " " +"Applied":"No LOP Applied",
      color: "secondary",
    },
  ]

  const prepareChartData = () => {
    // Count leave types
    const leaveTypeCounts = leaveRequests.reduce((acc, request) => {
      acc[request.leave_type_display] = (acc[request.leave_type_display] || 0) + 1;
      return acc;
    }, {});
    // Count leave statuses
    const leaveStatusCounts = leaveRequests.reduce((acc, request) => {
      acc[request.status_display] = (acc[request.status_display] || 0) + 1;
      return acc;
    }, {});

    // Monthly leave distribution
    const monthlyLeave = leaveRequests.reduce((acc, request) => {
      const month = new Date(formatDate(request.from_date)).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + parseInt(request.no_leave_count);
      return acc;
    }, {});

    return {
      leaveTypeData: {
        labels: Object.keys(leaveTypeCounts),
        datasets: [
          {
            label: 'Leave Types',
            data: Object.values(leaveTypeCounts),
            backgroundColor: [
              'rgba(108, 99, 255, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(75, 192, 192, 0.7)',
            ],
            borderColor: [
              'rgba(108, 99, 255, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      leaveStatusData: {
        labels: Object.keys(leaveStatusCounts),
        datasets: [
          {
            label: 'Leave Status',
            data: Object.values(leaveStatusCounts),
            backgroundColor: [
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 99, 132, 0.7)',
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      monthlyLeaveData: {
        labels: Object.keys(monthlyLeave),
        datasets: [
          {
            label: 'Leave Days per Month',
            data: Object.values(monthlyLeave),
            backgroundColor: 'rgba(108, 99, 255, 0.7)',
            borderColor: 'rgba(108, 99, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
    };
  };

  const chartData = prepareChartData();
const openmodel = () => {
    setIsOpen(true)
  }
  const closemodel = () => {
    setIsOpen(false)
  }
  const leaveDetails = (data) => {
    getEmpLeave(data, emp_id)
      .then((res) => {
        setLeaveRequests(res.data);
      })
  };
  const workfromhome = (data) => {
    getEmpLeave(data, emp_id)
      .then((res) => {
        setworkleaveRequests(res.data);
      })
  };
  const teamleaveDetails = () => {
    getEmpLeave('A', emp_id)
      .then((res) => {
        setTeamLeaveRequests(res.data);
      })
  };
  useEffect(() => {
    leaveDetails('EL');
    teamleaveDetails();
    workfromhome("WH")
  }
  , [relode]);


  return (
    <Layout title="Leave Management">
      <LeaveHeader>
        <div>
          {/* <h2>Leave Management</h2> */}
          <FilterSelect>Apply for leave and track your leave balance</FilterSelect>
        </div>

        <Button variant="primary" onClick={openmodel}>
          <FaCalendarPlus /> Apply for Leave
        </Button>
      </LeaveHeader>

      <LeaveBalanceGrid>
        {leaveBalances.map((leave, index) => (
          <LeaveBalanceCard key={index}>
            <LeaveType color={leave.color}>
              {leave.icon}
              <LeaveTypeTitle>{leave.type}</LeaveTypeTitle>
            </LeaveType>
            <LeaveBalance color={leave.color}>{leave.balance}</LeaveBalance>
            {/* <LeaveTotal>of {leave.total} days</LeaveTotal> */}
          </LeaveBalanceCard>
        ))}
      </LeaveBalanceGrid>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "my-requests"} onClick={() => setActiveTab("my-requests")}>
            My Leave Requests
          </Tab>
          <Tab active={activeTab === "wh-requests"} onClick={() =>   setActiveTab("wh-requests")}>
            Work From Home Requests
          </Tab>
          <Tab active={activeTab === "team-requests"} onClick={() => setActiveTab("team-requests")}>
            Team Leave Requests
          </Tab>
          <Tab active={activeTab === "calendar"} onClick={() => setActiveTab("calendar")}>
          Leave Analitics
          </Tab>
          <Tab active={activeTab === "history"} onClick={() => setActiveTab("history")}>
            Leave History
          </Tab>
        </TabContainer>

        {/* <FilterContainer>
          <FilterSelect>
            <option>All Types</option>
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Personal Leave</option>
            <option>Compensatory Off</option>
          </FilterSelect>

          <FilterSelect>
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </FilterSelect>

          <Button variant="outline" size="sm">
            <FaFilter /> Filter
          </Button>
        </FilterContainer> */}

        <TableContainer>
          {activeTab === "my-requests" && (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Period</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.leave_type_display}</td>
                    <td>
                      {request.from_date} to {request.to_date}
                    </td>
                    <td>{Math.floor(parseFloat(request.no_leave_count))}</td>
                    <td>{request.remarks}</td>
                    <td>{request.submit_date}</td>
                    <td>
                      <Badge
                        variant={
                          request.status_display === "Approved" ? "success" : request.status_display === "Submitted" ? "warning" : "error"
                        }
                      >
                        {request.status_display}
                      </Badge>
                    </td>
                    <td>
                      <ActionButtons onClick={()=>handleOpenPopup(request)}>
                        {request.status_display === "Submitted" && (
                          <>
                        <Button variant="outlines" size="sm">
                        ❌ Cancel
                        </Button>
                          </>
                        )}
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "wh-requests" && (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Period</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workleaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.leave_type_display}</td>
                    <td>
                      {request.from_date} to {request.to_date}
                    </td>
                    <td>{Math.floor(parseFloat(request.no_leave_count))}</td>
                    <td>{request.remarks}</td>
                    <td>{request.submit_date}</td>
                    <td>
                      <Badge
                        variant={
                          request.status_display === "Approved" ? "success" : request.status_display === "Submitted" ? "warning" : "error"
                        }
                      >
                        {request.status_display}
                      </Badge>
                    </td>
                    <td>
                    <ActionButtons onClick={()=>handleOpenPopup(request)}>
                        {request.status_display === "Submitted" && (
                          <>
                        <Button variant="outlines" size="sm">
                        ❌ Cancel
                        </Button>
                          </>
                        )}
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "team-requests" && (
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Period</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamLeaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.emp_data?.name}</td>
                    <td>{request.leave_type_display}</td>
                    <td>
                    {request.from_date} to {request.to_date}
                    </td>
                    <td>{Math.floor(parseFloat(request.no_leave_count))}</td>
                    <td>{request.remarks}</td>
                    <td>{request.submit_date}</td>
                    <td>
                      <Badge
                        variant={
                          request.status_display === "Approved" ? "success" : request.status_display === "Submitted" ? "warning" : "error"
                        }
                      >
                        {request.status_display}
                      </Badge>
                    </td>
                    <td>
                      <ActionButtons>
                        <Button variant="ghost" size="sm" title="View">
                          <FaEye />
                        </Button>
                        <Button variant="primary" size="sm">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "calendar" && (
           <div style={{ padding: '20px' }}>
           <h3 style={{ color:`${theme.primary}`, marginBottom: '20px' }}>Leave Analytics</h3>
           
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
             <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
               <h4 style={{ marginBottom: '15px', color: `${theme.primary}` }}>Leave Type Distribution</h4>
               <div style={{ height: '300px' }}>
                 <Pie data={chartData.leaveTypeData} />
               </div>
             </div>
             
             <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
               <h4 style={{ marginBottom: '15px', color: `${theme.primary}` }}>Leave Status</h4>
               <div style={{ height: '300px' }}>
                 <Pie data={chartData.leaveStatusData} />
               </div>
             </div>
           </div>
           
           <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
             <h4 style={{ marginBottom: '15px', color: `${theme.primary}` }}>Monthly Leave Days</h4>
             <div style={{ height: '600px' }}>
               <Bar 
                 data={chartData.monthlyLeaveData} 
                 options={{
                   responsive: true,
                   plugins: {
                     legend: {
                       position: 'top',
                     },
                     title: {
                       display: true,
                       text: 'Leave Days per Month',
                     },
                   },
                 }}
               />
             </div>
           </div>
         </div>
       )}
          {activeTab === "history" && (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Period</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...leaveRequests]
                  .filter((req) => req.status_display !== "Submitted")
                  .map((request) => (
                    <tr key={request.id}>
                      <td>{request.leave_type_display}</td>
                      <td>
                        {request.from_date} to {request.to_date}
                      </td>
                      <td>{Math.floor(parseFloat(request.no_leave_count))}</td>
                      <td>{request.remarks}</td>
                      <td>{request.submit_date}</td>
                      <td>
                        <Badge variant={request.status_display === "Approved" ? "success" : "error"}>{request.status_display}</Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </TableContainer>
      </Card>
      <LeaveModal isOpen={isOpen} onClose={closemodel}></LeaveModal>
      <ConfirmationPopup  isOpen={showPopup}
        onClose={handleClosePopup}
        onConfirm={handleConfirm}></ConfirmationPopup>
    </Layout>
  )
}

export default LeaveManagement

