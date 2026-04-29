// WhatWeDoMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: ${props => props.top || '80px'};
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  z-index: 1999;
  animation: ${slideDown} 0.3s ease-out;
  border-top: 3px solid #e11d2e;
  max-height: 85vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    border-radius: 0 0 20px 20px;
    max-height: calc(100vh - 70px);
  }
`;

const MenuContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 5%;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ThreeColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 1fr;
  gap: 30px;
  min-height: 500px;

  @media (max-width: 1024px) {
    grid-template-columns: 250px 250px 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

// Products Column
const ProductsColumn = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  padding-right: 20px;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding-right: 0;
    padding-bottom: 20px;
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #e11d2e;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background: #e11d2e;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 768px) {
   margin-top: 200px;
  }
`;

const ProductItem = styled.div`
  padding: 12px 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(225, 29, 46, 0.05)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? '#e11d2e' : 'transparent'};

  &:hover {
    background: rgba(225, 29, 46, 0.05);
    transform: translateX(5px);
  }
`;

const ProductTitle = styled.div`
  font-weight: 600;
  color: #2c2c2c;
  font-size: 1rem;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;

  .icon {
    font-size: 1.1rem;
  }
`;

const ProductLink = styled.a`
  font-size: 0.8rem;
  color: #e11d2e;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

// Industries Column
const IndustriesColumn = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  padding-right: 20px;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding-right: 0;
    padding-bottom: 20px;
  }
`;

const IndustryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IndustryItem = styled.div`
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.hovered ? 'rgba(225, 29, 46, 0.05)' : 'transparent'};
  position: relative;

  &:hover {
    background: rgba(225, 29, 46, 0.05);
    transform: translateX(5px);
  }
`;

const IndustryName = styled.div`
  font-weight: 500;
  color: #5c5c5c;
  font-size: 0.95rem;
  transition: color 0.3s ease;

  ${IndustryItem}:hover & {
    color: #e11d2e;
  }
`;

// Use Cases Column
const UseCasesColumn = styled.div`
  padding-left: 10px;
`;

const UseCaseTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;

  .arrow {
    color: #e11d2e;
    font-size: 1.2rem;
  }
`;

const UseCaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const UseCaseItem = styled.div`
  padding: 12px 15px;
  background: rgba(225, 29, 46, 0.03);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(225, 29, 46, 0.1);

  &:hover {
    background: rgba(225, 29, 46, 0.08);
    border-color: rgba(225, 29, 46, 0.3);
    transform: translateX(5px);
  }
`;

const UseCaseName = styled.div`
  font-weight: 500;
  color: #2c2c2c;
  font-size: 0.95rem;
  margin-bottom: 5px;
`;

const UseCaseDescription = styled.div`
  font-size: 0.8rem;
  color: #5c5c5c;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  color: #5c5c5c;
  padding: 20px;

  .icon {
    font-size: 3rem;
    margin-bottom: 15px;
    opacity: 0.5;
  }

  p {
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(225, 29, 46, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #e11d2e;
  font-size: 20px;
  z-index: 10;

  &:hover {
    background: #e11d2e;
    color: white;
    transform: rotate(90deg);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileIndicator = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
    padding: 10px;
    background: rgba(225, 29, 46, 0.05);
    border-radius: 10px;
    margin-bottom: 15px;
    font-size: 0.85rem;
    color: #e11d2e;
  }
`;

const WhatWeDoMenu = ({ show, onClose, navbarHeight }) => {
    const menuRef = useRef(null);
    const [hoveredIndustry, setHoveredIndustry] = useState(null);
    const [useCases, setUseCases] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [industriesForProduct, setIndustriesForProduct] = useState([]);

    // Products with their associated industries and use cases
    const products = [
        {
            id: 1,
            name: "Atomwalk AW360™ Lab Management",
            link: "/lms.html",
            industries: [
                { name: "Pharmaceutical QC & R&D Labs", },
                { name: "CDMO (Contract Development & Manufacturing Organization)", },
                { name: "Academic & Research Laboratories", },
                { name: "Chemical Testing Laboratories", },
                { name: "Diagnostic & Clinical Laboratories", },
                { name: "CRO (Contract Research Organization)", },
                { name: "Biotech startups", },
                { name: "Environmental Testing Laboratories", },
                { name: "Food & Beverage Testing Laboratories", },
            ],
            useCases: [
                { name: "End-to-End Sample Lifecycle Management", link: "/labusecase?case=end-to-end-sample-lifecycle-management" },
                { name: "Lab Operations Management", link: "/labusecase?case=lab-operations-management" },
                // { name: "SLA & Turnaround Time Optimization", link: "/labusecase?case=sla-turnaround-time-optimization" },
                { name: "Laboratory to Research analytics and insights", link: "/labusecase?case=laboratory-operations-analytics-forecasting" },
                { name: "Equipment/Instrument Utilization & Preventive Maintenance Planning", link: "/labusecase?case=equipment-utilization-preventive-maintenance" },
                { name: "Equipment Calibration & Maintenance Calendar", link: "/labusecase?case=equipment-calibration-maintenance-calendar" },
                { name: "Study-driven sample tracking and reporting", link: "/labusecase?case=study-driven-sample-tracking-sponsor-reporting" },
                { name: "Batch Traceability & Data Integrity Management", link: "/labusecase?case=batch-traceability-data-integrity-management" },
                { name: "Intelligent Test Batching & Lab Throughput Optimization", link: "/labusecase?case=intelligent-test-batching-throughput-optimization" },
                { name: "Vendor Lifecycle Management", link: "/labusecase?case=approved-vendor-lifecycle-management" },
                { name: "Vendor Audit & Compliance (VACR) Management", link: "/labusecase?case=vendor-audit-compliance-vacr-management" },
                { name: "Compliance, Audit Trail & Regulatory Readiness", link: "/labusecase?case=compliance-audit-trail-regulatory-readiness" },
                // { name: "Deviation & CAPA Governance", link: "/labusecase?case=deviation-capa-governance" },
                // { name: "Electronic Data Integrity & Audit Trails", link: "/labusecase?case=electronic-data-integrity-audit-trails" },
                { name: "GLP Study & Protocol Management", link: "/glp.html" },
                { name: "GMP workflows, release testing", link: "/labusecase?case=gmp-workflows-release-testing" },

            ]
        },
        {
            id: 2,
            name: "Atomwalk AW360™ CRM",

            link: "/crm.html",
            industries: [
                { name: "Manufacturing" },
                { name: "Laboratory Services" },
                { name: "CRO & CDMO" },
                { name: "Engineering Projects" },
                { name: "Distribution & Trading" },
                { name: "Field Services" },
                { name: "Waste & Environmental Services" },
                { name: "Healthcare Providers" }
            ],
            useCases: [
                { name: "Lead Lifecycle Automation", link: "/leadManagement.html" },
                { name: "Activity & Follow-up Planning", link: "/leadManagement.html?3" },
                { name: "Product Interest & Demand Signal Tracking", link: "/leadManagement.html?2" },
                { name: "Opportunity to Order Conversion", link: "/leadManagement.html?5" },
                { name: "Quotation Workflow Management", link: "/leadManagement.html?4" },
                { name: "Customer Interaction Tracking", link: "/CustomerManagement.html" },
                { name: "AMC / Service Contract Lifecycle Management", link: "/aMCTracking.html" },
                { name: "Campaign Planning & Performance Tracking", link: "/campaignManagement.html" },
                { name: "Sales Manager Performance Dashboard", link: "/managerPerformanceDashboard.html" },
            ]
        },
        {
            id: 3,
            name: "Atomwalk AW360™ HRMS",

            link: "/hrm.html",
            industries: [
                { name: "Manufacturing Workforce Management" },
                { name: "Laboratory & CRO Staffing" },
                { name: "Field Service & Inspection Teams" },
                { name: "Engineering Project Organizations" },
                { name: "Healthcare & Hospital Staffing" },
                { name: "Distribution & Warehouse Operations" },
                { name: "Waste & Environmental Field Teams" },
                { name: "Corporate Workforce Management" }
            ],
            useCases: [
                { name: "Employee Lifecycle Automation", link: "/employeehr.html" },
                { name: "Shift & Attendance Management", link: "/attendance.html" },
                { name: "Leave Governance & Policy Automation", link: "/leave.html" },
                { name: "Payroll & Compliance Processing", link: "/payroll.html" },
                { name: "Performance & Productivity Analytics", link: "/appraisal.html" },
                { name: "Skill-based Resource Allocation", link: "/skillAllocation.html" },
                { name: "Training & Certification Tracking", link: "/training.html" },
                { name: "Time Sheet & Effort Tracking", link: "/timeSheet.html" },
                { name: "Expense Claims & Reimbursement Management", link: "/claim.html" },
                { name: "Employee Request Desk (Internal Service Portal)", link: "/emphelp.html" },
                { name: "Help Desk & Issue Resolution Tracking", link: "/emphelp.html" },
                { name: "Events, Training & Engagement Management", link: "/empevent.html" }
            ]
        },
        {
            id: 4,
            name: "Atomwalk Office ERP — Manufacturing & Process Industries",

            link: "/processandproject.html.html",
            industries: [
                { name: "Pharma Manufacturing" },
                { name: "Chemical & Process Industries" },
                { name: "Food Processing" },
                { name: "Engineering Manufacturing" },
                { name: "CDMO Production Facilities" },
                { name: "Packaging & Conversion" },
                { name: "Automotive Components" },
                { name: "Industrial Equipment Manufacturing" },
                { name: "Agro & Fertilizer Processing" }
            ],
            useCases: [
                { name: "Order-to-Cash Automation", link: "/process.html" },
                { name: "Production Planning & Scheduling", link: "/project.html" },
                { name: "Batch Traceability & Genealogy", link: "/labusecase?case=batch-traceability-data-integrity-management" },
                { name: "Inventory & Supply Chain Optimization", link: "/inventory.html" },
                { name: "Manufacturing Costing & Margin Visibility", link: "/project.html?3" },
                { name: "Project Manufacturing Management", link: "/processandproject.html" },
                { name: "Equipment Maintenance Planning", link: "/equipmentMaintenance.html" },
                { name: "Quality & Compliance Tracking", link: "/project.html?2" },
                { name: "Advanced Dashboards", link: "/activityreport.html" }
            ]
        },
        // {
        //     id: 5,
        //     name: "Atomwalk ERP — Seafood Industry",

        //     link: "https://home.atomwalk.com/product.html",
        //     industries: [
        //         { name: "Seafood & Fish Processing Plants" },
        //         { name: "Shrimp & Aquaculture Processing" },
        //         { name: "Frozen Food Manufacturing" },
        //         { name: "Marine Export Processing Units" },
        //         { name: "Cold Chain & Seafood Distribution" },
        //         { name: "Ready-to-Cook Seafood Production" }
        //     ],
        //     useCases: [
        //         { name: "Catch-Based Production Planning", },
        //         { name: "Yield Variance & Wastage Control", },
        //         { name: "Cold Storage & Shelf-Life Optimization", },
        //         { name: "Export Batch Traceability", },
        //         { name: "Multi-Stage Processing Workflow Tracking", },
        //         { name: "Demand-Driven Production Scheduling", },
        //         { name: "Container & Dispatch Planning", },
        //         { name: "Quality & Certification Compliance", }
        //     ]
        // },
        {
            id: 6,
            name: "Atomwalk Office ERP — Facility & Waste Operations Platform",
            icon: "🔬",
            link: "/facilitymanagement.html",
            industries: [
                { name: "Facility Management Services" },
                { name: "Waste Collection & Disposal Operators" },
                { name: "Biomedical Waste Management" },
                { name: "Municipal Solid Waste Contractors" },
                { name: "Industrial Waste Handling Services" },
                { name: "Housekeeping & Property Services" },
                { name: "Utility & Water Treatment Operators" },
                { name: "Environmental Inspection Agencies" }
            ],
            useCases: [
                { name: "Work Order & Service Ticket Lifecycle", link: "/facilityusecase?case=work-order-service-ticket-lifecycle" },
                { name: "Recurring Task & Service Schedule Management", link: "/facilityusecase?case=recurring-task-service-schedule-management" },
                { name: "Route Planning & Field Workforce Scheduling", link: "/facilityusecase?case=route-planning-field-workforce-scheduling" },
                { name: "Waste Segregation Compliance Tracking", link: "/facilityusecase?case=waste-segregation-compliance-tracking" },
                { name: "Asset Inspection & Maintenance Workflows", link: "/facilityusecase?case=asset-inspection-maintenance-workflows" },
                { name: "Contract SLA Monitoring & Billing Automation", link: "/facilityusecase?case=contract-sla-monitoring-billing-automation" },
                { name: "Job Costing & Contract Profitability Visibility", link: "/facilityusecase?case=job-costing-contract-profitability-visibility" },
                { name: "Environmental Performance & ESG Analytics", link: "/facilityusecase?case=environmental-performance-esg-analytics" },
                { name: "AMC & Contract Service Management", link: "/aMCTracking.html" },
                // { name: "IoT-Based Temperature / Humidity / Environment Monitoring", link: "/facilityusecase?case=iot-based-temperature-humidity-environment-monitoring" },
                { name: "Waste Inventory & Storage Lifecycle", link: "/facilityusecase?case=waste-inventory-storage-lifecycle" }
            ]
            // useCases: [
            //     { name: "Work Order & Service Ticket Lifecycle", link: "/facilitymanagement.html" },
            //     { name: "Recurring Task & Service Schedule Management", link: "/facilitymanagement.html" },
            //     { name: "Route Planning & Field Workforce Scheduling", link: "/facilitymanagement.html" },
            //     { name: "Waste Segregation Compliance Tracking", link: "/facilitymanagement.html" },
            //     { name: "Asset Inspection & Maintenance Workflows", link: "/facilitymanagement.html" },
            //     { name: "Contract SLA Monitoring & Billing Automation", link: "/facilitymanagement.html" },
            //     { name: "Job Costing & Contract Profitability Visibility", link: "/facilitymanagement.html" },
            //     { name: "Environmental Performance & ESG Analytics", link: "/facilitymanagement.html" },
            //     { name: "AMC & Contract Service Management", link: "/facilitymanagement.html" },
            //     { name: "IoT-Based Temperature / Humidity / Environment Monitoring", link: "/facilitymanagement.html" },
            //     { name: "Waste Inventory & Storage Lifecycle", link: "/facilitymanagement.html" }
            // ]
        },
        // {
        //     id: 7,
        //     name: "Atomwalk Project Management & O2C",
        //     icon: "🔬",
        //     link: "https://home.atomwalk.com/facilitymanagement.html",
        //     industries: [
        //         { name: "Audit Inspection & Certification Agencies" },
        //         { name: "IT / Technology Services" },
        //         { name: "Consulting & Professional Services" },
        //         { name: "Maintenance & AMC Service Providers" },
        //         { name: "Industrial Service Contractors" }
        //     ],
        //     useCases: [
        //         { name: "Order-to-Project Workflow Automation" },
        //         { name: "Resource Allocation & Utilization" },
        //         { name: "Time Sheet & Effort Cost Tracking" },
        //         { name: "Project Margin & Profitability Dashboard" },
        //         { name: "Contract Workforce Cost Analysis" },
        //         { name: "Expense Claims & Field Cost Governance" },
        //         { name: "Milestone & SLA Monitoring" },
        //         { name: "Billing & Revenue Dashboard" },
        //         { name: "Project Cost Leakage Detection" },
        //         { name: "Consumable & Material Usage Tracking" }
        //     ]
        // },
        // {
        //     id: 8,
        //     name: "Atomwalk ERP — Office Automation & Budget Tracking",
        //     icon: "🔬",
        //     link: "https://home.atomwalk.com/facilitymanagement.html",
        //     industries: [
        //         { name: "Co-operative Banks & Microfinance Institutions (MFI)" },
        //         { name: "Manufacturing Headquarters" },
        //         { name: "Corporate Offices & Shared Service Centers" },
        //         { name: "Educational & Research Institutions" },
        //         { name: "NGOs & Development Organizations" },
        //         { name: "Healthcare & Hospital Admin Offices" }
        //     ],
        //     useCases: [
        //         { name: "Digital Request & Approval Automation" },
        //         { name: "Department Budget Allocation & Tracking" },
        //         { name: "Cost Center Expense Monitoring" },
        //         { name: "Procurement Governance Workflows" },
        //         { name: "Travel Authorization & Claim Settlement" },
        //         { name: "Asset Request & Lifecycle Tracking" },
        //         { name: "Budget Variance & Financial Analytics" },
        //         { name: "Governance Alerts & Compliance Dashboard" }
        //     ],
        // },
        // {
        //     id: 9,
        //     name: "Atomwalk Hospital Management System (HMS)",
        //     icon: "🔬",
        //     link: "https://home.atomwalk.com/hospitalmanagement.html",
        //     industries: [
        //         { name: "Multi-Specialty Hospitals" },
        //         { name: "Super Specialty Hospitals" },
        //         { name: "Nursing Homes & Small Hospitals" },
        //         { name: "Day Care Surgery Centers" },
        //         { name: "Diagnostic Hospitals" },
        //         { name: "Maternity & Child Care Hospitals" },
        //         { name: "Dialysis & Chronic Care Centers" },
        //         { name: "Oncology Treatment Centers" },
        //         { name: "Specialty Clinics" },
        //         { name: "Hospital Chains & Healthcare Networks" },
        //         { name: "Corporate Hospitals" },
        //         { name: "Government Hospitals" }
        //     ],
        //     useCases: [
        //         { name: "Mobile Appointment & Doctor Booking" },
        //         { name: "Patient Digital Health Record Access" },
        //         { name: "Diagnostic Order & Report Management" },
        //         { name: "In-Patient Admission & Room Allocation" },
        //         { name: "Nurse & Doctor Visit Coordination" },
        //         { name: "Integrated Hospital Billing Workflow" },
        //         { name: "Discharge Summary & Clinical Documentation" },
        //         { name: "Hospital Operations & Occupancy Analytics" }
        //     ],
        // },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleMouseLeave = () => {
            onClose();
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
            menuRef.current?.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            menuRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [show, onClose]);

    // Set default selected product and its industries
    useEffect(() => {
        if (show && products.length > 0 && !hoveredProduct) {
            setHoveredProduct(products[0]);
            if (products[0].industries) {
                setIndustriesForProduct(products[0].industries);
            }
        }
    }, [show, hoveredProduct]);

    // Update use cases when industry is hovered
    useEffect(() => {
        if (hoveredIndustry) {
            const industry = industriesForProduct.find(ind => ind.name === hoveredIndustry);
            if (industry && industry.useCases) {
                setUseCases(industry.useCases);
            }
        } else {
            setUseCases(products.find(p => p.id === hoveredProduct?.id)?.useCases || []);
        }
    }, [hoveredIndustry, industriesForProduct]);

    const handleProductHover = (product) => {
        setHoveredProduct(product);
        setHoveredIndustry(null);
        setUseCases([]);
        if (product.industries) {
            setIndustriesForProduct(product.industries);
        } else {
            setIndustriesForProduct([]);
        }
    };

    const handleProductClick = (link, e) => {
        e.stopPropagation();
        if (link) {
            window.location.href = link;
        }
    };

    const handleIndustryHover = (industryName) => {
        setHoveredIndustry(industryName);
    };

    const handleIndustryClick = (link, e) => {
        e.stopPropagation();
        if (link) {
            window.location.href = link;
        }
    };

    const handleUseCaseClick = (link, e) => {
        e.stopPropagation();
        if (link) {
            window.location.href = link;
        }
    };

    if (!show) return null;

    return (
        <MenuContainer ref={menuRef} top={`${navbarHeight}px`}>
            <CloseButton onClick={onClose}>✕</CloseButton>
            <MobileIndicator>
                👆 Hover on any product to see industries, then hover on industries to see use cases
            </MobileIndicator>
            <MenuContent>
                <ThreeColumnLayout>
                    {/* Products Column */}
                    <ProductsColumn>
                        <ColumnTitle>Products</ColumnTitle>
                        <ProductList>
                            {products.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    hovered={hoveredProduct?.id === product.id}
                                    onMouseEnter={() => handleProductHover(product)}
                                >
                                    <ProductTitle>
                                        {/* <span className="icon">{product.icon}</span> */}
                                        {product.name}
                                    </ProductTitle>
                                    <ProductLink
                                        onClick={(e) => handleProductClick(product.link, e)}
                                    >
                                        Learn More →
                                    </ProductLink>
                                </ProductItem>
                            ))}
                        </ProductList>
                    </ProductsColumn>

                    {/* Industries Column - Shows industries for hovered product */}
                    <IndustriesColumn>
                        <ColumnTitle>
                            {hoveredProduct ? `${hoveredProduct.name} Industries` : "Industries"}
                        </ColumnTitle>
                        {hoveredProduct ? (
                            <IndustryList>
                                {industriesForProduct.map((industry, idx) => (
                                    <IndustryItem
                                        key={idx}
                                        hovered={hoveredIndustry === industry.name}
                                        onMouseEnter={() => handleIndustryHover(industry.name)}
                                        onClick={(e) => handleIndustryClick(industry.link, e)}
                                    >
                                        <IndustryName>{industry.name}</IndustryName>
                                    </IndustryItem>
                                ))}
                            </IndustryList>
                        ) : (
                            <EmptyState>
                                <div className="icon">🏭</div>
                                <p>Hover over a product to see industries</p>
                            </EmptyState>
                        )}
                    </IndustriesColumn>

                    {/* Use Cases Column - Shows use cases of hovered industry */}
                    <UseCasesColumn>
                        <ColumnTitle>Use Cases</ColumnTitle>
                        {hoveredIndustry && hoveredProduct ? (
                            <>
                                <UseCaseTitle>
                                    <span className="arrow">→</span>
                                    {hoveredIndustry} for {hoveredProduct.name}
                                </UseCaseTitle>
                                <UseCaseList>
                                    {useCases.map((useCase, idx) => (
                                        <UseCaseItem
                                            key={idx}
                                            onClick={(e) => handleUseCaseClick(useCase.link, e)}
                                        >
                                            <UseCaseName>{useCase.name}</UseCaseName>
                                            {/* <UseCaseDescription>
                                                Explore {useCase.name.toLowerCase()} for {hoveredIndustry} with {hoveredProduct.name}
                                            </UseCaseDescription> */}
                                        </UseCaseItem>
                                    ))}
                                </UseCaseList>
                            </>
                        ) : (
                            <EmptyState>
                                <div className="icon">🎯</div>
                                <p>Hover over any industry to see its use cases</p>
                            </EmptyState>
                        )}
                    </UseCasesColumn>
                </ThreeColumnLayout>
            </MenuContent>
        </MenuContainer>
    );
};

export default WhatWeDoMenu;