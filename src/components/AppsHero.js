import React from "react";
import styled from "styled-components";
import mobile from "../assets/img/Appshero.png";
import { FaGooglePlay } from "react-icons/fa";

const Section = styled.section`
 background: linear-gradient(to top, #FFFFFF, #FFFFFF);
  padding: 4rem 6rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Left = styled.div`
  flex: 1;
  max-width: 550px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 115%;
  max-width: 600px;
  object-fit: contain;
`;

/* TAG */
const Tag = styled.div`
  display: inline-block;
  border: 2px solid red;
  padding: 8px 14px;
  color: #e31837;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
`;

/* TITLE */
const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #555;
  line-height: 1.3;
`;

/* DESCRIPTION */
const Description = styled.p`
  margin-top: 1rem;
  color: #666;
  line-height: 1.6;
`;

/* BUTTON */
const Button = styled.button`
  margin-top: 2rem;
  padding: 12px 20px;
  /* border-radius: 8px; */
  border: none;
  background:#e41d3a;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: black;
  }
`;
const AppsHero = () => {
  return (
    <Section>
      <Container>
        {/* LEFT CONTENT */}
        <Left>
          <Tag>The Atomwalk Apps</Tag>

          <Title>
            {/* Seven Apps. <br /> */}
            One Intelligent Operating <br />
            System for Your Business.
          </Title>

          <Description>
            Each application works seamlessly with the others,
            giving organizations the power to manage their entire business through one integrated platform.
          </Description>

          <Button onClick={() => window.location.href = "https://play.google.com/store/apps/developer?id=Atomwalk+Technologies+Private+Ltd.&hl=en_IN"}>
            <FaGooglePlay />  Explore Atomwalk Apps
          </Button>
        </Left>

        {/* RIGHT IMAGE */}
        <Right>
          <Image
            src={mobile}
            alt="Apps"
          />
        </Right>
      </Container>
    </Section>
  );
};

export default AppsHero;



