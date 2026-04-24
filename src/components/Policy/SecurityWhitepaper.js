import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
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



const NoteBox = styled.div`
  background-color: #f0f9ff;
  padding: 1rem 1.5rem;
  border-left: 4px solid #3b82f6;
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

const SecurityWhitepaper = () => {
    return (
        <Container>
            <Header>
                <Title>Security Whitepaper</Title>
                <LastUpdated>Security at Atomwalk Technologies</LastUpdated>
            </Header>

            <Section>
                <SectionTitle>Security</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies is committed to safeguarding information assets, client data, intellectual property, and development environments. As a software development company, Atomwalk Technologies implements organizational, technical, and physical security measures designed to protect data throughout the software development lifecycle, from requirements and design to development, testing, deployment, and maintenance.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Organizational security</SectionTitle>

                <SubsectionTitle>Employee background checks</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies conducts background verification for employees and contractors prior to engagement, particularly for roles that involve access to client systems, source code, proprietary information, or sensitive data. These checks are performed in accordance with applicable employment and data protection laws and are designed to confirm identity, employment history, and role suitability. By ensuring that personnel are appropriately vetted, Atomwalk Technologies reduces insider risk and establishes a foundation of trust with clients.
                </Paragraph>

                <SubsectionTitle>Security Awareness</SubsectionTitle>
                <Paragraph>
                    Security awareness is a core part of Atomwalk Technologies' organizational culture. Employees receive ongoing training focused on secure coding practices, data protection responsibilities, phishing and social engineering risks, password management, and secure use of development tools. Training is provided during onboarding and reinforced periodically to ensure employees remain informed of evolving cybersecurity threats relevant to software development environments.
                </Paragraph>

                <SubsectionTitle>Dedicated security and privacy teams</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies maintains dedicated security and privacy resources responsible for defining security policies, overseeing implementation, managing risks, and ensuring compliance with contractual and regulatory requirements. These teams work closely with development, quality assurance, and operations teams to integrate security and privacy considerations into development workflows and project delivery.
                </Paragraph>

                <SubsectionTitle>Internal audit and compliance</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies conducts periodic internal audits, security assessments, and compliance reviews to evaluate the effectiveness of security controls across organizational processes and technical environments. These reviews help identify potential gaps, assess risk exposure, and verify alignment with internal policies and industry standards. Identified findings are documented, tracked, and addressed through corrective actions to support continuous improvement of the company's security posture.
                </Paragraph>

                <SubsectionTitle>Endpoint security</SubsectionTitle>
                <Paragraph>
                    All company-issued and authorized devices used for software development, testing, or client access are protected through endpoint security controls. These controls include device hardening, operating system and application patching, anti-malware protection, access restrictions, and continuous monitoring. Endpoint security measures help prevent unauthorized access, data leakage, and malware infections that could compromise client projects or internal systems.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Physical security</SectionTitle>

                <SubsectionTitle>At workplace</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies enforces physical access controls at its office locations to ensure that only authorized personnel can access workspaces where development activities and confidential information are handled. Measures may include access badges, visitor registration procedures, escort policies, and restricted access to sensitive areas. These controls reduce the risk of unauthorized physical access to systems, documentation, or devices that could impact security.
                </Paragraph>

                <SubsectionTitle>At Data Centers</SubsectionTitle>
                <Paragraph>
                    Where Atomwalk Technologies operates or accesses hosted development or delivery environments, infrastructure is hosted in secure data centers or cloud facilities that implement industry-standard physical security measures. Such facilities typically include perimeter controls, surveillance systems, controlled entry points, environmental safeguards, and on-site security personnel to protect systems and data from physical threats.
                </Paragraph>

                <SubsectionTitle>Monitoring</SubsectionTitle>
                <Paragraph>
                    Physical access to offices and infrastructure supporting development activities is monitored through access logs and surveillance systems. Monitoring enables the detection of unauthorized access attempts and supports investigation and response in the event of a physical security incident.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Infrastructure security</SectionTitle>

                <SubsectionTitle>Network security</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies applies network security controls to protect internal development networks and client-connected environments from unauthorized access and cyber threats. These controls include firewalls, network segmentation, secure configuration practices, and controlled access based on role and necessity. Network traffic is monitored to identify abnormal or suspicious activity that could indicate security incidents.
                </Paragraph>

                <SubsectionTitle>Network redundancy</SubsectionTitle>
                <Paragraph>
                    Redundant network components and connectivity are implemented where feasible to support operational resilience and minimize disruptions to development and delivery activities. Redundancy helps ensure continued availability of critical systems even in the event of hardware or connectivity failures.
                </Paragraph>

                <SubsectionTitle>DDoS prevention</SubsectionTitle>
                <Paragraph>
                    Protective measures are implemented to detect and mitigate distributed denial-of-service attacks that could impact development environments or client-facing systems. These measures help preserve system availability and ensure continuity of services.
                </Paragraph>

                <SubsectionTitle>Server hardening</SubsectionTitle>
                <Paragraph>
                    Servers used for development, testing, or project delivery are configured using secure baseline standards that limit unnecessary services, enforce strong authentication, and apply security updates promptly. Server hardening reduces the attack surface and lowers the likelihood of exploitation.
                </Paragraph>

                <SubsectionTitle>Intrusion detection and prevention</SubsectionTitle>
                <Paragraph>
                    Monitoring and detection mechanisms are deployed to identify potential intrusions or malicious activity within systems and networks. Alerts enable timely investigation and response, reducing the impact of security incidents.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Data security</SectionTitle>

                <SubsectionTitle>Secure by design</SubsectionTitle>
                <Paragraph>
                    Security considerations are embedded into the software development lifecycle at Atomwalk Technologies. Secure design principles, code reviews, testing practices, and risk assessments are applied to reduce vulnerabilities and ensure that applications developed for clients align with security best practices.
                </Paragraph>

                <SubsectionTitle>Data isolation</SubsectionTitle>
                <Paragraph>
                    Client data, source code, and project environments are logically segregated to prevent unauthorized access between projects or clients. Access is restricted based on role and project assignment, ensuring confidentiality and integrity of client assets.
                </Paragraph>

                <SubsectionTitle>Encryption</SubsectionTitle>
                <Paragraph>
                    Sensitive information is protected through encryption when transmitted over networks using secure protocols. Where applicable, data stored in systems or repositories is encrypted to reduce the risk of unauthorized disclosure.
                </Paragraph>

                <SubsectionTitle>Data retention and disposal</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies follows defined data retention practices to ensure client data and project materials are retained only as long as necessary for business or contractual purposes. Secure deletion and disposal methods are used when data is no longer required, minimizing the risk of residual data exposure.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Identity and Access control</SectionTitle>

                <SubsectionTitle>Single Sign-On (SSO)</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies implements centralized identity and authentication mechanisms, including Single Sign-On (SSO), where appropriate, to manage access to internal systems, development tools, source code repositories, and project environments. By using a centralized identity framework, Atomwalk Technologies ensures consistent enforcement of authentication policies across platforms and reduces the risks associated with fragmented credential management. SSO enables employees to authenticate through a trusted identity provider, improving access visibility, simplifying user lifecycle management, and allowing rapid revocation of access when roles change or employment ends. This approach helps minimize unauthorized access while supporting secure and efficient development operations.
                </Paragraph>

                <SubsectionTitle>Multi-Factor Authentication</SubsectionTitle>
                <Paragraph>
                    To strengthen protection against credential compromise, Atomwalk Technologies enforces Multi-Factor Authentication (MFA) for access to critical systems, administrative tools, cloud platforms, and repositories containing sensitive client data or proprietary source code. MFA requires users to verify their identity using an additional authentication factor beyond a password, such as a time-based token or device-based confirmation. This layered approach significantly reduces the risk of unauthorized access resulting from stolen or weak credentials and provides an essential safeguard in environments where remote access and cloud-based development tools are widely used.
                </Paragraph>

                <SubsectionTitle>Administrative access</SubsectionTitle>
                <Paragraph>
                    Administrative and privileged access within Atomwalk Technologies is strictly controlled and granted only to authorized personnel based on defined job responsibilities and the principle of least privilege. Elevated access rights are approved through formal processes, documented, and reviewed periodically to ensure continued business necessity. All administrative activities are logged and monitored to provide accountability and traceability, enabling detection of misuse or unauthorized actions. By tightly controlling privileged access, Atomwalk Technologies reduces the risk of accidental or malicious changes that could impact system security, client data, or development environments.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Operational security</SectionTitle>

                <SubsectionTitle>Logging and Monitoring</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies maintains comprehensive logging and monitoring practices across its development environments, internal systems, and supporting infrastructure to ensure visibility into system activity and user access. Logs are generated for authentication events, system changes, administrative actions, and access to sensitive resources such as source code repositories and client data. These logs are monitored to detect abnormal behavior, potential security threats, or policy violations, and are retained in accordance with internal retention policies. Effective logging and monitoring enable timely identification of security incidents, support forensic investigations, and contribute to accountability and compliance objectives.
                </Paragraph>

                <SubsectionTitle>Vulnerability management</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies operates a structured vulnerability management program designed to identify, assess, prioritize, and remediate security weaknesses in development tools, infrastructure, and applications. This program includes regular vulnerability scanning, review of security advisories, and assessment of risks based on severity and potential impact. Identified vulnerabilities are addressed through timely patching, configuration changes, or compensating controls, and remediation efforts are tracked to completion. This proactive approach helps reduce the likelihood of exploitation and supports the ongoing security of development and operational environments.
                </Paragraph>

                <SubsectionTitle>Malware and spam protection</SubsectionTitle>
                <Paragraph>
                    To protect systems and employees from malicious software and deceptive communications, Atomwalk Technologies deploys malware and spam protection controls across endpoints, email systems, and network environments. These controls are designed to detect and block viruses, ransomware, phishing attempts, and other malicious content that could compromise systems or lead to unauthorized access. By reducing exposure to malware and social engineering attacks, Atomwalk Technologies strengthens its overall security posture and protects both internal operations and client-related assets.
                </Paragraph>

                <SubsectionTitle>Backup</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies performs regular backups of critical systems, development environments, source code repositories, and project data to protect against data loss, corruption, or system failure. Backups are stored securely and protected from unauthorized access, and recovery processes are periodically reviewed or tested to ensure reliability. Backup practices support business continuity and help ensure that client deliverables and internal systems can be restored in a timely manner following an incident or operational disruption.
                </Paragraph>

                <SubsectionTitle>Disaster recovery and business continuity</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies maintains disaster recovery and business continuity plans designed to support the continued operation of critical business functions in the event of disruptive incidents such as system outages, natural disasters, or cybersecurity events. These plans define recovery objectives, roles, and procedures for restoring systems and resuming development activities. Plans are reviewed and updated periodically to reflect changes in operations, ensuring that Atomwalk Technologies can minimize downtime and continue delivering services to clients during and after adverse events.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Incident Management</SectionTitle>

                <SubsectionTitle>Reporting</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies maintains formal incident management procedures to ensure that security events are identified, reported, assessed, and handled in a consistent and timely manner. Employees are trained to recognize potential security incidents, including unauthorized access, data exposure, system compromise, or policy violations, and to report such events through defined internal channels. Once reported, incidents are documented, investigated to determine scope and impact, and addressed through corrective and preventive actions. This structured approach enables Atomwalk Technologies to minimize harm, restore normal operations, and continuously improve its security controls based on lessons learned.
                </Paragraph>

                <SubsectionTitle>Breach notification</SubsectionTitle>
                <Paragraph>
                    In the event of a confirmed security breach involving client data, Atomwalk Technologies follows a defined notification process in accordance with contractual commitments and applicable legal or regulatory requirements. Notifications are provided in a timely manner and include relevant information to help clients understand the nature of the incident, its potential impact, and the steps taken to mitigate risk. Atomwalk Technologies works cooperatively with affected clients during incident response and remediation efforts to support transparency and trust.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Responsible Disclosures</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies encourages the responsible disclosure of security vulnerabilities by clients, partners, and independent security researchers. Vulnerability reports are reviewed by qualified personnel, validated, and prioritized based on potential risk and impact. Appropriate remediation actions are implemented in a timely manner, and disclosures are handled in a coordinated and professional way to reduce the likelihood of exploitation. This approach supports continuous improvement of security controls and demonstrates Atomwalk Technologies' commitment to maintaining secure development practices.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Vendor and Third-party supplier management</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies engages third-party vendors and service providers only after evaluating the security risks associated with their services. Due diligence is performed to assess a vendor's ability to protect information and systems, particularly where access to client data, development environments, or internal systems is involved. Contractual agreements include security and confidentiality obligations appropriate to the nature of the engagement. Ongoing monitoring and periodic reviews are conducted to ensure third-party security practices remain aligned with Atomwalk Technologies' security requirements and client expectations.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Customer controls for security</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies works collaboratively with clients to align security practices with client-specific requirements and contractual obligations. Clients may define access controls, approval processes, data handling expectations, communication protocols, and project-specific security measures as part of project governance. Atomwalk Technologies supports these controls through role-based access, segregation of project environments, and transparent communication, enabling clients to maintain oversight and confidence in how their data and intellectual property are protected throughout the engagement.
                </Paragraph>
            </Section>

            <NoteBox>
                <strong>🔒 Commitment to Security</strong>
                <Paragraph style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    Atomwalk Technologies is dedicated to continuously improving its security posture through regular assessments, employee training, and adherence to industry best practices. For any security-related inquiries or responsible disclosure of vulnerabilities, please contact our security team.
                </Paragraph>
            </NoteBox>

            <Footer>
                <p>Atomwalk Technologies Pvt. Ltd. — Gopalan Millennium Towers, ITPL Main Rd, Brookfield, Whitefield, Bengaluru, Karnataka 560037</p>
            </Footer>
        </Container>
    );
};

export default SecurityWhitepaper;