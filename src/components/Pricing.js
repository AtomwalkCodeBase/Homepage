import React from "react";
import styled from "styled-components";
// import colorSharp from "../assets/img/color-sharp.png"
// import colorSharp2 from "../assets/img/color-sharp2.png"
const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #caf0f8;
  /* background-position: left center,right top;
  background-repeat: no-repeat; */
  /* background: linear-gradient(90.21deg, #4a2fbd -5.91%, #aa367c 111.58%); */
`;

const Title = styled.h1`
  font-size: 3.2em;
  margin-bottom: 100px;
  text-align: center;
  color: #2c3e50;
`;
const Title2 = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
`;

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 47px;
    width: 100%;
  }
`;

const PlanCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  text-align: center;
  color: #454545;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;

  @media (min-width: 768px) {
    width: 23%;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: wheat;
  }
`;

const Price = styled.h2`
  font-size: 3em;
  margin: 20px 0;
  font-weight: 800;
  color: #000933;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const FeatureItem = styled.li`
  margin: 10px 0;
  &::before {
    content: "${(props) => (props.valid ? "✓" : "✗")}";
    margin-right: 10px;
    color: ${(props) => (props.valid ? "green" : "red")};
  }
`;
const Message = styled.p`
  font-weight: 500;
`;

const Button = styled.button`
  background-color: #ea5c49;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #ee442d;
  }
`;

const Pricing = () => {
  return (
    <PricingContainer>
      <Title2>PRICING</Title2>
      <Title>Pick the plan that’s right for you</Title>
      <PlansContainer>
        <PlanCard>
          <h3
            style={{ color: "#000933", fontWeight: "800", fontSize: "2.5rem" }}
          >
            Free
          </h3>
          <Price>$0/mo</Price>
          <Message>Seriously, free forever</Message>
          <FeatureList>
            <FeatureItem valid>3 User Access</FeatureItem>
            <FeatureItem valid>30 days Vallidity</FeatureItem>
            <FeatureItem valid>20MB Space</FeatureItem>
            <FeatureItem>Unlimited Projects</FeatureItem>
            <FeatureItem>All Modules</FeatureItem>
          </FeatureList>
          <Button>Sign up for free</Button>
        </PlanCard>
        <PlanCard>
          <h3
            style={{
              color: "rgb(38, 134, 19)",
              fontWeight: "800",
              fontSize: "2.5rem",
            }}
          >
            Plus
          </h3>
          <Price>$19/mo</Price>
          <Message>Billed at $230 per year</Message>
          <FeatureList>
            <FeatureItem valid>30 User Access</FeatureItem>
            <FeatureItem valid>1 Year Validity</FeatureItem>
            <FeatureItem valid>200MB Space</FeatureItem>
            <FeatureItem>Unlimited Projects</FeatureItem>
            <FeatureItem>All Modules</FeatureItem>
          </FeatureList>
          <Button>Start a free trial</Button>
        </PlanCard>
        <PlanCard>
          <h3
            style={{
              color: "rgb(42, 73, 229)",
              fontWeight: "800",
              fontSize: "2.5rem",
            }}
          >
            Pro
          </h3>
          <Price>$79/mo</Price>
          <Message>Billed at $950 per year</Message>
          <FeatureList>
            <FeatureItem valid>100 User Access</FeatureItem>
            <FeatureItem valid>1 Year Vallidity</FeatureItem>
            <FeatureItem valid>500MB Space</FeatureItem>
            <FeatureItem valid>Unlimited Projects</FeatureItem>
            <FeatureItem>All Modules</FeatureItem>
          </FeatureList>
          <Button>Start a free trial</Button>
        </PlanCard>
        <PlanCard>
          <h3
            style={{
              color: "rgb(171, 18, 222)",
              fontWeight: "800",
              fontSize: "2.5rem",
            }}
          >
            Advanced
          </h3>
          <Price>$319/mo</Price>
          <Message>Billed at $3,830 per year</Message>
          <FeatureList>
            <FeatureItem valid>Unlimited User Access</FeatureItem>
            <FeatureItem valid>1 Year Vallidity</FeatureItem>
            <FeatureItem valid>1.2GB Space</FeatureItem>
            <FeatureItem valid>Unlimited Projects</FeatureItem>
            <FeatureItem valid>All Modules</FeatureItem>
          </FeatureList>
          <Button>Start a free trial</Button>
        </PlanCard>
      </PlansContainer>
      {/* <img className="background-image-left" src={colorSharp} alt="Images" /> */}
    </PricingContainer>
  );
};

export default Pricing;
