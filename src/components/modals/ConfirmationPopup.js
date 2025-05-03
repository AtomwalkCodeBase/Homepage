import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for the popup
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-top: 0;
  color: #333;
  font-size: 20px;
`;

const Message = styled.p`
  margin: 16px 0;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const CancelButton = styled(Button)`
  background-color: #f1f1f1;
  color: #333;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  
  &:hover {
    background-color: #c82333;
  }
`;

// Confirmation Popup Component
const ConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <PopupContainer>
        <Title>Confirmation</Title>
        <Message>Do you want to cancel your live?</Message>
        <ButtonGroup>
          <CancelButton onClick={onClose}>No, keep it</CancelButton>
          <SubmitButton onClick={onConfirm}>Yes, cancel</SubmitButton>
        </ButtonGroup>
      </PopupContainer>
    </Overlay>
  );
};
export default ConfirmationPopup;