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
  margin-bottom: 12px;
  border-bottom: 2px solid #d9e2ec;
  padding-bottom: 6px;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const JobDetails = styled.p`
  font-size: 1rem;
  color: #444;
  margin: 6px 0;
  line-height: 1.5;

  strong {
    color: #1e3c72;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const JobOpenings = () => {
  const jobs = [
    {
      title: "Software Engineer - Fresher",
      location: "Bangalore",
      description:
        "We are looking for a passionate Software Engineer to join our development team. Fresh graduates with a strong foundation in programming, eagerness to learn, and problem-solving attitude are encouraged to apply.",
      requirements:
        "Basic knowledge of JavaScript, React.js, and good analytical & problem-solving skills.",
    },
    {
      title: "Business Development Associate - BDA",
      location: "Bangalore",
      description:
        "We are seeking a proactive and results-driven Business Development Associate to help expand our client base. You will work closely with the sales and marketing teams to identify leads, nurture relationships, and close deals.",
      requirements:
        "Excellent communication & interpersonal skills, understanding of sales processes, ability to handle client meetings, and strong negotiation skills. Prior internship or experience in sales/marketing is a plus.",
    },
  ];

  return (
    <Container>
      <Header>Current Job Openings</Header>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <Card key={index}>
            <JobTitle>{job.title}</JobTitle>
            <JobDetails>
              <strong>Location:</strong> {job.location}
            </JobDetails>
            <JobDetails>
              <strong>Description:</strong> {job.description}
            </JobDetails>
            <JobDetails>
              <strong>Requirements:</strong> {job.requirements}
            </JobDetails>
          </Card>
        ))
      ) : (
        <JobDetails>No current job openings available.</JobDetails>
      )}
    </Container>
  );
};

export default JobOpenings;
