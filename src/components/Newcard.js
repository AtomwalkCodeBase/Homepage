import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";

const Manwarp = styled.div`
  position: relative; /* Establishes a containing block for the pseudo-elements */
  border: 3px solid #007cc3;
  width: 300px;
  height: 387px;
  overflow: hidden; /* Ensures the image doesn't overflow the component's borders */
  margin-bottom: 24px;
  border-radius: 10px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.3s ease; /* Adds a smooth transition effect */
    z-index: 1; /* Positions the image behind the color overlay */
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background-color: rgba(10, 23, 54, 0.5);  Semi-transparent color overlay */
    box-shadow: inset -1px 5px 61px 23px #305cc380;
    z-index: 2; /* Positions the color overlay above the image */
  }

  &:hover::before {
    transform: scale(1.05); /* Scales the image slightly on hover */
  }
`;
// const Maintext = styled.div`
// margin-top: 10px;
//   padding-left: 20px;
//   position: absolute;
//   color: black;
//   font-family: Centra;
//   font-size: 33px;
//   line-height: 1.1;
//   font-weight: 500;
//   z-index: 3;
// `;
const Buttonexp = styled.div`
  position: absolute;
  border: 2px solid white;
  height: 40px;
  z-index: 4;
  bottom: 12px;
  right: 8px;
  width: 108px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    animation: slideBg 450ms forwards;
    border:2px solid white;
  }

  @keyframes slideBg {
    from {
      background-position: 0% 0;
    }
    to {
      background-position: 100% 0;
    }
  }

  background: linear-gradient(to right , #0a1736 50%, #007cc3 50%);
  background-size: 200% 100%;
  transition: background-position 1s;
`;
const MainDiv=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

`
// Card container for each individual card
const Card = styled.div`
  background-color: ${props=>props.color}; /* Light yellowish background */
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 520px;
  /* width: 100%; */
  /* max-width: 300px; */
  /* max-height: 500px; */
  margin: 10px;
  @media (min-width: 768px) {
    width: 90%; /* Adjust width for desktop */
  }
`;

// Container for all cards
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const CardImage = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5em;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 1em;
  color: #666;
  margin-bottom: 20px;
  width: 80%;
`;

const CardLink = styled.a`
  font-size: 1em;
  color: #ea5c49; /* Purple color */
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    color: #ee442d;
  }
`;
const Newcard = (props) => {
  return (

    <Col style={{margin:"-2px"}} size={5} sm={6} md={4}>
    <MainDiv>
    <Card color={props?.project?.background}>
        <CardImage src={props.image} alt="greytHR Academy" />
        <CardTitle>{props?.project?.title}</CardTitle>
        <CardDescription>
          {props?.project?.description}
        </CardDescription>
        <CardLink href="/product.html">Know More</CardLink>
      </Card>
    </MainDiv>
       </Col>

  );
};

export default Newcard;
