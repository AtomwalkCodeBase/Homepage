import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Meteonic from "./../assets/img/m-logo.png";
import Fluxgen from "./../assets/img/fluxgon_logo.png";
import IISER from "./../assets/img/iiser_logo_long.png";
import Veekay from "./../assets/img/VeekayCoolers.png";
import Lifeintelect from './../assets/img/lifeintelect_square.jpg';
import Ramaiah from './../assets/img/Ramaiah.png';
import UniversePower from './../assets/img/UniversePower.png';
import Advika from './../assets/img/Advika.jpg';
import Olety from './../assets/img/Olety.jpg';
import Start_Up_Inda from './../assets/img/satrup-india.png';
import Make_In_Inda from './../assets/img/make-india.jpg';
import Start_Up_KA from './../assets/img/Startup_Karnataka.png';
import Nasscom from './../assets/img/NASSCOM.png';
import msme from './../assets/img/msme.png';



const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const Section = styled.section`
  text-align: center;
  padding: 50px 20px;
  background-color:#eaf4ff;
  overflow: hidden;
`;



const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(270deg, #1f2937, #ea580c, #1f2937, #ea580c);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientShift} 8s ease infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #1f2937, #ea580c);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
`;

const LogoScrollContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
  padding: 20px 0;
`;

const LogoTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  animation: scroll 20s linear infinite;
  min-width: 200%;
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

const LogoCard = styled(motion.div)`
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 100px;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
`;

// Logo Data
const logos = [Meteonic, Fluxgen, IISER, Veekay, Lifeintelect, Ramaiah, UniversePower, Advika, Olety,Start_Up_Inda,Make_In_Inda,Start_Up_KA,Nasscom,msme];

const CustomerLogos = () => {
  return (
    <Section>
      <SectionTitle>Brands we are associated with</SectionTitle>
      <LogoScrollContainer>
        <LogoTrack>
          {logos.concat(logos).map((logo, index) => (
            <LogoCard key={index} whileHover={{ scale: 1.1 }}>
              <LogoImage src={logo} alt={`Customer Logo ${index + 1}`} />
            </LogoCard>
          ))}
        </LogoTrack>
      </LogoScrollContainer>
    </Section>
  );
};

export default CustomerLogos;