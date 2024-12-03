import React, { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/SalesOrder.svg';
import img2 from '../../assets/img/workorder.svg';
import img3 from '../../assets/img/SalesInvoice.svg';
import img4 from '../../assets/img/DeliveryChallan.svg';
import img5 from '../../assets/img/SalesInventory.svg';
import img6 from '../../assets/img/SalesShipment.svg';
import img7 from '../../assets/img/SalesPayment.svg';
import img8 from '../../assets/img/ProcureSupplier.svg';
import img9 from '../../assets/img/PurchaseOrder.svg';
import img10 from '../../assets/img/OrderIn.svg';
import img11 from '../../assets/img/ProcureInventory.svg';
import img12 from '../../assets/img/ProcureReturn.svg';
import img13 from '../../assets/img/ProcurePayable.svg';
import img14 from '../../assets/img/SalesReport.svg';
import img15 from '../../assets/img/ProcureReport.svg';
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : "#cefad0"};; 
  padding: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 50px;
  }
`;

const ImageSection = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  

  img {
    width: 130%;
    /* max-width: 500px; */
  }

  @media (min-width: 768px) {
    width: 30%;
    margin-left: 70px;
    margin-right: 70px;
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
    /* width: 460px; */
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


const SalesFeatures = ({data,bgcolors}) => {
    const isClaim = data;
    const location = useLocation(); // Get the current URL

    useEffect(() => {
      // Get the query string (e.g., "?5")
      const queryString = location.search;
  
      // Extract the step manually if no key exists
      const stepMatch = queryString.match(/\?(\d+)/);
      const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;
  
      console.log(step, "Step value parsed from URL");
  
      // Calculate scroll offset
      const scrollOffset = !isNaN(step) ? 700 + (step - 1) * 700 : 0;
  
      // Scroll the page
      if (scrollOffset > 0) {
        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    }, [location.search]);

    const getFeatureContent = (feature) => (
      <Features bgcolor={bgcolors}>
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
  
    const features = isClaim === 'saleslifecycle'
    ? [
        {
          title: 'Empowering Your Sales Process',
          subtitle: 'Manage sales orders and quotations with precision and ease.',
          description: 'Atomwalk empowers you to manage your company’s sales orders and quotations with unparalleled flexibility and ease. Create and customize multiple quotations or sales orders, manage customer details, add products, and track orders efficiently. With features like Auto numbering, Product/Category defination, order duplication, tax invoicing, PDF generation, email of sale order and payment reminders, Atomwalk saves time while enhancing your business process.',
          benefits: [
            'Product Category defination for Tax setup',
            'Product/Item Configaration ',
            'Auto Numbering',
            'Order Duplication',
            'PDF generation with custom templates',
            'Email for Sale order/ Payment reminder',
            'One click tax invoicing'
          ],
          imageSrc: img1, // Replace with relevant image variable for quotation management
          imageAlt: 'Quotation Management Dashboard',
          imgPosition: 'left',
        },
        {
          title: 'Seamless Transition from Sales Order to Work Order.',
          subtitle: 'Transform sales orders into actionable work orders with ease by Process Template configuration ',
          description: 'The Work Order Process ensures a smooth flow from sales order confirmation to work order creation using process template configuration for the Products. Once a work order is created, it enables seamless generation of job cards for each activities with item. equipment and resource required. The process is designed to streamline operations and save time, improving business efficiency.',
          benefits: [
            'Create work orders from confirmed sales orders (with PO)',
            'Process Template for each product -  smooth transition from sales to operations.',
            'Track invetory/equipment and resource usage for each activity.',
            'Job Card generation'
          ],
          imageSrc: img2, // Replace with relevant image variable for customer selection
          imageAlt: 'Work Order',
          imgPosition: 'right',
        },
        {
          title: 'Comprehensive Sales Invoicing for Your Business Needs.',
          subtitle: 'Manage invoices with advanced features, detailed insights, and flexible tools.',
          description: 'With Atomwalk, creating and managing sales invoices is straightforward and highly functional. Users can generate invoices with tailored details, apply advanced filters, and analyze key data through interactive dashboards. With features like Auto numbering of tax invoice, product and category defination, invoice duplication, PDF generation with templates, email of invoice and payment reminders, GST tracking, auto reconciliation with Bank statements, Atomwalk saves time while enhancing your business process. Manual payment updates, Auto Accounting , TDS reconciliation and credit note features ensure precise control over every aspect of the invoicing process.',
          benefits: [
            'Auto Numbering & Invoice Duplication.',
            'PDF generation with custom templates.',
            'Email forInvoice / Payment reminder.',
            'Auto Accounting & Bank reconciliation for Payments.',
            'TDS Reconciliations.',
            'Allocation of Inventory (with Item serial no)',
            'GST Tracking',
            'Use advanced filters for better management',
            'Credit Note feature',
            'Track insights with interactive dashboards'
          ],
          imageSrc: img3, // Replace with relevant image variable for order details entry
          imageAlt: 'Sales Invoice',
          imgPosition: 'left',
        },
        {
          title: 'Streamline Deliveries with Accurate Documentation.',
          subtitle: 'Efficiently manage stock, issue delivery challans, and comply with e-way bill regulation support.',
          description: 'Atomwalk facilitates the delivery process by allowing users to generate and manage Delivery Challans seamlessly, ensuring accurate documentation and regulatory compliance. From stock verification to e-way bill generation, the system simplifies delivery logistics and enhances operational efficiency.',
          benefits: [
            'Issue Delivery Challans after stock availability confirmation.',
            'Generate multiple copies for internal use, customers, and couriers.',
            'Search and filter challans dynamically for quick access. ',
            'Automatically generate e-way bills for regulatory compliance.',
            'Duplicate challans easily with the copy feature.',
            'Search and filter challans dynamically for quick access.',
            'Automatically generate e-way bills for regulatory compliance.',
          ],
          imageSrc: img4, // Replace with relevant image variable for product selection
          imageAlt: 'Delivery Chalan',
          imgPosition: 'right',
        },
        // {
        //   title: 'Organize and Track Your Inventory with Precision.',
        //   subtitle: 'Streamlined warehouse setup and item allocation for efficient inventory control.',
        //   description: 'Atomwalk simplifies inventory management by providing tools to set up and organize warehouses with customizable structures like zones, aisles, sections, shelves, and bins. Users can allocate items to specific locations for seamless tracking. The system automatically adjusts inventory levels after invoicing and delivery, reducing manual errors and enhancing efficiency.',
        //   benefits: [
        //     'Create and manage warehouses with customizable structures.',
        //     'Allocate items to specific zones, shelves, or bins.',
        //     'View storage details zone-wise for easy tracking.',
        //     'Automatically update inventory after invoicing and delivery.',
        //     'Minimize human error and improve inventory accuracy.'
        //   ],
        //   imageSrc: img5, // Replace with relevant image variable for copy sales orders
        //   imageAlt: 'Allocate Inventory',
        //   imgPosition: 'left',
        // },
        {
          title: 'Track Every Shipment with Precision and Ease',
          subtitle: 'Manage product-wise shipments with detailed tracking and flexible options.',
          description: 'The Shipment Details Process in Atomwalk provides users with comprehensive tools to manage and track shipments effectively. Users can choose shipment statuses like fully shipped, pending, or partly shipped and update product-specific shipment details. With fields for courier information, transport modes, and delivery locations, this feature ensures clarity and accuracy in shipment management. Sytem fields are compatible with eway bill regulation requirements.',
          benefits: [
            'Update shipment status and transport details.',
            'Record courier, vehicle, and package data.',
            'Eway bill support.'
          ],
          imageSrc: img6, // Replace with relevant image variable for copy sales orders
          imageAlt: 'Shipment Details',
          imgPosition: 'right',
        },
        {
          title: 'Complete Your Sales Cycle with Hassle-Free Payment Tracking.',
          subtitle: 'Ensure seamless payment settlement with detailed tracking and automated scheduling and reconciliation.',
          description: 'With Atomwalk, payment tracking/management becomes an integral part of the sales process. Auto reconciliation of payments from Bank statemnts is supported to improve your business opertion efficiency. Users can input payment details, verify TDS, and track transactions with ease. The Generate Schedule Payment feature automates bill creation within specified offset periods, ensuring streamlined payment management from shipment to settlement.',
          benefits: [
            'Payment auto reconciliation from Bank statements',
            'TDS payment reconciliation with form 26AS upload',
            'Payment reminder by mail/ whatsapp.'
          ],
          imageSrc: img7, // Replace with relevant image variable for sales order finalization
          imageAlt: 'Payment Management',
          imgPosition: 'left',
        },
      ]
      
    : isClaim === 'procurement'
    ? [
        {
          title: 'Seamlessly Manage Your Supplier Database.',
          subtitle: 'Manage preferred suppliers against each Inventory Item..',
          description: 'Atomwalk simplifies supplier management by allowing users to add suppliers details into the supplier database. User can manage preferred suppliers with lead time and purchase cost, supplier ref num etc. This process ensures seamless management of supplier information for improved procurement operations.',
          benefits: ['Supplier Data management.', ' Manage Defualt/ preferred suppliers for Item'],
          imageSrc: img8, // Replace with your relevant image variable
          imageAlt: 'Supplier Identification',
          imgPosition: 'right',
        },
        {
          title: 'Streamline Your Procurement with Efficient Purchase Order Management.',
          subtitle: 'Create detailed purchase orders and manage procurement operations seamlessly.',
          description: 'With Atomwalk, creating purchase is straightforward and efficient. Users can select suppliers from the list and input all necessary details for purchase order. The system ensures precise order management by allowing item selection, shipment details and branch-specific tracking.',
          benefits: ['Auto numbering facility for PO.', 'Shipment details capture.', 'Auto population of default supplier details.','Purchase Order PDF templates with email PO as attachment seamlessly.','Sales Invoice storage.'],
          imageSrc: img9, // Replace with your relevant image variable
          imageAlt: 'Purchase Order Creation',
          imgPosition: 'left',
        },
        {
          title: 'Accurately Record and Track Incoming Inventory (GRN).',
          subtitle: 'Streamline goods receipt and inventory updates with precision',
          description: 'Atomwalk simplifies the goods receipt process by allowing users to auto generate  Goods Receive Notes linked to Purchase Orders (for each part shipments). Users can record key details like received quantity, rejected items, and bin locations, ensuring proper inventory updates and efficient warehouse management.',
          benefits: ['GRN - Auto Goods Receipt Note generation.', 'Manage Item Batch details  (with expiry date/ Item serial no).', 'Track quantities: received, rejected, or shortages.','Bin Location update.','Maintain accurate records for efficient warehouse operations.',' Auto Accounting entries'],
          imageSrc: img10, // Replace with your relevant image variable
          imageAlt: 'Order-In',
          imgPosition: 'right',
        },
        {
          title: 'Precision-Driven Inventory Management',
          subtitle: 'Organize, allocate, and control your inventory for optimal efficiency.',
          description: 'Atomwalk empowers businesses with advanced inventory allocation and warehouse management tools. Easily set up warehouses with customizable structures such as Zone, Aisle, Section, Shelf, and Bin. Allocate items to specific storage locations and streamline the Order-In process by defining storage zones for each product. Gain real-time visibility into inventory levels, reduce errors, and enhance operational efficiency.',
          benefits: ['Assign storage locations for precise tracking.', 'Automatically update inventory after Order-In.', 'View storage details for easy access.','Automatically update inventory with received items.','Maintain accurate records for efficient warehouse operations.'],
          imageSrc: img11, // Replace with your relevant image variable
          imageAlt: 'Inventory MAngement',
          imgPosition: 'right',
        },
        {
          title: 'Handle Returns with Confidence and Accuracy.',
          subtitle: 'Efficiently manage product returns, shortages, and damages with ease.',
          description: 'Atomwalk simplifies return handling by enabling users to address damaged, short, or incorrect products during the GRN process. With provisions to issue Debit notes, the system ensures smooth return management and accurate accounting adjustments.',
          benefits: ['Issue of debit Note.', 'Auto Accounting for Returns.'],
          imageSrc: img12, // Replace with your relevant image variable
          imageAlt: 'Return Handling',
          imgPosition: 'left',
        },
        {
          title: 'Track Payables with Precision.',
          subtitle: 'Manage paybles with auto reconciliation from Payable dashboard.',
          description: 'Atomwalk streamlines the payment management process by synchronizing all transactions in bank statements and automating accounting calculations. The system accounts for debit notes, ensures accurate IGST, CGST, SGST, and TDS computations, and simplifies payment processing with seamless integration.',
          benefits: ['Payment tracking (payable dashboard).', 'Auto reconciliation with Bank statements.', 'Simplify accounting for easy payment processing.'],
          imageSrc: img13, // Replace with your relevant image variable
          imageAlt: 'Payable Process Tracking',
          imgPosition: 'right',
        },
      ]
      : isClaim === 'compliance'
    ? [
        {
          title: 'Streamlining Compliance for Seamless Goods Movement.',
          subtitle: 'Effortless e-Way Bill Management Aligned with GST Guidelines.',
          description: 'Managing compliance for the movement of goods is critical under India’s GST regime, and Atomwalk ensures you’re always aligned with government regulations. With our e-Way Bill management solution, users can easily generate the mandatory electronic document required for transporting goods over ₹50,000. By enabling e-Way Bill settings and filling shipment details like mode of transport and destination, Atomwalk automates the generation process, saving time and reducing errors. This streamlined solution helps businesses focus on operations while staying compliant with GST guidelines, ensuring hassle-free goods movement and avoiding penalties.',
          benefits: ['Automates e-Way Bill for shipments over ₹50,000.', 'Configure once with user name and enablement.', 'Fill transport modes to generate e-Way Bill.','Aligns with government rules for hassle-free shipments.','Simplifies compliance within shipment management.',''],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'E-Way Bill',
          imgPosition: 'right',
        },
        {
          title: 'Accurate TDS Compliance, Smarter Accounting.',
          subtitle: 'Stay aligned with tax regulations while optimizing your financial workflows',
          description: 'With Atomwalk, managing Tax Deducted at Source (TDS) becomes seamless and compliant with government regulations. Through the Service Category Setup, users can configure TDS parameters like applicable tax rates, threshold limits, TDS rates for services, and expense ledger details. Once setup, Atomwalk automates TDS calculations during accounting processes. TDS is applied automatically when transactions exceed ₹30,000, as per government guidelines. Even for multiple product sales to a single customer, the system calculates TDS on the cumulative amount, ensuring precise compliance. Atomwalk simplifies TDS management, helping businesses stay compliant while reducing manual effort.',
          benefits: ['Configure TDS rates, thresholds, and expense ledgers effortlessly.', 'Automatic TDS calculation for transactions above ₹30,000.', 'Cumulative TDS calculations for multiple product sales.','Ensures compliance with updated government regulations.','Streamlines accounting processes with accurate tax deductions.'],
          imageSrc: img2, // Replace with your relevant image variable
          imageAlt: 'TDS',
          imgPosition: 'left',
        },
        {
          title: 'Seamless GST Management for Your Organization',
          subtitle: 'Configure, Update, and Automate GST Processes Effortlessly',
          description: 'GST compliance can be complex, but Atomwalk makes it straightforward with an intuitive tax setup and management module. Users can configure GST rates, define minimum taxable amounts, and set effective dates to ensure accurate calculations. Flexible options allow for customization, including tax codes, types, and slab-based deductions. Additionally, Atomwalk empowers businesses to stay updated with evolving government regulations by providing easy tools for updating tax setups. With automated CGST and SGST calculations, Atomwalk simplifies tax management, ensuring compliance and operational efficiency without dependency on external resources.',
          benefits: ['Dynamic GST Configuration(Tax Setup Flexibility)', 'Set tax codes, types, and slab-based deductions.', 'Easily update setups for new GST regulations.','Auto-calculates CGST and SGST as per configuration','Update tax setups without external dependency.'],
          imageSrc: img1, // Replace with your relevant image variable
          imageAlt: 'GST',
          imgPosition: 'right',
        },
      ]
    : isClaim === 'salesreport'
    ? [
        {
          title: 'Transform Data into Decisions.',
          subtitle: 'Comprehensive Sales Insights at Your Fingertips.',
          description: 'Atomwalk provides detailed sales reports and dashboards, enabling users to audit and manage sales efficiently. With product-wise revenue, monthly trends, and customer-specific insights, users can analyze performance through dynamic graphical charts. Track outstanding amounts, sales trends, and exceptions to make informed decisions with ease.',
          benefits: ['View sales revenue by product, amount, and quantity.', 'Analyze trends with interactive charts.', 'Track outstanding amounts and customer-wise performance.','Visualize age and days of outstanding sales.','Access comprehensive transaction and exception lists.'],
          imageSrc: img14, // Replace with your relevant image variable
          imageAlt: 'Sales Report',
          imgPosition: 'right',
        },
        {
          title: 'Optimize Procurement with Actionable Insights.',
          subtitle: 'Track, Analyze, and Improve Your Purchasing Performance.',
          description: 'Atomwalk enables businesses to monitor and evaluate procurement processes through detailed purchase reports. With dynamic graphical charts, users can review monthly and quarterly trends, customer-wise data, and outstanding amounts. These insights help streamline procurement tracking and ensure better decision-making.',
          benefits: ['Access graphical charts for purchase trends.', 'Analyze supplier performance and outstanding balances.', 'Visualize age and days of outstanding purchases','Review all transactions and exceptions.'],
          imageSrc: img15, // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
      ] : [
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

export default SalesFeatures;
