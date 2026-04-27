import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 80px 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 50px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
  text-align: center;
  
  span {
    color: #e41c39;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #e41c39;
    box-shadow: 0 0 0 3px rgba(228, 28, 57, 0.1);
  }

  &:hover {
    border-color: #e41c39;
  }
`;

const TextArea = styled.textarea`
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: #e41c39;
    box-shadow: 0 0 0 3px rgba(228, 28, 57, 0.1);
  }

  &:hover {
    border-color: #e41c39;
  }
`;

const Select = styled.select`
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: #e41c39;
    box-shadow: 0 0 0 3px rgba(228, 28, 57, 0.1);
  }

  &:hover {
    border-color: #e41c39;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #e41c39 0%, #c01630 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-top: 10px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(228, 28, 57, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SuccessCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 50px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: ${slideIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #e41c39;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 50px;
  color: white;
`;

const SuccessTitle = styled.h3`
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 15px;
  font-weight: 700;
`;

const SuccessMessage = styled.p`
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid #e41c39;
  color: #e41c39;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: #e41c39;
    color: white;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.span`
  color: #e41c39;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const PartnershipInquiries = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        partnershipType: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        }

        if (!formData.partnershipType) {
            newErrors.partnershipType = "Please select partnership type";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Partnership inquiry submitted:", formData);
            setShowSuccess(true);
            setIsSubmitting(false);

            // Reset form
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                companyName: "",
                partnershipType: "",
                message: ""
            });

            // Auto close success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }, 1500);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    return (
        <Container>
            <FormWrapper>
                <Title>
                    Partnership <span>Inquiries</span>
                </Title>
                <Subtitle>
                    Let's collaborate and grow together. Fill out the form below and our team will get back to you within 24 hours.
                </Subtitle>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <FormGroup>
                            <Label>Full Name *</Label>
                            <Input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Email Address *</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Label>Phone Number *</Label>
                            <Input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Company Name *</Label>
                            <Input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter your company name"
                            />
                            {errors.companyName && <ErrorMessage>{errors.companyName}</ErrorMessage>}
                        </FormGroup>
                    </Row>

                    <FormGroup>
                        <Label>Partnership Type *</Label>
                        <Select
                            name="partnershipType"
                            value={formData.partnershipType}
                            onChange={handleChange}
                        >
                            <option value="">Select partnership type</option>
                            <option value="strategic">Strategic Partnership</option>
                            <option value="technology">Technology Partnership</option>
                            <option value="channel">Channel/Reseller Partnership</option>
                            <option value="investment">Investment Partnership</option>
                            <option value="other">Other</option>
                        </Select>
                        {errors.partnershipType && <ErrorMessage>{errors.partnershipType}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Message / Additional Information</Label>
                        <TextArea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your partnership ideas, expectations, or any additional information..."
                        />
                    </FormGroup>

                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Inquiry →"}
                    </SubmitButton>
                </Form>
            </FormWrapper>

            {showSuccess && (
                <SuccessOverlay onClick={handleCloseSuccess}>
                    <SuccessCard onClick={(e) => e.stopPropagation()}>
                        <SuccessIcon>
                            ✓
                        </SuccessIcon>
                        <SuccessTitle>Thank You!</SuccessTitle>
                        <SuccessMessage>
                            Your partnership inquiry has been successfully submitted. Our team will review your request and get back to you within 24 hours.
                        </SuccessMessage>
                        <CloseButton onClick={handleCloseSuccess}>
                            Close
                        </CloseButton>
                    </SuccessCard>
                </SuccessOverlay>
            )}
        </Container>
    );
};

export default PartnershipInquiries;