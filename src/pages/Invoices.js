"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { FaFileInvoiceDollar, FaDownload, FaEye } from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"

const InvoicesContainer = styled.div`
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
    color: ${({ theme }) => theme.colors.textSecondary};
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

const DateInput = styled.input`
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
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

const InvoicesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const InvoiceCard = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`

const InvoiceInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const InvoiceName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  word-wrap: break-word;
`

const InvoiceId = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  font-family: monospace;
`

const InvoiceDetails = styled.div`
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
    color: ${({ theme }) => theme.colors.textSecondary};
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

const Amount = styled.div`
  text-align: right;
  
  h4 {
    margin: 0 0 0.25rem 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.3rem;
    font-weight: bold;
  }
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

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  
  ${({ status, theme }) => {
    switch (status) {
      case "paid":
        return `
          background: ${theme.colors.success || "#10B981"}20;
          color: ${theme.colors.success || "#10B981"};
          border: 1px solid ${theme.colors.success || "#10B981"}40;
        `
      case "pending":
        return `
          background: ${theme.colors.warning || "#F59E0B"}20;
          color: ${theme.colors.warning || "#F59E0B"};
          border: 1px solid ${theme.colors.warning || "#F59E0B"}40;
        `
      case "overdue":
        return `
          background: ${theme.colors.error || "#EF4444"}20;
          color: ${theme.colors.error || "#EF4444"};
          border: 1px solid ${theme.colors.error || "#EF4444"}40;
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
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
`

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual API call
  const mockInvoices = [
    {
      id: "INV-001",
      name: "Monthly Subscription",
      dateIssued: "2024-01-15",
      amount: 299.99,
      status: "paid",
      dueDate: "2024-02-15",
    },
    {
      id: "INV-002",
      name: "Professional Services",
      dateIssued: "2024-01-20",
      amount: 1500.0,
      status: "pending",
      dueDate: "2024-02-20",
    },
    {
      id: "INV-003",
      name: "Software License",
      dateIssued: "2024-01-10",
      amount: 599.99,
      status: "overdue",
      dueDate: "2024-01-25",
    },
    {
      id: "INV-004",
      name: "Consulting Fee",
      dateIssued: "2024-01-25",
      amount: 2000.0,
      status: "paid",
      dueDate: "2024-02-25",
    },
    {
      id: "INV-005",
      name: "Training Program",
      dateIssued: "2024-01-30",
      amount: 750.0,
      status: "pending",
      dueDate: "2024-03-01",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInvoices(mockInvoices)
      setFilteredInvoices(mockInvoices)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = invoices

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((invoice) => invoice.status === statusFilter)
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter((invoice) => invoice.dateIssued >= dateFilter)
    }

    setFilteredInvoices(filtered)
  }, [invoices, searchTerm, statusFilter, dateFilter])

  const handleDownload = (invoiceId) => {
    // Implement download functionality
    console.log(`Downloading invoice ${invoiceId}`)
    // You can add actual download logic here
  }

  const handleView = (invoiceId) => {
    // Implement view functionality
    console.log(`Viewing invoice ${invoiceId}`)
    // You can add modal or navigation logic here
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStats = () => {
    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const paidAmount = invoices
      .filter((invoice) => invoice.status === "paid")
      .reduce((sum, invoice) => sum + invoice.amount, 0)
    const pendingAmount = invoices
      .filter((invoice) => invoice.status === "pending")
      .reduce((sum, invoice) => sum + invoice.amount, 0)
    const overdueAmount = invoices
      .filter((invoice) => invoice.status === "overdue")
      .reduce((sum, invoice) => sum + invoice.amount, 0)

    return { totalAmount, paidAmount, pendingAmount, overdueAmount }
  }

  const stats = getStats()

  if (loading) {
    return (
      <Layout title="Invoices">
        <LoadingState>Loading invoices...</LoadingState>
      </Layout>
    )
  }

  return (
    <Layout title="Invoices">
      <InvoicesContainer>
        <StatsContainer>
          <StatCard>
            <h3>{formatCurrency(stats.totalAmount)}</h3>
            <p>Total Amount</p>
          </StatCard>
          <StatCard>
            <h3>{formatCurrency(stats.paidAmount)}</h3>
            <p>Paid</p>
          </StatCard>
          <StatCard>
            <h3>{formatCurrency(stats.pendingAmount)}</h3>
            <p>Pending</p>
          </StatCard>
          <StatCard>
            <h3>{formatCurrency(stats.overdueAmount)}</h3>
            <p>Overdue</p>
          </StatCard>
        </StatsContainer>

        <FilterSection>
          <FilterGroup>
            <label>Search Invoices</label>
            <SearchInput
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>
          <FilterGroup>
            <label>Filter by Status</label>
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <label>Filter by Date</label>
            <DateInput type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </FilterGroup>
        </FilterSection>

        {filteredInvoices.length === 0 ? (
          <EmptyState>
            <FaFileInvoiceDollar />
            <h3>No Invoices Found</h3>
            <p>No invoices match your current filters. Try adjusting your search criteria.</p>
          </EmptyState>
        ) : (
          <InvoicesGrid>
            {filteredInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id}>
                <InvoiceHeader>
                  <InvoiceInfo>
                    <InvoiceName>{invoice.name}</InvoiceName>
                    <InvoiceId>{invoice.id}</InvoiceId>
                  </InvoiceInfo>
                  <StatusBadge status={invoice.status}>{invoice.status}</StatusBadge>
                </InvoiceHeader>

                <InvoiceDetails>
                  <DetailItem>
                    <h4>Date Issued</h4>
                    <p>{formatDate(invoice.dateIssued)}</p>
                  </DetailItem>
                  <DetailItem>
                    <h4>Due Date</h4>
                    <p>{formatDate(invoice.dueDate)}</p>
                  </DetailItem>
                </InvoiceDetails>

                <Amount>
                  <h4>Amount</h4>
                  <p>{formatCurrency(invoice.amount)}</p>
                </Amount>

                <ActionButtons>
                  <Button variant="outline" size="sm" onClick={() => handleView(invoice.id)}>
                    <FaEye />
                    View
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleDownload(invoice.id)}>
                    <FaDownload />
                    Download
                  </Button>
                </ActionButtons>
              </InvoiceCard>
            ))}
          </InvoicesGrid>
        )}
      </InvoicesContainer>
    </Layout>
  )
}

export default Invoices
