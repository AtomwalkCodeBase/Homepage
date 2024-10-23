import React from 'react';
import styled from 'styled-components';
import BlogImage from './../assets/img/Bloghreos.jpg'; // replace with correct image path
import Pritam from './../assets/img/Pritam.jpg'
import Ashutosh from './../assets/img/Ashutosh.png'

// Main container for the hero section
const HeroSection = styled.section`
  background:linear-gradient(180deg, rgba(255,128,0,1), rgb(255 246 247));/* Horizontal gradient */
  padding: 180px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 40px 20px;
  }
`;

// Text container
const TextContainer = styled.div`
  max-width: 700px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #454545;

  span {
    font-style: italic;
    font-weight: normal;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  line-height: 1.5;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

// Button styles
const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 30px;
  }
`;

const Button = styled.a`
  padding: 12px 24px;
  background-color: ${(props) => (props.primary ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.primary ? '#ff5200' : '#ffffff')};
  border: ${(props) => (props.primary ? 'none' : '2px solid #ffffff')};
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? '#ffb280' : '#ffb280')};
    color: #ffffff;
  }
`;

// Feature list
const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;

  &:before {
    content: "✔";
    color: black;
    margin-right: 10px;
  }
`;

// Image container
const ImageContainer = styled.div`
  position: relative;
  max-width: 470px;
  margin-left: 30px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 20px;
  }
`;

const BlogImageStyled = styled.img`
  width: 100%;
  border-radius: 15px;
`;

const CardContainer = styled.div`
  position: absolute;
  bottom: -63px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Card = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CardText = styled.div`
  font-size: 14px;
  color: #333;
`;

// Main component
const HeroBlog = () => {
  return (
    <HeroSection>
      <TextContainer>
        <Title>Stay Informed with the Latest Updates and <span>Blog Highlight</span></Title>
        <Subtitle>Stay informed with the latest updates and blog highlights, featuring essential insights and expert analysis.</Subtitle>
        <ButtonContainer>
          <Button href="https://play.google.com/store/search?q=atomwalk&c=apps&hl=en" primary>Download Atomwalk Apps</Button>
          <Button href="/demo.html">Try Demo</Button>
        </ButtonContainer>
        <FeatureList>
          <FeatureItem>eliminate repetitive tasks with Jula</FeatureItem>
          <FeatureItem>productive and enthusiastic team member</FeatureItem>
          <FeatureItem>Streamline lead tracking</FeatureItem>
        </FeatureList>
      </TextContainer>

      <ImageContainer>
        <BlogImageStyled src={BlogImage} alt="Blog Preview" />
        <CardContainer>
          <Card>
            <CardImage src={Pritam} alt="User 1" />
            <CardText>
              Ashutosh Mohapatra - Following<br />
              The Impact of Technology on the Workplace: Atomwalk CRM On-the-Go
            </CardText>
          </Card>
          <Card>
            <CardImage src={Ashutosh} alt="User 2" />
            <CardText>
              Pritam Kumar Nayak - Following<br />
              Tips You Must know: Atomwalk HRM On-the-Go
            </CardText>
          </Card>
        </CardContainer>
      </ImageContainer>
    </HeroSection>
  );
};

export default HeroBlog;
