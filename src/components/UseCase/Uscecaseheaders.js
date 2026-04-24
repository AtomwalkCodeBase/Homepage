import React from "react";
import styled, { keyframes } from "styled-components";
import heroImg from "../../assets/img/manufacturing-erp-software-implement.webp";
import { useNavigate } from "react-router-dom";

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

const Wrapper = styled.div`
  background: #f6f2ea;
`;

const BreadcrumbContainer = styled.div`
  padding: 20px 80px;
  background: #f6f2ea;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const BreadcrumbList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.li`
  font-size: 0.9rem;
  color: ${(props) => (props.active ? '#e41c39' : '#64748b')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${(props) => (props.active ? '#e41c39' : '#e41c39')};
  }
`;

const Separator = styled.span`
  color: #cbd5e1;
  font-size: 0.85rem;
  margin: 0 4px;
`;

const HomeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  margin-right: 2px;
`;

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

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
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

const UsecaseHeader = ({ title, subtitle, mainImage, sub, link }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      {/* Breadcrumb Section */}
      <BreadcrumbContainer>
        <BreadcrumbList>
          <BreadcrumbItem onClick={() => handleNavigate('/')}>
            <HomeIcon>🏠</HomeIcon> Home
          </BreadcrumbItem>
          <Separator>›</Separator>
          <BreadcrumbItem onClick={() => handleNavigate(link)}>
            {sub}
          </BreadcrumbItem>
          <Separator>›</Separator>
          <BreadcrumbItem active>
            {title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbContainer>

      {/* Main Hero Section */}
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
    </Wrapper>
  );
};

export default UsecaseHeader;