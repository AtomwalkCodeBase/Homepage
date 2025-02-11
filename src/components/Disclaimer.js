import React from "react";
import styled from "styled-components";

const PrivacyPolicyContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  margin-top: 150px;
  padding: 40px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
  font-family: 'Roboto', sans-serif;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
  color: #222;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 25px;
  background: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #007bff;
`;

const Text = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.8;
  text-align: justify;
  margin-bottom: 10px;
`;

const Disclaimer = () => {
  return (
    <PrivacyPolicyContainer>
      <Title>Disclaimer</Title>
      <Section>
        <Text>
        The materials provided in this website are solely for the purposes of informing, assisting, and guiding our clients, associates and other professionals and are not in anyway a substitute for professional opinion or advice. This website is meant solely for the purpose of information and not for the purpose of advertising or solicitation. We do not take responsibility for decisions taken by the reader based solely on the information provided in the website. It is not and does not claim to be legal or other advice. The transmission of this website, and/or communication with ‘Atomwalk’ via e-mail through this website shall not constitute or create a client- consultant relationship between you and ‘Atomwalk’.
        </Text>
      </Section>
      <Section>
        <Text>
        While we endeavour to ensure that the contents of the site are accurate and are true to the best of our knowledge, errors or omissions may occur and we do not accept any liability in respect of them. If there is any discrepancy, please do feel free to bring it to our notice.
        </Text>
      </Section>
      <Section>
        <Text>
        Any links provided on the site are provided for your convenience and for informational purpose only– their inclusion does not imply any approval or endorsement by us. We have no control over the content of those sites and ‘Atomwalk’ disclaims all liability with regard to your access of such linked web sites.
        </Text>
      </Section>
    </PrivacyPolicyContainer>
  );
};

export default Disclaimer;
