import React from 'react'
import CarouselSlider from './CarouselSlider'
import styled from "styled-components";
import LoginForm from './LoginForm';
 const Wraped = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  height: 100vh;
  margin-top: 115px;

  @media screen and (max-width: 767px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: auto;
    height: 124vh;
  }
`;
const Login = () => {
  return (
    <div>
      <Wraped>
        <div style={{ width: "100%", position: "relative" }}>
          <CarouselSlider />
        </div>
        <div>
          <LoginForm></LoginForm>
        </div>
      </Wraped>
    </div>
  )
}

export default Login
