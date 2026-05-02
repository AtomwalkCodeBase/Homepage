import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Mnufacture from "./../assets/img/Manufacturing-Business-Development-Tips-1024x576.jpg";
import Lab from "./../assets/img/labmangement.jpg";
import Chemical from "./../assets/img/chemical.png";
import Consultancy from "./../assets/img/consaltant.jpg";
import Recycle from "../assets/img/Recycle.webp";
import Services from "../assets/img/servicetrd.jpg";
import Fms from "../assets/img/Facility_image.jpg";
import Sms from "../assets/img/Solar_session_1.jpeg";
import Hms from "../assets/img/Healthimage.jpg";

export const Section = styled.section`
  padding: 100px 10%;
  background: linear-gradient(to bottom, #f6f2ea, #ffffff);

  @media (max-width: 992px) {
    padding: 80px 6%;
  }

  @media (max-width: 768px) {
    padding: 60px 5%;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

export const Left = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Title = styled.h2`
  font-size: 52px;
  line-height: 1.2;
  margin-bottom: 25px;
  color: #2c2c2c;

  @media (max-width: 992px) {
    font-size: 42px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const Description = styled.p`
  color: #666;
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 35px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Contact = styled.button`
  padding: 14px 28px;
  background: #e31837;
  border: none;
  /* border-radius: 10px; */
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(255, 70, 70, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CardWrapper = styled.div`
  position: relative;
`;

export const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  color: #ff4d4f;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4d4f;
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  ${(p) => (p.left ? "left:-60px;" : "right:-60px;")}

  @media (max-width: 992px) {
    ${(p) => (p.left ? "left:-30px;" : "right:-30px;")}
  }

  @media (max-width: 768px) {
    top: auto;
    bottom: -25px;
    transform: none;

    ${(p) => (p.left ? "left:30%;" : "right:30%;")}
  }
`;

export const Card = styled(motion.div)`
  border-radius: 28px;
  padding: 50px;
  min-height: 420px;
  color: white;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.4)
    );
    z-index: 1;
  }

  @media (max-width: 992px) {
    min-height: 380px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
    min-height: 340px;
    border-radius: 20px;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
`;

export const Tag = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 18px;
  display: inline-block;
  border-radius: 30px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 14px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
  line-height: 1.3;

  @media (max-width: 992px) {
    font-size: 26px;
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const Bullet = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const Explore = styled.button`
  margin-top: 25px;
  padding: 12px 22px;
  border: none;
  border-radius: 10px;
  background: white;
  color: #ff4d4f;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const products = [
  {
    name: "Lab Management (LIMS)",
    title: "Lab Management / Equipment Management",
    bullets: [
      "Grant and experiment lifecycle management",
      "Lab equipment tracking and maintenance",
      "Inventory and supplier management",
      "Audit-ready reports and GLP compliance"
    ],
    image: Lab,
    gradient: "linear-gradient(135deg,#009688,#4db6ac)",
    path: "/lms.html"
  },
  {
    name: "Customer Relationship Management (CRM)",
    title: "Services & Trading",
    bullets: [
      "Customer and sales lifecycle tracking",
      "Order and invoice management",
      "Real-time business insights",
      "Improved customer engagement"
    ],
    image: Services,
    gradient: "linear-gradient(135deg,#ff5722,#ff8a65)",
    path: "/product.html"
  },
  {
    name: "Human Resource Management (HRM)",
    title: "Consultancy & NGOs",
    bullets: [
      "Employee and member management",
      "Payroll and attendance tracking",
      "Project and resource allocation",
      "Performance and compliance management"
    ],
    image: Consultancy,
    gradient: "linear-gradient(135deg,#3f51b5,#7986cb)",
    path: "/product.html"
  },
  {
    name: "Manufacturing ERP",
    title: "Manufacturing and Factory Operation",
    bullets: [
      "Production planning and scheduling",
      "Supply chain and inventory management",
      "Real-time shop floor monitoring",
      "Predictive maintenance and analytics"
    ],
    image: Mnufacture,
    gradient: "linear-gradient(135deg,#9c27b0,#d81b60)",
    path: "/product.html"
  },
  {
    name: "Process ERP",
    title: "Process Manufacturing Industry",
    bullets: [
      "Recipe and batch management",
      "Work order and production tracking",
      "Inventory with batch expiry tracking",
      "Supplier and purchase order management"
    ],
    image: Chemical,
    gradient: "linear-gradient(135deg,#e91e63,#f48fb1)",
    path: "/product.html"
  },
  {
    name: "Waste Management System",
    title: "Waste Management System",
    bullets: [
      "Waste collection and categorization",
      "Compliance and reporting automation",
      "Recycling and sustainability tracking",
      "Real-time monitoring and analytics"
    ],
    image: Recycle,
    gradient: "linear-gradient(135deg,#00bcd4,#4dd0e1)",
    path: "/wastemanagement.html"
  },
  {
    name: "Hospital Management System",
    title: "Hospital Management System",
    bullets: [
      "Patient lifecycle management",
      "Clinical and administrative workflows",
      "Staff and resource coordination",
      "Real-time healthcare insights"
    ],
    image: Hms,
    gradient: "linear-gradient(135deg,#F9CB43,#FBA518)",
    path: "/hospitalmanagement.html"
  },
  {
    name: "Solar Management System",
    title: "Solar Management System",
    bullets: [
      "Real-time solar performance monitoring",
      "Inventory and asset tracking",
      "AI-driven analytics and alerts",
      "Customer and service management"
    ],
    image: Sms,
    gradient: "linear-gradient(135deg,#009688,#4db6ac)",
    path: "/solarmanagement.html"
  },
  {
    name: "Facility Management System",
    title: "Facility Management System",
    bullets: [
      "Task scheduling and tracking",
      "Maintenance and service coordination",
      "Real-time communication tools",
      "Operational efficiency insights"
    ],
    image: Fms,
    gradient: "linear-gradient(135deg,#fbc02d,#ffeb3b)",
    path: "/facilitymanagement.html"
  },
  {
    name: "IntelliAI Management",
    title: "AI-Powered Industrial Intelligence",
    bullets: [
      "Real-time PPE and safety detection",
      "Anomaly and defect monitoring",
      "Video and sensor data analytics",
      "Operational efficiency optimization"
    ],
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/IntelliAI.png",
    gradient: "linear-gradient(135deg,#8B5A2B,#D2A679)",
    path: "/aimanagement.html"
  },
  {
    name: "Good Laboratory Practice (GLP)",
    title: "Good Laboratory Practice",
    bullets: [
      "Study and experiment tracking",
      "Controlled data submission",
      "Equipment and process oversight",
      "Audit-ready compliance system"
    ],
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/glp_entry.png",
    gradient: "linear-gradient(135deg,#ff868e,#f93441)",
    path: "/glp.html"
  }
];

export default function RocketSteps() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const item = products[index];

  const handleExplore = (path) => {
    window.location.href = path;
  };

  return (
    <Section>
      <Wrapper>
        <Left>
          <Title>
            Run Everything on One Platform
          </Title>
          <Description>
            Bring every function together From lab to production to sales all on one platform
          </Description>
          <Contact onClick={() => window.location.href = "/contactUs.html"}>
            Contact Us
          </Contact>
        </Left>

        <CardWrapper>
          <Arrow left onClick={prev}>‹</Arrow>

          <AnimatePresence mode="wait">
            {/* <Overlay> */}
            <Card
              key={index}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
            >
              <Content>
                <Tag>{item.name}</Tag>
                <CardTitle>{item.title}</CardTitle>
                {item.bullets.map((b, i) => (
                  <Bullet key={i}>➜ {b}</Bullet>
                ))}
                <Explore onClick={() => handleExplore(item.path)}>
                  Explore
                </Explore>
              </Content>
            </Card>
            {/* </Overlay> */}
          </AnimatePresence>

          <Arrow onClick={next}>›</Arrow>
        </CardWrapper>
      </Wrapper>
    </Section>
  );
}