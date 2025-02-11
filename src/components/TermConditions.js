"use client"

import { useState, useEffect } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Moon, Sun } from "lucide-react"
import { color } from "framer-motion"

const GlobalStyle = createGlobalStyle`
  body {
    margin-top: 100px;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.scrollTrack};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollThumb};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.scrollThumbHover};
  }
`

const lightTheme = {
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  text: "#333",
  cardBg: "#ffffff",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  accent: "#3498db",
  scrollTrack: "#f1f1f1",
  scrollThumb: "#888",
  scrollThumbHover: "#555",
  color: "#000"
}

const darkTheme = {
  background: "linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%)",
  text: "#f5f5f5",
  cardBg: "#2c3e50",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  accent: "#3498db",
  scrollTrack: "#2c3e50",
  scrollThumb: "#34495e",
  scrollThumbHover: "#4e6d8c",
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`

const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.accent};
  font-size: 2.5rem;
  margin-bottom: 2rem;
`

const Card = styled.section`
  background: ${(props) => props.theme.cardBg};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: ${(props) => props.theme.cardShadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.accent};
  border-bottom: 2px solid ${(props) => props.theme.accent};
  padding-bottom: 10px;
`

const Paragraph = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
  color: ${(props) => props.theme.text};
`

const List = styled.ol`
  margin-left: 20px;
`

const ListItem = styled.li`
  margin-bottom: 15px;
  color: ${(props) => props.theme.text};
`

const TableOfContents = styled.nav`
  position: sticky;
  top: 20px;
  background: ${(props) => props.theme.cardBg};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: ${(props) => props.theme.cardShadow};

  @media (max-width: 768px) {
    position: static;
  }
`

const TOCTitle = styled.h3`
  color: ${(props) => props.theme.accent};
  margin-bottom: 10px;
`

const TOCLink = styled.a`
  display: block;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  margin-bottom: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`

const ThemeToggle = styled.button`
  position: fixed;
  top: 120px;
  right: 20px;
  background: ${(props) => props.theme.cardBg};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.cardShadow};
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.accent};
  }
`

export default function TermsAndConditions() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <Title>TERMS AND CONDITIONS OF SERVICE</Title>

        <TableOfContents>
          <TOCTitle>Table of Contents</TOCTitle>
          <TOCLink href="#introduction">Introduction</TOCLink>
          <TOCLink href="#acceptance">1. Acceptance</TOCLink>
          <TOCLink href="#price-and-payment">2. Price and Payment</TOCLink>
        </TableOfContents>

        <Card id="introduction">
          <SectionTitle>Introduction</SectionTitle>
          <Paragraph>
            This is an agreement between you ("you" or "your") and ATOMWALK ("we," or "our") that governs your use of
            the services offered by ATOMWALK through its website, including collectively all services and data (text,
            graphics, videos) provided through https://atomwalk.com/, collectively called "Service".
          </Paragraph>
          <Paragraph>
            BY USING THE SERVICE, YOU ACKNOWLEDGE AND AGREE TO THESE TERMS OF ATOMWALK SERVICES AND PRIVACY POLICY,
            WHICH ARE INCORPORATED HEREIN BY REFERENCE. If you do not agree with these terms, you may not use the
            Service.
          </Paragraph>
          <Paragraph>
            ATOMWALK is providing software services for business automation, business management, business operations
            and accounting for various types of businesses.
          </Paragraph>
        </Card>

        <Card id="acceptance">
          <SectionTitle>1. ACCEPTANCE:</SectionTitle>
          <List>
            <ListItem>
              The user is taken to have exclusively accepted and is immediately bound, jointly and severally, by these
              terms and conditions when the user subscribes to any subscription plan of ATOMWALK or visits
              www.atomwalk.com.
            </ListItem>
            <ListItem>
              These terms and conditions may only be amended by ATOMWALK and such revised terms and conditions will be
              published on www.atomwalk.com.
            </ListItem>
          </List>
        </Card>

        <Card id="price-and-payment">
          <SectionTitle>2. PRICE AND PAYMENT:</SectionTitle>
          <List>
            <ListItem>Subscription price of any plan shall be decided by ATOMWALK at their sole discretion.</ListItem>
            <ListItem>Subscription price shall be as per subscription plan chosen by the customer.</ListItem>
            <ListItem>
              Free trial plan is provided by ATOMWALK's at its own discretion which may be discontinued at any point
              without any obligation and notice.
            </ListItem>
            <ListItem>
              The payment is accepted by ATOMWALK through online means and through options mentioned on website from
              time to time.
            </ListItem>
            <ListItem>The Subscription fee paid by user is non-refundable & non-transferable in any case.</ListItem>
          </List>
        </Card>
      </Container>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <Sun size={24} color="#f5f5f5" /> : <Moon size={24} color="#333" />}
      </ThemeToggle>
    </ThemeProvider>
  )
}

