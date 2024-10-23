import React from 'react'
import styled from 'styled-components';
import './login.css';


const Title = styled.div`
    font-size: 22px;
    font-family: 'Centra';
    font-weight: 600;
    line-height: 42px;
    color: #15436D;
    text-align: center;

    @media screen and (max-width: 767px) {
        line-height: 28px;
        font-size: 18px;
    }

`
const Desc = styled.div`
    text-align: center;
    font-size: 16px;
    font-family: 'Centra';
    line-height: 28px;
    color: #454545;
    width: 535px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;

    @media screen and (max-width: 767px) {
        width: auto;
        line-height: 25px;
        font-size: 14px;
    }
`
const ImgT = styled.img`
    width: 490px;
    margin: 0 auto;
    display: flex;

    @media screen and (max-width: 767px) {
        width: 300px;
    }

`

export default function LoginTempSlider(props) {
    return (
        <div>
            <div className='ip-temp-wrap'>
                <div>
                    <ImgT src={props.Temp} />
                </div>
                <div>
                    <Title>{props.title}</Title>
                </div>
                <div>
                    <Desc>{props.desc}</Desc>
                </div>
            </div>
        </div>
    )
}
