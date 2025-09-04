import {
  FaCheckCircle,
  FaPlusCircle,
  FaCalendar,
  FaRoute,
  FaBox,
  FaRegListAlt,
  FaPalette,
  FaRegFileAlt,
  FaChartLine,
  FaTimesCircle,
  FaEdit,
  FaCloudUploadAlt,
  FaSort,
  FaTrash,
  FaTable,
  FaTimes,
  FaListAlt,
  FaBan,
  FaChartBar,
  FaUpload,
  FaDownload,
  FaPaperPlane,
  FaRegAddressBook,
  FaEye,
  FaRegEdit,
  FaBolt,
  FaChartPie,
  FaInfoCircle,
  FaUnlockAlt,
  FaKey,
  FaSignOutAlt,
  FaFileExport,
  FaFilter,
  FaTasks,
  FaTag,
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

export const CrmManualStep = [
  // Overview For CRM
  {
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
              <DynamicTable
                columns={["Component", "Type", "Description"]}
                rows={[
                  ["Customer Summary", "Info Block", "Displays total customers, leads, opportunities"],
                  ["Quick CRM Links", "Buttons", "Shortcut to Leads, Contacts, Activities"],
                  ["Notifications", "Info Panel", "Shows CRM-related updates or workflow alerts"],
                  ["User Info", "Top Header", "Displays current user info and login role"],
                ]}
              />
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
              <DynamicTable
                columns={["Component", "Type", "Description"]}
                rows={[
                  ["Total Leads", "Info Box", "Displays the number of new and total leads"],
                  ["Follow-Ups Today", "Count Badge", "Shows due follow-ups scheduled for the current day"],
                  ["Client Conversion", "Pie Chart", "Visual of lead-to-client conversion ratio"],
                  ["Upcoming Tasks", "List View", "Displays assigned CRM tasks with due dates"],
                ]}
              />
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

    ]
  },

  {
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Required Field", "Field Type", "Field Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Email", "Email", "Mandatory / Valid email format"],
                  ["Mobile", "Number", "10-digit format"],
                  ["Address", "Textarea", "Optional"],
                  ["Contact Name", "Text", "Optional"],
                  ["Customer Alias", "Text", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["Pin Code", "Number", "6-digit format"],
                  ["State Code", "Dropdown", "Choose from list"],
                  ["Country", "Dropdown", "Choose from list"],
                  ["Customer From Date", "Date", "Should be current or future date"],
                  ["Customer Type", "Dropdown", "Mandatory selection"],
                  ["Customer Group (Primary)", "Dropdown", "Optional"],
                  ["Customer Group (Secondary)", "Dropdown", "Optional"],
                  ["Image", "File (image)", "Optional"],
                  ["Is this Customer a Supplier", "Checkbox", "Optional"],
                  ["Is Channel Partner", "Dropdown", "Optional"],
                  ["Referred by Channel Partner", "Dropdown", "Optional"],
                  ["Payment Terms", "Textarea", "Optional"],
                  ["Default Email List", "Text", "Optional"],
                  ["Remarks", "Textarea", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field", "Input Type", "Validation"]}
                rows={[
                  ["Task Name", "Text", "Required"],
                  ["Task Type", "Dropdown", "Required"],
                  ["Task Sub Type", "Dropdown", "Required"],
                  ["Planned Date", "Date Picker", "Optional"],
                  ["Start Time", "Time Picker", "Optional"],
                  ["End Time", "Time Picker", "Optional"],
                  ["Priority", "Dropdown", "Required"],
                  ["Task Status", "Dropdown", "Required"],
                  ["Remark", "Textarea", "Optional"],
                  ["Task Owner", "Dropdown", "Required"],
                  ["Current User Assigned", "Dropdown", "Required"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field", "Description"]}
                rows={[
                  ["Product Category", "Category of the product customer is interested in"],
                  ["Product Variation", "Specific variant or model of the product"],
                  ["Required By Date", "The date by which the customer needs the product"],
                  ["Status", "Current status of the product interest (e.g., Pending, Confirmed)"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field", "Input Type", "Mandatory"]}
                rows={[
                  ["Product Category", "Dropdown", "Required"],
                  ["Variation Name", "Dropdown", "Required"],
                  ["Variation Value", "Dropdown", "Required"],
                  ["Variation Name (2)", "Dropdown", "Optional"],
                  ["Variation Value (2)", "Dropdown", "Optional"],
                  ["Variation Name (3)", "Dropdown", "Optional"],
                  ["Variation Value (3)", "Dropdown", "Optional"],
                  ["Product Info", "Text", "Optional"],
                  ["Status", "Dropdown", "Optional"],
                  ["Due Date", "Date Picker", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field", "Input Type", "Mandatory"]}
                rows={[
                  ["Transaction Date", "Display", "Not Required"],
                  ["Book Date", "Display", "Not Required"],
                  ["Paid Amount", "Display", "Not Required"],
                  ["TDS Amount", "Display", "Not Required"],
                  ["Utilised Amount", "Display", "Not Required"],
                  ["Status", "Display", "Not Required"],
                  ["Action", "Button", "Not Required"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field", "Input Type", "Validation"]}
                rows={[
                  ["Transaction Date", "Date Picker", "Optional"],
                  ["Book Date", "Date Picker", "Optional"],
                  ["Paid Amount", "Number", "Required"],
                  ["TDS Amount", "Number", "Required"],
                  ["TDS Section", "Text", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field", "Input Type", "Mandatory"]}
                rows={[
                  ["Name", "Text", "Required"],
                  ["Email", "Email", "Required"],
                  ["Mobile", "Number", "Optional"],
                  ["Address", "Textarea", "Optional"],
                  ["Contact Name", "Text", "Optional"],
                  ["Customer Alias", "Text", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["Pin Code", "Number", "Optional"],
                  ["State Code", "Dropdown", "Optional"],
                  ["Country", "Dropdown", "Optional"],
                  ["Customer From Date", "Date", "Optional"],
                  ["Customer Type", "Dropdown", "Optional"],
                  ["Customer Group (Primary)", "Dropdown", "Optional"],
                  ["Customer Group (Secondary)", "Dropdown", "Optional"],
                  ["Image", "File (Image)", "Optional"],
                  ["Is this Customer a Supplier", "Checkbox", "Optional"],
                  ["Is Channel Partner", "Dropdown", "Optional"],
                  ["Referred by Channel Partner", "Dropdown", "Optional"],
                  ["Payment Terms", "Textarea", "Optional"],
                  ["Default Email List", "Text", "Optional"],
                  ["Remarks", "Textarea", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field", "Input Type", "Validation"]}
                rows={[
                  ["Document Type", "Dropdown", "Optional"],
                  ["Document Name", "Text", "Optional"],
                  ["Document File", "File Upload", "Optional"],
                  ["Valid From Date", "Date Picker", "Optional"],
                  ["Valid To Date", "Date Picker", "Optional"],
                  ["Remarks", "Textarea", "Optional"]
                ]}
              />

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
    ]
  },

  {
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field", "Input Type", "Mandatory"]}
                rows={[
                  ["Agreement Type", "Dropdown", "Yes"],
                  ["Valid Till Date", "Date Picker", "Yes"],
                  ["Field Name 1", "Text", "No"],
                  ["Field Value 1", "Text", "No"],
                  ["Field Name 2", "Text", "No"],
                  ["Field Value 2", "Text", "No"],
                  ["Field Name 3", "Text", "No"],
                  ["Field Value 3", "Text", "No"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Required Field", "Field Type", "Field Validation"]}
                rows={[
                  ["Account Number", "Number", "Must be numeric, 9–18 digits"],
                  ["Account Name", "Text", "Required; alphabetic characters only"],
                  ["Account Currency", "Dropdown", "Must select from available currencies"],
                  ["Bank Name", "Dropdown", "Must select from predefined list"],
                  ["IFSC Code", "Text", "Must match format (e.g., XXXX0000000)"],
                  ["BIC Code", "Text", "Optional, validate if entered"],
                  ["Branch Address", "Textarea", "Max 300 characters"],
                  ["Default Account", "Checkbox", "Optional, only one default allowed"],
                  ["Payment Terms", "Textarea", "Optional; used for billing agreements"],
                  ["Payment Note", "Textarea", "Optional; max 200 characters"],
                  ["Invoice Note", "Textarea", "Optional; appears on invoices"],
                  ["Additional Note", "Textarea", "Optional; for internal use"]
                ]}
              />
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
    ]
  },
  // FOR SUPPLIER

  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Customer Name", "Text", "Required"],
                  ["GSTN", "Text", "Optional; 15 characters"],
                  ["PAN Number", "Text", "Optional; 10 characters"],
                  ["TAN Number", "Number", "Optional"],
                  ["Email ID", "Email", "Required"],
                  ["Mobile Number", "Number", "Optional; 10 digits"],
                  ["Alternate Contact Number", "Number", "Optional"],
                  ["Registered Address", "Text Area", "Optional"],
                  ["Contact Name", "Text", "Optional"],
                  ["Customer Alias", "Text", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["Pin Code", "Number", "Optional; 6 digits"],
                  ["State Code", "Dropdown", "Optional"],
                  ["Country", "Dropdown", "Required"],
                  ["Customer From Date", "Date", "Optional"],
                  ["Customer Type", "Dropdown", "Required"],
                  ["Customer Group (Primary)", "Dropdown", "Optional"],
                  ["Customer Group (Secondary)", "Dropdown", "Optional"],
                  ["Image", "Image Upload", "Optional"],
                  ["Is this Customer a Supplier", "Checkbox", "Set to True"],
                  ["Is Channel Partner", "Dropdown", "Optional"],
                  ["Referred by Channel Partner", "Dropdown", "Optional"],
                  ["Payment Terms", "Text", "Optional"],
                  ["Default Email List", "Text", "Optional"],
                  ["Remarks", "Text", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Customer Name", "Text", "Required"],
                  ["GSTN", "Text", "Optional; 15 characters"],
                  ["PAN Number", "Text", "Optional; 10 characters"],
                  ["TAN Number", "Number", "Optional"],
                  ["Email ID", "Email", "Required"],
                  ["Mobile Number", "Number", "Optional; 10 digits"],
                  ["Alternate Contact Number", "Number", "Optional"],
                  ["Registered Address", "Text Area", "Optional"],
                  ["Contact Name", "Text", "Optional"],
                  ["Customer Alias", "Text", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["Pin Code", "Number", "Optional; 6 digits"],
                  ["State Code", "Dropdown", "Optional"],
                  ["Country", "Dropdown", "Required"],
                  ["Customer From Date", "Date", "Optional"],
                  ["Customer Type", "Dropdown", "Required"],
                  ["Customer Group (Primary)", "Dropdown", "Optional"],
                  ["Customer Group (Secondary)", "Dropdown", "Optional"],
                  ["Image", "Image Upload", "Optional"],
                  ["Is this Customer a Supplier", "Checkbox", "Optional"],
                  ["Is Channel Partner", "Dropdown", "Required"],
                  ["Referred by Channel Partner", "Dropdown", "Optional"],
                  ["Payment Terms", "Text", "Optional"],
                  ["Default Email List", "Text", "Optional"],
                  ["Remarks", "Text", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
    ]
  },

  {
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
        notes: [
          "You can click the <strong>'Back'</strong> button to return to the <strong>Customer Details</strong> page",
        ]

      },
    ]
  },

  {
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
              <DynamicTable
                columns={["Required Field", "Field Type", "Field Validation"]}
                rows={[
                  ["Document Type", "Dropdown", "Mandatory"],
                  ["Document Name", "Text", "Optional"],
                  ["Document File", "File", "Optional (PDF, Image, or Doc formats supported)"],
                  ["Valid From Date", "DatePicker", "Optional"],
                  ["Valid To Date", "DatePicker", "Optional"],
                  ["Remarks", "Text", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Agreement Type", "Dropdown", "Mandatory"],
                  ["Valid Till Date", "Date Picker", "Mandatory"],
                  ["Field Name 1", "Text", "Optional"],
                  ["Field Value 1", "Text", "Optional"],
                  ["Field Name 2", "Text", "Optional"],
                  ["Field Value 2", "Text", "Optional"],
                  ["Field Name 3", "Text", "Optional"],
                  ["Field Value 3", "Text", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Task Name", "Text", "Required"],
                  ["Task Type", "Dropdown", "Required"],
                  ["Task Sub Type", "Dropdown", "Required"],
                  ["Planned Date", "Date", "Optional"],
                  ["Start Time", "Time", "Optional"],
                  ["End Time", "Time", "Optional"],
                  ["Priority", "Dropdown", "Required"],
                  ["Task Status", "Dropdown", "Required"],
                  ["Remark", "Text", "Optional"],
                  ["Task Owner", "Dropdown", "Required"],
                  ["Current User Assigned", "Dropdown", "Required"]
                ]}
              />
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
        notes: ["Task details help in tracking supplier-related actions effectively.", "You may also return to the <strong>Customer List</strong> without adding a task."],
      },
    ]
  },


  {
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
              <DynamicTable
                columns={["Field", "Type", "Validation"]}
                rows={[
                  ["Product Category", "Text", "Display only"],
                  ["Product Variation", "Text", "Display only"],
                  ["Required By Date", "Date", "Display only"],
                  ["Status", "Text", "Display only"],
                ]}
              />
            ),
          },
        ],
        notes: [
          "Data shown is read-only",
          "Linked with <strong>Customer Product Interest Data</strong>.",
        ],
      },
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Product Category", "Dropdown", "Mandatory"],
                  ["Variation Name 1", "Dropdown", "Mandatory"],
                  ["Variation Value 1", "Dropdown", "Mandatory"],
                  ["Variation Name 2", "Dropdown", "Optional"],
                  ["Variation Value 2", "Dropdown", "Optional"],
                  ["Variation Name 3", "Dropdown", "Optional"],
                  ["Variation Value 3", "Dropdown", "Optional"],
                  ["Product Info", "Text", "Optional"],
                  ["Status", "Dropdown", "Optional"],
                  ["Due Date", "Date", "Optional"]
                ]}
              />
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
        notes: [
          "This module is linked with <strong>Customer Product Interest Data</strong>.",
        ]
      },
    ]
  },
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Transaction Date", "Date", "Optional"],
                  ["Book Date", "Date", "Optional"],
                  ["Paid Amount", "Number", "Required"],
                  ["TDS Amount", "Number", "Required"],
                  ["TDS Section", "Text", "Optional"]
                ]}
              />
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
    ]
  },

  // MY PERTNER LIST
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Customer name", "Text", "Required"],
                  ["GSTN", "Text", "Optional"],
                  ["PAN number", "Text", "Optional"],
                  ["TAN number", "Number", "Optional"],
                  ["Email id", "Email", "Required"],
                  ["Mobile number", "Number", "Optional"],
                  ["Alternate contact number", "Number", "Optional"],
                  ["Registered Address", "Text", "Optional"],
                  ["Contact name", "Text", "Optional"],
                  ["Customer alias", "Text", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["Pin code", "Number", "Optional"],
                  ["State code", "Dropdown", "Optional"],
                  ["Country", "Dropdown", "Optional"],
                  ["Customer From Date", "DatePicker", "Optional"],
                  ["Customer type", "DatePicker", "Required"],
                  ["Customer Group (Primary)", "Dropdown", "Optional"],
                  ["Customer Group (Secondary)", "Dropdown", "Optional"],
                  ["Image", "File (img)", "Optional"],
                  ["Is this Customer a supplier", "Checkbox", "Optional"],
                  ["Is Channel Partner", "Dropdown", "Required"],
                  ["Referred by Channel Partner", "Dropdown", "Optional"],
                  ["Payment terms", "Text", "Optional"],
                  ["Default email list", "Text", "Optional"],
                  ["Remarks", "Textarea", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Task Name", "Text", "Required"],
                  ["Task Type", "Dropdown", "Required"],
                  ["Task Sub Type", "Dropdown", "Required"],
                  ["Planned Date", "Date", "Optional"],
                  ["Start Time", "Time", "Optional"],
                  ["End Time", "Time", "Optional"],
                  ["Priority", "Dropdown", "Required"],
                  ["Task Status", "Dropdown", "Required"],
                  ["Remark", "Text", "Optional"],
                  ["Task Owner", "Dropdown", "Required"],
                  ["Current User Assigned", "Dropdown", "Required"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Product Category", "Dropdown", "Required"],
                  ["Variation Name (1)", "Text", "Required"],
                  ["Variation Name (2)", "Text", "Optional"],
                  ["Variation Name (3)", "Text", "Optional"],
                  ["Variation Value (1)", "Text", "Required"],
                  ["Variation Value (2)", "Text", "Optional"],
                  ["Variation Value (3)", "Text", "Optional"],
                  ["Product Info", "Textarea", "Optional"],
                  ["Status", "Dropdown", "Optional"],
                  ["Due Date", "Date", "Optional"]
                ]}
              />

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
    ]
  },
  {
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Description"]}
                rows={[
                  ["Transaction Date", "Date when the transaction occurred"],
                  ["Book Date", "Date the transaction was recorded in the system"],
                  ["Paid Amount", "Amount paid to the partner"],
                  ["TDS Amount", "Tax Deducted at Source amount"],
                  ["Utilised Amount", "Amount utilised from the paid amount"],
                  ["Status", "Current state of the TDS record (e.g., Pending)"],
                  ["Action", "Update or delete the record using the available actions"]
                ]}
              />
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

    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation/Rule"]}
                rows={[
                  ["Transaction Date", "Date Picker", "Optional"],
                  ["Book Date", "Date Picker", "Optional"],
                  ["Paid Amount", "Number Input", "Required"],
                  ["TDS Amount", "Number Input", "Required"],
                  ["TDS Section", "Dropdown", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Customer name", "Text", "Required"],
                  ["GSTN", "Text", "Optional"],
                  ["PAN number", "Text", "Optional"],
                  ["TAN number", "Number", "Optional"],
                  ["Email id", "Email", "Optional"],
                  ["Mobile number", "Number", "Optional"],
                  ["Alternate contact number", "Number", "Optional"],
                  ["Registered Address", "Text", "Optional"],
                  ["Contact name", "Text", "Optional"],
                  ["Customer alias", "Text", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["Pin code", "Number", "Optional"],
                  ["State code", "Dropdown", "Optional"],
                  ["Country", "Dropdown", "Optional"],
                  ["Customer From Date", "Date Picker", "Optional"],
                  ["Customer type", "Option", "Required"],
                  ["Customer Group (Primary)", "Dropdown", "Optional"],
                  ["Customer Group (Secondary)", "Dropdown", "Optional"],
                  ["Image", "File Upload", "Optional"],
                  ["Is this Customer a supplier", "Checkbox", "Required"],
                  ["Is Channel Partner", "Option", "Optional"],
                  ["Referred by Channel Partner", "Dropdown", "Optional"],
                  ["Payment terms", "Text", "Optional"],
                  ["Default email list", "Text", "Optional"],
                  ["Remarks", "Textarea", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Contact Name", "Text", "Optional"],
                  ["Mobile Number", "Text", "Optional"],
                  ["Address Line 1", "Text", "Required"],
                  ["Address Line 2", "Text", "Optional"],
                  ["Place", "Text", "Optional"],
                  ["Pincode", "Text", "Optional"],
                  ["Country", "Dropdown", "Required"],
                  ["Alternate Contact Number", "Text", "Optional"],
                  ["GSTN Number", "Text", "Optional"],
                  ["Address Type", "Dropdown", "Required"],
                  ["Default", "Checkbox", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Contact Name", "Text", "Optional"],
                  ["Mobile Number", "Text", "Optional"],
                  ["Address Line 1", "Text", "Required"],
                  ["Address Line 2", "Text", "Optional"],
                  ["Place", "Text", "Optional"],
                  ["Pincode", "Text", "Optional"],
                  ["Country", "Dropdown", "Required"],
                  ["Alternate Contact Number", "Text", "Optional"],
                  ["GSTN Number", "Text", "Optional"],
                  ["Address Type", "Dropdown", "Required"],
                  ["Default", "Checkbox", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Required"],
                  ["Email ID", "Text", "Optional"],
                  ["Mobile Number", "Text", "Optional"],
                  ["Designation", "Text", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Required"],
                  ["Email ID", "Text", "Optional"],
                  ["Mobile Number", "Text", "Optional"],
                  ["Designation", "Text", "Optional"]
                ]}
              />
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
    ]
  },
  {
    "PartnerList (Update Bank Account)": [
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Account Number", "Text", "Required"],
                  ["Account Name", "Text", "Required"],
                  ["Account Currency", "Dropdown", "Required"],
                  ["Bank Name", "Dropdown", "Required"],
                  ["IFSC Code", "Text", "Optional"],
                  ["BIC Code", "Text", "Optional"],
                  ["Branch Address", "Text", "Optional"],
                  ["Default Account", "Checkbox", "Optional"],
                  ["Payment Terms", "Text", "Optional"],
                  ["Payment Note", "Text", "Optional"],
                  ["Invoice Note", "Text", "Optional"],
                  ["Additional Note", "Text", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Account Number", "Text", "Required"],
                  ["Account Name", "Text", "Required"],
                  ["Account Currency", "Dropdown", "Required"],
                  ["Bank Name", "Dropdown", "Required"],
                  ["IFSC Code", "Text", "Optional"],
                  ["BIC Code", "Text", "Optional"],
                  ["Branch Address", "Text", "Optional"],
                  ["Default Account", "Checkbox", "Optional"],
                  ["Payment Terms", "Text", "Optional"],
                  ["Payment Note", "Text", "Optional"],
                  ["Invoice Note", "Text", "Optional"],
                  ["Additional Note", "Text", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Owned By User", "Dropdown", "Required"],
                  ["Owned By Member/Employee", "Dropdown", "Optional"]
                ]}
              />
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
    ]
  },

  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Product Category", "Product Variation", "Required By Date", "Status", "Actions"]}
                rows={[
                  [
                    <strong>[Category]</strong>,
                    <>
                      Brand [Value] <br />
                      Size [Value] <br />
                      Colour [Value]
                    </>,
                    "[Date]",
                    <span className="status-badge">[Available | Not Available]</span>,
                    <>
                      <button className="btn btn-danger">
                        <FaTrash /> Delete
                      </button>{" "}
                      <button className="btn btn-secondary">
                        <FaEdit /> Update
                      </button>
                    </>
                  ]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Product Category", "Dropdown", "Required"],
                  ["Variation Name (1)", "Dropdown", "Required"],
                  ["Variation Value (1)", "Dropdown", "Required"],
                  ["Variation Name (2)", "Dropdown", "Optional"],
                  ["Variation Value (2)", "Dropdown", "Optional"],
                  ["Variation Name (3)", "Dropdown", "Optional"],
                  ["Variation Value (3)", "Dropdown", "Optional"],
                  ["Product Info", "Text", "Optional"],
                  ["Status", "Dropdown", "Optional"],
                  ["Due Date", "Date Picker", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={[
                  "Task Name",
                  "Task Owner / Current User",
                  "Type / Sub Type / Priority",
                  "Plan Date",
                  "Status",
                  "Action"
                ]}
                rows={[]}
              />

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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Task Name", "Text", "Required"],
                  ["Task Type", "Dropdown", "Required"],
                  ["Task Sub Type", "Dropdown", "Required"],
                  ["Planned Date", "Date Picker", "Optional"],
                  ["Start Time", "Time", "Optional"],
                  ["End Time", "Time", "Optional"],
                  ["Priority", "Dropdown", "Optional"],
                  ["Task Status", "Dropdown", "Optional"],
                  ["Remark", "Text", "Optional"],
                  ["Task Owner", "Dropdown", "Required"],
                  ["Current Assigned User", "Dropdown", "Optional"],
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Company Name", "Text", "Optional"],
                  ["Location / Region", "Dropdown", "Required"],
                  ["Status", "Dropdown", "Required"],
                  ["Contact Name", "Text", "Optional"],
                  ["Email ID", "Email", "Required"],
                  ["Mobile Number", "Number", "Required"],
                  ["Lead Opportunity Name", "Text", "Required"],
                  ["Lead Group", "Dropdown", "Optional"],
                  ["Lead Secondary Group", "Dropdown", "Optional"],
                  ["Lead Source", "Dropdown", "Required"],
                  ["Deal Size", "Number", "Required"],
                  ["Priority", "Number", "Required"],
                  ["Lead Alias", "Text", "Optional"],
                  ["Address", "Text", "Optional"],
                  ["Alternate Contact Number", "Number", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["State Code", "Options", "Optional"],
                  ["Pin Code", "Number", "Optional"],
                  ["Country", "Options", "Optional"],
                  ["PO Ref Number", "Text", "Optional"],
                  ["Payment Received", "Number", "Optional"],
                  ["Remark", "Text", "Optional"],
                  ["Image", "File (Image)", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Company Name", "Text", "Optional"],
                  ["Location/Region", "Dropdown", "Required"],
                  ["Status", "Dropdown", "Required"],
                  ["Contact Name", "Text", "Optional"],
                  ["Email ID", "Email", "Required if Mobile not filled"],
                  ["Mobile Number", "Number", "Required if Email not filled"],
                  ["Lead Opportunity Name", "Text", "Required"],
                  ["Lead Group", "Dropdown", "Optional"],
                  ["Lead Secondary Group", "Dropdown", "Optional"],
                  ["Lead Source", "Dropdown", "Required"],
                  ["Deal Size", "Number", "Required"],
                  ["Priority", "Number", "Required"],
                  ["Lead Alias", "Text", "Optional"],
                  ["Address", "Text", "Optional"],
                  ["Alternate Contact Number", "Number", "Optional"],
                  ["City Name", "Text", "Optional"],
                  ["State Code", "Dropdown", "Optional"],
                  ["Pin Code", "Number", "Optional"],
                  ["Country", "Dropdown", "Optional"],
                  ["Remark", "Text", "Optional"],
                  ["Image", "File Upload (Image)", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Description", "Input Type", "Validation"]}
                rows={[
                  ["Lead Status", "Status of the lead at each update stage", "Text", "Read-only"],
                  ["Status Date / Created Date", "Date the status was recorded", "Date", "Read-only"],
                  ["Days to Complete", "Time duration from previous status to current", "Number", "Read-only"],
                  ["Remarks", "Any additional notes added during status update", "Text", "Read-only"],
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Task Name", "Text", "Required"],
                  ["Task Type", "Dropdown", "Required"],
                  ["Task Sub Type", "Dropdown", "Required"],
                  ["Planned Date", "Date Picker", "Optional"],
                  ["Start Time", "Time Picker", "Optional"],
                  ["End Time", "Time Picker", "Optional"],
                  ["Priority", "Dropdown", "Required"],
                  ["Task Status", "Dropdown", "Required"],
                  ["Remark", "Text Area", "Optional"],
                  ["Task Owner", "Dropdown", "Required"],
                  ["Current User Assigned", "Dropdown", "Optional"],
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Contact Name", "Text", "Required"],
                  ["Designation", "Text", "Optional"],
                  ["Contact Type", "Dropdown", "Required"],
                  ["Mobile Number", "Numeric", "Optional"],
                  ["Email ID", "Email", "Optional"],
                ]}
              />
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
    ]
  },

  {
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
    ]
  },
  // AMC
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Item Serial Number", "Number", "Required"],
                  ["Warranty From Date", "Date", "Optional"],
                  ["Warranty To Date", "Date", "Required"],
                  ["Warranty Status", "Dropdown", "Optional"],
                  ["Original Invoice Number", "Number", "Required"],
                  ["Invoice Date", "Date", "Required"],
                  ["Customer Name", "Text", "Required"],
                  ["Email ID", "Email", "Optional"],
                  ["Mobile Number", "Number", "Required"],
                  ["Customer Address", "Text", "Optional"],
                  ["Remarks", "Text", "Optional"],
                  ["Warranty Period", "Number", "Required"],
                  ["Warranty Period Unit", "Dropdown", "Required"],
                  ["AMC Reminder (in Days)", "Number", "Required"],
                  ["Product Name", "Text", "Optional"],
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Item Serial Number", "Text", "Required"],
                  ["Warranty From Date", "Date", "Optional"],
                  ["Warranty To Date", "Date", "Required"],
                  ["Warranty Status", "Dropdown", "Optional"],
                  ["Original Invoice Number", "Number", "Required"],
                  ["Invoice Date", "Date", "Required"],
                  ["Customer Name", "Text", "Required"],
                  ["Email ID", "Email", "Optional"],
                  ["Mobile Number", "Number", "Required"],
                  ["Customer Address", "Text", "Optional"],
                  ["Remarks", "Text", "Optional"],
                  ["Warranty Period", "Number", "Required"],
                  ["Warranty Period Unit", "Dropdown", "Required"],
                  ["AMC Reminder (in Days)", "Number", "Required"],
                  ["Product Name", "Text", "Optional"],
                ]}
              />
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
    ]
  },

  // GEM
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Input Type", "Validation"]}
                rows={[
                  ["Product Name", "Text", "Required"],
                  ["Product Type", "Dropdown", "Required"],
                  ["Required Qty (Nos)", "Number", "Optional"],
                  ["Tender ID", "Number", "Required"],
                  ["Status", "Dropdown", "Required"],
                  ["Created Date", "Date Picker", "Required"],
                  ["End Date", "Date Picker", "Required"],
                  ["Tender Source by Company", "Text", "Required"],
                  ["Email ID", "Email", "Optional"],
                  ["Mobile Number", "Number", "Optional"],
                  ["Address Line 1", "Textarea", "Optional"],
                  ["Contact Name", "Text", "Optional"],
                  ["Address Line 2", "Textarea", "Optional"],
                  ["Warranty Details", "Date", "Optional"],
                  ["Subject", "Textarea", "Optional"],
                  ["Tender File", "File", "Optional"],
                  ["Is Applied for Tender", "Checkbox", "Optional"],
                  ["Channel Partner", "Dropdown", "Optional"],
                  ["Lead/Partner Name", "Text", "Optional"],
                  ["Quotation Number", "Number", "Optional"],
                  ["Quotation Amount (INR)", "Number", "Optional"],
                  ["Post Status", "Dropdown", "Optional"],
                  ["Reason for Not Applying", "Textarea", "Optional"],
                  ["Success/Failure Reason", "Text", "Optional"],
                  ["Remarks", "Textarea", "Optional"]
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Product Name", "Text", "Required"],
                  ["Product Type", "Dropdown", "Required"],
                  ["Required Qty (Nos)", "Number", "Optional"],
                  ["Tender ID", "Number", "Required"],
                  ["Status", "Dropdown", "Required"],
                  ["Created Date", "Date Picker", "Required"],
                  ["End Date", "Date Picker", "Required"],
                  ["Tender Source by Company", "Text", "Required"],
                  ["Email ID", "Email", "Optional"],
                  ["Mobile Number", "Number", "Optional"],
                  ["Address Line 1", "Textarea", "Optional"],
                  ["Contact Name", "Text", "Optional"],
                  ["Address Line 2", "Textarea", "Optional"],
                  ["Warranty Details", "Date", "Optional"],
                  ["Subject", "Textarea", "Optional"],
                  ["Tender File", "File Upload", "Optional"],
                  ["Is Applied for Tender", "Checkbox", "Optional"],
                  ["Channel Partner", "Dropdown", "Optional"],
                  ["Lead/Partner Name", "Text", "Optional"],
                  ["Quotation Number", "Number", "Optional"],
                  ["Quotation Amount (INR)", "Number", "Optional"],
                  ["Post Status", "Dropdown", "Optional"],
                  ["Reason for Not Applying", "Textarea", "Optional"],
                  ["Success/Failure Reason", "Text", "Optional"],
                  ["Remarks", "Textarea", "Optional"]
                ]}
              />
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
    ]
  },

  // Customer Mail Compaign
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Campaign Name", "Text", "Required"],
                  ["Customer/Lead Group", "Dropdown", "Required"],
                  ["Start Date", "Date Picker", "Optional"],
                  ["End Date", "Date Picker", "Optional"],
                  ["Customer/Lead Sub Group", "Dropdown", "Optional"],
                  ["Subject", "Textarea", "Optional"],
                  ["Message Text", "Textarea", "Optional"],
                  ["Msg Image File", "Image File", "Optional"],
                  ["Send Message Mode", "Dropdown", "Required"],
                  ["Is Response Enabled", "Checkbox", "Optional"],
                  ["Customer Hello String", "Text", "Optional"],
                  ["Response Yes Button Text", "Text", "Optional"],
                  ["Response No Button Text", "Text", "Optional"],
                  ["Footer Note", "Textarea", "Optional"],
                  ["Select a Campaign Template", "Checkbox", "Optional"],
                  ["Generated PDF File", "File Upload", "Optional"],
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Campaign Name", "Text", "Required"],
                  ["Customer/Lead Group", "Dropdown", "Required"],
                  ["Start Date", "Date Picker", "Optional"],
                  ["End Date", "Date Picker", "Optional"],
                  ["Customer/Lead Sub Group", "Dropdown", "Optional"],
                  ["Subject", "Textarea", "Optional"],
                  ["Message Text", "Textarea", "Optional"],
                  ["Msg Image File", "Image File", "Optional"],
                  ["Send Message Mode", "Dropdown", "Required"],
                  ["Is Response Enabled", "Checkbox", "Optional"],
                  ["Customer Hello String", "Text", "Optional"],
                  ["Response Yes Button Text", "Text", "Optional"],
                  ["Response No Button Text", "Text", "Optional"],
                  ["Footer Note", "Textarea", "Optional"],
                  ["Select a Campaign Template", "Checkbox", "Optional"],
                  ["Generated PDF File", "File Upload", "Optional"],
                ]}
              />
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
    ]
  },

  // CRM SETUP
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]}
              />

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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]}
              />
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
    ]
  },

  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]}
              />
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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]}
              />
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
    ]
  },


  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]}
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]}
              />

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
    ]
  },
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]}
              />

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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Group Type", "Dropdown", "Mandatory"],
                  ["Image", "File Upload", "Optional"],
                ]
                }
              />
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
    ]
  },
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Custom Template File", "File Upload", "Mandatory"],
                  ["Background Image", "File Upload", "Optional"],
                  ["Background Colour", "Text", "Optional"],
                  ["Is header", "Checkbox", "Optional"],
                  ["Is footer", "Checkbox", "Optional"],
                  ["Message body", "Dropdown", "Optional"],
                  ["Use system template", "Checkbox", "Optional"],
                  ["Is voting enabled", "Checkbox", "Optional"],
                  ["Image", "File Upload", "Optional"],
                ]
                }
              />

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
    ]
  },

  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["Custom Template File", "File Upload", "Mandatory"],
                  ["Background Image", "File Upload", "Optional"],
                  ["Background Colour", "Text", "Optional"],
                  ["Is header", "Checkbox", "Optional"],
                  ["Is footer", "Checkbox", "Optional"],
                  ["Message body", "Dropdown", "Optional"],
                  ["Use system template", "Checkbox", "Optional"],
                  ["Is voting enabled", "Checkbox", "Optional"],
                  ["Image", "File Upload", "Optional"],
                ]
                }
              />
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
    ]
  },
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["E Type", "Dropdown", "Mandatory"],
                  ["Parent category", "Dropdown", "Optional"],
                  ["Image", "File Upload", "Mandatory"],
                ]
                }
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["E Type", "Dropdown", "Mandatory"],
                  ["Parent category", "Dropdown", "Optional"],
                  ["Image", "File Upload", "Optional"],
                ]
                }
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Sla days limit", "Text", "Mandatory"],
                  ["Notify days", "Text", "Mandatory"],
                  ["Next level emp", "Dropdown", "Optional"],
                  ["Image", "File Upload", "Mandatory"],
                  ["Default emp", "Dropdown", "Optional"],
                  ["Escalation manager", "Dropdown", "Optional"],
                  ["Default user", "Dropdown", "Optional"],
                ]
                }
              />
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
    ]
  },
  {
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["E type", "Dropdown", "Mandatory"],
                  ["Parent category", "Dropdown", "Optional"],
                  ["Image", "File Upload", "Mandatory"],
                ]
                }
              />
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
    ]
  },
  {
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
              <DynamicTable
                columns={["Field Name", "Type", "Validation"]}
                rows={[
                  ["Name", "Text", "Mandatory"],
                  ["E type", "Dropdown", "Mandatory"],
                  ["Parent category", "Dropdown", "Optional"],
                  ["Image", "File Upload", "Mandatory"],
                ]
                }
              />
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
    ]
  },
]