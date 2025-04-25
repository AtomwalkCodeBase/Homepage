import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import images (these would be your actual image paths)
import Mnufacture from './../assets/img/Manufacturing-Business-Development-Tips-1024x576.jpg';
import Lab from './../assets/img/labmangement.jpg';
import Chemical from './../assets/img/chemical.png';
import Consultancy from './../assets/img/consaltant.jpg';
import Recycle from '../assets/img/Recycle.jpg';
import Services from '../assets/img/servicetrd.jpg';
import Fms from '../assets/img/Facility_image.jpg';
import Sms from '../assets/img/Solar_session_1.jpeg';
import Hms from '../assets/img/Health image.jpg';

const PageContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #fff6f7 0%, #f8f9fa 100%);
  font-family: 'Poppins', Arial, sans-serif;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 50px;
  }
`;

const Section = styled.div`
  margin-bottom: 60px;
  perspective: 1000px;
`;

const Title = styled(motion.h1)`
  margin-top: 40px;
  font-size: 35px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 60px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #6c5ce7);
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    font-size: 45px;
  }
`;

const IndustryContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: ${props => props.bgColor || '#fff'};
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, ${props => props.accentColor || '#6c5ce7'}, transparent);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    width: 300px;
    margin-right: 30px;
    margin-bottom: 0;
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;

  ${IndustryContainer}:hover & {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  flex: 1;
`;

const IndustryTitle = styled(motion.h2)`
  font-size: 24px;
  color: #34495e;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    width: 60%;
    height: 3px;
    background: ${props => props.accentColor || '#6c5ce7'};
    bottom: -5px;
    left: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  ${IndustryContainer}:hover &:after {
    transform: scaleX(1);
  }

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled(motion.p)`
  font-size: 16px;
  color: #7f8c8d;
  line-height: 1.8;
  text-align: justify;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

// Button component for a call-to-action
const LearnMoreButton = styled(motion.button)`
  padding: 10px 20px;
  background: linear-gradient(45deg, ${props => props.accentColor || '#6c5ce7'}, ${props => props.accentColor2 || '#a29bfe'});
  color: #fff;
  border: none;
  border-radius: 30px;
  margin-top: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);

  ${IndustryContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.4);
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Industry section component with its own hooks for scrolling
const IndustrySection = ({ industry, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Section key={index}>
      <IndustryContainer
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        bgColor={industry.bgColor}
        accentColor={industry.accentColor}
        onClick={() => window.location.href = industry.path}
      >
        <ImageWrapper>
          <Image 
            src={industry.image} 
            alt={industry.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          />
        </ImageWrapper>
        <Content>
          <IndustryTitle 
            variants={itemVariants}
            accentColor={industry.accentColor}
          >
            {industry.title}
          </IndustryTitle>
          <Description variants={itemVariants}>
            {industry.description}
          </Description>
          <LearnMoreButton 
            variants={itemVariants}
            accentColor={industry.accentColor}
            accentColor2={industry.accentColor2}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </LearnMoreButton>
        </Content>
      </IndustryContainer>
    </Section>
  );
};

export const Skills = () => {
  // Array of industry data for cleaner rendering
  const industries = [
    {
      title: "Manufacturing and Factory Operation",
      description: "In the manufacturing sector, optimizing production lines, managing supply chains, and maintaining equipment are vital. Atomwalk Solutions empowers companies in real-time monitoring and predictive analytics that can improve your productivity and reduce downtime.",
      image: Mnufacture,
      path: "/product.html",
      bgColor: "#F6EAFF",
      accentColor: "#9c27b0",
      accentColor2: "#d81b60"
    },
    {
      title: "Process Manufacturing Industry",
      description: "In Process Manufacturing sectors Atomwalk Solutions can help excellent management of your Production process (Recipe Management), Planning, Project/ Work order management, Operational efficiency, Inventory (Batch expiry tracking)/ Warehouse management, CRM, Accounting and Financial management, Supplier and Purchase Order management.",
      image: Chemical,
      path: "/product.html",
      bgColor: "#FEE9F3",
      accentColor: "#e91e63",
      accentColor2: "#f48fb1"
    },
    {
      title: "Consultancy & NGOs",
      description: "Atomwalk Technologies enhances Consultancy & NGO operations by streamlining project management, client interactions, and financial processes. It automates contract handling, invoicing, and donor management while providing real-time dashboards for transparency. NGOs efficiently manage donor and member data, track payments, and run impactful campaigns.",
      image: Consultancy,
      path: "/product.html",
      bgColor: "#DFE7FF",
      accentColor: "#3f51b5",
      accentColor2: "#7986cb"
    },
    {
      title: "Services & Trading",
      description: "Atomwalk Technologies streamlines Services & Trading with its cloud-based ERP, automating sales, procurement, inventory, and financial processes. It enables seamless order management, compliance, real-time tracking, and efficient invoicing. With blockchain security, it ensures transparency, reduces operational costs, and enhances decision-making.",
      image: Services,
      path: "/product.html",
      bgColor: "#FFEADF",
      accentColor: "#ff5722",
      accentColor2: "#ff8a65"
    },
    {
      title: "Lab Management / Equipment Management",
      description: "Atomwalk Lab Management / Equipment Management helps the Labs in innovation by enabling them smoothly managing all Lab process like - Grant management, Inventory Management, Lab equipment management, Supplier and Purchase order management, Lab report/ documentation and Lab equipment management.",
      image: Lab,
      path: "/lms.html",
      bgColor: "#E1FFF6",
      accentColor: "#009688",
      accentColor2: "#4db6ac"
    },
    {
      title: "Waste Management System",
      description: "Atomwalk Technologies' Waste Management System optimizes waste tracking, disposal, and recycling within its cloud-based ERP. It automates waste collection, categorization, compliance reporting, and sustainability tracking. With real-time monitoring and blockchain security, businesses can minimize environmental impact, reduce costs, and enhance regulatory compliance.",
      image: Recycle,
      path: "/wastemanagement.html",
      bgColor: "#D9F9FE",
      accentColor: "#00bcd4",
      accentColor2: "#4dd0e1"
    },
    
    {
      title: "Hospital Management System",
      description: "Atomwalk Healthcare Management System empowers hospital operations by integrating patient care, clinical workflows, and administrative tasks into a single, intuitive platform. From patient registration to discharge, emergency response to staff management, our system ensures seamless coordination, enhanced efficiency, and exceptional healthcare delivery across all hospital functions.",
      image: Hms,
      path: "/hospitalmanagement.html",
      bgColor: "#FFF9BF",
      accentColor: "#F9CB43",
      accentColor2: "#FBA518"
    },
    
    {
      title: "Solar Management System",
      description: "Atomwalk Smart Solar Management System simplifies your solar business with a unified, AIoT-powered platform. It offers real-time monitoring, inventory tracking, and customer management. Get instant insights on voltage, current, and humidity, with early alerts for issues. Smart sensors and AI turn raw data into actionable insights. Stay connected, efficient, and ready for the future with Atomwalk. ",
      image: Sms,
      path: "/solarmanagement.html",
      bgColor: "rgb(217 254 229)",
      accentColor: "#009688",
      accentColor2: "#4db6ac"
    },
    {
      title: "Facility Management System",
      description: "Atomwalk Facility Management System reshapes how residential communities and service providers coordinate and execute operational tasks. With smart scheduling, real-time task tracking, and smooth communication between all involved partners, our platform ensures efficient maintenance operations, improved accountability, and better service delivery.",
      image: Fms,
      path: "/facilitymanagement.html",
      bgColor: "rgb(254 251 217)",
      accentColor: "#fbc02d",
      accentColor2: "#ffeb3b"
    },
  ];

  return (
    <PageContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Empowering Industries with Smart Solutions
      </Title>

      {industries.map((industry, index) => (
        <IndustrySection key={index} industry={industry} index={index} />
      ))}
    </PageContainer>
  );
};