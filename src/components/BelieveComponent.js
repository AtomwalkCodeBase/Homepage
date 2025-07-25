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
  <Title>Our Beliefs</Title>
  <CardsContainer>
    <Card>
      <IconWrapper color="#8ed1b0">
        <img src={People} alt="People Icon" />
      </IconWrapper>
      <Text>Business is ultimately valuing People. We believe in equality and inclusiveness.</Text>
    </Card>
    <Card>
      <IconWrapper color="#db70d1">
        <img src={Hand} alt="Hand Icon" />
      </IconWrapper>
      <Text>We have the power to make a meaningful difference in the world.</Text>
    </Card>
    <Card>
      <IconWrapper color="#fbbd3c">
        <img src={Rocket} alt="Rocket Icon" />
      </IconWrapper>
      <Text>At Atomwalk, innovation is not an option, but a core part of our identity.</Text>
    </Card>
    <Card>
      <IconWrapper style={{ width: "65px" }} color="#6cd5ff">
        <img src={Handsek} alt="Handshake Icon" />
      </IconWrapper>
      <Text>Building connections and partnerships helps us break limits and aim higher.</Text>
    </Card>
  </CardsContainer>
</Container>
  );
};

export default BelieveComponent;
