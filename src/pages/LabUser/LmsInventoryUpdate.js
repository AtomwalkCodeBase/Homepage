import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  FiPackage,
  FiCheck,
  FiAlertCircle,
  FiInfo
} from 'react-icons/fi';
import Layout from '../../components/Layout';
import { getActivitiQcData, postActivtyInventory } from '../../services/productServices';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { theme } from '../../styles/Theme';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  padding: ${theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

const Header = styled.header`
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.textLight};
  margin: 0;
  font-size: 0.95rem;
`;

const Card = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: 0 4px 6px ${theme.colors.shadow};
  margin-bottom: ${theme.spacing.lg};
`;

const ItemCard = styled(Card)`
  border-left: 4px solid ${props => props.flowType === 'IN' ? theme.colors.primary : theme.colors.accent};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 6px 12px ${theme.colors.shadow};
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemIcon = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.flowType === 'IN' ? theme.colors.primaryLight : theme.colors.accentLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.flowType === 'IN' ? theme.colors.primary : theme.colors.accent};
  font-size: 1.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemNumber = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.textLight};
  font-weight: 500;
  margin-bottom: ${theme.spacing.xs};
`;

const ItemName = styled.div`
  font-size: 1.1rem;
  color: ${theme.colors.text};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
`;

const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.backgroundAlt};
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.8rem;
  color: ${theme.colors.textLight};
  margin-top: ${theme.spacing.xs};
`;

const FlowTypeBadge = styled.div`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${props => props.flowType === 'C' ? theme.colors.primaryLight : theme.colors.accentLight};
  color: ${props => props.flowType === 'C' ? theme.colors.primary : theme.colors.accent};
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.8rem;
  font-weight: 600;
  width: fit-content;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  padding: ${theme.spacing.md};
  background: ${theme.colors.backgroundAlt};
  border-radius: ${theme.borderRadius.lg};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  color: ${theme.colors.text};
  font-weight: 600;
`;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputLabel = styled.label`
  font-size: 0.95rem;
  color: ${theme.colors.text};
  font-weight: 500;
  min-width: 180px;
  
  @media (max-width: 576px) {
    min-width: auto;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fonts.body};
  font-size: 0.95rem;
  transition: border-color ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
  
  &:disabled {
    background: ${theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
`;

const UnitLabel = styled.span`
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  min-width: 100px;
  
  @media (max-width: 576px) {
    min-width: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 2px solid ${theme.colors.border};
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textLight};
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.info}15;
  border-left: 4px solid ${theme.colors.info};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  font-size: 0.9rem;
  color: ${theme.colors.text};
`;
const ClaimsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
`;
const Tagline = styled.p`
 color: ${({ theme }) => theme.colors.textLight};
`

function LmsInventoryUpdate() {
    const location = useLocation();
   const activityList = location.state || [];
    const { id, call_type } = location.state || {};

  const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
    fetchInventoryData();
  }, []);

  // ---------------- API: Fetch inventory ----------------
  const fetchInventoryData = async () => {
    try {
      const payload = {
        activity_id: id,
        call_mode: "INV_IN",
      };
      const response = await getActivitiQcData(payload);
      setInventoryData(response.data || []);
    } catch (err) {
      console.error("Error fetching inventory", err);
    }
  };

  const handleInputChange = (itemNumber, value) => {
    const sanitized = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");

    setInventoryData((prev) =>
      prev.map((item) =>
        item.item_number === itemNumber
          ? { ...item, curr_consumed_quantity: sanitized }
          : item
      )
    );
  };

    const handleUpdateAllItems = async () => {
    const flowType = call_type === "INV_IN" ? "IN" : "OUT";

    const itemsToUpdate = inventoryData.filter(
      (item) =>
        item.flow_type === flowType &&
        Number(item.curr_consumed_quantity) > 0
    );

    // 🔴 Validation for consumption
    if (call_type === "INV_IN") {
      for (let item of itemsToUpdate) {
        const already = Number(item.already_consumed_qty) || 0;
        const current = Number(item.curr_consumed_quantity) || 0;
        const allocated = Number(item.allocated_qty) || 0;

        if (already + current > allocated) {
            toast.info(`Entered consumption for ${item.item_name} exceeds allocated quantity.
Allocated: ${allocated} ${item.item_base_unit}
Already Consumed: ${already} ${item.item_base_unit}`)
          return;
        }
      }
    }

    if (itemsToUpdate.length === 0) {
      alert("Please enter quantity for at least one item");
      return;
    }

    const payload = {
      activity_id: id,
      call_mode: call_type,
      item_list: itemsToUpdate.map((item) => ({
        item_number: item.item_number,
        curr_quantity: `${item.curr_consumed_quantity}`,
      })),
    };

    try {
      await postActivtyInventory(payload);
      toast.success("Inventory updated successfully!")
      fetchInventoryData();
    } catch (err) {
       toast.error("Failed to update inventory")
    }
  };

  // ---------------- Filter Data ----------------
  const filteredData = inventoryData.filter((item) =>
    call_type === "INV_IN" ? item.flow_type === "IN" : item.flow_type === "OUT"
  );

  const getLocationDisplay = (item) => {
    if (item.batch_number) {
      return `Batch: ${item.batch_number}`;
    } else if (item.bin_location) {
      return `Bin: ${item.bin_location}`;
    }
    return 'Location not specified';
  };

  return (
    <Layout title="Inventory Consumption Tracker">
         <ClaimsHeader>
              <Tagline>Track and manage your assigned audit tasks</Tagline>
            </ClaimsHeader>
      {/* <InfoBox>
        <FiInfo size={24} style={{ minWidth: '24px' }} />
        <div>
          <strong>Flow Type C:</strong> Shows allocated, consumed, released, and wastage quantities. 
          <strong style={{ marginLeft: '16px' }}>Flow Type E:</strong> Shows estimated and consumed quantities.
        </div>
      </InfoBox> */}

      {filteredData.length === 0 ? (
        <EmptyState>
          <FiAlertCircle size={48} style={{ marginBottom: theme.spacing.md }} />
          <p>No items to display</p>
        </EmptyState>
      ) : (
        <>
          {filteredData.map((item, index) => (
            <ItemCard key={index} flowType={item.flow_type}>
              <ItemHeader>
                <ItemIcon flowType={item.flow_type}>
                  <FiPackage />
                </ItemIcon>
                <ItemInfo>
                  <ItemNumber>{item.item_number}</ItemNumber>
                  <ItemName>{item.item_name}</ItemName>
                  <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap', marginTop: theme.spacing.sm }}>
                    <FlowTypeBadge flowType={item.flow_type}>
                      {item.flow_type === 'OUT' ? 'Consumption Flow' : 'Estimation Flow'}
                    </FlowTypeBadge>
                   {(item.flowType === "IN" && (item.bin_location || item.batch_number)  )&& 
                   <>
                   <LocationBadge>
                      {getLocationDisplay(item)}
                    </LocationBadge>
                    <LocationBadge>
                      Allocated Qty: {item.allocated_qty} {item.item_base_unit}
                    </LocationBadge>
                    </>
                    }
                  </div>
                </ItemInfo>
              </ItemHeader>

              <StatsGrid>
                {item.flow_type === 'IN' ? (
                  <>
                    <StatItem>
                      <StatLabel>Allocated Quantity</StatLabel>
                      <StatValue>{item.allocated_qty} {item.item_base_unit}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Already Consumed</StatLabel>
                      <StatValue>{item.already_consumed_qty} {item.item_base_unit}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Released Quantity</StatLabel>
                      <StatValue>{item.released_qty} {item.item_base_unit}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Wastage Quantity</StatLabel>
                      <StatValue>{item.wastage_qty} {item.item_base_unit}</StatValue>
                    </StatItem>
                  </>
                ) : (
                  <>
                    <StatItem>
                      <StatLabel>Estimated Quantity</StatLabel>
                      <StatValue>{item.estimated_qty} {item.item_base_unit}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Produced Qty</StatLabel>
                      <StatValue>{item.already_consumed_qty} {item.item_base_unit}</StatValue>
                    </StatItem>
                  </>
                )}
              </StatsGrid>

              <InputSection>
                <InputLabel>Current Consumption:</InputLabel>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.curr_consumed_quantity}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter consumption quantity"
                />
                <UnitLabel>{item.item_base_unit}</UnitLabel>
              </InputSection>
            </ItemCard>
          ))}

          <ButtonContainer>
            <Button variant='primary' onClick={handleUpdateAllItems}>
              <FiCheck size={20} />
              {call_type === "INV_IN" ? "Update Consumption" : "Update Production"}
            </Button>
          </ButtonContainer>
        </>
      )}
    </Layout>
  );
}

export default LmsInventoryUpdate;