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
          
      ]:isClaim =='inventoryreport'?[
        {
          title: 'Comprehensive Stock Insights at Your Fingertips',
          subtitle: 'Filter, Analyze, and Track Inventory Movement with Ease',
          description:
            `The Stock Item Report section in Atomwalk empowers users to filter inventory data by date, stock category, or item group. Users can view stock details, including item-wise stock category, item group, available quantity, quantities in and out, and more. The View Details button provides batch-specific insights such as flow type, transaction dates, remarks, unit quantity, current stock levels, unit price, and expiry dates. This feature ensures detailed tracking and better decision-making for manufacturing operations.`,
          benefits: ['Filter by date, category, or item group.',
                      "Access details on available quantity, in/out movements, and categories.",
                      "View batch-wise flow type, dates, and pricing.",
                      "Enables precise inventory control and tracking.",     ],
          imageSrc: img7,  // Replace with relevant image variable for campaign management
          imageAlt: 'Stock Item Report',
          imgPosition: 'right',
        },
        {
          title: 'Track Item Vaaluations with Batch-Level Precision',
          subtitle: 'Dynamic Valuaation Reporting for Smarter Inventory Decisions',
          description:
            `The Valuation Report section in Atomwalk allows users to monitor item valuations batch-wise. By clicking on the View Details button for an item, users can access comprehensive data, including batch number, expiry date, flow type (IN or OUT), transaction dates, quantities, average price, and valuation in INR. Dynamic sorting options enable users to filter reports by date, stock category, or item group, providing actionable insights for effective inventory and financial planning.`,
          benefits: ["Monitor expiry dates, flow type, and valuations.",
                     " View quantities, pricing, and valuation per batch.",
                     "Supports inventory valuation and strategic planning.",
                ],
          imageSrc: img8,  // Replace with relevant image variable for campaign execution
          imageAlt: 'Valuation Report',
          imgPosition: 'left',
        },
        {
          title: 'Stay Ahead with Expiry Tracking',
          subtitle: 'Smart Tools to Monitor and Manage Expiring Inventory',
          description:
            `The Valuation Report section in Atomwalk includes an Inventory Expiry Report, enabling users to track expiring items with precision. Users can filter the expiry item list by categories such as 30 days, 60 days, or 90 days before expiry and sort by Expiring As on Date, Item Group, or Stock Category. Batch-wise expiry dates for each item are easily accessible, helping businesses manage expiring inventory effectively and reduce wastage.`,
          benefits: ['Track items expiring day wise.', 'View expiry details for each batch.', 'Minimize wastage and optimize inventory management.'],
          imageSrc: img9,  // Replace with relevant image variable for campaign execution
          imageAlt: 'Expiry Report',
          imgPosition: 'right',
        }               
         
        ]:[
          {

            title: 'Wire House Management',
            subtitle: 'Wire House Management Subtitle',
            description:
              'Wire House Management Description',
            benefits: ['Wire House Management Benifits 1', 'Wire House Management Benifits 2',],
            imageSrc: img10,  // Replace with relevant image variable for campaign execution
            imageAlt: 'Wire House Management',
            imgPosition: 'right',
          },
           
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