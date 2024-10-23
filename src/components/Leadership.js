import React from 'react';
import styled from 'styled-components';
import  Pritam from './../assets/img/BPritam.jpg'
import  Sriya  from './../assets/img/Sriya.jpg'
import  Ashutosh from './../assets/img/AAshutosh.jpeg'

// Styled components for the layout
const LeadershipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
font-size: 2.5rem;
margin-bottom: 30px;
color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div`
  background-color: ${(props) => props.backg};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid black;
  &:hover {
    transform: translateY(-10px);
  }
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 25%;
  border: 2px solid #454545;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Name = styled.h2`
  font-size: 1.2rem;
  margin: 10px 0;
  color: black;
  font-weight: 500;
`;

const Role = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Location = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

// Leadership data
const leadershipData = [
  { name: 'Ashutosh Mohapatra', role: 'Frontend Lead', location: 'Bangalore', imgSrc: `${Ashutosh}`,backg:'#e1fff6' },
  { name: 'Pritam Kumar Nayak', role: 'Frontend Developer', location: 'Bangalore', imgSrc: `${Pritam}`,backg:'#f5e9fd'},
  // { name: 'A Sriya', role: 'Business Analyst', location: 'Bangalore', imgSrc: `${Sriya}`,backg:'#fff7e6'},
  // Add the rest of the leadership team here
];

const Leadership = () => {
  return (
    <LeadershipContainer>
      <Title>Our Team</Title>
      <Grid>
        {leadershipData.map((leader, index) => (
          <Card key={index} backg={leader.backg}>
            <ImageContainer>
              <Image src={leader.imgSrc} alt={leader.backg} />
            </ImageContainer>
            <Name>{leader.name}</Name>
            <Role>{leader.role}</Role>
            <Location>{leader.location}</Location>
          </Card>
        ))}
      </Grid>
    </LeadershipContainer>
  );
};

export default Leadership;
