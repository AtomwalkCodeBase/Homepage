import React, { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #caf0f8;
`;

const Title = styled.h1`
  font-size: 3.2em;
  margin-bottom: 100px;
  text-align: center;
  color: #2c3e50;
`;

const Title2 = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
`;

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 47px;
    width: 100%;
  }
`;

const PlanCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  text-align: center;
  color: #454545;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;

  @media (min-width: 768px) {
    width: 23%;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: wheat;
  }
`;

const Price = styled.h2`
  font-size: 2em;
  margin: 20px 0;
  font-weight: 800;
  color: #000933;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const FeatureItem = styled.li`
  margin: 10px 0;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  &::before {
    content: "${(props) => (props.valid ? "✓" : "✗")}";
    margin-right: 10px;
    color: ${(props) => (props.valid ? "green" : "red")};
  }
`;
const FeatureItem2 = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-size: 1em;
color: #ea5c49; 
text-decoration: none;
cursor: pointer;
font-weight: 500;
  &:hover {
    text-decoration: underline;
    color: #ee442d;
  }
`;

const Message = styled.p`
  font-weight: 500;
`;

const Button = styled.button`
  background-color: #ea5c49;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #ee442d;
  }
`;
const ModuleContainer = styled.div`
  background-color: #caf0f8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #454545;
`;

const ModuleTitle = styled.div`
  font-size: 1.1em;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 4px;
  background: #d1cdcd;
  border-radius: 50%;
  width: 5%;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  &:hover{
  background: #f77867;
  }
`;
const ExpandIcon = styled.span`
  font-size: 1.5em;
  color: #454545;
  cursor: pointer;
`;

const FeatureDetails = styled.ul`
  list-style-type: none;
  margin-top: 10px;
  padding-left: 20px;
  color: #6b37d1;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "750px",
    padding: "40px",
    overflow: "auto", // Enable scrolling within the modal
    maxHeight: "80vh", // Limit the modal height to 80% of the viewport height
  },
  overlay: {
    // backgroundColor: "rgba(0, 0, 0, 0.8)", // Optional, for background dimming
    zIndex: "32333",
  },
};

// Define the module data
const modules = [
  { name: "Project Management", features: ["Project Activity Allocation Tracking",
   " Project Activity Dependency (Critical Patch)",
   " Schedule Tracking",
    "Item Cost and Effort Tracking",
    "Efficiency tracking at Activity",
    "Project Documents, Alert management",
    "Integration with Procurement and PO",
    "Integration with Inventory Allocation, Wastage and Release"] },
  { name: "Inventory Management", features: ["Item Category and Group",
    "Inventory Item and Service Item",
    "Item Supplier management",
    "Multiple locations",
    "Multiple Units",
    "Warehouse management (Bin Locations)",
    "Item Serial Number handling",
    "Item physical inspection and open balance",
    "Item min order qty and Expiry date tracking"] },
  // { name: "Process Templates", features: ["Activity Definition with User group",
  //   "Equipment and Document definition for Activity",
  //   "Process definition for a Product",
  //   "Process Activity Dependency",
  //   "Process items and Bill of Material",] },
  { name: "Sales and Procurement", features: ["Sales order, quotation, proforma invoice",
    "Tax Invoice",
    "Payment, GST Tracking, TDS handling",
    "Return, Credit note handling",
    "Purchase Order, Purchase requests",
    "Goods Receipt (GRN)",
    "Goods Return/Shortage/ Debit Note",
    "Purchase Service Order, TDS handling"] },
  { name: "Customer Management( CRM)", features: ["Customer Details",
    "Customer Sales/Payments Tracking (Bank/TDS)",
    "Agreements",
    "Customer Type/ Group"] },
  { name: "HR & Payroll", features: ["Employee Hire to Exit",
    "Leave & Attendance",
    "Travel & Expenses",
    "Salary & Payroll",
    "Advances",
    "Claim Settlement"] },
  { name: "Bank Reconciliation", features: ["Bank Statement Upload",
    "Account Reconciliation with Sales and PO",
    "Rule based reconciliation of Expenses",
    "Bank statement View",
    "Reconciled statement view",
    "Bank, Exchange rate setup"] },
  { name: "Financial Accounting", features: ["Sales report (Period/Party/Outstanding)",
    "Purchase Reports",
    "Inventory (opening and closing stock)",
    "Inventory Valuation",
    "Financial Reports (P&L Balance sheet, Cash flow, Change in Equity",
    "Aging/ DSO",
    "Depreciation Schedule"] },
  { name: "Reports and Dashboard", features: ["Manager Dashboard",
    "Sales Dashboard",
    "Account Receivable and Payable",
    "Party wise outstanding",
    "Batch reports like Sales overdue, GST not filed",
    "Report Templates",
   " User Access control"] },
];


const PricingCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModule = (moduleName) => {
    setExpandedModule(expandedModule === moduleName ? null : moduleName);
  };
  return (
    <>
    <PricingContainer>
      {/* <Title2>Customer relationship management</Title2> */}
      <Title>Pick the Right CRM Plan to Elevate Your Processes!</Title>
      <PlansContainer>
        <PlanCard>
          <h3
            style={{ color: "#ffff", fontWeight: "800", fontSize: "2.5rem",padding:"10px",backgroundColor:"red",borderRadius:"5px" }}
          >
            Free Trial
          </h3>
          <Price>₹0/Month</Price>
          <Message>Seriously, free forever</Message>
          <FeatureList>
            <FeatureItem valid>3 User Access</FeatureItem>
            <FeatureItem valid>30 days Vallidity</FeatureItem>
            <FeatureItem valid>20MB Space</FeatureItem>
            <FeatureItem>Multi Branch Access</FeatureItem>
            <FeatureItem2  onClick={openModal}>Click Hear to see the modules</FeatureItem2>
          </FeatureList>
          <Button>Sign up for free</Button>
        </PlanCard>
        <PlanCard>
          <h3
            style={{
              color: "#fff",
              fontWeight: "800",
              fontSize: "2.5rem",
              padding:"10px",backgroundColor:"#2196f3",borderRadius:"5px"
            }}
          >
            Basic
          </h3>
          <Price>₹5,000/Month</Price>
          <Message>Billed at ₹50,000 per year</Message>
          <FeatureList>
            <FeatureItem valid>5 User Access</FeatureItem>
            <FeatureItem valid>1 Year Validity</FeatureItem>
            <FeatureItem valid>200MB Space</FeatureItem>
            <FeatureItem>Multi Branch Access</FeatureItem>
            <FeatureItem2  onClick={openModal}>Click Hear to see the modules</FeatureItem2>
          </FeatureList>
          <Button>Start a free trial</Button>
        </PlanCard>
        <PlanCard>
          <h3
            style={{
              color: "#fff",
              fontWeight: "800",
              fontSize: "2.5rem",
              padding:"10px",backgroundColor:"orange",borderRadius:"5px"
            }}
          >
            Premium
          </h3>
          <Price>₹8,000/Month</Price>
          <Message>Billed at ₹75,000 per year</Message>
          <FeatureList>
            <FeatureItem valid>10 User Access</FeatureItem>
            <FeatureItem valid>1 Year Vallidity</FeatureItem>
            <FeatureItem valid>500MB Space</FeatureItem>
            <FeatureItem valid>Multi Branch Access</FeatureItem>
            <FeatureItem2 lickable onClick={openModal}>Click Hear to see the modules</FeatureItem2>
          </FeatureList>
          <Button>Start a free trial</Button>
        </PlanCard>
        <PlanCard>
          <h3
            style={{
              color: "#fff",
              fontWeight: "800",
              fontSize: "2.5rem",
                 padding:"10px",backgroundColor:"#800080",borderRadius:"5px"
            }}
          >
            Ultimate
          </h3>
          <Price>₹15,000/Month</Price>
          <Message>Billed at ₹150,000 per year</Message>
          <FeatureList>
            <FeatureItem valid>25 User Access</FeatureItem>
            <FeatureItem valid>1 Year Vallidity</FeatureItem>
            <FeatureItem valid>1.2GB Space</FeatureItem>
            <FeatureItem valid>Multi Branch Access</FeatureItem>
            <FeatureItem2 lickable onClick={openModal}>Click Hear to see the modules</FeatureItem2>
          </FeatureList>
          <Button>Start a free trial</Button>
        </PlanCard>
      </PlansContainer>
    </PricingContainer>
    <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
         <CloseButton onClick={closeModal}>&times;</CloseButton>
        <FeatureList>
          {modules.map((module, index) => (
            <div key={index}>
              <ModuleContainer onClick={() => toggleModule(module.name)}>
                <ModuleTitle>{module.name}</ModuleTitle>
                <ExpandIcon>{expandedModule === module.name ? "−" : "+"}</ExpandIcon>
              </ModuleContainer>

              {/* Show features if the module is expanded */}
              {expandedModule === module.name && (
                <FeatureDetails>
                  {module.features.map((feature, idx) => (
                    <ul style={{marginBottom:"5px"}}>
                    <li key={idx}>{feature}</li></ul>
                  ))}
                </FeatureDetails>
              )}
            </div>
          ))}
        </FeatureList>
      </ReactModal>
    </>
  );
};

export default PricingCard;
