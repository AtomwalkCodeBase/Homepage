import React from 'react';
import styled from 'styled-components';
import Rocket from '../assets/img/rocket4.png';
const Container = styled.section`
  position: relative;
  min-height: 600px;
  display: grid;
  grid-template-columns: 45% 55%;
  background-color: #f6f2ea;
  background-image: url('https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/pattern-scale.svg');
  background-repeat: repeat;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

/* LEFT SIDE */
const Left = styled.div`
  display: flex;
  align-items: center;
  padding: 4rem 6rem;
  z-index: 2;

  @media (max-width: 1024px) {
    text-align: center;
    padding: 3rem;
  }
`;

const Content = styled.div`
  max-width: 520px;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #e31837;

  .highlight {
    color: #222;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background: #e31837;
  color: white;
  border: none;
  padding: 14px 30px;
  font-weight: 600;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #e31837;
  border: 2px solid #e31837;
  padding: 14px 30px;
  font-weight: 600;
  cursor: pointer;
`;

/* RIGHT SIDE IMAGE */
const Right = styled.div`
  /* position: relative; */
  /* height: 100%; */
  /* overflow: hidden; */

  /* clip-path: polygon(18% 0, 93% 0, 75% 100%, 0% 100%); */

  @media (max-width: 1024px) {
    clip-path: none;
    height: 350px;
  }
`;

const Image = styled.img`
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
`;

/* LOGO */
const Logo = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 4rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;

  @media (max-width: 1024px) {
    position: relative;
    text-align: center;
    margin-top: 2rem;
  }
`;

const TechMahindraScaleAtSpeed = () => {
  return (
    <Container>
      <Left>
        <Content>
          <Heading>
            Step into the Future <span className="highlight">with Atomwalk</span>
          </Heading>
          <Description>
            Our commitment is to enable enterprises across industries to transform rapidly while enhancing agility, resilience, and efficiency.
          </Description>
          <ButtonGroup>
            <PrimaryButton onClick={() => window.location.href = "/product.html"}>KNOW MORE</PrimaryButton>
            <SecondaryButton onClick={() => window.location.href = "/aboutUs.html"}>OUR BRAND STORY</SecondaryButton>
          </ButtonGroup>
        </Content>
      </Left>

      <Right>
        <Image src={Rocket} />
      </Right>
    </Container>
  );
};

export default TechMahindraScaleAtSpeed;