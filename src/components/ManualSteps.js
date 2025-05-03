import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaCheckCircle, 
  FaRoute, 
  FaEdit, 
  FaCheck, 
  FaPaperPlane,
  FaArrowLeft,
  FaExclamationTriangle,
  FaCircle
} from 'react-icons/fa';

// Styled components with improved visual hierarchy
const PageContainer = styled.div`
  min-height: 100vh;
  background: whitesmoke;
  background-size: 400% 400%;
  animation: gradientFlow 15s ease infinite;
  padding: 1rem;
  display: flex;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const StepsContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 8rem 0 1rem; /* Increased top margin for mobile */

  @media (min-width: 640px) {
    max-width: 900px;
    margin: 5rem 0 3rem; /* Even larger top margin for desktop */
  }
`;

const HeaderGradient = styled.div`
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  padding: 1.5rem 1rem;
  color: white;
  position: relative;

  @media (min-width: 640px) {
    padding: 2rem 2rem;
  }
`;

const StepsHeader = styled.header`
  position: relative;
  z-index: 1;
`;

const StepsTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  svg {
    width: 24px;
    height: 24px;
    
    @media (min-width: 640px) {
      width: 28px;
      height: 28px;
    }
  }

  @media (min-width: 640px) {
    font-size: 2rem;
    gap: 1rem;
  }
  
`;

const StepsSubtitle = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 0;

  @media (min-width: 640px) {
    font-size: 1.05rem;
  }
`;

const StepsContent = styled.div`
  padding: 1.25rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const StepItem = styled.div`
  margin-bottom: 1.75rem;
  position: relative;
  padding-left: 3rem;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 1.45rem;
    top: 2.5rem;
    bottom: -1.75rem;
    width: 2px;
    background: #e2e8f0;
  }

  @media (min-width: 640px) {
    padding-left: 3.5rem;
    
    &:not(:last-child)::after {
      left: 1.7rem;
    }
  }
`;

const StepNumberContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const StepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);

  @media (min-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.1rem;
  }
`;

const StepMainContent = styled.div``;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;

  @media (min-width: 640px) {
    font-size: 1.2rem;
  }
`;

const StepDescription = styled.p`
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const StepSection = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.75rem 0;
  border-left: 3px solid #e2e8f0;
`;

const SectionTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const StepList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
`;

const StepListItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
  position: relative;
  padding-left: 1.75rem;
  list-style-type: none;

  &::before {
    content: none;
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    background: #2563eb;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  strong {
    font-weight: 600;
    color: #1e293b;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
    padding-left: 2rem;
    
    &::before {
      top: 0.55rem;
      width: 9px;
      height: 9px;
    }
  }
`;

const ListItemIcon = styled(FaCircle)`
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 8px;
  height: 8px;
  color: #2563eb;
  transform: translateY(-50%);

  @media (min-width: 640px) {
    width: 9px;
    height: 9px;
  }
`;

const ImportantNoteIcon = styled(FaExclamationTriangle)`
  flex-shrink: 0;
  color: #f97316;
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
`;

const BackButtonIcon = styled(FaArrowLeft)`
  width: 18px;
  height: 18px;
`;

const ImportantNote = styled.div`
  background: #fff7ed;
  border-radius: 6px;
  padding: 0.75rem;
  margin: 1rem 0;
  border-left: 3px solid #f97316;
  display: flex;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
    color: #f97316;
    margin-top: 0.2rem;
  }
`;

const NoteText = styled.p`
  font-size: 0.9rem;
  color: #713f12;
  margin: 0;
  line-height: 1.5;
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  color: #2563eb;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ProgressIndicator = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-weight: 600;
    color: #1e293b;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 1rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background: #f1f5f9;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9rem;
  color: #475569;
  vertical-align: top;

  strong {
    color: #1e293b;
  }

  ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }
`;


// Enhanced manual steps data with better organization
const manualStepsData = {
  "Apply Earned Leave": [
    {accesspath: 'Add Leave'},
    {
      title: "Navigate to Leave Application",
      description: "Follow this path to access the leave application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply leave'</strong> option"
          ]
        }
      ],
      notes: [
        `<strong>Login</strong> to the HR system to <strong>Add Earned Leave</strong> `,
        // "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Leave Application Details",
      description: "Complete all required fields in the application form with proper validations:",
      sections: [
        {
          title: "Leave Details Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Required Field</TableHeader>
                    <TableHeader>Field Type</TableHeader>
                    <TableHeader>Field Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell><strong>From date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        {/* <li>Cannot be in the past</li> */}
                        <li>Must be working day</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>To date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Cannot be earlier than From date</li>
                        <li>Must be working day</li>
                        {/* <li>Max 5 days without special approval</li> */}
                      </ul>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell><strong>Leave type</strong></TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must select from available types</li>
                        <li>Based on your earned balance</li>
                      </ul>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell><strong>Remarks</strong></TableCell>
                    <TableCell>Text area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Minimum 10 characters</li>
                        <li>Maximum 200 characters</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          )
        }
      ],
      notes: [
        "All fields marked with asterisk (*) are mandatory",
        "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Submit Your Application",
      description: "Final steps to complete your leave request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all entered information",
            "Click <strong>'Apply Leave'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'My leave details'</strong> page"
          ]
        }
      ],
      notes: [
        "You'll receive <strong>email notification</strong> once approved",
        "No document upload required for earned leave"
      ]
    }
  ],
  "Apply Half Day Leave": [
    {
      title: "Navigate to Leave Application",
      description: "Follow this path to access the leave application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply leave'</strong> option"
          ]
        }
      ],
      notes: [
        `<strong>Login</strong> to the HR system to <strong>Add Earned Leave</strong> `,
        // "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Leave Application Details",
      description: "Complete all required fields in the application form with proper validations:",
      sections: [
        {
          title: "Leave Details Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Required Field</TableHeader>
                    <TableHeader>Field Type</TableHeader>
                    <TableHeader>Field Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell><strong>From date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        {/* <li>Cannot be in the past</li> */}
                        <li>Must be working day</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>To date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Cannot be earlier than From date</li>
                        <li>Must be working day</li>
                        {/* <li>Max 5 days without special approval</li> */}
                      </ul>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell><strong>Leave type</strong></TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must select from available types</li>
                        <li>Based on your earned balance</li>
                      </ul>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell><strong>Remarks</strong></TableCell>
                    <TableCell>Text area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Minimum 10 characters</li>
                        <li>Maximum 200 characters</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          )
        }
      ],
      notes: [
        "All fields marked with asterisk (*) are mandatory",
        "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Submit Your Application",
      description: "Final steps to complete your leave request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all entered information",
            "Click <strong>'Apply Half Day Leave'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'My leave details'</strong> page"
          ]
        }
      ],
      notes: [
        "You'll receive <strong>email notification</strong> once approved",
        "No document upload required for earned leave"
      ]
    }
  ],
  "Apply LOP": [
    {
      title: "Navigate to Leave Application",
      description: "Follow this path to access the leave application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply leave'</strong> option"
          ]
        }
      ],
      notes: [
        `<strong>Login</strong> to the HR system to <strong>Add Earned Leave</strong> `,
        // "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Leave Application Details",
      description: "Complete all required fields in the application form with proper validations:",
      sections: [
        {
          title: "Leave Details Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Required Field</TableHeader>
                    <TableHeader>Field Type</TableHeader>
                    <TableHeader>Field Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell><strong>From date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        {/* <li>Cannot be in the past</li> */}
                        <li>Must be working day</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>To date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Cannot be earlier than From date</li>
                        <li>Must be working day</li>
                        {/* <li>Max 5 days without special approval</li> */}
                      </ul>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell><strong>Leave type</strong></TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must select from available types</li>
                        <li>Based on your earned balance</li>
                      </ul>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell><strong>Remarks</strong></TableCell>
                    <TableCell>Text area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Minimum 10 characters</li>
                        <li>Maximum 200 characters</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          )
        }
      ],
      notes: [
        "All fields marked with asterisk (*) are mandatory",
        "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Submit Your Application",
      description: "Final steps to complete your leave request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all entered information",
            "Click <strong>'Apply LOP'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'My leave details'</strong> page"
          ]
        }
      ],
      notes: [
        "You'll receive <strong>email notification</strong> once approved",
        "No document upload required for earned leave"
      ]
    }
  ],
  "Apply WFH": [
    {
      title: "Navigate to Leave Application",
      description: "Follow this path to access the leave application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply leave'</strong> option"
          ]
        }
      ],
      notes: [
        `<strong>Login</strong> to the HR system to <strong>Add Earned Leave</strong> `,
        // "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Leave Application Details",
      description: "Complete all required fields in the application form with proper validations:",
      sections: [
        {
          title: "Leave Details Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Required Field</TableHeader>
                    <TableHeader>Field Type</TableHeader>
                    <TableHeader>Field Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell><strong>From date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        {/* <li>Cannot be in the past</li> */}
                        <li>Must be working day</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>To date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Cannot be earlier than From date</li>
                        <li>Must be working day</li>
                        {/* <li>Max 5 days without special approval</li> */}
                      </ul>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell><strong>Leave type</strong></TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must select from available types</li>
                        <li>Based on your earned balance</li>
                      </ul>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell><strong>Remarks</strong></TableCell>
                    <TableCell>Text area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Minimum 10 characters</li>
                        <li>Maximum 200 characters</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          )
        }
      ],
      notes: [
        "All fields marked with asterisk (*) are mandatory",
        "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Submit Your Application",
      description: "Final steps to complete your leave request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all entered information",
            "Click <strong>'Apply Leave'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'My leave details'</strong> page"
          ]
        }
      ],
      notes: [
        "You'll receive <strong>email notification</strong> once approved",
        "No document upload required for earned leave"
      ]
    }
  ],
  "Submit New Claim": [
    {accesspath: 'Add Claim'},
    {
      title: "Navigate to Leave Application",
      description: "Follow this path to access the leave application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply leave'</strong> option"
          ]
        }
      ],
      notes: [
        `<strong>Login</strong> to the HR system to <strong>Add Earned Leave</strong> `,
        // "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Leave Application Details",
      description: "Complete all required fields in the application form with proper validations:",
      sections: [
        {
          title: "Leave Details Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Required Field</TableHeader>
                    <TableHeader>Field Type</TableHeader>
                    <TableHeader>Field Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell><strong>From date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        {/* <li>Cannot be in the past</li> */}
                        <li>Must be working day</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>To date</strong></TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Cannot be earlier than From date</li>
                        <li>Must be working day</li>
                        {/* <li>Max 5 days without special approval</li> */}
                      </ul>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell><strong>Leave type</strong></TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must select from available types</li>
                        <li>Based on your earned balance</li>
                      </ul>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell><strong>Remarks</strong></TableCell>
                    <TableCell>Text area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Minimum 10 characters</li>
                        <li>Maximum 200 characters</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          )
        }
      ],
      notes: [
        "All fields marked with asterisk (*) are mandatory",
        "System will validate your available leave balance automatically"
      ]
    },
    {
      title: "Submit Your Application",
      description: "Final steps to complete your leave request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all entered information",
            "Click <strong>'Apply Leave'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'My leave details'</strong> page"
          ]
        }
      ],
      notes: [
        "You'll receive <strong>email notification</strong> once approved",
        "No document upload required for earned leave"
      ]
    }
  ]
};


const ManualSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicParam = queryParams.get('topic');
    setTopic(topicParam || '');

    if (topicParam) {
      // Check if topic exists directly in manualStepsData
      if (manualStepsData[topicParam]) {
        // Filter out the accesspath object from steps
        const filteredSteps = manualStepsData[topicParam].filter(step => !step.accesspath);
        setSteps(filteredSteps);
        return;
      }

      // If not found directly, check by accesspath
      for (const [key, value] of Object.entries(manualStepsData)) {
        // Check if first item has matching accesspath
        if (value[0]?.accesspath === topicParam) {
          // Filter out the accesspath object from steps
          const filteredSteps = value.filter(step => !step.accesspath);
          setTopic(key); // Set the actual topic name
          setSteps(filteredSteps);
          return;
        }
      }
    }

    // If no matching topic or accesspath found, redirect
    navigate('/manual.html');
    setSteps([]);
  }, [location.search, navigate]);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <PageContainer>
      <StepsContainer>
        <HeaderGradient>
          <StepsHeader>
            <StepsTitle>
              <FaCheckCircle />
              {topic || 'Step-by-Step Guide'}
            </StepsTitle>
            <StepsSubtitle>
              Follow these instructions to {topic ? topic.toLowerCase() : 'complete the process'}
            </StepsSubtitle>
          </StepsHeader>
        </HeaderGradient>

        <StepsContent>
          {steps.length > 0 ? (
            steps.map((step, index) => (
              <StepItem key={index}>
                <StepNumberContainer>
                  <StepNumber>{index + 1}</StepNumber>
                </StepNumberContainer>
                <StepMainContent>
                  <StepTitle>{step.title}</StepTitle>
                  {step.description && <StepDescription>{step.description}</StepDescription>}
                  
                  {step.sections?.map((section, sectionIndex) => (
                    <StepSection key={sectionIndex}>
                      <SectionTitle>
                        {section.icon}
                        {section.title}
                      </SectionTitle>
                      {section.items ? (
                        <StepList>
                          {section.items.map((item, itemIndex) => (
                            <StepListItem key={itemIndex}>
                              <ListItemIcon />
                              <span dangerouslySetInnerHTML={{ __html: item }} />
                            </StepListItem>
                          ))}
                        </StepList>
                      ) : (
                        section.content
                      )}
                    </StepSection>
                  ))}

                  {step.notes?.map((note, noteIndex) => (
                    <ImportantNote key={noteIndex}>
                      <ImportantNoteIcon />
                      <NoteText dangerouslySetInnerHTML={{ __html: note }} />
                    </ImportantNote>
                  ))}
                </StepMainContent>
              </StepItem>
            ))
          ) : (
            <StepItem>
              <StepNumberContainer>
                <StepNumber>1</StepNumber>
              </StepNumberContainer>
              <StepMainContent>
                <StepTitle>No instructions available</StepTitle>
                <StepDescription>Please select a valid topic from the manual.</StepDescription>
              </StepMainContent>
            </StepItem>
          )}
        </StepsContent>

        <ActionBar>
          <BackButton onClick={handleBackClick}>
            <BackButtonIcon />
            Back to Manual
          </BackButton>
          <ProgressIndicator>
            Step <span>{steps.length > 0 ? 1 : 0}</span> to <span>{steps.length || 1}</span>
          </ProgressIndicator>
        </ActionBar>
      </StepsContainer>
    </PageContainer>
  );
};


export default ManualSteps;