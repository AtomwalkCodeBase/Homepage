import React from "react";
import styled from "styled-components";

// Styled Components for the layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 4rem;
  }
`;

const AdviceSection = styled.div`
  max-width: 400px;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;

  &::before {
    content: "✔";
    color: green;
    margin-right: 0.5rem;
  }
`;

const FormSection = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #333;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
`;

const ExpertAdvice = () => {
  return (
    <Container>
      <AdviceSection>
        <Title>Get Expert Advice</Title>
        <List>
          <ListItem>Talk to Sales</ListItem>
          <ListItem>Free Demo</ListItem>
          <ListItem>Get Expert Advice</ListItem>
          <ListItem>Pricing Options</ListItem>
        </List>
      </AdviceSection>
      <FormSection>
        <FormTitle>Fill out this quick form and we’ll get back to you shortly</FormTitle>
        <Form>
          <Input type="text" placeholder="Enter your name" />
          <Input type="email" placeholder="Enter your work Email ID" />
          <TextArea placeholder="Let us know about your research requirement, a topic you have in mind, or a goal you are trying to achieve." rows="4" />
          <Button type="submit">Contact Sales</Button>
        </Form>
        <Disclaimer>
          By filling out and submitting this form, you are agreeing to our Privacy Policy and agreeing to receive email communications regarding events, webinars, research, and more.
        </Disclaimer>
      </FormSection>
    </Container>
  );
};

export default ExpertAdvice;
