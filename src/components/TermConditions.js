"use client"

import { useState, useEffect } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Moon, Sun } from "lucide-react"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
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
  background: "#f5f7fa",
  text: "#333",
  cardBg: "#ffffff",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  accent: "#3498db",
  scrollTrack: "#f1f1f1",
  scrollThumb: "#888",
  scrollThumbHover: "#555",
}

const darkTheme = {
  background: "#1a1a1a",
  text: "#f5f5f5",
  cardBg: "#2c3e50",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  accent: "#3498db",
  scrollTrack: "#2c3e50",
  scrollThumb: "#34495e",
  scrollThumbHover: "#4e6d8c",
}

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`

const Sidebar = styled.nav`
  width: 250px;
  position: fixed;
  height: 100vh;
  background: ${(props) => props.theme.cardBg};
  box-shadow: ${(props) => props.theme.cardShadow};
  padding: 20px;
  margin-top: 140px;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: none;
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

const Content = styled.div`
  margin-top: 100px;
  margin-left: 450px;
  padding: 40px 20px;
  max-width: 800px;

  @media (max-width: 768px) {
    margin-left: 0;
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
  text-align: justify;
  color: ${(props) => props.theme.text};
`


const List = styled.ol`
  margin-left: 20px;
`

const ListItem = styled.li`
  margin-bottom: 15px;
  color: ${(props) => props.theme.text};
  text-align: justify;
`


const ThemeToggle = styled.button`
  position: fixed;
  top: 130px;
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
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <Sun size={24} color="#f5f5f5" /> : <Moon size={24} color="#333" />}
      </ThemeToggle>
      <Layout>
        <Sidebar>
          <TOCTitle>Table of Contents</TOCTitle>
          {["introduction", "acceptance", "price-and-payment", "equipment", "registration", "password", "userconduct", "Duplicity", "service", "error", "standard", "monitering", "intellectual", "liability", "rights", "changes", "use", "disclaimer", "limitation", "indemnity", "eligibility", "waiver", "majeure", "termination", "severability", "arbitration", "governing"].map((id, index) => (
            <TOCLink key={index} href={`#${id}`}>{index + 1}. {id.replace(/-/g, ' ').toUpperCase()}</TOCLink>
          ))}
        </Sidebar>
        <Content>
          <Title>TERMS AND CONDITIONS OF SERVICE</Title>
          
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
        <Card id="Duplicity">
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
            <ListItem>ATOMWALK does not accept any responsibility whatsoever for unavailability of the Service, or any difficulty or inability to download or access content or any other communication system failure which may result in the Service being unavailable.</ListItem>
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
        <Card id="standard">
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
        <Card id="intellectual">
          <SectionTitle>12. INTELLECTUAL PROPERTY RIGHTS:</SectionTitle>
          <List>
            <ListItem>The ATOMWALK trade marks, logos, all related products and service names(ATOMWALK), design marks, slogans, trademarks, service marks, copyright, patents, database rights (and other intellectual property rights of any nature in the Service) together with the underlying software code (source code) (&quot;Intellectual Property&quot;) is owned by and used under license by ATOMWALK or its licensee or affiliates. All other Intellectual Properties herein are the property of their respective owners.</ListItem>
            <ListItem>You are not authorized to use ATOMWALK&#39;s Intellectual Property in any advertising, publicity or in any other commercial manner. Reference to any products, services, processes or other information, by trade name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation thereof by ATOMWALK. For removal of doubts, it is clarified that, by accepting these terms, you hereby waive and grant to ATOMWALK all rights including intellectual property rights in the Reviews, Ratings and Comments posted by you at website through any of mediums and that ATOMWALK is free to use all such discussion, review, ratings and comments as per its requirements from time to time.</ListItem>
          </List>
        </Card>
        <Card id="liability">
          <SectionTitle>13. NO LIABILITY FOR THIRD PARTY SITES /CONTENT/ PRODUCTS/ SERVICES:</SectionTitle>
          <List>
          <Paragraph>
          These Terms of Service apply to all users of the ATOMWALK Service. Information provided by our users through the ATOMWALK Service may contain links to third party websites that are not owned or controlled by ATOMWALK. ATOMWALK has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites. Also, ATOMWALK does not assume any liability for any mistakes, misstatements of law, defamation, omissions, falsehood, obscenity, pornography or profanity in the statements, opinions, representations or any other form of third-party content on the website. In addition, ATOMWALK will not and cannot censor or edit the content of any third-party site. By using the Service, you expressly acknowledge and agree that ATOMWALK shall not be responsible for any damages, claims or other liability arising from or related to your use of any third-party website. You understand that the information and opinions in the third-party content represent solely the thoughts of the author and is neither endorsed by nor does it necessarily reflect ATOMWALK's beliefs.
          </Paragraph>
          </List>
        </Card>
        <Card id="rights">
          <SectionTitle>14. RESERVATION OF RIGHTS:</SectionTitle>
          <List>
          <Paragraph>
          We Reserve any rights not expressly granted in these Terms.
          </Paragraph>
          </List>
        </Card>
        <Card id="changes">
          <SectionTitle>15. CHANGES IN THESE TERMS &amp; PRIVACY POLICY:</SectionTitle>
          <List>
          <Paragraph>
          We may at any time vary these Terms of usage &amp; Privacy Policy by publishing the varied Terms of usage &amp; Privacy Policy on website. You acknowledge and agree that by continuing to use the services you accept the varied Terms &amp; Conditions.
          </Paragraph>
          </List>
        </Card>
        <Card id="use">
          <SectionTitle>16. USE OF SERVICES:</SectionTitle>
          <List>
          <ListItem>ATOMWALK may also terminate a user&#39;s access to the Service, if they are determined to be a repeat infringer, or for any or no reason, ATOMWALK also reserves the right to decide whether content or a post and/or content is appropriate and complies with these Terms of Service for violations other than copyright infringement and violations of intellectual property law, such as, but not limited to excessive length or limited interest. ATOMWALK may remove such content and/or terminate a user&#39;s access for uploading such material in violation of these Terms of Service at any time, without prior notice and at its sole discretion.</ListItem>
          <ListItem>You understand that while using the ATOMWALK Service you will be exposed to information, processes, functionality and submissions from a variety of sources, and that ATOMWALK is not responsible for the accuracy, usefulness, safety in any such cases. You further understand and acknowledge that you may be exposed to information, processes, functionality and submissions that are inaccurate/ un-useful and you agree to waive, and hereby do waive, any legal or equitable rights or remedies you have or may have against ATOMWALK with respect thereto, and agree to indemnify and hold ATOMWALK, its officers, directors, employees, agents, affiliates, and/or licensors, harmless to the fullest extent allowed by law regarding all matters related to your use of the ATOMWALK Service.</ListItem>
          <ListItem>ATOMWALK reserves the right to discontinue any aspect of the ATOMWALK Service at any time.</ListItem>
          </List>
        </Card>
        <Card id="disclaimer">
          <SectionTitle>17. DISCLAIMER:</SectionTitle>
          <List>
          <Paragraph>Users using any of ATOMWALK’s services across the website, mobile phone or any other medium are bound by this disclaimer wherein they are cautioned to make proper decisions before subscribing to ATOMWALK services. All the Users are cautioned that all and any information of whatsoever nature provided or uploaded is taken in good faith, without least suspecting the bonafides of the users. ATOMWALK does not confirm, does not acknowledge, or subscribe to the claims and representation made by the users on ATOMWALK. Further, ATOMWALK is not at all responsible for any act of user registered at ATOMWALK website. Any transaction/communication between users is a totally independent transaction based on the choice of users and in any case ATOMWALK will not be responsible for any such transaction and nor is ATOMWALK responsible for any kind of services provided by such users in any manner.</Paragraph>
          </List>
        </Card>
        <Card id="limitation">
          <SectionTitle>18. LIMITATION OF LIABILITY:</SectionTitle>
          <List>
          <Paragraph>In no event shall ATOMWALK, its board members, directors, partners, officers, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any errors, mistakes, or inaccuracies of content, personal injury or property damage, of any nature whatsoever, resulting from your access to and use of our service, any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein, any interruption or cessation of transmission to or from our servers, any bugs, viruses, which may be transmitted to or through our service by any third party, any errors or omissions in any content or for any loss or damage of any kind incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available via the ATOMWALK client, whether based on warranty, contract, tort, or any other legal theory, and whether or not the company is advised of the possibility of such damages, and/or the disclosure of information pursuant to these terms of service or privacy policy. The foregoing limitation of liability shall apply to the fullest extent permitted by law in the applicable jurisdiction. You specifically acknowledge that ATOMWALK shall not be liable for any malfunction, non-performance, loss of data or act of any third party and that the risk of harm or damage from the foregoing rests entirely with you.</Paragraph>
          </List>
        </Card>
        <Card id="indemnity">
          <SectionTitle>19. INDEMNITY:</SectionTitle>
          <List>
          <Paragraph>You agree to defend, indemnify and hold harmless ATOMWALK partners, board members, officers, directors, employees and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to advocate fees) arising from your use of and access to the ATOMWALK Service and/or your violation of any term of these Terms of Service &amp; privacy policy and/or your violation of any third party rights, including without limitation any copyright, property, or privacy right; or any claim that one of your content and/or post or submission caused damage to a third party.</Paragraph>
          </List>
        </Card>
        <Card id="eligibility">
          <SectionTitle>20. ELIGIBILITY TO ACCEPT THE TERMS OF SERVICE:</SectionTitle>
          <List>
          <Paragraph>Users who are at least eighteen (18) years of age, are eligible to use our service, whether for personal use or on behalf of a business. If you are an individual, you must be fully competent to enter into and to comply with the terms, conditions, obligations, representations, and warranties set forth in these Terms of Use. By using this service, you represent and warrant that you have the right, authority, and capacity to enter into these Terms of Use and can abide by all of the terms and conditions set forth therein.</Paragraph>
          </List>
        </Card>
        <Card id="waiver">
          <SectionTitle>21. WAIVER:</SectionTitle>
          <List>
          <Paragraph>No provision of this Agreement shall be deemed to be waived and no breach excused, unless such waiver or consent shall be in writing and signed by ATOMWALK. Any consent by ATOMWALK to, or a waiver by ATOMWALK of any breach by you, whether expressed or implied, shall not constitute consent to, waiver of, or excuse for any other different or subsequent breach.</Paragraph>
          </List>
        </Card>
        <Card id="majeure">
          <SectionTitle>22. FORCE MAJEURE:</SectionTitle>
          <List>
          <Paragraph>In no event shall the ATOMWALK be responsible or liable for any loss, damages or penalty as a result of failure or delay in the performance of its obligations hereunder arising out of or caused by, directly or indirectly, forces beyond its control, including, without limitation, strikes, work stoppages, accidents, acts of war or terrorism, civil or military disturbances, natural disaster or acts of God, and interruptions, loss or malfunctions of utilities, communications or computer (software and hardware) services.</Paragraph>
          </List>
        </Card>
        <Card id="termination">
          <SectionTitle>23. TERMINATION:</SectionTitle>
          <List>
          <Paragraph>ATOMWALK may terminate this agreement at any time. Without limiting the foregoing, ATOMWALK shall have the right to immediately terminate any profile, account and password of user without assigning any reason.</Paragraph>
          </List>
        </Card>
        <Card id="severability">
          <SectionTitle>24. SEVERABILITY:</SectionTitle>
          <List>
          <Paragraph>If any provision of the Agreement is held by a court of competent jurisdiction or arbitral tribunal to be unenforceable under applicable law, then such provision shall be excluded from this Agreement and the remainder of the Agreement shall be interpreted as if such provision were so excluded and shall be enforceable in accordance with its terms; provided however that, in such event, the Agreement shall be interpreted so as to give effect, to the greatest extent consistent with and permitted by applicable law, to the meaning and intention of the excluded provision as determined by such court of competent jurisdiction or arbitral tribunal.</Paragraph>
          </List>
        </Card>
        <Card id="arbitration">
          <SectionTitle>25. ARBITRATION:</SectionTitle>
          <List>
          <Paragraph>In the event a dispute arises between the “you” and ATOMWALK as per the terms of use,
the parties shall attempt to amicably resolve the dispute through mutual discussions.
Where the dispute is not resolved for a period of 60 days from the date of the dispute,
either party may, upon giving written notice to the other party, declare its intention to
initiate arbitration proceedings. The arbitration will be conducted in English in
accordance with the rules prescribed under the Arbitration and Conciliation Act, 1996.
The venue for the arbitration shall be Bangalore. The arbitration shall be conducted by a
sole arbitrator appointed by ATOMWALK. The award of the arbitrator shall be final and
binding on the parties. Each party shall bear its own costs of arbitration.</Paragraph>
          </List>
        </Card>
        <Card id="governing">
          <SectionTitle>26. GOVERNING LAW:</SectionTitle>
          <List>
          <Paragraph>These Terms will be governed by and construed in accordance with the Indian laws,
without giving effect to its conflict of laws&#39; provisions or your actual state or country of
residence, and you agree to submit to personal jurisdiction in India. Courts in Bangalore
will have the exclusive jurisdiction. You are responsible for compliance with applicable
laws. If for any reason a court of competent jurisdiction finds any provision or portion of
the Terms to be unenforceable, the remainder of the Terms will continue in full force and
effect. ATOMWALK reserves the right to seek all remedies available at law and in equity
for violations of these Terms.</Paragraph>
          </List>
        </Card>

        </Content>
      </Layout>
    </ThemeProvider>
  )
}
