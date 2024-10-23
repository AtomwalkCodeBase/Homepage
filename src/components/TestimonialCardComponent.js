import React from 'react';
import styled from 'styled-components';

// Container for the testimonial cards
const TestimonialContainer = styled.div`
  display: flex;
  align-items: center;
 justify-content: center;
 gap: 50px;
  padding: 50px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

// Individual card style
const TestimonialCard = styled.div`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 450px;
  height: 300px;
  margin: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 10px;
    height: 330px;
  }
`;

// Profile image in the card
const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: absolute;
  top: -35px;
  left: 20px;
  border: 4px solid #ffffff;
`;

// G2 icon style
const G2Icon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 15px;
  right: 20px;
`;

// Content inside the card
const CardContent = styled.div`
  margin-top: 30px;
  text-align: left;
  font-size: 1em;
  color: #333333;
`;

// User name and title style
const UserName = styled.h4`
  margin: 10px 0;
  font-weight: 600;
  color: #000000;
`;

const UserTitle = styled.p`
  color: #666666;
  font-size: 0.9em;
`;

// Rating stars style
const RatingStars = styled.div`
  color: #f7c324;
  font-size: 1.2em;
  margin-top: 15px;
`;
const Heading = styled.h2`
padding: 50px;
  font-size: 2.5rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const Mainwarp=styled.div`
background-color: #cfe2ff;
`

const TestimonialCardComponent = () => {
  return (
    <Mainwarp>
    <Heading>Meet the clients who made us No. 1.</Heading>
    <TestimonialContainer>
      <TestimonialCard>
        <ProfileImage src="https://picsum.photos/109/109" alt="User Profile" />
        {/* <G2Icon src="path/to/g2-icon.png" alt="G2 Icon" /> */}
        <CardContent>
          An amazing, comprehensive, and user-friendly HR platform. The platform is well-designed, reducing the administrative burden of HR departments.
        </CardContent>
        <div>
          <UserName>Hrithick J</UserName>
          <UserTitle>HR Manager</UserTitle>
          <RatingStars>★★★★★</RatingStars>
        </div>
      </TestimonialCard>

      <TestimonialCard>
        <ProfileImage src="https://picsum.photos/104/104" alt="User Profile" />
        {/* <G2Icon src="path/to/g2-icon.png" alt="G2 Icon" /> */}
        <CardContent>
          This platform is great from an HR perspective because it is 100% automated. All HR-related tools are available, and people can save a huge amount of time and get 100% accurate data.
        </CardContent>
        <div>
          <UserName>Sanjay Kumar</UserName>
          <UserTitle>HR Manager</UserTitle>
          <RatingStars>★★★★★</RatingStars>
        </div>
      </TestimonialCard>
    </TestimonialContainer>
    </Mainwarp>
  );
};

export default TestimonialCardComponent;
