import { useEffect, useState } from "react"
import styled from "styled-components"
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaFileExport, FaCalendarAlt, FaClock, FaChartBar } from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { getemployeeList } from "../services/productServices"
import { useNavigate } from "react-router-dom"
import { useExport } from "../context/ExportContext"
import { toast } from "react-toastify"

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

const EmployeeAvatar = styled.img`
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
const EmployeeDetailsContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 1rem;
color: ${({ theme }) => theme.colors.text};
`
const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const Navigate= useNavigate()
  const { exportEmployeeData } = useExport()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Replace this with your actual API call
        const response = await getemployeeList()
        setEmployees(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.emp_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.grade_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem)

  const handleViewAttendance = (employeeId) => {
    // Implement view attendance functionality
     Navigate(`/attendance?empid=${employeeId}`) 
  }

  const handleViewTimesheet = (employeeId,names) => {
    const empid=localStorage.getItem("empId")
    if(employeeId === empid){
    Navigate("/timesheet") 
    }
    else{
    // Implement view timesheet functionality
    Navigate(`/timesheet?empid=${employeeId}&&name=${names}`) 
  }
}
  const handleExport = () => {
    const result = exportEmployeeData(filteredEmployees, "employee_list")
    if (result.success) {
    toast.success("Exported successfully")
    } else {
      toast.error("Export failed: " + result.message)
    }
  }
  if (loading) return <Layout title="Employee Management">Loading...</Layout>
  if (error) return <Layout title="Employee Management">Error: {error}</Layout>

  return (
    <Layout title="Employee Management">
      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input type="text" placeholder="Search employees..." value={searchTerm} onChange={handleSearch} />
        </SearchInput>

        <Button variant="primary" onClick={handleExport}>
          <FaFileExport /> Export
        </Button>
      </SearchContainer>

      <Card>
        {/* <TableActions>
          <div>
            <Button variant="outline" size="sm">
              <FaFilter /> Filter
            </Button>
          </div>

          <ActionButtons onClick={handleExport}>
            <Button variant="outline" size="sm">
              <FaFileExport /> Export
            </Button>
          </ActionButtons>
        </TableActions> */}

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
                      {employee.image ? (
                        <EmployeeAvatar src={employee.image} alt={employee.name} />
                      ) : (
                        <EmployeeAvatar>{employee.name.charAt(0)}</EmployeeAvatar>
                      )}
                      <EmployeeDetails>
                        <EmployeeName>{employee.name}</EmployeeName>
                        <EmployeeEmail>{employee.email_id}</EmployeeEmail>
                        <EmployeeEmail>{employee.emp_id}</EmployeeEmail>
                      </EmployeeDetails>
                    </EmployeeInfo>
                  </td>
                  <td>{employee.department_name}</td>
                  <td>{employee.grade_name}</td>
                  <td>
                    <Badge variant={employee.is_manager ? "success" : "info"}>
                      {employee.is_manager ? "Manager" : "Employee"}
                    </Badge>
                  </td>
                  <td>{employee.date_of_join}</td>
                  <td>
                    <ActionButtons>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="View Attendance"
                        onClick={() => handleViewAttendance(employee.emp_id)}
                      >
                        <FaClock />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="View Timesheet"
                        onClick={() => handleViewTimesheet(employee.emp_id,employee.name)}
                      >
                        <FaChartBar />
                      </Button>
                    </ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>

        {filteredEmployees.length > 0 ? (
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
        ) : (
          <EmployeeDetailsContainer >No employees found</EmployeeDetailsContainer>
        )}
      </Card>
    </Layout>
  )
}



export default EmployeeManagement

