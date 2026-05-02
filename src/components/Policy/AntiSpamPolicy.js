import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 4rem;
  line-height: 1.6;
  color: #1a1a1a;
  background-color: #fefefe;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e6e6e6;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #111;
  letter-spacing: -0.3px;
`;

const LastUpdated = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaeaea;
  color: #222;
`;


const Paragraph = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #2c3e50;
`;

const List = styled.ul`
  margin: 0.75rem 0 1rem 1.8rem;
  padding-left: 0;
  li {
    margin-bottom: 0.5rem;
  }
`;

const ContactBox = styled.div`
  background-color: #f9f9f9;
  padding: 1rem 1.5rem;
  border-left: 4px solid #dc2626;
  margin: 1.5rem 0;
  font-size: 0.95rem;
  border-radius: 4px;
`;

const Footer = styled.footer`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaeaea;
  text-align: center;
  font-size: 0.85rem;
  color: #777;
`;

const NoteBox = styled.div`
  background-color: #fef3c7;
  padding: 1rem 1.5rem;
  border-left: 4px solid #f59e0b;
  margin: 1.5rem 0;
  font-size: 0.95rem;
  border-radius: 4px;
`;

const AntiSpamPolicy = () => {
    return (
        <Container>
            <Header>
                <Title>Anti-Spam Policy</Title>
                <LastUpdated>Effective Date: As of current version</LastUpdated>
            </Header>

            <Paragraph>
                Atomwalk Technologies ("we," "our," or "the Company") is committed to maintaining a clean, secure, and respectful online environment for all users. As part of our dedication to quality, integrity, and compliance with applicable laws, we have established this Anti-Spam Policy to prevent the misuse of our services and to protect our customers from unwanted or unsolicited communications.
            </Paragraph>

            <Section>
                <SectionTitle>Definition of Spam</SectionTitle>
                <Paragraph>
                    Spam refers to any unsolicited, bulk, or irrelevant messages, typically sent for the purposes of advertising, phishing, or other malicious activities. This includes, but is not limited to:
                </Paragraph>
                <List>
                    <li>Unsolicited emails (including those with misleading subject lines, fake return addresses, or unrelated content).</li>
                    <li>Automated or unsolicited social media messages.</li>
                    <li>Unsolicited text messages (SMS) or phone calls.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Prohibited Activities</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies prohibits the use of its products and services for any activities that may result in the sending, distribution, or delivery of spam. The following activities are strictly prohibited:
                </Paragraph>
                <List>
                    <li>Sending unsolicited commercial emails or messages without prior consent.</li>
                    <li>Using any of our tools or services to harvest email addresses or other personal information for spamming purposes.</li>
                    <li>Sending bulk messages that overload the recipient's inbox, network, or devices.</li>
                    <li>Using deceptive tactics, such as false headers, misleading subject lines, or disguised URLs to disguise the origin or purpose of an email.</li>
                    <li>Failing to provide a working opt-out mechanism in email communications, making it impossible for recipients to unsubscribe from future messages.</li>
                    <li>Engaging in any activity that violates the CAN-SPAM Act, General Data Protection Regulation (GDPR), or other local anti-spam laws and regulations.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Responsibilities of Users</SectionTitle>
                <Paragraph>
                    All users of Atomwalk Technologies' services are responsible for ensuring that their actions comply with this Anti-Spam Policy. This includes, but is not limited to:
                </Paragraph>
                <List>
                    <li>Obtaining proper consent from individuals before sending marketing or promotional communications.</li>
                    <li>Providing recipients with clear and easy-to-understand opt-out/unsubscribe options in every email or communication.</li>
                    <li>Keeping email lists clean and up-to-date, ensuring that recipients who have opted out or unsubscribed are respected.</li>
                    <li>Not engaging in activities that could lead to the sending of unsolicited messages via our platform.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Compliance with Anti-Spam Laws</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies is committed to complying with all applicable anti-spam laws and regulations, including but not limited to the CAN-SPAM Act (U.S.), GDPR (EU), and other local legislation governing the use of electronic communications. We expect all users of our services to do the same.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Enforcement of this Policy</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies takes violations of this Anti-Spam Policy seriously. Any user found to be in breach of this policy may face one or more of the following actions:
                </Paragraph>
                <List>
                    <li>Immediate suspension or termination of accounts.</li>
                    <li>Removal of any content that violates this policy.</li>
                    <li>Reporting the violation to relevant authorities or partners if required by law.</li>
                    <li>Legal action in cases where the violation results in harm to our company or customers.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Reporting Spam</SectionTitle>
                <Paragraph>
                    If you believe you have received spam messages or have identified any other violation of this policy, please contact us immediately with details of the incident. We will investigate the issue and take appropriate action.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Policy Updates</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies reserves the right to update or modify this Anti-Spam Policy at any time. Any changes will be communicated through our website or via email to registered users. Users are encouraged to review this policy regularly to stay informed of any updates.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Contact Information</SectionTitle>
                <Paragraph>
                    If you have any questions or concerns about this Anti-Spam Policy or need assistance, please reach out to us at:
                </Paragraph>
                <ContactBox>
                    <strong>Email</strong>: <a href="mailto:support@atomwalk.com" style={{ color: '#dc2626', textDecoration: 'none' }}>support@atomwalk.com</a>
                </ContactBox>
            </Section>

            <NoteBox>
                <strong>📧 Our Commitment</strong>
                <Paragraph style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    This Anti-Spam Policy is designed to help protect users and ensure a safe and secure online experience while using Atomwalk Technologies' services. Thank you for your cooperation in keeping our platform free from spam.
                </Paragraph>
            </NoteBox>

            <Footer>
                <p>Atomwalk Technologies Pvt. Ltd. — Gopalan Millennium Towers, ITPL Main Rd, Brookfield, Whitefield, Bengaluru, Karnataka 560037</p>
            </Footer>
        </Container>
    );
};

export default AntiSpamPolicy;