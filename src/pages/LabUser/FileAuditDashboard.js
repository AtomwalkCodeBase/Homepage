import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiUploadCloud, 
  FiFolder, 
  FiFile, 
  FiCheck, 
  FiX, 
  FiClock, 
  FiSearch,
  FiFilter,
  FiDownload,
  FiTrash2,
  FiEye,
  FiPlus
} from 'react-icons/fi';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { theme } from '../../styles/Theme';

// Reusable Components
const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  padding: ${theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

const Header = styled.header`
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.textLight};
  margin: 0;
  font-size: 0.95rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: 0 4px 6px ${theme.colors.shadow};
  transition: transform ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px ${theme.colors.shadow};
  }
`;

const ProjectCard = styled(Card)`
  cursor: pointer;
  border: 2px solid ${props => props.active ? theme.colors.primary : 'transparent'};
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const ProjectIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.bg || theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || theme.colors.primary};
  font-size: 1.5rem;
`;

const ProjectName = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 ${theme.spacing.xs} 0;
  color: ${theme.colors.text};
`;

const ProjectStats = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  font-size: 0.85rem;
  color: ${theme.colors.textLight};
`;

const UploadZone = styled.div`
  border: 2px dashed ${props => props.isDragging ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing["2xl"]};
  text-align: center;
  background: ${props => props.isDragging ? theme.colors.primaryLight : theme.colors.card};
  transition: all ${theme.transitions.normal};
  cursor: pointer;
  margin-bottom: ${theme.spacing.xl};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }

  @media (max-width: 576px) {
    padding: ${theme.spacing.xl};
  }
`;

const UploadIcon = styled(FiUploadCloud)`
  font-size: 3rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const UploadText = styled.p`
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.xs} 0;
  font-weight: 500;
`;

const UploadSubtext = styled.p`
  color: ${theme.colors.textLight};
  margin: 0;
  font-size: 0.85rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing["2xl"]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fonts.body};
  font-size: 0.95rem;
  transition: border-color ${theme.transitions.fast};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textLight};
`;

const Table = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 4px 6px ${theme.colors.shadow};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.backgroundAlt};
  font-weight: 600;
  color: ${theme.colors.text};
  font-size: 0.85rem;

  @media (max-width: 992px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  align-items: center;
  transition: background ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.backgroundAlt};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.md};
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const FileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-size: 1.2rem;
`;

const FileName = styled.div`
  font-weight: 500;
  color: ${theme.colors.text};
  
  @media (max-width: 992px) {
    font-size: 0.95rem;
  }
`;

const FileSize = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.textLight};
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  @media (max-width: 992px) {
    margin-top: ${theme.spacing.sm};
  }
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.backgroundAlt};
  color: ${theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${props => props.danger ? theme.colors.error : theme.colors.primary};
    color: #fff;
  }
`;

const MobileLabel = styled.span`
  display: none;
  
  @media (max-width: 992px) {
    display: inline;
    font-weight: 600;
    color: ${theme.colors.textLight};
    font-size: 0.85rem;
  }
`;
const ClaimsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
`;
const Tagline = styled.p`
 color: ${({ theme }) => theme.colors.textLight};
`
const TableContainer = styled.div`
  overflow-x: auto;
`

function FileAuditDashboard() {
  const [selectedProject, setSelectedProject] = useState('project-1');
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    { 
      id: 'project-1', 
      name: 'Marketing Campaign', 
      files: 24, 
      pending: 5,
      color: theme.colors.primary,
      bgColor: theme.colors.primaryLight
    },
    { 
      id: 'project-2', 
      name: 'Product Launch', 
      files: 18, 
      pending: 2,
      color: theme.colors.secondary,
      bgColor: theme.colors.secondaryLight
    },
    { 
      id: 'project-3', 
      name: 'Q1 Reports', 
      files: 42, 
      pending: 0,
      color: theme.colors.accent,
      bgColor: theme.colors.accentLight
    },
  ];

  const files = [
    { 
      id: 1, 
      name: 'project_version_1.pdf', 
      size: '2.4 MB', 
      uploadDate: '2024-01-15',
      status: 'approved',
      project: 'project-1',
      activity_name: 'activity-1'
    },
    { 
      id: 2, 
      name: 'project_version_2.pdf', 
      size: '15.7 MB', 
      uploadDate: '2024-01-14',
      status: 'pending',
      project: 'project-1',
      activity_name: 'activity-3'
    },
    { 
      id: 3, 
      name: 'project_version_3.pdf', 
      size: '850 KB', 
      uploadDate: '2024-01-13',
      status: 'approved',
      project: 'project-1',
      activity_name: 'activity-2'
    },
    { 
      id: 4, 
      name: 'project_version_4.pdf', 
      size: '124 KB', 
      uploadDate: '2024-01-12',
      status: 'rejected',
      project: 'project-1',
      activity_name: 'activity-3'
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      approved: { variant: "success", icon: FiCheck },
      pending: { variant: "warning", icon: FiClock },
      rejected: { variant: "error", icon: FiX },
    };
    return configs[status];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
  };

  const filteredFiles = files.filter(file => 
    file.project === selectedProject &&
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout title="File Upload & Audit Dashboard">
            <ClaimsHeader>
              <Tagline>Track and manage your assigned audit tasks</Tagline>
            </ClaimsHeader>

      {/* <Grid>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            active={selectedProject === project.id}
            onClick={() => setSelectedProject(project.id)}
          >
            <ProjectHeader>
              <ProjectIcon bg={project.bgColor} color={project.color}>
                <FiFolder />
              </ProjectIcon>
              {project.pending > 0 && (
                <Badge bg={theme.colors.secondaryLight} color={theme.colors.warning}>
                  {project.pending} Pending
                </Badge>
              )}
            </ProjectHeader>
            <ProjectName>{project.name}</ProjectName>
            <ProjectStats>
              <span>{project.files} files</span>
            </ProjectStats>
          </ProjectCard>
        ))}
      </Grid> */}

      <UploadZone
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input 
          type="file" 
          id="fileInput" 
          style={{ display: 'none' }} 
          multiple
        />
        <UploadIcon />
        <UploadText>Drag & drop files here or click to browse</UploadText>
        <UploadSubtext>Supports PDF, DOC, XLS, ZIP, and image files (Max 50MB)</UploadSubtext>
      </UploadZone>

      <SearchBar>
        <InputWrapper>
          <SearchIcon />
          <Input 
            type="text" 
            placeholder="Search files..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputWrapper>
        <Button>
          <FiFilter /> Filter
        </Button>
        {/* <Button variant="primary">
          <FiPlus /> New Project
        </Button> */}
      </SearchBar>

              <TableContainer>
                <table>
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Activity Name</th>
                      <th>Size</th>
                      <th>Upload Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.length > 0 ? (
                      filteredFiles.map((file) => {
                        const statusConfig = getStatusConfig(file.status);
                        const StatusIcon = statusConfig.icon;
                        return (
                          <tr key={file.id}>
                            <td>{file.name}</td>
                            <td>{file.activity_name}</td>
                            <td>
                              {/* <div style={{ display: "flex", alignItems: "center" }}> */}
                              {/* <span style={{ marginRight: "0.5rem" }}>{getRequestIcon(request.request_sub_type)}</span> */}
                              {file.size}
                              {/* </div> */}
                            </td>
                            <td>{file.uploadDate}</td>
                            <td>
                               <Badge variant={statusConfig.variant}>
                                <StatusIcon style={{ display: 'inline', marginRight: '4px' }} />
                                {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                                </Badge>
                            </td>
                            <td>
                           <Actions>
                            <Button variant='primary' title="View">
                            <FiEye />
                            </Button>
                            <Button variant='ghost' title="Download">
                            <FiDownload />
                            </Button>
                            <Button variant='ghost' title="Download">
                            <HiOutlinePencilSquare />
                            </Button>
                            <Button variant='outlines' title="Delete">
                            <FiTrash2 />
                            </Button>
                        </Actions>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                          No file found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </TableContainer>

      {/* <Table>
        <TableHeader>
          <div>File Name</div>
          <div>Size</div>
          <div>Upload Date</div>
          <div>Status</div>
          <div>Actions</div>
        </TableHeader>
        {filteredFiles.map(file => {
          const statusConfig = getStatusConfig(file.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <TableRow key={file.id}>
              <FileInfo>
                <FileIcon>
                  <FiFile />
                </FileIcon>
                <div>
                  <FileName>{file.name}</FileName>
                  <FileSize className="mobile-only">
                    <MobileLabel>Size: </MobileLabel>{file.size}
                  </FileSize>
                </div>
              </FileInfo>
              <div>
                <MobileLabel>Size: </MobileLabel>
                <span className="desktop-only">{file.size}</span>
              </div>
              <div>
                <MobileLabel>Uploaded: </MobileLabel>
                {file.uploadDate}
              </div>
              <div>
                <Badge variant={statusConfig.variant}>
                  <StatusIcon style={{ display: 'inline', marginRight: '4px' }} />
                  {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                </Badge>
              </div>
              <Actions>
                <Button variant='primary' title="View">
                  <FiEye />
                </Button>
                <Button variant='ghost' title="Download">
                  <FiDownload />
                </Button>
                <Button variant='outlines' title="Delete">
                  <FiTrash2 />
                </Button>
              </Actions>
            </TableRow>
          );
        })}
      </Table> */}
    </Layout>
  );
}

export default FileAuditDashboard;