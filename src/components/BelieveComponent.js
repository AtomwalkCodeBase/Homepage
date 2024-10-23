import React from 'react';
import styled from 'styled-components';
import People from './../assets/img/people.png'
import Hand from './../assets/img/handshake.png'
import Rocket from './../assets/img/startup.png'
import Handsek from './../assets/img/hand-shake.png'
// Styled Components

const Container = styled.div`
  background-color: #fff7e6; // Light cream background
  padding: 100px 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333333;
  margin-bottom: 100px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  max-width: 350px;
  text-align: center;

  @media(min-width: 768px) {
    max-width: 400px;
    height: 150px;
  }
`;

const IconWrapper = styled.div`
  background-color: ${({ color }) => color || '#ccc'};
  border-radius: 8px;
  padding: 10px;
  display: inline-block;
  margin-right: 15px;
  width: 50px;
`;

const Text = styled.p`
  color: #555555;
  font-size: 1rem;
  margin: 0;
`;

const BelieveComponent = () => {
  return (
    <Container>
      <Title>We Believe</Title>
      <CardsContainer>
        <Card>
          <IconWrapper color="#8ed1b0">
          <img  src={People}></img>
          </IconWrapper>
          <Text>That business is first and foremost about people</Text>
        </Card>
        <Card>
          <IconWrapper color="#db70d1">
          <img  src={Hand}></img>
          </IconWrapper>
          <Text>That we can truly change the world</Text>
        </Card>
        <Card>
          <IconWrapper color="#fbbd3c">
          <img  src={Rocket}></img>
          </IconWrapper>
          <Text>That relentless innovation is a way to be, not a choice</Text>
        </Card>
        <Card>
          <IconWrapper style={{width:"65px"}}color="#6cd5ff">
           <img  src={Handsek}></img>
          </IconWrapper>
          <Text>That human connections and partnerships help break boundaries and help raise the bar</Text>
        </Card>
      </CardsContainer>
    </Container>
  );
};

export default BelieveComponent;
