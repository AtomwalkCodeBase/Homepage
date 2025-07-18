import {
    FaCheckCircle,
    FaRoute,
    FaSync,
    FaFile,
    FaTimesCircle,
    FaTools,
    FaEdit,
    FaCheck,
    FaTrash,
    FaTable,
    FaListAlt,
    FaUserShield,
    FaUndo,
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
    FaArrowRight,
    FaFileAlt,
    FaChartPie,
    FaEye,
    FaInfoCircle,
    FaListUl,
    FaList,
    FaFilter,
    FaArrowLeft,
    FaPlus,
    FaFileExcel,
} from "react-icons/fa";
import styled from "styled-components";

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

const DynamicTable = ({ columns = [], rows = [] }) => (
    <TableContainer>
        <Table>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <TableHeader key={index}>{col}</TableHeader>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>
                                {Array.isArray(cell) ? (
                                    <ul>
                                        {cell.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    cell
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </tbody>
        </Table>
    </TableContainer>
);

export const HrmManualStep = [

    {
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
                            <DynamicTable
                                columns={["Component", "Type", "Description"]}
                                rows={[
                                    ["Dashboard Summary", "Info Block", "Shows key HR metrics like total employees and attendance"],
                                    ["Quick Links", "Shortcut Buttons", "Provides quick access to profile, leave, documents"],
                                    ["Notifications", "Alert Panel", "Shows system messages and HR announcements"],
                                    ["User Info", "Top Header", "Displays user's name, role, and login info"],
                                ]}
                            />
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
                            <DynamicTable
                                columns={["Element", "Type", "Validation / Function"]}
                                rows={[
                                    ["Left Sidebar Menu", "Clickable Links", ["Lists accessible modules like Employee, Payroll, Leave, etc.", "Expands to show related sub-modules"]],
                                    ["Search Bar", "Text Input", ["Requires text to activate 'GO' button", "Supports partial matches and is case-insensitive"]],
                                    ["'GO' Button", "Action Button", ["Executes search and redirects to matched module/page", "Disabled if search input is empty"]]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Validation"]}
                                rows={[
                                    ["Username / Employee ID", "Text", ["Required field", "Must match a valid employee record"]],
                                    ["Password", "Password", ["Required field", "Minimum 6 characters"]],
                                    ["Login Button", "Button", ["Active only after both fields are filled", "Validates entered credentials"]]
                                ]}
                            />
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
        ]
    },

    // Employee Guide
    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Email Address", "Text (email)", "Must contain @ and .com", "Required"],
                                    ["User Name", "Text", "Letters, digits, and @/./+/-/_ only", "Required (Max 100 characters)"],
                                    ["User Nick Name", "Text", "Alternate login option", "Optional (Min 10 characters)"],
                                    ["Mobile Number", "Number", "Enter valid mobile number", "Optional"],
                                    ["Profile Image", "File Upload", "Upload user image", "Optional"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "<strong>Email address</strong> and <strong>User name</strong> are <strong>mandatory fields</strong>.",
                ],
            },
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Old Password", "Password", "Enter your current password", "Required"],
                                    ["New Password", "Password", "Must be at least 8 characters", ["Not a commonly used password", "Not entirely numeric"]],
                                    ["Confirm New Password", "Password", "Re-enter your new password", "Required – must match new password"]
                                ]}
                            />
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
        ]
    },

    // Attendance
    {
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
                            <DynamicTable
                                columns={["Required Field", "Field Type", "Field Validation"]}
                                rows={[
                                    ["Check-In Date", "Date Picker", "Mandatory"],
                                    ["Start Time", "Time Picker", "Mandatory"],
                                    ["Check-Out Date", "Date Picker", "Optional"],
                                    ["End Time", "Time Picker", "Mandatory"],
                                    ["Remarks", "Text Area", "Mandatory"],
                                ]}
                            />

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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Required Field", "Field Type", "Field Validation"]}
                                rows={[
                                    ["Date", "Date Picker", "Must be within selected week"],
                                    ["Attendance Type", "Dropdown", "Select from options like Present, Remote, etc."],
                                    ["Start - End Time", "Time Range Picker", "Optional but recommended for accurate duration"],
                                    ["Duration (Hours)", "Number Input", "Calculated or manually entered"],
                                    ["Action", "Button (Add/Update)", "Choose action based on existing records"],
                                    ["Remarks", "Text Area", "Summary of weekly accomplishments", "Minimum 10 characters recommended"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Required Field", "Field Type", "Field Validation"]}
                                rows={[
                                    ["Upload EmployeeAttendance Data", "File Upload", "Only .csv files are allowed; Must be in the required format"],
                                    ["Upload Attendance Day Activity Data", "File Upload", "Only .csv files are allowed; Must be in the required format"],
                                    ["Ignore duplicate records for upload", "Checkbox", "Optional checkbox"],
                                    ["Operation Type", "Radio", "Choose from available operation types"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Data Type", "Unique", "Mandatory", "Max. Length", "Default Value", "Dependent"]}
                                rows={[["EmployeeID", "String", "Yes", "Yes", "10", "N/A", "No"]]}
                            />
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
        ]
    },

    {
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
                    "Once submitted, entries cannot be edited unless reopened by HR/Admin",
                    "Use <strong>Add Attendance</strong> for each unmarked day before submitting.",
                ],
            },
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Field Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["From Date", "Date Picker", "Select starting date of leave", "Required"],
                                    ["To Date", "Date Picker", "Select ending date of leave", "Cannot be before From Date"],
                                    ["Remarks", "Text Area", "Reason for leave (10–200 characters)", "Required"]
                                ]}
                            />
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
                    "Leave application cannot be modified after submission",
                    "You can also go back to your Leave Details section/page",
                ],
            },
        ]
    },

    {
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
                            "Click on <strong>'Apply leave'</strong>",
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["From Date", "Date Picker", "Select starting date of leave", "Required"],
                                    ["To Date", "Date Picker", "Select ending date of leave (must be the same day as From Date)", "Cannot be before From Date"],
                                    ["Remarks", "Text Area", "Reason for leave", "Required (10–200 characters)"]
                                ]}
                            />
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
        ]
    },

    {
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
                            "Click on <strong>'Apply leave'</strong>",
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["From Date", "Date Picker", "Select starting date of WFH", "Required"],
                                    ["To Date", "Date Picker", "Select ending date of WFH (must be the same day as From Date)", "Cannot be before From Date"],
                                    ["Remarks", "Text Area", "Reason for WFH", "Required (10–200 characters)"]
                                ]}
                            />
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
        ]
    },

    {
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
                            "Click on <strong>'Apply leave'</strong>",
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["From Date", "Date Picker", "Select the starting date of LOP", "Required"],
                                    ["To Date", "Date Picker", "Select the ending date of LOP", "Cannot be before From Date"],
                                    ["Remarks", "Text Area", "Reason for Loss of Pay", "Required (10–200 characters)"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["All Employees", "Dropdown", "Select an employee to review their leaves", "Manual entry not allowed"],
                                    ["All Leave Type", "Dropdown", "Select leave type (e.g. Sick, Casual, LOP)", "Manual entry not allowed"],
                                    ["Search", "Button", "Search filtered leave records", "Valid only when selections made"],
                                    ["Clear", "Button", "Reset the filters", "Optional"],
                                    ["Previous Year", "Button", "View prior year leave data", "Optional"],
                                    ["Next Year", "Button", "View upcoming year leave projections", "Optional"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "You <strong>cannot manually enter</strong> Employee names or Leave Types — use dropdowns",
                    "Only managers can access and approve/reject employee leave requests",
                ],
            },
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Employee Name", "Dropdown", "Select an employee to view their yearly leave", "Manual entry not allowed"],
                                    ["Year", "Dropdown", "Select the year for which you want to view leave data", "Manual entry not allowed"],
                                    ["Order By", "Dropdown", "Select sorting order (Ascending/Descending)", "Manual entry not allowed"],
                                    ["Record Created", "Dropdown", "Select record creation date filter", "Manual entry not allowed"],
                                    ["Department", "Dropdown", "Select department for filtering", "Manual entry not allowed"],
                                    ["Show Entries", "Dropdown", "Select number of entries to display", "Optional"],
                                    ["Search", "Button", "Search based on selected filters", "Valid only when selections made"],
                                    ["Clear", "Button", "Reset the filters", "Optional"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "You <strong>cannot manually enter</strong> Employee names, Year, or other filtering options — use dropdowns",
                    "Managers can view yearly leave data across employees and departments",
                ],
            },
        ]
    },

    // My Weekly Score
    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Employee Name", "Dropdown", "Select an employee to view their weekly score", "Manual entry not allowed"],
                                    ["Department", "Dropdown", "Select a department for filtering the employees", "Manual entry not allowed"],
                                    ["Grade", "Dropdown", "Select a grade for filtering", "Manual entry not allowed"],
                                    ["Performance Rating", "Dropdown", "Select a performance rating to filter by", "Manual entry not allowed"],
                                    ["Performance Score Distribution", "Pie Chart", "Shows distribution of performance scores", "Auto-generated from data"],
                                    ["Weekly Performance Score", "Bar Graph", "Visualizes weekly performance scores", "Auto-generated from data"],
                                    ["Search", "Button", "Search based on selected filters", "Valid only when selections made"],
                                    ["Clear", "Button", "Reset all filter selections", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Previous Year", "Button", "Navigate to previous year's data", "Read-only"],
                                    ["Next Year", "Button", "Navigate to next year's data", "Read-only"],
                                    ["Performance Score Distribution", "Pie Chart", "Shows performance score distribution across employees", "Auto-generated from data"],
                                    ["Weekly Performance Score", "Bar Graph", "Shows weekly performance scores of employees", "Auto-generated from data"],
                                    ["Clear", "Button", "Resets any applied filters", "Optional"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "You can only <strong>view</strong> the data; no manual data entry allowed",
                    "Performance score data is presented via pie chart (distribution) and bar graph (weekly scores)",
                ],
            },

        ]
    },

    // MANAGER GUIDE = Setup(Department)
    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Department ID", "Text Input", "Required"],
                                    ["Name", "Text Input", "Required"],
                                    ["Branch ID", "Dropdown", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Department ID", "Text Input", "Required"],
                                    ["Name", "Text Input", "Required"],
                                    ["Branch ID", "Dropdown", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    // MANAGER GUIDE = Setup(Grade)
    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Grade ID", "Text Input", "Required"],
                                    ["Name", "Text Input", "Required"],
                                    ["Is Manager", "Checkbox", "Optional"],
                                    ["Grade Level", "Number Input", "Required"],
                                    ["Salary Type", "Dropdown", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Grade ID", "Text Input", "Required"],
                                    ["Name", "Text Input", "Required"],
                                    ["Is Manager", "Checkbox", "Optional"],
                                    ["Grade Level", "Number Input", "Required"],
                                    ["Salary Type", "Dropdown", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    // Setup(Holiday Calendar)
    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Year", "Dropdown", "Required"],
                                    ["Default Holiday", "Dropdown", "Required"],
                                    ["Select Saturday Holiday Options", "Checkbox", "Required"],
                                    ["No of Optional Holidays", "Number Input", "Required"],
                                    ["Max no of Work from Home (WFH)", "Number Input", "Required"],
                                    ["No of Shifts", "Number Input", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Year", "Dropdown", "Required"],
                                    ["Default Holiday", "Dropdown", "Required"],
                                    ["Select Saturday Holiday Options", "Checkbox", "Optional"],
                                    ["No of Optional Holidays", "Number Input", "Required"],
                                    ["Max no of Work from Home (WFH)", "Number Input", "Required"],
                                    ["No of Shifts", "Number Input", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Holiday Date", "Date Picker", "Required"],
                                    ["Holiday Description", "Text Input", "Required"],
                                    ["Type of Holiday", "Dropdown", "Required"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Holiday Date", "Date Picker", "Required"],
                                    ["Remarks", "Text Input", "Required"],
                                    ["Holiday Type", "Dropdown", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Shift No", "Dropdown", "Required"],
                                    ["Start Time", "Time Picker", "Required"],
                                    ["End Time", "Time Picker", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Shift No", "Dropdown", "Required"],
                                    ["Start Time", "Time Picker", "Required"],
                                    ["End Time", "Time Picker", "Required"]
                                ]}
                            />
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
        ]
    },

    // Setup(HR Policy Documents)
    {
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Document Name", "Dropdown", "Required"],
                                    ["Document", "File Upload", "Required"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Document Name", "Dropdown", "Required"],
                                    ["Document", "File Upload", "Required"]
                                ]}
                            />
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
        ]
    },

    // Setup(Approval Limit)
    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Dropdown", "Required"],
                                    ["Amount Limit", "Number", "Required"],
                                    ["Days Limit", "Number", "Required"],
                                    ["Min Grade Level for Approval", "Number", "Required"],
                                    ["Image (Optional)", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Dropdown", "Required"],
                                    ["Amount Limit", "Number", "Required"],
                                    ["Days Limit", "Number", "Required"],
                                    ["Min Grade Level for Approval", "Number", "Required"],
                                    ["Image (Optional)", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    // Setup(Appraisal Structure)
    {
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Appraisal Name", "Text", "Required"],
                                    ["Applicable to Emp Grade", "Dropdown", "Optional"],
                                    ["Frequency", "Dropdown", "Optional"],
                                    ["Remarks", "Text", "Optional"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Appraisal Name", "Text", "Required"],
                                    ["Applicable to Emp Grade", "Dropdown", "Optional"],
                                    ["Frequency", "Dropdown", "Optional"],
                                    ["Remarks", "Text", "Optional"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },
    // Setup(Exit Process)
    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Required"],
                                    ["Is Document to be Uploaded?", "Checkbox", "Optional"],
                                    ["Which Department?", "Dropdown", "Required"],
                                    ["Sequence No", "Number", "Optional"],
                                    ["Description", "Text", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Required"],
                                    ["Is Document to be Uploaded?", "Checkbox", "Optional"],
                                    ["Which Department?", "Dropdown", "Required"],
                                    ["Sequence No", "Number", "Optional"],
                                    ["Description", "Text", "Required"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    // Appointee List
    {
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
                            <DynamicTable
                                columns={["Component", "Description"]}
                                rows={[
                                    ["Search By", "Search employees using Employee Name, ID, Mobile No, or Email."],
                                    ["Filter By", "Filter employees by Department and Grade."],
                                    ["Grade-wise Distribution", "Pie chart displaying employee distribution by grade."],
                                    ["Department-wise Distribution", "Pie chart showing employee count per department."],
                                    ["List of Appointee", "Detailed list of all appointed employees with relevant attributes."]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee Name", "Text", "Required"],
                                    ["Appointee Job ID", "Auto-generated from My Office → Setup → Numbering", "System Generated"],
                                    ["PAN Number", "Text", "Optional"],
                                    ["Email ID", "email", "Required"],
                                    ["Mobile No", "Num", "Optional"],
                                    ["Alternate Mobile No", "Num", "Optional"],
                                    ["Employee Department", "Dropdown", "Required"],
                                    ["Employee Grade", "Dropdown", "Optional"],
                                    ["Date of Join", "Date", "Optional"],
                                    ["Gender", "Dropdown", "Optional"],
                                    ["Marital Status", "Dropdown", "Optional"],
                                    ["Blood Group", "Dropdown", "Optional"],
                                    ["Date of Birth (DOB)", "Date", "Optional"],
                                    ["Employee Address (Line 1, 2, 3)", "Text (3 Textboxes)", "Required"],
                                    ["Pin Code", "Text", "Optional"],
                                    ["Country", "Text", "Optional"],
                                    ["Address Proof Govt ID Number", "Text (e.g., Aadhaar)", "Optional"],
                                    ["Personal Email ID", "Text", "Optional"],
                                    ["Image", "File Upload", "Optional"],
                                    ["Employee Manager", "Dropdown", "Optional"],
                                    ["HR Manager", "Dropdown", "Optional"],
                                    ["HR Coordinator/Contact Details", "Text", "Optional"],
                                    ["Probation/Training Period (Months)", "Number", "Optional"],
                                    ["Confirmation Date", "Date", "Optional"],
                                    ["No of Leaves during Training Period", "Number", "Optional"]
                                ]}
                            />
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
                            "Click on the <strong>'Create'</strong> button.",
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee Name", "Text", "Required"],
                                    ["Appointee Job ID", "Auto-generated", "System Controlled"],
                                    ["PAN Number", "Text", "Optional"],
                                    ["Email ID", "Text", "Required"],
                                    ["Mobile No", "Text", "Optional"],
                                    ["Alternate Mobile No", "Text", "Optional"],
                                    ["Employee Department", "Dropdown", "Required"],
                                    ["Employee Grade", "Dropdown", "Optional"],
                                    ["Date of Join", "Date", "Optional"],
                                    ["Gender", "Dropdown", "Optional"],
                                    ["Marital Status", "Dropdown", "Optional"],
                                    ["Blood Group", "Dropdown", "Optional"],
                                    ["Date of Birth (DOB)", "Date", "Optional"],
                                    ["Employee Address (Line 1, 2, 3)", "Textboxes", "Required"],
                                    ["Pin Code", "Text", "Optional"],
                                    ["Country", "Text", "Optional"],
                                    ["Govt ID Number", "Text", "Optional"],
                                    ["Personal Email ID", "Text", "Optional"],
                                    ["Image", "File Upload", "Optional"],
                                    ["Employee Manager", "Dropdown", "Optional"],
                                    ["HR Manager", "Dropdown", "Optional"],
                                    ["HR Coordinator Contact", "Text", "Optional"],
                                    ["Training Period (Months)", "Number", "Optional"],
                                    ["Confirmation Date", "Date", "Optional"],
                                    ["Leaves during Training", "Number", "Optional"],
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Document Type", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee Joining Document", "File Upload", "Optional"],
                                    ["Agreement Document", "File Upload", "Optional"],
                                    ["Misc Document - 1", "File Upload", "Optional"],
                                    ["Misc Document - 2", "File Upload", "Optional"],
                                    ["Resign Document", "File Upload", "Optional"],
                                ]}
                            />
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
                            "After uploading documents, click the <strong>'Update'</strong> or <strong>'Save'</strong> button.",
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Account Number", "Text", "Required"],
                                    ["Account Name", "Text", "Required"],
                                    ["Account Currency", "Dropdown", "Required"],
                                    ["Bank Name", "Dropdown", "Required"],
                                    ["IFSC Code", "Text", "Required"],
                                    ["BIC Code", "Text", "Optional"],
                                    ["Branch Address", "Text", "Required"],
                                    ["Default Address", "Checkbox", "Optional"],
                                ]}
                            />
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
                            "Click <strong>'Create'</strong> to update the bank account details.",
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
        ]
    },
    {
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
        ]
    },
    {
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
        ]
    },
    {
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
                            "Click on the <strong>'XLS File'</strong> or <strong>'PDF File'</strong> button next to the document name to download the offer or appointment letter.",
                            "You can also view the document by clicking on the <strong>'Appointment Letter'</strong> option if available.",
                        ],
                    },
                ],
                notes: [
                    "The documents are stored in standard formats like PDF or DOCX for easy access and sharing.",
                    "Ensure you have the necessary software (like a PDF viewer) to view the downloaded documents.",
                ],
            },
        ]
    },
    // Employee Documents
    {
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee", "Dropdown (Select Employee)", "Required"],
                                    ["Document Type", "Dropdown", "Required"],
                                    ["Document Name", "Text", "Required"],
                                    ["Document Date", "Calendar Picker", "Optional"],
                                    ["Valid To Date", "Calendar Picker", "Optional"],
                                    ["Document File", "File Upload", "Optional"],
                                    ["Remarks", "Text", "Optional"]
                                ]}
                            />
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
        ]
    },

    //
    {
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
        ]
    },

    // Employee List
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee Name", "Text", "Required"],
                                    ["Employee ID", "Auto-generated (My Office → Setup → Numbering)", "Auto-generated"],
                                    ["PAN Number", "Text", "Optional"],
                                    ["Email ID", "Text", "Required"],
                                    ["Mobile Number", "Number", "Optional"],
                                    ["Alternate Contact Number", "Number", "Optional"],
                                    ["Emp Department", "Dropdown", "Optional"],
                                    ["Emp Grade", "Dropdown", "Optional"],
                                    ["Date of Joining", "Calendar Picker", "Optional"],
                                    ["Gender", "Dropdown", "Optional"],
                                    ["Marital Status", "Dropdown", "Optional"],
                                    ["DOB", "Calendar Picker", "Optional"],
                                    ["Blood Group", "Dropdown", "Optional"],
                                    ["Employee Address", "Text", "Required"],
                                    ["Pin Code", "Number", "Optional"],
                                    ["Country", "Dropdown", "Optional"],
                                    ["Address Proof Govt ID Number", "Text (e.g., Aadhaar)", "Required"],
                                    ["Personal Email ID", "Text", "Optional"],
                                    ["Image", "File Upload", "Optional"],
                                    ["EMP Manager", "Dropdown", "Optional"],
                                    ["HR Manager", "Dropdown", "Optional"],
                                    ["HR Coordinator/Contact Details", "Text", "Optional"],
                                    ["Probation/Training Period (Months)", "Number", "Optional"],
                                    ["Joining Date", "Calendar Picker", "Optional"],
                                    ["No. of Leaves During Training Period", "Number", "Optional"]
                                ]}
                            />
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
        ]
    },


    // PAYROLL HRMS
    {
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
        ]
    },

    {
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
                            "Select Salary Structure and click on  <strong>'Update button'</strong>",
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
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Employee Grade", "Dropdown", "Required"],
                                    ["Remarks", "Text Field", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Name of the Salary Component", "Text Input", "Required"],
                                    ["Employee Grade", "Dropdown (Autofill)", "Required"],
                                    ["Salary Group", "Dropdown", "Required"],
                                    ["Calculation Method", "Dropdown", "Required"],
                                    ["Fixed/Percentage Value", "Number Input", "Required"],
                                    ["Payment Frequency", "Number Input", "Required"],
                                    ["Sequence No", "Number Input", "Required"],
                                    ["Remarks", "Text Input", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Name of the Salary Component", "Text Input", "Required"],
                                    ["Employee Grade", "Dropdown (Autofill)", "Required"],
                                    ["Salary Group", "Dropdown", "Required"],
                                    ["Calculation Method", "Dropdown", "Required"],
                                    ["Fixed/Percentage Value", "Number Input", "Required"],
                                    ["Payment Frequency", "Number Input", "Required"],
                                    ["Sequence No", "Number Input", "Required"],
                                    ["Remarks", "Text Input", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            "Each parameter has options for <strong>'Update'</strong> .",
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Salary Component", "Dropdown", "Required"],
                                    ["Is Applicable", "Checkbox", "Required"],
                                    ["Effective Date", "Date Picker", "Required"],
                                    ["Applicable Amount Type", "Dropdown", "Required"],
                                    ["Employee Rate", "Numeric", "Required"],
                                    ["Employer PF Amount Limit", "Numeric", "Required"],
                                    ["EPS Rate", "Numeric", "Required"],
                                    ["PF Admin Charge %", "Numeric", "Required"],
                                    ["EDLI Contribution %", "Numeric", "Required"],
                                    ["EPS Amount Limit", "Numeric", "Required"],
                                    ["EDLI Contribution Limit", "Numeric", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Salary Component", "Dropdown", "Required"],
                                    ["Is Applicable", "Checkbox", "Required"],
                                    ["Effective Date", "Date Picker", "Required"],
                                    ["Applicable Amount Type", "Dropdown", "Required"],
                                    ["Employee Rate", "Numeric", "Required"],
                                    ["Employer PF Amount Limit", "Numeric", "Required"],
                                    ["EPS Rate", "Numeric", "Required"],
                                    ["PF Admin Charge %", "Numeric", "Required"],
                                    ["EDLI Contribution %", "Numeric", "Required"],
                                    ["EPS Amount Limit", "Numeric", "Required"],
                                    ["EDLI Contribution Limit", "Numeric", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Salary Component", "Dropdown", "Required"],
                                    ["Is Applicable", "Checkbox", "Required"],
                                    ["Effective Date", "Date Picker", "Required"],
                                    ["Applicable Amount Type", "Dropdown", "Required"],
                                    ["Minimum Years for Gratuity Eligibility", "Numeric", "Required"],
                                    ["Paid Days Per Month", "Numeric", "Required"],
                                    ["No of Working Days in a Month", "Numeric", "Required"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Salary Component", "Dropdown", "Required"],
                                    ["Is Applicable", "Checkbox", "Required"],
                                    ["Effective Date", "Date Picker", "Required"],
                                    ["Applicable Amount Type", "Dropdown", "Required"],
                                    ["Minimum Years for Gratuity Eligibility", "Numeric", "Required"],
                                    ["Paid Days Per Month", "Numeric", "Required"],
                                    ["No of Working Days in a Month", "Numeric", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Salary Component", "Dropdown", "Required"],
                                    ["Is applicable", "Checkbox", "Required"],
                                    ["Effective date", "Date Picker", "Required"],
                                    ["Applicable amt type", "Dropdown", "Required"],
                                    ["Employee rate", "Numeric Input", "Required"],
                                    ["Employer rate", "Numeric Input", "Required"],
                                    ["ESI Amount Limit", "Numeric Input", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation/Rule"]}
                                rows={[
                                    ["Tax Rate Code", "Text Input", "Required"],
                                    ["Tax Type", "Dropdown", "Required"],
                                    ["Effective Date", "Date Picker", "Required"],
                                    ["Minimum Taxable Amount", "Numeric", "Required"],
                                    ["Standard Deduction Amount", "Numeric", "Required"],
                                    ["Is Slab Rate", "Checkbox", "Optional"],
                                    ["State Code", "Dropdown", "Required"],
                                    ["Image", "Upload", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation/Rule"]}
                                rows={[
                                    ["Tax Rate Code", "Text Input", "Required"],
                                    ["Tax Type", "Dropdown", "Required"],
                                    ["Effective Date", "Date Picker", "Required"],
                                    ["Minimum Taxable Amount", "Numeric", "Required"],
                                    ["Standard Deduction Amount", "Numeric", "Required"],
                                    ["Is Slab Rate", "Checkbox", "Optional"],
                                    ["State Code", "Dropdown", "Required"],
                                    ["Image", "Upload", "Required"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation/Rule"]}
                                rows={[
                                    ["Slab From Amount (INR)", "Number Input", "Required"],
                                    ["Slab To Amount (INR)", "Number Input", "Required"],
                                    ["Tax Amount", "Number Input", "Required"]
                                ]}
                            />
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
        ]
    },

    // Payroll-hrms
    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation/Rule"]}
                                rows={[
                                    ["Date", "Date Picker", "Required (Selectable only)"],
                                    ["All Grades", "Dropdown", "Optional"],
                                    ["Executive Management", "Dropdown", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation/Rule"]}
                                rows={[
                                    ["Date", "Date Picker", "Required (Selectable only)"],
                                    ["All Grades", "Dropdown", "Optional"],
                                    ["Executive Management", "Dropdown", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation/Rule"]}
                                rows={[
                                    ["Date", "Date Picker", "Required (Selectable only)"],
                                    ["All Grades", "Dropdown", "Optional"],
                                    ["Executive Management", "Dropdown", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation/Rule"]}
                                rows={[
                                    ["Date", "Date Picker", "Required (Selectable only)"],
                                    ["All Grades", "Dropdown", "Optional"],
                                    ["Executive Management", "Dropdown", "Optional"]
                                ]}
                            />
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
        ]
    },

    // Claim System
    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Required"],
                                    ["Tax Applicable", "Checkbox", "Required"],
                                    ["Applicable Tax Rate", "Number", "Required"],
                                    ["TDS Threshold Limit", "Number", "Optional"],
                                    ["TDS Rate for Service", "Dropdown", "Optional"],
                                    ["Category Alias", "Text", "Optional"],
                                    ["Expense Ledger", "Dropdown", "Optional"],
                                    ["Exclude for Expense Claim?", "Checkbox", "Optional"],
                                    ["Is Bill Required to be Submitted?", "Checkbox", "Optional"],
                                    ["Image", "Upload", "Required"]
                                ]}
                            />
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
                            "Click the <strong>'On going back'</strong> it discards changes.",
                            "You will be redirected back to the <strong>Expense Category List</strong> screen.",
                        ],
                    },
                ],
            },
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Required"],
                                    ["Service Code", "Text", "Required"],
                                    ["Service Category", "Dropdown", "Optional"],
                                    ["Service Cost", "Price", "Required"],
                                    ["Description", "Text", "Optional"],
                                    ["Image", "Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
        "Claim Expense": [
            {
                accesspath: "Login --> General --> Claim System --> Claim Expenses",
            },
            {
                title: "Navigate to Claim expenses",
                description: "Follow this path to access the claim expenses:",
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee Name", "Dropdown", "Required"],
                                    ["Search Employee", "Dropdown", "Required"],
                                    ["All Expense Item", "Dropdown", "Required"],
                                    ["All Status", "Dropdown", "Required"],
                                    ["Search", "Button", "Click to filter records"],
                                    ["Record Created", "Dropdown", "Required, No manual entry"],
                                    ["Order By", "Dropdown (Ascending/Descending)", "Required, Select sort order"]
                                ]}
                            />
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
                            "You can download the claim expense list as XLS or PDF file buttons provided below."
                        ]
                    }
                ],
                "notes": [
                    "The downloaded file will contain all the claims listed based on the filters applied."
                ]
            }
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Validation"]}
                                rows={[
                                    ["Expense Item", "Dropdown", "Required, No manual entry"],
                                    ["Project", "Dropdown", "Required, No manual entry"],
                                    ["Claimed Amount", "Amount", "Required"],
                                    ["Expense Date", "Date Picker", "Required, Should match the date in the expense bill"],
                                    ["Expense Bill/Invoice File", "File Upload", "Required, Based on Selected claim"],
                                    ["Remarks", "Text", "Optional"]
                                ]}
                            />
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
                            "<strong>Complete</strong> all required fields and click <strong>'Save claim'</strong>",
                            "The system will validate and save the new claim details",
                        ],
                    },
                ],
                notes: [
                    "Once submitted, the system will save the claim details and provide a confirmation.",
                ],
            },
            {
                title: "Add Claim item",
                description: "Once claim is created user can add the multiple claim items.",
                sections: [
                    {
                        title: "Add Claim Process",
                        icon: <FaPaperPlane />,
                        items: [
                            "Select the claim in which you want to add claim item.",
                            "click on <strong>'Add claim item'</strong> to add the item to the claim."
                        ],
                    },
                ],
                notes: [
                    "After submission, the system will save the claim item details and display a confirmation message.",
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee Name", "Dropdown", "Required"],
                                    ["Search Lead", "Search Box", "Manual entry allowed"],
                                    ["Record Created", "Dropdown", "Required, No manual entry"],
                                    ["Order By", "Dropdown (Ascending/Descending)", "Required"],
                                    ["Search", "Button", "Click to filter records"],
                                    ["Clear", "Button", "Click to reset filters"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee", "Dropdown", "Mandatory"],
                                    ["Advance Type", "Dropdown", "Mandatory"],
                                    ["Advance Date", "Date Picker", "Mandatory"],
                                    ["Advance Amount", "Amount Input", "Mandatory"],
                                    ["Repayment Type", "Dropdown", "Mandatory"],
                                    ["Installment Amount", "Amount Input", "Mandatory"],
                                    ["Remarks", "Text Area", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Employee Name", "Dropdown", "Selection required, no manual input"],
                                    ["Search Employee", "Dropdown", "No manual input allowed"],
                                    ["All Expense Item", "Dropdown", "No manual input allowed"],
                                    ["All Status", "Dropdown", "No manual input allowed"],
                                    ["Record Created", "Dropdown", "Optional filter, dropdown only"],
                                    ["Order By", "Dropdown (Asc/Desc)", "No manual input allowed"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Expense Item", "Dropdown", "Required"],
                                    ["Project", "Dropdown", "Optional"],
                                    ["Claimed Amount", "Amount Input", "Required"],
                                    ["Expense Date", "Date Picker", "Required"],
                                    ["Expense Bill/Invoice", "File Upload", "Required"],
                                    ["Remarks", "Text Area", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["All Employees", "Dropdown", "Required, no manual entry"],
                                    ["All Grades", "Dropdown", "Required, no manual entry"],
                                    ["Claim Number", "View Only", "Auto-populated per employee selection"],
                                    ["Settlement Amt (INR)", "Input Field", "Enter amount to be settled"],
                                    ["Remarks", "Input Field", "Optional"],
                                    ["Settle Now?", "Checkbox", "Tick to initiate settlement"],
                                    ["View File/Details", "Button", "Opens file or claim detail"]
                                ]}
                            />
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
        ]
    },

    // Emp Help And Requests
    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Search Type & Filter", "Dropdown", "Select a category to filter help requests", "Optional"],
                                    ["Search Query", "Text Input", "Enter keywords to search help tickets", "Optional"],
                                    ["Request Status", "Pie Chart", "Visual representation of request status (e.g., Open, In Progress, Closed)", "Auto-generated"],
                                    ["Request Category Distribution", "Pie Chart", "Breakdown of help tickets by category", "Auto-generated"],
                                    ["Help List", "List with Buttons", 'Includes "View Details" and "Assign Request" actions', "Read-only view"]
                                ]}
                            />
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
                            "Download help ticket data to <strong>XLS/PDF</strong> formats using the button.",
                        ],
                    },
                ],
                notes: [
                    "Ensure the dashboard is filtered appropriately before downloading for targeted reports.",
                    "Use browser back or system navigation controls if needed.",
                ],
            },
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Description", "Type", "Editable"]}
                                rows={[
                                    ["Category", "Type of help request", "Label", "No"],
                                    ["Requested By", "Employee who submitted the request", "Text", "No"],
                                    ["Request Date", "Date the request was made", "Date", "No"],
                                    ["Request Details", "Description or content of the request", "Text Area", "No"],
                                    ["Status", "Current status of the request", "Label", "No"],
                                    ["Assigned To", "Employee assigned to resolve the request", "Text", "No"],
                                    ["Assigned Date", "Date of assignment", "Date", "No"],
                                    ["Remarks", "Internal comments or follow-ups", "Text Area", "No"]
                                ]}
                            />),
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Assigned To", "Dropdown", "Select the person to handle this request", "Required"],
                                    ["Remarks", "Text Input", "Add notes or special instructions", "Optional"],
                                    ["Request Date", "View Only", "Date the help ticket was submitted", "Read-only"],
                                    ["Escalation Date", "View Only", "Deadline for resolution if escalated", "Read-only"],
                                    ["Submitted File", "View Only", "File submitted with request", "Read-only"],
                                    ["Request Details", "View Only", "Description of the issue", "Read-only"],
                                    ["Emp Remarks", "View Only", "Employee comments or context", "Read-only"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field / Feature", "Type", "Description"]}
                                rows={[
                                    ["Search Type", "Dropdown", "Filter by category, status, or keywords"],
                                    ["Search Query", "Text Input", "Enter specific keywords to find requests"],
                                    ["Request Status", "Pie Chart", "Visual representation of ticket status (open/closed/pending)"],
                                    ["Request Category Distribution", "Pie Chart", "Visual summary by request category"],
                                    ["Help List", "Action Buttons", "Cancel Request: Withdraw submitted request, Update: Modify request details, View Details: See full request info"]
                                ]}
                            />

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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Validation"]}
                                rows={[
                                    ["Request Help Category", "Dropdown", "Mandatory"],
                                    ["Request Date", "Date Picker", "Mandatory"],
                                    ["Request Details", "Text Input", "Mandatory"],
                                    ["Remarks", "Text Input", "Optional"],
                                    ["Ref. File", "File Upload", "Optional"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "Click <strong>'Submit'</strong> to register your help request.",
                    "You will be redirected to <strong>'My Help Tickets'</strong> after submission.",
                ],
            },
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Validation"]}
                                rows={[
                                    ["Request Help Category", "Dropdown", "Mandatory"],
                                    ["Request Date", "Date Picker", "Mandatory"],
                                    ["Request Details", "Text Input", "Mandatory"],
                                    ["Remarks", "Text Input", "Optional"],
                                    ["Ref. File", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text"]}
                                rows={[
                                    ["Search Type and Filter", "Dropdown", "Select the type of search/filter you want to apply"],
                                    ["Search Query", "Text Input", "Enter the keyword to search for resolved tickets"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text"]}
                                rows={[
                                    ["Search Type and Filter", "Dropdown", "Filter by Employee ID, Name, Request ID, or Category"],
                                    ["Search Query", "Text Input", "Enter the search keyword"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper Text", "Validation"]}
                                rows={[
                                    ["Request Category", "Dropdown", "Select the type of request", "Required"],
                                    ["Request Date", "Date Picker", "Select the date for the request", "Required"],
                                    ["Request Details", "Text Input", "Enter the reason or description of your request", "Required"],
                                    ["Remarks", "Text Input", "Optional remarks or comments", "Optional"],
                                    ["Ref. File", "File Upload", "Attach supporting document (if any)", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
        ]
    },

    // RESOLVE REQUEST

    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper text", "Validation"]}
                                rows={[
                                    ["Completion date", "Date picker", "Select the completion date", "Required"],
                                    ["Request date", "Date", "Date when the request was submitted", "Optional"],
                                    ["Escalation date", "Date", "Date of any escalation", "Optional"],
                                    ["Submitted file", "File attachment", "View the original submission file", "Optional"],
                                    ["Completion remarks", "Text input", "Write remarks for completion", "Required"],
                                    ["Completion ref. file", "File upload", "Upload reference file for closure", "Required"],
                                    ["Request details", "Text (read-only)", "Original request content", "Read-only"],
                                    ["Emp remarks", "Text (read-only)", "Employee's initial remarks", "Read-only"]
                                ]}
                            />
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
        ]
    },

    {
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
        ]
    },

    {
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Type", "Helper text", "Validation"]}
                                rows={[
                                    ["Assigned to", "Dashboard Dropdown", "Select employee", "Required"],
                                    ["Request date", "Date picker", "Select request date", "Required"],
                                    ["Escalation date", "Date picker", "Select escalation date", "Required"],
                                    ["Submitted file", "File input", "Upload the related file", "Required"],
                                    ["Remarks", "Text input", "Additional remarks", "Required"],
                                    ["Request details", "Text input", "Describe the request", "Required"],
                                    ["Emp remarks", "Text input", "Comments from the employee", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Request Category", "Dropdown", "Required"],
                                    ["Request Date", "Date Picker", "Required"],
                                    ["Request Details", "Text Input", "Required"],
                                    ["Remarks", "Text Input", "Optional"],
                                    ["Ref. File", "File Upload", "Optional"]
                                ]}
                            />
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
        ]
    },

    {
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
        ]
    },

    // Assets
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Required"],
                                    ["HSN SAC Code", "Text", "Optional"],
                                    ["Tax Applicable?", "Checkbox", "Optional"],
                                    ["Applicable Tax Rate", "Number", "Required"],
                                    ["Category Alias", "Text", "Optional"],
                                    ["Is this Asset Category?", "Checkbox", "Optional"],
                                    ["Asset Group", "Dropdown", "Optional"],
                                    ["Is Asset Value Inclusive of Tax?", "Checkbox", "Optional"],
                                    ["Depreciation Calculation Method", "Dropdown", "Optional"],
                                    ["Depreciation Calculation Method (Tax)", "Dropdown", "Optional"],
                                    ["Useful Life", "Number", "Required"],
                                    ["Depreciation Rate", "Number", "Required"],
                                    ["Image", "File Upload", "Required"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Required"],
                                    ["Contact Details", "Number", "Optional"],
                                    ["Address Line 1", "Text", "Optional"],
                                    ["Address Line 2", "Text", "Optional"],
                                    ["Location Alias", "Text", "Optional"],
                                    ["Image", "File Upload", "Required"]
                                ]}
                            />
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
                            "Click <strong>'Submit'</strong> to add the location code info.",
                            "Click <strong>'Back/Location Code List'</strong> to return to the <strong>Location Code List</strong> page.",
                        ],
                    },
                ],
                notes: [
                    "Ensure file format matches the template before uploading.",
                ],
            },
        ]
    },

    {
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
                            "Click on <strong>'Asset item type'</strong>",
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Item Category", "Dropdown", "Required"],
                                    ["Item Number", "Text", "Required"],
                                    ["Name", "Text", "Required"],
                                    ["Inventory Type", "Dropdown", "Required"],
                                    ["Base Unit", "Dropdown", "Required"],
                                    ["Inventory Batch Type", "Dropdown", "Required"],
                                    ["Min Inventory Qty", "Number", "Required"],
                                    ["Item Group", "Dropdown", "Optional"],
                                    ["Item Description", "Text", "Optional"],
                                    ["Price Inclusive Tax", "Checkbox", "Optional"],
                                    ["Auto Order Rule for Min Qty", "Checkbox", "Optional"],
                                    ["Purchase Price", "Dropdown", "Required"],
                                    ["Max Inventory Qty", "Dropdown", "Optional"],
                                    ["Inventory Valuation Method", "Dropdown", "Optional"],
                                    ["Image", "File Upload", "Optional"],
                                    ["Is Receiving Bin Location Applicable?", "Checkbox", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Editable"]}
                                rows={[
                                    ["Item Name", "Dropdown", "No"],
                                    ["Item Search", "Text", "Yes"],
                                    ["Type", "Dropdown", "No"],
                                    ["Category", "Dropdown", "No"],
                                    ["Record Created", "Dropdown", "No"],
                                    ["Item Serial Number", "Auto-generated/View only", "No"],
                                    ["Batch Details", "Auto-generated/View only", "No"],
                                    ["Purchase Order", "Auto-generated/View only", "No"],
                                    ["Update", "Button", "Yes (updates details)"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Mandatory"]}
                                rows={[
                                    ["Asset Item Type", "Dropdown", "Required"],
                                    ["Asset Unique Ref. Number", "Number", "Required"],
                                    ["Asset Name", "Number", "Optional"],
                                    ["Ref PO Number", "Number", "Optional"],
                                    ["Asset Purchase Date", "Date Picker", "Optional"],
                                    ["Initial Asset Value", "Dropdown", "Optional"],
                                    ["Current Asset Value", "Dropdown", "Optional"],
                                    ["Asset Owner", "Dropdown", "Optional"],
                                    ["Is Asset for Depreciation Accounting", "Checkbox", "Optional"],
                                    ["Remarks", "Text", "Optional"]
                                ]}
                            />
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
        ]
    },
    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Editable"]}
                                rows={[
                                    ["Asset Name", "Dropdown", "No"],
                                    ["Search Name", "Text", "Yes"],
                                    ["Asset Category", "Dropdown", "No"],
                                    ["Asset Item Type", "Dropdown", "No"],
                                    ["Record Created", "Dropdown", "No"]
                                ]}
                            />
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
        ]
    },

    {
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
                            <DynamicTable
                                columns={["Field", "Input Type", "Mandatory"]}
                                rows={[
                                    ["Asset Item Type", "Dropdown", "Required"],
                                    ["Asset Unique Ref. Number", "Number", "Required"],
                                    ["Asset Name", "Number", "Required"],
                                    ["Ref PO Number", "Number", "Required"],
                                    ["Asset Purchase Date", "Date Picker", "Optional"],
                                    ["Initial Asset Value", "Dropdown", "Optional"],
                                    ["Current Asset Value", "Dropdown", "Optional"],
                                    ["Asset Owner", "Dropdown", "Optional"],
                                    ["Is Asset for Depreciation Accounting", "Checkbox", "Optional"],
                                    ["Remarks", "Text", "Optional"]
                                ]}
                            />
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
        ]
    },
    // Events
    {
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
        ]
    },
]