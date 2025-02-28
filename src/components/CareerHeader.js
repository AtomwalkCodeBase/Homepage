import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BottomImage from "../assets/img/CareerBg1.jpg";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 50px;
  background-color: #DBCAB8;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 40px;
  }
  @media (max-width: 480px) {
    padding-top: 30px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-top: 70px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-top: 30px;
  }

  @media screen and (max-width: 1280px){
    margin-top: 9%;
  }
  @media screen and (max-width: 767px) {
    margin-top: 100px;
    width: 370px;
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  color: #333;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    max-width: 90%;
  }
`;

const Button = styled(motion.button)`
  background-color: #e00000;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #c00000;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 50vh;
  object-fit: fill;
  margin-top: 30px;

  @media (max-width: 1024px) {
    height: 40vh;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 35vh;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    height: 30vh;
    object-fit: cover;
  }
`;


const CareersHeader = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleEmailClick = () => {
    window.location.href = "mailto:info@atomwalk.com";
  };

  return (
    <Container ref={ref} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }}>
      <Title initial={{ y: -50, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, ease: "easeOut" }}>
        Join Atomwalk Technologies.<br />Innovate, Grow, Succeed.
      </Title>
      <Subtitle initial={{ y: 50, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease: "easeOut" }}>
        At Atomwalk Technologies, we believe in fostering innovation and professional growth. Join our team to be part of a dynamic work environment where creativity meets cutting-edge technology.
      </Subtitle>
      <Button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleEmailClick}>
        Connect with HR Team →
      </Button>
      <Image src={BottomImage} alt="Workplace Illustration" initial={{ scale: 0.8, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 1, ease: "easeOut" }} />
    </Container>
  );
};

export default CareersHeader;
