import React, { useState } from 'react';
import styled from 'styled-components';
import Sales  from './../assets/img/content.png'
import Supports  from './../assets/img/support.png'
import Partnerships  from './../assets/img/hand-shake.png'
import Media  from './../assets/img/acquisition.png'
import Support from './Support';

// Styled Components
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 120px 20px;
  background-color:#ddf5ff;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  background-color: ${(props) => props.bgColor || '#f0f0f0'};
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 100%;
`;

const Icon = styled.div`
  background-color: ${(props) => props.bgColor || '#f0f0f0'};
  border-radius: 10px;
  padding: 10px;
  display: inline-flex;
  margin-bottom: 15px;
  width: 10%;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #fff;
  border: 2px solid #a4e4ff;
  color: #4c2c93;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ddf5ff;
    /* color: #fff; */
  }
`;

// Component
const ContactCards = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const contact = () => {
  window.location.href='/contactUs.html'
  };
  const seals = () => {
    window.location.href='/seals.html'
    };
  return (
    <>
    <GridContainer>
      <Card bgColor="#f6eaff">
        <Icon bgColor="#ffe9c0">
          <img src={Sales} alt="Sales" />
        </Icon>
        <Title>Sales</Title>
        <Description>Explore how Atomwalk can benefit your business.</Description>
        <Button onClick={seals}>Talk To Us</Button>
      </Card>
      
      <Card bgColor="#ffeadf">
        <Icon bgColor="#dff2e1">
          <img src={Supports} alt="Support" />
        </Icon>
        <Title>Support</Title>
        <Description>If you are our customer and need help with the Atomwalk application. We are here for you.</Description>
        <Button onClick={openModal}>Get Help</Button>
      </Card>

      <Card bgColor="#e1fff6">
        <Icon bgColor="#c6f0ff">
          <img src={Partnerships} alt="Partnerships" />
        </Icon>
        <Title>Partnerships</Title>
        <Description>Interested in partnering with us? Let us know.</Description>
        <Button>Get In Touch</Button>
      </Card>

      <Card  bgColor="#edf5ff">
        <Icon bgColor="#f1d0ff">
          <img src={Media}alt="Media" />
        </Icon>
        <Title>Media</Title>
        <Description>Any PR related questions? Always ready to talk.</Description>
        <Button onClick={contact}>Contact Us</Button>
      </Card>
    </GridContainer>
    <Support isOpen={modalIsOpen} onRequestClose={closeModal}></Support>
    </>
  );
};

export default ContactCards;
