import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaTrashAlt, 
  FaRecycle, 
  FaTruck, 
  FaIndustry, 
  FaShieldAlt, 
  FaFileInvoice,
  FaLeaf, 
  FaChartLine,
  FaBalanceScale
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
  background: #f8f9fa;
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
const WasteManagementDetails = () => {
  return (
    <WasteManagementSection>
      <FeaturesContainer>
        <SectionTitle>Advanced Waste Management ERP Solution</SectionTitle>
        
      <FeatureGrid>
        <FeatureCard color="#3498db">
          <FeatureHeader color="#3498db">
            <FeatureIcon color="#3498db"><FaTrashAlt /></FeatureIcon>
            <FeatureTitle>Smart Waste Collection</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#3498db">AI-Optimized Scheduling – Predictive analytics for efficient pickups</FeatureItem>
            <FeatureItem color="#3498db">IoT-Enabled Smart Bins – Sensors monitor bin fill levels in real-time and notify collection trucks, preventing overflow.</FeatureItem>
            <FeatureItem color="#3498db">Mobile Workforce App – Enables real-time task updates, tracking, and seamless communication</FeatureItem>
            <FeatureItem color="#3498db">Dynamic Route Optimization – Optimize collection routes, reducing fuel costs and time.</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#2ecc71">
          <FeatureHeader color="#2ecc71">
            <FeatureIcon color="#2ecc71"><FaRecycle /></FeatureIcon>
            <FeatureTitle>Automated Segregation</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#2ecc71">IoT-Enabled Waste Identification – Sensors detect material composition for accurate segregation at collection points.</FeatureItem>
            <FeatureItem color="#2ecc71">Digital Compliance Proof – Photo documentation</FeatureItem>
            <FeatureItem color="#2ecc71">Regulatory Compliance Tracking – Ensures proper disposal of biomedical and hazardous waste as per legal guidelines.</FeatureItem>
            <FeatureItem color="#2ecc71">Recycling Rate Analytics – Performance dashboards</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#e74c3c">
          <FeatureHeader color="#e74c3c">
            <FeatureIcon color="#e74c3c"><FaTruck /></FeatureIcon>
            <FeatureTitle>Collection Operations</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#e74c3c">Workforce Management – Attendance, payroll, scheduling</FeatureItem>
            <FeatureItem color="#e74c3c">Client Billing System – Weight/frequency based invoicing</FeatureItem>
            <FeatureItem color="#e74c3c">Live Fleet Tracking – Real-time vehicle monitoring</FeatureItem>
            <FeatureItem color="#e74c3c">Maintenance Scheduling – Vehicle upkeep management</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#f39c12">
          <FeatureHeader color="#f39c12">
            <FeatureIcon color="#f39c12"><FaIndustry /></FeatureIcon>
            <FeatureTitle>Processing & Recycling</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#f39c12">Digital Compliance & Reporting – Maintains digital records for regulatory bodies, ensuring smooth audits and compliance.</FeatureItem>
            <FeatureItem color="#f39c12">Inventory Management for Recyclables – Tracks raw materials extracted from waste for reuse in production</FeatureItem>
            <FeatureItem color="#f39c12">Sales Integration – Ensures accurate pricing, expense tracking, and revenue optimization</FeatureItem>
            <FeatureItem color="#f39c12">Cost Analysis – Tracks waste collection costs, recycling revenue, and profitability.</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#9b59b6">
          <FeatureHeader color="#9b59b6">
            <FeatureIcon color="#9b59b6"><FaShieldAlt /></FeatureIcon>
            <FeatureTitle>Worker Safety Systems</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#9b59b6">PPE Compliance Tracking – Digital equipment logs</FeatureItem>
            <FeatureItem color="#9b59b6">Hazard Monitoring – Real-time exposure alerts</FeatureItem>
            <FeatureItem color="#9b59b6">Health Program Management – Check-up scheduling</FeatureItem>
            <FeatureItem color="#9b59b6">Incident Reporting – Digital documentation</FeatureItem>
          </FeatureList>
        </FeatureCard>
        
        <FeatureCard color="#1abc9c">
          <FeatureHeader color="#1abc9c">
            <FeatureIcon color="#1abc9c"><FaChartLine /></FeatureIcon>
            <FeatureTitle>Analytics & Reporting</FeatureTitle>
          </FeatureHeader>
          <FeatureList>
            <FeatureItem color="#1abc9c">Waste Volume Trends – Historical data analysis</FeatureItem>
            <FeatureItem color="#1abc9c">Operational KPIs – Performance metrics</FeatureItem>
            <FeatureItem color="#1abc9c">Sustainability Reporting – Ensures transparency, compliance, and efficient resource use while tracking environmental impact.</FeatureItem>
            <FeatureItem color="#1abc9c">Custom Dashboard – Real-time data visualization</FeatureItem>
          </FeatureList>
        </FeatureCard>
      </FeatureGrid>
      
      <BenefitsSection>
          <BenefitsContainer>
            <BenefitsContent>
              <BenefitsTitle>Evolutionizing Waste Management with ERP: Efficiency, Compliance, and Sustainability Combined!</BenefitsTitle>
              <BenefitsDescription>
              Managing waste efficiently is challenging, with traditional methods causing inefficiencies, high costs, and regulatory risks. An ERP system streamlines waste tracking, automates compliance, and optimizes resource use. With real-time data and analytics, businesses can reduce waste, improve efficiency, and make informed decisions. ERP for waste management isn’t just about compliance it’s about building a cleaner, smarter, and more sustainable future.
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
    <BenefitIcon><FaRecycle /></BenefitIcon>
    <BenefitText>
      <strong>Optimized Waste Tracking</strong><br />
      Real-time monitoring of waste generation, collection, and processing for better efficiency
    </BenefitText>
  </BenefitItem>
  <BenefitItem>
    <BenefitIcon><FaFileInvoice /></BenefitIcon>
    <BenefitText>
      <strong>Automated Compliance</strong><br />
      Simplifies reporting and ensures adherence to waste management regulations
    </BenefitText>
  </BenefitItem>
  <BenefitItem>
    <BenefitIcon><FaBalanceScale /></BenefitIcon>
    <BenefitText>
      <strong>Cost & Revenue Optimization</strong><br />
      Tracks expenses, revenue from recyclables, and overall profitability
    </BenefitText>
  </BenefitItem>
  <BenefitItem>
    <BenefitIcon><FaLeaf /></BenefitIcon>
    <BenefitText>
      <strong>Sustainable Resource Utilization</strong><br />
      Encourages circular economy practices to minimize waste and maximize resource recovery
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
        <ConclusionTitle>Transforming Waste Management</ConclusionTitle>
        <ConclusionText>
          Our ERP solution addresses waste crisis with <Highlight>intelligent technology</Highlight> and <Highlight>sustainable practices</Highlight>, 
          creating a cleaner, greener city for future generations.
        </ConclusionText>
        <ConclusionList>
          <ConclusionItem><strong>Efficient Collection:</strong> AI-powered routing reduces costs and emissions</ConclusionItem>
          <ConclusionItem><strong>Complete Compliance:</strong> Automated documentation for all regulations</ConclusionItem>
          <ConclusionItem><strong>Sustainable Future:</strong> Maximized recycling and minimized landfill use</ConclusionItem>
          <ConclusionItem><strong>Worker Focus:</strong> Health and safety as top priority</ConclusionItem>
          <ConclusionItem><strong>Data-Driven:</strong> Real-time analytics for continuous improvement</ConclusionItem>
          <ConclusionItem><strong>Empowerment:</strong> Empowerment by way of inclusion into formal sector</ConclusionItem>
        </ConclusionList>
      </ConclusionSection>
    </FeaturesContainer>
    </WasteManagementSection>
  );
};

export default WasteManagementDetails;