import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const scaleUp = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Overlay = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  animation: ${scaleUp} 0.3s ease;
  position: relative;
  overflow-y: scroll;
  max-height: 80%
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  color:rgb(216, 16, 16);
  cursor: pointer;
`;

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>❌</CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
