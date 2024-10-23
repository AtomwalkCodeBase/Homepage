import React from "react";
import styled from "styled-components";

const handleColorType = (variant) => {
  switch (variant) {
    case "solidOrange":
      return "border:1px solid #FF7624; color: #fff; background: #FF7624";
    case "outlineOrange":
      return "border:1px solid #FF7624; color: #FF7624; background: #FFF";
    case "outlineGrey":
      return "border: 1px solid #454545 ; color: #454545; background: transparent ";
    case "solidGrey":
      return "border: 1px solid #454545 ; color: #D6CBFF; background: #454545";
    case "solidWhite":
      return "border: 1px solid #454545 ; color: #454545; background: #fff";
    default:
      return "color: #000; background: #eee;";
  }
};
const handleHoverType = (variant) => {
  switch (variant) {
    case "solidOrange":
      return "border:1px solid #cd5900; color: #fff; background: #cd5900";
    case "outlineOrange":
      return "border:1px solid #cd5900; color: #cd5900; background: #fff";
    case "outlineGrey":
      return "border: 1px solid #454545 ; color: #454545; background: #F3E4D2";
    case "solidGrey":
      return "border: 1px solid #454545 ; color: #D6CBFF; background: #454545";
    case "solidWhite":
        return "border: 1px solid #454545 ; color: #454545; background: #f3e4d2";
    default:
      return "color: #000; background: #eee;";
  }
};
const StyledButton = styled.button`
  border: none;
  ${({ variant }) => handleColorType(variant)};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background: ${(props) => (props.disabled ? "#8A8A8A" : "")};
  color: ${(props) => (props.disabled ? "white" : "")};
  width: ${(props) => (props.width ? props.width : "174px")};
  gap: ${(props) => props.gap};
  height: ${(props) => props.height}; 
  cursor: pointer;
  border-radius: 4px;
  font-family: "Centra";
  font-style: normal;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  line-height: 20px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    ${({ variant }) => handleHoverType(variant)};
  }
  @media  screen and (max-width: 1280px){
    height: ${(props) => props.Lgheight};
  }
  @media screen and (max-width: 767px){
    font-size: ${(props) => props.mbfontSize};
    padding: ${(props) => props.mbpadding};
    width: ${(props) => props.mbwidth};
  }
`;

export default function Button(props) {
  const disable = props.disable;
  return (
    <div>
      <StyledButton
        onClick={props.onClick}
        variant={props.variant}
        width={props.width}
        fontWeight={props.fontWeight}
        fontSize={props.fontSize}
        height={props.height}
        Lgheight={props.Lgheight}
        mbfontSize={props.mbfontSize}
        mbpadding={props.mbpadding}
        mbwidth={props.mbwidth}
        disabled={disable}
      >
      
        {props.text}
      </StyledButton>
    </div>
  );
}
