import React, { useState } from 'react';
import styled from 'styled-components';
import { useBlogs } from './hooks/useBlogs';

// Styled Components
const MainWrapper = styled.div`
  background-color: #fefce8; /* Match BlogDetail.js warm off-white */
`;

const NoResults = styled.p`
  grid-column: span 3;
  text-align: center;
  color: #dc2626; /* Red to match BlogDetail.js error */
  font-size: 40px;
  font-weight: 500;

  @media (max-width: 768px) {
    grid-column: span 1;
    font-size: 24px;
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

const PostCard = styled.div`
  background-color: #ffffff;
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
  color: #d97706; /* Gold to match BlogDetail.js */
  font-weight: bold;
  text-transform: uppercase;
`;

const PostTitle = styled.h2`
  font-size: 18px;
  color: #312e81; /* Indigo to match BlogDetail.js */
  margin: 10px 0;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #1f2937; /* Dark slate to match BlogDetail.js */
  margin-top: auto;
`;

const Author = styled.span`
  display: flex;
  align-items: center;
`;

const StyledDate = styled.span`
  font-size: 12px;
`;

const Header = styled.div`
  padding: 20px 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    gap: 10px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #e5e7eb; /* Light gray to match BlogDetail.js */
  border-radius: 4px;
  margin-right: 10px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: #d97706; /* Gold focus */
    box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #d97706; /* Gold to match BlogDetail.js */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #b45309; /* Darker gold */
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 24px;
  color: #312e81; /* Indigo to match BlogDetail.js */
  background-color: #fefce8;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 24px;
  color: #dc2626; /* Red to match BlogDetail.js */
  background-color: #fefce8;
`;

const BlogPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { blogs, loading, error } = useBlogs();

  if (loading) return <Loading>Loading blogs...</Loading>;
  if (error) return <ErrorText>Error: {error}</ErrorText>;

  const filteredPosts = blogs.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainWrapper>
      <Header>
        <h2 style={{ color: '#312e81' }}>Latest Posts</h2>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by title or tagline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton>Search</SearchButton>
        </SearchBar>
      </Header>
      <PostGrid>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((blog) => (
            <PostCard
              key={blog.id}
              onClick={() => {
                window.location.href = `/Blog.html/${blog.id}`;
              }}
            >
              <PostImage src={blog.coverImage} alt={blog.title || 'Blog post'} />
              <PostContent>
                {/* Category display: show as comma-separated if array, else normal */}
                {Array.isArray(blog.category) ? (
                  <PostCategory>{blog.category.join(', ')}</PostCategory>
                ) : blog.category ? (
                  <PostCategory>{blog.category}</PostCategory>
                ) : null}
                <PostTitle>{blog.title}</PostTitle>
                <PostFooter>
                  <Author>By {blog.author}</Author>
                  <StyledDate>
                    {blog.date
                      ? new Date(blog.date).toLocaleDateString()
                      : 'No date'}
                  </StyledDate>
                </PostFooter>
              </PostContent>
            </PostCard>
          ))
        ) : (
          <NoResults>
            {searchQuery
              ? `No posts found for "${searchQuery}"`
              : 'No posts available. Please try again later.'}
          </NoResults>
        )}
      </PostGrid>
    </MainWrapper>
  );
};

export default BlogPosts;