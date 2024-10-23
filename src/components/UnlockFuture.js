import React from 'react';
import styled from 'styled-components';
import Cloud from './../assets/img/Cloud.webp'
import SubCloud from './../assets/img/Subcloud.webp'

const Container = styled.div`
  background-color: rgb(234 244 255);
  padding: 20px;

  @media (min-width: 768px) {
    padding: 50px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 45px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #7f8c8d;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const TransformLink = styled.a`
  color: #3498db;
  font-size: 16px;
  display: block;
  margin-top: 20px;
  &:hover{
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    font-size: 18px;
    text-decoration:none
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;   /* No padding on mobile screens */
  gap: 0;       /* No gap on mobile screens */

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    padding: 50px 180px 180px 180px;  /* Add padding on larger screens */
    gap: 160px;      /* Add gap on larger screens */
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 50px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  flex: 1;
`;

const HighlightedText = styled.h2`
  font-size: 24px;
  color: #34495e;
  /* font-family: 'Courier New', Courier, monospace; */
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
const Clouds = styled.img`
  display: none; /* Hide the image on mobile screens */

  @media (min-width: 768px) {
    display: block; /* Show the image on larger screens */
    width: 15%;
    float: right;
    margin-top: -177px;
  }
`;


const UnlockFuture = () => {
  return (
<Container>
      <Header>
        <MainTitle>Unlock the Future</MainTitle>
        <Subtitle>
          Revolutionize your business operations with Atomwalk Office's cutting-edge ERP solution
        </Subtitle>
        <TransformLink href="https://www.atomwalk.com/login/">Transform Your Business Today</TransformLink>
      </Header>
      <ContentSection>
        <ImageWrapper>
          <StyledImage src={Cloud} alt="Business Operations" />
        </ImageWrapper>
        <TextWrapper>
          <HighlightedText>
            Elevate Your Business to New Heights with Atomwalk Office's Comprehensive ERP
          </HighlightedText>
          <DescriptionText>
            Discover how Atomwalk Office's cloud-based ERP can streamline your core business
            functions, boost productivity, and drive sustainable growth for your small or medium
            enterprise.
          </DescriptionText>
        </TextWrapper>
      </ContentSection>
      <Clouds src={SubCloud}></Clouds>
    </Container>
  )
}

export default UnlockFuture
