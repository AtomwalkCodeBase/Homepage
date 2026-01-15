// ProductPage.js
import React from 'react';
import LetsConnect from './LetsConnect';
import ProductPage from './ProductPage';
import PlanSuccess from './PlanSuccess';
import SeamlessIntegration from './SeamlessIntegration';
import ProductCard from './ProductCard';
import WhatAtomwalkCovers from './WhatAtomwalkCovers';
import { Helmet } from 'react-helmet-async';

// Main Component
const Product = () => {
  return (
    <>
      <Helmet>
        <title>Atomwalk ERP | Comprehensive Business Management Solution</title>
        <meta name="description" content="Produces goods through organized processes and operations." />
        <meta name="keywords" content="erp, erp login, erp system, erp software, erp portal, manufacturing industries, erp manufacturing modules, best erp system for manufacturing" />
        <link rel="canonical" href="https://www.atomwalk.com/product.html" />
      </Helmet>
      <LetsConnect title={"Empower Your Business with Atomwalk Office ERP"}
        description={"Atomwalk Office is a cloud-based ERP solution, designed to transform the way startups, small- medium to large-sized businesses. Built on cutting-edge technologies like AI and Blockchain, our platform seamlessly manages core business functions including manufacturing, purchasing, inventory, sales, customer service, accounting, and HR. You can make informed decisions based on real-time information, analytic and agile reporting systems."}
        background={"#52ebff"}
        data={true}></LetsConnect>
      <ProductPage></ProductPage>
      <WhatAtomwalkCovers />
      <ProductCard></ProductCard>
      <PlanSuccess></PlanSuccess>
      <SeamlessIntegration></SeamlessIntegration>
    </>
  );
};

export default Product;
