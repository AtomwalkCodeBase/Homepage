import React from 'react';
import styled from 'styled-components';
import contactus from "../assets/img/contactus.jpg";
import colorSharp from "../assets/img/color-sharp.png"
import LetsConnect from './LetsConnect';
import ContactCards from './ContactCards';
import ContactCard from './ContactCard';

const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-image: url(${colorSharp});
  background-position: left center;
  background-repeat: no-repeat; */
  background-color: #e1fff6;
  padding: 50px 20px;
  color: #333;

  @media(min-width: 768px) {
    flex-direction: row;
    /* justify-content: space-between; */
    padding: 50px 250px;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;

  @media(min-width: 768px) {
    font-size: 2.5em;
    text-align: left;
  }
`;

const ContactDetails = styled.div`
  flex: 1;
  margin-bottom: 30px;
  text-align: center;

  @media(min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
  }
`;

const Address = styled.div`
  margin: 20px 0;
`;

const ContactForm = styled.form`
  flex: 1;
  background-color: #dffddb;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  &:hover{
  transform: scale(1.05);
  box-shadow: 0 4px 57px -9px #454545;
  }
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  /* background-color: #f6eaff; */
  border: 1px solid #333;
  /* border: none; */
  border-radius: 5px;
  color: #333;
  font-size: 1em;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  /* background-color: #f6eaff; */
  border: 1px solid #333;
  /* border: none; */
  border-radius: 5px;
  color:  #333;
  font-size: 1em;
  height: 100px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  margin-top: 20px;
  /* background: linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%); */
  background-color: rgb(223, 253, 219);
  /* border: none; */
  border-radius: 5px;
  color: #333;
  font-size: 1em;
  font-weight:500;
  cursor: pointer;

  &:hover {
    background-color: rgb(223, 253, 245);
  }
`;
const BackImage = styled.div`
  position: relative;
  height: 500px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${contactus});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5; /* Apply opacity to the background image only */
    z-index: 1;
  }
`;

const Tesdiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3em;
  height: 100%;
  z-index: 2; /* Ensure the text is above the background */
  font-weight: 500;
`;
const Para =styled.p`
@media (min-width:768px) {
  width: 440px;
}
`

const ContactUs = () => {
  return (
    <>
    {/* <BackImage><Tesdiv>Contact Us</Tesdiv></BackImage> */}
    <LetsConnect title={"Let's connect"} description={"We would love to hear from you. How can we help?"} background={"#ffc24b"}></LetsConnect>
    <ContactCard></ContactCard>
    <ContactCards></ContactCards>
    <ContactSection>
      <ContactDetails>
        <Title>Get in Touch with Atomwalk 👋</Title>
        <Para>
          Feel free to connect with us for any of your needs regarding our services. Our support team is ready to solve any of your issues. Just push a text to us and we will get back to you immediately.
        </Para>
        <Address>
          <p><strong>India</strong></p>
          <p>Bengaluru, Marathahalli, 560037</p>
          <p>Email: info@atomwalk.com</p>
          <p>Phone: +91-7259555003</p>
        </Address>
      </ContactDetails>

      <ContactForm>
        <FormTitle>Drop Us a Message</FormTitle>
        <Input type="text" placeholder="Name*" required />
        <Input type="text" placeholder="+91 Phone No*" required />
        <Input type="email" placeholder="Email*" required />
        <Input type="text" placeholder="Which Business do you have ?*" required />
        <Input type="text" placeholder="Location*" required />
        <TextArea placeholder="Message*" required />
        <Button type="submit">Connect With Atomwalk Today</Button>
      </ContactForm>
    </ContactSection>
    </>
  );
};

export default ContactUs;
