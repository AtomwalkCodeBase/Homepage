import React, { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/ProductCategory.svg';
import img2 from '../../assets/img/ProcessInventorySetup.svg';
import img3 from '../../assets/img/EquipmentSetup.svg';
import img4 from '../../assets/img/DocumentSetup.svg';
import img5 from '../../assets/img/ActivitySetup.svg';
import img6 from '../../assets/img/ProcessSetup.svg';
import img7 from '../../assets/img/ProjectCreation.svg';
import img8 from '../../assets/img/UserActivity.svg';
import img9 from '../../assets/img/ProjectMangement.svg';
import img10 from '../../assets/img/ActivityDB.svg';
import img11 from '../../assets/img/ProjectDB.svg';
import img12 from '../../assets/img/ResourceUtilisationDB.svg';
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e8f1fe; 
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
    /* width: 400px; */
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


const ProcessFeatures = ({data}) => {
  console.log(data,"  dcjcnd");
  const isClaim = data;
    const getFeatureContent = (feature) => (
      <Features>
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
  
    const features = isClaim =='process'
      ?[
        {
          title: 'Product Management with Category Setup',
          subtitle: 'Organize Products for Better Process Integration',
          description:
            `Atomwalk makes managing product categories effortless, ensuring that every product is aligned with your business's financial and operational needs. This structured categorization ensures seamless product segregation for streamlined operations. Atomwalk ensures you’re ready for seamless operations and compliance.`,
          benefits: ['Segregate products effectively for better management', 'It Helps to filter the product.'],
          imageSrc: img1,  // Replace with your relevant image variable
          imageAlt: 'Product Category',
          imgPosition: 'right',
        },
        {
          title: 'Comprehensive Inventory Management with Atomwalk',
          subtitle: 'Structured Setup and Categorization for Smarter Control',
          description:
            `Atomwalk enables precise inventory management, ensuring every item is categorized to align with your business’s operational needs. Begin with the Inventory Item Category Setup to establish structured categorization. Organize inventory location-wise and efficiently handle multiple inventories. With Atomwalk, you can create and manage inventory items by filling in detailed information and linking them category-wise. Atomwalk ensures you’re ready for seamless operations and compliance.`,
          benefits: ['Establish structured categories for inventory items.', 'Organize inventory by specific locations.', 'Multiple Inventory Management, Create and organize inventory items with complete details.','Associate items with categories for better tracking.'],
          imageSrc: img2,  // Replace with your relevant image variable
          imageAlt: 'Inventory Setup',
          imgPosition: 'left',
        },
        {
          title: 'Robust Equipment Management with Atomwalk',
          subtitle: 'Streamlined Equipment Setup and Usage Tracking',
          description:
            `Atomwalk equips administrators to manage multiple equipment with precision. Navigate to the 'Equipment Setup' under 'Office Setup' to add and configure equipment as needed. By entering details like equipment type, usage unit, booking schedules, and cost data, Atomwalk ensures efficient load management and accurate tracking. This structured approach aligns your equipment utilization with operational needs while ensuring seamless integration into your workflows.`,
          benefits: ['Able to manage multiple equipment, Add equipment with detailed configurations, including type and usage parameters.', 'Define schedules with booking times, slots, and restrictions.', 'Automatically track and manage equipment load efficiently.'],
          imageSrc: img3,  // Replace with your relevant image variable
          imageAlt: 'Equipment Setup',
          imgPosition: 'right',
        },
        {
            title: 'Manage Document Setup and Configuration',
            subtitle: 'Capture Output Documents for Manufacturing Process',
            description:
              'Atomwalk’s document configuration feature empowers admins to tailor reports and documentation according to the manufacturing industry specific requirements. Detailed reports based on equipment output results can be stored in the form of documents. The system supports real-time data visualization, making it easier to analyze experiment results and make informed decisions.',
            benefits: ['Customizable document setup', 'Real-time data visualization'],
            imageSrc: img4,  // Replace with your relevant image variable
            imageAlt: 'Document Setup',
            imgPosition: 'left',
          },
          {
            title: 'Comprehensive Management for Activity Essentials',
            subtitle: 'Integrate items, equipment, and resources effortlessly into activities.',
            description:
              'Atomwalk enables organizations to create, customize, and manage process activities with precision and flexibility. Configure activity specifics like categories, types, and user groups, ensuring seamless alignment with existing workflows. Features like planned durations, open-ended activities, and visual customizations empower businesses to enhance workflow clarity and efficiency. Atomwalk also simplifies resource allocation by allowing users to add required items, link equipment with precise work durations, and manage critical details such as documents, reviews, and costs. With customizable fields and robust tools, Atomwalk ensures every activity is defined, equipped, and executed efficiently, driving operational success.'
              ,benefits: ['Add items from inventory or create new ones to align with activity needs.', 'Select or add equipment, with options to book it for specific durations.', 'Add custom fields to activities based on unique requirements.','Manage documents, reviews, and cost details for each activity.','Ensure equipment availability with defined work durations.'],
            imageSrc: img5,  // Replace with your relevant image variable
            imageAlt: 'Activity Creation',
            imgPosition: 'right',
          }, 
          {
            title: 'Optimize Manufacturing Processes with Activity-Based Templates',
            subtitle: 'Create, Manage, and Analyze for efficient process execution.',
            description:
              'Easily create a sequence of activities for projects in the manufacturing industry with our intuitive process management system. Define processes by filling essential details, add activities with customizable fields like planned duration and allocation percentage, and manage dependencies. Gain insights through an interactive Gantt chart, track item details (BOM, WIP materials, and output), and evaluate efficiency with detailed cost analysis, including equipment requirements.',
            benefits: ['Define process details: name, category, ID, type, manufacturing, sale price, description.', 'Add activities: duration (planned days), allocation %, dependencies.','Link dependent activities for seamless workflow management.','View Activity Gantt Chart and dependency graphs.',' Monitor BOM, WIP materials, and output details with images and costs.','Analyze equipment requirements and associated costs.','Evaluate process and activity efficiency.'],
            imageSrc: img6,  // Replace with your relevant image variable
            imageAlt: 'Creation of Process',
            imgPosition: 'left',
          },
          
      ]:isClaim =='project'?[
        {
          title: 'Efficient Work Order Management Made Simple',
          subtitle: 'Streamline project creation and link seamlessly with sales orders.',
          description:
            `Atomwalk enables businesses to create projects seamlessly after confirming sales orders, ensuring smooth transition into work orders. Users can generate detailed projects by linking them to specific sales orders, ensuring all relevant details auto-populate while offering flexibility for customization. From assigning a project manager to selecting a suitable project setup template, Atomwalk simplifies the workflow, making project creation both efficient and adaptable.`,
          benefits: ['Unique codes ensure streamlined tracking.',
                      "Auto-populates order items and templates linked to sales orders",
                      "Edit fields like project title, revenue, start date, and description as needed.",
                      "Automatically suggests templates, with options for customization.",     ],
          imageSrc: img7,  // Replace with relevant image variable for campaign management
          imageAlt: 'Project/Work Order Creation',
          imgPosition: 'right',
        },
        {
          title: 'Empower Your Projects with Advanced Activity Management',
          subtitle: 'Customizable, collaborative, and detailed project activity tracking.',
          description:
            `Atomwalk empowers project teams with seamless activity tracking and inventory management. Once the project manager starts a project, allocated users receive job cards with detailed activity instructions and work order references. The structured job card minimizes data input errors, ensuring accuracy. Users can begin activities by clicking the 'Start Project' button in their 'Project Activities' list, with dependencies automatically validated. As activities progress, users can update in-process and output inventory details, track activity completion metrics, and finalize tasks with remarks. Atomwalk also allows the allocation and reallocation of inventory items, with provisions to return unused items, helping businesses reduce waste and optimize inventory tracking.`,
          benefits: ["Activities reflect for assigned users after project initiation.",
                     "Access detailed job cards with work order references and structured fields for updates.",
                     "Activities can only start once dependent tasks are completed.",
                    " Update in-process and output inventory details during project execution.",
                    "Allocate, reallocate, or return unused items to prevent losses and ensure efficient inventory usage.",
                    "Updated details reflect on the final job card for streamlined reporting."
                ],
          imageSrc: img8,  // Replace with relevant image variable for campaign execution
          imageAlt: 'User Activity Management',
          imgPosition: 'left',
        },
        {
          title: 'Streamlined Project Management Tailored for Manufacturing',
          subtitle: 'Efficient Activity Coordination and Resource Tracking',
          description:
            `Atomwalk provides manufacturing-focused project management, integrating activity planning, dependency setup, and resource tracking. Activities auto-populate from process templates, with options to add or customize tasks and dependencies using a Gantt Chart view. Users can manage project inventory, equipment requirements, and critical documents essential for execution. The cost analysis module offers insights into activity costs, inventory expenses, and equipment usage, with detailed revenue and margin tracking. Atomwalk ensures precise planning, resource optimization, and improved project efficiency for manufacturing operations.`,
          benefits: ['Auto-populated tasks with dependency and sub-activity options.', ' Visualize and manage critical and other paths for streamlined workflows.', 'Manage inventory, equipment, and required documents effectively.','Track activity costs, equipment usage, and project margins.','Tools designed for the specific demands of manufacturing projects.'],
          imageSrc: img9,  // Replace with relevant image variable for campaign execution
          imageAlt: 'Project Management',
          imgPosition: 'right',
        }               
         
        ]:isClaim =='activityreport'?[
          {

            title: 'Activity Dashboards for Efficient Manufacturing Projects',
            subtitle: 'Track Activities and Ensure Operational Precision',
            description:
              'Atomwalk’s Activity Dashboard helps manufacturing teams efficiently track and manage tasks. Users can view assigned activities, track progress, and address overdue or pending tasks. Key metrics include overdue activities, upcoming deadlines, and completed milestones, with dynamic filters for quick sorting by date, type, or status. Designed to optimize workflows, the dashboard provides real-time access to activity details, ensuring seamless task execution and improved project efficiency in manufacturing operations.',
            benefits: ['Track personal activities, including ongoing, overdue, and completed tasks.', 'Access critical data like deadlines and completion statuses.', ' Access detailed project overviews, including overdue and future activities.','Sort activities by date, type, status, or assigned user for customized tracking.','Monitor progress, identify delays, and optimize task management.',' Use dashboard insights to allocate resources effectively and meet deadlines.'],
            imageSrc: img10,  // Replace with relevant image variable for campaign execution
            imageAlt: 'User Activity Dashboard',
            imgPosition: 'right',
          },
          {
            title: `Optimize Profitability with Atomwalk's Project Margin Dashboard`,
            subtitle: 'Customizable, collaborative, and detailed project activity tracking.',
            description:
              `Atomwalk’s Project Margin Dashboard provides manufacturing teams with a clear comparison of planned vs. actual margins through graphical views. Users can review project lists with details like assigned managers, project status, and margins. The dashboard also enables quick access to critical data, including project revenue, cost breakdowns, activity dependencies, inventory, and equipment requirements, ensuring better margin control and operational efficiency.`,
            benefits: ["Visualize planned vs. actual margins for each project.",
                       "Review assigned managers, project status, and key metrics.",
                       "Access revenue and cost breakdowns for users, items, and equipment.",
                      " Tools tailored for profit tracking and resource efficiency.",
                      "Dynamic Filter & Sorting of List."
                  ],
            imageSrc: img11,  // Replace with relevant image variable for campaign execution
            imageAlt: 'Project Dashboard',
            imgPosition: 'left',
          },
          {
            title: `Optimize Resource Allocation with Atomwalk's Utilization Dashboard`,
            subtitle: 'Track Effort Utilization for Better Resource Planning',
            description:
              `Atomwalk’s Resource Utilization Dashboard provides a clear view of planned vs. actual effort utilization through dynamic graphical insights. Manufacturing teams can analyze month-wise utilization, compare planned and actual capacities, and filter data by manager, project, user, or date. The dashboard also offers detailed User Effort Utilization Data to monitor resource-specific performance, ensuring effective allocation and efficient workload distribution across projects.`,
            benefits: ['Graphical view of planned vs. actual resource usage.', ' Sort by manager, project, user, or date for precise insights.', 'Analyze planned and actual monthly effort capacities.','Monitor individual user effort utilization.','Tools to enhance resource efficiency and project alignment.'],
            imageSrc: img12,  // Replace with relevant image variable for campaign execution
            imageAlt: 'Resource Utilisation',
            imgPosition: 'right',
          }  
        ]:[
          {

            title: 'Activity Dashboards for Efficient Manufacturing Projects',
            subtitle: 'Track Activities and Ensure Operational Precision',
            description:
              'Atomwalk’s Activity Dashboard helps manufacturing teams efficiently track and manage tasks. Users can view assigned activities, track progress, and address overdue or pending tasks. Key metrics include overdue activities, upcoming deadlines, and completed milestones, with dynamic filters for quick sorting by date, type, or status. Designed to optimize workflows, the dashboard provides real-time access to activity details, ensuring seamless task execution and improved project efficiency in manufacturing operations.',
            benefits: ['Track personal activities, including ongoing, overdue, and completed tasks.', 'Access critical data like deadlines and completion statuses.', ' Access detailed project overviews, including overdue and future activities.','Sort activities by date, type, status, or assigned user for customized tracking.','Monitor progress, identify delays, and optimize task management.',' Use dashboard insights to allocate resources effectively and meet deadlines.'],
            imageSrc: img10,  // Replace with relevant image variable for campaign execution
            imageAlt: 'User Activity Dashboard',
            imgPosition: 'right',
          },];
     
      const location = useLocation(); // Get the current URL
      useEffect(() => {
        // Get the query string (e.g., "?5")
        const queryString = location.search;
      
        // Extract the step manually if no key exists
        const stepMatch = queryString.match(/\?(\d+)/);
        const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;
      
        console.log(step, "Step value parsed from URL");
      
        // Define base scroll offset values for each claim type
        const scrollOffsetMap = {
          process: 780,
          project: 800,
          activityreport: 870,
        };
      
        // Get the base offset value based on isClaim
        const baseScrollOffset = scrollOffsetMap[isClaim] || 0;
      
        // Calculate scroll offset
        const scrollOffset = !isNaN(step) ? baseScrollOffset + (step - 1) * baseScrollOffset : 0;
      
        // Scroll the page
        if (scrollOffset > 0) {
          window.scrollTo({
            top: scrollOffset,
            behavior: "smooth",
          });
        }
      }, [location.search, isClaim]); // Re-run when URL query changes


    return <Container>{features.map(getFeatureContent)}</Container>
}

export default ProcessFeatures