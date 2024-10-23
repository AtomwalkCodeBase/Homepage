import React from 'react';
import styled from 'styled-components';
import Team from './../assets/img/TemIcon.jpg'
import Linkind from './../assets/img/linkedin.png'
import Lipika from './../assets/img/lipika.jpg'
import Sk from './../assets/img/Sk.svg'
import Jaganath from './../assets/img/sk2.svg'
// Styled Components
const LinkedInIcon = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #0077b5;
  font-size: 1.5rem;
width: 8%;
  &:hover {
    color: #005582;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  /* padding: 50px 0; */
`;

const Section = styled.div`
  width: 100%;
  padding: 50px 0;
  background-color: ${({ bgColor }) => bgColor || 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 300px 0px 0px 0px;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;
const Section2 = styled.div`
  width: 100%;
  padding: 50px 0;
  background-color: ${({ bgColor }) => bgColor || 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0px 0px 300px 0px;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;
const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* gap: 30px; */
  width: 80%;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    gap: 20px;
  }
`;

const PersonCard = styled.div`
  text-align: center;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const PersonImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
  object-fit: cover;
  border: 2px solid #ddd;
`;

const PersonName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const PersonRole = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #555;
`;

const PersonDescription = styled.p`
  font-size: 1rem;
  color: #777;
  line-height: 1.4;
`;

// Main Component
const LeadershipAdvisors = () => {
  return (
    <Container>
      {/* Leadership Section */}
      <Section bgColor="#fff8f0">
        <Heading>Leadership</Heading>
        <PeopleGrid>
          <PersonCard>
            <PersonImage src={Team} alt="Manoj Sahoo" />
            <PersonName>Manoj Kumar Sahoo</PersonName>

            <PersonRole>CEO, Co-founder</PersonRole>
            <PersonDescription>Manoj has 25+ years of experience in Product solution, Engineering and Development in two of the India’s leading Products, Finacle (INFOSYS) an enterprise solution in Banking and Financial Services and Tally the most admirable product in SMB segment</PersonDescription>
          </PersonCard>

          <PersonCard>
            <PersonImage src={Lipika} alt="Lipika" />
            <PersonName>Dr. Lipika Sahoo</PersonName>
            <PersonRole>Founder and Director</PersonRole>
            <PersonDescription>Dr. Lipika Sahoo, with 24 years of academia and industry experience in technology, innovation, and intellectual property, holds a PhD from IISc. She has triple master's degrees: MSc from Sambalpur University, PGDIPR from NLSIU, and PGCBM from XIMB, along with advanced certifications from WIPO and IIM Bangalore.</PersonDescription>
          </PersonCard>
        </PeopleGrid>
      </Section>

      {/* Board of Advisors Section */}
      <Section2 bgColor="#e8f3fc">
        <Heading>Board of Advisors</Heading>
        <PeopleGrid>
          <PersonCard>
            <PersonImage src={Sk} alt="BV Jagadeesh" />
            <PersonName>SK Patnaik</PersonName>
            <PersonRole>Advisor</PersonRole>
            <PersonDescription>For ~25 years, he led Business Management (Client Relationship, Sales and P&L Management, new GTM) roles mainly in the IT Solutions & Services spanning global markets (the US, UK, South-East Asia, and India).</PersonDescription>
          </PersonCard>
           <PersonCard>
            <PersonImage src={Jaganath} alt="Murali Chirala" />
            <PersonName>Dr. M R Jaganath</PersonName>
            <PersonRole>Advisor</PersonRole>
            <PersonDescription>He has an illustrious career  as a Scientist managing deep Technology, Translational Medicine, Drug development , Drug discovery.  He has published numerous scientific articles in reputed journals.</PersonDescription>
          </PersonCard>
        </PeopleGrid>
      </Section2>
    </Container>
  );
};

export default LeadershipAdvisors;
{/* <LinkedInIcon href="https://www.linkedin.com/in/manojksahoo" target="_blank">
<img src={Linkind}></img>
</LinkedInIcon> */}