import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ankur from './../assets/img/meteonic_logo_square.jpg';

// Testimonial Data
const testimonialData = [
  {
    id: 1,
    name: "Ankur Mehrortra, Meteonic Innovation Pvt Ltd.",
    text: "This is to place on record our utmost satisfaction with the software and the services of ‘Atomwalk Technologies’ an ERP solutions providing company, for businesses and organizations. Their intuitive human resources software, cutting edge technology and user friendly interface have helped us streamline all our HR processes, saving us valuable time and resources and also boosting our organization’s productivity. Added to the above, we are extremely happy with the prompt assistance and support provided by Atomwalk Team, in implementing the software, understanding needs unique to our organization and delivering solutions exceeding our expectations. Atomwalk’s HR software is like a virtual HR manager, and has proven to be a game changer for us.  Key takeaways are accurate data management, enhanced efficiency, heightened employee engagement and savings in time and cost. Meteonic Innovation Pvt Ltd highly recommends Atomwalk’s HR software to organizations seeking reliable, innovative, state of the art, yet user friendly HR solutions.",
    img: `${Ankur}`,
  },
  {
    id: 2,
    name: "Deepak Emanuel, Chief Operating Officer, FluxGen Sustainable Technologies Pvt Ltd",
    text: "The inventory management features of Atomwalk have been a game-changer for us. We can now track our stock levels in real-time, reducing waste and optimizing our supply chain.",
    img: "https://picsum.photos/102/102",
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
    name: "Dr Santosh Poddar, IISER, Pune",
    text:"Atomwalk’s ERP software has revolutionized our financial management. The seamless integration and user-friendly interface have significantly improved our operational efficiency.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 5,
    name: "Jeyalakshmi Venkatanarayanan, Universe Power Systems",
    text:"At Universe Power Systems, we are extremely happy with the software solutions and the services provided by Atomwalk Technologies, a company providing cloud based ERP solutions. Atomwalk Technologies’ unique, technologically advanced, yet user friendly and cost effective  software has helped our organization in managing our core processes, especially Customer Resource Management, which earlier was cumbersome and fraught with inefficiencies. The software has robust features which has helped us in improving customer engagement, enhancing customer experience and relationship, driving sales and increasing our profitability. Atomwalk’s exceptional customer support, responsive team made the onboarding process a truly delightful experience. They provided valuable insights in understanding customer behaviour. Their software has helped us in planning our business strategies more effectively. Universe Power Systems highly recommends  Atomwalk’s CRM software to any organization wanting to elevate their business to the next level, with enhanced customer engagement and satisfaction leading to higher sales and profits.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 6,
    name: "Mr Sridhar Alampalli, Advika (NGO)",
    text:"We, at Advika, are very happy with the software solutions provided by Atomwalk Technologies, a Bangalore based cloud ERP company. At Advika, a NGO dedicated to uplifting the lives of orphan children, managing daily operations, was a real challenge. From administrative to inventory to logistical issues, there were frequent problems of co ordination and implementation. Added to that, compliance as per regulatory authorities, was particularly important, especially maintaining meticulous records of inmates and other information as mandated by authorities. Atomwalk provided us with a comprehensive software which has streamlined our operations, integrated all processes. Now we are able to manage our data more effectively, track donations, monitor each child’s progress, manage inventory and ensure compliances required for an NGO. Our staff is also relieved of mundane tasks of maintaining heavy ledgers, making manual entries. Now that our resources are utilized efficiently, we have more time on our hands to focus on all round development of our children. Special thanks to the exceptional team support, help and guidance from Atomwalk Team in onboarding to the platform, helping us make the most of this powerful tool. The software itself is intuitive, user friendly and cost effective. We highly recommend the software solutions of Atomwalk Technologies for any organization seeking reliable, hassle free, user friendly and economically viable solutions for managing their day to day operations.",
    img: "https://picsum.photos/101/101",
  },

];

// Styled Components
const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
`;

const TestimonialSection = styled.div`
  background-color: #f9f9f9;
  padding: 50px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const TestimonialCard = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    padding: 30px;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;
  max-width: 700px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.3em;
  color: #333;
`;

const Text = styled.p`
  margin: 10px 0 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
`;

const SliderWrapper = styled(Slider)`
  .slick-slide {
    padding: 10px;
  }
  .slick-dots li button:before {
    color: #2c3e50;
  }
  .slick-arrow {
    &:before {
      color: #2c3e50;
    }
  }
`;

const Testimonial = () => {
  return (
    <TestimonialSection>
      <Title>What Our Customers Say</Title>
      <SliderWrapper
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={2}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          }
        ]}
      >
        {testimonialData.map((testimonial) => (
          <div key={testimonial.id}>
            <TestimonialCard>
              <Avatar src={testimonial.img} alt={testimonial.name} />
              <TestimonialContent>
                <Name>{testimonial.name}</Name>
                <ExpandableText text={testimonial.text} />
              </TestimonialContent>
            </TestimonialCard>
          </div>
        ))}
      </SliderWrapper>
    </TestimonialSection>
  );
};

const ExpandableText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <>
      <Text>
        {isExpanded ? text : text.length > 200 ? `${text.substring(0, 200)}...` : text}
      </Text>
      {text.length > 200 && (
        <ReadMoreButton onClick={toggleExpansion}>
          {isExpanded ? "Read Less" : "Read More"}
        </ReadMoreButton>
      )}
    </>
  );
};

export default Testimonial;
