import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
import { getemployeeLists } from '../../services/productServices';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Card from '../../components/Card';
import { theme } from '../../styles/Theme';
import Button from '../../components/Button';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../components/Pagination';

const Subtitle = styled.div`
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
  p{
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;
  }
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
const FilterRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
  
  &::placeholder {
    color: ${theme.colors.textLight};
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 12px;
    background: #f3f4f6;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
`;
const BUttonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;


  const tabs = [
    { key: 'R', label: "Retainer", },
    { key: 'A', label: "Associate", },
  ].filter(Boolean);

const ChannelPatnerListScreen = () => {
  const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("R");
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
    const [employeeList, setEmployeeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      getEmployeeList();
    }, [])
    const getEmployeeList = async () => {
      setIsLoading(true)
      try {
        const res = await getemployeeLists({ "rm_emp_id": "ALL_CONTRACT" });
        setEmployeeList(res.data)
  
        console.log(res.data)
  
      } catch (error) {
        toast.error(error.response.message || error.message)
      } finally {
        setIsLoading(false)
      }
    }
    const filteredEmployees = employeeList.filter((emp) => {
  // ✅ Tab filter based on job_title
  const jobTitle = emp.job_title?.toLowerCase() || "";
  const matchesTab = 
    activeTab === "R" ? jobTitle.includes("retainer") : 
    activeTab === "A" ? jobTitle.includes("associate") : true;

  // ✅ Search filter
  const search = searchTerm?.toLowerCase() || "";
  const matchesSearch =
    emp.name?.toLowerCase().includes(search) ||
    emp.emp_id?.toLowerCase().includes(search) ||
    emp.mobile_number?.includes(search);

  return matchesTab && matchesSearch;
});

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees,currentPage, itemsPerPage]);

  const handlePageChange = (page, perPage = itemsPerPage) => {
    setCurrentPage(page);
    if (perPage !== itemsPerPage) {
      setItemsPerPage(perPage);
      setCurrentPage(1); // Reset to first page when changing items per page
    }
  };
  return (
    <Layout title="Associate/Retainer Screen">
            <Subtitle>
              <div>
                <p>All Associates/Retainers List</p>
              </div>
            </Subtitle>

              <Card hoverable={false}>
            
                    <TabContainer>
                      {tabs.map(t => (
                        <Tab key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}>
                          {t.label}
                        </Tab>
                      ))}
                    </TabContainer>
                    <FilterRow>
                    <SearchBox
                            type="text"
                            placeholder="Search name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
            
                              <Button variant="outline" onClick={() => { setSearchTerm("");}}>
              Clear Filters
            </Button>
                    </FilterRow>
                    <Table>
                      <thead>
                        <tr>
                          <th>{activeTab === "R" ? "Retainer" : "Associate"}'s ID</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? 
                        (<tr>
                            <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                                Loading...
                              </td>
                            </tr>
                          ) :  paginatedActivities.length  ? 
                        (paginatedActivities.map((employee) => (
                        <tr>
                          <td>{employee.emp_id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.mobile_number || "--"}</td>
                          <td>{employee.email_id || "--"}</td>
                          <td>
                            <BUttonGroup>
                              <Button title="View Employee" iconOnly={true} onClick={() => navigate("/finance/employee-verification", { state: employee })}>
                                <IoEyeOutline />
                              </Button>
                            </BUttonGroup>
                          </td>
                        </tr>) ))
                        
                      : 
                     (<tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                          No data found
                        </td>
                      </tr>
                    )
                    }
                      </tbody>
                    </Table>
                     <PaginationComponent
                                      totalItems={filteredEmployees.length}
                                      itemsPerPage={itemsPerPage}
                                      currentPage={currentPage}
                                      onPageChange={handlePageChange}
                                      siblingCount={2}
                                    />
                  </Card>
            
        
    </Layout>
  )
}

export default ChannelPatnerListScreen