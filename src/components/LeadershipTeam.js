import React from 'react';
import styled from 'styled-components';
import Team from './../assets/img/TemIcon.jpg';
import Linkind from './../assets/img/linkedin.png';
import Lipika from './../assets/img/lipika.jpg';
import Sk from './../assets/img/Sk.svg';
import Jaganath from './../assets/img/sk2.svg';
import Satish from './../assets/img/Satish (1).jpg';
import Jayanthi from './../assets/img/freepik__enhance__57693.png';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  width: 100%;
  /* padding: 50px 0; */
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
  /* padding: 50px 0; */
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
  padding-top: 30px;
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
  width: 80%;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const PersonCard = styled.div`
  perspective: 1000px;
  width: 100%;
  max-width: 400px;
  height: 420px;
  margin: 20px;
  position: relative;

  &:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FlipCardBack = styled(FlipCardFront)`
  background-color: #f8f8f8;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  text-align: justify;
`;

const LinkedInIcon = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #0077b5;
  font-size: 1.5rem;
  &:hover {
    color: #005582;
  }
  img {
    width: 30px;
    height: 30px;
  }
`;

// Main Component
const LeadershipAdvisors = () => {
  return (
    <Container>
      {/* Leadership Section */}
      <Section bgColor="#fff8f0">
        <Heading>Executive Board</Heading>
        <PeopleGrid>
          <PersonCard>
            <FlipCardInner className="flip-card-inner">
              <FlipCardFront>
                <PersonImage src={Team} alt="Manoj Sahoo" />
                <PersonName>Manoj Kumar Sahoo</PersonName>
                <PersonRole>Founder and Director</PersonRole>
                <PersonDescription>Manoj has 25+ years of experience in Product solution, Engineering and Development in two of the India’s leading Products, Finacle (INFOSYS) an enterprise solution in Banking and Financial Services and Tally the most admirable product in SMB segment</PersonDescription>
              </FlipCardFront>
              <FlipCardBack>
                <PersonDescription>
                Manoj K. Sahoo, Founder and Director of Atomwalk, drives product development and innovation with over 25 years of experience in engineering and software solutions. He was instrumental in building two of India’s iconic software products: Finacle, Infosys's global banking solution, and Tally, a leading business tool for SMBs. Manoj's expertise spans payments, supply chain management, and delivery excellence, with multiple patents in product innovation. Holding a B-Tech from NIT Rourkela and an MS from BITS Pilani, he leads Atomwalk's mission to deliver ERP solutions that enhance business efficiency and digital transformation.</PersonDescription>
                <LinkedInIcon href="https://www.linkedin.com/in/manojksahoo" target="_blank">
                  <img src={Linkind} alt="LinkedIn" />
                </LinkedInIcon>
              </FlipCardBack>
            </FlipCardInner>
          </PersonCard>

          <PersonCard>
            <FlipCardInner className="flip-card-inner">
              <FlipCardFront>
                <PersonImage src={Lipika} alt="Lipika" />
                <PersonName>Dr. Lipika Sahoo</PersonName>
                <PersonRole>Co-Founder and Director</PersonRole>
                <PersonDescription>Dr. Lipika Sahoo, with 24 years of academia and industry experience in technology, innovation, and intellectual property, holds a PhD from IISc. She has triple master's degrees: MSc from Sambalpur University, PGDIPR from NLSIU, and PGCBM from XIMB, along with advanced certifications from WIPO and IIM Bangalore.</PersonDescription>
              </FlipCardFront>
              <FlipCardBack>
                <PersonDescription>Dr. Lipika Sahoo, Co-Founder and Director of Atomwalk, brings 24 years of experience in academia and industry, specializing in technology, innovation, and intellectual property. She holds a PhD from the Indian Institute of Science (IISc) and has earned multiple advanced degrees, including an MSc, PGDIPR, PGCBM, and certifications from WIPO and IIM Bangalore. Dr. Sahoo serves as a reviewer for various innovation programs. Her extensive expertise supports Atomwalk’s mission of driving impactful, socially relevant technological innovations.</PersonDescription>
                {/* <LinkedInIcon href="https://www.linkedin.com/in/lipikasahoo" target="_blank">
                  <img src={Linkind} alt="LinkedIn" />
                </LinkedInIcon> */}
              </FlipCardBack>
            </FlipCardInner>
          </PersonCard>
        </PeopleGrid>
      </Section>

      {/* Board of Advisors Section */}
      <Section2 bgColor="#fff8f0">
        {/* <Heading>Board of Advisors</Heading> */}
        <PeopleGrid>
          <PersonCard>
            <FlipCardInner className="flip-card-inner">
              <FlipCardFront>
                <PersonImage src={Sk} alt="SK Patnaik" />
                <PersonName>SK Patnaik</PersonName>
                <PersonRole>Business, Product and Sales Strategy</PersonRole>
                <PersonDescription>SK has led Business Management (Client relationship, sales and P&L management, joint GTM) roles in the IT Services industry and lived in the US, UK, South-East Asia, India. He has successfully set-up new business divisions, new global market entries, and new partnerships.  </PersonDescription>
              </FlipCardFront>
              <FlipCardBack>
                <PersonDescription>SK Patnaik, who joined Atomwalk’s Board in 2021, brings expertise in business strategy, product innovation, and revenue growth. He led key roles in client relations, sales, and P&L management in IT Services across global markets in a career of 25 years. At Infosys, he established the APAC and India operations for Manufacturing Vertical and led the adoptions of Digital & Cloud, IoT, Smart Manufacturing, Automation & AI at several Fortune 500 Customers. He has long involvement in the ERP space with SAP, Oracle; platforms like Salesforce, and other SaaS solutions. SK also co-founded a deep-tech telecom start-up. He holds an MBA in Marketing and Systems from the Xavier Institute of Management, Bhubaneswar, India.</PersonDescription>
                {/* <LinkedInIcon href="https://www.linkedin.com/in/sk-patnaik-" target="_blank">
                  <img src={Linkind} alt="LinkedIn" />
                </LinkedInIcon> */}
              </FlipCardBack>
            </FlipCardInner>
          </PersonCard>
          <PersonCard>
            <FlipCardInner className="flip-card-inner">
              <FlipCardFront>
                <PersonImage src={Jaganath} alt="Dr. M R Jaganath" />
                <PersonName>Dr. M R Jaganath</PersonName>
                <PersonRole>Technical Specialist</PersonRole>
                <PersonDescription>He has an illustrious career  as a Scientist managing deep Technology, Translational Medicine, Drug development , Drug discovery.  He has published numerous scientific articles in reputed journals.</PersonDescription>
              </FlipCardFront>
              <FlipCardBack>
                <PersonDescription>Dr. M.R. Jaganath, Technical Specialist on Atomwalk’s Board, is an expert in lab management, GLP, and GMP. As former CSO of Connexios Life Sciences, he contributed to translational network biology and led a team developing drug candidates for type 2 diabetes. He holds a PhD from IISc Bangalore and degrees in Agriculture and Agricultural Microbiology from UAS Bangalore. His career spans banking at RBI, startup support in distillery effluent treatment and plant tissue culture, and extensive work in drug discovery and development. A prolific scientist, he has numerous publications in esteemed journals.</PersonDescription>
                {/* <LinkedInIcon href="https://linkedin.com" target="_blank">
                  <img src={Linkind} alt="LinkedIn" />
                </LinkedInIcon> */}
              </FlipCardBack>
            </FlipCardInner>
          </PersonCard>
        </PeopleGrid>
        <PeopleGrid>
          <PersonCard>
            <FlipCardInner className="flip-card-inner">
              <FlipCardFront>
                <PersonImage src={Jayanthi} alt="Jayanthi S Vel" />
                <PersonName>Jayanthi S Vel</PersonName>
                <PersonRole>Human Resources Officer (HRO)</PersonRole>
                <PersonDescription>Ms Jayanthi is a senior executive responsible for overseeing all aspects of an organization's human resource functions. </PersonDescription>
              </FlipCardFront>
              <FlipCardBack>
                <PersonDescription>Ms Jayanthi is a senior executive responsible for overseeing all aspects of an organization's human resource functions, including recruitment, employee relations, talent development, compensation and benefits, and workforce planning, all while aligning HR strategies with the company's overall business goals. Setting up performance evaluation processes Implementing, Key Performance Indicators (KPIs), Identifying training and development needs.</PersonDescription>
              </FlipCardBack>
            </FlipCardInner>
          </PersonCard>
          <PersonCard>
            <FlipCardInner className="flip-card-inner">
              <FlipCardFront>
                <PersonImage src={Satish} alt="Mr. Satish Murthy V." />
                <PersonName>Mr. Satish Murthy V.</PersonName>
                <PersonRole>Quality Specialist </PersonRole>
                <PersonDescription>He was also instrumental in establishing ISO 17025:2005 system at the test facility and accreditation by NABL. He was part of several inspections at the test facility from the Monitoring Authorities of Germany, The Netherlands, NGCMA (India), OECD site visit (Mutual Joint Visit), the US FDA (2012 and 2016), AAALAC, ISO 17025 audits by NABL.</PersonDescription>
              </FlipCardFront>
              <FlipCardBack>
                <PersonDescription>Mr. Satish Murthy V., M.Sc., RQAP-GLP, joined Atomwalk’s Board as Quality Specialist, brings 28 years of expertise in Quality Management. Satish Murthy V started his career in the year 1995 in the Quality Assurance Unit of Rallis Research, Eurofins Advinus Limited and Adgyl Lifesciences Private Limited. He has expertise in Quality Assurance functions like Safety Assessment, Analytical RD, DMPK and Clinical Pharmacology and is well versed with the OECD Principles of GLP, US FDA
21 CFR part 58, US EPA 40 CFR part 160 and 40 CFR Part 792 GLP standards. He serves as a faculty at the various GLP training programs conducted by the National GLP Compliance Monitoring Authority, India.</PersonDescription>
                {/* <LinkedInIcon href="https://linkedin.com" target="_blank">
                  <img src={Linkind} alt="LinkedIn" />
                </LinkedInIcon> */}
              </FlipCardBack>
            </FlipCardInner>
          </PersonCard>
        </PeopleGrid>
      </Section2>
    </Container>
  );
};

export default LeadershipAdvisors;