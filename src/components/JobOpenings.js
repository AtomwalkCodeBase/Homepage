import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f4f4f4, #e0e0e0);
  color: #333;
  padding: 50px;
  height: 60vh;
  width: 100%;
  flex-direction: column;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1e3c72;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  text-align: left;
`;

const JobTitle = styled.h2`
  font-size: 1.8rem;
  color: #2a5298;
  margin-bottom: 10px;
`;

const JobDetails = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 5px 0;
`;

const JobOpenings = () => {
  const jobs = [
    {
      title: "Software Engineer - Fresher",
      location: "Bangalore",
      description: "We are looking for a passionate Software Engineer to join our team. Fresh graduates with a strong foundation in programming are welcome to apply.",
      requirements: "Basic knowledge of JavaScript, React.js, and problem-solving skills.",
    },
  ];

  return (
    <Container>
      <Header>Current Job Openings</Header>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <Card key={index}>
            <JobTitle>{job.title}</JobTitle>
            <JobDetails><strong>Location:</strong> {job.location}</JobDetails>
            <JobDetails><strong>Description:</strong> {job.description}</JobDetails>
            <JobDetails><strong>Requirements:</strong> {job.requirements}</JobDetails>
          </Card>
        ))
      ) : (
        <JobDetails>No current job openings available.</JobDetails>
      )}
    </Container>
  );
};

export default JobOpenings;
