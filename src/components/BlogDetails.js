import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BlogPage from './BlogPage';
import blogDetailsData from './BlogDetailsData';

const Container = styled.div`
  background-color: #a000ff;
  padding: 60px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-right: 20px;
  margin-top: 70px;

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
  margin-top: 50px;

  img {
    max-width: 110%;
    height: auto;
    aspect-ratio: 3/2;
    object-fit: contain;
    border-radius: 12px;
  }
`;

const BlogDetails = () => {
  const { blogId } = useParams(); // Get blogId from URL parameters
  const parsedBlogId = parseInt(blogId, 10); // Convert blogId to integer
  const blog = blogDetailsData.find((item) => item.id === parsedBlogId); // Find blog by ID

  if (!blog) {
    return (
      <Container>
        <Content>
          <Heading>Blog Not Found</Heading>
          <Subheading>Please check the URL or try another blog.</Subheading>
        </Content>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Container>
        <Content>
          <Heading>{blog.title}</Heading>
          <Subheading>By {blog.author}</Subheading>
          <MetaInfo>Published on {blog.date}</MetaInfo>
        </Content>
        <ImageWrapper>
          <img src={blog.image} alt={blog.title} />
        </ImageWrapper>
      </Container>

      {/* Pass the entire blog object to BlogPage, including content */}
      <BlogPage blog={blog} />
    </div>
  );
};

export default BlogDetails;