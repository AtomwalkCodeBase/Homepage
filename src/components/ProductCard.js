import React from 'react';
import styled, { keyframes } from 'styled-components';
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

// Animations
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(60px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideInFromLeft = keyframes`
  0% { opacity: 0; transform: translateX(-100px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const slideInFromRight = keyframes`
  0% { opacity: 0; transform: translateX(100px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const floatUp = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Main container with modern light background
const SectionContainer = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// Modern title styling
const SectionTitle = styled.h2`
  font-size: 3.0em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 80px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  position: relative;
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5em;
    margin-bottom: 60px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #9C27B0, #E91E63);
    border-radius: 2px;
  }
`;

// Container for features
const FeaturesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

// Individual feature section
const FeatureSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 120px;
  position: relative;
  animation: ${props => props.direction === 'left' ? slideInFromLeft : slideInFromRight} 0.8s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 1024px) {
    flex-direction: column !important;
    text-align: center;
    margin-bottom: 80px;
  }

  &:hover {
    .feature-image {
      transform: scale(1.05) rotateY(5deg);
    }
    
    .feature-content {
      transform: translateX(${props => props.direction === 'left' ? '10px' : '-10px'});
    }
  }
`;

// Image container with 3D effects
const ImageContainer = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  perspective: 1000px;
  
  .feature-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 30px;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.8);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    z-index: 2;
    
    @media (max-width: 768px) {
      height: 300px;
      margin-bottom: 30px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(135deg, #9C27B0, #E91E63);
    border-radius: 30px;
    opacity: 0.1;
    z-index: 1;
    transition: all 0.6s ease;
  }

  &:hover::before {
    opacity: 0.2;
    transform: rotate(2deg);
  }

  @media (max-width: 1024px) {
    max-width: 500px;
    margin: 0 auto 40px auto;
  }
`;

// Content container
const ContentContainer = styled.div`
  flex: 1;
  padding: 0 60px;
  transition: all 0.4s ease;

  @media (max-width: 1024px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

// Feature heading
const FeatureHeading = styled.h3`
  font-size: 2.8em;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 25px;
  position: relative;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2em;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #9C27B0, #E91E63);
    border-radius: 2px;
  }
`;

// Feature list styling
const FeatureList = styled.div`
  margin-bottom: 40px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      display: flex;
      align-items: center;
      padding: 12px 0;
      font-size: 1.1em;
      color: #475569;
      transition: all 0.3s ease;
      border-bottom: 1px solid rgba(156, 39, 176, 0.1);
      
      &:hover {
        color: #1e293b;
        transform: translateX(10px);
        background: rgba(156, 39, 176, 0.05);
        padding-left: 15px;
        border-radius: 8px;
        border-bottom: 1px solid rgba(156, 39, 176, 0.2);
      }
      
      &::before {
        content: '✦';
        color: #9C27B0;
        font-size: 1.2em;
        margin-right: 15px;
        transition: all 0.3s ease;
      }
      
      &:hover::before {
        transform: rotate(90deg);
        color: #E91E63;
      }

      @media (max-width: 768px) {
        font-size: 1em;
      }
    }
  }
`;

// Modern CTA button
const CTAButton = styled.button`
  background: linear-gradient(135deg, #9C27B0 0%, #E91E63 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 50px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(156, 39, 176, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(156, 39, 176, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 15px 35px;
    font-size: 1em;
  }
`;

// Floating accent elements
const FloatingAccent = styled.div`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  background: linear-gradient(135deg, ${props => props.color1 || '#9C27B0'}, ${props => props.color2 || '#E91E63'});
  border-radius: 50%;
  opacity: 0.1;
  animation: ${floatUp} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  ${props => props.top && `top: ${props.top};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

// Separator line between sections
const SectionSeparator = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #9C27B0, #E91E63, transparent);
  margin: 80px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #9C27B0, #E91E63);
    border-radius: 50%;
    border: 3px solid #ffffff;
    box-shadow: 0 0 20px rgba(156, 39, 176, 0.3);
  }
`;

const ProductCard = () => {
  // const demopage = () => {
  //   window.location.href = '/demo.html';
  // };

  const salespage = (url) => {
    window.location.href = `${url}`;
  };

  const features = [
    {
      title: "Customer Management",
      image: Crm,
      items: [
        "Lead Management",
        "Customer Management", 
        "Channel partner management",
        "Annual Maintenance Contract",
        "Campaign Management"
      ],
      onClick: () => salespage("/crm.html"),
      delay: "0.1s"
    },
    {
      title: "Sales and Procurement",
      image: Sales,
      items: [
        "Sales order, quotation, proforma invoice",
        "Tax Invoice",
        "Payment, GST Tracking, TDS handling",
        "Return, Credit note handling",
        "Purchase Order, Purchase requests",
        "Goods Receipt (GRN)",
        "Goods Return/Shortage/Debit Note",
        "Purchase Service Order, TDS handling"
      ],
      onClick: () => salespage("/sales.html"),
      delay: "0.2s"
    },
    {
      title: "Inventory Management",
      image: Inventory,
      items: [
        "Item Category and Group",
        "Inventory Item and Service Item",
        "Item Supplier management",
        "Multiple locations",
        "Multiple Units",
        "Warehouse management (Bin Locations)",
        "Item Serial Number handling",
        "Item physical inspection and open balance",
        "Item min order qty and Expiry date tracking"
      ],
      onClick: () => salespage("/inventory.html"),
      delay: "0.3s"
    },
    {
      title: "GST & TDS",
      image: GST,
      items: [
        "GST report Support",
        "TDS and TDS reconciliation",
        "GST Reconciliation with A/c"
      ],
      delay: "0.4s"
    },
    {
      title: "Bank Reconciliation",
      image: Bank,
      items: [
        "Bank Statement Upload",
        "Account Reconciliation with Sales and PO",
        "Rule-based reconciliation of Expenses",
        "Bank statement View",
        "Reconciled statement view",
        "Bank, Exchange rate setup"
      ],
      delay: "0.5s"
    },
    {
      title: "Financial Accounting",
      image: Finacial,
      items: [
        "Reports (Sales, Purchase and Inventory).",
        "Audit Trail.",
        "Statutory Reports (P&L, Balance Sheet, Cash Flow, Change in Equity).",
        "Purchase Reports",
        "Depreciation Schedule"
      ],
      delay: "0.6s"
    },
    {
      title: "Reports and Dashboard",
      image: Report,
      items: [
        "Manager Dashboard",
        "Sales Dashboard",
        "Account Receivable and Payable",
        "Party wise outstanding",
        "Batch reports like Sales overdue, GST not filed",
        "Report Templates",
        "User Access control"
      ],
      delay: "0.7s"
    },
    {
      title: "Process Templates & Project Management",
      image: Process,
      items: [
        "Activity Definition with User group",
        "Equipment and Document definition for Activity",
        "Process items and Bill of Material",
        "Project Activity Allocation Tracking",
        "Project Activity Dependency (Critical Path)",
        "Item Cost and Effort Tracking",
        "Efficiency tracking at Activity",
        "Integration with Inventory Allocation, Wastage and Release"
      ],
      onClick: () => salespage("/processandproject.html"),
      delay: "0.8s"
    },
    {
      title: "HR & Payroll",
      image: Hr,
      items: [
        "On-Boarding Process",
        "Employee Data",
        "Attendance",
        "Leave Management",
        "Claim Management",
        "Payroll",
        "Performance Management System",
        "Exit Process"
      ],
      onClick: () => salespage("/hrm.html"),
      delay: "0.9s"
    }
  ];

  const labFeatures = [
    {
      title: "Lab Equipment Management System",
      image: Labeq,
      items: [
        "Enhanced User Management",
        "Simplified Equipment Management",
        "Equipment Maintenance",
        "Gain Insights with Report & Analytics"
      ],
      onClick: () => salespage("/labequipmentmangement.html"),
      delay: "0.1s"
    },
    {
      title: "Lab Management System",
      image: Lab,
      items: [
        "Lab User Management",
        "Lab Process Template",
        "Lab Experiment Project",
        "Lab PI/Dashboard and Report"
      ],
      onClick: () => salespage("/labmanagement.html"),
      delay: "0.2s"
    }
  ];

  return (
    <>
      <SectionContainer>
        <SectionTitle>
          Atomwalk Office ERP connects every aspect of your business into one unified system
        </SectionTitle>
        
        <FeaturesContainer>
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <FeatureSection 
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={feature.delay}
                // onClick={feature.onClick}
                style={{ cursor: 'default'}}
              >
                <ImageContainer>
                  <img src={feature.image} alt={feature.title} className="feature-image" />
                </ImageContainer>
                
                <ContentContainer className="feature-content">
                  <FeatureHeading>{feature.title}</FeatureHeading>
                  <FeatureList>
                    <ul>
                      {feature.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </FeatureList>
                  <CTAButton onClick={feature.onClick}>
                    View Details
                  </CTAButton>
                </ContentContainer>
                
                {/* Floating accents */}
                <FloatingAccent 
                  size="80px" 
                  top="10%" 
                  right={index % 2 === 0 ? "10%" : "auto"}
                  left={index % 2 === 0 ? "auto" : "10%"}
                  delay={`${index * 0.5}s`}
                />
                <FloatingAccent 
                  size="40px" 
                  bottom="20%" 
                  right={index % 2 === 0 ? "20%" : "auto"}
                  left={index % 2 === 0 ? "auto" : "20%"}
                  delay={`${index * 0.3}s`}
                />
              </FeatureSection>
              
              {index < features.length - 1 && <SectionSeparator />}
            </React.Fragment>
          ))}
        </FeaturesContainer>
      </SectionContainer>

      <SectionContainer style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #e0f2fe 100%)'
      }}>
        <SectionTitle style={{marginTop:"40px"}}>
          Atomwalk Lab Management: Streamlining Labs, Unifying Excellence.
        </SectionTitle>
        
        <FeaturesContainer>
          {labFeatures.map((feature, index) => (
            <React.Fragment key={index}>
              <FeatureSection 
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={feature.delay}
                onClick={feature.onClick}
                style={{ cursor: 'default' }}
              >
                <ImageContainer>
                  <img src={feature.image} alt={feature.title} className="feature-image" />
                </ImageContainer>
                
                <ContentContainer className="feature-content">
                  <FeatureHeading>{feature.title}</FeatureHeading>
                  <FeatureList>
                    <ul>
                      {feature.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </FeatureList>
                  <CTAButton 
                   onClick={feature.onClick}>
                    View Details
                  </CTAButton>
                </ContentContainer>
                
                <FloatingAccent 
                  size="70px" 
                  top="15%" 
                  right={index % 2 === 0 ? "15%" : "auto"}
                  left={index % 2 === 0 ? "auto" : "15%"}
                  delay={`${index * 0.4}s`}
                  color1="#06b6d4"
                  color2="#3b82f6"
                />
              </FeatureSection>
              
              {index < labFeatures.length - 1 && <SectionSeparator />}
            </React.Fragment>
          ))}
        </FeaturesContainer>
      </SectionContainer>
    </>
  );
};

export default ProductCard;