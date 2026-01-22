"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import { FaSearch, FaFilter, FaBoxes, FaFlask, FaClock, FaExclamationCircle, FaBell } from "react-icons/fa"
import Layout from "../../components/Layout"
import { getSampleData } from "../../services/productServices"
import AllocationModal from "../../components/modals/AllocationModal"
import ViewDetailsModal from "../../components/modals/ViewDetailsModal"
import Button from "../../components/Button"
import { Eye } from "lucide-react"
import { MdAssignmentInd } from "react-icons/md";


const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  margin-bottom: 8px;
`

const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
`

const StatsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  border: 1px solid black;
  border-radius: 16px;
  padding: 24px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: transform ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
  }
`

const StatIconBox = styled.div`
  background: ${({ color }) => color};
  border-radius: 12px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
`

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.9;
  font-weight: 500;
`

const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
`

const FilterSection = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const FilterButton = styled.button`
  padding: 12px 20px;
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.background)};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  thead {
    background: ${({ theme }) => theme.colors.background};
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  }

  th {
    padding: 16px;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr {
    transition: background ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.background};
    }
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xs};

    th,
    td {
      padding: 10px 12px;
    }
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
`

const PaginationButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ active, theme }) => (active ? theme.colors.primary : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  cursor: pointer;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`



const StatusBadge = styled.span`
  background: ${({ status, theme }) => {
    switch (status) {
      case "Active":
        return theme.colors.success
      case "Inactive":
        return "#E0E0E0"
      default:
        return theme.colors.info
    }
  }};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
`

const PriorityBadge = styled.span`
  background: ${({ priority, theme }) => {
    switch (priority) {
      case 1:
        return theme.colors.error
      case 2:
        return theme.colors.warning
      default:
        return theme.colors.info
    }
  }};
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.textLight};

  svg {
    font-size: 48px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 8px 0;
  }
`

const SampleDashboard = () => {
  const [samples, setSamples] = useState([])
  const [filteredSamples, setFilteredSamples] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showAllocationModal, setShowAllocationModal] = useState(false)
  const [selectedSample, setSelectedSample] = useState(null)
  const [allocatedSamples, setAllocatedSamples] = useState(new Set())
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false)
  const [viewDetailsSample, setViewDetailsSample] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        setLoading(true)
        const response = await getSampleData()
        if (response) {
          setSamples(response.data)
          setFilteredSamples(response.data)
        }
      } catch (error) {
        console.error("[v0] Error fetching samples:", error)
        toast.error("Failed to load samples")
      } finally {
        setLoading(false)
      }
    }
    fetchSamples()
  }, [])

  useEffect(() => {
    let filtered = samples

    if (activeFilter !== "all") {
      filtered = filtered.filter((sample) => {
        if (activeFilter === "active") return sample.is_active
        if (activeFilter === "inactive") return !sample.is_active
        if (activeFilter === "priority") return sample.priority === 1
        return true
      })
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (sample) =>
          sample.s_item_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sample.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sample.batch_no.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredSamples(filtered)
    setCurrentPage(1)
  }, [activeFilter, searchTerm, samples])

  const handleAllocateClick = (sample) => {
    setSelectedSample(sample)
    setShowAllocationModal(true)
  }

  const handleViewDetails = (sample) => {
    setViewDetailsSample(sample)
    setShowViewDetailsModal(true)
  }

  const handleAllocationSuccess = () => {
    if (selectedSample) {
      setAllocatedSamples((prev) => new Set([...prev, selectedSample.id]))
    }
    setShowAllocationModal(false)
    toast.success("Sample allocated successfully!")
  }

  const stats = {
    total: samples.length,
    active: samples.filter((s) => s.is_active).length,
    priority: samples.filter((s) => s.priority === 1).length,
    pending: samples.filter((s) => !s.process_linked).length,
  }

  const totalPages = Math.ceil(filteredSamples.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSamples = filteredSamples.slice(startIndex, endIndex)

  return (
    <Layout>
      <DashboardContainer>
        <div>
          <PageTitle>Activity Dashboard</PageTitle>
          <PageSubtitle>Manage and allocate samples to lab processes</PageSubtitle>
        </div>

        <StatsGridContainer>
          <StatCard>
            <StatIconBox color="linear-gradient(135deg, #6C63FF, #A29BFE)">
              <FaBoxes />
            </StatIconBox>
            <StatContent>
              <StatLabel>Total Samples</StatLabel>
              <StatValue>{stats.total}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIconBox color="linear-gradient(135deg, #00C853, #69F0AE)">
              <FaBell />
            </StatIconBox>
            <StatContent>
              <StatLabel>Active Samples</StatLabel>
              <StatValue>{stats.active}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIconBox color="linear-gradient(135deg, #FFD600, #FFEA00)">
              <FaExclamationCircle />
            </StatIconBox>
            <StatContent>
              <StatLabel>Priority Samples</StatLabel>
              <StatValue>{stats.priority}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIconBox color="linear-gradient(135deg, #FF6584, #FF7597)">
              <FaClock />
            </StatIconBox>
            <StatContent>
              <StatLabel>Pending Allocation</StatLabel>
              <StatValue>{stats.pending}</StatValue>
            </StatContent>
          </StatCard>
        </StatsGridContainer>

        <FilterSection>
          <FaSearch style={{ color: "#999", fontSize: "18px" }} />
          <SearchInput
            type="text"
            placeholder="Search by Sample ID, Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>
            <FaFilter /> All
          </FilterButton>
          <FilterButton active={activeFilter === "active"} onClick={() => setActiveFilter("active")}>
            Active
          </FilterButton>
          <FilterButton active={activeFilter === "priority"} onClick={() => setActiveFilter("priority")}>
            Priority
          </FilterButton>
        </FilterSection>

        {loading ? (
          <EmptyState>
            <FaFlask />
            <h3>Loading samples...</h3>
          </EmptyState>
        ) : filteredSamples.length === 0 ? (
          <EmptyState>
            <FaBoxes />
            <h3>No samples found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        ) : (
          <>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Sample ID</th>
                    <th>Customer</th>
                    {/* <th>Batch No.</th> */}
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSamples.map((sample) => {
                    const isAllocated = allocatedSamples.has(sample.id)

                    return (
                      <tr key={sample.id}>
                        <td>{sample.s_item_id}</td>
                        <td>{sample.customer_name.substring(0, 20)}...</td>
                        {/* <td>{sample.batch_no}</td> */}
                        <td>{sample.sample_type}</td>
                        <td>{sample.no_of_qty}</td>
                        <td>
                          <StatusBadge status={sample.is_active ? "Active" : "Inactive"}>
                            {sample.is_active ? "Active" : "Inactive"}
                          </StatusBadge>
                        </td>
                        <td>
                          <PriorityBadge priority={sample.priority}>P{sample.priority}</PriorityBadge>
                        </td>
                        <td>
                          {sample.is_active && (
                            sample.sample_status === "A" ? (
                              <Button size="sm" variant="primary" onClick={() => handleAllocateClick(sample)}><MdAssignmentInd /> Allocate</Button>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => handleViewDetails(sample)}><Eye></Eye> Details</Button>
                            )
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </TableContainer>

            <PaginationContainer>
              <PaginationButton onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                Previous
              </PaginationButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationButton key={page} active={currentPage === page} onClick={() => setCurrentPage(page)}>
                  {page}
                </PaginationButton>
              ))}
              <PaginationButton
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </PaginationContainer>
          </>
        )}
      </DashboardContainer>

      {showAllocationModal && (
        <AllocationModal
          sample={selectedSample}
          isOpen={showAllocationModal}
          onClose={() => setShowAllocationModal(false)}
          onSuccess={handleAllocationSuccess}
        />
      )}

      {showViewDetailsModal && (
        <ViewDetailsModal
          sample={viewDetailsSample}
          isOpen={showViewDetailsModal}
          onClose={() => setShowViewDetailsModal(false)}
        />
      )}
    </Layout>
  )
}

export default SampleDashboard
