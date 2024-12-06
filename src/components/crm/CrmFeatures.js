import React, { useEffect } from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../../assets/img/Claim_Image_demo.png';
import ClaimImgDemo2 from '../../assets/img/Claim_Image_Demo2.png';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/CrmMocups2.svg';
import img2 from '../../assets/img/CrmMocups.svg';
import img3 from '../../assets/img/emp_advance.svg';
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
          title: 'Manage Leads with Ease',
          subtitle: 'Fast and Efficient Lead Management Process',
          description:
            'Empower your sales team to add and manage leads effortlessly from their mobile devices or desktops. Track the status of leads in real-time, and streamline follow-ups with our intuitive lead management system.',
          benefits: ['Real-Time Lead Tracking', 'Automated Follow-ups', 'Bulk Lead Uploads'],
          imageSrc: img2,  // Replace with your relevant image variable
          imageAlt: 'Lead Management',
          imgPosition: 'left',
        },
        {
          title: 'Streamline Lead Conversions',
          subtitle: 'Quick and Transparent Lead Conversion Process',
          description:
            'Sales managers can track lead progress, assign tasks, and update lead status in real-time. Our streamlined lead conversion process ensures that opportunities are never missed, providing transparency and timely action for maximum conversions.',
          benefits: ['Task Assignment', 'Pipeline Status Updates', 'Conversion Tracking'],
          imageSrc: img1,  // Replace with your relevant image variable
          imageAlt: 'Lead Conversion',
          imgPosition: 'right',
        },
        {
            title: 'Centralize Lead Management for Higher Conversions',
            subtitle: 'Efficient and Transparent Lead Conversion Process',
            description:
              'Sales managers can seamlessly track lead history, assign tasks, and update lead statuses in real-time. With our centralized lead management system, you can prioritize leads, ensure timely follow-ups, and never miss an opportunity to convert, all while maintaining full transparency throughout the process.',
            benefits: ['Real-Time Task Assignment', 'Lead Prioritization', 'Conversion Tracking'],
            imageSrc: img1,  // Replace with your relevant image variable
            imageAlt: 'Lead Conversion Process',
            imgPosition: 'left',
          },
          {
            title: 'Get Complete Context on Every Lead',
            subtitle: 'Personalized and Informed Lead Follow-ups',
            description:
              'To maximize the potential of lost leads, implement follow-up automation to re-engage them after a set period, such as three months, with “win-back” campaigns that offer special promotions or address any unmet needs. Keep detailed records of why leads were marked as lost (e.g., budget constraints, timing, lack of interest) to enable tailored future follow-up strategies. Design re-engagement workflows in the CRM to tag lost leads, retarget them, and monitor for any shifts in their engagement levels. Analyzing lost lead data periodically can reveal common reasons for drop-off, providing insights to refine marketing and sales approaches. Maintain lost leads as a distinct segment in the CRM, allowing for strategic re-engagement with new products or services, ensuring they stay accessible for potential future opportunities.'
              ,benefits: ['Comprehensive Lead History', 'Cross-Departmental Integration', 'Informed Outreach'],
            imageSrc: img1,  // Replace with your relevant image variable
            imageAlt: 'Lead Context',
            imgPosition: 'right',
          },
          
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
              'Atomwalk CRM’s Customer Management module provides users with a centralized platform to manage and organize customer data. With tools for creating new customer profiles, viewing customer lists, and adding or updating details, the interface allows for streamlined customer tracking and engagement. Additionally, users can manage product interests, payment statuses, and set up tasks related to specific customers.',
            benefits:['Customer List View', 'Add and Update Customer Details', 'Track Product Interests and Payments'],
            imageSrc: img7,  // Replace with relevant image variable for campaign management
            imageAlt: 'CustomerManagement',
            imgPosition: 'left',
          },
          {
            title: 'Efficiently Manage Your Orders',
            subtitle: 'Simplified Order Tracking and Fulfillment',
            description:
              'Atomwalk’s Order Management module streamlines the entire order lifecycle, from creation to fulfillment. Keep track of customer orders, monitor their status in real-time, and manage related invoices and delivery schedules. With a centralized platform, you can improve order accuracy, reduce errors, and ensure timely processing for a better customer experience.',
            benefits: [
              "Real-time order tracking",
              "Centralized order information",
              "Improved order accuracy",
              "Faster order fulfillment",
              "Seamless integration with invoices and delivery schedules"
            ],
            imageSrc: img8, // Replace with the appropriate image variable for Order Management UI
            imageAlt: 'Order Management Dashboard',
            imgPosition: 'right',
          },          
          {
            title: 'Maximize Sales with Process-wise Order Management',
            subtitle: 'Streamline Resale and Cross-Selling Opportunities',
            description:
              'Leverage Atomwalk’s Process-wise Order Management module to unlock new revenue streams through resale and cross-selling. Easily identify opportunities to upsell or resell products based on customer purchase history and preferences. Automate workflows to recommend the right products, manage multi-step sales processes, and track performance metrics for each sales process.',
            benefits: [
              "Drive cross-selling opportunities",
              "Optimize resale workflows",
              "Leverage customer purchase data",
              "Track performance of specific sales processes",
              "Increase revenue through upselling and reselling"
            ],
            imageSrc: img7, // Replace with the appropriate image variable for Process-wise Management UI
            imageAlt: 'Resale and Cross-Selling Process Dashboard',
            imgPosition: 'left',
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
            imgPosition: 'right',
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
            imgPosition: 'left',
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

            title: 'Enhanced Campaign Execution and Analysis',
            subtitle: 'Maximize Engagement with Real-Time Tracking and Insights',
            description:
              'From sending targeted emails to monitoring their performance, Atomwalk CRM enables real-time tracking of customer interactions, open rates, and conversion metrics. Use detailed analytics to adjust strategies, close completed campaigns, and optimize future campaigns. This helps maximize reach, engagement, and ultimately, customer satisfaction.',
            benefits: ['Send Emails', 'Real-Time Tracking', 'Detailed Analytics'],
            imageSrc: img3,  // Replace with relevant image variable for campaign execution
            imageAlt: 'Campaign Performance Tracking',
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

export default CrmFeatures