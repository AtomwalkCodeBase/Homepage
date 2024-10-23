import React, { useState } from 'react';
import styled from 'styled-components';


// Styled Components
const MainWrapper=styled.div`
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
  background-color:  rgba(255,128,0,1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:  rgb(255 56 0);
  }
`;
// React Component
const BlogPosts = () => {
    // Sample array of post data
const posts = [
    {
      id: 1,
      title: "The Impact of Technology on the Workplace: Atomwalk CRM On-the-Go",
      category: "Technology",
      image: "https://www.homecareinsight.co.uk/2020/07/connected-technology.jpg", // Replace with your image URL
      author: "Ashutosh Mohapatra",
      date: "August 20, 2024",
    },
    {
      id: 2,
      title: "The Impact of Technology on the Workplace: How Technology is Changing",
      category: "Technology",
      image: "https://paas-s3-broker-prod-lon-2edbd31f-65e0-4d35-9755-fde7c3b1b292.s3.amazonaws.com/images/Tech_2.2e16d0ba.fill-960x540.png",
      author: "A Sriya",
      date: "April 20, 2024",
    },
    {
      id: 3,
      title: "5 Common HR Software Problems and Troubleshooting Tips You Must know: Atomwalk HRM On-the-Go",
      category: "Technology",
      image: "https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg",
      author: "Pritam Kumar Nayak",
      date: "March 23, 2024",
    },
    {
      id: 4,
      title: "The Impact of Technology on the Workplace: How Technology is Changing",
      category: "Technology",
      image: "https://koala.sh/api/image/v2-213fq-qwlz7.jpg?width=1216&height=832&dream",
      author: "Ernie Smith",
      date: "August 20, 2022",
    },
    {
      id: 5,
      title: "The Impact of Technology on the Workplace: How Technology is Changing",
      category: "Technology",
      image: "https://images.saymedia-content.com/.image/t_share/MjAxNzE5OTgxMjA3OTg3ODU1/examples-of-digital-technology.jpg",
      author: "Eric Smith",
      date: "August 20, 2022",
    },
    {
      id: 6,
      title: "The Impact of Technology on the Workplace: How Technology is Changing",
      category: "Technology",
      image: "https://miro.medium.com/v2/resize:fit:664/1*K3Mb7l3_-saN81lhBUBrIA.jpeg",
      author: "Tracey Wilson",
      date: "August 20, 2022",
    },
  ];
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
const latestnavigatin=()=>{
window.location.href='/BlogDetails.html'
}
  return (
    <MainWrapper>
      <Header>
        <h2 style={{ color: "#454545" }}>Latest Post</h2>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={() => console.log("Searching...")}>Search</SearchButton>
        </SearchBar>
      </Header>
      <PostGrid>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} onClick={latestnavigatin}>
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
