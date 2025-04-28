import React, { useState } from 'react';
import styled from 'styled-components';
import blogPostsData from './BlogPostsData'; // Import blog posts data

// Styled Components
const MainWrapper = styled.div`
  background-color: rgb(255 246 247);
`;

const NoResults = styled.p`
  grid-column: span 3;
  text-align: center;
  color: #ff0000;
  font-size: 40px;
  font-weight: 500;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 40px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
`;

const PostCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 15px;
`;

const PostCategory = styled.span`
  font-size: 12px;
  color: #007BFF;
  font-weight: bold;
  text-transform: uppercase;
`;

const PostTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #888;
  margin-top: auto;
`;

const Author = styled.span`
  display: flex;
  align-items: center;
`;

const Date = styled.span`
  font-size: 12px;
`;

const Header = styled.div`
  padding: 20px 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: rgba(255, 128, 0, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(255 56 0);
  }
`;

const BlogPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredPosts = blogPostsData.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const latestNavigatin = (id) => {
    window.location.href = `/BlogDetails/${id}.html`;
  };

  return (
    <MainWrapper>
      <Header>
        <h2 style={{ color: '#454545' }}>Latest Post</h2>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={() => console.log('Searching...')}>Search</SearchButton>
        </SearchBar>
      </Header>
      <PostGrid>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} onClick={() => latestNavigatin(post.id)}>
              <PostImage src={post.image} alt={post.title} />
              <PostContent>
                <PostCategory>{post.category}</PostCategory>
                <PostTitle>{post.title}</PostTitle>
                <PostFooter>
                  <Author>{post.author}</Author>
                  <Date>{post.date}</Date>
                </PostFooter>
              </PostContent>
            </PostCard>
          ))
        ) : (
          <NoResults>No posts found for "{searchQuery}"</NoResults>
        )}
      </PostGrid>
    </MainWrapper>
  );
};

export default BlogPosts;
