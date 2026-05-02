import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const slides = [
  {
    title: "Engineering Intelligent Enterprise Solutions",
    desc: "Powering your digital foundation. Scalable. Adaptive. Future-ready",
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Labhero2.png",
    link: "/product.html"
  },
  {
    title: "Scalable Manufacturing, Seamless Operations",
    desc: "Unified platform. Real-time. Data-driven",
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Production-Management-Software.jpg",
    link: "/processandproject.html"
  },
  {
    title: "Smarter Labs, Faster Discovery",
    desc: "Lab automation. Simplify workflows. Accelerate discovery",
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/untuk-artikel-narkoba-3-434b4.png",
    link: "/lms.html"
  },
  {
    title: "Shaping Sustainable Facility Operations",
    desc: "Efficient systems. Lower waste. Stronger compliance",
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/fasilite.jpeg",
    link: "/facilitymanagement.html"
  },
  {
    title: "Modern Workforce Management Solutions",
    desc: "Reimagine HR. Empower teams. Greater efficiency",
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/atomwalkHRM.png",
    link: "/hrm.html"
  },
  {
    title: "Driving Customer Centric Growth",
    desc: "Smarter insights. Better engagement. From lead to cash",
    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/atomwalkCRM.png",
    link: "/crm.html"
  },
];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(1.05); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
`;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 70vh; /* Reduce height on mobile */
    min-height: 500px; /* Set minimum height */
  }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.src}) no-repeat center/cover;
  animation: ${(props) => {
    if (props.isLeaving) return fadeOut;
    if (props.isEntering) return fadeIn;
    return 'none';
  }} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  filter: brightness(0.85);
  will-change: transform, opacity;
`;

const GlassOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3)
  );
  backdrop-filter: blur(6px);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 0 5%; /* Reduce padding on mobile */
  }
`;

const Text = styled.div`
  max-width: 600px;
  color: #fff;
  animation: ${fadeUp} 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 20px;
  width: 120%;
  span {
    color: #e31837;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem; /* Smaller font size */
    width: 100%; /* Full width instead of 120% */
    margin-bottom: 15px;
  }
`;
const Desc = styled.p`
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.9;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller font size */
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 12px 28px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #e31837;
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    border-color: #e31837;
  }
  
  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 0.9rem;
  }
`;
const RightNav = styled.div`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 3;
  
  @media (max-width: 768px) {
    right: 15px; /* Move closer to edge */
    gap: 20px;
    top: auto;
    bottom: 100px;
    transform: none;
    flex-direction: row; /* Make dots horizontal on mobile */
  }
`;

const BottomNav = styled.div`
  position: absolute;
  right: 40px;
  bottom: 40px;
  display: flex;
  gap: 20px;
  z-index: 3;
  
  @media (max-width: 768px) {
    right: 20px;
    bottom: 20px;
    gap: 12px;
  }
`;

const Arrow = styled.div`
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(4px);

  &:hover {
    color: #e31837;
    background: rgba(255,255,255,0.2);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 24px;
  }
`;

const Dot = styled.div`
  width: ${(props) => (props.active ? "32px" : "12px")};
  height: 3px;
  background: ${(props) => (props.active ? "#e31837" : "rgba(255,255,255,0.5)")};
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  cursor: pointer;
  border-radius: 2px;
  
  &:hover {
    background: ${(props) => (props.active ? "#e31837" : "rgba(255,255,255,0.8)")};
    width: ${(props) => !props.active && "18px"};
  }
  
  @media (max-width: 768px) {
    width: ${(props) => (props.active ? "24px" : "8px")};
    height: 3px;
    
    &:hover {
      width: ${(props) => !props.active && "14px"};
    }
  }
`;

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeSlide = useCallback((newIndex) => {
    if (isTransitioning) return;

    setNextIndex(newIndex);
    setIsTransitioning(true);

    setTimeout(() => {
      setIndex(newIndex);
      setNextIndex(null);
      setIsTransitioning(false);
    }, 800);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((index + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [index, changeSlide]);

  const next = () => changeSlide((index + 1) % slides.length);
  const prev = () => changeSlide((index - 1 + slides.length) % slides.length);

  return (
    <Container>
      <BackgroundContainer>
        {/* Current/Previous Image - leaving */}
        {nextIndex !== null && (
          <Background
            src={slides[index].image}
            isLeaving={true}
          />
        )}

        {/* Next/Current Image - entering */}
        <Background
          src={slides[nextIndex !== null ? nextIndex : index].image}
          isEntering={nextIndex !== null}
        />
      </BackgroundContainer>

      <GlassOverlay />

      <Content>
        <Text key={index}>
          <Title>
            {slides[index].title.split(" ").slice(0, 2).join(" ")} <br />
            <span>
              {slides[index].title.split(" ").slice(2).join(" ")}
            </span>
          </Title>
          <Desc>{slides[index].desc}</Desc>
          <Button onClick={() => window.location.href = slides[index].link}>
            KNOW MORE
          </Button>
        </Text>
      </Content>

      <RightNav>
        {slides.map((_, i) => (
          <Dot
            key={i}
            active={i === index}
            onClick={() => changeSlide(i)}
          />
        ))}
      </RightNav>

      <BottomNav>
        <Arrow onClick={prev}>‹</Arrow>
        <Arrow onClick={next}>›</Arrow>
      </BottomNav>
    </Container>
  );
}