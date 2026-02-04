import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronRight, FaEye, FaCheck, FaTimes, FaFileExport } from 'react-icons/fa';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { formatAPITime, getStatusLabelVariant } from './utils/utils';
import ConfirmationPopup from '../../components/modals/ConfirmationPopup';
import { processTimesheetApproval } from '../../services/productServices';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { useExport } from '../../context/ExportContext';

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ProjectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectItemName = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const TableHead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  vertical-align: top;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const NestedTableCell = styled.td`
  padding: 0 !important;
  background: ${({ theme }) => theme.colors.background};
`;

const NestedTableContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const NestedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const NestedTableHead = styled.thead`
  background: ${({ theme }) => theme.colors.primaryLight};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

// const Badge = styled.span`
//   padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
//   border-radius: ${({ theme }) => theme.borderRadius.md};
//   font-size: ${({ theme }) => theme.fontSizes.xs};
//   font-weight: 500;
//   background: ${props => {
//     switch (props.variant) {
//       case 'PENDING': return theme.colors.warning;
//       case 'APPROVED': return theme.colors.success;
//       case 'REJECTED': return theme.colors.error;
//       default: return theme.colors.info;
//     }
//   }};
//   color: white;
//   display: inline-block;
// `;

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ResponsiveCell = styled(TableCell)`
  @media (max-width: 1200px) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xs};
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text};
`

// Main Component
const EmployeeWorkTracker = ({ data, onViewItem, handleApproveWeekly }) => {
  const {theme} = useTheme();
   const { exportEmployeeAuditData } = useExport()
  const [expandedEmployees, setExpandedEmployees] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmType, setConfirmType] = useState(null); // 'APPROVE' or 'REJECT'
  const [isLoading, setIsLoading] = useState(false);

   // --- Filtering State ---
    const [filterCustomer, setFilterCustomer] = useState("");
    const [filterEmployee, setFilterEmployee] = useState("");
  
    // Derived Options for Filters
    const uniqueCustomers = Array.from(new Set(
      data.flatMap(emp => emp.customers.map(c => c.customer_name))
    )).sort();
  
    const uniqueEmployees = Array.from(new Set(
      data.map(emp => JSON.stringify({ name: emp.employee_name, id: emp.emp_id }))
    )).map(s => JSON.parse(s)).sort((a, b) => a.name.localeCompare(b.name));
  
    // Filtered Data Logic
    const filteredDemoData = data.filter(employee => {
      // 1. Employee Filter
      if (filterEmployee && employee.emp_id !== filterEmployee) return false;
  
      // 2. Customer Filter (Primary Validations)
      // If a customer is selected, the employee MUST have that customer.
      if (filterCustomer) {
        const hasCustomer = employee.customers.some(c => c.customer_name === filterCustomer);
        if (!hasCustomer) return false;
      }
      return true;
    }).map(employee => {
      // 3. Deep Filter: If a customer is selected, only show THAT customer's data for this employee.
      if (filterCustomer) {
        return {
          ...employee,
          customers: employee.customers.filter(c => c.customer_name === filterCustomer)
        };
      }
      return employee;
    });
  

  console.log("demo", data)

  const toggleEmployee = (empId) => {
    setExpandedEmployees(prev => ({
      ...prev,
      [empId]: !prev[empId]
    }));
  };

  const getTotalCustomers = (customers) => customers.length;
  const getTotalOrderItems = (customers) =>
    customers.reduce((sum, customer) => sum + customer.order_items.length, 0);

  const handleViewItem = (employee, orderItem) => {
    if (onViewItem) {
      onViewItem(employee, orderItem);
    } else {
      console.log('View:', employee, orderItem);
    }
  };

  // const handleApprove = (employee, orderItem) => {
  //   setSelectedItem({ employee, orderItem });
  //   setConfirmType('APPROVE');
  //   setConfirmModalOpen(true);
  // };

  // const handleReject = (employee, orderItem) => {
  //   setSelectedItem({ employee, orderItem });
  //   setConfirmType('REJECT');
  //   setConfirmModalOpen(true);
  // };

  // const handleConfirm = async (remark) => {
  //   if (!selectedItem) return;

  //   setIsLoading(true);
  //   try {
  //     const payload = {
  //       emp_id: selectedItem.employee.emp_id,
  //       start_date: selectedItem.orderItem.planned_start_date, // Assuming format matches or is handled by backend
  //       end_date: selectedItem.orderItem.planned_end_date,
  //       call_mode: confirmType === 'APPROVE' ? "weekly Approve" : "weekly Reject",
  //       a_emp_id: "2",
  //       remark: remark
  //     };

  //      // const response = await processTimesheetApproval(payload);

  //     console.log(payload)

  //     const response = {status: 200}

  //     if (response?.status === 200) {
  //       toast.success(`Timesheet ${confirmType === 'APPROVE' ? 'Approved' : 'Rejected'} Successfully`);
  //       // Optionally refresh data here
  //     } else {
  //       toast.error(response?.data?.message || "Something went wrong");
  //     }

  //   } catch (error) {
  //     console.error("Error processing timesheet:", error);
  //     toast.error("An error occurred while processing the request.");
  //   } finally {
  //     setIsLoading(false);
  //     setConfirmModalOpen(false);
  //     setSelectedItem(null);
  //     setConfirmType(null);
  //   }
  // };

  const buildAuditExportData = (employees = []) => {
  const rows = [];

  employees.forEach((employee) => {
    const { emp_id, employee_name, customers = [] } = employee;

    customers.forEach((customer) => {
      const { order_items = [] } = customer;

      order_items.forEach((item) => {
        rows.push({
          customer_name: item.customer_name || "",
          audit_type: item.audit_type || "",
          order_item_key: item.order_item_key || "",
          employee_name,
          employee_id: emp_id,
          planned_start_date: item.planned_start_date || "",
          planned_end_date: item.planned_end_date || "",
          planned_start_time: item.planned_start_time || "",
          planned_end_time: item.planned_end_time || "",
          actual_start_date: item.actual_start_date || "",
          actual_end_date: item.actual_end_date || "",
          planned_no_of_items: item.audit_item_no_planned ?? "",
          actual_no_of_items: item.audit_item_no_actual ?? "",
          remarks: item.remarks || "",
        });
      });
    });
  });

  return rows;
};


  const handleAuditExport = (flattenedData) => {
    const transformData = buildAuditExportData(flattenedData)
  const result = exportEmployeeAuditData(transformData, "Audit_Report");

  if (result.success) {
    toast.success("Exported successfully");
  } else {
    toast.error("Export failed: " + result.message);
  }
};


  return (
    <>
      <Header>Employee Tracker</Header>
              {/* <> */}
                <FilterContainer>
                <FilterSelect
                  value={filterCustomer}
                  onChange={(e) => setFilterCustomer(e.target.value)}
                >
                  <option value="">All Customers</option>
                  {uniqueCustomers.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                >
                  <option value="">All Employees</option>
                  {uniqueEmployees.map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </FilterSelect>
                </FilterContainer>
              {/* </>
            } */}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader></TableHeader>
              <TableHeader>Employee Name</TableHeader>
              <TableHeader>Employee ID</TableHeader>
              <TableHeader>Total Customers</TableHeader>
              <TableHeader>Total Order Items</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
           {filteredDemoData.length === 0 ? 
           <tr>
             <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>No data found</td> 
           </tr> :
           (filteredDemoData.map((employee) => {
              const isExpanded = expandedEmployees[employee.emp_id];

              return (
                <React.Fragment key={employee.emp_id}>
                  <TableRow>
                    <TableCell>
                      <ExpandButton onClick={() => toggleEmployee(employee.emp_id)}>
                        {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                      </ExpandButton>
                    </TableCell>
                    <TableCell>{employee.employee_name}</TableCell>
                    <TableCell>{employee.emp_id}</TableCell>
                    <TableCell>{getTotalCustomers(employee.customers)}</TableCell>
                    <TableCell>{getTotalOrderItems(employee.customers)}</TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <NestedTableCell colSpan="6">
                        <NestedTableContainer>
                          {employee.customers.map((customer) => (
                            <div key={customer.customer_name}>
                              <ProjectItem>
                                <ProjectItemName>
                                  {customer.customer_name}
                                </ProjectItemName>
                              </ProjectItem>
                              <NestedTable>
                                <NestedTableHead>
                                  <TableRow>
                                    <TableHeader>Audit Details</TableHeader>
                                    <TableHeader>Planned Date <br/> Planned working time (Daily)</TableHeader>
                                    <TableHeader>Actual Date</TableHeader>
                                    <TableHeader>Item Audited<br></br>(Actual/Planned)</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                  </TableRow>
                                </NestedTableHead>
                                <tbody>
                                  {customer.order_items.map((orderItem) => {
                                    const { variant, status_label } = getStatusLabelVariant(orderItem.order_item_complete_status);

                                    return (
                                      <TableRow key={orderItem.order_item_id}>
                                        <ResponsiveCell>
                                          <DetailRow>
                                            <div>
                                              <DetailLabel>Order Item:</DetailLabel>
                                              <DetailValue> {orderItem.order_item_key}</DetailValue>
                                            </div>
                                            <div>
                                              <DetailLabel>Audit Type:</DetailLabel>
                                              <DetailValue> {orderItem.audit_type}</DetailValue>
                                            </div>
                                            <div>
                                              <DetailLabel>Location:</DetailLabel>
                                              <DetailValue> {orderItem.location}</DetailValue>
                                            </div>
                                          </DetailRow>
                                        </ResponsiveCell>
                                        <ResponsiveCell>
                                          <DetailRow>
                                            <div>
                                              <DetailLabel>Start Date:</DetailLabel>
                                              <DetailValue> {orderItem.planned_start_date}</DetailValue>
                                              {/* <DetailValue style={{ marginLeft: theme.spacing.xs }}>
                                                {orderItem.planned_start_time && `(${orderItem.planned_start_time} - ${orderItem.planned_end_time})`}
                                              </DetailValue> */}
                                            </div>
                                            <div>
                                              <DetailLabel>End Date:</DetailLabel>
                                              <DetailValue> {orderItem.planned_end_date}</DetailValue>
                                              {/* <DetailValue style={{ marginLeft: theme.spacing.xs }}>
                                                {orderItem.planned_end_time && `(${orderItem.planned_end_time})`}
                                              </DetailValue> */}
                                            </div>
                                           {orderItem.planned_start_time &&  <div>
                                              <DetailLabel>Time: </DetailLabel>
                                              <DetailValue>{formatAPITime(orderItem.planned_start_time)} - {formatAPITime(orderItem.planned_end_time)} (Daily)</DetailValue>
                                            </div>}
                                          </DetailRow>
                                        </ResponsiveCell>
                                        <ResponsiveCell>
                                          {orderItem.actual_start_date ?
                                            <DetailRow>
                                              <div>
                                                <DetailLabel>Start:</DetailLabel>
                                                <DetailValue> {orderItem.actual_start_date || "Not started yet"}</DetailValue>
                                              </div>
                                              <div>
                                                <DetailLabel>End:</DetailLabel>
                                                <DetailValue> {orderItem.actual_end_date || "Not ended yet"}</DetailValue>
                                              </div>
                                            </DetailRow> : <Badge variant='error'>Not started yet</Badge>}
                                        </ResponsiveCell>
                                        <ResponsiveCell>
                                          {orderItem.audit_item_no_actual}/{orderItem.audit_item_no_planned}
                                        </ResponsiveCell>
                                        <ResponsiveCell>
                                          <Badge variant={variant}>{status_label}</Badge>
                                        </ResponsiveCell>
                                        <ResponsiveCell>
                                          <ActionsGroup>
                                            <Button variant="outline" size="sm" title="View" onClick={() => handleViewItem(employee, orderItem)} >
                                              <FaEye />
                                            </Button>
                                            {orderItem?.order_item_complete_status === "completed" &&
                                              <>
                                                <Button variant="primary" size="sm" title="Approve All" onClick={() => handleApproveWeekly(employee, orderItem, "WEEKLY_APPROVE")}>
                                                  <FaCheck /> Approve All
                                                </Button>
                                                {/* <Button variant="outlines" size="sm" title="Reject" onClick={() => handleReject(employee, orderItem, "WEEKLY_SUBMIT")}>
                                                  <FaTimes />
                                                </Button> */}
                                              </>
                                            }
                                          </ActionsGroup>
                                        </ResponsiveCell>
                                      </TableRow>
                                    )
                                  })}
                                </tbody>
                              </NestedTable>
                            </div>
                          ))}
                        </NestedTableContainer>
                      </NestedTableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            }))}
          </tbody>
        </Table>
      </TableContainer>
       {filteredDemoData.length !== 0 &&
                                <div style={{ marginTop: "1rem", textAlign: "right" }}>
                                  <Button variant="primary" size="sm" onClick={() => handleAuditExport(filteredDemoData)}>
                                    <FaFileExport /> Export
                                  </Button>
                                </div>
                              }
{/* 
      <ConfirmationPopup
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        approve={confirmType}
        timesheet={true}
        isLoading={isLoading}
      /> */}
    </>
  );
};

export default EmployeeWorkTracker;