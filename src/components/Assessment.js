import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Styled-components for modern design
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AppContainer = styled.div`
  font-family: 'Arial, sans-serif';
  text-align: center;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1.5s ease-in;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 300px;
  animation: ${fadeIn} 2s ease-in;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  margin-top: 1rem;
  background: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2575fc;
  }
`;

const IframeContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 2s ease-in;
`;


const Assessment = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
  
    // Check localStorage for existing registration
    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setIsRegistered(true);
      }
    }, []);
  
    const handleRegister = () => {
      if (!name || !email || !token) {
        alert('All fields are mandatory!');
        return;
      }
  
      const storedEmail = localStorage.getItem('email');
      if (storedEmail === email) {
        alert('You are already registered!');
      } else {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        alert('Registration successful!');
        setIsRegistered(true);
      }
    };
  
    const handleTabChange = () => {
      alert('Tab switching is not allowed. Closing the page.');
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        document.body.appendChild(video);
      });
      window.close();
    };
  
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          handleTabChange();
        }
      };
  
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);
  
  return (
    <AppContainer>
    <h1>Student Assessment Registration</h1>
    {!isRegistered ? (
      <FormContainer>
        <div>
          <label>Name:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Token Code:</label>
          <Input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter token code"
          />
        </div>
        <Button onClick={handleRegister}>Register</Button>
      </FormContainer>
    ) : (
      <IframeContainer>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScAitRvhFeqZLMfwlQEFzcwdHTaRrFHl78oZYWKGEizYpUAgQ/viewform"
          title="Assessment Form"
          width="100%"
          height="600"
          style={{ border: 'none' }}
        ></iframe>
      </IframeContainer>
    )}
  </AppContainer>
  )
}

export default Assessment
