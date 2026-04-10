import styled from "styled-components";
import image from "../assets/img/conversesion.png";

const Section = styled.section`
  width: 100%;
  height: 450px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  background-image: url(${image});
  background-size: cover;
  /* background-position: center; */
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to right,
    rgba(0,0,0,0.1) 0%,
    rgba(0,0,0,0.55) 45%,
    rgba(0,0,0,0.85) 100%
  );
`;

const Content = styled.div`
  position: relative;
  max-width: 600px;
  margin-right: 120px;
  color: white;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 30px;
  color: rgba(255,255,255,0.85);
`;

const Button = styled.button`
  padding: 16px 36px;
  background: white;
  color: #e31837;
  border: none;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s;

  &:hover{
    transform: translateY(-3px);
    box-shadow:0 10px 20px rgba(0,0,0,0.2);
  }
`;

export default function Contact() {

  return (
    <Section>
      <Overlay />
      <Content>
        <Title>Innovation Starts Here</Title>
        <Description>
          Power your organization with platforms designed to connect people, processes,
          and technology across your enterprise.
        </Description>
        <Button onClick={() => window.location.href = "/Careers.html"}>KNOW MORE</Button>
      </Content>
    </Section>
  );
}


