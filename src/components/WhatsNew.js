import React, { useState } from "react";
import styled from "styled-components";

/* DATA */
const data = [
  {
    id: 1,
    tag: "Lab | January 11, 2026",
    title: "Smarter Instrument Maintenance for Modern Laboratories",
    desc: "Moving beyond fixed schedules to intelligent, risk-based equipment management.",
    img: "https://www.chitkara.edu.in/blogs/wp-content/uploads/2024/08/Laboratory-Science.jpg", // lab equipment / maintenance
  },

  {
    id: 2,
    tag: " Seafood | January 29, 2026",
    title: "Digitizing Seafood Operations with End-to-End ERP",
    desc: "Bringing traceability, quality control, and operational efficiency into a unified seafood management platform.",
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=70", // seafood industry
  },
  {
    id: 3,
    tag: "HMS | February 01, 2026",
    title: "Intelligent Healthcare Operations with Smart HMS",
    desc: "Enhancing patient care and hospital efficiency through connected, AI-enabled workflows.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=70", // healthcare / hospital
  },
  {
    id: 4,
    tag: "Lab | March 04, 2026",
    title: "Instant Report Drafting for Laboratories",
    desc: "Streamlining the reporting process with AI-powered tools.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=70", // analytics / reports / dashboard
  },
];

/* SECTION */
export const Section = styled.section`
  padding: 5rem 6rem;
  background-color: #f6f2ea;
  background-image: url("https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/pattern-scale.svg");
  overflow: hidden;

  @media (max-width: 992px) {
    padding: 4rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

/* HEADER */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h2`
  font-size: 3rem;
  color: #000;

  @media (max-width: 992px) {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Subtitle = styled.p`
  color: #555;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

/* CONTROLS */
export const Controls = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const Arrow = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: #2b2620;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #000;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 36px;
  }
`;

/* SLIDER */
export const SliderWrapper = styled.div`
  overflow: hidden;
`;

export const Slider = styled.div`
  display: flex;
  transition: transform 0.5s ease;

  /* Desktop: 3 cards */
  transform: ${({ index }) => `translateX(-${index * 33.333}%)`};

  @media (max-width: 992px) {
    /* Tablet: 2 cards */
    transform: ${({ index }) => `translateX(-${index * 50}%)`};
  }

  @media (max-width: 768px) {
    /* Mobile: 1 card */
    transform: ${({ index }) => `translateX(-${index * 100}%)`};
  }
`;

/* CARD */
export const Card = styled.div`
  min-width: 33.333%;
  height: 420px;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    min-width: 50%;
    height: 380px;
  }

  @media (max-width: 768px) {
    min-width: 100%;
    height: 320px;
    padding: 0 5px;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover .desc {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CardInner = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  /* border-radius: 12px; */
`;

/* IMAGE */
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
`;

/* OVERLAY */
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1));
`;

/* TAG */
export const Tag = styled.div`
  background: rgba(0,0,0,0.5);
  padding: 6px 10px;
  font-size: 12px;
  color: white;
  width: fit-content;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

/* TITLE TEXT */
export const TitleText = styled.h3`
  color: white;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

/* DESCRIPTION */
export const Desc = styled.p`
  font-size: 0.9rem;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: 0.3s;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    opacity: 1; /* Always visible on mobile */
    transform: translateY(0);
  }
`;

const WhatsNew = () => {
  const [index, setIndex] = useState(0);
  const getVisibleCards = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }
  const next = () => {
    if (index < data.length - getVisibleCards()) {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <Section>
      <Header>
        <div>
          <Title>What’s New</Title>
          <Subtitle>
            Latest Innovations in our Product Development
          </Subtitle>
        </div>

        <Controls>
          <Arrow onClick={prev}>←</Arrow>
          <Arrow onClick={next}>→</Arrow>
        </Controls>
      </Header>

      <SliderWrapper>
        <Slider index={index}>
          {data.map((item) => (
            <Card key={item.id} onClick={() => window.location.href = `/news?id=${item.id}`}>
              <CardInner>
                <Image src={item.img} />

                <Overlay>
                  <Tag>{item.tag}</Tag>

                  <div>
                    <TitleText>{item.title}</TitleText>
                    <Desc className="desc">{item.desc}</Desc>
                  </div>
                </Overlay>
              </CardInner>
            </Card>
          ))}
        </Slider>
      </SliderWrapper>
    </Section>
  );
};

export default WhatsNew;