import React from 'react'
import styled from 'styled-components'
import Panasonic from "../images/panasonic-bl.svg";
import Fujifilm from "../images/fujifilm-bl.svg";
import Omron from "../images/omron-bl.svg";
import Murata from "../images/murata-bl.svg";
import Honda from "../images/honda-bl.svg";
import Loreal from "../images/loreal-bl.svg";
import Cocacola from "../images/cocacola.svg";
import Dow from "../images/dow.svg";

const TrustedWrap= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 60px; */
    flex-direction: column;
    /* margin-bottom: 130px; */
    /* background: linear-gradient(
    0deg,
    rgb(255, 255, 255) 0%,
    rgb(219 224 244) 57%,
    rgb(255, 255, 255) 89%
  ); */
  height: 300px;

  @media screen and (max-width: 767px){ 
    height: 100%;
    margin-top: 120px;
  }
`
const TitleTxt = styled.p`
    margin: 0;
    font-family: Lato;
    font-style: normal;
    font-weight: 900;
    font-size: 48px;
    color: #000000;
    letter-spacing: 2.4px;
    line-height: 60px;
    text-align: center;
`
const CompanyWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px 80px;
    flex-wrap: wrap;
    width: 1140px;
    margin-top: 40px;

    @media screen and (max-width: 767px){
        width: 100%;
    }
`
const Img = styled.img`
  width: 120px;
  opacity:0.7;
`

export default function TrustedCompany() {
  return (
    <div>
        <TrustedWrap>
            <TitleTxt>Trusted by innovative companies</TitleTxt>
            <CompanyWrap>
                <Img src={Panasonic}></Img>
                <Img src={Fujifilm}></Img>
                <Img src={Cocacola}></Img>               
                {/* <Img src={Omron}></Img> */}
                <Img src={Murata}></Img>
                <Img src={Dow}></Img>                    
                <Img src={Honda}></Img>
            
                {/* <Img src={Loreal}></Img> */}
            </CompanyWrap>
        </TrustedWrap>
    </div>
  )
}
