import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

/* SECTION */
const Section = styled.section`
  padding: 4rem 6rem;
    background: linear-gradient(to bottom, #FFFFFF, #F0FCFF);
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

/* HEADER */
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TitleWrap = styled.div``;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #454545;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Desc = styled.p`
  max-width: 600px;
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

/* ARROWS */
const ArrowGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const Arrow = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2d261d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`;

/* SLIDER */
const Slider = styled.div`
  overflow: hidden;
  position: relative;
`;

const Track = styled.div`
  display: flex;
  gap: 24px;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(${(p) => p.translate}px);

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

/* CARD */
const Card = styled.div`
  min-width: 340px;
  width: 340px;
  height: 460px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  /* border-radius: 16px; */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    min-width: 280px;
    width: 280px;
    height: 400px;
  }

  @media (max-width: 480px) {
    min-width: 260px;
    width: 260px;
    height: 380px;
  }
`;

/* IMAGE */
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

/* OVERLAY */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85),
    rgba(0, 0, 0, 0.2) 60%,
    transparent
  );

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

/* TAG */
const Tag = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 6px 12px;
  font-size: 12px;
  color: white;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 4px 10px;
  }
`;

/* TEXT */
const CardTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 8px;
  }
`;

const Name = styled.p`
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Role = styled.p`
  color: #ddd;
  font-size: 0.85rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

/* PLAY BUTTON */
const Play = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 14px;
    bottom: 16px;
    right: 16px;
  }
`;

/* MODAL */
const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 1000px;
  background: #000;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 95%;
    border-radius: 16px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 24px;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 20px;
    top: 12px;
    right: 12px;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* DATA */
const data = [
  {
    title: "How Atomwalk ERP helped NGO to streamline operations and maximize impact",
    name: "Sridhar Alampalli",
    role: "Chairman-Shanthala Chits Pvt.Ltd",
    image:
      "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/sridhar.png",
    video:
      "https://youtu.be/QtZG6jPRHGE?si=zmpbPT7QBIPGcV_I",
  },
  {
    title:
      "How Atomwalk HRM Transformed Employee Engagement and Productivity",
    name: "Ankur Mehrortra",
    role: "Serial Entrepreneur , Business Coach, Meteonic Innovation Pvt Ltd.",
    image:
      "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Ankur.png",
    video:
      "https://youtu.be/xb6bQxAB0IM?si=-Y3TXvrXLa3mRI_c",
  },
  {
    title: "Purpose in Practice: Leadership driving data success",
    name: "Dr. Prashanthi K",
    role: "Associate Professor,Ramaiah University of Applied Sciences",
    image:
      "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Prashanthi.png",
    video:
      "https://youtu.be/fnjEc05BiFE?si=qFIegMMcNNuK5HQq",
  },
  {
    title:
      "From Infrastructure to Intelligence: How Atomwalk ERP is Driving the Future of Enterprise AI",
    name: "Shalini Srivastava",
    role: "Founder, Vizion Beyond",
    image:
      "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/salinisri.png",
    video:
      "https://youtu.be/c63g5G_aMT8?si=S_BHRN8RWEWSzRy6",
  },
  {
    title: "How Atomwalk CRM helped company to increase sales and customer satisfaction",
    name: "Santosh Olety",
    role: "CEO and Founder ,Olety Carz Pvt Ltd",
    image:
      "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/santosh.png",
    video:
      "https://youtu.be/QB2ntnUdoEk?si=WJXqK19JzWMg2CGI",
  },

];

const SuccessStories = () => {
  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const trackRef = useRef(null);

  // Calculate cards per view based on screen width
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Calculate card width including gap
  const getCardWidth = () => {
    if (typeof window !== "undefined") {
      const cardElement = document.querySelector(".card-element");
      if (cardElement) {
        const width = cardElement.offsetWidth;
        const gap = window.innerWidth < 768 ? 16 : 24;
        return width + gap;
      }
    }
    return window.innerWidth < 768 ? 296 : 364; // 280 + 16 or 340 + 24
  };

  const [cardWidth, setCardWidth] = useState(364);

  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(getCardWidth());
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const next = () => {
    const maxIndex = Math.max(0, data.length - cardsPerView);
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleVideoClick = (videoUrl) => {
    setVideo(videoUrl);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setVideo(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Section>
        <Header>
          <TitleWrap>
            <Title>Success Stories</Title>
            <Desc>
              Partnering with global enterprises to solve complex challenges, accelerate transformation,
              and deliver measurable results.
            </Desc>
          </TitleWrap>

          <ArrowGroup>
            <Arrow onClick={prev} disabled={index === 0}>
              ←
            </Arrow>
            <Arrow
              onClick={next}
              disabled={index >= data.length - cardsPerView}
            >
              →
            </Arrow>
          </ArrowGroup>
        </Header>

        <Slider>
          <Track translate={-index * cardWidth}>
            {data.map((item, i) => (
              <Card
                key={i}
                className="card-element"
                onClick={() => handleVideoClick(item.video)}
              >
                <Image src={item.image} alt={item.name} />

                <Tag>VIDEO</Tag>

                <Overlay>
                  <CardTitle>{item.title}</CardTitle>
                  <Name>{item.name}</Name>
                  <Role>{item.role}</Role>
                </Overlay>

                <Play>▶</Play>
              </Card>
            ))}
          </Track>
        </Slider>
      </Section>

      {/* MODAL */}
      {video && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <VideoWrapper>
              {video.includes("youtu.be") || video.includes("youtube.com") ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={video.replace("youtu.be/", "youtube.com/embed/").split("?")[0]}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              ) : (
                <video controls autoPlay loop>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </VideoWrapper>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default SuccessStories;