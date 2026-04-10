import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 80px 0;
  background: #faf8f5;

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

/* HEADER */
const Header = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #454545;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Arrows = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const Arrow = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #aaa;
  background: transparent;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: #000;
    color: #fff;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

/* SLIDER CONTAINER */
const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

/* SLIDER */
const SliderWrapper = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 40px 20px; /* added side padding for mobile */
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* IMPORTANT for mobile smoothness */

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* CARD */
const Card = styled.div`
  min-width: 60%;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease;

  @media (max-width: 1024px) {
    min-width: 70%;
    height: 380px;
  }

  @media (max-width: 768px) {
    min-width: 85%;
    height: 260px;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* OVERLAY */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.8)
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 10px;
`;

const SmallText = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const MainText = styled.h3`
  font-size: 2rem;
  margin: 10px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ReadMore = styled.div`
  margin-top: 15px;
  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 1px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PatentAndPublications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const scrollRef = useRef();

  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const cards = container.children;
    const total = cards.length;

    let newIndex = currentIndex;

    if (direction === "left") {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(total - 1, currentIndex + 1);
    }

    setCurrentIndex(newIndex);

    const card = cards[newIndex];

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const scrollLeft =
      container.scrollLeft +
      (cardRect.left - containerRect.left) -
      (containerRect.width / 2 - cardRect.width / 2);

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  };

  const cards = [
    {
      title: "Intellectual Property",
      subtitle: "Our Patents & Innovations",
      image:
        "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Patent_Img.png",
      path: "/intellectual-property",
    },
    {
      title: "India’s Most Trusted Companies 2025",
      subtitle: "Prominent Award",
      image:
        "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/Award_Img.jpg",
      path: "/awards",
    },
    {
      title: "News & Events",
      subtitle: "Latest Updates",
      image:
        "https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/News_Img.png",
      path: "/news-events.html",
    },
  ];

  useEffect(() => {
    // delay ensures layout is calculated on mobile
    const timer = setTimeout(() => {
      scroll("right");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <Header>
        <Title>Recognitions</Title>

        <Arrows>
          <Arrow onClick={() => scroll("left")}>←</Arrow>
          <Arrow onClick={() => scroll("right")}>→</Arrow>
        </Arrows>
      </Header>

      <SliderContainer>
        <SliderWrapper ref={scrollRef}>
          {cards.map((card, index) => (
            <Card key={index}>
              <BackgroundImage src={card.image} alt={card.title} />

              <Overlay>
                <SmallText>{card.subtitle}</SmallText>
                <MainText>{card.title}</MainText>

                <ReadMore onClick={() => navigateTo(card.path)}>
                  READ MORE →
                </ReadMore>
              </Overlay>
            </Card>
          ))}
        </SliderWrapper>
      </SliderContainer>
    </Wrapper>
  );
};

export default PatentAndPublications;