import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  color: #333;
  padding: 50px 20px;
  min-height: 60vh;
  width: 100%;
  flex-direction: column;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e3c72;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Card = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  width: 90%;
  text-align: left;
  margin: 15px 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 15px;
    width: 90%;
  }

  @media (max-width: 480px) {
    padding: 12px;
    width: 95%;
  }
`;

const JobTitle = styled.h2`
  font-size: 1.6rem;
  color: #2a5298;
  margin-bottom: 15px;
  border-bottom: 2px solid #d9e2ec;
  padding-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const JobCode = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  font-style: italic;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #1e3c72;
  margin: 15px 0 8px 0;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const JobDetails = styled.ul`
  font-size: 1rem;
  color: #444;
  margin: 8px 0 15px 0;
  line-height: 1.6;
  padding-left: 20px;

  li {
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const HighlightText = styled.p`
  font-size: 1rem;
  color: #2a5298;
  font-weight: 500;
  margin: 15px 0 5px 0;
`;

const ApplyInfo = styled.p`
  font-size: 1rem;
  color: #333;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #d9e2ec;

  strong {
    color: #1e3c72;
  }
`;

const JobOpenings = () => {
  const jobs = [
    
    {
      code: "AW/BDA/002-2025",
      title: "Business Development Associate",
      description: [
        "Client Acquisition: Identify, engage, and onboard new clients in the ERP and lab management domains.",
        "Market Research: Conduct research to understand market trends, customer needs, and competitor activities.",
        "Lead Generation: Develop and maintain a pipeline of qualified leads through outreach (emails, calls, events, etc.).",
        "Product Presentation: Present and demonstrate our ERP and lab management software solutions to potential clients, highlighting key benefits."
      ],
      skills: [
        "Strong communication and interpersonal skills",
        "Ability to identify customer pain points and propose effective solutions",
        "Familiarity with CRM tools is a plus",
        "Strong negotiation and persuasion skills",
        "Ability to work independently and as part of a team in a fast-paced startup environment"
      ],
      benefits: [
        "Skill development",
        "Mentoring",
        "Working with cross-functional teams",
        "Opportunity to work with diverse technology verticals",
        "Incentive linked pay"
      ],
      eligibility: "Bachelor's/Master's degree in Business Administration, Marketing, or a related field",
      location: "ITPL Main Road, Bangalore, India",
      applyInfo: "Write to us with your resume at support@atomwalk.com"
    },
    {
      code: "AW/SE/001-2025",
      title: "Software Engineer - Fresher",
      description: [
        "Develop and maintain web applications using modern JavaScript frameworks.",
        "Collaborate with cross-functional teams to design, develop, and implement software solutions.",
        "Participate in code reviews and contribute to continuous improvement of development processes.",
        "Debug and resolve technical issues across multiple environments.",
        "Learn and adopt new technologies as required by project needs."
      ],
      skills: [
        "Strong foundation in JavaScript and React.js",
        "Understanding of basic data structures and algorithms",
        "Familiarity with version control systems (Git)",
        "Basic knowledge of REST APIs and web services",
        "Good problem-solving and analytical skills",
        "Eagerness to learn new technologies and frameworks"
      ],
      benefits: [
        "Comprehensive training and mentorship program",
        "Opportunity to work on real-world projects from day one",
        "Collaborative work environment with experienced developers",
        "Regular skill development workshops",
        "Performance-based career growth opportunities"
      ],
      eligibility: "Bachelor's degree in Computer Science, IT, or related field (2025 graduates)",
      location: "ITPL Main Road, Bangalore, India",
      applyInfo: "Write to us with your resume and GitHub profile at support@atomwalk.com "
    }
  ];

  return (
    <Container>
      <Header>Current Job Openings</Header>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <Card key={index}>
            {job.code && <JobCode>Job Code: {job.code}</JobCode>}
            <JobTitle>{job.title}</JobTitle>
            
            <SectionTitle>Job Description:</SectionTitle>
            <JobDetails>
              {job.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </JobDetails>
            
            <SectionTitle>Required Skills:</SectionTitle>
            <JobDetails>
              {job.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </JobDetails>
            
            <HighlightText>Top benefits or perks:</HighlightText>
            <JobDetails>
              {job.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </JobDetails>
            
            <SectionTitle>Eligibility Criteria:</SectionTitle>
            <JobDetails>
              <li>{job.eligibility}</li>
            </JobDetails>
            
            <JobDetails>
              <strong>Location:</strong> {job.location}
            </JobDetails>
            
            <ApplyInfo>{job.applyInfo}</ApplyInfo>
          </Card>
        ))
      ) : (
        <JobDetails>No current job openings available.</JobDetails>
      )}
    </Container>
  );
};


export default JobOpenings;