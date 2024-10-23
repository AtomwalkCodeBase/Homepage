import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lipika from './../assets/img/lipika.jpg'

// Testimonial Data
const testimonialData = [
  {
    id: 1,
    name: "Dr Santosh Poddar, IISER, Pune",
    text:"Atomwalk’s ERP software has revolutionized our financial management. The seamless integration and user-friendly interface have significantly improved our operational efficiency.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Deepak Emanuel, Chief Operating Officer, FluxGen Sustainable Technologies Pvt Ltd",
    text: "The inventory management features of Atomwalk have been a game-changer for us. We can now track our stock levels in real-time, reducing waste and optimizing our supply chain.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Mr. Santosh Olety, CEO at Microsys Care: ",
    text: "He highlights the efficiency and effectiveness of Atomwalk’s software in streamlining their operations.",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 4,
    name: "Dr.Lipika Sahoo CEO at Lifeintelect Consultancy: ",
    text: "Implementing Atomwalk’s ERP system was one of the best decisions we’ve made. It has streamlined our processes, from accounting to project management, and provided us with valuable insights into our business performance.",
    img: `${Lipika}`,
  },
];

// Styled Components
const Manwarp =styled.div`
background-color: aliceblue;
  @media (min-width: 768px) {
    padding:0 0 100px;
  }
`
const TestimonialWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: aliceblue;
  @media (min-width: 768px) {
    max-width: 1300px;
  }
`;

const TestimonialCard = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #caf0f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 350px;
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    height: 200px;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const Text = styled.p`
  margin: 10px 0 0;
  color: #777;
`;

const SliderWrapper = styled(Slider)`

  .slick-slide {
    padding: 10px;
  }
  .slick-arrow {
    &:before{
        color: #2c3e50;
    }
 
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 768, // Mobile breakpoint
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 40px;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
`;

const Subtitle = styled.p`
font-weight: 900;
    font-size: 45px;
    color: #2c3e50;
`;

const Description = styled.p`
color: #7f8c8d;
font-size: 18px;
`;

const Testimonial = () => {
  return (
    <Manwarp>
    <TestimonialWrapper>
            <ContentWrapper>
          <Subtitle>Testimonial</Subtitle>
          <Description>What our customers say about Atomwalk</Description>
          {/* <Description>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis delectus architecto error nesciunt,
          </Description> */}
        </ContentWrapper>
      <SliderWrapper {...settings}>
        {testimonialData.map((testimonial) => (
          <div key={testimonial.id}>
            <TestimonialCard>
              <Avatar src={testimonial.img} alt={testimonial.name} />
              <TestimonialContent>
                <Name>{testimonial.name}</Name>
                <Text>{testimonial.text}</Text>
              </TestimonialContent>
            </TestimonialCard>
          </div>
        ))}
      </SliderWrapper>
    </TestimonialWrapper>
    </Manwarp>
  );
};

export default Testimonial;
