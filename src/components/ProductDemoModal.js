import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
// Import your image
import rocketImage from "../assets/img/image.png"; // Replace with the correct path

// Custom styles for the modal
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

// Container for the modal content
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 40px;
  }
`;

// Container for the form
const FormContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 60%;
    padding-right: 20px;
  }
`;

// Container for the image
const ImageContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    display: flex;
    width: 40%;
  }
`;

// Title styling
const Title = styled.h2`
  font-size: 2.1em;
  color: rgb(170, 0, 234);
  margin-bottom: 10px;
  font-weight: 800;
  line-height: 1.25;
`;

// Description styling
const Description = styled.p`
  color: #555;
  margin-bottom: 20px;
`;

// Input styling
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 4px;
`;

// Button styling
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6a1b9a;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 700;

  &:hover {
    background-color: #4a148c;
  }
`;

// Close button styling
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #d1cdcd;
  border-radius: 50%;
  width: 5%;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  &:hover{
  background: #454544;
  }
`;

const ProductDemoModal = ({ isOpen, onRequestClose,setShowsuccess }) => {
  let currentDate = new Date();
let day = ("0" + currentDate.getDate()).slice(-2);  // Get current day
let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);  // Get current month
let year = currentDate.getFullYear();
// Format as DD-MM-YYYY
let formattedDate = `${day}-${month}-${year}`;
  const formInitialDetails = {
    name: "",
    company_name: "",
    task_name: "Book My Demo",
    mobile_number: "",
    email_id: "",
    add_task: "N",
    task_type: "Book My Demo",
    task_date: formattedDate,
    remarks:"Book My Demo"
}
const [formDetails, setFormDetails] = useState(formInitialDetails);
const onFormUpdate = (category, value) => {
  setFormDetails({
    ...formDetails,
    [category]: value
  })
}
const endpoint = 'https://www.atomwalk.com/api';
const addLead =(e)=> {
 e.preventDefault();
 return authAxiosPost(`https://www.atomwalk.com/api/add_lead/PMA_00001/`,{ 'lead_data':formDetails});
}
const authAxiosPost = async (url, data) => {
 try {
   let token = localStorage.getItem('apiResponse');
   let parsedToken = JSON.parse(token);
   if (!token) {
     throw new Error('Token not found, please login.');
   }
   const axiosInstance = axios.create({
     baseURL: endpoint,
     headers: {
       Authorization: `Token ${parsedToken.key}`,
     },
   });
   const response = await axiosInstance.post(url, data);
   if (response.status == 200) {
     setShowsuccess(true);
     localStorage.setItem('datacheck',true);
     setFormDetails(formInitialDetails);
     onRequestClose()
    
   }
 } catch (error) {
   console.log('Error making authenticated API call:', error);
   setFormDetails(formInitialDetails);
 }
};
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <ModalContent>
        <FormContainer>
          <CloseButton onClick={onRequestClose}>&times;</CloseButton>
          <Title>Ready to see our product in action?</Title>
          <Description>
            See a demo of our product that's tailored just for you.
          </Description>
          <Input onChange={(e) => onFormUpdate('name', e.target.value)} type="text" placeholder="Your Name" />
          <Input onChange={(e) => onFormUpdate('email_id', e.target.value)} type="email" placeholder="Email" />
          <Input onChange={(e) => onFormUpdate('mobile_number', e.target.value)} type="tel" placeholder="Phone Number" />
          <Input onChange={(e) => onFormUpdate('company_name', e.target.value)} type="text" placeholder="Company Name" />
          <Button onClick={addLead}>Book My Demo</Button>
        </FormContainer>
        <ImageContainer>
          <img src={rocketImage} alt="Rocket" style={{ width: "100%" }} />
        </ImageContainer>
      </ModalContent>
    </Modal>
  );
};

export default ProductDemoModal;
