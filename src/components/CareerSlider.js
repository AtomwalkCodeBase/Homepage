import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Team from "../assets/img/JoinTeam.png";
import Innovate from "../assets/img/InnovateWithUs.png";
import Growth from "../assets/img/ProfessionalGrowth.png";

const slides = [
  {
    id: 1,
    title: "Join Our Dynamic Team",
    subtitle: "Shape the Future of Technology",
    description:
      "At Atomwalk Technologies, we are committed to pushing the boundaries of innovation. Join us to be a part of a team that's redefining the tech landscape.",
    image: `${Team}`,
  },
  {
    id: 2,
    title: "Collaborate and Innovate",
    subtitle: "Work with Industry Leaders",
    description:
      "Collaborate with talented professionals and contribute to projects that make a real impact. Your ideas and expertise are valued here.",
    image: `${Innovate}`,
  },
  {
    id: 3,
    title: "Professional Growth",
    subtitle: "Advance Your Career",
    description:
      "We believe in nurturing talent and providing opportunities for continuous learning and development. Grow your career with us.",
    image: `${Growth}`,
  },
];

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  padding: 40px;
  height: 100vh;
  width: 100%;
  position: relative;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
  color: #ffffff;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 90%;
  max-width: 1200px;
  position: relative;
`;

const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  text-align: left;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Image = styled(motion.img)`
  width: 400px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 350px;
    height: auto;
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const TextContent = styled(motion.div)`
  flex: 1;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #f8f9fa;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #d1e8e2;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #dee2e6;
  /* padding: 0 20px; */

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const ControlButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 16px;
  }
`;

const SlideIndicator = styled.span`
  font-size: 16px;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// New animation variants
const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { opacity: 0, scale: 1.1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } },
};

const CareerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Container>
        <Header>Careers at Atomwalk Technologies</Header>

      <CarouselWrapper>
        <AnimatePresence mode="wait">
          <SlideContainer key={slides[currentSlide].id}>
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].subtitle}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={imageVariants}
            />
            <TextContent
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
            >
              <Title>{slides[currentSlide].title}</Title>
              <Subtitle>{slides[currentSlide].subtitle}</Subtitle>
              <Description>{slides[currentSlide].description}</Description>
            </TextContent>
          </SlideContainer>
        </AnimatePresence>
      </CarouselWrapper>

      <Controls>
        <ControlButton whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.9 }} onClick={handlePrev}>
          <FaArrowLeft />
        </ControlButton>
        <SlideIndicator>
          {currentSlide + 1}/{slides.length}
        </SlideIndicator>
        <ControlButton whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }} onClick={handleNext}>
          <FaArrowRight />
        </ControlButton>
      </Controls>
    </Container>
  );
};

export default CareerSlider;
