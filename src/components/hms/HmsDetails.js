import React from 'react';
import styled, { keyframes } from 'styled-components';
import Collection from '../../assets/img/H_step_5(1).png'
import {
    FaMobileAlt,
    FaEdit,
    FaBell,
    FaUserMd,
    FaIdBadge,
    FaCalendarAlt,
    FaFileInvoice,
    FaBalanceScale,
    FaLeaf,
    FaRecycle,
    FaSmileBeam,
    FaFolderOpen,
    FaCalendarCheck
} from "react-icons/fa";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const WasteManagementSection = styled.div`
  background-color: #E5FBFF;
  padding: 3rem 0;
`;
// Styled Components
const FeaturesContainer = styled.div`
  max-width: 1200px;
  background-color: #E5FBFF;
  margin: 3rem auto;
  padding: 0 1.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  color: #1a5276;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  font-weight: 700;
  
  &:after {
    content: '';
    display: block;
    width: 120px;
    height: 5px;
    background: linear-gradient(90deg, #1a5276, #28b463);
    margin: 1rem auto;
    border-radius: 3px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  border-left: 5px solid ${props => props.color || '#28b463'};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: ${props => props.color || '#28b463'};
      animation: ${pulse} 2s infinite;
    }
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${props => props.color || '#1a5276'};
`;

const FeatureIcon = styled.div`
  font-size: 2.2rem;
  margin-right: 1.2rem;
  color: ${props => props.color || '#28b463'};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
`;

const FeatureList = styled.ul`
  padding-left: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
  position: relative;
  padding-left: 2rem;
  list-style: none;
  line-height: 1.6;
  color: black;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.color || '#28b463'};
  }
`;






const ConclusionSection = styled.div`
  background: linear-gradient(135deg, #1a5276, #28b463);
  color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 3rem;
  animation: ${gradientBackground} 10s ease infinite;
  background-size: 200% 200%;
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
`;

const ConclusionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const ConclusionText = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const ConclusionList = styled.ul`
  list-style: none;
  padding: 0;
  display: inline-block;
  text-align: left;
  max-width: 600px;
`;

const ConclusionItem = styled.li`
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  position: relative;
  padding-left: 2rem;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #82e0aa;
    font-weight: bold;
    font-size: 1.3rem;
  }
`;

const Highlight = styled.span`
  color: #82e0aa;
  font-weight: 600;
`;

const BenefitsSection = styled.div`
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  padding: 2rem 1rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.03);
  animation: ${fadeIn} 0.8s ease-out;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
    margin: 3rem 0;
  }
`;

const BenefitsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
`;

const BenefitsContent = styled.div`
  order: 2;
  
  @media (min-width: 992px) {
    order: 1;
  }
`;

const BenefitsTitle = styled.h3`
  color: #1a5276;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  
  @media (min-width: 576px) {
    font-size: 1.7rem;
    text-align: left;
  }
  
  @media (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const BenefitsDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #454545;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (min-width: 576px) {
    font-size: 1.1rem;
    text-align: left;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
  
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  background: rgba(255,255,255,0.7);
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.08);
    background: white;
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const BenefitIcon = styled.span`
  color: #28b463;
  font-size: 1.2rem;
  margin-right: 0.8rem;
  flex-shrink: 0;
  margin-top: 0.2rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
`;

const BenefitText = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #454545;
  
  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const BenefitsImage = styled.div`
  order: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  max-width: 100%;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  @media (min-width: 992px) {
    order: 2;
    height: 100%;
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  }
`;

const HmsDetails = () => {
    return (
        <WasteManagementSection>
            <FeaturesContainer>
                <SectionTitle>Advanced Hospital Tools for Easy Appointment Management</SectionTitle>

                <FeatureGrid>
                    <FeatureCard color="#3498db">
                        <FeatureHeader color="#3498db">
                            <FeatureIcon color="#3498db"><FaMobileAlt /></FeatureIcon>
                            <FeatureTitle>Mobile Booking</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#3498db">Book a doctor’s appointment with just a few taps on the app.</FeatureItem>
                            <FeatureItem color="#3498db">See which times and doctors are free right away.</FeatureItem>
                            <FeatureItem color="#3498db">Choose the doctor and specialty you need easily.</FeatureItem>
                            <FeatureItem color="#3498db">Get a confirmation as soon as you book.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#2ecc71">
                        <FeatureHeader color="#2ecc71">
                            <FeatureIcon color="#2ecc71"><FaEdit /></FeatureIcon>
                            <FeatureTitle>Reschedule or Cancel Bookings</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#2ecc71">Update your appointment date or time right in the app.</FeatureItem>
                            <FeatureItem color="#2ecc71">Cancel a booking if you can’t make it.</FeatureItem>
                            <FeatureItem color="#2ecc71">Get a quick confirmation when you make changes.</FeatureItem>
                            <FeatureItem color="#2ecc71">Save time by doing it yourself without calling the hospital.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#e74c3c">
                        <FeatureHeader color="#e74c3c">
                            <FeatureIcon color="#e74c3c"><FaBell /></FeatureIcon>
                            <FeatureTitle>Appointment Reminders</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#e74c3c">Get a reminder a day or an hour before your appointment.</FeatureItem>
                            <FeatureItem color="#e74c3c">You’ll get notifications by app, text, or email.</FeatureItem>
                            <FeatureItem color="#e74c3c">Avoid forgetting or missing your visit.</FeatureItem>
                            <FeatureItem color="#e74c3c">Make sure app notification is enabled in your mobile.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#f39c12">
                        <FeatureHeader color="#f39c12">
                            <FeatureIcon color="#f39c12"><FaUserMd /></FeatureIcon>
                            <FeatureTitle>Doctor and Specialty Guide</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#f39c12">Read about doctors, specialty, and their experience.</FeatureItem>
                            <FeatureItem color="#f39c12">Find doctors by their specialty.</FeatureItem>
                            <FeatureItem color="#f39c12">Check ratings to help you decide.</FeatureItem>
                            <FeatureItem color="#f39c12">See the latest schedules to book the right time.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#9b59b6">
                        <FeatureHeader color="#9b59b6">
                            <FeatureIcon color="#9b59b6"><FaIdBadge /></FeatureIcon>
                            <FeatureTitle>Your Profile and History</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#9b59b6">Keep track of your health records and past appointments.</FeatureItem>
                            <FeatureItem color="#9b59b6">Update your contact information safely.</FeatureItem>
                            <FeatureItem color="#9b59b6">See all your past and upcoming visits in one spot.</FeatureItem>
                            <FeatureItem color="#9b59b6">Book faster using your saved information.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>

                    <FeatureCard color="#1abc9c">
                        <FeatureHeader color="#1abc9c">
                            <FeatureIcon color="#1abc9c"><FaCalendarAlt /></FeatureIcon>
                            <FeatureTitle>Calendar Sync</FeatureTitle>
                        </FeatureHeader>
                        <FeatureList>
                            <FeatureItem color="#1abc9c">Add appointments to your phone’s calendar, like Google or Outlook.</FeatureItem>
                            <FeatureItem color="#1abc9c">Set reminders to stay on top of your schedule.</FeatureItem>
                            <FeatureItem color="#1abc9c">Get updates if your appointment changes.</FeatureItem>
                            <FeatureItem color="#1abc9c">Stay organized and never miss a visit.</FeatureItem>
                        </FeatureList>
                    </FeatureCard>
                </FeatureGrid>

                <BenefitsSection>
                    <BenefitsContainer>
                        <BenefitsContent>
                            <BenefitsTitle>Making Healthcare Easier with One Simple System</BenefitsTitle>
                            <BenefitsDescription>
                                Scheduling appointments by hand can lead to long waits, forgotten visits, and mix-ups. The Atomwalk HMS fixes these problems with an easy app for booking, real-time updates, and helpful reports—making sure every patient gets care on time with everything clear and organized.
                            </BenefitsDescription>

                            {/* <BenefitsGrid>
                <BenefitItem>
                  <BenefitIcon><FaCity /></BenefitIcon>
                  <BenefitText>
                    <strong>Urban Waste Challenges</strong><br />
                    Handles complex waste from residential, commercial, industrial, and medical sources
                  </BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><FaUsers /></BenefitIcon>
                  <BenefitText>
                    <strong>Stakeholder Integration</strong><br />
                    Connects waste generators, collectors, processors, and regulators
                  </BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><FaHandshake /></BenefitIcon>
                  <BenefitText>
                    <strong>Compliance Assurance</strong><br />
                    Automated reporting for BBMP, KSPCB and other regulatory bodies
                  </BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon><FaBalanceScale /></BenefitIcon>
                  <BenefitText>
                    <strong>Sustainable Practices</strong><br />
                    Promotes circular economy through optimized recycling processes
                  </BenefitText>
                </BenefitItem>
              </BenefitsGrid> */}

                            <BenefitsGrid>
                                <BenefitItem>
                                    <BenefitIcon><FaCalendarCheck /></BenefitIcon>
                                    <BenefitText>
                                        <strong>One Place for Booking </strong><br />
                                        Book appointments anytime, anywhere using a single app that lets you pick the best doctor and time for your needs, with options to adjust if your schedule changes.
                                    </BenefitText>
                                </BenefitItem>

                                <BenefitItem>
                                    <BenefitIcon><FaFileInvoice /></BenefitIcon>
                                    <BenefitText>
                                        <strong>Live Appointment Updates</strong><br />
                                        See which appointments are booked, changed, or canceled right away from the staff dashboard.
                                    </BenefitText>
                                </BenefitItem>

                                <BenefitItem>
                                    <BenefitIcon><FaFolderOpen /></BenefitIcon>
                                    <BenefitText>
                                        <strong>Patient Records</strong><br />
                                        Keep a clear record of every patient’s bookings, visits, and details for easy follow-ups or audits.
                                    </BenefitText>
                                </BenefitItem>

                                <BenefitItem>
                                    <BenefitIcon><FaSmileBeam /></BenefitIcon>
                                    <BenefitText>
                                        <strong>Happier Patients</strong><br />
                                        Cut down on wait times and keep patients happy with a clear, organized booking system.
                                    </BenefitText>
                                </BenefitItem>
                            </BenefitsGrid>


                        </BenefitsContent>
                        <BenefitsImage>
                            {/* Replace with your actual image */}
                            <img
                                src={Collection}
                                alt="Waste management workflow"
                            />
                        </BenefitsImage>
                    </BenefitsContainer>
                </BenefitsSection>


                <ConclusionSection>
                    <ConclusionTitle>Enhancing Healthcare with Smart Technology </ConclusionTitle>
                    <ConclusionText>
                        The Atomwalk Healthcare Management System <Highlight>simplifies hospital work</Highlight>, enhances patient-doctor connections, and ensures <Highlight>smooth appointments</Highlight> and care.
                    </ConclusionText>
                    <ConclusionList>
                        <ConclusionItem><strong>Easy Booking:</strong> Patients can book and manage appointments right from their phone.</ConclusionItem>
                        <ConclusionItem><strong>Doctor Coordination:</strong>Doctors will be connected with the staff for confirmation of their availability.</ConclusionItem>
                        <ConclusionItem><strong>Clear Updates:</strong>  Slots get updated for every booking or change as it happens. </ConclusionItem>
                        <ConclusionItem><strong>Smart Planning: </strong> Use data to make schedules better, shorten waits, and improve care. </ConclusionItem>
                        <ConclusionItem><strong>Grows with You: </strong>Works for small clinics or big hospitals without any trouble.</ConclusionItem>
                    </ConclusionList>
                </ConclusionSection>
            </FeaturesContainer>
        </WasteManagementSection>
    );
};

export default HmsDetails;