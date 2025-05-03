"use client"

import { useState } from "react"
import styled from "styled-components"
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaDownload,
  FaFilter,
  FaUsers,
  FaUserClock,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"

const AnalyticsHeader = styled.div`
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

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textLight};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const StatIcon = styled.div`
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

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
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

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("month")

  // Stats data
  const stats = [
    {
      icon: <FaUsers />,
      value: "124",
      label: "Total Employees",
      color: "primary",
    },
    {
      icon: <FaUserClock />,
      value: "92%",
      label: "Attendance Rate",
      color: "success",
    },
    {
      icon: <FaCalendarCheck />,
      value: "45",
      label: "Leave Requests",
      color: "warning",
    },
    {
      icon: <FaMoneyBillWave />,
      value: "$12,450",
      label: "Expense Claims",
      color: "secondary",
    },
  ]

  return (
    <Layout title="Analytics & Reporting">
      <AnalyticsHeader>
        <div>
          <h2>Analytics & Reporting</h2>
          <p>View detailed reports and analytics</p>
        </div>

        <div>
          <Button variant="outline" style={{ marginRight: "0.5rem" }}>
            <FaDownload /> Export Report
          </Button>
          <Button variant="primary">
            <FaChartBar /> Custom Report
          </Button>
        </div>
      </AnalyticsHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon color={stat.color}>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
            <FaChartLine style={{ marginRight: "0.5rem" }} />
            Overview
          </Tab>
          <Tab active={activeTab === "attendance"} onClick={() => setActiveTab("attendance")}>
            <FaUserClock style={{ marginRight: "0.5rem" }} />
            Attendance
          </Tab>
          <Tab active={activeTab === "leave"} onClick={() => setActiveTab("leave")}>
            <FaCalendarCheck style={{ marginRight: "0.5rem" }} />
            Leave
          </Tab>
          <Tab active={activeTab === "expenses"} onClick={() => setActiveTab("expenses")}>
            <FaMoneyBillWave style={{ marginRight: "0.5rem" }} />
            Expenses
          </Tab>
        </TabContainer>

        <FilterContainer>
          <FilterSelect value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </FilterSelect>

          <FilterSelect>
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Sales</option>
          </FilterSelect>

          <Button variant="outline" size="sm">
            <FaFilter /> Filter
          </Button>
        </FilterContainer>

        {activeTab === "overview" && (
          <div>
            <ChartContainer>
              <FaChartLine size={40} />
              <p>Overview Chart will be displayed here</p>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card title="Department Distribution">
                <ChartContainer>
                  <FaChartPie size={40} />
                  <p>Department Distribution Chart will be displayed here</p>
                </ChartContainer>
              </Card>

              <Card title="Employee Growth">
                <ChartContainer>
                  <FaChartBar size={40} />
                  <p>Employee Growth Chart will be displayed here</p>
                </ChartContainer>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div>
            <ChartContainer>
              <FaUserClock size={40} />
              <p>Attendance Analytics will be displayed here</p>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card title="Daily Attendance">
                <ChartContainer>
                  <FaChartLine size={40} />
                  <p>Daily Attendance Chart will be displayed here</p>
                </ChartContainer>
              </Card>

              <Card title="Late Arrivals">
                <ChartContainer>
                  <FaChartBar size={40} />
                  <p>Late Arrivals Chart will be displayed here</p>
                </ChartContainer>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "leave" && (
          <div>
            <ChartContainer>
              <FaCalendarCheck size={40} />
              <p>Leave Analytics will be displayed here</p>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card title="Leave Type Distribution">
                <ChartContainer>
                  <FaChartPie size={40} />
                  <p>Leave Type Distribution Chart will be displayed here</p>
                </ChartContainer>
              </Card>

              <Card title="Monthly Leave Trends">
                <ChartContainer>
                  <FaChartLine size={40} />
                  <p>Monthly Leave Trends Chart will be displayed here</p>
                </ChartContainer>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "expenses" && (
          <div>
            <ChartContainer>
              <FaMoneyBillWave size={40} />
              <p>Expense Analytics will be displayed here</p>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card title="Expense Categories">
                <ChartContainer>
                  <FaChartPie size={40} />
                  <p>Expense Categories Chart will be displayed here</p>
                </ChartContainer>
              </Card>

              <Card title="Monthly Expense Trends">
                <ChartContainer>
                  <FaChartLine size={40} />
                  <p>Monthly Expense Trends Chart will be displayed here</p>
                </ChartContainer>
              </Card>
            </div>
          </div>
        )}
      </Card>

      <Card title="Custom Report Builder" style={{ marginTop: "2rem" }}>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <FaChartBar size={40} style={{ marginBottom: "1rem", color: "#6C63FF" }} />
          <h3>Build Custom Reports</h3>
          <p>Create custom reports by selecting metrics, dimensions, and filters.</p>
          <Button variant="primary" style={{ marginTop: "1rem" }}>
            Create New Report
          </Button>
        </div>
      </Card>
    </Layout>
  )
}

export default Analytics

