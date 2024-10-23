import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import styled from "styled-components";
import projImg1 from "../assets/img/Default_A_bustling_industrial_scene_depicting_modern_manufactu_1.jpg";
import projImg2 from "../assets/img/Management.jpg";
import projImg3 from "../assets/img/Hrandpayroll.jpg";
import projImg4 from "../assets/img/Designer.png";
import projImg5 from "../assets/img/Accountandf.png";
import projImg6 from "../assets/img/projectmangement.png";
import { ProjectCard } from "./ProjectCard";
import Newcard from "./Newcard";
const GradientDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

const Features = () => {
  const projects = [
    {
      title: "Manufacturing Operations",
      description:
        "Efficiently manage your manufacturing operations with Atomwalk Office",
      imgUrl: projImg1,
      background:"#fff8e6"
    },
    {
      title: "Inventory Management",
      description: "Take control of your inventory with Atomwalk Office",
      imgUrl: projImg2,
      background:"#EEFAF4"
    },
    {
      title: "HR & Payroll",
      description:
        "Effortlessly handle HR and payroll tasks with Atomwalk Office",
      imgUrl: projImg3,
       background:"#e6ffff"
    },
    {
      title: "Customer Management",
      description:
        "Deliver exceptional customer service and boost sales with Atomwalk Office",
      imgUrl: projImg4,
      background:"#EEFAF4"
    },
    {
      title: "Accounting & Financials",
      description:
        "Manage your accounting and financials seamlessly with Atomwalk Office",
      imgUrl: projImg5,
      background:"#e6ffff"
    },
    {
      title: "Project Management",
      description:
        "Make informed decisions based on real-time information and analytics provided by Atomwalk Office",
      imgUrl: projImg6,
      background:"#fff8e6"
    },
  ];
  return (
    <section className="project" id="projects">
      <Container>
        <h2>Comprehensive Business Management Solution</h2>
        <p>
          Streamline your business with Atomwalk Office's key features:
          Manufacturing Operations Management for optimized production and
          quality control, Purchasing & Inventory Management for precise supply
          chain oversight, Sales & Customer Service tools to boost sales and
          enhance customer relationships, Warehousing Solutions for efficient
          inventory tracking and automation, Accounting & Financials for
          thorough financial oversight, and a Complete HR Suite Including
          Payroll for seamless workforce management.
        </p>
        <Row>
          <Col size={12}>
            <Row>
              {projects.map((project, index) => {
                return (
                  <Newcard
                    key={index}
                    project={project}
                    image={project.imgUrl}
                  />
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
