import React, { useState } from "react";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const toastSlideIn = keyframes`
  from { opacity: 0; transform: translateX(100px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(228, 28, 57, 0.4); }
  50% { box-shadow: 0 0 0 15px rgba(228, 28, 57, 0); }
`;

// Page Wrapper
const Wrapper = styled.section`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Grid = styled.div`
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  animation: ${fadeInUp} 0.7s ease;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

// Left Content
const Content = styled.div`
  animation: ${slideInRight} 0.8s ease;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff5f5;
  border: 1px solid #fecdd3;
  color: #e41c39;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
`;

const ChipDot = styled.span`
  width: 7px;
  height: 7px;
  background: #e41c39;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const Heading = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.15;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  @media (max-width: 768px) { font-size: 2.2rem; }
`;

const RedText = styled.span`
  color: #e41c39;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #e41c39;
    opacity: 0.2;
    border-radius: 2px;
  }
`;

const Paragraph = styled.p`
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #334155;
  font-weight: 500;
`;

const CheckIcon = styled.span`
  width: 22px;
  height: 22px;
  background: #e41c39;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  flex-shrink: 0;
`;

// Right Form
const FormCard = styled.div`
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 20px 50px rgba(0,0,0,0.06);
  @media (max-width: 768px) { padding: 2rem; }
`;

const FormTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.3rem;
`;

const FormSub = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  outline: none;
  transition: 0.2s;
  box-sizing: border-box;
  background: #f8fafc;
  &::placeholder { color: #cbd5e1; }
  &:focus {
    border-color: #e41c39;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(228,28,57,0.08);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  outline: none;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
  background: #f8fafc;
  font-family: inherit;
  &::placeholder { color: #cbd5e1; }
  &:focus {
    border-color: #e41c39;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(228,28,57,0.08);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: #e41c39;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  margin-top: 0.5rem;
  letter-spacing: 0.3px;
  &:hover {
    background: #c41230;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(228,28,57,0.25);
  }
  &:active { transform: translateY(0); }
`;

// Toast
const ToastBox = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 999;
  animation: ${toastSlideIn} 0.4s ease;
  background: #e41c39;
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 10px 30px rgba(228,28,57,0.3);
`;

const ExpertAdvice = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // const [toast, setToast] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent! We'll contact you soon.");
  };

  return (
    <>
      <Wrapper>
        <Grid>
          <Content>
            <Chip><ChipDot /> Expert Consultation</Chip>
            <Heading>Let's build something <RedText>great</RedText> together</Heading>
            <Paragraph>
              Get personalized guidance from industry experts who understand your challenges and goals.
            </Paragraph>
            <FeatureList>
              <FeatureItem><CheckIcon>✓</CheckIcon> Talk to Sales Experts</FeatureItem>
              <FeatureItem><CheckIcon>✓</CheckIcon> Get a Free Live Demo</FeatureItem>
              <FeatureItem><CheckIcon>✓</CheckIcon> Custom Pricing Options</FeatureItem>
              <FeatureItem><CheckIcon>✓</CheckIcon> Dedicated Support Team</FeatureItem>
            </FeatureList>
          </Content>
          <div>
            <FormCard>
              <FormTitle>Get in touch</FormTitle>
              <FormSub>We'll get back to you within 24 hours.</FormSub>
              <Form onSubmit={handleSubmit}>
                <div><Label>Full Name</Label><Input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required /></div>
                <div><Label>Work Email</Label><Input type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required /></div>
                <div><Label>Message</Label><TextArea name="message" placeholder="Tell us about your requirements..." value={form.message} onChange={handleChange} required /></div>
                <Button type="submit">Send Message →</Button>
              </Form>
            </FormCard>
          </div>
        </Grid>
      </Wrapper>
    </>
  );
};

export default ExpertAdvice;