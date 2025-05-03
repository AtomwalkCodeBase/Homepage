"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaFileExport } from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
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

const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const TableContainer = styled.div`
  overflow-x: auto;
`

const EmployeeAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.5rem;
`

const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
`

const EmployeeDetails = styled.div``

const EmployeeName = styled.div`
  font-weight: 500;
`

const EmployeeEmail = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const PaginationInfo = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${(props) => (props.active ? props.theme.colors.primary : "white")};
  color: ${(props) => (props.active ? "white" : props.theme.colors.text)};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${(props) => (props.active ? "white" : props.theme.colors.primary)};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: "Ashutosh Mohapatra",
      email: "john.doe@example.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Active",
      joinDate: "2020-05-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      department: "Marketing",
      position: "Marketing Manager",
      status: "Active",
      joinDate: "2019-08-22",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      department: "HR",
      position: "HR Specialist",
      status: "On Leave",
      joinDate: "2021-02-10",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      department: "Finance",
      position: "Financial Analyst",
      status: "Active",
      joinDate: "2018-11-05",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      department: "Sales",
      position: "Sales Representative",
      status: "Inactive",
      joinDate: "2022-01-20",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      department: "Engineering",
      position: "QA Engineer",
      status: "Active",
      joinDate: "2020-09-15",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david.wilson@example.com",
      department: "Product",
      position: "Product Manager",
      status: "Active",
      joinDate: "2019-04-30",
    },
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <Layout title="Employee Management">
      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input type="text" placeholder="Search employees..." value={searchTerm} onChange={handleSearch} />
        </SearchInput>

        <Button variant="primary">
          <FaPlus /> Add Employee
        </Button>
      </SearchContainer>

      <Card>
        <TableActions>
          <div>
            <Button variant="outline" size="sm">
              <FaFilter /> Filter
            </Button>
          </div>

          <ActionButtons>
            <Button variant="outline" size="sm">
              <FaFileExport /> Export
            </Button>
          </ActionButtons>
        </TableActions>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <EmployeeInfo>
                      <EmployeeAvatar>{employee.name.charAt(0)}</EmployeeAvatar>
                      <EmployeeDetails>
                        <EmployeeName>{employee.name}</EmployeeName>
                        <EmployeeEmail>{employee.email}</EmployeeEmail>
                      </EmployeeDetails>
                    </EmployeeInfo>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <Badge
                      variant={
                        employee.status === "Active" ? "success" : employee.status === "On Leave" ? "warning" : "error"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </td>
                  <td>{employee.joinDate}</td>
                  <td>
                    <ActionButtons>
                      <Button variant="ghost" size="sm" title="View">
                        <FaEye />
                      </Button>
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

        <Pagination>
          <PaginationInfo>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEmployees.length)} of{" "}
            {filteredEmployees.length} entries
          </PaginationInfo>

          <PaginationButtons>
            <PageButton onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </PageButton>

            {[...Array(totalPages)].map((_, index) => (
              <PageButton key={index} active={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </PageButton>
            ))}

            <PageButton
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </PageButton>
          </PaginationButtons>
        </Pagination>
      </Card>
    </Layout>
  )
}

export default EmployeeManagement

