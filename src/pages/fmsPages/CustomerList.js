import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { FaClipboardList, FaEye, FaFileExport, FaFilter, FaPlus } from 'react-icons/fa'
import { HiClipboardList } from "react-icons/hi";
import { getCustomerDetailList } from '../../services/productServices'
import Card from '../../components/Card'
import { IoTicket, IoTicketOutline } from 'react-icons/io5'

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
const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text};
`
const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
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
	const [customerList, setCustomerList] = useState([])
		const [loading, setLoading] = useState(false)
		const [error, setError] = useState(null)
		const [openModal, setOpenModal] = useState(false)
		const [selectedCustomer, setSelectedCustomer] = useState(null)
	  useEffect(() => {
		 const fetchcustomerProfile = async () => {
		  try {
			const res = await getCustomerDetailList();
			setCustomerList(res?.data);
			console.log(res?.data)
		  } catch (error) {
			console.error('Failed to fetch profile:', error);
		  }
		};
		 fetchcustomerProfile();
	  }, [])

	  
	const handleViewDetails = (data) => {
    setSelectedCustomer(data)
    setOpenModal(true)
  }
  return (
	<Layout title="Customer List">
		<RequestDeskHeader>
        <div>
          <Paragraphdata>View All Employee Task </Paragraphdata>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="primary">
            <FaPlus /> Add New Customer
          </Button>
        </div>
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
                customerList.map((customer, index) => (
                  <tr key={index}>
                    <td>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={customer.image || "/placeholder.svg"}
            alt={`${customer.name} profile image`}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover"
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
                        <Button onClick={() => handleViewDetails(customer)} variant="ghost" size="sm" title="View">
                          <FaEye />
                        </Button>
                        <Button  variant="primary" size="sm" title="Total Task">
                          <FaClipboardList /> Total Task {customer.no_of_task}
                        </Button>
                        <Button variant="primary" size="sm" title="Total Tickets">
                          <IoTicket size={20} /> Total Tickets 10
                        </Button>
                      </ActionButtons>
                    </td>
                  </tr>
                ))
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
	</Layout>
  )
}

export default CustomerList