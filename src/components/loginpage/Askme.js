import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Robo from './images/blue-robot-holding-a-sign-with-space-chatbot-icon-concept-chat-bot-or-chatterbot-png-image-vector-removebg-preview.png';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    border-radius: 8px; /* Reduce border-radius for smaller screens */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: #5c0295;
  color: #ffffff;
  font-weight: bold;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 10px 12px; /* Adjust padding for smaller screens */
    font-size: 14px; /* Reduce font size */
  }
`;

const Avatar = styled.div`
  background-color: #6236c5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 15px;
  }
`;

const ChatBox = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow-y: auto;
  background-color: #f7fafc;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 12px; /* Reduce padding */
  }
`;

const Charboat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e36c5;
  margin-top: 50%;
  font-weight: 500;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    margin-top: 40%; /* Adjust margin for smaller screens */
    font-size: 14px; /* Adjust font size */
    text-align: center; /* Center text */
  }
`;

const Message = styled.div`
  margin: 8px 0;
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => (props.isBot ? "#8e36c5" : "#edf2f7")};
  color: ${(props) => (props.isBot ? "#ffffff" : "#1a202c")};
  align-self: ${(props) => (props.isBot ? "flex-start" : "flex-end")};
  margin-left: ${(props) => (props.isBot ? "115px" : "")};
  max-width: 80%;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    max-width: 90%; /* Allow more width for messages */
    margin-left: ${(props) => (props.isBot ? "10px" : "")}; /* Adjust left margin */
    font-size: 14px; /* Reduce font size */
    padding: 8px; /* Reduce padding */
  }
`;

const InputContainer = styled.form`
  width: 70%;
  display: flex;
  align-items: center;
  padding: 12px;
  border-top: 1px solid #e2e8f0;
  background-color: #ffffff;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    width: 90%; /* Increase width on mobile */
    padding: 8px; /* Reduce padding */
  }
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid #cbd5e0;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  outline: none;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 6px 12px; /* Adjust padding */
    font-size: 13px; /* Reduce font size */
  }
`;

const SendButton = styled.button`
  width: 45px;
  height: 45px;
  background-color: #5c0295;  
  color: #ffffff;
  border: none;
  padding: 8px;
  border-radius: 50%;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #6236c5;
  }

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    width: 40px;
    height: 40px; /* Adjust size for smaller screens */
    margin-left: 4px; /* Reduce margin */
  }
`;

const LinkButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  gap: 8px;
  flex-wrap: wrap;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 4px; /* Reduce padding */
    gap: 4px; /* Reduce gap */
  }
`;

const LinkButton = styled.button`
  border: 1px solid #8e36c5;
  color: #8e36c5;
  background-color: #ffffff;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 6px 10px; /* Reduce padding */
    font-size: 11px; /* Reduce font size */
  }
`;

// Main Component
function Askme(props) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const[callApi,setCallApi]=useState(false);

  const handleSendMessage = async (e) => {
    if(e){
      e.preventDefault();
    }

    if (userInput.trim() === "") return;

    // Add user message to chat
    const newMessages = [...messages, { text: userInput, isBot: false }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);

    // Call the API to get the bot's response
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDE0Ru86HvsWQ-bD7pbdDB7o3NIrFbMCbA`,
        {
          contents: [{ parts: [{ text: userInput }] }],
        }
      );

      const botMessage =
        response.data?.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I didn't understand that.";

      // Add bot message to chat
      setMessages([...newMessages, { text: botMessage, isBot: true }]);
    } catch (error) {
      console.error("Error fetching the bot response:", error);
      setMessages([
        ...newMessages,
        { text: "Sorry, something went wrong.", isBot: true },
      ]);
    }

    setIsLoading(false);
  };
const handeleclose=()=>{
props.setOpenslide(false)
}

const valuesend=(data)=>{
  setCallApi(true);
  setUserInput(data);
}

useEffect(()=>{
if(callApi){
  setCallApi(false)
  handleSendMessage()
}
},[userInput])
const isMobile = window.innerWidth <= 768;
  return (
    <SlidingPane
      className="custom-pane-class"
      overlayClassName="custom-overlay-class"
      isOpen={true}
      hideHeader={true}
      from="right"
      width={isMobile ? '100%' : '39%'}
    >
      <ChatContainer>
        <Header>
          <Avatar>AW</Avatar>
          <span>ATOMWALK-AI</span>
          <button onClick={handeleclose} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>X</button>
        </Header>
        <ChatBox>
          {messages.map((msg, index) => (
            <Message key={index} isBot={msg.isBot}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </Message>
          ))}
          {isLoading && <Message isBot={true}>Generating...</Message>}
          {messages.length==0&&<Charboat>Hii how can i help you💁‍♀️</Charboat>}
        </ChatBox>
    
        <LinkButtonContainer>
          <LinkButton onClick={()=>valuesend("What is Manufacturing ERP ?")}>What is Manufacturing ERP ?</LinkButton>
          <LinkButton  onClick={()=>valuesend("Why Business need Manufacturing ERP ?")}>Why Business need Manufacturing ERP ?</LinkButton>
          <LinkButton  onClick={()=>valuesend("Whene is the Right Time to Implement Manufacturing ERP ?")}>Whene is the Right Time to Implement Manufacturing ERP ?</LinkButton>
          <LinkButton  onClick={()=>valuesend("How Atomwalk office support Manufacturing ERP ?")}>How Atomwalk office support Manufacturing ERP ?</LinkButton>
          <LinkButton  onClick={()=>valuesend("What is CRM")}>What is CRM</LinkButton>
        </LinkButtonContainer>
        <InputContainer>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <SendButton type="submit" disabled={isLoading} onClick={handleSendMessage}>
            ➤
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </SlidingPane>
  );
}

export default Askme;
