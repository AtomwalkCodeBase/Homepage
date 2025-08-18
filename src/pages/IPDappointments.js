"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Badge from "../components/Badge"
import { FaEye, FaSearch } from "react-icons/fa"
import Button from "../components/Button"
import { getProjectlist } from "../services/productServices"
import { getEmployeeInfo } from "../services/authServices"
import { useAuth } from "../context/AuthContext"

const InPatientsContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 15px;
  }
`

const SearchAndFilter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const SearchWrapper = styled.div`
  position: relative;
  width: 400px;
`

const SearchInput = styled.input`
  padding: 8px 12px 8px 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
`

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
`

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  width: 150px;
`

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
  min-width: 120px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  overflow: hidden;
`

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.primaryLight};
  font-size: 0.9rem;
`

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.card};
  }
`

const TableCell = styled.td`
  padding: 12px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`

const InPatients = () => {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  })
  const [statusFilter, setStatusFilter] = useState("All")
  const [bedFilter, setBedFilter] = useState("All")
  const [causeFilter, setCauseFilter] = useState("All")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { profile } = useAuth()

  // Sample data for beds and causes
  const bedOptions = ["Bed-101", "Bed-102", "Bed-103", "Bed-201", "Bed-202", "ICU-001", "ICU-002"]
  const causeOptions = ["Cardiac", "Respiratory", "Neurological", "Surgical", "Trauma", "Infectious", "Other"]

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Get employee profile data first
        const profileResponse = await getEmployeeInfo();
        const employeeId = profileResponse?.data?.[0]?.emp_id; // Fetch emp_id (e.g., EMP-003)

        if (!employeeId) {
          console.error("Could not fetch employee ID");
          setLoading(false);
          return;
        }

        const response = await getProjectlist();
        let projectList = response.data || response || [];
        if (!Array.isArray(projectList) && Array.isArray(response)) {
          projectList = response;
        }

        // Convert selected date (YYYY-MM-DD) to DD-MMM-YYYY for comparison
        const [year, month, day] = selectedDate.split("-");
        const formattedSelectedDate = `${day}-${new Date(year, month - 1).toLocaleString('en-US', { month: 'short' })}-${year}`;

        let filtered;
        
        // Check if user is a manager
        if (profile?.is_manager) {
          // If manager, show all projects without filtering by employee ID
          filtered = projectList.filter(item => {
            if (!item.start_date) {
              return false;
            }
            return true; // Show all projects for managers
          });
        } else {
          // If not manager, filter by employee ID as before
          filtered = projectList.filter(item => {
            if (!item.additional_fld_list || !item.start_date) {
              return false;
            }
            // Check if the logged-in employee's ID is in additional_fld_list
            const employeeIds = item.additional_fld_list.split("|").flatMap(group => group.split(","));
            return employeeIds.includes(employeeId);
          });
        }

        const mapped = filtered.map(item => ({
          id: item.id || Math.random().toString(36).substr(2, 9),
          title: item.title || "Unknown",
          projectCode: item.project_code || "N/A",
          startDate: item.start_date || formattedSelectedDate,
          status: item.project_status === "03" ? "Completed" : "Active", // Map project_status to display status
          bed: bedOptions[Math.floor(Math.random() * bedOptions.length)], // Random bed assignment
          cause: causeOptions[Math.floor(Math.random() * causeOptions.length)], // Random cause assignment
        }));

        // Sort by start date
        const sortedProjects = mapped.sort((a, b) => {
          const dateA = new Date(a.startDate.split("-").reverse().join("-"));
          const dateB = new Date(b.startDate.split("-").reverse().join("-"));
          return dateA - dateB;
        });

        setProjects(sortedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedDate, profile?.is_manager]);

  const filteredProjects = projects
    .filter((project) =>
      filter === "All" ? true : project.status === filter
    )
    .filter((project) =>
      statusFilter === "All" ? true : project.status === statusFilter
    )
    .filter((project) =>
      bedFilter === "All" ? true : project.bed === bedFilter
    )
    .filter((project) =>
      causeFilter === "All" ? true : project.cause === causeFilter
    )
    .filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.projectCode.toLowerCase().includes(search.toLowerCase())
    );

  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Active":
        return "primary";
      case "Pending":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <Layout title="In-Patients">
      <InPatientsContainer>
        <SearchAndFilter>
          <SearchBar>
            <SearchWrapper>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search by patient name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchWrapper>
            <DateInput
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </SearchBar>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </FilterSelect>
          <FilterSelect
            value={bedFilter}
            onChange={(e) => setBedFilter(e.target.value)}
          >
            <option value="All">All Beds</option>
            {bedOptions.map(bed => (
              <option key={bed} value={bed}>{bed}</option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={causeFilter}
            onChange={(e) => setCauseFilter(e.target.value)}
          >
            <option value="All">All Causes</option>
            {causeOptions.map(cause => (
              <option key={cause} value={cause}>{cause}</option>
            ))}
          </FilterSelect>
        </SearchAndFilter>

        <Table>
          <thead>
            <tr>
              <TableHeader>SL No.</TableHeader>
              <TableHeader>Patient Name</TableHeader>
              <TableHeader>Patient Code</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Bed</TableHeader>
              <TableHeader>Cause of Admission</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>View</TableHeader>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8}>Loading...</TableCell>
              </TableRow>
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>No projects found</TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.projectCode}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.bed}</TableCell>
                  <TableCell>{project.cause}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <FaEye /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </InPatientsContainer>
    </Layout>
  )
}

export default InPatients