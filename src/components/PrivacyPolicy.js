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



const ContactBox = styled.div`
  background-color: #f9f9f9;
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

const PrivacyPolicy = () => {
  return (
    <Container>
      <Header>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last Updated: As of current version</LastUpdated>
      </Header>

      <Paragraph>
        Atomwalk Technologies ("Atomwalk," "we," "us," or "our") is committed to protecting the privacy and personal information of individuals who access or use our websites, applications, products, and services (collectively, the "Services"). This Privacy Policy describes how Atomwalk Technologies collects, uses, processes, shares, retains, and protects personal information and service data in accordance with applicable data protection laws.
      </Paragraph>

      <Paragraph>
        By accessing or using our Services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
      </Paragraph>

      <Section>
        <SectionTitle>Privacy Commitment</SectionTitle>
        <Paragraph>
          Atomwalk Technologies is committed to maintaining transparency, accountability, and fairness in the processing of personal information. We collect only the information necessary to provide and improve our Services and process such information in a lawful, secure, and responsible manner.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Information Atomwalk Technologies collects and controls</SectionTitle>

        <SubsectionTitle>What information Atomwalk Technologies collects</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies collects personal and non-personal information to ensure the effective operation, delivery, and improvement of its services. The information we collect depends on how individuals interact with our websites, applications, products, and services. This information may include personal identifiers such as names, contact details, account credentials, business information, and payment-related details, as well as technical and usage-related data. We collect this information through direct interactions, automated technologies, and trusted third-party sources. All information collected is limited to what is necessary to fulfil legitimate business purposes and is handled in accordance with applicable privacy and data protection laws.
        </Paragraph>

        <SubsectionTitle>Information that you provide us</SubsectionTitle>
        <Paragraph>
          Information that you provide directly to Atomwalk Technologies includes any data you voluntarily submit while interacting with our services. This may occur when you create an account, subscribe to a service, complete forms, make payments, communicate with customer support, respond to surveys, or otherwise contact us. Such information may include your full name, email address, phone number, postal address, company name, job title, login credentials, billing details, and any content you choose to share in messages or uploaded materials. This information allows us to identify you, provide requested services, manage your account, process transactions, respond to inquiries, and maintain ongoing communication. You are responsible for ensuring that the information you provide is accurate and up to date.
        </Paragraph>

        <SubsectionTitle>Information that we collect automatically</SubsectionTitle>
        <Paragraph>
          When you access or use Atomwalk Technologies' websites or services, certain information is automatically collected through technical means. This information may include your IP address, device identifiers, browser type, operating system, language preferences, time zone, referral URLs, pages viewed, session duration, and interaction patterns. We may also collect data through cookies, pixels, log files, and similar tracking technologies. This automatically collected information helps us understand how users interact with our services, diagnose technical issues, improve performance, enhance security, prevent unauthorized access, and optimize the overall user experience. Such data is generally aggregated and analysed to identify trends and usage patterns rather than to personally identify individuals, unless required for security or legal purposes.
        </Paragraph>

        <SubsectionTitle>Information that we collect from third parties</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies may receive information about you from third-party sources to supplement the information we collect directly or automatically. These third parties may include business partners, service providers, analytics providers, payment processors, advertising networks, social media platforms, and publicly available databases. Information obtained from third parties may include contact details, business information, demographic data, marketing insights, or usage analytics. We use this information to improve service accuracy, enhance marketing efforts, prevent fraud, verify data, and better understand customer needs. Any information received from third parties is processed in accordance with this Privacy Policy and applicable legal requirements.
        </Paragraph>

        <SubsectionTitle>Purposes for using information</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies uses collected information for a wide range of legitimate business purposes. These purposes include providing and maintaining services, creating and managing user accounts, processing payments and transactions, delivering customer support, communicating service-related updates, and responding to inquiries. We also use information to improve and develop new features, conduct internal research and analytics, monitor usage trends, ensure system security, prevent fraud, and enforce our terms and policies. Where permitted by law, we may use information to send promotional communications, marketing messages, or notifications about products, services, and events that may be relevant to you. All uses of information are aligned with the expectations of users and applicable data protection laws.
        </Paragraph>

        <SubsectionTitle>Legal bases for collecting and using information</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies collects and processes personal information only when there is a valid legal basis to do so. These legal bases may include your explicit consent, the necessity of processing information to perform a contract or provide requested services, compliance with legal and regulatory obligations, and our legitimate business interests. Legitimate interests may include improving service quality, ensuring security, preventing misuse, and maintaining operational efficiency, provided such interests do not override your fundamental rights and freedoms. Where consent is required, you have the right to withdraw it at any time, subject to legal and contractual limitations.
        </Paragraph>

        <SubsectionTitle>Your choice in information use</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies respects your right to control how your personal information is used. You may choose to review, update, correct, or delete certain personal information through your account settings or by contacting us. You may opt out of receiving marketing or promotional communications at any time by following the unsubscribe instructions or adjusting your communication preferences. You may also manage cookie preferences through your browser settings. Depending on your location and applicable laws, you may have additional rights, such as requesting access to your personal data, restricting certain processing activities, or requesting data portability. We strive to honour all valid requests in accordance with legal requirements.
        </Paragraph>

        <SubsectionTitle>Who we share your information with</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies may share personal information with trusted third parties only when necessary to provide services or fulfil legal obligations. These third parties may include service providers who assist with hosting, payment processing, analytics, customer support, marketing, and technical operations. Such providers are contractually obligated to protect your information and use it solely for authorized purposes. We may also share information with legal authorities, regulators, or law enforcement agencies when required by law or to protect the rights, property, and safety of Atomwalk Technologies, our users, or others. In the event of a merger, acquisition, restructuring, or sale of assets, personal information may be transferred as part of the business transaction, subject to appropriate safeguards.
        </Paragraph>

        <SubsectionTitle>Retention of information</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies retains personal information only for as long as it is necessary to fulfil the purposes for which it was collected, including providing services, meeting legal and regulatory obligations, resolving disputes, and enforcing agreements. Retention periods may vary depending on the type of information, the purpose of processing, and applicable legal requirements. When personal information is no longer required, we take reasonable steps to securely delete, anonymize, or de-identify the data to prevent unauthorized access or use.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Information that Atomwalk Technologies processes on your behalf</SectionTitle>

        <SubsectionTitle>Information entrusted to Atomwalk Technologies and purpose</SubsectionTitle>
        <Paragraph>
          In the course of providing its services, Atomwalk Technologies may process information on behalf of its customers that has been voluntarily entrusted to us. This information, commonly referred to as service data, may include personal, business, or operational data uploaded, stored, transmitted, or otherwise made available by customers or their authorized users while using our platforms, applications, or services. The nature of this data depends entirely on how customers choose to use our services and may include customer records, employee information, communications, documents, or other content. Atomwalk Technologies processes this information solely for the purpose of delivering the requested services, maintaining system functionality, providing technical support, ensuring security, and complying with contractual and legal obligations. We do not use this data for our own independent purposes.
        </Paragraph>

        <SubsectionTitle>Ownership and control of your service data</SubsectionTitle>
        <Paragraph>
          All service data entrusted to Atomwalk Technologies remains the exclusive property of the customer. Atomwalk Technologies does not claim ownership of, or any rights over, service data beyond what is necessary to provide and support the services. Customers retain full control over how their data is collected, used, shared, and retained within the services. We act strictly as a data processor or service provider, processing service data only in accordance with customer instructions, applicable agreements, and relevant data protection laws. Customers are responsible for ensuring that they have the appropriate rights and permissions to submit service data for processing.
        </Paragraph>

        <SubsectionTitle>How we use service data</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies uses service data exclusively to operate, maintain, and improve the services provided to customers. This includes hosting and storing data, enabling core functionality, performing backups, monitoring system performance, troubleshooting technical issues, and responding to customer support requests. Service data may also be used to enhance security, prevent fraud or misuse, and ensure compliance with legal and contractual requirements. We do not access service data for marketing, advertising, or profiling purposes, and we do not analyse service data except as necessary to deliver and improve the services in accordance with customer instructions.
        </Paragraph>

        <SubsectionTitle>Push notifications</SubsectionTitle>
        <Paragraph>
          As part of service delivery, Atomwalk Technologies may send push notifications related to the operation and functionality of the services. These notifications may include important alerts, system updates, security notices, reminders, or other service-related communications necessary to ensure proper use of the services. Push notifications are not used for unauthorized marketing purposes and are intended to enhance user awareness and service reliability. Customers and users can manage or disable push notifications through their account settings or device preferences, subject to the functionality of the services.
        </Paragraph>

        <SubsectionTitle>Who we share service data with</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies shares service data only with authorized third parties when necessary to provide the services or comply with legal obligations. Such third parties may include infrastructure providers, cloud hosting services, payment processors, customer support vendors, and other service providers who assist in delivering and maintaining our services. All such parties are bound by contractual obligations to protect service data, maintain confidentiality, and use the data solely for authorized purposes. Service data may also be disclosed to legal or regulatory authorities if required by law or in response to valid legal requests. Atomwalk Technologies does not sell, rent, or disclose service data for advertising or unrelated commercial purposes.
        </Paragraph>

        <SubsectionTitle>Retention of information</SubsectionTitle>
        <Paragraph>
          Service data is retained only for the duration specified by the customer, as required to provide the services, or as mandated by applicable laws and contractual obligations. Customers may request the deletion, return, or export of their service data, subject to legal and technical limitations. Upon termination of services or upon customer request, Atomwalk Technologies will take reasonable steps to securely delete or return service data within a reasonable timeframe, unless retention is required by law. Any retained data is protected using appropriate security measures until it is securely disposed of.
        </Paragraph>

        <SubsectionTitle>Data subject requests</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies supports customers in fulfilling data subject requests related to service data, such as requests for access, correction, deletion, or restriction of processing. As a data processor, we act in accordance with customer instructions and applicable data protection laws when responding to such requests. Customers are primarily responsible for handling data subject requests from their end users; however, Atomwalk Technologies will provide reasonable assistance, technical support, and documentation where required to enable compliance with legal obligations.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>General</SectionTitle>

        <SubsectionTitle>Children's personal information</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies' services are intended for use by businesses and individuals who are legally capable of entering into binding agreements. Our services are not directed toward children, and we do not knowingly collect, use, or process personal information belonging to children. If Atomwalk Technologies becomes aware that personal information of a child has been collected inadvertently, we will take appropriate steps to delete such information promptly and in accordance with applicable laws. Parents or guardians who believe that a child has provided personal information to us may contact us to request its removal.
        </Paragraph>

        <SubsectionTitle>How secure is your information</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies takes the security of personal information and service data seriously and implements reasonable administrative, technical, and organizational measures to protect information against unauthorized access, disclosure, alteration, or destruction. These safeguards may include access controls, encryption, secure servers, internal policies, and employee training. While we strive to protect information using industry-standard practices, no method of transmission over the internet or electronic storage can be guaranteed to be completely secure. Accordingly, Atomwalk Technologies cannot guarantee absolute security, but we remain committed to continuously improving our security practices.
        </Paragraph>

        <SubsectionTitle>External links on our websites</SubsectionTitle>
        <Paragraph>
          Our websites and services may contain links to external websites or services that are operated by third parties. These external sites are not under the control of Atomwalk Technologies, and we are not responsible for their content, security, or privacy practices. Users are encouraged to review the privacy policies of any third-party websites they visit, as this Privacy Policy applies only to information collected by Atomwalk Technologies.
        </Paragraph>

        <SubsectionTitle>Blogs and forums</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies may provide blogs, forums, comment sections, or other public communication platforms. Any information you choose to submit or post in these public areas may be visible to others and may be read, collected, or used by third parties. Atomwalk Technologies is not responsible for how third parties use information that you voluntarily disclose in public forums, and you should exercise caution when sharing personal or sensitive information in such spaces.
        </Paragraph>

        <SubsectionTitle>Disclosures in compliance with legal obligations</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies may disclose personal information or service data when required to do so by applicable laws, regulations, legal processes, or governmental requests. We may also disclose information where necessary to enforce our terms, protect our legal rights, prevent fraud or security issues, or protect the safety of Atomwalk Technologies, our customers, users, or the public. Any such disclosures are made in accordance with applicable legal requirements.
        </Paragraph>

        <SubsectionTitle>Compliance with this Privacy Policy</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies regularly reviews its data collection, processing, and security practices to ensure compliance with this Privacy Policy and applicable data protection laws. Employees and service providers with access to personal information are required to comply with confidentiality and security obligations. We take appropriate action when violations of this Privacy Policy are identified.
        </Paragraph>

        <SubsectionTitle>Notification of changes</SubsectionTitle>
        <Paragraph>
          Atomwalk Technologies reserves the right to modify or update this Privacy Policy from time to time to reflect changes in legal requirements, business practices, or services. Any updates will be posted on our website, and the "Last Updated" date will be revised accordingly. Continued use of our services after such changes constitutes acceptance of the updated Privacy Policy.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Contact Information</SectionTitle>
        <Paragraph>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:
        </Paragraph>
        <ContactBox>
          <strong>Atomwalk Technologies</strong><br />
          <strong>Email</strong>: <a href="mailto:support@atomwalk.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>support@atomwalk.com</a><br />
          <strong>Address</strong>: Gopalan Millennium Towers, ITPL Main Rd, Brookfield, Whitefield, Bengaluru, Karnataka 560037
        </ContactBox>
      </Section>

      <Footer>
        <p>Atomwalk Technologies Pvt. Ltd. — Protecting your privacy is our priority.</p>
      </Footer>
    </Container>
  );
};

export default PrivacyPolicy;