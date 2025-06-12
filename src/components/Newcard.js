import React, { useState } from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import UnderConstructionPopup from "./UnderConstructionPopup";

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
 const[openpop,setopenpop]=useState(false);
  const handelnavigate=(data)=>{
    if(data==="HR & Payroll"){
      window.location.href="/hrm.html"
    }
    else if(data==="Customer Management"){
       window.location.href="/crm.html"
    }
    else if(data==="Lab Equipment Management System"){
      window.location.href="/labequipmentmangement.html"
   }
   else if(data==="Inventory Management"){
    window.location.href="/inventory.html"
  }
  else if(data==="Project Management"){
    window.location.href="/processandproject.html"
  }
   else if(data==="Lab Management System"){
    window.location.href="/labmanagement.html"
 }
 else if(data==="Good Laboratory Practices"){
  setopenpop(!openpop)
}
    else{
          window.location.href="/product.html"
    }
  }
  return (

    <Col style={{margin:"-2px"}} size={5} sm={6} md={4}>
    <MainDiv onClick={()=>handelnavigate(props?.project?.title)} >
    <Card color={props?.project?.background}>
        <CardImage src={props.image} alt="greytHR Academy" />
        <CardTitle>{props?.project?.title}</CardTitle>
        <CardDescription>
          {props?.project?.description}
        </CardDescription>
        <CardLink onClick={()=>handelnavigate(props?.project?.title)}>Know More</CardLink>
      </Card>
    </MainDiv>
    <UnderConstructionPopup visible={openpop} setvisible={setopenpop}></UnderConstructionPopup>
       </Col>

  );
};

export default Newcard;