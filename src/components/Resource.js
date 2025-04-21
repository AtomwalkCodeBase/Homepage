import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronRight, BarChart2, Layers, Database, Users, MessageSquare } from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Bubble animation
const floatBubble = keyframes`
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -15px);
  }
  50% {
    transform: translate(20px, 0);
  }
  75% {
    transform: translate(10px, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

// Styled Components
const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 80vh;
  padding: 0 4rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 100%;
  
  &:nth-child(1) {
    width: 40rem;
    height: 40rem;
    top: -10rem;
    right: -10rem;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%);
  }
  
  &:nth-child(2) {
    width: 30rem;
    height: 30rem;
    bottom: -10rem;
    left: 5rem;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 70%);
  }
`;

// New Bubble Component
const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: ${props => props.color || 'rgba(59, 130, 246, 0.5)'};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: ${floatBubble} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  z-index: 1;
  padding: 6rem 0;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 4rem;
  }
`;

const TextContent = styled.div`
  width: 50%;
  animation: ${fadeIn} 1s ease-out forwards;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const SmallHeading = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: #3b82f6;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const MainHeading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #111827 0%, #1f2937 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 90%;
  text-align: justify;
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #1f2937;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f9fafb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const VisualContent = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
  opacity: 0;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
  }
`;

const DashboardMockup = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.1);
  animation: ${float} 6s ease-in-out infinite;
`;

const MockupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fafafa;
`;

const MockupTitle = styled.div`
  color: #111827;
  font-weight: 600;
`;

const MockupDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  
  &:nth-child(1) {
    background: #ef4444;
  }
  
  &:nth-child(2) {
    background: #f59e0b;
  }
  
  &:nth-child(3) {
    background: #10b981;
  }
`;

const MockupContent = styled.div`
overflow-y: scroll;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  height: calc(100% - 3.5rem);
`;

const MockupSidebar = styled.div`
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s ease;
  
  ${({ active }) => active && `
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    font-weight: 500;
  `}
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const MockupCharts = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  overflow-y: scroll;
`;

const MockupChart = styled.div`
  background: #f9fafb;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  display: ${props => props.active ? 'block' : 'none'};
`;

const ChartTitle = styled.div`
  color: #111827;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.75rem;
`;

const LineChartMockup = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  height: 50%;
  padding: 0 1rem;
  display: flex;
  align-items: flex-end;
`;

const ChartLine = styled.div`
  flex: 1;
  height: ${props => props.height};
  background: linear-gradient(to top, #3b82f6, rgba(59, 130, 246, 0.5));
  margin: 0 2px;
  border-radius: 1px;
`;

const BarChartMockup = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  height: 50%;
  padding: 0 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const ChartBar = styled.div`
  width: 1rem;
  height: ${props => props.height};
  background: linear-gradient(to top, #8b5cf6, #3b82f6);
  border-radius: 1px;
  animation: ${pulse} 2s infinite;
  animation-delay: ${props => props.delay};
`;

const PieChartMockup = styled.div`
  position: relative;
  height: calc(100% - 3rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieChart = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: conic-gradient(
    #3b82f6 0% 45%,
    #8b5cf6 45% 65%,
    #ec4899 65% 80%,
    #f59e0b 80% 100%
  );
  position: relative;
`;

const PieChartCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  background: white;
  border-radius: 50%;
`;

const MessageList = styled.div`
  height: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  overflow-y: auto;
`;

const MessageItem = styled.div`
  background: ${props => props.sent ? 'rgba(59, 130, 246, 0.1)' : 'white'};
  border: 1px solid ${props => props.sent ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: #4b5563;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
  max-width: 80%;
`;

const FeatureSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
  
  svg {
    color: #3b82f6;
  }
`;

const TableMockup = styled.div`
  height: calc(100% - 3rem);
  overflow-y: auto;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #6b7280;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #4b5563;
  
  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.01);
  }
`;

const ErpHeroSection = () => {
  const [activeMenu, setActiveMenu] = useState('analytics');
  
  // Generate random bubbles
  const generateBubbles = () => {
    const bubbles = [];
    const colors = [
      'rgba(59, 130, 246, 0.5)', // Blue
      'rgba(139, 92, 246, 0.5)',  // Purple
      'rgba(236, 72, 153, 0.5)',  // Pink
      'rgba(245, 158, 11, 0.5)'   // Orange
    ];
    
    for (let i = 0; i < 15; i++) {
      bubbles.push({
        id: i,
        size: Math.floor(Math.random() * 100) + 30, // Bubble size between 30-130px
        left: Math.floor(Math.random() * 100), // Random position
        top: Math.floor(Math.random() * 100), // Random position
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.floor(Math.random() * 10) + 10, // Animation duration between 10-20s
        delay: Math.floor(Math.random() * 5) // Delay up to 5s
      });
    }
    
    return bubbles;
  };
  
  const [bubbles] = useState(generateBubbles());
  
  // Chart data for different menu items
  const chartData = {
    overview: [
      { title: "Business Performance", type: "line", height: ["30%", "45%", "35%", "60%", "50%", "75%", "65%", "80%", "95%"] },
      { title: "Monthly Revenue", type: "bar", height: ["60%", "80%", "50%", "70%", "90%"] }
    ],
    analytics: [
      { title: "Revenue Growth", type: "line", height: ["30%", "40%", "35%", "60%", "50%", "70%", "85%", "75%", "90%"] },
      { title: "Department Performance", type: "bar", height: ["60%", "80%", "40%", "70%", "90%"] }
    ],
    crm: [
      { title: "Sales Pipeline", type: "line", height: ["40%", "55%", "65%", "75%", "85%", "80%", "70%", "85%", "95%"] },
      { title: "Customer Sales", type: "pie" }
    ],
    inventory: [
      { title: "Inventory Item", type: "table" },
      // { title: "Stock Levels", type: "bar", height: ["75%", "45%", "60%", "90%", "30%"] },
      { title: "Inventory Value", type: "line", height: ["80%", "75%", "65%", "60%", "70%", "75%", "85%", "95%", "85%"] }
    ],
    hr: [
      { title: "Department Distribution", type: "pie" },
      { title: "Employee Performance", type: "bar", height: ["50%", "65%", "80%", "70%", "85%"] },
    ],
  };
  
  const moveto = (data) => {
    window.location.href = `${data}`;
  }
  
  return (
    <HeroContainer>
      <BackgroundElements>
        <Grid />
        <Circle />
        <Circle />
        
        {/* Render animated bubbles */}
        {bubbles.map(bubble => (
          <Bubble 
            key={bubble.id}
            size={bubble.size}
            left={bubble.left}
            top={bubble.top}
            color={bubble.color}
            duration={bubble.duration}
            delay={bubble.delay}
          />
        ))}
      </BackgroundElements>
      
      <ContentWrapper>
        <TextContent>
          <SmallHeading>
            <div>NEXT-GENERATION ERP SOLUTION</div>
          </SmallHeading>
          <MainHeading>Streamline your Business Operations on One Platform</MainHeading>
          <SubHeading>
          Atomwalk Office is a cloud-based software solution, designed to transform the way startups, small – large sized businesses operate. Built on cutting-edge technologies like AI and Blockchain. Our Intuitive 
          System seamlessly manages all your core business functions – Lead/Customer Relationship, Sales, Purchasing, Inventory, Manufacturing, Project Management, Accounting, and HR.   </SubHeading>
          
          <ButtonGroup>
            <PrimaryButton onClick={() => moveto("https://www.atomwalk.com/login/")}>
              Get Started
              <ChevronRight size={16} />
            </PrimaryButton>
            <SecondaryButton onClick={() => moveto("/demo.html")}>
              Book a Demo
            </SecondaryButton>
          </ButtonGroup>
          
          <FeatureSection>
            <FeatureItem>
              <BarChart2 size={16} />
              <span>Real-time Analytics</span>
            </FeatureItem>
            <FeatureItem>
              <Database size={16} />
              <span>Cloud Integration</span>
            </FeatureItem>
            <FeatureItem>
              <Users size={16} />
              <span>Team Collaboration</span>
            </FeatureItem>
          </FeatureSection>
        </TextContent>
        
        <VisualContent>
          <DashboardMockup>
            <MockupHeader>
              <MockupTitle>Dashboard Overview</MockupTitle>
              <MockupDots>
                <Dot />
                <Dot />
                <Dot />
              </MockupDots>
            </MockupHeader>
            
            <MockupContent>
              <MockupSidebar>
                <SidebarItem 
                  active={activeMenu === 'overview'} 
                  onClick={() => setActiveMenu('overview')}
                >
                  <Layers size={16} />
                  <span>Overview</span>
                </SidebarItem>
                <SidebarItem 
                  active={activeMenu === 'analytics'} 
                  onClick={() => setActiveMenu('analytics')}
                >
                  <BarChart2 size={16} />
                  <span>Analytics</span>
                </SidebarItem>
                <SidebarItem 
                  active={activeMenu === 'inventory'} 
                  onClick={() => setActiveMenu('inventory')}
                >
                  <Database size={16} />
                  <span>Inventory</span>
                </SidebarItem>
                <SidebarItem 
                  active={activeMenu === 'hr'} 
                  onClick={() => setActiveMenu('hr')}
                >
                  <Users size={16} />
                  <span>HR</span>
                </SidebarItem>
                <SidebarItem 
                  active={activeMenu === 'crm'} 
                  onClick={() => setActiveMenu('crm')}
                >
                  <MessageSquare size={16} />
                  <span>CRM</span>
                </SidebarItem>
              </MockupSidebar>
              
              <MockupCharts>
                {Object.keys(chartData).map(menu => (
                  chartData[menu].map((chart, index) => {
                    if (chart.type === "line") {
                      return (
                        <MockupChart key={`${menu}-${index}`} active={activeMenu === menu}>
                          <ChartTitle>{chart.title}</ChartTitle>
                          <LineChartMockup>
                            {chart.height.map((height, i) => (
                              <ChartLine key={i} height={height} />
                            ))}
                          </LineChartMockup>
                        </MockupChart>
                      );
                    } else if (chart.type === "bar") {
                      return (
                        <MockupChart key={`${menu}-${index}`} active={activeMenu === menu}>
                          <ChartTitle>{chart.title}</ChartTitle>
                          <BarChartMockup>
                            {chart.height.map((height, i) => (
                              <ChartBar key={i} height={height} delay={`${i * 0.1}s`} />
                            ))}
                          </BarChartMockup>
                        </MockupChart>
                      );
                    } else if (chart.type === "pie") {
                      return (
                        <MockupChart key={`${menu}-${index}`} active={activeMenu === menu}>
                          <ChartTitle>{chart.title}</ChartTitle>
                          <PieChartMockup>
                            <PieChart>
                              <PieChartCenter />
                            </PieChart>
                          </PieChartMockup>
                        </MockupChart>
                      );
                    } else if (chart.type === "messages") {
                      return (
                        <MockupChart key={`${menu}-${index}`} active={activeMenu === menu}>
                          <ChartTitle>{chart.title}</ChartTitle>
                          <MessageList>
                            <MessageItem>Hi, I'd like to inquire about your services</MessageItem>
                            <MessageItem sent>Thank you for your interest! How can I help you today?</MessageItem>
                            <MessageItem>I'm looking to upgrade our current ERP system</MessageItem>
                            <MessageItem sent>We'd be happy to schedule a demo to show you our solution</MessageItem>
                            <MessageItem>That would be great! How soon can we set that up?</MessageItem>
                          </MessageList>
                        </MockupChart>
                      );
                    } else if (chart.type === "table") {
                      return (
                        <MockupChart key={`${menu}-${index}`} active={activeMenu === menu}>
                          <ChartTitle>{chart.title}</ChartTitle>
                          <TableMockup>
                            <Table>
                              <TableHeader>
                                <div>Item</div>
                                <div>Status</div>
                                <div>Quantity</div>
                              </TableHeader>
                              <TableRow>
                                <div>Product A</div>
                                <div>In Stock</div>
                                <div>245</div>
                              </TableRow>
                              <TableRow>
                                <div>Product B</div>
                                <div>Low Stock</div>
                                <div>18</div>
                              </TableRow>
                              <TableRow>
                                <div>Product C</div>
                                <div>In Stock</div>
                                <div>354</div>
                              </TableRow>
                              <TableRow>
                                <div>Product D</div>
                                <div>Out of Stock</div>
                                <div>0</div>
                              </TableRow>
                            </Table>
                          </TableMockup>
                        </MockupChart>
                      );
                    }
                    return null;
                  })
                ))}
              </MockupCharts>
            </MockupContent>
          </DashboardMockup>
        </VisualContent>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default ErpHeroSection;