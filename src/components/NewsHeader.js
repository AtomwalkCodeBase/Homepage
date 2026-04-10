// components/NewsHeader.jsx
import React from "react";
import styled from "styled-components";
export const Wrapper = styled.section`
  padding: 8rem 6rem;
  background-color: #5f0229;
  background-image: url("https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/press-release-bg.svg");
  overflow: hidden;

  @media (max-width: 992px) {
    padding: 4rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;
const Content = styled.div`
  position: relative;
  max-width: 1300px;
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.5px;
`;

const Subheading = styled.p`
  margin-top: 24px;
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.85;
  max-width: 750px;
`;

const NewsHeader = ({ title, subheading }) => {
  return (
    <Wrapper>
      <Content>
        <Title>{title}</Title>
        {subheading && <Subheading>{subheading}</Subheading>}
      </Content>
    </Wrapper>
  );
};

export default NewsHeader;