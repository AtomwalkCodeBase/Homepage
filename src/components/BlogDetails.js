import React from 'react';
import styled from 'styled-components';
import BlogPage from './BlogPage';
import HrApp from './../assets/img/HrApp.png'; // Replace with actual path to image

const Container = styled.div`
  background-color: #a000ff; /* Prepped purple color */
  padding: 60px 30px;
  /* border-radius: 12px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  /* margin: 0px 70px 70px 70px; */
  /* margin-top: 130px; */
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-right: 20px;
  
  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 10px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subheading = styled.p`
  color: #ffb3ff;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const MetaInfo = styled.p`
  font-size: 0.9rem;
  color: #ddd;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  text-align: center;
  margin-top:50px;
  
  img {
    max-width: 110%;
    height: auto;
    border-radius: 12px;
  }
`;

const BlogDetails = () => {
  return (
    <div style={{backgroundColor:"white"}}>
    <Container>
    <Content>
      <Heading>Streamline Your HR Processes with ATOMWALK HRM On-The-Go: 
      Attendance, Leave, and Claims Management Simplified </Heading>
      <Subheading>By Atomwalk</Subheading>
      <MetaInfo>6 minute read • October 01, 2024</MetaInfo>
    </Content>
    <ImageWrapper>
      <img src={HrApp} alt="Task Paralysis Article" />
    </ImageWrapper>
  </Container>
  <BlogPage/> 
  </div>
  )
}

export default BlogDetails
