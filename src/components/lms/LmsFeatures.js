import { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/Labprojectcreation.svg';
import img2 from '../../assets/img/Activitydetails.svg';
import img3 from '../../assets/img/emp_advance.svg';
import img4 from '../../assets/img/Labdocset.svg'
import img5 from '../../assets/img/Labobjective.svg'
import labProcessemplate1 from '../../assets/img/processtemplate1.svg'
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #e8fcec;  */
  padding: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 50px;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  img {
    width: 100%;
    /* max-width: 500px; */
  }

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const BenefitsContainer = styled.div`
  /* background-color: #fff;
  border-color: #e8e8e9;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.8px; */
  /* display: flex; */
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  line-height: 26px;
  padding: 24px;
  text-align: center;

  p {
    color: #1c1b1f;
    line-height: 24px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
    gap: 20px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 460px;
    gap: 8px;
  }

  li img {
    width: 30px;
    height: 30px;
  }

  li span {
    color: #1E90FF; 
    font-size: 0.9rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    ul {
      justify-content: space-around;
    }
    li {
      width: 300px;
  }
  }
`;

const TextSection = styled.div`
  text-align: center;
  color: #000;
  margin-top: 20px;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.5rem;
    color: #6a1b9a;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    text-align: left;
    width: 50%;

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;


const LmsFeatures = ({data,bgcolors}) => {
    const isClaim = data;
    const location = useLocation(); // Get the current URL

    useEffect(() => {
      // Get the query string (e.g., "?5")
      const queryString = location.search;
  
      // Extract the step manually if no key exists
      const stepMatch = queryString.match(/\?(\d+)/);
      const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;
  
      // Calculate scroll offset
      const scrollOffset = !isNaN(step) ? 700 + (step - 1) * 750 : 0;
  
      // Scroll the page
      if (scrollOffset > 0) {
        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    }, [location.search]);

    const getFeatureContent = (feature) => (
      <Features style={{backgroundColor:`${bgcolors}`}}>
        {feature.imgPosition === 'left' ? (
          <>
            <ImageSection>
              <img src={feature.imageSrc} alt={feature.imageAlt} />
            </ImageSection>
            <TextSection>
              <h1>{feature.title}</h1>
              <h2>{feature.subtitle}</h2>
              <p style={{color:"#666"}}>{feature.description}</p>
              <BenefitsContainer>
                {/* <p>Key Benefits</p> */}
                <ul>
                  {feature.benefits.map((benefit, index) => (
                    <li key={index}>
                      <img src={CheckMark} alt="Check mark" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </BenefitsContainer>
            </TextSection>
          </>
        ) : (
          <>
            <TextSection>
              <h1>{feature.title}</h1>
              <h2>{feature.subtitle}</h2>
              <p style={{color:"#666"}}>{feature.description}</p>
              <BenefitsContainer>
                {/* <p>Key Benefits</p> */}
                <ul>
                  {feature.benefits.map((benefit, index) => (
                    <li key={index}>
                      <img src={CheckMark} alt="Check mark" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </BenefitsContainer>
            </TextSection>
            <ImageSection>
              <img src={feature.imageSrc} alt={feature.imageAlt} />
            </ImageSection>
          </>
        )}
      </Features>
    );
  
    const features = isClaim === 'userManagement'
    ? [
        {
          title: 'Manage User group (Lab Departments) for  Effortless Management / Analytics',
          subtitle: 'Empowering Admins to Manage Every Aspect of Lab Operations',
          description: 'Atomwalk’s LEM provides LAB Admins (Owners) with powerful tools to manage user profiles based on the department setup in institution, which inturn helps to oversee equipment usage, and generate insightful reports. This allows Lab Admins to ensure smooth lab operations and maintain compliance effortlessly.',
          benefits: ['Create and manage profiles (Based on Department setup)', 'Configurable access control for each User group'],
          imageSrc: img3, // Replace with relevant image variable for campaign management
          imageAlt: 'Campaign Management Dashboard',
          imgPosition: 'left',
        },
        {
          title: 'Streamlined Management, Enhanced Productivity',
          subtitle: 'Empowering Lab Admins/ Users with Instant Activation and Anytime Access',
          description: 'With Atomwalk’s LEM, LAB Admins can efficiently organize Lab users across users groups. User can manage their Profile and manage passwords on DIY basis. LAB Users can maintain their user name/ nick name to access the system anytime anywhere for equipment booking/cancellations.',
          benefits: ['LAB Users Creation with right User Group', ' LAB Users Profile/password management'],
          imageSrc: img3, // Replace with relevant image variable for campaign execution
          imageAlt: 'Campaign Performance Tracking',
          imgPosition: 'right',
        },
        {
          title: 'Easy Lab User management - Seamless  Experience',
          subtitle: 'Empowering Lab Admins with Instant Deactivation and remove Access',
          description: 'Atomwalk’s LEM allows Lab Admin users to deactivate Lab Users and remove access in case of disciplinary action or completion of course. Lab Admins also can control temproray access to external Lab users.',
          benefits: ['LAB Users deactivation', 'LAB Users removal of Access'],
          imageSrc: img3, // Replace with relevant image variable for campaign execution
          imageAlt: 'Campaign Performance Tracking',
          imgPosition: 'left',
        },
      ]
    : isClaim === 'equipmentManagement'
    ? [
        {
          title: 'Seamless Equipment Setup',
          subtitle: 'Quick registration for efficient resource management',
          description: 'With Atomwalk’s streamlined setup process, admins can register new equipment in just minutes, ensuring that resources are readily available for team use. Each piece of equipment can be configured with essential details. This quick setup feature simplifies resource onboarding, enabling efficient equipment management and transparent usage policies. Atomwalk’s intuitive setup tools help organizations optimize equipment access and cost tracking with ease.',
          benefits: ['Instant equipment onboarding', 'Customizable usage limits and cost setting', 'Improved resource tracking and availability'],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'Lead Engagement Overview',
          imgPosition: 'right',
        },
        {
          title: 'Efficient Equipment Booking',
          subtitle: 'Simplified management for seamless operations',
          description: 'With Atomwalk’s equipment booking platform, users can book equipment whenever needed, with real-time availability ensuring resources are always visible and accessible. The intuitive dashboard allows users to view open time slots instantly, making it easy to secure necessary equipment without delays. By providing an up-to-date booking calendar and streamlined reservation options, Atomwalk helps users improve scheduling efficiency, reduce conflicts, and maximize equipment utilization.',
          benefits: ['Instant availability check', 'Optimized scheduling for maximum uptime', 'Centralized equipment availability'],
          imageSrc: img2, // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
        {
          title: 'Hassle-Free Cancellations',
          subtitle: 'Adaptable scheduling with flexible change options',
          description: 'With Atomwalk’s equipment booking system, users have the flexibility to cancel bookings effortlessly if plans change. Cancellations can be made up to 30 minutes before the scheduled time, allowing users to adjust reservations without disrupting workflow. This policy ensures efficient resource management and minimizes scheduling conflicts. However, admins and managers have additional flexibility and can cancel bookings at any time, ensuring greater control over equipment availability and usage. With these adaptable cancellation options, Atomwalk enables smoother scheduling and keeps operations flexible.',
          benefits: ['Easy and quick cancellation process', 'Flexible policies for dynamic scheduling', 'Enhanced resource accessibility and optimization'],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'Lead Conversion',
          imgPosition: 'right',
        },
      ]
    : isClaim === 'equipmentMaintenance'
    ? [
        {
          title: 'Proactive Equipment Maintenance',
          subtitle: 'Preventive measures for optimal performance',
          description: 'Atomwalk’s equipment maintenance feature allows admins to schedule preventive maintenance efficiently, ensuring equipment remains in top condition. During maintenance periods, equipment can be blocked from booking, preventing unintended usage and keeping maintenance routines organized. This proactive approach helps to minimize unexpected downtime, extend equipment lifespan, and ensure that all resources are ready when needed. With Atomwalk, maintenance planning becomes seamless, supporting continuous, reliable operation.',
          benefits: ['Scheduled maintenance blocking', 'Minimized downtime with preventive care', 'Enhanced equipment longevity and reliability'],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'Lead Engagement Overview',
          imgPosition: 'right',
        },
        {
          title: 'Emergency Maintenance Protocol',
          subtitle: 'Expert emergency maintenance to minimize downtime and maximize efficiency',
          description: 'Atomwalk’s equipment maintenance feature allows admins to schedule preventive maintenance efficiently, ensuring equipment remains in top condition. During maintenance periods, equipment can be blocked from booking, preventing unintended usage and keeping maintenance routines organized. This proactive approach helps to minimize unexpected downtime, extend equipment lifespan, and ensure that all resources are ready when needed. With Atomwalk, maintenance planning becomes seamless, supporting continuous, reliable operation.',
          benefits: ['Scheduled maintenance blocking', 'Minimized downtime with preventive care', 'Enhanced equipment longevity and reliability'],
          imageSrc: img2, // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
      ]
      :isClaim === 'userroleManagement' ? [
        {
          title: 'Empowered Oversight, Effortless Management',
          subtitle: 'Empowering Admins to Manage Every Aspect of Lab Operations',
          description: 'Atomwalk’s LEM provides admins with powerful tools to manage user profiles, oversee equipment usage, handle emergencies, and generate insightful reports. This allows admins to ensure smooth lab operations and maintain compliance effortlessly.',
          benefits: ['Create and manage profiles', 'Oversee bookings and usage', 'Handle emergencies and generate reports'],
          imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Admin.svg', // Replace with your relevant image variable
          imageAlt: 'Lead Engagement Overview',
          imgPosition: 'right',
        },
        {
          title: 'Streamlined Management, Enhanced Productivity',
          subtitle: 'Enabling Managers to Optimize Lab Workflow and Maintenance',
          description: 'Atomwalk’s equipment maintenance feature allows admins to schedule preventive maintenance efficiently, ensuring equipment remains in top condition. During maintenance periods, equipment can be blocked from booking, preventing unintended usage and keeping maintenance routines organized. This proactive approach helps minimize unexpected downtime, extend equipment lifespan, and ensure that all resources are ready when needed. With Atomwalk, maintenance planning becomes seamless, supporting continuous, reliable operation.',
          benefits: ['Organize groups and tasks', 'Track maintenance', 'Stay informed with real-time data'],
          imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Manager.svg', // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
        {
          title: 'Quick Access, Seamless Experience',
          subtitle: 'Empowering Lab Users with Instant Booking and Personalized Access',
          description: 'Atomwalk’s equipment maintenance feature allows admins to schedule preventive maintenance efficiently, ensuring equipment remains in top condition. During maintenance periods, equipment can be blocked from booking, preventing unintended usage and keeping maintenance routines organized. This proactive approach helps minimize unexpected downtime, extend equipment lifespan, and ensure that all resources are ready when needed. With Atomwalk, maintenance planning becomes seamless, supporting continuous, reliable operation.',
          benefits: ['Instant equipment booking', 'Stay updated with real-time availability', 'Personalized logins'],
          imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/userGroup.svg', // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
      ] : isClaim === 'labProcessemplate' ? [
        {
          title: 'Manage Inventory Items & Equipment Efficiently for Experiment Templates',
          subtitle: 'Organized Setup for Streamlined Operations in Experiment Steps',
          description: 'With Atomwalk’s inventory and equipment setup feature, admins can efficiently configure and categorize all equipment and inventory items. This ensures accurate tracking and optimal usage of resources at the activity level (experiment steps). The system supports detailed classification, making it easier to identify equipment availability, usage patterns, and maintenance needs. Streamlined inventory management helps labs save time, reduce errors, and maintain operational efficiency.', 
          benefits: ['Manage Equipment for experiment steps', 'Manage Inventory items at each Experiment Steps', 'Optimized resource utilization'],
          imageSrc: labProcessemplate1, // Replace with your relevant image variable
          imageAlt: 'Inventory Setup Overview',
          imgPosition: 'right',
        },
        {
          title: 'Manage Document Setup and Configuration',
          subtitle: 'Capture Output Documents for Experiment Steps',
          description: 'Atomwalk’s document configuration feature empowers admins to tailor reports and documentation according to the lab’s specific requirements. Detailed reports based on equipment output results can be stored in the form of documents. The system supports real-time data visualization, making it easier to analyze experiment results and make informed decisions.',
          benefits: ['Customizable document setup', 'Real-time data visualization'],
          imageSrc: img4, // Replace with your relevant image variable
          imageAlt: 'Report Configuration',
          imgPosition: 'left',
        },
        {
          title: 'Manage All Experiment Steps Efficiently',
          subtitle: 'Streamline Workflows with Organized and Sequenced Experiment Steps',
          description: 'Experiment steps (activity) creation in Atomwalk helps labs streamline their workflows by defining tasks and experiment steps systematically. This feature enables efficient planning and execution, ensuring every activity is aligned with lab protocols. Administrators can assign resources, set deadlines, and monitor progress, fostering collaboration and accountability.',
          benefits: ['Systematic workflow organization', 'Resource and task alignment', 'Enhanced productivity and collaboration', 'Clear output documents requirement', 'Review process for experiment steps'],
          imageSrc: img2, // Replace with your relevant image variable
          imageAlt: 'Activity Management',
          imgPosition: 'right',
        },
        {
          title: 'Manage Quality Check Data for Each Experiment Step',
          subtitle: 'Ensuring Excellence Through Structured Quality Control',
          description: 'The quality management feature for each step of an experiment in Atomwalk ensures adherence to high standards by enabling systematic monitoring and control. Labs can set up quality checks, track compliance, and address discrepancies effectively. This ensures consistent performance, mitigates risks, and upholds the lab’s reputation for reliability and excellence.',
          benefits: ['Structured quality control', 'Compliance tracking and management', 'Risk mitigation and performance consistency', 'Review process for QC data'],
          imageSrc: img3, // Replace with your relevant image variable
          imageAlt: 'Quality Assurance',
          imgPosition: 'left',
        },
      ] : isClaim === 'labExperimentProject' ? [
        {
          title: 'Manage Lab Experiment Projects Efficiently',
          subtitle: 'Initiate, Allocate, and Track Your Lab Experiment Projects',
          description: 'With Atomwalk’s lab experiment project creation feature, you can select the experiment process template to initiate the project. All required details, like experiment steps, equipment, inventory items, and output document details, will be auto-populated from the experiment template, ensuring operational efficiency for your lab experiments. Assign lab users (research students), set deadlines and sub-activities, and ensure alignment of goals for successful execution. This foundational step lays the groundwork for organized lab experiment project management.',
          benefits: [
            'Systematic experiment step organization',
            'Improved task allocation and tracking',
            'Simplified progress monitoring',
            'Effective inventory item management',
            'Equipment allocation to projects',
            'Experiment step-wise documents in one dashboard',
            'Enhanced collaboration and planning',
            'Time-saving predefined templates',
            'Consistency in execution',
          ],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'Project Creation Overview',
          imgPosition: 'right',
        },
        {
          title: 'Manage Your Lab Project Objectives',
          subtitle: 'Track Lab Project Objective Statuses',
          description: 'Atomwalk enables you to define and manage all your project objectives in one place. Objective statuses can be tracked by the PI (project manager), and necessary steps can be planned.',
          benefits: [
            'Clear project objectives and scope',
            'Defined timelines and responsibilities',
            'Enhanced collaboration and planning',
          ],
          imageSrc: img5, // Replace with your relevant image variable
          imageAlt: 'Activity Steps Management',
          imgPosition: 'left',
        },
        {
          title: 'Enable Periodic Updates of Experiment Steps',
          subtitle: 'Manage Your Experiment Steps from the Activity Dashboard',
          description: 'Atomwalk enables you to define and organize specific activity steps required for your project. This modular approach ensures that every task is accounted for and easily manageable. Each step can be assigned to team members, monitored for progress, and adjusted as needed.',
          benefits: [
            'Real-time inventory allocation and tracking',
            'Periodic updates of experiment steps with required documents (output results)',
            'Manage equipment booking',
            'Review process for output documents',
            'Sub-activity steps management',
          ],
          imageSrc: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/stepsoflab.svg', // Replace with your relevant image variable
          imageAlt: 'Process Template Selection',
          imgPosition: 'right',
        },
      ] 
      
    :[
        {
          title: 'Optimize Resource Allocation with Usage Insights',
          subtitle: 'Gain clear visibility into equipment usage patterns',
          description: 'The Usage Trends feature helps you track how and when equipment is being used, allowing you to make data-driven decisions that optimize resource allocation, maintenance, and purchases. By identifying high-demand resources, you can better plan for upkeep and future acquisitions.',
          benefits: ['Scheduled maintenance blocking', 'Minimized downtime with preventive care', 'Enhanced equipment longevity and reliability'],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'Lead Engagement Overview',
          imgPosition: 'right',
        },
        {
          title: 'Ensure Compliance with Complete Audit Logs',
          subtitle: 'Maintain a clear, secure trail of actions and changes',
          description: 'Audit-Ready Records keep a detailed log of all actions and changes, ensuring compliance with industry regulations. This feature provides an accessible and secure record for audits, giving your team peace of mind and simplifying the audit process.',
          benefits: ['Scheduled maintenance blocking', 'Minimized downtime with preventive care', 'Enhanced equipment longevity and reliability'],
          imageSrc: img2, // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
        {
          title: 'Streamlined Data Management for System Efficiency',
          subtitle: 'Preventive measures for optimal performance',
          description: 'The Data Purge feature enables you to securely remove outdated or unnecessary data, helping maintain a clutter-free system and improve overall performance. This process ensures that only relevant and up-to-date information is retained, reducing storage costs and supporting compliance with data retention policies.',
          benefits: ['Scheduled maintenance blocking', 'Minimized downtime with preventive care', 'Enhanced equipment longevity and reliability'],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'Lead Engagement Overview',
          imgPosition: 'right',
        },
        {
          title: 'Transform Data into Actionable Insights',
          subtitle: 'Drive smarter decisions with detailed analytics',
          description: 'By analyzing data from different processes, it empowers your team to make informed decisions that enhance efficiency, reduce downtime, and ensure compliance. This powerful tool helps you maximize the value of your resources and refine your operations with data-driven strategies.',
          benefits: ['Scheduled maintenance blocking', 'Minimized downtime with preventive care', 'Enhanced equipment longevity and reliability'],
          imageSrc: img2, // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
      ];
  
      
  
    return <Container>{features.map(getFeatureContent)}</Container>
}

export default LmsFeatures;
