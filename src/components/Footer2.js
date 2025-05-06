import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/img/Atom_walk_logo-removebg-preview.png";
import Email from "../assets/img/email.png";
import Phone from "../assets/img/telephone-call.png";
// import Footer from "../assets/img/Footer-1.jpg";
import Footer from "../assets/img/footer-bg.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import navIcon4 from "../assets/img/youtube-icon.png";
import UnderConstructionPopup from "./UnderConstructionPopup";
const FooterContainer = styled.footer`
 background-color: rgb(13, 11, 62); /* Dark background color */
  /* background-image: url(${Footer}); */
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #ffffff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const FooterLeft = styled.div`
  flex: 1;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  h1 {
    font-size: 2em;
    margin-left: 35px;
    color: #ffffff;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center; /* Align with text */
  }

  div {
    margin: 10px 20px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
    display: flex;
  }

  img {
    width: 20px;
    margin-right: 10px;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const FooterLinksContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: left;

  @media (max-width: 768px) {
  display: flex;
  flex-direction: column;
  justify-content:center;
  text-align: center;
  }
`;

const FooterLinks = styled.div`
  margin: 10px 20px;

  h3 {
    font-size: 1.2em;
    margin-bottom: 15px;
    color: #ffffff;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 8px 0;
      font-size: 1em;
      color: #a7a9ac;

      a {
        color: #a7a9ac;
        text-decoration: none;

        &:hover {
          color: #55e6a5;
        }
      }
    }
  }
`;

const FooterBottom = styled.div`
  /* margin-top: 20px; */
  font-size: 0.8em;
  text-align: center;
  background-color: rgb(13, 11, 62);

  @media (min-width: 768px) {
    /* margin-top: 20px; */
    text-align: center;
  }

  span {
    color: #55e6a5;
  }
`;
// Main Container
const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(13, 11, 62);
  padding: 20px;
  color: white;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center; /* Align with ContactInfo */
    justify-content: center;
    width: 100%;
  }
`;

// Logo Container
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    display: none;
  }

  img {
    /* height: 100px; */
    margin-right: 15px;
    width: 150px;
  }
`;

// Text Container
const TextContainer = styled.div`
  font-size: 1.2em;
  text-align: center;
  white-space: nowrap; /* Prevents text from wrapping */
  margin-bottom: 10px;

  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
  }
`;


// Form Container
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

// Input Field
const InputField = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 80%;
  max-width: 300px;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
    width: 250px;
  }
`;

// Submit Button
const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ea5c49;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #d04b38;
  }
`;

// Disclaimer Text
const DisclaimerText = styled.p`
  margin-top: 10px;
  font-size: 0.8em;
  color: #ccc;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    margin-top: 0;
  }

  a {
    color: #ccc;
    text-decoration: underline;

    &:hover {
      color: white;
    }
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownBox = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  max-width: 250px;
  text-align: center;
  z-index: 10;
  white-space: normal;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  ${DropdownContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }

  /* Prevent going outside the screen */
  @media (max-width: 768px) {
    left: auto;
    right: 0;
    transform: none;
  }
`;

const SupportLink = styled.a`
  cursor: pointer;
  color: #a7a9ac;
  text-decoration: none;
  display: inline-block;
  position: relative;

  &:hover {
    color: #55e6a5;
  }
`;



export default function Footer2() {
 const[opennavbar,setOpennavbar]=useState(true);
  const[openpop,setopenpop]=useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const pathsToHideNavbar = [
    'assessment',
    'login',
    'dashboard',
    'employees',
    'attendance-tracking',
    'leave-management',
    'holidays',
    'timesheet',
    'shifts',
    'appointees',
    'analytics',
    'helpdesk',
    "requestdesk",
    "profile",
    "claims",
    "payslip",
  ];
  
  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.pathname;
      const shouldHideNavbar = pathsToHideNavbar.some(path => currentPath.includes(path));
      setOpennavbar(!shouldHideNavbar);
    };
  
    checkPath();
  
    const handlePopState = () => {
      checkPath();
    };
  
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
    {opennavbar&&<div>
    <FooterContainer>
      <FooterLeft>
      <NewsletterContainer>
      <LogoContainer>
        <img src={logo} alt="AtomWalk Logo" />
      </LogoContainer>
      
      <TextContainer>
      Connect with  Atomwalk Technologies 
      </TextContainer>
      
      {/* <FormContainer>
        <InputField type="email" placeholder="Email*" required />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer> */}

    </NewsletterContainer>
    <ContactInfo>
  <div>
    <a href="mailto:info@atomwalk.com">
      <img src={Email} alt="AtomWalk Logo" />
      info@atomwalk.com
    </a>
  </div>
  <div>
    <a href="tel:+917259555003">
      <img src={Phone} alt="AtomWalk Logo" />
      +91-7259555003
    </a>
  </div>
</ContactInfo>
    {/* <DisclaimerText>
        By providing your information, you hereby consent to the AtomWalk <a href="#">Cookie Policy</a> and <a href="#">Privacy Policy</a>.
      </DisclaimerText> */}
      </FooterLeft>



      <FooterLinksContainer>
        <FooterLinks>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/aboutUs.html">About Us</a>
            </li>
            <li>
              <a href="/Product.html">Products</a>
            </li>
            <li>
              <a href="/contactUs.html">Contact Us</a>
            </li>
          </ul>
        </FooterLinks>

        <FooterLinks>
          <h3>Products</h3>
          <ul>
            <li>
              <a href="/crm.html">Customer Relationship Management</a>
            </li>
            <li>
              <a href="/hrm.html">Human Resource Management</a>
            </li>
            <li>
              <a href="/lms.html">Lab Management System</a>
            </li>
            <li>
              <a href="/Product.html">Enterprise Resource Planning</a>
            </li>
          </ul>
        </FooterLinks>
        <FooterLinks>
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="/Blog.html">Blog</a>
            </li>
            <li>
                  <DropdownContainer>
                    <SupportLink href="/manual.html">
                      Manual
                    </SupportLink>
                    <DropdownBox>
                      Access the manual for step-by-step instructions and guidance.
                    </DropdownBox>
                  </DropdownContainer>
                </li>
            <li>
              {/* <a    onClick={()=>{setopenpop(!openpop)}}>Tutorials</a> */}
            </li>
            <li>
              <a  href="/faq.html">FAQs</a>
            </li>
            <li>
              <a href="/Careers.html">Career</a>
            </li>
          </ul>
        </FooterLinks>
      </FooterLinksContainer>
    </FooterContainer>
    <FooterBottom>
      <div style={{padding:"25px"}}>
        <p>© 2024 Atomwalk. All Rights Reserved.</p>
        <p>
      <a href="/privacy-policy.html" style={{ color: "white", textDecoration: "none" }}>Privacy Policy</a> |  
      <a href="/terms-and-conditions.html" style={{ color: "white", textDecoration: "none" }}> Terms & Conditions</a> |  
      <a href="/disclaimer.html" style={{ color: "white", textDecoration: "none" }}> Disclaimer</a> |  
      Made with <span>♥</span> Atomwalk
    </p>
        <div style={{marginTop:"5px"}} className="social-icon">
              <a href="https://www.linkedin.com/company/atomwalk-technologies"><img src={navIcon1} alt="linkedin" /></a>
              <a href="https://www.facebook.com/profile.php?id=61572466203683"><img src={navIcon2} alt="facebook" /></a>
              <a href="https://www.instagram.com/atomwalktechnologies"><img src={navIcon3} alt="instagram" /></a>
              <a href="https://www.youtube.com/@AtomwalkTechnologies"><img src={navIcon4} alt="youtube" /></a>
              {/* <a href="https://www.instagram.com/atomwalktechnologies/"><img src={navIcon3} alt="Icon" /></a> */}
            </div>
            </div>
      </FooterBottom>
      </div>}
      {/* </div>:<FooterBottom>
      <div style={{padding:"25px"}}>
        <p>© 2024 Atomwalk. All Rights Reserved.</p>
        <p>
          Made with <span>♥</span> Atomwalk
        </p>
            </div>
      </FooterBottom>} */}
      <UnderConstructionPopup visible={openpop} setvisible={setopenpop}></UnderConstructionPopup>
      </>
  );
}
