// ProductPage.js
import React from 'react';
import styled from 'styled-components';
import contactus from "../assets/img/what-is-ERP.jpg";
import colorSharp from "../assets/img/color-sharp.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import manufacturing from "../assets/img/manufacturing-erp-solutions.png";
import manufacturing2 from "../assets/img/manufacturing-erp-software-implement.webp";
import LetsConnect from './LetsConnect';
import ProductPage from './ProductPage';
import PlanSuccess from './PlanSuccess';
import SeamlessIntegration from './SeamlessIntegration';
import TestimonialCardComponent from './TestimonialCardComponent';
import ProductCard from './ProductCard';

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url(${colorSharp}),url(${colorSharp2});
  background-position: left center, right top;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    background-position: left top, right top;
    padding: 10px;
  }
`;

const Header = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5em;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.8em;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
  width: 100%;
  max-width: 1200px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ImagePlaceholder = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const Text = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 0.95em;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
  }
`;

const List = styled.ul`
  margin: 20px 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const ListItem = styled.li`
  color: #666;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

const Footer = styled.footer`
  margin-top: 40px;
  text-align: center;
  color: #999;

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const BackImage = styled.div`
  position: relative;
  height: 500px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${contactus});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.7; /* Apply opacity to the background image only */
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const Tesdiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3em;
  height: 100%;
  z-index: 2; /* Ensure the text is above the background */
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 2.5em;
  }

  @media (max-width: 480px) {
    font-size: 2em;
  }
`;
const Container = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

const Section = styled.section`
  background: #fff;
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  color: #555;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 1em;
  color: #666;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const FeatureItem = styled.li`
  font-size: 1em;
  color: #444;
  margin: 10px 0;
`;

const ContactSection = styled.div`
  background: #ffebcc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
`;

const Button = styled.button`
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background: #555;
  }
`;

// Main Component
const Product = () => {
  return (
    <>
  <LetsConnect title={"Empower Your Business with Atomwalk Office ERP"}
   description={" Atomwalk Office is a cloud-based ERP solution, designed to transform the way startups, small, and medium-sized businesses operate. Built on cutting-edge technologies like AI and Blockchain, our platform seamlessly manages core business functions including manufacturing, purchasing, inventory, sales, customer service, accounting, and HR."} 
   background={"#52ebff"}
   data={true}></LetsConnect>
   <ProductPage></ProductPage>
   <ProductCard></ProductCard>
   <PlanSuccess></PlanSuccess>
   <SeamlessIntegration></SeamlessIntegration>
   <TestimonialCardComponent></TestimonialCardComponent>
  {/* <Container>
      <Section>
        <Title>Empower Your Business with Atomwalk Office ERP</Title>
        <Content>
          Atomwalk Office is a cloud-based ERP solution, designed to transform the way startups, small, and medium-sized businesses operate. Built on cutting-edge technologies like AI and Blockchain, our platform seamlessly manages core business functions including manufacturing, purchasing, inventory, sales, customer service, accounting, and HR.
        </Content>
      </Section>

      <Section>
        <SubTitle>Why Choose Atomwalk?</SubTitle>
        <Content>
          Atomwalk Office is more than just an ERP; it’s a comprehensive solution that automates and optimizes your entire business operation. Our platform offers:
        </Content>
        <FeaturesList>
          <FeatureItem>Financial Compliance: Automated e-Invoice, GST reconciliation, and real-time financial management.</FeatureItem>
          <FeatureItem>Operational Excellence: Project and work order management, BOM generation, and process optimization.</FeatureItem>
          <FeatureItem>Business Growth: Integrated CRM for lead management, sales performance tracking, and customer communication.</FeatureItem>
          <FeatureItem>HR & Payroll: From recruitment to payroll, manage the full employee lifecycle effortlessly.</FeatureItem>
          <FeatureItem>Multi-location Flexibility: Handle operations across multiple branches or locations with ease.</FeatureItem>
        </FeaturesList>
      </Section>

      <Section>
        <SubTitle>Key Features</SubTitle>
        <Content>
          Features Tailored to Your Business Needs:
        </Content>
        <FeaturesList>
          <FeatureItem>Manufacturing ERP: Streamline production with BOM planning, inventory management, and supplier coordination.</FeatureItem>
          <FeatureItem>Process Manufacturing: Recipe management, batch tracking, and operational efficiency tools.</FeatureItem>
          <FeatureItem>Consultancy & Services: Efficient project management, CRM integration, and financial oversight.</FeatureItem>
          <FeatureItem>Lab Management: Comprehensive tools for managing lab equipment, R&D, and documentation.</FeatureItem>
        </FeaturesList>
      </Section>

      <Section>
        <SubTitle>Contact Us</SubTitle>
        <Content>
          Ready to transform your business? Let’s connect and discuss how Atomwalk Office can drive your business forward.
        </Content>
        <ContactSection>
          <p>Email: info@atomwalk.com</p>
          <p>Phone: +91 72595 55003</p>
          <p>Address: CRM SOWBHAGYA ANNEX, SyNo. 35/1B, Varthur Main Road, Marathahalli, Bengaluru, Karnataka 560037</p>
          <Button>Get Started with Atomwalk Office ERP</Button>
        </ContactSection>
      </Section>
    </Container> */}
      {/* <PageContainer>
        <Header>Manufacturing ERP Solutions</Header>
        <ContentSection>
          <TextContainer>
            <Text>
              Manufacturing ERP is an Enterprise Resource Planning (ERP) software platform solution used to manage and optimize operational efficiency in manufacturing businesses. It consolidates data and workflows into one unified system, providing a comprehensive business management platform.
            </Text>
            <List>
              <ListItem>Minimizing redundancy and automating processes</ListItem>
              <ListItem>Optimizing manufacturing operations for enhanced productivity</ListItem>
              <ListItem>Improving supply chain, warehouse, transportation, and inventory management</ListItem>
              <ListItem>Mitigating risk and increasing confidence around compliance</ListItem>
              <ListItem>Providing better service to customers</ListItem>
              <ListItem>Unifying departments and comparing metrics across the business</ListItem>
            </List>
          </TextContainer>
          <ImagePlaceholder src={manufacturing} />
        </ContentSection>

        <ContentSection>
          <ImagePlaceholder style={{ backgroundColor: "#c5c5c5" }} src={manufacturing2} />
          <TextContainer>
            <Text>
              Atomwalk Office supports Manufacturing ERP with cutting-edge technology and offering cloud services that provide small and medium businesses with the tools they need to stay competitive. Our platform includes Project Management, Inventory Management, Process Template Modules, and more.
            </Text>
            <List>
              <ListItem>Rule-based Account Reconciliation with Sales, Purchase, and Accounting Modules</ListItem>
              <ListItem>CRM Modules for integrated systems</ListItem>
              <ListItem>Eliminates the need for multiple systems that don't communicate with one another</ListItem>
            </List>
          </TextContainer>
        </ContentSection>

        <Footer>© 2024 Atomwalk Office - All Rights Reserved</Footer>
      </PageContainer> */}
    </>
  );
};

export default Product;
