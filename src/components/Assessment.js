import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';


// Animations for modern design
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled-components for light and modern design
const AppContainer = styled.div`
  text-align: center;
  background: linear-gradient(135deg ,rgb(244, 243, 243) 50%,  rgb(186, 219, 248) 100%);
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1.5s ease-in;
`;

const FormContainer = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 350px;
  animation: ${slideUp} 1.5s ease-in;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin: 0.8rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6a11cb;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
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
  width: 90%;
  max-width: 900px;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 2s ease-in;
`;

const Heading = styled.h1`
  /* font-size: 2rem; */
  margin-bottom: 6.5rem;
  font-weight: 600;
  color:#454545;
  animation: ${slideUp} 1s ease-in;
`;
const Timer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1000;
`;





const Assessment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const navigate = useNavigate();
  const validTokens = ["atomwalk@8458", "atomwalk@9937", "atomwalk@1693"];

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
  
    if (!validTokens.includes(token)) {
      alert('Token not matched! Please enter a valid token.');
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
  // Timer Countdown Logic
  useEffect(() => {
    let timer;
    if (isRegistered) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            navigate('/thankyou.html', { replace: true }); // Navigate when time is up
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup on component unmount
  }, [isRegistered, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTabChange = () => {
    alert('Tab switching is not allowed. Closing the page.');
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      // document.body.appendChild(video);
    });
    navigate('/thankyou.html', { replace: true });
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
      <Heading>Kickstart Your Career with Atomwalk: Campus Hiring 2025</Heading>
      {isRegistered && <Timer>Time Left: {formatTime(timeLeft)}</Timer>}
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
            src={token=="atomwalk@8458"?"https://docs.google.com/forms/d/e/1FAIpQLScAitRvhFeqZLMfwlQEFzcwdHTaRrFHl78oZYWKGEizYpUAgQ/viewform":token=="atomwalk@9937"?"https://forms.gle/eRYrGeCqY677cmhm9":token=="atomwalk@1693"?"https://forms.gle/grABZrm9vptzTcWb6":"https://www.sumydesigns.com/wp-content/uploads/2018/08/thank-you-page.jpg"}
            title="Assessment Form"
            width="100%"
            height="600"
            style={{ border: 'none' }}
          ></iframe>
        </IframeContainer>
      )}
    </AppContainer>
  );
};

export default Assessment;