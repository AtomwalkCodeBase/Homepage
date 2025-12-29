import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFlask, FaUser, FaLock, FaShieldAlt, FaMicroscope, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e9 0%, #81c784 100%);
  position: relative;
  overflow: hidden;
  padding-top: 7vh; 
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// const PageBackground = styled.div`
//   min-height: 100vh;
//   background: url("https://raw.githubusercontent.com/AtomwalkCodeBase/Homepage/82e1ca7ffbf075279ba12e86846043a8ca20216a/src/assets/img/login_bg2.png") no-repeat center center fixed;
//   background-size: cover;
//   position: relative;
//   overflow: hidden;
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: 
//       radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
//       radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
//       radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
//     pointer-events: none;
//     backdrop-filter: blur(5px);
//   }
// `

const LoginContainer = styled.div`
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 100%;
  max-width: 950px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 550px;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-width: 420px;
    min-height: auto;
  }
`;

const BrandSection = styled.div`
  background: linear-gradient(135deg, #66bb6a, #43a047);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: ${float} 6s ease-in-out infinite;
  }

  @media (max-width: 968px) {
    padding: 2rem 1.5rem;
    min-height: 220px;
  }
`;

const BrandContent = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
`;

const LogoIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
  
  svg {
    font-size: 50px;
    color: white;
  }
  
  @media (max-width: 968px) {
    width: 80px;
    height: 80px;
    
    svg {
      font-size: 40px;
    }
  }
`;

const BrandTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 968px) {
    font-size: 2rem;
  }
`;

const BrandSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.95;
  margin-bottom: 2rem;
  font-weight: 300;

  @media (max-width: 968px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 320px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(5px);
  }

  svg {
    font-size: 1.3rem;
  }

  span {
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

const FormSection = styled.div`
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;

  @media (max-width: 968px) {
    padding: 2.5rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const FormSubtitle = styled.p`
  color: #718096;
  font-size: 0.95rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #66bb6a;
  z-index: 1;
  font-size: 1.1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f7fafc;

  &:focus {
    outline: none;
    border-color: #66bb6a;
    box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.1);
    background: white;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  color: #66bb6a;
  font-size: 0.875rem;
  text-decoration: none;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #43a047;
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #66bb6a, #43a047);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 187, 106, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(102, 187, 106, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #718096;
`;

function App() {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { labLogin } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('Login attempt:', formData);

    try {
      
      if(formData.userId && formData.password){
        const userData = {
          username: formData.userId,
          password: formData.password
        }
        await labLogin(userData);
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.")
      
    }finally{
      setLoading(false)
    }


    
    // setTimeout(() => {
    //   alert(`Login attempt with User ID: ${formData.userId}`);
    //   setLoading(false);
    // }, 500);
  };

  return (
    <PageBackground>
      <LoginContainer>
        <LoginCard>
          <BrandSection>
            <BrandContent>
              <LogoIcon>
                <FaFlask />
              </LogoIcon>
              <BrandTitle>Lab Management System</BrandTitle>
              <BrandSubtitle>
                Comprehensive Lab Management Solution
              </BrandSubtitle>
              <FeatureGrid>
                <FeatureCard>
                  <FaMicroscope />
                  <span>Sample Management</span>
                </FeatureCard>
                <FeatureCard>
                  <FaShieldAlt />
                  <span>Secure & Reliable</span>
                </FeatureCard>
                <FeatureCard>
                  <FaChartLine />
                  <span>Analytics & Reports</span>
                </FeatureCard>
              </FeatureGrid>
            </BrandContent>
          </BrandSection>

          <FormSection>
            <FormContainer>
              <FormHeader>
                <FormTitle>Welcome Back</FormTitle>
                <FormSubtitle>Please sign in to your account</FormSubtitle>
              </FormHeader>

              <div>
                <FormGroup>
                  <FormLabel htmlFor="userId">User ID</FormLabel>
                  <InputContainer>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <StyledInput
                      type="text"
                      id="userId"
                      name="userId"
                      placeholder="Enter your user ID"
                      value={formData.userId}
                      onChange={handleChange}
                      required
                    />
                  </InputContainer>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputContainer>
                    <InputIcon>
                      <FaLock />
                    </InputIcon>
                    <StyledInput
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </InputContainer>
                </FormGroup>

                <ForgotPassword>Forgot Password?</ForgotPassword>

                <SubmitButton 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </SubmitButton>

                <FormFooter>
                  © 2025 Lab Management System. All rights reserved.
                </FormFooter>
              </div>
            </FormContainer>
          </FormSection>
        </LoginCard>
      </LoginContainer>
    </PageBackground>
  );
}

export default App;