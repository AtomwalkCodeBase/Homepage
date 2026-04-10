import React from "react";
import styled, { keyframes } from "styled-components";
import img1 from "../../assets/img/Claim_Image_demo.png"; // replace
import img2 from "../../assets/img/Claim_Image_Demo2.png"; // replace

/* ================= Animations ================= */

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ================= Container ================= */

const Section = styled.div`
  background: #fff;
  color: #000;
  padding: 80px 0;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
`;

/* ================= Top Heading ================= */

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeIn} 0.8s ease;
`;

const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  color: #5e5e5e;
`;

/* ================= Divider ================= */

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #222;
  margin: 60px 0;
`;

/* ================= Row ================= */

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  animation: ${fadeIn} 1s ease;

  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* ================= Image ================= */

const ImageWrapper = styled.div`
  flex: 1;

  img {
    width: 100%;
    border-radius: 8px;
  }
`;

/* ================= Text ================= */

const Content = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
`;

const SectionDesc = styled.p`
  color:#535252;
  margin-bottom: 20px;
`;

/* ================= List ================= */

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #535252;
`;

/* Circle icon */
const Icon = styled.div`
  width: 24px;
  height: 24px;
  background: #1e90ff;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;



/* ================= Component ================= */

const FeatureSection = ({ descriptions, header }) => {
  return (
    <Section>
      <Wrapper>
        <Header>
          <Title>{header}</Title>
        </Header>
        {descriptions.map((item, index) => (
          <React.Fragment key={index}>

            <Row reverse={index % 2 !== 0}>

              <ImageWrapper>
                <img src={item.image} alt="" />
              </ImageWrapper>

              <Content>
                <SectionTitle>{item.text}</SectionTitle>
                <SectionDesc> {item.desc} </SectionDesc>

                <List>
                  {item.bullets.map((b, i) => (
                    <ListItem key={i}>
                      <Icon>→</Icon> {b}
                    </ListItem>
                  ))}
                </List>
              </Content>

            </Row>

            {index !== descriptions.length - 1 && <Divider />}

          </React.Fragment>
        ))}

      </Wrapper>
    </Section>
  );
};

export default FeatureSection;