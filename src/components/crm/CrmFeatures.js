import React, { useEffect } from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../../assets/img/Claim_Image_demo.png';
import ClaimImgDemo2 from '../../assets/img/Claim_Image_Demo2.png';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/CrmMocups2.svg';
import Crmrep from '../../assets/img/reprtcrm.svg';
import img2 from '../../assets/img/CrmMocups.svg';
import img3 from '../../assets/img/marklost.svg';
import img4 from '../../assets/img/campain1.svg'
import img5 from '../../assets/img/campign2.svg'
import img6 from '../../assets/img/campgin3.svg'
import img7 from '../../assets/img/Customerdata1.svg'
import img8 from '../../assets/img/odermanagement.svg'
import img10 from '../../assets/img/Amc1.svg'
import img11 from '../../assets/img/Reportanddashboard.svg'
import img12 from '../../assets/img/Chanelpatner.svg'
import img13 from '../../assets/img/pattner.svg'
import img14 from '../../assets/img/multyreport.svg'
import Tds from '../../assets/img/Tds.svg'
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
    width: 400px;
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


const CrmFeatures = ({data}) => {
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
  
    const features = isClaim =='leadManagement'
      ?[
        {
          title: 'Streamlined Lead Engagement',
          subtitle: 'Effortless Management for Higher Conversions',
          description:
            'This fully integrated dashboard in the Atomwalk CRM application provides users with an intuitive workspace to access and manage lead details effortlessly. Users can quickly add new leads, view a comprehensive lead list, and upload data in bulk to keep information up-to-date. Additionally, tasks can be assigned to specific leads for timely follow-ups, while a detailed Lead Performance Dashboard offers insight into engagement metrics and conversion progress. The "Add Product Interest" feature lets users associate specific product interests with each lead, enhancing personalization and targeted engagement. With these functionalities in one place, the Atomwalk CRM helps optimize lead nurturing and boosts overall conversion rates.',
          benefits: ['Centralized Lead Insights', 'Seamless Team Collaboration', 'Optimized Engagement Strategies'],
          imageSrc: img1,  // Replace with your relevant image variable
          imageAlt: 'Lead Engagement Overview',
          imgPosition: 'right',
        },
        {
          title: 'Enhanced Lead Detailing and Task Management',
          subtitle: 'Boost Productivity with Organized Workflow',
          description: 
          'Atomwalk CRM enables users to update lead profiles with detailed information, including lead source, contact data, and preferences, ensuring a personalized approach to engagement. Tasks can be assigned to leads for follow-ups, meetings, or next steps, with reminders to maintain timely actions. Users can also record product interests to tailor interactions to specific requirements and even reassign ownership of leads to ensure proper management. These features provide a structured workflow, fostering collaboration and enhancing lead conversion outcomes.',
          benefits: ['Detailed Lead Profiles', 'Efficient Task Management', 'Seamless Ownership Reassignment'],
          imageSrc: img2,  // Replace with your relevant image variable
          imageAlt: 'Lead Enrichment and Task Management Overview',
          imgPosition: 'left',
        },
        {
          title: 'Lead Tracking and Status Management',
          subtitle: 'Stay Updated with Real-Time Lead Insights',
          description: 
            'Atomwalk CRM offers tools to monitor lead progress and track all interactions seamlessly. Users can update lead status as Active, Inactive, or Prospect to reflect real-time progress. The system also provides a comprehensive view of each lead’s task list, current tasks, contact details, and product interests, ensuring every aspect of the lead is easily accessible for effective follow-ups and decision-making.',
          benefits: ['Real-Time Lead Insights', 'Comprehensive Tracking', 'Streamlined Workflow Management'],
          imageSrc: Crmrep,  // Replace with your relevant image variable
          imageAlt: 'Lead Tracking Overview',
          imgPosition: 'right',
        },
                
        {
          title: 'Streamline Lead Conversions',
          subtitle: 'Quick and Transparent Lead Conversion Process',
          description: 
    'With Atomwalk CRM, users can mark leads as Lost to maintain accurate records for analysis or move successful conversions into the appropriate sales or customer management pipeline. Additionally, purchase orders can be updated directly within the system, streamlining the transition from lead to customer and ensuring a smooth handoff.',
          benefits: ['Accurate Record-Keeping', 'Streamlined Conversions', 'Integrated Purchase Order Management'],
          imageSrc: img3,  // Replace with your relevant image variable
          imageAlt: 'Lead Conversion',
          imgPosition: 'left',
        },
        // {
        //     title: 'Centralize Lead Management for Higher Conversions',
        //     subtitle: 'Efficient and Transparent Lead Conversion Process',
        //     description:
        //       'Sales managers can seamlessly track lead history, assign tasks, and update lead statuses in real-time. With our centralized lead management system, you can prioritize leads, ensure timely follow-ups, and never miss an opportunity to convert, all while maintaining full transparency throughout the process.',
        //     benefits: ['Real-Time Task Assignment', 'Lead Prioritization', 'Conversion Tracking'],
        //     imageSrc: img1,  // Replace with your relevant image variable
        //     imageAlt: 'Lead Conversion Process',
        //     imgPosition: 'left',
        //   },
        //   {
        //     title: 'Get Complete Context on Every Lead',
        //     subtitle: 'Personalized and Informed Lead Follow-ups',
        //     description:
        //       'To maximize the potential of lost leads, implement follow-up automation to re-engage them after a set period, such as three months, with “win-back” campaigns that offer special promotions or address any unmet needs. Keep detailed records of why leads were marked as lost (e.g., budget constraints, timing, lack of interest) to enable tailored future follow-up strategies. Design re-engagement workflows in the CRM to tag lost leads, retarget them, and monitor for any shifts in their engagement levels. Analyzing lost lead data periodically can reveal common reasons for drop-off, providing insights to refine marketing and sales approaches. Maintain lost leads as a distinct segment in the CRM, allowing for strategic re-engagement with new products or services, ensuring they stay accessible for potential future opportunities.'
        //       ,benefits: ['Comprehensive Lead History', 'Cross-Departmental Integration', 'Informed Outreach'],
        //     imageSrc: img1,  // Replace with your relevant image variable
        //     imageAlt: 'Lead Context',
        //     imgPosition: 'right',
        //   },
          
      ]:isClaim =='campaignManagement'?[
        {
          title: 'Create and Launch Campaigns Effortlessly',
          subtitle: 'Effortless Campaign Management - Advertise Smarter with a Few Simple Clicks',
          description:
            'The “Create Campaign” module in Atomwalk’s CRM simplifies the process of advertising to your client base. Define your campaign name, target customer groups, set schedules, and customize message content—all from one streamlined interface. Whether you’re launching a one-time campaign or scheduling recurring ones, this tool makes it intuitive and efficient.',
          benefits: ['Targeted outreach',
                      "Scheduling Flexibility ",                                                                                                       
                      "User-Friendly Interface",     ],
          imageSrc: img4,  // Replace with relevant image variable for campaign management
          imageAlt: 'Campaign Management Dashboard',
          imgPosition: 'left',
        },
        {
          title: 'Design Campaigns That Reflect Your Brand',
          subtitle: 'Empower Your Communication with Flexible Templates',
          description:
            'Atomwalk allows you to create fully customizable campaign templates or use pre-designed system templates for faster setup. With options to add headers, footers, and visuals, these templates help you maintain branding consistency while driving leads effectively. You can also choose a background color or image to align with your business theme, ensuring your communication stands out.',
          benefits: ["Tailored templates",
                     "Pre-built options",
                     "Dynamic content"],
          imageSrc: img5,  // Replace with relevant image variable for campaign execution
          imageAlt: 'Campaign Performance Tracking',
          imgPosition: 'right',
        },
        {
          title: 'Engage Customers, Track Responses',
          subtitle: 'Interactive Buttons for Real-Time Client Feedback',
          description:
            'The “Response View” feature enhances customer engagement by adding interactive response buttons and voting options directly to your campaigns. Whether it’s a “Yes” or “No” decision, or a custom voting setup, this feature provides actionable insights from your clients. Easily analyze responses and make data-driven decisions to optimize future campaigns.',
          benefits: ['Send Emails', 'Real-Time Tracking', 'Detailed Analytics'],
          imageSrc: img6,  // Replace with relevant image variable for campaign execution
          imageAlt: 'Campaign Performance Tracking',
          imgPosition: 'left',
        }               
         
        ]:isClaim =='CustomerManagement'?[
          {
            title: 'Comprehensive Customer Management',
            subtitle: 'Easily Access, Track, and Update Customer Information',
            description:
              'Atomwalk CRM enables users to view and manage a complete customer list, import or upload customer data in bulk, and update customer profiles effortlessly. This ensures accurate and up-to-date records for better customer interaction and service.',
            benefits:['Customer List View', 'Add and Update Customer Details', 'Track Product Interests and Payments'],
            imageSrc: img7,  // Replace with relevant image variable for campaign management
            imageAlt: 'CustomerManagement',
            imgPosition: 'right',
          },
          // {
          //   title: 'Efficiently Manage Your Orders',
          //   subtitle: 'Simplified Order Tracking and Fulfillment',
          //   description:
          //     'Atomwalk’s Order Management module streamlines the entire order lifecycle, from creation to fulfillment. Keep track of customer orders, monitor their status in real-time, and manage related invoices and delivery schedules. With a centralized platform, you can improve order accuracy, reduce errors, and ensure timely processing for a better customer experience.',
          //   benefits: [
          //     "Real-time order tracking",
          //     "Centralized order information",
          //     "Improved order accuracy",
          //     "Faster order fulfillment",
          //     "Seamless integration with invoices and delivery schedules"
          //   ],
          //   imageSrc: img8, // Replace with the appropriate image variable for Order Management UI
          //   imageAlt: 'Order Management Dashboard',
          //   imgPosition: 'right',
          // }, 
          {
            title: 'Task and TDS Management',
            subtitle: 'Streamline Customer Operations',
            description: 
              'Manage customer-related tasks effectively by assigning and tracking them within the CRM. Additionally, users can add and upload TDS (Tax Deducted at Source) details, ensuring compliance and seamless financial management for each customer.',
            benefits: ['Organized Task Management', 'Simplified TDS Handling', 'Improved Workflow Efficiency'],
            imageSrc: Tds, // Replace with your relevant image variable
            imageAlt: 'Customer Task and TDS Management Overview',
            imgPosition: 'left',
          },
                   
          // {
          //   title: 'Maximize Sales with Process-wise Order Management',
          //   subtitle: 'Streamline Resale and Cross-Selling Opportunities',
          //   description:
          //     'Leverage Atomwalk’s Process-wise Order Management module to unlock new revenue streams through resale and cross-selling. Easily identify opportunities to upsell or resell products based on customer purchase history and preferences. Automate workflows to recommend the right products, manage multi-step sales processes, and track performance metrics for each sales process.',
          //   benefits: [
          //     "Drive cross-selling opportunities",
          //     "Optimize resale workflows",
          //     "Leverage customer purchase data",
          //     "Track performance of specific sales processes",
          //     "Increase revenue through upselling and reselling"
          //   ],
          //   imageSrc: img7, // Replace with the appropriate image variable for Process-wise Management UI
          //   imageAlt: 'Resale and Cross-Selling Process Dashboard',
          //   imgPosition: 'left',
          // }
          {
            title: 'Invoices, Payments, and Product Interests',
            subtitle: 'Streamlined Financial and Sales Data',
            description: 
              'Users can manage invoices and payment details with ease, including adding and viewing sales invoices. The system also allows the addition of product interests to customer profiles, supporting targeted sales strategies and personalized engagement.',
            benefits: ['Efficient Invoice Management', 'Clear Payment Tracking', 'Enhanced Product Interest Tracking'],
            imageSrc: img8, // Replace with your relevant image variable
            imageAlt: 'Invoice and Product Interest Management Overview',
            imgPosition: 'right',
          }
          
          ,
          {
            title: 'Track and Manage Warranties with Ease',
            subtitle: 'Streamline Your AMC and Warranty Operations',
            description:
              'Atomwalk enables you to efficiently add and manage warranty details for your products. With options to set warranty periods, reminders, and customer details, you can ensure timely follow-ups and improve service management. The user-friendly interface allows you to view and edit warranty records, ensuring no missed renewals or support cases.',
            benefits: [
              "Simplified warranty management",
              "Automatic AMC reminders",
              "Comprehensive customer records"
            ],
            imageSrc: img10, // Replace with the appropriate image variable for warranty tracking
            imageAlt: 'Warranty Management Dashboard',
            imgPosition: 'left',
          },
          {
            title: 'Gain Actionable Insights with Reports and Dashboards',
            subtitle: 'Visualize Your Business Performance at a Glance',
            description:
              'Atomwalk provides a comprehensive suite of reports and dashboards that help you monitor key business metrics in real-time. From Customer Group-wise Distribution to tracking Top 5 Customer Sales and Quotations, you can analyze performance trends and make informed decisions. The Receivable Dashboard ensures you stay on top of outstanding payments, enhancing cash flow management.',
            benefits: [
              "Real-time insights",
              "Customizable reports",
              "Improved decision-making",
              "Clear receivables tracking"
            ],
            imageSrc: img11, // Replace with the appropriate image variable for Reports and Dashboards UI
            imageAlt: 'Reports and Dashboard View',
            imgPosition: 'right',
          }
          ]:isClaim =="Channelpartner"?[{
            title: 'Effortlessly Manage Your Channel Partners',
            subtitle: 'Streamline Partner Onboarding and Management',
            description:
              'With Atomwalk, managing channel partners becomes seamless and efficient. This module allows you to record and organize comprehensive details such as company information, contact details, GSTN, PAN, TAN, and more. Easily classify partners into groups, identify their roles (e.g., supplier or partner), and maintain a central database for quick access and streamlined communication.',
            benefits: [
              "Comprehensive partner records",
              "Seamless onboarding process",
              "Simplified partner classification",
              "Efficient partner management"
            ],
            imageSrc: img12, // Replace with the appropriate image variable for Channel Partner UI
            imageAlt: 'Channel Partner Management Dashboard',
            imgPosition: 'right',
          },
          {
            title: 'Track Orders and Sales with Precision',
            subtitle: 'Comprehensive Order Management for Better Insights',
            description:
              'Atomwalk’s Order Information Tracking module enables you to efficiently manage and monitor all aspects of your orders. From maintaining task lists and tracking product interests to managing TDS (Tax Deducted at Source) and generating sales invoices, this module streamlines your sales operations. Gain complete visibility into your order lifecycle and ensure timely updates for smooth business operations.',
            benefits: [
              "End-to-end order tracking",
              "Simplified TDS management",
              "Integrated sales invoice generation",
              "Task list for better organization",
              "Track product interests and customer preferences"
            ],
            imageSrc: img13, // Replace with the appropriate image variable for Order Tracking UI
            imageAlt: 'Order Tracking Dashboard',
            imgPosition: 'left',
          },
          {
            title: 'Generate Detailed Reports with Ease',
            subtitle: 'Comprehensive Multi-Report Generation for Channel Partners',
            description:
              'Atomwalk’s Multi-Report Generation feature within Channel Partner Management allows you to generate customized reports across various metrics and data points. Whether you need performance insights, transaction history, sales contributions, or partner-specific analysis, this module empowers you with actionable data. Export reports in multiple formats for seamless sharing and better decision-making.',
            benefits: [
              "Generate partner-specific reports",
              "Detailed performance insights",
              "Track sales contributions and trends",
              "Export reports in multiple formats (PDF, Excel, etc.)",
              "Customizable reporting options"
            ],
            imageSrc: img14, // Replace with the appropriate image variable for Multi-Report UI
            imageAlt: 'Multi-Report Dashboard for Channel Partners',
            imgPosition: 'right',
          }          
          ]:[
          {

            title: 'Easily Add and Update AMC Details',
            subtitle: 'Streamline Your Annual Maintenance Contract Management',
            description:
              'Atomwalk simplifies the process of managing AMC details for your customers. Add new AMC records, update existing ones, and set reminders to ensure timely contract renewals. With features like warranty integration and customer-specific tracking, this module ensures you stay ahead in providing exceptional post-sales support.',
            benefits: ["Effortless AMC addition and updates",
    "Integrated warranty and AMC tracking",
    "Set reminders for timely renewals"],
            imageSrc: img10,  // Replace with relevant image variable for campaign execution
            imageAlt: 'Campaign Performance Tracking',
            imgPosition: 'right',
          },
          {

            title: 'Access All AMC Records in One Place',
            subtitle: 'Comprehensive Dashboard for Managing AMC Records',
            description:
              'With Atomwalk, you can access a consolidated list of all AMC records in one dashboard. Filter and search records by customer, product, or renewal status for quick insights. The intuitive interface allows you to stay on top of active contracts, expired warranties, and pending renewals, ensuring no service opportunity is missed.',
            benefits: ["Centralized AMC record management",
    "Quick filtering and search options",
    "Enhanced visibility for active and expired contracts"],
            imageSrc: img10,  // Replace with relevant image variable for campaign execution
            imageAlt: 'Campaign Performance Tracking',
            imgPosition: 'left',
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

export default CrmFeatures