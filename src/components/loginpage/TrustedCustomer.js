import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { P } from "../CommonStyle";
import TrustedCustomReview from "./TrustedCustomReview";
import MurataImg from "./images/lifeintelect.jpg";
// import colorSharp2 from "../../assets/img/color-sharp.png"
// import HondaImg from "../images/honda.png";
// import UpmImg from "../images/ump.svg";
// import PanasonicImg from "../images/Panasonic_logo.png";
// import PhilipsImg from "../images/Philips_logo.png";
// import KonicaImg from "../images/konicamaniolta.svg";
// import RioImg from "../images/riotinto.svg";
// import SumitomoImg from "../images/sumitomo.svg";
// import LorealImg from "../images/loreal.png";
// import FujiImg from "../images/fujifilm.png";
// import Omron from "../images/OMRON.png";
// import AisinImg from "../images/AISIN.png";
// import JxMetalImg from "../images/jsmetal.svg";
// import ElectroluxImg from "../images/electroluxnew-1.png";
// import RohamImg from "../images/ROHM.svg";
// import Nissay from "../images/nissay.svg";

// import RohmLogo from "../images/roham.png";
// import KanekaLogo from "../images/kaneka.svg";
// import Mitsubishi from "../images/mitsubishi.svg";
// import PanasonicLogo from "../images/panasonic111.png";
// import NissayImg from "../images/nissay111.png";
// import Cocacola from "../images/cocacola.svg";
// import Clariant from "../images/clariant.svg";
// import Bosch from "../images/bosch.svg";
// import Electrolux from "../images/electrolux.svg";
// import Loreal from "../images/loreal-bl.svg";
// import Dow from "../images/dow.svg";
// import Bridgestone from "../images/Bridgestone.svg";
// import Gsk from "../images/gsk.svg";
// import unilever from "../images/unilever.svg";
// import Nec from "../images/nec.svg";
// import Beiersdorf from "../images/beiersdorf.svg";

const TrustedWrapper = styled.div`
  padding-bottom: 75px;
  background-color: aliceblue;
  /* margin-bottom: 70px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin-bottom: 60px; */
  @media screen and (max-width: 767px) {
    /* margin-top: 120px; */
    height: 100%;
  }
`;
const CustomerLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
  width: 100%;
  /* margin-top: 40px; */
  row-gap: 40px;
  background-color: #95f5d9;
  row-gap: 0;

  @media screen and (max-width: 767px) {
    width: auto;
    row-gap: 40px;
    justify-content: space-around;
    padding: 20px 0;
  }
`;
const Img = styled.img`
  /* filter: grayscale(1); */
  height: 65px;
  opacity: 0.7;
`;
const GripWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 60px;
  height: 502px;

  @media (min-width: 1524px) {
    max-width: 1336px;
    margin: 0 auto;
    margin-top: 60px;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 0.5fr;
    height: 100%;
  }
`;

export default function TrustedCustomer() {
  const [coroIndex, setCoroIndex] = useState(1);

  const HandleCoroIndex = (index) => {
    setCoroIndex(index);
  };

  const autoSlideChange = () => {
    setCoroIndex((prev) => {
      if (prev > 2) {
        return 1;
      } else {
        return prev + 1;
      }
    });
  };

  useEffect(() => {
    // Call the function every 2 seconds
    const intervalId = setInterval(autoSlideChange, 8000);
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <TrustedWrapper>
        <div style={{ textAlign: "center", width: "70%" }}>
          <P
            text="Global Market leaders trust Atomwalk to design the next opportunity"
            color="#2c3e50"
            fontSize="45px"
            lineHeight="50px"
            fontWeight="900"
            letterSpacing="2.4px"
            mobFontSize="40px"
          ></P>
          <P text="" fontSize="16px" fontWeight="400" marginTop="18px"></P>
        </div>
        <GripWrap>
          <CustomerLogo>
            {/* <Img src="https://picsum.photos/103/103" style={{ width: "130px" }} />
            <Img src="https://picsum.photos/102/102"  />
            <Img src="https://picsum.photos/103/103" />
            <Img src="https://picsum.photos/103/103" />
            <Img src="https://picsum.photos/103/103" /> */}
            {/* <Img src="https://picsum.photos/103/103" />
            <Img src={Nec} style={{ width: "133px" }} />
            <Img src={Cocacola} style={{ width: "118px" }} />
            <Img src={SumitomoImg} />
            <Img src={Clariant} style={{ width: "150px" }} />
            <Img src={Bosch} style={{ width: "120px" }} />
            <Img src={Electrolux} style={{ width: "150px" }} />
            <Img src={Loreal} style={{ width: "120px" }} />
            <Img src={Dow} style={{ width: "130px" }} />
            <Img src={Mitsubishi} />
            <Img src={KonicaImg} />
            <Img src={RioImg} />
            <Img src={JxMetalImg} />
            <Img src={RohamImg} style={{ width: "130px" }} />
            <Img src={UpmImg} /> */}
          </CustomerLogo>
          {coroIndex == 1 && (
            <TrustedCustomReview
              HandleCoroIndex={HandleCoroIndex}
              coroIndex={coroIndex}
              review="We highly recommend Atomwalk to companies working on formulating future strategies that need top quality market and technology intelligence"
              Cname="Dongdong Wang"
              CLogo={MurataImg}
              Cposition="General Manager Panasonic"
            ></TrustedCustomReview>
          )}
          {coroIndex == 2 && (
            <TrustedCustomReview
              HandleCoroIndex={HandleCoroIndex}
              coroIndex={coroIndex}
              review="Across many years, the Atomwalk platform has provided us unbiased AI generated trends and insights across various innovation topics. This allows our internal teams to bring a new level of operational efficiency that can help us properly understand market opportunities and reduce our time to generate strategy roadmaps."
              Cname="Takashi Zack Okazaki"
              CLogo={MurataImg}
              Cposition="Head of U.S. R&D Nippon Life X Silicon Valley"
            ></TrustedCustomReview>
          )}
          {coroIndex == 3 && (
            <TrustedCustomReview
              HandleCoroIndex={HandleCoroIndex}
              coroIndex={coroIndex}
              review="Through the use of this platform, we were able to obtain new technology information. By using Atomwalk reports, I decided our roadmap. This decision has been of a very high value all over the company."
              Cname="Takuji Maekawa"
              CLogo={MurataImg}
              Cposition="R&D Department"
            ></TrustedCustomReview>
          )}
        </GripWrap>
      </TrustedWrapper>
    </div>
  );
}
