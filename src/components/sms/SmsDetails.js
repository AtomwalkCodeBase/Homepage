import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRedoAlt, FaTasks, FaUserCheck, FaBell, FaChartBar } from 'react-icons/fa';
import { MdDevices } from 'react-icons/md';
import facility from '../../assets/img/Step_5.png'
import Solar from '../../assets/img/step5-removebg-preview.png'

import {
    FaCalendarAlt,
    FaEye,
    FaHistory,
    FaSmile
} from 'react-icons/fa';
import {
    FaSolarPanel,
    FaBolt,
    FaTools,
    FaChartLine
} from 'react-icons/fa';
import {
    FaChartPie,
    FaLeaf
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

const SmsDetails = () => {
    return (
        <WasteManagementSection>
            <FeaturesContainer>
                <SectionTitle>Advanced Solar Management ERP Solution</SectionTitle>

                <FeatureGrid>
                    <FeatureCard color="#3498db">
                        <FeatureHeader color="#3498db">
                            <FeatureIcon color="#3498db"><FaSolarPanel /></FeatureIcon> {/* Solar Panel Monitoring */}
                            <FeatureTitle>Panel-Level Monitoring</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#3498db">Monitor voltage, current, and power output of panels.</FeatureItem>
                            <FeatureItem color="#3498db">Detect underperforming or faulty panels instantly.</FeatureItem>
                            <FeatureItem color="#3498db">Improve efficiency by identifying shading or soiling issues early.</FeatureItem>
                            <FeatureItem color="#3498db">Enhance ROI by maximizing the performance of every panel.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#2ecc71">
                        <FeatureHeader color="#2ecc71">
                            <FeatureIcon color="#2ecc71"><FaBolt /></FeatureIcon> {/* Energy Analysis */}
                            <FeatureTitle>Energy Usage Analysis</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#2ecc71">Compare energy generated vs. consumed in real-time.</FeatureItem>
                            <FeatureItem color="#2ecc71">Measure energy exported to the grid or stored in batteries.</FeatureItem>
                            <FeatureItem color="#2ecc71">Optimize load management and track cost savings.</FeatureItem>
                            <FeatureItem color="#2ecc71">Identify peak usage periods to adjust energy consumption habits.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#e74c3c">
                        <FeatureHeader color="#e74c3c">
                            <FeatureIcon color="#e74c3c"><FaTools /></FeatureIcon> {/* Maintenance */}
                            <FeatureTitle>Maintenance Scheduling</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#e74c3c">Set cleaning and inspection reminders based on performance drop.</FeatureItem>
                            <FeatureItem color="#e74c3c">Maintain logs of service history and technician visits.</FeatureItem>
                            <FeatureItem color="#e74c3c">Reduce downtime with timely preventive actions.</FeatureItem>
                            <FeatureItem color="#e74c3c">Extend equipment lifespan through regular upkeep.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#f39c12">
                        <FeatureHeader color="#f39c12">
                            <FeatureIcon color="#f39c12"><MdDevices /></FeatureIcon>
                            <FeatureTitle>Mobile & Web Dashboard</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#f39c12">View system status, production trends, and savings graphs.</FeatureItem>
                            <FeatureItem color="#f39c12">Control and configure settings remotely.</FeatureItem>
                            <FeatureItem color="#f39c12">Secure login with role-based access for multiple users.</FeatureItem>
                            <FeatureItem color="#f39c12">Stay connected with real-time system data on the go.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#9b59b6">
                        <FeatureHeader color="#9b59b6">
                            <FeatureIcon color="#9b59b6"><FaBell /></FeatureIcon>
                            <FeatureTitle>Alerts & Notifications</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#9b59b6">Real-time alerts via SMS, email, or app notifications.</FeatureItem>
                            <FeatureItem color="#9b59b6">Get notified for faults like disconnection, overheating, or inverter errors.</FeatureItem>
                            <FeatureItem color="#9b59b6">Customize thresholds and alert types for different users.</FeatureItem>
                            <FeatureItem color="#9b59b6">Enable faster decision-making with instant system feedback.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#1abc9c">
                        <FeatureHeader color="#1abc9c">
                            <FeatureIcon color="#1abc9c"><FaChartLine /></FeatureIcon> {/* Daily Insights */}
                            <FeatureTitle>Daily Solar Insights</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#1abc9c">Auto-generated reports on daily energy performance.</FeatureItem>
                            <FeatureItem color="#1abc9c">Highlight best-performing days and inefficiencies.</FeatureItem>
                            <FeatureItem color="#1abc9c">Download or share insights with stakeholders easily.</FeatureItem>
                            <FeatureItem color="#1abc9c">Gain transparency into energy savings and trends.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>
                </FeatureGrid>




                <BenefitsSection>
                    <BenefitsContainer>
                        <BenefitsContent>
                            <BenefitsTitle>Streamlining Solar Management with ERP Precision, Uptime, and Sustainability</BenefitsTitle>
                            <BenefitsDescription>
                                Managing solar energy systems manually can lead to performance gaps, energy loss, and maintenance delays. An ERP-integrated solar management system brings everything into one platform—streamlining monitoring, enhancing control, and enabling smarter energy decisions. With real-time data and automation, businesses and homeowners can optimize solar output, reduce downtime, and drive sustainability. ERP for solar isn’t just about monitoring—it’s about maximizing energy intelligence for a greener tomorrow.
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
                                    <BenefitIcon><FaBolt /></BenefitIcon> {/* Energy Monitoring */}
                                    <BenefitText>
                                        <strong>Optimized Energy Monitoring</strong><br />
                                        Real-time tracking of solar energy generation, usage, and export for peak efficiency and minimal loss.
                                    </BenefitText>
                                </BenefitItem>

                                <BenefitItem>
                                    <BenefitIcon><FaTools /></BenefitIcon> {/* Diagnostics & Maintenance */}
                                    <BenefitText>
                                        <strong>Automated System Diagnostics</strong><br />
                                        Instant fault detection, performance analytics, and automated alerts to ensure maximum uptime and reliability.
                                    </BenefitText>
                                </BenefitItem>

                                <BenefitItem>
                                    <BenefitIcon><FaChartPie /></BenefitIcon> {/* Financial Overview */}
                                    <BenefitText>
                                        <strong>Cost & Savings Management</strong><br />
                                        Monitors energy savings, ROI, and income from grid exports—empowering better financial planning and transparency.
                                    </BenefitText>
                                </BenefitItem>

                                <BenefitItem>
                                    <BenefitIcon><FaLeaf /></BenefitIcon> {/* Sustainability */}
                                    <BenefitText>
                                        <strong>Sustainable Energy Utilization</strong><br />
                                        Promotes clean energy goals by optimizing renewable energy usage and reducing reliance on the grid.
                                    </BenefitText>
                                </BenefitItem>
                            </BenefitsGrid>
                        </BenefitsContent>
                        <BenefitsImage>
                            {/* Replace with your actual image */}
                            <img
                                src={Solar}
                                alt="Waste management workflow"
                            />
                        </BenefitsImage>
                    </BenefitsContainer>
                </BenefitsSection>


                <ConclusionSection>
                    <ConclusionTitle>Revolutionizing Solar Control Through the Cloud</ConclusionTitle>
                    <ConclusionText>
                    Our ERP solution helps you manage solar energy smarter—with <Highlight>intelligent automation</Highlight> and <Highlight>eco-friendly</Highlight> practices that make going green easier. Together, we’re building a cleaner, more efficient, and sustainable future.
                    </ConclusionText>
                    <ConclusionList>
                        <ConclusionItem><strong>Smart Monitoring:</strong> Real-time solar tracking ensures maximum energy output and performance.</ConclusionItem>
                        <ConclusionItem><strong>Seamless Compliance:</strong> Automated reporting aligns with energy standards and grid regulations.</ConclusionItem>
                        <ConclusionItem><strong>Maximized Solar Efficiency:</strong> Ensure every unit of sunlight is converted into optimal energy output through intelligent performance tracking.</ConclusionItem>
                        <ConclusionItem><strong>Maintenance First:</strong> Proactive diagnostics prioritize system health and technician safety.</ConclusionItem>
                        <ConclusionItem><strong>Data-Driven Decisions:</strong> Analytics and insights drive performance improvements and energy planning.</ConclusionItem>
                    </ConclusionList>
                </ConclusionSection>
            </FeaturesContainer>
        </WasteManagementSection>
    );
};

export default SmsDetails;