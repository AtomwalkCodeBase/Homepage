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


const TermsOfService = () => {
    return (
        <Container>
            <Header>
                <Title>Terms of Service</Title>
                <LastUpdated>Effective Date: Upon acceptance</LastUpdated>
            </Header>

            <Paragraph>
                This Agreement ("Agreement") is between <strong>You</strong> (<strong>the user, whether individual or entity</strong>) and <strong>Atomwalk Technologies Pvt. Ltd.</strong> (Hereinafter <strong>Atomwalk Technologies</strong>) a company having registered office at Gopalan Millennium Towers, ITPL Main Rd, Brookfield, Whitefield, Bengaluru, Karnataka 560037.
            </Paragraph>

            <Section>
                <SectionTitle>ACCEPTANCE</SectionTitle>
                <Paragraph>
                    YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT BY SELECTING THE "ACCEPT" OPTION AND DOWNLOADING THE SOFTWARE PRODUCT OR BY INSTALLING, USING, OR COPYING THE SOFTWARE PRODUCT. YOU MUST AGREE TO ALL OF THE TERMS OF THIS AGREEMENT BEFORE YOU WILL BE ALLOWED TO DOWNLOAD THE SOFTWARE PRODUCT. IF YOU DO NOT AGREE TO ALL OF THE TERMS OF THIS AGREEMENT, YOU MUST SELECT "DECLINE" AND YOU MUST NOT INSTALL, USE, OR COPY THE SOFTWARE PRODUCT.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>DESCRIPTION OF SERVICE</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies Pvt. Ltd. offers Software as a solution (SaaS) platform. It is a unified business management system that integrates Enterprise resource planning (ERP), Customer Relationship Management (CRM), Human Resource Management (HRM), Project Management, Lab Management System (LMS), Lab Equipment Management (LEM), Hospital Management System, Energy Management System, Waste Management System, comprising but not limited to Procurement, Finance, inventory, Manufacturing Workflows, GST/TDS handling, Accounting, Dashboards, and Bank Reconciliation, Financial analytics and Reporting, Process Workflow Templates, Inventory Management. The platform enables companies/institutions seeking to automate operations, centralize data management, improve efficiency, and streamline manufacturing or service processes.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>USER SIGN UP OBLIGATIONS</SectionTitle>
                <Paragraph>
                    In order to access and utilize the Services provided by Atomwalk Technologies, you must first register for a user account by providing all required information, as prompted during the sign-up process. This account will grant you access to the full functionality of the Services, including any additional features or services that may be available upon subscription.
                </Paragraph>
                <SubsectionTitle>1. For Individual Users:</SubsectionTitle>
                <Paragraph>
                    You are required to submit accurate and up-to-date personal information during the registration process. This includes but is not limited to your full name, email address, phone number, and any other details required to verify your identity and provide appropriate access to the Services. As part of the registration process, you will be required to create login credentials (a username and password). You agree to safeguard the confidentiality of these credentials and not share them with any third party.
                </Paragraph>
                <SubsectionTitle>2. For Organizations or Corporate Users:</SubsectionTitle>
                <Paragraph>
                    If you are registering on behalf of an organization or business, you must use corporate contact information for the sign-up process. We strongly recommend using a valid corporate email address and ensuring that all other details provided, such as the organization name, address, phone number, and tax identification number (if applicable), are accurate and up-to-date. This will help us provide your organization with seamless access to the Services, while maintaining the highest level of security and account management.
                </Paragraph>
                <Paragraph>
                    Each user within your organization who will access the Services should also have their own unique user account, with all relevant personal or professional details accurately filled out. As an administrator or account holder representing the organization, it is your responsibility to ensure that all users in your organization adhere to these requirements and maintain the integrity of their individual user accounts.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>RESTRICTIONS ON USE</SectionTitle>
                <Paragraph>
                    By accessing and using the Services provided by Atomwalk Technologies, you agree to adhere to several restrictions regarding your use of the platform. Your access to the Services is personal and non-transferable. You are prohibited from transferring or sublicensing your access to third parties, whether for free or for compensation. Additionally, you may not use the Services to provide any form of service to third parties, unless prior written permission is obtained from Atomwalk Technologies. User licenses are assigned to individual users only, and sharing or reassigning your license to multiple users is prohibited, except in specific cases where reassignment is necessary.
                </Paragraph>
                <Paragraph>
                    You also agree not to attempt to reverse engineer, disassemble, or decompile any part of the Services, except as permitted by applicable law. You must comply with the terms of any third-party websites or services that you access through our platform, ensuring that you have the necessary permissions to use such content. Unauthorized use of third-party intellectual property, such as logos, trademarks, or other marks, is strictly prohibited. You are also prohibited from attempting to gain unauthorized access to the Services or engaging in activities that could disrupt the functionality of the platform, including attempting to overload or damage servers or networks.
                </Paragraph>
                <Paragraph>
                    The use of the Services to upload or distribute malicious content, such as viruses or malware, is prohibited. You must not tamper with, manipulate, or alter the Services in ways that interfere with their security, performance, or integrity. Any attempt to mislead others by creating false identities or transmitting harmful, defamatory, or false information through the Services will also result in termination of access. You must adhere to all applicable laws and regulations, and you are prohibited from using the Services for competitive analysis or benchmarking without prior written consent from Atomwalk Technologies. Additionally, removing or obscuring proprietary notices from the Services is strictly forbidden.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>SPAMMING AND ILLEGAL ACTIVITIES</SectionTitle>
                <Paragraph>
                    You are solely responsible for all content you transmit or share through Atomwalk Technologies' Services. You agree not to use the platform for any illegal activities, including transmitting content that is unlawful, defamatory, abusive, or invasive of others' privacy. This extends to content that may violate intellectual property rights or any other legal rights of third parties. Sending spam or unsolicited communications, including "junk mail," "chain letters," or "phishing" emails, is strictly prohibited. You may not use the Services for mass distribution of unsolicited communications, and all emails or messages must be sent with the explicit consent of the recipient.
                </Paragraph>
                <Paragraph>
                    In addition, you must not distribute or store any harmful content, such as malware, viruses, or other malicious software, that could damage or disrupt the functioning of systems, networks, or services. You are also prohibited from publishing, transmitting, or sharing harmful, offensive, or discriminatory content, including materials that are racist, sexist, abusive, or otherwise harmful to any individual or group based on religion, ethnicity, sexual orientation, or gender identity. The Services must not be used to harass, threaten, or cause harm to others.
                </Paragraph>
                <Paragraph>
                    Atomwalk Technologies holds you fully accountable for the content of your communications and interactions. If your use of the Services results in illegal, harmful, or otherwise prohibited activity, we reserve the right to terminate your access immediately. Such violations may lead to the loss of any rights to your data or subscriptions, and we may take appropriate legal action if necessary. Any violation of these terms, including involvement in illegal activities or distributing harmful content, will lead to immediate account suspension or termination, and potential forfeiture of any payments made.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>THIRD PARTY APPLICATIONS</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies may integrate with third-party applications ("Third Party Applications") as part of the Services we provide. By accessing or using any Third-Party Applications, you agree to review and comply with the applicable terms of service and privacy policies of those third parties. Atomwalk Technologies is not responsible for any issues related to the availability, performance, or functionality of Third-Party Applications. Any interactions or transactions with third-party providers are solely between you and the provider. We reserve the right, at our sole discretion, to suspend, remove, or limit access to any Third-Party Application without prior notice, and we are not liable for any loss, data, or service disruption that may result. You also agree to indemnify Atomwalk Technologies against any claims or damages arising from your use of such Third-Party Applications. Please note that Atomwalk Technologies is not responsible for the data practices of third-party providers, and you are encouraged to review their privacy policies to understand how your data is handled.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>FEES AND PAYMENTS</SectionTitle>
                <Paragraph>
                    At Atomwalk Technologies, Services are offered through a range of subscription plans, each varying in duration. At the end of your subscription period, you will receive an alert notifying you of the upcoming renewal. If you wish to continue using the services, you may choose to renew your subscription. You have the option to update your payment method before the renewal date if needed. Periodically, Atomwalk Technologies may modify the pricing of its services or introduce charges for services that were once available without cost. Any adjustments to pricing will not affect your current subscription until the end of your billing cycle. Charges for the Services will only apply if you have selected a paid plan. Additionally, any applicable taxes such as GST/ VAT/ Sales tax, or other regional levies will be added to your subscription fees, and you agree to pay these additional amounts. Atomwalk Technologies will issue an invoice detailing these taxes to assist with any tax credits, as applicable.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>ORGANIZATION ACCOUNT AND ADMINISTRATION</SectionTitle>
                <Paragraph>
                    When establishing an organization account with Atomwalk Technologies, you will have the ability to designate administrators who can configure and manage the Services according to the specific requirements of your organization. If a third party is involved in creating and configuring your account, that party may assume administrative responsibilities. It is essential that you establish a formal agreement with the third party to define their role and the scope of their authority in managing your account. As the primary account holder, you are accountable for ensuring the security of your organization's account credentials. This includes appointing qualified administrators, safeguarding your account's integrity, and ensuring that all activities conducted under your organization's account comply with this Agreement. Additionally, it is important to take necessary precautions to prevent unauthorized access to administrator accounts. If control over an administrator account is lost, you may request a recovery process by reaching out to us at info@atomwalk.com, provided the recovery process is deemed acceptable. In the absence of a specified process, we may grant access to the account based on proof of authorization provided by the requesting individual. Atomwalk Technologies will not be held liable for any actions taken in good faith regarding account recovery or administrative controls.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>PERSONAL INFORMATION AND PRIVACY</SectionTitle>
                <Paragraph>
                    Any personal information that you provide to Atomwalk Technologies while utilizing our Services will be processed in accordance with our Privacy Policy. By using the Services, you acknowledge and agree to the terms set forth in this policy. You are solely responsible for maintaining the confidentiality of your account credentials, including usernames and passwords. All activities that occur under your account are your responsibility. Should you detect any unauthorized use or security breach, it is your responsibility to notify us promptly at info@atomwalk.com or via the contact details provided on our website. Atomwalk Technologies disclaims any liability for loss or damages resulting from unauthorized access to your account or misuse of your account credentials.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>COMMUNICATIONS FROM ATOMWALK TECHNOLOGIES PVT. LTD.</SectionTitle>
                <Paragraph>
                    By utilizing our Services, you agree to receive essential communications from Atomwalk Technologies, which may include service-related updates, system notifications, and administrative messages. These communications are an integral part of your use of the Services and cannot be opted out. However, you may choose to unsubscribe from non-essential communications, such as promotional newsletters. Please note that while promotional communications can be opted out, administrative and service-related messages are mandatory, as they contain critical information regarding the operation of your account and our services.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>COMPLAINTS</SectionTitle>
                <Paragraph>
                    In the event that Atomwalk Technologies receives a complaint related to your activities while using the Services, we will forward the complaint to the primary email address associated with your user account. Upon receiving the forwarded complaint, you are required to respond directly to the complainant within ten (10) business days and include Atomwalk Technologies in the communication. Failure to provide a response within the stipulated timeframe will result in Atomwalk Technologies disclosing your name and contact details to the complainant, enabling them to pursue legal action if necessary. By not responding within the given time period, you explicitly consent to Atomwalk Technologies sharing your details with the complainant.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>GRIEVANCE REDRESSAL</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies is committed to addressing grievances in accordance with the relevant guidelines. If you have any grievances regarding our Services, please contact our e-mail info@atomwalk.com. We are dedicated to resolving any issues promptly and fairly, and will respond to your concerns in a timely manner.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>INACTIVE USER ACCOUNTS POLICY</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies reserves the right to terminate user accounts that remain inactive for a continuous period of 120 days. If your account is deactivated, all associated data will be permanently deleted. We will notify you prior to such termination, giving you the opportunity to back up your data. Inactivity is measured independently for each Service; activity on one Service does not affect the status of other Services. If multiple users are associated with an account, at least one active user will prevent the account from being considered inactive.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>USER GENERATED CONTENT</SectionTitle>
                <Paragraph>
                    As a user of our Services, you may create, publish, or transmit content. You are solely responsible for any content you share, as well as the consequences of its publication or transmission. If you are a media publisher under applicable laws, you are required to comply with relevant reporting requirements as defined by the Ministry of Information and Broadcasting. Any content shared through our Services may be publicly accessible, indexed by search engines, or made available across the internet. You are responsible for ensuring that you do not unintentionally share private or confidential content publicly.
                </Paragraph>
                <Paragraph>
                    You must not use, copy, or distribute content created by others without proper authorization or permission from the rightful owner. In the event that you encounter content protected by copyright or other rights, you must not remove any copyright notices or disable any protection mechanisms. By uploading or sharing content, you confirm that you have the necessary rights and permissions to make it available. Atomwalk Technologies reserves the right to block or remove any content that is found to violate legal or third-party rights, or if it is deemed to be illegal or infringing upon intellectual property rights.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>SAMPLE FILES AND APPLICATIONS</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies may provide sample files or applications designed to demonstrate the utility of our Services for various tasks. These samples consist of random, illustrative data and should not be relied upon for accuracy, completeness, or commercial use. Atomwalk Technologies does not offer any warranties, express or implied, regarding the functionality or suitability of these sample files or applications.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>INTELLECTUAL PROPERTY RIGHT</SectionTitle>
                <Paragraph>
                    This copy of Atomwalk Technologies Pvt. Ltd. Software and all accompanying documentation is licensed, not sold. The Software Product is protected by applicable trademark laws, patent laws and intellectual property treaties. Atomwalk Technologies Pvt. Ltd., including its subsidiaries, partners, affiliates, and suppliers (collectively referred to as "Atomwalk Technologies Pvt. Ltd."), owns all intellectual property rights, including registered trademarks, in and to the Software Product. Your rights to download, install, access, use, copy, or modify the Software Product are governed strictly by these intellectual property rights and are granted only in accordance with the terms and conditions of this End User License Agreement.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>DISCLAIMER OF WARRANTIES</SectionTitle>
                <Paragraph>
                    ACCESS TO ATOMWALK TECHNOLOGIES PVT. LTD. SOFTWARE, ITS CONTENT, PRODUCTS, AND SERVICES ARE PROVIDED "AS IS." ATOMWALK TECHNOLOGIES PVT. LTD. DOES NOT MAKE ANY WARRANTIES OR REPRESENTATIONS, EXPRESSED OR IMPLIED, CONCERNING THE MERCHANTABILITY, QUALITY, NON-INFRINGEMENT, OR FITNESS FOR A PARTICULAR PURPOSE OF THE SOFTWARE PRODUCT, ITS CONTENT, PRODUCTS, OR SERVICES. THE LICENSEE ASSUMES ALL RISK OF USE. NO WARRANTY IS GIVEN THAT THE SOFTWARE PRODUCT OR SERVICES WILL BE ERROR-FREE, UNINTERRUPTED, OR MEET THE LICENSEE'S REQUIREMENTS. ATOMWALK TECHNOLOGIES PVT. LTD. IS NOT RESPONSIBLE FOR INVALID DESTINATIONS, TRANSMISSION ERRORS, CORRUPTION OF, OR THE SECURITY OF INFORMATION CARRIED OVER TELECOMMUNICATIONS CARRIERS' OR OTHER PROVIDERS' FACILITIES. ATOMWALK TECHNOLOGIES PVT. LTD. HAS NO LIABILITY FOR FAULTY OR INTERRUPTED COMMUNICATION LINKS, NOR FOR THE CONTENTS OF ANY SUCH COMMUNICATIONS. IN THE EVENT THAT THE SOFTWARE PRODUCT OR ANY PORTION OF THE SERVICES IS UNAVAILABLE TO THE LICENSEE DUE TO A TOTAL OR PARTIAL MALFUNCTION FOR WHICH ATOMWALK TECHNOLOGIES PVT. LTD. IS RESPONSIBLE, ATOMWALK TECHNOLOGIES PVT. LTD.' SOLE OBLIGATION AND THE LICENSEE'S EXCLUSIVE REMEDY SHALL BE A PRO RATA CREDIT FOR THE PERIOD DURING WHICH THE SERVICE IS UNAVAILABLE. THE LICENSEE'S SOLE AND EXCLUSIVE REMEDY FOR ANY CLAIM, LOSS, DAMAGE, OR ACTION WITH RESPECT TO SUCH SERVICE SHALL BE LIMITED TO THE AFOREMENTIONED CREDIT. THE LICENSEE ACKNOWLEDGES THAT SUBSTANTIAL PORTIONS OF THE SOFTWARE PRODUCT AND CONTENT MAY BE PROVIDED BY THIRD PARTIES, AND ATOMWALK TECHNOLOGIES PVT. LTD. HAS NO CONTROL OVER, AND ASSUMES NO LIABILITY FOR, ANY SUCH THIRD-PARTY CONTENT. UNDER NO CIRCUMSTANCES SHALL ATOMWALK TECHNOLOGIES PVT. LTD. BE RESPONSIBLE FOR THE LICENSEE'S USE OF, OR RESULTS ACHIEVED BY THE LICENSEE FROM, THE SOFTWARE PRODUCT, SERVICES, OR ANY DATA ACCESSED THROUGH THE SOFTWARE PRODUCT.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>LIMITATION OF LIABILITY</SectionTitle>
                <Paragraph>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ATOMWALK TECHNOLOGIES PVT. LTD. BE LIABLE FOR ANY SPECIAL, INCIDENTAL, PUNITIVE, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS OR OTHER INFORMATION, FOR BUSINESS INTERRUPTION, FOR PERSONAL INJURY, FOR LOSS OF PRIVACY, FOR FAILURE TO MEET ANY DUTY INCLUDING OF GOOD FAITH OR OF REASONABLE CARE, FOR NEGLIGENCE, AND FOR ANY OTHER PECUNIARY OR OTHER LOSS WHATSOEVER) ARISING OUT OF OR IN ANY WAY RELATED TO THE USE OF OR INABILITY TO USE THE SOFTWARE PRODUCT, THE PROVISION OF OR FAILURE TO PROVIDE SUPPORT OR OTHER SERVICES, INFORMATION, SOFTWARE, AND RELATED CONTENT THROUGH THE SOFTWARE PRODUCT, OR OTHERWISE ARISING OUT OF THE USE OF THE SOFTWARE PRODUCT, OR OTHERWISE UNDER OR IN CONNECTION WITH ANY PROVISION OF THIS AGREEMENT, EVEN IN THE EVENT OF THE FAULT, TORT (INCLUDING NEGLIGENCE), MISREPRESENTATION, STRICT LIABILITY, BREACH OF CONTRACT, OR BREACH OF WARRANTY OF ATOMWALK TECHNOLOGIES PVT. LTD., AND EVEN IF ATOMWALK TECHNOLOGIES PVT. LTD. HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL ATOMWALK TECHNOLOGIES PVT. LTD. BE LIABLE FOR DAMAGES, FOR ANY CAUSE OR BASED ON ANY MATTERS ARISING FROM THIS AGREEMENT, IN EXCESS OF THE TOTAL AMOUNT PAID AS LICENSE FEE BY THE LICENSEE.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>INDEMNIFICATION</SectionTitle>
                <Paragraph>
                    You agree to indemnify and hold Atomwalk Technologies harmless from and against any and all claims, actions, proceedings, damages and liabilities arising out of the use of hardware and/ or software, any of your acts or omissions, or any action taken or liability incurred pursuant to any claim against Atomwalk Technologies. This indemnification shall include payment of costs and lawyer's fees incurred by Atomwalk Technologies in the defense of any such action or claim.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>GOVERNING LAW AND JURISDICTION</SectionTitle>
                <Paragraph>
                    You agree to comply fully with all applicable laws, statutes, ordinances, rules and regulations, and agree not to use our web site to facilitate collusion or for any other conduct violating antitrust or other applicable laws. Atomwalk Technologies hereby agrees that Atomwalk Technologies website is and will remain in compliance with all applicable laws. This Agreement will be governed by the laws of the State of Karnataka, India, excluding the application of its conflicts of law rules. If any part of this Agreement is found to be void or unenforceable, it will not affect the validity of the remaining provisions of the Agreement, which shall remain valid and enforceable according to their terms. In any action arising hereunder, the courts of Bengaluru, Karnataka, India shall have exclusive jurisdiction.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>SUSPENSION AND TERMINATION</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies reserves the right to suspend, restrict, or temporarily disable your user account or access to certain features of the Services in the event of suspected unlawful activities, prolonged inactivity, or requests from legal authorities or governmental bodies. If your account is suspended or access is restricted, you will be notified via your registered email address. Should you wish to dispute this action, you must contact info@atomwalk.com within 30 days of receiving the notice. Failing to respond within this period may result in permanent termination of your account.
                </Paragraph>
                <Paragraph>
                    We also retain the right to terminate your account immediately if we reasonably suspect a breach of this Agreement or if there are unforeseen technical issues with any Beta Services that you may be utilizing. In the event of termination, you will forfeit all access to the Services, and all associated data will be permanently deleted.
                </Paragraph>
                <Paragraph>
                    If you decide that you no longer wish to continue using the Services, you may request account termination at any time, and we will process your request in accordance with this Agreement. Furthermore, if we fail to meet our obligations under the Agreement, you are entitled to cancel your account and receive a prorated refund for any prepaid fees, subject to our refund policy.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>MODIFICATION OF TERMS OF SERVICE</SectionTitle>
                <Paragraph>
                    Atomwalk Technologies may, from time to time, revise and update these Terms of Service. You will be notified of any changes through an email sent to the primary email address associated with your account, or via an in-app notification. If any modifications significantly impact your rights as a user, we will provide you with at least 30 days' notice prior to the changes becoming effective.
                </Paragraph>
                <Paragraph>
                    Should the revisions to the Agreement alter your usage rights or the nature of the Services in a way that is unacceptable to you, you may choose to terminate your account by notifying us at info@atomwalk.com within 30 days of the notification. In this case, you will receive a prorated refund for any unused portion of your subscription fee, in accordance with our refund policy. If you continue using the Services after the changes take effect, your continued use will be considered as acceptance of the modified Terms of Service.
                </Paragraph>
            </Section>

            <ContactInfo>
                <strong>📬 END OF TERMS OF SERVICE</strong>
                <Paragraph style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    If you have any questions, concerns, or need further clarification about this Agreement, please do not hesitate to contact us at <a href="mailto:info@atomwalk.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>info@atomwalk.com</a>. We are dedicated to ensuring transparency and addressing any concerns promptly.
                </Paragraph>
            </ContactInfo>

            <Footer>
                <p>Atomwalk Technologies Pvt. Ltd. — Gopalan Millennium Towers, ITPL Main Rd, Brookfield, Whitefield, Bengaluru, Karnataka 560037</p>
            </Footer>
        </Container>
    );
};

export default TermsOfService;