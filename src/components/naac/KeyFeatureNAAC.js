import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  padding: 110px 20px;
  background-color: #f0ebf7;
  text-align: center;
`;

const MainTitle = styled.h2`
  font-size: 2.5em;
  font-weight: bold;
  margin-top: 30px;
  color: #333;

  span {
    color: #7d3eff;
  }

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;


const FeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


const FeatureBox = styled.div`
  width: 285px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  margin: 20px;

  @media (max-width: 768px) {
    margin: 20px 0;
    width: 80%;
  }
`;


const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.$bgColor || "#ccc"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px auto;
`;


const FeatureTitle = styled.h3`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
`;


const FeatureDescription = styled.p`
  font-size: 1em;
  color: #666;
`;


const DashboardIcon = ({ color = "#2ea36b" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="10" height="10" rx="2" stroke={color} strokeWidth="2.2" />
    <rect x="18" y="4" width="10" height="6" rx="2" stroke={color} strokeWidth="2.2" />
    <rect x="18" y="14" width="10" height="14" rx="2" stroke={color} strokeWidth="2.2" />
    <rect x="4" y="18" width="10" height="10" rx="2" stroke={color} strokeWidth="2.2" />
  </svg>
);

const CurricularIcon = ({ color = "#8a5cf6" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 8c4-3 10-3 10 0v18c0-3-6-3-10 0V8Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M26 8c-4-3-10-3-10 0v18c0-3 6-3 10 0V8Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const TeachingIcon = ({ color = "#1fa6c9" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M4 12 16 6l12 6-12 6-12-6Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M10 15v6c0 1.6 2.7 3 6 3s6-1.4 6-3v-6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M26 12v7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const ResearchIcon = ({ color = "#e0a30b" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="13" cy="13" r="8" stroke={color} strokeWidth="2.2" />
    <path d="M19 19l7 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M9 13h8M13 9v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const InfrastructureIcon = ({ color = "#c9601f" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M5 28V13l11-8 11 8v15" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M12 28v-9h8v9" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M5 28h22" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const StudentSupportIcon = ({ color = "#d1467c" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="10" r="5" stroke={color} strokeWidth="2.2" />
    <path d="M6 27c0-6 4.5-10 10-10s10 4 10 10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 19v4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const GovernanceIcon = ({ color = "#7d3eff" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 4 27 9v3H5V9l11-5Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M7 13v10M13 13v10M19 13v10M25 13v10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4 27h24" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const ValuesIcon = ({ color = "#c93a5a" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 27S5 20 5 12.5C5 8.4 8.1 6 11.3 6c2 0 3.8 1 4.7 2.7C17 6.9 18.8 6 20.7 6 23.9 6 27 8.4 27 12.5 27 20 16 27 16 27Z"
      stroke={color} strokeWidth="2.2" strokeLinejoin="round"
    />
  </svg>
);

const DepartmentIcon = ({ color = "#2f8fdb" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="5" y="6" width="9" height="9" rx="1.5" stroke={color} strokeWidth="2.2" />
    <rect x="18" y="6" width="9" height="9" rx="1.5" stroke={color} strokeWidth="2.2" />
    <rect x="5" y="19" width="9" height="9" rx="1.5" stroke={color} strokeWidth="2.2" />
    <rect x="18" y="19" width="9" height="9" rx="1.5" stroke={color} strokeWidth="2.2" />
  </svg>
);

const ScholarshipIcon = ({ color = "#2e9e6b" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="12" r="7" stroke={color} strokeWidth="2.2" />
    <path d="M13 12.5l2 2 4-4.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 18l-2 9 7-3 7 3-2-9" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const KeyFeatureNAAC = () => {

  const handleCardPress = (data) => {
    window.location.href = `/${data}.html`
  }
  return (
    <SectionContainer>
      <MainTitle>
        Key Modules of Atomwalk <span>NAAC</span>
      </MainTitle>

      <FeaturesContainer>
        <FeatureBox onClick={() => { handleCardPress('naac-view') }}>
          <IconContainer $bgColor="#D8F5E3">
            <DashboardIcon />
          </IconContainer>
          <FeatureTitle>Viewboard:</FeatureTitle>
          <FeatureDescription>
            Get a real-time overview of criterion-wise readiness, pending documentation, and institutional accreditation status at a glance.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={() => { handleCardPress('curricular-aspects') }}>
          <IconContainer $bgColor="#F0E7FF">
            <CurricularIcon />
          </IconContainer>
          <FeatureTitle>C1: Curricular Aspects:</FeatureTitle>
          <FeatureDescription>
            Manage curriculum design, academic flexibility, and course outcomes with structured documentation .
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={() => { handleCardPress('teaching-learning') }}>
          <IconContainer $bgColor="#E0F7FC">
            <TeachingIcon />
          </IconContainer>
          <FeatureTitle>C2: Teaching-Learning & Evaluation:</FeatureTitle>
          <FeatureDescription>
            Track admission processes, teaching-learning methods, and evaluation outcomes .
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox
          onClick={() => { handleCardPress('research-extension') }}>
          <IconContainer $bgColor="#FFF2E0">
            <ResearchIcon />
          </IconContainer>
          <FeatureTitle>C3: Research & Extension:</FeatureTitle>
          <FeatureDescription>
            Track research output, publications, grants, seed money allocations, and extension activities across departments.
          </FeatureDescription>
        </FeatureBox>
      </FeaturesContainer>

      <FeaturesContainer>
        <FeatureBox
          onClick={() => { handleCardPress('infrastructure') }}>
          <IconContainer $bgColor="#FBE3D2">
            <InfrastructureIcon />
          </IconContainer>
          <FeatureTitle>C4: Infrastructure & Learning Resources:</FeatureTitle>
          <FeatureDescription>
            Maintain records of physical facilities, learning resources, and IT infrastructure supporting institutional operations.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={() => { handleCardPress('student-support') }}>
          <IconContainer $bgColor="#FBDCE9">
            <StudentSupportIcon />
          </IconContainer>
          <FeatureTitle>C5: Student Support & Progression:</FeatureTitle>
          <FeatureDescription>
            Consolidate data on scholarships, placements, higher education progression, and grievance redressal for students.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={() => { handleCardPress('governance') }}>
          <IconContainer $bgColor="#F0E7FF">
            <GovernanceIcon />
          </IconContainer>
          <FeatureTitle>C6: Governance, Leadership & Management:</FeatureTitle>
          <FeatureDescription>
            Track institutional leadership, strategic planning, and administrative processes with transparent reporting.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={() => { handleCardPress('values-best-practices') }}>
          <IconContainer $bgColor="#F7DADB">
            <ValuesIcon />
          </IconContainer>
          <FeatureTitle>C7: Institutional Values & Best Practices:</FeatureTitle>
          <FeatureDescription>
            Document sustainability initiatives, inclusive practices, and best practices that reflect institutional values.
          </FeatureDescription>
        </FeatureBox>
      </FeaturesContainer>

      <FeaturesContainer>
        <FeatureBox
          onClick={() => { handleCardPress('department') }}>
          <IconContainer $bgColor="#DCEBFA">
            <DepartmentIcon />
          </IconContainer>
          <FeatureTitle>Department Management:</FeatureTitle>
          <FeatureDescription>
            Enable department heads and faculty coordinators to upload and update criterion data for centralized SSR preparation.
          </FeatureDescription>
        </FeatureBox>

        <FeatureBox onClick={() => { handleCardPress('scholarship') }}>
          <IconContainer $bgColor="#dff7da">
            <ScholarshipIcon />
          </IconContainer>
          <FeatureTitle>Scholarship Management:</FeatureTitle>
          <FeatureDescription>
            Track active scholarships, grants, and institutional development schemes with real-time status and beneficiary visibility.
          </FeatureDescription>
        </FeatureBox>
      </FeaturesContainer>

    </SectionContainer>
  );
};

export default KeyFeatureNAAC;