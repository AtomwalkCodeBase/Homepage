import styled from "styled-components";

// import React from 'react'

const Para = styled.p`

    font-family: 'Centra';
    font-style: normal;
    font-weight:${(props) => props.fontWeight};
    font-size: ${(props) => props.fontSize};
    color: ${props => props.color ? props.color : "black"};
    cursor: ${props => props.cursor ? props.cursor : "auto"};
    padding: ${(props) => props.padding};
    margin-top: ${(props) => props.marginTop ? props.marginTop : "0"};
    margin-bottom: 0;
    margin-right: 0;
    margin-left: ${(props) => props.marginLeft};
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    text-align: ${(props) => props.textAlign};
    letter-spacing: ${(props) => props.letterSpacing};
    text-transform: ${(props) => props.textTransform};
    text-decoration: ${(props) => props.textDecoration};
    line-height: ${(props) => props.lineHeight};

    :hover{
        color: ${props => props.hoverColor ? props.hoverColor : props.color};
    }
    @media  screen and (max-width: 1280px){
        font-size: ${(props) => props.LgFontSize};
    }
    @media screen and (max-width: 767px) {
        font-size: ${(props) => props.mobFontSize};
        line-height: ${(props) => props.mobLineHeight};
        margin-top: ${(props) => props.mobMarginTop};
        letter-spacing: ${(props) => props.mobLetterSpacing};
        width: ${(props) => props.mobwidth};
        text-align: ${(props) => props.MobtextAlign};
        margin-bottom: ${(props) => props.mobMarginBottom};
        position: ${(props) => props.mobPosition};
        right: ${(props) => props.mobRight};
    }
    
`


export const P = (props) => {

    return <Para dangerouslySetInnerHTML={props.dangerouslySetInnerHTML} onClick={props.onClick} textTransform={props.textTransform} margin={props.margin} lineHeight={props.lineHeight} mobPosition={props.mobPosition} LgFontSize={props.LgFontSize} mobMarginBottom={props.mobMarginBottom} mobRight={props.mobRight} fontWeight={props.fontWeight} mobwidth={props.mobwidth} mobLetterSpacing={props.mobLetterSpacing} mobMarginTop={props.mobMarginTop} moblineHeight={props.moblineHeight} letterSpacing={props.letterSpacing} cursor={props.cursor} textAlign={props.textAlign} marginLeft={props.marginLeft} MobtextAlign={props.MobtextAlign} fontSize={props.fontSize} mobFontSize={props.mobFontSize} mobLineHeight={props.mobLineHeight} width={props.width} color={props.color}  hoverColor={props.hoverColor} padding={props.padding} textDecoration={props.textDecoration} marginTop={props.marginTop}>{props.text}</Para>

}