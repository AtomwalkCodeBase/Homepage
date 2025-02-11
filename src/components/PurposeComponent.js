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

const VisionSection = styled.div`
  text-align: center;
  margin-top: 50px;
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
    "Empowering organizations by simplifying business complexities, through integrated solutions, for sustainable growth and driving business excellence"
    </HeaderSubtitle>
  </HeaderSection>
  <ContentSection>
    <ImageWrapper>
      <Image src={Team} alt="Dedicated Team of Innovators" />
    </ImageWrapper>
    <TextContent>
      <SectionTitle>Why Choose ATOMWALK?</SectionTitle>
      <Feature>
        <FeatureTitle>Integrated Approach:</FeatureTitle>
        <FeatureDescription>
        How ATOMWALK’s unified solutions eliminate the silos between different business functions, providing a holistic view and seamless experience.
        </FeatureDescription>
      </Feature>
      <Feature>
        <FeatureTitle>Customization:</FeatureTitle>
        <FeatureDescription>
        Tailored solutions that adapt to the unique needs of large organizations.
        </FeatureDescription>
      </Feature>
      <Feature>
        <FeatureTitle>Innovation:</FeatureTitle>
        <FeatureDescription>
        Continuous innovation to stay ahead of industry trends and regulatory changes.
        </FeatureDescription>
      </Feature>
      <Feature>
        <FeatureTitle>Proven Track Record:</FeatureTitle>
        <FeatureDescription>
        Case studies or testimonials from existing large clients demonstrating successful implementations and tangible benefits.
        </FeatureDescription>
      </Feature>
    </TextContent>
  </ContentSection>
  
  <VisionSection>
    <SectionTitle>Our Vision</SectionTitle>
    <FeatureTitle>"Innovating for Tomorrow’s Business Success"</FeatureTitle>
    <HeaderSubtitle>
    To innovate solutions that not only meet today’s business, people and financial compliance needs but also pave the way for tomorrow’s business success and operational excellence.
    </HeaderSubtitle>
    {/* <FeatureDescription>
    To innovate solutions that not only meet today’s business, people and financial compliance needs but also pave the way for tomorrow’s business success and operational excellence.
        </FeatureDescription> */}
  </VisionSection>
</Container>

  );
};

export default PurposeComponent;
