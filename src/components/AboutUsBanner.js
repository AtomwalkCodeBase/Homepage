import React from 'react'
import styled from 'styled-components'
import Bg from "../components/loginpage/images/about-us-bg.png"
import Button from './loginpage/Button'
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
    top: 8%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 50px;

    @media  screen and (max-width: 1280px){
        margin-top: 3%;
    }
    @media screen and (max-width: 767px) {
        /* margin: 0 auto; */
        margin-top: -150px;
        width: 370px;
    }

`
const BtnWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
`


export default function AboutUsBanner() {

    const HandleSeeAllJobs=()=>{
        window.location.href = process.env.SERVER_NAME_URL +"/careers.html"
    }



  return (
    <div>
        <AboutWrap>
           <AboutTxt>
                <P text="About us" color="#000" fontSize="48px" fontWeight="900" letterSpacing="2.4px" textAlign="left"></P>
                <P text="Empowering Small Businesses: Atomwalk Office is dedicated to empowering small business owners by providing a comprehensive Virtual Desktop Interface (VDI) that enhances operational efficiency and streamlines business processes." color="#000" fontSize="16px" fontWeight="400" letterSpacing="0.8px" marginTop="25px"></P>
                <P text="Innovative Financial Solutions: Our platform offers easy financing options and seamless connectivity with banks through blockchain technology, ensuring secure and efficient financial transactions for your business." color="#000" fontSize="16px" fontWeight="400" letterSpacing="0.8px" marginTop="30px"></P>
                <P text="Operational Excellence: With Atomwalk Office, businesses can monitor and track their operational efficiency in real-time, enabling better decision-making and improved productivity." color="#000" fontSize="16px" fontWeight="400" letterSpacing="0.8px" marginTop="30px"></P>
                <P text="Cutting-Edge Technology: We leverage the latest advancements in technology, including cloud services and blockchain, to provide a robust and secure environment for your business operations." color="#000" fontSize="16px" fontWeight="400" letterSpacing="0.8px" marginTop="30px"></P>
                <BtnWrap>
                    <Button onClick={HandleSeeAllJobs} text="See Open Jobs" variant="solidOrange" width="auto" height="50px"></Button>
                </BtnWrap>
           </AboutTxt>
        </AboutWrap>
    </div>
  )
}
