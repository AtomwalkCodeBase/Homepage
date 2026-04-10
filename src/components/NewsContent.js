// components/NewsContent.jsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 60px;
  background: #f5f2ee;
  color: #445454;
`;

const Meta = styled.p`
  font-weight: 600;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.7;
`;

const Quote = styled.div`
  margin-top: 40px;
  font-style: italic;
`;

const Author = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

const NewsContent = ({ location, date, content, }) => {
    return (
        <Container>
            <Meta>
                {location} | {date}
            </Meta>

            {content.map((para, index) => (
                <Paragraph key={index}>{para}</Paragraph>
            ))}

            {/* {quote && (
                <Quote>
                    "{quote.text}"
                    <Author>
                        {quote.author}, {quote.role}
                    </Author>
                </Quote>
            )} */}
        </Container>
    );
};

export default NewsContent;