import React from 'react';
import styled, { keyframes } from 'styled-components';
import Collection from '../../assets/img/H_step_5(1).png'
import {
  FaSmileBeam,
  FaFolderOpen,
} from 'react-icons/fa';
import {
  FaUserMd,
  FaUserPlus,
  FaCalendarCheck,
  FaFileInvoice,
  FaBox,
  FaBed,
} from 'react-icons/fa';

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
  max-width: 600px;
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

const HmsDetails = () => {
  return (
    <WasteManagementSection>
      <FeaturesContainer>
        <SectionTitle>Advanced Hospital Tools for Easy Healthcare and Operations</SectionTitle>

        <FeatureGrid>
          <FeatureCard color="#3498db">
            <FeatureHeader color="#3498db">
              <FeatureIcon color="#3498db"><FaUserMd /></FeatureIcon>
              <FeatureTitle>Doctor and Staff Management</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#3498db">Access real-time EHRs with patient vitals, lab results, and histories for doctors.</FeatureItem>
              <FeatureItem color="#3498db">Streamline doctor diagnostics and prescriptions.</FeatureItem>
              <FeatureItem color="#3498db">Coordinate nurse, cleaner, and technician roles with secure access.</FeatureItem>
              <FeatureItem color="#3498db">Schedule staff shifts with automated email and app notifications.</FeatureItem>
              <FeatureItem color="#3498db">Monitor staff performance and efficiency with workload analytics.</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#2ecc71">
            <FeatureHeader color="#2ecc71">
              <FeatureIcon color="#2ecc71"><FaUserPlus /></FeatureIcon>
              <FeatureTitle>Patient Management</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#2ecc71">Register patients with demographics, insurance, and unique IDs and QR code.</FeatureItem>
              <FeatureItem color="#2ecc71">Allocate patients to OPD or in-patient care based on triage and symptoms.</FeatureItem>
              <FeatureItem color="#2ecc71">Store medical history, allergies, and previous visits for continuity of care.</FeatureItem>
              <FeatureItem color="#2ecc71">Enable rapid emergency registration with minimal data for critical cases.</FeatureItem>
              <FeatureItem color="#2ecc71">Collect patient feedback on care quality to improve services.</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#e74c3c">
            <FeatureHeader color="#e74c3c">
              <FeatureIcon color="#e74c3c"><FaCalendarCheck /></FeatureIcon>
              <FeatureTitle>Book an Appointment</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#e74c3c">Book appointments with real-time doctor and slot availability.</FeatureItem>
              <FeatureItem color="#e74c3c">Select doctors by specialty, or ratings with current schedules.</FeatureItem>
              <FeatureItem color="#e74c3c">Reschedule or cancel bookings in-app with instant confirmations.</FeatureItem>
              <FeatureItem color="#e74c3c">Organize appointments with calendar sync and app reminders.</FeatureItem>
              <FeatureItem color="#e74c3c">Manage profile, health records, and visits for tailored bookings.</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#f39c12">
            <FeatureHeader color="#f39c12">
              <FeatureIcon color="#f39c12"><FaFileInvoice /></FeatureIcon>
              <FeatureTitle>Billing, Invoicing, and Documentation</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#f39c12">Create detailed bills with tax breakdowns (GST, VAT) for services, tests, and medications.</FeatureItem>
              <FeatureItem color="#f39c12">Validate insurance policies and monitor claim progress for seamless reimbursements.</FeatureItem>
              <FeatureItem color="#f39c12">Upload pathology reports and lab results for secure access by patients and doctors.</FeatureItem>
              <FeatureItem color="#f39c12">Auto-generate discharge summaries with treatment details and follow-up plans.</FeatureItem>
              <FeatureItem color="#f39c12">Store medical records in the MRD for compliance and easy retrieval.</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#9b59b6">
            <FeatureHeader color="#9b59b6">
              <FeatureIcon color="#9b59b6"><FaBox /></FeatureIcon>
              <FeatureTitle>Inventory Management</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#9b59b6">Track medicine stock with batch numbers, expiry dates, and reorder alerts.</FeatureItem>
              <FeatureItem color="#9b59b6">Monitor surgical tools and disposables (e.g., gloves).</FeatureItem>
              <FeatureItem color="#9b59b6">Log wastage of expired/damaged items and manage supplier contacts.</FeatureItem>
              <FeatureItem color="#9b59b6">Dispense medications via pharmacy module, syncing with patient prescriptions.</FeatureItem>
              <FeatureItem color="#9b59b6">Generate inventory reports to optimize stock levels and reduce costs.</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#1abc9c">
            <FeatureHeader color="#1abc9c">
              <FeatureIcon color="#1abc9c"><FaBed /></FeatureIcon>
              <FeatureTitle>In-Patient Management</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#1abc9c">Assign beds by department, ward, or special needs (e.g., ICU, isolation).</FeatureItem>
              <FeatureItem color="#1abc9c">Track daily rounds, medications, and dietary requirements in real time.</FeatureItem>
              <FeatureItem color="#1abc9c">Prepare discharge plans with automated summaries and billing integration.</FeatureItem>
              <FeatureItem color="#1abc9c">Monitor bed status (available, occupied, cleaning) via live dashboards.</FeatureItem>
              <FeatureItem color="#1abc9c">Trigger alerts for high-risk patients or insurance expiry to ensure compliance.</FeatureItem>
            </FeatureList>
          </FeatureCard>
        </FeatureGrid>

        <BenefitsSection>
          <BenefitsContainer>
            <BenefitsContent>
              <BenefitsTitle>Simplifying Healthcare through Centralized Digital Management</BenefitsTitle>
              <BenefitsDescription>
                Manual processes in hospitals lead to delayed care, miscommunication, and inefficiencies. Atomwalk HMS, integrated with ERP systems, resolves these challenges with real-time patient monitoring, intelligent scheduling, robust reporting, and secure data management—ensuring timely, transparent, and high-quality healthcare delivery.
              </BenefitsDescription>

              {/* <BenefitsGrid>
                <BenefitItem>
                  <BenefitIcon><FaCity /></BenefitIcon>
                  <BenefitText>
                    <strong>Urban Waste Challenges</strong><br />
                    Handles complex waste from residential, commercial, industrial, and medical sources
                  </BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><FaUsers /></BenefitIcon>
                  <BenefitText>
                    <strong>Stakeholder Integration</strong><br />
                    Connects waste generators, collectors, processors, and regulators
                  </BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><FaHandshake /></BenefitIcon>
                  <BenefitText>
                    <strong>Compliance Assurance</strong><br />
                    Automated reporting for BBMP, KSPCB and other regulatory bodies
                  </BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><FaBalanceScale /></BenefitIcon>
                  <BenefitText>
                    <strong>Sustainable Practices</strong><br />
                    Promotes circular economy through optimized recycling processes
                  </BenefitText>
                </BenefitItem>
              </BenefitsGrid> */}

              <BenefitsGrid>
                <BenefitItem>
                  <BenefitIcon><FaCalendarCheck /></BenefitIcon>
                  <BenefitText>
                    <strong>Centralized Patient and Staff Management</strong><br />
                    Manage patient registrations, treatment plans, staff schedules, and bed assignments from a unified interface with automated workflows.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon><FaFileInvoice /></BenefitIcon>
                  <BenefitText>
                    <strong>Real-Time Care and Operational Monitoring</strong><br />
                    Track patient vitals, test results, staff tasks, and bed statuses live from intuitive dashboards.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon><FaFolderOpen /></BenefitIcon>
                  <BenefitText>
                    <strong>Compliance and Performance Logs</strong><br />
                    Maintain detailed records of treatments, staff actions, billing, and inventory for audits, compliance, and operational reviews.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon><FaSmileBeam /></BenefitIcon>
                  <BenefitText>
                    <strong>Patient and Staff Satisfaction</strong><br />
                    Enhance care delivery and staff efficiency with faster responses, clear communication, and organized processes, improving outcomes and morale.
                  </BenefitText>
                </BenefitItem>
              </BenefitsGrid>


            </BenefitsContent>
            <BenefitsImage>
              {/* Replace with your actual image */}
              <img
                src={Collection}
                alt="Waste management workflow"
              />
            </BenefitsImage>
          </BenefitsContainer>
        </BenefitsSection>


        <ConclusionSection>
          <ConclusionTitle>Enhancing Healthcare with Smart Technology and  Staff Coordination</ConclusionTitle>
          <ConclusionText>
            Atomwalk Healthcare Management System brings structure, speed, and precision to hospital operations. By bridging <Highlight>clinical staff</Highlight>, <Highlight>administrators</Highlight>, and <Highlight>patients</Highlight>, it drives efficient care delivery, operational excellence, and workforce optimization.
          </ConclusionText>
          <ConclusionList>
            <ConclusionItem><strong>Unified Patient Profiles:</strong> Register patients and staff for instant data access across departments.</ConclusionItem>
            <ConclusionItem><strong>Instant Staff Updates:</strong> Connect doctors, nurses, and staff with mobile alerts and schedules.</ConclusionItem>
            <ConclusionItem><strong>Efficient Care Monitoring:</strong> Track patient care, staff performance, and resources with minimal oversight.</ConclusionItem>
            <ConclusionItem><strong>Data-Driven Optimization:</strong> Improve bed usage, staff allocation, and outcomes with real-time insights.</ConclusionItem>
            <ConclusionItem><strong>Advanced Clinical Support:</strong> Equip doctors and nurses for diagnostics, treatment, and care coordination.</ConclusionItem>
            <ConclusionItem><strong>Rapid Diagnostics Delivery:</strong> Deliver fast, accurate lab and radiology results across departments.</ConclusionItem>
          </ConclusionList>
        </ConclusionSection>
      </FeaturesContainer>
    </WasteManagementSection>
  );
};

export default HmsDetails;