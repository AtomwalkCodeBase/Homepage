import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 4rem 6rem;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #000;
`;

const Description = styled.p`
  max-width: 450px;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 260px;
  gap: 1.5rem;
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  contain: layout paint;

  &:hover img {
    transform: scale(1.05);
  }

  &:hover .desc {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LargeCard = styled(Card)`
  grid-row: span 2;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 14px;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.2)
  );
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  color: white;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 6px;
`;

const CardDescription = styled.p`
  color: white;
  font-size: 0.85rem;
  line-height: 1.4;

  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
`;


// ✅ DATA ARRAY (your content)
const contentData = [
  {
    type: "BLOG",
    title: "Reimagining Research Efficiency with Lab Management Systems",
    description: "Transform labs with automation, compliance, real-time tracking",
    link: "https://home.atomwalk.com/Blog.html/EHotZtZe69QIVF4Lbstn",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=70"
  },
  {
    type: "BLOG",
    title: "AI at Work: The Emergence of Virtual Employees",
    description: "AI collaborators improving productivity and decision-making",
    link: "https://home.atomwalk.com/Blog.html/Fc33QjobXeXTCNY1N0lO",
    image: "https://sathkenya.com/wp-content/uploads/2025/04/blog-banner.png"
  },
  {
    type: "BLOG",
    title: "Unified Intelligence: Integrating IoT with ERP Systems",
    description: "Connect systems for smarter operations and real-time insights",
    link: "https://home.atomwalk.com/Blog.html/kZdSnlWH89YNh4y2oyjD",
    image: "https://media.licdn.com/dms/image/v2/D4D12AQGhM_nrorcVbw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1666070608292?e=2147483647&v=beta&t=RO-W52emOOVw9DidFifT-Ed5iEFsBL2gf6bN8AXT568"
  },
  {
    type: "NEWS",
    title: "Partnering for Scientific Advancement",
    description: "Atomwalk at IISER Pune microscopy training event",
    link: "https://home.atomwalk.com/news-events.html/noRP4cVKRBY00AgyrxkG",
    image: "https://quantumzeitgeist.com/wp-content/uploads/science-1.jpg"
  },
  {
    type: "NEWS",
    title: "ERP Patent Secured by Atomwalk",
    description: "Government of India grants patent for ERP innovation",
    link: "https://home.atomwalk.com/news-events.html/qM8TgvRXhKOeHXNezmi6",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=70"
  },
  {
    type: "EVENT",
    title: "Microbiome Conference Participation",
    description: "Showcasing innovations at global microbiome conference",
    link: "https://home.atomwalk.com/news-events.html/aSZ53P0tUqD3Po4ESmf1",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=70"
  },
  {
    type: "EVENT",
    title: "NASSCOM & K-Tech Recognition",
    description: "Recognized among top MSME solution providers",
    link: "https://home.atomwalk.com/news-events.html/xrdVf5zh8h9gwcvLIz7B",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=70"
  }
];

const LatestThinking = () => {
  return (
    <Section>
      <Header>
        <Title>Latest Thinking</Title>
        <Description>
          Perspectives and research on how AI-driven enterprise platforms are transforming operations across industries from manufacturing and research laboratories to customer systems.
        </Description>
      </Header>

      <Grid>
        {contentData.map((item, index) => {
          const isLarge = index === 0 || index === 4;
          const Component = isLarge ? LargeCard : Card;

          return (
            <Component
              key={index}
              onClick={() => window.open(item.link, "_blank")}
            >
              <Image loading="lazy" src={item.image} />

              <Tag>{item.type}</Tag>

              <Overlay>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="desc">
                  {item.description}
                </CardDescription>
              </Overlay>
            </Component>
          );
        })}
      </Grid>
    </Section>
  );
};

export default LatestThinking;