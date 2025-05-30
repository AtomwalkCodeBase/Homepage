import React from "react";
import styled, { keyframes } from "styled-components";
import Collection from "../../assets/img/H_step_5(1).png";
import { FaSmileBeam, FaFolderOpen } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaTools,
  FaRobot,
  FaEye,
  FaHardHat,
  FaFileSignature,
  FaCalendarCheck,
  FaFileInvoice,
  FaBroadcastTower,
  FaProjectDiagram,
  FaBug,
  //  FaCalendarCheck,
  FaShieldAlt,
} from "react-icons/fa";

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
  background-color: #e5fbff;
  padding: 3rem 0;
`;
// Styled Components
const FeaturesContainer = styled.div`
  max-width: 1200px;
  background-color: #e5fbff;
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
    content: "";
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  border-left: 5px solid ${(props) => props.color || "#28b463"};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: ${(props) => props.color || "#28b463"};
      animation: ${pulse} 2s infinite;
    }
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${(props) => props.color || "#1a5276"};
`;

const FeatureIcon = styled.div`
  font-size: 2.2rem;
  margin-right: 1.2rem;
  color: ${(props) => props.color || "#28b463"};
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
    content: "";
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) => props.color || "#28b463"};
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
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
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
    content: "✓";
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
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.03);
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
  background: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: #fff;
  max-width: 100%;

  img {
    width: 100%;
    height: 1200px;
    object-fit: cover;
  }

   @media (max-width: 767px) {
    img {
      height: 300px; /* Adjust this as needed for mobile */
    }
  }

  @media (min-width: 992px) {
    order: 2;
    height: 100%;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const PpeDetails = () => {
  return (
    <WasteManagementSection>
      <FeaturesContainer>
        <SectionTitle>
          Advanced AI Management ERP Solution for Smart Manufacturing{" "}
        </SectionTitle>

        <FeatureGrid>
          <FeatureCard color="#3498db">
            <FeatureHeader color="#3498db">
              <FeatureIcon color="#3498db">
                <FaHardHat />
              </FeatureIcon>
              <FeatureTitle>Workforce Safety & Compliance </FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#3498db">
                Real-time detection of safety gear (helmets, gloves, jackets){" "}
              </FeatureItem>
              <FeatureItem color="#3498db">
                Log lab/floor entries using Person Re-ID.
              </FeatureItem>
              <FeatureItem color="#3498db">
                Maintain safety violation history and reporting trail.
              </FeatureItem>
              <FeatureItem color="#3498db">
                Generate automated compliance reports and alerts.{" "}
              </FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#2ecc71">
            <FeatureHeader color="#2ecc71">
              <FeatureIcon color="#2ecc71">
                <FaEye />
              </FeatureIcon>
              <FeatureTitle>Vision-Based Production Monitoring</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#2ecc71">
                Live video feed analysis for task monitoring and object
                counting.{" "}
              </FeatureItem>
              <FeatureItem color="#2ecc71">
                Action recognition for task verification (e.g., loading,
                packaging, welding).
              </FeatureItem>
              <FeatureItem color="#2ecc71">
                Alert on idle machinery or skipped steps using timeline
                comparisons.
              </FeatureItem>
              <FeatureItem color="#2ecc71">
                Abandoned object detection for hazard prevention.
              </FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#e74c3c">
            <FeatureHeader color="#e74c3c">
              <FeatureIcon color="#e74c3c">
                <FaRobot />
              </FeatureIcon>
              <FeatureTitle>
                AI-Powered Production Monitoring & Control{" "}
              </FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#e74c3c">
                Real-time visual monitoring of assembly lines with AI.
              </FeatureItem>
              <FeatureItem color="#e74c3c">
                Detect anomalies in machinery behavior or workflow.
              </FeatureItem>
              <FeatureItem color="#e74c3c">
                Bottleneck analysis at each production stage.{" "}
              </FeatureItem>
              <FeatureItem color="#e74c3c">
                Automatic product counting using object detection models.{" "}
              </FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#f39c12">
            <FeatureHeader color="#f39c12">
              <FeatureIcon color="#f39c12">
                <FaTools />
              </FeatureIcon>
              <FeatureTitle>
                Predictive Maintenance & Machine Lifecycle Management
              </FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#f39c12">
                Monitor machine health using real-time sensor and video data.
              </FeatureItem>
              <FeatureItem color="#f39c12">
                Get alerts for wear, overheating, misalignment, or unusual
                vibrations.
              </FeatureItem>
              <FeatureItem color="#f39c12">
                Predict machine failure or end-of-life using AI analytics.{" "}
              </FeatureItem>
              <FeatureItem color="#f39c12">
                Schedule maintenance proactively to reduce downtime.{" "}
              </FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#9b59b6">
            <FeatureHeader color="#9b59b6">
              <FeatureIcon color="#9b59b6">
                <FaFileSignature />
              </FeatureIcon>
              <FeatureTitle>OCR & Documentation Automation </FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#9b59b6">
                Extract text from packaging, labels, and machine meters.
              </FeatureItem>
              <FeatureItem color="#9b59b6">
                Archive production logs and inspection sheets using OCR.
              </FeatureItem>
              <FeatureItem color="#9b59b6">
                Tag and store documents with metadata for easy retrieval.
              </FeatureItem>
              <FeatureItem color="#9b59b6">
                Secure access control and traceable sharing for audits.{" "}
              </FeatureItem>
            </FeatureList>
          </FeatureCard>

          <FeatureCard color="#1abc9c">
            <FeatureHeader color="#1abc9c">
              <FeatureIcon color="#1abc9c">
                <FaTachometerAlt />
              </FeatureIcon>
              <FeatureTitle>AI Insights & Central Dashboard</FeatureTitle>
            </FeatureHeader>
            <FeatureList>
              <FeatureItem color="#1abc9c">
                Unified view of PPE compliance, machine health, production flow,
                and alerts.
              </FeatureItem>
              <FeatureItem color="#1abc9c">
                Visual heatmaps, trend graphs, and alert summaries.
              </FeatureItem>
              <FeatureItem color="#1abc9c">
                Exportable insights for factory leads and safety managers.
              </FeatureItem>
              <FeatureItem color="#1abc9c">
                Role-based access to team-specific analytics.
              </FeatureItem>
            </FeatureList>
          </FeatureCard>
        </FeatureGrid>

        <BenefitsSection>
          <BenefitsContainer>
            <BenefitsContent>
              <BenefitsTitle>
                Transforming Manufacturing with AI-Driven Safety, Quality, and
                Efficiency
              </BenefitsTitle>
              <BenefitsDescription>
                Manufacturing environments are complex and dynamic, where safety
                compliance, product quality, and operational efficiency are
                critical. Relying on manual monitoring risks safety violations,
                undetected defects, production delays, and costly downtime. Our
                AI-powered manufacturing solutions integrate PPE detection,
                intelligent surveillance, defect and anomaly detection,
                bottleneck analysis, and automated data extraction into a
                unified platform. This enables manufacturers to gain real-time
                visibility, proactive control, and data-driven decision-making
                to enhance workplace safety, ensure product excellence, and
                optimize production flow.
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
                  <BenefitIcon>
                    <FaShieldAlt />
                  </BenefitIcon>
                  <BenefitText>
                    <strong>AI-Powered Safety Compliance </strong>
                    <br />
                    Continuous PPE detection and surveillance enforce safety
                    protocols, reduce accidents, and maintain regulatory
                    compliance on the factory floor.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon>
                    <FaBug />
                  </BenefitIcon>
                  <BenefitText>
                    <strong>Automated Defect & Anomaly Detection</strong>
                    <br />
                    Vision AI identifies product defects and production
                    anomalies instantly, reducing waste and improving overall
                    quality control.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon>
                    <FaProjectDiagram />
                  </BenefitIcon>
                  <BenefitText>
                    <strong>
                      Bottleneck Identification & Process Optimization
                    </strong>
                    <br />
                    AI analytics detect bottlenecks and inefficiencies early,
                    helping streamline workflows and maximize throughput.
                  </BenefitText>
                </BenefitItem>

                <BenefitItem>
                  <BenefitIcon>
                    <FaBroadcastTower />
                  </BenefitIcon>
                  <BenefitText>
                    <strong>Real-Time Monitoring & Alerts</strong>
                    <br />
                    Centralized dashboards with heatmaps, trend analysis, and
                    alert systems keep plant managers and safety officers
                    informed and ready to act.
                  </BenefitText>
                </BenefitItem>
              </BenefitsGrid>
            </BenefitsContent>
            <BenefitsImage>
              {/* Replace with your actual image */}

              <img
                src="https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/RealtimeMonitoring.png"
                alt="Waste management workflow"
              />
            </BenefitsImage>
          </BenefitsContainer>
        </BenefitsSection>

        <ConclusionSection>
          <ConclusionTitle>
            Revolutionizing Manufacturing Safety and Efficiency Through AI
          </ConclusionTitle>
          <ConclusionText>
            Our AI-powered platform transforms industrial operations—combining
            intelligent automation with data-driven insights to boost safety,
            quality, and productivity. Together, we’re shaping smarter, safer,
            and more efficient manufacturing environments.
          </ConclusionText>
          <ConclusionList>
            <ConclusionItem>
              <strong>Intelligent Safety Monitoring:</strong>Real-time PPE
              detection and surveillance ensure compliance and protect workers
              on the factory floor.
            </ConclusionItem>
            <ConclusionItem>
              <strong>Automated Quality Control:</strong> Instant defect and
              anomaly detection catch production issues early, minimizing waste
              and ensuring product excellence.{" "}
            </ConclusionItem>
            <ConclusionItem>
              <strong>Optimized Workflow:</strong>Bottleneck identification and
              process analytics streamline production for maximum throughput.
            </ConclusionItem>
            <ConclusionItem>
              <strong>Proactive Maintenance:</strong> Continuous system
              diagnostics and alerts prevent downtime and extend equipment life.
            </ConclusionItem>
            <ConclusionItem>
              <strong>Data-Driven Operations:</strong> Comprehensive analytics
              and actionable insights empower better decisions and operational
              planning.{" "}
            </ConclusionItem>
          </ConclusionList>
        </ConclusionSection>
      </FeaturesContainer>
    </WasteManagementSection>
  );
};

export default PpeDetails;
