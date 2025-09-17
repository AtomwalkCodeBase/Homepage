import React, { useEffect, useMemo, useState } from 'react'
import styled from "styled-components"
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { FaClipboardList,FaEye,FaFileExport } from 'react-icons/fa'
import { getCustomerDetailList } from '../../services/productServices'
import Card from '../../components/Card'
import { IoTicket } from 'react-icons/io5'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom"
import Modal from '../../components/modals/Modal'

const RequestDeskHeader = styled.div`
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
const Paragraphdata = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`
// const FilterContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1rem;
//   flex-wrap: wrap;
//   color: ${({ theme }) => theme.colors.text};
// `
// const FilterSelect = styled.select`
//   padding: 0.5rem 1rem;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: 4px;
//   background: white;
// `
const TableContainer = styled.div`
  overflow-x: auto;
`
const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`
const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const CustomerList = () => {
  const {  taskResponse } = useAuth()
	const [customerList, setCustomerList] = useState([])
		const [loading, setLoading] = useState(false)
		const [error, setError] = useState(null)
		const [openModal, setOpenModal] = useState(false)
		const [selectedCustomer, setSelectedCustomer] = useState(null)
      const Navigate= useNavigate()

  const customerTotals = useMemo(() => {
    if (!taskResponse) return {};

    return taskResponse.reduce((acc, task) => {
      const customerName = task?.customer?.name;
      if (!customerName) return acc;

      if (!acc[customerName]) {
        acc[customerName] = { totalTickets: 0, totalTasks: 0 };
      }

      if (task.is_ticket_task) {
        acc[customerName].totalTickets += 1;
      } else {
        acc[customerName].totalTasks += 1;
      }

      return acc;
    }, {});
  }, [taskResponse]);

	  useEffect(() => {
		 const fetchcustomerProfile = async () => {
      setLoading(true)
		  try {
			const res = await getCustomerDetailList();
			setCustomerList(res?.data);
      console.log(res?.data)
		  } catch (error) {
			console.error('Failed to fetch profile:', error);
      setError("Failed to Load Customer List");
		  }finally{
        setLoading(false)
      }
		};
		 fetchcustomerProfile();
	  }, [])
	  
	const handleViewDetails = (data) => {
    setSelectedCustomer(data)
    setOpenModal(true)
  }

  const handleViewList = (type, data) => {
    if(type === "customer"){
    Navigate(`/ticketList?customer=${data}`) 
    }
    else{
    Navigate(`/tasks?customer=${data}`) 
  }
}
  return (
	<Layout title="Customer List">
		<RequestDeskHeader>
        <div>
          <Paragraphdata>View All Employee Task </Paragraphdata>
        </div>

        {/* <div style={{ display: "flex", gap: 10 }}>
          <Button variant="primary">
            <FaPlus /> Add New Customer
          </Button>
        </div> */}
      </RequestDeskHeader>
	  <Card>
		<TableContainer>
          <table>
            <thead>
              <tr>
                <th style={{paddingLeft: "7rem"}}>Customer Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    Loading ticket data...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "red" }}>
                    {error}
                  </td>
                </tr>
              ) : customerList.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No tickets found for the selected date range
                  </td>
                </tr>
              ) : (
                customerList.map((customer, index) => {
                  const totals = customerTotals[customer.name] || {
                    totalTickets: 0,
                    totalTasks: 0,
                  };

                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img
                            src={customer.image || "/placeholder.svg"}
                            alt={`${customer.name} profile image`}
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <strong>{customer.name}</strong>
                            <span>M: {customer.mobile_number}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <ActionButtons>
                          <Button
                            onClick={() => handleViewDetails(customer)}
                            variant="ghost"
                            size="sm"
                            title="View"
                          >
                            <FaEye />
                          </Button>
                          <Button variant="primary" size="sm" title="Total Task" onClick={() => handleViewList("task", customer.name)}>
                            <FaClipboardList /> Total Task {totals.totalTasks}
                          </Button>
                          <Button variant="primary" size="sm" title="Total Tickets" onClick={() => handleViewList("customer", customer.name)}>
                            <IoTicket size={20} /> Total Tickets {totals.totalTickets}
                          </Button>
                        </ActionButtons>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <TableActions style={{ float: "right" }}>
            <Button variant="primary" size="sm">
              <FaFileExport /> Export
            </Button>
          </TableActions>
        </TableContainer>
		
	  </Card>
    {openModal && selectedCustomer && 
    <Modal onClose={() => setOpenModal(false)}>
			<div style={{ padding: "0.8rem" }}>
				<h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Customer Details</h2>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<tbody>
						<tr>
							<td><strong>Customer Name:</strong></td>
							<td>{selectedCustomer.name || "—"}</td>
						</tr>
						{selectedCustomer.email_id && <tr>
							<td><strong>Email:</strong></td>
							<td>{selectedCustomer.email_id || "—"}</td>
						</tr>}
						{selectedCustomer.mobile_number && <tr>
							<td><strong>Mobile Number:</strong></td>
							<td>{selectedCustomer.mobile_number || "—"}</td>
						</tr>}
						{selectedCustomer.customer_group && <tr>
							<td><strong>Customer Group:</strong></td>
							<td>{selectedCustomer.customer_group || "—"}</td>
						</tr>}
						{selectedCustomer.address_line_1 && <tr>
							<td><strong>Address Line 1:</strong></td>
							<td>{selectedCustomer.address_line_1 || "—"}</td>
						</tr>}
						{selectedCustomer.address_line_2 && <tr>
							<td><strong>Address Line 2:</strong></td>
							<td>{selectedCustomer.address_line_2 || "—"}</td>
						</tr>}
						
					</tbody>
				</table>

				<div style={{ marginTop: "1.5rem", textAlign: "center" }}>
					<Button variant="primary" onClick={() => setOpenModal(false)}>
						Close
					</Button>
				</div>
			</div>
		</Modal>
    }
	</Layout>
  )
}

export default CustomerList