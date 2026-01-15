import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import { useLocation } from 'react-router-dom';

// Placeholder for feature images - replace with actual images
import HrHeadBG from '../../assets/img/hrm_hero_img.png';
import LetsConnect from '../LetsConnect';
import { Helmet } from "react-helmet-async";

const NewFeatures = () => {
    const location = useLocation();

    // Determine which content to render based on the pathname
    const isEventPage = location.pathname === '/empevent.html';
    const isLiteAppPage = location.pathname === '/empliteapp.html';

    const reqdemo = () => {
        window.location.href = "/demo.html"
    }

    const learnmore = () => {
        window.location.href = "/hrmanual.html"
    }



    const content = useMemo(() => {
        if (isLiteAppPage) {
            return {
                title: "HRM Lite App",
                description: "Experience HR on-the-go with our lightweight, mobile-first solution. Empower employees with a self-service portal featuring secure login, and all essential HR tools in a streamlined interface.",
                subtitle: "Mobile-first HR solutions at your fingertips",
                image: HrHeadBG,
                data: "HRM Lite App"
            };
        } else if (isEventPage) {
            return {
                title: "Employee Engagement & Events",
                description: "Keep your workforce informed and connected with real-time company announcements, personalized birthday and work anniversary recognitions, and interactive features that promote team bonding and employee participation.",
                image: HrHeadBG,
                data: "Event Updates"
            };
        }

        return {
            title: "Welcome to Employee Management",
            description: "Explore our various modules designed to simplify your HR processes.",
            image: HrHeadBG,
            data: "HR"
        };
    }, [isLiteAppPage, isEventPage]);

    const features = [
        {
            title: "Attendance Management",
            description: "Employees can check in and check out with just a tap, using an intuitive calendar-based interface. The system tracks daily attendance, late arrivals, early check-outs, and absences. Monthly summaries offer insights into work patterns. Managers benefit from visual attendance dashboards to monitor team discipline, flag irregularities, and ensure compliance.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-att.png',
            icon: '⏰',
            color: '#4F46E5',
            keyPoints: [
                "One-tap check-in/check-out",
                "Calendar-based interface",
                "Real-time tracking of late arrivals/early departures",
                "Visual dashboards for managers",
                "Monthly summary reports"
            ]
        },
        {
            title: "Leave Management",
            description: "Both employees and managers can apply for or approve leave directly from the app. Features include real-time leave balance tracking, leave history logs, and custom leave categories. Automated approval workflows ensure timely decisions, and the ability to attach documents such as medical certificates makes the process robust and HR-compliant.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-leave.png',
            icon: '🏖️',
            color: '#059669',
            keyPoints: [
                "Apply/approve leave on mobile",
                "Real-time leave balance updates",
                "Multiple leave categories",
                "Document attachment capability",
                "Automated approval workflows"
            ]
        },
        {
            title: "Claim Management",
            description: "Employees can effortlessly raise claims for reimbursements related to travel, meals, and more. The claim form allows attachments, category selection, and notes. Managers can approve or reject claims with comments, ensuring clarity and accountability. A streamlined audit trail supports finance departments in processing and verifying disbursements.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-claim1.png',
            icon: '💰',
            color: '#DC2626',
            keyPoints: [
                "Submit expense claims on-the-go",
                "Category-based claim submission",
                "Document attachment support",
                "Manager comments for transparency",
                "Complete audit trail"
            ]
        },
        {
            title: "Holiday Tracking",
            description: "Stay informed about upcoming holidays with a centralized holiday calendar. The module supports both public and organization-specific holidays and allows employees to apply for optional holidays. Notifications and visual cues keep teams updated on office schedules and help plan leave in advance without disruption.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-holiday.png',
            icon: '🗓️',
            color: '#7C3AED',
            keyPoints: [
                "Centralized holiday calendar",
                "Public & company holidays",
                "Optional holiday requests",
                "Visual notifications",
                // "Leave planning integration"
            ]
        },
        {
            title: "Help Desk",
            description: "Employees can raise helpdesk tickets for IT, HR, or facilities support and track their resolution status. Real-time updates, priority tagging, document attachments, and comment threads enhance communication. Admin teams can assign tickets, set SLAs, and monitor resolution metrics with ease.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-help.png',
            icon: '🎧',
            color: '#EA580C',
            keyPoints: [
                "Multi-department ticket raising",
                "Real-time status tracking",
                "Priority tagging system",
                "Document attachment capability",
                "SLA monitoring for admins"
            ]
        },
        {
            title: "Request Desk",
            description: "Submit and track a variety of requests such as address change, ID reissue, or equipment needs. Employees can fill custom forms with supporting details, while approvers can monitor, respond, and escalate requests. All activity is logged for transparency and record-keeping.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-request.png',
            icon: '📋',
            color: '#0891B2',
            keyPoints: [
                "Custom request forms",
                "Multi-category requests",
                "Approval workflow",
                "Request tracking history",
                "Document upload support"
            ]
        },
        {
            title: "Event Updates",
            description: "Celebrate employee milestones like birthdays, work anniversaries, and promotions through timely event notifications. Employees can like, comment, or wish colleagues, boosting engagement and workplace camaraderie. The system also highlights company-wide events and enables RSVPs or feedback collection.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-event.png',
            icon: '🎉',
            color: '#BE185D',
            keyPoints: [
                "Milestone notifications",
                "Social interaction features",
                "Company event calendar",
                "RSVP functionality",
                "Feedback collection"
            ]
        },
        {
            title: "Add Appointee",
            description: "Managers can quickly add potential hires by scanning their resumes. The app auto-fills basic information to create an appointee record, which can later be updated in the Atomwalk Web App. This helps HR teams digitize hiring pipelines and avoid manual entry.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-appointee.png',
            icon: '👤',
            color: '#6366F1',
            keyPoints: [
                "Resume scanning capability",
                "Auto-fill candidate information",
                "Quick appointee creation",
                "Seamless web app integration",
                "Reduced manual data entry"
            ]
        },
        {
            title: "Digital ID Card",
            description: "Access a digital version of your employee ID card directly from the app. It includes your name, department, employee code, and a scannable QR code for quick verification. Ideal for use at office entry gates, vendor visits, or when accessing facilities.",
            image: 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/mobile-id.png',
            icon: '🪪',
            color: '#059669',
            keyPoints: [
                "Always accessible digital ID",
                "QR code verification",
                "Employee details display",
                "Offline access capability",
                "Secure authentication"
            ]
        }
    ];

    return (
        <PageWrapper>
            <Helmet>
                <title>HRM APP | Atomwalk Technologies</title>
                <meta name="description" content="Simplifies core HR tasks on mobile for employees and managers." />
                <meta name="keywords" content="Attendance management app, Leave management mobile app, Expense and claim management app, Holiday tracking system, HR helpdesk and request desk app, Employee event and appointment management, Digital employee ID card app" />
                <link rel="canonical" href="https://home.atomwalk.com/empliteapp.html" />
            </Helmet>
            <LetsConnect
                title={content.title}
                description={content.description}
                background={"#eae3ff"}
                lead={true}
                img={content.image}
            />

            <FeaturesSection>
                <Container>
                    <SectionHeader>
                        <SectionTitle>
                            Features of <GradientText>{content.title}</GradientText>
                        </SectionTitle>
                        <Subtitle>{content.subtitle}</Subtitle>
                        <Divider />
                    </SectionHeader>

                    {features.map((feature, index) => (
                        <FeatureItem key={index} reverse={index % 2 !== 0}>
                            <FeatureCard>
                                <Row align="center" justify="center">
                                    <Col xs={12} md={6} order={{ md: index % 2 === 0 ? 1 : 2 }}>
                                        <FeatureImageContainer>
                                            <ImageWrapper color={feature.color}>
                                                <FeatureImage src={feature.image} alt={`${feature.title} Feature`} />
                                                <FloatingIcon color={feature.color}>
                                                    {feature.icon}
                                                </FloatingIcon>
                                            </ImageWrapper>
                                        </FeatureImageContainer>
                                    </Col>
                                    <Col xs={12} md={6} order={{ md: index % 2 === 0 ? 2 : 1 }}>
                                        <FeatureContent>
                                            <FeatureHeader>
                                                <FeatureNumber color={feature.color}>
                                                    {String(index + 1).padStart(2, '0')}
                                                </FeatureNumber>
                                                <h3>{feature.title}</h3>
                                            </FeatureHeader>
                                            <Description>{feature.description}</Description>

                                            <KeyPoints>
                                                <KeyPointsTitle>Key Benefits</KeyPointsTitle>
                                                <KeyPointsList>
                                                    {feature.keyPoints.map((point, i) => (
                                                        <KeyPoint key={i} color={feature.color}>
                                                            <CheckIcon>✓</CheckIcon>
                                                            <span>{point}</span>
                                                        </KeyPoint>
                                                    ))}
                                                </KeyPointsList>
                                            </KeyPoints>

                                            <FeatureStats>
                                                <StatItem>
                                                    <StatNumber>100%</StatNumber>
                                                    <StatLabel>Uptime</StatLabel>
                                                </StatItem>
                                                <StatItem>
                                                    <StatNumber>24/7</StatNumber>
                                                    <StatLabel>Support</StatLabel>
                                                </StatItem>
                                                <StatItem>
                                                    <StatNumber>5★</StatNumber>
                                                    <StatLabel>Rating</StatLabel>
                                                </StatItem>
                                            </FeatureStats>
                                        </FeatureContent>
                                    </Col>
                                </Row>
                            </FeatureCard>
                        </FeatureItem>
                    ))}
                </Container>
            </FeaturesSection>

            <CTASection>
                <CTAContent>
                    <CTATitle>Ready to Transform Your HR Experience?</CTATitle>
                    <CTADescription>
                        Join thousands of companies who have revolutionized their HR processes with our mobile-first approach
                    </CTADescription>
                    <CTAButtons>
                        <CTAButton primary onClick={reqdemo}>
                            Request a Demo
                            <ButtonIcon>→</ButtonIcon>
                        </CTAButton>
                        <CTAButton secondary onClick={learnmore}>
                            Learn More
                        </CTAButton>
                    </CTAButtons>
                    <TrustIndicators>
                        {/* <TrustItem>
                            <TrustIcon>🏢</TrustIcon>
                            <span>500+ Companies</span>
                        </TrustItem> */}
                        {/* <TrustItem>
                            <TrustIcon>👥</TrustIcon>
                            <span>50k+ Users</span>
                        </TrustItem> */}
                        <TrustItem>
                            <TrustIcon>🚀</TrustIcon>
                            <span>99.9% Uptime</span>
                        </TrustItem>
                    </TrustIndicators>
                </CTAContent>
            </CTASection>
        </PageWrapper>
    );
};

// Enhanced Styled Components
const PageWrapper = styled.div`
    font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1a202c;
    line-height: 1.6;
    overflow-x: hidden;
`;

const FeaturesSection = styled.section`
    padding: 120px 0;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
    }

    @media (max-width: 768px) {
        padding: 80px 0;
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 100px;

    @media (max-width: 768px) {
        margin-bottom: 60px;
    }
`;

const SectionTitle = styled.h2`
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    line-height: 1.2;
`;

const GradientText = styled.span`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const Subtitle = styled.p`
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    color: #64748b;
    max-width: 600px;
    margin: 0 auto 32px;
    font-weight: 400;
`;

const Divider = styled.div`
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0 auto;
    border-radius: 2px;
`;

const FeatureItem = styled.div`
    margin-bottom: 120px;
    
    &:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 768px) {
        margin-bottom: 80px;
    }
`;

const FeatureCard = styled.div`
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(255, 255, 255, 0.5);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(226, 232, 240, 0.8);
    
    &:hover {
        transform: translateY(-12px);
        box-shadow: 
            0 35px 70px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 768px) {
        border-radius: 16px;
        
        &:hover {
            transform: translateY(-4px);
        }
    }
`;

const FeatureImageContainer = styled.div`
    padding: 60px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    @media (max-width: 768px) {
        padding: 40px 20px;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    max-width: 320px;
    width: 100%;
    
    &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background: linear-gradient(135deg, ${props => props.color}20, ${props => props.color}10);
        border-radius: 20px;
        z-index: -1;
        opacity: 0.6;
    }
`;

const FeatureImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    border-radius: 12px;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
    }
`;

const FloatingIcon = styled.div`
    position: absolute;
    top: -15px;
    right: -15px;
    width: 60px;
    height: 60px;
    background: ${props => props.color};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: float 3s ease-in-out infinite;

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    @media (max-width: 768px) {
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        top: -10px;
        right: -10px;
    }
`;

const FeatureContent = styled.div`
    padding: 60px 40px;

    @media (max-width: 768px) {
        padding: 40px 24px;
    }
`;

const FeatureHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
    
    h3 {
        color: #1a202c;
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.01em;
    }

    @media (max-width: 768px) {
        gap: 16px;
    }
`;

const FeatureNumber = styled.div`
    min-width: 60px;
    height: 60px;
    background: linear-gradient(135deg, ${props => props.color} 0%, ${props => props.color}80 100%);
    color: white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    box-shadow: 0 8px 25px ${props => props.color}40;

    @media (max-width: 768px) {
        min-width: 50px;
        height: 50px;
        font-size: 1rem;
        border-radius: 12px;
    }
`;

const Description = styled.p`
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #4a5568;
    line-height: 1.8;
    margin-bottom: 32px;
`;

const KeyPoints = styled.div`
    margin-bottom: 32px;
`;

const KeyPointsTitle = styled.h4`
    color: #2d3748;
    margin-bottom: 16px;
    font-size: 1.2rem;
    font-weight: 600;
`;

const KeyPointsList = styled.div`
    display: grid;
    gap: 12px;
`;

const KeyPoint = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
    
    span {
        color: #4a5568;
        font-size: 1rem;
        line-height: 1.6;
    }
`;

const CheckIcon = styled.div`
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    flex-shrink: 0;
    margin-top: 2px;
`;

const FeatureStats = styled.div`
    display: flex;
    gap: 32px;
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid #e2e8f0;

    @media (max-width: 768px) {
        gap: 20px;
        flex-wrap: wrap;
    }
`;

const StatItem = styled.div`
    text-align: center;
    flex: 1;
`;

const StatNumber = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 4px;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

const StatLabel = styled.div`
    font-size: 0.9rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const CTASection = styled.section`
    padding: 120px 0;
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }

    @media (max-width: 768px) {
        padding: 80px 0;
    }
`;

const CTAContent = styled.div`
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
`;

const CTATitle = styled.h2`
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: white;
    margin-bottom: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
`;

const CTADescription = styled.p`
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    color: #a0aec0;
    margin-bottom: 48px;
    line-height: 1.6;
`;

const CTAButtons = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 60px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
`;

const CTAButton = styled.button`
    padding: 16px 32px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 200px;
    justify-content: center;
    
    ${props => props.primary ? `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }
    ` : `
        background: transparent;
        color: white;
        border-color: rgba(255, 255, 255, 0.3);
        
        &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-3px);
        }
    `}

    @media (max-width: 768px) {
        width: 100%;
        max-width: 300px;
        padding: 14px 28px;
    }
`;

const ButtonIcon = styled.span`
    font-size: 1.2rem;
    transition: transform 0.3s ease;
    
    ${CTAButton}:hover & {
        transform: translateX(4px);
    }
`;

const TrustIndicators = styled.div`
    display: flex;
    justify-content: center;
    gap: 48px;
    opacity: 0.8;

    @media (max-width: 768px) {
        gap: 32px;
        flex-wrap: wrap;
    }
`;

const TrustItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    
    span {
        color: #a0aec0;
        font-size: 0.9rem;
        font-weight: 500;
    }
`;

const TrustIcon = styled.div`
    font-size: 1.5rem;
    margin-bottom: 4px;
`;

export default NewFeatures;