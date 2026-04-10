import React from "react";
import styled, { keyframes } from "styled-components";
import heroImg from "../../assets/img/manufacturing-erp-software-implement.webp";

/* ================= Animations ================= */

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
`;

/* ================= Layout ================= */

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  background: #f6f2ea;

  background-image: repeating-linear-gradient(
    to right,
    rgba(0, 0, 0, 0.05) 0px,
    rgba(0, 0, 0, 0.05) 1px,
    transparent 1px,
    transparent 40px
  );

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* ================= Text ================= */

const TextSection = styled.div`
  width: 50%;
  padding-left: 80px;
  animation: ${fadeInUp} 0.8s ease forwards;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-size: 54px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  max-width: 500px;
  color: #666;

  @media (max-width: 768px) {
    margin: 0 auto;
    font-size: 16px;
  }
`;

/* ================= Image ================= */

const ImageSection = styled.div`
  width: 50%;
  height: 500px;
  position: relative;
  overflow: hidden;

  /* clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%); */

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;

    /* remove angle on mobile for better UX */
    clip-path: none;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${zoomIn} 1.2s ease forwards;
`;

/* ================= Optional Button ================= */

const Button = styled.button`
  margin-top: 25px;
  padding: 12px 24px;
  border: none;
  background: #e41c39;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f10505;
    transform: translateY(-2px);
  }
`;

/* ================= Component ================= */

const UsecaseHeader = ({ title, subtitle, mainImage }) => {
  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <Content>
        <TextSection>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>

          <Button onClick={handleScrollDown}>
            Explore More ↓
          </Button>
        </TextSection>

        <ImageSection>
          <Image src={mainImage} alt={title} />
        </ImageSection>
      </Content>
    </Container>
  );
};

export default UsecaseHeader;