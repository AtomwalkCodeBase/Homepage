import React from 'react';
import styled from 'styled-components';
import Inventory from './../assets/img/inventory management.jpg'
import Process from './../assets/img/Process Templates.jpg'
import Sales from './../assets/img/Sales and Procurement.jpg'
import Report from './../assets/img/Report And Dashboard.jpg'
import GST from './../assets/img/gst.webp'
import Bank from './../assets/img/Bank Reconciliation.jpg'
import Finacial from './../assets/img/Finacial Acconting.avif'
import Crm from './../assets/img/CrmProduct.jpeg'
import Hr from './../assets/img/Hrproduct.jpeg'
import Lab from './../assets/img/labmangement.jpg'
import Labeq from './../assets/img/Labeqp.webp'


// Main container for the entire section
const SectionContainer = styled.section`
  padding: 40px 20px;
  text-align: center;
  background-color: #ddf5ff;
`;

// Title of the section
const SectionTitle = styled.h2`
  font-size: 2.5em;
  font-weight: 600;
  color: #333;
  margin-bottom: 40px;
  
  span {
    color: #9C27B0; /* Purple color for the highlighted text */
  }
`;

// Container for all the content boxes
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

// Individual content box style
const ContentBox = styled.div`
  background-color: ${(props) => props.bgColor || "#f0f0f0"};
  border-radius: 20px;
  padding: 30px;
  max-width: 60%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
  }
  
  @media (max-width: 767px) {
    max-width: 100%;
    flex-direction: column;
    text-align: center;
  }
`;

// Text container inside each content box
const TextContainer = styled.div`
  max-width: 40%;
  text-align: left;

  @media (max-width: 767px) {
    text-align: left;
    max-width: 100%;
  }
`;

// Heading of each content box
const BoxHeading = styled.h3`
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

// Description text in each content box
const BoxText = styled.div`
  color: #666;
  font-size: 1em;
  margin-bottom: 20px;
`;

// Button for the content box
const Button = styled.button`
  background-color: #ea5c49;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
`;

// Image inside the content box
const ImageContainer = styled.div`
  width: 50%;
  text-align: center;
  
  img {
    max-width: 100%;
    height: 300px;
    border-radius: 15px;
    @media (max-width: 768px) {
      height: 100%;
      padding: 10px;
    }
  }
`;

// Decorative elements (circles)
const DecorativeCircle = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #9C27B0;
  border-radius: 50%;
  ${(props) => props.top && `top: ${props.top}; left: ${props.left};`}
  ${(props) => props.bottom && `bottom: ${props.bottom}; right: ${props.right};`}
`;

const ProductCard = () => {
  const demopage =()=>{
    window.location.href='/demo.html'
  }

  const salespage=(url)=>{
    window.location.href=`${url}`
  }

  return (
    <>
    <SectionContainer>
      <SectionTitle>Atomwalk Office ERP connects every aspect of your business into one unified system</SectionTitle>
      <ContentContainer>
  <ContentBox bgColor="#d6e7ff" onClick={()=>salespage("/crm.html")}>
    <ImageContainer>
      <img src={Crm} alt="Performance management" />
    </ImageContainer>
    <TextContainer>
      <BoxHeading>Customer Management</BoxHeading>
      <BoxText>
        <ul>
          <li>Lead Management</li>
          <li>Customer Management</li>
          <li>Channel partner management</li>
          <li>Annual Maintenance Contract</li>
          <li>Campaign Management</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    <DecorativeCircle top="20%" left="5%" />
    <DecorativeCircle bottom="10%" right="70%" />
  </ContentBox>

  <ContentBox bgColor="#ffeadf" onClick={()=>salespage("/sales.html")}>
    <TextContainer>
      <BoxHeading>Sales and Procurement</BoxHeading>
      <BoxText>
        <ul>
          <li>Sales order, quotation, proforma invoice</li>
          <li>Tax Invoice</li>
          <li>Payment, GST Tracking, TDS handling</li>
          <li>Return, Credit note handling</li>
          <li>Purchase Order, Purchase requests</li>
          <li>Goods Receipt (GRN)</li>
          <li>Goods Return/Shortage/Debit Note</li>
          <li>Purchase Service Order, TDS handling</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {e.stopPropagation();demopage();}}>Request a Demo</Button>
    </TextContainer>
    <ImageContainer>
      <img src={Sales} alt="Performance management" />
    </ImageContainer>
    {/* <DecorativeCircle top="20%" left="5%" />
    <DecorativeCircle bottom="10%" right="70%" /> */}
  </ContentBox>

  <ContentBox bgColor="#e0f7fa" onClick={()=>salespage("/inventory.html")}>
    <ImageContainer>
      <img src={Inventory} alt="Performance management" />
    </ImageContainer>
    <TextContainer>
      <BoxHeading>Inventory Management</BoxHeading>
      <BoxText>
        <ul>
          <li>Item Category and Group</li>
          <li>Inventory Item and Service Item</li>
          <li>Item Supplier management</li>
          <li>Multiple locations</li>
          <li>Multiple Units</li>
          <li>Warehouse management (Bin Locations)</li>
          <li>Item Serial Number handling</li>
          <li>Item physical inspection and open balance</li>
          <li>Item min order qty and Expiry date tracking</li>
        </ul>
      </BoxText>
      <Button>Request a Demo</Button>
    </TextContainer>
    <DecorativeCircle top="20%" left="5%" />
    <DecorativeCircle bottom="10%" right="70%" />
  </ContentBox>

  <ContentBox bgColor="rgb(225, 255, 246)">
    <TextContainer>
      <BoxHeading>GST & TDS</BoxHeading>
      <BoxText>
        <ul>
          <li>GST report Support</li>
          <li>TDS and TDS reconciliation</li>
          <li>GST Reconciliation with A/c</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    <ImageContainer>
      <img src={GST} alt="Employee engagement" />
    </ImageContainer>
    <DecorativeCircle top="10%" left="80%" />
    <DecorativeCircle bottom="5%" right="10%" />
  </ContentBox>

  <ContentBox bgColor="#d7faff">
    <ImageContainer>
      <img src={Bank} alt="Employee engagement" />
    </ImageContainer>
    <TextContainer>
      <BoxHeading>Bank Reconciliation</BoxHeading>
      <BoxText>
        <ul>
          <li>Bank Statement Upload</li>
          <li>Account Reconciliation with Sales and PO</li>
          <li>Rule-based reconciliation of Expenses</li>
          <li>Bank statement View</li>
          <li>Reconciled statement view</li>
          <li>Bank, Exchange rate setup</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    {/* <DecorativeCircle top="10%" left="80%" />
    <DecorativeCircle bottom="5%" right="10%" /> */}
  </ContentBox>

  <ContentBox bgColor="#ffeadf">
    <TextContainer>
      <BoxHeading>Financial Accounting</BoxHeading>
      <BoxText>
        <ul>
          <li>Reports (Sales, Purchase and Inventory).</li>
          <li>Audit Trail.</li>
          <li>Statutory Reports (P&L, Balance Sheet, Cash Flow, Change in Equity).</li>
          <li>Purchase Reports</li>
          <li>Depreciation Schedule</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    <ImageContainer>
      <img src={Finacial} alt="Performance management" />
    </ImageContainer>
    {/* <DecorativeCircle top="20%" left="5%" />
    <DecorativeCircle bottom="10%" right="70%" /> */}
  </ContentBox>

  <ContentBox bgColor="#dfdfdf">
    <ImageContainer>
      <img src={Report} alt="Performance management" />
    </ImageContainer>
    <TextContainer>
      <BoxHeading>Reports and Dashboard</BoxHeading>
      <BoxText>
        <ul>
          <li>Manager Dashboard</li>
          <li>Sales Dashboard</li>
          <li>Account Receivable and Payable</li>
          <li>Party wise outstanding</li>
          <li>Batch reports like Sales overdue, GST not filed</li>
          <li>Report Templates</li>
          <li>User Access control</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    <DecorativeCircle top="20%" left="5%" />
    <DecorativeCircle bottom="10%" right="70%" />
  </ContentBox>

  <ContentBox bgColor="#f6eaff" onClick={()=>salespage("/processandproject.html")}>
    <TextContainer>
      <BoxHeading>Process Templates & Project Management</BoxHeading>
      <BoxText>
        <ul>
          <li>Activity Definition with User group</li>
          <li>Equipment and Document definition for Activity</li>
          <li>Process items and Bill of Material</li>
          <li>Project Activity Allocation Tracking</li>
          <li>Project Activity Dependency (Critical Path)</li>
          <li>Item Cost and Effort Tracking</li>
          <li>Efficiency tracking at Activity</li>
          {/* <li>Project Documents, Alert management</li> */}
          <li>Integration with Inventory Allocation, Wastage and Release</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    <ImageContainer>
      <img src={Process} alt="Employee engagement" />
    </ImageContainer>
    <DecorativeCircle top="10%" left="80%" />
    <DecorativeCircle bottom="5%" right="10%" />
  </ContentBox>
{/* 
  <ContentBox bgColor="#fce4ec" onClick={()=>salespage("/processandproject.html")}>
    <ImageContainer>
      <img src={Product} alt="Employee engagement" />
    </ImageContainer>
    <TextContainer>
      <BoxHeading>Project Management</BoxHeading>
      <BoxText>
        <ul>
          <li>Project Activity Allocation Tracking</li>
          <li>Project Activity Dependency (Critical Path)</li>
          <li>Schedule Tracking</li>
          <li>Item Cost and Effort Tracking</li>
          <li>Efficiency tracking at Activity</li>
          <li>Project Documents, Alert management</li>
          <li>Integration with Procurement and PO</li>
          <li>Integration with Inventory Allocation, Wastage and Release</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    <DecorativeCircle top="10%" left="80%" />
    <DecorativeCircle bottom="5%" right="10%" />
  </ContentBox> */}

  <ContentBox bgColor="#fae0f8" onClick={()=>salespage("/hrm.html")}>
  <ImageContainer>
      <img src={Hr} alt="Employee engagement" />
    </ImageContainer>
    <TextContainer>
      <BoxHeading>HR & Payroll</BoxHeading>
      <BoxText>
        <ul>
          <li>On-Boarding Process</li>
          <li>Employee Data</li>
          <li>Attendance</li>
          <li>Leave Management</li>
          <li>Claim Management</li>
          <li>Payroll</li>
          <li>Performance Management System</li>
          <li>Exit Process</li>
        </ul>
      </BoxText>
      <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
    </TextContainer>
    {/* <DecorativeCircle top="10%" left="80%" />
    <DecorativeCircle bottom="5%" right="10%" /> */}
  </ContentBox>
</ContentContainer>
</SectionContainer>
       <SectionContainer style={{backgroundColor:"#b9f9f3"}}>
      <SectionTitle style={{marginTop:"40px"}}>Atomwalk Lab Management: Streamlining Labs, Unifying Excellence.</SectionTitle>
      <ContentContainer>
      <ContentBox bgColor="#e0f7fa" onClick={()=>salespage("/labequipmentmangement.html")}>
          <ImageContainer>
            <img src={Labeq} alt="Performance management" />
          </ImageContainer>
          <TextContainer>
            <BoxHeading>Lab Equipment Management System</BoxHeading>
            <BoxText>
            <ul>
						<li>Enhanced User Management</li>
						<li>Simplified Equipment Management</li>
						<li>Equipment Maintenance</li>
						<li>Gain Insights with Report & Analytics</li>
						</ul>
            </BoxText>
            <Button onClick={(e) => {
              e.stopPropagation();
              demopage();
            }}>Request a Demo
            </Button>
          </TextContainer>
          <DecorativeCircle top="20%" left="5%" />
          <DecorativeCircle bottom="10%" right="70%" />
        </ContentBox>
        
        <ContentBox bgColor="#f6eaff" onClick={()=>salespage("/labmanagement.html")}>
          <TextContainer>
            <BoxHeading>Lab Management System</BoxHeading>
            <BoxText>
            <ul>
						<li>Lab User Management</li>
						<li>Lab Process Template</li>
						<li>Lab Experiment Project</li>
						<li>Lab PI/Dashboard and Report</li>
						</ul>
            </BoxText>
            <Button onClick={(e) => {
  e.stopPropagation();
  demopage();
}}>Request a Demo</Button>
          </TextContainer>
          <ImageContainer>
            <img src={Lab} alt="Performance management" />
          </ImageContainer>
          {/* <DecorativeCircle top="20%" left="5%" />
          <DecorativeCircle bottom="10%" right="70%" /> */}
        </ContentBox>
        </ContentContainer>
    </SectionContainer>
    </>
  );
};

export default ProductCard;
