"use client"

import { useState, useEffect } from "react"
import jsPDF from "jspdf";
import styled from "styled-components"
import {FaFileInvoiceDollar, FaDownload, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaMoneyBillWave, FaPlus, FaMinus, FaPrint} from "react-icons/fa"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid} from "recharts"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import { getEmpLeave, getemppayslip } from "../services/productServices"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"
import Badge from "../components/Badge";

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
  margin-left: auto;
  margin-right: auto;
  
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
  grid-template-columns: 1fr;
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
    color: ${({ theme }) => theme.colors.primary};
  `

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const MyPaySlip = () => {
  const [activeTab, setActiveTab] = useState("current")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [salaryData, setSalaryData] = useState([])
  const [salaryRes, setSalaryRes] = useState([])
  const { profile, companyInfo } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [error, setError] = useState('');
  const emp_id = localStorage.getItem("empNoId") 
  const [leaveRequests, setLeaveRequests] = useState([])

  useEffect(() => {
      const fetchSalaryData = async () => {
      const formattedMonth = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`
      try {
        const res = await getemppayslip(formattedMonth);
        setSalaryData(res.data.salary_list);
        setSalaryRes(res.data);
      } catch (error) {
        setSalaryData([]);
        setSalaryRes([]);
        toast.error("No salary data available for this month")
      }
    }
    fetchSalaryData()
  }, [currentMonth])

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const calculateDays = (from, to) => {
    const fromDate = parseDate(from);
    const toDate = parseDate(to);
    if (!fromDate || !toDate) return 0;
    const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24);
    return diff + 1;
  };

  const fetchLeaveData = async (leaveType) => {
    const res = await getEmpLeave(leaveType, emp_id);
    return res.data
      .filter((item) => {
        const itemDate = parseDate(item.from_date);
        return (
          item.status_display === "Approved" &&
          itemDate?.getMonth() === currentMonth.getMonth() &&
          itemDate?.getFullYear() === currentMonth.getFullYear()
        );
      })
      .map((item_1) => ({
        ...item_1,
        days: calculateDays(item_1.from_date, item_1.to_date),
      }));
  };

  useEffect(() => {
    Promise.all([fetchLeaveData("EL"), fetchLeaveData("WH")]).then(
      ([earnedLeave, workFromHome]) => {
        // console.log([...earnedLeave, ...workFromHome])
        setLeaveRequests([...earnedLeave, ...workFromHome]);
      }
    );
  }, [currentMonth]);

  const counts = leaveRequests.reduce((acc, request) => {
    const leaveType = request.leave_type_display;
    const days = request.days || 0;
    acc[leaveType] = (acc[leaveType] || 0) + days;
    return acc;
  }, {});

  // Calculate totals
  const grossSalary = salaryData.find((item) => item.sg_type === "G")?.sg_amt || 0
  const basicSalary = salaryData.find((item) => item.sg_type === "B")?.sg_amt || 0
  const totalEarnings = salaryData
    .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
    .reduce((sum, item) => sum + item.sg_amt, 0);

  // Exclude Variable Pay from Net Salary calculation
  const fixedEarningsForNetSalary = salaryData
    .filter((item) => item.sg_type !== "D" && item.sg_type !== "G" && item.sg_type !== "V" && item.sg_type !== "R")
    .reduce((sum, item) => sum + item.sg_amt, 0);

  const totalDeductions = salaryData.filter((item) => item.sg_type === "D").reduce((sum, item) => sum + item.sg_amt, 0)
  const netSalary = fixedEarningsForNetSalary - totalDeductions;

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
      setError(''); // Clear any previous errors
      const formattedMonth = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;
      const response = await getemppayslip(formattedMonth);

      if (response.status === 200) {
        // Update salary data only for history view; do not mutate currentMonth
        setSalaryData(response.data.salary_list);
        setSalaryRes(response.data);
      } else if (response.status === 400) {
        setError("Payslip not generated for this month yet");
        setSalaryData([]);
        setSalaryRes([]);
      } else {
        setError("Failed to fetch payslip data");
        setSalaryData([]);
        setSalaryRes([]);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Error fetching payslip data");
      setSalaryData([]);
    }
  };

  const handleDownloadPayslipForMonth = async (monthDate) => {
    try {
      const formattedMonth = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;   
      const response = await getemppayslip(formattedMonth);

      if (response.status === 200) {
        generatePdf(response.data, monthDate);
        toast.success("Payslip downloaded successfully!");
      } else if (response.status === 400) {
        toast.error("Cannot download - Payslip not generated for this month yet");
      } else {
        toast.error("Failed to download payslip");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Error downloading payslip: " + (error?.response?.data?.message || error.message));
    }
  };
  
  const generatePdf = (data, monthDate) => {
    const salaryData = data?.salary_list || [];
    try {
      if (!Array.isArray(salaryData)) {
        throw new Error("Invalid salary data provided");
      }

      const fixedEarningsForNetSalary = salaryData
        .filter((item) => item.sg_type !== "D" && item.sg_type !== "G" && item.sg_type !== "V" && item.sg_type !== "R")
        .reduce((sum, item) => sum + item.sg_amt, 0);

      const totalDeductions = salaryData
        .filter((item) => item.sg_type === "D")
        .reduce((sum, item) => sum + item.sg_amt, 0);

      const netSalary = fixedEarningsForNetSalary - totalDeductions;

      const doc = new jsPDF();

      // === Header ===
      let currentY = 20;
      const leftX = 20;
      const rightX = 110;

      if (companyInfo.image) {
        try {
          doc.addImage(companyInfo.image, "PNG", leftX, 10, 40, 30);
        } catch (error) {
          console.log("Could not load company image:", error);
        }
      }

      let detailsY = currentY;
      doc.setFontSize(16);
      doc.text(companyInfo.name || "Company Name", rightX, detailsY, { align: "left" });

      doc.setFontSize(10);
      const addressLines = [
        companyInfo.address_line_1,
        companyInfo.address_line_2,
        companyInfo.address_line_3
      ];

      addressLines.forEach((line) => {
        if (line) {
          detailsY += 5;
          doc.text(line, rightX, detailsY, { align: "left" });
        }
      });

      detailsY += 5;
      if (companyInfo.pin_code) doc.text(`${companyInfo.pin_code}`, rightX, detailsY, { align: "left" });

      detailsY += 5;
      if (companyInfo.pan_number) doc.text(`PAN: ${companyInfo.pan_number}`, rightX, detailsY, { align: "left" });

      detailsY += 5;
      if (companyInfo.web_page) doc.text(`${companyInfo.web_page}`, rightX, detailsY, { align: "left" });

      currentY = Math.max(detailsY, currentY + 30);
      doc.setLineWidth(0.5);
      doc.line(20, currentY, 190, currentY);

      // Title
      currentY += 10;
      doc.setFontSize(14);
      doc.text(
        `Pay Slip - ${monthDate.toLocaleString("default", { month: "long", year: "numeric" })}`,
        105,
        currentY,
        { align: "center" }
      );

      const drawTable = (headers, rows, startY) => {
      let y = startY;
      const rowHeight = 8;
      const colWidths = [70, 110]; // adjust column widths
      const xStart = 20;

      doc.setFontSize(10);
      doc.setFont(undefined, "bold");

      // Header Row
      doc.rect(xStart, y, colWidths[0], rowHeight);
      doc.rect(xStart + colWidths[0], y, colWidths[1], rowHeight);
      doc.text(headers[0], xStart + 2, y + 6);
      doc.text(headers[1], xStart + colWidths[0] + 2, y + 6);
      y += rowHeight;

      doc.setFont(undefined, "normal");

      // Data Rows
      rows.forEach(([col1, col2]) => {
        doc.rect(xStart, y, colWidths[0], rowHeight);
        doc.rect(xStart + colWidths[0], y, colWidths[1], rowHeight);

        doc.text(String(col1), xStart + 2, y + 6);
        doc.text(String(col2), xStart + colWidths[0] + 2, y + 6);
        y += rowHeight;
      });

      return y;
    };

      // === Employee Details Table ===
      currentY += 15;
      doc.setFontSize(11);
      doc.text("Employee Pay Summary", 20, currentY);

      const employeeDetails = [
        ["Employee Name", profile?.name || "--"],
        ["Employee ID", profile?.emp_id || "--"],
        ["Department", profile?.department_name || "--"],
        ["Designation", profile?.job_title || "--"],
        ["Grade", profile?.grade_name || "--"],
        ["Date of Joining", profile?.date_of_join || "--"],
        ["Leave Details", `EL: ${counts?.["Earned Leave"] || 0}, WFH: ${counts?.["Work from Home"] || 0}, HD: ${counts?.["Half Day Leave"] || 0}, LWP: ${counts?.["Leave without Pay"] || 0}`],
        ["Salary Post Date", data?.post_date || "--"]
      ];

      const col1X = 20;
      const col2X = 80;
      const rowHeight = 8;
      currentY += 8;

      doc.setFontSize(9);
      employeeDetails.forEach(([field, value]) => {
        doc.text(field, col1X, currentY);
        doc.text(String(value), col2X, currentY);
        currentY += rowHeight;
      });

      // === Earnings Table ===
    const earnings = salaryData
      .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
      .map((item) => [item.name, `Rs. ${item.sg_amt.toLocaleString()}`]);

    if (earnings.length > 0) {
      currentY = drawTable(["Earnings", "+Amount (Rs.)"], earnings, currentY) + 10;
    }

    // === Deductions Table ===
    const deductions = salaryData
      .filter((item) => item.sg_type === "D")
      .map((item) => [item.name, `Rs. ${item.sg_amt.toLocaleString()}`]);

    if (deductions.length > 0) {
      deductions.push(["Total Deductions", `Rs. ${totalDeductions.toLocaleString()}`]);
      currentY = drawTable(["Deductions", "-Amount (Rs.)"], deductions, currentY) + 10;
    }

    // === Footer ===
    currentY += 5;
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text(
      `Total Net Payable: Rs. ${netSalary.toLocaleString()} (Rupees ${convertToWords(Math.floor(netSalary))})`,
      105,
      currentY,
      { align: "center" }
    );

    currentY += 10;
    doc.setFontSize(9);
    doc.setFont(undefined, "italic");
    doc.text(
      "This is a system generated pay slip and does not require signature.",
      105,
      currentY,
      { align: "center" }
    );

    if (!salaryRes?.is_posted) {
      currentY += 8;
      doc.setTextColor(255, 165, 0);
      doc.setFontSize(10);
      doc.text(
        "*This salary slip is provisional and has not yet been posted. Amounts are subject to change.",
        105,
        currentY,
        { align: "center" }
      );
      doc.setTextColor(0, 0, 0);
    }

    // Save PDF
    doc.save(`payslip_${monthDate.getFullYear()}_${monthDate.getMonth() + 1}.pdf`);

  } catch (error) {
    console.error("PDF Generation Error:", error);
    toast.error("Error generating PDF: " + error.message);
  }
  };


  const convertToWords = (amount) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (amount === 0) return 'Zero';

    const a = ['', 'Thousand', 'Lakh', 'Crore'];
    let i = 0;
    let words = '';

    while (amount > 0) {
        let rem = amount % 1000;
        if (rem !== 0) {
            let str = '';
            if (rem >= 100) {
                str += units[Math.floor(rem / 100)] + ' Hundred ';
                rem %= 100;
            }
            if (rem >= 10 && rem <= 19) {
                str += teens[rem - 10] + ' ';
                rem = 0;
            } else if (rem >= 20) {
                str += tens[Math.floor(rem / 10)] + ' ';
                rem %= 10;
            }
            if (rem > 0) str += units[rem] + ' ';
            words = str.trim() + ' ' + a[i] + (words ? ' ' + words : '');
        }
        amount = Math.floor(amount / 1000);
        i++;
    }

    return words.trim() + ' Only';
  }
  const handlePrintPayslip = () => {
    // Create a print-friendly version of the payslip
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
      <title>Pay Slip - ${currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</title>
      <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      .header {display: flex;justify-content: space-between; align-items: center;}
      .hr {border-top: 2px solid #a5a6f6;margin: 10px 0;}
      .summary { font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px;}
      .employee-details { display: flex; justify-content: space-between; margin-bottom: 20px;}
      .left { display: flex; flex-direction: row; font-size: 14px; line-height: 1.5;}
      .right {margin: auto;text-align: center}
      .net-pay-label { font-size: 18px; font-weight: bold;}
      .net-pay-amount { font-size: 24px; font-weight: bold;}
      .gross td {font-weight: bold;padding-top: 10px; color: #FF3D00}
      .orange { color: orange !important; }
      table { width: 100%; margin-bottom: 20px; }
      table th {
        text-align: left;
        padding-bottom: 5px;
        border-bottom: 1px solid #a5a6f6;
        border-bottom-style: dashed;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        color: #9091e6;
      }
      table td {padding: 5px 0;font-size: 14px;}
      .total-row { font-weight: bold; background-color: #f9f9f9; }
      @media print {
        .no-print { text-align: center; font-size: 12px; color: #666; margin-top: 20px; border-top: 1px solid #a5a6f6; padding-top: 10px; }
        body { margin: 0; padding: 10px; }
      }
      </style>
      </head>
      <body>
      <div class="header">
      <div>
      <div style="font-size: 18px;font-weight: bold;">${companyInfo.name}</div>
      ${companyInfo.address_line_1 ? `<div style="font-size: 12px;color: #333;">${companyInfo.address_line_1 || ""}</div> ` : ""}
      ${companyInfo.address_line_2 ? `<div style="font-size: 12px;color: #333;">${companyInfo.address_line_2 || ""}</div> ` : ""}
      ${companyInfo.address_line_3 ? `<div style="font-size: 12px;color: #333;">${companyInfo.address_line_3 || ""}</div> ` : ""}
      ${companyInfo.pan_number ? `<div style="font-size: 12px;color: #333;">${companyInfo.pan_number || ""}</div> ` : ""}
      ${companyInfo.web_page ? `<div style="font-size: 12px;color: #333;">${companyInfo.web_page || ""}</div> ` : ""}
      </div>
      <img src="${companyInfo.image}" alt="Company Logo" style="width: 130px; margin-bottom: 10px;" />
      </div>

      <hr class="hr">

      <h2>PaySlip for ${currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
      
      <div class="summary">EMPLOYEE PAY SUMMARY</div>
    <div class="employee-details">
      <table style="width: 50%; border-collapse: collapse; margin-bottom: 20px;">
      <tbody>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Employee Name :</td>
        <td style="padding: 3px 0; line-height: 1.3;">${profile.name}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Employee ID :</td>
        <td style="padding: 3px 0; line-height: 1.3;">${profile.emp_id}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Department :</td>
        <td style="padding: 3px 0; line-height: 1.3;">${profile.department_name || ""}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Designation :</td>
        <td style="padding: 3px 0; line-height: 1.3;">${profile.job_title || ""}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Grade :</td>
        <td style="padding: 3px 0; line-height: 1.3;">${profile.grade_name || ""}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Date of Joining :</td>
        <td style="padding: 3px 0; line-height: 1.3;">${profile.date_of_join || ""}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Leave Details :</td>
        <td style="padding: 3px 0; line-height: 1.3;">EL: ${counts["Earned Leave"] || 0}, WFH: ${counts["Work from Home"] || 0}, HD: ${counts["Half Day Leave"] || 0}, LWP: ${counts["Leave without Pay"] || 0}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 3px 0; line-height: 1.3;">Pay Date :</td>
        <td style="padding: 3px 0; line-height: 1.3;">${salaryRes.post_date|| ""}</td>
      </tr>
      </tbody>
      </table>
      <div class="right">
      <div class="net-pay-label">Net Pay</div>
      <div class="net-pay-amount">₹${netSalary.toLocaleString()}</div>
      </div>
    </div>

    <hr class="hr">
      <table>
      <thead>
        <tr>
        <th>EARNINGS</th>
        <th class="amount" style="text-align: end;">+AMOUNT (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${
        salaryData
        .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
        .map(item => `
        <tr${item.sg_type === "V" || item.sg_type === "R" ? ' class="orange"' : ''}>
          <td>${item.name}</td>
          <td style="text-align: end;">${item.sg_amt.toLocaleString()}</td>
        </tr>
        `).join('')
        }
      </tbody>
      </table>
      
      <hr class="hr">

      <table>
      <thead>
        <tr>
        <th>DEDUCTIONS</th>
        <th class="amount" style="text-align: end;">- Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${
        salaryData
        .filter((item) => item.sg_type === "D")
        .map(item => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align: end;">${item.sg_amt.toLocaleString()}</td>
        </tr>
        `).join('')
        }
        <tr class="gross">
        <td>Total Deductions</td>
        <td style="text-align: end;">${totalDeductions.toLocaleString()}</td>
        </tr>
      </tbody>
      </table>

       <hr class="hr">

      <div style="text-align: center;font-size: 14px;font-weight: bold;">
        Total Net Payable ${netSalary.toLocaleString()} (Rupees ${convertToWords(Math.floor(netSalary))} )
      </div>
      
      <p style="margin-top: 30px; font-style: italic;" class="no-print">
      This is a system generated pay slip and does not require signature.
      </p>
      ${
        !salaryRes.is_posted
        ? `<p style="margin-top: 12px; font-style: italic; text-align: center; font-size: 12px; color: #666;">
          *This salary slip is provisional and has not yet been posted. Amounts are subject to change.
          </p>`
        : ""
      }
      
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
        {salaryRes.is_posted &&
          <Button onClick={handlePrintPayslip} variant="primary">
            <FaDownload style={{ marginRight: "0.5rem" }} /> Download Pay Slip
          </Button>
        }
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
        {(activeTab === "current" || activeTab === "analytics") && (
          <MonthButton onClick={() => changeMonth(-1)}>
            <FaChevronLeft />
          </MonthButton>
        )}
        <CurrentMonth>
          <FaCalendarAlt /> {
            activeTab === "history" && selectedMonth
              ? new Date(`${selectedMonth}-01`).toLocaleString("default", { month: "long", year: "numeric" })
              : currentMonth.toLocaleString("default", { month: "long", year: "numeric" })
          }
        </CurrentMonth>
        {(activeTab === "current" || activeTab === "analytics") && (
          <MonthButton
            onClick={() => changeMonth(1)}
            disabled={
              currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()
            }
          >
            <FaChevronRight />
          </MonthButton>
        )}
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

             {salaryRes.is_posted &&
              <PayslipActions>
                <Button onClick={handlePrintPayslip} variant="outline" size="sm">
                  <FaPrint /> Print
                </Button>
                <Button onClick={handlePrintPayslip} variant="primary" size="sm">
                  <FaDownload /> Download
                </Button>
              </PayslipActions>
            }
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

              {profile.job_title &&
                <InfoItem>
                  <h4>Designation</h4>
                  <p>{profile.job_title}</p>
                </InfoItem>}

              <InfoItem>
                <h4>Grade</h4>
                <p>{profile.grade_name}</p>
              </InfoItem>

              {profile.mobile_number &&
                <InfoItem>
                  <h4>Mobile Number</h4>
                  <p>{profile.mobile_number}</p>
                </InfoItem>}

              
                <InfoItem>
                  <h4>Salary Post Date</h4>
                  <p>{salaryRes.is_posted ? salaryRes.post_date : "Not generated yet"}</p>
                </InfoItem>
            </EmployeeInfo>

            <SalaryGrid>
              <SalarySection>
                <h3  style={{ color: "#00C853"}}>
                  <FaPlus /> Earnings
                </h3>

                <SalaryTable>
                  <thead>
                    <tr>
                      <th>Component</th>
                      {/* <th>Frequency</th> */}
                      <th>Calculation Method</th>
                      <th style={{ textAlign: "end" }}>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryData.length === 0 ?
                      <td colSpan={4} style={{ textAlign: "center" }}>Salary slip no found</td>
                      :
                      salaryData
                        .filter((item) => item.sg_type !== "D" && item.sg_type !== "G")
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{item.name || '--'}</td>
                            {/* <td>{item.frequency_display || '--'}</td> */}
                            {/* <td>{`${item.c_method} (${item.sg_display})` || '--'}</td> */}
                            <td style={{display: "flex", flexDirection: "column"}}>
                              <span>{item.c_method || '--'}</span>
                              <span>{item.sg_display|| '--'}</span>
                            </td>
                            <td><Badge variant="success">₹{item.sg_amt.toLocaleString() || 0}</Badge></td>
                          </tr>
                        ))}

                    <TotalRow>
                      <td colSpan="2">Total Earnings</td>
                      <td>₹{totalEarnings.toLocaleString()}</td>
                    </TotalRow>
                  </tbody>
                </SalaryTable>
              </SalarySection>

              <SalarySection>
                <h3  style={{ color: "#FF3D00"}}>
                  <FaMinus /> Deductions
                </h3>

                <SalaryTable>
                  <thead>
                    <tr>
                      <th>Component</th>
                      {/* <th>Frequency</th> */}
                      <th>Calculation Method</th>
                      <th style={{ textAlign: "end" }}>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryData.length === 0 ?
                      <td colSpan={4} style={{ textAlign: "center" }}>Salary slip no found</td>
                      :
                      salaryData
                        .filter((item) => item.sg_type === "D")
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            {/* <td>{item.frequency_display}</td> */}
                            {/* <td>{`${item.c_method} (${item.sg_display})`}</td> */}
                            <td style={{display: "flex", flexDirection: "column"}}>
                              <span>{item.c_method|| '--'}</span>
                              <span>{item.sg_display || '--'}</span>
                            </td>
                            <td><Badge variant="error">₹{item.sg_amt.toLocaleString()}</Badge></td>
                          </tr>
                        ))}
                    <TotalRow>
                      <td colSpan="2">Total Deductions</td>
                      <td>₹{totalDeductions.toLocaleString()}</td>
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
            {(!salaryRes.is_posted && salaryData.length !== 0) && 
            <div style={{color: "#FFA500", marginLeft: "auto", marginRight: "auto"}}>
              *This salary slip is provisional and has not yet been posted. Amounts are subject to change.
            </div>}
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
            <FilterSelect
              value={selectedMonth}
              onChange={(e) => {
                const selected = e.target.value;
                setSelectedMonth(selected);

                const date = new Date(selected); // convert back to Date
                handleViewPayslip(date);        // 🔥 API call happens here
              }}
            >
              <option value="" disabled>
                Select month
              </option>
              {Array.from({ length: 6 }).map((_, index) => {
                const date = new Date();
                date.setMonth(date.getMonth() - index);

                const monthValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

                return (
                  <option key={index} value={monthValue}>
                    {date.toLocaleString("default", { month: "long", year: "numeric" })}
                  </option>
                );
              })}
            </FilterSelect>
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
                {error ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "red" }}>
                      {error}
                    </td>
                  </tr>
                ) : selectedMonth && salaryData && salaryData.length > 0 ? (
                  (() => {
                    const date = new Date(selectedMonth);

                    return (
                      <tr>
                        <td>{date.toLocaleString("default", { month: "long", year: "numeric" })}</td>
                        <td>₹{grossSalary.toLocaleString()}</td>
                        <td>₹{totalEarnings.toLocaleString()}</td>
                        <td>₹{totalDeductions.toLocaleString()}</td>
                        <td>₹{netSalary.toLocaleString()}</td>
                        <td>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadPayslipForMonth(date)}
                              disabled={!salaryRes.is_posted}
                            >
                              <FaDownload />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })()
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      Please select a month above
                    </td>
                  </tr>
                )}


              </tbody>
            </table>
          </div>
        )}

      </Card>
    </Layout>
  )
}

export default MyPaySlip