import React, { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/ProcessInventorySetup.svg';
import img2 from '../../assets/img/Inventory_item.svg';
import img4 from '../../assets/img/OrderIn.svg';
import img5 from '../../assets/img/PhysicalInspection.svg';
import img6 from '../../assets/img/DecreaseItem.svg';
import img7 from '../../assets/img/StockItemReport.svg';
import img8 from '../../assets/img/ValuationReport.svg';
import img9 from '../../assets/img/ExpiryReport.svg';
import img10 from '../../assets/img/StockSafety.svg';
import img11 from '../../assets/img/aging.svg';
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D0FEF9; 
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
  
    const features = isClaim ==='inventoryop'
      ?[
        {
          "title": "Comprehensive Inventory Management with Atomwalk",
          "subtitle": "Structured Setup and Categorization for Smarter Control",
          "description":
            "Atomwalk enables precise inventory management, ensuring every item is categorized to align with your business’s operational needs. Begin with the Inventory Item Category Setup to establish structured categorization. Organize inventory location-wise and efficiently handle multiple inventories. With Atomwalk, you can create and manage inventory items by filling in detailed information and linking them category-wise. Atomwalk ensures you’re ready for seamless operations and compliance.",
          "benefits": [
            "Establish structured categories for inventory items.",
            "Organize inventory by specific locations.",
            "Multiple Inventory Management.",
            "Create and organize inventory items with complete details.",
            "Associate items with categories for better tracking."
          ],
          "imageSrc": img1,  // Replace with your relevant image variable
          "imageAlt": "Inventory Setup",
          "imgPosition": "right"
        },
        {
          "title": "Flexible Inventory Item Management with Atomwalk",
          "subtitle": "Track, Update, and Manage Inventory Items Effortlessly",
          "description":
            "Atomwalk streamlines maintenance of inventory items by allowing users to add items across various categories, inventory types, batch expiry details, and BIN locations. Users can also associate preferred supplier details with items if required. For enhanced customization, Atomwalk provides an Additional Fields feature, enabling users to dynamically add and manage extra fields based on specific business needs, ensuring a tailored inventory management experience for manufacturing operations. Atomwalk empowers users to dynamically manage inventory stock through the Batch Details section. Track essential details such as batch numbers, expiry dates, bin locations, initial and current quantities, and stock history. Users can view stock opening balances and update item stock details directly via the Action button, ensuring accurate and real-time stock management tailored to manufacturing needs.",
          "benefits": [
            "Add items by category, type, and stock item group.",
            "Include preferred supplier-specific information along with supplier reference and pricing.",
            "Add custom fields through the Additional Fields feature.",
            "Supports batch/expiry date tracking.",
            "Maintain open stock balance.",
            "Min Inventory item quantity tracking.",
            "Default BIN location setup.",
            "Designed for comprehensive inventory tracking and organization."
          ],
          "imageSrc": img2,  // Replace with your relevant image variable
          "imageAlt": "Inventory Item",
          "imgPosition": "left"
        },
        {
          "title": "Effortless Inventory Updates During Purchase Order Processing",
          "subtitle": "Seamless Stock Management with Receiving BIN Location",
          "description":
            "Atomwalk enhances inventory management by automatically increasing item quantities during the Purchase Order goods received process. Users simply input details like the invoice number, quantity received, and the desired bin location for storage. Once submitted, inventory quantities are updated in real-time, ensuring accurate stock records and streamlined purchase order handling with location control.",
          "benefits": [
            "Update inventory during the Purchase Order - Goods received process (along with GRN).",
            "Allocate BIN storage location.",
            "Ensures accurate and efficient inventory tracking.",
            "Asset (Inventory Item) tracking.",
            "Auto Accounting entries to reflect stock inflow.",
            "Batch/Inventory item serial no tracking."
          ],
          "imageSrc": img4,  // Replace with your relevant image variable
          "imageAlt": "Increment of Inventory",
          "imgPosition": "right"
        },
        {
          "title": "Ensure Accuracy with Physical Inventory Inspection",
          "subtitle": "Adjust Stock Levels for Real-Time Inventory Management.",
          "description":
            "Atomwalk offers a Physical Inspection feature to help users maintain accurate inventory records. If stock discrepancies arise, users can adjust inventory quantities to reflect actual levels, ensuring reliable data for operational efficiency in manufacturing processes.",
          "benefits": [
            "Verify and adjust inventory quantities.",
            "Align system records with actual stock levels.",
            "Maintains inventory accuracy for smooth operations."
          ],
          "imageSrc": img5,  // Replace with your relevant image variable
          "imageAlt": "Physical Inspection",
          "imgPosition": "left"
        },
        {
          "title": "Automated Inventory Adjustments for Sales and Work Orders",
          "subtitle": "Track Consumption and Plan Future Orders with Ease",
          "description":
            "Atomwalk ensures automatic inventory adjustments when items are consumed in a work order or sold to a customer. With real-time stock reduction upon order issuance, users can seamlessly track inventory levels. This feature enables proactive decision-making, allowing users to issue new sales orders or create work orders for production as inventory levels change.",
          "benefits": [
            "Inventory consumption tracking through sales or project work orders.",
            "Auto Inventory allocation based on FIFO method.",
            "Clear history of consumption across sales and projects."
          ],
          "imageSrc": img6,  // Replace with your relevant image variable
          "imageAlt": "Decrement of Inventory",
          "imgPosition": "right"
        }
      ]
      :isClaim ==='inventoryreport'?[
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
        },
        {
          title: 'Enhanced Safety Stock Report Dashboard',
          subtitle: 'Gain Real-Time Insights into Inventory Levels and Stock Safety Performance',
          description:
            `The Safety Stock Report Dashboard in Atomwalk is specifically designed to help businesses maintain optimal stock levels, prevent stockouts, and ensure that inventory is always available when needed. This feature provides users with visual stock insights through interactive charts, detailed tracking of stock status, and powerful reporting capabilities. By keeping a close watch on inventory safety levels, businesses can reduce the risk of production halts, avoid urgent last-minute purchases, and improve overall supply chain efficiency. `,
          benefits: ['Gain stock insights with Pie Chart and Category-wise Minimum Stock Distribution.', 'Monitor items nearing minimum levels with lead time for timely restocking.', 'Access detailed batch information for each stock item with a view button.', 'Filter data by item, category, stock status, and sort reports in ascending/descending order.', 'Re-generate reports manually and download in XLS or PDF format.'],
          imageSrc: img10,  // Replace with relevant image variable for campaign execution
          imageAlt: 'Expiry Report',
          imgPosition: 'left',
        },
        {
          title: 'Comprehensive Stock Aging Insights',
          subtitle: 'Track Stock Movement and Optimize Inventory Flow',
          description:
            `The Stock Aging Report Dashboard in Atomwalk helps businesses monitor stock movement patterns and identify slow-moving, non-moving, or fast-moving inventory. It provides visual aging trends and item-wise aging breakdowns, enabling users to prevent excess stock build-up, reduce wastage, and improve stock turnover. With aging data segmented by time periods, users can spot items nearing expiration or sitting too long in stock, helping them adjust procurement, prioritize sales, and clear stagnant inventory. Filtering, sorting, and report generation features ensure quick access to data for faster, data-driven decisions.`,
          benefits: ['Instantly assess stock movement with aging charts segmented by value and category.', 'Track stock quantities across multiple age brackets for each item.', 'Easily detect items nearing expiration or sitting idle to prevent wastage.', 'Filter by expiry status, item details, or category, and sort reports for quick analysis.'],
          imageSrc: img11,  // Replace with relevant image variable for campaign execution
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
            imageSrc: img1,  // Replace with relevant image variable for campaign execution
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
        
          // Define base scroll offset values for each claim type
          const scrollOffsetMap = {
            inventoryop: 820,
            inventoryreport: 800,
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

export default InventoryFeatures