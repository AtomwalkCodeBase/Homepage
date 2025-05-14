import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaCheckCircle,
  FaRoute,
  FaSync,
  FaFile,
  FaTimesCircle,
  FaTools,
  FaEdit,
  FaCheck,
  FaExclamationCircle,
  FaTrash,
  FaTable,
  FaFileSignature,
  FaLock,
  FaTimes,
  FaListAlt,
  FaUserShield,
  FaUndo,
  FaLightbulb,
  FaCogs,
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
  FaTachometerAlt,
  FaSignOutAlt,
  FaFileExport,
  FaList,
  FaFilter,
  FaHandshake,
  FaTasks,
  FaTag,
  FaMoneyBillWave,
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
            "Login to the <strong>Atomwalk HRMS</strong> platform",
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

  "Accessing the Platform": [
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
        "<strong>Accessing the platform</strong> requires a valid employee ID and password",
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
        "Once logged in, all platform features are available as per user role and permissions",
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
  "Overview For CRM": [
    { accesspath: "Main Menu / Browser Back" },
    {
      title: "Navigate to Overview",
      description:
        "Follow this path to access the general dashboard and introduction section of Atomwalk CRM:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Login to the <strong>Atomwalk CRM</strong> platform",
            "Use the <strong>Left Sidebar</strong>",
            "Click on <strong>'Employee (CRM)'</strong>",
            "Access the <strong>'Overview / Dashboard'</strong> section",
          ],
        },
      ],
      notes: [
        "<strong>Overview</strong> provides high-level CRM system introduction and key customer metrics",
      ],
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
                    <TableCell>
                      <strong>Customer Summary</strong>
                    </TableCell>
                    <TableCell>Info Block</TableCell>
                    <TableCell>
                      <ul>
                        <li>Displays total customers, leads, opportunities</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Quick CRM Links</strong>
                    </TableCell>
                    <TableCell>Buttons</TableCell>
                    <TableCell>
                      <ul>
                        <li>Shortcut to Leads, Contacts, Activities</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Notifications</strong>
                    </TableCell>
                    <TableCell>Info Panel</TableCell>
                    <TableCell>
                      <ul>
                        <li>Shows CRM-related updates or workflow alerts</li>
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
                        <li>Displays current user info and login role</li>
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
        "CRM Overview is informational only – no data input required",
        "Helpful for understanding key metrics and accessing modules quickly",
      ],
    },
    {
      title: "Exit Overview",
      description:
        "Return to any other CRM module from the Overview dashboard:",
      sections: [
        {
          title: "Exit Options",
          icon: <FaSignOutAlt />,
          items: [
            "Use <strong>Main Menu</strong> to go to Leads, Contacts, or Settings",
            "Or use the <strong>Browser Back</strong> button",
          ],
        },
      ],
      notes: ["Overview does not involve data changes or submissions"],
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
        "Use this section to upload and manage official documents for employees within the HRMS platform.",
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
  "Expense Category(Add Expense Category)": [
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
"Dashboard": [
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

"New Claim": [
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

"Dashboard": [
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

  "Views Employee Request details1": [
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
  "Set Up(Item Category)": [
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

"Set Up(Location Code)": [
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
  "Create Profile": [
    {
      title: "Navigate to Create Customer",
      description:
        "Follow this path to access the customer profile creation form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Customer List'</strong>",
            "Click on <strong>'Create Customer'</strong>",
            "Then choose <strong>'Create'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure you have appropriate <strong>CRM access permissions</strong> to create customer records",
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
                    <TableCell>Valid email format</TableCell>
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
                    <TableCell>Mandatory selection</TableCell>
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
                    <TableCell>Optional, supports jpg/png</TableCell>
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
        "Fields marked with asterisk (*) are mandatory",
        "CRM will auto-validate email and mobile formats",
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
            "Click <strong>'Save'</strong> or <strong>'Submit'</strong> button",
            "System will notify if mandatory fields are missing",
            "You'll be redirected to the updated <strong>'Customer List'</strong> page",
          ],
        },
      ],
      notes: [
        "No document upload required unless specified",
        "You can <strong>edit the profile</strong> later from Customer List",
      ],
    },
  ],
  "Update Information": [
    {
      title: "Navigate to Update Customer",
      description:
        "Use the following path to locate and update an existing customer's profile:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Customer List'</strong>",
            "Search and click on the specific customer record",
            "Click on <strong>'Update'</strong> or <strong>'Edit'</strong> button to modify details",
          ],
        },
      ],
      notes: [
        "Ensure the customer already exists in the <strong>Customer List</strong>",
        "You must have update rights to perform this action",
      ],
    },
    {
      title: "Customer Information Update",
      description:
        "Edit the required fields with accurate and updated information. All validations will be applied:",
      sections: [
        {
          title: "Editable Fields Table",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Field Type</TableHeader>
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
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Valid email format</TableCell>
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
                    <TableCell>
                      Cannot be a future date if updating history
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Mandatory</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Customer Group (Primary)</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Mandatory</TableCell>
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
                    <TableCell>Optional, supports jpg/png</TableCell>
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
        "Make sure to <strong>review all values</strong> before updating",
        "You cannot edit historical entries beyond certain limits unless you have special access",
      ],
    },
    {
      title: "Submit Updated Information",
      description:
        "Once modifications are done, follow these steps to save the changes:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all updated data carefully",
            "Click on <strong>'Update'</strong> or <strong>'Save'</strong>",
            "System will confirm the changes",
            "You'll be redirected to the <strong>'Customer List'</strong> with updated details",
          ],
        },
      ],
      notes: [
        "Changes are <strong>immediately reflected</strong> in the Customer List",
        "Edit logs may be recorded for audit purposes",
      ],
    },
  ],
  "Client History": [
    {
      title: "Navigate to Client History",
      description:
        "Follow these steps to view a client’s interaction and transaction history:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Click on <strong>'Customer List'</strong>",
            "Search and select the desired <strong>Client Profile</strong>",
            "Click on the <strong>'History'</strong> tab or button",
          ],
        },
      ],
      notes: [
        "You must have access rights to view <strong>Client History</strong>",
        "Client must exist in the system before viewing history",
      ],
    },
    {
      title: "Viewable History Sections",
      description:
        "The client history panel displays various types of tracked data:",
      sections: [
        {
          title: "History Categories",
          icon: <FaEdit />,
          items: [
            "<strong>Profile Updates</strong> – See changes to contact, type, and address information",
            "<strong>Interaction Logs</strong> – Past calls, emails, and meetings with timestamps",
            "<strong>Purchase/Service Records</strong> – List of purchases, service usage, or bookings",
            "<strong>Ticket & Complaint Records</strong> – Any issues raised and their resolution status",
            "<strong>Communication Trail</strong> – Email chains, WhatsApp messages (if integrated)",
            "<strong>Notes & Remarks</strong> – Internal team comments or follow-up reminders",
          ],
        },
      ],
      notes: [
        "Records are shown in <strong>reverse chronological order</strong>",
        "Filters are available by <strong>date, type, or status</strong>",
        "Export option available in CSV/PDF if enabled",
      ],
    },
    {
      title: "Use and Interpret History Data",
      description:
        "Guidelines to effectively use client history data for engagement and support:",
      sections: [
        {
          title: "Best Practices",
          icon: <FaLightbulb />,
          items: [
            "Use recent interaction logs to <strong>prepare for follow-ups</strong>",
            "Review complaint history before <strong>resolving new tickets</strong>",
            "Track trends in <strong>client purchase behavior</strong> for upsell opportunities",
            "Ensure data accuracy and raise corrections if you spot anomalies",
          ],
        },
      ],
      notes: [
        "Client history helps ensure <strong>continuity of service</strong> and context-aware support",
        "Data shown depends on module integrations and permissions",
      ],
    },
  ],
  "Task List": [
    {
      title: "Navigate to Task List",
      description:
        "Follow this path to access the customer-specific Task List form:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Customer List'</strong>",
            "Open desired <strong>'Customer Profile'</strong>",
            "Navigate to <strong>'Task List'</strong>",
            "Click <strong>'Customer Task Details'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> required to access Task List section.",
        "Ensure you select the correct customer from the Customer List before creating tasks.",
      ],
    },
    {
      title: "Task Entry Details",
      description:
        "Fill in all required fields to create a customer-related task:",
      sections: [
        {
          title: "Task Details Table",
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
                      <strong>Task Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Mandatory, Max 100 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Must select from system-defined list</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Sub Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Contextually filtered by Task Type</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Planned Date</strong>
                    </TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Cannot be a past date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Start Time</strong>
                    </TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Must be before End Time</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>End Time</strong>
                    </TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Must be after Start Time</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Priority</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Choose from High, Medium, Low</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Status</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Set initial status (e.g., Open)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remark</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional, Max 200 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Owner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select from system users</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Current User Assigned</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Can be same as or different from Task Owner
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Fields marked with * are mandatory.",
        "Task visibility is linked to the customer profile it belongs to.",
      ],
    },
    {
      title: "Submit Task Entry",
      description: "Final steps to save the task under the customer profile:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all details",
            "Click <strong>'Save Task'</strong>",
            "Wait for <strong>success confirmation</strong>",
            "New task will appear under the <strong>Customer's Task List</strong>",
          ],
        },
      ],
      notes: [
        "Assigned users will get <strong>email/CRM notifications</strong> for the task.",
        "Tasks can be edited or reassigned later from the same list.",
      ],
    },
  ],
  "Product Interest": [
    {
      title: "Navigate to Product Interest",
      description:
        "Follow this path to access the Product Interest form for a customer:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Customer List'</strong>",
            "Open the desired <strong>Customer Profile</strong>",
            "Navigate to <strong>'Product Interest'</strong>",
            "Click <strong>'Add Product Interest'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to CRM required.",
        "Ensure you're inside the correct customer profile before adding interest.",
      ],
    },
    {
      title: "Product Interest Details",
      description:
        "Enter all required product preferences and related information:",
      sections: [
        {
          title: "Product Interest Form",
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
                      <strong>Product Category</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Must select from available categories</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Name 1</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Must select relevant variation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Value 1</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Linked to selected Variation Name</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Name 2</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional - for additional variation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Value 2</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Linked to selected Variation Name 2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Name 3</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Optional - for further variation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Value 3</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Linked to selected Variation Name 3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Product Info</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional, max 200 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Select from Open, In Progress, Closed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Due Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Cannot be in the past</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "At least one variation is mandatory.",
        "Product category and due date are required fields.",
      ],
    },
    {
      title: "Submit Product Interest",
      description: "Final steps to save customer product interest details:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all the selected options and fields",
            "Click on <strong>'Save Product Interest'</strong>",
            "Wait for a <strong>confirmation message</strong>",
            "Data will be added to the <strong>Customer Product Interest List</strong>",
          ],
        },
      ],
      notes: [
        "No additional documents are required.",
        "You can edit or update product interests later from the same section.",
      ],
    },
  ],
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
      notes: [
        "Ensure only one account is marked as default per customer.",
        "You can edit or deactivate accounts later if needed.",
      ],
    },
  ],
  "Generate Agreement": [
    {
      title: "Navigate to Generate Agreement",
      description: "Follow these steps to initiate a new customer agreement:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Customer List'</strong>",
            "Choose the relevant <strong>Customer</strong>",
            "Click on <strong>'Generate Agreement'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> is required to access CRM Customer List.",
        "Ensure the customer record is complete before generating an agreement.",
      ],
    },
    {
      title: "Fill Agreement Details",
      description:
        "Enter the agreement metadata and custom fields as required:",
      sections: [
        {
          title: "Agreement Form Fields",
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
                      <strong>Agreement Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      Required; select from predefined types
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Valid Till Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required; must be a future date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Name 1</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      Optional; label for dynamic agreement field
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Value 1</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; value for field name 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Name 2</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; custom field</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Value 2</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; corresponding value</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Name 3</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; custom field</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Value 3</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Optional; corresponding value</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "You may use <strong>Field Name/Value</strong> pairs for custom agreement details.",
        "All agreements are stored in the customer’s profile.",
      ],
    },
    {
      title: "Generate & Save Agreement",
      description:
        "Once all fields are filled, proceed to create the agreement:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaFileSignature />,
          items: [
            "Click the <strong>'Generate'</strong> or <strong>'Save'</strong> button",
            "System will auto-create a <strong>PDF or digital copy</strong>",
            "Agreement will be saved under the <strong>'Customer Details'</strong>",
            "You can download, email, or print the agreement from the profile",
          ],
        },
      ],
      notes: [
        "Ensure all data is correct before generating; editing may not be allowed post-generation.",
        "Generated agreements are audit-tracked.",
      ],
    },
  ],
  "TDS Received": [
    {
      title: "Navigate to TDS Received",
      description:
        "Use the following path to access and record received TDS entries:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Customer List'</strong>",
            "Choose the relevant <strong>Customer</strong>",
            "Click on <strong>'TDS Received'</strong> tab",
          ],
        },
      ],
      notes: [
        "TDS Received data is linked with <strong>Upload TDS</strong> records if available",
        "Ensure the customer is selected before adding any entry",
      ],
    },
    {
      title: "Enter TDS Details",
      description: "Fill in the required transaction fields for recording TDS:",
      sections: [
        {
          title: "TDS Entry Fields",
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
                      <strong>Transaction Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Required; cannot be in future</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Book Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      Required; must be same or later than Transaction Date
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Paid Amount</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required; positive numeric value</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>TDS Amount</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>
                      Required; less than or equal to Paid Amount
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>TDS Section</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      Required; valid section code (e.g., 194C, 194J)
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All entries are auto-linked to customer and visible under their profile",
        "Ensure data accuracy for correct TDS reconciliation",
      ],
    },
    {
      title: "Save and Review",
      description: "Finalize the record and save TDS entry:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaCheckCircle />,
          items: [
            "Review all entered TDS details",
            "Click on <strong>'Save TDS Entry'</strong> button",
            "System logs the TDS in <strong>Customer's TDS History</strong>",
            "Entry becomes visible in the TDS records table",
          ],
        },
      ],
      notes: [
        "You may not require approval to save the TDS entry",
        "Use <strong>Upload TDS</strong> section to batch upload TDS data",
      ],
    },
  ],
  "Document Received": [
    {
      title: "Navigate to Document List",
      description:
        "Use the following path to add received documents for a customer:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'Left Menu'</strong>",
            "Select <strong>'CRM'</strong>",
            "Click on <strong>'Customer List'</strong>",
            "Select the desired <strong>Customer</strong>",
            "Click on <strong>'Document List'</strong> tab",
          ],
        },
      ],
      notes: [
        "Ensure you have selected the correct customer before uploading a document",
        "Use descriptive document names and remarks for easy reference",
      ],
    },
    {
      title: "Upload Document Details",
      description: "Fill in the required fields to register a document entry:",
      sections: [
        {
          title: "Document Entry Fields",
          icon: <FaFileUpload />,
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
                      <strong>Document Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required; select appropriate category</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Document Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required; between 5–50 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Document File</strong>
                    </TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>Required; PDF, JPG, or DOC format</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Valid From Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>Optional; must be a valid date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Valid To Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      If provided, must be after 'Valid From Date'
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>Optional; max 200 characters</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "Document validity dates are optional but useful for compliance tracking",
        "All uploaded documents will be stored under the selected customer's profile",
      ],
    },
    {
      title: "Save and Confirm",
      description: "Finalize and save the document entry:",
      sections: [
        {
          title: "Submission Process",
          icon: <FaCheckCircle />,
          items: [
            "Ensure all mandatory fields are filled in",
            "Click on <strong>'Upload Document'</strong> button",
            "A confirmation message will appear upon successful upload",
            "Document will appear in the <strong>Customer's Document List</strong>",
          ],
        },
      ],
      notes: [
        "Document cannot be deleted once uploaded unless by admin",
        "Keep document types standardized for easier retrieval",
      ],
    },
  ],
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
      notes: [
        "Ensure no duplicate supplier is being added with same GSTN or PAN",
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
                    <TableCell>Required; 15 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>PAN Number</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required; 10 characters</TableCell>
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
                    <TableCell>Required; 10 digits</TableCell>
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
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Contact Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
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
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Pin Code</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required; 6 digits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>State Code</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
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
                    <TableCell>Required</TableCell>
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
                    <TableCell>Required</TableCell>
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
      notes: [
        "GSTN and PAN must be validated before submission",
        "Ensure 'Is this Customer a Supplier' checkbox is selected",
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
            "Supplier will now appear in the <strong>Supplier List</strong> and <strong>Customer List</strong> if applicable",
          ],
        },
      ],
      notes: [
        "Fields can be edited later through the Update option",
        "Duplicate GSTNs should be restricted",
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
            // "Click on <strong>'Add Supplier'</strong>",
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
                    <TableCell>Required; 15 characters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>PAN Number</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required; 10 characters</TableCell>
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
                    <TableCell>Required; 10 digits</TableCell>
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
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Contact Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>Required</TableCell>
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
                    <TableCell>Required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Pin Code</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Required; 6 digits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>State Code</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>Required</TableCell>
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
                    <TableCell>Required</TableCell>
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
                    <TableCell>Required</TableCell>
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
            "Click on <strong>'Save'</strong> after making the necessary updates",
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
            "Click on the specific <strong>'Customer Details'</strong>",
            "Click on <strong>'Delete'</strong> to remove the supplier record",
          ],
        },
      ],
      notes: [
        "Once deleted, this action cannot be undone",
        "Ensure no active transactions are linked to the supplier before deleting",
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
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Supplier List'</strong>",
            "Click on <strong>'Add Supplier'</strong>",
            "Click <strong>'Submit'</strong> to save supplier details",
            "Then navigate to <strong>'Document List'</strong> to manage documents",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the CRM system is required to manage supplier documents",
      ],
    },
    {
      title: "Add Document Details",
      description:
        "Complete all fields to add a new document to the supplier's record:",
      sections: [
        {
          title: "Document Entry Form Fields",
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
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Document Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select a valid document type (e.g., PAN, GST,
                          Agreement)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Document Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter a clear name for the document</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Document File</strong>
                    </TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Upload the document (PDF, JPG, PNG formats allowed)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Valid From Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must be today or a future date</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Valid To Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must be later than 'Valid From Date'</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional additional notes</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "All fields except <strong>Remarks</strong> are mandatory for document entry",
      ],
    },
    {
      title: "Submit Document",
      description:
        "Submit the entered document details to the supplier's profile:",
      sections: [
        {
          title: "Submission Process",
          icon: "<FaPaperPlane />",
          items: [
            "<strong>Review</strong> all document details to confirm accuracy",
            "Click on <strong>'Submit'</strong> to upload and save the document",
            "The document will be visible in the <strong>'Document List'</strong> for the supplier",
          ],
        },
      ],
      notes: [
        "Once submitted, the document will be stored in the CRM and visible in the supplier's document list",
        "There is no approval required after submission",
      ],
    },
  ],

  "Document List Updates": [
    {
      title: "Navigate to Supplier List for Document Updates",
      description:
        "Follow these steps to access and update the document for the supplier list:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Supplier List'</strong>",
            "Click on <strong>'Document List'</strong> to view the list of documents",
            "Select the document you wish to update",
            "Click on <strong>'Update Document'</strong> to edit the details",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the CRM system to manage and update supplier documents",
      ],
    },
    {
      title: "Document Update Details",
      description:
        "Complete all required fields to update the supplier document:",
      sections: [
        {
          title: "Document Update Details Table",
          icon: "<FaEdit />",
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
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Document Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select a document type (e.g., Invoice, Contract)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Document Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Provide the updated document name (e.g., Purchase
                          Order, Supplier Agreement)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Document File</strong>
                    </TableCell>
                    <TableCell>File Upload</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Upload the updated document file (PDF/JPG/PNG, max
                          5MB)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Valid From Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must be today or a future date</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Valid To Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Must be after 'Valid From Date'</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Remarks</strong>
                    </TableCell>
                    <TableCell>Text Area</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional field to add additional information</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["All fields are mandatory except the remarks field"],
    },
    {
      title: "Submit Document Update",
      description:
        "Follow these steps to submit the updated document for the supplier list:",
      sections: [
        {
          title: "Update Submission Process",
          icon: "<FaPaperPlane />",
          items: [
            "<strong>Review</strong> all updated information to ensure accuracy",
            "Click on the <strong>'Submit'</strong> button to finalize the document update",
            "The document will be added to the <strong>'Document List'</strong> once submitted",
          ],
        },
      ],
      notes: [
        "The updated document will replace the previous version in the document list",
        "No approval process is required for document updates",
        "The document will be saved in the list upon successful update submission",
      ],
    },
  ],

  "Generates Agreement": [
    {
      title: "Navigate to Supplier List for Agreement Generation",
      description:
        "Follow these steps to generate an agreement for a selected supplier:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Supplier List'</strong>",
            "Choose the desired <strong>Supplier</strong> from the list",
            "Click on <strong>'Generate Agreement'</strong>",
          ],
        },
      ],
      notes: [
        "<strong>Login</strong> to the CRM system to initiate agreement generation",
        "Ensure all relevant customer details are available before proceeding",
      ],
    },
    {
      title: "Agreement Details",
      description:
        "Complete the required fields to generate the supplier agreement:",
      sections: [
        {
          title: "Agreement Fields Table",
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
                      <strong>Agreement Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select from predefined agreement types (e.g.,
                          Contract, Supplier Agreement, etc.)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Valid Till Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>The date must be in the future</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Name 1</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter a field name (e.g., Payment Terms)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Value 1</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter the corresponding value (e.g., 30 days)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Name 2</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter a second field name (e.g., Delivery Time)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Value 2</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter the second field value (e.g., 45 days)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Name 3</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter a third field name (e.g., Contract Value)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Field Value 3</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter the third field value (e.g., $10,000)</li>
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
        "All fields must be filled out accurately to generate the agreement",
      ],
    },
    {
      title: "Submit Agreement",
      description:
        "Follow these steps to submit the generated agreement for the supplier list:",
      sections: [
        {
          title: "Agreement Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all the entered details to ensure they are correct",
            "Click on <strong>'Submit'</strong> to finalize and generate the agreement",
            "The agreement will be saved in the supplier list",
          ],
        },
      ],
      notes: [
        "The agreement will be added to the supplier list after submission",
        "No approval process is required for generating and submitting the agreement",
      ],
    },
  ],

  "Task List": [
    {
      title: "Navigate to Task List for Supplier",
      description:
        "Follow these steps to access and add a task for a supplier:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Supplier List'</strong>",
            "Click on <strong>'Task List'</strong>",
            "Click on <strong>'Add Task Detail for Supplier'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure that all required task details are filled in before submission",
        "<strong>Login</strong> to the CRM system to manage task assignments",
      ],
    },
    {
      title: "Task Details",
      description:
        "Complete all required fields to add a new task to the supplier list:",
      sections: [
        {
          title: "Task Details Table",
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
                      <strong>Task Name</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Enter the task name (e.g., Deliver materials, Review
                          contract)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select the type of task (e.g., Operational, Strategic)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Sub Type</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select a sub type (e.g., Marketing, Procurement)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Planned Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select the planned date for the task</li>
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
                        <li>Set the task start time</li>
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
                        <li>Set the task end time</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Priority</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select the priority (e.g., High, Medium, Low)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Status</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select the task status (e.g., Pending, In Progress,
                          Completed)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Remark</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>Optional remarks related to the task</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Task Owner</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select the person responsible for the task</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Current User Assigned</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select the user currently assigned to the task</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: ["All fields are mandatory except for the remarks field"],
    },
    {
      title: "Submit Task Details",
      description:
        "Follow these steps to submit the task details for the supplier list:",
      sections: [
        {
          title: "Task Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all task details to ensure accuracy",
            "Click on <strong>'Submit'</strong> to finalize and add the task",
            "The task will be added to the <strong>'Task List'</strong> once submitted",
          ],
        },
      ],
      notes: [
        "The task will be added to the supplier's task list upon successful submission",
        "Ensure the task details are complete and accurate before submission",
      ],
    },
  ],

  "Product Interest": [
    {
      title: "Navigate to Product Interest for Supplier",
      description:
        "Follow these steps to access and add product interest for a supplier:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Supplier List'</strong>",
            "Click on <strong>'Product Interest'</strong>",
          ],
        },
      ],
      notes: [
        "Ensure that all required product interest details are filled in before submission",
        "Product interest data will be added to the customer product interest records",
      ],
    },
    {
      title: "Product Interest Details",
      description:
        "Complete all required fields to add product interest for the supplier:",
      sections: [
        {
          title: "Product Interest Details Table",
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
                      <strong>Product Category</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select product category (e.g., Electronics, Apparel)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Name</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select variation name (e.g., Color, Size)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Variation Value</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select variation value (e.g., Red, XL)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Product Info</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Enter product information (e.g., Description,
                          Features)
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>Dropdown</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select status (e.g., Active, Pending)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Due Date</strong>
                    </TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>
                      <ul>
                        <li>Select due date for the product interest</li>
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
        "Ensure that all required fields are correctly filled out before submitting the product interest",
        "Verify product information and status to ensure accurate tracking",
      ],
    },
    {
      title: "Submit Product Interest",
      description:
        "Follow these steps to submit the product interest for the supplier:",
      sections: [
        {
          title: "Product Interest Submission Process",
          icon: <FaPaperPlane />,
          items: [
            "<strong>Review</strong> all product interest details to ensure accuracy",
            "Click on <strong>'Submit'</strong> to finalize and add the product interest",
            "The product interest will be added to the <strong>'Product Interest List'</strong> once submitted",
          ],
        },
      ],
      notes: [
        "The product interest will be added to the supplier's product interest list upon successful submission",
        "Ensure the product interest details are complete and accurate before submission",
      ],
    },
  ],

  "TDS Received": [
    {
      title: "Navigate to TDS Received for Supplier",
      description:
        "Follow these steps to access and add a TDS record for a supplier:",
      sections: [
        {
          title: "Navigation Path",
          icon: <FaRoute />,
          items: [
            "Go to <strong>'CRM'</strong> section",
            "Select <strong>'Supplier List'</strong>",
            "Click on <strong>'TDS Received'</strong>",
            "Click on <strong>'TDS Record'</strong>",
          ],
        },
      ],
      notes: [
        "You must have the supplier's payment and TDS details available.",
        "Make sure to login to the CRM system to access TDS data entry functionality.",
      ],
    },
    {
      title: "TDS Record Entry",
      description:
        "Fill in the required details to log a TDS deduction for a supplier payment:",
      sections: [
        {
          title: "TDS Record Fields",
          icon: <FaEdit />,
          content: (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Field Name</TableHeader>
                    <TableHeader>Field Type</TableHeader>
                    <TableHeader>Description & Validation</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Transaction Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Select the actual transaction date when the payment
                          was made.
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Book Date</strong>
                    </TableCell>
                    <TableCell>Date Picker</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Enter the date the transaction was entered into the
                          books.
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>Paid Amount</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Enter the gross payment amount before TDS deduction.
                        </li>
                        <li>Must be a valid positive number.</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>TDS Amount</strong>
                    </TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>
                      <ul>
                        <li>Enter the amount deducted as TDS.</li>
                        <li>Should not exceed the paid amount.</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                  <TableRow>
                    <TableCell>
                      <strong>TDS Section</strong>
                    </TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>
                      <ul>
                        <li>
                          Specify the TDS section as per IT Act (e.g., 194C,
                          194J, 192).
                        </li>
                        <li>Only valid section codes allowed.</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  \
                </tbody>
              </Table>
            </TableContainer>
          ),
        },
      ],
      notes: [
        "TDS Section should comply with statutory requirements (e.g., Section 194C for contractors).",
        "Ensure that Paid Amount - TDS Amount = Net Payable.",
        "Do not enter future dates for transaction or book date.",
      ],
    },
    {
      title: "Submit TDS Record",
      description:
        "Once the TDS record form is filled, complete the process by uploading proof (if required) and submitting:",
      sections: [
        {
          title: "TDS Submission Steps",
          icon: <FaPaperPlane />,
          items: [
            "Click on <strong>'Upload TDS'</strong> to upload any document or certificate related to TDS deduction.",
            "<strong>Review</strong> all the filled-in data for correctness.",
            "Click on <strong>'Submit'</strong> to save the TDS record.",
            "TDS information will automatically reflect in the <strong>'Customer List'</strong> for reference.",
          ],
        },
      ],
      notes: [
        "Uploaded TDS documents should be in PDF/JPG format and under 5MB.",
        "After submission, you can no longer edit the record without admin rights.",
      ],
    },
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
                      <ImportantNoteIcon />
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
            Back to Manual
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
