import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp, getDoc, collection } from 'firebase/firestore';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  Tag, 
  Type,
  Upload,
  Eye,
  Loader2
} from 'lucide-react';
import { db } from '../Blogs/firebase';

const MAX_CHUNK_SIZE = 900000;

// Styled Components
const Container = styled.div`
margin-top:6rem;
  min-height: 100vh;
  / *background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const FormWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const FormContent = styled.div`
  padding: 2.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EditorWrapper = styled.div`
  margin-bottom: 2rem;
`;

const EditorContainer = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s ease;
  
  &:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .ql-toolbar {
    background: #f8fafc;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
  }
  
  .ql-container {
    border: none;
    font-size: 1rem;
    height: 400px;
    
    @media (max-width: 768px) {
      height: 300px;
    }
  }
  
  .ql-editor {
    padding: 1.5rem;
    line-height: 1.7;
    color: #374151;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    
    ul, ol {
      padding-left: 1.5rem;
      margin: 0.75rem 0;
    }
    
    li {
      margin: 0.25rem 0;
      line-height: 1.6;
    }
    
    h1, h2, h3 {
      color: #1f2937;
      font-weight: 600;
      margin: 1rem 0 0.5rem;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: 0.5rem 0;
    }
  }
`;

const HelpBox = styled.div`
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  
  h4 {
    margin: 0 0 0.5rem;
    color: #1e40af;
    font-size: 0.875rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  ol {
    margin: 0;
    padding-left: 1.2rem;
    color: #1e40af;
    font-size: 0.8rem;
    line-height: 1.5;
  }
  
  li {
    margin: 0.25rem 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-width: auto;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  
  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: ${props => props.category === 'news' ? '#dbeafe' : '#f3e8ff'};
  color: ${props => props.category === 'news' ? '#1e40af' : '#7c3aed'};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const NewsEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    coverImagePath: '',
    category: 'news',
    content: ''
  });

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: function() {
          const imagePath = prompt('Enter image path (e.g., folder/image.jpg):');
          if (imagePath) {
            const fullImageUrl = `https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/${imagePath}`;
            const range = this.quill.getSelection();
            this.quill.insertEmbed(range.index, 'image', fullImageUrl);
          }
        }
      }
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list',
    'link',
    'image'
  ];

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const [metadataDoc, contentDoc] = await Promise.all([
            getDoc(doc(db, 'atomwalk_articles_metadata', id)),
            getDoc(doc(db, 'atomwalk_articles_content', id))
          ]);

          if (metadataDoc.exists() && contentDoc.exists()) {
            const metadata = metadataDoc.data();
            const content = contentDoc.data();
            setFormData({
              title: metadata.title,
              tagline: metadata.tagline,
              coverImagePath: metadata.coverImage.replace('https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/', ''),
              category: metadata.category,
              content: content.chunks ? content.chunks.join('') : content.content
            });
          }
        } catch (error) {
          console.error('Error fetching news/event:', error);
          alert('Error loading item. Please try again.');
        }
      };

      fetchItem();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const fixListStructure = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const listItems = doc.querySelectorAll('li[data-list]');
    
    let currentList = null;
    let currentListType = null;
    const fragment = document.createDocumentFragment();

    listItems.forEach((li, index) => {
      const listType = li.getAttribute('data-list');
      
      if (listType !== currentListType) {
        if (currentList) {
          fragment.appendChild(currentList);
        }
        currentList = document.createElement(listType === 'bullet' ? 'ul' : 'ol');
        currentListType = listType;
      }

      li.removeAttribute('data-list');
      li.querySelectorAll('.ql-ui').forEach(span => span.remove());
      if (li.innerHTML.trim() === '<br>' || !li.innerHTML.trim()) {
        return;
      }

      currentList.appendChild(li);
    });

    if (currentList) {
      fragment.appendChild(currentList);
    }

    const originalList = doc.querySelector('ol, ul');
    if (originalList) {
      originalList.replaceWith(fragment);
    }

    const sanitizedContent = sanitizeHtml(doc.body.innerHTML, {
      allowedTags: ['p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'strong', 'em', 'a', 'img', 'br'],
      allowedAttributes: {
        a: ['href'],
        img: ['src', 'alt']
      }
    });

    return sanitizedContent;
  };

  const splitContentIntoChunks = (content) => {
    const chunks = [];
    let currentChunk = '';
    const paragraphs = content.split('</p>');
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i] + (paragraphs[i] ? '</p>' : '');
      if ((currentChunk + paragraph).length > MAX_CHUNK_SIZE) {
        if (currentChunk) {
          chunks.push(currentChunk);
        }
        currentChunk = paragraph;
      } else {
        currentChunk += paragraph;
      }
    }
    
    if (currentChunk) {
      chunks.push(currentChunk);
    }
    
    return chunks;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const articleId = id || doc(collection(db, 'atomwalk_articles_metadata')).id;
      const coverImageUrl = `https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/${formData.coverImagePath}`;

      const fixedContent = fixListStructure(formData.content);

      await setDoc(doc(db, 'atomwalk_articles_metadata', articleId), {
        title: formData.title,
        tagline: formData.tagline,
        coverImage: coverImageUrl,
        category: formData.category,
        publishedAt: serverTimestamp()
      });

      const contentChunks = splitContentIntoChunks(fixedContent);

      await setDoc(doc(db, 'atomwalk_articles_content', articleId), {
        articleId,
        type: 'richText',
        updatedAt: serverTimestamp(),
        totalChunks: contentChunks.length,
        chunks: contentChunks
      });

      navigate(`/news-events.html/${articleId}`);
    } catch (error) {
      console.error('Error saving news/event:', error);
      alert('Error saving item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Header>
          <HeaderContent>
            <Title>
              {formData.category === 'news' ? <FileText size={24} /> : <Calendar size={24} />}
              {id ? 'Edit' : 'Create'} {formData.category === 'news' ? 'News Article' : 'Event'}
            </Title>
            <BackButton onClick={() => navigate('/news-events.html')}>
              <ArrowLeft size={16} />
              Back to List
            </BackButton>
          </HeaderContent>
          {formData.category && (
            <CategoryBadge category={formData.category} style={{ marginTop: '1rem' }}>
              {formData.category === 'news' ? <FileText size={12} /> : <Calendar size={12} />}
              {formData.category}
            </CategoryBadge>
          )}
        </Header>

        <FormContent>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <Label>
                  <Tag size={16} />
                  Category
                </Label>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={!!id}
                >
                  <option value="news">📰 News Article</option>
                  <option value="event">📅 Company Event</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>
                  <Upload size={16} />
                  Cover Image
                </Label>
                <Input
                  type="text"
                  name="coverImagePath"
                  value={formData.coverImagePath}
                  onChange={handleChange}
                  placeholder="e.g., images/news-cover.jpg"
                  required
                />
              </FormGroup>

              <FormGroup className="full-width">
                <Label>
                  <Type size={16} />
                  Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a compelling title..."
                  required
                />
              </FormGroup>

              <FormGroup className="full-width">
                <Label>
                  <FileText size={16} />
                  Tagline
                </Label>
                <Input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="A brief description or subtitle..."
                  required
                />
              </FormGroup>
            </FormGrid>

            <EditorWrapper>
              <FormGroup className="full-width">
                <Label>
                  <Eye size={16} />
                  Content
                </Label>
                <EditorContainer>
                  <ReactQuill
                    value={formData.content}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Start writing your content here..."
                  />
                </EditorContainer>
                <HelpBox>
                  <h4>
                    <ImageIcon size={16} />
                    Adding Images
                  </h4>
                  <ol>
                    <li>Click the image icon in the editor toolbar</li>
                    <li>Enter the relative path (e.g., "images/photo.jpg")</li>
                    <li>Images will be loaded from your CDN automatically</li>
                  </ol>
                </HelpBox>
              </FormGroup>
            </EditorWrapper>

            <ActionButtons>
              <SecondaryButton type="button" onClick={() => navigate('/news-events.html')}>
                <X size={16} />
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {id ? 'Update' : 'Publish'}
                  </>
                )}
              </PrimaryButton>
            </ActionButtons>
          </form>
        </FormContent>
      </FormWrapper>
    </Container>
  );
};

export default NewsEventForm;