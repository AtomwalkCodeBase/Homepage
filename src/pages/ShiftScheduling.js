"use client"

import { useState } from "react"
import styled from "styled-components"
import {
  FaCalendarAlt,
  FaExchangeAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaFileExport,
  FaUserClock,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const ShiftHeader = styled.div`
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

const WeekNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const WeekTitle = styled.h3`
  margin: 0;
`

const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ShiftGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const ShiftGridHeader = styled.div`
  font-weight: 500;
  text-align: center;
  padding: 0.5rem;
  
  &:first-child {
    text-align: left;
  }
`

const ShiftGridRow = styled.div`
  display: contents;
  
  &:hover > div {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`

const ShiftGridCell = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:first-child {
    font-weight: 500;
    justify-content: flex-start;
  }
`

const ShiftTag = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  text-align: center;
  
  ${(props) =>
    props.type === "morning" &&
    `
    background: ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primary};
  `}
  
  ${(props) =>
    props.type === "afternoon" &&
    `
    background: ${props.theme.colors.secondaryLight};
    color: ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.type === "night" &&
    `
    background: ${props.theme.colors.info}22;
    color: ${props.theme.colors.info};
  `}
  
  ${(props) =>
    props.type === "off" &&
    `
    background: ${props.theme.colors.error}22;
    color: ${props.theme.colors.error};
  `}
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

const ShiftScheduling = () => {
  const [currentWeek, setCurrentWeek] = useState("Dec 04 - Dec 10, 2023")
  const [activeTab, setActiveTab] = useState("schedule")

  // Mock data for shifts
  const shifts = [
    { id: 1, name: "Morning Shift", time: "06:00 AM - 02:00 PM", type: "morning" },
    { id: 2, name: "Afternoon Shift", time: "02:00 PM - 10:00 PM", type: "afternoon" },
    { id: 3, name: "Night Shift", time: "10:00 PM - 06:00 AM", type: "night" },
    { id: 4, name: "Day Off", time: "-", type: "off" },
  ]

  // Mock data for employees
  const employees = [
    { id: 1, name: "Ashutosh Mohapatra", department: "Engineering" },
    { id: 2, name: "Jane Smith", department: "Marketing" },
    { id: 3, name: "Mike Johnson", department: "HR" },
    { id: 4, name: "Sarah Williams", department: "Finance" },
    { id: 5, name: "Robert Brown", department: "Sales" },
  ]

  // Mock data for schedule
  const schedule = [
    {
      employee: employees[0],
      shifts: [shifts[0], shifts[0], shifts[0], shifts[0], shifts[3], shifts[3], shifts[0]],
    },
    {
      employee: employees[1],
      shifts: [shifts[1], shifts[1], shifts[1], shifts[1], shifts[1], shifts[3], shifts[3]],
    },
    {
      employee: employees[2],
      shifts: [shifts[2], shifts[2], shifts[2], shifts[3], shifts[2], shifts[2], shifts[2]],
    },
    {
      employee: employees[3],
      shifts: [shifts[0], shifts[0], shifts[3], shifts[0], shifts[0], shifts[0], shifts[3]],
    },
    {
      employee: employees[4],
      shifts: [shifts[1], shifts[1], shifts[1], shifts[1], shifts[1], shifts[3], shifts[3]],
    },
  ]

  // Mock data for shift requests
  const shiftRequests = [
    {
      id: 1,
      employee: "Ashutosh Mohapatra",
      currentShift: "Morning Shift (Dec 09)",
      requestedShift: "Day Off",
      reason: "Personal appointment",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Jane Smith",
      currentShift: "Afternoon Shift (Dec 07)",
      requestedShift: "Morning Shift",
      reason: "Doctor appointment in the evening",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Mike Johnson",
      currentShift: "Night Shift (Dec 08)",
      requestedShift: "Afternoon Shift",
      reason: "Family event",
      status: "Rejected",
    },
  ]

  // Days of the week
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <Layout title="Shift Scheduling">
      <ShiftHeader>
        <div>
          <h2>Shift Scheduling</h2>
          <p>Manage employee shifts and schedules</p>
        </div>

        <div>
          <Button variant="outline" style={{ marginRight: "0.5rem" }}>
            <FaFileExport /> Export Schedule
          </Button>
          <Button variant="primary">
            <FaPlus /> Create Schedule
          </Button>
        </div>
      </ShiftHeader>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "schedule"} onClick={() => setActiveTab("schedule")}>
            Weekly Schedule
          </Tab>
          <Tab active={activeTab === "shifts"} onClick={() => setActiveTab("shifts")}>
            Manage Shifts
          </Tab>
          <Tab active={activeTab === "requests"} onClick={() => setActiveTab("requests")}>
            Shift Change Requests
          </Tab>
        </TabContainer>

        {activeTab === "schedule" && (
          <>
            <WeekNavigation>
              <NavButton>&lt; Previous Week</NavButton>
              <WeekTitle>
                <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                {currentWeek}
              </WeekTitle>
              <NavButton>Next Week &gt;</NavButton>
            </WeekNavigation>

            <FilterContainer>
              <FilterSelect>
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>HR</option>
                <option>Finance</option>
                <option>Sales</option>
              </FilterSelect>

              <FilterSelect>
                <option>All Shifts</option>
                <option>Morning Shift</option>
                <option>Afternoon Shift</option>
                <option>Night Shift</option>
              </FilterSelect>

              <Button variant="outline" size="sm">
                <FaFilter /> Filter
              </Button>
            </FilterContainer>

            <ShiftGrid>
              <ShiftGridHeader>Employee</ShiftGridHeader>
              {weekdays.map((day) => (
                <ShiftGridHeader key={day}>{day}</ShiftGridHeader>
              ))}

              {schedule.map((item, index) => (
                <ShiftGridRow key={index}>
                  <ShiftGridCell>{item.employee.name}</ShiftGridCell>
                  {item.shifts.map((shift, shiftIndex) => (
                    <ShiftGridCell key={shiftIndex}>
                      <ShiftTag type={shift.type}>{shift.name}</ShiftTag>
                    </ShiftGridCell>
                  ))}
                </ShiftGridRow>
              ))}
            </ShiftGrid>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index}>
                      <td>{item.employee.name}</td>
                      <td>{item.employee.department}</td>
                      {item.shifts.map((shift, shiftIndex) => (
                        <td key={shiftIndex}>
                          <Badge
                            variant={
                              shift.type === "morning"
                                ? "primary"
                                : shift.type === "afternoon"
                                  ? "secondary"
                                  : shift.type === "night"
                                    ? "info"
                                    : "error"
                            }
                          >
                            {shift.type === "off" ? "Off" : shift.name.split(" ")[0]}
                          </Badge>
                        </td>
                      ))}
                      <td>
                        <ActionButtons>
                          <Button variant="ghost" size="sm" title="Edit">
                            <FaEdit />
                          </Button>
                        </ActionButtons>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
          </>
        )}

        {activeTab === "shifts" && (
          <>
            <Button variant="primary" style={{ marginBottom: "1rem" }}>
              <FaPlus /> Add New Shift
            </Button>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Shift Name</th>
                    <th>Timing</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((shift) => (
                    <tr key={shift.id}>
                      <td>{shift.name}</td>
                      <td>{shift.time}</td>
                      <td>
                        <Badge
                          variant={
                            shift.type === "morning"
                              ? "primary"
                              : shift.type === "afternoon"
                                ? "secondary"
                                : shift.type === "night"
                                  ? "info"
                                  : "error"
                          }
                        >
                          {shift.type.charAt(0).toUpperCase() + shift.type.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <ActionButtons>
                          <Button variant="ghost" size="sm" title="Edit">
                            <FaEdit />
                          </Button>
                          <Button variant="ghost" size="sm" title="Delete">
                            <FaTrash />
                          </Button>
                        </ActionButtons>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
          </>
        )}

        {activeTab === "requests" && (
          <>
            <Button variant="primary" style={{ marginBottom: "1rem" }}>
              <FaExchangeAlt /> Request Shift Change
            </Button>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Current Shift</th>
                    <th>Requested Shift</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.employee}</td>
                      <td>{request.currentShift}</td>
                      <td>{request.requestedShift}</td>
                      <td>{request.reason}</td>
                      <td>
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "success"
                              : request.status === "Pending"
                                ? "warning"
                                : "error"
                          }
                        >
                          {request.status}
                        </Badge>
                      </td>
                      <td>
                        <ActionButtons>
                          {request.status === "Pending" && (
                            <>
                              <Button variant="primary" size="sm">
                                Approve
                              </Button>
                              <Button variant="outline" size="sm">
                                Reject
                              </Button>
                            </>
                          )}
                          {request.status !== "Pending" && (
                            <Button variant="ghost" size="sm" title="View">
                              <FaUserClock />
                            </Button>
                          )}
                        </ActionButtons>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
          </>
        )}
      </Card>
    </Layout>
  )
}

export default ShiftScheduling

