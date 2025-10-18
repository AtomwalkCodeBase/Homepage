import styled from 'styled-components';
import { motion } from 'framer-motion';

// Icons (same as before)
import { 
  FaCrown, FaChartLine, FaMobileAlt, FaUserTie, 
  FaFileInvoiceDollar, FaShieldAlt, FaCogs, FaExpandArrowsAlt,
  FaTrashAlt, FaTrashRestoreAlt, FaChartPie, FaHardHat,
  FaBuilding, FaEye,
  FaFileAlt, FaExclamationTriangle, FaTachometerAlt,
  FaProjectDiagram, FaTruckLoading, FaQrcode,
  FaVials,  FaTasks,
} from 'react-icons/fa';

import { BsFillGearFill, BsGraphUpArrow, BsBoxSeam } from 'react-icons/bs';
import { GiReceiveMoney, GiSandsOfTime } from 'react-icons/gi';
import { MdOutlinePrecisionManufacturing, MdHealthAndSafety } from 'react-icons/md';

const Section = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f9f9ff 0%, #f0f2ff 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236a1b9a' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 2.8rem;
  color: #2a2a72;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
  
  span {
    color: #6a1b9a;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 8px;
      background: rgba(106, 27, 154, 0.2);
      z-index: -1;
      border-radius: 4px;
    }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: #666;
  font-size: 1.2rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const BenefitsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  perspective: 1000px;
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 20px;
  max-width: 300px;
`;

const IconCircle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.bgcolor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 40px;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px ${props => `${props.bgcolor}80`};
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    border: 2px dashed ${props => props.bgcolor};
    opacity: 0.3;
    z-index: -1;
    transition: all 0.5s ease;
  }
`;

const BenefitTitle = styled(motion.h3)`
  font-size: 1.4rem;
  color: #2a2a72;
  margin-bottom: 15px;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: ${props => props.bgcolor};
    border-radius: 3px;
    transition: all 0.3s ease;
  }
`;

const BenefitText = styled(motion.p)`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 10,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

const titleVariants = {
  hover: {
    scale: 1.05,
    x: 5,
    '&::after': {
      width: '100%'
    }
  }
};

// Data sets for different responses
const claimBenefits = [
  { title: 'Optimize', text: 'maximize time & effort efficiency', bgColor: '#4caf50', icon: <FaChartLine /> },
  { title: 'Streamline', text: 'simplify claim management', bgColor: '#9c27b0', icon: <BsFillGearFill /> },
  { title: 'Verify', text: 'ensure precise claim reconciliation', bgColor: '#ff9800', icon: <FaShieldAlt /> },
  { title: 'Accelerate', text: 'minimize claim processing delays', bgColor: '#ffc107', icon: <GiSandsOfTime /> },
  { title: 'Enhance', text: 'deliver a seamless claim experience', bgColor: '#00bcd4', icon: <FaUserTie /> },
  { title: 'Elevate', text: 'increase claim transparency', bgColor: '#4caf50', icon: <FaFileInvoiceDollar /> }
];

const leaveBenefits = [
  { title: 'Save', text: 'time & effort', bgColor: '#4caf50', icon: <GiSandsOfTime /> },
  { title: 'Administer', text: 'uniform leave policy', bgColor: '#9c27b0', icon: <BsFillGearFill /> },
  { title: 'Ensure', text: 'accurate leave accounting', bgColor: '#ff9800', icon: <FaFileInvoiceDollar /> },
  { title: 'Reduce', text: 'unnecessary expense', bgColor: '#ffc107', icon: <GiReceiveMoney /> },
  { title: 'Deliver', text: 'an outstanding employee experience', bgColor: '#00bcd4', icon: <FaUserTie /> },
  { title: 'Improve', text: 'employer brand image', bgColor: '#4caf50', icon: <FaChartLine /> },
];

const leadBenefits = [
  { title: 'Maximize Efficiency', text: 'Save valuable time and effort with seamless processes', bgColor: '#4caf50', icon: <GiSandsOfTime /> },
  { title: 'Unmatched Quality', text: 'We consistently deliver top-notch results for every user', bgColor: '#9c27b0', icon: <FaCrown /> },
  { title: 'Lightning-Fast Access', text: 'Enjoy quick and easy access to our application anywhere, anytime', bgColor: '#ff9800', icon: <FaMobileAlt /> },
  { title: 'Seamless Experience', text: 'Experience flawless and intuitive user interactions', bgColor: '#ffc107', icon: <FaUserTie /> },
  { title: 'User-Centric Design', text: 'Delivering an outstanding and effortless user experience', bgColor: '#00bcd4', icon: <BsFillGearFill /> },
  { title: 'Universal Accessibility', text: 'Access our platform seamlessly on both mobile and web', bgColor: '#4caf50', icon: <FaMobileAlt /> },
];

const hrmBenefits = [
  { title: 'Streamline', text: 'eliminate time-consuming paperwork', bgColor: '#4caf50', icon: <GiSandsOfTime /> },
  { title: 'Optimize', text: 'cut unnecessary operational expenses', bgColor: '#ffc107', icon: <GiReceiveMoney /> },
  { title: 'Boost', text: 'elevate employer brand reputation', bgColor: '#4caf50', icon: <FaChartLine /> },
  { title: 'Standardize', text: 'enforce a consistent company policy', bgColor: '#9c27b0', icon: <BsFillGearFill /> },
  { title: 'Performance', text: 'bulk processing with high TPS.', bgColor: '#ff9800', icon: <BsGraphUpArrow /> },
  { title: 'Reliabilty', text: '24/7 availability with 100% uptime on mobile and web', bgColor: '#00bcd4', icon: <FaMobileAlt /> },
];

const labEquipment = [
  { title: '24/7 Access with less man power', text: 'Schedule Equipment Anytime, Seamlessly', bgColor: '#00bcd4', icon: <GiSandsOfTime /> },
  { title: 'Real-Time Availability!', text: 'Stay Updated, Avoid Surprises', bgColor: '#4caf50', icon: <FaChartLine /> },
  { title: 'Hassle-Free User Management!', text: 'Group, Control, Assign Roles', bgColor: '#ffc107', icon: <FaUserTie /> },
  { title: 'Zero Booking Conflicts!', text: 'Smart Scheduling, Uninterrupted Operations', bgColor: '#9c27b0', icon: <BsFillGearFill /> },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ff9800', icon: <BsGraphUpArrow /> },
  { title: 'Stay Audit-Ready', text: 'Automated Logs, Effortless Records', bgColor: '#4caf50', icon: <FaFileInvoiceDollar /> },
];

const labManagement = [
  { title: 'Quality', text: 'Schedule Equipment Anytime, Seamlessly', bgColor: '#00bcd4', icon: <FaChartLine /> },
  { title: 'Data Security', text: 'Stay Updated, Avoid Surprises', bgColor: '#4caf50', icon: <FaShieldAlt /> },
  { title: 'Scalability', text: 'Group, Control, Assign Roles', bgColor: '#ffc107', icon: <FaExpandArrowsAlt /> },
  { title: 'Customization', text: 'Smart Scheduling, Uninterrupted Operations', bgColor: '#9c27b0', icon: <FaCogs /> },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ff9800', icon: <BsGraphUpArrow /> },
  { title: 'Stay Audit-Ready', text: 'Automated Logs, Effortless Records', bgColor: '#4caf50', icon: <FaFileInvoiceDollar /> },
];

const wasteManagement = [
  { title: "Waste Tracking", text: "Monitor collection, segregation, and disposal in real-time.", bgColor: "#00bcd4", icon: <FaTrashAlt /> },
  { title: "Optimized Collection Routes", text: "AI-driven route planning for fuel efficiency and reduced costs.", bgColor: "#4caf50", icon: <FaChartLine /> },
  { title: "Smart Bin Alerts", text: "IoT-enabled bins notify when full, ensuring timely collection.", bgColor: "#ffc107", icon: <FaTrashRestoreAlt /> },
  { title: "Seamless Compliance Reporting", text: "Automated documentation for regulatory authorities.", bgColor: "#9c27b0", icon: <FaFileInvoiceDollar /> },
  { title: "Real-Time Dashboards", text: "Gain insights into waste management performance instantly.", bgColor: "#ff9800", icon: <FaChartPie /> },
  { title: "Worker Safety Monitoring", text: "Track health check-ups and hazardous exposure for workers.", bgColor: "#4caf50", icon: <FaHardHat /> }
];

const sales = [
  { title: '24/7 Access with less man power', text: 'Schedule Equipment Anytime, Seamlessly', bgColor: '#00bcd4', icon: <GiSandsOfTime /> },
  { title: 'Real-Time Availability!', text: 'Stay Updated, Avoid Surprises', bgColor: '#4caf50', icon: <FaChartLine /> },
  { title: 'Efficiency', text: 'Automate tasks like orders creation or generating invoices', bgColor: '#ffc107', icon: <BsFillGearFill /> },
  { title: 'Business Growth', text: 'Payment reminders and tax invoice creation simplify cash flow management.', bgColor: '#9c27b0', icon: <GiReceiveMoney /> },
  { title: 'Performance', text: 'Bulk processing with high TPS.', bgColor: '#ff9800', icon: <BsGraphUpArrow /> },
  { title: 'Stay Audit-Ready', text: 'Tracking all the detailed changes', bgColor: '#4caf50', icon: <FaFileInvoiceDollar /> },
];

const Facility = [
  { title: 'Asset Lifecycle Tracking', text: 'Monitor and manage asset performance, maintenance history, and status in real time.', bgColor: '#00bcd4', icon: <FaChartLine /> },
  { title: 'Work Order Automation', text: 'Automate task creation and assignment for scheduled and emergency maintenance.', bgColor: '#4caf50', icon: <BsFillGearFill /> },
  { title: 'Predictive Maintenance', text: 'Prevent equipment failure with smart scheduling based on usage patterns and alerts.', bgColor: '#ffc107', icon: <FaTachometerAlt /> },
  { title: 'Space Planning & Utilization', text: 'Optimize floor plans and space usage with interactive layouts and occupancy insights.', bgColor: '#9c27b0', icon: <FaBuilding /> },
  { title: 'Vendor Management', text: 'Track service partner performance, contract terms, and SLA compliance digitally.', bgColor: '#ff9800', icon: <FaUserTie /> },
  { title: 'Real-Time Dashboards', text: 'View operations performance, task status, and cost analytics at a glance.', bgColor: '#4caf50', icon: <FaChartPie /> },
];

const Hospital = [
  { title: 'Real-Time Patient Dashboard', text: 'Monitor patient records, vitals, test results, and treatment plans in real time for informed care decisions.', bgColor: '#00bcd4', icon: <FaTachometerAlt /> },
  { title: 'Automated Scheduling System', text: 'Coordinate appointments, lab tests, surgeries, and staff shifts seamlessly to optimize hospital operations.', bgColor: '#4caf50', icon: <BsFillGearFill /> },
  { title: 'Instant Notification Alerts', text: 'Receive timely updates on critical patient conditions, test results, or staff schedule changes.', bgColor: '#ffc107', icon: <FaExclamationTriangle /> },
  { title: 'Accurate Tracking', text: 'Track medications and samples with QR code scanning for accurate verification and error-free workflows.', bgColor: '#9c27b0', icon: <MdOutlinePrecisionManufacturing /> },
  { title: 'Data-Driven Analytics', text: 'Analyze bed occupancy, patient outcomes, and staff performance in real time to drive operational excellence.', bgColor: '#ff9800', icon: <FaChartPie /> },
  { title: 'Integrated Billing Operations', text: 'Streamline financial workflows with itemized invoices and insurance claim tracking for efficiency.', bgColor: '#4caf50', icon: <FaFileInvoiceDollar /> },
];

const Solar = [
  { title: 'Real-Time Monitoring', text: 'Live tracking of voltage, current,temperature, and solar irradiance.', bgColor: '#00bcd4', icon: <FaTachometerAlt /> },
  { title: 'Fault Detection & Alerts', text: 'Instant alerts for issues like shading, dirt, or overheating.', bgColor: '#4caf50', icon: <FaExclamationTriangle /> },
  { title: 'Analysis & Dashboard', text: 'Analysis of the solar system vendor, showing total products sold and total income earned.', bgColor: '#ffc107', icon: <FaChartPie /> },
  { title: 'Seamless Connectivity', text: 'Seamless connectivity in a solar management system ensures smooth communication between components.', bgColor: '#9c27b0', icon: <FaMobileAlt /> },
  { title: 'Predictive Maintenance', text: 'Uses data and analytics to anticipate equipment issues before they occur.', bgColor: '#ff9800', icon: <FaTachometerAlt /> },
  { title: 'Real-Time Task Management', text: 'In solar operations, it ensures tasks are efficiently assigned to the right team members for smooth workflow', bgColor: '#4caf50', icon: <BsFillGearFill /> },
];

const inventoryManagement = [
  { 
    title: "Structured Setup & Categorization", 
    text: "Define inventory categories, organize items by location, and manage multiple inventories with full compliance.", 
    bgColor: "#00bcd4", 
    icon: <FaProjectDiagram /> 
  },
  { 
    title: "Flexible Item Management", 
    text: "Add and maintain items with supplier details, batch/expiry info, BIN locations, and custom additional fields.", 
    bgColor: "#4caf50", 
    icon: <BsBoxSeam /> 
  },
  { 
    title: "Stock Inflow via Purchase Orders", 
    text: "Automatically increase stock levels during goods receipt, with GRN, BIN allocation, and auto accounting entries.", 
    bgColor: "#ffc107", 
    icon: <FaTruckLoading /> 
  },
  { 
    title: "QR-Based Stock Inspection", 
    text: "Perform physical stock checks with QR code scanning to instantly verify and adjust discrepancies.", 
    bgColor: "#9c27b0", 
    icon: <FaQrcode /> 
  },
  { 
    title: "Automated Consumption Adjustments", 
    text: "Track real-time stock reductions during sales and work orders with FIFO-based allocation and history logs.", 
    bgColor: "#ff9800", 
    icon: <FaCogs /> 
  },
  { 
    title: "Comprehensive Audit Trail", 
    text: "Maintain transparent, audit-ready inventory movement records for accountability and compliance.", 
    bgColor: "#4caf50", 
    icon: <FaFileInvoiceDollar /> 
  }
];


const Ai = [
  { title: 'PPE Detection', text: 'Real-time verification of safety gear—helmets, gloves, vests—ensures worker compliance before entering critical zones', bgColor: '#00bcd4', icon: <MdHealthAndSafety /> },
  { title: 'Surveillance & Activity Monitoring', text: '24/7 AI-powered monitoring for motion detection, zone violations, crowd density, and action recognition like running or fighting.', bgColor: '#4caf50', icon: <FaEye /> },
  { title: 'Text Extraction', text: 'Extract machine labels, maintenance logs, and operator notes using OCR for digital record-keeping and compliance tracking.', bgColor: '#ffc107', icon: <FaFileAlt /> },
  { title: 'Anomaly Detection', text: 'Identify irregularities in machine behavior, product flow, or process parameters using unsupervised learning models.', bgColor: '#9c27b0', icon: <FaExclamationTriangle /> },
  { title: 'Bottleneck Alerts', text: 'Track production delays at different stages. Get instant alerts on where the workflow slows down to optimize throughput.', bgColor: '#ff9800', icon: <FaChartLine /> },
  { title: 'Predictive Maintenance', text: 'Forecast machine failures or end-of-life using historical usage, vibration, and temperature data—preventing unplanned downtime.', bgColor: '#4caf50', icon: <FaTachometerAlt /> },
];

const glpmanagement = [
  {
    title: "Projects Tracking",
    text: "Track assigned projects, animal groups, and test lists",
    bgColor: "#00bcd4",
    icon: <FaProjectDiagram />,
  },
  {
    title: "Test Data Capture",
    text: "Record results by date, group, and test type",
    bgColor: "#4caf50",
    icon: <FaVials />,
  },
  {
    title: "Progress Tracking",
    text: "Monitor study completion & filter results with ease",
    bgColor: "#ffc107",
    icon: <FaTasks />,
  },
  {
    title: "GLP Compliance",
    text: "Data locked upon submission for integrity",
    bgColor: "#9c27b0",
    icon: <FaShieldAlt />,
  },
  {
    title: "Real-Time Dashboards",
    text: "Gain insights into lab performance instantly.",
    bgColor: "#ff9800",
    icon: <FaChartPie />,
  },
  {
    title: "Mobile Access",
    text: "Manage study data anytime, anywhere via Atomwalk’s app",
    bgColor: "#4caf50",
    icon: <FaMobileAlt />,
  },
];


const FeatureBenefits = ({ data }) => {
  const benefits = data === 'AI' ? Ai : 
                   data === 'Solar' ? Solar : 
                   data === 'Hospital' ? Hospital : 
                   data === 'Facility' ? Facility : 
                   data === 'LMS' ? labManagement : 
                   data === 'Claim' ? claimBenefits : 
                   data === 'Customer' ? leadBenefits : 
                   data === 'HR' ? hrmBenefits : 
                   data === 'Equipment' ? labEquipment : 
                   data === 'Waste' ? wasteManagement : 
                   data === 'Inventory' ? inventoryManagement : 
                   data === 'Sales and Procurement' ? sales : 
                   data === 'GLP' ? glpmanagement : 
                   leaveBenefits;

  const getTitle = () => {
    switch(data) {
      case 'Solar': return 'Solar Intelligence Optimize, Control, and Grow.';
      case 'Facility': return 'All-in-One Facility Management, Streamlined and Smarter.';
      case 'AI': return 'AI-Powered Insights for Smarter Operations';
      case 'GLP': return 'Get your lab in order, and your data in line';
      default: return `All-in-One ${data} Management, Faster and Easier.`;
    }
  };

  const getSubtitle = () => {
    switch(data) {
      case 'Solar': return 'Harness the power of intelligent solar management for maximum efficiency and growth.';
      case 'Facility': return 'Comprehensive facility solutions that simplify operations and enhance productivity.';
      case 'AI': return 'Transform your operations with cutting-edge artificial intelligence solutions.';
      case 'GLP': return 'Discover how our GLP can streamline your operations and boost productivity';
      default: return `Discover how our ${data} management solution can streamline your operations and boost productivity.`;
    }
  };

  return (
    <Section>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {getTitle().split(',')[0]}, <span>{getTitle().split(',')[1]}</span>
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {getSubtitle()}
        </Subtitle>
        
        <BenefitsContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              variants={itemVariants}
              whileHover="hover"
            >
              
              <IconCircle 
                bgcolor={benefit.bgColor}
                variants={iconVariants}
              >
                {benefit.icon}
              </IconCircle>
              
              <BenefitTitle 
                bgcolor={benefit.bgColor}
                variants={titleVariants}
              >
                {benefit.title}
              </BenefitTitle>
              
              <BenefitText>
                {benefit.text}
              </BenefitText>
            </BenefitItem>
          ))}
        </BenefitsContainer>
      </ContentWrapper>
    </Section>
  );
};

export default FeatureBenefits;