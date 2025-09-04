import {
    FaCheckCircle,
    FaRoute,
    FaUpload,
    FaRegAddressBook,
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

export const SalesOrderManualStep = [
    {
        "Add Sales Order (Order Detail)": [
            {
                title: "Navigate to Add Sales Order",
                description: "Follow this path to create a new sales order in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Side Menu'</strong>",
                            "Click on <strong>'Sales and Purchases'</strong>",
                            "Navigate to <strong>'Sales Order'</strong>",
                            "Click on <strong>'Add Sales Order'</strong>",
                            "Select a <strong>'Customer'</strong> to proceed to the Sales Order Details",
                            "Click on <strong>'Order Detail'</strong> to enter item-level information"
                        ]
                    }
                ],
                notes: [
                    "Ensure that you have access to the <strong>Sales and Purchases</strong> module.",
                    "Only authorized users can create Sales Orders."
                ]
            },
            {
                title: "Enter Sales Order Information",
                description: "Fill in the following fields in the Sales Order entry form:",
                sections: [
                    {
                        title: "Sales Order Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Customer", "Dropdown", "Mandatory"],
                                    ["Other Contact", "Dropdown", "Optional"],
                                    ["Sales Order Number", "Text", "Auto-generated or manual"],
                                    ["Sales Order Date", "Date Picker", "Mandatory"],
                                    ["Order Due Date", "Date Picker", "Optional"],
                                    ["Customer Reference Number", "Text", "Optional"],
                                    ["Part Delivery", "checkbox", "Optional"],
                                    ["Additional Remarks", "Text", "Optional"],
                                    ["Shipment Address", "Dropdown", "Mandatory"],
                                    ["Which Branch Address", "Dropdown", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "Make sure <strong>Customer</strong> and <strong>Branch Address</strong> are correctly selected.",
                    "<strong>Part Delivery</strong> checkbox allows partial shipment if enabled.",
                    "Sales Order Number may be system-generated or entered manually based on settings."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "You can bulk upload sales orders or export the existing list for reference or editing.",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click the <strong>Upload</strong> button to bulk import sales order records.",
                            "Only <strong>.XLS</strong> format is supported.",
                            "Ensure your file follows the standard system template for sales orders."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click the <strong>Export</strong> button to download the sales order list.",
                            "Data will be downloaded in <strong>.XLS</strong> format.",
                            "Useful for reviewing or editing multiple records offline."
                        ]
                    }
                ],
                notes: [
                    "Use the official import template to avoid upload errors.",
                    "Exported files can be modified and re-uploaded for bulk updates."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the newly created sales order:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the sales order entry."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the form without saving the sales order:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Customer List'</strong> to cancel the operation.",
                            "Any unsaved information will be lost."
                        ]
                    }
                ],
                notes: [
                    "No confirmation prompt appears while cancelling.",
                    "Ensure all required data is entered before exiting."
                ]
            }
        ]
    },

    {
        "Add Sales Order (Order Item Detail)": [
            {
                title: "Navigate to Order Item Detail",
                description: "Once you've selected a customer for the Sales Order, proceed to add item-level details:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Side Menu'</strong>",
                            "Click on <strong>'Sales and Purchases'</strong>",
                            "Navigate to <strong>'Sales Order'</strong>",
                            "Click on <strong>'Add Sales Order'</strong>",
                            "Select a <strong>'Customer'</strong> for the Sales Order",
                            "Proceed to <strong>'Order Item Detail'</strong>",
                            "Click on <strong>'Select Item'</strong> to add item information"
                        ]
                    }
                ],
                notes: [
                    "Ensure a customer is selected before proceeding to item-level details.",
                    "Each line item represents a product or service being sold."
                ]
            },
            {
                title: "Enter Order Item Information",
                description: "Provide the required fields for each sales item in the order:",
                sections: [
                    {
                        title: "Order Item Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Quantity", "Number", "Mandatory"],
                                    ["Unit", "Dropdown", "Mandatory"],
                                    ["Price", "Number", "Mandatory"],
                                    ["Remarks", "Text", "Optional"],
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "Use the <strong>Remarks</strong> field for any item-specific notes or instructions."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Bulk manage your order items using import and export features:",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click on the <strong>'Upload'</strong> button to import multiple sales order items at once.",
                            "Ensure the file is in the system's supported <strong>.XLS</strong> format.",
                            "Follow the predefined structure to avoid upload errors."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click on the <strong>'Export'</strong> button to download the list of added sales order items.",
                            "Exported data will be in <strong>.XLS</strong> format.",
                            "Useful for bulk review or updates offline."
                        ]
                    }
                ],
                notes: [
                    "Always use the correct template for importing sales order items.",
                    "Exported files can be edited and re-uploaded to modify existing items."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Finalize the entry for the sales order item:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the item details."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the item detail form without saving:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Back to Order'</strong> to cancel item entry.",
                            "Any unsaved data will be discarded."
                        ]
                    }
                ],
                notes: [
                    "Make sure to submit each item to avoid data loss.",
                    "You can return later to add more items after initial submission."
                ]
            }
        ]
    },
    {
        "Add Purchase Order (PO Detail)": [
            {
                title: "Navigate to Add Purchase Order",
                description: "Follow the steps below to create a new Purchase Order (PO):",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Side Menu'</strong>",
                            "Click on <strong>'Sales and Purchases'</strong>",
                            "Navigate to <strong>'Purchase Order'</strong>",
                            "Click on <strong>'Add Purchase Order'</strong>"
                        ]
                    }
                ],
                notes: [
                    "Ensure you have the necessary permissions to access the <strong>Purchase Order</strong> module.",
                    "Only authorized users can create and manage POs."
                ]
            },
            {
                title: "Enter Purchase Order Information",
                description: "Fill in all required fields to complete the PO form:",
                sections: [
                    {
                        title: "Purchase Order Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Supplier", "Dropdown", "Mandatory"],
                                    ["Location", "Dropdown", "Mandatory"],
                                    ["PO Reference Number", "Text", "Optional / Manual Entry"],
                                    ["Supplier Reference Number", "Text", "Optional"],
                                    ["PO Date", "Date Picker", "Mandatory"],
                                    ["Expected Due Date", "Date Picker", "Optional"],
                                    ["Unit Price Type", "Dropdown", "Optional"],
                                    ["Part Delivery Allowed", "Checkbox", "Optional"],
                                    ["Additional Remarks", "Text", "Optional"],
                                    ["Sales Order Ref Number", "Dropdown", "Optional"],
                                    ["Shipment Address", "Dropdown", "Mandatory"],
                                    ["Which Branch Office?", "Dropdown", "Mandatory"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "Fields such as <strong>Supplier</strong>, <strong>Location</strong>, <strong>PO Date</strong>, and <strong>Shipment Address</strong> are mandatory.",
                    "Enable the <strong>Part Delivery Allowed</strong> checkbox if the order can be delivered in parts."
                ]
            },
            {
                title: "Export and Upload Options",
                description: "Bulk manage purchase orders using upload and export features:",
                sections: [
                    {
                        title: "Data Upload",
                        icon: <FaUpload />,
                        items: [
                            "Click the <strong>'Upload'</strong> button to import multiple Purchase Orders.",
                            "Ensure the file is in <strong>.XLS</strong> format using the system template.",
                            "Verify all required fields are included to avoid errors during upload."
                        ]
                    },
                    {
                        title: "Data Export (Download)",
                        icon: <FaFileExport />,
                        items: [
                            "Click the <strong>'Export'</strong> button to download existing Purchase Orders.",
                            "The file will be downloaded in <strong>.XLS</strong> format.",
                            "Useful for review, record-keeping, or offline modifications."
                        ]
                    }
                ],
                notes: [
                    "Always use the correct import format to avoid system rejections.",
                    "Downloaded files can be edited and re-uploaded for updates."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save the Purchase Order details:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the Purchase Order."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the PO form without saving changes:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'PO List'</strong> to cancel and return to the main list.",
                            "Unsaved changes will be lost."
                        ]
                    }
                ],
                notes: [
                    "Make sure to save the PO before exiting to avoid data loss.",
                    "You can always edit or review it later from the PO List."
                ]
            }
        ]
    },
    {
        "Add Service Order": [
            {
                title: "Navigate to Add Service Order",
                description: "Use the following path to create a new Service Order in the system:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Side Menu'</strong>",
                            "Click on <strong>'Sales and Purchases'</strong>",
                            "Navigate to <strong>'Purchase Service'</strong>",
                            "Click on <strong>'Add Service Order'</strong>",
                            "Select the <strong>Item</strong> for Service Order to proceed to Service Item Detail"
                        ]
                    }
                ],
                notes: [
                    "Make sure you have access to the <strong>Purchase Service</strong> module.",
                    "The selected item will determine the scope of the service being ordered."
                ]
            },
            {
                title: "Enter Service Order Information",
                description: "Fill in the required details for the service order:",
                sections: [
                    {
                        title: "Service Order Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Service Supplier", "Dropdown", "Mandatory"],
                                    ["Service Order Number", "Text", "Auto-generated or Manual"],
                                    ["Service Order Rate Date", "Date Picker", "Mandatory"],
                                    ["Service Amount", "Number", "Mandatory"],
                                    ["Supplier Reference Number", "Text", "Optional"],
                                    ["Additional Remarks", "Text", "Optional"],
                                    ["Which Branch Office?", "Dropdown", "Mandatory"],
                                    ["Numbeer", "Checkbox", "Optional"],
                                    ["Numbeer", "Text", "Optional"]
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "Fields such as <strong>Service Supplier</strong>, <strong>Order Rate Date</strong>, and <strong>Service Amount</strong> are mandatory.",
                    "Remarks can be used for service-specific notes or instructions."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Save and finalize the Service Order:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the Service Order details."
                        ]
                    }
                ]
            },
            {
                title: "Cancel and Navigate Back",
                description: "Exit the service order form without saving:",
                sections: [
                    {
                        title: "Cancel Operation",
                        icon: <FaArrowLeft />,
                        items: [
                            "Click on <strong>'Service Order List'</strong> to cancel the entry and return.",
                            "Any unsaved changes will be discarded."
                        ]
                    }
                ],
                notes: [
                    "There is no confirmation prompt on cancel.",
                    "Ensure all required data is saved before leaving the screen."
                ]
            }
        ]
    },

    {
        "Add Delivery Challan": [
            {
                title: "Navigate to Add Delivery Challan",
                description: "Follow the steps below to create a new delivery challan for a customer:",
                sections: [
                    {
                        title: "Navigation Path",
                        icon: <FaRoute />,
                        items: [
                            "Go to the <strong>'Side Menu'</strong>",
                            "Click on <strong>'Sales and Purchases'</strong>",
                            "Navigate to <strong>'Delivery Challan'</strong>",
                            "Click on <strong>'Add Delivery Challan'</strong>",
                            "Select a <strong>'Customer'</strong> to proceed to Challan Details"
                        ]
                    }
                ],
                notes: [
                    "You must select a customer before adding challan details.",
                    "Only users with delivery challan access can perform this operation."
                ]
            },
            {
                title: "Enter Delivery Challan Information",
                description: "Fill in the required details to complete the delivery challan form:",
                sections: [
                    {
                        title: "Delivery Challan Details Form",
                        icon: <FaRegAddressBook />,
                        content: (
                            <DynamicTable
                                columns={["Field Name", "Type", "Validation"]}
                                rows={[
                                    ["Customer", "Dropdown", "Mandatory"],
                                    ["Challan Number", "Text", "Auto or Manual"],
                                    ["Challan Date", "Date Picker", "Mandatory"],
                                    ["Customer Ref. Number", "Text", "Optional"],
                                    ["Delivery Challan Type", "Text", "Mandatory"],
                                    ["Additional Remarks", "Text", "Optional"],
                                    ["Shipment Address", "Dropdown", "Mandatory"],
                                    ["Which Branch Office?", "Dropdown", "Mandatory"],
                                ]}
                            />
                        )
                    }
                ],
                notes: [
                    "Ensure correct selection of <strong>Shipment Address</strong> and <strong>Branch Office</strong> before submission.",
                    "<strong>Additional Remarks</strong> can be used for shipment/vehicle details or special instructions."
                ]
            },
            {
                title: "Submit and Confirm",
                description: "Finalize and save the delivery challan entry:",
                sections: [
                    {
                        title: "Submission",
                        icon: <FaCheckCircle />,
                        items: [
                            "Click on <strong>'Submit'</strong> to save the delivery challan details."
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
                            "Click on <strong>'Back'</strong> to return without saving.",
                            "Any unsaved changes will be discarded."
                        ]
                    }
                ],
                notes: [
                    "Use <strong>Submit</strong> to save data before exiting.",
                    "Cancelling will not show a confirmation prompt."
                ]
            }
        ]
    },
]