import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaCertificate,
  FaClipboardCheck,
  FaCloud,
  FaFileSignature,
  FaUserCog,
  FaHandshake,
  FaTools,
  FaBuilding,
  FaFlask,
  FaProjectDiagram,
} from 'react-icons/fa';
import Collection from '../../assets/img/garbage-flowchart.png'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const WasteManagementSection = styled.div`
  background-color: #E5FBFF;
  padding: 3rem 0;
`;
// Styled Components
const FeaturesContainer = styled.div`
  max-width: 1200px;
  background-color: #E5FBFF;
  margin: 3rem auto;
  padding: 0 1.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  color: #1a5276;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  font-weight: 700;
  
  &:after {
    content: '';
    display: block;
    width: 120px;
    height: 5px;
    background: linear-gradient(90deg, #1a5276, #28b463);
    margin: 1rem auto;
    border-radius: 3px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  border-left: 5px solid ${props => props.color || '#28b463'};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: ${props => props.color || '#28b463'};
      animation: ${pulse} 2s infinite;
    }
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${props => props.color || '#1a5276'};
`;

const FeatureIcon = styled.div`
  font-size: 2.2rem;
  margin-right: 1.2rem;
  color: ${props => props.color || '#28b463'};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
`;

const FeatureList = styled.ul`
  padding-left: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
  position: relative;
  padding-left: 2rem;
  list-style: none;
  line-height: 1.6;
  color: black;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.color || '#28b463'};
  }
`;

const ConclusionSection = styled.div`
  background: linear-gradient(135deg, #1a5276, #28b463);
  color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 3rem;
  animation: ${gradientBackground} 10s ease infinite;
  background-size: 200% 200%;
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
`;

const ConclusionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const ConclusionText = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const ConclusionList = styled.ul`
  list-style: none;
  padding: 0;
  display: inline-block;
  text-align: left;
  max-width: 750px;
`;

const ConclusionItem = styled.li`
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  position: relative;
  padding-left: 2rem;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #82e0aa;
    font-weight: bold;
    font-size: 1.3rem;
  }
`;

const Highlight = styled.span`
  color: #82e0aa;
  font-weight: 600;
`;

const BenefitsSection = styled.div`
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  padding: 2rem 1rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.03);
  animation: ${fadeIn} 0.8s ease-out;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
    margin: 3rem 0;
  }
`;

const BenefitsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
`;

const BenefitsContent = styled.div`
  order: 2;
  
  @media (min-width: 992px) {
    order: 1;
  }
`;

const BenefitsTitle = styled.h3`
  color: #1a5276;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  
  @media (min-width: 576px) {
    font-size: 1.7rem;
    text-align: left;
  }
  
  @media (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const BenefitsDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #454545;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (min-width: 576px) {
    font-size: 1.1rem;
    text-align: left;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
  
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  background: rgba(255,255,255,0.7);
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.08);
    background: white;
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const BenefitIcon = styled.span`
  color: #28b463;
  font-size: 1.2rem;
  margin-right: 0.8rem;
  flex-shrink: 0;
  margin-top: 0.2rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
`;

const BenefitText = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #454545;
  
  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const BenefitsImage = styled.div`
  order: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  max-width: 100%;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  @media (min-width: 992px) {
    order: 2;
    height: 100%;
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  }
`;

// React Component
const GlpDetails = () => {
  return (
    <WasteManagementSection>
      <FeaturesContainer>
        <SectionTitle>Future-Proof Your Lab: Advanced GLP Solutions</SectionTitle>
        
      <FeatureGrid>
        <FeatureCard color="#3498db">
          <FeatureHeader color="#3498db">
            <FeatureIcon color="#3498db"><FaUserCog /></FeatureIcon>
            <FeatureTitle>HRMS, Training & Activity Authorization</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#3498db">Centralized employee profiles, roles, documents management</FeatureItem>
            <FeatureItem color="#3498db">Maintain training history and compliance reports</FeatureItem>
            <FeatureItem color="#3498db">Assign only qualified staff to activities</FeatureItem>
            <FeatureItem color="#3498db">Lab-wise activity authorization matrix defined</FeatureItem>
            <FeatureItem color="#3498db">Role-based access with segregation of duties</FeatureItem>
            <FeatureItem color="#3498db">Auto-update authorization on role/training change</FeatureItem>
            <FeatureItem color="#3498db">Maintain authorization logs and audit trails</FeatureItem>
            <FeatureItem color="#3498db">Multi-level approvals with periodic reauthorization reviews</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#2ecc71">
          <FeatureHeader color="#2ecc71">
            <FeatureIcon color="#2ecc71"><FaHandshake /></FeatureIcon>
            <FeatureTitle>Supplier / Vendor Management</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#2ecc71">Centralized supplier and vendor registry</FeatureItem>
            <FeatureItem color="#2ecc71">Maintain contracts and supplier documents</FeatureItem>
            <FeatureItem color="#2ecc71">Supplier qualification and approval workflows</FeatureItem>
            <FeatureItem color="#2ecc71">Track supplier performance (quality, delivery, reliability)</FeatureItem>
            <FeatureItem color="#2ecc71">Supplier monitoring and corrective action records</FeatureItem>
            <FeatureItem color="#2ecc71">Manage supplier audits and requalification</FeatureItem>
            <FeatureItem color="#2ecc71">Track service providers for calibration/maintenance</FeatureItem>
            <FeatureItem color="#2ecc71">Generate supplier compliance and audit reports</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#e74c3c">
          <FeatureHeader color="#e74c3c">
            <FeatureIcon color="#e74c3c"><FaTools /></FeatureIcon>
            <FeatureTitle>Lab Equipment Management</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#e74c3c">Complete equipment master list with lifecycle tracking</FeatureItem>
            <FeatureItem color="#e74c3c">Preventive maintenance schedules and breakdown history</FeatureItem>
            <FeatureItem color="#e74c3c">Manage Equipment Software Update Detail</FeatureItem>
            <FeatureItem color="#e74c3c">Service logs with vendor/technician details</FeatureItem>
             <FeatureItem color="#e74c3c">Integrated calibration management with SOP references and certificates</FeatureItem>
            <FeatureItem color="#e74c3c">Record calibration readings with version control</FeatureItem>
            <FeatureItem color="#e74c3c">Track equipment usage logs and booking system</FeatureItem>
            <FeatureItem color="#e74c3c">Generate equipment calibration compliance reports</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#f39c12">
          <FeatureHeader color="#f39c12">
            <FeatureIcon color="#f39c12"><FaBuilding /></FeatureIcon>
            <FeatureTitle>Facility Management</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#e74c3c">Manage lab locations and sub-location hierarchy</FeatureItem>
            <FeatureItem color="#e74c3c">Create and assign lab tasks with ownership and deadlines</FeatureItem>
            <FeatureItem color="#e74c3c">Recurring task schedules for maintenance and cleaning</FeatureItem>
            <FeatureItem color="#e74c3c">Track task completion with status history</FeatureItem>
             <FeatureItem color="#e74c3c">Lab instrument registry with device IDs and active status</FeatureItem>
            <FeatureItem color="#e74c3c">Record manual or automated readings for instruments</FeatureItem>
            <FeatureItem color="#e74c3c">Schedule environmental monitoring tasks</FeatureItem>
            <FeatureItem color="#e74c3c">Generate facility-wise compliance reports</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#9b59b6">
          <FeatureHeader color="#9b59b6">
            <FeatureIcon color="#9b59b6"><FaFlask /></FeatureIcon>
            <FeatureTitle>Sample & Test Item Management</FeatureTitle>
          </FeatureHeader>
        <FeatureList>
            <FeatureItem color="#e74c3c">Manage comprehensive lab sample item details</FeatureItem>
            <FeatureItem color="#e74c3c">Add, update, or delete sample records</FeatureItem>
            <FeatureItem color="#e74c3c">Track sample details: project, date, quantity, address</FeatureItem>
            <FeatureItem color="#e74c3c">Record sample type, temperature, batch, mfg/expiry dates</FeatureItem>
             <FeatureItem color="#e74c3c">Link samples directly to specific projects</FeatureItem>
            <FeatureItem color="#e74c3c">Maintain sample location with audit trail</FeatureItem>
            <FeatureItem color="#e74c3c">Add remarks and attach supporting files</FeatureItem>
            <FeatureItem color="#e74c3c">Simplifies sample management for audits and operations</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#1abc9c">
          <FeatureHeader color="#1abc9c">
            <FeatureIcon color="#1abc9c"><FaProjectDiagram /></FeatureIcon>
            <FeatureTitle>Project Management</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#e74c3c">Manage multiple lab projects with timelines</FeatureItem>
            <FeatureItem color="#e74c3c">Assign responsibilities and track project progress</FeatureItem>
            <FeatureItem color="#e74c3c">Generate access-controlled reports</FeatureItem>
            <FeatureItem color="#e74c3c">Monitor deliverables and ensure deadlines are met</FeatureItem>
             <FeatureItem color="#e74c3c">Record detailed activity logs with version control</FeatureItem>
            <FeatureItem color="#e74c3c">Attach project documents and maintain history</FeatureItem>
            <FeatureItem color="#e74c3c">Track dependencies and automated reminders for tasks</FeatureItem>
            <FeatureItem color="#e74c3c">Centralized dashboard for quick project oversight</FeatureItem>
            <FeatureItem color="#e74c3c">Manage grant orders with approval tracking</FeatureItem>
            <FeatureItem color="#e74c3c">Perform projects against specific grants</FeatureItem>
          </FeatureList>
        </FeatureCard>
      </FeatureGrid>
      
      <BenefitsSection>
          <BenefitsContainer>
            <BenefitsContent>
              <BenefitsTitle>GLP Compliance Redefined: Delivering Unprecedented Efficiency and Data Integrity</BenefitsTitle>
              <BenefitsDescription>
              GLP compliance with traditional, paper-based methods is notoriously challenging, leading to manual errors, traceability gaps, and significant audit risks. A GLP-focused ERP system streamlines and automates your entire lab workflow, from study initiation to final reporting. With real-time data integrity and built-in controls, your lab achieves effortless compliance and undeniable data reliability.
              </BenefitsDescription>
              
           
<BenefitsGrid>
  <BenefitItem>
    <BenefitIcon><FaCertificate /></BenefitIcon>
    <BenefitText>
      <strong>ISO 9001 & ISO 13485 Compliant </strong><br />
      Internationally recognized quality standards
    </BenefitText>
  </BenefitItem>

  <BenefitItem>
    <BenefitIcon><FaClipboardCheck /></BenefitIcon>
    <BenefitText>
      <strong>Data Integrity Aligned with ALCOA Principles </strong><br />
      Attributable, Legible, Contemporaneous, Original, and Accurate
    </BenefitText>
  </BenefitItem>

  <BenefitItem>
    <BenefitIcon><FaCloud /></BenefitIcon>
    <BenefitText>
      <strong>Cloud-Based Data Storage </strong><br />
      Secure, scalable, and accessible anytime, anywhere
    </BenefitText>
  </BenefitItem>

  <BenefitItem>
    <BenefitIcon><FaFileSignature /></BenefitIcon>
    <BenefitText>
      <strong>Audit-Ready Records </strong><br />
      Simplifies inspections with traceable documentation
    </BenefitText>
  </BenefitItem>
</BenefitsGrid>

            </BenefitsContent>
            <BenefitsImage>
              {/* Replace with your actual image */}
              <img 
                src= "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/GLP_Overview.png" 
                alt="Waste management workflow" 
              />
            </BenefitsImage>
          </BenefitsContainer>
        </BenefitsSection>
      
      
      <ConclusionSection>
        <ConclusionTitle>The GLP Platform for a Smarter Lab</ConclusionTitle>
        <ConclusionText>
          Simplify complex <Highlight>compliance</Highlight> and maximize your  <Highlight>lab's</Highlight>, 
          efficiency with our all-in-one digital solution. Our traceable and reliable platform keeps you ahead.
        </ConclusionText>
        <ConclusionList>
          <ConclusionItem><strong>Centralized Control:</strong> Unified management for projects, animal groups, and test data.</ConclusionItem>
          <ConclusionItem><strong>Insight-Driven:</strong> Data empowers you to make informed decisions, not assumptions.</ConclusionItem>
          <ConclusionItem><strong>Intuitive for All:</strong> Streamlined user interface for your whole team.</ConclusionItem>
          <ConclusionItem><strong>Audit-Ready, Always:</strong> Capture data from anywhere with our dedicated mobile app.</ConclusionItem>
          <ConclusionItem><strong>Mobile-First Flexibility:</strong> Capture data from anywhere with our dedicated mobile app.</ConclusionItem>
        </ConclusionList>
      </ConclusionSection>
    </FeaturesContainer>
    </WasteManagementSection>
  );
};

export default GlpDetails;