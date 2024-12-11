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


const InventoryFeatures = ({data}) => {
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
  
    const features = isClaim =='inventoryop'
      ?[
        {
          title: 'Comprehensive Inventory Management with Atomwalk',
          subtitle: 'Structured Setup and Categorization for Smarter Control',
          description:
            `Atomwalk enables precise inventory management, ensuring every item is categorized to align with your business’s operational needs. Begin with the Inventory Item Category Setup to establish structured categorization. Organize inventory location-wise and efficiently handle multiple inventories. With Atomwalk, you can create and manage inventory items by filling in detailed information and linking them category-wise. Atomwalk ensures you’re ready for seamless operations and compliance.`,
          benefits: ['Establish structured categories for inventory items.', 'Organize inventory by specific locations.','Multiple Inventory Management, Create and organize inventory items with complete details.','Associate items with categories for better tracking.','Supports efficient inventory control and production planning.'],
          imageSrc: img1,  // Replace with your relevant image variable
          imageAlt: 'Inventory Setup',
          imgPosition: 'right',
        },
        {
          title: 'Flexible Inventory Item Management with Atomwalk',
          subtitle: 'Organize Items by Category, Type, and Supplier Details',
          description:
            `Atomwalk streamlines inventory item setup by allowing users to add items across various categories, inventory types, batch types, and valuation methods. Users can also associate supplier details with items if required. For enhanced customization, Atomwalk provides an Additional Fields feature, enabling users to dynamically add and manage extra fields based on specific business needs, ensuring a tailored inventory management experience for manufacturing operations.`,
          benefits: ['Add items by category, type, and group.', 'Include supplier-specific information as needed.', 'Add custom fields through the Additional Fields feature.','Designed for comprehensive inventory tracking and organization.'],
          imageSrc: img2,  // Replace with your relevant image variable
          imageAlt: 'Inventory Item',
          imgPosition: 'left',
        },
        {
          title: 'Dynamic Inventory Stock Management with Atomwalk',
          subtitle: 'Track, Update, and Manage Stock Effortlessly',
          description:
            `Atomwalk empowers users to dynamically manage inventory stock through the Batch Details section. Track essential details such as batch numbers, expiry dates, bin locations, initial and current quantities, and stock history. Users can view stock opening balances and update item stock details directly via the Action button, ensuring accurate and real-time stock management tailored to manufacturing needs.`,
          benefits: ['Monitor batch numbers, expiry dates, and bin locations.', 'View initial and current quantities, history, and opening balances.', 'Modify stock details instantly through the Action button.','Tools for precise stock control and visibility.'],
          imageSrc: img3,  // Replace with your relevant image variable
          imageAlt: 'Stock Management',
          imgPosition: 'right',
        },
        {
            title: 'Effortless Inventory Updates During Order Processing',
            subtitle: 'Seamless Stock Management with Purchase Order Integration',
            description:
              'Atomwalk enhances inventory management by automatically increasing item quantities during the Order In process. Users simply input details like the invoice number, quantity received, and the desired bin location for storage. Once submitted, inventory quantities are updated in real time, ensuring accurate stock records and streamlined purchase order handling for manufacturing operations.',
            benefits: ['Update inventory during the Order In process.', 'Input invoice number, received quantity, and storage location.','Ensures accurate and efficient inventory tracking.','Issue sales or work orders based on updated inventory levels.'],
            imageSrc: img4,  // Replace with your relevant image variable
            imageAlt: 'Increament of Inventory',
            imgPosition: 'left',
          },
          {
            title: 'Ensure Accuracy with Physical Inventory Inspection',
            subtitle: 'Adjust Stock Levels for Real-Time Inventory Management.',
            description:
              'Atomwalk offers a Physical Inspection feature to help users maintain accurate inventory records. If stock discrepancies arise, users can adjust inventory quantities to reflect actual levels, ensuring reliable data for operational efficiency in manufacturing processes.'
              ,benefits: ['Verify and adjust inventory quantities.', 'Align system records with actual stock levels.', 'Maintains inventory accuracy for smooth operations.'],
            imageSrc: img5,  // Replace with your relevant image variable
            imageAlt: 'Physical Inspection',
            imgPosition: 'right',
          }, 
          {
            title: 'Automated Inventory Adjustments for Sales and Work Orders',
            subtitle: 'Track Consumption and Plan Future Orders with Ease',
            description:
              'Atomwalk ensures automatic inventory adjustments when items are consumed in a work order or sold to a customer. With real-time stock reduction upon order issuance, users can seamlessly track inventory levels. This feature enables proactive decision-making, allowing users to issue new sales orders or create work orders for production as inventory levels change.',
            benefits: ['Inventory reduces automatically upon order issuance.', 'Monitor stock changes during sales or work orders.'],
            imageSrc: img6,  // Replace with your relevant image variable
            imageAlt: 'Decreament of Inventory',
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
        ];
     
      const location = useLocation(); // Get the current URL
  useEffect(() => {
    // Get the query string (e.g., "?5")
    const queryString = location.search;

    // Extract the step manually if no key exists
    const stepMatch = queryString.match(/\?(\d+)/);
    const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;

    console.log(step, "Step value parsed from URL");

    // Calculate scroll offset
    const scrollOffset = !isNaN(step) ? 700 + (step - 1) * 630 : 0;

    // Scroll the page
    if (scrollOffset > 0) {
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [location.search]); // Re-run when URL query changes
    return <Container>{features.map(getFeatureContent)}</Container>
}

export default InventoryFeatures