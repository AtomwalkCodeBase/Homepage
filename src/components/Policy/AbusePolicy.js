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

const SubsectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1.25rem 0 0.75rem 0;
  color: #2c3e50;
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



const ContactInfo = styled.div`
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



const AbusePolicy = () => {
    return (
        <Container>
            <Header>
                <Title>Abuse Policy</Title>
                <LastUpdated>Effective Date: Upon acceptance</LastUpdated>
            </Header>

            <Paragraph>
                At Atomwalk Technologies, we are committed to maintaining a safe, respectful, and professional environment for all users, clients, and employees. This policy defines unacceptable behavior and sets clear expectations for how we address abuse, whether it occurs within our platform, communications, or in the workplace.
            </Paragraph>

            <Section>
                <SectionTitle>Types of Abuse</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies has a zero-tolerance policy toward abusive behavior. The following behaviors are strictly prohibited:
                </Paragraph>

                <SubsectionTitle>1. Spam, Malware, and Phishing</SubsectionTitle>
                <Paragraph>
                    <strong>Spam:</strong> The use of our platform or services to send unsolicited, repetitive, or irrelevant messages, advertisements, or promotions.
                </Paragraph>
                <Paragraph>
                    <strong>Malware:</strong> Any attempt to introduce or distribute malicious software, including viruses, worms, ransomware, or spyware, that can harm or disrupt systems or data.
                </Paragraph>
                <Paragraph>
                    <strong>Phishing:</strong> Attempts to deceive users into providing sensitive information (e.g., usernames, passwords, financial details) through fake websites, emails, or messages that appear legitimate but are intended to steal data.
                </Paragraph>

                <SubsectionTitle>2. Promotes Hatred, Violence, or Illegal/Offensive Activities</SubsectionTitle>
                <Paragraph>
                    Content or behavior that promotes hate, violence, discrimination, or illegal activities. This includes:
                </Paragraph>
                <List>
                    <li>Encouraging harm toward any individual or group based on race, religion, gender, sexual orientation, nationality, or other protected characteristics.</li>
                    <li>Content that glorifies violence, terrorism, or criminal behavior.</li>
                    <li>Promoting illegal activities such as drug trafficking, cybercrime, or human trafficking.</li>
                </List>

                <SubsectionTitle>3. Sexually Explicit Material</SubsectionTitle>
                <Paragraph>
                    The sharing, distribution, or creation of sexually explicit, pornographic, or suggestive content. This includes graphic depictions of sexual acts, nudity, or any content that violates community standards regarding decency and respect.
                </Paragraph>
                <Paragraph>
                    Any attempts to exploit or manipulate users into engaging in inappropriate behavior or conversations.
                </Paragraph>

                <SubsectionTitle>4. Child Exploitation</SubsectionTitle>
                <Paragraph>
                    Any form of child exploitation, including but not limited to:
                </Paragraph>
                <List>
                    <li>Child pornography or sexually explicit content involving minors.</li>
                    <li>Any attempt to groom or manipulate minors for inappropriate purposes, either online or in person.</li>
                    <li>The sharing of content that exploits or harms children in any way.</li>
                </List>

                <SubsectionTitle>5. Personal and Confidential Information</SubsectionTitle>
                <Paragraph>
                    Sharing or requesting personal, confidential, or private information without consent. This includes, but is not limited to:
                </Paragraph>
                <List>
                    <li>Identity theft or fraud.</li>
                    <li>Sharing of other people's private data (addresses, phone numbers, social security numbers, bank details, etc.) without authorization.</li>
                    <li>Doxxing or publicly disclosing someone's private information to harass or cause harm.</li>
                </List>

                <SubsectionTitle>6. Copyright Infringement</SubsectionTitle>
                <Paragraph>
                    Uploading, sharing, or distributing copyrighted materials (such as music, movies, software, or other intellectual property) without proper authorization or license. This includes:
                </Paragraph>
                <List>
                    <li>Piracy of digital content, software, or other proprietary works.</li>
                    <li>Unauthorized use of another person's trademarks or logos.</li>
                    <li>Distribution of content that violates intellectual property rights.</li>
                </List>

                <SubsectionTitle>7. Other Violations</SubsectionTitle>
                <Paragraph>
                    Any other behavior or content that violates the ethical standards of Atomwalk Technologies, including:
                </Paragraph>
                <List>
                    <li>Any form of harassment, bullying, or targeted abuse.</li>
                    <li>Impersonation of another individual or entity with the intent to deceive or harm.</li>
                    <li>Misuse of Atomwalk Technologies' services for fraudulent, deceptive, or harmful purposes.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Zero Tolerance Policy</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies enforces a zero-tolerance policy toward abusive behavior and violations of this policy. Any individual found engaging in any of the above forms of abuse will face immediate consequences, including but not limited to:
                </Paragraph>
                <List>
                    <li>Suspension or termination of accounts or access to Atomwalk Technologies' platforms and services.</li>
                    <li>Investigation and disciplinary action for employees, which may include counseling, suspension, or termination of employment.</li>
                    <li>Legal action where applicable, including cooperation with law enforcement for criminal activities such as identity theft, exploitation, or harassment.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Reporting Abuse</SectionTitle>
                <Paragraph>
                    If you encounter or suspect abusive behavior, please report it to our Abuse Prevention Team immediately. You can report an incident via:
                </Paragraph>
                <Paragraph>
                    <strong>Email:</strong> <a href="mailto:support@atomwalk.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>support@atomwalk.com</a>
                </Paragraph>
                <Paragraph>
                    All reports are handled confidentially, and Atomwalk Technologies is committed to investigating any complaints thoroughly and fairly.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Support for Affected Individuals</SectionTitle>
                <Paragraph>
                    If you are a victim of abuse or harassment, Atomwalk Technologies offers the following support:
                </Paragraph>
                <List>
                    <li>Counseling services or assistance for employees or users who may need support.</li>
                    <li>External resources, including links to relevant support organizations or legal advice.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Preventive Measures</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies is committed to reducing abuse through proactive measures, including:
                </Paragraph>
                <List>
                    <li><strong>Education and training:</strong> Regular training for employees, users, and customers about abusive behavior, its impact, and how to report it.</li>
                    <li><strong>Monitoring:</strong> Proactive monitoring for abusive behavior across platforms and services to identify and address problems early.</li>
                    <li><strong>Updating policies:</strong> Regularly reviewing and updating our abuse policy to ensure it meets current standards and adapts to new types of abuse or online threats.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Conclusion</SectionTitle>
                <Paragraph>
                    Abuse in any form is unacceptable at Atomwalk Technologies. We believe in fostering a safe, respectful, and professional environment where all individuals can work, collaborate, and communicate without fear of harm or exploitation. We are committed to enforcing this policy and taking swift action against any violations.
                </Paragraph>
            </Section>

            <ContactInfo>
                <strong>📢 Need to Report Abuse?</strong>
                <Paragraph style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    If you encounter or suspect abusive behavior, please contact our Abuse Prevention Team immediately at <a href="mailto:support@atomwalk.com" style={{ color: '#dc2626', textDecoration: 'none' }}>support@atomwalk.com</a>. All reports are handled confidentially.
                </Paragraph>
            </ContactInfo>

            <Footer>
                <p>Atomwalk Technologies Pvt. Ltd. — Gopalan Millennium Towers, ITPL Main Rd, Brookfield, Whitefield, Bengaluru, Karnataka 560037</p>
            </Footer>
        </Container>
    );
};

export default AbusePolicy;