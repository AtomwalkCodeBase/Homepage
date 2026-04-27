import React, { useState } from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";

import Support from "./Support";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  padding: 100px 90px 20px 90px;
  background: #f6f2ea;
  /* max-width: 1100px; */
  margin: auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  /* border-radius: 20px; */
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: ${(props) => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;

  svg {
    font-size: 26px;
    color: ${(props) => props.color};
  }
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 18px;
  /* border-radius: 10px; */
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;

  &:hover {
    background: #dc2626;
  }
`;

const ContactCards = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const goTopartnership = () => {
    window.location.href = "/PartnershipInquiries";
  };
  const goToContact = () => {
    window.location.href = "/news-events.html";
  };

  const goToSales = () => {
    window.location.href = "/seals.html";
  };

  const cards = [
    {
      title: "Talk to Sales",
      description:
        "Ready to modernize your factory or lab? Get a quote or schedule a demo.",
      icon: <HiOutlineRocketLaunch />,
      bg: "#fff4e6",
      color: "#f97316",
      action: goToSales,
      btnText: "Contact Sales",
    },
    {
      title: "Product Support",
      description:
        "Already an Atomwalk user? Get help with technical issues or configuration.",
      icon: <MdOutlineSupportAgent />,
      bg: "#f3e8ff",
      color: "#9333ea",
      action: openModal,
      btnText: "Support",
    },
    {
      title: "Partnership Inquiries",
      description:
        "System Integrators, Consultants, and Resellers—let’s grow together.",
      icon: <FaHandshake />,
      bg: "#e6fffa",
      color: "#14b8a6",
      action: goTopartnership,
      btnText: "Become a Partner",
    },
    {
      title: "Media & PR",
      description:
        "For press inquiries, brand assets, or general questions.",
      icon: <HiOutlineSpeakerphone />,
      bg: "#ffe4e6",
      color: "#ef4444",
      action: goToContact,
      btnText: "Media Kit",
    },
  ];

  return (
    <>
      <GridContainer>
        {cards.map((card, index) => (
          <Card key={index}>
            <IconWrapper bg={card.bg} color={card.color}>
              {card.icon}
            </IconWrapper>

            <Title>{card.title}</Title>
            <Description>{card.description}</Description>

            <Button onClick={card.action}>
              {card.btnText} <FiArrowRight />
            </Button>
          </Card>
        ))}
      </GridContainer>

      <Support isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
};

export default ContactCards;