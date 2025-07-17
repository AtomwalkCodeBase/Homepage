import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiSearch, 
  FiUsers, 
  FiBriefcase, 
  FiTrendingUp, 
  FiShoppingCart,
  FiPackage,
  FiEye,
  FiArrowRight
} from 'react-icons/fi';

// Styled Components
const ManualDashboardWrapper = styled.div`
  width: 100%;
  background: #f9fafb;
  min-height: 100vh;
`;

const ManualDashboard = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 40px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const DashboardHeader = styled.header`
  margin-bottom: 60px;
  text-align: center;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  color: #111827;
  margin-bottom: 16px;
  font-weight: 800;
  letter-spacing: -0.05em;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchPanel = styled.div`
  max-width: 700px;
  margin: 40px auto;
  position: relative;
`;

const SearchField = styled.input`
  width: 100%;
  padding: 18px 25px 18px 56px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1.05rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: white;
  color: #374151;

  &:focus {
    outline: none;
    border-color: #a5b4fc;
    box-shadow: 0 4px 20px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1.3rem;
`;

const ModulesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 32px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ModuleCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01);
    border-color: #c7d2fe;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || '#4f46e5'};
    z-index: 2;
  }
`;

const ModuleHeader = styled.div`
  padding: 28px;
  background: white;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #f3f4f6;
`;

const ModuleIcon = styled.div`
  background: ${props => props.color || '#4f46e5'};
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  svg {
    font-size: 1.8rem;
  }
`;

const ModuleTitleWrapper = styled.div`
  flex: 1;
`;

const ModuleTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.01em;
`;

const ModuleSubtitle = styled.p`
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
`;

const ModuleBody = styled.div`
  padding: 28px;
  flex: 1;
`;

const ModuleDescription = styled.p`
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1rem;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const FeatureItem = styled.li`
  padding: 10px 0;
  display: flex;
  align-items: center;
  color: #4b5563;
  font-size: 0.95rem;
  position: relative;
  padding-left: 24px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 18px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.color || '#4f46e5'};
  }
`;

const ModuleFooter = styled.div`
  padding: 20px 28px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VersionInfo = styled.div`
  font-size: 0.85rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VersionBadge = styled.span`
  background: #e5e7eb;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
  color: #4b5563;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const PrimaryButton = styled.button.attrs({ 
    type: 'button' 
  })`
    padding: 10px 18px;
    background: ${props => props.color || '#4f46e5'};
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
    &:hover {
      background: ${props => props.hoverColor || '#4338ca'};
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  
    &:active {
      transform: translateY(0);
    }
  `;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 16px;
    color: #111827;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const Tag = styled.span`
  background: ${props => props.color || '#e0e7ff'};
  color: ${props => props.textColor || '#4f46e5'};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

// Module data with specific colors and icons
const systemModules = [
  {
    id: 1,
    title: "HRM System",
    subtitle: "Human Resource Management",
    icon: <FiUsers />,
    link: '/hrmanual.html',
    color: "#4f46e5",
    hoverColor: "#4338ca",
    description: "Comprehensive guide for managing employee lifecycle, attendance, payroll, and HR operations with best practices and configuration details.",
    features: [
      "Employee onboarding processes",
      "Leave and attendance management",
      "Payroll configuration",
      "Performance evaluation"
    ],
    version: "v0.0.1",
    lastUpdated: "Updated on 07-05-2025",
    tags: ["HR", "Employees", "Payroll"]
  },
  {
    id: 2,
    title: "CRM System",
    subtitle: "Customer Relationship Management",
    icon: <FiBriefcase />,
    link: '/crmanual.html',
    color: "#06b6d4",
    hoverColor: "#0891b2",
    description: "Complete documentation for managing customer interactions, sales pipelines, and marketing campaigns with integration guides.",
    features: [
      "Lead management",
      "Sales pipeline configuration",
      "Customer segmentation",
      "Reporting and analytics"
    ],
    version: "v0.0.0",
    lastUpdated: "Updated on 07-05-2025",
    tags: ["Sales", "Customers", "Marketing"]
  },
  {
    id: 3,
    title: "Project Management",
    subtitle: "Task and Project Tracking",
    icon: <FiTrendingUp />,
    link: '/projectmanual.html',
    color: "#10b981",
    hoverColor: "#0d9488",
    description: "Guide to managing projects, tasks, timelines, and team collaboration features with screenshots and examples.",
    features: [
      "Project setup and templates",
      "Task assignment and tracking",
      "Gantt charts and timelines",
      "Resource allocation"
    ],
    version: "v0.0.0",
    lastUpdated: "Updated on 07-05-2025",
    tags: ["Projects", "Tasks", "Collaboration"]
  },
  {
    id: 4,
    title: "Sales Operations",
    subtitle: "Sales and Order Management",
    icon: <FiShoppingCart />,
    link: '/salesmanual.html',
    color: "#f59e0b",
    hoverColor: "#d97706",
    description: "Documentation for sales processes, order management, and invoicing systems with workflow diagrams.",
    features: [
      "Order processing workflows",
      "Invoice generation",
      "Discount and promotion setup",
      "Sales reporting"
    ],
    version: "v0.0.0",
    lastUpdated: "Updated on 07-05-2025",
    tags: ["Orders", "Invoices", "Deals"]
  },
  {
    id: 5,
    title: "Procurement",
    subtitle: "Purchase and Vendor Management",
    icon: <FiPackage />,
    link: '',
    color: "#8b5cf6",
    hoverColor: "#7c3aed",
    description: "Manual for procurement processes, vendor management, and purchase order systems with approval workflows.",
    features: [
      "Vendor onboarding",
      "Purchase requisitions",
      "Approval workflows",
      "Inventory integration"
    ],
    version: "v0.0.0",
    lastUpdated: "Updated on 07-05-2025",
    tags: ["Purchasing", "Vendors", "Approvals"]
  },
  {
    id: 6,
    title: "Inventory Management",
    subtitle: "Stock and Warehouse Control",
    icon: <FiPackage />,
    link: '',
    color: "#ec4899",
    hoverColor: "#db2777",
    description: "Complete guide to inventory tracking, warehouse management, and stock control with barcode support.",
    features: [
      "Inventory categorization",
      "Stock movement tracking",
      "Reorder point setup",
      "Barcode integration"
    ],
    version: "v0.0.0",
    lastUpdated: "Updated on 07-05-2025",
    tags: ["Stock", "Warehouse", "Products"]
  },
  
  {
    id: 7,
    title: "Employee HRMS",
    subtitle: "Human Resource Management System",
    icon: <FiUsers />,
    link: '/employeehrmsmanual.html',
    color: "#4f46e5",
    hoverColor: "#4338ca",
    description: "Comprehensive system to manage employee lifecycle, leave, payroll, attendance, and performance with automation and efficiency.",
    features: [
      "Employee onboarding & offboarding",
      "Leave & attendance tracking",
      "Payroll processing & compliance",
      "Performance appraisal workflows",
    ],
    version: "v0.0.1",
    lastUpdated: "Updated on 07-05-2025",
    tags: ["HR", "Employees", "Payroll"]
  },
];

const ManualModules = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = systemModules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ManualDashboardWrapper>
      <ManualDashboard>
        <DashboardHeader>
          <MainTitle>System Documentation Hub</MainTitle>
          <Subtitle>
            Access comprehensive manuals for all enterprise systems. Find guides, tutorials, 
            and reference materials for each module in our organization.
          </Subtitle>
          
          <SearchPanel>
            <SearchIcon />
            <SearchField
              type="text"
              placeholder="Search manuals by module, feature, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchPanel>
        </DashboardHeader>

        <ModulesContainer>
          {filteredModules.length > 0 ? (
            filteredModules.map((module) => (
              <ModuleCard key={module.id} color={module.color}>
                <ModuleHeader>
                  <ModuleIcon color={module.color}>{module.icon}</ModuleIcon>
                  <ModuleTitleWrapper>
                    <ModuleTitle>{module.title}</ModuleTitle>
                    <ModuleSubtitle>{module.subtitle}</ModuleSubtitle>
                    <TagContainer>
                      {module.tags.map((tag, index) => (
                        <Tag key={index} color={`${module.color}20`} textColor={module.color}>
                          {tag}
                        </Tag>
                      ))}
                    </TagContainer>
                  </ModuleTitleWrapper>
                </ModuleHeader>
                
                <ModuleBody>
                  <ModuleDescription>{module.description}</ModuleDescription>
                  <FeatureList>
                    {module.features.map((feature, index) => (
                      <FeatureItem key={index} color={module.color}>{feature}</FeatureItem>
                    ))}
                  </FeatureList>
                </ModuleBody>
                
                <ModuleFooter>
                  <VersionInfo>
                    <VersionBadge>{module.version}</VersionBadge>
                    <span>{module.lastUpdated}</span>
                  </VersionInfo>
                  <ActionButtons>
                    <PrimaryButton 
                      onClick={() => window.location.href = module.link}
                      color={module.color}
                      hoverColor={module.hoverColor}
                    >
                      <FiEye /> View Manual <FiArrowRight size={16} />
                    </PrimaryButton>
                  </ActionButtons>
                </ModuleFooter>
              </ModuleCard>
            ))
          ) : (
            <NoResults>
              <h3>No documentation found</h3>
              <p>We couldn't find any manuals matching "{searchQuery}". Try different keywords or browse all modules.</p>
            </NoResults>
          )}
        </ModulesContainer>
      </ManualDashboard>
    </ManualDashboardWrapper>
  );
};

export default ManualModules;