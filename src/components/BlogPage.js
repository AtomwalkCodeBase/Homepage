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

const SubSection = styled.div`
  margin-top: 24px;
  padding-left: 16px;
`;

const SubSectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: #000;
`;

const SubSectionImage = styled(SectionImage)`
  max-width: 60%;
  margin: 20px 0;
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

const SubSectionList = styled.ul`
  list-style: circle; /* Different bullet style */
  padding-left: 32px; /* Slightly more indented */
  margin: 16px 0; /* Tighter margin */
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

          {/* Render subsections if present and not empty */}
          {section.subsections && section.subsections.length > 0 && section.subsections.map((subsection, subIndex) => (
            <SubSection key={`subsection-${index}-${subIndex}`}>
              {/* Render subsection title */}
              <SubSectionTitle>{subsection.title}</SubSectionTitle>

              {subsection.image && subsection.image !== '' && (
                <div style={{ textAlign: 'center' }}>
                  <SubSectionImage src={subsection.image} alt={subsection.title} />
                </div>
              )}

              {/* Render subsection paragraphs if present and not empty */}
              {subsection.paragraphs && subsection.paragraphs.length > 0 && subsection.paragraphs.map((para, paraIndex) => (
                <Paragraph key={`sub-para-${index}-${subIndex}-${paraIndex}`}>{para}</Paragraph>
              ))}

              {/* Render subsection list items if present and not empty */}
              {subsection.listItems && subsection.listItems.length > 0 && (
                <SubSectionList>
                  {subsection.listItems.map((item, itemIndex) => (
                    <ListItem key={`sub-item-${index}-${subIndex}-${itemIndex}`}>{item}</ListItem>
                  ))}
                </SubSectionList>
              )}

            </SubSection>
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