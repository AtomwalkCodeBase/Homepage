import React from 'react'
import styled from "styled-components";
import Button from './Button';

export const Wrap = styled.div`
  margin: -30px auto;
  width: 520px;
  text-align: center;
  position: absolute;
  top: 25%;
  transform: translate(0, -30%);
  margin-left: 230px;

  @media screen and (max-width: 767px) {
    top: auto;
    transform: none;
    margin-left: 20px;
    margin-top: 20px;
    width: auto;
    position: initial;
  }
`;
export const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
export const Header = styled.div`
  font-family: "Centra";
  font-weight: 400;
  font-size: 48px;
  line-height: 42px;
  letter-spacing: -1.25px;
  color: #000000;
  margin-bottom: 15px;
  margin-top:45px;

  @media screen and (max-width: 1280px){
    margin-top: 45px;
  }

`;
export const SubHeader = styled.div`
  font-size: 16px;
  font-family: "Centra";
  line-height: 16px;
  color: #454545;
  margin-bottom: 6px;
`;
export const Details = styled.div`
  margin-top: 0px;
`;
export const Label = styled.div`
  font-size: 16px;
  font-family: "Centra";
  line-height: 24px;
  color: #352960;
  margin-top: 7px;
  text-align: left;

  @media screen and (max-width: 1280px){
    margin-top: 4px;
  }
`;
export const EmailFiled = styled.input`
  font-family: "Centra";
  font-size: 15px;
  line-height: 24px;
  border: 1px solid rgba(149, 149, 149, 0.5);
  border-radius: 12px;
  padding: 13px 20px;
  margin-top: 10px;
  margin-bottom: 8px;
  width: 475px;
  color: #454545;
  background-color: #fff !important;
  -webkit-box-shadow: inset 0 0 0px 9999px white;

  &:focus {
    outline: none;
    border: 1px solid #ff7624;
  }

  @media screen and (max-width: 767px) {
    width: 300px;
  }
`;
export const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;

  @media screen and (max-width: 1280px){
      margin-top: 16px;
    margin-bottom: 5px;
  }
`;
export const LoginBtn = styled.button`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-family: "Centra";
  font-weight: 500;
  line-height: 20px;
  padding: 14px 40px;
  width: 145px;
  background-color: #2970b1;
  border: 1px solid #2970b1;
  border-radius: 4px;
  &:hover {
    background-color: #15436d;
    border: 1px solid #15436d;
    cursor: pointer;
  }
`;
export const ForgetPwd = styled.a`
  text-decoration: none;
  font-size: 12px;
  font-family: "Centra";
  line-height: 24px;
  color: #2970b1;
  cursor: pointer;
  &:hover {
    color: #15436d;
  }
`;
export const NewAccount = styled.div`
  color: #acacac;
  font-size: 12px;
  font-family: "Centra";
  line-height: 24px;
`;
export const InputError = styled.div`
  font-size: 14px;
  font-family: "Centra";
  line-height: 21px;
  color: #ff4141;
  text-align: left;
  margin-bottom: 12px;
`;

const LoginForm = () => {
  return (
    <div>
      <Wrap>
        <FormWrap>
          <Header>Login</Header>
          <SubHeader>to see your research come alive!</SubHeader>

          <Details>
            <div>
              <Label>
                Email address <span style={{ color: "red" }}> *</span>
              </Label>
              <EmailFiled
                placeholder="Enter your email"
              ></EmailFiled>
            </div>
            <div>
              <Label>
                Password <span style={{ color: "red" }}> *</span>
              </Label>
              <EmailFiled
                type="password"
                placeholder="Enter your password "
              ></EmailFiled>
            </div>
          </Details>
        </FormWrap>

        <BtnWrap>
          <Button
            text="Log In"
            variant="solidOrange"
            width="100px"
            height="50px"
          ></Button>
        </BtnWrap>

        <div>
          <ForgetPwd href="/forgotpassword.html">Forgot Password?</ForgetPwd>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              justifyContent: "center",
            }}
          >
            <NewAccount>Don’t have an account? </NewAccount>
            <ForgetPwd href="/signup">Sign Up</ForgetPwd>
          </div>
        </div>
      </Wrap>
    </div>
  )
}

export default LoginForm
