import React from 'react'
import styled from 'styled-components'
import Bg from "../components/loginpage/images/about-us-bg.png"
import { P } from './CommonStyle'


const AboutWrap = styled.div`
    background-image: url(${Bg});
    background-position: center;
    background-repeat: no-repeat;
    height: 1850px;
    padding-top: 74px;
    background-size: cover;

    @media screen and (max-width: 767px) {
        height: 1450px;
    }

`
const AboutTxt = styled.div`
    position: absolute;
    top: 4%;
    left: 50%;
    text-align: justify;
    transform: translate(-50%, -50%);
    margin-top: 50px;

    @media  screen and (max-width: 1280px){
        margin-top: 3%;
    }
    @media screen and (max-width: 767px) {
        /* margin: 0 auto; */
        margin-top: 20px;
        width: 370px;
        top: 2.7%;
    }

`


export default function AboutUsBanner() {
  return (
    <div>
        <AboutWrap>
           <AboutTxt>
                <P text="About us" color="#000" fontSize="48px" fontWeight="900" textAlign="justify"></P>
                <P text="Atomwalk Office is a cloud-based software solution, designed to transform the way startups, small, and medium-sized businesses operate. Built on cutting-edge technologies like AI and Blockchain, our platform seamlessly manages core business functions including manufacturing, purchasing, inventory, sales, customer service, accounting, and HR. " color="#5a5959" fontSize="22px" fontWeight="400"  marginTop="25px"></P>
                <P text="Empowering organizations by simplifying business complexities for sustainable growth and driving business excellence. Atomwalk office software solutions- transform your data into actionable insights and drive your business forward with confidence." color="#5a5959" fontSize="22px" fontWeight="400"  marginTop="30px"></P>
           </AboutTxt>
        </AboutWrap>
    </div>
  )
}
