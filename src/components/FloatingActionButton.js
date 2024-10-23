import React from 'react';
import styled from 'styled-components';
import FloatingIcon from '../assets/img/chatbot-icon-removebg-preview.png';

const FloatingButton = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: rgb(227 227 227); /* Background color, can be changed */
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;

const FloatingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function FloatingActionButton(props) {
    const slideropen=()=>{
        props.setOpenslide(true);
    }
  return (
    <FloatingButton onClick={slideropen}>
      <FloatingImage src={FloatingIcon} alt="Floating Icon" />
    </FloatingButton>
  );
}
// href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer"