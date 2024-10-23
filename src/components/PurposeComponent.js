import React from 'react';
import styled from 'styled-components';
import Team from './../assets/img/TeamImg.png'

// Styled Components

const Container = styled.div`
  background-color: #f5e9fd; // Light purple background
  padding: 40px 20px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  color: #6a1b9a; // Purple color
  margin-bottom: 10px;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.25rem;
  color: #333333;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  @media(min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 15px;
`;

const TextContent = styled.div`
  text-align: left;
  max-width: 500px;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: #333333;
  margin-bottom: 20px;
`;

const Feature = styled.div`
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #6a1b9a; // Purple color
  margin-bottom: 5px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #555555;
`;

const PurposeComponent = () => {
  return (
    <Container>
      <HeaderSection>
        <HeaderTitle>Our Purpose</HeaderTitle>
        <HeaderSubtitle>
          Help a new wave of entrepreneurs to unleash their ambitions and help them succeed for everyone – themselves, others and the planet.
        </HeaderSubtitle>
      </HeaderSection>
      <ContentSection>
        <ImageWrapper>
          <Image src={Team} alt="Team of Entrepreneurs" />
        </ImageWrapper>
        <TextContent>
          <SectionTitle>How We Do It</SectionTitle>
          <Feature>
            <FeatureTitle>Dream.</FeatureTitle>
            <FeatureDescription>
              We see the dreams through our customers’ eyes and work with intelligence, tech, and passion to make them come true.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureTitle>Be Fearless.</FeatureTitle>
            <FeatureDescription>
              We act on our intuition, make bold moves and eat fear for breakfast.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureTitle>Become Intrapreneurs.</FeatureTitle>
            <FeatureDescription>
              We take ownership of our projects, regularly rewrite processes, challenge conceptions and are idea labs on the move.
            </FeatureDescription>
          </Feature>
        </TextContent>
      </ContentSection>
    </Container>
  );
};

export default PurposeComponent;
