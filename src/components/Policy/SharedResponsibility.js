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

const List = styled.ul`
  margin: 0.75rem 0 1rem 1.8rem;
  padding-left: 0;
  li {
    margin-bottom: 0.5rem;
  }
`;





const Footer = styled.footer`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaeaea;
  text-align: center;
  font-size: 0.85rem;
  color: #777;
`;

const SharedResponsibility = () => {
    return (
        <Container>
            <Header>
                <Title>Shared Responsibility</Title>
                <LastUpdated>Security & Compliance Responsibilities</LastUpdated>
            </Header>

            <Section>
                <Paragraph>
                    This outlines the shared, customer, and Atomwalk Technologies' responsibilities regarding security, data management, and compliance. The customer is responsible for securing their data, managing user access, enforcing password policies, and ensuring compliance with applicable regulations. Shared responsibilities focus on areas such as identity management, data protection, and incident response, where both parties collaborate to maintain security. Atomwalk Technologies, on the other hand, is accountable for securing the infrastructure, ensuring high availability, protecting physical data centers, and maintaining compliance with industry standards to safeguard the customer's data and services.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Customer's responsibility</SectionTitle>
                <Paragraph>
                    The customer plays a crucial role in the security and compliance of their operations. Although Atomwalk Technologies provides the infrastructure, tools, and services, the customer is responsible for managing and securing their own data and access.
                </Paragraph>

                <SubsectionTitle>Data Accountability</SubsectionTitle>
                <Paragraph>
                    Customers are accountable for the data they store and process on Atomwalk Technologies' systems. This includes ensuring the legality, accuracy, and integrity of their data. Customers must ensure they have obtained the proper consent from data subjects (e.g., customers, employees) and that data is handled in accordance with applicable laws and regulations.
                </Paragraph>
                <List>
                    <li>Ensure that all stored and processed data complies with privacy laws and industry regulations.</li>
                    <li>Maintain records of data processing activities.</li>
                    <li>Be responsible for how data is shared with third parties, especially when it involves sensitive personal data.</li>
                </List>

                <SubsectionTitle>Passwords</SubsectionTitle>
                <Paragraph>
                    The customer is responsible for securely managing and maintaining passwords for any systems, applications, and services they access within the Atomwalk Technologies platform. Weak or compromised passwords can expose sensitive data, so strong password management practices must be in place.
                </Paragraph>
                <List>
                    <li>Use strong, complex passwords that are hard to guess.</li>
                    <li>Implement multi-factor authentication (MFA) for all users whenever possible.</li>
                    <li>Regularly update passwords and require password changes for employees on a periodic basis.</li>
                </List>

                <SubsectionTitle>Client and End-point Security</SubsectionTitle>
                <Paragraph>
                    The customer is responsible for securing their own devices and endpoints. This includes securing workstations, mobile devices, and any other client-side hardware and software that interact with Atomwalk Technologies' systems.
                </Paragraph>
                <List>
                    <li>Ensure antivirus software, firewalls, and other endpoint protections are in place and regularly updated.</li>
                    <li>Conduct regular vulnerability assessments and patch management.</li>
                    <li>Control and monitor user access to critical systems to prevent unauthorized access.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Shared Responsibility</SectionTitle>
                <Paragraph>
                    Some areas of responsibility are shared between Atomwalk Technologies and the customer. Both parties must work together to manage security, privacy, and compliance effectively.
                </Paragraph>

                <SubsectionTitle>Identity and Access Management (IAM)</SubsectionTitle>
                <Paragraph>
                    IAM involves defining and managing the roles, privileges, and identities of users who access systems and data. While Atomwalk Technologies provides IAM tools and infrastructure, the customer is responsible for managing user roles and access rights to ensure that only authorized individuals have access to sensitive data.
                </Paragraph>
                <List>
                    <li>The customer must configure and manage roles and permissions within the platform.</li>
                    <li>Atomwalk Technologies will provide secure mechanisms (e.g., single sign-on, role-based access control) but the customer must ensure proper user management.</li>
                    <li>Both parties must implement strong authentication methods (e.g., MFA) for access to sensitive data.</li>
                </List>

                <SubsectionTitle>Data Management</SubsectionTitle>
                <Paragraph>
                    Both parties share the responsibility for proper data management. Atomwalk Technologies ensures the underlying infrastructure is secure and compliant, but customers are responsible for managing the actual content, structure, and lifecycle of their data.
                </Paragraph>
                <List>
                    <li>The customer must ensure that data is organized and categorized properly, and that there is no unnecessary exposure of sensitive data.</li>
                    <li>Atomwalk Technologies will ensure that the systems provide adequate protection for data in transit and at rest.</li>
                    <li>Data retention policies should be defined by the customer and enforced using Atomwalk Technologies' tools.</li>
                </List>

                <SubsectionTitle>Managing Data to Other Parties</SubsectionTitle>
                <Paragraph>
                    When data is shared with third parties, both Atomwalk Technologies and the customer must ensure that such transfers are conducted securely and in compliance with legal and regulatory requirements.
                </Paragraph>
                <List>
                    <li>Customers must obtain written agreements from third parties for the proper handling and processing of data.</li>
                    <li>Atomwalk Technologies ensures the infrastructure supports secure data transmission and access controls, but customers must manage third-party data-sharing processes.</li>
                </List>

                <SubsectionTitle>Data Subject Rights</SubsectionTitle>
                <Paragraph>
                    Under privacy regulations (such as GDPR), individuals (data subjects) have rights related to their personal data, including the right to access, rectify, delete, or object to processing. Customers are responsible for ensuring that these rights are upheld, though Atomwalk Technologies provides tools and services to help facilitate these rights.
                </Paragraph>
                <List>
                    <li>The customer must have a mechanism in place for data subjects to exercise their rights (e.g., a user portal for data access requests).</li>
                    <li>Atomwalk Technologies will provide secure tools to help fulfil requests, but the customer must handle the requests appropriately and legally.</li>
                </List>

                <SubsectionTitle>Encryption</SubsectionTitle>
                <Paragraph>
                    Encryption ensures the confidentiality and integrity of data both in transit and at rest. Atomwalk Technologies provides encryption mechanisms as part of its service offering. However, customers must decide how they want their data encrypted and ensure compliance with encryption standards.
                </Paragraph>
                <List>
                    <li>The customer must specify if they want specific data encryption strategies or needs beyond the default encryption options provided by Atomwalk Technologies.</li>
                    <li>Atomwalk Technologies ensures that data is encrypted while in transit (e.g., TLS encryption) and offers encryption at rest options, but it is up to the customer to enforce this for all sensitive data.</li>
                </List>

                <SubsectionTitle>Backups</SubsectionTitle>
                <Paragraph>
                    Backups are critical for ensuring business continuity. While Atomwalk Technologies provides infrastructure that includes backup capabilities, the customer must manage their own backup strategies, frequency, and retention policies.
                </Paragraph>
                <List>
                    <li>The customer must define their own backup schedule, ensuring that critical data is backed up regularly.</li>
                    <li>Atomwalk Technologies ensures that the backup infrastructure is secure and operational, but it is the customer's responsibility to monitor and verify the integrity of their backups.</li>
                </List>

                <SubsectionTitle>Incident Management</SubsectionTitle>
                <Paragraph>
                    Incident response is a shared responsibility. Both parties must respond to incidents such as data breaches or cybersecurity threats in a timely and coordinated manner. Atomwalk Technologies provides tools to detect and respond to security incidents, but the customer is responsible for reporting and managing incidents in their own systems.
                </Paragraph>
                <List>
                    <li>Customers must have an incident response plan that includes procedures for reporting security incidents, including those that involve Atomwalk Technologies' infrastructure.</li>
                    <li>Atomwalk Technologies ensures that their services offer monitoring and alerting capabilities but the customer must respond to alerts and coordinate the incident response.</li>
                </List>

                <SubsectionTitle>Awareness and Training</SubsectionTitle>
                <Paragraph>
                    Training and awareness programs are essential for ensuring the security and privacy of systems. Atomwalk Technologies provides training resources and best practices, but the customer is responsible for ensuring their staff are educated on security policies and practices.
                </Paragraph>
                <List>
                    <li>The customer should train their employees on security practices, such as recognizing phishing attempts, using strong passwords, and following proper data handling procedures.</li>
                    <li>Atomwalk Technologies provides resources and best practices but does not provide direct training to the customer's employees.</li>
                </List>

                <SubsectionTitle>Policy and Compliance</SubsectionTitle>
                <Paragraph>
                    Compliance with laws, regulations, and standards is a shared responsibility. While Atomwalk Technologies ensures its systems and services comply with industry standards, the customer must ensure that they comply with relevant regulations regarding data handling, privacy, and security.
                </Paragraph>
                <List>
                    <li>Customers are responsible for ensuring they comply with all applicable privacy laws and regulations (e.g., GDPR, HIPAA, CCPA).</li>
                    <li>Atomwalk Technologies will provide services and configurations that meet industry standards, but it is up to the customer to implement and enforce their own internal policies.</li>
                </List>
            </Section>

            <Section>
                <SectionTitle>Atomwalk Technologies' Responsibility</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies is responsible for providing the infrastructure, security mechanisms, and services necessary for secure and compliant operations. This includes managing the physical and network security, ensuring the availability and continuity of services, and providing a secure environment for customer data.
                </Paragraph>

                <SubsectionTitle>Data Security</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies is responsible for ensuring that data is securely stored and transmitted. This includes the implementation of robust encryption methods, network security controls, and threat detection mechanisms to protect customer data from unauthorized access and breaches.
                </Paragraph>
                <List>
                    <li>Ensure that data in transit is encrypted using industry-standard protocols (e.g., TLS).</li>
                    <li>Implement strict access controls to prevent unauthorized access to customer data.</li>
                    <li>Regularly audit security systems to identify vulnerabilities and remediate them proactively.</li>
                </List>

                <SubsectionTitle>Availability</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies is responsible for ensuring that its infrastructure and services are available and reliable. This includes providing high uptime, minimal service disruption, and maintaining the infrastructure required to support the customer's needs.
                </Paragraph>
                <List>
                    <li>Design the service infrastructure for high availability, redundancy, and scalability.</li>
                    <li>Monitor systems for uptime and performance, and provide alerts in case of issues.</li>
                    <li>Maintain Service Level Agreements (SLAs) that outline availability targets.</li>
                </List>

                <SubsectionTitle>Business Continuity</SubsectionTitle>
                <Paragraph>
                    In the event of a disaster or significant disruption, Atomwalk Technologies must ensure that customers' services can continue without significant loss of data or functionality. This includes having business continuity and disaster recovery plans in place.
                </Paragraph>
                <List>
                    <li>Implement disaster recovery procedures, such as data backup, system failover, and geographic redundancy.</li>
                    <li>Ensure rapid recovery of services in case of system failures, outages, or catastrophic events.</li>
                </List>

                <SubsectionTitle>Network Controls</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies is responsible for securing the network infrastructure, including firewalls, intrusion detection/prevention systems, and secure communication channels. This ensures that all data transmitted over the network is protected from unauthorized interception.
                </Paragraph>
                <List>
                    <li>Deploy and maintain network security devices such as firewalls, intrusion detection/prevention systems, and secure VPNs.</li>
                    <li>Monitor and mitigate network traffic for malicious activity.</li>
                </List>

                <SubsectionTitle>Host Infrastructure</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies ensures that the physical and virtual infrastructure, including servers, storage, and compute resources, are secure and compliant. This includes patch management, system updates, and securing access to these systems.
                </Paragraph>
                <List>
                    <li>Regularly update and patch software and systems to mitigate vulnerabilities.</li>
                    <li>Monitor the performance, integrity, and security of the host infrastructure.</li>
                </List>

                <SubsectionTitle>Physical Security</SubsectionTitle>
                <Paragraph>
                    Atomwalk Technologies is responsible for the physical security of the data centers and infrastructure that store and process customer data. This includes restricting physical access to authorized personnel and implementing surveillance and monitoring measures.
                </Paragraph>
            </Section>

            <Footer>
                <p>Atomwalk Technologies Pvt. Ltd. — Gopalan Millennium Towers, ITPL Main Rd, Brookfield, Whitefield, Bengaluru, Karnataka 560037</p>
            </Footer>
        </Container>
    );
};

export default SharedResponsibility;