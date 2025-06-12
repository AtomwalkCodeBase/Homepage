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
    </>
  );
};

export default Product;
