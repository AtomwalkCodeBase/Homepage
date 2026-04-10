import React from "react";
import styled from "styled-components";
import { FiMapPin } from "react-icons/fi";

const Section = styled.div`
  padding: 80px 20px;
  background: #f6f2ea
`;

const Wrapper = styled.div`
  max-width: 1300px;
  margin: auto;
`;

const Heading = styled.h2`
text-align: center;
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(to right, #1f2937, #ea580c, #1f2937);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 56px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubText = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 40px;
`;

const MapCard = styled.div`
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;

  iframe {
    width: 100%;
    height: 420px;
    border: 0;
  }

  @media (max-width: 768px) {
    iframe {
      height: 300px;
    }
  }
`;

const LocationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #ef4444;
    font-size: 20px;
  }
`;

const LocationText = styled.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    color: #1e293b;
  }

  p {
    margin: 2px 0 0;
    font-size: 0.85rem;
    color: #64748b;
  }
`;

const DirectionsBtn = styled.a`
  background: #ef4444;
  color: white;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background: #dc2626;
  }
`;

const ContactCard = () => {
  return (
    <Section>
      <Wrapper>
        <Heading>Find Us on Map</Heading>
        <MapCard>
          {/* 🔥 Just replace "Atomwalk" with your exact address if needed */}
          <iframe
            src="https://www.google.com/maps?q=Atomwalk&output=embed"
            loading="lazy"
          ></iframe>

          <LocationBar>
            <LocationInfo>
              <FiMapPin />
              <LocationText>
                <h4>Atomwalk</h4>
                <p>Your ERP & Lab Solutions Partner</p>
              </LocationText>
            </LocationInfo>

            <DirectionsBtn
              href="https://www.google.com/maps/search/?api=1&query=Atomwalk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </DirectionsBtn>
          </LocationBar>
        </MapCard>
      </Wrapper>
    </Section>
  );
};

export default ContactCard;