import React from "react";
import styled, { keyframes } from "styled-components";

const ContactHero = () => {
  return (
    <Wrapper>
      <GlowTop />
      <GlowBottom />

      <Content>
        <HeaderSection>
          <Title>
            CONTACT
            <span>LET’S CONNECT</span>
          </Title>

          <Subtitle>
            Every meaningful collaboration begins with a simple conversation.
          </Subtitle>

          <Description>
            Whether you're building something new, refining an idea, or simply
            exploring possibilities — we’re here to listen, understand, and
            create something that truly matters with you.
          </Description>

          <CTA>
            <PrimaryButton onClick={() => (window.location.href = "/demo.html")}>
              Start the Conversation
            </PrimaryButton>
          </CTA>
        </HeaderSection>
      </Content>
    </Wrapper>
  );
};

export default ContactHero;

/* =========================
   ANIMATIONS
========================= */

const fadeUp = keyframes`
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
  0% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0px); }
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
  position: relative;
  overflow: hidden;
`;

/* =========================
   BACKGROUND GLOWS
========================= */

const GlowTop = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(225, 29, 46, 0.15), transparent);
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(100px);
  animation: ${float} 10s ease-in-out infinite;
`;

const GlowBottom = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.08), transparent);
  bottom: -150px;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(100px);
  animation: ${float} 12s ease-in-out infinite;
`;

/* =========================
   CONTENT
========================= */

const Content = styled.div`
  max-width: 900px;
  padding: 0 20px;
  text-align: center;
  position: relative;
  z-index: 2;
  margin-top: -50px;
`;

/* =========================
   HEADER
========================= */

const HeaderSection = styled.div`
  font-family: 'Playfair Display', 'Cormorant Garamond', serif;
`;

/* TITLE */

const Title = styled.h2`
  font-size: clamp(70px, 14vw, 160px);
  font-weight: 400;
  line-height: 0.85;
  margin: 0;
  color: #2c2c2c;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  opacity: 0;
  animation: ${fadeUp} 1s ease forwards;
  animation-delay: 0.2s;

  span {
    display: block;
    font-style: italic;
    color: #e11d2e;
    font-size: 0.35em;
    margin-top: 10px;
    letter-spacing: 0.3em;
    font-weight: 300;
  }
`;

/* SUBTITLE */

const Subtitle = styled.p`
  font-size: 26px;
  color: #4a4a4a;
  max-width: 700px;
  margin: 40px auto 0;
  font-weight: 300;
  line-height: 1.6;

  opacity: 0;
  animation: ${fadeUp} 1s ease forwards;
  animation-delay: 0.6s;
`;

/* DESCRIPTION */

const Description = styled.p`
  font-size: 18px;
  color: #6a6a6a;
  max-width: 600px;
  margin: 25px auto 0;
  line-height: 1.8;
  font-weight: 300;

  opacity: 0;
  animation: ${fadeUp} 1s ease forwards;
  animation-delay: 1s;
`;

/* CTA */

const CTA = styled.div`
  margin-top: 50px;
  opacity: 0;
  animation: ${fadeUp} 1s ease forwards;
  animation-delay: 1.4s;
`;

const PrimaryButton = styled.button`
  padding: 16px 36px;
  background: #e11d2e;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background: #000;
    transform: translateY(-2px);
  }
`;