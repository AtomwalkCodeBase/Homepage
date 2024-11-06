import React from 'react';
import styled from 'styled-components';
import ClaimImgDemo from '../../assets/img/Claim_Image_demo.png';
import ClaimImgDemo2 from '../../assets/img/Claim_Image_Demo2.png';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/CrmMocups2.svg';
import img2 from '../../assets/img/CrmMocups.svg';
import img3 from '../../assets/img/emp_advance.svg';
import img4 from '../../assets/img/approve_claim.svg'

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
    width: 360px;
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
    const isClaim = data === 'Claim';

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
  
    const features = isClaim
      ? [
        {
          title: 'Effortless Campaign Management',
          subtitle: 'Seamlessly Create, View, and Manage Campaigns',
          description:
            'Atomwalk CRM offers a user-friendly interface to manage customer email campaigns with ease. Users can add new campaigns, view campaign lists, and access powerful search features to quickly find specific campaigns. With organized tools, campaign creation and management become intuitive and efficient, allowing you to focus on engagement and conversions.',
          benefits: ['Campaign List View', 'Campaign Search', 'User-Friendly Interface'],
          imageSrc: img3,  // Replace with relevant image variable for campaign management
          imageAlt: 'Campaign Management Dashboard',
          imgPosition: 'left',
        },
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
         
        ]
      : [
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
          
      ];
      
  
    return <Container>{features.map(getFeatureContent)}</Container>
}

export default CrmFeatures
