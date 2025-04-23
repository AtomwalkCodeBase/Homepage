import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Compliance from '../../assets/img/Leadmanagement.png';
import Source from '../../assets/img/trash.png';
import Collection from '../../assets/img/garbage-truck.png';
import Process from '../../assets/img/waste-management.png';
import Report from '../../assets/img/sales_report_icon.png';
import solar1 from '../../assets/img/step3_1.png';
import solar2 from '../../assets/img/step3_2.png';
import solar3 from '../../assets/img/step3_4.png';
import solar4 from '../../assets/img/step3_5.png';
import Hospital1 from '../../assets/img/H_Step3(1).png';
import Hospital2 from '../../assets/img/H_Step3(2).png';
import Hospital3 from '../../assets/img/H_Step3(3).png';
import Hospital4 from '../../assets/img/H_Step3(4).png';
import Facility1 from '../../assets/img/Step 3 (1).png';
import Facility2 from '../../assets/img/Step 3 (2).png';
import Facility3 from '../../assets/img/Step 3 (3).png';
import Facility4 from '../../assets/img/Step 3 (4).png';
import UnderConstructionPopup from '../UnderConstructionPopup';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Container for the entire section
const SectionContainer = styled.div`
  padding: 120px 20px;
  background: linear-gradient(135deg, #fff7e6, #f8f1ff, #e6f7ff);
  background-size: 300% 300%;
  animation: ${gradientBackground} 12s ease infinite;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(90deg, #7d3eff, #3ea9ff, #3eff8f);
  }
`;

// Main title styling
const MainTitle = styled.h2`
  font-size: 2.8em;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 1s ease-out;

  span {
    color: #7d3eff;
    text-shadow: 0 2px 4px rgba(125, 62, 255, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #7d3eff, #3ea9ff);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2em;
  }
`;

// Subtitle styling
const Subtitle = styled.p`
  font-size: 1.2em;
  color: #666;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.6;
  animation: ${fadeIn} 1s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 1em;
    padding: 0 20px;
  }
`;

// Icon container
const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.bgColor || "#f0e7ff"};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  img {
    width: 50px;
    height: 50px;
    transition: all 0.3s ease;
  }
`;

// Container for the features
const FeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 30px;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

// Individual feature box styling
const FeatureBox = styled.div`
  width: 280px;
  background-color: #fff;
  padding: 30px 25px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out ${props => props.delay || '0.3s'} both;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  &:hover ${IconContainer} {
    animation: ${float} 2s ease-in-out infinite;
    background-color: ${props => props.hoverColor || props.bgColor || "#7d3eff"};
    
    img {
      filter: brightness(0) invert(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => props.accentColor || '#7d3eff'};
  }

  @media (max-width: 768px) {
    width: 85%;
    margin: 0;
  }
`;

// Feature title styling
const FeatureTitle = styled.h3`
  font-size: 1.4em;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: ${props => props.accentColor || '#7d3eff'};
    transition: all 0.3s ease;
  }

  ${FeatureBox}:hover &::after {
    width: 60px;
    background: ${props => props.hoverColor || '#3ea9ff'};
  }
`;

// Feature description styling
const FeatureDescription = styled.p`
  font-size: 1em;
  color: #666;
  line-height: 1.6;
  transition: all 0.3s ease;

  ${FeatureBox}:hover & {
    color: #444;
  }
`;

const KeyFeaturesWaste = (props) => {
  const [openpop, setopenpop] = useState(false);
  const handleNavigation = (data) => {
    window.location.href = `/${data}`;
  };

  const features = [
    {
      icon: Source,
      title: "Waste Source",
      description: "Efficient tracking of waste generated by citizens, industries, hospitals, and laboratories for smarter waste management.",
      accentColor: "#7d3eff",
      iconBg: "#f0e7ff",
      iconHover: "#7d3eff"
    },
    {
      icon: Collection,
      title: "Waste Collection",
      description: "Get insights with reports & dashboards for smart tracking, optimized routes, and compliance.",
      accentColor: "#3ea9ff",
      iconBg: "#e7f5ff",
      iconHover: "#3ea9ff"
    },
    {
      icon: Process,
      title: "Processing Units",
      description: "Streamlined Waste Processing with Digital Tracking, Recycling Management, and Real-Time Operational Insights.",
      accentColor: "#3eff8f",
      iconBg: "#e7fff0",
      iconHover: "#3eff8f"
    },
    {
      icon: Report,
      title: "Regulatory & Compliance",
      description: "Ensuring Regulatory Compliance with Digital Records, Automated Reporting, and Environmental Safety Standards.",
      accentColor: "#ff7d3e",
      iconBg: "#fff0e7",
      iconHover: "#ff7d3e"
    }
  ];
  const fmsfeatures = [
    {
      icon: Facility1,
      title: "Facility Managers",
      description: "Oversee all ongoing operations through a centralized dashboard. Assign tasks, monitor progress, and ensure service delivery without the hassle of manual follow-ups.",
      accentColor: "#7d3eff",
      iconBg: "#f0e7ff",
      iconHover: "#7d3eff"
    },
    {
      icon: Facility2,
      title: "Workers & Technicians",
      description: "Stay updated with mobile alerts, view task details, upload status proofs, and manage assignments effortlessly.",
      accentColor: "#3ea9ff",
      iconBg: "#e7f5ff",
      iconHover: "#3ea9ff"
    },
    {
      icon: Facility3,
      title: "Apartment Communities",
      description: "Experience faster resolution and consistent maintenance services through structured task execution.",
      accentColor: "#3eff8f",
      iconBg: "#e7fff0",
      iconHover: "#3eff8f"
    },
    {
      icon: Facility4,
      title: "Platform Integration Team",
      description: "Integrate task flows and performance logs into existing business systems to drive smarter decisions, reporting, and resource planning.",
      accentColor: "#ff7d3e",
      iconBg: "#fff0e7",
      iconHover: "#ff7d3e"
    }
  ];
  
  const hmsfeatures = [
    {
      icon: Hospital4,
      title: "Hospital Administrators",
      description: "Oversee patient admissions, staff schedules, bed allocations, and financial reports through a centralized dashboard, minimizing manual oversight.",
      accentColor: "#7d3eff",
      iconBg: "#f0e7ff",
      iconHover: "#7d3eff"
    },
    {
      icon: Hospital2,
      title: "Doctors and Nurses",
      description: "Doctors access EHR, order diagnostics, and prescribe medications; nurses update vitals, administer medications, and coordinate care via mobile alerts and dashboards.",
      accentColor: "#3ea9ff",
      iconBg: "#e7f5ff",
      iconHover: "#3ea9ff"
    },
    {
      icon: Hospital1,
      title: "Patients",
      description: "Benefit from faster care, transparent billing, and organized follow-ups for an enhanced healthcare experience.",
      accentColor: "#3eff8f",
      iconBg: "#e7fff0",
      iconHover: "#3eff8f"
    },
    {
      icon: Hospital3,
      title: "Diagnostic and Pharmacy Staff",
      description: "Process lab tests, imaging orders, and medication dispensing with barcode tracking, integrated radiology reports, and e-prescription-based invoicing for precise, efficient care delivery.",
      accentColor: "#ff7d3e",
      iconBg: "#fff0e7",
      iconHover: "#ff7d3e"
    }
  ];
  const Smsfeatures = [
    {
      icon: solar1,
      title: "Facility Managers",
      description: "Monitor energy generation and ensure optimal solar system performance with minimal manual intervention.",
      accentColor: "#7d3eff",
      iconBg: "#f0e7ff",
      iconHover: "#7d3eff"
    },
    {
      icon: solar2,
      title: "Infrastructure Developers",
      description: "Integrate smart solar solutions into buildings, townships, and industrial parks for sustainable energy management.",
      accentColor: "#3ea9ff",
      iconBg: "#e7f5ff",
      iconHover: "#3ea9ff"
    },
    {
      icon: solar4,
      title: "Business Owners",
      description: "Gain visibility into energy ROI, reduce operational costs, and align with green energy goals.",
      accentColor: "#3eff8f",
      iconBg: "#e7fff0",
      iconHover: "#3eff8f"
    },
    {
      icon: solar3,
      title: "Maintenance Teams",
      description: "Receive real-time alerts and insights to streamline inspection, cleaning, and repair schedules.",
      accentColor: "#ff7d3e",
      iconBg: "#fff0e7",
      iconHover: "#ff7d3e"
    },
  ];
  const[data, setdata] = useState(features);
  useEffect(() => {
    if(window.location.pathname == '/facilitymanagement.html') {
      setdata(fmsfeatures);
    }
    else if(window.location.pathname == '/hospitalmanagement.html'){
      setdata(hmsfeatures);
    }
    else if(window.location.pathname == '/solarmanagement.html'){
      setdata(Smsfeatures);
    }

  }, []);

  return (
    <SectionContainer>
      <MainTitle>
        {props.title?props.title:"Waste Management Ecosystem Stakeholders"}
      </MainTitle>
      <Subtitle>
        {props.description?props.description:"Our ERP solution connects all key players in the waste management value chain, enabling a seamless transformation from waste to wealth."}
      </Subtitle>
      <FeaturesContainer>
        {data.map((feature, index) => (
          <FeatureBox 
            key={index}
            delay={`${0.3 + index * 0.1}s`}
            accentColor={feature.accentColor}
            hoverColor={feature.iconHover}
          >
            <IconContainer 
              bgColor={feature.iconBg}
            >
              <img src={feature.icon} alt={feature.title}/>
            </IconContainer>
            <FeatureTitle accentColor={feature.accentColor}>
              {feature.title}
            </FeatureTitle>
            <FeatureDescription>
              {feature.description}
            </FeatureDescription>
          </FeatureBox>
        ))}
      </FeaturesContainer>
    </SectionContainer>
  );
};

export default KeyFeaturesWaste;