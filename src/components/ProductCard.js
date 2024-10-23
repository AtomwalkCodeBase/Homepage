import React from 'react';
import styled from 'styled-components';
import Product from './../assets/img/Projectmange.jpg'
import Inventory from './../assets/img/inventory management.jpg'
import Process from './../assets/img/Process Templates.jpg'
import Sales from './../assets/img/Sales and Procurement.jpg'

// Main container for the entire section
const SectionContainer = styled.section`
  padding: 40px 20px;
  text-align: center;
  background-color: #ddf5ff;
`;

// Title of the section
const SectionTitle = styled.h2`
  font-size: 2.5em;
  font-weight: 600;
  color: #333;
  margin-bottom: 40px;
  
  span {
    color: #9C27B0; /* Purple color for the highlighted text */
  }
`;

// Container for all the content boxes
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

// Individual content box style
const ContentBox = styled.div`
  background-color: ${(props) => props.bgColor || "#f0f0f0"};
  border-radius: 20px;
  padding: 30px;
  max-width: 60%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
  }
  
  @media (max-width: 767px) {
    max-width: 100%;
    flex-direction: column;
    text-align: center;
  }
`;

// Text container inside each content box
const TextContainer = styled.div`
  max-width: 40%;
  text-align: left;

  @media (max-width: 767px) {
    text-align: left;
    max-width: 100%;
  }
`;

// Heading of each content box
const BoxHeading = styled.h3`
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

// Description text in each content box
const BoxText = styled.div`
  color: #666;
  font-size: 1em;
  margin-bottom: 20px;
`;

// Button for the content box
const Button = styled.button`
  background-color: #ea5c49;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
`;

// Image inside the content box
const ImageContainer = styled.div`
  width: 50%;
  text-align: center;
  
  img {
    max-width: 100%;
    height: 300px;
    border-radius: 15px;
    @media (max-width: 768px) {
      height: 100%;
      padding: 10px;
    }
  }
`;

// Decorative elements (circles)
const DecorativeCircle = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #9C27B0;
  border-radius: 50%;
  ${(props) => props.top && `top: ${props.top}; left: ${props.left};`}
  ${(props) => props.bottom && `bottom: ${props.bottom}; right: ${props.right};`}
`;

const ProductCard = () => {
  const demopage =()=>{
    window.location.href='/demo.html'
  }
  return (
    <SectionContainer>
      <SectionTitle>Atomwalk Office ERP connects every aspect of your business into one unified system</SectionTitle>
      <ContentContainer>
        <ContentBox bgColor="#fce4ec">
          <TextContainer>
            <BoxHeading>Project Management</BoxHeading>
            <BoxText>
            <ul>
						<li>Project Activity Allocation Tracking </li>
						<li>Project Activity Dependency (Critical Patch) </li>
						<li>Schedule Tracking</li>
						<li>Item Cost and Effort Tracking</li>
						<li>Efficiency tracking at Activity</li>
						<li>Project Documents, Alert management</li>
						<li>Integration with Procurement and PO</li>
						<li>Integration with Inventory Allocation, Wastage and Release</li>
						</ul>
            </BoxText>
            <Button onClick={demopage}>Request a Demo</Button>
          </TextContainer>
          <ImageContainer>
            <img src={Product}alt="Employee engagement" />
          </ImageContainer>
          <DecorativeCircle top="10%" left="80%" />
          <DecorativeCircle bottom="5%" right="10%" />
        </ContentBox>

        <ContentBox bgColor="#e0f7fa">
          <ImageContainer>
            <img src={Inventory} alt="Performance management" />
          </ImageContainer>
          <TextContainer>
            <BoxHeading>Performance management system</BoxHeading>
            <BoxText>
            <ul>
						<li>Item Category and Group </li>
						<li>Inventory Item and Service Item </li>
						<li>Item Supplier management</li>
						<li>Multiple locations</li>
						<li>Multiple Units </li>
						<li>Warehouse management (Bin Locations)</li>
						<li>Item Serial Number handling</li>
						<li>Item physical inspection and open balance</li>
						<li>Item min order qty and Expiry date tracking</li>
						</ul>
            </BoxText>
            <Button>Experience Live Demo</Button>
          </TextContainer>
          <DecorativeCircle top="20%" left="5%" />
          <DecorativeCircle bottom="10%" right="70%" />
        </ContentBox>
        <ContentBox bgColor="#f6eaff">
          <TextContainer>
            <BoxHeading>Process Templates</BoxHeading>
            <BoxText>
            <ul>
						<li>Activity Definition with User group</li>
						<li>Equipment and Document definition for Activity</li>
						<li>Process definition for a Product</li>
						<li>Process Activity Dependency</li>
						<li>Process items and Bill of Material</li>
						</ul>
            </BoxText>
            <Button onClick={demopage}>Request a Demo</Button>
          </TextContainer>
          <ImageContainer>
            <img src={Process}alt="Employee engagement" />
          </ImageContainer>
          <DecorativeCircle top="10%" left="80%" />
          <DecorativeCircle bottom="5%" right="10%" />
        </ContentBox>
        <ContentBox bgColor="#ffeadf">
          <ImageContainer>
            <img src={Sales} alt="Performance management" />
          </ImageContainer>
          <TextContainer>
            <BoxHeading>Sales and Procurement</BoxHeading>
            <BoxText>
            <ul>
						<li>Sales order, quotation, proforma invoice </li>
						<li>Tax Invoice </li>
						<li>Payment, GST Tracking, TDS handling</li>
						<li>Return, Credit note handling</li>
						<li>Purchase Order, Purchase requests</li>
						<li>Goods Receipt (GRN)</li>
						<li>Goods Return/Shortage/ Debit Note</li>
						<li>Purchase Service Order, TDS handling</li>
						</ul>
            </BoxText>
            <Button>Experience Live Demo</Button>
          </TextContainer>
          <DecorativeCircle top="20%" left="5%" />
          <DecorativeCircle bottom="10%" right="70%" />
        </ContentBox>
      </ContentContainer>
    </SectionContainer>
  );
};

export default ProductCard;
