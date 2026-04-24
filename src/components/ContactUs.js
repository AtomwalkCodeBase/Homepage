import styled from "styled-components";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import ContactCards from './ContactCards';
import ContactCard from './ContactCard';
import ContactHero from './ContactHero';
import PatentAndPublications from "./PatentAndPublications";
import { Whatsapp } from "react-bootstrap-icons";

const Section = styled.section`
  padding: 100px 20px;
  background: #f6f2ea
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: auto;
  display: grid;
  gap: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const Left = styled.div``;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 15px;
`;

const Description = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;

  svg {
    font-size: 20px;
    color: #ef4444;
    margin-top: 4px;
  }
`;

const InfoText = styled.div`
  font-size: 0.95rem;
  color: #475569;

  strong {
    display: block;
    color: #1e293b;
  }
`;

const FormCard = styled.form`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
`;

const FormTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: #6366f1;
    background: #fff;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 0.9rem;
  outline: none;
  min-height: 120px;

  &:focus {
    border-color: #6366f1;
    background: #fff;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #dc2626;
  }
`;

const ContactUs = () => {
  return (
    <>
      <ContactHero />
      <ContactCards></ContactCards>
      <ContactCard></ContactCard>
      <Section>
        <Wrapper>
          {/* LEFT SIDE */}
          <Left>
            <Title>Get in Touch with Atomwalk </Title>
            <Description>
              Have questions or need help? Our team is ready to assist you.
              Reach out and we’ll get back to you as soon as possible.
            </Description>

            <InfoItem>
              <FiMapPin />
              <InfoText>
                <strong>Address</strong>
                Atomwalk Technologies, Gopalan Millennium Towers, ITPL Main Road,
                Whitefield, Bengaluru – 560037
              </InfoText>
            </InfoItem>

            <InfoItem>
              <FiMail />
              <InfoText>
                <strong>Email</strong>
                info@atomwalk.com
              </InfoText>
            </InfoItem>

            <InfoItem>
              <Whatsapp />
              <InfoText>
                <strong>WhatsApp</strong>
                +91-7259555003
              </InfoText>
            </InfoItem>
          </Left>

          {/* RIGHT SIDE FORM */}
          <FormCard>
            <FormTitle>Send us a message</FormTitle>

            <InputGroup>
              <Input type="text" placeholder="Your Name*" required />
              <Input type="tel" placeholder="Phone Number*" required />
              <Input type="email" placeholder="Email Address*" required />
              <Input type="text" placeholder="Business Type*" />
              <Input type="text" placeholder="Location*" />
              <TextArea placeholder="Your Message*" required />
            </InputGroup>

            <Button type="submit">
              Connect With Atomwalk
            </Button>
          </FormCard>
        </Wrapper>
      </Section>
      <PatentAndPublications />
    </>
  );
};

export default ContactUs;