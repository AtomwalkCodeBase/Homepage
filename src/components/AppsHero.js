//design 1
import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaGooglePlay } from "react-icons/fa";

// Use your center logo
import atomwalkLogo from "../assets/img/Atom_walk_logo-removebg-preview.png";

const apps = [
  {
    name: "Atomwalk Project Timesheet",
    short: "Project Timesheet",
    color: "#5B8FF9",
    side: "left",
  },
  {
    name: "Atomwalk Project Management",
    short: "Project Management",
    color: "#FFB51B",
    side: "left",
  },
  {
    name: "Atomwalk CRM On-the-Go",
    short: "CRM On-the-Go",
    color: "#4D8DF7",
    side: "left",
  },
  {
    name: "Atomwalk HRM On-the-Go",
    short: "HRM On-the-Go",
    color: "#46B5E8",
    side: "left",
  },
  {
    name: "Atomwalk LAB Management",
    short: "LAB Management",
    color: "#45AD55",
    side: "left",
  },
  {
    name: "Atomwalk Customer Support",
    short: "Customer Support",
    color: "#FF493D",
    side: "right",
  },
  {
    name: "Atomwalk Hospital Management",
    short: "Hospital Management",
    color: "#42B4E6",
    side: "right",
  },
  {
    name: "Atomwalk Lab GLP Study",
    short: "Lab GLP Study",
    color: "#5A87F5",
    side: "right",
  },
  {
    name: "Atomwalk Sea Food Management",
    short: "Sea Food Management",
    color: "#4CAF50",
    side: "right",
  },
  {
    name: "Atomwalk Facility Management",
    short: "Facility Management",
    color: "#5587F5",
    side: "right",
  },
];

const Section = styled.section`
  background: #fff;
  /* background: #f6f2ea; */
  /* background: linear-gradient(to bottom, #f6f2ea, #ffffff); */
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 6vw, 6rem);
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: auto;

  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(420px, 1.05fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Left = styled.div`
  max-width: 550px;

  @media (max-width: 1100px) {
    max-width: 700px;
    margin: auto;
  }
`;

const Tag = styled.div`
  display: inline-block;
  border: 2px solid #e31837;
  padding: 8px 14px;
  color: #e31837;
  margin-bottom: 20px;
  font-size: clamp(15px, 1.4vw, 20px);
  font-weight: 500;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 2.9vw, 3.2rem);
  font-weight: 700;
  color: #555;
  line-height: 1.2;
`;

const Description = styled.p`
  margin-top: 1rem;
  color: #666;
  line-height: 1.7;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 13px 22px;
  border: none;
  background: #e41d3a;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  transition:
    transform 0.3s ease,
    background 0.3s ease;

  &:hover {
    background: #111;
    transform: translateY(-3px);
  }
`;

/* ---------------- ANIMATION ---------------- */

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.14);
  }

  100% {
    transform: scale(1);
  }
`;

const ringPulse = keyframes`
  0% {
    transform: scale(.85);
    opacity: 0;
  }

  35% {
    opacity: 1;
  }

  100% {
    transform: scale(1.45);
    opacity: 0;
  }
`;

const lineFlow = keyframes`
  from {
    stroke-dashoffset: 30;
  }

  to {
    stroke-dashoffset: 0;
  }
`;

/* ---------------- APP MAP ---------------- */

const Right = styled.div`
  width: 100%;
  min-width: 0;
`;

const AppMap = styled.div`
  position: relative;
  width: 100%;
  max-width: 650px;
  aspect-ratio: 1.65 / 1;
  margin: auto;

  @media (max-width: 650px) {
    aspect-ratio: auto;
    min-height: 580px;
  }
`;

const ConnectorSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 1;

  @media (max-width: 650px) {
    display: none;
  }
`;

const ConnectorLine = styled.line`
  stroke: ${({ $color }) => $color};
  stroke-width: 2;
  stroke-dasharray: 4 5;
  opacity: ${({ $active }) => ($active ? 1 : 0.35)};

  ${({ $active }) =>
    $active &&
    css`
      animation: ${lineFlow} 0.7s linear infinite;
    `}
`;

const CenterLogo = styled.div`
  position: absolute;
  z-index: 5;

  left: 50%;
  top: 50%;

  width: clamp(115px, 18vw, 170px);
  aspect-ratio: 1;

  transform: translate(-50%, -50%);

  border: 1px solid #aaa;
  border-radius: 50%;
  background: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);

  img {
    width: 72%;
    height: auto;
    object-fit: contain;
  }

  span {
    margin-top: 5px;
    color: #888;
    font-weight: 700;
    font-size: clamp(10px, 1vw, 14px);
  }

  @media (max-width: 650px) {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    margin: 0 auto 35px;
  }
`;

const AppItem = styled.div`
  position: absolute;
  z-index: ${({ $active }) => ($active ? 10 : 3)};

  width: clamp(160px, 24vw, 220px);
  height: clamp(44px, 5vw, 54px);

  display: flex;
  align-items: center;

  padding: 5px 15px 5px 8px;

  color: white;
  background: ${({ $color }) => $color};

  border-radius: 35px;

  box-shadow: ${({ $active, $color }) =>
    $active
      ? `0 10px 30px ${$color}66`
      : "0 4px 12px rgba(0,0,0,0.08)"};

  transition:
    transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.45s ease,
    opacity 0.45s ease;

  ${({ $active }) =>
    $active &&
    css`
      transform: scale(1.06);
    `}

  @media (max-width: 650px) {
    position: relative !important;
    inset: auto !important;

    width: min(100%, 360px);
    height: 54px;
    margin: 12px auto;

    transform: ${({ $active }) =>
    $active ? "scale(1.04)" : "scale(1)"};
  }
`;

const IconWrapper = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;

  display: grid;
  place-items: center;

  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;

  font-weight: 700;
  font-size: 16px;

  ${({ $active }) =>
    $active &&
    css`
      animation: ${pulse} 0.8s ease-in-out;
    `}

  &::after {
    content: "";

    position: absolute;
    inset: -8px;

    border-radius: 50%;
    border: 2px dashed ${({ $color }) => $color};

    opacity: 0;
  }

  ${({ $active }) =>
    $active &&
    css`
      &::after {
        animation: ${ringPulse} 1s ease-out infinite;
      }
    `}
`;

const AppText = styled.div`
  margin-left: 8px;
  text-align: left;

  strong {
    display: block;
    font-size: clamp(11px, 1vw, 14px);
    font-weight: 500;
    line-height: 1.15;
  }
`;

/*
 Desktop positions.
 Each item is positioned around the center.
*/

const positions = [
  { top: "4%", left: "4%" },
  { top: "22%", left: "0%" },
  { top: "40%", left: "-2%" },
  { top: "58%", left: "0%" },
  { top: "76%", left: "4%" },

  { top: "4%", right: "4%" },
  { top: "22%", right: "0%" },
  { top: "40%", right: "-2%" },
  { top: "58%", right: "0%" },
  { top: "76%", right: "4%" },
];

const startPointsLeft = [
  { x: 325, y: 165 },
  { x: 315, y: 195 },
  { x: 305, y: 225 },
  { x: 315, y: 255 },
  { x: 325, y: 285 },
];

const startPointsRight = [
  { x: 455, y: 165 },
  { x: 465, y: 195 },
  { x: 475, y: 225 },
  { x: 465, y: 255 },
  { x: 455, y: 285 },
];

const AppsHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % apps.length);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <Container>
        <Left>
          <Tag>The Atomwalk Apps</Tag>

          <Title>
            One Intelligent Operating
            <br />
            System for Your Business.
          </Title>

          <Description>
            Integrated apps that work seamlessly together to simplify and
            connect every business function through one powerful platform.
          </Description>

          <Button
            onClick={() =>
            (window.location.href =
              "https://play.google.com/store/apps/developer?id=Atomwalk+Technologies+Private+Ltd.&hl=en_IN")
            }
          >
            <FaGooglePlay />
            Explore Atomwalk Apps
          </Button>
        </Left>

        <Right>
          <AppMap>
            {/* CONNECTING LINES */}
            <ConnectorSvg viewBox="0 0 780 470">
              {apps.map((app, index) => {
                const isLeft = index < 5;

                const yPositions = [42, 130, 220, 310, 400];
                const y = yPositions[index % 5];
                const start = isLeft ? startPointsLeft[index] : startPointsRight[index - 5];

                return (
                  <ConnectorLine
                    key={app.name}
                    x1={start.x}
                    y1={start.y}
                    x2={isLeft ? 220 : 560}
                    y2={y}
                    $color={app.color}
                    $active={activeIndex === index}
                  />
                );
              })}
            </ConnectorSvg>

            {/* CENTER */}
            <CenterLogo>
              <img src={atomwalkLogo} alt="Atomwalk Technologies" />
              <span>MOBILE APPS</span>
            </CenterLogo>

            {/* APPS */}
            {apps.map((app, index) => (
              <AppItem
                key={app.name}
                style={positions[index]}
                $color={app.color}
                $active={activeIndex === index}
              >
                <IconWrapper
                  $color={app.color}
                  $active={activeIndex === index}
                >
                  AW
                </IconWrapper>

                <AppText>
                  <strong>{app.name}</strong>
                </AppText>
              </AppItem>
            ))}
          </AppMap>
        </Right>
      </Container>
    </Section>
  );
};

export default AppsHero;