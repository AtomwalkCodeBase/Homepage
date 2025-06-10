import React from 'react';
import styled, { keyframes } from 'styled-components';
import facility from '../../assets/img/Step_5.png'
import { FaTools, FaBuilding, FaHandshake, FaFileAlt, FaMoneyBillWave, FaChartBar, FaChartLine, FaUsers } from 'react-icons/fa';
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

const FmsDetails = () => {
  return (
    <WasteManagementSection>
      <FeaturesContainer>
        <SectionTitle>Advanced Facility Management Details</SectionTitle>

        <FeatureGrid>
          <FeatureCard color="#3498db">
            <FeatureHeader color="#3498db">
              <FeatureIcon color="#3498db">
                <FaTools />
              </FeatureIcon>
              <FeatureTitle>Maintenance Management</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#3498db">Work Order Automation – Schedule and manage routine and ad-hoc tasks</FeatureItem>
              <FeatureItem color="#3498db">Technician Mobile App – Update jobs, attach proof of work on-site</FeatureItem>
              <FeatureItem color="#3498db">Predictive Maintenance – Reduce breakdowns through smart asset usage analysis</FeatureItem>
              <FeatureItem color="#3498db">Preventive Scheduling – System-driven tasks for regular maintenance cycles</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#2ecc71">
            <FeatureHeader color="#2ecc71">
              <FeatureIcon color="#2ecc71">
                <FaBuilding />
              </FeatureIcon>
              <FeatureTitle>Space & Asset Optimization</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#2ecc71">Dynamic Space Planning – View interactive floor layouts and occupancy data</FeatureItem>
              <FeatureItem color="#2ecc71">Asset Lifecycle Tracking – From acquisition to disposal with full maintenance logs</FeatureItem>
              <FeatureItem color="#2ecc71">Inventory Management – Real-time updates on spare parts, tools, and consumables</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#e74c3c">
            <FeatureHeader color="#e74c3c">
              <FeatureIcon color="#e74c3c">
                <FaHandshake />
              </FeatureIcon>
              <FeatureTitle>Vendor & Contract Management</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#e74c3c">Contract Oversight – SLA tracking, contract expiry alerts, and task assignments</FeatureItem>
              <FeatureItem color="#e74c3c">Performance Monitoring – Measure and rate third-party vendor service quality</FeatureItem>
              <FeatureItem color="#e74c3c">Access Logs – Role-based access for vendors and visitor entries</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#f39c12">
            <FeatureHeader color="#f39c12">
              <FeatureIcon color="#f39c12">
                <FaFileAlt />
              </FeatureIcon>
              <FeatureTitle>Compliance & Documentation</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#f39c12">Audit Trails – Maintain secure digital logs for inspections</FeatureItem>
              <FeatureItem color="#f39c12">Document Automation – Auto-generate reports for regulatory compliance</FeatureItem>
              <FeatureItem color="#f39c12">Inspection Scheduling – Plan and track audits with built-in workflows</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#9b59b6">
            <FeatureHeader color="#9b59b6">
              <FeatureIcon color="#9b59b6">
                <FaMoneyBillWave />
              </FeatureIcon>
              <FeatureTitle>Finance & Cost Analysis</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#9b59b6">Budget Tracking – Allocate costs to departments or functions</FeatureItem>
              <FeatureItem color="#9b59b6">Client Billing System – Invoice for services based on task type or frequency</FeatureItem>
              <FeatureItem color="#9b59b6">Maintenance ROI Reports – Cost of repair vs. replacement analytics</FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#1abc9c">
            <FeatureHeader color="#1abc9c">
              <FeatureIcon color="#1abc9c">
                <FaChartBar />
              </FeatureIcon>
              <FeatureTitle>Analytics & Real-Time Reporting</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#1abc9c">Operational KPIs – Task completion, downtime, cost-per-asset metrics</FeatureItem>
              <FeatureItem color="#1abc9c">Historical Reports – Trend insights and data export for audits</FeatureItem>
              <FeatureItem color="#1abc9c">Custom Dashboards – Real-time performance snapshots and alerts</FeatureItem>
            </FeatureList>
          </FeatureCard>
        </FeatureGrid>



        <BenefitsSection>
          <BenefitsContainer>
            <BenefitsContent>
              <BenefitsTitle>Revolutionizing Facility Operations with ERP: Control, Compliance, and Clarity</BenefitsTitle>
              <BenefitsDescription>
                Legacy facility management creates silos and inefficiencies. Atomwalk’s ERP integrates your entire operation, reduces manual overhead, and gives decision-makers the visibility they need to manage smarter.
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
                  <BenefitIcon><FaTools /></BenefitIcon>
                  <BenefitText>
                    <strong>Automated Maintenance Flow</strong><br />
                    Plan, track, and complete maintenance with mobile-enabled, real-time work orders.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon><FaUsers /></BenefitIcon>
                  <BenefitText>
                    <strong>Connected Vendors</strong><br />
                    Simplify outsourced service coordination, payments, and SLA tracking.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon><FaChartLine /></BenefitIcon>
                  <BenefitText>
                    <strong>Full Asset Visibility</strong><br />
                    Track the full asset lifecycle and maintenance performance from your dashboard.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon><FaBuilding /></BenefitIcon>
                  <BenefitText>
                    <strong>Smarter Space Management</strong><br />
                    Optimize workspaces with live occupancy tracking and flexible floor planning.
                  </BenefitText>
                </BenefitItem>
              </BenefitsGrid>


            </BenefitsContent>
            <BenefitsImage>
              {/* Replace with your actual image */}
              <img
                src={facility}
                alt="Waste management workflow"
              />
            </BenefitsImage>
          </BenefitsContainer>
        </BenefitsSection>


        <ConclusionSection>
          <ConclusionTitle>Transforming Facilities with Smart ERP </ConclusionTitle>
          <ConclusionText>
          Atomwalk Facility ERP addresses operational inefficiencies with intelligent workflows and automation, empowering teams to do more with less.
          </ConclusionText>
          <ConclusionList>
            <ConclusionItem><strong>Efficient Task Scheduling:</strong> Automate preventive routines and technician dispatch</ConclusionItem>
            <ConclusionItem><strong>Digital Compliance:</strong> Maintain regulatory standards with secure documentation</ConclusionItem>
            <ConclusionItem><strong>Asset Optimization:</strong> Reduce waste and extend equipment life</ConclusionItem>
            <ConclusionItem><strong>Centralized Control:</strong> Unify facility management under one real-time platform</ConclusionItem>
            <ConclusionItem><strong>Data-Driven Insights:</strong> Make faster, more informed decisions</ConclusionItem>
          </ConclusionList>
        </ConclusionSection>
      </FeaturesContainer>
    </WasteManagementSection>
  );
};

export default FmsDetails;