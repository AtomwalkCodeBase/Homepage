import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineStickyNote2 } from "react-icons/md";


import {
  FaCheckCircle,
  FaPlusCircle,
  FaCalendar,
  FaRoute,
  FaSync,
  FaBox,
  FaRegListAlt,
  FaFile,
  FaPalette,
  FaRegFileAlt,
  FaChartLine,
  FaTimesCircle,
  FaTools,
  FaEdit,
  FaCloudUploadAlt,
  FaCheck,
  FaSort,
  FaTrash,
  FaTable,
  FaTimes,
  FaListAlt,
  FaUserShield,
  FaUndo,
  FaCogs,
  FaBan,
  FaSearch,
  FaCalendarAlt,
  FaWpforms,
  FaCheckSquare,
  FaChartBar,
  FaUpload,
  FaDownload,
  FaFileUpload,
  FaPaperPlane,
  FaRegAddressBook,
  FaEye,
  FaRegEdit,
  FaArrowRight,
  FaFileAlt,
  FaBolt,
  FaChartPie,
  FaInfoCircle,
  FaUnlockAlt,
  FaKey,
  FaListUl,
  FaSignOutAlt,
  FaFileExport,
  FaList,
  FaFilter,
  FaTasks,
  FaTag,
  FaArrowLeft,
  FaExclamationTriangle,
  FaPlus,
  FaFileExcel,
  FaCircle,
} from "react-icons/fa";

// Styled components with improved visual hierarchy
const PageContainer = styled.div`
  min-height: 100vh;
  background: whitesmoke;
  background-size: 400% 400%;
  animation: gradientFlow 15s ease infinite;
  padding: 1rem;
  display: flex;
  justify-content: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
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
    content: "";
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

const manualStepsData = {
  "Dashboard Overview & Navigation": [
    { accesspath: "Main Menu / Back Buttons / Browser Back" },
    {
      title: "Accessing the HRMS Dashboard",
      description:
        "This section explains how to navigate the Atomwalk HRMS dashboard and view the general overview upon login:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Login to the <strong>Atomwalk HRMS</strong> Application",
            "Use the <strong>Left Sidebar Menu</strong> to access different modules",
            "Click on <strong>'Employee (HRMS)'</strong> > <strong>'Overview / Dashboard'</strong>",
            "Use the <strong>Search Bar</strong> to find specific modules or features",
            "Click the <strong>'GO'</strong> button to navigate directly",
          ],
        },
      ],
      notes: [
        "The Overview page provides a high-level system introduction and essential metrics.",
        "Modules displayed depend on the logged-in user's access level.",
      ],
    },
    {
      title: "Overview Dashboard Elements",
      description:
        "These are the main informational widgets and blocks shown on the Overview page:",
      sections: [
        {
          title: "Overview Components Table",
          icon: <FaInfoCircle />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Component</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Dashboard Summary</strong>
                    </TableCell>
                    <TableCell>Info Block</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Shows key HR metrics like total employees and
                          attendance
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Quick Links</strong>
                    </TableCell>
                    <TableCell>Shortcut Buttons</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Provides quick access to profile, leave, documents
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Notifications</strong>
                    </TableCell>
                    <TableCell>Alert Panel</TableCell>
                    <TableCell>
                      <ul>
                        <li>Shows system messages and HR announcements</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>User Info</strong>
                    </TableCell>
                    <TableCell>Top Header</TableCell>
                    <TableCell>
                      <ul>
                        <li>Displays user's name, role, and login info</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "This section is for <strong>view-only</strong> purposes.",
        "No data input or approval actions are required on the overview screen.",
      ],
    },
    {
      title: "Dashboard Navigation Elements",
      description:
        "Interact with navigation controls to move between modules and pages:",
      sections: [
        {
          title: "Navigation Elements Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Element</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation / Function</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Left Sidebar Menu</strong>
                    </TableCell>
                    <TableCell>Clickable Links</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Lists accessible modules like Employee, Payroll,
                          Leave, etc.
                        </li>
                        <li>Expands to show related sub-modules</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Search Bar</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      <ul>
                        <li>Requires text to activate 'GO' button</li>
                        <li>
                          Supports partial matches and is case-insensitive
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>'GO' Button</strong>
                    </TableCell>
                    <TableCell>Action Button</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Executes search and redirects to matched module/page
                        </li>
                        <li>Disabled if search input is empty</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Search results will auto-navigate to the selected module or section.",
        "Ensure your keywords are specific to avoid generic results.",
      ],
    },
    {
      title: "Module Switching & Exit Navigation",
      description:
        "Use available back buttons or menu to switch between pages or exit modules:",
      sections: [
        {
          title: "Return & Exit Options",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Main Menu'</strong> to return to dashboard",
            "Use <strong>'Back'</strong> buttons in modules for in-app return",
            "Use <strong>Browser Back</strong> for quick navigation (avoid browser refresh)",
          ],
        },
      ],
      notes: [
        "Most modules have built-in back buttons to maintain navigation flow.",
        "Using browser refresh inside a module may cause unsaved changes to be lost.",
      ],
    },
  ],

  "Accessing the Application": [
    { accesspath: "N/A (Before Login), Browser back (After Login)" },
    {
      title: "Login to Atomwalk HRMS",
      description:
        "This section guides users through the login process for the Atomwalk HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Open your <strong>web browser</strong>",
            "Go to <strong>https://myoffice.atomwalk.com/login/</strong>",
            "Enter your <strong>Username or Employee ID</strong>",
            "Enter your <strong>Password</strong>",
            "Click on the <strong>'Login'</strong> button",
          ],
        },
      ],
      notes: [
        "<strong>Accessing the Application</strong> requires a valid employee ID and password",
        "Ensure your credentials are provided by the HR or system administrator",
      ],
    },
    {
      title: "Login Field Details",
      description:
        "Ensure all fields are filled correctly before clicking the login button:",
      sections: [
        {
          title: "Login Form Validation Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Username / Employee ID</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Required field</li>
                        <li>Must match a valid employee record</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Password</strong>
                    </TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>
                      <ul>
                        <li>Required field</li>
                        <li>Minimum 6 characters</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Login Button</strong>
                    </TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>
                      <ul>
                        <li>Active only after both fields are filled</li>
                        <li>Validates entered credentials</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "If credentials are incorrect, an error message will appear",
        "Contact support for password resets or access issues",
      ],
    },
    {
    title: "Forgot or Reset Password",
    description:
      "If you have forgotten your password or wish to reset it, use the provided links below the login form.",
    sections: [
      {
        title: "Password Assistance Options",
        icon: <FaEdit />,
        items: [
          "<strong>Forgot Password?</strong> – Click to initiate the password recovery process via email or OTP verification.",
          "<strong>Reset Password</strong> – Redirects to a form where a new password can be set after identity verification."
        ]
      }
    ],
    notes: [
      "Ensure your registered email or mobile number is active to receive reset links or OTPs.",
      "Contact system administrator if reset links do not work or if credentials are locked."
    ]
  },
    {
      title: "Post-login Navigation",
      description:
        "After successful login, users are redirected to the dashboard or landing page:",
      sections: [
        {
          title: "Post-login Path",
          icon: <FaArrowRight />,
          items: [
            "Redirected to <strong>Dashboard</strong> upon successful login",
            "Use <strong>Left Sidebar Menu</strong> to access various HRMS modules",
          ],
        },
      ],
      notes: [
        "Once logged in, all Application features are available as per user role and permissions",
      ],
    },
  ],

  "Standard Reports": [
    { accesspath: "Browser Back / module 'Back' buttons" },
    {
      title: "View Standard HR Reports",
      description:
        "Displays summarized HR information across multiple views including attendance, leaves, scores, and appraisal status.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Navigate to <strong>'Employee (HRMS)'</strong> from the sidebar menu",
            "Choose one of the following based on the report you want to view:",
            "<ul><li><strong>'My Attendance'</strong> – Monthly calendar, daily logs</li><li><strong>'My Leave Details'</strong> – Month-wise leave chart</li><li><strong>'My Weekly Score'</strong> – Weekly score logs</li><li><strong>'My Appraisal'</strong> – Appraisal progress/status</li></ul>",
            "Use <strong>Month/Year</strong> selectors or click on specific calendar dates to view data",
          ],
        },
      ],
      notes: [
        "Each report is read-only except Weekly Score List which allows submission",
        "Module visibility depends on the user's role and permissions",
      ],
    },
    {
      title: "Report Viewing Controls",
      description:
        "Understand how to interact with filters and components to view detailed HR reports:",
      sections: [
        {
          title: "Report Control Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Control</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Functionality</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Month/Year Selector</strong>
                    </TableCell>
                    <TableCell>Date Picker / Navigation Buttons</TableCell>
                    <TableCell>
                      <ul>
                        <li>Used in Attendance, Leave, Score modules</li>
                        <li>Displays data as per selection</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Calendar View</strong>
                    </TableCell>
                    <TableCell>Interactive Calendar</TableCell>
                    <TableCell>
                      <ul>
                        <li>Click on a specific date to see details</li>
                        <li>Available in 'My Attendance'</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Submit Weekly Score</strong>
                    </TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>
                      <ul>
                        <li>Used to confirm weekly score entry</li>
                        <li>Only available in 'My Weekly Score'</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Output Fields</strong>
                    </TableCell>
                    <TableCell>Data Display</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Includes: Date, Status, Duration, Leave Type, Balance,
                          Score, Remarks
                        </li>
                        <li>Read-only fields for reports</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Output is based on selected month/year or clicked calendar date",
        "Submit button is enabled only on the Weekly Score screen",
      ],
    },
    {
      title: "Return and Exit Options",
      description: "Navigate back after viewing reports:",
      sections: [
        {
          title: "Exit Controls",
          icon: <FaArrowLeft />,
          items: [
            "Click on the <strong>'Back'</strong> button within the module to return",
            "Alternatively, use <strong>Browser Back</strong> to move to the previous screen",
          ],
        },
      ],
      notes: [
        "Avoid using refresh inside the reports screen to prevent data reload delays",
        "Data may auto-refresh after each new month selection",
      ],
    },
  ],
  "Custom Reports": [
    { accesspath: "Browser Back / module 'Back' buttons" },
    {
      title: "Generate Custom HR Reports",
      description:
        "Allows users to extract detailed and specific reports by applying filters across attendance, leave, and performance data.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Employee (HRMS)'</strong> via the sidebar menu",
            "Choose one of the following options:",
            "<ul><li><strong>'My Attendance'</strong> – For attendance reports by date and status</li><li><strong>'My Leave Details'</strong> – For filtered leave reports</li></ul>",
          ],
        },
      ],
      notes: [
        "Useful for generating specific employee insights",
        "Data can be exported in multiple formats",
      ],
    },
    {
      title: "Custom Report Filters",
      description: "Select from various filters to tailor your report output:",
      sections: [
        {
          title: "Filter Controls Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Control</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Start Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Cannot be empty</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>End Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Cannot be earlier than Start Date</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Status Filter</strong>
                    </TableCell>
                    <TableCell>Dropdown List</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Must select at least one status (Present, Leave,
                          Approved, Pending)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Leave Type</strong>
                    </TableCell>
                    <TableCell>Multi-select Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Optional filter (EL, LOP, Optional Holiday, WFH)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "At least one filter is required to generate a report",
        "Validation will prevent report generation if filters are incomplete",
      ],
    },
    {
      title: "Download & Export Options",
      description:
        "Once your report is generated, you can export it for offline use:",
      sections: [
        {
          title: "Export Actions",
          icon: <FaFileExport />,
          items: [
            "Click on <strong>'Generate Report'</strong> to display data",
            "Use the <strong>'Download XLS'</strong> or <strong>'Download PDF'</strong> button as needed",
            "Ensure filters are properly set to avoid empty reports",
          ],
        },
      ],
      notes: [
        "Reports can be regenerated with new filters without reloading the page",
        "PDF format is recommended for sharing or printing",
      ],
    },
  ],

  // Overview For CRM
"CRM Overview and Dashboard Navigation": [
  { accesspath: "Main Menu / Browser Back" },

  // Section: CRM Overview
  {
    title: "Navigate to Overview",
    description:
      "Follow this path to access the general dashboard and introduction section of Atomwalk CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Login to the <strong>Atomwalk CRM</strong> Application",
          "Use the <strong>Left Sidebar</strong>",
          "Click on <strong>'My Customer CRM'</strong>",
          "Access the <strong>'Overview / Dashboard'</strong> section"
        ]
      }
    ],
    notes: [
      "<strong>Overview</strong> provides high-level CRM system introduction and key customer metrics."
    ]
  },
  {
    title: "Overview Page Elements",
    description:
      "View important dashboard components and quick access widgets in the CRM module:",
    sections: [
      {
        title: "Overview Components Table",
        icon: <FaInfoCircle />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Component</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Customer Summary</strong></TableCell>
                  <TableCell>Info Block</TableCell>
                  <TableCell><ul><li>Displays total customers, leads, opportunities</li></ul></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Quick CRM Links</strong></TableCell>
                  <TableCell>Buttons</TableCell>
                  <TableCell><ul><li>Shortcut to Leads, Contacts, Activities</li></ul></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Notifications</strong></TableCell>
                  <TableCell>Info Panel</TableCell>
                  <TableCell><ul><li>Shows CRM-related updates or workflow alerts</li></ul></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>User Info</strong></TableCell>
                  <TableCell>Top Header</TableCell>
                  <TableCell><ul><li>Displays current user info and login role</li></ul></TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "CRM Overview is informational only – no data input required.",
      "Helpful for understanding key metrics and accessing modules quickly."
    ]
  },
  

  // Section: Dashboard Navigation
  {
    title: "Understanding Dashboard Metrics",
    description:
      "Learn about the key dashboard components and performance indicators shown in Atomwalk CRM:",
    sections: [
      {
        title: "Dashboard Metrics Table",
        icon: <FaChartPie />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Component</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Total Leads</strong></TableCell>
                  <TableCell>Info Box</TableCell>
                  <TableCell><ul><li>Displays the number of new and total leads</li></ul></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Follow-Ups Today</strong></TableCell>
                  <TableCell>Count Badge</TableCell>
                  <TableCell><ul><li>Shows due follow-ups scheduled for the current day</li></ul></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Client Conversion</strong></TableCell>
                  <TableCell>Pie Chart</TableCell>
                  <TableCell><ul><li>Visual of lead-to-client conversion ratio</li></ul></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Upcoming Tasks</strong></TableCell>
                  <TableCell>List View</TableCell>
                  <TableCell><ul><li>Displays assigned CRM tasks with due dates</li></ul></TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "Metrics are refreshed in real-time based on CRM activity.",
      "All widgets are view-only — no manual input is required."
    ]
  },
  {
    title: "Quick Actions",
    description:
      "Use shortcut links and buttons for immediate actions from the dashboard:",
    sections: [
      {
        title: "Common Dashboard Shortcuts",
        icon: <FaBolt />,
        items: [
          "Click <strong>'+ Add Lead'</strong> to initiate a new lead entry",
          "Use <strong>'Today's Follow-Ups'</strong> to view pending client actions",
          "Tap <strong>'My Tasks'</strong> to see assigned CRM tasks",
          "Access <strong>Top Menu</strong> icons for profile, notifications, and logout"
        ]
      }
    ],
    notes: [
      "Quick actions reduce navigation time and improve CRM productivity.",
      "All actions from dashboard are permission-controlled."
    ]
  },
  
],

  "Accessing Client Portal": [
    { accesspath: "Login Page / Browser Back" },
    {
      title: "Login Information",
      description:
        "Steps to log in to the Atomwalk CRM Client Portal securely using valid credentials: ",
      sections: [
        {
          title: "Login Process",
          icon: <FaKey />,
          items: [
            "Open browser and go to <strong>https://client.atomwalk.com</strong>",
            "Enter your <strong>registered Email ID</strong>",
            "Enter your <strong>Password</strong>",
            "Click the <strong>Login</strong> button",
          ],
        },
      ],
      notes: [
        "Ensure credentials are valid and case-sensitive",
        "Access is restricted to authorized clients only",
      ],
    },
    {
      title: "Reset Password",
      description:
        "Instructions to reset your password in case of a forgotten or expired login credential:",
      sections: [
        {
          title: "Password Reset Flow",
          icon: <FaUnlockAlt />,
          items: [
            "Click on <strong>'Forgot Password'</strong> link below the login form",
            "Enter your <strong>registered email</strong> and click <strong>'Submit'</strong>",
            "Check your email inbox for a reset link",
            "Follow the link to set a <strong>new password</strong> (must meet complexity requirements)",
          ],
        },
      ],
      notes: [
        "Reset link is valid for a limited time (typically 15–30 mins)",
        "Contact support if email is not received or link has expired",
      ],
    },
    {
      title: "Exit Portal or Retry Login",
      description:
        "How to return to the login screen or exit after a failed attempt or password reset:",
      sections: [
        {
          title: "Exit Options",
          icon: <FaSignOutAlt />,
          items: [
            "Use <strong>Browser Back</strong> to retry login",
            "Or close the browser tab to exit",
          ],
        },
      ],
      notes: [
        "Avoid multiple failed attempts to prevent account lock",
        "Clear browser cache if login page fails to load properly",
      ],
    },
  ],

  "Dashboard Navigation": [
    { accesspath: "Main Menu / Browser Back" },
    {
      title: "Understanding Metrics",
      description:
        "Learn about the key dashboard components and performance indicators shown in Atomwalk CRM:",
      sections: [
        {
          title: "Dashboard Metrics Table",
          icon: <FaChartPie />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Component</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Total Leads</strong>
                    </TableCell>
                    <TableCell>Info Box</TableCell>
                    <TableCell>
                      <ul>
                        <li>Displays the number of new and total leads</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Follow-Ups Today</strong>
                    </TableCell>
                    <TableCell>Count Badge</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Shows due follow-ups scheduled for the current day
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Client Conversion</strong>
                    </TableCell>
                    <TableCell>Pie Chart</TableCell>
                    <TableCell>
                      <ul>
                        <li>Visual of lead-to-client conversion ratio</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Upcoming Tasks</strong>
                    </TableCell>
                    <TableCell>List View</TableCell>
                    <TableCell>
                      <ul>
                        <li>Displays assigned CRM tasks with due dates</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Metrics are refreshed in real-time based on CRM activity",
        "All widgets are view-only — no manual input is required",
      ],
    },
    {
      title: "Quick Actions",
      description:
        "Use shortcut links and buttons for immediate actions from the dashboard:",
      sections: [
        {
          title: "Common Dashboard Shortcuts",
          icon: <FaBolt />,
          items: [
            "Click <strong>'+ Add Lead'</strong> to initiate a new lead entry",
            "Use <strong>'Today's Follow-Ups'</strong> to view pending client actions",
            "Tap <strong>'My Tasks'</strong> to see assigned CRM tasks",
            "Access <strong>Top Menu</strong> icons for profile, notifications, and logout",
          ],
        },
      ],
      notes: [
        "Quick actions reduce navigation time and improve CRM productivity",
        "All actions from dashboard are permission-controlled",
      ],
    },
    {
      title: "Exit Dashboard",
      description:
        "Navigate away from the dashboard or return after exploring other modules:",
      sections: [
        {
          title: "Exit Options",
          icon: <FaSignOutAlt />,
          items: [
            "Use <strong>Main Menu</strong> to access other CRM modules",
            "Click <strong>Browser Back</strong> or browser tab controls",
          ],
        },
      ],
      notes: [
        "CRM saves your last visited section for continuity on next login",
      ],
    },
  ],

  // Employee Guide
  "Edit Profile": [
    { accesspath: "Profile" },
    {
      title: "Navigate to Profile",
      description: "Access the profile management section to Edit profile:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Login'</strong>",
            "Click on <strong>'Profile'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the system is required to add or manage user profiles.",
      ],
    },
    {
      title: "User Profile Input Fields",
      description:
        "Fill in the necessary user information for profile creation:",
      sections: [
        {
          title: "User Profile Form Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Email Address</TableCell>
                    <TableCell>Text (email)</TableCell>
                    <TableCell>Must contain @ and .com</TableCell>
                    <TableCell>
                      <strong>Required</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Letters, digits, and @/./+/-/_ only</TableCell>
                    <TableCell>
                      <strong>Required</strong> (Max 100 characters)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User Nick Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Alternate login option</TableCell>
                    <TableCell>Optional (Min 10 characters)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Enter valid mobile number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Profile Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Upload user image</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Email address</strong> and <strong>User name</strong> are <strong>mandatory fields</strong>.",
      ],
    },
  ],
  "Change Password": [
    { accesspath: "Change Password" },
    {
      title: "Navigate to Change Password",
      description:
        "Use this path to access the change password form in your profile settings:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Login'</strong>",
            "Select <strong>'Profile'</strong>",
            "Click on <strong>'Change Password'</strong>",
          ],
        },
      ],
      notes: [
        "Make sure you are <strong>logged in</strong> to access password settings.",
      ],
    },
    {
      title: "Change Password Fields",
      description:
        "Fill out the form carefully to update your account password:",
      sections: [
        {
          title: "Password Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Old Password</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Enter your current password</TableCell>
                    <TableCell>
                      <strong>Required</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>New Password</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Must be at least 8 characters</TableCell>
                    <TableCell>
                      <ul>
                        <li>Not a commonly used password</li>
                        <li>Not entirely numeric</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Confirm New Password</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Re-enter your new password</TableCell>
                    <TableCell>
                      <strong>Required</strong> – must match new password
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Your <strong>new password</strong> must meet all listed criteria.",
        "Ensure both password fields match before submitting.",
      ],
    },
    {
      title: "Submit Password Change",
      description: "Finalize your password update by submitting the form:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all password fields",
            "Click the <strong>'Save'</strong> button",
          ],
        },
      ],
      notes: [
        "You will be prompted to log in again after a successful password change for security reasons.",
      ],
    },
  ],

  // Attendance
  "Add Attendance": [
    { accesspath: "Add Attendance" },
    {
      title: "Navigate to Attendance Form",
      description: "Follow this path to access the attendance submission form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My Attendance'</strong>",
            "Choose <strong>'Add Attendance'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to <strong>Add Attendance</strong>",
      ],
    },
    {
      title: "Attendance Entry Details",
      description:
        "Complete all required fields in the attendance form with proper validations:",
      sections: [
        {
          title: "Attendance Details Table",
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
                    <TableCell>
                      <strong>Check-In Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Start Time</strong>
                    </TableCell>
                    <TableCell>Time Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Check-Out Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>End Time</strong>
                    </TableCell>
                    <TableCell>Time Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                        <li>Include summary of tasks and accomplishments</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["Ensure accurate time and task information is entered"],
    },
    {
      title: "Submit Your Attendance",
      description: "Final steps to complete your attendance entry:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all attendance details entered",
            "Click <strong>'Submit Attendance'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You will be redirected to <strong>'My Attendance'</strong> page",
          ],
        },
      ],
      notes: [
        "No document upload required for attendance",
        "Once submitted, entries may be locked for editing",
      ],
    },
  ],

  "Weekly Attendance": [
    { accesspath: "Submit Weekly Attendance" },
    {
      title: "Navigate to Weekly Attendance Submission",
      description: "Follow this path to submit your weekly attendance summary:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My Attendance'</strong>",
            "Navigate to <strong>'Monthly Calendar'</strong>",
            "Choose <strong>'Submit'</strong> option for the relevant week",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to <strong>Submit Weekly Attendance</strong>",
      ],
    },
    {
      title: "Weekly Attendance Entry Details",
      description:
        "Fill in your weekly work summary and timings. Submission includes the following fields:",
      sections: [
        {
          title: "Weekly Attendance Details Table",
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
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must be within selected week</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Attendance Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select from options like Present, Remote, etc.</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Start - End Time</strong>
                    </TableCell>
                    <TableCell>Time Range Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional but recommended for accurate duration</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Duration (Hours)</strong>
                    </TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>
                      <ul>
                        <li>Calculated or manually entered</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Action</strong>
                    </TableCell>
                    <TableCell>Button (Add/Update)</TableCell>
                    <TableCell>
                      <ul>
                        <li>Choose action based on existing records</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Summary of weekly accomplishments</li>
                        <li>Minimum 10 characters recommended</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["Weekly attendance helps track consolidated effort"],
    },
    {
      title: "Submit Weekly Attendance",
      description: "Finalize and submit your weekly report:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all weekly data entries",
            "Click <strong>'Submit'</strong> button at the end of the calendar week",
            "Await <strong>confirmation message</strong>",
            "Attendance will be reflected in <strong>'My Attendance'</strong> calendar view",
          ],
        },
      ],
      notes: [
        "Uploaded weekly reports may be reviewed by HR/Admin",
        "Submission allowed only after the week ends",
        "<strong>Download</strong> options for <strong>XLS/PDF</strong> format are available for record keeping",
      ],
    },
  ],

  "Employee Attendance Record (Upload Attendance)": [
    { accesspath: "Upload Attendance" },
    {
      title: "Navigate to Upload Attendance",
      description:
        "Follow this path to access the upload form for attendance records:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Attendance Records'</strong>",
            "Choose <strong>'Upload Attendance'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to <strong>Upload Employee Attendance</strong>",
      ],
    },
    {
      title: "Upload Attendance Details",
      description:
        "Complete the required fields and upload the attendance files with proper validations:",
      sections: [
        {
          title: "Attendance Details Table",
          icon: <FaUpload />,
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
                    <TableCell>
                      <strong>Upload EmployeeAttendance Data</strong>
                    </TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>
                      <ul>
                        <li>Only .csv files are allowed</li>
                        <li>Must be in the required format</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Upload Attendance Day Activity Data</strong>
                    </TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>
                      <ul>
                        <li>Only .csv files are allowed</li>
                        <li>Must be in the required format</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Ignore duplicate records for upload</strong>
                    </TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional checkbox</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Operation Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Choose from available operation types</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Upload ( EmployeeAttendance Data ) and Operation Type are mandatory fields",
      ],
    },
    {
      title: "Submit Your Upload",
      description: "Final steps to complete your attendance data upload:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all entered information",
            "Click <strong>'Upload Attendance'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'Attendance Records'</strong> page",
          ],
        },
      ],
      notes: ["Only .csv files are allowed for both uploads"],
    },
  ],

  "Schema Detail for Employee Attendance": [
    { accesspath: "View Schema" },
    {
      title: "Navigate to Attendance Schema View",
      description:
        "Follow this path to view the schema details for employee attendance:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Manager (HRMS)'</strong> or <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Attendance Records'</strong>",
            "Choose <strong>'Upload Attendance'</strong>",
            "Click on <strong>'View Schema'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to <strong>View Schema for Employee Attendance Upload</strong>",
      ],
    },
    {
      title: "Schema Details (Read-Only)",
      description:
        "Understand the structure and validation rules for uploading Employee Attendance and Attendance Day Activity files:",
      sections: [
        {
          title: "Schema Details Table",
          icon: <FaFileAlt />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Data Type</TableHeader>
                    <TableHeader>Unique</TableHeader>
                    <TableHeader>Mandatory</TableHeader>
                    <TableHeader>Max. Length</TableHeader>
                    <TableHeader>Default Value</TableHeader>
                    <TableHeader>Dependent</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {/* Example rows - Replace with actual schema data */}
                  <TableRow>
                    <TableCell>EmployeeID</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],

      notes: [
        "This is a <strong>read-only</strong> view.",
        "Ensure that your upload files follow this structure to avoid errors.",
        "You can also <strong>download this schema</strong> in <strong>XLS/PDF</strong> format.",
        "<strong>You can go back</strong> to <strong>'Upload Employee Attendance'</strong> anytime from the schema view.",
      ],
    },
  ],

  "Attendance Dashboard": [
    { accesspath: "My Attendance" },
    {
      title: "Navigate to Attendance Dashboard",
      description:
        "Follow this path to access your attendance dashboard and view records:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'General'</strong> option",
            "Click on <strong>'Employee (HRMS)'</strong>",
            "Choose <strong>'My Attendance'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HRMS to access your attendance dashboard and view monthly records.",
      ],
    },
    {
      title: "Dashboard Features & Visualization",
      description:
        "You can view various components and interact with the calendar, charts, and summary:",
      sections: [
        {
          title: "Attendance Features List",
          icon: <FaChartPie />,
          items: [
            "Previous Month / Next Month: Navigate across months",
            "Monthly Calendar: Displays attendance day-wise",
            "Add Attendance: Mark your attendance manually",
            "Submit Weekly Attendance: Submit filled attendance for the week",
            "On Time Status (Pie Chart): Shows attendance punctuality",
            "Weekly Total Duration (Bar Graph): Weekly working hour summary",
            "Mobile Check-in Status: Indicates mobile-based check-ins",
          ],
        },
      ],
      notes: [
        "Attendance statuses: <strong>N</strong> - Not Submitted, <strong>H</strong> - Weekly Holiday, <strong>C</strong> - Company Holiday, <strong>P</strong> - Present, <strong>L</strong> - On Leave",
        "Most fields are view-only. Only permitted roles may enter or modify data.",
      ],
    },
    {
      title: "Submission Guidelines",
      description:
        "Instructions to ensure proper weekly attendance submission:",
      sections: [
        {
          title: "Submit Attendance",
          icon: <FaPaperPlane />,
          items: [
            "Fill in daily records via <strong>Add Attendance</strong>",
            "Click on <strong>'Submit Weekly Attendance'</strong>",
            "A confirmation message will be shown once submitted",
            "After submission, data becomes read-only for that week",
          ],
        },
      ],
      notes: [
        // "No upload or download options are available from this screen",
        "Once submitted, entries cannot be edited unless reopened by HR/Admin",
        "Use <strong>Add Attendance</strong> for each unmarked day before submitting.",
      ],
    },
  ],

  "Apply Leave": [
    { accesspath: "Apply leave" },
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
            "Choose <strong>'Apply leave'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HRMS portal to <strong>apply for leave</strong>",
      ],
    },
    {
      title: "Leave Application Details",
      description:
        "Fill all necessary leave fields and ensure date logic is valid:",
      sections: [
        {
          title: "Leave Fields Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Field Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>From Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Select starting date of leave</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>To Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Select ending date of leave</TableCell>
                    <TableCell>Cannot be before From Date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>Reason for leave (10–200 characters)</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields are <strong>mandatory</strong>",
        "Date selection logic will be validated before submission",
      ],
    },
    {
      title: "Submit Leave Request",
      description: "Steps to finalize and send your leave application:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Verify</strong> that all fields are correctly filled",
            "Click on <strong>'Submit'</strong> to send leave request",
            "A <strong>confirmation</strong> will appear once successfully submitted",
            "You will be redirected to <strong>'My leave details'</strong> section",
          ],
        },
      ],
      notes: [
        "No file upload or supporting documents required at this step",
        "Leave application cannot be modified after submission",
        "You can also go back to your Leave Details section/page",
      ],
    },
  ],

  "Apply Half Day Leave": [
    { accesspath: "Apply Half Day Leave" },
    {
      title: "Navigate to Half Day Leave Application",
      description:
        "Follow this path to access the half-day leave application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply Half Day Leave'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to <strong>apply for Half Day Leave</strong>",
      ],
    },
    {
      title: "Half Day Leave Application Fields",
      description: "Enter all mandatory leave details as per form requirement:",
      sections: [
        {
          title: "Leave Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>From Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Select starting date of leave</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>To Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      Select ending date of leave (must be the same day as From
                      Date)
                    </TableCell>
                    <TableCell>Cannot be before From Date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>Reason for leave</TableCell>
                    <TableCell>Required (10–200 characters)</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields are <strong>mandatory</strong>",
        "System will validate date logic before submission",
      ],
    },
    {
      title: "Submit Your Half Day Leave",
      description: "Final steps to complete your leave request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all leave details entered",
            "Click <strong>'Submit Half Day Leave'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'My leave details'</strong> page",
          ],
        },
      ],
      notes: [
        // "Once submitted, you'll receive an <strong>email notification</strong> once approved",
        "No document upload required for Half Day leave",
        // "You can also go back to your Leave Details section/page"
      ],
    },
    {
      title: "Back to Leave Details",
      description:
        "Navigate back to your leave dashboard to view or manage requests:",
      sections: [
        {
          title: "Back Navigation Path",
          icon: <FaArrowLeft />,
          items: [
            "Click on the <strong>'Back'</strong> button at the top of the page",
            "You will be redirected to <strong>'My leave details'</strong> section",
          ],
        },
      ],
      notes: [
        "Use this path to <strong>review previous applications</strong> or <strong>cancel the current request</strong>.",
      ],
    },
  ],

  "Apply WFH": [
    { accesspath: "Apply WFH" },
    {
      title: "Navigate to WFH Application",
      description:
        "Follow this path to access the Work From Home application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply WFH'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to <strong>apply for Work From Home</strong>",
      ],
    },
    {
      title: "WFH Application Fields",
      description: "Enter all mandatory WFH details as per form requirement:",
      sections: [
        {
          title: "WFH Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>From Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Select starting date of WFH</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>To Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      Select ending date of WFH (must be the same day as From
                      Date)
                    </TableCell>
                    <TableCell>Cannot be before From Date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>Reason for WFH</TableCell>
                    <TableCell>Required (10–200 characters)</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields are <strong>mandatory</strong>",
        "System will validate date logic before submission",
      ],
    },
    {
      title: "Submit Your WFH Request",
      description: "Final steps to complete your WFH request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all WFH details entered",
            "Click <strong>'Submit WFH'</strong> button",
            "Wait for <strong>confirmation message</strong>",
            "You'll be redirected to <strong>'My leave details'</strong> page",
          ],
        },
      ],
      notes: [
        "Once submitted, you'll receive an <strong>email notification</strong> once approved",
        "No document upload required for WFH",
      ],
    },
    {
      title: "Back to Leave Details",
      description:
        "Navigate back to your leave dashboard to view or manage requests:",
      sections: [
        {
          title: "Back Navigation Path",
          icon: <FaArrowLeft />,
          items: [
            "Click on the <strong>'Back'</strong> button at the top of the page",
            "You will be redirected to <strong>'My leave details'</strong> section",
          ],
        },
      ],
      notes: [
        "Use this path to <strong>review previous applications</strong> or <strong>cancel the current request</strong>.",
      ],
    },
  ],

  "Apply LOP": [
    { accesspath: "Apply LOP" },
    {
      title: "Navigate to LOP Application",
      description:
        "Follow this path to access the Loss of Pay leave application form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My leave details'</strong>",
            "Choose <strong>'Apply LOP'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to <strong>Apply for Loss of Pay leave</strong>",
      ],
    },
    {
      title: "LOP Application Fields",
      description: "Enter the required leave details accurately:",
      sections: [
        {
          title: "LOP Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>From Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Select the starting date of LOP</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>To Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Select the ending date of LOP</TableCell>
                    <TableCell>Cannot be before From Date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>Reason for Loss of Pay</TableCell>
                    <TableCell>Required (10–200 characters)</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields are <strong>mandatory</strong>",
        "Make sure date logic is valid before submitting",
      ],
    },
    {
      title: "Submit Your LOP Application",
      description: "Final steps to complete your LOP leave request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all LOP details entered",
            "Click on the <strong>'Submit LOP'</strong> button",
            "Wait for a <strong>confirmation message</strong>",
            "You’ll be redirected to <strong>'My leave details'</strong>",
          ],
        },
      ],
      notes: [
        "No document upload required for LOP leave",
        "Ensure remarks justify the need for unpaid leave",
      ],
    },
    {
      title: "Back to Leave Details",
      description: "Return to your leave dashboard to manage or view requests:",
      sections: [
        {
          title: "Back Navigation Path",
          icon: <FaArrowLeft />,
          items: [
            "Click the <strong>'Back'</strong> button",
            "System redirects to <strong>'My leave details'</strong> section",
          ],
        },
      ],
      notes: [
        "Use this to review existing leave status or modify other requests",
      ],
    },
  ],

  "Employee Approve Leave": [
    { accesspath: "Approve Leave" },
    {
      title: "Navigate to Leave Approval Panel",
      description:
        "Follow this path to access the manager-level leave approval section:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Approve Leave'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> as a manager to access and manage employee leave requests",
      ],
    },
    {
      title: "Leave Approval Filters & Controls",
      description:
        "Use these fields to filter and view leave requests submitted by employees:",
      sections: [
        {
          title: "Approval Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>All Employees</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select an employee to review their leaves
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Leave Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select leave type (e.g. Sick, Casual, LOP)
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Search filtered leave records</TableCell>
                    <TableCell>Valid only when selections made</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Clear</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Reset the filters</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Previous Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>View prior year leave data</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Next Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>View upcoming year leave projections</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "You <strong>cannot manually enter</strong> Employee names or Leave Types — use dropdowns",
        "Only managers can access and approve/reject employee leave requests",
      ],
    },
  ],

  "Yearly Leave Data": [
    { accesspath: "Yearly Leave Data" },
    {
      title: "Navigate to Yearly Leave Data",
      description:
        "Follow this path to access the yearly leave data for employees:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Yearly Leave Data'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> as a manager to view and analyze the yearly leave data of employees",
      ],
    },
    {
      title: "Leave Data Filters & Controls",
      description: "Use these fields to filter and view employee leave data:",
      sections: [
        {
          title: "Data Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select an employee to view their yearly leave
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select the year for which you want to view leave data
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Order By</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select sorting order (Ascending/Descending)
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Record Created</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select record creation date filter</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select department for filtering</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Show Entries</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select number of entries to display</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Search based on selected filters</TableCell>
                    <TableCell>Valid only when selections made</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Clear</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Reset the filters</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "You <strong>cannot manually enter</strong> Employee names, Year, or other filtering options — use dropdowns",
        "Managers can view yearly leave data across employees and departments",
      ],
    },
  ],

  // My Weekly Score
  "My Weekly Score": [
    { accesspath: "Weekly Score Data" },
    {
      title: "Navigate to Weekly Score Data",
      description:
        "Follow this path to access the weekly performance score data:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Weekly Score Data'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> as a manager to view and analyze the weekly performance scores of employees",
      ],
    },
    {
      title: "Weekly Score Filters & Controls",
      description:
        "Use these fields to filter and view weekly performance data:",
      sections: [
        {
          title: "Data Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select an employee to view their weekly score
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select a department for filtering the employees
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Grade</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select a grade for filtering</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Performance Rating</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select a performance rating to filter by
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Performance Score Distribution</TableCell>
                    <TableCell>Pie Chart</TableCell>
                    <TableCell>
                      Shows distribution of performance scores
                    </TableCell>
                    <TableCell>Auto-generated from data</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weekly Performance Score</TableCell>
                    <TableCell>Bar Graph</TableCell>
                    <TableCell>Visualizes weekly performance scores</TableCell>
                    <TableCell>Auto-generated from data</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Search based on selected filters</TableCell>
                    <TableCell>Valid only when selections made</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Clear</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Reset all filter selections</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "You <strong>cannot manually enter</strong> Employee Name, Department, Grade, or Performance Rating — use dropdowns for all selections",
        "Managers can analyze the weekly performance data through visual graphs and score distributions",
      ],
    },
    {
      title: "Export Weekly Score Data",
      description: "You can export the weekly score data for analysis:",
      sections: [
        {
          title: "Export Process",
          icon: <FaDownload />,
          items: [
            "Click on <strong>'Export to Excel'</strong> button to download weekly score data",
            "The export will include employee names, departments, grades, performance ratings, and scores",
          ],
        },
      ],
      notes: [
        "Export functionality supports downloading the weekly score data in Excel format",
        "No other download options (PDF, etc.) available for this module",
      ],
    },
  ],

  "Employee Weekly Score List Dashboard": [
    { accesspath: "Employee Weekly Score List Dashboard" },
    {
      title: "Navigate to Employee Weekly Score List Dashboard",
      description:
        "Follow this path to access the employee weekly score dashboard:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Employee (HRMS)'</strong>",
            "Click on <strong>'My Weekly Score'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to view the employee's weekly performance scores",
      ],
    },
    {
      title: "Weekly Score Dashboard Details",
      description:
        "Dashboard provides a visual representation of employee weekly scores and performance:",
      sections: [
        {
          title: "Dashboard Details",
          icon: <FaChartBar />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Previous Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Navigate to previous year's data</TableCell>
                    <TableCell>Read-only</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Next Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Navigate to next year's data</TableCell>
                    <TableCell>Read-only</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Performance Score Distribution</TableCell>
                    <TableCell>Pie Chart</TableCell>
                    <TableCell>
                      Shows performance score distribution across employees
                    </TableCell>
                    <TableCell>Auto-generated from data</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weekly Performance Score</TableCell>
                    <TableCell>Bar Graph</TableCell>
                    <TableCell>
                      Shows weekly performance scores of employees
                    </TableCell>
                    <TableCell>Auto-generated from data</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Clear</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Resets any applied filters</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "You can only <strong>view</strong> the data; no manual data entry allowed",
        "Performance score data is presented via pie chart (distribution) and bar graph (weekly scores)",
      ],
    },
    // {
    //   title: "Back Navigation",
    //   description: "To go back to the main screen, follow the steps below:",
    //   sections: [
    //     {
    //       title: "Navigation Path",
    //       icon: <FaArrowLeft />,
    //       items: [
    //         "Click on the <strong>'Back'</strong> button or navigate to <strong>'My Weekly Score'</strong>",
    //       ],
    //     },
    //   ],
    //   notes: [
    //     "Back navigation allows you to return to the <strong>'My Weekly Score'</strong> dashboard without loss of data",
    //   ],
    // },
  ],

  // MY APPRAISAL
  "Appraisal List(INIT Appraisal)": [
    { accesspath: "Appraisal List (INIT Appraisal)" },
    {
      title: "Navigate to Appraisal List",
      description:
        "Follow this path to access the INIT Appraisal entry module:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Click on <strong>'Manager (HRMS)'</strong>",
            "Choose <strong>'Appraisal List'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> as an HR manager or authorized user to access appraisal records",
      ],
    },
    {
      title: "Appraisal Filter & Input Controls",
      description:
        "Use the dropdowns and controls below to view or enter employee appraisals:",
      sections: [
        {
          title: "Appraisal Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>All Employees</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select an employee to view or enter appraisal
                    </TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Grades</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Filter by employee grade</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Select a Department</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Filter by department</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Appraisers</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Filter by appraiser</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Search appraisal records</TableCell>
                    <TableCell>Valid when filters are selected</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Clear</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Reset all filter fields</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Previous Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Navigate to previous year’s data</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Next Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Navigate to upcoming year’s data</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Manual entry is not allowed</strong> for All Employees, All Grades, and Department fields",
        "Use dropdowns for controlled filtering and accuracy",
      ],
    },
    {
      title: "Submit the Appraisal Data",
      description:
        "After filtering, fill in and submit employee appraisal information:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Verify</strong> the filters and appraisal data entered",
            "Click on the <strong>'Submit'</strong> button to save records",
          ],
        },
      ],
      notes: [
        "Only users with appropriate privileges can submit appraisals",
        "Ensure completeness and accuracy before submission",
      ],
    },
  ],

  "Appraisal for reviews": [
    { accesspath: "Appraisal Lists" },
    {
      title: "Navigate to Appraisal for Reviews",
      description:
        "Access the page to review and enter employee appraisals within HRMS:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Click on <strong>'Manager (HRMS)'</strong>",
            "Choose <strong>'Appraisal for reviews'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> with appropriate credentials to access appraisal reviews",
      ],
    },
    {
      title: "Appraisal Review Filters",
      description:
        "Use the filter controls below to view employee appraisal records:",
      sections: [
        {
          title: "Filter & Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>All Employees</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select an employee to review</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Grades</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Filter by employee grade</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Select a Department</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Filter by department</TableCell>
                    <TableCell>Manual entry not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Appraiser</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select appraiser</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Search records</TableCell>
                    <TableCell>Valid when filters selected</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Clear</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Reset all filters</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Previous Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Navigate to past appraisal records</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Next Year</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>View future appraisal cycle</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "You <strong>cannot manually enter</strong> values for All Employees, All Grades, and Department fields",
      ],
    },
    {
      title: "Return to Manager Dashboard",
      description: "Go back to your HRMS dashboard for additional actions:",
      sections: [
        {
          title: "Back Navigation Path",
          icon: <FaArrowLeft />,
          items: [
            "Click the <strong>'Back'</strong> button",
            "Return to <strong>'Manager (HRMS)'</strong> dashboard",
          ],
        },
      ],
      notes: [
        "No data entry is required on this screen unless reviewing or filtering",
      ],
    },
  ],

  // MANAGER GUIDE = Setup(Department)
  "Department Setup": [
    { accesspath: "Setup(Department)" },
    {
      title: "Navigate to Department Setup",
      description:
        "Follow this path to manage and view department configuration:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Open <strong>'Setup'</strong>",
            "Click on <strong>'Department'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with setup access can <strong>view or manage departments</strong>.",
        "This screen is <strong>view-only</strong>",
      ],
    },
    {
      title: "Return to Navigation",
      description: "To return to the setup menu or main dashboard:",
      sections: [
        {
          title: "Back Navigation",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> or navigate to <strong>'Setup'</strong> again from the side menu.",
          ],
        },
      ],
      notes: [
        "Department changes will reflect across modules using department data.",
      ],
    },
    {
      title: "Download Department List",
      description: "Export department records for reporting or offline use:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click on the <strong>'Download'</strong> button in the Department Setup screen",
            "Choose from <strong>Excel</strong> or <strong>PDF</strong> format",
            "Any active filters (e.g., department name or status) will be applied to the downloaded data",
          ],
        },
      ],
      notes: [
        "Downloaded files are useful for sharing or auditing.",
        "Ensure appropriate filters are applied before exporting.",
      ],
    },
  ],

  "Add Department": [
    { accesspath: "Add Department" },
    {
      title: "Navigate to Add Department Form",
      description:
        "Follow the path to create and add a new department in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Department'</strong>",
            "Click on <strong>'Add Department'</strong>",
          ],
        },
      ],
      notes: [
        "Only <strong>authorized users</strong> can access the add department form.",
        "Ensure you have branch setup done before creating a new department.",
      ],
    },
    {
      title: "Department Form Fields",
      description:
        "Fill in the required information to register a new department:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Department ID</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Branch ID</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Department ID</strong>, <strong>Name</strong>, and <strong>Branch ID</strong> are mandatory fields.",
        "Ensure no duplicate Department IDs exist to avoid validation errors.",
      ],
    },
    {
      title: "Submit the Department",
      description: "Finalize and submit the new department entry:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Verify all <strong>required fields</strong> are filled correctly.",
            "Click on <strong>'Submit'</strong> to save the department.",
            "You will be redirected back to the <strong>'Department List'</strong> view.",
            "You can use the <strong> upload option </strong> to submit the department details as well.",
          ],
        },
      ],
      notes: [
        "Once submitted, the department will be available in the list for view/edit.",
        "Use edit access for any future updates to the department info.",
      ],
    },
    {
      title: "Back Navigation",
      description: "To return to the Department list or previous screen:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: ["Click on <strong>'Back'</strong> to exit form view"],
        },
      ],
      notes: [
        "This navigation is only for returning to the <strong>view mode</strong> of department list.",
      ],
    },
  ],

  "Update Department": [
    { accesspath: "Update Department" },
    {
      title: "Navigate to Update Department Form",
      description:
        "Follow the path to locate and update an existing department record in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Department'</strong>",
            "Click on <strong>'Update'</strong> next to the department you want to edit",
          ],
        },
      ],
      notes: [
        "Ensure the department you want to edit already exists in the system.",
        "Only authorized users with edit access can perform updates.",
      ],
    },
    {
      title: "Department Update Fields",
      description: "Modify the required fields to update a department record:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Department ID</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Branch ID</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Department ID</strong>, <strong>Name</strong>, and <strong>Branch ID</strong> are mandatory for update.",
        "Use the file upload field only if you want to replace the current department image.",
      ],
    },
    {
      title: "Submit the Updates",
      description: "Save the changes made to the department:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all updated values carefully.",
            "Click on <strong>'Update'</strong> to save changes.",
            "A confirmation message will appear once saved successfully.",
            "You'll be redirected to the <strong>'Department List'</strong> view.",
          ],
        },
      ],
      notes: [
        "Updated details will reflect immediately in the department list.",
      ],
    },
    {
      title: "Back Navigation",
      description: "To return to the Department SetUp without saving changes:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: ["Click on <strong>'Back'</strong> to discard edits."],
        },
      ],
      notes: [
        "Unsaved changes will be lost if you navigate back without submitting.",
      ],
    },
  ],

  // MANAGER GUIDE = Setup(Grade)
  "Grade Setup": [
    { accesspath: "Grade Setup" },
    {
      title: "Navigate to Grade Setup",
      description:
        "Follow the steps below to access and view the list of grades configured in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Grade'</strong>",
          ],
        },
      ],
      notes: [
        "This is a <strong>view-only</strong> section with no data entry fields.",
        "Ensure that you have grade setup permissions to access this page.",
      ],
    },
    {
      title: "Grade Setup View",
      description:
        "Here you can view existing grade entries for the organization:",
      sections: [
        {
          title: "Features Available",
          icon: <FaEye />,
          items: [
            "View existing grade names and codes.",
            "No add/edit/delete actions are available on this screen.",
            "Use this list for reference during employee or department configuration.",
          ],
        },
      ],
      notes: [
        "To make changes to grade values, contact system administrator or access from the master setup section (if permissions allow).",
      ],
    },
    {
      title: "Download Functionality",
      description: "Export grade setup data if needed:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Download grade setup details in <strong>PDF</strong> format using the <strong>'Download PDF'</strong> button provided at the bottom of this page.",
          ],
        },
      ],
      notes: [
        "Ensure you are viewing the correct setup page before downloading.",
        "PDF includes navigation path, view-only info, and feature highlights for Grade Setup.",
      ],
    },
  ],

  "Add Grade": [
    { accesspath: "Add Grade" },
    {
      title: "Navigate to Add Grade Form",
      description: "Follow the steps to add a new grade into the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Grade'</strong>",
            "Click on <strong>'Add Grade'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with <strong>appropriate permissions</strong> can access and use the add grade form.",
      ],
    },
    {
      title: "Grade Form Fields",
      description: "Enter the required details to register a new grade:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Grade ID</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Manager</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Grade Level</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salary Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Grade ID</strong>, <strong>Name</strong>, <strong>Grade Level</strong>, and <strong>Salary Type</strong> are mandatory fields.",
        "Use the checkbox if this grade is managerial.",
        "Image is optional and can be used to upload a related icon or logo.",
      ],
    },
    {
      title: "Submit the Grade",
      description: "Complete and submit the grade form:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure all <strong>required fields</strong> are completed.",
            "Click <strong>'Submit'</strong> to save the new grade.",
            "Confirmation message will appear after successful submission.",
          ],
        },
      ],
      notes: [
        "You will be redirected to the grade list view upon submission.",
        "You can upload grade-related data using the file upload feature in this form.",
      ],
    },
    {
      title: "Back Navigation",
      description: "Return to the previous screen:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Back'</strong> to return to the Grade setup without submitting.",
          ],
        },
      ],
      notes: ["No changes will be saved if you exit without submission."],
    },
  ],
  "Update Grade": [
    { accesspath: "Update Grade" },
    {
      title: "Navigate to Update Grade Form",
      description:
        "Follow the steps to modify an existing grade in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Grade'</strong>",
            "Click on <strong>'Update Grade'</strong> beside the grade to be modified",
          ],
        },
      ],
      notes: [
        "Only users with <strong>edit permissions</strong> can update grade records.",
      ],
    },
    {
      title: "Grade Update Form Fields",
      description: "Edit the necessary details to update a grade:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Grade ID</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Manager</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Grade Level</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salary Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Grade ID</strong>, <strong>Name</strong>, <strong>Grade Level</strong>, and <strong>Salary Type</strong> are mandatory fields.",
      ],
    },
    {
      title: "Submit the Grade Update",
      description: "Complete and submit the updated grade form:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Make necessary edits to the fields.",
            "Click <strong>'Submit'</strong> to save changes.",
          ],
        },
      ],
      notes: ["You will return to the grade Setup after submission."],
    },
    {
      title: "Back Navigation",
      description: "Return without saving changes:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Back'</strong> to return to the grade SetUp/list.",
          ],
        },
      ],
      notes: ["Unsaved changes will be lost."],
    },
  ],

  // Setup(Holiday Calendar)
  "Holiday Calendar Setup": [
    { accesspath: "Holiday Calendar Setup" },
    {
      title: "Navigate to Holiday Calendar Setup",
      description:
        "Follow the steps below to access and view the configured holiday calendar in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Holiday Calendar'</strong>",
          ],
        },
      ],
      notes: [
        "This is a <strong>view-only</strong> section",
        "Ensure you have necessary permissions to view holiday setup information.",
      ],
    },
    {
      title: "Holiday Calendar View",
      description:
        "This page displays holidays configured for the organization:",
      sections: [
        {
          title: "Features Available",
          icon: <FaEye />,
          items: ["View public and organizational holidays for the year."],
        },
      ],
      notes: [
        "Holiday entries are typically managed by system administrators.",
        "Use this calendar to align leave planning and scheduling.",
      ],
    },
    {
      title: "Download Functionality",
      description: "Export the holiday calendar guide if needed:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click on the <strong>'Download PDF/XLS File'</strong> button to export this guide.",
          ],
        },
      ],
    },
  ],

  "Add Holiday Calendar": [
    { accesspath: "Add Holiday Calendar" },
    {
      title: "Navigate to Add Holiday Calendar Form",
      description:
        "Follow the steps to add a new holiday calendar for a specific year in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Holiday Calendar'</strong>",
            "Click on <strong>'Add Holiday Calendar'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with the appropriate permissions can access and submit this form.",
      ],
    },
    {
      title: "Holiday Calendar Form Fields",
      description:
        "Fill in the required details to configure the holiday calendar:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Default Holiday</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Select Saturday Holiday Options</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No of Optional Holidays</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Max no of Work from Home (WFH)</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No of Shifts</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>All</strong> fields are mandatory <strong> Except </strong> the image field.",
        "Image upload is supported for attaching related documents or visual identifiers.",
      ],
    },
    {
      title: "Submit the Holiday Calendar",
      description: "Submit the calendar after completing the form:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review and complete all <strong>required fields</strong>.",
            "Click <strong>'Submit'</strong> to save the new calendar entry.",
          ],
        },
      ],
    },
    {
      title: "Back Navigation",
      description: "Return to the Holiday Calendar Setup screen:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: ["Click <strong>'Back'</strong> to return without saving."],
        },
      ],
      notes: ["No data will be saved unless the form is submitted."],
    },
  ],
  "Update Holiday Calendar": [
    { accesspath: "Update Holiday Calendar" },
    {
      title: "Navigate to Update Holiday Calendar Form",
      description:
        "Update holiday calendar details, holidays, and shift settings within the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Holiday Calendar'</strong>",
            "Click on <strong>'Update'</strong> for the selected calendar",
          ],
        },
      ],
      notes: [
        "Ensure you have the necessary permissions to access and update the calendar.",
      ],
    },
    {
      title: "Holiday Calendar Fields",
      description: "Fill or update the necessary calendar fields:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Default Holiday</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Select Saturday Holiday Options</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No of Optional Holidays</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Max no of Work from Home (WFH)</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No of Shifts</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Year</strong>, <strong>Default Holiday</strong>, <strong>No of Optional Holidays</strong>, <strong>Max no of WFH</strong>, and <strong>No of Shifts</strong> are required fields.",
      ],
    },
    {
      title: "Manage Holidays and Shifts",
      description:
        "Add or view holidays and shifts related to the selected calendar:",
      sections: [
        {
          title: "Related Actions",
          icon: <FaCalendarAlt />,
          items: [
            "Click <strong>'See List of Holidays'</strong> to view all configured holidays.",
            "Click <strong>'Add New Holiday'</strong> to register additional holidays.",
            "Click <strong>'See List of Shifts'</strong> to view all defined shifts.",
            "Click <strong>'Add Shift'</strong> to configure a new shift.",
          ],
        },
      ],
      notes: [
        "Use these features to keep the calendar updated with company-specific holidays and shift schedules.",
      ],
    },
    {
      title: "Submit the Updates",
      description: "Save your calendar changes:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure all required fields are correctly filled.",
            "Click <strong>'Update'</strong> to save your changes.",
          ],
        },
      ],
      notes: [
        "You will be redirected to the holiday calendar list view post-update.",
      ],
    },
    {
      title: "Back Navigation",
      description: "Cancel and return without saving:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Back'</strong> to exit without applying changes.",
          ],
        },
      ],
      notes: [
        "You will be redirected to the holiday calendar SetUp/list view post-update.",
      ],
    },
  ],
  "Add New Holiday": [
    { accesspath: "Add New Holiday" },
    {
      title: "Navigate to Add New Holiday Form",
      description:
        "Follow the steps to add a new holiday to the holiday calendar in HRMS:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Holiday Calendar'</strong>",
            "Select <strong>'Update'</strong> for a calendar entry",
            "Click on <strong>'Add New Holiday'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure you have appropriate permissions to modify the holiday calendar.",
      ],
    },
    {
      title: "New Holiday Fields",
      description: "Provide the required details to register a new holiday:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Holiday Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Holiday Description</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type of Holiday</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields are mandatory: <strong>Holiday Date</strong>, <strong>Holiday Description</strong>, and <strong>Type of Holiday</strong>.",
        "Avoid duplicate dates already listed in the same calendar.",
      ],
    },
    {
      title: "Submit the Holiday",
      description: "Save the holiday information into the calendar:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure all <strong>required fields</strong> are filled correctly.",
            "Click <strong>'Save'</strong> to add the new holiday.",
          ],
        },
      ],
      notes: [
        "The newly added holiday will be listed under the selected calendar.",
      ],
    },
  ],
  "Edit Holiday": [
    { accesspath: "Edit Holiday" },
    {
      title: "Navigate to Edit Holiday Form",
      description:
        "Follow the steps to edit an existing holiday entry in the HRMS holiday calendar:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Holiday Calendar'</strong>",
            "Click on <strong>'Update'</strong> to open a calendar entry",
            "Select the holiday you want to update and click <strong>'Edit'</strong>",
          ],
        },
      ],
      notes: [
        "Editing holiday entries requires appropriate access permissions.",
      ],
    },
    {
      title: "Edit Holiday Fields",
      description: "Update the necessary details for the selected holiday:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Holiday Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Holiday Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Holiday Date</strong>, <strong>Remarks</strong>, and <strong>Holiday Type</strong> are required fields.",
      ],
    },
    {
      title: "Submit Edited Holiday",
      description: "Save the updated information for the holiday:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review the changes made to the holiday entry.",
            "Click <strong>'Save'</strong> or <strong>'Update'</strong> to apply changes.",
          ],
        },
      ],
      notes: [
        "The updated holiday details will immediately reflect in the calendar view.",
      ],
    },
  ],

  "Add Shift": [
    { accesspath: "Add Shift" },
    {
      title: "Navigate to Add Shift Form",
      description:
        "Follow the steps below to add a new shift entry into the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Holiday Calendar'</strong>",
            "Click on <strong>'Update'</strong> to open a holiday calendar entry",
            "Click on <strong>'Add Shift'</strong> to open the shift form",
          ],
        },
      ],
      notes: ["You must have valid permissions to add a shift."],
    },
    {
      title: "Shift Form Fields",
      description: "Provide details to register a new shift:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Shift No</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Time Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>End Time</TableCell>
                    <TableCell>Time Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Shift No</strong>, <strong>Start Time</strong>, and <strong>End Time</strong> are Mandatory fields.",
        "Ensure shift timings do not overlap with existing shifts for the same calendar.",
      ],
    },
    {
      title: "Submit Shift Entry",
      description: "Finalize and save the new shift:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Verify all input fields are correctly filled.",
            "Click <strong>'Save'</strong> to add the shift to the holiday calendar.",
          ],
        },
      ],
      notes: [
        "The shift will now appear in the shift listing of the calendar.",
      ],
    },
  ],

  "Edit Shift": [
    { accesspath: "Edit Shift" },
    {
      title: "Navigate to Edit Shift Form",
      description:
        "Use this guide to update an existing shift associated with a holiday calendar in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Open the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Go to <strong>'Holiday Calendar'</strong>",
            "Click on <strong>'Update'</strong> to select the relevant calendar",
            "Click on <strong>'Edit'</strong> beside the shift you want to modify",
          ],
        },
      ],
      notes: [
        "Ensure you have appropriate access rights to edit shifts.",
        "Editing a shift will update its schedule across the calendar.",
      ],
    },
    {
      title: "Shift Form Fields",
      description: "Update the fields below as needed:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Shift No</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Time Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>End Time</TableCell>
                    <TableCell>Time Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Shift No</strong>, <strong>Start Time</strong>, and <strong>End Time</strong> are required fields.",
      ],
    },
    {
      title: "Submit Updated Shift",
      description: "Save the changes made to the shift:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review the updated values.",
            "Click on <strong>'Update'</strong> to apply changes.",
            "A confirmation message will appear upon successful update.",
          ],
        },
      ],
      notes: [
        "Changes will reflect immediately in the holiday calendar shift listing.",
      ],
    },
  ],

  // Setup(HR Policy Documents)
  "HR Policy Documents Setup": [
    { accesspath: "HR Policy Documents Setup" },
    {
      title: "Navigate to HR Policy Documents",
      description:
        "Follow the steps below to view HR Policy Documents configured in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Policy Documents'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with <strong>view access</strong> can see policy documents.",
      ],
    },
    {
      title: "Viewing Policy Documents",
      description: "Access and view available HR policies:",
      sections: [
        {
          title: "View Options",
          icon: <FaEye />,
          items: [
            "A list of policy documents will be displayed with details like <strong>Title</strong>, <strong>Category</strong>",
            "Click on the <strong>'View'</strong> or <strong>'Download'</strong> icon beside any policy to open or save it.",
          ],
        },
      ],
      notes: [
        "Documents are available in PDF or DOC format.",
        "Ensure your browser supports file preview or downloads.",
      ],
    },
    {
      title: "Download Functionality",
      description: "Export HR policy document records if needed:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click on the <strong>'Download PDF/Excel '</strong> button to export the policy document list for reference.",
          ],
        },
      ],
    },
  ],
  "Add HR Policy Documents": [
    { accesspath: "Add HR Policy Documents" },
    {
      title: "Navigate to Add HR Policy Documents Form",
      description:
        "Use the following steps to access the HR Policy Documents section",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'HR Policy Documents'</strong>",
            "Click on <strong>'Add HR Policy Documents'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with appropriate permissions can access and upload policy documents.",
      ],
    },
    {
      title: "HR Policy Document Form Fields",
      description: "Fill out the required fields to upload a policy document:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Document Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Document</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Document Name</strong> and <strong>Document</strong> file are mandatory fields.",
        "Ensure the uploaded document is in PDF, DOCX, or a supported format.",
      ],
    },
    {
      title: "Submit the Document",
      description: "Complete and upload the policy document:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure all <strong>required fields</strong> are completed.",
            "Click <strong>'Submit'</strong> to upload the document.",
          ],
        },
      ],
      notes: [
        "After submission, the new policy will be available under the HR Policy Documents list.",
      ],
    },
    {
      title: "Back Navigation",
      description: "Return to the previous section if needed:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to return to the HR Policy Documents setup.",
          ],
        },
      ],
      notes: ["Changes will not be saved unless the form is submitted."],
    },
  ],
  "Update HR Policy Documents": [
    { accesspath: "Update HR Policy Documents" },
    {
      title: "Navigate to Update HR Policy Documents Form",
      description:
        "Follow the steps below to access the update form and modify an existing HR policy document in the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'HR Policy Documents'</strong>",
            "Click on <strong>'Update'</strong> next to the document you wish to modify",
          ],
        },
      ],
      notes: ["Only authorized users can update HR policy documents."],
    },
    {
      title: "Update HR Policy Document Form Fields",
      description:
        "Modify the fields in the form to update the policy document details. Ensure all required fields are properly filled.",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Document Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Document</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Document Name</strong> and <strong>Document</strong> file must be provided to proceed with the update.",
      ],
    },
    {
      title: "Submit the Updated Document",
      description:
        "After making the necessary changes, submit the form to update the HR policy document in the system.",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure that all <strong>required fields</strong> are correctly filled.",
            "Click <strong>'Submit'</strong> to update the document.",
          ],
        },
      ],
      notes: [
        "The updated document will replace the previous version and be available under the HR Policy Documents list.",
      ],
    },
    {
      title: "Back Navigation",
      description:
        "Use the back option if you decide not to proceed with updating the document.",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to return to the HR Policy Documents Setup",
          ],
        },
      ],
      notes: ["Changes will only be saved upon form submission."],
    },
  ],

  // Setup(Approval Limit)
  "Approval Limit Setup": [
    { accesspath: "Approval Limit Setup" },
    {
      title: "Navigate to Approval Limit Setup",
      description:
        "Use this section to view and manage the approval limits configured within the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Approval Limit'</strong>",
          ],
        },
      ],
      notes: [
        "This module is accessible only to authorized HR managers and administrators.",
      ],
    },
    {
      title: "Approval Limit View Screen",
      description:
        "The view screen allows you to review the existing approval limits assigned to various grades or roles.",
      sections: [
        {
          title: "Information Displayed",
          icon: <FaEye />,
          items: [
            "Grade or Role Name",
            "Approval Limit Amount",
            "Effective From Date",
            "Approval Type (e.g., Financial, Leave, etc.)",
          ],
        },
      ],
      notes: [
        "Ensure consistency in approval policies across departments.",
        "You cannot edit data directly from this view page — use the Add or Update options for modifications.",
      ],
    },
    {
      title: "Download and Export",
      description:
        "Download or export approval limits for reporting or compliance tracking.",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click <strong>'Download PDF'</strong> or <strong>'Export to Excel'</strong> for offline reference.",
          ],
        },
      ],
      notes: ["Exported files help with audits and internal reviews."],
    },
  ],

  "Add Approval Limit": [
    { accesspath: "Add Approval Limit" },
    {
      title: "Navigate to Add Approval Limit Form",
      description:
        "Follow the steps below to configure a new approval limit within the HRMS system",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Approval Limit'</strong>",
            "Click on <strong>'Add Approval Limit'</strong>",
          ],
        },
      ],
    },
    {
      title: "Approval Limit Form Fields",
      description:
        "Fill out the form fields accurately to define the new approval limit. The approval limits are applied based on the selected role or grade.",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Amount Limit</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Days Limit</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Min Grade Level for Approval</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image (Optional)</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields except Image are mandatory.",
        "Ensure numeric fields like Amount Limit, Days Limit, and Grade Level are filled with valid values.",
      ],
    },
    {
      title: "Submit the Approval Limit",
      description:
        "Once the form is completed, submit the entry to save the new approval limit.",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all entered values.",
            "Click <strong>'Submit'</strong> to save the approval limit.",
          ],
        },
      ],
      notes: [
        "The new approval limit will now appear in the Approval Limit listing screen.",
      ],
    },
    {
      title: "Back Navigation",
      description:
        "Return to the previous section without saving the changes if needed.",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to return to the Approval Limit setup",
          ],
        },
      ],
      notes: [
        "Unsaved data will be lost when navigating back without submission.",
      ],
    },
  ],
  "Update Approval Limit": [
    { accesspath: "Update Approval Limit" },
    {
      title: "Navigate to Update Approval Limit",
      description:
        "This section allows authorized users to update the existing approval limit configurations such as monetary limits, day limits, and required grade level for approvals.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Approval Limit'</strong>",
            "Click on <strong>'Update'</strong> beside the approval record you wish to modify",
          ],
        },
      ],
      notes: [
        "Only users with necessary permissions can update approval limits.",
        "Changes will overwrite the existing configuration for the selected approval limit.",
      ],
    },
    {
      title: "Approval Limit Update Form Fields",
      description:
        "Edit the required fields to update the approval configuration as per your organizational policy.",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Amount Limit</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Days Limit</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Min Grade Level for Approval</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image (Optional)</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Fields marked as required must be completed to successfully update the record.",
      ],
    },
    {
      title: "Submit Updated Approval Limit",
      description:
        "Once the required fields are modified, submit the form to save your changes.",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all changes carefully.",
            "Click <strong>'Update'</strong> to save the changes.",
          ],
        },
      ],
      notes: [
        "Updates will reflect immediately in the approval limit listing.",
      ],
    },
    {
      title: "Back Navigation",
      description:
        "You can return to the previous screen without saving changes.",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to return to the Approval Limit Setup.",
          ],
        },
      ],
      notes: ["Unsaved modifications will be lost upon navigating back."],
    },
  ],

  // Setup(Appraisal Structure)
  "Appraisal Structure Setup": [
    { accesspath: "Appraisal Structure Setup" },
    {
      title: "Navigate to Appraisal Structure Setup",
      description:
        "This section provides an overview of how to view and manage the appraisal structure used for employee performance evaluations in the HRMS.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Choose <strong>'Appraisal Structure'</strong>",
          ],
        },
      ],
      notes: [
        "This setup section is used to view the existing appraisal structure configurations.",
        "Only users with appropriate access rights can view or modify appraisal structures.",
      ],
    },
    {
      title: "Appraisal Structure View Details",
      description:
        "This view provides access to the list of appraisal structures configured in the system",
      sections: [
        {
          title: "Key Features in View",
          icon: <FaEye />,
          items: [
            "View existing <strong>appraisal structure entries</strong>",
            "Check <strong>assigned weightage</strong> and <strong>applicable roles or grades</strong>",
          ],
        },
      ],
      notes: [
        "Any structural modifications must be done through the respective 'Add' or 'Update' actions.",
      ],
    },
    {
      title: "Download and Export",
      description:
        "Download or export appraisal structure data for reporting, analysis, or compliance tracking.",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click <strong>' On Excel'</strong> to download appraisal structure data in a spreadsheet format (.xls/.xlsx).",
          ],
        },
      ],
      notes: [
        "Ensure the appraisal structure data is up-to-date before exporting.",
      ],
    },
  ],
  "Add Appraisal Structure": [
    { accesspath: "Add Appraisal Structure" },
    {
      title: "Navigate to Add Appraisal Structure Form",
      description:
        "Use this form to create a new appraisal structure for employee performance evaluations.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Choose <strong>'Appraisal Structure'</strong>",
            "Click on <strong>'Add Appraisal Structure'</strong>",
          ],
        },
      ],
      notes: [
        "Only authorized Users can access this section to define appraisal structures.",
      ],
    },
    {
      title: "Appraisal Structure Form Fields",
      description:
        "Fill in the form fields to create a new appraisal structure:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Appraisal Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable to Emp Grade</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Appraisal Name</strong> is a mandatory field and must be unique.",
      ],
    },
    {
      title: "Submit the Appraisal Structure",
      description:
        "Once the form is filled, submit the new appraisal structure for it to be saved in the system.",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Verify that all required fields are completed correctly.",
            "Click <strong>'Submit'</strong> to save the structure.",
          ],
        },
      ],
      notes: [
        "After submission, the appraisal structure becomes available in the main list for further use.",
      ],
    },
    {
      title: "Upload Appraisal Structure",
      description:
        "Instead of manually filling the form, you can upload an Excel file containing multiple appraisal structures.",
      sections: [
        {
          title: "Upload Instructions",
          icon: <FaUpload />,
          items: [
            "Click on the <strong>'Upload'</strong> button.",
            "Select a valid <strong>Excel/PDF file (.xls or .xlsx)</strong> with the required appraisal structure format.",
            "Ensure the file follows the prescribed template for successful import.",
          ],
        },
      ],
      notes: [
        "Uploaded data will be validated before saving.",
        "Use this option to add multiple appraisal structures in bulk.",
      ],
    },
    {
      title: "Back Navigation",
      description: "Return to the previous screen without saving changes:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Back'</strong> to return to the Appraisal Structure Setup.",
          ],
        },
      ],
      notes: [
        "Any unsaved changes will be lost if you navigate away without submitting.",
      ],
    },
  ],
  "Update Appraisal Structure": [
    { accesspath: "Update Appraisal Structure" },
    {
      title: "Navigate to Update Appraisal Structure Form",
      description:
        "Use this form to modify an existing appraisal structure in the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Choose <strong>'Appraisal Structure'</strong>",
            "Click on <strong>'Update'</strong> beside the structure you wish to modify",
          ],
        },
      ],
      notes: [
        "Only authorized users with edit permissions can modify appraisal structures.",
      ],
    },
    {
      title: "Update Form Fields",
      description:
        "Edit the necessary fields in the form to update the selected appraisal structure:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Appraisal Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable to Emp Grade</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["<strong>Appraisal Name</strong> is mandatory."],
    },
    {
      title: "Submit the Changes",
      description:
        "Once edits are complete, submit the form to save the updates:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all the form fields carefully.",
            "Click on <strong>'Submit'</strong> to save the changes.",
          ],
        },
      ],
      notes: [
        "Changes will be reflected in the Appraisal Structure list immediately after successful submission.",
      ],
    },
    {
      title: "Back Navigation",
      description: "Return to the previous screen without making changes:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to go back to the Appraisal Structure list.",
          ],
        },
      ],
      notes: [
        "Unsaved changes will be discarded if you navigate away without submitting.",
      ],
    },
  ],
  // Setup(Exit Process)
  "Exit process Setup": [
    { accesspath: "Exit Process Setup" },
    {
      title: "Navigate to Exit Process Setup",
      description:
        "This module allows authorized users to view and configure exit process setup.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Exit Process'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with setup access can view or update exit process configurations.",
      ],
    },
    {
      title: "Exit Process Overview",
      description:
        "The Exit Process setup typically includes steps like final approvals, document clearance, handover checklists, and feedback forms.",
      sections: [
        {
          title: "Common Configuration Elements",
          icon: <FaCogs />,
          items: [
            "Assign responsibilities for each exit step.",
            "Enable or disable exit checklists as needed.",
          ],
        },
      ],
      notes: [
        "Configuring the exit process helps standardize employee offboarding and ensures compliance.",
        "Ensure all relevant departments are involved in the defined workflow.",
      ],
    },
    {
      title: "Access and Visibility",
      description:
        "Understand who can view or interact with the Exit Process setup:",
      sections: [
        {
          title: "User Access",
          icon: <FaUserShield />,
          items: [
            "Only HR managers or admins can make changes to the exit process setup.",
            "Other roles may have view-only access depending on permissions.",
          ],
        },
      ],
      notes: [
        "It is recommended to restrict edit access to senior HR personnel to avoid accidental changes.",
      ],
    },

    {
      title: "Download Help Guide",
      description: "Export this help document if required:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click <strong>'Download PDF/EXCEL'</strong> to export this guide for reference or training purposes.",
          ],
        },
      ],
    },
  ],

  "Add Exit Process": [
    { accesspath: "Add Exit Process" },
    {
      title: "Navigate to Add Exit Process Form",
      description:
        "Use this module to define a new step in the employee exit workflow within the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Exit Process'</strong>",
            "Click on <strong>'Add Exit Process'</strong>",
          ],
        },
      ],
      notes: ["Only authorized Users can add or configure exit process steps."],
    },
    {
      title: "Exit Process Form Fields",
      description:
        "Fill out the following fields to define an exit process step:",
      sections: [
        {
          title: "Field Details",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Document to be Uploaded?</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Which Department?</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sequence No</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Mandatory fields include <strong>Name</strong>, <strong>Which Department</strong>, and <strong>Description</strong>.",
      ],
    },
    {
      title: "Submit Exit Process Step",
      description: "Save the new exit process entry to the system:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all <strong>required fields</strong> for accuracy.",
            "Click <strong>'Submit'</strong> to save the exit process step.",
          ],
        },
      ],
      notes: [
        "After submission, the step will be listed under the exit process configuration.",
      ],
    },
    {
      title: "Upload Exit Process Steps",
      description:
        "Instead of manually filling the form for each step, you can upload an Excel file containing multiple exit process steps in bulk.",
      sections: [
        {
          title: "Upload Instructions",
          icon: <FaUpload />,
          items: [
            "Click on the <strong>'Upload'</strong> button in the Exit Process section.",
            "Select a valid <strong>Excel/PDF file (.xls or .xlsx)</strong> that matches the required template.",
          ],
        },
      ],
      notes: ["This is useful for adding multiple exit process steps at once."],
    },
    {
      title: "Back Navigation",
      description: "Return without saving if needed:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to return to the Exit Process setup list.",
          ],
        },
      ],
      notes: ["Unsaved changes will be lost if you navigate away."],
    },
  ],
  "Update Exit Process": [
    { accesspath: "Update Exit Process" },
    {
      title: "Navigate to Update Exit Process Form",
      description:
        "Use this section to update an existing step in the employee exit workflow process within the HRMS.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Setup'</strong>",
            "Open <strong>'Exit Process'</strong>",
            "Click on <strong>'Update'</strong> next to the desired Exit Process entry",
          ],
        },
      ],
      notes: [
        "Ensure you have the necessary permissions to update exit process steps.",
      ],
    },
    {
      title: "Exit Process Update Form Fields",
      description: "Modify the fields as required and update the step details:",
      sections: [
        {
          title: "Field Details",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Document to be Uploaded?</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Which Department?</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sequence No</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Name</strong>, <strong>Which Department</strong>, and <strong>Description</strong> fields are mandatory.",
      ],
    },
    {
      title: "Submit the Updated Process",
      description: "After making changes, save the updated exit process:",
      sections: [
        {
          title: "Update Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure all required fields are completed.",
            "Click <strong>'Update'</strong> to save the changes.",
          ],
        },
      ],
      notes: [
        "Updates will reflect immediately in the Exit Process configuration.",
      ],
    },
    {
      title: "Cancel or Navigate Back",
      description: "Exit without saving changes if necessary:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Back'</strong> to return to the Exit Process setup screen.",
          ],
        },
      ],
      notes: ["Any unsaved changes will be discarded upon exit."],
    },
  ],

  // Appointee List
  "Appointee List Dashboard": [
    { accesspath: "Appointee List" },
    {
      title: "Navigate to Appointee List Dashboard",
      description:
        "Use this section to access the dashboard displaying detailed appointee information and visual insights in the HRMS.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
          ],
        },
      ],
      notes: ["Only authorized users can access the Appointee List dashboard."],
    },
    {
      title: "Dashboard Overview",
      description:
        "Explore search options, filters, visual analytics, and employee list data:",
      sections: [
        {
          title: "Dashboard Features",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Component</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Search By</TableCell>
                    <TableCell>
                      Search employees using Employee Name, ID, Mobile No, or
                      Email.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Filter By</TableCell>
                    <TableCell>
                      Filter employees by Department and Grade.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Grade-wise Distribution</TableCell>
                    <TableCell>
                      Pie chart displaying employee distribution by grade.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Department-wise Distribution</TableCell>
                    <TableCell>
                      Pie chart showing employee count per department.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>List of Appointee</TableCell>
                    <TableCell>
                      Detailed list of all appointed employees with relevant
                      attributes.
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Use filters and search to narrow down specific employee details quickly.",
      ],
    },
    {
      title: "Exporting or Downloading Information",
      description:
        "Use this section to save or reference dashboard data externally:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click on <strong>'Download PDF/Excel'</strong> to export the dashboard help guide.",
          ],
        },
      ],
      notes: [
        "This can serve as a reference for HR teams and management reports.",
      ],
    },
  ],
  "Add Appointee": [
    { accesspath: "Add Appointee" },
    {
      title: "Navigate to Add Appointee Form",
      description:
        "Follow the steps below to add a new appointee's details into the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
            "Click on <strong>'Add Appointee'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with appropriate permissions can add a new appointee.",
      ],
    },
    {
      title: "Appointee Form Fields",
      description:
        "Fill in the following fields to complete the appointee entry:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Appointee Job ID</TableCell>
                    <TableCell>
                      Auto-generated from My Office → Setup → Numbering{" "}
                    </TableCell>
                    <TableCell>System Generated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PAN Number</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email ID</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile No</TableCell>
                    <TableCell>Num</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alternate Mobile No</TableCell>
                    <TableCell>Num</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Department</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Grade</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date of Join</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marital Status</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date of Birth (DOB)</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Address (Line 1, 2, 3)</TableCell>
                    <TableCell>Text (3 Textboxes)</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pin Code</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address Proof Govt ID Number</TableCell>
                    <TableCell>Text (e.g., Aadhaar)</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Personal Email ID</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Manager</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HR Manager</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HR Coordinator/Contact Details</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Probation/Training Period (Months)</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Confirmation Date</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No of Leaves during Training Period</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Employee Name</strong>, <strong>Email ID</strong>, <strong>Employee Department</strong>, and <strong>Employee Address</strong> are mandatory fields.",
        "Ensure correct and verified details are entered before submission.",
      ],
    },
    {
      title: "Submit the Appointee Details",
      description:
        "Finalize the appointee entry by submitting the completed form.",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Double-check that all <strong>required fields</strong> are filled.",
            "Click on the <strong>'Submit'</strong> button.",
          ],
        },
      ],
      notes: [
        "Once submitted, the new appointee will appear in the Appointee List Dashboard.",
      ],
    },
    {
      title: "Return Without Saving",
      description:
        "If you do not wish to submit, return to the previous section:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to exit without saving the form.",
          ],
        },
      ],
      notes: ["Unsaved data will be lost upon navigation away from this page."],
    },
  ],
  "Update Appointee Details": [
    { accesspath: "Update Appointee Details" },
    {
      title: "Navigate to Update Appointee Details",
      description:
        "Follow the steps below to update an existing appointee's information in the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
            "Click on <strong>'Update'</strong> next to the appointee you want to edit",
          ],
        },
      ],
      notes: ["Only users with update permission can modify appointee data."],
    },
    {
      title: "Appointee Details - Editable Fields",
      description: "Update the following fields as needed:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Appointee Job ID</TableCell>
                    <TableCell>Auto-generated</TableCell>
                    <TableCell>System Controlled</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PAN Number</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email ID</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile No</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alternate Mobile No</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Department</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Grade</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date of Join</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marital Status</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date of Birth (DOB)</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Address (Line 1, 2, 3)</TableCell>
                    <TableCell>Textboxes</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pin Code</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Govt ID Number</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Personal Email ID</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Manager</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HR Manager</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HR Coordinator Contact</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Training Period (Months)</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Confirmation Date</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Leaves during Training</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Employee Name</strong>, <strong>Email ID</strong>, <strong>Employee Department</strong>, and <strong>Employee Address</strong> are mandatory fields.",
        "Changes are saved immediately after clicking <strong>'Submit'</strong>.",
      ],
    },
    {
      title: "Submit Updated Details",
      description: "Finalize your updates using the following steps:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all updated fields for accuracy.",
            "Click on the <strong>'Submit'</strong> button to save changes.",
            "A success message will confirm that the details were updated.",
          ],
        },
      ],
      notes: ["Only validated and authorized users should perform updates."],
    },
    {
      title: "Cancel Update",
      description:
        "If you choose not to update the information, follow these steps:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> or navigate away without saving.",
          ],
        },
      ],
      notes: ["Unsaved changes will be lost."],
    },
  ],
  "Update Documents of Appointee": [
    { accesspath: "Update Documents of Appointee" },
    {
      title: "Navigate to Update Documents of Appointee",
      description:
        "Follow the steps below to upload or update documents for an existing appointee in the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
            "Click on <strong>'Update'</strong> next to the employee",
            "Navigate to the <strong>'Documents'</strong> section",
          ],
        },
      ],
      notes: [
        "You must have update permissions to upload or modify documents.",
      ],
    },
    {
      title: "Appointee Document Upload Fields",
      description: "Upload the necessary documents related to the appointee:",
      sections: [
        {
          title: "Document Types",
          icon: <FaFileUpload />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Document Type</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee Joining Document</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Agreement Document</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Misc Document - 1</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Misc Document - 2</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Resign Document</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All file uploads are optional but important for maintaining a complete appointee record.",
        "Ensure that the file size and type are supported by the system.",
      ],
    },
    {
      title: "Save or Submit",
      description: "Steps to finalize document uploads:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "After uploading documents, click the <strong>'Submit'</strong> or <strong>'Save'</strong> button.",
          ],
        },
      ],
      notes: [
        "If you navigate away without saving, the uploaded documents will be lost.",
      ],
    },
    {
      title: "Cancel Document Upload",
      description: "How to cancel the operation without saving:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click 'Cancel' or navigate back to return to the Employee List Dashboard without uploading any files.",
          ],
        },
      ],
      notes: ["No changes will be saved unless explicitly submitted."],
    },
  ],
  "Update Bank Account of Appointee": [
    { accesspath: "Update Bank Account of Appointee" },
    {
      title: "Navigate to Update Bank Account of Appointee",
      description:
        "Follow the steps below to update the bank account details for an existing appointee in the HRMS system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
            "Click on <strong>'Update'</strong> next to the appointee whose bank account needs to be updated",
            "Navigate to the <strong>'Documents'</strong> section",
            "Click on the <strong>'Bank Account'</strong> tab to open the form",
          ],
        },
      ],
      notes: [
        "Ensure that you have the necessary permissions to update bank account details.",
      ],
    },
    {
      title: "Bank Account Form Fields",
      description:
        "Fill in the required details for updating the bank account information:",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Account Currency</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bank Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>IFSC Code</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>BIC Code</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Branch Address</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Default Address</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Account Number, Account Name, Account Currency, Bank Name, IFSC Code, and Branch Address</strong> are mandatory fields.",
        "Make sure the IFSC code matches the bank’s registered code.",
      ],
    },
    {
      title: "Submit the Bank Account Information",
      description:
        "After filling the required fields, submit the updated bank account details:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure that all <strong>required fields</strong> are completed.",
            "Click <strong>'Submit'</strong> to update the bank account details.",
          ],
        },
      ],
      notes: [
        "Once submitted, the new bank account details will be reflected in the appointee's records.",
        "Ensure that the entered data is accurate before submitting.",
      ],
    },
    {
      title: "Cancel Changes",
      description:
        "If you wish to cancel the changes without saving, follow the steps below:",
      sections: [
        {
          title: "Cancel Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Cancel'</strong> to discard any changes and return to the previous page.",
          ],
        },
      ],
      notes: [
        "Changes will only be saved if you click on <strong>'Submit'</strong>.",
      ],
    },
  ],
  "Restore Status": [
    { accesspath: "Restore Status of Appointee" },
    {
      title: "Navigate to Restore Status of Appointee",
      description:
        "Follow the steps below to restore the status of an appointee in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
            "Find the appointee whose status needs to be restored.",
            "Click on <strong>'Restore Status'</strong> next to the appointee.",
          ],
        },
      ],
      notes: [
        "Only users with the necessary permissions can restore the status of an appointee.",
        "Restoring an appointee's status will reactivate their record in the system.",
      ],
    },
    {
      title: "Restore Status Action",
      description:
        "Click on the button to restore the status of the appointee:",
      sections: [
        {
          title: "Restore Action",
          icon: <FaUndo />,
          items: [
            "Click on <strong>'Restore Status'</strong> to restore the appointee's status.",
          ],
        },
      ],
      notes: [
        "Ensure that the correct appointee is selected before restoring their status.",
        "Once restored, the appointee will be active again in the system.",
      ],
    },
    {
      title: "Confirmation Message",
      description:
        "A confirmation message will be displayed upon successfully restoring the status:",
      sections: [
        {
          title: "Success Message",
          icon: <FaCheckCircle />,
          items: [
            "A success message will appear confirming the restoration of the appointee's status.",
            "The appointee's record will now be visible as active in the system.",
          ],
        },
      ],
      notes: [
        "The status restoration is permanent once confirmed.",
        "You can check the appointee's updated status in the Appointee List.",
      ],
    },
  ],
  "Update Status of Appointee": [
    { accesspath: "Update Status of Appointee" },
    {
      title: "Navigate to Update Status of Appointee",
      description:
        "Follow the steps below to update the status of an appointee in the HRMS system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
            "Locate the appointee whose status needs to be updated.",
            "Click on <strong>'Update Status'</strong> next to the appointee.",
          ],
        },
      ],
      notes: [
        "Only users with the necessary permissions can update the status of an appointee.",
      ],
    },
    {
      title: "Update Status Options",
      description: "Choose the appropriate status for the appointee:",
      sections: [
        {
          title: "Status Options",
          icon: <FaSync />,
          items: [
            "Click on the <strong>'Update as Not Joined'</strong> button to mark the appointee as 'Not Joined.'",
            "Click on the <strong>'Update as Employee'</strong> button to mark the appointee as 'Employee.'",
            "Click on the <strong>'Update as Contract Employee'</strong> button to mark the appointee as 'Contract Employee.'",
          ],
        },
      ],
      notes: [
        "Ensure that you select the correct status based on the appointee's current employment situation.",
        "The selected status will immediately update the appointee's record.",
      ],
    },
    {
      title: "Confirmation Message",
      description:
        "A confirmation message will be displayed after updating the status:",
      sections: [
        {
          title: "Success Message",
          icon: <FaCheckCircle />,
          items: [
            "A success message will appear confirming the status update.",
            "The appointee's record will now reflect the updated status (Not Joined, Employee, or Contract Employee).",
          ],
        },
      ],
      notes: [
        "You can always revisit the appointee's record to confirm the updated status.",
      ],
    },
  ],
  "Appointee Offer and Appointment Letter": [
    { accesspath: "Appointee Offer and Appointment Letter" },
    {
      title: "Navigate to Offer and Appointment Letter",
      description:
        "Follow the steps below to access and manage the offer and appointment letters for an appointee:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Appointee List'</strong>",
            "Find the appointee whose offer or appointment letter needs to be accessed.",
            "Click on <strong>'Offer Letter/ Appointment Letter'</strong> to view or manage the documents.",
          ],
        },
      ],
      notes: [
        "Only authorized users with the appropriate permissions can access and manage the offer and appointment letters.",
        "The offer and appointment letters are critical documents for each appointee and should be handled carefully.",
      ],
    },
    {
      title: "Offer Letter and Appointment Letter Documents",
      description:
        "View and manage the offer and appointment letters for the appointee:",
      sections: [
        {
          title: "Document Information",
          icon: <FaFile />,
          items: [
            "The <strong>Offer Letter</strong> is typically issued before the appointee joins the organization.",
            "The <strong>Appointment Letter</strong> is issued once the appointee has accepted the offer and joined the organization.",
            "Both documents are stored and managed through the HRMS system for easy access.",
          ],
        },
      ],
      notes: [
        "Ensure that both the offer and appointment letters are properly filled and include the necessary details.",
        "These letters may be used for future reference or verification, so they should be accurately drafted and stored.",
      ],
    },
    {
      title: "Download and View Documents",
      description:
        "Download or view the offer and appointment letters if needed:",
      sections: [
        {
          title: "Download Option",
          icon: <FaDownload />,
          items: [
            "Click on the <strong>'Download'</strong> button next to the document name to download the offer or appointment letter.",
            "You can also view the document by clicking on the <strong>'View'</strong> option if available.",
          ],
        },
      ],
      notes: [
        "The documents are stored in standard formats like PDF or DOCX for easy access and sharing.",
        "Ensure you have the necessary software (like a PDF viewer) to view the downloaded documents.",
      ],
    },
  ],

  // Employee Documents

  "Employee Documents Dashboard": [
    { accesspath: "Employee Documents Dashboard" },
    {
      title: "Navigate to Employee Documents Dashboard",
      description:
        "This dashboard allows managers to view and filter employee document records efficiently.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Employee Documents'</strong> to open the dashboard.",
          ],
        },
      ],
      notes: [
        "Only authorized User can access and use the Employee Documents dashboard.",
      ],
    },
    {
      title: "Filter & Search Options",
      description:
        "Use the filters and dropdowns to narrow down the document records displayed.",
      sections: [
        {
          title: "Available Filters",
          icon: <FaFilter />,
          items: [
            "<strong>Employee Name</strong>: Select employee from dropdown.",
            "<strong>Search Name</strong>: Enter name manually in search field.",
            "<strong>All Grades</strong>: Filter by employee grade (dropdown).",
            "<strong>Order By</strong>: Choose between ascending/descending.",
            "<strong>Record Created</strong>: Filter by creation time (dropdown).",
            "<strong>All Document Type</strong>: Filter based on document type.",
            "<strong>All Department</strong>: Select department from dropdown.",
            "<strong>Show Entries</strong>: Control how many entries are displayed per page.",
          ],
        },
      ],
      notes: [
        "You <strong>cannot</strong> manually enter any values in dropdowns.",
        "Only the <strong>'Search Name'</strong> field accepts manual text input.",
      ],
    },
    {
      title: "View Document Records",
      description:
        "After applying filters, view the list of employee documents that match the selected criteria.",
      sections: [
        {
          title: "Dashboard Table",
          icon: <FaTable />,
          items: [
            "Displays document entries with relevant employee data.",
            "Supports pagination and sorting based on selected filters.",
          ],
        },
      ],
      notes: [
        "Use the <strong>'Show Entries'</strong> dropdown to adjust the number of results per page.",
        "Click on column headers to sort by Employee Name, Date, etc. if sorting is enabled.",
      ],
    },
  ],
  "Employee Documents": [
    { accesspath: "Employee Documents" },
    {
      title: "Navigate to Employee Document Upload",
      description:
        "Use this section to upload and manage official documents for employees within the HRMS Application.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Employee Documents'</strong>",
            "Click on <strong>'New Document'</strong> to upload a new document.",
          ],
        },
      ],
      notes: [
        "Only users with the appropriate roles and access can manage employee documents.",
      ],
    },
    {
      title: "Employee Document Form Fields",
      description:
        "Fill in the details below to successfully upload an employee document.",
      sections: [
        {
          title: "Field Information",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Dropdown (Select Employee)</TableCell>
                    <TableCell>
                      <strong>Required</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <strong>Required</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Document Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <strong>Required</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Document Date</TableCell>
                    <TableCell>Calendar Picker</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Valid To Date</TableCell>
                    <TableCell>Calendar Picker</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Document File</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Employee</strong> and <strong>Document Type</strong> are mandatory fields.",
        "Ensure that the uploaded document is in a supported format such as PDF or DOCX.",
      ],
    },
    {
      title: "Submit Document",
      description:
        "After filling in all necessary details, follow these steps to save the document:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all entered information carefully.",
            "Click the <strong>'Submit'</strong> button to upload and save the document.",
          ],
        },
      ],
      notes: [
        "Once submitted, the document becomes part of the employee's digital record.",
      ],
    },

    {
      title: "Back Navigation",
      description:
        "Return to the Employee Documents Dashboard without saving changes:",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Back'</strong> to go to the main Employee Documents dashboard.",
          ],
        },
      ],
      notes: [
        "Any unsaved changes will be lost if you navigate back without submitting the form.",
      ],
    },
  ],

  //
  "Shift Views Dashboard": [
    { accesspath: "Shift View Dashboard" },
    {
      title: "Navigate to Shift View Dashboard",
      description:
        "The Shift View Dashboard allows managers to view and manage employee shifts across weeks.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Shift View'</strong> to open the dashboard.",
          ],
        },
      ],
      notes: ["Access is limited to users with appropriate HRMS permissions."],
    },
    {
      title: "Dashboard Controls",
      description:
        "Use the available filters and controls to view and interact with shift data.",
      sections: [
        {
          title: "Available Options",
          icon: <FaFilter />,
          items: [
            "<strong>Show Entries</strong>: Select number of entries to view per page from a dropdown.",
            "<strong>Previous Week</strong>: View shift data for the previous week.",
            "<strong>Next Week</strong>: View shift data for the upcoming week.",
            "<strong>Search</strong>: Manually enter text to search for employees or shift details.",
            "<strong>Clear</strong>: Reset all filters and search input.",
          ],
        },
      ],
      notes: [
        "You can <strong>only manually enter</strong> input in the <strong>'Search'</strong> field.",
        "All other inputs are selected from dropdowns or via navigation buttons.",
      ],
    },
    {
      title: "View Shift Records",
      description:
        "Once filters are applied, the dashboard displays shift schedules for employees.",
      sections: [
        {
          title: "Shift Table",
          icon: <FaTable />,
          items: [
            "Displays employee names, assigned shifts, and scheduled dates.",
            "Supports week-wise navigation and entry selection.",
          ],
        },
      ],
      notes: [
        "Ensure to use the 'Previous' and 'Next Week' buttons to explore historical or future shifts.",
      ],
    },
  ],

  // Employee List
  "Add Employee": [
    { accesspath: "Add Employee" },
    {
      title: "Navigate to Add Employee",
      description:
        "Use this form to add a new employee to the HRMS system. Follow the instructions to enter accurate employee details.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Manager (HRMS)'</strong>",
            "Click on <strong>'Employee List'</strong>",
            "Click on <strong>'Add Employee'</strong>",
          ],
        },
      ],
      notes: ["Only authorized users can add new employees to the system."],
    },
    {
      title: "Employee Form Fields",
      description: "Complete the required fields in the employee form:",
      sections: [
        {
          title: "Field Details",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>
                      Auto-generated (My Office → Setup → Numbering)
                    </TableCell>
                    <TableCell>Auto-generated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PAN Number</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email ID</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alternate Contact Number</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emp Department</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emp Grade</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date of Joining</TableCell>
                    <TableCell>Calendar Picker</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marital Status</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DOB</TableCell>
                    <TableCell>Calendar Picker</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Address</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pin Code</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address Proof Govt ID Number</TableCell>
                    <TableCell>Text (e.g., Aadhaar)</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Personal Email ID</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EMP Manager</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HR Manager</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HR Coordinator/Contact Details</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Probation/Training Period (Months)</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Joining Date</TableCell>
                    <TableCell>Calendar Picker</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No. of Leaves During Training Period</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Employee Name</strong>, <strong>Email ID</strong>, <strong>Employee Address</strong>, and <strong>Address Proof Govt ID Number</strong> are mandatory fields.",
        "Employee ID is auto-generated via My Office → Setup → Numbering.",
      ],
    },
    {
      title: "Submit the Employee Details",
      description: "Once the form is filled out:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Ensure all <strong>required fields</strong> are completed.",
            "Click <strong>'Submit'</strong> to save the employee details.",
          ],
        },
      ],
      notes: [
        "After submission, the new employee will be listed under the Employee List.",
      ],
    },
    {
      title: "Back Navigation",
      description:
        "You can return to the previous screen without saving changes.",
      sections: [
        {
          title: "Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back'</strong> to return to the <strong>'Employee List'</strong> screen.",
          ],
        },
      ],
      notes: [
        "Unsaved modifications will be lost upon navigating back.",
        "Ensure to save the form if you wish to retain the entered data before going back.",
      ],
    },
  ],

  // PAYROLL HRMS
  "Salary Structure Setup": [
    { accesspath: "Salary Structure Setup" },
    {
      title: "Navigate to Salary Structure Setup",
      description:
        "Follow this path to access the salary structure based on grade:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'Salary Structure'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to access salary structure setup",
      ],
    },
    {
      title: "View Salary Structure List",
      description:
        "You can view a list of all salary structures by grade and take further actions:",
      sections: [
        {
          title: "Available Actions",
          icon: <FaListUl />,
          items: [
            "View <strong>list of salary structures</strong> by grade",
            "Click <strong>'View Structure'</strong> to see specific grade details",
            "Click <strong>'Update'</strong> to modify the salary structure",
          ],
        },
      ],
      notes: [
        "Ensure proper grade selection to avoid data mismatch",
        "Export file is in Excel format (.xls)",
        "You can also <strong>upload required documents</strong> for Salary Structure grade setup",
      ],
    },
    {
      title: "Update Salary Structure",
      description: "Update existing salary structure fields carefully:",
      sections: [
        {
          title: "Update Guidelines",
          icon: <FaEdit />,
          items: [
            "Click on <strong>'Update'</strong> button next to a grade",
            "Modify fields like <strong>Basic, HRA, Allowances</strong> as needed",
            "Validate and <strong>Save</strong> the changes",
          ],
        },
      ],
      notes: [
        "Changes will reflect immediately after saving",
        "Ensure compliance with internal HR policies before making updates",
      ],
    },
  ],

  "Add Salary Structure": [
    { accesspath: "Add Salary Structure" },
    {
      title: "Navigate to Add Salary Structure",
      description:
        "Follow this path to create a new salary structure based on employee grade:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'Salary Structure'</strong>",
            "Click on <strong>'Add Salary Structure'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the HR system to create a new salary structure",
      ],
    },
    {
      title: "Enter Salary Structure Details",
      description:
        "Fill out the required information to define the new structure:",
      sections: [
        {
          title: "Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Employee Grade</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Required</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Field</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Employee Grade must be selected before saving",
        "Remarks can help clarify the purpose or context of this structure",
      ],
    },
    {
      title: "Save the Structure",
      description:
        "After filling out the fields, save the new salary structure:",
      sections: [
        {
          title: "Final Steps",
          icon: <FaPaperPlane />,
          items: [
            "Click the <strong>'Save'</strong> button",
            "You will be redirected back to the <strong>'Salary Structure List'</strong> view",
          ],
        },
      ],
      notes: [
        "The new structure will appear under the relevant grade in the structure list",
      ],
    },
  ],

  "Add Salary Groups": [
    { accesspath: "Update Salary Structure (Add Salary Groups)" },
    {
      title: "Navigate to Add Salary Group",
      description:
        "Follow the steps below to add a new salary group under an existing salary structure:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'Salary Structure'</strong>",
            "Click on <strong>'New Salary Group'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure the correct employee grade is selected before adding the salary group.",
      ],
    },
    {
      title: "Salary Group Entry Form",
      description:
        "Fill out the following fields to define a new salary group:",
      sections: [
        {
          title: "Salary Group Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name of the Salary Component</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Grade</TableCell>
                    <TableCell>Dropdown (Autofill)</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salary Group</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Calculation Method</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fixed/Percentage Value</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payment Frequency</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sequence No</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["Make sure all required fields are filled correctly."],
    },
    {
      title: "Submit Salary Group",
      description: "Complete the setup by saving the new salary group:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Submit'</strong> to add the new salary group",
            "The new salary group will reflect under <strong>Salary Structure</strong>",
          ],
        },
      ],
      notes: [
        "Ensure no duplicate salary component names for the same grade.",
        "The updated structure will be available in the <strong>Salary Structure List</strong>.",
      ],
    },
    {
      title: "Cancel Operation",
      description: "Exit the process without saving changes:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Cancel'</strong> or use the back option to return to the View Salary Structure.",
          ],
        },
      ],
      notes: ["Unsaved changes will be discarded if you cancel the process."],
    },
  ],

  "Update Salary Groups": [
    { accesspath: "Update Salary Structure (Update Salary Groups)" },
    {
      title: "Navigate to Update Salary Group",
      description:
        "Follow the steps below to update an existing salary group under a salary structure:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'Salary Structure'</strong>",
            "Click on <strong>'Update'</strong>",
            "Click on <strong>'Update'</strong> next to the salary group you want to update",
          ],
        },
      ],
      notes: [
        "Make sure the salary group you want to update is selected before proceeding.",
      ],
    },
    {
      title: "Salary Group Update Form",
      description:
        "Fill out the following fields to update the existing salary group:",
      sections: [
        {
          title: "Salary Group Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name of the Salary Component</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Grade</TableCell>
                    <TableCell>Dropdown (Autofill)</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salary Group</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Calculation Method</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fixed/Percentage Value</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payment Frequency</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sequence No</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Make sure all required fields are filled correctly.",
        "Sequence number determines the order in which salary components are applied.",
      ],
    },
    {
      title: "Submit Salary Group Update",
      description:
        "Complete the update by saving the changes to the salary group:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Save'</strong> to update the salary group",
            "The updated salary group will reflect under <strong>Salary Structure</strong>",
          ],
        },
      ],
      notes: [
        "Ensure no duplicate salary component names for the same grade.",
        "The updated structure will be available in the <strong>Salary Structure List</strong>.",
      ],
    },
    {
      title: "Cancel Operation",
      description: "Exit the process without saving changes:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Cancel'</strong> or use the back option to return to the View Salary Structure.",
          ],
        },
      ],
      notes: ["Unsaved changes will be discarded if you cancel the process."],
    },
  ],

  "View Provident Fund": [
    { accesspath: "View Provident Fund" },
    {
      title: "View Provident Fund Parameters",
      description:
        "This page allows you to view, add, and update Provident Fund parameters. Follow the steps below to manage PF parameters:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'PF Parameter'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure you have the necessary permissions to view or update Provident Fund parameters.",
      ],
    },
    {
      title: "PF Parameter Overview",
      description:
        "This section displays the list of Provident Fund parameters set up in the system.",
      sections: [
        {
          title: "PF Parameter List",
          icon: <FaList />,
          items: [
            "View a list of all existing PF parameters",
            "Each parameter has options for <strong>'Update'</strong> and <strong>'View'</strong>.",
          ],
        },
      ],
      notes: [
        "Click <strong>'Update'</strong> to modify an existing PF parameter.",
        "Use the <strong>'Add PF Parameter'</strong> button to create a new PF parameter.",
      ],
    },
    {
      title: "Create a New PF Parameter",
      description: "To create a new PF parameter, follow the steps below:",
      sections: [
        {
          title: "Add PF Parameter",
          icon: <FaPlus />,
          items: [
            "Click the <strong>'Add PF Parameter'</strong> button",
            "Fill out the required fields to create a new PF parameter",
            "Save the new parameter to the system",
          ],
        },
      ],
      notes: [
        "Ensure that all necessary information is filled out before saving.",
        "Verify the details to avoid duplication of PF parameters.",
      ],
    },
    {
      title: "Update PF Parameter",
      description: "To update an existing PF parameter, follow these steps:",
      sections: [
        {
          title: "Update Existing PF Parameter",
          icon: <FaEdit />,
          items: [
            "Click the <strong>'Update'</strong> button next to the PF parameter you want to modify",
            "Make the necessary changes to the selected parameter",
            "Save the updates to the system",
          ],
        },
      ],
      notes: [
        "Ensure the updated PF parameter is correct before saving.",
        "The system will show a confirmation message once the update is successful.",
      ],
    },
    {
      title: "Export PF Parameters",
      description:
        "You can export the list of PF parameters in an XLS file for external use:",
      sections: [
        {
          title: "Export to XLS",
          icon: <FaFileExcel />,
          items: [
            "Click the <strong>'XLS file'</strong> button to download the PF parameters in an XLS format",
            "The XLS file will contain all current PF parameters for your reference.",
          ],
        },
      ],
      notes: [
        "Ensure that your browser allows file downloads before exporting.",
        "The XLS export includes all visible parameters listed on the page.",
      ],
    },
  ],
  "Provident Fund Setup (Add)": [
    { accesspath: "Provident Fund Setup(Add)" },
    {
      title: "Navigate to Add Provident Fund Parameter",
      description:
        "Follow the steps below to create a new Provident Fund (PF) parameter entry:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'PF Parameter'</strong>",
            "Click on <strong>'Add PF Parameter'</strong>",
          ],
        },
      ],
      notes: [
        "Make sure you have appropriate permissions to access PF Parameter setup.",
      ],
    },
    {
      title: "PF Parameter Entry Form",
      description:
        "Fill out the following fields to configure a new PF parameter:",
      sections: [
        {
          title: "PF Setup Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Salary Component</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Applicable</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable Amount Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Rate</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employer PF Amount Limit</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EPS Rate</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PF Admin Charge %</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EDLI Contribution %</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EPS Amount Limit</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EDLI Contribution Limit</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["Double-check all numeric values for accuracy."],
    },
    {
      title: "Submit PF Parameter",
      description: "Complete the setup by saving the new PF parameter:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Save'</strong> to add the new PF parameter",
            "A <strong>confirmation message</strong> will appear after successful submission",
            "The new parameter will now reflect in the <strong>PF Parameter List</strong>",
          ],
        },
      ],
      notes: [
        "Avoid creating duplicate PF parameters with the same salary component.",
        "Ensure all mandatory fields are properly filled before saving.",
      ],
    },
    {
      title: "Cancel Operation",
      description: "Exit the setup process without saving changes:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Cancel'</strong> or use the back option to return to the PF Parameter Lists",
          ],
        },
      ],
      notes: ["All unsaved data will be lost if the operation is cancelled."],
    },
  ],

  "Provident Fund Setup (Update)": [
    {
      accesspath:
        "Payroll (HRMS) --> Payroll Setup --> PF Parameter --> Update",
    },
    {
      title: "Navigate to Update Provident Fund Parameter",
      description:
        "Use the following steps to modify an existing Provident Fund (PF) parameter:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'PF Parameter'</strong>",
            "Click on <strong>'Update'</strong> beside the parameter you want to modify",
          ],
        },
      ],
      notes: [
        "Ensure you're editing the correct PF parameter before saving any changes.",
      ],
    },
    {
      title: "Update PF Parameter Form",
      description:
        "Edit the following fields to update the PF parameter details:",
      sections: [
        {
          title: "PF Parameter Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Salary Component</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Applicable</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable Amount Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Rate</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employer PF Amount Limit</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EPS Rate</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PF Admin Charge %</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EDLI Contribution %</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EPS Amount Limit</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>EDLI Contribution Limit</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields marked 'Required' must be properly filled before updating.",
      ],
    },
    {
      title: "Submit Updated PF Parameter",
      description: "Save the changes after updating the required details:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Update'</strong> to save changes",
            "A <strong>confirmation message</strong> will appear once updated",
            "The changes will be reflected in the <strong>PF Parameter List</strong>",
          ],
        },
      ],
      notes: [
        "Ensure no duplicate salary components are used when updating.",
        "Accurate values must be reviewed before submission.",
      ],
    },
    {
      title: "Cancel Update",
      description: "Discard changes if you do not want to proceed:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Cancel'</strong> or use the back option to return to the PF Parameter Lists",
          ],
        },
      ],
      notes: ["All modifications will be lost if the update is cancelled."],
    },
  ],

  "View Gratuity List": [
    { accesspath: "Payroll (HRMS) --> Payroll Setup --> Gratuity Parameter" },
    {
      title: "Navigate to Gratuity List",
      description:
        "This screen allows you to view, create, and update Gratuity Parameters.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'Gratuity Parameter'</strong>",
          ],
        },
      ],
      notes: [
        "This section lists all the configured Gratuity parameters and provides options to add or update them.",
      ],
    },
    {
      title: "Gratuity List Interface",
      description:
        "The following actions and components are available on the Gratuity List page:",
      sections: [
        {
          title: "Screen Elements",
          icon: <FaEdit />,
          items: [
            "<strong>List of Gratuity Parameters</strong> – Displays existing entries",
            "<strong>Add Gratuity Parameter</strong> – Opens the form to add a new gratuity parameter",
            "<strong>Update</strong> – Allows you to modify an existing parameter",
            "<strong>XLS File</strong> – Exports the gratuity parameters list to an Excel file",
          ],
        },
      ],
      notes: [
        "Ensure proper authorization before adding or updating any gratuity parameters.",
      ],
    },
  ],
  "Gratuity Setup": [
    {
      accesspath:
        "Payroll (HRMS) --> Payroll Setup --> Gratuity Parameter --> Add Gratuity Parameter",
    },
    {
      title: "Navigate to Add Gratuity Parameter",
      description:
        "Follow the steps below to set up a new gratuity parameter in the system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'Gratuity Parameter'</strong>",
            "Click on <strong>'Add Gratuity Parameter'</strong>",
          ],
        },
      ],
      notes: [],
    },
    {
      title: "Gratuity Entry Form",
      description:
        "Fill out the following fields to configure a gratuity parameter:",
      sections: [
        {
          title: "Gratuity Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Salary Component</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Applicable</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable Amount Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Minimum Years for Gratuity Eligibility
                    </TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Paid Days Per Month</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No of Working Days in a Month</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Make sure all required fields are filled in correctly to avoid validation errors.",
      ],
    },
    {
      title: "Submit Gratuity Parameter",
      description:
        "Complete the configuration by submitting the new gratuity parameter:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Save'</strong> to add the new gratuity parameter",
            "A <strong>confirmation message</strong> will appear upon successful save",
            "The new entry will reflect in the <strong>Gratuity Parameter List</strong>",
          ],
        },
      ],
      notes: [
        "Avoid duplicate salary component setup for the same eligibility rules.",
      ],
    },
    {
      title: "Cancel Operation",
      description: "Exit the form without saving the changes:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Cancel'</strong> or use the back button to return to Gratuity Parameter Setup.",
          ],
        },
      ],
      notes: ["Unsaved data will be lost if the operation is canceled."],
    },
  ],

  "Update Gratuity": [
    {
      accesspath:
        "Payroll (HRMS) --> Payroll Setup --> Gratuity Parameter --> Update",
    },
    {
      title: "Navigate to Update Gratuity Parameter",
      description:
        "Follow the path below to modify an existing gratuity configuration:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Choose <strong>'Gratuity Parameter'</strong>",
            "Click on <strong>'Update'</strong> for the desired record",
          ],
        },
      ],
      notes: [
        "Ensure you are editing the correct record to avoid affecting other payroll rules.",
      ],
    },
    {
      title: "Update Gratuity Form",
      description:
        "Modify the required gratuity details using the form fields below:",
      sections: [
        {
          title: "Gratuity Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Salary Component</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Applicable</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable Amount Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Minimum Years for Gratuity Eligibility
                    </TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Paid Days Per Month</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No of Working Days in a Month</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Field updates will override existing values once submitted.",
        "Double-check the effective date and eligibility period before saving changes.",
      ],
    },
    {
      title: "Submit Updated Gratuity",
      description: "Apply your modifications and update the gratuity record:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Update'</strong> to save changes",
            "A <strong>success message</strong> will appear after a successful update",
            "The updated details will reflect in the <strong>Gratuity Parameter List</strong>",
          ],
        },
      ],
      notes: [
        "Ensure no concurrent updates are being performed on the same record by another user.",
      ],
    },
  ],

  "View Employees State Insurance List": [
    { accesspath: "Payroll (HRMS) --> Payroll Setup --> ESI Parameter" },
    {
      title: "Navigate to View ESI Parameters",
      description:
        "Follow the steps below to access and view all Employees State Insurance (ESI) parameters configured in the system:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Select <strong>'ESI Parameter'</strong>",
          ],
        },
      ],
      notes: [
        "This screen displays all ESI configurations defined for payroll calculations.",
      ],
    },
    {
      title: "ESI Parameter List Screen",
      description:
        "This screen lists all existing ESI parameters and provides quick actions for management:",
      sections: [
        {
          title: "Available Options",
          icon: <FaList />,
          items: [
            "<strong>List of ESI Parameters</strong>: Displays all saved ESI entries",
            "<strong>Add ESI Parameter</strong> button: Opens the form to create a new ESI rule",
            "<strong>Update</strong> button: Allows editing of an existing ESI rule",
            "<strong>XLS File</strong> button: Exports the current list to Excel format",
          ],
        },
      ],
      notes: [
        "Ensure only authorized personnel manage ESI entries, as they impact statutory deductions.",
      ],
    },
    {
      title: "Submission Logic",
      description:
        "This screen is purely for viewing and initiating add/update operations; no direct data entry is performed here.",
      sections: [],
    },
  ],

  "Employees State Insurance Setup": [
    {
      accesspath:
        "Payroll (HRMS) --> Payroll Setup --> ESI Parameter --> Add ESI Parameter",
    },
    {
      title: "Navigate to Add ESI Parameter",
      description:
        "Follow the steps below to add a new Employees State Insurance (ESI) parameter for payroll deductions:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Payroll Setup'</strong>",
            "Select <strong>'ESI Parameter'</strong>",
            "Click on <strong>'Add ESI Parameter'</strong>",
          ],
        },
      ],
      notes: [
        "Make sure you're authorized to configure statutory deduction components.",
      ],
    },
    {
      title: "ESI Parameter Entry Form",
      description:
        "Fill in the fields below to define the ESI setup for applicable employees:",
      sections: [
        {
          title: "ESI Setup Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Salary Component</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is applicable</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable amt type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee rate</TableCell>
                    <TableCell>Numeric Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employer rate</TableCell>
                    <TableCell>Numeric Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ESI Amount Limit</TableCell>
                    <TableCell>Numeric Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
    },
    {
      title: "Submit ESI Parameter",
      description: "Save the ESI setup once all required details are entered:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Save'</strong> to store the ESI setup.",
            "A <strong>confirmation message</strong> will appear after successful save.",
            "The new ESI parameter will be visible in the <strong>ESI Parameter List</strong>.",
          ],
        },
      ],
      notes: ["Avoid duplicate ESI setups for the same salary component."],
    },
    {
      title: "Cancel Operation",
      description: "Exit the add form without saving changes:",
      sections: [
        {
          title: "Cancel/Back Option",
          icon: <FaArrowLeft />,
          items: [
            "Click <strong>'Cancel'</strong> or use the back button to return to the ESI Parameter List.",
          ],
        },
      ],
      notes: ["Any unsaved input will be discarded."],
    },
  ],

  "View Tax Setup (TDS/PT) List": [
    { accesspath: "Payroll (HRMS) --> Payroll Setup --> Tax Setup (TDS/PT)" },
    {
      title: "View Tax Setup (TDS/PT) Configuration",
      description:
        "This module allows users to view and manage TDS (Tax Deducted at Source) and PT (Professional Tax) setup configurations within the payroll system.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Navigate to <strong>'Payroll Setup'</strong>",
            "Click on <strong>'Tax Setup (TDS/PT)'</strong>",
          ],
        },
      ],
      notes: [
        "Only users with appropriate permissions can view or modify tax setups.",
      ],
    },
    {
      title: "Available Actions",
      description:
        "The following actions are available on the Tax Setup (TDS/PT) list view screen:",
      sections: [
        {
          title: "Toolbar Actions",
          icon: <FaEdit />,
          items: [
            "<strong>'List of Tax Setup (TDS/PT)'</strong>: Displays all TDS and PT tax configurations that have been created.",
            "<strong>'Add Tax Setup (TDS/PT)'</strong>: Opens the form to add a new TDS/PT parameter setup.",
            "<strong>'Update'</strong>: Opens the selected TDS/PT parameter for editing.",
            "<strong>'XLS File'</strong>: Exports the list of parameters in XLS format.",
          ],
        },
      ],
      notes: [
        "Ensure tax parameters align with government-mandated thresholds and rules.",
      ],
    },
    {
      title: "No Data Entry on This Screen",
      description:
        "This view is for monitoring and navigation only; no data entry is done directly on this screen.",
      sections: [
        {
          title: "Read-Only Access",
          icon: <FaEye />,
          items: [
            "Users can view existing records and navigate to add or update screens from here.",
          ],
        },
      ],
    },
  ],

  "Tax Setup (TDS/PT) Setup": [
    {
      accesspath:
        "Payroll (HRMS) --> Payroll Setup --> Tax Setup --> Add Tax Setup (TDS / Professional Tax)",
    },
    {
      title: "Navigate to Tax Setup (TDS/PT)",
      description:
        "This section lets you configure TDS or Professional Tax settings based on tax type, applicability, and state.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Payroll (HRMS)'</strong>",
            "Select <strong>'Payroll Setup'</strong>",
            "Click on <strong>'Tax Setup'</strong>",
            "Then select <strong>'Add Tax Setup (TDS/PT)'</strong>",
          ],
        },
      ],
    },
    {
      title: "Tax Setup Form Fields",
      description: "Fill in the form with tax-related parameters as required:",
      sections: [
        {
          title: "Field Descriptions",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation/Rule</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Tax Rate Code</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Minimum Taxable Amount</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Standard Deduction Amount</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Slab Rate</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>State Code</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Upload</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Ensure the tax setup aligns with regional and national legal compliance.",
        "Each Tax Rate Code must be unique.",
        "You can also <strong> upload  </strong> for Tax Setup (TDS/PT)",
      ],
    },
    {
      title: "Submission Process",
      description: "After filling out all fields, follow the below steps:",
      sections: [
        {
          title: "Save and Validate",
          icon: <FaPaperPlane />,
          items: [
            "Click on the <strong>'Submit'</strong> button.",
            "System will validate the inputs and save the record.",
          ],
        },
      ],
    },
    {
      title: "Cancel Setup",
      description: "To exit without saving changes:",
      sections: [
        {
          title: "Cancel Logic",
          icon: <FaTimesCircle />,
          items: [
            "Click on the <strong>'Back'</strong> button.",
            "You will be redirected back to the <strong>'Tax Setup (TDS/PT) List'</strong>.",
          ],
        },
      ],
    },
  ],

  "Tax Setup (TDS/PT) Update": [
    { accesspath: "Payroll (HRMS) --> Payroll Setup --> Tax Setup --> Update" },
    {
      title: "Update Tax Setup (TDS/PT)",
      description:
        "This module allows users to update an existing TDS (Tax Deducted at Source) or Professional Tax configuration based on changing tax rules or correction of data.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Payroll (HRMS)'</strong>",
            "Select <strong>'Payroll Setup'</strong>",
            "Click on <strong>'Tax Setup'</strong>",
            "Click <strong>'Update'</strong> on the record you want to modify",
          ],
        },
      ],
    },
    {
      title: "Form Fields for Update",
      description:
        "Make necessary changes in the following fields to update tax settings:",
      sections: [
        {
          title: "Field Descriptions",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation/Rule</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Tax Rate Code</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Type</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Minimum Taxable Amount</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Standard Deduction Amount</TableCell>
                    <TableCell>Numeric</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Slab Rate</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>State Code</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Upload</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Make sure the updated data does not conflict with existing tax configurations.",
        "Retain a copy of the previous configuration before applying changes.",
      ],
    },
    {
      title: "Submission Process",
      description: "After making the updates, follow these steps:",
      sections: [
        {
          title: "Save and Confirm Changes",
          icon: <FaPaperPlane />,
          items: [
            "Click the <strong>'Submit'</strong> button to apply changes.",
            "System will validate the updated data and overwrite the existing configuration.",
          ],
        },
      ],
    },
    {
      title: "Cancel Update",
      description: "To cancel the update and return to the previous screen:",
      sections: [
        {
          title: "Cancel Logic",
          icon: <FaTimesCircle />,
          items: [
            "Click the <strong>'Back'</strong> button to discard changes.",
            "You will be redirected to the <strong>Tax Setup (TDS/PT) List</strong> screen.",
          ],
        },
      ],
    },
  ],
  "Add New Tax Slab": [
    {
      accesspath:
        "Payroll (HRMS) --> Payroll Setup --> Tax Setup --> Update (Scroll Down) --> Add New Tax Slab",
    },
    {
      title: "Add New Tax Slab",
      description:
        "This section allows users to define individual tax slabs under a specific TDS/PT configuration. Slabs define the range-wise tax amount applicable to employees based on their taxable income.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Payroll (HRMS)'</strong>",
            "Navigate to <strong>'Payroll Setup'</strong>",
            "Select <strong>'Tax Setup'</strong>",
            "Click <strong>'Update'</strong> on the applicable Tax Setup",
            "Scroll down to <strong>'Add New Tax Slab'</strong>",
          ],
        },
      ],
    },
    {
      title: "Form Fields",
      description: "Enter the tax slab details using the following fields:",
      sections: [
        {
          title: "Field Descriptions",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation/Rule</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Slab From Amount (INR)</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Slab To Amount (INR)</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Amount</TableCell>
                    <TableCell>Number Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Ensure that the 'From' and 'To' ranges do not overlap with existing slabs.",
        "The Tax Amount is a fixed value applied for income falling within the specified slab range.",
      ],
    },
    {
      title: "Submission Process",
      description: "Once the slab details are filled in, follow these steps:",
      sections: [
        {
          title: "Save Slab Entry",
          icon: <FaPaperPlane />,
          items: [
            "Click the <strong>'Add'</strong> or <strong>'Submit'</strong> button.",
            "System will validate the input and append the slab to the list of existing slabs.",
          ],
        },
      ],
    },
    {
      title: "Cancel Action",
      description: "To cancel slab creation without saving:",
      sections: [
        {
          title: "Cancel Logic",
          icon: <FaTimesCircle />,
          items: [
            "Click on the <strong>'Back'</strong> button.",
            "You will be redirected back to the <strong>'Tax Setup(TDS/PT)List'</strong>.",
          ],
        },
      ],
    },
  ],

  // Payroll-hrms
  "Variable Pay": [
    { accesspath: "Payroll (HRMS) --> Variable Pay" },
    {
      title: "Navigate to Variable Pay",
      description:
        "Follow the steps below to view or fetch Variable Pay records for employees:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Variable Pay'</strong>",
          ],
        },
      ],
      notes: [
        "You can only select the date manually. Other inputs are restricted to dropdown or search functionality.",
      ],
    },
    {
      title: "Variable Pay Entry & Filters",
      description:
        "Use the filters to search and navigate variable pay records:",
      sections: [
        {
          title: "Variable Pay Filters",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation/Rule</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required (Selectable only)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Grades</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Executive Management</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Use the dropdowns to refine your results based on grade and management level.",
      ],
    },
    {
      title: "Search & Navigation Actions",
      description:
        "Perform search and month-wise navigation of variable pay data:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Search'</strong> to fetch records for selected filters.",
            "Use <strong>'Previous Month'</strong> and <strong>'Next Month'</strong> buttons to scroll through months.",
          ],
        },
      ],
      notes: [
        "Ensure that valid filters are applied before searching to avoid empty results.",
      ],
    },
  ],

  "Additional Pay": [
    { accesspath: "Payroll (HRMS) --> Additional Pay" },
    {
      title: "Navigate to Additional Pay",
      description:
        "Follow the steps below to view or fetch Additional Pay records for employees:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Additional Pay'</strong>",
          ],
        },
      ],
      notes: [
        "Only the date can be manually entered. Other fields are restricted to dropdown or search functionality.",
      ],
    },
    {
      title: "Additional Pay Entry & Filters",
      description:
        "Use the filters to search and navigate additional pay records:",
      sections: [
        {
          title: "Additional Pay Filters",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation/Rule</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required (Selectable only)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Grades</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Executive Management</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Use the dropdowns to refine your results based on grade and management level.",
      ],
    },
    {
      title: "Search & Navigation Actions",
      description:
        "Perform search and month-wise navigation of additional pay data:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Search'</strong> to fetch records for selected filters.",
            "Use <strong>'Previous Month'</strong> and <strong>'Next Month'</strong> buttons to scroll through months.",
          ],
        },
      ],
      notes: [
        "Ensure that valid filters are applied before searching to avoid empty results.",
      ],
    },
  ],

  "Generate Salary": [
    { accesspath: "Payroll (HRMS) --> Generate Salary" },
    {
      title: "Navigate to Generate Salary",
      description:
        "Follow the steps below to view or fetch salary records for employees:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Generate Salary'</strong>",
          ],
        },
      ],
      notes: [
        "Only the date can be manually entered. Other fields are restricted to dropdown or search functionality.",
      ],
    },
    {
      title: "Generate Salary Entry & Filters",
      description: "Use the filters to search and navigate salary records:",
      sections: [
        {
          title: "Generate Salary Filters",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation/Rule</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required (Selectable only)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Grades</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Executive Management</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Use the dropdowns to refine your results based on grade and management level.",
      ],
    },
    {
      title: "Search & Navigation Actions",
      description: "Perform search and month-wise navigation of salary data:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Search'</strong> to fetch records for selected filters.",
            "Use <strong>'Previous Month'</strong> and <strong>'Next Month'</strong> buttons to scroll through months.",
          ],
        },
      ],
      notes: [
        "Ensure that valid filters are applied before searching to avoid empty results.",
      ],
    },
  ],

  "Post Salary Payable": [
    { accesspath: "Payroll (HRMS) --> Post Salary Payable" },
    {
      title: "Navigate to Post Salary Payable",
      description: "Follow the steps below to post salary payable records:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Payroll (HRMS)'</strong>",
            "Click on <strong>'Post Salary Payable'</strong>",
          ],
        },
      ],
      notes: [
        "Only the date can be manually entered. Other fields are restricted to dropdown or search functionality.",
      ],
    },
    {
      title: "Post Salary Payable Entry & Filters",
      description:
        "Use the filters to search and navigate salary payable records:",
      sections: [
        {
          title: "Post Salary Payable Filters",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation/Rule</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required (Selectable only)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Grades</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Executive Management</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Use the dropdowns to refine your results based on grade and management level.",
      ],
    },
    {
      title: "Search & Navigation Actions",
      description:
        "Perform search and month-wise navigation of salary payable data:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Click <strong>'Search'</strong> to fetch records for selected filters.",
            "Use <strong>'Previous Month'</strong> and <strong>'Next Month'</strong> buttons to scroll through months.",
          ],
        },
      ],
      notes: [
        "Ensure that valid filters are applied before searching to avoid empty results.",
      ],
    },
  ],

  // Claim System
  "Add Expense Category": [
    {
      accesspath:
        "Login --> General --> Claim System --> Claim Setup --> Expense Category --> Add Expense Category",
    },
    {
      title: "Add Expense Category",
      description:
        "This module allows users to configure new expense categories under the claim system, specifying applicable tax details, ledger, and policy rules for each category.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Claim System'</strong>",
            "Click on <strong>'Claim Setup'</strong>",
            "Go to <strong>'Expense Category'</strong>",
            "Click <strong>'Add Expense Category'</strong>",
          ],
        },
      ],
    },
    {
      title: "Form Fields",
      description:
        "Fill in the following fields to define a new Expense Category:",
      sections: [
        {
          title: "Field Descriptions",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Applicable</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicable Tax Rate</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TDS Threshold Limit</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TDS Rate for Service</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Category Alias</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Expense Ledger</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Exclude for Expense Claim?</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is Bill Required to be Submitted?</TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Upload</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Make sure the expense category name is unique and descriptive.",
        "You can upload supporting documents such as tax policies, eligibility proofs, or related attachments if needed.",
      ],
    },
    {
      title: "Submission Process",
      description: "To save the new expense category configuration:",
      sections: [
        {
          title: "Submit Form",
          icon: <FaPaperPlane />,
          items: [
            "After filling in all required fields, click <strong>'Submit'</strong>.",
            "The system will validate and store the new expense category settings.",
          ],
        },
      ],
    },
    {
      title: "Cancel Setup",
      description: "To cancel without saving:",
      sections: [
        {
          title: "Cancel Action",
          icon: <FaTimesCircle />,
          items: [
            "Click the <strong>'Cancel/Expense Category List'</strong> button to discard changes.",
            "You will be redirected back to the <strong>Expense Category List</strong> screen.",
          ],
        },
      ],
    },
  ],

  "Add Expense Item": [
    {
      accesspath:
        "Login --> General --> Claim System --> Claim Setup --> Expense Item --> Add Expense Item",
    },
    {
      title: "Add Expense Item",
      description:
        "This module allows users to add a new expense item under an existing expense category. Each item can have a defined cost, description, and optional document/image upload.",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Claim System'</strong>",
            "Click on <strong>'Claim Setup'</strong>",
            "Go to <strong>'Expense Item'</strong>",
            "Click <strong>'Add Expense Item'</strong>",
          ],
        },
      ],
    },
    {
      title: "Form Fields",
      description: "Fill in the following fields to define a new Expense Item:",
      sections: [
        {
          title: "Field Descriptions",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service Code</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service Category</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service Cost</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Ensure the Service Code is unique and aligns with category policies.",
      ],
    },
    {
      title: "Submission Process",
      description: "To save the new expense item entry:",
      sections: [
        {
          title: "Submit Form",
          icon: <FaPaperPlane />,
          items: [
            "Complete all required fields and click <strong>'Submit'</strong>.",
            "The system will validate and save the expense item to the category list.",
          ],
        },
      ],
      notes: [
        "Image upload is optional but supported — you can upload relevant documentation or supporting visuals for the expense item, including data or proof if necessary.",
      ],
    },
    {
      title: "Cancel Setup",
      description: "To cancel the operation without saving:",
      sections: [
        {
          title: "Cancel Action",
          icon: <FaTimesCircle />,
          items: [
            "Click the <strong>'Back/'Expense Item List</strong> button.",
            "You will be redirected back to the <strong>Expense Item List</strong> screen.",
          ],
        },
      ],
    },
  ],

  "Claims Dashboard": [
    {
      accesspath: "Login --> General --> Claim System --> Claim Expenses",
    },
    {
      title: "Navigate to Claim Dashboard",
      description: "Follow this path to access the claim dashboard:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Click on <strong>'Claim System'</strong>",
            "Choose <strong>'Claim Expenses'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the Claim System to access <strong>'Claim Expenses'</strong>",
      ],
    },
    {
      title: "Claim Dashboard Filters and Data Entry",
      description: "Complete all required fields to filter claim data:",
      sections: [
        {
          title: "Filter Inputs",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search Employee</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Expense Item</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>All Status</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search</TableCell>
                    <TableCell>Button</TableCell>
                    <TableCell>Click to filter records</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Record Created</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required, No manual entry</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Order By</TableCell>
                    <TableCell>Dropdown (Ascending/Descending)</TableCell>
                    <TableCell>Required, Select sort order</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Ensure that all dropdown selections are made, no manual entry is allowed.",
      ],
    },
    {
      title: "Graphical Data Representation",
      description: "Visualize claim data through charts and graphs.",
      sections: [
        {
          title: "Data Visualization",
          icon: <FaChartPie />,
          items: [
            "Claim Status: Pie Chart",
            "Claim vs Approved Amount: Bar Graph",
          ],
        },
      ],
      notes: [
        "Use pie chart for claim status and bar graph for claim vs approved amount comparison.",
      ],
    },
    {
      title: "Clear and View Claim",
      description:
        "Users can clear filters or view specific claims from the dashboard.",
      sections: [
        {
          title: "Actions",
          icon: <FaTrash />,
          items: [
            "Click <strong>'Clear'</strong> to reset filters.",
            "Click <strong>'View Claim'</strong> to access detailed claim records.",
          ],
        },
      ],
      notes: [
        "Click 'Clear' to remove filters, click 'View Claim' for detailed records.",
      ],
    },
    {
      "title": "Download Claim List",
      "description": "Download the filtered claim list in your preferred format:",
      "sections": [
        {
          "title": "Download Options",
          "icon": <FaDownload />,
          "items": [
            "Click on the <strong>'Download'</strong> button to export claim data.",
            "Select the file format: <strong>PDF</strong> or <strong>Excel</strong>.",
            "Click <strong>'Download File'</strong> to save the claim list."
          ]
        }
      ],
      "notes": [
        "The downloaded file will contain all the claims listed based on the filters applied."
      ]
    }
  ],

  "Add New Claim": [
    {
      accesspath:
        "Login --> General --> Claim System --> Claim Expenses --> New claim",
    },
    {
      title: "Navigate to Claim Expenses",
      description: "Follow this path to access the 'Add New Claim' form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Claim System'</strong>",
            "Click on <strong>'Claim Expenses'</strong>",
            "Click on <strong>'New claim'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the system to <strong>add a new claim</strong>",
      ],
    },
    {
      title: "Claim Form Fields",
      description: "Fill in the mandatory fields to submit a new claim:",
      sections: [
        {
          title: "Form Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Expense Item</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required, No manual entry</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required, No manual entry</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Claimed Amount</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Expense Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      Required, Should match the date in the expense bill
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Expense Bill/Invoice File</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "You cannot enter anything manually for the 'Expense Item' and 'Project' fields — these should be selected from the dropdowns.",
        "All fields, except for 'Remarks' and 'Project', are mandatory.",
      ],
    },
    {
      title: "Submit Your Claim",
      description: "Final steps to submit your claim:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Complete</strong> all required fields and click <strong>'Submit'</strong>",
            "The system will validate and save the new claim details",
          ],
        },
      ],
      notes: [
        "Once submitted, the system will save the claim details and provide a confirmation.",
      ],
    },
    {
      title: "Cancel Setup",
      description: "To cancel the claim setup without saving:",
      sections: [
        {
          title: "Cancel Action",
          icon: <FaTimesCircle />,
          items: [
            "Click the <strong>'Cancel/Expense Claims'</strong> button.",
            "You will be redirected back to the <strong>Expense Claims</strong> list.",
          ],
        },
      ],
      notes: [
        "This will cancel the current claim setup without saving any information.",
      ],
    },
  ],

  "Employee Advances - Dashboard": [
  {
    accesspath: "Login --> General --> Claim System --> Employee Advances",
  },
  {
    title: "Navigate to Employee Advances Dashboard",
    description: "Follow this path to view and interact with the Employee Advances dashboard:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong> section",
          "Click on <strong>'Claim System'</strong>",
          "Select <strong>'Employee Advances'</strong>",
        ],
      },
    ],
    notes: [
      "<strong>Login</strong> to the System to access <strong>Employee Advances Dashboard</strong>",
    ],
  },
  {
    title: "Dashboard Filters and Data Entry",
    description: "Use the filters below to search and manage advance records:",
    sections: [
      {
        title: "Filter Inputs",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Search Lead</TableCell>
                  <TableCell>Search Box</TableCell>
                  <TableCell>Manual entry allowed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Record Created</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required, No manual entry</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Order By</TableCell>
                  <TableCell>Dropdown (Ascending/Descending)</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Search</TableCell>
                  <TableCell>Button</TableCell>
                  <TableCell>Click to filter records</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Clear</TableCell>
                  <TableCell>Button</TableCell>
                  <TableCell>Click to reset filters</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Only <strong>'Search Lead'</strong> field allows manual input. All others must be selected from dropdowns.",
    ],
  },
  {
    title: "Graphical Representation of Advance Data",
    description: "Visualize advance-related data using charts:",
    sections: [
      {
        title: "Charts & Graphs",
        icon: <FaChartPie />,
        items: [
          "Claim Status: Pie Chart",
          "Claim vs Approved Amount: Bar Graph",
        ],
      },
    ],
    notes: [
      "Use the graphs for visual analysis of advance claims and approvals.",
    ],
  },
],

  "New Advance": [
  {
    accesspath: "Login --> General --> Claim System --> Employee Advances --> New Advances",
  },
  {
    title: "Navigate to New Advance Form",
    description: "Follow this path to add a new employee advance:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong> section",
          "Click on <strong>'Claim System'</strong>",
          "Select <strong>'Employee Advances'</strong>",
          "Click on <strong>'New Advances'</strong>",
        ],
      },
    ],
    notes: [
      "<strong>Login</strong> to the System to access <strong>'New Advance'</strong> form.",
    ],
  },
  {
    title: "New Advance Entry Details",
    description: "Fill in the following fields to create a new advance request:",
    sections: [
      {
        title: "Advance Entry Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Advance Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Advance Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Advance Amount</TableCell>
                  <TableCell>Amount Input</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Repayment Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Installment Amount</TableCell>
                  <TableCell>Amount Input</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Text Area</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["All fields except <strong>Remarks</strong> are mandatory."],
  },
  {
    title: "Submit New Advance",
    description: "Once all required fields are filled, follow these steps to submit:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "<strong>Review</strong> all entered details carefully",
          "Click on <strong>'Submit'</strong> button",
        ],
      },
    ],
    notes: ["No supporting documents are required for submission."],
  },
  {
    title: "Employee Advance List",
    description: "View and track submitted advances in the list view:",
    sections: [
      {
        title: "Advance List Access",
        icon: <FaListAlt />,
        items: [
          "Navigate to <strong>'Employee Advances'</strong> from Right menu",
          "Click on <strong>'Employee Advance List'</strong> to view all entries",
        ],
      },
    ],
  },
],
"Approve Claims Dashboard": [
  {
    accesspath: "Login --> General --> Claim System --> Approve Claims",
  },
  {
    title: "Navigate to Approve Claims - Dashboard",
    description: "Follow this path to view and analyze submitted claims:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click <strong>'Claim System'</strong>",
          "Select <strong>'Approve Claims'</strong>",
        ],
      },
    ],
    notes: [
      "<strong>Login</strong> to the system to access the <strong>'Approve Claims - Dashboard'</strong>",
    ],
  },
  {
    title: "Dashboard Filters & Search",
    description: "Use filters and charts to review and manage claims effectively:",
    sections: [
      {
        title: "Filter & Search Options",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Selection required, no manual input</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Search Employee</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No manual input allowed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>All Expense Item</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No manual input allowed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>All Status</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No manual input allowed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Record Created</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional filter, dropdown only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Order By</TableCell>
                  <TableCell>Dropdown (Asc/Desc)</TableCell>
                  <TableCell>No manual input allowed</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "All filters are dropdown-based.",
      "No manual entry is permitted in any search/filter fields.",
    ],
  },
  {
    title: "Claim Summary Charts",
    description: "Visualize the claim performance data:",
    sections: [
      {
        title: "Graphical Insights",
        icon: <FaChartBar />,
        items: [
          "<strong>Claim Status</strong> - Displayed as Pie Chart.",
          "<strong>Claim vs Approved Amount</strong> - Displayed as Bar Graph.",
        ],
      },
    ],
    notes: ["Charts are dynamic based on filter selections."],
  },
  {
    title: "Action Buttons",
    description: "Use these to manage view and filter actions:",
    sections: [
      {
        title: "Available Buttons",
        icon: <FaTools />,
        items: [
          "<strong>Search</strong> – Apply filters and load claims.",
          "<strong>Clear</strong> – Reset all filters.",
          "<strong>View Claim</strong> – See detailed information for a selected claim.",
        ],
      },
    ],
  },
],

"New Approve Claim": [
  {
    accesspath: "Login --> General --> Claim System --> Approve Claims --> New Claim",
  },
  {
    title: "Navigate to Approve Claims - New Claim",
    description: "Follow this path to add a new claim for approval:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong> section",
          "Click on <strong>'Claim System'</strong>",
          "Select <strong>'Approve Claims'</strong>",
          "Choose <strong>'New Claim'</strong>",
        ],
      },
    ],
    notes: [
      "<strong>Login</strong> to the System to access the <strong>'Approve Claims'</strong> module",
    ],
  },
  {
    title: "New Claim Data Entry",
    description: "Fill in the details to submit a new expense claim for approval:",
    sections: [
      {
        title: "Claim Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Expense Item</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Claimed Amount</TableCell>
                  <TableCell>Amount Input</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expense Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expense Bill/Invoice</TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Text Area</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "<strong>Expense Date</strong> and the date in the bill must be the same.",
      "All fields are mandatory except <strong>Project</strong> and <strong>Remarks</strong>.",
    ],
  },
  {
    title: "Upload & Submit Claim",
    description: "Attach the invoice and complete the claim submission process:",
    sections: [
      {
        title: "Submission & Upload",
        icon: <FaPaperPlane />,
        items: [
          "Click <strong>'Upload'</strong> to attach your Expense Bill/Invoice.",
          "Click <strong>'Submit'</strong> to send the claim for approval.",
          "Wait for <strong>confirmation message</strong> after submission.",
        ],
      },
    ],
    notes: [
      "Ensure invoice file is uploaded before submission.",
      "Submitted claims will appear in the <strong>'Expense Claims'</strong> list.",
    ],
  },
  {
    title: "Download Claims",
    description: "Download the list of submitted claims for your reference:",
    sections: [
      {
        title: "Download Section",
        icon: <FaDownload />,
        items: [
          "Click on the <strong>'Download'</strong> button to export claims list in Excel or PDF format.",
        ],
      },
    ],
    notes: ["Only successfully submitted claims will be included in the download."],
  },
  {
    title: "Back Navigation",
    description: "Return to the Approve Claims main dashboard:",
    sections: [
      {
        title: "Go Back",
        icon: <FaArrowLeft />,
        items: [
          "Click on the <strong>'Back/Expense Claim'</strong> button to return to the <strong>'Expense Claims'</strong> dashboard.",
        ],
      },
    ],
    notes: ["Make sure to save any changes before navigating back."],
  },
],

"Settle Claims Dashboard": [
  {
    accesspath: "Login --> General --> Claim System --> Settle claims",
  },
  {
    title: "Navigate to Settle Claims - Dashboard",
    description: "Follow this path to access and process claim settlements:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Claim System'</strong>",
          "Select <strong>'Settle Claims'</strong> option",
        ],
      },
    ],
    notes: [
      "<strong>Login</strong> to the system to access the <strong>'Settle Claims - Dashboard'</strong>",
    ],
  },
  {
    title: "Settlement Filters & Inputs",
    description: "Fill in or select the appropriate data to process claim settlements:",
    sections: [
      {
        title: "Filter & Data Entry",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>All Employees</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required, no manual entry</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>All Grades</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required, no manual entry</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Claim Number</TableCell>
                  <TableCell>View Only</TableCell>
                  <TableCell>Auto-populated per employee selection</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Settlement Amt (INR)</TableCell>
                  <TableCell>Input Field</TableCell>
                  <TableCell>Enter amount to be settled</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Input Field</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Settle Now?</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Tick to initiate settlement</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>View File/Details</TableCell>
                  <TableCell>Button</TableCell>
                  <TableCell>Opens file or claim detail</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Manual entry is restricted for 'All Employees' and 'All Grades'.",
      "Claim number is auto-generated based on filters.",
    ],
  },
  {
    title: "Settlement Actions",
    description: "Actions available to manage and process settlement records:",
    sections: [
      {
        title: "Available Actions",
        icon: <FaTools />,
        items: [
          "<strong>Settle Now?</strong> – Tick the checkbox to confirm settlement.",
          "<strong>View File/Details</strong> – View detailed claim file or attachments.",
        ],
      },
    ],
  },
],

  // Emp Help And Requests
  "Employee Help Tickets Dashboard": [
    { accesspath: "Employee Help Tickets Dashboard" },
    {
      title: "Navigate to Help Dashboard",
      description:
        "Access the Employee Help Tickets Dashboard by following this path:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select  <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'Help Dashboard'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to access and manage employee help tickets from the dashboard view.",
      ],
    },
    {
      title: "Help Dashboard Interface",
      description:
        "The dashboard provides an overview of help requests and their statuses with filter options:",
      sections: [
        {
          title: "Help Dashboard Details",
          icon: <FaChartPie />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Search Type & Filter</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select a category to filter help requests
                    </TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search Query</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Enter keywords to search help tickets</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Status</TableCell>
                    <TableCell>Pie Chart</TableCell>
                    <TableCell>
                      Visual representation of request status (e.g., Open, In
                      Progress, Closed)
                    </TableCell>
                    <TableCell>Auto-generated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Category Distribution</TableCell>
                    <TableCell>Pie Chart</TableCell>
                    <TableCell>Breakdown of help tickets by category</TableCell>
                    <TableCell>Auto-generated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Help List</TableCell>
                    <TableCell>List with Buttons</TableCell>
                    <TableCell>
                      Includes "View Details" and "Assign Request" actions
                    </TableCell>
                    <TableCell>Read-only view</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "This is a <strong>view-only dashboard</strong> with filter and search options.",
        "Visual insights provided through pie charts for quick understanding of request statuses and categories.",
      ],
    },
    {
      title: "Download Functionality",
      description: "Export help ticket data if needed:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Download help ticket data to <strong>XLS/PDF</strong> formats using the download button.",
          ],
        },
      ],
      notes: [
        "Ensure the dashboard is filtered appropriately before downloading for targeted reports.",
        "Use browser back or system navigation controls if needed.",
      ],
    },
  ],

  "View Help Ticket Details": [
    { accesspath: "Help Dashboard → View Details" },
    {
      title: "Navigate to Help Ticket Details",
      description:
        "Follow the steps to view complete information of a help ticket:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Select  <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'Help Dashboard'</strong>",
            "Select a help ticket and click <strong>'View Details'</strong>",
          ],
        },
      ],
      notes: [
        "This module is <strong>read-only</strong> and used to view all details related to a help ticket.",
      ],
    },
    {
      title: "Help Ticket Information",
      description:
        "This screen displays all the important attributes of a help request:",
      sections: [
        {
          title: "Help Ticket Details",
          icon: <FaEye />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Description</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Editable</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Type of help request</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Requested By</TableCell>
                    <TableCell>Employee who submitted the request</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Date the request was made</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Details</TableCell>
                    <TableCell>Description or content of the request</TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Current status of the request</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>
                      Employee assigned to resolve the request
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Assigned Date</TableCell>
                    <TableCell>Date of assignment</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Internal comments or follow-ups</TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields are displayed in read-only mode for auditing or review purposes.",
      ],
    },
    {
      title: "Back Navigation",
      description: "Return to your list of submitted help requests:",
      sections: [
        {
          title: "Back Navigation Option",
          icon: <FaArrowLeft />,
          items: [
            "Click the <strong>'Back'</strong> button or use browser navigation to return to <strong>'My Requests'</strong>.",
          ],
        },
      ],
      notes: [
        "Use this to track the status or history of your submitted requests.",
      ],
    },
  ],

  "Assign Request for Help Ticket": [
    { accesspath: "Assign Request" },
    {
      title: "Navigate to Assign Help Ticket",
      description:
        "Follow the path to assign a help request ticket to the concerned employee:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong> section",
            "Go to <strong>'Emp Help & Request'</strong> in the left menu",
            "Click on <strong>'Help Dashboard'</strong>",
            "Select <strong>'Assign Request'</strong> next to the relevant help ticket",
          ],
        },
      ],
      notes: ["You must be a manager or admin to assign help tickets."],
    },
    {
      title: "Help Ticket Assignment Form",
      description:
        "Fill in the required information before assigning the help ticket:",
      sections: [
        {
          title: "Field Details",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Assigned To</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select the person to handle this request
                    </TableCell>
                    <TableCell>
                      <ul>
                        <li>Required</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Add notes or special instructions</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Date</strong>
                    </TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>Date the help ticket was submitted</TableCell>
                    <TableCell>
                      <ul>
                        <li>Read-only</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Escalation Date</strong>
                    </TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>Deadline for resolution if escalated</TableCell>
                    <TableCell>
                      <ul>
                        <li>Read-only</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Submitted File</strong>
                    </TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>File submitted with request</TableCell>
                    <TableCell>
                      <ul>
                        <li>Read-only</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Details</strong>
                    </TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>Description of the issue</TableCell>
                    <TableCell>
                      <ul>
                        <li>Read-only</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Emp Remarks</strong>
                    </TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>Employee comments or context</TableCell>
                    <TableCell>
                      <ul>
                        <li>Read-only</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Assigned To</strong> is mandatory for form submission.",
        "All other fields are view-only for context.",
      ],
    },
    {
      title: "Complete the Assignment",
      description: "Steps to finalize and submit the assignment:",
      sections: [
        {
          title: "Submission Steps",
          icon: <FaPaperPlane />,
          items: [
            "Ensure <strong>'Assigned To'</strong> is selected",
            "Click on <strong>'Assign Request'</strong> button",
            "You will be redirected to <strong>'My Help Tickets'</strong>",
          ],
        },
      ],
      notes: [
        "Assignment updates are tracked in the <strong>My Help Tickets</strong> section.",
      ],
    },
  ],

  "View Help Tickets": [
    { accesspath: "View Help Tickets" },
    {
      title: "Navigate to My Help Tickets",
      description:
        "Use the left menu to access all your submitted help tickets:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the left menu ",
            " select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'My Help Tickets'</strong> to view your requests",
          ],
        },
      ],
      notes: [
        "This section lists all help requests submitted by the employee.",
      ],
    },
    {
      title: "Help Ticket Overview",
      description:
        "You can filter, view, update, or cancel your help tickets as needed:",
      sections: [
        {
          title: "Interface Details",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field / Feature</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Search Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Filter by category, status, or keywords
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Search Query</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      Enter specific keywords to find requests
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Status</strong>
                    </TableCell>
                    <TableCell>Pie Chart</TableCell>
                    <TableCell>
                      Visual representation of ticket status
                      (open/closed/pending)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Category Distribution</strong>
                    </TableCell>
                    <TableCell>Pie Chart</TableCell>
                    <TableCell>Visual summary by request category</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Help List</strong>
                    </TableCell>
                    <TableCell>Action Buttons</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          <strong>Cancel Request:</strong> Withdraw submitted
                          request
                        </li>
                        <li>
                          <strong>Update:</strong> Modify request details
                        </li>
                        <li>
                          <strong>View Details:</strong> See full request info
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["No manual data entry is required in this module."],
    },
    {
      title: "Reports and Exports",
      description: "You can download your help ticket data for recordkeeping:",
      sections: [
        {
          title: "Export Options",
          icon: <FaDownload />,
          items: [
            "Click the <strong>Download</strong> button",
            "Choose export format: <strong>XLS or PDF</strong>",
          ],
        },
      ],
      notes: ["Exports are available for your current filtered search."],
    },
  ],

  "Add Help Ticket": [
    { accesspath: "Add Help Ticket" },
    {
      title: "Navigate to Add Help Ticket",
      description: "Use the help section to submit a new help ticket:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>' left menu'</strong>",
            "select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'Help Dashboard'</strong>",
            "Select <strong>'New Help Ticket'</strong> to open the form",
          ],
        },
      ],
      notes: [
        "Ensure you have the required details before submitting a help ticket.",
      ],
    },
    {
      title: "Help Ticket Form Details",
      description:
        "Complete the following fields to request help. Fields marked as required must be filled:",
      sections: [
        {
          title: "Help Ticket Form Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Request Help Category</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Details</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Ref. File</strong>
                    </TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Click <strong>'Submit'</strong> to register your help request.",
        "You will be redirected to <strong>'My Help Tickets'</strong> after submission.",
      ],
    },
  ],

  "Update Help Ticket": [
    { accesspath: "Update Help Ticket" },
    {
      title: "Navigate to Update Help Ticket",
      description: "Use this section to update an existing help request:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>' left menu'</strong>",
            "select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'My Help Tickets'</strong>",
            "Select a ticket and click <strong>'Update'</strong>",
          ],
        },
      ],
      notes: ["Only tickets you’ve raised can be updated."],
    },
    {
      title: "Help Ticket Update Form",
      description:
        "Update the required fields with correct details. Mandatory fields must be completed:",
      sections: [
        {
          title: "Update Help Ticket Form Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Request Help Category</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Request Details</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      <ul>
                        <li>Mandatory</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Ref. File</strong>
                    </TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Click <strong>'Submit'</strong> after updating the form.",
        "After submission, you will return to <strong>'My Help Tickets'</strong>.",
      ],
    },
    {
      title: "Submit Help Ticket Update",
      description: "Finalize and submit your updated help ticket request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Review all updated information in the form.",
            "Click on the <strong>'Submit'</strong> button to save changes.",
            "Wait for the system to process your update.",
            "Once submitted, you'll be redirected back to <strong>'My Help Tickets'</strong>.",
          ],
        },
      ],
      notes: [
        "Ensure that all required fields are filled before submission.",
        "You will receive a confirmation once your update is successful.",
      ],
    },
  ],

  "View resolved Help Ticket": [
    { accesspath: "View resolved Help Ticket" },
    {
      title: "Navigate to View resolved Help Ticket",
      description: "Follow this path to view and View resolved Help Ticket:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'Resolve Help'</strong>",
          ],
        },
      ],
      notes: [
        "Make sure you have the necessary permissions to view and resolve help tickets.",
      ],
    },
    {
      title: "Help Ticket Search and Filter",
      description:
        "Use the search and filter options to view specific resolved tickets:",
      sections: [
        {
          title: "Search and Filter Fields",
          icon: <FaSearch />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Search Type and Filter</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Select the type of search/filter you want to apply
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Search Query</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      Enter the keyword to search for resolved tickets
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Ensure that you use accurate filters to narrow down the ticket results.",
      ],
    },
    {
      title: "View Resolved Help Tickets",
      description: "View resolved tickets and their distribution data:",
      sections: [
        {
          title: "Resolved Ticket Overview",
          icon: <FaChartPie />,
          items: [
            "View the <strong>Request Status</strong> as a pie chart to analyze resolution data",
            "Check the <strong>Request Category Distribution</strong> to see how requests are categorized",
          ],
        },
      ],
      notes: [
        "The pie charts provide an overview of the status and category of resolved tickets.",
      ],
    },
    {
      title: "Download Resolved Help Tickets Data",
      description:
        "You can download the data of resolved help tickets in a desired format:",
      sections: [
        {
          title: "Download Process",
          icon: <FaDownload />,
          items: [
            "Click on the <strong>'Download'</strong> button",
            "Wait for the download to complete",
          ],
        },
      ],
      notes: [
        "The downloaded file will contain detailed data of the resolved help tickets, including status and category distributions.",
      ],
    },
  ],

  "View Request": [
    { accesspath: "View Request" },
    {
      title: "Navigate to View Request",
      description: "Follow this path to view all your submitted help requests:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'My Requests'</strong>",
          ],
        },
      ],
      notes: ["This section displays all requests submitted by you."],
    },
    {
      title: "Search and Filter Requests",
      description:
        "Use the filters and search options to view specific help requests:",
      sections: [
        {
          title: "Search and Filter Fields",
          icon: <FaSearch />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Search Type and Filter</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Filter by Employee ID, Name, Request ID, or Category
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Search Query</strong>
                    </TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Enter the search keyword</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["Use appropriate filters to quickly find your request history."],
    },
    {
      title: "Request Status and Distribution",
      description: "Visual representation of your requests’ current state:",
      sections: [
        {
          title: "Status and Category Overview",
          icon: <FaChartPie />,
          items: [
            "View <strong>Request Status</strong> through a pie chart",
            "View <strong>Request Category Distribution</strong> pie chart",
          ],
        },
      ],
      notes: [
        "These charts help you analyze your request trends and resolution status.",
      ],
    },
    {
      title: "Request List and Actions",
      description:
        "View the full list of your requests and perform actions on them:",
      sections: [
        {
          title: "List and Buttons",
          icon: <FaListUl />,
          items: [
            "See the complete list of requests made by you",
            "Use buttons to <strong>Cancel Request</strong>, <strong>Update</strong>, or <strong>View Details</strong>",
          ],
        },
      ],
      notes: [
        "You can cancel or update a request only if it's still in a pending state.",
      ],
    },
    {
      title: "Download Request Data",
      description:
        "Download your request data for offline access or reporting purposes:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click on the <strong>'Download'</strong> button",
            "Your request list will be downloaded to your device",
          ],
        },
      ],
      notes: [
        "Downloaded files include filters applied to the request list",
        "Use the data for personal reference or to submit reports",
      ],
    },
  ],
  "Update Request": [
    { accesspath: "Update Request" },
    {
      title: "Navigate to Update Request",
      description: "Follow this path to update a previously submitted request:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'My Requests'</strong>",
            "Choose a request and click <strong>'Update'</strong>",
          ],
        },
      ],
      notes: ["Only requests in a pending or review state can be updated."],
    },
    {
      title: "Update Request Form Fields",
      description: "Update the request details using the form below:",
      sections: [
        {
          title: "Input Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper Text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Request Category</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select the type of request</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Select the date for the request</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Details</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>
                      Enter the reason or description of your request
                    </TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Optional remarks or comments</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ref. File</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Attach supporting document (if any)</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All required fields must be filled to proceed with the update.",
        "Updating a request will notify the reviewer of the changes made.",
      ],
    },
    {
      title: "Submit Updated Request",
      description: "Final step to save the updated request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> the updated fields carefully",
            "Click on the <strong>'Submit Update'</strong> button",
            "Wait for the <strong>confirmation message</strong>",
            "You'll return to the <strong>'Employee Request List'</strong> after submission",
          ],
        },
      ],
      notes: ["The request status may reset depending on approval workflow"],
    },
    {
      title: "Back to Employee Request List",
      description: "Return to the main list of all employee help requests:",
      sections: [
        {
          title: "Back Navigation Path",
          icon: <FaArrowLeft />,
          items: [
            "Click the <strong>'Back'</strong> button available on the update screen",
            "You will be redirected to the <strong>'Employee Request List'</strong> under <strong>'My Requests'</strong>",
          ],
        },
      ],
      notes: [
        "Use this path to review, cancel, or update other requests as needed.",
      ],
    },
  ],

  "View Employee request Details": [
    { accesspath: "View Employee Request Details" },
    {
      title: "Navigate to Employee Request Details",
      description:
        "Follow this path to view detailed information of an employee's request:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Go to <strong>'Emp Help & Request'</strong>",
            "Select <strong>'My Requests'</strong>",
            "Click on <strong>'View Details'</strong> next to the specific request",
          ],
        },
      ],
      notes: ["Only submitted requests are visible in detail view."],
    },
    {
      title: "View Request Details",
      description:
        "The page will display all request information submitted by the employee:",
      sections: [
        {
          title: "Details Displayed",
          icon: <FaEye />,
          items: [
            "Request Category",
            "Request Date",
            "Request Details and Remarks",
            "Attached Reference File (if uploaded)",
            "Request Status and Action History",
          ],
        },
      ],
      notes: ["This is a read-only view of the selected request."],
    },
    {
      title: "Back to Employee Request List",
      description: "Navigate back to the list of all employee requests:",
      sections: [
        {
          title: "Back Navigation Path",
          icon: <FaArrowLeft />,
          items: [
            "Click on the <strong>'Back'</strong> button on the top or bottom of the page",
            "You will be redirected to <strong>'Employee Request List'</strong> under <strong>'My Requests'</strong>",
          ],
        },
      ],
      notes: [
        "Use this option to return and view or update other submitted requests.",
      ],
    },
  ],

  // RESOLVE REQUEST

  "Resolve Request Dashboard": [
    { accesspath: "Resolve Request Dashboard" },
    {
      title: "Navigate to Resolve Request Dashboard",
      description:
        "Follow this path to resolve requests and view request statistics:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'Resolve Request'</strong>",
          ],
        },
      ],
      notes: ["Only requests in the review or pending state can be resolved."],
    },
    {
      title: "Resolve Request Dashboard Features",
      description:
        "The dashboard allows you to filter and view request information:",
      sections: [
        {
          title: "Filtering & Search",
          icon: <FaFilter />,
          items: [
            "Use the <strong>'Search Type'</strong> dropdown to select filter criteria (Employee ID, Employee Name, Request ID, or Request Category)",
            "Enter the search query in the <strong>'Search Query'</strong> input field",
          ],
        },
        {
          title: "Request Status & Category Distribution",
          icon: <FaChartPie />,
          items: [
            "View the request status distribution in a <strong>Pie Chart</strong>",
            "View the request category distribution in a <strong>Pie Chart</strong>",
          ],
        },
        {
          title: "Request List",
          icon: <FaList />,
          items: [
            "Click <strong>'View Details'</strong> to view detailed information for any request",
            "Click <strong>'Complete Request'</strong> to mark a request as resolved",
          ],
        },
      ],
      notes: [
        "Use the pie charts to get an overview of the request distribution by status and category.",
        "You can resolve a request only if it is eligible (e.g., not already resolved).",
      ],
    },
    {
      title: "Complete Request",
      description: "Finalize the resolution of a request:",
      sections: [
        {
          title: "Completion Process",
          icon: <FaCheck />,
          items: [
            "Click on the <strong>'Complete Request'</strong> button for the specific request",
            "Confirm the resolution and completion of the request",
            "Wait for the confirmation message",
          ],
        },
      ],
      notes: [
        "The request status will update to 'Completed' after the resolution.",
        "A notification will be sent to relevant parties after request completion.",
      ],
    },
    {
      title: "Download Request Details",
      description:
        "Access options to download the request information for offline reference:",
      sections: [
        {
          title: "Download Options",
          icon: <FaDownload />,
          items: [
            "Click on the <strong>'Download PDF'</strong> button to download the full request summary",
            "Download is available only if the request was successfully resolved",
          ],
        },
      ],
      notes: ["Use the downloaded file for sharing or offline record keeping."],
    },
  ],

  "Complete Request": [
    { accesspath: "emp help & request → resolve request → complete request" },
    {
      title:
        "fill the form to complete or reject request, or go back to employee",
      description: "use the following fields to complete or reject a request:",
      sections: [
        {
          title: "navigation path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left Menu'</strong>",
            "Go to <strong>'emp help & Request'</strong>",
            "Click on <strong>'Resolve Request'</strong>",
            "Choose <strong>'Complete Request'</strong> option",
          ],
        },
      ],
      notes: [
        "Make sure to <strong>login</strong> and access the correct request before proceeding.",
      ],
    },
    {
      title: "Request completion details",
      description:
        "Fill in all required fields before completing or rejecting the request:",
      sections: [
        {
          title: "Completion form fields",
          icon: <FaWpforms />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Completion date</TableCell>
                    <TableCell>date picker</TableCell>
                    <TableCell>select the completion date</TableCell>
                    <TableCell>required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request date</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Date when the request was submitted</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Escalation date</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Date of any escalation</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Submitted file</TableCell>
                    <TableCell>File attachment</TableCell>
                    <TableCell>View the original submission file</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Completion remarks</TableCell>
                    <TableCell>Text input</TableCell>
                    <TableCell>Write remarks for completion</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Completion ref. file</TableCell>
                    <TableCell>File upload</TableCell>
                    <TableCell>upload reference file for closure</TableCell>
                    <TableCell>required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>request details</TableCell>
                    <TableCell>text (read-only)</TableCell>
                    <TableCell>original request content</TableCell>
                    <TableCell>read-only</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>emp remarks</TableCell>
                    <TableCell>text (read-only)</TableCell>
                    <TableCell>employee's initial remarks</TableCell>
                    <TableCell>read-only</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Fields marked as <strong>required</strong> must be filled before submission.",
      ],
    },
    {
      title: "Action buttons",
      description: "Finalize the request by selecting an appropriate action:",
      sections: [
        {
          title: "Available actions",
          icon: <FaCheckSquare />,
          items: [
            "Click <strong>'Complete request'</strong> to finalize and close the ticket",
            "Click <strong>'Back'</strong> to send it back for more details",
            "Click <strong>'Reject request'</strong> to decline the request with remarks",
          ],
        },
      ],
      notes: ["Make sure the form is complete before taking action."],
    },
    {
      title: "Return to Employee Request List",
      description:
        "Return to the Employee Request List without completing the request:",
      sections: [
        {
          title: "Back Navigation",
          icon: <FaArrowLeft />,
          items: [
            "Click the <strong>'Back'</strong> button",
            "You will be redirected to the <strong>'Employee Request List'</strong>",
          ],
        },
      ],
      notes: [
        "Use this option if you want to review the request again before taking action.",
      ],
    },
    {
      title: "Download Request Report",
      description:
        "Export request information for offline review or reporting:",
      sections: [
        {
          title: "Export Options",
          icon: <FaDownload />,
          items: [
            "Click the <strong>'Download'</strong> button on the dashboard",
            "Download will include filtered list of requests with relevant details",
          ],
        },
      ],
      notes: [
        "Use the download feature to share reports with supervisors or for audit purposes.",
      ],
    },
  ],

  "Views Employees Request details": [
    { accesspath: "Views Employees Request details1" },
    {
      title: "Navigate to Request Details",
      description:
        "Use this section to view the full details of an employee's request:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'Emp Help & Request'</strong>",
            "Click on <strong>'Resolve Request'</strong>",
            "Then choose <strong>'View Details'</strong> option",
          ],
        },
      ],
      notes: ["This view is <strong>read-only</strong> and cannot be edited."],
    },
    {
      title: "Request Details View",
      description:
        "Details displayed in this section include the full context of the employee request:",
      sections: [
        {
          title: "Fields Displayed",
          icon: <FaEye />,
          items: [
            "Request ID and Category",
            "Employee Name and Department",
            "Request Description",
            "Request Date & Escalation Date",
            "Submitted Files (view/download option)",
            "Employee Remarks",
            "Status and History",
          ],
        },
      ],
      notes: [],
    },
    {
      title: "Return to Request List",
      description: "Navigate back to the employee request listing screen:",
      sections: [
        {
          title: "Back Navigation",
          icon: <FaArrowLeft />,
          items: [
            "Click the <strong>'Back to Employee Request List'</strong> button",
          ],
        },
      ],
      notes: ["No data is saved or changed when viewing this screen."],
    },
  ],

  "View Request Dashboard": [
    { accesspath: "Emp Help & Request → Request Dashboard" },
    {
      title: "Navigate to Request Dashboard",
      description:
        "Use this dashboard to search, filter, and manage employee help requests efficiently:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Click on <strong>'Emp Help & Request'</strong>",
            "Select <strong>'Request Dashboard'</strong>",
          ],
        },
      ],
      notes: [
        "This dashboard gives an overview of request statuses and categories across employees.",
      ],
    },
    {
      title: "Dashboard Features & Components",
      description:
        "Interact with different components on the dashboard to manage requests:",
      sections: [
        {
          title: "Dashboard Elements",
          icon: <FaChartPie />,
          items: [
            "<strong>Search Type & Filter:</strong> Dropdown to select filter by Employee ID, Employee Name, Request ID, or Category",
            "<strong>Search Query:</strong> Text input for entering the search term",
            "<strong>Request Status Distribution:</strong> Pie chart view of request statuses (e.g., Pending, Completed)",
            "<strong>Request Category Distribution:</strong> Pie chart view by request type (e.g., IT, HR, Payroll)",
            "<strong>Request List Table:</strong> Shows employee-wise requests with actions",
            "<strong>View Details:</strong> Button to open the full request detail screen",
            "<strong>Assign Request:</strong> Button to assign request to an employee",
          ],
        },
      ],
      notes: [
        "Pie charts provide quick visual insights on requests.",
        "You can assign or view any request directly from the list.",
      ],
    },
    {
      title: "Download Request Report",
      description:
        "Export request information for offline review or reporting:",
      sections: [
        {
          title: "Export Options",
          icon: <FaDownload />,
          items: [
            "Click the <strong>'Download'</strong> button on the dashboard",
            "Download will include filtered list of requests with relevant details",
          ],
        },
      ],
      notes: [
        "Use the download feature to share reports with supervisors or for audit purposes.",
      ],
    },
  ],

  "Assign Request": [
    { accesspath: "Assign request" },
    {
      title: "Navigate to assign request",
      description: "follow the navigation path to assign a request:",
      sections: [
        {
          title: "navigation path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'left menu'</strong> section",
            "Select <strong>'emp help & request'</strong>",
            "Click on <strong>'request dashboard'</strong>",
            "Choose <strong>'assign request'</strong> option",
          ],
        },
      ],
      notes: [
        "<strong>login</strong> to the system to access the assign request functionality",
      ],
    },
    {
      title: "Fill the below fields to assign a request",
      description:
        "Ensure all the required fields are filled before assigning a request:",
      sections: [
        {
          title: "Assign request fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Helper text</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Assigned to</TableCell>
                    <TableCell>Dashboardropdown</TableCell>
                    <TableCell>Select employee</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request date</TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>Select request date</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Escalation date</TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>Select escalation date</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Submitted file</TableCell>
                    <TableCell>File input</TableCell>
                    <TableCell>Upload the related file</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text input</TableCell>
                    <TableCell>Additional remarks</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request details</TableCell>
                    <TableCell>Text input</TableCell>
                    <TableCell>Describe the request</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emp remarks</TableCell>
                    <TableCell>Text input</TableCell>
                    <TableCell>Comments from the employee</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields are <strong>mandatory</strong>",
        "System will validate date logic before submission",
      ],
    },
    {
      title: "Submit the request",
      description: "Steps to submit the request after filling the form:",
      sections: [
        {
          title: "Submission process",
          icon: <FaPaperPlane />,
          items: [
            "Verify that all required fields are filled",
            "Click on <strong>'Submit'</strong> to assign the request",
            "you will be redirected to <strong>'Employee request dashboard'</strong>",
          ],
        },
      ],
      notes: [
        "You can go back to the <strong>employee request dashboard</strong> to view or modify requests",
      ],
    },
  ],

  "Add Request": [
    { accesspath: "Add Request" },
    {
      title: "Navigate to New Request Form",
      description:
        "Follow this path to access and submit a new employee request:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong> ",
            "Select <strong>'Emp Help & Request'</strong>",
            "Open <strong>'Request Dashboard'</strong>",
            "Click on <strong>'New Request'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure you are <strong>logged into the HRMS portal</strong> to access this feature.",
      ],
    },
    {
      title: "Request Form Fields",
      description: "Fill out the required fields to raise a new request:",
      sections: [
        {
          title: "Field Details",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Input Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>Request Category</TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Request Details</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Text Input</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ref. File</TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "<strong>Request Category</strong> options are configured in the HRM Setup module.",
      ],
    },
    {
      title: "Submit the Request",
      description: "Complete the final step to submit your request:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "Double-check all <strong>mandatory fields</strong>.",
            "Click on <strong>'Submit Request'</strong>.",
            "You will be redirected to <strong>'Employee Request Dashboard'</strong>.",
          ],
        },
      ],
      notes: [
        "You can view the request status anytime in the <strong>Employee Request Dashboard</strong>.",
      ],
    },
    {
      title: "Return to Navigation",
      description: "To return to the previous menu or request list:",
      sections: [
        {
          title: "Back Navigation",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back to Employee Request Dashboard'</strong> after submitting.",
          ],
        },
      ],
    },
  ],

  "View Request Details": [
    { accesspath: "View Employee request Details" },
    {
      title: "Navigate to Request Details View",
      description:
        "Follow this path to view complete details of a submitted request:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to the <strong>'Left menu'</strong>",
            "Select <strong>'Emp Help & Request'</strong>",
            "Open <strong>'Resolve Request'</strong>",
            "Click on <strong>'View Details'</strong> for the request",
          ],
        },
      ],
      notes: [
        "Ensure you have appropriate access rights to view request details.",
      ],
    },
    {
      title: "Request Detail Fields",
      description: "The following fields are visible when viewing a request:",
      sections: [
        {
          title: "Field Information",
          icon: <FaInfoCircle />,
          items: [
            "<strong>Requested By</strong>: Employee who raised the request",
            "<strong>Request Date</strong>: Date when the request was submitted",
            "<strong>Request Details</strong>: Description of the issue/request",
            "<strong>Status</strong>: Current status of the request (e.g., Pending, In Progress, Resolved)",
            "<strong>Assigned To</strong>: Name of the person the request is assigned to (if any)",
            "<strong>Assigned Date</strong>: Date on which it was assigned",
            "<strong>Remarks</strong>: Additional comments by the requester or resolver",
          ],
        },
      ],
      notes: [
        "All fields are <strong>read-only</strong> in view mode.",
        "Use this screen to review or initiate resolution action if authorized.",
      ],
    },
    {
      title: "Return to Navigation",
      description: "To return to the previous menu or request list:",
      sections: [
        {
          title: "Back Navigation",
          icon: <FaArrowLeft />,
          items: [
            "Click on <strong>'Back to Employee Request List'</strong> if needed",
          ],
        },
      ],
      notes: [
        "Actions like <strong>Assign</strong> and <strong>View</strong> will open respective screens in detail mode.",
      ],
    },
  ],

  "Submit New Claim": [
    { accesspath: "Add Claim" },
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
            "Choose <strong>'Apply leave'</strong> option",
          ],
        },
      ],
      notes: [
        `<strong>Login</strong> to the HR system to <strong>Add Earned Leave</strong> `,
        // "System will validate your available leave balance automatically"
      ],
    },
    {
      title: "Leave Application Details",
      description:
        "Complete all required fields in the application form with proper validations:",
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
                    <TableCell>
                      <strong>From date</strong>
                    </TableCell>
                    <TableCell>Date picker</TableCell>
                    <TableCell>
                      <ul>
                        {/* <li>Cannot be in the past</li> */}
                        <li>Must be working day</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>To date</strong>
                    </TableCell>
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
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
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
          ),
        },
      ],
      notes: [
        "All fields marked with asterisk (*) are mandatory",
        "System will validate your available leave balance automatically",
      ],
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
            "You'll be redirected to <strong>'My leave details'</strong> page",
          ],
        },
      ],
      notes: [
        "You'll receive <strong>email notification</strong> once approved",
        "No document upload required for earned leave",
      ],
    },
  ],

  // Assets
  "Set Up (Item Category)": [
  {
    accesspath: "Login --> General --> Assets --> Set Up --> Item Category --> Add Item Category",
  },
  {
    title: "Navigate to Set Up - Item Category",
    description: "Follow the path to configure or add a new Item Category:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Assets'</strong>",
          "Select <strong>'Set Up'</strong>",
          "Click on <strong>'Item Category'</strong>",
          "Click <strong>'Add Item Category'</strong>",
        ],
      },
    ],
    notes: [
      "This path leads to the configuration page where you can define item categories for assets.",
    ],
  },
  {
    title: "Item Category Form Fields",
    description: "Fill in the following details to create a new item category:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HSN SAC Code</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax Applicable?</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Applicable Tax Rate</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category Alias</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Is this Asset Category?</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Group</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Is Asset Value Inclusive of Tax?</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Depreciation Calculation Method</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Depreciation Calculation Method (Tax)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Useful Life</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Depreciation Rate</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Fields like <strong>Name</strong>, <strong>Applicable Tax Rate</strong>, <strong>Useful Life</strong>, <strong>Depreciation Rate</strong>, and <strong>Image</strong> are mandatory.",
      "Ensure the correct depreciation methods and tax applicability are selected based on item type.",
    ],
  },
  {
    title: "Upload & Save Options",
    description: "Submit data using either manual form or bulk upload:",
    sections: [
      {
        title: "Submission Options",
        icon: <FaPaperPlane />,
        items: [
          "You can manually fill the form and click <strong>'Save'</strong> to submit.",
          "Alternatively, you can use the <strong>'Upload'</strong> option to import multiple records at once via an Excel or CSV file.",
        ],
      },
    ],
    notes: [
      "Bulk upload is useful for setting up multiple item categories quickly.",
    ],
  },
  {
    title: "Additional Actions",
    description: "Extra functionalities to improve user workflow:",
    sections: [
      {
        title: "Actions",
        icon: <FaDownload />,
        items: [
          "Click <strong>'Download'</strong> to get the Excel format for bulk upload.",
          "Click <strong>'Back'</strong> to return to the <strong>Item Category List</strong> page.",
        ],
      },
    ],
    notes: [
      "Ensure uploaded files match the template format to avoid errors.",
    ],
  },
],

"Set Up (Location Code)": [
  {
    accesspath: "Login --> General --> Assets --> Set Up --> Location Code --> Add Location Code",
  },
  {
    title: "Navigate to Set Up - Location Code",
    description: "Follow this path to create or configure a new Location Code:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Assets'</strong>",
          "Select <strong>'Set Up'</strong>",
          "Click on <strong>'Location Code'</strong>",
          "Click <strong>'Add Location Code'</strong>",
        ],
      },
    ],
    notes: [
      "This screen allows you to define a new location code for asset classification.",
    ],
  },
  {
    title: "Location Code Form Fields",
    description: "Fill in the following fields to create a location code:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact Details</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address Line 1</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address Line 2</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location Alias</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "<strong>Name</strong> and <strong>Image</strong> are mandatory fields.",
    ],
  },
  {
    title: "Upload & Save Options",
    description: "You can choose to enter data manually or upload in bulk:",
    sections: [
      {
        title: "Submission Options",
        icon: <FaPaperPlane />,
        items: [
          "Fill out the form manually and click <strong>'Save'</strong>.",
          "Or click <strong>'Upload'</strong> to bulk import multiple location codes using an Excel/CSV file.",
        ],
      },
    ],
    notes: [
      "Use the upload option when adding multiple records at once.",
    ],
  },
  {
    title: "Additional Actions",
    description: "Supportive actions to enhance user flow:",
    sections: [
      {
        title: "Actions",
        icon: <FaDownload />,
        items: [
          "Click <strong>'Download Template'</strong> to get the Excel format for uploading.",
          "Click <strong>'Back/Location Code List'</strong> to return to the <strong>Location Code List</strong> page.",
        ],
      },
    ],
    notes: [
      "Ensure file format matches the template before uploading.",
    ],
  },
],

"Add Item": [
  {
    accesspath: "Login --> General --> Assets --> Add Item --> Item Detail",
  },
  {
    title: "Navigate to Add Asset Item",
    description: "Follow this path to add a new asset item:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Assets'</strong>",
          "Select <strong>'Add Item'</strong>",
          "Click on <strong>'Item Detail'</strong>",
        ],
      },
    ],
    notes: [
      "You must be logged in to access the item detail page.",
    ],
  },
  {
    title: "Asset Item Form Fields",
    description: "Fill in the following fields to add a new inventory asset item:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Item Category</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item Number</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inventory Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Base Unit</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inventory Batch Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Min Inventory Qty</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item Group</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item Description</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price Inclusive Tax</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Auto Order Rule for Min Qty</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Max Inventory Qty</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inventory Valuation Method</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Is Receiving Bin Location Applicable?</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Ensure all mandatory fields are filled before saving.",
    ],
  },
  {
    title: "Form Submission Process",
    description: "Save the asset item after completing the required fields:",
    sections: [
      {
        title: "Submission",
        icon: <FaPaperPlane />,
        items: [
          "Click <strong>'Save'</strong> to submit the new asset item entry.",
          "Form cannot be submitted unless all required fields are valid.",
        ],
      },
    ],
    
  },
  {
    title: "Back Navigation",
    description: "Navigate back to the inventory item list:",
    sections: [
      {
        title: "Return to List",
        icon: <FaArrowLeft />,
        items: [
          "Click <strong>'Back/Inventory Item List'</strong> to return to the <strong>Inventory Item List</strong> page.",
        ],
      },
    ],
    
  },
],
"Inventory Items - Dashboard": [
  {
    accesspath: "Login --> General --> Assets --> Asset Item Type",
  },
  {
    title: "Navigate to Inventory Dashboard",
    description: "Follow this path to view the Inventory Items dashboard:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Assets'</strong>",
          "Select <strong>'Asset Item Type'</strong>",
        ],
      },
    ],
    notes: [
      "You must be logged in to access this dashboard.",
    ],
  },
  {
    title: "Dashboard Fields",
    description: "Use the following filters and fields to view and manage inventory items:",
    sections: [
      {
        title: "Filter & View Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Editable</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item Search</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Record Created</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item Serial Number</TableCell>
                  <TableCell>Auto-generated/View only</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Batch Details</TableCell>
                  <TableCell>Auto-generated/View only</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Purchase Order</TableCell>
                  <TableCell>Auto-generated/View only</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Update</TableCell>
                  <TableCell>Button</TableCell>
                  <TableCell>Yes (updates details)</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Manual input is allowed only in the 'Item Search' field.",
    ],
  },
  {
    title: "Submission Process",
    description: "How updates work on this dashboard:",
    sections: [
      {
        title: "Update Action",
        icon: <FaPaperPlane />,
        items: [
          "Click <strong>'Update'</strong> next to an item to modify its details.",
          "Only fields visible on the pop-up (if any) are editable during update.",
        ],
      },
    ],
    notes: [
      "No form submission is required; updates happen inline via the update button.",
    ],
  },
  {
    title: "Attachments & Back Navigation",
    description: "Other available actions on the screen:",
    sections: [
      {
        title: "File Options & Navigation",
        icon: <FaArrowLeft />,
        items: [
          "You can <strong>download</strong> or <strong>view</strong> attached item documents.",
        ],
      },
    ],
    notes: [
      "Ensure updates are saved before navigating away.",
    ],
  },
],
"Add Asset Item": [
  {
    accesspath: "Login --> General --> Assets --> Asset List --> Add Asset Item",
  },
  {
    title: "Navigate to Asset Item Entry Form",
    description: "Use the path below to access the form for adding new asset items:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Assets'</strong>.",
          "Select <strong>'Asset List'</strong>.",
          "Click on <strong>'Add Asset Item'</strong>.",
        ],
      },
    ],
    notes: ["Ensure you have the required permissions to access this form."],
  },
  {
    title: "Form Fields",
    description: "The following fields are available while adding a new asset item:",
    sections: [
      {
        title: "Form Details",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Asset Item Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Unique Ref. Number</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ref PO Number</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Purchase Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Asset Value</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Current Asset Value</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Owner</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Is Asset for Depreciation Accounting</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Only 'Asset Item Type' and 'Asset Unique Ref. Number' are mandatory.",
    ],
  },
  {
    title: "Submission Process",
    description: "How to submit the asset item form:",
    sections: [
      {
        title: "Submit the Form",
        icon: <FaPaperPlane />,
        items: [
          "Fill in the required fields.",
          "Click the <strong>'Add Asset Item'</strong> button to save the new asset.",
        ],
      },
    ],
    notes: [
      "Double-check mandatory fields before submission to avoid validation errors.",
    ],
  },
  {
    title: "Cancellation Logic & Navigation",
    description: "Optional actions related to form handling and navigation:",
    sections: [
      {
        title: "Go Back",
        icon: <FaArrowLeft />,
        items: [
          "If you do not wish to proceed, use the back option to return to the <strong>Asset List</strong>.",
        ],
      },
    ],
    notes: [
      "No data will be saved if the form is cancelled or navigation occurs before submission.",
    ],
  },
],
"Asset Items Dashboard": [
  {
    accesspath: "Login --> General --> Assets --> Asset List",
  },
  {
    title: "Navigate to Asset Items (3) Dashboard",
    description: "Use the steps below to access the dashboard view for Asset Items:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Assets'</strong>",
          "Select <strong>'Asset List'</strong> to open the dashboard view",
        ],
      },
    ],
    notes: ["This dashboard provides a filtered view of asset items. No manual data entry is allowed except search."],
  },
  {
    title: "Filter Options",
    description: "You can filter the asset list using the following dropdowns and input field:",
    sections: [
      {
        title: "Available Filters",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Editable</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Search Name</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Category</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Item Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Record Created</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Only the 'Search Name' field is manually editable.",
      "Use filters to refine the asset list based on selection criteria.",
    ],
  },
  {
    title: "Submission Process",
    description: "There is no data submission on this screen as it's view-only.",
    sections: [
      {
        title: "Read-Only Dashboard",
        icon: <FaPaperPlane />,
        items: [
          "Use dropdown filters and search to find relevant asset records.",
          "No manual data entry or submission is applicable on this dashboard.",
        ],
      },
    ],
    notes: ["Useful for monitoring, audit, and record lookup purposes."],
  },
],

"Update Warranty Details": [
  {
    accesspath: "Login --> General --> Assets --> Asset List --> Update",
  },
  {
    title: "Navigate to Asset Item Update Form",
    description: "Use the path below to access the form for updating asset item details:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'Assets'</strong>",
          "Select <strong>'Asset List'</strong>",
          "Click on <strong>'Update'</strong> beside the relevant asset record",
        ],
      },
    ],
    notes: ["Ensure you have edit access to update asset items."],
  },
  {
    title: "Form Fields",
    description: "The following fields are available for editing asset item details:",
    sections: [
      {
        title: "Editable Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Asset Item Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Unique Ref. Number</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ref PO Number</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Purchase Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Asset Value</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Current Asset Value</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Owner</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Is Asset for Depreciation Accounting</TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Mandatory fields include: Asset Item Type, Asset Unique Ref. Number, Asset Name, and Ref PO Number.",
    ],
  },
  {
    title: "Submission Process",
    description: "Steps to update the asset item details:",
    sections: [
      {
        title: "Submit the Form",
        icon: <FaPaperPlane />,
        items: [
          "Fill or update the necessary fields.",
          "Click the <strong>'Update Asset Details'</strong> button to save changes.",
          "Optionally, click <strong>'Add Employee Allocation'</strong> to assign employees.",
        ],
      },
    ],
    notes: [
      "Ensure required fields are filled to avoid validation issues.",
    ],
  },
  {
    title: "Cancellation Logic & Navigation",
    description: "Handle unsaved changes and navigation:",
    sections: [
      {
        title: "Go Back",
        icon: <FaArrowLeft />,
        items: [
          "Use back navigation to return to the <strong>Asset List</strong> without saving changes.",
        ],
      },
    ],
    notes: [
      "Unsaved changes will be lost if you leave the page without submitting.",
    ],
  },
],

// Events

  "Personal Events": [
    {
      "accesspath": "Manager(HRMS) --> Employee List --> Update --> Events"
    },
    {
      "title": "Navigate to Personal Events Form",
      "description": "Use the path below to access the personal events form for an employee:",
      "sections": [
        {
          "title": "Navigation Path",
          "icon": <FaRoute />,
          "items": [
            "Go to <strong>'Manager (HRMS)'</strong>",
            "Select <strong>'Employee List'</strong>",
            "Click on <strong>'Update'</strong> beside the relevant employee record",
            "Click on <strong>'Events'</strong> section to enter personal events"
          ]
        }
      ],
      "notes": [
        "Ensure you have permission to update personal events for employees."
      ]
    },
    {
      "title": "Form Fields",
      "description": "The following fields are available for adding or editing personal event details:",
      "sections": [
        {
          "title": "Form Fields",
          "icon": <FaEdit />,
          "content": <TableContainer><Table><thead><tr><TableHeader>Field</TableHeader><TableHeader>Input Type</TableHeader><TableHeader>Mandatory</TableHeader></tr></thead><tbody><TableRow><TableCell>Event Type</TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow><TableRow><TableCell>Event Date</TableCell><TableCell>Date Picker</TableCell><TableCell>Required</TableCell></TableRow><TableRow><TableCell>Event Status</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow><TableRow><TableCell>Event Text</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow><TableRow><TableCell>Remarks</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow><TableRow><TableCell>Image</TableCell><TableCell>File Upload</TableCell><TableCell>Optional</TableCell></TableRow></tbody></Table></TableContainer>
        }
      ],
      "notes": [
        "Event Type and Event Date are mandatory fields. Ensure both are selected before submitting the form."
      ]
    },
    {
      "title": "Submission Process",
      "description": "How to submit the personal events form:",
      "sections": [
        {
          "title": "Submit the Form",
          "icon": <FaPaperPlane />,
          "items": [
            "Select the event type and event date (both mandatory).",
            "Fill in optional details such as event status, event text, remarks, and upload an image (if applicable).",
            "Click the <strong>'Submit'</strong> button to save the event details."
          ]
        }
      ],
      "notes": [
        "Ensure all mandatory fields are filled before submitting to avoid validation errors."
      ]
    },
    {
      "title": "Cancellation Logic & Navigation",
      "description": "How to handle cancellation and navigation:",
      "sections": [
        {
          "title": "Go Back",
          "icon": <FaArrowLeft />,
          "items": [
            "If you do not wish to save the event, use the back option to return to the <strong>Employee Details</strong> without saving changes."
          ]
        }
      ],
      "notes": [
        "If you leave the page or navigate away without submitting, any changes made will be discarded."
      ]
    }
  ],

  // CRM
  "Add Customer": [
    {
      title: "Navigate to Create Customer",
      description:
        "Follow this path to access the customer profile creation form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Click on <strong>'CRM'</strong> section",
            "Select <strong>'Customer List'</strong>",
            "Click on <strong>'Add Customer'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure you have appropriate <strong>CRM access permissions</strong> to Add customer",
      ],
    },
    {
      title: "Customer Profile Details",
      description:
        "Fill out all mandatory fields with valid information to ensure successful customer creation:",
      sections: [
        {
          title: "Customer Details Table",
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
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Mandatory</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mandatory/Valid email format</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Mobile</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>10-digit format</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Address</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Contact Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Alias</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>City Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Pin Code</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>6-digit format</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>State Code</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Choose from list</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Country</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Choose from list</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer From Date</strong>
                    </TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Should be current or future date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Mandatory selection</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Group (Primary)</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Group (Secondary)</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Image</strong>
                    </TableCell>
                    <TableCell>File (image)</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Is this Customer a Supplier</strong>
                    </TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Is Channel Partner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Referred by Channel Partner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Payment Terms</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Default Email List</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Customer will be listed under <strong>'Customer List'</strong> after successful creation",
      ],
    },
    {
      title: "Submit the Customer Profile",
      description: "Once you've entered all data, finalize the process:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all fields carefully",
            "Click <strong>'Create'</strong> or <strong>'Submit'</strong> button",
            "System will notify if mandatory fields are missing",
            "You'll be redirected to the updated <strong>'Customer List'</strong> page",
          ],
        },
        
      ],
      notes: [
        "Use upload to add many records quickly. Only Excel (.xlsx) or CSV (.csv) files are accepted.",
        "Avoid duplicate entries to prevent errors.",
      ],
    },
  ],

  // "Update Information": [
  //   {
  //     title: "Navigate to Update Customer",
  //     description:
  //       "Use the following path to locate and update an existing customer's profile:",
  //     sections: [
  //       {
  //         title: "Navigation Path",
  //         icon: <FaRoute />,
  //         items: [
  //           "Go to <strong>'CRM'</strong> section",
  //           "Select <strong>'Customer List'</strong>",
  //           "Search and click on the specific customer record",
  //           "Click on <strong>'Update'</strong> or <strong>'Edit'</strong> button to modify details",
  //         ],
  //       },
  //     ],
  //     notes: [
  //       "Ensure the customer already exists in the <strong>Customer List</strong>",
  //       "You must have update rights to perform this action",
  //     ],
  //   },
  //   {
  //     title: "Customer Information Update",
  //     description:
  //       "Edit the required fields with accurate and updated information. All validations will be applied:",
  //     sections: [
  //       {
  //         title: "Editable Fields Table",
  //         icon: <FaEdit />,
  //         content: (
  //           <TableContainer>
  //             <Table>
  //               <thead>
  //                 <tr>
  //                   <TableHeader>Field</TableHeader>
  //                   <TableHeader>Field Type</TableHeader>
  //                   <TableHeader>Validation</TableHeader>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Name</strong>
  //                   </TableCell>
  //                   <TableCell>Text</TableCell>
  //                   <TableCell>Mandatory</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Email</strong>
  //                   </TableCell>
  //                   <TableCell>Email</TableCell>
  //                   <TableCell>Valid email format</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Mobile</strong>
  //                   </TableCell>
  //                   <TableCell>Number</TableCell>
  //                   <TableCell>10-digit format</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Address</strong>
  //                   </TableCell>
  //                   <TableCell>Textarea</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Contact Name</strong>
  //                   </TableCell>
  //                   <TableCell>Text</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Customer Alias</strong>
  //                   </TableCell>
  //                   <TableCell>Text</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>City Name</strong>
  //                   </TableCell>
  //                   <TableCell>Text</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Pin Code</strong>
  //                   </TableCell>
  //                   <TableCell>Number</TableCell>
  //                   <TableCell>6-digit format</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>State Code</strong>
  //                   </TableCell>
  //                   <TableCell>Dropdown</TableCell>
  //                   <TableCell>Choose from list</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Country</strong>
  //                   </TableCell>
  //                   <TableCell>Dropdown</TableCell>
  //                   <TableCell>Choose from list</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Customer From Date</strong>
  //                   </TableCell>
  //                   <TableCell>Date</TableCell>
  //                   <TableCell>
  //                     Cannot be a future date if updating history
  //                   </TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Customer Type</strong>
  //                   </TableCell>
  //                   <TableCell>Dropdown</TableCell>
  //                   <TableCell>Mandatory</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Customer Group (Primary)</strong>
  //                   </TableCell>
  //                   <TableCell>Dropdown</TableCell>
  //                   <TableCell>Mandatory</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Customer Group (Secondary)</strong>
  //                   </TableCell>
  //                   <TableCell>Dropdown</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Image</strong>
  //                   </TableCell>
  //                   <TableCell>File (image)</TableCell>
  //                   <TableCell>Optional, supports jpg/png</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Is this Customer a Supplier</strong>
  //                   </TableCell>
  //                   <TableCell>Checkbox</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Is Channel Partner</strong>
  //                   </TableCell>
  //                   <TableCell>Dropdown</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Referred by Channel Partner</strong>
  //                   </TableCell>
  //                   <TableCell>Dropdown</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Payment Terms</strong>
  //                   </TableCell>
  //                   <TableCell>Textarea</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Default Email List</strong>
  //                   </TableCell>
  //                   <TableCell>Text</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //                 <TableRow>
  //                   <TableCell>
  //                     <strong>Remarks</strong>
  //                   </TableCell>
  //                   <TableCell>Textarea</TableCell>
  //                   <TableCell>Optional</TableCell>
  //                 </TableRow>
  //               </tbody>
  //             </Table>
  //           </TableContainer>
  //         ),
  //       },
  //     ],
  //     notes: [
  //       "Make sure to <strong>review all values</strong> before updating",
  //       "You cannot edit historical entries beyond certain limits unless you have special access",
  //     ],
  //   },
  //   {
  //     title: "Submit Updated Information",
  //     description:
  //       "Once modifications are done, follow these steps to save the changes:",
  //     sections: [
  //       {
  //         title: "Submission Process",
  //         icon: <FaPaperPlane />,
  //         items: [
  //           "<strong>Review</strong> all updated data carefully",
  //           "Click on <strong>'Update'</strong> or <strong>'Save'</strong>",
  //           "System will confirm the changes",
  //           "You'll be redirected to the <strong>'Customer List'</strong> with updated details",
  //         ],
  //       },
  //     ],
  //     notes: [
  //       "Changes are <strong>immediately reflected</strong> in the Customer List",
  //       "Edit logs may be recorded for audit purposes",
  //     ],
  //   },
  // ],

"Customer List Dashboard": [
  { accesspath: "CRM → CustomerList" },
  {
    title: "Navigate to Customer List",
    description:
      "Follow the steps below to access and view the list of all registered customers in the CRM system:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left menu'</strong> in the Atomwalk dashboard",
          "Select <strong>'My Customers (CRM)'</strong>",
          "Click on <strong>'Customer List'</strong> to open the customer records module",
        ],
      },
    ],
    notes: ["No permission required for view access, but edit/delete requires appropriate role."],
  },
  {
    title: "View Customer Data",
    description: "This screen displays a real-time view of all customer records, search tools, and KPIs:",
    sections: [
      {
        title: "View Details",
        icon: <FaEye />,
        items: [
          "Customer data appears as <strong>cards</strong> and <strong>tabular views</strong> with fields like <strong>Name</strong>, <strong>Email</strong>, <strong>Mobile</strong>, <strong>GST Status</strong>, and <strong>Outstanding Invoices</strong>.",
          "You can search using filters such as <strong>Customer Type</strong>, <strong>Primary/Secondary Group</strong>, <strong>State</strong>, and <strong>Order Year (FY)</strong>.",
          "Use the toggle to switch between <strong>Current FY</strong> and <strong>Previous FY</strong>.",
        ],
      },
    ],
    notes: [
      "KPIs such as <strong>Customer Group Distribution</strong>, <strong>Top 5 Customer Sales</strong>, and <strong>Quotation Summary</strong> are visible on the dashboard.",
      "You can click on a customer card to view detailed activity such as orders, PO links, and invoices.",
      "The <strong>search bar</strong> at the top allows quick filtering by customer name or keyword to efficiently find customer records.",
    ],
  },
  
  {
    title: "Export Customer Records",
    description: "Download filtered or full customer data for reporting or offline analysis:",
    sections: [
      {
        title: "Download Options",
        icon: <FaDownload />,
        items: [
          "Use the <strong>'Download XLS'</strong> or <strong>'Download PDF'</strong> buttons at the top right.",
          "Downloaded files reflect the currently applied filters and visible data.",
        ],
      },
    ],
    notes: [
      "Downloaded reports are useful for offline sharing or finance team audits.",
      "Make sure to apply the right filters before exporting.",
    ],
  },
],
"Customer Task List": [
  { accesspath: "CRM → CustomerList → Task List" },
  {
    title: "Navigate to Customer List Task List",
    description:
      "Follow the steps below to access and manage tasks associated with customers in the CRM system:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left menu'</strong>",
          "Select <strong>'My Customers (CRM)'</strong>",
          "Click on <strong>'Customer List'</strong>",
          "Select a customer record",
          "Navigate to the <strong>'Task List'</strong> tab to view and manage tasks",
        ],
      },
    ],
    notes: [
      "Task List allows you to track tasks related to specific customers.",
      "Customer selection is required before accessing the Task List.",
    ],
  },
  {
    title: "Task Entry Form Fields",
    description: "Enter or edit task details using the fields below:",
    sections: [
      {
        title: "Task Information Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Task Name</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Task Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Task Sub Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Planned Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Time Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>End Time</TableCell>
                  <TableCell>Time Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Priority</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Task Status</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remark</TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Task Owner</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Current User Assigned</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Fields marked as <strong>Required</strong> must be filled before submission.",
    ],
  },
  {
    title: "Submit Task Entry",
    description: "Complete and save the task information:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Fill in all required fields in the task form.",
          "Click <strong>'Save'</strong> to add the task for the selected customer.",
          "On successful save, the task list will refresh to show the Task List for Customer.",
        ],
      },
    ],
    notes: [
      "Ensure the planned date and priority are correctly set to maintain task schedules.",
      "If You Decide not to Assign a task, You can navigate back to the <strong>Customer List</strong> without saving by using the customer List button",
    ],
  },
],

"Customer Product Interest": [
  {
    accesspath: "CRM → Customer List → Product Interest"
  },
  {
    title: "Navigate to Customer Product Interest",
    description: "Follow this path to view and manage product interest details for customers:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong> ",
          "Click on the <strong>'CRM'</strong> module",
          "Select <strong>'Customer List'</strong> from the menu",
          "Click on the <strong>'Product Interest'</strong> ",
        ],
      },
    ],
    notes: [
      "This section allows you to view customers' interests in different products.",
      "You can upload TaskProductInterest data and download reports as needed."
    ],
  },
  {
    title: "Product Interest View Details",
    description: "The product interest view displays detailed fields related to customer interest:",
    sections: [
      {
        title: "Displayed Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Product Category</TableCell>
                  <TableCell>Category of the product customer is interested in</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product Variation</TableCell>
                  <TableCell>Specific variant or model of the product</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Required By Date</TableCell>
                  <TableCell>The date by which the customer needs the product</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Current status of the product interest (e.g., Pending, Confirmed)</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Status is managed internally and cannot be changed manually in this view."
    ],
  },
  {
    title: "Upload Product Interest Data",
    description: "Upload product interest data files to update customer interests in bulk:",
    sections: [
      {
        title: "Upload Features",
        icon: <FaUpload />,
        items: [
          "Upload file should contain customer and product interest data",
          "Ensure data matches required format for successful import",
          "Uploading updates the CRM customer product interest records",
        ],
      },
    ],
    notes: [
      "Uploading TaskProductInterest data is supported to update this information in bulk.",
    ],
  },
  {
    title: "Download Product Interest Data",
    description: "Download customer product interest data for offline use or reporting:",
    sections: [
      {
        title: "Download Options",
        icon: <FaDownload />,
        items: [
          "Click the <strong>'Download'</strong> button on the Product Interest page",
          "Choose the desired file format (e.g., Excel, CSV, PDF)",
          "Downloaded file contains filtered or full customer product interest data",
        ],
      },
    ],
    notes: [
      "Use downloads for sharing reports or offline analysis.",
      "Ensure you have the necessary permissions to download data.",
    ],
  },
  {
    title: "Return to Customer Product Interest Data",
    description: "Navigate back to the Customer Product Interest list",
    sections: [
      {
        title: "Back Navigation",
        icon: <FaArrowLeft />,
        items: [
          "Click the <strong>'Back'</strong> button on the Product Interest page",
          "You will be redirected to the <strong>'Customer Product Interest Data'</strong> or previous screen",
        ],
      },
    ],
    notes: [
      "Use this option to exit the current view without uploading or downloading.",
    ],
  },
],

"Customer Add Product Interest": [
  {
    accesspath: "CRM --> Customer List --> Product Interest --> Add Product Interest",
  },
  {
    title: "Navigate to Add Product Interest Form",
    description: "Use the steps below to reach the Product Interest entry screen for a customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Click <strong>'Customer List'</strong>",
          "Select <strong>'Product Interest'</strong> from a specific customer record",
          "Click <strong>'Add Product Interest'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure the customer profile is selected before adding product interest."
    ],
  },
  {
    title: "Form Fields",
    description: "Below fields are available while adding a new product interest for a customer:",
    sections: [
      {
        title: "Form Details",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Product Category</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variation Name</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variation Value</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variation Name (2)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variation Value (2)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variation Name (3)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variation Value (3)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product Info</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "At least one set of Variation Name and Value is mandatory along with Product Category.",
    ],
  },
  {
    title: "Submission Process",
    description: "How to complete and submit the Product Interest form:",
    sections: [
      {
        title: "Submit the Form",
        icon: <FaPaperPlane />,
        items: [
          "Ensure all mandatory fields are selected.",
          "Click <strong>'Save'</strong> or <strong>'Add Product Interest'</strong> to submit.",
        ],
      },
    ],
    notes: [
      "You can upload data via TaskProductInterest for bulk operations.",
    ],
  },
  {
    title: "Cancellation Logic & Navigation",
    description: "If you choose not to continue with the form:",
    sections: [
      {
        title: "Cancel / Go Back",
        icon: <FaArrowLeft />,
        items: [
          "Use the cancel or back option to return to the <strong>Customer Product Interest Dashboard</strong>.",
        ],
      },
    ],
    notes: [
      "No data will be saved unless explicitly submitted.",
    ],
  },
],

"Customer TDS Received": [
  {
    accesspath: "CRM --> Customer List --> TDS Received --> TDS Record",
  },
  {
    title: "Navigate to TDS Record View",
    description: "Follow the path below to view TDS records received from a customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'CRM'</strong>",
          "Click on <strong>'Customer List'</strong>",
          "Choose a customer and click <strong>'TDS Received'</strong>",
          "Select <strong>'TDS Record'</strong> to view details",
        ],
      },
    ],
    
  },
  {
    title: "Displayed Fields",
    description: "The following fields are displayed in the TDS Record view (read-only):",
    sections: [
      {
        title: "TDS Record Columns",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell>Display</TableCell>
                  <TableCell>Not Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Book Date</TableCell>
                  <TableCell>Display</TableCell>
                  <TableCell>Not Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Display</TableCell>
                  <TableCell>Not Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TDS Amount</TableCell>
                  <TableCell>Display</TableCell>
                  <TableCell>Not Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Utilised Amount</TableCell>
                  <TableCell>Display</TableCell>
                  <TableCell>Not Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Display</TableCell>
                  <TableCell>Not Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Button</TableCell>
                  <TableCell>Not Required</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "All fields are read-only and used for display purposes.",
    ],
  },
  {
    title: "Submission / Interaction",
    description: "Interactions available in the TDS record view:",
    sections: [
      {
        title: "Action Buttons",
        icon: <FaPaperPlane />,
        items: [
          "Perform allowed actions (e.g., download/view attachments or redirection).",
        ],
      },
    ],
    notes: [
      "No form submission required as this is a view-only screen.",
    ],
  },
  {
    title: "Navigation & Redirection Note",
    description: "Handle screen transitions and redirections appropriately:",
    sections: [
      {
        title: "Return Navigation",
        icon: <FaArrowLeft />,
        items: [
          "Use back navigation to return to the <strong>Customer List</strong> screen.",
        ],
      },
    ],
    
  },
],

"Customer Add TDS Record": [
  {
    accesspath: "CRM --> Customer List --> TDS Received --> Add TDS",
  },
  {
    title: "Navigate to Add TDS Record",
    description: "Follow the steps below to add a new TDS record for a customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Go to <strong>'CRM'</strong>",
          "Click on <strong>'Customer List'</strong>",
          "Select a customer and click <strong>'TDS Received'</strong>",
          "Click <strong>'Add TDS'</strong> to open the entry form",
        ],
      },
    ],
    notes: [
      "Ensure you have proper permissions to add TDS records.",
    ],
  },
  {
    title: "Form Fields",
    description: "Fill in the following fields to add a TDS record:",
    sections: [
      {
        title: "Field Details",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Book Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TDS Amount</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TDS Section</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Required fields include Paid Amount and TDS Amount.",
    ],
  },
  {
    title: "Submission Process",
    description: "Steps to save the new TDS record:",
    sections: [
      {
        title: "Submit Form",
        icon: <FaPaperPlane />,
        items: [
          "Fill in the required fields.",
          "Click on the <strong>'Save'</strong> or <strong>'Add'</strong> button to submit.",
        ],
      },
    ],
    notes: [
      "Ensure no validation errors before submission.",
    ],
  },
  {
    title: "Upload Support",
    description: "Upload multiple TDS records at once using a supported file format:",
    sections: [
      {
        title: "Upload via File",
        icon: <FaUpload />,
        items: [
          "Click on the <strong>'Upload'</strong> button within the TDS Received screen.",
          "Choose a valid file in CSV or Excel format with columns matching required fields.",
          "Verify all mandatory columns (Paid Amount, TDS Amount) are filled.",
          "Click <strong>'Upload'</strong> to process the bulk data.",
        ],
      },
    ],
    notes: [
      "Only .csv or .xlsx formats are supported.",
      "Ensure the file template structure is followed (check sample template if available).",
      "Uploaded data should match existing customer context.",
    ],
  },
  {
    title: "Navigate Back",
    description: "Handle form cancellation and navigation:",
    sections: [
      {
        title: "Cancel and Navigate Back",
        icon: <FaArrowLeft />,
        items: [
          "Use the TDS Record List button to return to <strong>TDS Records</strong>.",
        ],
      },
    ],
    notes: [
      "Form currently redirects to TDS Records after submission/cancel",
    ],
  },
],

"Update Customer": [
  {
    accesspath: "CRM --> Customer List --> Update Customer",
  },
  {
    title: "Navigate to Update Customer",
    description: "Use the following steps to update customer information:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Go to <strong>'CRM'</strong>",
          "Click on <strong>'Customer List'</strong>",
          "Search and select the customer you want to update",
          "Click on <strong>'Update'</strong> to open the Update Customer form",
        ],
      },
    ],
    
  },
  {
    title: "Form Fields",
    description: "Edit the following fields to update the customer details:",
    sections: [
      {
        title: "Field Details",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow><TableCell>Name</TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell>Email</TableCell><TableCell>Email</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell>Mobile</TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Address</TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Contact Name</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer Alias</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>City Name</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Pin Code</TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>State Code</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Country</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer From Date</TableCell><TableCell>Date</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer Type</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer Group (Primary)</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer Group (Secondary)</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Image</TableCell><TableCell>File (Image)</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Is this Customer a Supplier</TableCell><TableCell>Checkbox</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Is Channel Partner</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Referred by Channel Partner</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Payment Terms</TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Default Email List</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Remarks</TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Customer Name and Email ID are mandatory fields.",
    ],
  },
  {
    title: "Submission Process",
    description: "Save updated details using the following steps:",
    sections: [
      {
        title: "Submit Form",
        icon: <FaPaperPlane />,
        items: [
          "Update the required fields.",
          "Click on the <strong>'Submit'</strong>  button.",
        ],
      },
    ],
    notes: [
      "Fix the redirection issue: it should stay on the Update screen or show success, not redirect to Customer List immediately.",
    ],
  },
  {
    title: "Download PDF",
    description: "After updating, you can download customer details:",
    sections: [
      {
        title: "Download Customer PDF",
        icon: <FaDownload />,
        items: [
          "Click on the <strong>'Download PDF'</strong> option after update.",
        ],
      },
    ],
   
  },
  {
    title: "Navigate Back",
    description: "Return to the customer list view:",
    sections: [
      {
        title: "Back to List",
        icon: <FaArrowLeft />,
        items: [
          "Use the <strong>'Customer List'</strong> button to return to the <strong>Customer List</strong>.",
        ],
      },
    ],
  },
],

"Customer Document List": [
  {
    accesspath: "CRM --> Customer List --> Click on Customer --> Document List",
  },
  {
    title: "Navigate to Customer Document List",
    description: "View all uploaded documents related to a specific customer.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'Customer List'</strong>",
          "Click on a customer entry from the list",
          "Select the <strong>'Document List'</strong> tab or option",
        ],
      },
    ],
    notes: [
      "This section is for viewing only; no form entry or update is required.",
    ],
  },
  {
    title: "View Details",
    description: "Once in the Document List section, you can view the documents associated with the selected customer.",
    sections: [
      {
        title: "Document Actions",
        icon: <FaEdit />,
        items: [
          "Review the uploaded documents listed.",
          "View file name, upload date, type, and uploader (if available).",
          "Click to preview or download the files if links are available.",
        ],
      },
    ],
    notes: [
      "This screen is read-only and for reference purposes only.",
    ],
  },
  {
    title: "Navigate Back",
    description: "Return to the Customer Details or List page:",
    sections: [
      {
        title: "Back Navigation",
        icon: <FaArrowLeft />,
        items: [
          "Click the <strong>'Back'</strong> button or breadcrumb to return to <strong>Customer Details</strong>.",
        ],
      },
    ],
  },
],
"Add New Document": [
  {
    accesspath: "CRM --> Customer List --> Click on Customer --> Document List --> Add New Document",
  },
  {
    title: "Navigate to Add New Document",
    description: "Follow the steps below to add a new document for a customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click <strong>'CRM'</strong>",
          "Open <strong>'Customer List'</strong>",
          "Select a customer from the list",
          "Click <strong>'Document List'</strong>",
          "Click <strong>'Add New Document'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure you are viewing a specific customer's document section before adding a document.",
    ],
  },
  {
    title: "Form Fields",
    description: "Fill out the following fields to upload a new document:",
    sections: [
      {
        title: "Field Details",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Document Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Document Name</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Document File</TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Valid From Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Valid To Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    
  },
  {
    title: "Submission Process",
    description: "Steps to save the uploaded document:",
    sections: [
      {
        title: "Submit Form",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Save'</strong> or <strong>'Add Document'</strong> button to add the document.",
        ],
      },
    ],
    notes: [
      "Ensure file format and size limits are met before uploading.",
    ],
  },
  {
    title: "Navigate Back",
    description: "Return to the Document List view:",
    sections: [
      {
        title: "Cancel and Navigate Back",
        icon: <FaArrowLeft />,
        items: [
          "Click the <strong>'Back'</strong> button to return to the <strong>List of Documents</strong>.",
        ],
      },
    ],
    notes: [
      "After submission or cancellation, user should be taken back to the List of Documents view.",
    ],
  },
],

"Customer View Audit": [
  {
    accesspath: "CRM --> Customer List --> Click on Customer --> View Audit",
  },
  {
    title: "Navigate to View Audit",
    description: "Follow these steps to view the audit history of a customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Open the <strong>'Customer List'</strong>",
          "Click on a customer entry to open details",
          "Click <strong>'View Audit'</strong> to open the audit logs",
        ],
      },
    ],
    notes: [
      "Audit view is read-only and used for tracking changes or activities for a specific customer.",
    ],
  },
  {
    title: "View Data",
    description: "The audit section shows recorded logs such as field changes, timestamps, and user actions.",
    sections: [
      {
        title: "Audit Information",
        icon: <FaEdit />,
        items: [
          "View the changes made to customer data fields.",
        ],
      },
    ],
    notes: [
      "There is no data entry in this section; it is meant purely for viewing.",
    ],
  },
  {
    title: "Navigation",
    description: "Return from the audit screen:",
    sections: [
      {
        title: "Back to Customer Details",
        icon: <FaArrowLeft />,
        items: [
          "Click the <strong>'Back'</strong> button or close icon to return to <strong>Customer Details</strong>.",
        ],
      },
    ],
    notes: [
      "No download, upload, or form submission is available in this section.",
    ],
  },
],

"Customer Generate Agreement": [
  {
    accesspath: "CRM --> Customer List --> Click on Customer --> Generate Agreement",
  },
  {
    title: "Navigate to Generate Agreement",
    description: "Use the following steps to generate an agreement for a selected customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Open the <strong>'Customer List'</strong>",
          "Click on a customer entry to open details",
          "Click <strong>'Generate Agreement'</strong> to open the agreement form",
        ],
      },
    ],
    notes: [
      "Ensure the selected customer has all necessary details before generating an agreement.",
    ],
  },
  {
    title: "Form Fields",
    description: "Fill in the following details to create an agreement:",
    sections: [
      {
        title: "Field Details",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Mandatory</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Agreement Type</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Valid Till Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Field Name 1</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Field Value 1</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Field Name 2</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Field Value 2</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Field Name 3</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Field Value 3</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>No</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Only Agreement Type and Valid Till Date are mandatory.",
      "Other fields can be used for custom agreement values.",
    ],
  },
  {
    title: "Submission Process",
    description: "Follow these steps to generate and download the agreement:",
    sections: [
      {
        title: "Submit Agreement",
        icon: <FaPaperPlane />,
        items: [
          "Fill the required fields in the form.",
          "Click the <strong>'PDF Agreement'</strong> button to create the agreement.",
        ],
      },
    ],
    notes: [
      "The system generates and downloads the agreement PDF.",
    ],
  },
  {
    title: "Navigate Back",
    description: "Return to the customer detail screen:",
    sections: [
      {
        title: "Back to Customer Details",
        icon: <FaArrowLeft />,
        items: [
          "Click the <strong>'Back'</strong> button to return to <strong>Customer Details</strong>.",
        ],
      },
    ],
    
  },
],

  // "Client History": [
  //   {
  //     title: "Navigate to Client History",
  //     description:
  //       "Follow these steps to view a client’s interaction and transaction history:",
  //     sections: [
  //       {
  //         title: "Navigation Path",
  //         icon: <FaRoute />,
  //         items: [
  //           "Go to <strong>'CRM'</strong> section",
  //           "Click on <strong>'Customer List'</strong>",
  //           "Search and select the desired <strong>Client Profile</strong>",
  //           "Click on the <strong>'History'</strong> tab or button",
  //         ],
  //       },
  //     ],
  //     notes: [
  //       "You must have access rights to view <strong>Client History</strong>",
  //       "Client must exist in the system before viewing history",
  //     ],
  //   },
  //   {
  //     title: "Viewable History Sections",
  //     description:
  //       "The client history panel displays various types of tracked data:",
  //     sections: [
  //       {
  //         title: "History Categories",
  //         icon: <FaEdit />,
  //         items: [
  //           "<strong>Profile Updates</strong> – See changes to contact, type, and address information",
  //           "<strong>Interaction Logs</strong> – Past calls, emails, and meetings with timestamps",
  //           "<strong>Purchase/Service Records</strong> – List of purchases, service usage, or bookings",
  //           "<strong>Ticket & Complaint Records</strong> – Any issues raised and their resolution status",
  //           "<strong>Communication Trail</strong> – Email chains, WhatsApp messages (if integrated)",
  //           "<strong>Notes & Remarks</strong> – Internal team comments or follow-up reminders",
  //         ],
  //       },
  //     ],
  //     notes: [
  //       "Records are shown in <strong>reverse chronological order</strong>",
  //       "Filters are available by <strong>date, type, or status</strong>",
  //       "Export option available in CSV/PDF if enabled",
  //     ],
  //   },
  //   {
  //     title: "Use and Interpret History Data",
  //     description:
  //       "Guidelines to effectively use client history data for engagement and support:",
  //     sections: [
  //       {
  //         title: "Best Practices",
  //         icon: <FaLightbulb />,
  //         items: [
  //           "Use recent interaction logs to <strong>prepare for follow-ups</strong>",
  //           "Review complaint history before <strong>resolving new tickets</strong>",
  //           "Track trends in <strong>client purchase behavior</strong> for upsell opportunities",
  //           "Ensure data accuracy and raise corrections if you spot anomalies",
  //         ],
  //       },
  //     ],
  //     notes: [
  //       "Client history helps ensure <strong>continuity of service</strong> and context-aware support",
  //       "Data shown depends on module integrations and permissions",
  //     ],
  //   },
  // ],
 

  "Add Account": [
    {
      title: "Navigate to Add Account",
      description:
        "Access the customer's bank account information form using the steps below:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Customer List'</strong>",
            "Open the <strong>Customer Profile</strong> you want to update",
            "Click on <strong>'Update'</strong>",
            "Navigate to the <strong>'Bank Account'</strong> tab",
            "Click on <strong>'Add Account'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to CRM is required.",
        "You must be in the correct customer profile to add a bank account.",
      ],
    },
    {
      title: "Add Account Details",
      description: "Fill in all mandatory banking information accurately:",
      sections: [
        {
          title: "Bank Account Form",
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
                    <TableCell>
                      <strong>Account Number</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Must be numeric, 9–18 digits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Account Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required; alphabetic characters only</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Account Currency</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Must select from available currencies</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Bank Name</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Must select from predefined list</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>IFSC Code</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Must match format (e.g., XXXX0000000)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>BIC Code</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional, validate if entered</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Branch Address</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Max 300 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Default Account</strong>
                    </TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional, only one default allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Payment Terms</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Optional; used for billing agreements</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Payment Note</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Optional; max 200 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Invoice Note</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Optional; appears on invoices</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Additional Note</strong>
                    </TableCell>
                    <TableCell>Textarea</TableCell>
                    <TableCell>Optional; for internal use</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Account number, account name, currency, and bank name are mandatory.",
        "IFSC and branch address are important for India-based transactions.",
      ],
    },
    {
      title: "Submit Account Details",
      description: "Once all fields are complete, follow these steps to save:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> the entered data carefully",
            "Click the <strong>'Save Account'</strong> button",
            "Wait for a <strong>confirmation message</strong>",
            "The account will now appear in the <strong>Customer's Bank Account List</strong>",
          ],
        },
      ],
     
    },
  ],

  // FOR SUPPLIER

  "Add Supplier": [
    {
      title: "Navigate to Add Supplier",
      description: "Follow this path to add a new supplier to the CRM:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Supplier List'</strong>",
            "Click on <strong>'Add Supplier'</strong> button",
          ],
        },
      ],
     
    },
    {
      title: "Enter Supplier Information",
      description: "Fill in all necessary fields to create a supplier profile:",
      sections: [
        {
          title: "Supplier Details Form",
          icon: <FaRegAddressBook />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>GSTN</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; 15 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>PAN Number</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; 10 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>TAN Number</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Email ID</strong>
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Mobile Number</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional; 10 digits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Alternate Contact Number</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Registered Address</strong>
                    </TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Contact Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Alias</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>City Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Pin Code</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional; 6 digits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>State Code</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Country</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer From Date</strong>
                    </TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Group (Primary)</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Group (Secondary)</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Image</strong>
                    </TableCell>
                    <TableCell>Image Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Is this Customer a Supplier</strong>
                    </TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Set to True</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Is Channel Partner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Referred by Channel Partner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Payment Terms</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Default Email List</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      
    },
    {
      title: "Submit and Confirm",
      description: "Complete the process to save the new supplier profile:",
      sections: [
        {
          title: "Submission",
          icon: <FaCheckCircle />,
          items: [
            "After entering all fields, click on <strong>'Save'</strong>",
            "You’ll receive confirmation of successful supplier creation",
            "Supplier will now appear in the <strong>Supplier List</strong> ",
          ],
        },
      ],
      notes: [
        "Fields can be edited later through the Update option",
      ],
    },
    {
    title: "Cancel and Navigate Back",
    description: "Exit the add supplier form without saving:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "Click on <strong>'Customer List'</strong> or use the <strong>back button</strong> in the header",
          "You will be redirected back to the  <strong>Customer List</strong> ",
        ],
      },
    ],
    notes: [
      "No data will be saved if the form is exited without submission",
    ],
  },
  ],

"Supplier List View": [
  {
    title: "Access Supplier List",
    description: "View and manage all supplier records available in the CRM system.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'Supplier List'</strong>",
        ],
      },
    ],
  },
  {
    title: "Supplier Overview & Filters",
    description: "You can filter and search supplier data and view supplier analytics.",
    sections: [
      {
        title: "Filter Options",
        icon: <FaEdit />,
        items: [
          "Search by <strong>Customer Name</strong> using the search input field.",
          "Apply filters such as <strong>Customer Type</strong>, <strong>Primary Group</strong>, <strong>Secondary Group</strong>, <strong>State</strong>, and <strong>Order Filter (Current FY/Previous FY)</strong>.",
          "Click on charts (like <strong>Customer Group wise Distribution</strong>) to drill into filtered data segments.",
        ],
      },
      {
        title: "Supplier Cards",
        icon: <FaRegAddressBook />,
        items: [
          "Each supplier card displays key info such as:",
          "➡️ <strong>Customer Name</strong>, <strong>Email</strong>, <strong>Mobile</strong>, <strong>GST Status</strong>",
          "➡️ <strong>Sales Order Count</strong>, <strong>PO Linked</strong>, <strong>Outstanding Invoice</strong>",
          "➡️ <strong>Referred By Partner</strong> (if applicable)",
        ],
      },
      {
        title: "Charts & Insights",
        icon: <FaChartPie />,
        items: [
          "Displays <strong>Customer Group Distribution</strong> in percentages and numbers (e.g., CLIENT, PREMIUM CLIENT, Not Assigned).",
          "Shows top 5 customers based on <strong>Sales</strong> and <strong>Quotations</strong> (data depends on current FY selection).",
        ],
      },
    ],
    notes: [
      "Search, filter, and visual analytics help users quickly find and analyze supplier data.",
      "Chart toggling between <strong>Current FY</strong> and <strong>Previous FY</strong> is available for deeper insights.",
    ],
  },
    {
    title: "Export Supplier List",
    description: "Download the list of suppliers for offline use or reporting.",
    sections: [
      {
        title: "Export Options",
        icon: <FaDownload />,
        items: [
          "Click the <strong>'PDF/Excel'</strong> button available on the Supplier List screen.",
          "The download will reflect applied filters and selected data.",
        ],
      },
    ],
    notes: [
      "Ensure the correct filters are applied before downloading for accurate data.",
      "Downloaded files include visible supplier fields and summary data.",
    ],
  },
],

  "Update Information": [
    {
      title: "Navigate to Supplier Update Information",
      description:
        "Follow this path to update supplier information in the CRM:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Supplier List'</strong>",
            "Click on <strong>'Updates'</strong> for the supplier you want to update",
          ],
        },
      ],
      notes: [
        "Make sure to search for the supplier by either Customer name or GSTN to locate the correct record",
      ],
    },
    {
      title: "Update Supplier Information",
      description:
        "Modify the necessary fields to update the supplier profile:",
      sections: [
        {
          title: "Supplier Update Form",
          icon: <FaRegEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>GSTN</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; 15 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>PAN Number</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; 10 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>TAN Number</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Email ID</strong>
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Mobile Number</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional; 10 digits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Alternate Contact Number</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Registered Address</strong>
                    </TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Contact Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Alias</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>City Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Pin Code</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Optional; 6 digits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>State Code</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Country</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer From Date</strong>
                    </TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Group (Primary)</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Group (Secondary)</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Image</strong>
                    </TableCell>
                    <TableCell>Image Upload</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Is this Customer a Supplier</strong>
                    </TableCell>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Is Channel Partner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Referred by Channel Partner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Payment Terms</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Default Email List</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Ensure all mandatory fields are completed before submitting updates",
        "Review updated information to avoid errors",
      ],
    },
    {
      title: "Submit and Confirm Updates",
      description:
        "After modifying the necessary details, submit the updated supplier information:",
      sections: [
        {
          title: "Submission",
          icon: <FaCheckCircle />,
          items: [
            "Click on <strong>'Submit'</strong> after making the necessary updates",
            "A confirmation message will appear upon successful update",
            "The updated supplier information will reflect in the <strong>Supplier List</strong>",
          ],
        },
      ],
      notes: [
        "In case of a mistake, updates can be revised by repeating the process",
        "Make sure to review changes to confirm accuracy",
      ],
    },
  ],
  "Delete Information": [
    {
      title: "Delete Supplier Information",
      description:
        "Follow the steps to delete a supplier record from the Supplier List:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Supplier List'</strong>",
            "Click on the specific <strong>'Supplier Details'</strong>",
            "Click on <strong>'Delete'</strong> to remove the supplier record",
          ],
        },
      ],
      notes: [
        "Once deleted, this action cannot be undone",
        "Ensure no active transactions are linked to the supplier before deleting",
      ],
    },
    {
    title: "Cancel or Exit Without Deletion",
    sections: [
      {
        title: "Return Navigation",
        icon: <FaArrowLeft />,
        items: [
          "You can return to the <strong>'Customer List'</strong> without deleting the supplier.",
          "No confirmation is required if the delete action was not initiated.",
        ],
      },
    ],
    notes: [
      "Deleting is optional—use only when you are certain.",
    ],
  },
  ],

  "Document List": [
    {
      title: "Navigate to Supplier List Document Section",
      description:
        "Follow these steps to access and manage the document list for suppliers:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
           "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Supplier List'</strong>",
            "Click on the specific <strong>'Supplier Details'</strong>",
            "Then navigate to <strong>'Document List'</strong> to manage documents",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the CRM system is required to manage supplier documents",
      ],
    },
    {
    title: "View Document List Layout",
    description:
      "Each document record is listed with status and validity details:",
    sections: [
      {
        title: "Document Card Format",
        icon: <FaRegFileAlt />,
        items: [
          "<strong>Document Title</strong> (e.g., 'Product Inspection')",
          "<strong>Validity Period</strong>: e.g., [May 15, 2025 – May 28, 2025]",
          "<strong>Status</strong>: ACTIVE / EXPIRED",
          "<strong>Tag/Label</strong>: Based on document type or custom label (e.g., Dummy [Product Inspection])",
        ],
      },
    ],
    notes : [
              "You can click the <strong>'Back'</strong> button to return to the <strong>Customer Details</strong> page",
    ]
    
  },
  ],

"Document List Updates": [
  {
    title: "Navigate to Supplier Document List",
    description: "Follow this path to access the Supplier Document update form:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'Supplier List'</strong>",
          "Click on the specific <strong>'Supplier Details'</strong>",
          "Click on <strong>'Document List'</strong>",
          "Select <strong>'Update'</strong> action for the supplier",
        ],
      },
    ],
    notes: [
      "Ensure you have appropriate <strong>CRM access permissions</strong> to update supplier documents.",
    ],
  },
  {
    title: "Document Details Form",
    description: "Fill out all required fields accurately to ensure proper document update:",
    sections: [
      {
        title: "Supplier Document Fields",
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
                  <TableCell><strong>Document Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Document Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Document File</strong></TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Optional (PDF, Image, or Doc formats supported)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Valid From Date</strong></TableCell>
                  <TableCell>DatePicker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Valid To Date</strong></TableCell>
                  <TableCell>DatePicker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remarks</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Document Type selection is mandatory before submission.",
      "Ensure the file uploaded does not exceed the maximum size limit (usually 5MB).",
    ],
  },
  {
    title: "Submit the Supplier Document",
    description: "After filling in the necessary details, complete the update as follows:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>'Save'</strong> or <strong>'Submit'</strong> button at the bottom of the form",
          "System will validate mandatory fields",
          "Once submitted, the updated document will appear in the <strong>'List of Documents'</strong>",
        ],
      },
    ],
    notes: [
      "You can return to the document list at any time to view the updated file.",
    ],
  },
],

"Generate Supplier Agreement": [
  {
    title: "Navigate to Generate Agreement",
    description:
      "Follow this path to create a new agreement for a supplier profile:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'Supplier List'</strong>",
          "Choose the relevant <strong>Supplier</strong>",
          "Click on <strong>'Generate Agreement'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure you have proper access to <strong>Supplier Agreement Management</strong>.",
    ],
  },
  {
    title: "Agreement Form Fields",
    description:
      "Fill out all required and optional fields to generate the supplier agreement:",
    sections: [
      {
        title: "Agreement Field Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Agreement Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell><strong>Mandatory</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Valid Till Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell><strong>Mandatory</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Field Name 1</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Field Value 1</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Field Name 2</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Field Value 2</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Field Name 3</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Field Value 3</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Fields can be customized to fit various agreement types.",
      "Agreement Type and Valid Till Date are strictly required.",
    ],
  },
  {
    title: "Submit Agreement",
    description: "Complete the process to generate and save the supplier agreement:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Ensure all <strong>mandatory fields</strong> are correctly filled",
          "Click the <strong>'PDF Agreement'</strong> or <strong>'Submit'</strong> button",
        ],
      },
    ],
    notes: [
      "You may return to <strong>Channel Partner Details</strong> without generating an agreement.",
    ],
  },
],

"Add Task Detail": [
  {
    title: "Navigate to Add Task Detail",
    description: "Follow the steps below to add a task detail for a customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'Supplier List'</strong>",
          "Click on <strong>'Task List'</strong>",
          "Choose <strong>'Add Task Detail for Customer'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure CRM module access is enabled.",
      "You can return to the <strong>Customer List</strong> after updating the task.",
    ],
  },
  {
    title: "Task Detail Form Fields",
    description: "Enter the task details correctly. Mandatory fields must be filled to proceed:",
    sections: [
      {
        title: "Task Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Task Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Sub Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Planned Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Start Time</strong></TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>End Time</strong></TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Priority</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remark</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Owner</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Current User Assigned</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["If you're encountering an error, please contact the system administrator or IT support."],
  },
  {
    title: "Submit Task Details",
    description: "Complete the form and submit the task entry:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Verify all details entered in the form",
          "Click on <strong>'Add Task'</strong> or <strong>'Submit'</strong>",
          "System will validate and save the record",
          "After success, you'll be redirected to the updated <strong>Task List for Customer</strong>",
        ],
      },
    ],
    notes: ["Task details help in tracking supplier-related actions effectively.","You may also return to the <strong>Customer List</strong> without adding a task."],
  },
],


"View Product Interest": [
  {
    title: "Navigate to Product Interest",
    description:
      "Follow this path to view product interests for a supplier:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'Supplier List'</strong>",
          "Click on <strong>'Product Interest'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure you have appropriate access to view supplier product interests.",
    ],
  },
  {
    title: "Product Interest Details",
    description:
      "View all recorded product interests for a supplier. No data entry is required on this screen.",
    sections: [
      {
        title: "Product Interest Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Product Category</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Display only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Product Variation</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Display only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Required By Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Display only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Display only</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Data shown is read-only",
      "Linked with <strong>Customer Product Interest Data</strong>.",
    ],
  },
],
"Add Product Interest": [
  {
    title: "Navigate to Add Product Interest",
    description:
      "Follow this path to record a new product interest for a supplier:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'Supplier List'</strong>",
          "Click on <strong>'Product Interest'</strong>",
          "Select <strong>'Add Product Interest'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure you have access rights to add product interest entries.",
    ],
  },
  {
    title: "Product Interest Entry Form",
    description:
      "Fill out the form with accurate information to log product interest details:",
    sections: [
      {
        title: "Product Interest Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Product Category</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name 1</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value 1</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name 2</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value 2</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name 3</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value 3</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Product Info</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Due Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Product Category, Variation Name, and Variation Value are mandatory fields.",
      "This module is linked with <strong>Customer Product Interest Data</strong>.",
      "You may also upload multiple product interests using TaskProductInterest Data upload option.",
    ],
  },
  {
    title: "Submit Product Interest",
    description: "After completing the form, finalize your entry:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "<strong>Review</strong> the details entered",
          "Click on the <strong>'Save'</strong> or <strong>'Submit'</strong> button",
          "The system will validate mandatory fields",
          "Successful submission will reflect in the <strong>Product Interest</strong> list",
        ],
      },
    ],
    notes : [
            "This module is linked with <strong>Customer Product Interest Data</strong>.",
    ]
  },
],
"View TDS Received": [
  {
    title: "View TDS Record",
    description:
      "Use this module to view TDS records associated with a supplier. It displays a list of entries with transaction details including paid amounts and TDS deductions.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'Supplier List'</strong>",
          "Navigate to <strong>'TDS Received'</strong>",
        ],
      },
    ],
    
  },
  {
    title: "TDS Record",
    description:
      "This section allows uploading and managing TDS records against suppliers. Use search and export features for easier access.",
    sections: [
      {
        title: "Available Actions",
        icon: <FaEdit />,
        items: [
          "Use the <strong>Search</strong> box to filter TDS records.",
          "Click <strong>Upload TDS</strong> to import entries from a structured file.",
          "Click <strong>Add TDS</strong> to manually input a new TDS record.",
          "Click <strong>Update</strong> in the Action column to modify an entry.",
          "Download all records using <strong>XLS</strong> or <strong>PDF</strong> export buttons.",
        ],
      },
      {
        title: "Data Columns",
        icon: <FaTable />,
        items: [
          "<strong>Transaction Date</strong> - Date when the payment was made.",
          "<strong>Book Date</strong> - Date the entry is recorded in books.",
          "<strong>Paid Amount</strong> - Total amount paid to the supplier.",
          "<strong>TDS Amount</strong> - Tax Deducted at Source (numeric).",
          "<strong>Utilised Amount</strong> - Amount of TDS utilized.",
          "<strong>Status</strong> - Shows current processing status (e.g., Pending).",
          "<strong>Action</strong> - Options to update or manage the entry.",
        ],
      },
    ],
    notes: [
      "Ensure proper data formatting to avoid upload errors.",
      "TDS upload is supported via structured <strong>CustomerTdsDetails</strong> format.",
    ],
  },
],
"Add TDS Record": [
  {
    title: "Navigate to Add TDS Record",
    description: "Follow the steps below to add a TDS record manually for a supplier:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'Supplier List'</strong>",
          "Navigate to <strong>'TDS Received'</strong>",
          "Click on <strong>'Add TDS'</strong> button",
        ],
      },
    ],
    notes: [
      "Ensure you have CRM module access to enter TDS records.",
    ],
  },
  {
    title: "TDS Record Form Fields",
    description: "Fill out the following fields. Mandatory fields must be completed to proceed:",
    sections: [
      {
        title: "TDS Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Transaction Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Book Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Paid Amount</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>TDS Amount</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>TDS Section</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["Make sure the amount fields are entered correctly for financial records."],
  },
  {
    title: "Submit TDS Record",
    description: "Once the form is completed, follow the steps below to save the TDS entry:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Verify all fields, especially <strong>Paid Amount</strong> and <strong>TDS Amount</strong>",
          "Click on <strong>'Add'</strong> or <strong>'Submit'</strong> to record the entry",
          "The system will validate and store the record",
          "After saving, You'll return to the <strong>'TDS Record'</strong>",
        ],
      },
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click <strong>'TDS Record List'</strong> to discard changes",
          "You'll return to the <strong>'TDS Record'</strong> list screen without saving",
        ],
      },
    ],
    notes: [
      "Double-check all amounts before submission to ensure data accuracy.",
      "TDS upload is also supported via <strong>CustomerTdsDetails</strong> format.",
    ],
  },
],

// MY PERTNER LIST
"Add Channel Partner": [
  {
    title: "Navigate to Add Channel Partner",
    description: "Use this path to add a new channel partner under your CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'My Partner List'</strong>",
          "Click on <strong>'Add Channel Partner'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure CRM module access is active.",
      "You can view all saved entries under <strong>'Channel Partner List'</strong>.",
    ],
  },
  {
    title: "Channel Partner Form Fields",
    description: "Fill the required fields accurately. 'Customer name' and 'Email id' are mandatory:",
    sections: [
      {
        title: "Channel Partner Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Customer name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>GSTN</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>PAN number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>TAN number</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email id</strong></TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile number</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Alternate contact number</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Registered Address</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Contact name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer alias</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>City Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Pin code</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>State code</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Country</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer From Date</strong></TableCell>
                  <TableCell>DatePicker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer type</strong></TableCell>
                  <TableCell>DatePicker</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Group (Primary)</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Group (Secondary)</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File (img)</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is this Customer a supplier</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is Channel Partner</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Referred by Channel Partner</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Payment terms</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Default email list</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remarks</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["Fields marked as required must be filled to enable form submission."],
  },
  {
    title: "Submit Channel Partner Form",
    description: "After completing the form, follow the steps below to submit:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>'Create'</strong> or <strong>'Submit'</strong> button.",
          "System will validate and save the record to the <strong>Channel Partner List</strong>.",
        ],
      },

    ],
    notes: ["You can view the newly added entry from the <strong>Channel Partner List</strong>."],
  },
  {
    title: "Cancel Channel Partner Entry",
    description: "To discard any unsaved information:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click on <strong>'Channel Partner List'</strong> or navigate away before submission.",
          "You’ll return to the <strong>'Channel Partner List'</strong> screen without saving data.",
        ],
      },
    ],
    notes: ["Unsaved changes will not be retained."],
  },
],

"Add My Partner Task Detail": [
  {
    title: "Navigate to Add Task Detail",
    description: "Follow the steps below to add a task detail for a customer:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong> section",
          "Select <strong>'My Partner List'</strong>",
          "Click on <strong>'Task List'</strong>",
          "Choose <strong>'Add New Task'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure CRM module access is enabled.",
    ],
  },
  {
    title: "Task Detail Form Fields",
    description: "Enter the task details correctly. Mandatory fields must be filled to proceed:",
    sections: [
      {
        title: "Task Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Task Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Sub Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Planned Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Start Time</strong></TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>End Time</strong></TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Priority</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remark</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Owner</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Current User Assigned</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "If you're encountering an error, please contact the system administrator or IT support."
    ],
  },
  {
    title: "Submit Task Details",
    description: "Complete the form and submit the task entry:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Verify all details entered in the form.",
          "Click on <strong>'Add Task'</strong> or <strong>'Submit'</strong>.",
          "System will validate and save the record.",
          "After success, you'll be redirected to the updated <strong>Task List for Customer</strong>.",
        ],
      },
    ],
    notes: [
      "Task details help in tracking partner-related actions effectively.",
    ],
  },
  {
    title: "Cancel My Partner Task Entry",
    description: "To discard any unsaved information:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click on <strong>'Customer List'</strong> or navigate away before submission.",
          "You’ll return to the <strong>'Customer List'</strong> screen without saving data.",
        ],
      },
    ],
    notes: ["Unsaved changes will not be retained."],
  },
],

"My Partner Product Interest": [
  {
    title: "Navigate to Product Interest",
    description: "Use this form to capture the product interest details for a partner.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'My Partner List'</strong>",
          "Click on <strong>'Product Interest'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure you have permission to access the CRM Partner section.",
    ],
  },
  {
    title: "Product Interest Form Fields",
    description: "Fill in the following fields to record product interest:",
    sections: [
      {
        title: "Form Field Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Product Category</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Product Info</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Due Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Mandatory fields: Product Category, Variation Name, Variation Value.",
    ],
  },
  {
    title: "Submit Product Interest",
    description: "Save the product interest entry by following these steps:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "After filling out the form, review all details.",
          "Click on <strong>'Add Product Interest'</strong>.",
          "Record will be saved and listed under <strong>'Product Interest List'</strong>.",
        ],
      },
    ],
    notes: [
      "You can upload <strong>TaskProductInterest</strong> data using the upload feature.",
    ],
  },
  {
    title: "Cancel Product Interest Entry",
    description: "To cancel the current product interest data entry:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click on <strong>'Back'</strong> to exit without saving.",
          "You will be redirected to the <strong>Customer Product Interest DataPartner List</strong> screen.",
        ],
      },
    ],
    notes: [
      "Data will not be saved if you cancel before submission.",
    ],
  },
],
"Customer ProductInterest Data Dashboard": [
  {
    title: "View Customer Product Interest Records",
    description: "Displays a list of customer product interests with filtering, visual summaries, and detailed product info.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Click on <strong>'My Partner List'</strong>",
          "Select <strong>'Product Interest'</strong>",
          "Then click on <strong>'Back'</strong> to access <strong>'Customer Product Interest Data'</strong>",
        ],
      },
    ],
    notes: [
      "You can search, filter, and visualize product interests submitted by customers.",
    ],
  },
  {
    title: "Record Display Features",
    description: "Each entry provides a clear overview of the customer's interest with categorized and top product breakdowns.",
    sections: [
      {
        title: "Interface Features",
        icon: <FaEdit />,
        items: [
          "Search bar for filtering by Lead Name and Product Interest keywords.",
          "Dropdown filters for <strong>Product Type</strong> and <strong>Status</strong>.",
          "Category-wise donut chart for product interest breakdown.",
          "Top 10 product interests visualized in a pie chart.",
          "Detailed list view with customer name, email, mobile number, category, and interest data.",
        ],
      },
    ],
    notes: [
      "Charts dynamically reflect the current data set.",
      "Each record includes customer contact and category information.",
    ],
  },
  {
    title: "Upload Customer Product Interest Data",
    description: "Allows bulk upload of product interest data using a specific template.",
    sections: [
      {
        title: "Upload Capability",
        icon: <FaUpload />,
        items: [
          "Click on <strong>'Upload Product Interest'</strong> button.",
          "Upload the <strong>TaskProductInterest</strong> data file.",
        ],
      },
    ],
    notes: [
      "This helps manage bulk customer interest submissions efficiently.",
    ],
  },
],

"PartnerList - TDS Received": [
  { accesspath: "CRM -> Partner List -> TDS Received -> TDS Record" },
  {
    title: "Navigate to TDS Received Records",
    description: "Follow the steps below to view or fetch TDS Received records for partners:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong> 'left'</strong> Menu",
          "Click on <strong>'CRM'</strong> ",
          "Select <strong>'Partner List'</strong>",
          "Click on <strong>'TDS Received'</strong>",
        ],
      },
    ],
    notes: [
      "You can upload data for CustomerTdsDetails.",
    ],
  },
  {
    title: "TDS Received Record List & Filters",
    description: "Use the record list to view transaction details and apply filters:",
    sections: [
      {
        title: "Record List Columns",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell>Date when the transaction occurred</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Book Date</TableCell>
                  <TableCell>Date the transaction was recorded in the system</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Amount paid to the partner</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TDS Amount</TableCell>
                  <TableCell>Tax Deducted at Source amount</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Utilised Amount</TableCell>
                  <TableCell>Amount utilised from the paid amount</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Current state of the TDS record (e.g., Pending)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Update or delete the record using the available actions</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "No manual entry is required for these fields; data is system-generated or uploaded.",
    ],
  },
  {
    title: "Data Upload Capability",
    description: "Upload CustomerTdsDetails data to update TDS Received records:",
    sections: [
      {
        title: "Upload Process",
        icon: <FaPaperPlane />,
        items: [
          "Prepare the CustomerTdsDetails data in the prescribed format.",
          "Navigate to the upload section under TDS Received.",
          "Click on <strong>'Upload TDS'</strong> and select your data file.",
          "Confirm and submit the upload.",
        ],
      },
    ],
    notes: [
      "Ensure data accuracy before uploading to avoid discrepancies.",
      "XLS and PDF download options are available for offline access.",
    ],
  },

],
"PartnerList- Add TDS": [
  { accesspath: "CRM -> Partner List -> TDS Received -> Add TDS" },
  {
    title: "Navigate to Add TDS Entry",
    description: "Use the form to add new TDS entries related to partner payments:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>Left</strong>",
          "Click on <strong>'CRM'</strong> ",
          "Select <strong>'Partner List'</strong>",
          "Click on <strong>'TDS Received'</strong>",
          "Then select <strong>'Add TDS'</strong>",
        ],
      },
    ],
    notes: [
      "This form allows manual entry of TDS records.",
      "TDS Record List is available to view previously entered data.",
    ],
  },
  {
    title: "Add TDS Form Fields",
    description: "Fill in the required fields to successfully add a new TDS entry:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation/Rule</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Book Date</TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Number Input</TableCell>
                  <TableCell><strong>Required</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TDS Amount</TableCell>
                  <TableCell>Number Input</TableCell>
                  <TableCell><strong>Required</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TDS Section</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Fields marked as required must be filled before submission.",
    ],
  },
  {
    title: "Submission Process",
    description: "Steps to submit the Add TDS form:",
    sections: [
      {
        title: "Form Submission",
        icon: <FaPaperPlane />,
        items: [
          "Ensure all mandatory fields (Paid Amount, TDS Amount) are filled.",
          "Click on <strong>'Add'</strong> to save the TDS entry.",
          "Successful entries will reflect in the <strong>'TDS Record List'</strong>.",
        ],
      },
    ],
    notes: [
      "Incomplete forms will trigger validation warnings.",
    ],
  },
  {
    title: "Upload TDS Data",
    description: "You can also upload bulk TDS entries",
    sections: [
      {
        title: "Upload Instructions",
        icon: <FaCloudUploadAlt />,
        items: [
          "Click on <strong>'Upload TDS'</strong> button.",
          "Prepare your data following the required columns: <em>Transaction Date, Book Date, Paid Amount, TDS Amount, TDS Section</em>.",
          "Choose the file and click <strong>'Submit'</strong>.",
        ],
      },
    ],
    notes: [
      "Make sure required fields (Paid Amount and TDS Amount) are filled in the uploaded sheet.",
      "After successful upload, data will reflect in the TDS Record List.",
    ],
  },
  {
    title: "Clear & Cancel Operations",
    description: "Options to reset or exit the form:",
    sections: [
      {
        title: "Cancel/Reset Logic",
        icon: <FaTimesCircle />,
        items: [
          "Click <strong>'TDS Record List'</strong> to return to the TDS Record without saving.",
        ],
      },
    ],
    
  },
],
"Update Channel Partner": [
  {
    title: "Navigate to Update Channel Partner",
    description: "Use this path to update an existing channel partner's information in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
  "Go to the <strong>Left Menu</strong>.",
  "Click on the <strong>CRM</strong> section.",
  "Select <strong>My Partner List</strong> from the options.",
  "Choose the channel partner entry you want to update.",
  "Click on the <strong>Update</strong> button to edit the details.",
],

      },
    ],
    notes: [
      "Only users with proper access can update partner details.",
      "You can view all existing entries under <strong>'Channel Partner List'</strong>.",
    ],
  },
  {
    title: "Update Channel Partner Form Fields",
    description: "Edit the necessary fields. 'Customer name' is mandatory before submission:",
    sections: [
      {
        title: "Channel Partner Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow><TableCell>Customer name</TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell>GSTN</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>PAN number</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>TAN number</TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Email id</TableCell><TableCell>Email</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Mobile number</TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Alternate contact number</TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Registered Address</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Contact name</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer alias</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>City Name</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Pin code</TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>State code</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Country</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer From Date</TableCell><TableCell>Date Picker</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer type</TableCell><TableCell>Option</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell>Customer Group (Primary)</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Customer Group (Secondary)</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Image</TableCell><TableCell>File Upload</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Is this Customer a supplier</TableCell><TableCell>Checkbox</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell>Is Channel Partner</TableCell><TableCell>Option</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Referred by Channel Partner</TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Payment terms</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Default email list</TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell>Remarks</TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["Make sure to update only accurate and verified partner data."],
  },
  {
    title: "Submit Updated Channel Partner",
    description: "Once you've edited the form, follow these steps to save the updates:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>'Submit'</strong> button.",
          "System will validate required fields and save the changes.",
          "Updated record will reflect in the <strong>'Channel Partner Details'</strong>.",
        ],
      },
    ],
    notes: ["Unchanged fields will retain their previous values."],
  },
  {
    title: "Cancel Channel Partner Update",
    description: "To discard changes made during update:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click on <strong>'Back'</strong> or <strong>'Channel Partner List'</strong> before saving.",
          "This will return you to the Channel Partner List  without applying any changes.",
        ],
      },
    ],
    notes: ["Make sure to save changes before navigating away if needed."],
  },
],
"My PartnerList (Update Address)": [
  {
    title: "Navigate to Update Address",
    description: "Follow the steps below to update the address for a channel partner in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Partner List</strong>.",
          "Choose the partner whose address needs to be updated.",
          "Click on the <strong>Update</strong> option.",
          "Select the <strong>Address</strong> section to update the address details.",
        ],
      },
    ],
    notes: [
      "Ensure the correct partner is selected before updating the address.",
    ],
  },
  {
    title: "Address Update Form Fields",
    description: "Enter the necessary address details. 'Address Line 1' is mandatory:",
    sections: [
      {
        title: "Address Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Contact Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address Line 1</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address Line 2</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Place</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Pincode</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Country</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Alternate Contact Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>GSTN Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Default</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["<strong>Address Line 1</strong> is a required field and must be filled to proceed."],
  },
  {
    title: "Submit Address Form",
    description: "After entering the address details, follow the steps below to save the update:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>Submit</strong> or <strong>Save</strong> button.",
          "System will validate and update the address in the <strong>Address List</strong>.",
        ],
      },
    ],
    notes: [
      "Ensure all mandatory fields are filled before submission.",
    ],
  },
  {
    title: "Cancel Address Update",
    description: "If you wish to cancel without saving changes:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Navigate away or click on <strong>Address List</strong> without clicking Save.",
        ],
      },
    ],
    notes: ["Unsaved information will be discarded if you leave the form."],
  },
],
"My PartnerList (Add Address)": [
  {
    title: "Navigate to Add Address",
    description: "Follow the steps below to add a new address for a channel partner in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Partner List</strong>.",
          "Choose the partner to whom you want to add a new address.",
          "Click on the <strong>Update</strong> option.",
          "Navigate to the <strong>Address</strong> section.",
          "Click on <strong>Add Address</strong>.",
        ],
      },
    ],
    notes: [
      "Ensure you are adding the address under the correct partner record.",
    ],
  },
  {
    title: "Address Form Fields",
    description: "Enter the necessary address details.",
    sections: [
      {
        title: "Address Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Contact Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address Line 1</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address Line 2</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Place</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Pincode</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Country</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Alternate Contact Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>GSTN Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Default</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["<strong>Required Filled</strong> is Mandetory and must be filled to proceed."],
  },
  {
    title: "Submit Address Form",
    description: "After entering the address details, follow the steps below to save the new address:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>Submit</strong> or <strong>Save</strong> button.",
          "System will validate and add the new address to the <strong>Address List</strong>.",
        ],
      },
    ],
    notes: [
      "Ensure all required fields are completed correctly before submission.",
    ],
  },
  {
    title: "Cancel Address Entry",
    description: "If you decide not to save the new address:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click on <strong>Addess List</strong> or navigate away without clicking Submit.",
        ],
      },
    ],
    notes: ["Any unsaved input will be discarded if you exit the form."],
  },
],
"PartnerList (Update Other Contacts)": [
  {
    title: "Navigate to Update Other Contacts",
    description: "Use the following steps to update other contact details for a channel partner in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Partner List</strong>.",
          "Choose the partner whose other contacts need to be updated.",
          "Click on the <strong>Update</strong> option.",
          "Navigate to the <strong>Other Contacts</strong> section.",
        ],
      },
    ],
    notes: ["Ensure you select the correct partner before updating contact details."],
  },
  {
    title: "Other Contact Form Fields",
    description: "Fill in the required contact details. The <strong>Name</strong> field is mandatory:",
    sections: [
      {
        title: "Other Contact Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email ID</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Designation</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["Make sure to fill in the <strong>Name</strong> field to proceed with the update."],
  },
  {
    title: "Submit Other Contact Form",
    description: "Once you've entered the contact details, follow these steps to save the information:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>Submit</strong> or <strong>Save</strong> button.",
          "The contact information will be updated in the <strong>Customer Contacts</strong> list.",
        ],
      },
    ],
    notes: ["Always review the filled information before submitting to avoid errors."],
  },
  {
    title: "Cancel Contact Update",
    description: "If you want to cancel and not save any changes:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click <strong>Customer Contact</strong> or navigate away without submitting.",
        ],
      },
    ],
    notes: ["Unsaved changes will be discarded upon exit."],
  },
],

"PartnerList (Add Other Contacts)": [
  {
    title: "Navigate to Add Other Contacts",
    description: "Use the following steps to add a new contact under a partner in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Partner List</strong>.",
          "Choose the partner to whom you want to add a contact.",
          "Click on the <strong>Update</strong> option.",
          "Navigate to the <strong>Other Contacts</strong> section.",
          "Click the <strong>Add Contact</strong> button to open the Add Contact form.",
        ],
      },
    ],
    notes: ["Ensure you have selected the correct partner before adding new contact details."],
  },
  {
    title: "Other Contact Form Fields",
    description: "Fill in the required contact details. The <strong>Name</strong> field is mandatory:",
    sections: [
      {
        title: "Other Contact Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email ID</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Designation</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["<strong>Name</strong> is a required field and must be filled to add a contact."],
  },
  {
    title: "Submit Contact Form",
    description: "Once you've entered the contact details, follow these steps to save the new contact:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>Create</strong> or <strong>Save</strong> button.",
          "The new contact will be added under the selected partner in the <strong>Customer Contacts</strong> list.",
        ],
      },
    ],
    notes: ["Verify all fields before submission to avoid duplication or errors."],
  },
  {
    title: "Cancel Add Contact",
    description: "If you wish to cancel and discard the contact entry:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click <strong>Customer Contact</strong> or navigate away from the form without saving.",
        ],
      },
    ],
    notes: ["Any unsaved data will be lost if you exit the form."],
  },
],
"PartnerList(Update Bank Account)": [
  {
    title: "Navigate to Update Bank Account",
    description: "Use the steps below to update bank account details for a channel partner in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Partner List</strong>.",
          "Choose the partner whose bank account details need to be updated.",
          "Click on the <strong>Update</strong> option.",
          "Navigate to the <strong>Bank Account</strong> section.",
        ],
      },
    ],
    notes: ["Ensure the correct partner is selected before updating bank details."],
  },
  {
    title: "Bank Account Form Fields",
    description: "Enter or update the required bank account details. Fields marked with * are mandatory:",
    sections: [
      {
        title: "Bank Account Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Account Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Account Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Account Currency</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Bank Name</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>IFSC Code</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>BIC Code</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Branch Address</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Default Account</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Payment Terms</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Payment Note</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Invoice Note</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Additional Note</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "<strong>Account Number</strong>,<strong>Account Currency</strong>, <strong>Account Name</strong>, and <strong>Bank Name</strong> are required fields.",
    ],
  },
  {
    title: "Submit Bank Account Form",
    description: "After entering the bank account details, follow these steps to save the information:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>Submit</strong> or <strong>Save</strong> button.",
          "The bank account information will be updated in the <strong>Customer Account</strong> section.",
        ],
      },
    ],
    notes: [
      "Ensure all required fields are properly filled before submitting the form.",
    ],
  },
  {
    title: "Cancel Bank Account Update",
    description: "To discard changes made in the form:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click <strong>Cancel</strong> or navigate away from the page before saving.",
        ],
      },
    ],
    notes: [
      "Any unsaved data will be lost upon cancellation or navigation.",
    ],
  },
],
"PartnerList (Add Bank Account)": [
  {
    title: "Navigate to Add Bank Account",
    description: "Use the steps below to add a new bank account for a channel partner in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Partner List</strong>.",
          "Choose the partner for whom you want to add a new bank account.",
          "Click on the <strong>Update</strong> option.",
          "Navigate to the <strong>Bank Account</strong> section.",
          "Click on the <strong>Add Bank Account</strong> button.",
        ],
      },
    ],
    notes: ["Make sure to verify the partner before adding bank account details."],
  },
  {
    title: "Bank Account Form Fields",
    description: "Fill in the following details to add a bank account. Mandatory fields are marked with *:",
    sections: [
      {
        title: "Bank Account Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Account Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Account Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Account Currency</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Bank Name</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>IFSC Code</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>BIC Code</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Branch Address</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Default Account</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Payment Terms</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Payment Note</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Invoice Note</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Additional Note</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "<strong>Account Number</strong>, <strong>Account Currency</strong><strong>Account Name</strong>, and <strong>Bank Name</strong> are required to add a bank account.",
    ],
  },
  {
    title: "Submit Bank Account Form",
    description: "Once the form is completed, follow these steps to add the new bank account:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>Submit</strong> or <strong>Save</strong> button.",
          "The new account will be added to the <strong>Customer Account</strong> list for the partner.",
        ],
      },
    ],
    notes: ["Ensure all mandatory fields are completed accurately before submitting."],
  },
  {
    title: "Cancel Bank Account Addition",
    description: "To cancel the process of adding a new bank account:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click <strong>Cancel</strong> or leave the page before saving.",
        ],
      },
    ],
    notes: ["All unsaved input will be discarded if the process is canceled."],
  },
],
"PartnerList (Owned By)": [
  {
    title: "Navigate to Update 'Owned By' Section",
    description: "Follow these steps to update ownership details of a partner in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Partner List</strong>.",
          "Choose the partner whose ownership details need to be updated.",
          "Click on the <strong>Update</strong> option.",
          "Navigate to the <strong>Owned By</strong> section.",
        ],
      },
    ],
    notes: ["Ensure the correct partner is selected before updating ownership."],
  },
  {
    title: "Ownership Form Fields",
    description: "Fill in the following fields to assign ownership. The <strong>Owned By User</strong> field is mandatory:",
    sections: [
      {
        title: "Owned By Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Owned By User</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Owned By Member/Employee</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: ["The <strong>Owned By User</strong> field must be selected to proceed with the update."],
  },
  {
    title: "Submit Ownership Details",
    description: "After selecting the ownership details, follow these steps to save the update:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>Submit</strong> or <strong>Save</strong> button.",
          "The updated ownership details will be saved in the partner's profile.",
        ],
      },
    ],
    notes: ["Review the selected values carefully before submitting."],
  },
],

// MY LEAD MANAGEMENT
"Lead Analytics and Actions Overview": [
  {
    title: "Navigate to Lead List",
    description: "Follow these steps to access and view the list of leads under the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> module.",
          "Go to <strong>My Lead Management</strong>.",
        ],
      },
    ],
    notes: [
      "The Lead List is read-only.",
    ],
  },
  {
    title: "Lead Status Summary",
    description: "View the current status distribution of leads in the system.",
    sections: [
      {
        title: "Lead Status Pie Chart",
        icon: <FaChartPie />,
        items: [
          "Displays a pie chart of total leads, categorized as <strong>Prospects - Active</strong> and <strong>Won - Converted as Customer</strong>.",
          "Real-time count and percentage shown for each category.",
        ],
      },
    ],
    notes: [
      "The chart updates automatically as lead statuses change.",
    ],
  },
  {
    title: "Lead Trend over Last 3 Months",
    description: "Analyze the lead inflow and conversion trends over the last three months.",
    sections: [
      {
        title: "Trend Line Chart",
        icon: <FaChartLine />,
        items: [
          "Shows monthly trends of <strong>Received</strong> leads versus <strong>Converted</strong> customers.",
          "Helps in identifying performance patterns and periods of high or low activity.",
        ],
      },
    ],
    notes: [
      "Trends help forecast future lead volumes and conversion success.",
    ],
  },
  {
    title: "Lead Actions and Quick Operations",
    description: "Manage leads directly from the lead cards with actionable buttons.",
    sections: [
      {
        title: "Lead Card Actions",
        icon: <FaTasks />,
        items: [
          "View detailed lead information including name, email, phone, source, PO reference, and amount.",
          "Available actions: <strong>Mark Lost</strong>, <strong>Change Status</strong>, <strong>Qualified (create Customer)</strong>, <strong>Product Interest</strong>, <strong>Task List</strong>, and <strong>Update</strong>.",
          "Badges indicate group assignments, linked customers, and lead sources.",
        ],
      },
    ],
    notes: [
      "User roles control access to specific lead actions.",
    ],
  },
  {
    title: "Export and Performance Tools",
    description: "Export lead data and review performance metrics easily.",
    sections: [
      {
        title: "Footer Buttons",
        icon: <FaFileExport />,
        items: [
          "Use <strong>My Lead Performance</strong> to access the performance dashboard.",
          "Export lead data as an <strong>XLS File</strong> for Excel analysis.",
          "Download a summarized lead report as a <strong>PDF File</strong> for sharing or printing.",
        ],
      },
    ],
    notes: [
      "Exports reflect the current filter and status selections.",
    ],
  },
],
"My Lead Management (Product Interest List)": [
  {
    title: "Navigate to Product Interest List",
    description:
      "Use the following steps to access and manage the Product Interest list for a selected lead:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Lead Management</strong>.",
          "For any lead row, click on <strong>Product Interest</strong> to open its interest list.",
        ],
      },
    ],
    notes: ["Each lead has its own Product Interest list view."],
  },

  {
    title: "Product Interest List View",
    description:
      "Displays a table of all product interests added for the selected lead:",
    sections: [
      {
        title: "Product Interest Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Product Category</TableHeader>
                  <TableHeader>Product Variation</TableHeader>
                  <TableHeader>Required By Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>[Category]</strong></TableCell>
                  <TableCell>
                    Brand [Value] <br />
                    Size [Value] <br />
                    Colour [Value]
                  </TableCell>
                  <TableCell>[Date]</TableCell>
                  <TableCell>
                    <span className="status-badge">[Available | Not Available]</span>
                  </TableCell>
                  <TableCell>
                    <button className="btn btn-danger">
                      <FaTrash /> Delete
                    </button>
                    <button className="btn btn-secondary">
                      <FaEdit /> Update
                    </button>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Multiple product variations can exist under a single category.",
      "Users can update or delete entries using the action buttons.",
    ],
  },

  {
    title: "Add New Product Interest",
    description: "Add a new product interest entry for the selected lead:",
    sections: [
      {
        title: "Add Interest Action",
        icon: <FaEdit />,
        items: [
          "Click on <strong>+ Add Product Interest</strong> button.",
          "Fill in the fields: <strong>Category</strong>, <strong>Brand</strong>, <strong>Size</strong>, <strong>Color</strong>, <strong>Required By Date</strong>.",
          "Click <strong>Submit</strong> to save the entry.",
        ],
      },
    ],
    notes: [
      "Validation applies for required fields and proper date format.",
      "Each interest can include multiple variations such as brand, size, and color.",
    ],
  },

  {
    title: "Update or Delete Product Interest",
    description:
      "Use the respective buttons to update or remove an entry:",
    sections: [
      {
        title: "Action Buttons",
        icon: <FaPaperPlane />,
        items: [
          "<strong>Update</strong>: Opens the entry form with prefilled values for editing.",
          "<strong>Delete</strong>: Prompts for confirmation and then removes the entry.",
        ],
      },
    ],
    notes: [
      "Deleted records are permanently removed and cannot be recovered.",
      "Navigation includes a Back button to return to the lead's Product Interest list.",
    ],
  },
],
"My LeadManagement (Add Product Interest)": [
  {
    title: "Navigate to Add Product Interest",
    description: "Use the steps below to add a new product interest under a lead in the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Lead Management</strong>.",
          "Choose a lead and click on <strong>Product Interest</strong>.",
          "Click on the <strong>Add Product Interest</strong> button."
        ],
      },
    ],
    notes: ["Ensure the correct lead is selected before proceeding with product interest addition."],
  },
  {
    title: "Product Interest Form Fields",
    description: "Fill in the following details to add a product interest. Mandatory fields are marked with *:",
    sections: [
      {
        title: "Product Interest Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Product Category</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name</strong> (1)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value</strong> (1)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name</strong> (2)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value</strong> (2)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Name</strong> (3)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Variation Value</strong> (3)</TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Product Info</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Due Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "<strong>Product Category</strong>, <strong>Variation Name</strong>, and <strong>Variation Value</strong> are mandatory fields.",
    ],
  },
  {
    title: "Submit Product Interest Form",
    description: "After completing the form, follow these steps to save the product interest:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>Add Product Interest</strong> or <strong>Save</strong> button.",
          "The new product interest entry will be saved and visible under the lead's product interest list.",
        ],
      },
    ],
    notes: ["Ensure all required fields are completed accurately before submission."],
  },
  {
    title: "Cancel Product Interest Addition",
    description: "To cancel the process of adding product interest:",
    sections: [
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click on <strong>Back</strong> or exit the page before submitting.",
          "You will be redirected to the <strong>Lead Product Interest Data</strong> page.",
        ],
      },
    ],
    notes: ["All unsaved input will be discarded if the process is canceled."],
  },
],
"My Lead Management (Task List View)": [
  {
    title: "Navigate to Task List",
    description:
      "Use the following steps to access and manage the Task List for a selected lead:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>My Lead Management</strong>.",
          "Click on <strong>Lead List</strong>.",
          "For any lead row, click on <strong>Task List</strong> to view all associated tasks.",
        ],
      },
    ],
    notes: ["Each lead has its own Task List view."],
  },

  {
    title: "Task List View",
    description:
      "Displays a table of all tasks added for the selected lead:",
    sections: [
      {
        title: "Task Table Structure",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Task Name</TableHeader>
                  <TableHeader>Task Owner / Current User</TableHeader>
                  <TableHeader>Type / Sub Type / Priority</TableHeader>
                  <TableHeader>Plan Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
             
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "All tasks for the lead are listed in a tabular format.",
      "Each row includes task metadata, ownership, and action buttons.",
      "You can navigate back to the Lead List using the Back to Lead List button at the top of the page.",
    ],
  },

  {
    title: "Add New Task",
    description: "Add a new task to the lead's task list:",
    sections: [
      {
        title: "Add Task Action",
        icon: <FaEdit />,
        items: [
          "Click on the <strong>+ Add New Task</strong> button.",
          "Fill in the task details like <strong>Task Name</strong>, <strong>Type</strong>, <strong>Sub Type</strong>, <strong>Priority</strong>, and <strong>Plan Date</strong>.",
          "Click <strong>Submit</strong> to save the task.",
        ],
      },
    ],
    notes: [
      "All fields must be correctly filled in before submitting.",
      "Tasks can have different priorities and types depending on workflow needs.",
    ],
  },

  {
    title: "Update Task",
    description:
      "Modify an existing task using the update option:",
    sections: [
      {
        title: "Task Update Action",
        icon: <FaPaperPlane />,
        items: [
          "Click on the <strong>Update</strong> button next to the task you want to edit.",
          "Make necessary changes in the task form.",
          "Click <strong>Submit</strong> to apply updates.",
        ],
      },
    ],
    notes: [
      "Only editable tasks can be updated.",
      "Ensure correct date and priority are selected before updating.",
    ],
  },
],
"My Lead Management (Add Task List)": [
  {
    title: "Navigate to Add Task",
    description: "Follow these steps to navigate to the Add Task form:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on the <strong>'CRM'</strong> section",
          "Select <strong>'My Lead Management'</strong>",
          "Click on <strong>'Task List'</strong> for the desired lead",
          "Click on <strong>'Add New Task'</strong> button",
        ],
      },
    ],
    notes: [
      "Ensure you have access to the CRM module to manage tasks.",
    ],
  },
  {
    title: "Task Form Fields",
    description: "Fill out the following fields. Mandatory fields must be completed to proceed:",
    sections: [
      {
        title: "Task Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Task Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Sub Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Planned Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Start Time</strong></TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>End Time</strong></TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Priority</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remark</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Owner</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Current Assigned User</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Fields marked as Required must be completed to save the task.",
      "Use the correct formats for date and time fields.",
    ],
  },
  {
    title: "Submit Task",
    description: "Once the form is completed, follow the steps below to save the task:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Verify all fields, especially <strong>Task Name</strong>,<strong>Task Owner</strong>, <strong>Task Type</strong>, and <strong>Task Sub Type</strong>",
          "Click on <strong>'Add Task'</strong> or <strong>'Submit'</strong> to save the task",
          "The system will validate and store the task",
          "You will return to the <strong>'Task List'</strong> view after saving",
        ],
      },
      {
        title: "Cancellation Logic",
        icon: <FaBan />,
        items: [
          "Click <strong>'Cancel Task Addition'</strong> to discard changes",
          "You will return to the <strong>'Update Lead Detail'</strong> view without saving",
        ],
      },
    ],
    notes: [
      "Double-check all mandatory fields before submission.",
      "Incomplete forms will prompt an error message.",
      "To go back to the lead list without saving, click the <strong>'Lead List' button</strong>.",
    ],
  },
],
"My Lead Management (Update)": [
  {
    title: "Navigate to Update Lead",
    description: "Follow these steps to navigate to the lead update form:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on the <strong>'CRM'</strong> section",
          "Select <strong>'My Lead Management'</strong>",
          "Select the desired lead and click <strong>'Update'</strong>",
        ],
      },
    ],
    notes: [
      "You must have appropriate access rights to update leads.",
    ],
  },
  {
    title: "Update Lead Form Fields",
    description: "Update the following fields. Mandatory fields must be completed to proceed:",
    sections: [
      {
        title: "Lead Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow><TableCell><strong>Company Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Location / Region</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Status</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Contact Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Email ID</strong></TableCell><TableCell>Email</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Mobile Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Opportunity Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Group</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Secondary Group</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Source</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Deal Size</strong></TableCell><TableCell>Number</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Priority</strong></TableCell><TableCell>Number</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Alias</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Address</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Alternate Contact Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>City Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>State Code</strong></TableCell><TableCell>Options</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Pin Code</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Country</strong></TableCell><TableCell>Options</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>PO Ref Number</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Payment Received</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Remark</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Image</strong></TableCell><TableCell>File (Image)</TableCell><TableCell>Optional</TableCell></TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Fields marked as Required must be completed to update the lead.",
    ],
  },
  {
    title: "Submit Lead Update",
    description: "After completing the form, follow the steps below to save the updated lead information:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Review all entered fields, especially mandatory ones.",
          "Click on <strong>'Update Lead'</strong> or <strong>'Submit'</strong> button to save changes.",
          "The system will validate your input and update the lead record.",
          "You will be redirected to the <strong>'Lead List'</strong> screen.",
        ],
      },
      
    ],
    notes: [
      "Partial updates are allowed, but mandatory fields must be filled.",
      "Incomplete or invalid entries will result in validation errors.",
      "Use the <strong>'Lead List'</strong> button to return without submitting.",
    ],
  },
],
"My Lead Management (Add Leads)": [
  {
    title: "Navigate to Add Lead",
    description: "Follow these steps to navigate to the Add Lead form:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on the <strong>'CRM'</strong> section",
          "Select <strong>'My Lead Management'</strong>",
          "Click on the <strong>'Add Lead'</strong> button",
        ],
      },
    ],
    notes: [
      "Ensure CRM access rights are enabled to add new leads.",
    ],
  },
  {
    title: "Lead Entry Form Fields",
    description: "Fill out the following fields. Mandatory fields must be completed to proceed:",
    sections: [
      {
        title: "Lead Fields Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow><TableCell><strong>Company Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Location/Region</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Status</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Contact Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Email ID</strong></TableCell><TableCell>Email</TableCell><TableCell>Required if Mobile not filled</TableCell></TableRow>
                <TableRow><TableCell><strong>Mobile Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Required if Email not filled</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Opportunity Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Group</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Secondary Group</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Source</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Deal Size</strong></TableCell><TableCell>Number</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Priority</strong></TableCell><TableCell>Number</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead Alias</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Address</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Alternate Contact Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>City Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>State Code</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Pin Code</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Country</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Remark</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Image</strong></TableCell><TableCell>File Upload (Image)</TableCell><TableCell>Optional</TableCell></TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Either <strong>Email ID</strong> or <strong>Mobile Number</strong> must be provided.",
      "Ensure correct formatting for email and phone number fields.",
    ],
  },
  {
    title: "Submit Lead",
    description: "Once all fields are filled, follow the steps to submit the lead entry:",
    sections: [
      {
        title: "Submission Process",
        icon: <FaPaperPlane />,
        items: [
          "Ensure mandatory fields are completed",
          "Click on the <strong>'Save Lead'</strong> or <strong>'Submit'</strong> button",
          "The system will validate and save the entry",
          "You will be redirected to the <strong>'Lead List'</strong> view",
        ],
      },
      
    ],
    notes: [
      "Partial data will not be saved. Mandatory fields are required for a successful submission.",
      "You may also return to the <strong>'Lead List'</strong> at any time by clicking the <strong>'Lead List'</strong> button, without saving the current entry.",
    ],
  },
],
"My Lead Management (Status History)": [
  {
    title: "Navigate to Status History",
    description: "Follow these steps to view the status history of a lead:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on the <strong>'CRM'</strong> section",
          "Select <strong>'My Lead Management'</strong>",
          "Click on <strong>'Status History'</strong> for the specific lead"
        ],
      },
    ],
    notes: [
      "You must select a lead from the Lead List to access its status history.",
    ],
  },
  {
    title: "Status History Fields",
    description: "The status history displays the following non-editable details:",
    sections: [
      {
        title: "Status History Table",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Lead Status</strong></TableCell>
                  <TableCell>Status of the lead at each update stage</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Read-only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status Date / Created Date</strong></TableCell>
                  <TableCell>Date the status was recorded</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Read-only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Days to Complete</strong></TableCell>
                  <TableCell>Time duration from previous status to current</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Read-only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remarks</strong></TableCell>
                  <TableCell>Any additional notes added during status update</TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Read-only</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "This view is for reference only and does not allow data entry or editing.",
    ],
  },
  {
    title: "Return to Lead List",
    description: "To exit the status history view and return to the main list:",
    sections: [
      {
        title: "Navigation Options",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Lead List'</strong> button at the top right corner of the screen",
          "You will be redirected back to the <strong>'Lead List'</strong> without making any changes",
        ],
      },
    ],
    notes: [
      "As this is a view-only screen, no submission or cancellation actions are required.",
    ],
  },
],
"My Lead Management (Current Task)": [
  {
    title: "Navigate to Current Task",
    description: "This section allows users to add or update tasks related to a specific lead. Tasks help manage scheduled actions or follow-ups for effective lead tracking.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'My Lead Management'</strong>",
          "Click on a specific lead entry",
          "Click on <strong>'Current Task'</strong> tab"
        ],
      },
    ],
  },
  {
    title: "Current Task Fields",
    description: "Below are the fields available to input or update task details:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Task Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Sub Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Planned Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Start Time</strong></TableCell>
                  <TableCell>Time Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>End Time</strong></TableCell>
                  <TableCell>Time Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Priority</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remark</strong></TableCell>
                  <TableCell>Text Area</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Task Owner</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Current User Assigned</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
  },
  {
    title: "Submission Process",
    description: "Ensure all required fields are filled. Once done:",
    sections: [
      {
        title: "Steps to Submit",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Add Task'</strong> or <strong>'Submit'</strong> button to save the task",
          "Validation errors will be shown if required fields are left blank"
        ],
      },
    ],
  },
  {
    title: "Cancellation Logic",
    description: "You may exit the form without saving by:",
    sections: [
      {
        title: "Cancel Options",
        icon: <FaTimesCircle />,
        items: [
          "Click the <strong>'Cancel Task Addition'</strong> button to return to the Update Lead Detail ",
          "No changes will be saved if the form is exited without submitting"
        ],
      },
    ],
    notes: [
      "You may return to the lead list at any time without saving the task by clicking the <strong>'Lead List'</strong> button located on the top right corner."
    ],
  },
],
"My Lead Management (Contact Details)": [
  {
    title: "Navigate to Contact Details",
    description: "This section allows users to view or enter contact persons associated with a specific lead. Capturing accurate contact details ensures efficient follow-ups and communication.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'My Lead Management'</strong>",
          "Click on a specific lead entry",
          "Click on <strong>'Contact Details'</strong> tab"
        ],
      },
    ],
  },
  {
    title: "Contact Details Fields",
    description: "Fill out the following fields to capture the contact details associated with the lead:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Contact Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Designation</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Contact Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell>Numeric</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email ID</strong></TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
  },
  {
    title: "Submission Process",
    description: "Make sure all required fields are completed. Once validated:",
    sections: [
      {
        title: "Steps to Submit",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Add Contact'</strong> or <strong>'Submit'</strong> button to save the contact information",
          "Form will alert for missing mandatory fields if any"
        ],
      },
    ],
  },
  {
    title: "Cancellation Logic",
    description: "You may exit the Contact Details section without saving by:",
    sections: [
      {
        title: "Cancel Options",
        icon: <FaTimesCircle />,
        items: [
          "Click the <strong>'Lead List'</strong> button to return to the Lead List page",
          "Unsaved information will be discarded if you exit without submission"
        ],
      },
    ],
    notes: [
      "You may return to the Lead List at any point without saving the entered contact details by clicking the <strong>'Lead List'</strong> button available at the top right corner."
    ],
  },
],

"Task Calendar Overview": [
  {
    title: "Navigate to Task Calendar",
    description: "Follow these steps to access and view your task calendar under the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> module.",
          "Go to <strong>My Task Calendar</strong>.",
        ],
      },
    ],
    notes: [
      "The Task Calendar is read-only.",
    ],
  },
  {
    title: "Task Status Indicators",
    description: "Understand the status of tasks at a glance using color codes.",
    sections: [
      {
        title: "Color Coding",
        icon: <FaPalette />,
        items: [
          "<span style=\"color:blue;\"><strong>Planned</strong></span>: Tasks scheduled for the future.",
          "<span style=\"color:yellow;\"><strong>Overdue</strong></span>: Tasks past their due date.",
          "<span style=\"color:green;\"><strong>Completed</strong></span>: Tasks marked as done.",
          "<span style=\"color:red;\"><strong>Not Planned</strong></span>: Tasks without a set schedule.",
        ],
      },
    ],
    notes: [
      "Colors help you quickly assess task priorities.",
    ],
  },
  {
    title: "Monthly View",
    description: "Review your tasks organized by month for a comprehensive overview.",
    sections: [
      {
        title: "Calendar Layout",
        icon: <FaCalendar />,
        items: [
          "Days of the week are displayed as columns.",
          "Tasks are shown under the corresponding date.",
          "Navigate between months using <strong>Previous Month</strong> and <strong>Next Month</strong> buttons.",
        ],
      },
    ],
    notes: [
      "Use the calendar to plan upcoming tasks effectively.",
    ],
  },
  {
    title: "Task Details",
    description: "View task-specific details directly on the calendar.",
    sections: [
      {
        title: "Task Information",
        icon: <FaInfoCircle />,
        items: [
          "Each task is represented with its title and time duration.",
          "Hover over a task for more details.",
        ],
      },
    ],
    notes: [
      "Task titles and times are color-coded based on their status.",
    ],
  },
],
// AMC
"AMC Item List Overview": [
  {
    "title": "Navigate to AMC details for Items",
    "description": "Follow these steps to access and view the AMC details for items under the CRM module:",
    "sections": [
      {
        "title": "Navigation Path",
        "icon": <FaRoute />,
        "items": [
          "Open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> module.",
          "Go to <strong>AMC item List</strong>.",
        ]
      }
    ],
    "notes": [
      "Ensure you have the necessary permissions to access the AMC details."
    ]
  },
  {
    "title": "AMC Items Overview",
    "description": "View the list of items with their Warranty/AMC details:",
    "sections": [
      {
        "title": "Item Details",
        "icon": <FaBox />,
        "items": [
          "Displays items with their invoice details and serial numbers.",
        ]
      },
      {
        "title": "Status Indicators",
        "icon": <FaTag />,
        "items": [
          "Items are marked with statuses"
        ]
      }
    ],
    "notes": [
      "Click on the <strong>Update</strong> button to modify AMC details for each item."
    ]
  },
  {
    "title": "Filter and Sort Items",
    "description": "Use filters and sorting options to manage the item list effectively:",
    "sections": [
      {
        "title": "Filter Options",
        "icon": <FaFilter />,
        "items": [
          "Filter by <strong>Item Srl Num</strong>: Search for specific serial numbers.",
          "Filter by <strong>Product Type</strong>: Select the type of product.",
          "Filter by <strong>Status</strong>: Choose from options like All Statuses.",
          "Filter by <strong>Category</strong>: Select a specific category."
        ]
      },
      {
        "title": "Sort Options",
        "icon": <FaSort />,
        "items": [
          "Sort by <strong>Order</strong> in <strong>Ascending</strong> or Descending order.",
          "Use the <strong>Clear</strong> button to reset all filters and sorting."
        ]
      }
    ],
    "notes": [
      "Filters help narrow down the list to specific items for easier management."
    ]
  },
  {
    "title": "Add and Export AMC Details",
    "description": "Manage AMC details and export the data for reporting:",
    "sections": [
      {
        "title": "Add AMC Details",
        "icon": <FaPlusCircle />,
        "items": [
          "Click on the <strong>Add AMC Detail</strong> button to add new AMC details for an item.",
          "Upload both <strong>ItemAmcDetails Data</strong> and <strong>ItemAmcHistory Data</strong> using the <strong>Upload</strong> option."
        ]
      },
      {
        "title": "Export Options",
        "icon": <FaFileExport />,
        "items": [
          "Export the item list as an <strong>XLS File</strong> for Excel analysis.",
          "Download a summarized report as a <strong>PDF File</strong> for sharing or printing."
        ]
      }
    ],
    "notes": [
      "Exported files reflect the current filter and sort settings."
    ]
  }
],
"Add AMC Details": [
  {
    title: "Navigate to Add AMC Details",
    description: "This section allows users to record or update AMC (Annual Maintenance Contract) details for a specific product/item. Maintaining accurate AMC data ensures effective warranty tracking and service reminders.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'AMC Item List'</strong>",
          "Click on <strong>'Add AMC Details'</strong>"
        ],
      },
    ],
  },
  {
    title: "AMC Details Form Fields",
    description: "Enter the following information to log AMC and warranty details for an item:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Item Serial Number</strong></TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty From Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty To Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Original Invoice Number</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Invoice Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email ID</strong></TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Address</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remarks</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty Period</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty Period Unit</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>AMC Reminder (in Days)</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
  },
  {
    title: "Submission Process",
    description: "Once all required fields are entered:",
    sections: [
      {
        title: "Steps to Submit",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Add Warranty Details'</strong> or <strong>'Save'</strong> button",
          "The data will be recorded under the respective item’s AMC details",
          "AMC data can also be bulk uploaded via <strong>ItemAmcDetails</strong> and <strong>ItemAmcHistory</strong> import templates"
        ],
      },
    ],
  },
  {
    title: "Cancellation Logic",
    description: "Exit without saving by using the navigation or button options:",
    sections: [
      {
        title: "Exit Options",
        icon: <FaTimesCircle />,
        items: [
          "Click the <strong>'Back'</strong> or <strong>'AMC List'</strong> button to return to the AMC details for Items",
          "Unsaved entries will be discarded"
        ],
      },
    ],
  },
],
"AMC Item List (Updates)": [
  {
    title: "Navigate to AMC Updates",
    description:
      "This section allows users to update existing AMC (Annual Maintenance Contract) details for products or items. Keeping these details accurate helps with warranty tracking, customer service, and scheduled reminders.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'AMC Item List'</strong>",
          "Click on <strong>'Updates'</strong>"
        ],
      },
    ],
  },
  {
    title: "AMC Update Form Fields",
    description: "Fill in or update the following fields to maintain AMC data integrity:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Item Serial Number</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty From Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty To Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty Status</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Original Invoice Number</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Invoice Date</strong></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email ID</strong></TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Address</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Remarks</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty Period</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Warranty Period Unit</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>AMC Reminder (in Days)</strong></TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
  },
  {
    title: "Submission Process",
    description: "After entering or updating the required details:",
    sections: [
      {
        title: "Steps to Submit",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Update Warranty Detail'</strong> or <strong>'Save'</strong> button",
          "Your updates will be reflected in the item's AMC details",
        ],
      },
    ],
  },
  {
    title: "Cancellation Logic",
    description: "You can discard unsaved changes by exiting the update screen:",
    sections: [
      {
        title: "Exit Options",
        icon: <FaTimesCircle />,
        items: [
          "Click the <strong>'Back'</strong> or <strong>'AMC List'</strong> button to return to the AMC details for Items",
          "Any unsaved data will be discarded"
        ],
      },
    ],
  },
],

// GEM
"GEM Tender Data Overview": [
  {
    "title": "Navigate to GEM Tender Details",
    "description": "Follow these steps to access and view GEM Tender details under the CRM module:",
    "sections": [
      {
        "title": "Navigation Path",
        "icon": <FaRoute />,
        "items": [
          "Open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> module.",
          "Go to <strong>GEM Tender Data List</strong>."
        ]
      }
    ],
    "notes": [
      "Ensure you have the necessary permissions to access the GEM Tender module."
    ]
  },
  {
    "title": "GEM Tender Items Overview",
    "description": "View the list of GEM Tenders with their details:",
    "sections": [
      {
        "title": "Item Details",
        "icon": <FaBox />,
        "items": [
          "Displays tenders with their source details, product type, and end dates."
        ]
      },
      {
        "title": "Status Indicators",
        "icon": <FaTag />,
        "items": [
          "Tenders are marked with statuses"
        ]
      }
    ],
    "notes": [
      "Click on the <strong>Update</strong> button to modify tender details."
    ]
  },
  {
    "title": "Filter and Sort GEM Tenders",
    "description": "Use filters and sorting options to manage the GEM Tender list effectively:",
    "sections": [
      {
        "title": "Filter Options",
        "icon": <FaFilter />,
        "items": [
          "Filter by <strong>Product Name</strong>: Search for specific tenders.",
          "Filter by <strong>Product Type</strong>: Select the type of product.",
          "Filter by <strong>Status</strong>: Choose from options like All Statuses.",
          "Filter by <strong>Campaign</strong>: Search for campaign-specific tenders."
        ]
      },
      {
        "title": "Sort Options",
        "icon": <FaSort />,
        "items": [
          "Sort by <strong>Order</strong> in <strong>Ascending</strong> or Descending order.",
          "Use the <strong>Clear</strong> button to reset all filters and sorting."
        ]
      }
    ],
    "notes": [
      "Filters help narrow down the list to specific tenders for easier management."
    ]
  },
  {
    "title": "Add GEM Tender Details",
    "description": "Manage GEM Tender details the data for reporting:",
    "sections": [
      {
        "title": "Add GEM Tender",
        "icon": <FaPlusCircle />,
        "items": [
          "Click on the <strong>Add GEM Tender</strong> button to add new tenders.",
          "Upload tender details using the <strong>Upload</strong> option."
        ]
      },
      
    ],
    "notes": [
      "Exported files reflect the current filter and sort settings."
    ]
  }
],
"Add GEM Tender": [
  {
    title: "Navigate to Add GEM Tender",
    description: "This section allows users to add and manage GEM tender details",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'GEM Tender List'</strong>",
          "Click on <strong>'Add GEM Tender'</strong>"
        ],
      },
    ],
  },
  {
    title: "GEM Tender Form Fields",
    description: "Enter the following details to create or update a GEM Tender entry:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow><TableCell><strong>Product Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Product Type</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Required Qty (Nos)</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Tender ID</strong></TableCell><TableCell>Number</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Status</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Created Date</strong></TableCell><TableCell>Date Picker</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>End Date</strong></TableCell><TableCell>Date Picker</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Tender Source by Company</strong></TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Email ID</strong></TableCell><TableCell>Email</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Mobile Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Address Line 1</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Contact Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Address Line 2</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Warranty Details</strong></TableCell><TableCell>Date</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Subject</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Tender File</strong></TableCell><TableCell>File</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Is Applied for Tender</strong></TableCell><TableCell>Checkbox</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Channel Partner</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead/Partner Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Quotation Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Quotation Amount (INR)</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Post Status</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Reason for Not Applying</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Success/Failure Reason</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Remarks</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
  },
  {
    title: "Submission Process",
    description: "After filling in the mandatory and optional fields, proceed with the following steps:",
    sections: [
      {
        title: "Steps to Submit",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Add Tender Data'</strong> or <strong>'Add GEM Tender'</strong> button to record the tender details",
          "Data will be saved and listed under <strong>GEM Tender Data List</strong>",
          "You can also bulk upload using <strong>TenderDetail Data</strong> import template"
        ],
      },
    ],
  },
  {
    title: "Cancellation Logic",
    description: "If you wish to cancel the data entry process:",
    sections: [
      {
        title: "Exit Options",
        icon: <FaTimesCircle />,
        items: [
          "Click 'Back' or navigate away to return to the GEM Tender Data List without adding a new GEM entry.",
          "No data will be saved unless the 'Save' button is clicked"
        ],
      },
    ],
  },
],
"GEM Tender Data List Update": [
  {
    title: "Navigate to GEM Tender Data List",
    description: "This module allows users to update existing GEM Tender records",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>'Left Menu'</strong>",
          "Click on <strong>'CRM'</strong>",
          "Select <strong>'GEM Tender List'</strong>",
          "Click on the respective row or <strong>'Updates'</strong> to update the GEM Tender entry"
        ],
      },
    ],
     notes: [
      "Ensure you are logged into the CRM with appropriate access rights.",
      "Only users with 'Update Tender' permission can update GEM Tender data."
    ],
  },
  {
    title: "Form Fields for Update",
    description: "Use the form below to edit GEM Tender details. Mandatory fields must be filled before saving updates:",
    sections: [
      {
        title: "Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow><TableCell><strong>Product Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Product Type</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Required Qty (Nos)</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Tender ID</strong></TableCell><TableCell>Number</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Status</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Created Date</strong></TableCell><TableCell>Date Picker</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>End Date</strong></TableCell><TableCell>Date Picker</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Tender Source by Company</strong></TableCell><TableCell>Text</TableCell><TableCell>Required</TableCell></TableRow>
                <TableRow><TableCell><strong>Email ID</strong></TableCell><TableCell>Email</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Mobile Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Address Line 1</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Contact Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Address Line 2</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Warranty Details</strong></TableCell><TableCell>Date</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Subject</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Tender File</strong></TableCell><TableCell>File Upload</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Is Applied for Tender</strong></TableCell><TableCell>Checkbox</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Channel Partner</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Lead/Partner Name</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Quotation Number</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Quotation Amount (INR)</strong></TableCell><TableCell>Number</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Post Status</strong></TableCell><TableCell>Dropdown</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Reason for Not Applying</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Success/Failure Reason</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                <TableRow><TableCell><strong>Remarks</strong></TableCell><TableCell>Textarea</TableCell><TableCell>Optional</TableCell></TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Fields marked 'Required' must be filled to enable the update process.",
    ],
  },
  {
    title: "Submission Process",
    description: "After updating the necessary fields, follow these steps to save the changes:",
    sections: [
      {
        title: "Steps to Submit",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Update Tender Data'</strong> or <strong>'Save Changes'</strong> button",
          "The updated tender will reflect in the GEM Tender Data List",
        ],
      },
    ],
    notes: [
      "Confirmation will be shown after a successful update.",
    ],
  },
  {
    title: "Cancellation Logic",
    description: "You may cancel the update process if needed:",
    sections: [
      {
        title: "Exit Options",
        icon: <FaTimesCircle />,
        items: [
          "Click <strong>'Back'</strong> or navigate away to return to the GEM Tender Data List without saving changes"
        ],
      },
    ],
     notes: [
      "No data will be saved if the Back option is used.",
    ],
  },
],

// Customer Mail Compaign
"Customer Mail Campaign Overview": [
  {
    title: "Navigate to Mail Campaign List",
    description: "Follow these steps to access and view the list of mail campaigns under the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> module.",
          "Go to <strong>Customer Mail Campaign</strong>.",
        ]
      }
    ],
    notes: [
      "The functionality to view the list is available"
    ]
  },
  {
    title: "Search and Filter Campaigns",
    description: "Use the search and filter options to find specific mail campaigns.",
    sections: [
      {
        title: "Filter Options",
        icon: <FaFilter />,
        items: [
          "Enter a <strong>Campaign Name</strong> in the search bar to filter campaigns.",
          "Select a group from the <strong>All Group</strong> dropdown to filter by customer group.",
          "Choose a status from the <strong>All Status</strong> dropdown to filter by campaign status.",
          "Sort the list using <strong>Order By</strong> (e.g., Record Created,Status) and <strong>Ascending/Descending</strong> options."
        ]
      }
    ],
    notes: [
      "Use the <strong>Clear</strong> button to reset all filters."
    ]
  },
  {
    title: "Campaign Details Overview",
    description: "View key details of each mail campaign directly from the list.",
    sections: [
      {
        title: "Campaign Card Information",
        icon: <FaInfoCircle />,
        items: [
          "Displays the <strong>Customer Group</strong> associated with the campaign.",
          "Shows the campaign name or type",
          "Includes the <strong>Subject</strong> line of the email",
          "Indicates the status with a badge"
        ]
      }
    ],
    notes: [
      "The campaign list currently shows active campaigns."
    ]
  },
  {
    title: "Campaign Actions and Operations",
    description: "Manage mail campaigns directly from the campaign cards with actionable buttons.",
    sections: [
      {
        title: "Campaign Card Actions",
        icon: <FaTasks />,
        items: [
          "View responses to the campaign with the <strong>List Responses</strong> button.",
          "Close the campaign using the <strong>Close Campaign</strong> button.",
          "Resend the email with the <strong>Re-send Mail</strong> button.",
          "Preview the email content using the <strong>View Mail</strong> button.",
          "Download the campaign email as a PDF with the <strong>View PDF</strong> button.",
          "Edit the campaign details using the <strong>Update</strong> button."
        ]
      }
    ],
    notes: [
      "Some actions may require specific user permissions."
    ]
  },
  {
    title: "Export Campaign Data",
    description: "Export mail campaign data for further analysis or reporting.",
    sections: [
      {
        title: "Export Options",
        icon: <FaFileExport />,
        items: [
          "Export the campaign list as an <strong>XLS File</strong> for Excel analysis.",
          "Download a summarized campaign report as a <strong>PDF File</strong> for sharing or printing."
        ]
      }
    ],
    notes: [
      "Exports include the current filter and status selections applied to the list."
    ]
  }
],
"Customer Mail Campaign(List Response)": [
  {
    title: "Navigate to List Responses",
    description:
      "Follow the steps below to view customer responses to a mail campaign within the CRM module:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Select <strong>Customer Mail Campaign</strong>.",
          "Choose the desired campaign from the <strong>Mail Campaign List</strong>.",
          "Click on <strong>List Responses</strong> to view the response details.",
        ],
      },
    ],
  },

  {
    title: "Campaign Response Summary",
    description:
      "Displays a high-level summary of the email campaign's performance and customer engagement:",
    sections: [
      {
        title: "Response Metrics",
        icon: <FaChartBar />,
        items: [
          "Total number of mails sent",
          "Total number of responses received",
          "Campaign name is shown at the top of the view.",
        ],
      },
    ],
    notes: [
      "These metrics help assess the effectiveness and reach of the campaign quickly.",
    ],
  },

 {
  title: "View Response Details",
  description:
    "This page provides a detailed view of individual customer responses submitted for a specific mail campaign in a tabular format. It helps CRM users analyze engagement at the customer level.",
  sections: [
    {
      title: "Elements on the Response Details Page",
      icon: <FaTable />,
      items: [
        "<strong>Customer ID</strong> – Unique identifier of the responding customer.",
        "<strong>Email</strong> – Email address from which the response originated.",
        "<strong>Mobile No</strong> – Registered mobile number of the customer.",
        "<strong>Date</strong> – Timestamp indicating when the response was submitted.",
        "<strong>Response Detail</strong> – Text or content submitted by the customer.",
        "<strong>Interested</strong> – Displays <strong>YES</strong> or <strong>NO</strong> to indicate the customer's interest level.",
       ],
    },
  ],
  notes: [
    "The response table ensures clarity and ease of comparison across customers.",
    "Data is read-only and meant solely for campaign performance analysis.",
  ],
},
  {
    title: "Close Response View",
    description:
      "Use the close option to return to the main campaign listing without modifying any data:",
    sections: [
      {
        title: "Close Action",
        icon: <FaTimes />,
        items: [
          "Click the <strong>Close</strong> button to exit the response detail view.",
          "You will be redirected back to the <strong>Mail Campaign List</strong> screen.",
        ],
      },
    ],
    notes: [
      "This action does not affect or modify campaign or response data.",
    ],
  },
],  
"Add Campaign": [
  {
    title: "Navigate to Add Campaign",
    description: "Follow this path to add a new customer mail campaign in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'Customer Mail Campaign'</strong>",
          "Click on <strong>'Add Campaign'</strong> button",
        ],
        
      },
    ],
    notes: [
          "Ensure you have appropriate permissions to access campaign creation.",
          "‘Add Campaign’ button is usually at the top-right or inline based on layout."
        ],
  },
  {
    title: "Enter Campaign Details",
    description: "Fill in the necessary campaign details to set up your email campaign:",
    sections: [
      {
        title: "Campaign Details Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Campaign Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer/Lead Group</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>End Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer/Lead Sub Group</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Subject</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Message Text</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Msg Image File</strong></TableCell>
                  <TableCell>Image File</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Send Message Mode</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is Response Enabled</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Hello String</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Response Yes Button Text</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Response No Button Text</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Footer Note</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Select a Campaign Template</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Generated PDF File</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
        
      },
    ],
    notes: [
          "Campaign Name and Customer/Lead Group are mandatory to proceed.",
          "‘Send Message Mode’ determines whether the campaign uses Email, WhatsApp, etc.",
        ],
  },
  {
    title: "Submit and Confirm",
    description: "Save and activate the email campaign configuration:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "After filling in all required fields, click on <strong>'Add Campaign'</strong>",
          "You'll receive confirmation of successful campaign creation",
          "Campaign will appear in the <strong>Mail Campaign List</strong>",
        ],
        
      },
    ],
    notes: [
          "Make sure all mandatory fields are correctly filled to avoid submission errors.",
          "Confirmation message usually appears as a toast or inline banner."
        ],
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit the campaign creation form without saving changes:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "Click on <strong>'Back button'</strong> or use the <strong>Mail Campaign List</strong>",
          "You will return to the <strong>Mail Campaign List</strong> page",
        ],
      },
    ],
    notes: [
      "No data will be saved if the form is exited without submission.",
      "If accidental navigation occurs, you may lose unsaved data."
    ],
  },
],
"Update Customer Mail Campaign": [
  {
    title: "Navigate to Customer Mail Campaign Update",
    description: "Follow this path to update an existing customer mail campaign in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
  "Access the <strong>Left Menu</strong> from the main dashboard.",
  "Navigate to the <strong>CRM</strong> section within the Left Menu.",
  "Locate and select <strong>Customer Mail Campaign</strong> from the CRM options.",
  "Choose the <strong>Update</strong> action corresponding to the campaign you wish to modify.",
],

      },
    ],
    notes: [
      "You need appropriate permissions to update campaigns.",
      "Ensure you select the correct campaign to update from the Mail Campaign List.",
    ],
  },
  {
    title: "Update Campaign Details",
    description: "Modify the fields to update your campaign details:",
    sections: [
      {
        title: "Campaign Details Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Campaign Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer/Lead Group</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>End Date</strong></TableCell>
                  <TableCell>Date Picker</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer/Lead Sub Group</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Subject</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Message Text</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Msg Image File</strong></TableCell>
                  <TableCell>Image File</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Send Message Mode</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is Response Enabled</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Customer Hello String</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Response Yes Button Text</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Response No Button Text</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Footer Note</strong></TableCell>
                  <TableCell>Textarea</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Select a Campaign Template</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Generated PDF File</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "Campaign Name, Customer/Lead Group, and Send Message Mode are required fields.",
    ],
  },
  {
    title: "Submit and Confirm",
    description: "Save the updated campaign details:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on the <strong>'Update Campaign'</strong> button to save changes",
          "A confirmation message will appear upon successful update",
          "Updated campaign details reflect in the <strong>Mail Campaign List</strong>",
        ],
      },
    ],
    notes: [
      "Ensure all mandatory fields are correctly filled to avoid errors.",
      "Confirmation is usually shown as a toast or banner notification.",
    ],
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit update without saving changes:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "Click <strong>'Back'</strong> or navigate to <strong>Mail Campaign List</strong>",
          "No changes will be saved if you cancel",
        ],
      },
    ],
    notes: [
      "Unsaved changes will be lost upon cancellation.",
      "Use cancel to safely exit without applying updates.",
    ],
  },
],

// CRM SETUP
"Customer Group (View Record List)": [
  {
    title: "Accessing the Customer Group Setup",
    description: "This section provides access to view and manage all defined customer groups within the CRM module.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "From the main dashboard, open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Within CRM, select <strong>CRM Setup</strong>.",
          "Then, click on <strong>Customer Group</strong> to view the list of available customer groups."
        ],
      },
    ],
    notes: [
      "This screen is view-only; no form fields or filters are required to access the list."
    ]
  },
  {
    title: "Viewing the Record List",
    description: "Displays an organized list of all existing customer groups, showing essential details for each.",
    sections: [
      {
        title: "Record Presentation",
        icon: <FaRegListAlt />,
        items: [
          "Each customer group is represented with a user group icon and a status label.",
          "The group name is clearly displayed as the primary identifier.",
          "An <strong>Update</strong> button is available for each record, enabling editing of group details."
        ],
      },
    ],
    notes: [
      "This screen does not contain input fields.",
      "The content is informational unless the <strong>Update</strong> button is selected."
    ],
  },
  {
    title: "Export and Cancellation Options",
    description: "Outlines options to export the customer group data and how to exit the screen without making changes.",
    sections: [
      {
        title: "Data Export",
        icon: <FaFileExport />,
        items: [
          "Use the <strong>Upload</strong> button to import customer group data if necessary.",
          "Export functionality is available in <strong>.XLS</strong> format only."
        ],
      },
    ],
    notes: [
      "Users can download customer group data directly in <strong>.XLS</strong> format for external use or reporting."
    ],
  }
],
"Customer Group (Add)": [
  {
    title: "Navigate to Add Customer Group",
    description: "Follow this path to create a new customer group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Customer Group'</strong>",
          "Click on <strong>'Add Customer Group'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure you have the necessary permissions to access 'CRM Setup' options.",
    ],
  },
  {
    title: "Enter Customer Group Information",
    description: "Provide the necessary details to define the new customer group:",
    sections: [
      {
        title: "Customer Group Details Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Group Type</strong>
                  </TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Image</strong>
                  </TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
     notes: [
      "Uploading an image helps in visually identifying the group, though it is optional.",
    ],
  },
  {
    title: "Submit and Confirm",
    description: "Finalize and save the new customer group:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> after filling  required fields",
          "Upon success, the new group will appear in the <strong>Customer Group Setup</strong>",
        ],
      },
    ],
    notes: [
      "Ensure that all mandatory fields are filled before submitting",
    ],
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the customer group:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You may cancel the form at any point before submission",
          "Use the <strong>back button</strong> or navigate to <strong>Customer Group List</strong>",
        ],
      },
    ],
    notes: [
      "No data will be saved if the form is exited before submission",
    ],
  },
],
"Customer Group (Update)": [
  {
    title: "Navigate to Update Customer Group",
    description: "Follow this path to update an existing customer group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Customer Group'</strong>",
          "Choose the group to edit and click on <strong>'Update'</strong>",
        ],
      },
    ],
    notes: [
      "Ensure you have edit permissions for CRM setup.",
      "Only existing groups can be updated. If the group does not exist, add it first.",
    ],
  },
  {
    title: "Edit Customer Group Information",
    description: "Modify the necessary details for the selected customer group:",
    sections: [
      {
        title: "Customer Group Edit Form",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Group Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        ),
      },
    ],
    notes: [
      "You can change or remove the image, but it is not required.",
      "Dropdown options for Group Type should already be configured in the CRM.",
    ],
  },
  {
    title: "Submit and Confirm Updates",
    description: "Save the changes made to the customer group:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to apply the updates",
          "Upon success, changes will reflect in the <strong>Customer Group Setup</strong>",
        ],
      },
    ],
    notes: [
      "Make sure all mandatory fields are filled before submitting.",
      "Double-check updates to avoid unintended modifications.",
    ],
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the updated information:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You can cancel editing before submitting changes",
          "Navigate back to the <strong>Customer Group Setup/List</strong> using the Customer Group List  button",
        ],
      },
    ],
    notes: [
      "Unsaved changes will be lost on cancel or navigation without submission.",
    ],
  },
],

"Customer Secondary Group (View Record List)": [
  {
    title: "Accessing the Customer Secondary Group Setup",
    description: "This section allows users to view and manage all defined customer secondary groups under the CRM Setup module.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "From the main dashboard, open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Within CRM, select <strong>CRM Setup</strong>.",
          "Then, click on <strong>Cust. Secondary Group</strong> to view the list of customer secondary groups."
        ],
      },
    ],
    notes: [
      "This screen is view-only; no form fields or filters are required to access the list."
    ]
  },
  {
    title: "Viewing the Record List",
    description: "Displays an organized list of all customer secondary groups in a visual card format with essential information.",
    sections: [
      {
        title: "Record Presentation",
        icon: <FaRegListAlt />,
        items: [
          "Each customer group is represented with a user group icon and a status label.",
          "The group name is clearly displayed as the primary identifier.",
          "An <strong>Update</strong> button is available for each record, enabling editing of group details."
        ],
      },
    ],
    notes: [
      "To edit, users must click the <strong>Update</strong> button on the respective card."
    ],
  },
  {
    title: "Export and Cancellation Options",
    description: "Outlines the available data export method and how to exit the view without changes.",
    sections: [
      {
        title: "Data Export",
        icon: <FaFileExport />,
        items: [
          "Customer Secondary Group data can be exported only in <strong>.XLS</strong> format.",
          "Use the <strong>Upload</strong> button to import bulk data if applicable."
        ],
      },
    ],
    notes: [
      "Users can download customer group data directly in <strong>.XLS</strong> format for external use or reporting."
    ],
  }
],
"Customer Secondary Group (Add)": [
  {
    title: "Navigate to Add Cust. Secondary Group",
    description: "Follow this path to create a new customer secondary group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Cust. Secondary Group'</strong>",
          "Click on <strong>'Add Cust. Secondary Group'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have the necessary permissions to access <strong>CRM Setup</strong> options.",
      "This path opens the form for creating a new customer secondary group."
    ]
  },
  {
    title: "Enter Cust. Secondary Group Information",
    description: "Provide the necessary details to define the new customer secondary group:",
    sections: [
      {
        title: "Cust. Secondary Group Details Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Group Type</strong>
                  </TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Image</strong>
                  </TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>Group Type</strong> are required fields.",
      "Validation is applied to ensure required fields are not left blank."
    ]
  },
  {
    title: "Submit and Confirm",
    description: "Finalize and save the new customer secondary group:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> after filling all required fields.",
          "Upon successful submission, you will be redirected to the <strong>Cust. Secondary Group List</strong>.",
        ]
      }
    ],
    notes: [
      "Double-check all form values before submitting to avoid errors.",
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the customer secondary group:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You can cancel the form at any time before submission.",
          "Use the <strong>Cancel</strong> button or navigate back to the <strong>Cust. Secondary Group List</strong>."
        ]
      }
    ],
    notes: [
      "No data will be saved if the form is exited before clicking <strong>Submit</strong>.",
      "There is no confirmation prompt when cancelling the form."
    ]
  }
],

"Customer Secondary Group (Update)": [
  {
    title: "Navigate to Update Cust. Secondary Group",
    description: "Follow this path to update an existing customer secondary group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Cust. Secondary Group'</strong>",
          "Choose the group to edit and click on <strong>'Update'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have edit permissions under <strong>CRM Setup</strong>.",
      "Only existing secondary groups can be edited. If it doesn't exist, use the <strong>Add</strong> option."
    ]
  },
  {
    title: "Edit Cust. Secondary Group Information",
    description: "Modify the necessary details for the selected customer secondary group:",
    sections: [
      {
        title: "Cust. Secondary Group Edit Form",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Group Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>Group Type</strong> must be filled out to proceed.",
      "<strong>Image</strong> is optional and can be changed or left unchanged.",
    ]
  },
  {
    title: "Submit and Confirm Updates",
    description: "Save the changes made to the customer secondary group:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to apply the updates.",
          "Upon success, the updated record will reflect in the <strong>Cust. Secondary Group List</strong>."
        ]
      }
    ],
    notes: [
      "Ensure all mandatory fields are correctly filled before submission.",
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the updated information:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You can cancel editing before submitting changes.",
          "Use the <strong>Customer Secondary Group List</strong> to return to the Cust. Secondary Group Setup."
        ]
      }
    ],
    notes: [
      "Cancelling will discard any unsaved changes made in the form.",
      "There is no confirmation prompt for cancelling – proceed with caution."
    ]
  }
],
"Lead Group (View Record List)": [
  {
    title: "Accessing the Lead Group Setup",
    description: "This section provides access to view and manage all defined lead groups within the CRM Setup module.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "From the main dashboard, open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Within CRM, select <strong>CRM Setup</strong>.",
          "Then, click on <strong>Lead Group</strong> to view the list of available lead groups."
        ],
      },
    ],
    notes: [
      "This screen is view-only"
    ],
  },
  {
    title: "Viewing the Record List",
    description: "Displays an organized list of all existing lead groups, showing essential details for each.",
    sections: [
      {
        title: "Record Presentation",
        icon: <FaRegListAlt />,
        items: [
          "Each lead group is listed with its name as the primary identifier.",
          "The list is for viewing purposes only; editing or filtering options are not available here."
        ],
      },
    ],
    
  },
  {
    title: "Export and Cancellation Options",
    description: "Outlines options to export the customer group data and how to exit the screen without making changes.",
    sections: [
      {
        title: "Data Export",
        icon: <FaFileExport />,
        items: [
          "Use the <strong>Upload</strong> button to import customer group data if necessary.",
          "Export functionality is available in <strong>.XLS</strong> format only."
        ],
      },
    ],
    notes: [
      "Users can download customer group data directly in <strong>.XLS</strong> format for external use or reporting."
    ],
  }
],
"Lead Group (Add)": [
  {
    title: "Navigate to Add Lead Group",
    description: "Follow this path to create a new lead group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Lead Group'</strong>",
          "Click on <strong>'Add Lead Group'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have the necessary permissions to access <strong>CRM Setup</strong> options.",
      "This path opens the form for creating a new lead group."
    ]
  },
  {
    title: "Enter Lead Group Information",
    description: "Provide the necessary details to define the new lead group:",
    sections: [
      {
        title: "Lead Group Details Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Group Type</strong>
                  </TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Image</strong>
                  </TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>Group Type</strong> are required fields.",
      "Validation ensures these fields are not left blank before submission."
    ]
  },
  {
    title: "Submit and Confirm",
    description: "Finalize and save the new lead group:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> after filling all required fields.",
          "If successful, you will be redirected to the <strong>Lead Group List</strong>.",
        ]
      }
    ],
    notes: [
      "Double-check all form values before submitting.",
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the lead group:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You can cancel the form at any time before submission.",
          "Use the <strong>Cancel</strong> button or navigate back to the <strong>Lead Group List</strong>."
        ]
      }
    ],
    notes: [
      "No data will be saved if the form is exited before clicking <strong>Submit</strong>.",
      "There is no confirmation prompt when cancelling the form."
    ]
  }
],
"Lead Group (Update)": [
  {
    title: "Navigate to Update Lead Group",
    description: "Follow this path to update an existing lead group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Lead Group'</strong>",
          "Choose the group to edit and click on <strong>'Update'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have edit permissions under <strong>CRM Setup</strong>.",
      "Only existing lead groups can be edited. If not found, use the <strong>Add</strong> option instead."
    ]
  },
  {
    title: "Edit Lead Group Information",
    description: "Modify the necessary details for the selected lead group:",
    sections: [
      {
        title: "Lead Group Edit Form",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Group Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>Group Type</strong> are required for successful update.",
      "<strong>Image</strong> is optional and can be changed or left unchanged."
    ]
  },
  {
    title: "Submit and Confirm Updates",
    description: "Save the changes made to the lead group:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to apply the changes.",
          "On successful update, you will be redirected to the <strong>Lead Group List</strong>."
        ]
      }
    ],
    notes: [
      "Make sure all required fields are correctly filled before submission."
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the updated lead group:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You can cancel editing anytime before submitting.",
          "Return to the <strong>Lead Group List</strong> if you don’t wish to save the changes."
        ]
      }
    ],
    notes: [
      "Unsaved changes will be lost if you cancel the operation.",
      "There is no confirmation prompt on cancellation, so proceed with caution."
    ]
  }
],
"Lead Secondary Group (View Record List)": [
  {
    title: "Accessing the Lead Secondary Group Setup",
    description: "This section provides access to view all defined lead secondary groups within the CRM Setup module.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "From the main dashboard, open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Within CRM, select <strong>CRM Setup</strong>.",
          "Then, click on <strong>Lead Secondary Group</strong> to view the list of available secondary groups."
        ],
      },
    ],
    notes: [
      "This screen is view-only; editing or modifying records is not allowed."
    ],
  },
  {
    title: "Viewing the Record List",
    description: "Displays a list of all existing lead secondary groups with their core details.",
    sections: [
      {
        title: "Record Presentation",
        icon: <FaRegListAlt />,
        items: [
          "Each lead secondary group is listed with its name as the key identifier.",
          "The list is intended for viewing purposes only and does not support inline editing or filtering."
        ],
      },
    ],
  },
  {
    title: "Export and Exit Options",
    description: "Provides options to export data and exit the list view.",
    sections: [
      {
        title: "Data Export",
        icon: <FaFileExport />,
        items: [
          "Export functionality is available in <strong>.XLS</strong> format only for external analysis or reporting.",
          "Use the export option to download the lead secondary group data as an Excel file."
        ],
      },
    ],
    notes: [
      "Exported data can be used for audits, offline analysis, or reporting requirements.",
    "You can upload large datasets in bulk to populate the Lead Secondary Group list efficiently."
    ],
  }
],
"Lead Secondary Group (Add)": [
  {
    title: "Navigate to Add Lead Secondary Group",
    description: "Follow this path to create a new lead secondary group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Lead Secondary Group'</strong>",
          "Click on <strong>'Add Secondary Lead Group'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have access to the <strong>CRM Setup</strong> module.",
      "This will open the form for creating a new lead secondary group."
    ]
  },
  {
    title: "Enter Lead Secondary Group Information",
    description: "Fill in the form fields to define the new lead secondary group:",
    sections: [
      {
        title: "Lead Secondary Group Details Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Group Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>Group Type</strong> must be filled before submitting.",
      "<strong>Image</strong> is optional but can be added for better identification."
    ]
  },
  {
    title: "Submit and Confirm",
    description: "Save the new lead secondary group record:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to save the entry.",
          "If successful, you will be redirected to the <strong>Lead Secondary Group List</strong>.",
        ]
      }
    ],
    notes: [
      "Ensure all required fields are completed.",
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the lead secondary group:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You may cancel the operation before submission.",
          "Click the <strong>'Lead Secondary Group List'</strong> button to navigate back to the Lead Secondary Group setup or listing screen.",
              ]
      }
    ],
    notes: [
      "Unsaved changes will be lost upon cancellation.",
      "There is no warning popup when cancelling the form."
    ]
  }
],
"Lead Secondary Group (Update)": [
  {
    title: "Navigate to Update Lead Secondary Group",
    description: "Follow this path to update an existing lead secondary group in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Lead Secondary Group'</strong>",
          "Choose the group to edit and click on <strong>'Update'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have edit access to the <strong>CRM Setup</strong> module.",
      "Only existing lead secondary groups can be edited. If the group doesn't exist, consider using the <strong>Add</strong> function."
    ]
  },
  {
    title: "Edit Lead Secondary Group Information",
    description: "Modify the fields as required to update the selected lead secondary group:",
    sections: [
      {
        title: "Lead Secondary Group Edit Form",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Group Type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>Group Type</strong> must be updated if needed and cannot be left blank.",
      "<strong>Image</strong> is optional and may remain unchanged if not modified."
    ]
  },
  {
    title: "Submit and Confirm Updates",
    description: "Save the modifications made to the lead secondary group:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to save your updates.",
          "If successful, you’ll be redirected to the <strong>Lead Secondary Group List</strong>."
        ]
      }
    ],
    notes: [
      "Review all field entries before submitting.",
      "Form will not submit if mandatory fields are empty."
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit the update screen without saving changes:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You may also click on <strong>'Lead Secondary Group List'</strong> to directly return to the Lead Secondary Group Setup or List view.",
        ]
      }
    ],
    notes: [
      "No changes will be saved if you cancel before submitting.",
      "There is no confirmation dialog when you cancel — proceed carefully."
    ]
  }
],
"Campaign Template (View Record List)": [
  {
    title: "Accessing the Campaign Template Setup",
    description: "This section allows users to view all campaign templates configured within the CRM Setup module.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "From the main dashboard, open the <strong>Left Menu</strong>.",
          "Click on the <strong>CRM</strong> section.",
          "Navigate to <strong>CRM Setup</strong>.",
          "Click on <strong>Campaign Template</strong> to access the template listing screen."
        ],
      },
    ],
    notes: [
      "This screen is accessible in view-only mode; you cannot delete or bulk edit templates here."
    ],
  },
  {
    title: "Viewing the Record List",
    description: "Displays a detailed list of all campaign templates with core attributes and update options.",
    sections: [
      {
        title: "Record Presentation",
        icon: <FaRegListAlt />,
        items: [
          "Each campaign template displays the name, usage type, and metadata like Header/Footer and Voting status.",
          "Templates are visually presented with icons and clear labels for quick identification.",
          "Each record has an <strong>Update</strong> button that allows editing the template configuration."
        ],
      },
    ],
  },
  {
    title: "Export and Upload Options",
    description: "Allows users to upload new templates and export current data for reporting purposes.",
    sections: [
      {
        title: "Data Upload",
        icon: <FaUpload />,
        items: [
          "Use the <strong>Upload</strong> button to import a new campaign template.",
          "Accepted formats include only those supported by the system (commonly .XLS)."
        ],
      },
      {
        title: "Data Export",
        icon: <FaFileExport />,
        items: [
          "Export is supported in <strong>.XLS</strong> format only.",
          "This feature can be used to analyze or document current campaign templates externally."
        ],
      },
    ],
    notes: [
      "Make sure uploaded templates follow the predefined system format to ensure compatibility.",
    ],
  }
],
"Add Campaign Template": [
  {
    title: "Navigate to Add Campaign Template",
    description: "Follow this path to create a new campaign template in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Campaign Template'</strong>",
          "Click on <strong>'Add Campaign Template'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have access to the <strong>CRM Setup</strong> module.",
      "This will open the form for creating a new campaign template."
    ]
  },
  {
    title: "Enter Campaign Template Information",
    description: "Fill in the form fields to define the new campaign template:",
    sections: [
      {
        title: "Campaign Template Details Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Custom Template File</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Background Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Background Colour</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is header</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is footer</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Message body</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Use system template</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is voting enabled</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong>, and <strong>Custom Template File</strong> are mandatory fields.",
    ]
  },
  {
    title: "Submit and Confirm",
    description: "Save the new campaign template record:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to save the campaign template.",
          "Upon successful submission, you will be redirected to the <strong>Campaign Template List</strong>."
        ]
      }
    ],
    
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the campaign template:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "You may cancel the operation before submission.",
          "Click the <strong>'Campaign Template List'</strong> button to navigate back to the template listing screen."
        ]
      }
    ],
    notes: [
      "Unsaved changes will be lost upon cancellation.",
      "No additional confirmation popup is shown before cancellation."
    ]
  }
],

"Update Campaign Template": [
  {
    title: "Navigate to Update Campaign Template",
    description: "Follow this path to update an existing campaign template in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Campaign Template'</strong>",
          "Select the template you wish to update and click on <strong>'Update'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have permission to access and edit campaign templates.",
      "The update screen will show the existing data which can be modified."
    ]
  },
  {
    title: "Edit Campaign Template Information",
    description: "Modify the fields as needed to update the campaign template:",
    sections: [
      {
        title: "Campaign Template Update Form",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Custom Template File</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Mandatory</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Background Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Background Colour</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is header</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is footer</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Message body</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Use system template</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Is voting enabled</strong></TableCell>
                  <TableCell>Checkbox</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong>,and <strong>Custom Template File</strong> must be filled before updating.",
      "Existing file fields can be replaced with new files if needed."
    ]
  },
  {
    title: "Submit and Confirm",
    description: "Save the changes made to the campaign template:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to apply the updates.",
          "Upon success, you will be redirected to the <strong>Campaign Template List</strong>."
        ]
      }
    ],
    notes: [
      "Double-check all mandatory fields before submitting.",
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the changes made to the campaign template:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "Click on <strong>'Campaign Template List'</strong> if you do not want to save the changes.",
          "Click the <strong>'Campaign Template List'</strong> button to return to the list screen."
        ]
      }
    ],
    notes: [
      "Unsaved modifications will be discarded.",
      "No confirmation prompt is shown before cancel."
    ]
  }
],
"Task Category (View Record List)": [
  {
    title: "Navigate to Task Category Record List",
    description: "Use the following steps to access the Task Category list in the CRM Setup section:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click <strong>'CRM'</strong>",
          "Go to <strong>'CRM Setup'</strong>",
          "Click on <strong>'Task Category'</strong>"
        ]
      }
    ],
    notes: [
      "You must have appropriate view access to reach the Task Category section.",
      "This will show all available task categories in a card-based list format."
    ]
  },
  {
    title: "Task Category List Overview",
    description: "Here’s what you can do on the Task Category listing page:",
    sections: [
      {
        title: "Interface Features",
        icon: <FaListAlt />,
        items: [
          "Each Task Category is displayed as a card with its name and action buttons.",
          "Available buttons include:",
          "- <strong>'Edit Task SLA'</strong> (optional, varies by category)",
          "- <strong>'Update'</strong> (to modify the task category)",
          "Use the <strong>'Upload'</strong> button to import task categories in bulk.",
          "Download the list as an <strong>XLS File</strong> using the export option."
        ]
      }
    ],
    notes: [
      "No filters or search are available on this screen.",
      "No print/export to PDF options available—only XLS export is supported."
    ]
  },
],
"Add Task Category": [
  {
    title: "Navigate to Add Task Category",
    description: "Follow this path to create a new task category in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Task Category'</strong>",
          "Click on <strong>'Add Task Category'</strong>"
        ]
      }
    ],
    notes: [
      "Ensure you have the necessary permissions to access <strong>CRM Setup</strong> options.",
      "This path opens the form for creating a new task category."
    ]
  },
  {
    title: "Enter Task Category Information",
    description: "Provide the required information to define a new task category:",
    sections: [
      {
        title: "Task Category Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>E type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Parent category</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>E type</strong> are mandatory fields.",
      "You can skip the <strong>Parent category</strong> if not applicable.",
    ]
  },
  {
    title: "Submit and Confirm",
    description: "Save the task category to make it available in the system:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> after filling in all required fields.",
          "If successful, the new task category will appear in the <strong>Task Category List</strong>.",
          "Bulk uploads for task categories may also be supported if enabled."
        ]
      }
    ],
    notes: [
      "Verify your entries before submitting the form.",
      "You will be redirected to the list view after successful submission."
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit the form without saving the task category:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "Use the <strong>'Task Category List'</strong> button at the top right to return without saving.",
          "No confirmation is prompted when exiting without submitting."
        ]
      }
    ],
    notes: [
      "Unsaved data will be lost if you exit the form before clicking <strong>Submit</strong>.",
    ]
  }
],
"Update Task Category": [
  {
    title: "Navigate to Update Task Category",
    description: "Follow this path to update an existing task category in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Task Category'</strong>",
          "Locate the category to update in the <strong>Task Category List</strong>",
          "Click on the <strong>'Update'</strong> icon or button for the respective category"
        ]
      }
    ],
    notes: [
      "Editing permissions are required to update an existing task category.",
      "You will be redirected to the update form with pre-filled values."
    ]
  },
  {
    title: "Update Task Category Information",
    description: "Modify the necessary fields in the task category form:",
    sections: [
      {
        title: "Task Category Update Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>E type</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Parent category</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong>,and <strong>E type</strong> are mandatory fields.",
      "Leave <strong>Parent category</strong> unselected if it does not apply.",
    ]
  },
  {
    title: "Submit and Save Changes",
    description: "Finalize the updates made to the task category:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click on <strong>'Submit'</strong> to save the changes.",
          "Upon successful submission, you will be redirected to the <strong>Task Category List</strong>."
        ]
      }
    ],
    notes: [
      "Ensure all required fields are properly filled before submitting.",
      "Double-check updated values before saving."
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit the update form without saving any changes:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "Click on the <strong>'Task Category List'</strong> button to go back without saving.",
          "No confirmation popup will appear upon cancellation."
        ]
      }
    ],
    notes: [
      "Any unsaved changes will be lost if you leave the form.",
      "Ensure you save your changes before exiting if needed."
    ]
  }
],
"Add Task SLA": [
  {
    title: "Navigate to Add Task SLA",
    description: "This screen allows you to configure Service Level Agreements (SLA) for a task category.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Navigate to <strong>'Task Category'</strong>",
          "Click on the <strong>'Add Task SLA'</strong> button for a task category"
        ]
      }
    ],
    notes: [
      "The form is typically accessed via the Task Category List."
    ]
  },
  {
    title: "Fill Task SLA Details",
    description: "Provide SLA configuration details as applicable:",
    sections: [
      {
        title: "SLA Configuration Form",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Input Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Sla days limit</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Notify days</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Next level emp</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Default emp</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Escalation manager</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Default user</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
  "The fields *SLA Days Limit* and *Notify Days* are mandatory and must be configured to ensure proper SLA tracking and notification handling.",
  "Other fields are optional and can be configured based on operational requirements."
]
  },
  {
    title: "Submit SLA Configuration",
    description: "Save the SLA settings for the selected task category.",
    sections: [
      {
        title: "Submit",
        icon: <FaPaperPlane />,
        items: [
          "Click the <strong>'Submit'</strong> button to save SLA details.",
          "You will be redirected back to the <strong>Task Category List</strong> page upon successful submission."
        ]
      }
    ],
    notes: [
      "Make sure to review all entered values before submitting.",
    ]
  },
  {
    title: "Cancel and Return",
    description: "Exit the form without saving any changes.",
    sections: [
      {
        title: "Cancel",
        icon: <FaArrowLeft />,
        items: [
          "Click the <strong>'Task Category List'</strong> button at the top-right to cancel and return."
        ]
      }
    ],
    notes: [
      "No confirmation prompt will appear. Ensure to save if necessary before leaving.",
      "Unsaved data will be lost upon navigating away."
    ]
  }
],
"Task Sub Category (View Record List)": [
  {
    title: "Navigate to Task Sub Category Record List",
    description: "Use the following steps to access the Task Sub Category list in the CRM Setup section:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Click <strong>'CRM'</strong>",
          "Go to <strong>'CRM Setup'</strong>",
          "Click on <strong>'Task Sub Category'</strong>"
        ]
      }
    ],
    notes: [
      "You must have appropriate view access to reach the Task Sub Category section.",
      "This section is only exportable in <strong>XLS file</strong> format.",
    ]
  },
  {
    title: "Task Sub Category List Overview",
    description: "Here’s what you can expect on the Task Sub Category listing page:",
    sections: [
      {
        title: "Interface Features",
        icon: <FaListAlt />,
        items: [
          "Each Task Sub Category is shown as a <strong>card</strong> with a title, icon, and action buttons.",
          "Each card displays:",
          "- <strong>Task Sub Category Name</strong>",
          "- Optional <strong>Task Category Label</strong>",
          "- <strong>'Update'</strong> button to modify the sub-category.",
          "Use the <strong>'Upload'</strong> button to bulk import records.",
          "Use the <strong>'XLS File'</strong> button to export the list in Excel format.",
          "Add new entries via the <strong>'Add Task Sub Category'</strong> button."
        ]
      }
    ],
    notes: [
      "The page is strictly read-only with data available only for export."
    ]
  }
],
"Add Task Sub Category": [
  {
    title: "Navigate to Add Task Sub Category",
    description: "Follow this path to create a new task sub category in the CRM:",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Task Sub Category'</strong>",
          "Click on <strong>'Add Task Sub Category'</strong>"
        ]
      }
    ],
    notes: [
      "Make sure you have access rights to <strong>CRM Setup</strong> features.",
      "This will open the Task Sub Category form interface."
    ]
  },
  {
    title: "Enter Task Sub Category Information",
    description: "Fill in the following fields to create a new task sub category:",
    sections: [
      {
        title: "Task Sub Category Form",
        icon: <FaRegAddressBook />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>E type</strong></TableCell>
                  <TableCell>Dropdown (default: Task Sub Category)</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Parent category</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "<strong>Name</strong> and <strong>E type</strong> fields are mandatory.",
    ]
  },
  {
    title: "Submit and Confirm",
    description: "Save your new task sub category details:",
    sections: [
      {
        title: "Submission",
        icon: <FaCheckCircle />,
        items: [
          "Click the <strong>'Submit'</strong> button at the bottom of the form.",
          "A new task sub category will be added and listed in the <strong>Task Sub Category List</strong>.",
          "If bulk data is supported, you may also upload using import options."
        ]
      }
    ],
    notes: [
      "Ensure all required fields are completed accurately before submission.",
      "Successful submission redirects you to the sub category listing screen."
    ]
  },
  {
    title: "Cancel and Navigate Back",
    description: "Exit without saving the form:",
    sections: [
      {
        title: "Cancel Operation",
        icon: <FaArrowLeft />,
        items: [
          "Click on the <strong>'Task Sub Category List'</strong> button at the top right.",
          "This will discard any unsaved changes and return you to the record list."
        ]
      }
    ],
    notes: [
      "Data will not be saved if you exit the form before clicking <strong>Submit</strong>."
    ]
  }
],
"Update Task Sub Category": [
  {
    title: "Navigate to Update Task Sub Category",
    description: "Use the following path to access and update an existing task sub category.",
    sections: [
      {
        title: "Navigation Path",
        icon: <FaRoute />,
        items: [
          "Go to <strong>'Left Menu'</strong>",
          "Select <strong>'CRM'</strong>",
          "Click on <strong>'CRM Setup'</strong>",
          "Click on <strong>'Task Sub Category'</strong>",
          "Choose the <strong>'Edit/Update'</strong> icon for the entry you want to update"
        ]
      }
    ],
    notes: [
      "Make sure you have edit rights for task sub categories.",
      "Only existing records can be updated using this form."
    ]
  },
  {
    title: "Edit Task Sub Category Details",
    description: "Modify the fields as needed to update the selected task sub category.",
    sections: [
      {
        title: "Update Form Fields",
        icon: <FaEdit />,
        content: (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Field Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Validation</TableHeader>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell>Text</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>E type</strong></TableCell>
                  <TableCell>Dropdown (e.g., Task Sub Category)</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Parent category</strong></TableCell>
                  <TableCell>Dropdown</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell>File Upload</TableCell>
                  <TableCell>Optional</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        )
      }
    ],
    notes: [
      "You can change the image by selecting a new file.",
      "Current image filename is shown with an option to upload a replacement.",
      "All changes must comply with mandatory field requirements."
    ]
  },
  {
    title: "Submit Changes",
    description: "Save the updates made to the task sub category.",
    sections: [
      {
        title: "Submission",
        icon: <FaPaperPlane />,
        items: [
          "After editing, click on the <strong>'Submit'</strong> button.",
          "Changes will be saved and the updated sub category will appear in the list."
        ]
      }
    ],
    notes: [
      "Ensure all required fields are properly filled.",
      "Validation errors must be resolved before submission is accepted."
    ]
  },
  {
    title: "Cancel and Return",
    description: "Exit the update form without saving.",
    sections: [
      {
        title: "Cancel Update",
        icon: <FaArrowLeft />,
        items: [
          "Click on <strong>'Task Sub Category List'</strong> at the top right.",
          "You will be redirected back to the list without saving any changes."
        ]
      }
    ],
    notes: [
      "Unsaved changes will be discarded.",
      "No confirmation prompt appears before cancellation."
    ]
  }
],



};

const ManualSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [steps, setSteps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicParam = queryParams.get("topic");
    setTopic(topicParam || "");

    if (topicParam) {
      if (manualStepsData[topicParam]) {
        const filteredSteps = manualStepsData[topicParam].filter(
          (step) => !step.accesspath
        );
        setSteps(filteredSteps);
        return;
      }

      for (const [key, value] of Object.entries(manualStepsData)) {
        if (value[0]?.accesspath === topicParam) {
          const filteredSteps = value.filter((step) => !step.accesspath);
          setTopic(key);
          setSteps(filteredSteps);
          return;
        }
      }
    }

    navigate("/manual.html");
    setSteps([]);
  }, [location.search, navigate]);

  const handleBackClick = () => {
    window.history.back();
  };

  const highlight = (text) => {
    if (!searchTerm || typeof text !== "string") return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const highlightHTML = (text) => {
    if (!searchTerm || typeof text !== "string") return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const highlighted = text.replace(
      regex,
      (match) => `<span style="background-color: yellow">${match}</span>`
    );
    return highlighted;
  };

  const filteredSteps = steps.filter((step) => {
    const allText = `
    ${step.title}
    ${step.description || ""}
    ${(step.notes || []).join(" ")}
    ${(step.sections || [])
      .map(
        (sec) =>
          `${sec.title || ""} ${sec.content || ""} ${(sec.items || []).join(
            " "
          )}`
      )
      .join(" ")}
  `.toLowerCase();

    return allText.includes(searchTerm.toLowerCase());
  });

  return (
    <PageContainer>
      <StepsContainer>
        <HeaderGradient
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "1rem",
          }}
        >
          <StepsHeader style={{ flex: "1 1 60%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaCheckCircle
                  style={{ marginRight: 12, fontSize: "1.5rem" }}
                />
                <StepsTitle>{topic || "Step-by-Step Guide"}</StepsTitle>
              </div>
              <StepsSubtitle style={{ paddingLeft: 24 }}>
                Follow these instructions to{" "}
                {topic ? topic.toLowerCase() : "complete the process"}
              </StepsSubtitle>
            </div>
          </StepsHeader>
          <div style={{ flex: "1 1 40%", textAlign: "right" }}>
            <input
              type="text"
              placeholder="Search all content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                width: "100%",
                maxWidth: "300px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </HeaderGradient>

        <StepsContent>
          {filteredSteps.length > 0 ? (
            filteredSteps.map((step, index) => (
              <StepItem key={index}>
                <StepNumberContainer>
                  <StepNumber>{index + 1}</StepNumber>
                </StepNumberContainer>
                <StepMainContent>
                  <StepTitle>{highlight(step.title)}</StepTitle>
                  {step.description && (
                    <StepDescription>
                      {highlight(step.description)}
                    </StepDescription>
                  )}
                  {step.sections?.map((section, sectionIndex) => (
                    <StepSection key={sectionIndex}>
                      <SectionTitle>
                        {section.icon}
                        {highlight(section.title)}
                      </SectionTitle>
                      {section.items ? (
                        <StepList>
                          {section.items.map((item, itemIndex) => (
                            <StepListItem key={itemIndex}>
                              <ListItemIcon />
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: highlightHTML(item),
                                }}
                              />
                            </StepListItem>
                          ))}
                        </StepList>
                      ) : typeof section.content === "string" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: highlightHTML(section.content),
                          }}
                        />
                      ) : (
                        section.content
                      )}
                    </StepSection>
                  ))}
                  {step.notes?.map((note, noteIndex) => (
                    <ImportantNote key={noteIndex}>
                      <MdOutlineStickyNote2 />
                      <NoteText>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightHTML(note),
                          }}
                        />
                      </NoteText>
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
                <StepDescription>
                  Please select a valid topic from the manual.
                </StepDescription>
              </StepMainContent>
            </StepItem>
          )}
        </StepsContent>

        <ActionBar>
          <BackButton onClick={handleBackClick}>
            <BackButtonIcon />
            Return to Previous
          </BackButton>
          <ProgressIndicator>
            Step <span>{filteredSteps.length > 0 ? 1 : 0}</span> to{" "}
            <span>{filteredSteps.length || 1}</span>
          </ProgressIndicator>
        </ActionBar>
      </StepsContainer>
    </PageContainer>
  );
};

export default ManualSteps;
