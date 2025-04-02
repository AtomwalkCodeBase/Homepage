import React from 'react';
import styled from 'styled-components';
import Mnufacture from './../assets/img/Manufacturing-Business-Development-Tips-1024x576.jpg';
import Lab from './../assets/img/labmangement.jpg';
import Chemical from './../assets/img/chemical.png';
import Consultancy from './../assets/img/consaltant.jpg';
import Recycle from '../assets/img/Recycle.jpg';
import Services from '../assets/img/servicetrd.jpg';

const PageContainer = styled.div`
  padding: 20px;
  background-color: rgb(255 246 247);
  font-family: Arial, sans-serif;

  @media (min-width: 768px) {
    padding: 50px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
margin-top: 40px;
  font-size: 35px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 45px;
  }
`;

const IndustryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 300px;
    margin-right: 30px;
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const IndustryTitle = styled.h2`
  font-size: 24px;
  color: #34495e;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  line-height: 1.5;
  text-align: justify;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
export const Skills = () => {
    const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const navigatet=()=>{
    window.location.href="https://www.atomwalk.com/login/"
  }
  const productnav=()=>{
    window.location.href="/product.html"
  }
  const wastemanagement=()=>{
    window.location.href="/wastemanagement.html"
  }
  const lmsmaneage=()=>{
    window.location.href="/lms.html"
  }
  return (
    <PageContainer>
      <Title>Empowering Industries with Smart Solutions</Title>
      <Section>
        <IndustryContainer  onClick={productnav} style={{backgroundColor:"#F6EAFF"}}>
          <Image src={Mnufacture} alt="Manufacturing Small Business" />
          <Content>
            <IndustryTitle>Manufacturing and Factory Operation</IndustryTitle>
            <Description>
            In the manufacturing sector, optimizing production lines, managing supply chains, and maintaining equipment are vital. Atomwalk Solutions empowers companies in real-time monitoring and predictive analytics that can improve your productivity and reduce downtime.
            </Description>
          </Content>
        </IndustryContainer>
      </Section>
      <Section >
        <IndustryContainer onClick={productnav} style={{backgroundColor:"#FEE9F3"}}>
          <Image src={Chemical} alt="Chemical Industry" />
          <Content>
            <IndustryTitle>Process Manufacturing Industry</IndustryTitle>
            <Description>
            In Process Manufacturing sectors Atomwalk Solutions can help excellent management of your Production process (Recipe Management), Planning, Project/ Work order management, Operational efficiency, Inventory (Batch expiry tracking)/ Warehouse management, CRM, Accounting and Financial management, Supplier and Purchase Order management.
            </Description>
          </Content>
        </IndustryContainer>
      </Section>
      <Section>
        <IndustryContainer onClick={productnav} style={{backgroundColor:"#DFE7FF"}}>
          <Image src={Consultancy} alt="Consultancy Business" />
          <Content>
            <IndustryTitle>Consultancy & NGOs</IndustryTitle>
            <Description>
            Atomwalk Technologies enhances Consultancy & NGO operations by streamlining project management, client interactions, and financial processes. It automates contract handling, invoicing, and donor management while providing real-time dashboards for transparency. NGOs efficiently manage donor and member data, track payments, and run impactful campaigns. It also records donor contributions, manages member payments, and provides a dashboard for easy monitoring and insights.
            </Description>
          </Content>
        </IndustryContainer>
      </Section>
      <Section>
        <IndustryContainer onClick={productnav} style={{backgroundColor:"#FFEADF"}}>
          <Image src={Services} alt="Services & Trading" />
          <Content>
            <IndustryTitle>Services & Trading</IndustryTitle>
            <Description>
            Atomwalk Technologies streamlines Services & Trading with its cloud-based ERP, automating sales, procurement, inventory, and financial processes. It enables seamless order management, compliance, real-time tracking, and efficient invoicing. With blockchain security, it ensures transparency, reduces operational costs, and enhances decision-making, making business operations smoother and more profitable.
            </Description>
          </Content>
        </IndustryContainer>
      </Section>
      <Section>
        <IndustryContainer onClick={wastemanagement} style={{backgroundColor:"#D9F9FE"}}>
          <Image src={Recycle} alt="Waste Management System" />
          <Content>
            <IndustryTitle>Waste Management System</IndustryTitle>
            <Description>
            Atomwalk Technologies' Waste Management System optimizes waste tracking, disposal, and recycling within its cloud-based ERP. It automates waste collection, categorization, compliance reporting, and sustainability tracking. With real-time monitoring and blockchain security, businesses can minimize environmental impact, reduce costs, and enhance regulatory compliance, ensuring efficient and responsible waste management operations.
              </Description>
          </Content>
        </IndustryContainer>
      </Section>
      <Section>
        <IndustryContainer onClick={lmsmaneage} style={{backgroundColor:"#E1FFF6"}}>
          <Image src={Lab} alt="Lab Management System" />
          <Content>
            <IndustryTitle>Lab Management / Equipment Management</IndustryTitle>
            <Description>
            Atomwalk Lab Management / Equipment Management helps the Labs in innovation by enabling them smoothly managing all Lab process like - Grant management, Inventory Management, Lab equipment management, Supplier and Purchase order management, Lab report/ documentation and Lab equipment management.
              </Description>
          </Content>
        </IndustryContainer>
      </Section>

    </PageContainer>
  )
}
