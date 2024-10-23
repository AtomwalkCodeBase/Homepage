import React, { useState } from "react";
import styled from "styled-components";
import Dots from "./images/twoDots.svg";

const TrustedWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.5fr;
  height: 185px;

  @media screen and (max-width: 767px){
    height: 77%;
  }
`;
const CustomerTalk = styled.div`
  background: #f0dbff;
  padding: 20px 55px;
  padding-bottom: 45px;
  height: 332px;

  @media screen and (max-width: 767px){
    height: 390px;
    padding-bottom: 35px;
  }
`;
const Img = styled.img`
  width: 18px;
`;
const CustomTxt = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-family: Lato;
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  width: 568px;
  margin-top: 10px;

  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 18px;
    line-height: 30px;
  }
`;
const CustomDtl = styled.div`
  background-color: #ffc8ae;
  padding: 25px 55px;

  @media screen and (max-width: 767px){
    height: 125px;
  }  
`;
const Logo = styled.div`
  background-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-position: center;
  background-size: contain;
  background-image: url(${(props) => props.CLogo});
`;
const CustName = styled.p`
  margin: 0;
  color: #fff;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;
const CustDesignation = styled.p`
  margin: 0;
  color: #fff;
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;
const CWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
const CustomDot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;
const Dot = styled.div`
  background-color: #fff3e1;
  border: 1px solid #d8d8d8;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
`;

export default function TrustedCustomReview(props) {
  return (
    <div>
      <TrustedWrap >
        <div className="ip-testimonial-wrap">
          <CustomerTalk >
            <Img src={Dots}></Img>
            <CustomTxt>{props.review}</CustomTxt>
          </CustomerTalk>
        </div>
        <div>
          <CustomDtl>
            <CWrapper>
              <div className="ip-testimonial-wrap">
                <Logo CLogo={props.CLogo}></Logo>
              </div>
              <div className="ip-testimonial-wrap">
                <CustName>{props.Cname}</CustName>
                <CustDesignation>{props.Cposition}</CustDesignation>
              </div>
            </CWrapper>

            <CustomDot>
              <Dot
                onClick={() => {
                  props.HandleCoroIndex(1);
                }}
                style={{ backgroundColor: props.coroIndex==1 ? "#FF7624" : undefined }}
                ></Dot>
              <Dot
                onClick={() => {
                  props.HandleCoroIndex(2);
                }}
                style={{ backgroundColor: props.coroIndex==2 ? "#FF7624" : undefined }}
              ></Dot>
              <Dot
                onClick={() => {
                  props.HandleCoroIndex(3);
                }}
                style={{ backgroundColor: props.coroIndex==3 ? "#FF7624" : undefined }}
              ></Dot>
            </CustomDot>
          </CustomDtl>
        </div>
      </TrustedWrap>
    </div>
  );
}
