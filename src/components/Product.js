// ProductPage.js
import React from 'react';
import LetsConnect from './LetsConnect';
import ProductPage from './ProductPage';
import PlanSuccess from './PlanSuccess';
import SeamlessIntegration from './SeamlessIntegration';
import ProductCard from './ProductCard';

// Main Component
const Product = () => {
  return (
    <>
  <LetsConnect title={"Empower Your Business with Atomwalk Office ERP"}
   description={"Atomwalk Office is a cloud-based ERP solution, designed to transform the way startups, small- medium to large-sized businesses. Built on cutting-edge technologies like AI and Blockchain, our platform seamlessly manages core business functions including manufacturing, purchasing, inventory, sales, customer service, accounting, and HR. You can make informed decisions based on real-time information, analytic and agile reporting systems."} 
   background={"#52ebff"}
   data={true}></LetsConnect>
   <ProductPage></ProductPage>
   <ProductCard></ProductCard>
   <PlanSuccess></PlanSuccess>
   <SeamlessIntegration></SeamlessIntegration>
   {/* <TestimonialCardComponent></TestimonialCardComponent> */}
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
