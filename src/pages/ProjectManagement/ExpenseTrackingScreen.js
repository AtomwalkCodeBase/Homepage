import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import { FaBoxes, FaCalendarAlt, FaClipboardList, FaEdit, FaPlus, FaTimes } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Card from '../../components/Card'
import { formatToDDMMYYYY, getMonthRange, normalizeProjects } from './utils/utils'
import { toast } from 'react-toastify'
import { getEmpAllocationData, getExpensePlannedItem, postExpensePlannedItem } from '../../services/productServices'
import Button from '../../components/Button'

const ProjectHeader = styled.div`
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

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
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

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
`;

// Modal Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 100%;
  max-width: 750px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.card};
  z-index: 10;
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    
    h3 {
      font-size: 1.25rem;
    }
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 0.9rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.9rem;
`;

const ModalFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.colors.card};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    flex-direction: column;
  }
`;

const FooterButton = styled(Button)`
  flex: 1;
`;
const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`
const CompactRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
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

const ExpenseTrackingScreen = () => {
  const [allCustomer, setAllCustomer] = useState([]);
  const [plannedItems, setPlannedItems] = useState([]);
  const [actualItems, setActualItems] = useState([]);

  const [activeTab, setActiveTab] = useState("plannedItem");
  const [dateRange, setDateRange] = useState(() => getMonthRange({ type: "current" }));

  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderItemId, setOrderItemId] = useState(null);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);

  useEffect(() => {
    fetchEmpAllocationData();
  }, [])

  useEffect(() => {
    if (selectedOrderItemId) {
      fetchPlannedAndActual(selectedOrderItemId);
    }
  }, [selectedOrderItemId]);


  const fetchEmpAllocationData = async (startOverride, endOverride) => {
    const emp_id = localStorage.getItem("empId")
    const start = startOverride || dateRange.start
    const end = endOverride || dateRange.end

    const startDateObj = new Date(start)
    const endDateObj = new Date(end)

    if (endDateObj < startDateObj) {
      toast.info("End date cannot be earlier than start date")
      return
    }
    const payload = {
      emp_id: emp_id,
      start_date: formatToDDMMYYYY(start),
      end_date: formatToDDMMYYYY(end),
    }

    setIsLoading(true);

    try {
      const response = await getEmpAllocationData(payload);
      const normalizedData = normalizeProjects(response.data)
      setAllCustomer(groupCustomersWithOrderItems(normalizedData))
    } catch (error) {
      toast.error("No order item found...")
    } finally {
      setIsLoading(false);
    }
  }

  const extractNumericId = (value) => {
    if (!value) return null;
    return Number(String(value).replace(/\D/g, ""));
  };

  const groupCustomersWithOrderItems = (data) => {
    const map = new Map();

    data.forEach((entry) => {
      const { customer_name, order_item_id, project_code } = entry;
      if (!customer_name || !order_item_id) return;

      const numericOrderItemId = extractNumericId(order_item_id);

      if (!map.has(customer_name)) {
        map.set(customer_name, {
          customer_name,
          order_items: [],
        });
      }

      map.get(customer_name).order_items.push({
        order_item_id: numericOrderItemId,
        order_item_key: project_code,
      });
    });

    return Array.from(map.values());
  };

  const flatCustomerOptions = allCustomer.flatMap(c =>
    c.order_items.map(oi => ({
      label: `${c.customer_name} [${oi.order_item_key}]`,
      value: oi.order_item_id,
    }))
  );

  const handleCustomerChange = (e) => {
    const orderItemKey = e.target.value;
    setSelectedOrderItemId(orderItemKey);

    if (!orderItemKey) {
      setOrderItemId(null);
      return;
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  const fetchPlannedAndActual = async (orderItemId) => {
    setIsLoading(true);

    try {
      const [plannedRes, actualRes] = await Promise.all([
        getExpensePlannedItem({ expense_type: "P", o_item_id: orderItemId }),
        getExpensePlannedItem({ expense_type: "A", o_item_id: orderItemId }),
      ]);

      setPlannedItems(plannedRes.data || []);
      setActualItems(actualRes.data || []);
    } catch (err) {
      toast.error("Something went wrong. Try again later!",);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    // console.log('Form submitted:', formData);
    try {
      const payload = {
        "exp_data": {
          "order_item_id": formData.item.order_item_id,
          "call_mode": activeTab === "plannedItem" ? "ADD" : "UPDATE",
          "exp_allocation_list": [
            {
              "project_id": formData?.item?.project_id,
              "activity_id": formData?.item?.activity_id,
              "item_id": formData?.item?.item_id,
              "quantity": formData?.quantity,
              "expense_cost": 0,
              "expense_amt": formData.days,
              "remarks": formData.remark,
            }
          ]
        }
      };
      // console.log('Form submitted:', payload);
      setIsLoading(true);

      const res = await postExpensePlannedItem(payload);

      if (res?.status === 200) {
        toast.success(activeTab === "plannedItem" ? `${formData?.item?.item_name} Successfully added` : `${formData?.item?.item_name} Successfully updated`)
        await fetchPlannedAndActual(orderItemId);
        setSelectedItem(null);
        return true
      }

    } catch (error) {
      console.error("Something went wrong. Please try again later!!!");
      setSelectedItem(null);
    } finally {
      setIsLoading(false)
      setSelectedItem(null);
    }
  };

  return (
    <Layout title="Expense Tracking Screen">
      <ProjectHeader>
        <div>
          <Paragraphdata>Manage and track all your projects</Paragraphdata>
        </div>
      </ProjectHeader>
      <Container>
        <Card hoverable={false}>
          <TabContainer>
            {["plannedItem", "actualItem"].map((tab) => (
              <Tab key={tab} active={activeTab === tab} onClick={() => { setActiveTab(tab) }}>
                {tab === "plannedItem" ? "Planned Item" : "Actual Item"}
              </Tab>
            ))}
          </TabContainer>
          <Header>
            <Title>Expense Management</Title>
            <FilterSelect value={selectedOrderItemId ?? ""} onChange={handleCustomerChange}>
              <option value="">Select order item</option>
              {isLoading ? (
                <option disabled>Loading...</option>
              ) : flatCustomerOptions.length === 0 ? (
                <option disabled>No order item Found</option>
              ) : (
                <>
                  {flatCustomerOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </>
              )}
            </FilterSelect>

          </Header>

          {selectedOrderItemId ? (
            isLoading ? (
              <EmptyState>Loading...</EmptyState>
            ) : activeTab === "plannedItem" ? (
              <>
                <h4>Planned Expense Item</h4>
                <OrderItemsTable items={plannedItems} type="P" onAction={handleEditClick} />
                <h4 style={{marginTop: "20px"}}>Actual Expense Item</h4>
                <OrderItemsTable items={actualItems} type="A" onAction={handleEditClick} />
              </>
            ) : (
              <OrderItemsTable items={actualItems} type="A" onAction={handleEditClick} />
            )
          ) : (
            <EmptyState>Please select a order item to view expense items</EmptyState>
          )}
        </Card>

        {selectedItem && (
          <ExpenseModal
            item={selectedItem}
            onClose={handleModalClose}
            onSubmit={handleFormSubmit}
            activeTab={activeTab}
          />
        )}
      </Container>
    </Layout>
  )
}

export default ExpenseTrackingScreen;

const ExpenseModal = ({ item, onClose, onSubmit, activeTab }) => {
  const [formData, setFormData] = useState({
    quantity: item?.quantity || 0,
    days: item?.allocation_days || 0,
    date: '',
    remark: activeTab === "plannedItem" ? "" : item?.remarks || ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, item });
  };

  if (!item) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Fill Expense Details</h3>
          <CloseBtn onClick={onClose}>
            <IoClose />
          </CloseBtn>
        </ModalHeader>

        <InfoSection>
          <InfoCard>
            <InfoLabel>Item Name</InfoLabel>
            <InfoValue>{item.item_name}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Order Item Key</InfoLabel>
            <InfoValue>{item.order_item_key}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Planned Quantity</InfoLabel>
            <InfoValue>{item.quantity}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Planned Days</InfoLabel>
            <InfoValue>{item.allocation_days}</InfoValue>
          </InfoCard>
        </InfoSection>

        <ModalBody>
          <CompactRow>
            <FormGroup>
              <Label><FaCalendarAlt /> Number of days</Label>
              <Input type="days" min={0} value={formData.days} onChange={(e) => handleChange("days", e.target.value)} placeholder="Enter no of Days" />
            </FormGroup>
            <FormGroup>
              <Label><FaBoxes /> Quantity</Label>
              <Input type="quantity" min={0} value={formData.quantity} onChange={(e) => handleChange("quantity", e.target.value)} placeholder="Quantity" />
            </FormGroup>
            <FormGroup>
              <Label><FaCalendarAlt /> Date</Label>
              <Input type="date" value={formData.date} onChange={(e) => handleChange("date", e.target.value)} />
            </FormGroup>
          </CompactRow>
          <FormGroup>
            <Label>
              <FaClipboardList />
              Remark
            </Label>
            <TextArea name="remark" value={formData.remark} onChange={(e) => handleChange("remark", e.target.value)} placeholder="Enter any remarks..." />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <FooterButton variant="secondary" onClick={onClose}>
            <FaTimes /> Cancel
          </FooterButton>
          <FooterButton variant="primary" onClick={handleSubmit}>
            <FaEdit /> Submit
          </FooterButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export const OrderItemsTable = ({ items = [], type, onAction, }) => {

  if (!items.length) {
    return <EmptyState>No items found</EmptyState>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Item Name</TableHeader>
            <TableHeader>Order Item Key</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>No of Days</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>

        <tbody>
          {items.map((item) => (
            <React.Fragment key={item.order_item_id}>
              <TableRow>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.order_item_key}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.expense_date}</TableCell>
                <TableCell>{item.allocation_days}</TableCell>

                <TableCell>
                  {type === "P" && (
                    <Button size="sm" onClick={() => onAction(item)}>
                      <FaPlus /> Add
                    </Button>
                  )}

                  {type === "A" && (
                    <Button size="sm" onClick={() => onAction(item)}>
                     <FaEdit /> Update
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};