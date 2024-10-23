import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

// React Modal Setup
Modal.setAppElement("#root");

// Styled Components
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "750px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .8)",
    zIndex: "32333",
  },
};

const ModalContent = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #333;
  }
`;

const Supports = ({ isOpen, onRequestClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Functions to handle opening and closing the modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      {/* <SupportButton onClick={openModal}>Support</SupportButton> */}

      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <ModalContent>
          <CloseButton onClick={onRequestClose}>&times;</CloseButton>
          <Title>Contact Support</Title>
          <Form>
            <Input type="text" placeholder="Enter your name" required />
            <Input type="email" placeholder="Enter your email" required />
            <TextArea placeholder="Describe your issue or question" rows="4" required />
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Supports;
