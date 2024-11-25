import React, { useEffect } from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../../assets/img/Claim_Image_demo.png';
import ClaimImgDemo2 from '../../assets/img/Claim_Image_Demo2.png';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/CrmMocups2.svg';
import img2 from '../../assets/img/CrmMocups.svg';
import img3 from '../../assets/img/emp_advance.svg';
import img4 from '../../assets/img/approve_claim.svg'
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e8fcec; 
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
    width: 130%;
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


const LmsFeatures = ({data}) => {
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
    : [
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
