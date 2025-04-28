import React from 'react';
import styled from 'styled-components';

// Main container for the blog content
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// Individual section wrapper
const Section = styled.div`
  margin-bottom: 48px;
`;

// Section heading style
const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #4b0082;
  margin-bottom: 20px;
`;

// Image style for section images
const SectionImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 24px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Paragraph style for text content
const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
  margin-bottom: 16px;
`;

// Unordered list style for list items
const List = styled.ul`
  list-style: disc;
  padding-left: 24px;
  margin: 24px 0;
`;

// List item style
const ListItem = styled.li`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 12px;
  padding-right: 16px; /* Added for longer text */
`;

// Conclusion style with distinct formatting
const Conclusion = styled.p`
  font-size: 1.1rem;
  color: #333;
  font-style: italic;
  margin-top: 24px;
  padding: 16px;
  background-color: #f9f9f9;
  border-left: 4px solid #4b0082;
`;

// Error message style for invalid data
const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #ff0000;
  font-size: 1.2rem;
`;

const BlogPage = ({ blog }) => {
  // Validate blog data
  if (!blog || !blog.content || !Array.isArray(blog.content)) {
    return (
      <Container>
        <ErrorMessage>No content available to display.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {blog.content.map((section, index) => (
        <Section key={`section-${index}`}>
          {/* Render section title */}
          <SectionTitle>{section.sectionTitle}</SectionTitle>
          
          {/* Render image if present and not empty */}
          {section.image && section.image !== '' && (
            <div style={{ textAlign: 'center' }}>
              <SectionImage src={section.image} alt={section.sectionTitle} />
            </div>
          )}
          
          {/* Render paragraphs if present and not empty */}
          {section.paragraphs && section.paragraphs.length > 0 && section.paragraphs.map((para, paraIndex) => (
            <Paragraph key={`para-${index}-${paraIndex}`}>{para}</Paragraph>
          ))}
          
          {/* Render list items if present and not empty */}
          {section.listItems && section.listItems.length > 0 && (
            <List>
              {section.listItems.map((item, itemIndex) => (
                <ListItem key={`item-${index}-${itemIndex}`}>{item}</ListItem>
              ))}
            </List>
          )}
          
          {/* Render conclusion if present */}
          {section.conclusion && <Conclusion>{section.conclusion}</Conclusion>}
        </Section>
      ))}
    </Container>
  );
};

export default BlogPage;