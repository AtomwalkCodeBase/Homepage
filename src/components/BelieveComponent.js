import React, { useState } from "react";
import styled from "styled-components";

const sections = [
  {
    title: "PURPOSE",
    text: " To enhance how modern organizations operate by connecting people, processes, and technology into one intelligent ecosystem.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "PROMISE",
    text: "To build reliable platforms that help organizations accelerate operations with clarity, efficiency, and confidence.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  },
  {
    title: "MISSION",
    text: "Empowering organizations by simplifying business complexities, through integrated solutions, for sustainable growth and driving business excellence",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692",
  },
  {
    title: "VALUES",
    text: "Integrity, innovation, and inclusion are at the core of everything we do.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
];

const BelieveComponent = () => {
  const [active, setActive] = useState(0);

  return (
    <Wrapper>
      {sections.map((item, index) => (
        <Panel
          key={index}
          active={index === active}
          bg={item.image}
          onClick={() => setActive(index)}
        >
          <Overlay />

          <Inner>
            <Title active={index === active}>{item.title}</Title>

            <Content active={index === active}>
              {item.text}
            </Content>
          </Inner>
        </Panel>
      ))}
    </Wrapper>
  );
};

export default BelieveComponent;

/* =========================
   STYLES
========================= */

const Wrapper = styled.div`
  display: flex;
  height: 85vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

/* PANEL */
const Panel = styled.div`
  flex: ${(p) => (p.active ? 4 : 1)};
  position: relative;
  cursor: pointer;
  transition: all 0.6s ease;

  background-image: url(${(p) => p.bg});
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex: none;
    height: ${(p) => (p.active ? "220px" : "90px")};
  }
`;

/* DARK OVERLAY */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  transition: 0.4s;
`;

/* CONTENT WRAPPER */
const Inner = styled.div`
  position: relative;
  z-index: 2;
  padding: 40px;
  color: white;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

/* TITLE */
const Title = styled.h2`
  font-size: ${(p) => (p.active ? "2.5rem" : "2rem")};
  transition: 0.4s;

  @media (max-width: 768px) {
    font-size: ${(p) => (p.active ? "1.5rem" : "1.2rem")};
  }
`;

/* TEXT */
const Content = styled.p`
  margin-top: 10px;
  max-width: 400px;
  font-size: 1.1rem;

  opacity: ${(p) => (p.active ? 1 : 0)};
  transform: ${(p) =>
    p.active ? "translateY(0)" : "translateY(20px)"};

  transition: all 0.4s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;