import React, { useEffect } from "react";
import styled from "styled-components";
import CarouselSlider from "./CarouselSlider";
import ForgetPasswordForm from "./ForgetPasswordForm";


export const Wraped = styled.div`
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

export default function ForgetPassword() {

  return (
    <div>
      <Wraped>
        <div style={{ width: "100%", position: "relative" }}>
          <CarouselSlider />
        </div>
        <div>
          <ForgetPasswordForm></ForgetPasswordForm>
        </div>
      </Wraped>
    </div>
  );
}
