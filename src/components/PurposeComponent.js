import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const milestones = [
  {
    year: "2018",
    date: "March 2018",
    text: "The Beginning – Atomwalk Technologies was founded with a vision to build advanced digital systems that simplify complex business and laboratory operations.",
  },
  {
    year: "2019",
    date: "July 2019",
    text: "Product Foundation & Innovation - Early product development began, focusing on building a unified platform for business workflows, automation, and operational efficiency.",
  },
  {
    year: "2020",
    date: "January 2020",
    text: "ERP Platform Launch - Introduced core ERP capabilities, enabling organizations to digitize procurement, inventory, finance, and operational processes."
  },
  {
    year: "2021",
    date: "October 2021",
    text: "Expansion into CRM and HRM solutions, helping businesses manage customer relationships and workforce processes more effectively.",
  },
  {
    year: "2022",
    date: "April 2022",
    text: "Entry into Laboratory Systems (LMS & LEMS) - Launched Laboratory Management System (LMS) and Equipment Management (LEMS), bringing structured workflows and compliance-driven operations to research and lab environments.",
  },
  {
    year: "2023",
    date: "August 2023",
    text: "Compliance & Industry Solutions Expansion - Enhanced platform capabilities with GLP & GMP compliance support. Introduced industry-focused solutions such as solar and waste management systems."
  },
  {
    year: "2024",
    date: "February 2024",
    text: "AI & Blockchain Integration - Integrated advanced technologies including AI-driven automation and blockchain-enabled data traceability to enhance intelligence, security, and transparency."
  },
  {
    year: "2025",
    date: "November 2025",
    text: "Scaling & Portfolio Expansion - Expanded product portfolio and strengthened enterprise capabilities, positioning Atomwalk as a unified, scalable platform for diverse industries."
  },
  {
    year: "2026",
    date: "February 2026",
    text: "Deepening Industry Footprint - Introduced specialized solutions across healthcare, environmental services, and seafood processing with HMS, Waste Management, and Seafood ERP, strengthening Atomwalk’s position as a versatile, industry-driven platform."
  },
];
const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper>
      <Left>
        <YearGhost>{milestones[activeIndex].year}</YearGhost>
        <YearMain>{milestones[activeIndex].year}</YearMain>
      </Left>

      <Right>
        {milestones.map((item, index) => (
          <Item
            key={index}
            ref={(el) => (refs.current[index] = el)}
            data-index={index}
            active={index === activeIndex}
          >
            <Date>{item.date}</Date>
            <Text>{item.text}</Text>
          </Item>
        ))}
      </Right>
    </Wrapper>
  );
};

export default Timeline;

const Wrapper = styled.div`
  display: flex;
  padding: 100px 5%;
  background: #e9e5dc;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 20px;
  }
`;

/* LEFT SIDE */
const Left = styled.div`
  width: 50%;
  position: sticky;
  top: 100px;
  height: 300px;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    height: auto;
    margin-bottom: 40px;
    text-align: center;
  }
`;

const YearGhost = styled.h1`
  font-size: 10rem;
  color: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    font-size: 5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const YearMain = styled.h1`
  font-size: 6rem;
  color: #e11d2e;
  position: relative;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

/* RIGHT SIDE */
const Right = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* ITEM */
const Item = styled.div`
  margin-bottom: 120px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;

  opacity: ${(p) => (p.active ? 1 : 0.4)};
  transform: ${(p) =>
    p.active ? "translateY(0)" : "translateY(40px)"};

  transition: all 0.4s ease;

  @media (max-width: 768px) {
    margin-bottom: 60px;
    padding-bottom: 20px;
  }
`;

const Date = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #222;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;