import { useEffect, useMemo, useState } from 'react';
import { Building2, ChevronDown, MapPin, PenBox } from 'lucide-react'; // assuming you're using lucide
import styled from 'styled-components';
import Card from '../../Card';
import RetainerCard from './RetainerCard';

const LogsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing?.md || '1rem'};
  border: 1px solid ${({ theme }) => theme.colors?.border || '#e0e0e0'};
  border-radius: ${({ theme }) => theme.borderRadius?.md || '8px'};
  overflow: hidden;
`;

const LogsHeader = styled.div`
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#f8f9fc'};
  padding: ${({ theme }) => theme.spacing?.sm || '0.5rem'} ${({ theme }) => theme.spacing?.md || '0.75rem'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.85rem'};
  transition: ${({ theme }) => theme.transitions?.fast || '0.2s ease'};
  
  &:hover {
    background: ${({ theme }) => theme.colors?.primaryLight || '#E8E6FF'};
  }
`;

const LogsToggle = styled.div`
color: "#666";
  transition: ${({ theme }) => theme.transitions?.normal || 'transform 0.3s ease'};
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const LogsContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '400px' : '0')};
  overflow-Y: scroll;
  transition: ${({ theme }) => theme.transitions?.normal || 'max-height 0.3s ease'};
`;

const LogsGrid = styled.div`
  display: grid;
  gap: 1px;
  background-color: ${({ theme }) => theme.colors?.border || '#e0e0e0'};
`;

const NoLogsMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing?.md || '1rem'};
  color: ${({ theme }) => theme.colors?.textLight || '#999'};
  background: ${({ theme }) => theme.colors?.card || '#fff'};
`;

export const GroupedRetainerAccordion = ({ allRetainers, retainerCache, onAction, onRetainerUpdate, activeParentId}) => {
  // Group retainers by parent project/activity

  // console.log("retainers", allRetainers) 
  // console.log("retainerCache", retainerCache) 
  const groupedRetainers = useMemo(() => {
    const groups = {};

    allRetainers.forEach((retainer) => {
      const parent = retainer.parentActivity;
      if (!parent) return;

      const key = parent.id || parent.p_id || parent.project_code;

      if (!groups[key]) {
        groups[key] = {
          parent,
          retainers: [],
        };
      }

      if (retainer.a_type === "P") {
        groups[key].retainers.push(retainer);
      }
    });

    return Object.values(groups);
  }, [allRetainers]);

  if (groupedRetainers.length === 0) {
    return (
      <Card style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
        No retainers to display. 
      </Card>
    );
  }

  return (
    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {groupedRetainers.map((group) => {
        const parentId = group.parent.id || group.parent.p_id;
        return(
        <CustomerRetainerGroup
          key={group.parent.id || group.parent.p_id}
          parent={group.parent}
          retainers={group.retainers}
          retainerCache={retainerCache}
          onAction={onAction}
          onRetainerUpdate={onRetainerUpdate}
          forceOpen={activeParentId === parentId}
        />
      )})}
    </div>
  );
};

const CustomerRetainerGroup = ({ parent, retainers, retainerCache, onAction, onRetainerUpdate, forceOpen,}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    customer_name,
    project_code,
    order_item_key,
    original_P = {},
  } = parent;

  const location = original_P.store_name || 'N/A';
  const remark = original_P.store_remarks || null;

  useEffect(() => {
  if (forceOpen) {
    setIsOpen(true);
  }
}, [forceOpen]);

  return (
    <LogsSection>
      {/* Header - Click to Expand */}
      <LogsHeader onClick={() => setIsOpen(!isOpen)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <h1 style={{ fontWeight: 600, fontSize: '0.95rem', }}>
             <Building2 size={18} style={{marginRight: "0.5rem"}}/>
              {customer_name}
            </h1>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              {project_code || order_item_key} /<MapPin size={14} /> {location}
            </div>
          </div>
        </span>

        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: '#555' }}>
            {retainers.length} retainer{retainers.length !== 1 ? 's' : ''}
          </span>
          <LogsToggle isOpen={isOpen}>
            <ChevronDown size={20} color="#666" />
          </LogsToggle>
        </span>
      </LogsHeader>

      {/* Optional Remark */}
      {remark && isOpen && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#fafafa',
            borderBottom: '1px solid #eee',
            fontSize: '0.85rem',
            color: '#555',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <PenBox size={16} style={{ marginTop: '2px', opacity: 0.7 }} />
          <span>{remark}</span>
        </div>
      )}

      {/* Expanded Retainer List */}
      <LogsContent isOpen={isOpen}>
        {retainers.length === 0 ? (
          <NoLogsMessage>No retainers assigned </NoLogsMessage>
        ) : (
          <LogsGrid>
            {retainers.map((retainer) => (
              <RetainerCard
                 key={`${retainer.emp_id}-${retainer.a_id}`}
                retainer={retainer}
                onAction={onAction}
                retainerCache={retainerCache}
                onRetainerUpdate={onRetainerUpdate}
                parentProjectName={customer_name} // optional: for extra context in card
              />
            ))}
          </LogsGrid>
        )}
      </LogsContent>
    </LogsSection>
  );
};