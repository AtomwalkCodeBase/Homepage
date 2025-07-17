import {
    FaCheckCircle,
    FaMoneyCheckAlt,
    FaFolderOpen,
    FaCalendar,
    FaRoute,
    FaUser,
    FaSlidersH,
    FaClipboardList,
    FaChartLine,
    FaEdit,
    FaTable,
    FaListAlt,
    FaSearch,
    FaCalendarAlt,
    FaInfoCircle,
    FaPaperPlane,
    FaEye,
    FaFileExport,
    FaFilter,
    FaArrowLeft,
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

export const EmployeeHrmsManualStep = [

    // EMPLOYEE HRMS
    {
        "Dashboard Overview HRMS": [
            { accesspath: "HRMS → Dashboard" },
            {
                title: "Navigate to Dashboard",
                description:
                    "The Dashboard module provides a centralized summary of employee metrics and recent system activities. It offers a real-time visual snapshot of HR-related KPIs including attendance, leaves, claims, and help tickets.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Log in to the Atomwalk HRMS portal.",
                            "From the <strong>left-hand menu</strong>, navigate to <strong>Dashboard</strong>.",
                            "The dashboard screen loads by default and presents an overview of real-time employee activity.",
                        ],
                    },
                ],
                notes: [
                    "Dashboard access is enabled by default for all user roles.",
                ],
            },
            {
                title: "Dashboard Contents",
                description: "The dashboard displays key widgets summarizing the user's current status and activities in the HRMS system.",
                sections: [
                    {
                        title: "Widgets & Information Displayed",
                        icon: <FaEye />,
                        items: [
                            "<strong>Pending Help Tickets</strong>: Count of unresolved support tickets; status indicators show approval progress.",
                            "<strong>Present Today</strong>: Real-time attendance check-in status.",
                            "<strong>Pending Leaves</strong>: Number of leave requests pending approval.",
                            "<strong>Pending Claims</strong>: Overview of reimbursement or expense claims pending processing.",
                            "<strong>Attendance Overview</strong>: Graphical summary of working hours and attendance trends.",
                            "<strong>Recent Activities</strong>: Displays recent employee actions such as leave applications or ticket creation, along with timestamps and status badges (e.g., Approved, Assigned).",
                        ],
                    },
                ],
                notes: [
                    "All data points are refreshed automatically upon login.",
                    "Visual indicators (color-coded badges and icons) help identify status at a glance.",
                ],
            },
            {
                title: "Input Fields and Validation",
                description: "This module is a read-only interface and does not contain editable fields or submission actions.",
                sections: [
                    {
                        title: "Data Behavior",
                        icon: <FaEdit />,
                        items: [
                            "All information is system-generated based on real-time data updates.",
                            "Interaction is limited to viewing; no manual entry is supported.",
                        ],
                    },
                ],
                notes: [
                    "Widgets such as Attendance Overview and Recent Activities are automatically populated based on employee actions in other modules.",
                ],
            },
        ]
    },

    {
        "Login Module HRMS": [
            {
                accesspath: "HRMS → Login Page"
            },
            {
                title: "Navigate to Login Screen",
                description:
                    "The login module enables secure access to the Atomwalk HRMS system by authenticating users based on their credentials. Follow the navigation steps below to access the login interface:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Open the official <strong>Atomwalk website</strong> in your browser.",
                            "Click on the <strong>'Login'</strong> option located at the top right corner.",
                            "The login screen will appear prompting for authentication details."
                        ]
                    }
                ],
                notes: [
                    "Accessible by all authorized HRMS users.",
                    "No special permissions are required to open the login screen."
                ]
            },
            {
                title: "Login Form Inputs",
                description:
                    "The login form collects key user information required for authentication and access authorization:",
                sections: [
                    {
                        title: "Input Fields",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Description"]}
                                rows={[
                                    ["Company", "Dropdown", "Select your organization or company code"],
                                    ["Employee ID / Mobile Number", "Text / Number", "Enter your employee ID or registered mobile number"],
                                    ["PIN", "Password Field", "Enter a secure 4-digit numeric PIN"],
                                    ["Captcha", "Text", "Enter the displayed alphanumeric code for verification"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "All fields on the login form are <strong>mandatory</strong>.",
                    "Validation errors will occur if any field is left blank or incorrect."
                ]
            },
            {
                title: "Validation & Behavior",
                description:
                    "The system performs strict field-level validation before processing login requests:",
                sections: [
                    {
                        title: "Validation on Submit",
                        icon: <FaPaperPlane />,
                        items: [
                            "All fields must be completed before submission.",
                            "Invalid or unmatched PIN or Captcha will trigger an error message.",
                            "Employee ID or Mobile Number must exist in the HRMS records."
                        ]
                    }
                ],
                notes: [
                    "No information is stored locally unless login is successful.",
                    "Captcha is case-sensitive and must be typed exactly as shown.",
                    "If you have forgotten your PIN, click on the <strong>'Forgot PIN?'</strong> link to initiate the recovery process."
                ]
            },
        ]
    },

    {
        "Forget PIN Module HRMS": [
            { accesspath: "HRMS → Login Page → Forgot PIN" },
            {
                title: "Navigate to Forgot PIN Screen",
                description:
                    "This module enables employees to initiate the process of resetting their login PIN by providing key identification fields. Follow the steps below to reach the 'Forgot PIN' screen:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Open the official <strong>Atomwalk website</strong> in a browser.",
                            "Click on the <strong>'Login'</strong> button at the top right.",
                            "On the login screen, click on the <strong>'Forgot PIN?'</strong> link.",
                            "The system will redirect to the <strong>'Reset PIN'</strong> screen."
                        ]
                    }
                ],
                notes: [
                    "Accessible to any user who reaches the login page.",
                    "No additional permissions are required to use this feature."
                ]
            },
            {
                title: "Reset PIN Form Inputs",
                description:
                    "The Reset PIN form collects minimal information to authenticate the employee before proceeding to reset:",
                sections: [
                    {
                        title: "Input Fields",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Description"]}
                                rows={[
                                    ["Company", "Dropdown", "Select the company name or code from the list"],
                                    ["Employee ID / Mobile Number", "Text / Number", "Enter your registered employee ID or mobile number"],
                                    ["Captcha", "Text", "Enter the case-sensitive verification code shown"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "All fields on this screen are <strong>mandatory</strong>.",
                    "If the entered information matches the records, the system will guide you to reset your PIN.",
                    "Captcha is case-sensitive and must be entered exactly as displayed."
                ]
            },
            {
                title: "Submission & Navigation",
                description:
                    "Steps involved in submitting the reset request and available navigation options:",
                sections: [
                    {
                        title: "Actions",
                        icon: <FaPaperPlane />,
                        items: [
                            "Click on <strong>'Submit'</strong> to verify your identity and proceed with PIN reset.",
                            "Click on <strong>'Back to Sign In'</strong> to return to the login page without submitting."
                        ]
                    }
                ],
                notes: [
                    "No data will be updated unless the form is submitted.",
                    "Back navigation is available via the <strong>'Back to Sign In'</strong> link."
                ]
            }
        ]
    },

    {
        "Attendance View For Employee HRMS": [
            {
                accesspath: "Login → Time Management → Attendance"
            },
            {
                title: "Navigate to Attendance Module",
                description:
                    "This module provides employees with a comprehensive view of their attendance history, including profile info, monthly attendance calendar, status codes, and exportable records.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Time Management'</strong>",
                            "Click on <strong>'Attendance'</strong>"
                        ]
                    }
                ],
                notes: [
                    "<strong>Login</strong> is required to access the <strong>'Attendance'</strong> screen."
                ]
            },
            {
                title: "Attendance View Components",
                description:
                    "The following sections are visible to employees on the attendance view screen:",
                sections: [
                    {
                        title: "Core Sections",
                        icon: <FaClipboardList />,
                        items: [
                            "Employee Profile: Displays Name, ID, Designation, Department.",
                            "Monthly Attendance Calendar: Visual grid showing attendance status (P, L, C, H, N).",
                            "Status Guide: Helps decode status symbols.",
                            "Recent Attendance Table: Lists daily records of Check-In, Check-Out, and Status."
                        ]
                    }
                ],
                notes: [
                    "Each employee can only see their own attendance records.",
                    "Filters allow date-based or status-based viewing for ease of access."
                ]
            },
            {
                title: "Download Options",
                description:
                    "Export attendance data for reporting or personal records:",
                sections: [
                    {
                        title: "Export to Excel/PDF",
                        icon: <FaFileExport />,
                        items: [
                            "Download attendance data in XLS or PDF format using the Export button from the Recent Attendance section."
                        ]
                    }
                ],
                notes: [
                    "Ensure the required filters are applied before exporting for accurate reports."
                ]
            },
            {
                title: "Module Characteristics",
                sections: [
                    {
                        title: "Feature Summary",
                        icon: <FaInfoCircle />,
                        items: [
                            "This module is <strong>view-only</strong>",
                            "All fields displayed are <strong>informational</strong> and do not require validation."
                        ]
                    }
                ],
                notes: [
                    "Use 'Add Attendance' for manual entries if check-in was missed.",
                    "Exported files can be shared with HR or stored for personal reference."
                ]
            }
        ]
    },

    {
        "Add Attendance For Employee HRMS": [
            {
                accesspath: "Login → Time Management → Attendance → Add Attendance"
            },
            {
                title: "Navigate to Attendance Form",
                description: "Follow the steps below to access the attendance submission form:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Time Management'</strong>",
                            "Click on <strong>'Attendance'</strong>",
                            "Choose <strong>'Add Attendance'</strong>"
                        ]
                    }
                ],
                notes: [
                    "<strong>Login</strong> is required to access <strong>'Add Attendance'</strong> screen"
                ]
            },
            {
                title: "Attendance Entry Form",
                description: "Complete the following fields to submit a new attendance entry:",
                sections: [
                    {
                        title: "Form Fields",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Check-In Date", "Date Picker", "Required"],
                                    ["Check-Out Date", "Date Picker", "Optional"],
                                    ["Start Time", "Time Picker", "Required"],
                                    ["End Time", "Time Picker", "Optional"],
                                    ["Remark", "Text Area", "Required"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "Start Time, Check-In Date, and Remark are mandatory to submit attendance.",
                    "Ensure all data is accurate before submission."
                ]
            },
            {
                title: "Submission Process",
                description: "Save your attendance entry after completing the form:",
                sections: [
                    {
                        title: "Submit Attendance",
                        icon: <FaPaperPlane />,
                        items: [
                            "Review the filled information.",
                            "Click the <strong>'Submit Attendance'</strong> button.",
                            "A confirmation message will be displayed upon success."
                        ]
                    }
                ],
                notes: [
                    "Submitted attendance entries cannot be edited unless reopened by HR/Admin.",
                ]
            },
            {
                title: "Cancel Operation",
                description: "To discard the form and return:",
                sections: [
                    {
                        title: "Cancel Button",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click the <strong>'Cancel'</strong> button to go back to the previous Attendance page."
                        ]
                    }
                ],
                notes: [
                    "Back navigation is supported via Cancel.",
                    "Form data will not be saved on cancellation."
                ]
            }
        ]
    },

    {
        "TimeSheet View": [
            {
                accesspath: "Login → Time Management → Time Sheet"
            },
            {
                title: "Navigate to Time Sheet Module",
                description:
                    "This module allows employees to view a summary of their weekly working hours including approved, pending, rejected, and not submitted hours. It also breaks down hours worked by project.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Time Management'</strong>",
                            "Click on <strong>'Time Sheet'</strong>"
                        ]
                    }
                ],
                notes: [
                    "<strong>Login</strong> is required to view the <strong>'Time Sheet'</strong> screen.",
                    "This module is <strong>view-only</strong> and does not allow data input."
                ]
            },
            {
                title: "Timesheet View Components",
                description:
                    "This screen displays weekly work hour summaries for the user:",
                sections: [
                    {
                        title: "Visible Fields",
                        icon: <FaClipboardList />,
                        items: [
                            "Hours This Week: Total hours logged in the current week.",
                            "Approved Hours: Hours reviewed and accepted by manager.",
                            "Pending + Rejected Hours: Hours still under review or rejected.",
                            "Not Submitted: Days with missing entries.",
                            "Days Worked: Days with valid time sheet entries.",
                            "Weekly Time Sheet Summary by Project: Categorized breakdown of hours per project."
                        ]
                    }
                ],
                notes: [
                    "Used primarily to monitor attendance and productivity across projects.",
                    "Data shown here is sourced from submitted attendance and time logs.",
                    "Editing of time entries must be done through the time entry or attendance form if allowed."
                ]
            },

        ]
    },

    {
        "Add Time Entry": [
            {
                accesspath: "Login → Time Management → Time Sheet → Add Time Entry"
            },
            {
                title: "Navigate to Add Time Entry",
                description:
                    "This module enables employees to manually log time worked against specific projects and activities on a daily basis.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Time Management'</strong>",
                            "Click on <strong>'Time Sheet'</strong>",
                            "Click on <strong>'Add Time Entry'</strong>"
                        ]
                    }
                ],
                notes: [
                    "<strong>Login</strong> is required to access the <strong>'Add Time Entry'</strong> screen.",
                    "Use this screen to log hours worked against projects on specific dates."
                ]
            },
            {
                title: "Time Entry Form Fields",
                description: "Fill in the following fields to submit a time entry:",
                sections: [
                    {
                        title: "Form Fields",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Input Type", "Validation"]}
                                rows={[
                                    ["Choose Project", "Dropdown", "Required"],
                                    ["Activity", "Dropdown", "Required"],
                                    ["Date", "Date Picker", "Required"],
                                    ["Working Hours", "Numeric Input", "Required"],
                                    ["Start Time", "Time Picker", "Optional"],
                                    ["End Time", "Time Picker", "Optional"],
                                    ["Remarks", "Text Area", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "Only <strong>Project</strong>, <strong>Activity</strong>, <strong>Date</strong>, and <strong>Working Hours</strong> are mandatory fields.",
                    "Ensure correct hours are logged for proper reporting and billing.",
                ]
            },

        ]
    },

    {
        "Leave Management View": [
            { accesspath: "Leave & Holidays > Leave Management" },

            {
                title: "Navigate to Leave Management",
                description:
                    "Apply for leave and track your leave balance, requests, and history within the HRMS system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Leave & Holidays'</strong>",
                            "Click on <strong>'Leave Management'</strong>",
                        ],
                    },
                ],
                notes: [
                    "Acts as the central hub for managing all types of leave applications and records.",
                ],
            },

            {
                title: "Leave Categories",
                description: "Overview of available leave categories:",
                sections: [
                    {
                        title: "Types of Leave",
                        icon: <FaCalendarAlt />,
                        items: [
                            "<strong>Earned Leave</strong> – Track applied and available earned leave.",
                            "<strong>Half Day Leave</strong> – Track and apply for half-day leaves.",
                            "<strong>Work from Home</strong> – Apply for remote work days.",
                            "<strong>Leave Without Pay (LOP)</strong> – Apply when no paid leave is available.",
                        ],
                    },
                ],
                notes: [
                    "Each category represents a different type of leave entitlement provided by the organization.",
                    "Leave balances and usage are updated in real-time after application and approval.",
                ],
            },

            {
                title: "Tabs in Leave Management",
                description: "Different tabs available for deeper leave tracking:",
                sections: [
                    {
                        title: "Leave Tabs",
                        icon: <FaEdit />,
                        items: [
                            "<strong>My Leave Requests</strong> – View your applied leave records and status.",
                            "<strong>Work From Home Requests</strong> – Track your WFH requests.",
                            "<strong>Leave Analytics</strong> – View graphical leave trends and usage.",
                            "<strong>Leave History</strong> – Access your complete leave log.",
                        ],
                    },
                ],
                notes: [
                    "Tabs offer categorized and filtered access to leave-related data for easy tracking and insights.",
                    "Use these tabs to review past applications, monitor approval status, and analyze trends in your leave usage.",
                ],
            },
        ]
    },

    {
        "Apply for Leave": [
            { accesspath: "Leave & Holidays > Leave Management > Apply for Leave" },

            {
                title: "Navigate to Apply for Leave",
                description:
                    "Use the 'Apply for Leave' feature to submit your leave request by filling out the required information.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Leave & Holidays'</strong>",
                            "Click on <strong>'Leave Management'</strong>",
                            "Click <strong>'Apply for Leave'</strong> button on the top-right corner",
                        ],
                    },
                ],
                notes: [
                    "Make sure to check your leave balance before applying.",
                ],
            },

            {
                title: "Leave Application Form Fields",
                description: "Fill in all the required fields in the form:",
                sections: [
                    {
                        title: "Form Field Details",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Leave Type", "Dropdown", "Required"],
                                    ["Start Date", "Date Picker", "Required"],
                                    ["End Date", "Date Picker", "Required"],
                                    ["Reason for Leave", "Textarea", "Required"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "All fields are mandatory. Incomplete forms cannot be submitted.",
                ],
            },

            {
                title: "Submit or Cancel Leave Application",
                description: "Use the action buttons to proceed or cancel your request:",
                sections: [
                    {
                        title: "Action Buttons",
                        icon: <FaPaperPlane />,
                        items: [
                            "Click <strong>'Submit Application'</strong> to send your request for approval.",
                            "Click <strong>'Cancel'</strong> to discard the application and return.",
                        ],
                    },
                ],
                notes: [
                    "Once submitted, the request appears in the 'My Leave Requests' tab.",
                ],
            },

        ]
    },

    {
        "Holiday Calendar (Calendar View)": [
            { accesspath: "Leave & Holidays > Holiday Calendar > Calendar View" },

            {
                title: "Navigate to Holiday Calendar - Calendar View",
                description:
                    "View your yearly holiday schedule in a calendar format and select optional holidays as per your entitlement.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Leave & Holidays'</strong>",
                            "Click on <strong>'Holiday Calendar'</strong>",
                            "Ensure <strong>'Calendar View'</strong> is selected (tab highlighted)",
                        ],
                    },
                ],
                notes: [
                    "This view is for visualization only.",
                ],
            },

            {
                title: "Holiday Summary Overview",
                description: "Quick stats showing the count of different holiday types:",
                sections: [
                    {
                        title: "Holiday Stats",
                        icon: <FaCalendarAlt />,
                        items: [
                            "<strong>Mandatory Holidays</strong> – Non-editable fixed holidays set by HR.",
                            "<strong>Optional Holidays</strong> – Company-provided optional days off.",
                            "<strong>Selected Optional Holidays</strong> – Number of optional holidays you've chosen (e.g., 0/3).",
                        ],
                    },
                ],
                notes: [
                    "You can select up to a maximum number of optional holidays based on configuration (e.g., 3).",
                ],
            },

            {
                title: "Your Selected Optional Holidays",
                description: "Displays a summary of optional holidays chosen by you.",
                sections: [
                    {
                        title: "Selection View",
                        icon: <FaCheckCircle />,
                        items: [
                            "View a list of selected optional holidays.",
                            "If none are selected, a message <em>'No optional holidays to display'</em> will appear.",
                        ],
                    },
                ],
                notes: [
                    "Selections can usually be made via the 'List View' tab if editing is allowed.",
                ],
            },

            {
                title: "Calendar Display",
                description: "Visual monthly calendar showing all holidays:",
                sections: [
                    {
                        title: "Calendar Features",
                        icon: <FaCalendar />,
                        items: [
                            "Monthly view of all holidays for the year.",
                            "Color-coded or icon-based differentiation between Mandatory and Optional holidays.",
                            "Interactive view may highlight your selections or company-wide off days.",
                        ],
                    },
                ],
                notes: [
                    "This view is read-only unless switched to editable mode or List View.",
                ],
            },


        ]
    },

    {
        "Holiday Calendar (List View)": [
            { accesspath: "Leave & Holidays > Holiday Calendar > List View" },

            {
                title: "Navigate to Holiday Calendar - List View",
                description:
                    "View all holidays in a list format with filtering options by holiday type.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Leave & Holidays'</strong>",
                            "Click on <strong>'Holiday Calendar'</strong>",
                            "Click on the <strong>'List View'</strong> tab",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to access the List View.",
                ],
            },

            {
                title: "Holiday Filters",
                description: "Filter and categorize holidays for easier browsing:",
                sections: [
                    {
                        title: "Filter Options",
                        icon: <FaFilter />,
                        items: [
                            "Filter by <strong>Mandatory Holidays</strong> – Shows fixed holidays applicable to all employees.",
                            "Filter by <strong>Optional Holidays</strong> – Shows flexible holidays that can be selected.",
                            "Filter by <strong>All Holidays</strong> – Displays both mandatory and optional holidays together.",
                        ],
                    },
                ],
                notes: [
                    "These filters help you locate specific holidays quickly based on category.",
                ],
            },

            {
                title: "Holiday List View",
                description: "Detailed tabular view of holidays:",
                sections: [
                    {
                        title: "Display Information",
                        icon: <FaListAlt />,
                        items: [
                            "Holiday name, date, and type (mandatory/optional) are listed.",
                            "You may be able to select optional holidays directly from here if enabled.",
                            "Sorting and pagination may be available based on the total number of holidays.",
                        ],
                    },
                ],
                notes: [
                    "Checkboxes or select buttons may be visible for optional holiday selection.",
                ],
            },
        ]
    },

    {
        "My Claims View": [
            { accesspath: "Finance > My Claims" },

            {
                title: "Navigate to My Claims",
                description:
                    "Monitor and manage your expense claims and reimbursement requests using the finance dashboard:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Finance'</strong>",
                            "Click on <strong>'My Claims'</strong>",
                        ],
                    },
                ],
                notes: [
                    "This section is accessible to all users for viewing their own financial claims.",
                    "No special permissions are required to view claim records.",
                ],
            },

            {
                title: "Claims Summary Dashboard",
                description: "Top-level overview of your financial claim statuses:",
                sections: [
                    {
                        title: "Summary Tiles",
                        icon: <FaClipboardList />,
                        items: [
                            "<strong>Total Claims</strong> – Total monetary value of all claims submitted.",
                            "<strong>Approved Claims</strong> – Claims that have been successfully approved.",
                            "<strong>Pending Claims</strong> – Claims that are currently under review.",
                            "<strong>Rejected Claims</strong> – Claims that were not approved by finance.",
                        ],
                    },
                ],
                notes: [
                    "Each tile provides a live count and value of respective claim statuses for transparency.",
                ],
            },

            {
                title: "Claim Tabs and Filtering",
                description: "Track your claims based on status with filtering options:",
                sections: [
                    {
                        title: "Claim Tabs",
                        icon: <FaFilter />,
                        items: [
                            "<strong>MY Claims</strong> – Default view showing all your claims.",
                            "<strong>Pending</strong> – Displays only claims waiting for approval.",
                            "<strong>Approved</strong> – Displays approved reimbursement records.",
                            "<strong>Rejected</strong> – Lists all rejected claims with reasons.",
                            "<strong>Unsubmitted</strong> – Shows draft claims yet to be submitted.",
                        ],
                    },
                    {
                        title: "Filter Options",
                        icon: <FaSlidersH />,
                        items: [
                            "Filter by <strong>Expense Type</strong> (e.g., travel, meals).",
                            "Use the <strong>Search</strong> or <strong>Dropdown filter</strong> for faster access.",
                        ],
                    },
                ],
                notes: [
                    "Tabs and filters enhance usability and streamline claim tracking.",
                    "Use the <strong>Export</strong> button to download your claims as a report.",
                ],
            },

            {
                title: "Claim Details Table",
                description: "Displays all submitted and draft claims in tabular format:",
                sections: [
                    {
                        title: "Table Columns",
                        icon: <FaTable />,
                        items: [
                            "<strong>Claim ID</strong> – Unique identifier for each claim.",
                            "<strong>Expense Type</strong>, <strong>Description</strong>, <strong>Amount</strong>.",
                            "<strong>Expense Date</strong> and <strong>Submitted Date</strong>.",
                            "<strong>Receipt</strong> attachment status.",
                            "<strong>Status</strong> – Current state (Pending, Approved, Rejected).",
                            "<strong>Actions</strong> – View or edit if unsubmitted.",
                        ],
                    },
                ],
                notes: [
                    "No claims will be shown unless previously submitted or created.",
                    "Receipts are mandatory for some claim types depending on policy.",
                ],
            },
        ]
    },

    {
        "Add New Claims": [
            { accesspath: "Finance > My Claims > Add New Claims" },

            {
                title: "Navigate to Add New Claims",
                description:
                    "Submit new expense or reimbursement requests using the Add New Claims form in the finance module:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Finance'</strong>",
                            "Click on <strong>'My Claims'</strong>",
                            "Click on the <strong>'Add New Claim'</strong> button",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to access the claim submission form.",
                ],
            },

            {
                title: "Claim Entry Fields",
                description: "Enter the required details to create a new claim entry:",
                sections: [
                    {
                        title: "Form Fields",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Expense Item", "Dropdown", "Required"],
                                    ["Project Type", "Dropdown", "Required"],
                                    ["Amount", "Numeric", "Required"],
                                    ["Date of Expense", "Date Picker", "Required"],
                                    ["Description", "Text", "Required"],
                                    ["Receipts/Attachment", "File Upload", "Optional"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "<strong>All fields</strong> except <strong>Receipts/Attachment</strong> are mandatory.",
                    "Ensure all entered details are accurate. Some fields may be locked after submission.",
                ],
            },

            {
                title: "Submit or Cancel",
                description: "Complete your claim entry or exit without saving:",
                sections: [
                    {
                        title: "Submission Options",
                        icon: <FaPaperPlane />,
                        items: [
                            "Click <strong>'Submit'</strong> to send the claim for approval.",
                            "Click <strong>'Cancel'</strong> to discard the entry and return to 'My Claims' dashboard.",
                        ],
                    },
                ],
                notes: [
                    "Claims submitted successfully will appear under the 'Pending' tab until approved.",
                ],
            },
        ]
    },

    {
        "Pay Slip View": [
            { accesspath: "Finance > Pay Slip" },

            {
                title: "Navigate to Pay Slip",
                description:
                    "Access your current and past pay slips along with detailed salary components and analytics:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Finance'</strong>",
                            "Click on <strong>'Pay Slip'</strong>",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to access your own pay slips.",
                    "This module is for employee view only",
                ],
            },

            {
                title: "Pay Slip Overview",
                description: "View your monthly salary details and breakdowns:",
                sections: [
                    {
                        title: "Pay Slip Components",
                        icon: <FaMoneyCheckAlt />,
                        items: [
                            "<strong>Gross Salary</strong> – Total salary before any deductions.",
                            "<strong>Total Earnings</strong> – Includes basic pay, HRA, bonuses, etc.",
                            "<strong>Total Deductions</strong> – Includes PF, taxes, professional deductions, etc.",
                            "<strong>Net Salary</strong> – Final amount credited to your account.",
                            "<strong>Current Salary</strong> – Displays your present month's salary details.",
                        ],
                    },
                ],
                notes: [
                    "Each salary component is auto-calculated based on your grade and organization policies.",
                    "Figures are visible only after the payroll is processed for that month.",
                ],
            },

            {
                title: "History and Analytics",
                description: "Track previous pay slips and analyze salary trends:",
                sections: [
                    {
                        title: "Analytics & History",
                        icon: <FaChartLine />,
                        items: [
                            "<strong>Pay Slip History</strong> – Download or view past monthly slips.",
                            "<strong>Salary Analytics</strong> – Graphical insights into your earning and deduction trends.",
                        ],
                    },
                ],
                notes: [
                    "History helps in financial planning and tax declaration purposes.",
                    "Analytics are available if payroll has been processed for at least 2 months.",
                ],
            },
        ]
    },

    {
        "Help Desk": [
            { accesspath: "Support > Help Desk" },

            {
                title: "Navigate to Help Desk",
                description:
                    "The Help Desk allows employees to raise support tickets and access the knowledge base for quick resolutions.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Support'</strong>",
                            "Click on <strong>'Help Desk'</strong>",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to view and raise support tickets.",
                ],
            },

            {
                title: "Help Desk Tabs",
                description: "Use the tabs to switch between your tickets and knowledge resources:",
                sections: [
                    {
                        title: "Available Tabs",
                        icon: <FaEdit />,
                        items: [
                            "<strong>My Tickets</strong> – View all submitted support requests with their status.",
                            "<strong>Knowledge Base</strong> – Browse articles and FAQs for common queries.",
                        ],
                    },
                ],
                notes: [
                    "Tickets can be filtered by category or status using dropdown filters.",
                ],
            },

            {
                title: "Ticket Information Table",
                description: "Each ticket contains the following details:",
                sections: [
                    {
                        title: "Ticket Fields",
                        icon: <FaTable />,
                        content: (
                            <DynamicTable
                                columns={["Field", "Description"]}
                                rows={[
                                    ["Request ID", "System-generated unique ticket ID"],
                                    ["Type", "Category of request (e.g., Technical Support)"],
                                    ["Description", "Brief details of the issue"],
                                    ["Remarks", "Additional comments or notes"],
                                    ["Created Date", "Date the ticket was created"],
                                    ["Status", "Current status (e.g., Assigned, Open, Closed)"],
                                    ["Actions", "View or export ticket details"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "Click the <strong>eye icon</strong> under Actions to view detailed ticket information.",
                    "Use the <strong>Export</strong> button to download your ticket list.",
                ],
            },
        ]
    },

    {
        "Create New Ticket": [
            { accesspath: "Support > Help Desk > Create New Ticket" },

            {
                title: "Navigate to Create New Ticket",
                description:
                    "Use the Help Desk to raise a new support ticket for any queries, issues, or technical assistance.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Support'</strong>",
                            "Click on <strong>'Help Desk'</strong>",
                            "Click on the <strong>'Create New Ticket'</strong> button",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to raise a support ticket.",
                ],
            },

            {
                title: "Ticket Entry Fields",
                description: "Fill in the required details to raise a new support ticket:",
                sections: [
                    {
                        title: "Form Fields",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Help Category", "Dropdown", "Required"],
                                    ["Help Request Details", "Text", "Required"],
                                    ["Remarks", "Text", "Required"],
                                    ["Attaching Support Document", "File Upload", "Required"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "<strong>All fields</strong> are mandatory to submit a support ticket.",
                    "Ensure the uploaded file is clear, relevant, and supports your request.",
                ],
            },
            {
                title: "Submit or Cancel",
                description: "You may choose to save or discard your ticket entry:",
                sections: [
                    {
                        title: "Submission Options",
                        icon: <FaPaperPlane />,
                        items: [
                            "Click <strong>'Submit'</strong> to send the ticket to the support team.",
                            "Click <strong>'Cancel'</strong> to discard and return to the Help Desk.",
                        ],
                    },
                ],
                notes: [
                    "Once submitted, your ticket will appear in the 'My Tickets' tab with its status.",
                ],
            },
        ]
    },

    {
        "Request Desk": [
            { accesspath: "Support > Request Desk" },

            {
                title: "Navigate to Request Desk",
                description:
                    "Submit and track your resource-related requests such as hardware, software, or other organizational needs.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Support'</strong>",
                            "Click on <strong>'Request Desk'</strong>",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to access or submit requests via Request Desk.",
                ],
            },

            {
                title: "Available Tabs",
                description: "Track and manage all your resource requests through these tabs:",
                sections: [
                    {
                        title: "Tabs in Request Desk",
                        icon: <FaEdit />,
                        items: [
                            "<strong>My Requests</strong> – View and manage all your previously submitted requests.",
                            "<strong>New Request</strong> – Initiate a new resource request.",
                            "<strong>All Requests</strong> – View submitted requests across your team/department (if applicable).",
                        ],
                    },
                ],
                notes: [
                    "Filters for type and status are available to narrow down requests.",
                ],
            },
        ]
    },

    {
        "New Request": [
            { accesspath: "Support > Request Desk > New Request" },

            {
                title: "Navigate to New Request Form",
                description:
                    "Submit a new request related to resources, support, or any assistance using the New Request form under Request Desk.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Support'</strong>",
                            "Click on <strong>'Request Desk'</strong>",
                            "Click on <strong>'New Request'</strong>",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to submit a new request.",
                ],
            },

            {
                title: "New Request Form Fields",
                description: "Fill in all the mandatory fields to raise a new request:",
                sections: [
                    {
                        title: "Form Fields",
                        icon: <FaEdit />,
                        content: (
                            <DynamicTable
                                columns={["Field", "Input Type", "Validation"]}
                                rows={[
                                    ["Help Category", "Dropdown", "Required"],
                                    ["Help Request Details", "Text", "Required"],
                                    ["Remark", "Text", "Required"],
                                    ["Attaching Support Document", "File Upload", "Required"]
                                ]}
                            />
                        ),
                    },
                ],
                notes: [
                    "<strong>All fields</strong> are mandatory in this form.",
                    "Ensure uploaded documents are relevant and legible.",
                ],
            },

            {
                title: "Submit or Cancel",
                description: "Complete your request or return without saving:",
                sections: [
                    {
                        title: "Submission Options",
                        icon: <FaPaperPlane />,
                        items: [
                            "Click <strong>'Submit'</strong> to raise your request.",
                            "Click <strong>'Cancel'</strong> to return to the dashboard without submitting.",
                        ],
                    },
                ],
                notes: [
                    "Submitted requests will be listed under the <strong>'My Requests'</strong> tab for tracking.",
                ],
            },
        ]
    },

    {
        "My Wishes": [
            { accesspath: "Personal > My Wishes" },

            {
                title: "Navigate to My Wishes",
                description:
                    "View and celebrate your personal milestones and heartfelt messages from colleagues including birthdays, anniversaries, and other events.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Personal'</strong>",
                            "Click on <strong>'My Wishes'</strong>",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to access My Wishes.",
                ],
            },

            {
                title: "My Wishes Dashboard",
                description:
                    "The dashboard provides a quick summary and access to your event-related wishes and celebrations:",
                sections: [
                    {
                        title: "Components Visible",
                        icon: <FaEye />,
                        items: [
                            "<strong>Total Events</strong> – Count of all special occasions.",
                            "<strong>Birthdays</strong> – Track and view birthday wishes.",
                            "<strong>Work Anniversaries</strong> – Highlights of your work milestones.",
                            "<strong>Other Events</strong> – Custom or non-standard events.",
                        ],
                    },
                ],
                notes: [
                    "This page is personalized and updates based on your profile data.",
                ],
            },

            {
                title: "Search Events",
                description: "Quickly search events using the provided search box:",
                sections: [
                    {
                        title: "Search Functionality",
                        icon: <FaSearch />,
                        items: [
                            "Type event name, date, or description in the <strong>search bar</strong>",
                            "Search results will filter your <strong>My Events</strong> list.",
                        ],
                    },
                ],
                notes: [
                    "Search is case-insensitive and supports partial matching.",
                ],
            },
        ]
    },

    {
        "My Profile": [
            { accesspath: "Personal > My Profile" },

            {
                title: "Navigate to My Profile",
                description:
                    "Access your personal profile to view and manage employee-specific information such as role, department, shift, contact details, and preferences.",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Left menu'</strong>",
                            "Select <strong>'Personal'</strong>",
                            "Click on <strong>'My Profile'</strong>",
                        ],
                    },
                ],
                notes: [
                    "No special permissions are required to view personal profile details.",
                ],
            },

            {
                title: "My Profile Tabs",
                description:
                    "The profile is organized into multiple tabs to separate types of information:",
                sections: [
                    {
                        title: "Tabs Available",
                        icon: <FaFolderOpen />,
                        items: [
                            "<strong>Personal Info</strong> – Employee ID, Role, Department, Join Date, Contact Details, Shift, Birthday.",
                            "<strong>Security</strong> – Manage your login credentials and password.",
                            "<strong>Themes</strong> – Set the preferred display theme for your portal experience.",
                        ],
                    },
                ],
                notes: [
                    "Personal Info displays data pulled from HR records and can be updated by HR only.",
                ],
            },

            {
                title: "Profile Overview Details",
                description: "A snapshot of your current profile status includes:",
                sections: [
                    {
                        title: "Displayed Information",
                        icon: <FaUser />,
                        items: [
                            "<strong>Profile Picture</strong> – Placeholder or uploaded image.",
                            "<strong>Employee ID</strong> – Unique identification number (e.g., EMP_031).",
                            "<strong>Role</strong> – Designation level (e.g., Associate Level).",
                            "<strong>Department</strong> – Assigned team or department.",
                            "<strong>Join Date</strong> – Date of joining the organization.",
                            "<strong>Mobile</strong>, <strong>Email</strong> – Contact details.",
                            "<strong>Birthday</strong> – Date of birth if specified.",
                            "<strong>My Shift</strong> – Assigned work shift (e.g., Working Day).",
                        ],
                    },
                ],
                notes: [
                    "Most fields are view-only; contact HR to update personal records.",
                ],
            },
        ]
    },

]