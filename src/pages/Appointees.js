"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaUserPlus, FaUserShield, FaUserCheck } from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const AppointeesHeader = styled.div`
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

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
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

const AppointeeAvatar = styled.div`
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

const AppointeeInfo = styled.div`
  display: flex;
  align-items: center;
`

const AppointeeDetails = styled.div``

const AppointeeName = styled.div`
  font-weight: 500;
`

const AppointeeRelation = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
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

const Appointees = () => {
  const [activeTab, setActiveTab] = useState("appointees")

  // Mock data for appointees
  const appointees = [
    {
      id: 1,
      name: "Sarah Johnson",
      relation: "Spouse",
      contact: "+1 (555) 123-4567",
      email: "sarah.johnson@example.com",
      address: "123 Main St, Anytown, USA",
      status: "Active",
      type: "Primary",
    },
    {
      id: 2,
      name: "Michael Johnson",
      relation: "Son",
      contact: "+1 (555) 987-6543",
      email: "michael.johnson@example.com",
      address: "123 Main St, Anytown, USA",
      status: "Active",
      type: "Secondary",
    },
    {
      id: 3,
      name: "Emily Johnson",
      relation: "Daughter",
      contact: "+1 (555) 456-7890",
      email: "emily.johnson@example.com",
      address: "123 Main St, Anytown, USA",
      status: "Inactive",
      type: "Secondary",
    },
  ]

  // Mock data for nominees
  const nominees = [
    {
      id: 1,
      name: "Sarah Johnson",
      relation: "Spouse",
      percentage: 60,
      document: "ID Card",
      documentNumber: "ID12345678",
      status: "Verified",
    },
    {
      id: 2,
      name: "Michael Johnson",
      relation: "Son",
      percentage: 20,
      document: "Birth Certificate",
      documentNumber: "BC98765432",
      status: "Verified",
    },
    {
      id: 3,
      name: "Emily Johnson",
      relation: "Daughter",
      percentage: 20,
      document: "Birth Certificate",
      documentNumber: "BC45678901",
      status: "Pending",
    },
  ]

  return (
    <Layout title="Appointees & Nominees">
      <AppointeesHeader>
        <div>
          <h2>Appointees & Nominees</h2>
          <p>Manage your appointees and nominees for benefits</p>
        </div>

        <Button variant="primary">
          <FaPlus /> Add New
        </Button>
      </AppointeesHeader>

      <Card>
        <TabContainer>
          <Tab active={activeTab === "appointees"} onClick={() => setActiveTab("appointees")}>
            <FaUserPlus style={{ marginRight: "0.5rem" }} />
            Appointees
          </Tab>
          <Tab active={activeTab === "nominees"} onClick={() => setActiveTab("nominees")}>
            <FaUserShield style={{ marginRight: "0.5rem" }} />
            Nominees
          </Tab>
          <Tab active={activeTab === "beneficiaries"} onClick={() => setActiveTab("beneficiaries")}>
            <FaUserCheck style={{ marginRight: "0.5rem" }} />
            Beneficiaries
          </Tab>
        </TabContainer>

        <FilterContainer>
          <FilterSelect>
            <option>All Relations</option>
            <option>Spouse</option>
            <option>Child</option>
            <option>Parent</option>
            <option>Sibling</option>
          </FilterSelect>

          <FilterSelect>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Verified</option>
            <option>Pending</option>
          </FilterSelect>

          <Button variant="outline" size="sm">
            <FaFilter /> Filter
          </Button>
        </FilterContainer>

        <TableContainer>
          {activeTab === "appointees" && (
            <table>
              <thead>
                <tr>
                  <th>Appointee</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointees.map((appointee) => (
                  <tr key={appointee.id}>
                    <td>
                      <AppointeeInfo>
                        <AppointeeAvatar>{appointee.name.charAt(0)}</AppointeeAvatar>
                        <AppointeeDetails>
                          <AppointeeName>{appointee.name}</AppointeeName>
                          <AppointeeRelation>{appointee.relation}</AppointeeRelation>
                        </AppointeeDetails>
                      </AppointeeInfo>
                    </td>
                    <td>{appointee.contact}</td>
                    <td>{appointee.email}</td>
                    <td>{appointee.address}</td>
                    <td>
                      <Badge variant={appointee.type === "Primary" ? "primary" : "secondary"}>{appointee.type}</Badge>
                    </td>
                    <td>
                      <Badge variant={appointee.status === "Active" ? "success" : "error"}>{appointee.status}</Badge>
                    </td>
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
          )}

          {activeTab === "nominees" && (
            <table>
              <thead>
                <tr>
                  <th>Nominee</th>
                  <th>Percentage</th>
                  <th>Document Type</th>
                  <th>Document Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {nominees.map((nominee) => (
                  <tr key={nominee.id}>
                    <td>
                      <AppointeeInfo>
                        <AppointeeAvatar>{nominee.name.charAt(0)}</AppointeeAvatar>
                        <AppointeeDetails>
                          <AppointeeName>{nominee.name}</AppointeeName>
                          <AppointeeRelation>{nominee.relation}</AppointeeRelation>
                        </AppointeeDetails>
                      </AppointeeInfo>
                    </td>
                    <td>{nominee.percentage}%</td>
                    <td>{nominee.document}</td>
                    <td>{nominee.documentNumber}</td>
                    <td>
                      <Badge variant={nominee.status === "Verified" ? "success" : "warning"}>{nominee.status}</Badge>
                    </td>
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
          )}

          {activeTab === "beneficiaries" && (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <FaUserCheck size={40} style={{ marginBottom: "1rem", color: "#6C63FF" }} />
              <h3>Beneficiaries Management</h3>
              <p>This section allows you to manage beneficiaries for your insurance and other benefits.</p>
              <Button variant="primary" style={{ marginTop: "1rem" }}>
                <FaPlus /> Add Beneficiary
              </Button>
            </div>
          )}
        </TableContainer>
      </Card>
    </Layout>
  )
}

export default Appointees

