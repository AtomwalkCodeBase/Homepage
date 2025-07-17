import {
    FaCheckCircle,
    FaRoute,
    FaChartLine,
    FaChartBar,
    FaUpload,
    FaRegAddressBook,
    FaChartPie,
    FaFileExport,
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

export const ProjectManualStep = [
    {
        "Add Product Category": [
            {
                title: "Navigate to Add Product Category",
                description: "Follow this path to create a new product category in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Choose <strong>'Products and Processes'</strong>",
                            "Click on <strong>'Product Setup'</strong>",
                            "Click on <strong>'Product Category'</strong>",
                            "Click on <strong>'Add Product Category'</strong>"
                        ]
                    }
                ],
                notes: [
                    "Ensure you have access to the <strong>Product Setup</strong> module.",
                    "This opens the form for creating a new product category."
                ]
            },
            {
                title: "Enter Product Category Information",
                description: "Fill in the following form fields to define the product category:",
                sections: [
                    {
                        title: "Product Category Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Mandatory"],
                                    ["HSN SAC Code", "Text", "Optional"],
                                    ["GST Applicable", "Dropdown", "Mandatory"],
                                    ["Tax Rate Effective From", "Date", "Optional"],
                                    ["Tax Rate", "Number", "Mandatory"],
                                    ["Cess Rate", "Number", "Mandatory"],
                                    ["Applicable TDS Rate for Service", "Dropdown", "Optional"],
                                    ["Discount Applicable", "Dropdown", "Mandatory"],
                                    ["Currency", "Dropdown", "Mandatory"],
                                    ["Currency Symbol", "Dropdown", "Mandatory"],
                                    ["Category Alias", "Text", "Optional"],
                                    ["Sales Ledger", "Dropdown", "Optional"],
                                    ["Create Recurring Invoice?", "Checkbox", "Optional"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Name</strong>, <strong>GST Applicable</strong>, <strong>Tax Rate</strong>, <strong>Cess Rate</strong>, <strong>Discount Applicable</strong>, <strong>Currency</strong>, <strong>Currency Symbol</strong>, and <strong>Image</strong> are mandatory.",
                    "<strong>Create Recurring Invoice?</strong> - Select this if recurring invoice generation is required based on product-level frequency."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the new product category:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the product category.",
                            "On successful submission, you will be redirected to the <strong>Product Category List</strong>."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit without saving the product category:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "You may cancel before submission.",
                            "Click the <strong>'Product Category List'</strong> button to return to the category listing screen."
                        ]
                    }
                ],
                notes: [
                    "Unsaved changes will be lost if you cancel.",
                    "No confirmation popup is shown before cancelling."
                ]
            }, {
                title: "Export and Upload Options",
                description: "This feature allows users to both upload new templates into the system and download existing campaign template data for reporting or backup purposes.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click on the <strong>Upload</strong> button to import a new campaign template into the system.",
                            "Accepted file format: <strong>.XLS</strong> (Excel spreadsheet).",
                            "Ensure that the file matches the system's predefined template format."
                        ],
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click on the <strong>Export</strong> button to download existing campaign template data.",
                            "The exported file will be in <strong>.XLS</strong> format.",
                            "This exported data can be used for reporting, backup, or external analysis."
                        ],
                    },
                ],
                notes: [
                    "Download (Export) is useful for reviewing or modifying campaign templates externally."
                ],
            }

        ]
    },
    {
        "Add Coupon Code": [
            {
                title: "Navigate to Add Coupon Code",
                description: "Follow this path to create a new coupon code in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Products and Processes'</strong>",
                            "Navigate to <strong>'Product Setup'</strong>",
                            "Click on <strong>'Coupon Code'</strong>",
                            "Click on <strong>'Add Coupon Code'</strong>"
                        ]
                    }
                ],
                notes: [
                    "Ensure you have appropriate access to the <strong>Product Setup</strong> module.",
                    "This opens the form to create a new coupon code entry."
                ]
            },
            {
                title: "Enter Coupon Code Information",
                description: "Fill in the required fields to define the coupon code:",
                sections: [
                    {
                        title: "Coupon Code Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Coupon Code", "Text", "Mandatory"],
                                    ["Discount", "Number", "Mandatory"],
                                    ["Valid From", "Date (Calendar Select)", "Mandatory"],
                                    ["Valid To", "Date (Calendar Select)", "Optional"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Coupon Code</strong>, <strong>Discount</strong>, <strong>Valid From</strong>, and <strong>Image</strong> are mandatory fields."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the newly created coupon code:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the coupon code.",
                            "Upon successful submission, you will be redirected to the <strong>Coupon Code List</strong>."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the form without saving:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "You may cancel the operation before submission.",
                            "Click the <strong>'Coupon Code List'</strong> button to return to the coupon listing screen."
                        ]
                    }
                ],
                notes: [
                    "All unsaved data will be lost upon cancellation.",
                    "No confirmation popup appears when cancelling."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Users can import new coupon codes or export existing records for external use.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click on the <strong>Upload</strong> button to import a list of coupon codes.",
                            "Supported format: <strong>.XLS</strong> (Excel Spreadsheet).",
                            "Ensure that the Excel file structure matches the predefined template format."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click on the <strong>Export</strong> button to download existing coupon code data.",
                            "Exported files will be in <strong>.XLS</strong> format.",
                            "Useful for reporting, reviewing, or making bulk updates externally."
                        ]
                    }
                ],
                notes: [
                    "You can both <strong>upload</strong> new coupon codes and <strong>download</strong> existing ones.",
                    "Always use the correct template format while uploading to avoid import errors."
                ]
            },
        ]
    },
    {
        "Add Tax Rate Code": [
            {
                title: "Navigate to Add Tax Rate Code",
                description: "Follow this path to create a new tax rate code in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Products and Processes'</strong>",
                            "Navigate to <strong>'Product Setup'</strong>",
                            "Click on <strong>'Tax Rate Code'</strong>",
                            "Click on <strong>'Add Tax Rate Code'</strong>"
                        ]
                    }
                ],
                notes: [
                    "This opens the form to create or modify tax rate code definitions."
                ]
            },
            {
                title: "Enter Tax Rate Code Information",
                description: "Fill in the following fields to define the tax rate code:",
                sections: [
                    {
                        title: "Tax Rate Code Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Tax Rate Code", "Text", "Mandatory"],
                                    ["Tax Type", "Dropdown", "Mandatory"],
                                    ["Effective Date", "Date (Calendar Select)", "Optional"],
                                    ["Min Taxable Amount", "Number", "Mandatory"],
                                    ["Base Tax Rate", "Number", "Mandatory"],
                                    ["Effective Tax Rate", "Number", "Mandatory"],
                                    ["Effective From Date", "Date (Calendar Select)", "Optional"],
                                    ["Effective To Date", "Date (Calendar Select)", "Optional"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Tax Rate Code</strong>, <strong>Tax Type</strong>, <strong>Min Taxable Amount</strong>, <strong>Base Tax Rate</strong>, <strong>Effective Tax Rate</strong>, and <strong>Image</strong> are mandatory.",
                    "<strong>Tax Rate Code</strong>: Specify this at product/item/service category level.",
                    "<strong>Effective Date</strong>: Optional — defines when this rate becomes active.",
                    "<strong>Min Taxable Amount</strong>: Amount below which the tax is not applicable.",
                    "<strong>Base Tax Rate</strong>: Always applicable unless a temporary rate is specified. Not valid for slab-based setups."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "This feature supports both uploading new tax rate codes and downloading the existing list.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click on the <strong>Upload</strong> button to import tax rate codes in bulk.",
                            "Upload files must be in <strong>.XLS</strong> format.",
                            "Ensure the structure matches the system's template format."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click on the <strong>Export</strong> button to download the tax rate code list.",
                            "The export will be in <strong>.XLS</strong> format.",
                            "Use this for offline review, reporting, or modification."
                        ]
                    }
                ],
                notes: [
                    "Both <strong>Upload</strong> and <strong>Download</strong> features are supported.",
                    "Incorrect or mismatched formats will result in errors during upload."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the new tax rate code entry:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the tax rate code.",
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the form without saving changes:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click the <strong>'Tax Rate Code List'</strong> button to cancel and go back.",
                            "All unsaved changes will be lost."
                        ]
                    }
                ],
                notes: [
                    "No confirmation prompt will appear before cancelling.",
                    "Be sure to save if the data entry is complete."
                ]
            }
        ]
    },
    {
        "Add Variation Name": [
            {
                title: "Navigate to Add Variation Name",
                description: "Follow this path to create a new variation name in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Products and Processes'</strong>",
                            "Navigate to <strong>'Product Setup'</strong>",
                            "Click on <strong>'Variation Name'</strong>",
                            "Click on <strong>'Add Variation Name'</strong>"
                        ]
                    }
                ],
                notes: [
                    "Ensure that you have access to the <strong>Product Setup</strong> module.",
                    "This opens the form to define variation categories like Size, Color, etc."
                ]
            },
            {
                title: "Enter Variation Name Information",
                description: "Fill in the following fields to define the variation name and its values:",
                sections: [
                    {
                        title: "Variation Name Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Variation Name", "Text", "Mandatory"],
                                    ["Description", "Text", "Optional"],
                                    ["List of Allowed Variation Values", "Text", "Optional"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Variation Name</strong> and <strong>Image</strong> are mandatory fields.",
                    "<strong>List of Allowed Variation Values</strong>: Enter values separated by a pipe <code>|</code> character. Example: <code>S|M|L|XL</code> for Size."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "You can bulk upload variation names or export the existing list for external reference or editing.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click the <strong>Upload</strong> button to bulk import variation name records.",
                            "Only <strong>.XLS</strong> format is supported.",
                            "Ensure your file follows the standard system format for variations."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click the <strong>Export</strong> button to download the variation name list.",
                            "Data will be downloaded in <strong>.XLS</strong> format.",
                            "Useful for reviewing or updating multiple records offline."
                        ]
                    }
                ],
                notes: [
                    "<strong>Upload</strong> and <strong>Download</strong> functionalities are available.",
                    "Make sure to use the correct system template when importing data to avoid errors."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the new variation name entry:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the variation name.",
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the form without saving:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click the <strong>'Variation Name List'</strong> button to go back without saving.",
                            "Any unsaved changes will be lost."
                        ]
                    }
                ],
                notes: [
                    "There is no confirmation prompt when cancelling.",
                    "Ensure all data is saved before navigating back."
                ]
            }
        ]
    },
    {
        "Add Product": [
            {
                title: "Navigate to Add Product",
                description: "Follow this path to add a new product in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Products and Processes'</strong>",
                            "Click on <strong>'Products'</strong>",
                            "Click on <strong>'Add Product'</strong>"
                        ]
                    }
                ],
                notes: [
                    "Make sure you have access to the <strong>Products</strong> module.",
                    "This opens the form to add a new product record."
                ]
            },
            {
                title: "Enter Product Details",
                description: "Fill out the product form with necessary information:",
                sections: [
                    {
                        title: "Product Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Product Name", "Text", "Mandatory"],
                                    ["Category", "Dropdown", "Mandatory"],
                                    ["Product Code", "Text", "Mandatory"],
                                    ["Base Units", "Dropdown", "Optional"],
                                    ["Selling Price", "Number", "Optional"],
                                    ["Description", "Text", "Optional"],
                                    ["Create Inventory", "Checkbox", "Optional"],
                                    ["Is Schedule Payments Applicable", "Checkbox", "Optional"],
                                    ["Schedule Payment Frequency", "Dropdown", "Mandatory"],
                                    ["Offset Days", "Number", "Mandatory"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Product Code</strong>: Can be auto-generated from <strong>My Office</strong>.",
                    "<strong>Create Inventory</strong>: Selecting this will create an inventory item with the same name and quantity 1 (ideal for handmade items).",
                ]
            },
            {
                title: "Export and Upload Options",
                description: "You can bulk upload or export product data as needed.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click the <strong>Upload</strong> button to bulk import products.",
                            "Supported format: <strong>.XLS</strong> (Excel only).",
                            "Ensure the uploaded file follows the system template."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click the <strong>Export</strong> button to download the product list.",
                            "Data will be exported in <strong>.XLS</strong> format.",
                            "Useful for reviewing or editing product data externally."
                        ]
                    }
                ],
                notes: [
                    "Both <strong>Upload</strong> and <strong>Download</strong> are supported in this module.",
                    "Upload files must match the system’s structure to avoid errors."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the product record to the system:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the product.",
                            "You’ll be redirected to the <strong>Product List</strong> screen on successful submission."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the product form without saving changes:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Product List'</strong> to go back without saving.",
                            "Any unsaved data will be lost."
                        ]
                    }
                ],
                notes: [
                    "There is no confirmation prompt before cancellation.",
                    "Make sure to save the form if you don’t want to lose data."
                ]
            }
        ]
    },
    {
        "Add Document Type": [
            {
                title: "Navigate to Add Document Type",
                description: "Follow the path to configure new document types in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Products and Processes'</strong>",
                            "Navigate to <strong>'Product Setup'</strong>",
                            "Click on <strong>'Document Type'</strong>",
                            "Click on <strong>'Add Document Type'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Document Type Details",
                description: "Fill out the following fields to define the new document type:",
                sections: [
                    {
                        title: "Document Type Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Mandatory"],
                                    ["Document Code", "Text", "Optional"],
                                    ["Select Allowed Format", "Checkbox (Multiple)", "Mandatory"],
                                    ["Size Limit", "Number (KB)", "Mandatory (Max: 25000KB)"],
                                    ["Description", "Text", "Optional"],
                                    ["Data Fields", "Text", "Optional (Use ‘|’ as separator)"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    " Name, Allowed Format, Size Limit, and Image are mandetory field",
                    "<strong>Data Fields:</strong> Separate multiple data field names using ‘|’. Example: <code>Maths|English|Science</code>",
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Upload new document type configurations or export existing ones.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click <strong>'Upload'</strong> to import document type records in bulk.",
                            "Ensure file follows the system-approved <strong>.XLS</strong> format."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click <strong>'Export'</strong> to download the document type list.",
                            "Exported in <strong>.XLS</strong> format for review or offline management."
                        ]
                    }
                ],
                notes: [
                    "<strong>Upload and Download</strong> features are both supported.",
                    "Review field mapping carefully during uploads to avoid configuration errors."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the newly defined document type to the system:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click <strong>'Submit'</strong> to save the document type record.",
                            "You’ll be redirected to the <strong>Document Type List</strong> screen."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the process without saving the configuration:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click <strong>'Document Type List'</strong> to cancel and return to the listing view.",
                            "Any unsaved data will be discarded."
                        ]
                    }
                ],
                notes: [
                    "There is no confirmation popup on cancel.",
                    "Be sure to submit the form if you wish to retain your changes."
                ]
            }
        ]
    },

    {
        "Add Item Category": [
            {
                title: "Navigate to Add Item Category",
                description: "Follow this path to define a new item category under inventory setup:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Inventory'</strong>",
                            "Navigate to <strong>'Inventory Setup'</strong>",
                            "Click on <strong>'Item Category'</strong>",
                            "Click on <strong>'Add Item Category'</strong>"
                        ]
                    }
                ],
                notes: [
                    "Ensure you have access to the <strong>Inventory Setup</strong> module.",
                    "This opens the form to create item categories used in inventory classification."
                ]
            },
            {
                title: "Enter Item Category Details",
                description: "Fill out the fields below to define the inventory item category:",
                sections: [
                    {
                        title: "Item Category Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Mandatory"],
                                    ["HSN SAC Code", "Text", "Optional"],
                                    ["Tax Applicable", "Checkbox", "Optional"],
                                    ["Applicable Tax Rate", "Number", "Mandatory"],
                                    ["Category Alias", "Text", "Optional"],
                                    ["Is this Asset Category?", "Checkbox", "Optional"],
                                    ["Asset Group", "Dropdown", "Optional"],
                                    ["Is Asset Value Inclusive of Tax?", "Checkbox", "Optional"],
                                    ["Depreciation Calculation Method", "Dropdown", "Optional"],
                                    ["Depreciation Calculation Method (Tax)", "Dropdown", "Optional"],
                                    ["Useful Life", "Number", "Mandatory"],
                                    ["Depreciation Rate", "Number", "Mandatory"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Name</strong>, <strong>Applicable Tax Rate</strong>, <strong>Useful Life</strong>, <strong>Depreciation Rate</strong>, and <strong>Image</strong> are mandatory.",
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Allows bulk data operations on item categories.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Use the <strong>Upload</strong> button to import item categories in bulk.",
                            "Only <strong>.XLS</strong> file format is supported.",
                            "Ensure your file matches the system-defined format."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Use the <strong>Export</strong> button to download the list of item categories.",
                            "The exported data will be in <strong>.XLS</strong> format.",
                            "Useful for offline review or reporting."
                        ]
                    }
                ],
                notes: [
                    "<strong>Upload</strong> and <strong>Download</strong> options are supported.",
                    "Validate data before upload to avoid errors."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save your changes:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the new item category.",
                            "You will be redirected to the <strong>Item Category List</strong> page on success."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit without saving:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Item Category List'</strong> to go back without saving.",
                            "All unsaved changes will be discarded."
                        ]
                    }
                ],
                notes: [
                    "No confirmation prompt appears on cancel.",
                    "Ensure to save your data before exiting."
                ]
            }
        ]
    },

    {
        "Add Location Code": [
            {
                title: "Navigate to Add Location Code",
                description: "Follow this path to create a new location code under inventory setup:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Inventory'</strong>",
                            "Navigate to <strong>'Inventory Setup'</strong>",
                            "Click on <strong>'Location Code'</strong>",
                            "Click on <strong>'Add Location Code'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Location Code Information",
                description: "Fill out the following fields to create a new location code:",
                sections: [
                    {
                        title: "Location Code Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Mandatory"],
                                    ["Contact Details", "Number", "Optional"],
                                    ["Address Line 1", "Text", "Optional"],
                                    ["Address Line 2", "Text", "Optional"],
                                    ["Location Alias", "Text", "Optional"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Name</strong> and <strong>Image</strong> are mandatory fields.",
                    "You can use the alias to provide a short label or internal code for the location."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Enables bulk upload and export of location code records.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click the <strong>Upload</strong> button to import multiple location records.",
                            "Only <strong>.XLS</strong> format is supported.",
                            "Ensure the file format matches the system template."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click the <strong>Export</strong> button to download existing location code records.",
                            "The download will be in <strong>.XLS</strong> format for offline use."
                        ]
                    }
                ],
                notes: [
                    "<strong>Upload</strong> and <strong>Download</strong> are supported for this module.",
                    "Make sure uploaded files are validated before submission to avoid errors."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the newly entered location code details:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the new location code.",
                            "You will be redirected to the <strong>Location Code List</strong> after successful submission."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the form without saving changes:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click the <strong>'Location Code List'</strong> button to cancel and return to the listing.",
                            "Unsaved data will be discarded."
                        ]
                    }
                ],
                notes: [
                    "No confirmation popup appears before cancelling the form.",
                    "Ensure to save before exiting if you’ve entered any data."
                ]
            }
        ]
    },

    {
        "Add Equipments": [
            {
                title: "Navigate to Add Equipments",
                description: "Follow this path to configure a new equipment entry for scheduling and tracking:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'My Office'</strong>",
                            "Navigate to <strong>'Office Setup'</strong>",
                            "Click on <strong>'Equipments'</strong>",
                            "Click on <strong>'Add Equipments'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Equipment Details",
                description: "Fill in the following details to define the equipment and its availability:",
                sections: [
                    {
                        title: "Equipment Setup Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Name", "Text", "Mandatory"],
                                    ["Equipment Type", "Text", "Mandatory"],
                                    ["Equipment Usage Unit", "Dropdown", "Mandatory"],
                                    ["Minimum Usage Period", "Number", "Mandatory"],
                                    ["Maximum Usage Period", "Number", "Mandatory"],
                                    ["Booking Open Day of Week", "Dropdown", "Mandatory"],
                                    ["Booking Start Time", "Time Picker", "Mandatory"],
                                    ["Number of Slots", "Number", "Mandatory"],
                                    ["Slot Start Time", "Time Picker", "Mandatory"],
                                    ["Non-Uniform Slot Details", "Text", "Optional"],
                                    ["Max Slots per Week", "Number", "Mandatory"],
                                    ["Cut Off Day of Week", "Dropdown", "Mandatory"],
                                    ["Cut Off Time", "Time Picker", "Mandatory"],
                                    ["Restricted Users", "Dropdown", "Optional"],
                                    ["Email List", "Text", "Optional"],
                                    ["Cost Unit", "Dropdown", "Optional"],
                                    ["Costing Rate", "Number", "Mandatory"],
                                    ["Image", "File Upload", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Usage Period:</strong> Values are based on the selected usage unit (e.g., minutes, hours).",
                    "<strong>Non-uniform Slots:</strong> Separate time entries using <code>-</code>. Example: <code>9:00-10:15-12:00</code>",
                    "<strong>Max Slots Per Week:</strong> This restriction does not apply to Admin & Manager profiles."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Manage equipment data efficiently through import/export features:",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click <strong>Upload</strong> to bulk import equipment setup data.",
                            "Supported file format is <strong>.XLS</strong>.",
                            "Ensure adherence to the system-defined format before uploading."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Use <strong>Export</strong> to download existing equipment setup data.",
                            "Exported format is <strong>.XLS</strong>.",
                            "Useful for reporting and bulk editing."
                        ]
                    }
                ],
                notes: [
                    "<strong>Upload</strong> and <strong>Download</strong> capabilities are available.",
                    "File format compliance is mandatory for successful upload."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the entered equipment setup information:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click <strong>'Submit'</strong> to save the equipment setup.",
                            "On successful save, you will be redirected to the <strong>Equipments List</strong> page."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Cancel the operation and return to the equipment listing screen:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click <strong>'Equipments List'</strong> to return without saving.",
                            "All unsaved data will be lost."
                        ]
                    }
                ],
                notes: [
                    "There is no confirmation prompt on cancellation.",
                    "Ensure data is submitted if you want to retain it."
                ]
            }
        ]
    },
    {
        "Book Equipment": [
            {
                title: "Navigate to Book Equipment",
                description: "Follow the path to book equipment under project operations:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Projects'</strong>",
                            "Navigate to <strong>'Equipment Booked List'</strong>",
                            "Click on <strong>'Book Equipment'</strong>",
                            "Choose the desired equipment to book"
                        ]
                    }
                ],
                notes: [
                    "This module allows users to book equipment for specific time slots as part of project tasks or operations."
                ]
            },
            {
                title: "Enter Booking Information",
                description: "Fill in the following details to complete an equipment booking:",
                sections: [
                    {
                        title: "Booking Form Fields",
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
                                        <TableRow><TableCell><strong>Booking Date</strong></TableCell><TableCell>Date Picker</TableCell><TableCell>Mandatory</TableCell></TableRow>
                                        <TableRow><TableCell><strong>Time From</strong></TableCell><TableCell>Time Picker</TableCell><TableCell>Mandatory</TableCell></TableRow>
                                        <TableRow><TableCell><strong>Time To</strong></TableCell><TableCell>Time Picker</TableCell><TableCell>Mandatory</TableCell></TableRow>
                                        <TableRow><TableCell><strong>Remarks</strong></TableCell><TableCell>Text</TableCell><TableCell>Optional</TableCell></TableRow>
                                    </tbody>
                                </Table>
                            </TableContainer>
                        )
                    }
                ],
                notes: [
                    "<strong>Booking Date</strong>, <strong>Time From</strong>, and <strong>Time To</strong> are mandatory fields.",
                    "Remarks can be used to describe the purpose of the booking or additional notes for internal reference.",
                    "Ensure no overlapping bookings exist for the same equipment."
                ]
            },
            {
                title: "Export Option",
                description: "Download equipment booking data for reporting or analysis.",
                sections: [
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click on <strong>'Export'</strong> to download the booking list.",
                            "The data will be exported in <strong>.XLS</strong> format.",
                            "Useful for tracking booking history or sharing offline records."
                        ]
                    }
                ],
                notes: [
                    "<strong>Only Download</strong> is supported in this module.",
                    "Ensure your date filters are set correctly to extract relevant booking records."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Complete the equipment booking process:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click <strong>'Submit'</strong> to confirm the booking.",
                            "You will be redirected to the <strong>Equipment Booked List</strong> page."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the form without saving the booking:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click <strong>'Equipment Booked List'</strong> to return without saving.",
                            "All entered data will be lost if not submitted."
                        ]
                    }
                ],
                notes: [
                    "No confirmation popup is shown before canceling the booking process.",
                    "Be sure to submit if you want the booking to be saved."
                ]
            }
        ]
    },

    {
        "Add Project": [
            {
                title: "Navigate to Add Project",
                description: "Use the following path to create a new project or work order in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Projects'</strong>",
                            "Click on <strong>'My Projects'</strong>",
                            "Click on <strong>'Add Project'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Project Details",
                description: "Fill out the fields below to define a new project or work order:",
                sections: [
                    {
                        title: "Project Entry Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Project Code", "Text", "Mandatory (Auto-generated if configured)"],
                                    ["Title", "Text", "Mandatory"],
                                    ["Project Manager", "Dropdown", "Mandatory"],
                                    ["Reference Order ID", "Dropdown", "Optional"],
                                    ["Order Item", "Dropdown", "Optional"],
                                    ["Project Setup Template", "Dropdown", "Optional"],
                                    ["Customer", "Dropdown", "Optional"],
                                    ["Project Revenue", "Number", "Optional"],
                                    ["Project Type", "Dropdown", "Mandatory"],
                                    ["Start Date", "Date Picker", "Optional"],
                                    ["Is this an Internal Project?", "Checkbox", "Optional"],
                                    ["Project Description", "Text", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Project Code</strong>, <strong>Title</strong>, <strong>Project Manager</strong>, and <strong>Project Type</strong> are mandatory fields.",
                    "<strong>Project Code</strong> can be auto-generated via <code>My Office</code> if configured.",
                ]
            },
            {
                title: "Download Option",
                description: "The project list can be exported for reporting and analysis:",
                sections: [
                    {
                        title: "Data Export",
                        icon: <FaFileExport />,
                        items: [
                            "Click <strong>'Export'</strong> to download the project list in <strong>.XLS</strong> format.",
                            "Useful for auditing, client reporting, or offline access."
                        ]
                    }
                ],
                notes: [
                    "Only <strong>Download</strong> option is available in this module",
                    "Ensure your exported records are kept secure if they include client-sensitive data."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the newly created project to the system:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click <strong>'Submit'</strong> to save the project record.",
                            "You will be redirected to the <strong>Project List</strong> upon successful creation."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Discard the new project creation process:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Project List'</strong> to cancel and return without saving.",
                            "Unsaved entries will not be stored."
                        ]
                    }
                ],
                notes: [
                    "There is no confirmation popup on cancel.",
                    "Double-check your input before leaving the screen."
                ]
            }
        ]
    },
    {
        "Add Docket": [
            {
                title: "Navigate to Add Docket",
                description: "Use the following path to create and manage a new project docket:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Projects'</strong>",
                            "Click on <strong>'Project Dockets'</strong>",
                            "Click on <strong>'Add Docket'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Docket Details",
                description: "Start by filling the main docket reference information:",
                sections: [
                    {
                        title: "Docket Detail Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Docket Ref Number", "Text", "Mandatory"],
                                    ["Docket Type", "Dropdown", "Mandatory"],
                                    ["Next Step Due Date", "Date Picker", "Mandatory"],
                                    ["Status", "Dropdown", "Mandatory"],
                                    ["Customer", "Dropdown", "Mandatory"],
                                    ["Customer Reference", "Text", "Optional"],
                                    ["Country", "Dropdown", "Mandatory"],
                                    ["Docket Manager", "Dropdown", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ]
            },
            {
                title: "Enter Docket Activities",
                description: "Add detailed activity records linked to this docket:",
                sections: [
                    {
                        title: "Docket Activity Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["File Date", "Date Picker", "Optional"],
                                    ["Patent Application Number", "Text", "Optional"],
                                    ["Additional Reference Number", "Text", "Optional"],
                                    ["Registration Date", "Date Picker", "Optional"],
                                    ["Registration Reference Number", "Text", "Optional"],
                                    ["Priority Application Number", "Text", "Optional"],
                                    ["Priority Date", "Date Picker", "Optional"],
                                    ["Reminder Period (days)", "Number", "Optional"],
                                    ["Include in Task Calendar", "Checkbox", "Optional"],
                                    ["Enabled for AutoTrack", "Checkbox", "Optional"],
                                    ["Remarks", "Text", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "All mandatory fields should be filled accurately for proper docket processing.",
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the screen without saving data:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Docket List'</strong> to navigate back to the docket overview.",
                            "Any unsaved information will be lost upon cancellation."
                        ]
                    }
                ],
                notes: [
                    "Please ensure form data is complete before submission."
                ]
            }
        ]
    },
    {
        "Add Project Alerts": [
            {
                title: "Navigate to Add Project Alerts",
                description: "Follow the path below to add a new project alert for tracking deadlines and actions:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Projects'</strong>",
                            "Click on <strong>'Project Alerts'</strong>",
                            "Click on <strong>'Add Project Alerts'</strong>",
                            "Select <strong>'Project for Alerts'</strong>"
                        ]
                    }
                ],
                notes: [
                    "Project Alerts help you schedule and track important deadlines or events related to projects.",
                    "You can optionally include alerts in your task calendar or mark them as master records."
                ]
            },
            {
                title: "Enter Project Alert Details",
                description: "Fill in the required and optional fields to create the alert:",
                sections: [
                    {
                        title: "Project Alert Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["My Reference", "Text", "Mandatory"],
                                    ["Customer Reference", "Text", "Optional"],
                                    ["IPO Application Number", "Number", "Mandatory"],
                                    ["Additional Reference", "Text", "Optional"],
                                    ["Next Step Due Date", "Date Picker", "Mandatory"],
                                    ["Reminder Period (days)", "Number", "Mandatory"],
                                    ["Include this Alert in Task Calendar?", "Checkbox", "Optional"],
                                    ["Is this Master/Origin record?", "Checkbox", "Optional"],
                                    ["Master Ref ID", "Dropdown", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>My Reference</strong>, <strong>IPO Application Number</strong>, <strong>Next Step Due Date</strong>, and <strong>Reminder Period</strong> are mandatory.",
                ]
            },
            {
                title: "Download Options",
                description: "You can export the list of created alerts for external reference or audit:",
                sections: [
                    {
                        title: "Export Data",
                        icon: <FaFileExport />,
                        items: [
                            "Click on <strong>'Download'</strong> to export the alert list in <strong>.XLS</strong> format.",
                            "Useful for tracking deadlines, bulk review, or compliance."
                        ]
                    }
                ],

            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the screen without saving the alert:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click <strong>'Project Detail'</strong> to return without saving.",
                            "Unsaved changes will be lost."
                        ]
                    }
                ]
            }
        ]
    },

    {
        "New Folder": [
            {
                title: "Navigate to Create New Folder",
                description: "Follow the path to create a new folder within Document Management:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Projects'</strong>",
                            "Navigate to <strong>'Document Management'</strong>",
                            "Click on <strong>'New Folder'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Folder Details",
                description: "Fill in the following information to create a new folder structure:",
                sections: [
                    {
                        title: "New Folder Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Folder Name", "Text", "Mandatory"],
                                    ["Sub Folder Level 1", "Text", "Optional"],
                                    ["Sub Folder Level 2", "Text", "Optional"],
                                    ["Sub Folder Level 3", "Text", "Optional"],
                                    ["Customer", "Dropdown", "Optional (Mandatory only if customer-linked)"],
                                    ["Size Limit (KB)", "Number", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Folder Name</strong> is a mandatory field.",
                    "Select a <strong>Customer</strong> only if this folder is associated with a specific client.",
                ]
            },
            {
                title: "Upload",
                description: "Support is provided to bulk upload activity records into the system:",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click the <strong>'Upload'</strong> button to import multiple activities at once.",
                            "Use only the system-provided <strong>.XLS</strong> template to avoid format mismatches.",
                            "All mandatory fields must be filled in the upload file."
                        ]
                    }
                ],
                notes: [
                    "Only <strong>upload</strong> functionality is supported in the Add Activity screen.",
                    "Ensure <strong>Activity ID</strong> is not duplicated during bulk import to avoid errors."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Create the new folder and save it in the system:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click <strong>'Submit'</strong> to create the folder.",
                            "You’ll be redirected to the <strong>Manage Documents</strong> screen."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Cancel the operation and return to the folder listing view:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Manage Documents'</strong> to return without saving.",
                            "Unsaved folder structure will be discarded."
                        ]
                    }
                ],
                notes: [
                    "No confirmation prompt is shown before canceling.",
                    "If folder structure is important, ensure to submit before navigating back."
                ]
            }
        ]
    },
    {
        "Add Activity": [
            {
                title: "Navigate to Add Activity",
                description: "Use the following path to configure and add a new activity under process setup:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Products and Processes'</strong>",
                            "Navigate to <strong>'Process Activities'</strong>",
                            "Click on <strong>'Add Activity'</strong>",
                            "Select <strong>'Activity Detail'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Activity Details",
                description: "Fill in the required information to define a new activity:",
                sections: [
                    {
                        title: "Activity Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Category", "Dropdown", "Optional"],
                                    ["Name", "Text", "Mandatory"],
                                    ["Activity ID", "Text", "Optional (Auto-generated)"],
                                    ["Activity Type", "Dropdown", "Optional"],
                                    ["Activity Closure", "Dropdown", "Optional (Not applicable if open-ended)"],
                                    ["Review Required", "Checkbox", "Optional"],
                                    ["User Group", "Dropdown", "Optional"],
                                    ["Planned Duration", "Number", "Optional (Not applicable if open-ended)"],
                                    ["Activity Colour", "Dropdown (Color picker)", "Optional"],
                                    ["Description", "Text", "Mandatory"],
                                    ["Image", "File Upload", "Optional"],
                                    ["Is Open Ended Activity", "Checkbox", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Activity ID</strong> is auto-generated via <code>My Office </code> if left blank.",
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Support for bulk import/export of activity records is enabled:",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click <strong>'Upload'</strong> to bulk import activities using a valid <strong>.XLS</strong> template.",
                            "Ensure your Excel file follows the defined column structure."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click <strong>'Export'</strong> to download the current activity list in <strong>.XLS</strong> format.",
                            "Useful for bulk updates, reviews, and offline planning."
                        ]
                    }
                ],
                notes: [
                    "Both <strong>Upload</strong> and <strong>Download</strong> options are supported in the activity module.",
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the newly created activity to the system:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the activity.",
                            "Upon successful submission, the user is redirected to the <strong>Activity List</strong> page."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Cancel the operation and discard any unsaved activity data:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click <strong>'Activity List'</strong> to exit without saving.",
                            "All unsaved data will be lost."
                        ]
                    }
                ],
                notes: [
                    "There is no confirmation popup when canceling.",
                    "Submit your form if you want to retain changes."
                ]
            }
        ]
    },
    {
        "Add Process Template": [
            {
                title: "Navigate to Add Process Template",
                description: "Follow this path to create a new process template in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Products and Processes'</strong>",
                            "Navigate to <strong>'Process Templates'</strong>",
                            "Click on <strong>'Add Process'</strong>"
                        ]
                    }
                ],

            },
            {
                title: "Enter Process Template Details",
                description: "Fill out the necessary details to define a new process:",
                sections: [
                    {
                        title: "Process Template Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Process Category", "Dropdown", "Optional"],
                                    ["Process Type", "Dropdown", "Optional"],
                                    ["Process ID", "Text", "Optional (Auto-generated)"],
                                    ["Process Name", "Text", "Mandatory"],
                                    ["Process Alias", "Text", "Optional"],
                                    ["Equivalent Sale Price", "Number", "Optional (Required for Non-Manufacturing)"],
                                    ["Process Description", "Text", "Mandatory"],
                                    ["Image", "File Upload", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "<strong>Process Name</strong> and <strong>Process Description</strong> are mandatory fields.",
                    "<strong>Process ID</strong> is typically auto-generated via <code>My Office</code>.",
                    "<strong>Equivalent Sale Price</strong> is required for projects involving non-manufacturing process types (per 100 units)."
                ]
            },
            {
                title: "Upload and Download Options",
                description: "Supports both uploading process templates in bulk and exporting current templates:",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click <strong>'Upload'</strong> to import multiple process templates using a structured <strong>.XLS</strong> format.",
                            "Ensure that all mandatory fields are filled in the upload file."
                        ]
                    },
                    {
                        title: "Data Export",
                        icon: <FaFileExport />,
                        items: [
                            "Click <strong>'Export'</strong> to download existing process templates in <strong>.XLS</strong> format.",
                            "Useful for reporting, review, and offline editing."
                        ]
                    }
                ],
                notes: [
                    "Make sure your upload matches the predefined format to avoid import errors.",
                    "Both upload and download are supported in the process template section."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the new process template entry:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click <strong>'Submit'</strong> to save the process template.",
                            "On success, the user is redirected to the <strong>Process List</strong> screen."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the screen without saving the new process:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Process List'</strong> to return to the listing.",
                            "Any unsaved changes will be discarded."
                        ]
                    }
                ],
                notes: [
                    "No confirmation alert appears before cancellation.",
                    "Use this option only if you are certain you do not want to save the form."
                ]
            }
        ]
    },

    {
        "My Activity Dashboard": [
            {
                title: "Navigate to My Activity Dashboard",
                description: "View and track all assigned project activities and reviews:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Dashboard'</strong>",
                            "Click on <strong>'My Activities'</strong>"
                        ]
                    }
                ],
                notes: [
                    "This dashboard gives a comprehensive view of your ongoing and completed work items.",
                    "Includes summary-level status visibility for easier task management."
                ]
            },
            {
                title: "Activity Dashboard Overview",
                description: "The dashboard contains categorized views of different activity types:",
                sections: [
                    {
                        title: "Dashboard Widgets",
                        icon: <FaChartPie />,
                        items: [
                            "<strong>Project Activities</strong>: List of all ongoing and upcoming activities assigned to you.",
                            "<strong>Reviews</strong>: Activities that are in review or approval state.",
                            "<strong>Completed Activities</strong>: Summary of activities already marked completed.",
                            "<strong>Pending / On Hold</strong>: Activities that are paused or awaiting input.",
                            "<strong>Overdue Activities</strong>: Activities that have missed their due date."
                        ]
                    }
                ],
                notes: [
                    "The dashboard is for <strong>view-only</strong> purposes",
                    "Helps identify overdue items quickly to take necessary action from respective modules.",
                ]
            },

        ]
    },

    {
        "Project Margin Dashboard": [
            {
                title: "Navigate to Project Margin Dashboard",
                description: "Track and analyze project margin metrics across all projects from a central dashboard:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Dashboard'</strong>",
                            "Click on <strong>'Project Dashboard'</strong>"
                        ]
                    }
                ],
                notes: [
                    "This dashboard provides a quick view of margin performance across different projects and time periods.",
                    "Intended for analysis and monitoring, not for editing or adding data."
                ]
            },
            {
                title: "Dashboard Filters and Metrics",
                description: "Use filters to adjust what is displayed in the margin dashboard:",
                sections: [
                    {
                        title: "Filter Options and Visuals",
                        icon: <FaChartBar />,
                        items: [
                            "<strong>Activity Name</strong>: Filter by project activity name.",
                            "<strong>Date Range</strong>: Select a date or period to analyze margin over time.",
                            "<strong>Field Value</strong>: Search based on custom project field value.",
                            "<strong>All Projects</strong>: Filter by project name or ID.",
                            "<strong>All Managers</strong>: View margin data specific to selected project managers.",
                            "<strong>All Project Status</strong>: Filter by status like ongoing, completed, or on-hold.",
                            "<strong>Total Margin Status</strong>: View current margin status in percentage format.",
                            "<strong>Margin Distribution</strong>: Visual chart showing margin breakdown across time/projects."
                        ]
                    }
                ],
                notes: [
                    "This module is <strong>read-only</strong> and serves analytical purposes.",
                    "Helpful for identifying profit-driving and loss-making projects.",
                    "Graphs and percentages are auto-calculated from system-maintained project cost vs revenue data."
                ]
            },
        ]
    },
    {
        "Resource Utilisation Dashboard": [
            {
                title: "Navigate to Resource Utilisation Dashboard",
                description: "Monitor and analyze how resources are utilized across various projects and timelines:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Dashboard'</strong>",
                            "Click on <strong>'Resource Utilisation'</strong>"
                        ]
                    }
                ],
                notes: [
                    "This dashboard helps assess individual and team resource productivity over a time period.",
                    "Designed for viewing only, with no data entry or edit options."
                ]
            },
            {
                title: "Dashboard Filters and Visualization",
                description: "Use the following filters to customize the resource utilisation data view:",
                sections: [
                    {
                        title: "Filter Controls and Metrics",
                        icon: <FaChartLine />,
                        items: [
                            "<strong>Activity Name</strong>: Narrow the data to a specific activity.",
                            "<strong>Field Value</strong>: Filter by keywords or specific fields relevant to utilization.",
                            "<strong>Date Range</strong>: Choose a custom date range to view data for that period.",
                            "<strong>All Projects</strong>: Filter by one or more projects.",
                            "<strong>All Managers</strong>: View utilization under specific managers.",
                            "<strong>All Users</strong>: Filter by individual team members or departments.",
                            "<strong>Utilisation Status</strong>: Displays % utilization across selected filters.",
                            "<strong>Month-wise Effort Utilisation</strong>: Graphical breakdown of utilization trends over months."
                        ]
                    }
                ],
                notes: [
                    "Utilization is calculated based on assigned effort vs actual effort logged in the system.",
                    "Useful for identifying underutilized or overburdened team members.",
                    "Visual analytics help with workforce planning and optimization."
                ]
            },

        ]
    },

    {
        "Contract Items (Billing) Dashboard": [
            {
                title: "Navigate to Contract Items (Billing) Dashboard",
                description: "Monitor planning and completion status of contract-based items for billing purposes:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Click on <strong>'Projects'</strong>",
                            "Click on <strong>'Items Billing Dashboard'</strong>"
                        ]
                    }
                ],
                notes: [
                    "This dashboard is used to monitor billing-related progress of project items.",
                    "No manual data entry is allowed—values are automatically populated based on project execution data."
                ]
            },
            {
                title: "Dashboard Components",
                description: "The dashboard displays billing-related item statuses categorized into three key buckets:",
                sections: [
                    {
                        title: "Billing Status Overview",
                        icon: <FaChartBar />,
                        items: [
                            "<strong>Items Not Planned</strong>: Items yet to be scheduled for execution or billing.",
                            "<strong>Items Planned</strong>: Items that have been planned but not completed.",
                            "<strong>Items Completed</strong>: Items for which execution and billing are completed."
                        ]
                    }
                ],
                notes: [
                    "This is a <strong>view-only</strong> module and does not support item-level editing or updates.",
                    "Used by project managers and billing teams to track project fulfillment against contracts.",
                    "Dashboard helps ensure timely billing and identify gaps in planning vs execution."
                ]
            },

        ]
    },


    {
        "My Project Activity": [
            {
                title: "Navigate to My Project Activity",
                description: "Follow this path to view and update details for assigned project activities:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Dashboard'</strong>",
                            "Click on <strong>'My Activities'</strong>",
                            "Click <strong>'View Activities'</strong>",
                            "Select the desired record under <strong>'My Project Activity'</strong>",
                            "Click on <strong>'Update'</strong> to edit activity details"
                        ]
                    }
                ],
                notes: [
                    "This section is used to update real-time progress and remarks related to your assigned project activities.",
                    "Editable fields may vary depending on the activity stage or user role."
                ]
            },
            {
                title: "Update Project Activity Details",
                description: "Enter actual work details and mark activity status:",
                sections: [
                    {
                        title: "Activity Update Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Description"]}
                                rows={[
                                    ["Actual Duration", "Dropdown", "Time taken to complete or progress the activity"],
                                    ["Actual Start Date", "Date Picker", "Enter the real date work began"],
                                    ["Completion Percent", "Number", "Provide current % completion (0–100)"],
                                    ["Mark Activity as Completed", "Checkbox", "Tick when the activity is finished"],
                                    ["Remarks", "Text", "Enter status notes, blockers, or updates"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "You are allowed to <strong>view</strong> and <strong>edit</strong> these fields as per your user role.",
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save changes to your project activity:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click <strong>'Update'</strong> or <strong>'Save'</strong> to record changes made.",
                            "Activity record will reflect changes immediately on the Activity List view."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit without saving changes:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Activity List'</strong> or navigate away to discard any edits.",
                            "No changes will be saved unless explicitly updated."
                        ]
                    }
                ],
                notes: [
                    "Manual updates are user-specific and real-time."
                ]
            }
        ]
    },
    {
        "My Docket Activity": [
            {
                title: "Navigate to My Docket Activity",
                description: "Access the docket activities assigned to you for reference and tracking:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Dashboard'</strong>",
                            "Click on <strong>'My Activities'</strong>",
                            "Click <strong>'View Activities'</strong>",
                            "Select <strong>'My Docket Activity'</strong>"
                        ]
                    }
                ],
                notes: [
                    "This module allows you to monitor the status and history of docket-level activities assigned to your profile.",
                    "You are not permitted to edit any details; it is a view-only interface."
                ]
            },
            {
                title: "View Docket Activity Information",
                description: "Use the filters below to view and search dockets linked to your role:",
                sections: [
                    {
                        title: "Docket Activity Filters",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Description"]}
                                rows={[
                                    ["Docket Number", "Dropdown", "Select from available docket references assigned to you"],
                                    ["Search", "Text", "Enter a keyword or term to search within docket details"],
                                    ["All Status", "Dropdown", "Filter docket entries based on current status (open/closed/in progress)"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "You are only allowed to <strong>view</strong> docket details.",
                    "Use filters to quickly locate relevant entries."
                ]
            },
            {
                title: "Navigation Only",
                description: "As this is a view-only module, there are no actions to submit or upload:",
                sections: [
                    {
                        title: "Navigation Back",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click <strong>'My Activities'</strong> in the breadcrumb or side menu to return to the previous screen."
                        ]
                    }
                ],
                notes: [
                    "This section is strictly for viewing docket-linked activity data."
                ]
            }
        ]
    },

    {
        "My Review": [
            {
                title: "Navigate to My Review",
                description: "Use this path to access review-related tasks or activities assigned to you:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to <strong>'Left Menu'</strong>",
                            "Select <strong>'Dashboard'</strong>",
                            "Click on <strong>'My Activities'</strong>",
                            "Click <strong>'View Activities'</strong>",
                            "Select <strong>'My Review'</strong>"
                        ]
                    }
                ],
                notes: [
                    "This module allows you to view activities assigned to you for review or feedback.",
                ]
            },
            {
                title: "View Review Activity Details",
                description: "Use filters to view and search review tasks based on criteria:",
                sections: [
                    {
                        title: "Review Activity Filters",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Description"]}
                                rows={[
                                    ["Activity Name", "Dropdown", "Select the activity you are assigned to review"],
                                    ["Search", "Text", "Enter keywords to find specific activities"],
                                    ["All Status", "Dropdown", "Filter reviews by status (pending, completed, etc.)"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "This is a <strong>view-only</strong> interface",
                    "Helps in keeping track of what activities are under your review list.",
                    "Use the dropdown filters to narrow your results efficiently."
                ]
            },
            {
                title: "Navigation Only",
                description: "As no edit or action is permitted, you can only move between screens:",
                sections: [
                    {
                        title: "Navigation Back",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'My Activities'</strong> to go back to the main activity screen."
                        ]
                    }
                ],
                notes: [
                    "Primarily for observation and reference."
                ]
            }
        ]
    },
]