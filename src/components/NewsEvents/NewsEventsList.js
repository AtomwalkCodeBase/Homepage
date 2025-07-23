import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {  Calendar,  Newspaper,  Users,  Building2, Loader2, TrendingUp, Globe, Award, Briefcase, ChevronRight, User } from 'lucide-react';
import { db } from '../Blogs/firebase';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled Components
const Container = styled.div`
  max-width: 100vw;
  
  padding: 3rem 6rem;
  background: #fafbfc;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeaderSection = styled.header`
  background-image: url('https://img.freepik.com/free-vector/news-concept-landing-page-illustration_52683-18230.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  margin-top:5rem;
  margin-bottom: 3rem;
  /* background: linear-gradient(135deg, #1e293b 0%, #334155 100%); */
  padding: 3rem 2rem;
  border-radius: 20px;
  color: white;
  position: relative;
  overflow: hidden;

  /* Overlay effect */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(30,41,59,0.75) 0%, rgba(51,65,85,0.7) 100%);
    border-radius: 20px;
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
    border-radius: 50%;
    transform: translate(50px, -50px);
    z-index: 2;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
`;

const CompanyBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
  animation: ${slideIn} 0.8s ease-out;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.2;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0 0 2rem;
  max-width: 600px;
  line-height: 1.6;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 0.5rem;
    color: #60a5fa;
  }
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const FilterTab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : '#f1f5f9'};
    color: ${props => props.active ? 'white' : '#334155'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NewsCard = styled.article`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  animation: ${fadeInUp} 0.6s ease-out;
  border: 1px solid #e2e8f0;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #cbd5e1;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
`;

const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${NewsCard}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryTag = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => props.category === 'news' && `
    background: #1e40af;
    color: white;
  `}
  
  ${props => props.category === 'event' && `
    background: #059669;
    color: white;
  `}
  
  ${props => props.category === 'announcement' && `
    background: #dc2626;
    color: white;
  `}
  
  ${props => props.category === 'achievement' && `
    background: #d97706;
    color: white;
  `}
  
  ${props => !props.category && `
    background: #4338ca;
    color: white;
  `}
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const Priority = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  ${props => props.priority === 'high' && `
    background: #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
  `}
  ${props => props.priority === 'medium' && `
    background: #f59e0b;
    box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.3);
  `}
  ${props => props.priority === 'low' && `
    background: #10b981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3);
  `}
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const NewsTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 500;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  .button-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }
  
  ${NewsCard}:hover & {
    color: #1d4ed8;
    
    svg {
      transform: translateX(4px);
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1.5rem;
  background: white;
  border-radius: 16px;
  margin: 2rem 0;
`;

const LoadingSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
  
  svg {
    width: 48px;
    height: 48px;
    color: #3b82f6;
  }
`;

const LoadingText = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  
  svg {
    width: 64px;
    height: 64px;
    color: #cbd5e1;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #334155;
    font-size: 1.5rem;
    margin: 0 0 0.5rem;
  }
  
  p {
    color: #64748b;
    margin: 0;
    font-size: 1rem;
  }
`;

const NewsEventsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(
          collection(db, 'atomwalk_articles_metadata'),
          orderBy('publishedAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          publishedAt: doc.data().publishedAt?.toDate()
        }));
        setItems(itemsList);
      } catch (error) {
        console.error('Error fetching news and events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'news':
        return <Newspaper />;
      case 'event':
        return <Users />;
      case 'announcement':
        return <Globe />;
      case 'achievement':
        return <Award />;
      default:
        return <Briefcase />;
    }
  };

  const getFilteredItems = () => {
    if (activeFilter === 'all') return items;
    return items.filter(item => item.category === activeFilter);
  };

  const filteredItems = getFilteredItems();
  const newsCount = items.filter(item => item.category === 'news').length;
  const eventCount = items.filter(item => item.category === 'event').length;

  if (loading) {
    return (
      <Container>
        <LoadingWrapper>
          <LoadingSpinner>
            <Loader2 />
          </LoadingSpinner>
          <LoadingText>Loading company updates...</LoadingText>
        </LoadingWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderSection>
        <HeaderContent>
          <CompanyBadge>
            <Building2 />
            Company Updates
          </CompanyBadge>
          <MainTitle>News & Events</MainTitle>
          <Subtitle>
            Stay informed about our latest announcements, achievements, and upcoming events
          </Subtitle>
          <StatsGrid>
            <StatCard>
              <TrendingUp />
              <div className="stat-number">{items.length}</div>
              <div className="stat-label">Total Updates</div>
            </StatCard>
            <StatCard>
              <Newspaper />
              <div className="stat-number">{newsCount}</div>
              <div className="stat-label">News Articles</div>
            </StatCard>
            <StatCard>
              <Users />
              <div className="stat-number">{eventCount}</div>
              <div className="stat-label">Events</div>
            </StatCard>
            {/* <StatCard>
              <Award />
              <div className="stat-number">12</div>
              <div className="stat-label">Achievements</div>
            </StatCard> */}
          </StatsGrid>
        </HeaderContent>
      </HeaderSection>

      <FilterTabs>
        <FilterTab 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          <Globe />
          All Updates
        </FilterTab>
        <FilterTab 
          active={activeFilter === 'news'} 
          onClick={() => setActiveFilter('news')}
        >
          <Newspaper />
          Company News
        </FilterTab>
        <FilterTab 
          active={activeFilter === 'event'} 
          onClick={() => setActiveFilter('event')}
        >
          <Users />
          Events
        </FilterTab>
        {/* <FilterTab 
          active={activeFilter === 'announcement'} 
          onClick={() => setActiveFilter('announcement')}
        >
          <ExternalLink />
          Announcements
        </FilterTab>
        <FilterTab 
          active={activeFilter === 'achievement'} 
          onClick={() => setActiveFilter('achievement')}
        >
          <Award />
          Achievements
        </FilterTab> */}
      </FilterTabs>

      {filteredItems.length === 0 ? (
        <EmptyState>
          <Briefcase />
          <h3>No updates available</h3>
          <p>Check back soon for the latest company news and events!</p>
        </EmptyState>
      ) : (
        <GridContainer>
          {filteredItems.map((item, index) => (
            <NewsCard
              key={item.id}
              onClick={() => navigate(`/news-events.html/${item.id}`)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ImageContainer>
                <NewsImage 
                  src={item.coverImage || '/api/placeholder/400/200'} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/200';
                  }}
                />
                <CategoryTag category={item.category}>
                  {getCategoryIcon(item.category)}
                  {item.category || 'Update'}
                </CategoryTag>
                <Priority priority="medium" />
              </ImageContainer>
              
              <CardContent>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsDescription>{item.tagline}</NewsDescription>

                <div style={{display: "flex", alignItems: "center", gap: "2rem"}}>
                <CardMeta>
                  <MetaItem>
                    <Calendar />
                    {item.publishedAt?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) || 'Coming Soon'}
                  </MetaItem>
                </CardMeta>

                <CardMeta>
                  <MetaItem>
                    <User />
                    Atomwalk Team
                  </MetaItem>
                </CardMeta>

                </div>
                
                <ReadMoreButton>
                  <div className="button-content">
                    Read Full Story
                    <ChevronRight />
                  </div>
                </ReadMoreButton>
              </CardContent>
            </NewsCard>
          ))}
        </GridContainer>
      )}
    </Container>
  );
};

export default NewsEventsList;