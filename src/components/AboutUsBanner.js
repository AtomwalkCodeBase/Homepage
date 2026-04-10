import React from "react";
import styled, { keyframes } from "styled-components";

const AboutHero = () => {
  const handleScroll = () => {
    window.scrollBy({ top: 750, behavior: "smooth" });
  };

  return (
    <Wrapper>
      <Glow />

      <Container>
        <HeroText>
          <GhostText>ABOUT US</GhostText>

          <MainTitle>
            {"We build ideas that".split(" ").map((word, i) => (
              <span key={i}>{word}&nbsp;</span>
            ))}
            <Highlight>
              {"matter".split("").map((l, i) => (
                <i key={i}>{l}</i>
              ))}
            </Highlight>
          </MainTitle>

          <SubText>
            Not just a team — a collective of thinkers, creators, and
            problem-solvers shaping meaningful digital experiences for our customers.
          </SubText>

          <CTA>
            <Button onClick={handleScroll}>Explore Our Story</Button>
          </CTA>
        </HeroText>
      </Container>
    </Wrapper>
  );
};

export default AboutHero;

/* =========================
   ANIMATIONS
========================= */

const reveal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const letterReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0); }
`;

/* =========================
   WRAPPER
========================= */

const Wrapper = styled.section`
  min-height: 100vh;
  background: #f6f2ea;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

/* =========================
   GLOW
========================= */

const Glow = styled.div`
  position: absolute;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(225, 29, 46, 0.15), transparent);
  filter: blur(120px);
  animation: ${float} 12s ease-in-out infinite;
`;

/* =========================
   CONTAINER
========================= */

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  margin-top: -150px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

/* =========================
   HERO TEXT
========================= */

const HeroText = styled.div`
  position: relative;
`;

/* GHOST BACK TEXT */

const GhostText = styled.div`
  position: absolute;
  top: -80px;
  left: 0;
  font-size: clamp(120px, 20vw, 260px);
  color: rgba(0, 0, 0, 0.04);
  font-family: 'Playfair Display', serif;
  pointer-events: none;
`;

/* MAIN TITLE */

const MainTitle = styled.h1`
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 400;
  color: #2c2c2c;
  font-family: 'Playfair Display', serif;
  line-height: 1.2;

  span {
    display: inline-block;
    opacity: 0;
    animation: ${reveal} 0.8s ease forwards;
  }

  span:nth-child(1) { animation-delay: 0.2s; }
  span:nth-child(2) { animation-delay: 0.4s; }
  span:nth-child(3) { animation-delay: 0.6s; }
  span:nth-child(4) { animation-delay: 0.8s; }
`;

/* HIGHLIGHT WORD */

const Highlight = styled.span`
  display: inline-block;

  i {
    font-style: normal;
    color: #e11d2e;
    opacity: 0;
    display: inline-block;
    animation: ${letterReveal} 0.6s ease forwards;
  }

  i:nth-child(1) { animation-delay: 1s; }
  i:nth-child(2) { animation-delay: 1.1s; }
  i:nth-child(3) { animation-delay: 1.2s; }
  i:nth-child(4) { animation-delay: 1.3s; }
  i:nth-child(5) { animation-delay: 1.4s; }
  i:nth-child(6) { animation-delay: 1.5s; }
`;

/* SUBTEXT */

const SubText = styled.p`
  margin-top: 30px;
  font-size: 20px;
  color: #555;
  max-width: 500px;
  line-height: 1.7;

  opacity: 0;
  animation: ${reveal} 1s ease forwards;
  animation-delay: 1.8s;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

/* CTA */

const CTA = styled.div`
  margin-top: 40px;
  opacity: 0;
  animation: ${reveal} 1s ease forwards;
  animation-delay: 2.2s;
`;

const Button = styled.button`
  padding: 14px 30px;
  border: none;
  background: #e11d2e;
  color: white;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: black;
    transform: translateY(-2px);
  }
`;