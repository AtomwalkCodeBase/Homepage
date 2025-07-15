import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ankur from './../assets/img/meteonic_logo_square.jpg';
import FluxGen from './../assets/img/Fluxgon.jpg';
import IISER from './../assets/img/iiser_logo.png';
import Veekay from './../assets/img/VeekayCoolers.png';
import Lifeintelect from './../assets/img/lifeintelect_square.jpg';
import Ramaiah from './../assets/img/Ramaiah_Square.png';
import UniversePower from './../assets/img/UniversePower_Sqare.png';
import Advika from './../assets/img/Advika_Sqare.png';
import Olety from './../assets/img/Olety.jpg';
// Testimonial Data

const testimonialData = [
  {
    id: 1,
    name: "Ankur Mehrortra, Meteonic Innovation Pvt Ltd.",
    text: `"This is to place on record our utmost satisfaction with the software and the services of ‘Atomwalk Technologies’ an ERP solutions providing company, for businesses and organizations. Their intuitive human resources software, cutting edge technology and user friendly interface have helped us streamline all our HR processes, saving us valuable time and resources and also boosting our organization’s productivity. Added to the above, we are extremely happy with the prompt assistance and support provided by Atomwalk Team, in implementing the software, understanding needs unique to our organization and delivering solutions exceeding our expectations. Atomwalk’s HR software is like a virtual HR manager, and has proven to be a game changer for us.  Key takeaways are accurate data management, enhanced efficiency, heightened employee engagement and savings in time and cost. Meteonic Innovation Pvt Ltd highly recommends Atomwalk’s HR software to organizations seeking reliable, innovative, state of the art, yet user friendly HR solutions."`,
    img: `${Ankur}`,
  },
  {
    id: 2,
    name: "Deepak Emanuel, Chief Operating Officer, FluxGen Sustainable Technologies Pvt Ltd",
    text: `"Atomwalk Technologies Private Limited, has optimized our project management tools with their innovative software solutions. Throughout the execution of the project, the team did a commendable job, with attention to every minute detail of our business, covering all aspects, even ones in the foreseeable future. We at, FluxGen Pvt Ltd thank them for providing us with the best possible software solutions, and also for hand holding our company executives, till they were eased into using the software. The software provided by Atomwalk has eased a lot of our time-consuming activities, with its automation processes, which has not only increased productivity, but has also enabled quantifiable progress of our projects, with minimal human intervention. The software application itself is very well thought of, user friendly and has given us a competitive advantage by automating the processes. It is our pleasure to recommend ‘Atomwalk Technologies Private Limited’ for effective business management software needs, which is truly value for money."`,
    img: `${FluxGen}`,
  },
  {
    id: 3,
    name: "Mr Santosh Olety, CEO Olety Carz",
    text: `“Atomwalk’s ERP software, with its end to end solutions, we are able to track and monitor every aspect of our business. Since then, we have optimized processes, cut down costs, and achieved robust growth in sales. Atomwalk’s curated ERP software has helped us in integrating all our business activities in a very efficient manner. The software itself is easy to use, very reasonably priced for the wide range of solutions it has to offer.”`,
    img: `${Olety}`,
  },
  {
    id: 4,
    name: "Dr Santosh Poddar, IISER, Pune",
    text:`"We were interested to know about the integrated Atomwalk software. Thereafter, We evaluated and finalized it for our Microscopy facility, IISER Pune. We are very happy with Atomwalk Software, its performance at our volume of operations and the way it has been customized to meet our requirements. Today nearly 160 users are using the software round the clock to book the microscopes. We are very impressed with their ‘one of its kind’ software solutions, based on latest software technology, providing end to end solutions. Atomwalk team has been professional. They delivered what they promised. We are looking for a long association with them and wish them more success."`,
    img: `${IISER}`,
  },
  {
    id: 5,
    name: "V.K.Shanmuga Vel, CEO Veekay Coolers",
    text:`“Atomwalk gave a lucid, easy to understand presentation of their software, guiding us through every process. Since then, we have been using the software and now it is an indispensable part of Veekay Cooolers. All records, client, company data are now streamlined and available at the click of a button. We are now able to manage the whole team’s work in one place, which has vastly increased efficiency, productivity and accountability. All our customer, accounting, purchase, sales, data are also compiled in one place, which enables us to plan future sales projections and targets. The software itself is very user friendly and intuitive.”`,
    img: `${Veekay}`,
  },
  {
    id: 6,
    name: "Lifeintelect",
    text:`“We have been using Atomwalk Technologies’ software for the past 5 years, and have effectively optimized all our processes from documentation to docketing to real time updates on all projects. Every single process runs on an automated process developed by Atomwalk, and alerts us on future action required for every single client, which is very crucial for our company functions. Every aspect of our business, like project management, employee management and business management, is taken care of by Atomwalk Solutions."`,
    img: `${Lifeintelect}`,
  },
  {
    id: 7,
    name: "Dr Prashanthi K, Assistant Prof. Ramaiah University, Bangalore",
    text:`"I am very pleased to place on record the exemplary services rendered by Atomwalk Technologies Private Limited. Atomwalk software has simplified our time-consuming activities, with its automation processes, and that has increased productivity, with quantifiable progress. We are very impressed with their ‘one of its kind’ software solutions, based on latest software technology, providing end to end solutions. The team at Atomwalk was very receptive to our queries and we appreciate their commitment and efficiency in ensuring timely delivery of the project. We highly recommend the services of Atomwalk Technologies Pvt Ltd, as a one stop solution for streamlining various activities of your business, at a very reasonable cost."`,
    img: `${Ramaiah}`,
  },
  {
    id: 8,
    name: "Jeyalakshmi Venkatanarayanan, Proprietrix, Universe Power Systems",
    text:"At Universe Power Systems, we are extremely happy with the software solutions and the services provided by Atomwalk Technologies, a company providing cloud based ERP solutions. Atomwalk Technologies’ unique, technologically advanced, yet user friendly and cost effective  software has helped our organization in managing our core processes, especially Customer Resource Management, which earlier was cumbersome and fraught with inefficiencies. The software has robust features which has helped us in improving customer engagement, enhancing customer experience and relationship, driving sales and increasing our profitability. Atomwalk’s exceptional customer support, responsive team made the onboarding process a truly delightful experience. They provided valuable insights in understanding customer behaviour. Their software has helped us in planning our business strategies more effectively. Universe Power Systems highly recommends  Atomwalk’s CRM software to any organization wanting to elevate their business to the next level, with enhanced customer engagement and satisfaction leading to higher sales and profits.",
    img: `${UniversePower}`,
  },
  {
    id: 9,
    name: "Mr Sridhar Alampalli, Advika (NGO)",
    text:"We, at Advika, are very happy with the software solutions provided by Atomwalk Technologies, a Bangalore based cloud ERP company. At Advika, a NGO dedicated to uplifting the lives of orphan children, managing daily operations, was a real challenge. From administrative to inventory to logistical issues, there were frequent problems of co ordination and implementation. Added to that, compliance as per regulatory authorities, was particularly important, especially maintaining meticulous records of inmates and other information as mandated by authorities. Atomwalk provided us with a comprehensive software which has streamlined our operations, integrated all processes. Now we are able to manage our data more effectively, track donations, monitor each child’s progress, manage inventory and ensure compliances required for an NGO. Our staff is also relieved of mundane tasks of maintaining heavy ledgers, making manual entries. Now that our resources are utilized efficiently, we have more time on our hands to focus on all round development of our children. Special thanks to the exceptional team support, help and guidance from Atomwalk Team in onboarding to the platform, helping us make the most of this powerful tool. The software itself is intuitive, user friendly and cost effective. We highly recommend the software solutions of Atomwalk Technologies for any organization seeking reliable, hassle free, user friendly and economically viable solutions for managing their day to day operations.",
    img: `${Advika}`,
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
  background-color: rgb(234 244 255);
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
  min-height: 250px;
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
  /* text-align: justify; */
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
