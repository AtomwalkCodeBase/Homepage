import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

const PricingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #f9f9f9;

  th, td {
    padding: 16px;
    border: 1px solid #e0e0e0;
  }

  th {
    background-color: #f3e6f9;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  td {
    background-color: #f8e4fd;
    position: relative;
  }

  .expandable {
    cursor: pointer;
    user-select: none;
  }

  .expanded-section {
    display: ${props => props.expanded ? 'table-row' : 'none'};
  }
`;

const CheckMark = styled.span`
  color: green;
`;

const CrossMark = styled.span`
  color: red;
`;

const InfoText = styled.span`
  color: #333;
  font-size: 0.85rem;
`;

const ExpandIcon = styled.span`
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
`;

const StickyHeader = styled.th`
  background-color: #f3e6f9;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const PricingTableComponent = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpand = (rowIndex) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  };

  return (
    <TableContainer>
      <PricingTable expanded={expandedRow !== null}>
        <thead>
          <tr>
            <StickyHeader>Modules and Features</StickyHeader>
            <StickyHeader>Starter</StickyHeader>
            <StickyHeader>Essential</StickyHeader>
            <StickyHeader>Growth</StickyHeader>
            <StickyHeader>Enterprise</StickyHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="expandable" onClick={() => handleExpand(0)}>
              Payroll <ExpandIcon>{expandedRow === 0 ? '▲' : '▼'}</ExpandIcon>
            </td>
            <td><InfoText>Limited</InfoText></td>
            <td><CheckMark>✔</CheckMark></td>
            <td><CheckMark>✔</CheckMark></td>
            <td><CheckMark>✔</CheckMark></td>
          </tr>
          {expandedRow === 0 && (
            <tr className="expanded-section">
              <td colSpan="5">Detailed information about Payroll features...</td>
            </tr>
          )}

          <tr>
            <td className="expandable" onClick={() => handleExpand(1)}>
              Leave Management <ExpandIcon>{expandedRow === 1 ? '▲' : '▼'}</ExpandIcon>
            </td>
            <td><InfoText>Limited</InfoText></td>
            <td><CheckMark>✔</CheckMark></td>
            <td><CheckMark>✔</CheckMark></td>
            <td><CheckMark>✔</CheckMark></td>
          </tr>
          {expandedRow === 1 && (
            <tr className="expanded-section">
              <td colSpan="5">Detailed information about Leave Management...</td>
            </tr>
          )}

          <tr>
            <td className="expandable" onClick={() => handleExpand(2)}>
              Employee Workflows for Process Automation <ExpandIcon>{expandedRow === 2 ? '▲' : '▼'}</ExpandIcon>
            </td>
            <td><CrossMark>✘</CrossMark></td>
            <td><InfoText>Limited</InfoText></td>
            <td><CheckMark>✔</CheckMark></td>
            <td><CheckMark>✔</CheckMark></td>
          </tr>
          {expandedRow === 2 && (
            <tr className="expanded-section">
              <td colSpan="5">Detailed information about Employee Workflows...</td>
            </tr>
          )}

          {/* Continue for other rows similarly */}
        </tbody>
      </PricingTable>
    </TableContainer>
  );
};

export default PricingTableComponent;
