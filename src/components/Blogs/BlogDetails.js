import React from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useBlog } from '../hooks/useBlog';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const drawLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100px;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const typewriter = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

// Main Container
const PageContainer = styled.div`
  min-height: 100vh;
  background: #fafafa;
  font-family: 'Georgia', 'Times New Roman', serif;
  color: #2c2c2c;
`;

// Header Section
const HeaderSection = styled.section`
  background: #ffffff;
  padding: 140px 0 60px 0;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  }

  @media (max-width: 768px) {
    padding: 120px 20px 40px 20px;
  }
`;

const HeaderContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const CategoryLabel = styled.span`
  display: inline-block;
  padding: 8px 24px;
  background: #ff6b6b;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 2px;
  margin-bottom: 30px;
  animation: ${fadeInUp} 0.8s ease-out;
  font-family: 'Arial', sans-serif;
`;

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 25px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
  font-style: italic;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 50px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 0.9rem;

  .label {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value {
    color: #333;
    font-weight: 400;
  }

  &::after {
    content: '•';
    margin-left: 15px;
    color: #ddd;
  }

  &:last-child::after {
    display: none;
  }

  @media (max-width: 768px) {
    &::after {
      display: none;
    }
  }
`;

const FeaturedImageSection = styled.section`
  background: #ffffff;
  padding: 0 0 80px 0;
`;

const ImageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  animation: ${fadeInUp} 1s ease-out 0.8s both;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  transition: all 0.6s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    height: 300px;
    border-radius: 4px;
  }
`;

// Content Section
const ContentSection = styled.section`
  background: #ffffff;
  padding: 80px 0 100px 0;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ArticleContent = styled.article`
  line-height: 1.8;
  font-size: 1.125rem;
  color: #333;
`;

const ContentBlock = styled.div`
  margin-bottom: 60px;
  animation: ${fadeInUp} 0.8s ease-out;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeading = styled.h2`
  font-size: 2.25rem;
  font-weight: 400;
  color: #1a1a1a;
  margin: 60px 0 30px 0;
  position: relative;
  padding-bottom: 15px;
  line-height: 1.3;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
    animation: ${drawLine} 1s ease-out;
  }

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c2c2c;
  margin: 40px 0 20px 0;
  line-height: 1.4;
  position: relative;
  padding-left: 25px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 4px;
    height: 20px;
    background: #ff6b6b;
    border-radius: 2px;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 25px;
  text-align: justify;
  hyphens: auto;
  line-height: 1.8;

  &:first-of-type::first-letter {
    float: left;
    font-size: 4rem;
    line-height: 0.8;
    padding: 8px 12px 0 0;
    color: #ff6b6b;
    font-weight: 700;
    font-family: 'Georgia', serif;
  }
`;

const RegularParagraph = styled.p`
  margin-bottom: 25px;
  text-align: justify;
  hyphens: auto;
  line-height: 1.8;
`;

const StyledList = styled.ul`
  margin: 30px 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding: 15px 0 15px 35px;
    margin-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.3s ease;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      top: 15px;
      color: #ff6b6b;
      font-weight: bold;
      font-size: 1.2rem;
    }

    &:hover {
      background: #fafafa;
      padding-left: 40px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const NumberedList = styled.ol`
  margin: 30px 0;
  padding: 0;
  list-style: none;
  counter-reset: item;

  li {
    counter-increment: item;
    position: relative;
    padding: 20px 0 20px 60px;
    margin-bottom: 20px;
    background: #f8f9fa;
    border-left: 4px solid #4ecdc4;
    border-radius: 0 8px 8px 0;
    transition: all 0.3s ease;

    &::before {
      content: counter(item);
      position: absolute;
      left: 15px;
      top: 18px;
      width: 30px;
      height: 30px;
      background: #4ecdc4;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.9rem;
      font-family: 'Arial', sans-serif;
    }

    &:hover {
      background: #f0f8ff;
      transform: translateX(5px);
      box-shadow: 0 5px 15px rgba(78, 205, 196, 0.2);
    }
  }
`;

const ContentImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 40px 0;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
  }
`;

const ReadingProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  z-index: 1000;
  transition: width 0.3s ease;
`;

// Loading States
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fafafa;
  color: #333;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-radius: 50%;
  border-top-color: #ff6b6b;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  color: #666;
  background: linear-gradient(90deg, #666 25%, #333 50%, #666 75%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 2s infinite;
  font-family: 'Arial', sans-serif;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fafafa;
  color: #333;
  text-align: center;
  padding: 0 20px;

  h2 {
    font-size: 2rem;
    margin-bottom: 16px;
    color: #ff6b6b;
    font-weight: 400;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    font-family: 'Arial', sans-serif;
  }
`;

const BlogDetail = () => {
  const { id } = useParams();
  const { blog, blogContent, loading, error } = useBlog(id);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading article...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <h2>Article Unavailable</h2>
        <p>{error}</p>
      </ErrorContainer>
    );
  }

  if (!blog || !blogContent) {
    return (
      <ErrorContainer>
        <h2>Article Not Found</h2>
        <p>The article you're looking for could not be found.</p>
      </ErrorContainer>
    );
  }

  const renderContent = (content, isFirst = false) => {
    switch (content.type) {
      case 'paragraph':
        return isFirst ? 
          <Paragraph>{content.data}</Paragraph> :
          <RegularParagraph>{content.data}</RegularParagraph>;
      case 'bullets':
        return (
          <StyledList>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </StyledList>
        );
      case 'steps':
        return (
          <NumberedList>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </NumberedList>
        );
      case 'image':
        return <ContentImage src={content.data} alt="" />;
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <HeaderSection>
        <HeaderContainer>
          <CategoryLabel>{blog.category}</CategoryLabel>
          <MainTitle>{blogContent.header.title}</MainTitle>
          <Subtitle>{blogContent.header.tagline}</Subtitle>
          
          <MetaInfo>
            {/* <MetaItem>
              <span className="label">By</span>
              <span className="value">{blog.author}</span>
            </MetaItem> */}
            <MetaItem>
              <span className="label">Published on:</span>
              <span className="value">{blog.date}</span>
            </MetaItem>
          </MetaInfo>
        </HeaderContainer>
      </HeaderSection>

      <FeaturedImageSection>
        <ImageContainer>
          <FeaturedImage
            src={blogContent.header.coverImage}
            alt={blogContent.header.title}
          />
        </ImageContainer>
      </FeaturedImageSection>

      <ContentSection>
        <ContentWrapper>
          <ArticleContent>
            {blogContent.sections.map((section, sectionIndex) => (
              <ContentBlock key={sectionIndex}>
                {section.title && <SectionHeading>{section.title}</SectionHeading>}
                {section.subtitle && <SubHeading>{section.subtitle}</SubHeading>}
                <div>
                  {section.contents.map((content, contentIndex) => (
                    <div key={contentIndex}>
                      {renderContent(content, sectionIndex === 0 && contentIndex === 0)}
                    </div>
                  ))}
                </div>
              </ContentBlock>
            ))}
          </ArticleContent>
        </ContentWrapper>
      </ContentSection>
    </PageContainer>
  );
};

export default BlogDetail;