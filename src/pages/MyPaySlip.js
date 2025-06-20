"use client"

import { useState, useEffect } from "react"
import { jsPDF } from "jspdf";
import styled from "styled-components"
import {
  FaFileInvoiceDollar,
  FaDownload,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaMoneyBillWave,
  FaPlus,
  FaMinus,
  FaPrint,
  FaEye,
} from "react-icons/fa"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import { getemppayslip } from "../services/productServices"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"

const PayslipHeader = styled.div`
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

const HeaderText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
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
  
  ${(props) =>
    props.color === "error" &&
    `
    background: ${props.theme.colors.error}22;
    color: ${props.theme.colors.error};
  `}
`

const SummaryValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const MonthButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
  
  &:disabled {
    color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`

const CurrentMonth = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const PayslipContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const PayslipHeader2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const CompanyInfo = styled.div`
  h2 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
  }
`

const PayslipActions = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`

const EmployeeInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const InfoItem = styled.div`
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  p {
    margin: 0;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`

const SalaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SalarySection = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
    }
  }
`

const SalaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  th {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 500;
  }
  
  td:last-child {
    text-align: right;
    font-weight: 600;
  }
`

const TotalRow = styled.tr`
  background: ${({ theme }) => theme.colors.primaryLight};
  
  td {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 2rem;
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
const MyPaySlips = styled.div`
        font-size: 2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};`
const MyPaySlip = () => {
  const [activeTab, setActiveTab] = useState("current")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [salaryData, setSalaryData] = useState([])
  const { profile, companyInfo } = useAuth()
  console.log(currentMonth, "profile")

  useEffect(() => {
    const fetchSalaryData = async () => {
      const formattedMonth = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`
      await getemppayslip(formattedMonth).then((response) => {
        if (response.status === 200) {
          setSalaryData(response.data)
        }
        else if (response.status === 400) {
          toast.error("No salary data available for this month")
        }
        else {
          toast.error("Failed to fetch salary data")
        }
      })
    }
    fetchSalaryData()
  }, [currentMonth])

  // Calculate totals
  const grossSalary = salaryData.find((item) => item.sg_type === "G")?.sg_amt || 0
  const basicSalary = salaryData.find((item) => item.sg_type === "B")?.sg_amt || 0
  const totalEarnings = salaryData
    .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
    .reduce((sum, item) => sum + item.sg_amt, 0)
  const totalDeductions = salaryData.filter((item) => item.sg_type === "D").reduce((sum, item) => sum + item.sg_amt, 0)
  const netSalary = grossSalary - totalDeductions

  // Prepare data for charts
  const pieChartData = [
    { name: "Basic Salary", value: basicSalary, color: "#6C63FF" },
    {
      name: "Other Earnings",
      value: totalEarnings - basicSalary,
      color: "#63FFDA",
    },
    { name: "Deductions", value: totalDeductions, color: "#FF6584" },
  ]

  const barChartData = [
    { name: "Basic", amount: basicSalary },
    { name: "Allowances", amount: totalEarnings - basicSalary },
    { name: "Deductions", amount: -totalDeductions },
    { name: "Net", amount: netSalary },
  ]


  const changeMonth = (direction) => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentMonth(newDate)
  }

  const handleViewPayslip = async (monthDate) => {
    try {
      const formattedMonth = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;
      const response = await getemppayslip(formattedMonth);

      if (response.status === 200) {
        // Set the current month to the viewed month and update salary data
        setCurrentMonth(monthDate);
        setSalaryData(response.data);
      } else if (response.status === 400) {
        toast.error("Payslip not generated for this month yet");
      } else {
        toast.error("Failed to fetch payslip data");
      }
    } catch (error) {
      toast.error("Error fetching payslip data");
    }
  };
  const handleDownloadPayslipForMonth = async (monthDate) => {
    try {
      const formattedMonth = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;
      const response = await getemppayslip(formattedMonth);

      if (response.status === 200) {
        // Generate PDF with the response data
        generatePdf(response.data, monthDate);
      } else if (response.status === 400) {
        toast.error("Cannot download - Payslip not generated for this month yet");
      } else {
        toast.error("Failed to download payslip");
      }
    } catch (error) {
      toast.error("Error downloading payslip");
    }
  };

  const generatePdf = (data, monthDate) => {
    // Calculate totals from the data
    const grossSalary = data.find((item) => item.sg_type === "G")?.sg_amt || 0;
    const totalEarnings = data
      .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
      .reduce((sum, item) => sum + item.sg_amt, 0);
    const totalDeductions = data.filter((item) => item.sg_type === "D").reduce((sum, item) => sum + item.sg_amt, 0);
    const netSalary = grossSalary - totalDeductions;

    const doc = new jsPDF();

    // Add company logo and header
    doc.setFontSize(18);
    doc.text(companyInfo.name, 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`Pay Slip for ${monthDate.toLocaleString("default", { month: "long", year: "numeric" })}`, 105, 30, { align: 'center' });

    // Add employee info
    doc.setFontSize(12);
    doc.text(`Employee Name: ${profile.name}`, 20, 45);
    doc.text(`Employee ID: ${profile.emp_id}`, 20, 55);
    doc.text(`Department: ${profile.department_name}`, 20, 65);

    // Add salary details
    doc.setFontSize(14);
    doc.text("Earnings", 20, 80);

    let yPosition = 90;
    data.filter((item) => item.sg_type !== "D" && item.sg_type !== "G").forEach(item => {
      doc.text(`${item.name}: ₹${item.sg_amt.toLocaleString()}`, 25, yPosition);
      yPosition += 10;
    });

    doc.text(`Total Earnings: ₹${totalEarnings.toLocaleString()}`, 25, yPosition);
    yPosition += 20;

    doc.text("Deductions", 20, yPosition);
    yPosition += 10;

    data.filter((item) => item.sg_type === "D").forEach(item => {
      doc.text(`${item.name}: ₹${item.sg_amt.toLocaleString()}`, 25, yPosition);
      yPosition += 10;
    });

    doc.text(`Total Deductions: ₹${totalDeductions.toLocaleString()}`, 25, yPosition);
    yPosition += 20;

    doc.setFontSize(16);
    doc.text(`Net Salary: ₹${netSalary.toLocaleString()}`, 20, yPosition, { color: '#6C63FF' });

    // Save the PDF
    doc.save(`payslip_${monthDate.getFullYear()}_${monthDate.getMonth() + 1}.pdf`);
  };
  const handlePrintPayslip = () => {
    // Create a print-friendly version of the payslip
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Pay Slip - ${currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2, h3 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; background-color: #f9f9f9; }
            .net-pay { font-size: 1.5em; color: #6C63FF; margin-top: 20px; }
            @media print {
              .no-print { display: none; }
              body { margin: 0; padding: 10px; }
            }
          </style>
        </head>
        <body>
        <img src="${companyInfo.image}" alt="Company Logo" style="width: 70px; margin-bottom: 20px;" />
          <h1>${companyInfo.name}</h1>
          <h2>Pay Slip for ${currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
          
          <div style="margin-bottom: 20px;">
            <p><strong>Employee Name:</strong>${profile.name}</p>
            <p><strong>Employee ID:</strong> ${profile.emp_id}</p>
            <p><strong>Department:</strong>${profile.department_name} </p>
          </div>
          
          <h3>Earnings</h3>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${salaryData
        .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
        .map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.sg_amt.toLocaleString()}</td>
                  </tr>
                `).join('')}
              <tr class="total-row">
                <td>Total Earnings</td>
                <td>${totalEarnings.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          
          <h3>Deductions</h3>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${salaryData
        .filter((item) => item.sg_type === "D")
        .map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.sg_amt.toLocaleString()}</td>
                  </tr>
                `).join('')}
              <tr class="total-row">
                <td>Total Deductions</td>
                <td>${totalDeductions.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="net-pay">
            <strong>Net Pay:</strong> ₹${netSalary.toLocaleString()}
          </div>
          
          <p style="margin-top: 30px; font-style: italic;" class="no-print">
            This is a system generated pay slip and does not require signature.
          </p>
          
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Layout title="My Pay Slip">
      <PayslipHeader>
        <div>
          <HeaderText>View and download your monthly salary statements</HeaderText>
        </div>

        <Button onClick={handlePrintPayslip} variant="primary">
          <FaDownload style={{ marginRight: "0.5rem" }} /> Download Pay Slip
        </Button>
      </PayslipHeader>

      <SummaryGrid>
        <SummaryCard>
          <SummaryIcon color="primary">
            <FaMoneyBillWave />
          </SummaryIcon>
          <SummaryValue>₹{grossSalary.toLocaleString()}</SummaryValue>
          <SummaryLabel>Gross Salary</SummaryLabel>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon color="success">
            <FaPlus />
          </SummaryIcon>
          <SummaryValue>₹{totalEarnings.toLocaleString()}</SummaryValue>
          <SummaryLabel>Total Earnings</SummaryLabel>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon color="error">
            <FaMinus />
          </SummaryIcon>
          <SummaryValue>₹{totalDeductions.toLocaleString()}</SummaryValue>
          <SummaryLabel>Total Deductions</SummaryLabel>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon color="secondary">
            <FaFileInvoiceDollar />
          </SummaryIcon>
          <SummaryValue>₹{netSalary.toLocaleString()}</SummaryValue>
          <SummaryLabel>Net Salary</SummaryLabel>
        </SummaryCard>
      </SummaryGrid>

      <MonthSelector>
        <MonthButton onClick={() => changeMonth(-1)}>
          <FaChevronLeft />
        </MonthButton>
        <CurrentMonth>
          <FaCalendarAlt /> {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </CurrentMonth>
        <MonthButton
          onClick={() => changeMonth(1)}
          disabled={
            currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()
          }
        >
          <FaChevronRight />
        </MonthButton>
      </MonthSelector>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "current"} onClick={() => setActiveTab("current")}>
            Current Pay Slip
          </Tab>
          <Tab active={activeTab === "history"} onClick={() => setActiveTab("history")}>
            Pay Slip History
          </Tab>
          <Tab active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")}>
            Salary Analytics
          </Tab>
        </TabContainer>

        {activeTab === "current" && (
          <PayslipContainer>
            <PayslipHeader2>
              <CompanyInfo>
                <img src={companyInfo.image} alt="Company Logo" style={{ width: "70px", marginRight: "1rem" }} />
                <h2>{companyInfo.name}</h2>
                <p>Pay Slip for {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</p>
              </CompanyInfo>

              <PayslipActions>
                {/* <Button variant="outline" size="sm">
                  <FaEnvelope /> Email
                </Button> */}
                <Button onClick={handlePrintPayslip} variant="outline" size="sm">
                  <FaPrint /> Print
                </Button>
                <Button onClick={handlePrintPayslip} variant="primary" size="sm">
                  <FaDownload /> Download
                </Button>
              </PayslipActions>
            </PayslipHeader2>

            <EmployeeInfo>
              <InfoItem>
                <h4>Employee Name</h4>
                <p>{profile.name}</p>
              </InfoItem>

              <InfoItem>
                <h4>Employee ID</h4>
                <p>{profile.emp_id}</p>
              </InfoItem>

              <InfoItem>
                <h4>Department</h4>
                <p>{profile.department_name}</p>
              </InfoItem>

              <InfoItem>
                <h4>Designation</h4>
                <p>{profile.grade_name}</p>
              </InfoItem>

              <InfoItem>
                <h4>Bank Account</h4>
                <p>XXXX-XXXX-1234</p>
              </InfoItem>

              <InfoItem>
                <h4>Mobile Number</h4>
                <p>{profile.mobile_number}</p>
              </InfoItem>
            </EmployeeInfo>

            <SalaryGrid>
              <SalarySection>
                <h3>
                  <FaPlus /> Earnings
                </h3>

                <SalaryTable>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryData
                      .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.sg_amt.toLocaleString()}</td>
                        </tr>
                      ))}
                    <TotalRow>
                      <td>Total Earnings</td>
                      <td>{totalEarnings.toLocaleString()}</td>
                    </TotalRow>
                  </tbody>
                </SalaryTable>
              </SalarySection>

              <SalarySection>
                <h3>
                  <FaMinus /> Deductions
                </h3>

                <SalaryTable>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryData
                      .filter((item) => item.sg_type === "D")
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.sg_amt.toLocaleString()}</td>
                        </tr>
                      ))}
                    <TotalRow>
                      <td>Total Deductions</td>
                      <td>{totalDeductions.toLocaleString()}</td>
                    </TotalRow>
                  </tbody>
                </SalaryTable>
              </SalarySection>
            </SalaryGrid>

            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: "#333" }}>Net Pay</h3>
                <p style={{ margin: "0.5rem 0 0 0", color: "#666" }}>Amount credited to your bank account</p>
              </div>
              <MyPaySlips>
                ₹{netSalary.toLocaleString()}
              </MyPaySlips>
            </div>
          </PayslipContainer>
        )}

        {activeTab === "analytics" && (
          <div>
            <h3 style={{ marginTop: 0 }}>Salary Breakdown</h3>

            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <h3>Salary Components</h3>

            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${Math.abs(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="amount" fill="#6C63FF" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
        {activeTab === "history" && (
          <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Gross Salary</th>
                  <th>Total Earnings</th>
                  <th>Total Deductions</th>
                  <th>Net Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, index) => {
                  const date = new Date();
                  date.setMonth(date.getMonth() - index);

                  // Check if this is the current month being displayed
                  const isCurrentMonth =
                    date.getMonth() === currentMonth.getMonth() &&
                    date.getFullYear() === currentMonth.getFullYear();

                  return (
                    <tr key={index}>
                      <td>{date.toLocaleString("default", { month: "long", year: "numeric" })}</td>
                      <td>₹{isCurrentMonth ? grossSalary.toLocaleString() : "-"}</td>
                      <td>₹{isCurrentMonth ? totalEarnings.toLocaleString() : "-"}</td>
                      <td>₹{isCurrentMonth ? totalDeductions.toLocaleString() : "-"}</td>
                      <td>₹{isCurrentMonth ? netSalary.toLocaleString() : "-"}</td>
                      <td>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPayslip(date)}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadPayslipForMonth(date)}
                          >
                            <FaDownload />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </Layout>
  )
}

export default MyPaySlip
