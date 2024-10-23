import React from 'react'
import styled from 'styled-components'
import { P } from './CommonStyle'

const MrktAlertWrap = styled.div`
  background-color: #D4FFDE;
    width: 100%;
    height: 56px;
    position: fixed;
    border-radius: 10px;
    top: 2px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin: 0 30px; */
    z-index: 104434;
    box-shadow: 0px 30px 60px rgba(69, 69, 69, 0.25);
    left: 0;

    @media screen and (max-width: 767px){
      width: fit-content;
      height: 85px;
      padding: 0 10px;
      text-align: center;
    }
`
const AlertTxt = styled.div``


export default function Success(props) {
  return (
    <div>
      <MrktAlertWrap>
        <AlertTxt>
          <P text={props.message} color="#1F936E" fontSize="18px" fontWeight="bold" cursor="auto" fontSizeMedia="13px"></P>
        </AlertTxt>
      </MrktAlertWrap>
    </div>
  )
}




