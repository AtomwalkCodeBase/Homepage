import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FaMobileAlt, FaDesktop, FaServer } from 'react-icons/fa';

// Keep the HRM_DATA exactly as it was
const HRM_DATA = {
  'employee-accessibility': {
    role: 'Employee',
    access: {
      'HRM Lite Mobile App': {
        'Attendance': [
          'Check-In & Check-Out',
          'Manage & View Personal Timesheet'
        ],
        'Leave Management': [
          'Apply Leave',
          'Manage (View/Cancel) Personal Leave with Leave Dashboard'
        ],
        'Holiday Management': [
          'Track the Holiday',
          'Manage (Apply/Cancel/View) the Operational Holiday'
        ],
        'Shift Management': [
          'Track the personal shift',
          'Send a Shift change request'
        ],
        'Claims': [
          'View & Manage Personal Claims'
        ],
        'Help Desk': [
          'Add Personal Help & Request',
          'Resolve assigned Help'
        ],
        'Events': [
          'View & Comment on the Events (Company Events/Birthday Events/Anniversary Events/Promotion Events/Others)'
        ],
        // 'Appraisal': [
        //   'Initiate Personal Appraisal'
        // ]
      },
      'HR Web app': {
        'Attendance': [
          'Check-In & Check-Out',
          'Manage & View Personal Timesheet'
        ],
        'Leave Management': [
          'Apply Leave',
          'Manage (View/Cancel) Personal Leave with Leave Dashboard'
        ],
        'Holiday Management': [
          'Track the Holiday',
          'Manage (Apply/Cancel/View) the Operational Holiday'
        ],
        'Shift Management': [
          'Track the personal shift'
        ],
        'Claims': [
          'View & Manage Personal Claims'
        ],
        'Help Desk': [
          'Add Personal Help & Request',
          'Resolve assigned Help with access the knowledge base'
        ],
        'Payroll': [
          'View & Download Current Payslip & Payslip History'
        ],
        'Events': [
          'View & Comment on the Events (Company Events/Birthday Events/Anniversary Events/Promotion Events/Others)'
        ],
        // 'Appraisal': [
        //   'Initiate Personal Appraisal'
        // ]
      }
    }
  },
  'employee-manager-accessibility': {
    role: 'Employee Manager',
    access: {
      'HRM Lite Mobile App': {
        'Attendance': [
          'Check-In & Check-Out',
          'Manage & View Personal Timesheet'
        ],
        'Leave Management': [
          'Apply Leave',
          'Manage (View/Cancel) Personal Leave with Leave Dashboard',
          'Manage (Approve/Reject) Team Leave'
        ],
        'Holiday Management': [
          'Track the Holiday',
          'Manage (Apply/Cancel/View) the Operational Holiday'
        ],
        'Shift Management': [
          'Track the personal shift',
          'Send a Shift change request'
        ],
        'Claims': [
          'View & Manage Personal Claims',
          'Manage (Approve/Reject/Forward/Back to Claimant) Employees Claims'
        ],
        'Help Desk': [
          'Add Personal Help & Request',
          'Resolve assigned Help'
        ],
        // 'Appraisal': [
        //   'Initiate Personal Appraisal'
        // ],
        'Events': [
          'View & Comment on the Events (Company Events/Birthday Events/Anniversary Events/Promotion Events/Others)'
        ],
        'Training': [
          'Enroll & Track Personal Trainings'
        ]
      },
      'HR Web app': {
        'Attendance': [
          'Check-In & Check-Out',
          'Manage & View Personal Timesheet with Employees Timesheet Manage & Verify'
        ],
        'Leave Management': [
          'Apply Leave',
          'Manage (View/Cancel) Personal Leave with Leave Dashboard',
          'Manage (Approve/Reject) Team Leave'
        ],
        'Holiday Management': [
          'Track the Holiday',
          'Manage (Apply/Cancel/View) the Operational Holiday'
        ],
        'Shift Management': [
          'Track the personal shift',
          'View the other employees shift'
        ],
        'Claims': [
          'View & Manage Personal Claims',
          'Manage (Approve/Reject/Forward/Back to Claimant) Employees Claims'
        ],
        'Help Desk': [
          'Add Personal Help & Request',
          'Resolve assigned Help with access the knowledge base'
        ],
        'Payroll': [
          'View & Download Current Payslip & Payslip History'
        ],
        'Appraisal': [
          'Initiate Personal Appraisal'
        ],
        'Events': [
          'View & Comment on the Events (Company Events/Birthday Events/Anniversary Events/Promotion Events/Others)'
        ],
        'Training': [
          'Enroll & Track Personal Trainings'
        ]
      }
    }
  },
  'hr-manager-accessibility': {
    role: 'HR Manager',
    access: {
      'HRM Lite Mobile App': {
        'Attendance': [
          'Check-In & Check-Out',
          'Manage & View Personal Timesheet'
        ],
        'Leave Management': [
          'Apply Leave',
          'Manage (View/Cancel) Personal Leave with Leave Dashboard',
          'Manage (Approve/Reject) Team Leave'
        ],
        'Holiday Management': [
          'Track the Holiday',
          'Manage (Apply/Cancel/View) the Operational Holiday'
        ],
        'Shift Management': [
          'Track the personal shift',
          'Send a Shift change request'
        ],
        'Claims': [
          'View & Manage Personal Claims',
          'Manage (Approve/Reject/Forward/Back to Claimant) Employees Claims'
        ],
        'Help Desk': [
          'Add Personal Help & Request',
          'Resolve assigned Help'
        ],
        'Appraisal': [
          'Initiate Personal Appraisal'
        ],
        'Events': [
          'View & Comment on the Events (Company Events/Birthday Events/Anniversary Events/Promotion Events/Others)'
        ],
        'Training': [
          'Enroll & Track Personal Trainings'
        ]
      },
      'HR Web app': {
        'Attendance': [
          'Check-In & Check-Out',
          'Manage & View Personal Timesheet with Employees Timesheet Manage & Verify'
        ],
        'Leave Management': [
          'Apply Leave',
          'Manage (View/Cancel) Personal Leave with Leave Dashboard',
          'Manage (Approve/Reject) Team Leave'
        ],
        'Holiday Management': [
          'Track the Holiday',
          'Manage (Apply/Cancel/View) the Operational Holiday'
        ],
        'Shift Management': [
          'Track the personal shift',
          'View the other employees shift'
        ],
        'Claims': [
          'View & Manage Personal Claims',
          'Manage (Approve/Reject/Forward/Back to Claimant) Employees Claims'
        ],
        'Help Desk': [
          'Add Personal Help & Request',
          'Resolve assigned Help with access the knowledge base'
        ],
        'Payroll': [
          'View & Download Current Payslip & Payslip History'
        ],
        'Appraisal': [
          'Initiate Personal Appraisal'
        ],
        'Events': [
          'View & Comment on the Events (Company Events/Birthday Events/Anniversary Events/Promotion Events/Others)'
        ],
        'Training': [
          'Enroll & Track Personal Trainings'
        ]
      },
      'Atomwalk ERP': {
        'Attendance': [
          'Add & Manage Attendance',
          'Manage & View Personal Timesheet with Employees Timesheet Manage & Verify',
          'Weekly submit & approval of attendance'
        ],
        'Leave Management': [
          'Leave Setup',
          'Apply Leave',
          'Manage (View/Cancel) Personal Leave with Leave Dashboard',
          'Manage (Approve/Reject) Team Leave'
        ],
        'Holiday Management': [
          'Company Holiday Calendar Setup',
          'Track the Holiday',
          'Manage (Apply/Cancel/View) the Operational Holiday'
        ],
        'Shift Management': [
          'Shift Structure Setup',
          'Employee Shift Assignment',
          'Track the personal/employee shift'
        ],
        'Claims': [
          'Claim Setup (Expense Category & Expense Item Setup)',
          'View & Manage Personal Claims',
          'Manage (Approve/Reject/Forward/Back to Claimant, Settle) Employees Claims'
        ],
        'Help Desk': [
          'Help & Request Category & SLA Setup',
          'Add Personal Help & Request',
          'Resolve assigned Help with access the knowledge base'
        ],
        'Payroll': [
          'Payroll Setup',
          'Employee Payroll Manage',
          'Generate Salary'
        ],
        'Appraisal': [
          'Appraisal Structure Setup',
          'Initiate Personal Appraisal',
          'Review Appraisal'
        ],
        'Events': [
          'Event Setup/Creation',
          'Track & Manage the Events (Company Events/Birthday Events/Anniversary Events/Promotion Events/Others)'
        ],
        'Training': [
          'Manage Training Session',
          'Training Module & Trainer Setup',
          'Enroll & Track Personal Trainings'
        ],
        'System Setup': [
          'User Group & User Access Setup',
          'Numbering Setup',
          'Event Alert Setup',
          'Department & Grade Setup',
          'Holiday Calendar',
          'Policy Documents',
          'Claim Approval Limit',
          'Appraisal Structure',
          'Request Category',
          'Exit Process Setup',
          'Salary Structure',
          'PF Parameter',
          'Gratuity Parameter',
          'ESI Parameter',
          'Tax (TDS/PT) Setup',
          'Company Assets management'
        ]
      }
    }
  }
};


// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components with enhanced design
const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  margin-top: 70px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 992px) {
    margin-top: 80px;
  }

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 1.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 2px;
  }
`;

const RoleTitle = styled.h1`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

const RoleSubtitle = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: #7f8c8d;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AccessPlatformTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
  justify-content: center;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.75rem;
  background: ${props => props.active ? 'linear-gradient(135deg, #3498db, #2ecc71)' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: ${props => props.active ? '0 4px 15px rgba(52, 152, 219, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.active ? '0 6px 20px rgba(52, 152, 219, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AccessTableContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
  width: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden; /* Changed from overflow-x: auto */

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    overflow-x: auto; /* Only enable horizontal scroll on mobile */
  }
`;

const AccessTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  /* Remove min-width: 600px - this was forcing a wider table */
  
  @media (max-width: 768px) {
    min-width: 600px; /* Only apply minimum width on mobile */
  }
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1.25rem 1.5rem;
  text-align: left;
  font-weight: 600;
  
  &:first-child {
    border-top-left-radius: 16px;
  }
  
  &:last-child {
    border-top-right-radius: 16px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TableRow = styled.tr`
  transition: all 0.3s ease;
  
  &:nth-child(even) {
    background-color: #f8fafc;
  }
  
  &:hover {
    background-color: #f0f7ff;
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    background: white !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }
`;

const TableCell = styled.td`
  padding: 1.25rem 1.5rem;
  vertical-align: top;
  color: #2c3e50;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:before {
      content: attr(data-label);
      font-weight: bold;
      display: inline-block;
      width: 120px;
      color: #3498db;
      margin-right: 0.5rem;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const ModuleCategoryCell = styled(TableCell)`
  font-weight: 700;
  color: #3498db;
  width: 20%;
  position: relative;
  font-size: 1.05rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 4px;
    background: linear-gradient(to bottom, #3498db, #2ecc71);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.15rem;
    padding: 1.25rem 1.5rem;
    background-color: #f8fafc;
    border-bottom: 2px solid rgba(52, 152, 219, 0.2);

    &::before {
      display: none;
    }
  }
`;

const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
  color: #34495e;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: #2ecc71;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    padding-left: 1.25rem;
    margin-left: 0;
  }
`;

const PlatformIcon = {
  'HRM Lite Mobile App': <FaMobileAlt />,
  'HR Web app': <FaDesktop />,
  'Atomwalk ERP': <FaServer />
};

// const RoleIcon = {
//   'Employee': <FaUserTie />,
//   'Employee Manager': <FaUsersCog />,
//   'HR Manager': <FaUserShield />
// };


const HRMRoleBasedAccessibility = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('employee-accessibility')) {
      setData(HRM_DATA['employee-accessibility']);
      setActiveTab(Object.keys(HRM_DATA['employee-accessibility'].access)[0]);
    } else if (path.includes('employee-manager-accessibility')) {
      setData(HRM_DATA['employee-manager-accessibility']);
      setActiveTab(Object.keys(HRM_DATA['employee-manager-accessibility'].access)[0]);
    } else if (path.includes('hr-manager-accessibility')) {
      setData(HRM_DATA['hr-manager-accessibility']);
      setActiveTab(Object.keys(HRM_DATA['hr-manager-accessibility'].access)[0]);
    }
  }, [location.pathname]);

  if (!data) return null;

  const platforms = Object.keys(data.access);

  return (
    <Container>
      <Header>
        {/* <RoleIconWrapper>
          {RoleIcon[data.role]}
        </RoleIconWrapper> */}
        <RoleTitle>{data.role} Accessibility</RoleTitle>
        <RoleSubtitle>
          Explore the comprehensive access privileges and features available for {data.role.toLowerCase()} role across different platforms
        </RoleSubtitle>
      </Header>

      <AccessPlatformTabs>
        {platforms.map(platform => (
          <TabButton
            key={platform}
            active={activeTab === platform}
            onClick={() => setActiveTab(platform)}
          >
            {PlatformIcon[platform]}
            {platform}
          </TabButton>
        ))}
      </AccessPlatformTabs>

      <AccessTableContainer>
        <AccessTable>
          <TableHeader>
            <tr>
              <TableHeaderCell>Module Category</TableHeaderCell>
              <TableHeaderCell>Accessible Features</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {Object.entries(data.access[activeTab]).map(([category, features]) => (
              <TableRow key={category}>
                <ModuleCategoryCell data-label="Module Category">
                  {category}
                </ModuleCategoryCell>
                <TableCell data-label="Accessible Features">
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {features.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </AccessTable>
      </AccessTableContainer>
    </Container>
  );
};

export default HRMRoleBasedAccessibility;