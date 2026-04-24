import React, { useEffect, useMemo, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { IoEyeOutline } from 'react-icons/io5';
import EmployeeDetailModal2 from '../../components/modals/ModalForProjectmanagemnt/EmployeeDetailModal2';
import {  getCurrentDateTimeDefaults } from './utils/utils';
import { theme } from '../../styles/Theme';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { getemployeeLists, postAppointee } from '../../services/productServices';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { useAuth } from '../../context/AuthContext';
import { VerifyModal } from '../../components/modals/ModalForProjectmanagemnt/VerifyEmployeeModal';
import { FiAlertCircle, FiBriefcase, FiCheckCircle, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { ImCross } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import PaginationComponent from '../../components/Pagination';

const BUttonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

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

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: white;
  min-width: 150px;

  @media (max-width: 768px) {
    width: 45%;
    min-width: unset;
  }

  @media (max-width: 480px) {
    width: 100%;
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
const SectionLabel = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.xs};
  border-bottom: 1px solid ${theme.colors.border};
`;

const ManagerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
`;

const IconBox = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
`;

const InfoContent = styled.div``;

const InfoLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textLight};
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text};
  font-weight: 600;
  word-break: break-word;
`;


const FinanceUserScreen2 = () => {
  const location = useLocation();
  const ManagerData = location.state;
  const { apiDate: todayApiDate,} = getCurrentDateTimeDefaults()

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [employeeList, setEmployeeList] = useState([]);

  const [statusFileter, setStatusFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");


  useEffect(() => {
    getEmployeeList();
  }, [])

  const getEmployeeList = async () => {
    setIsLoading(true)
    try {
      const res = await getemployeeLists({ "rm_emp_id": ManagerData.emp_id });
      setEmployeeList(res.data)
    } catch (error) {
      toast.error(error.response.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Grade mapping
const getGrade = (grade_level) => {
  if (grade_level <= 1) return "EX";
  if (grade_level === 2) return "TL";
  return "-";
};

// ✅ Status mapping
const getStatus = (is_verified) => {
  return is_verified ? "VERIFIED" : "UNVERIFIED";
};

const getCounts = (list) => {
  const counts = {
    total: list.length,

    VERIFIED: {
      TL: 0,
      EX: 0,
    },
    UNVERIFIED: {
      TL: 0,
      EX: 0,
    },
  };

  list.forEach((emp) => {
    const grade = getGrade(emp.grade_level);
    const status = getStatus(emp.is_verified);

    if (counts[status] && counts[status][grade] !== undefined) {
      counts[status][grade]++;
    }
  });

  return counts;
};

const counts = getCounts(employeeList);

// console.log("counts", counts)

const filteredEmployees = employeeList.filter((emp) => {
  const grade = getGrade(emp.grade_level); // TL / EX
  const status = getStatus(emp.is_verified); // VERIFIED / UNVERIFIED

  // ✅ Search filter
  const search = searchTerm?.toLowerCase() || "";
  const matchesSearch =
    emp.name?.toLowerCase().includes(search) ||
    emp.emp_id?.toLowerCase().includes(search) ||
    emp.mobile_number?.includes(search);

  // ✅ Dropdown filter (Grade)
  let matchesDropdown = true;

  if (selectedStatus !== "All") {
    if (selectedStatus === "RET-G1-TL") {
      matchesDropdown = grade === "TL";
    } else if (selectedStatus === "RET-G1-EX") {
      matchesDropdown = grade === "EX";
    }
  }

  // ✅ Stats card filter (status + grade)
  let matchesStats = true;

  if (statusFileter?.status && status !== statusFileter.status) {
    matchesStats = false;
  }

  if (statusFileter?.grade && grade !== statusFileter.grade) {
    matchesStats = false;
  }
  let matchesTab = true;
  
  if (activeTab === "ALL_NOT_VERIFIED") {
    matchesTab = emp.is_verified === false;
  }
  if (activeTab === "VERIFIED") {
    matchesTab = emp.is_verified === true;
  }

  return matchesSearch && matchesDropdown && matchesStats && matchesTab;
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

  const handleVerify = async (employee, remarks) => {
      try {
          const verifyPayload = {
              emp_id: employee.emp_id || "",
              name: employee.name,
              call_mode: employee.call_mode,
              confirmation_date: todayApiDate,
              ...(employee.call_mode === "REJECT" ? { reject_remarks: remarks } : { confirm_remarks: remarks }),
            };

            // console.log("verifyPayload",verifyPayload)
            // const res = {status : 200} 
        const res = await postAppointee(verifyPayload);
      if (res.status === 200) {
        toast.success(employee.call_mode === "REJECT" ? "Employee rejected successfully" : "Employee verified successfully")
        setShowVerifyModal(false);
        await getEmployeeList();
      }
      } catch (error) {
        
      }
  }

  const defineName = (job_title) => {
    const jobTitle = job_title?.toLowerCase() || "";
    if (jobTitle.includes("retainer")) return "Retainer";
    if (jobTitle.includes("associate")) return "Associate";
  }
    const tabs = [
    { key: 'ALL', label: "All Resources", },
    { key: 'ALL_NOT_VERIFIED', label: "Not Verified Resources", },
  ].filter(Boolean);

  return (
    <Layout title="Verify Contract Resources">
      <Subtitle>
        <div>
          <p>Manage and verify resources contract records</p>
        </div>
        <div style={{display: "flex", gap: "0.7rem"}}>
            <Badge style={{cursor: "pointer"}} variant='success' onClick={() => setActiveTab("VERIFIED")}><FiCheckCircle /> {counts.VERIFIED.TL + counts.VERIFIED.EX} Verified</Badge>
            <Badge style={{cursor: "pointer"}} variant='error' onClick={() => setActiveTab("ALL_NOT_VERIFIED")}> <FiAlertCircle />{counts.UNVERIFIED.TL + counts.UNVERIFIED.EX} Not Verified</Badge>
        </div>
      </Subtitle>
<Card>
  <SectionLabel>Manager Details</SectionLabel>
  <ManagerGrid>
    <InfoRow>
      <IconBox><FiUser /></IconBox>
      <InfoContent>
        <InfoLabel>Name</InfoLabel>
        <InfoValue>{ManagerData.name || "--"}</InfoValue>
      </InfoContent>
    </InfoRow>

    <InfoRow>
      <IconBox><FiBriefcase /></IconBox>
      <InfoContent>
        <InfoLabel>{defineName(ManagerData.job_title)}'s ID</InfoLabel>
        <InfoValue>{ManagerData.emp_id || "--"}</InfoValue>
      </InfoContent>
    </InfoRow>

    <InfoRow>
      <IconBox><FiPhone /></IconBox>
      <InfoContent>
        <InfoLabel>Mobile</InfoLabel>
        <InfoValue>{ManagerData.number || "--"}</InfoValue>
      </InfoContent>
    </InfoRow>

    <InfoRow>
      <IconBox><FiMail /></IconBox>
      <InfoContent>
        <InfoLabel>Email</InfoLabel>
        <InfoValue>{ManagerData.email_id || "--"}</InfoValue>
      </InfoContent>
    </InfoRow>
  </ManagerGrid>
</Card>

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
              <FilterSelect
                    name="selectedStatus"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="RET-G1-TL">Team Lead</option>
                    <option value="RET-G1-EX">Executive</option>
                  </FilterSelect>

                  <Button
  variant="outline"
  onClick={() => {
    setSearchTerm("");
    setSelectedStatus("All");
    setStatusFilter(null);
    setActiveTab("ALL")
  }}
>
  Clear Filters
</Button>
        </FilterRow>
        <Table>
          <thead>
            <tr>
              <th>System Ref ID/<br/>(Emp ID)</th>
              <th>Name</th>
              <th>Mobile</th>
              {/* <th>Gender</th> */}
              <th>Grade</th>
              <th>Document?</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? 
              (<tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>Loading...</td>
                </tr>
              )  :  paginatedActivities.length  ?(
                paginatedActivities.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.emp_id}<br/><Badge variant={employee.gender === "M" ? "info" : "pink" }>{employee.additional_ref_number || "--" }</Badge></td>
              <td>{employee.name}</td>
              <td>{employee.mobile_number || "--"}</td>
              {/* <td>{employee.gender === "M" ? "Male" : "Female"}</td> */}
              <td><Badge variant={employee.grade_level <=1 ? "settle" : "forward"  }>{employee.grade_level <=1 ? "Executive" : "Team Lead"}</Badge></td>
              <td><Badge variant={employee.ref_govt_id_number && employee.emp_file_1 ? "success" : "error"}>{employee.ref_govt_id_number && employee.emp_file_1 ? "Yes" : "No"}</Badge></td>
              <td>
                <Badge variant={employee.is_rejected ? "reject" : employee.is_verified ? 'success' : 'error'}>{employee.is_rejected ? "Rejected" : employee.is_verified ? 'Verified' : 'Not verified'}</Badge>
              </td>
              <td>
                <BUttonGroup>
                  <Button title="View resource details" iconOnly={true} onClick={() => {setEmployeeDetails(employee) ;setShowEmployeeDetails(true)}}>
                    <IoEyeOutline />
                  </Button>
                 {!employee.is_rejected && (
                  <>
                  {employee.emp_file_1  && <Button variant='outlines' title="Reject resource" iconOnly={true} onClick={() => {setEmployeeDetails({...employee, call_mode: "REJECT"}) ;setShowVerifyModal(true)}}>
                    <ImCross />
                  </Button>}
                      </>
                  )}
                 {(!employee.is_verified && employee.emp_file_1) && <Button title="Verify resource" iconOnly={true} onClick={() => {setEmployeeDetails({...employee, call_mode: "CONFIRM"}) ;setShowVerifyModal(true)}}>
                    <FaCheck />
                  </Button>}
              

                  
                </BUttonGroup>
              </td>
            </tr>) ))             
            : 
           (
            <tr>
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

      {showEmployeeDetails && <EmployeeDetailModal2 employee={employeeDetails} onClose={() => {setEmployeeDetails(null) ; setShowEmployeeDetails(false)}} />}

        {showVerifyModal && <VerifyModal employee={employeeDetails} onClose={() => {setEmployeeDetails(null) ; setShowVerifyModal(false)}} onVerify={handleVerify} />}

    </Layout>
  )
}

export default FinanceUserScreen2;