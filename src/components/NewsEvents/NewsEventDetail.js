import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { ArrowLeft, Calendar, Share2, Tag,User,Loader2,AlertCircle} from 'lucide-react';
import { db } from '../Blogs/firebase';

// Clean, minimal color system
const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#0ea5e9',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#64748b'
    },
    bg: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      muted: '#f1f5f9'
    },
    border: '#e2e8f0',
    success: '#059669',
    error: '#dc2626'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  }
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.bg.secondary};
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.border};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.colors.bg.primary};
  color: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.bg.muted};
    border-color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.bg.primary};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  color: ${theme.colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ArticleHeader = styled.div`
margin-top:6rem;

  margin-bottom: 2rem;
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background-color: ${theme.colors.bg.primary};
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: ${theme.colors.text.primary};
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid ${theme.colors.border};
  border-bottom: 1px solid ${theme.colors.border};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.text.muted};
  font-size: 0.875rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const FeaturedImage = styled.div`
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};

  img {
    width: 100%;
    object-fit: cover;
    display: block;

    @media (max-width: 768px) {
      height: 250px;
    }
  }
`;

const ContentWrapper = styled.div`
  background: ${theme.colors.bg.primary};
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: ${theme.shadows.md};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Content = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${theme.colors.text.primary};

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.text.primary};
    font-weight: 700;
    margin: 2rem 0 1rem 0;
    line-height: 1.3;

    &:first-child {
      margin-top: 0;
    }
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }

  @media (max-width: 768px) {
    h1 { font-size: 1.75rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    h4 { font-size: 1.125rem; }
  }

  p {
    margin: 1.5rem 0;
  }

  ul, ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 2px;
    
    &:hover {
      text-decoration: none;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
    box-shadow: ${theme.shadows.md};
  }

  blockquote {
    background: ${theme.colors.bg.muted};
    border-left: 4px solid ${theme.colors.primary};
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: ${theme.colors.text.secondary};
  }

  code {
    background: ${theme.colors.bg.muted};
    color: ${theme.colors.primary};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }

  pre {
    background: ${theme.colors.bg.muted};
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2rem 0;

    code {
      background: none;
      padding: 0;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  animation: spin 1s linear infinite;
  color: ${theme.colors.primary};

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const NewsEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const [metadataDoc, contentDoc] = await Promise.all([
          getDoc(doc(db, 'atomwalk_articles_metadata', id)),
          getDoc(doc(db, 'atomwalk_articles_content', id))
        ]);

        if (metadataDoc.exists() && contentDoc.exists()) {
          const content = contentDoc.data();
          const fullContent = content.chunks ? content.chunks.join('') : content.content;
          const sanitizedContent = sanitizeHtml(fullContent, {
            allowedTags: ['p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'img', 'br', 'blockquote', 'code', 'pre'],
            allowedAttributes: {
              a: ['href', 'target'],
              img: ['src', 'alt', 'width', 'height']
            }
          });
          
          setItem({
            id,
            ...metadataDoc.data(),
            content: sanitizedContent,
            publishedAt: metadataDoc.data().publishedAt?.toDate()
          });
        } else {
          navigate('/news-events.html');
        }
      } catch (error) {
        console.error('Error fetching news/event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: item.tagline,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <BackButton onClick={() => navigate('/news-events.html')}>
              <ArrowLeft size={16} />
              Back
            </BackButton>
          </HeaderContent>
        </Header>
        <Main>
          <LoadingContainer>
            <LoadingSpinner>
              <Loader2 size={32} />
            </LoadingSpinner>
            <p>Loading article...</p>
          </LoadingContainer>
        </Main>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <BackButton onClick={() => navigate('/news-events.html')}>
              <ArrowLeft size={16} />
              Back
            </BackButton>
          </HeaderContent>
        </Header>
        <Main>
          <ErrorContainer>
            <AlertCircle size={48} color={theme.colors.error} />
            <ErrorTitle>Article Not Found</ErrorTitle>
            <ErrorText>The requested article could not be found or has been removed.</ErrorText>
          </ErrorContainer>
        </Main>
      </Container>
    );
  }

  return (
    <Container>
      {/* <Header>
        <HeaderContent>
          <BackButton onClick={() => navigate('/news-events.html')}>
            <ArrowLeft size={16} />
            Back to Articles
          </BackButton>
          <ActionButtons>
            <ActionButton onClick={toggleBookmark} title="Bookmark">
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </ActionButton>
            <ActionButton onClick={handleShare} title="Share">
              <Share2 size={16} />
            </ActionButton>
          </ActionButtons>
        </HeaderContent>
      </Header> */}

      <Main>
        <ArticleHeader>
          <CategoryBadge>
            <Tag size={12} />
            {item.category === 'news' ? 'News' : 'Event'}
          </CategoryBadge>
          <Title>{item.title}</Title>
          {item.tagline && <Subtitle>{item.tagline}</Subtitle>}
          
          <MetaInfo>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem"}}>
            <MetaItem>
              <Calendar size={16} />
              {item.publishedAt?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </MetaItem>
            <MetaItem>
              <User size={16} />
              Atomwalk Team
            </MetaItem>
            </div>
             <ActionButton onClick={handleShare} title="Share">
              <Share2 size={16} />
            </ActionButton>
          </MetaInfo>
        </ArticleHeader>

        {item.coverImage && (
          <FeaturedImage>
            <img src={item.coverImage} alt={item.title} />
          </FeaturedImage>
        )}

        <ContentWrapper>
          <Content dangerouslySetInnerHTML={{ __html: item.content }} />
        </ContentWrapper>
      </Main>
    </Container>
  );
};

export default NewsEventDetail;