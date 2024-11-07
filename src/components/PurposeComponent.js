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
  max-width: 50%;
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
    <HeaderTitle>Our Mission</HeaderTitle>
    <HeaderSubtitle>
      Empower a new generation of entrepreneurs to pursue their visions and drive positive change for themselves, their communities, and the world.
    </HeaderSubtitle>
  </HeaderSection>
  <ContentSection>
    <ImageWrapper>
      <Image src={Team} alt="Dedicated Team of Innovators" />
    </ImageWrapper>
    <TextContent>
      <SectionTitle>Our Approach</SectionTitle>
      <Feature>
        <FeatureTitle>Inspire.</FeatureTitle>
        <FeatureDescription>
          We connect deeply with our customers’ visions and use creativity, technology, and dedication to bring their ideas to life.
        </FeatureDescription>
      </Feature>
      <Feature>
        <FeatureTitle>Take Bold Steps.</FeatureTitle>
        <FeatureDescription>
          We embrace courage in all we do, pushing boundaries and meeting challenges head-on with confidence.
        </FeatureDescription>
      </Feature>
      <Feature>
        <FeatureTitle>Think Like Owners.</FeatureTitle>
        <FeatureDescription>
          We treat every project as our own, constantly refining, innovating, and creating new solutions that drive progress.
        </FeatureDescription>
      </Feature>
    </TextContent>
  </ContentSection>
</Container>

  );
};

export default PurposeComponent;
