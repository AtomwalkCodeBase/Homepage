import React, { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";

// Styled components with improved design
const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background-color: #caf0f8;
`;

const Title = styled.h1`
  font-size: 3.2em;
  margin-bottom: 100px;
  text-align: center;
  color: #2c3e50;
`;

const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 1200px) {
    flex-wrap: nowrap;
  }
`;

const PlanCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 30px;
  width: 100%;
  min-width: 250px;
  text-align: center;
  color: #454545;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  flex: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 1199px) {
    max-width: calc(50% - 15px);
    flex: none;
  }

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const PlanHeader = styled.div`
  padding: 20px 0;
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${props => props.color};
    border-radius: 3px;
  }
`;

const PlanName = styled.h3`
  color: ${props => props.color};
  font-weight: 700;
  font-size: 1.8em;
  margin-bottom: 10px;
`;

const Price = styled.h2`
  font-size: 2.2em;
  margin: 15px 0;
  font-weight: 700;
  color: #2c3e50;
`;

const PriceNote = styled.span`
  font-size: 0.8em;
  color: #7f8c8d;
  display: block;
  margin-top: 5px;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 25px 0;
  text-align: left;
`;

const FeatureItem = styled.li`
  margin: 12px 0;
  padding-left: 25px;
  position: relative;
  font-size: 0.95em;
  line-height: 1.5;
  
  &::before {
    content: "${props => (props.valid ? "✓" : "✗")}";
    position: absolute;
    left: 0;
    color: ${props => (props.valid ? "#27ae60" : "#e74c3c")};
    font-weight: bold;
  }
`;

const Button = styled.button`
  background: ${props => props.color};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 25px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${props => props.hoverColor || props.color};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 15px;
  right: -30px;
  background: #e74c3c;
  color: white;
  padding: 5px 30px;
  font-size: 0.8em;
  font-weight: bold;
  transform: rotate(45deg);
  width: 120px;
  text-align: center;
`;

// Modal styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    padding: "40px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "1000",
  },
};

const ModalContent = styled.div`
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: ${props => props.color || "#2c3e50"};
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  color: #5a6a7e;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.8em;
  cursor: pointer;
  color: #7f8c8d;
  transition: all 0.2s ease;
  
  &:hover {
    color: #e74c3c;
    transform: rotate(90deg);
  }
`;

// Pricing plans data
const pricingPlans = {
  IN: [
    { 
      name: "Free Trial", 
      price: "₹0", 
      period: "/month",
      pricePerUser: false,
      message: "No credit card required", 
      userAccess: "3 User Access", 
      validity: "30 days Validity", 
      space: "20MB Storage Space", 
      multiBranch: false, 
      color: "red",
      buttonColor: "red",
      popular: false
    },
    { 
      name: "Basic", 
      price: "₹5,000", 
      period: "/month",
      pricePerUser: false,
      message: "Billed at ₹50,000 per year", 
      userAccess: "5 User Access", 
      validity: "1 Year Validity", 
      space: "200MB Storage Space", 
      multiBranch: false, 
      color: "#2196f3",
      buttonColor: "#2196f3",
      popular: false
    },
    { 
      name: "Premium", 
      price: "₹10,000", 
      period: "/month",
      pricePerUser: false,
      message: "Billed at ₹100,000 per year", 
      userAccess: "10 User Access", 
      validity: "1 Year Validity", 
      space: "500MB Storage Space", 
      multiBranch: true, 
      color: "orange",
      buttonColor: "orange",
      popular: true
    },
    { 
      name: "Ultimate", 
      price: "₹25,000", 
      period: "/month",
      pricePerUser: false,
      message: "Billed at ₹250,000 per year", 
      userAccess: "25 User Access", 
      validity: "1 Year Validity", 
      space: "1.2GB Storage Space", 
      multiBranch: true, 
      color: "#800080",
      buttonColor: "#800080",
      popular: false
    }
  ],
  US: [
    { 
      name: "Free Trial", 
      price: "$0", 
      period: "/month",
      pricePerUser: false,
      // message: "No credit card required", 
      userAccess: "3 User Access", 
      validity: "30 days Validity", 
      space: "20MB Storage Space", 
      multiBranch: false, 
      color: "red",
      buttonColor: "red",
      popular: false
    },
    { 
      name: "Basic", 
      price: "$99", 
      period: "/month",
      pricePerUser: false,
      // message: "Billed at $663 per year", 
      userAccess: "5 User Access", 
      validity: "1 Year Validity", 
      space: "200MB Storage Space", 
      multiBranch: false, 
      color: "#2196f3",
      buttonColor: "#2196f3",
      popular: false
    },
    { 
      name: "Premium", 
      price: "$199", 
      period: "/month",
      pricePerUser: false,
      // message: "Billed at $1,325 per year", 
      userAccess: "10 User Access", 
      validity: "1 Year Validity", 
      space: "500MB Storage Space", 
      multiBranch: true, 
      color: "orange",
      buttonColor: "orange",
      popular: true
    },
    { 
      name: "Ultimate", 
      price: "$399", 
      period: "/month",
      pricePerUser: false,
      // message: "Billed at $3,314 per year", 
      userAccess: "25 User Access", 
      validity: "1 Year Validity", 
      space: "1.2GB Storage Space", 
      multiBranch: true, 
      color: "#800080",
      buttonColor: "#800080",
      popular: false
    }
  ]
};

const Pricing = ({ region = "IN" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = pricingPlans[region] || pricingPlans.IN;

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const requestDemo = () => {
    window.location.href = '/demo.html';
  };

  return (
    <PricingContainer>
      <Title>Pick the plan that’s right for you</Title>
      {/* <Subtitle>
        Choose the perfect HRM solution tailored for your organization's needs. 
        All plans include our support and continuous updates.
      </Subtitle> */}
      
      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanCard key={index}>
            {plan.popular && <PopularBadge>POPULAR</PopularBadge>}
            <PlanHeader color={plan.color}>
              <PlanName color={plan.color}>{plan.name}</PlanName>
              <Price>
                {plan.price}<PriceNote>{plan.period}</PriceNote>
              </Price>
              {plan.message && <p style={{ color: "#7f8c8d", fontSize: "0.9em" }}>{plan.message}</p>}
            </PlanHeader>
            
            <FeatureList>
              <FeatureItem valid>{plan.userAccess}</FeatureItem>
              <FeatureItem valid>{plan.validity}</FeatureItem>
              <FeatureItem valid>{plan.space}</FeatureItem>
              <FeatureItem valid={plan.multiBranch}>Multi-Branch Access</FeatureItem>
              <FeatureItem valid>24/7 Support</FeatureItem>
              <FeatureItem valid>Regular Updates</FeatureItem>
            </FeatureList>
            
            <Button 
              color={plan.buttonColor} 
              hoverColor={plan.popular ? "#e67e22" : null}
              onClick={plan.name === "Free Trial" ? requestDemo : () => openModal(plan)}
            >
              {plan.name === "Free Trial" ? "Start Free Trial" : "Get Started"}
            </Button>
          </PlanCard>
        ))}
      </PlansContainer>
      
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <ModalContent>
          <ModalTitle color={selectedPlan?.color}>
            {selectedPlan?.name} Plan Selected
          </ModalTitle>
          <ModalText>
            You've chosen our {selectedPlan?.name} Plan. Click below to proceed with your selection or contact our sales team for more information.
          </ModalText>
          <Button 
            color={selectedPlan?.buttonColor || "#3498db"} 
            onClick={requestDemo}
          >
            Proceed with {selectedPlan?.name} Plan
          </Button>
        </ModalContent>
      </ReactModal>
    </PricingContainer>
  );
};

export default Pricing;