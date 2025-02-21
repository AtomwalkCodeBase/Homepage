import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";

const AdvantageSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  return (
    <Section ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Atomwalk Advantage
      </motion.h2>

      <CardContainer>
        {advantages.map((adv, index) => (
          <Card
            key={index}
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <IconWrapper>{adv.icon}</IconWrapper>
            <h3>{adv.title}</h3>
            <p>{adv.description}</p>
          </Card>
        ))}
      </CardContainer>

      <SeeMoreButton
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          window.location.href = "/demo.html";
        }}
      >
        See More
      </SeeMoreButton>
    </Section>
  );
};

// Data for Cards
const advantages = [
  { icon: "🚀", title: "Scalability", description: "How ATOMWALK’s solutions grow with your business, ensuring long-term success." },
  { icon: "🔒", title: "Security and Compliance", description: "Emphasize robust security measures and adherence to global compliance standards." },
  { icon: "⚙️", title: "Customer Support", description: "24/7 customer support, dedicated account managers, and a customer-first approach." }
];

// Styled Components
const Section = styled.section`
  text-align: center;
  padding: 60px;
  background: #f8f9fa;
  color: #212529;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Card = styled.div`
  background: #fff1c8;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  color: #495057;
  &:hover {
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  font-size: 40px;
  margin-bottom: 12px;
  color: #007bff;
`;

const SeeMoreButton = styled.button`
  margin-top: 40px;
  padding: 12px 24px;
  border: none;
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: linear-gradient(45deg, #0056b3, #007bff);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 118, 255, 0.4);
  }
`;

export default AdvantageSection;
