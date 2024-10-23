import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { MailchimpForm } from "./MailchimpForm";
import axios from "axios";

export const Contact = ({setShowsuccess}) => {
let currentDate = new Date();
let day = ("0" + currentDate.getDate()).slice(-2);  // Get current day
let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);  // Get current month
let year = currentDate.getFullYear();
// Format as DD-MM-YYYY
let formattedDate = `${day}-${month}-${year}`;
  const formInitialDetails = {
    name: "",
    company_name: "",
    task_name: "",
    mobile_number: "",
    email_id: "",
    add_task: "N",
    task_type: "Get In Touch",
    task_date: formattedDate
}
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
console.log(formDetails,"look at ne")
  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }
   const endpoint = 'https://www.atomwalk.com/api';
   const addLead =(e)=> {
    e.preventDefault();
    setButtonText("Sending...");
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
        setButtonText("Send");
        setFormDetails(formInitialDetails);
        setShowsuccess(true)
      }
    } catch (error) {
      console.log('Error making authenticated API call:', error);
      setButtonText("Send");
      setFormDetails(formInitialDetails);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setButtonText("Sending...");
  
  //   // Get the token from localStorage
  //   let token = localStorage.getItem('apiResponse');
  
  //   // If the token is not found, throw an error or handle accordingly
  //   if (!token) {
  //     console.error('Token not found, please login.');
  //     setStatus({ succes: false, message: 'Token not found, please login.' });
  //     setButtonText("Send");
  //     return;
  //   }
  
  //   try {
  //     // Parse the token JSON string
  //     let parsedToken = JSON.parse(token);
  //     // Make the API request
  //     let response = await fetch("https://www.atomwalk.com/api/add_lead/DB_PMA_00001", {
  //       method: "POST",
  //       headers: {
  //         'Authorization': `Token ${parsedToken.key}`, // Correctly access the `key` from the parsed token
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formDetails),
  //     });
  
  //     // Parse the response
  //     let result = await response.json();
  
  //     // Reset form details
  //     setFormDetails(formInitialDetails);
  
  //     // Handle success and error response codes
  //     if (result.code === 200) {
  //       setStatus({ succes: true, message: 'Message sent successfully' });
  //     } else {
  //       setStatus({ succes: false, message: 'Something went wrong, please try again later.' });
  //     }
  
  //   } catch (error) {
  //     // Handle any errors during the fetch request or token parsing
  //     console.error('Error:', error);
  //     setStatus({ succes: false, message: 'An error occurred, please try again later.' });
  //   } finally {
  //     // Reset the button text regardless of the outcome
  //     setButtonText("Send");
  //   }
  
  //   // console.log(JSON.parse(token.key), "looppp");
  // };
  

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
               <form onSubmit={addLead}> 
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.name} placeholder="First Name" onChange={(e) => onFormUpdate('name', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.company_name} placeholder="Company Name" onChange={(e) => onFormUpdate('company_name', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" value={formDetails.email_id} placeholder="Email Address" onChange={(e) => onFormUpdate('email_id', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" value={formDetails.mobile_number} placeholder="Phone No." onChange={(e) => onFormUpdate('mobile_number', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" value={formDetails.task_name} placeholder="Message" onChange={(e) => onFormUpdate('task_name', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                 </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
