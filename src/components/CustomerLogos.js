import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Section = styled.section`
  text-align: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
`;

const LogoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoCard = styled(motion.div)`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Logo Data
const logos = [
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
  "https://www.meteonic.com//uploads/media-upload/2020-02/m-logo.png",
];

const CustomerLogos = () => {
  return (
    <Section>
      <Title>Our Customers</Title>
      <Subtitle>Trusted by businesses</Subtitle>
      <LogoGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {logos.map((logo, index) => (
          <LogoCard key={index} variants={itemVariants} whileHover={{ scale: 1.1 }}>
            <LogoImage src={logo} alt={`Customer Logo ${index + 1}`} />
          </LogoCard>
        ))}
      </LogoGrid>
    </Section>
  );
};

export default CustomerLogos;
