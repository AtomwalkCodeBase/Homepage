import React, { useState } from "react";
import styled from "styled-components";
import TestimonialCardComponent from "./TestimonialCardComponent";

/* =========================
   MAIN COMPONENT
========================= */
const TestimonialsHero = () => {
  const [show, setShow] = useState(false);

  if (show) return <div> <TestimonialCardComponent /> </div>;

  return (
    <Wrapper>
      {/* FLOATING AVATARS */}
      <Floating>
        {avatars.map((item, i) => (
          <Avatar
            key={item.id}
            src={item.img}
            size={i % 3 === 0 ? "130px" : i % 2 === 0 ? "100px" : "115px"}
            style={{
              top: item.top,
              left: item.left,
              opacity: item.opacity || 1,
            }}
          />
        ))}
      </Floating>

      {/* CENTER CONTENT */}
      <Content>
        <Tag>Testimonials</Tag>

        <Title>
          Trusted by leaders <br />
          <span>from various industries</span>
        </Title>

        <Sub>
          Learn why professionals trust our solutions to <br />complete their
          customer journeys.
        </Sub>

        <Button onClick={() => setShow(true)}>
          Read Success Stories →
        </Button>
      </Content>
    </Wrapper>
  );
};

export default TestimonialsHero;

/* =========================
   STYLES
========================= */

const Wrapper = styled.section`
  height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

/* FLOATING LAYER */
const Floating = styled.div`
  position: absolute;
  inset: 0;
`;

/* AVATAR */
const Avatar = styled.img`
  position: absolute;
  width: ${({ size }) => size || "110px"};
  height: ${({ size }) => size || "110px"};
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

/* CENTER CONTENT */
const Content = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 600px;
`;

const Tag = styled.div`
  display: inline-block;
  background: #151515;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
  color: #333;

  span {
    color: #999;
  }
`;

const Sub = styled.p`
  margin-top: 1rem;
  color: #555;
  font-size: 1rem;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 12px 26px;
  /* border-radius: 30px; */
  border: none;
  background: #e41d3a;
  color: white;
  cursor: pointer;
`;

/* =========================
   EXACT POSITIONS (IMPORTANT)
========================= */

const avatars = [
  // LEFT COLUMN
  { id: 1, img: "https://randomuser.me/api/portraits/men/1.jpg", top: "18%", left: "6%", opacity: 0.3 },
  { id: 2, img: "https://randomuser.me/api/portraits/women/2.jpg", top: "38%", left: "6%" },

  // LEFT INNER
  { id: 3, img: "https://randomuser.me/api/portraits/men/3.jpg", top: "10%", left: "16%" },
  { id: 4, img: "https://randomuser.me/api/portraits/men/4.jpg", top: "28%", left: "18%" },
  { id: 5, img: "https://randomuser.me/api/portraits/women/5.jpg", top: "50%", left: "16%" },

  // CENTER LEFT
  { id: 6, img: "https://randomuser.me/api/portraits/men/6.jpg", top: "12%", left: "30%" },
  { id: 7, img: "https://randomuser.me/api/portraits/men/7.jpg", top: "28%", left: "32%" },

  // CENTER RIGHT
  { id: 8, img: "https://randomuser.me/api/portraits/women/8.jpg", top: "12%", left: "58%" },
  { id: 9, img: "https://randomuser.me/api/portraits/women/9.jpg", top: "30%", left: "60%" },

  // RIGHT INNER
  { id: 10, img: "https://randomuser.me/api/portraits/men/10.jpg", top: "10%", left: "72%" },
  { id: 11, img: "https://randomuser.me/api/portraits/women/11.jpg", top: "32%", left: "74%" },
  { id: 12, img: "https://randomuser.me/api/portraits/men/12.jpg", top: "52%", left: "72%" },

  // RIGHT EDGE
  { id: 13, img: "https://randomuser.me/api/portraits/women/13.jpg", top: "18%", left: "88%" },
  { id: 14, img: "https://randomuser.me/api/portraits/men/14.jpg", top: "40%", left: "88%" },
];