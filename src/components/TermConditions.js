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
          <TOCLink href="#equipment">3. EQUIPMENT</TOCLink>
          <TOCLink href="#registration">4. REGISTRATION</TOCLink>
          <TOCLink href="#password">5. PASSWORD AND SECURITY</TOCLink>
          <TOCLink href="#userconduct">6. USER CONDUCT</TOCLink>
          <TOCLink href="#dataDuplicity">7. DATA DUPLICITY</TOCLink>
          <TOCLink href="#service">8. SERVICE AVAILABILITY</TOCLink>
          <TOCLink href="#error">9. ERRORS, MISTAKES AND RIGHT TO MODIFY OR DISCONTINUE SERVICE</TOCLink>
          <TOCLink href="#std">10. STANDARD TERMS & CONDITIONS</TOCLink>
          <TOCLink href="#monitering">11. MONITORING</TOCLink>
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
        <Card id="equipment">
          <SectionTitle>3. EQUIPMENT:</SectionTitle>
          <List>
            <Paragraph>
            The User shall be responsible for maintaining all kinds of mobile devices, computer
            hardware and other equipment to access and use our services. We shall not be liable for
            any damages to the User’s equipment resulting from the use of our services.
          </Paragraph>
          </List>
        </Card>
        <Card id="registration">
          <SectionTitle>4. REGISTRATION:</SectionTitle>
          <List>
          <Paragraph>
          To utilise services on ATOMWALK, you may be required to complete a registration process and create a profile / account. You represent and warrant that all information provided by you to ATOMWALK is correct, accurate and complete, and that you will maintain the accuracy and completeness of this information in a prompt, timely basis.
          </Paragraph>
          </List>
        </Card>
        <Card id="password">
          <SectionTitle>5. PASSWORD AND SECURITY:</SectionTitle>
          <List>
          <Paragraph>
          As a registered user of ATOMWALK, you may receive or create a username and password. You are solely responsible for maintaining the confidentiality and security of your password(s) and account(s). You understand and agree that you are individually and fully responsible for all actions and listings, shared information, reviews, comments, posts made from your account(s). Any account you create is non-transferrable. You agree to notify ATOMWALK immediately if you become aware of any unauthorised use of your account(s).
          </Paragraph>
          </List>
        </Card>
        <Card id="userconduct">
          <SectionTitle>6. USER CONDUCT:</SectionTitle>
          <List>
          <Paragraph>
          The User shall not post or transmit through ATOMWALK any material which is unlawful, threatening, abusive, defamatory, invasive of privacy or public rights, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offense, give rise to civil liability, objectionable or otherwise violates any law.
          </Paragraph>
          </List>
        </Card>
        <Card id="dataDuplicity">
          <SectionTitle>7. DATA DUPLICITY:</SectionTitle>
          <List>
          <Paragraph>
          You agree not to create any data backup or copy the content and data that is available to you by use of the ATOMWALK Service except as stated in this agreement.
          </Paragraph>
          </List>
        </Card>
        <Card id="service">
          <SectionTitle>8. SERVICE AVAILABILITY:</SectionTitle>
          <List>
            <ListItem>ATOMWALK will make all reasonable efforts to make the Service available at all times. However, you acknowledge that the ATOMWALK Service is provided over the internet and through mobile networks and so the quality and availability of the Service may be affected by factors outside the control of ATOMWALK.</ListItem>
            <ListItem>ATOMWALK does not accept any responsibility whatsoever for unavailability of the Service , or any difficulty or inability to download or access content or any other communication system failure which may result in the Service being unavailable.</ListItem>
          </List>
        </Card>
        <Card id="error">
          <SectionTitle>9. ERRORS, MISTAKES AND RIGHT TO MODIFY OR DISCONTINUE SERVICE:</SectionTitle>
          <List>
          <Paragraph>
          We will make all efforts but we do not warrant that the Services will be error-free, free of viruses or other harmful components. We do not represent or warrant that the information, features, functionality available on or through the ATOMWALK website willbe correct, accurate, timely or otherwise reliable. We may make changes to the features, functionality or content of the ATOMWALK website at any time. We reserve the right in our sole discretion to edit or delete any documents, information or other content
appearing on the ATOMWALK website. ATOMWALK reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the ATOMWALK services (or any part thereof) with or without notice. ATOMWALK shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service. Theversion of the Application software may be upgraded from time to time to add support for new functions and services.
          </Paragraph>
          </List>
        </Card>
        <Card id="std">
          <SectionTitle>10. STANDARD TERMS & CONDITIONS:</SectionTitle>
          <List>
          <Paragraph>
          ATOMWALK shall not be responsible for the correctness of content submitted by Users and the same shall be the sole responsibility of the Users.
          </Paragraph>
          </List>
        </Card>
        <Card id="monitering">
          <SectionTitle>11. MONITORING:</SectionTitle>
          <List>
          <Paragraph>
          ATOMWALK shall have the right, but not the obligation to monitor the content of website including comments, functionality, reviews, videos or any other data or information. ATOMWALK shall have the right to remove any material that in its sole discretion appears to be a violation of the terms of usage or otherwise objectionable.
          </Paragraph>
          </List>
        </Card>
      </Container>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <Sun size={24} color="#f5f5f5" /> : <Moon size={24} color="#333" />}
      </ThemeToggle>
    </ThemeProvider>
  )
}

