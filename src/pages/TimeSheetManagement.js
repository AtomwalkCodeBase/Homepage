"use client"

import { useState } from "react"
import styled from "styled-components"
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaFileExport,
  FaFilter,
  FaClock,
  FaCheck,
  FaTimes,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const TimeSheetHeader = styled.div`
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

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const SummaryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  ${(props) =>
    props.color === "primary" &&
    `
    background: ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primary};
  `}
  
  ${(props) =>
    props.color === "secondary" &&
    `
    background: ${props.theme.colors.secondaryLight};
    color: ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.color === "success" &&
    `
    background: ${props.theme.colors.success}22;
    color: ${props.theme.colors.success};
  `}
  
  ${(props) =>
    props.color === "warning" &&
    `
    background: ${props.theme.colors.warning}22;
    color: ${props.theme.colors.warning};
  `}
`

const SummaryValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`

const TimeSheetManagement = () => {
  const [currentWeek, setCurrentWeek] = useState("Dec 04 - Dec 10, 2023")

  // Mock data for timesheet entries
  const timesheetEntries = [
    {
      id: 1,
      date: "2023-12-04",
      project: "Website Redesign",
      task: "UI Development",
      hours: 8,
      status: "Approved",
      notes: "Completed homepage redesign",
    },
    {
      id: 2,
      date: "2023-12-05",
      project: "Website Redesign",
      task: "UI Development",
      hours: 7.5,
      status: "Approved",
      notes: "Working on responsive design",
    },
    {
      id: 3,
      date: "2023-12-06",
      project: "Mobile App",
      task: "API Integration",
      hours: 8,
      status: "Approved",
      notes: "Integrated user authentication API",
    },
    {
      id: 4,
      date: "2023-12-07",
      project: "Mobile App",
      task: "API Integration",
      hours: 8,
      status: "Approved",
      notes: "Completed product listing API integration",
    },
    {
      id: 5,
      date: "2023-12-08",
      project: "Internal Tool",
      task: "Bug Fixing",
      hours: 6,
      status: "Pending",
      notes: "Fixed dashboard loading issues",
    },
  ]

  // Mock data for projects
  const projects = [
    { id: 1, name: "Website Redesign" },
    { id: 2, name: "Mobile App" },
    { id: 3, name: "Internal Tool" },
    { id: 4, name: "Client Project A" },
    { id: 5, name: "Client Project B" },
  ]

  // Summary data
  const summaryData = [
    {
      icon: <FaClock />,
      value: "37.5",
      label: "Hours This Week",
      color: "primary",
    },
    {
      icon: <FaCheck />,
      value: "31.5",
      label: "Approved Hours",
      color: "success",
    },
    {
      icon: <FaTimes />,
      value: "6",
      label: "Pending Hours",
      color: "warning",
    },
    {
      icon: <FaCalendarAlt />,
      value: "5",
      label: "Days Worked",
      color: "secondary",
    },
  ]

  return (
    <Layout title="Timesheet Management">
      <TimeSheetHeader>
        <div>
          <h2>Timesheet Management</h2>
          <p>Track and manage your working hours</p>
        </div>

        <div>
          <Button variant="outline" style={{ marginRight: "0.5rem" }}>
            <FaFileExport /> Export Timesheet
          </Button>
          <Button variant="primary">
            <FaPlus /> Add Time Entry
          </Button>
        </div>
      </TimeSheetHeader>

      <SummaryGrid>
        {summaryData.map((item, index) => (
          <SummaryCard key={index}>
            <SummaryIcon color={item.color}>{item.icon}</SummaryIcon>
            <SummaryValue>{item.value}</SummaryValue>
            <SummaryLabel>{item.label}</SummaryLabel>
          </SummaryCard>
        ))}
      </SummaryGrid>

      <Card>
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
            <option>All Projects</option>
            {projects.map((project) => (
              <option key={project.id}>{project.name}</option>
            ))}
          </FilterSelect>

          <FilterSelect>
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
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
                <th>Date</th>
                <th>Project</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timesheetEntries.map((entry) => {
                const entryDate = new Date(entry.date)
                const formattedDate = entryDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })

                return (
                  <tr key={entry.id}>
                    <td>{formattedDate}</td>
                    <td>{entry.project}</td>
                    <td>{entry.task}</td>
                    <td>{entry.hours}</td>
                    <td>{entry.notes}</td>
                    <td>
                      <Badge
                        variant={
                          entry.status === "Approved" ? "success" : entry.status === "Pending" ? "warning" : "error"
                        }
                      >
                        {entry.status}
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
                )
              })}
            </tbody>
          </table>
        </TableContainer>
      </Card>

      <Card title="Weekly Timesheet Summary" style={{ marginTop: "2rem" }}>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Website Redesign</td>
                <td>8</td>
                <td>7.5</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>15.5</td>
              </tr>
              <tr>
                <td>Mobile App</td>
                <td>0</td>
                <td>0</td>
                <td>8</td>
                <td>8</td>
                <td>0</td>
                <td>16</td>
              </tr>
              <tr>
                <td>Internal Tool</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>6</td>
                <td>6</td>
              </tr>
              <tr>
                <td>
                  <strong>Daily Total</strong>
                </td>
                <td>
                  <strong>8</strong>
                </td>
                <td>
                  <strong>7.5</strong>
                </td>
                <td>
                  <strong>8</strong>
                </td>
                <td>
                  <strong>8</strong>
                </td>
                <td>
                  <strong>6</strong>
                </td>
                <td>
                  <strong>37.5</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Card>
    </Layout>
  )
}

export default TimeSheetManagement

