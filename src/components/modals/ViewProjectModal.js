"use client"

import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import {
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaProjectDiagram,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaBuilding,
} from "react-icons/fa"
import { useTheme } from "../../context/ThemeContext"
import Button from "../Button"
import Badge from "../Badge"
import { toast } from "react-toastify"
import { getemployeeList } from "../../services/productServices"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.4s ease-out;
  
  @keyframes fadeIn {
    from {
      transform: translateY(-30px) scale(0.97);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  background: ${({ theme }) => theme.colors.primaryLight || "#f1f7ff"};
  border-radius: 16px 16px 0 0;
`

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary || "#3a86ff"};
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary || "#3a86ff"};
    border-radius: 4px;
    margin-right: 12px;
  }
`

const CloseButton = styled.button`
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight || "#8e98a4"};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: ${({ theme }) => theme.colors.error || "#ff5252"};
    transform: rotate(90deg);
  }
`

const ModalBody = styled.div`
  padding: 2rem;
  max-height: 70vh;
  overflow-y: auto;
`

const ProjectSection = styled.div`
  background: ${({ theme }) => theme.colors.background || "#f8f9fa"};
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const ProjectName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ProjectCode = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
  }
`

const DetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`

const DetailValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`

const SectionTitle = styled.h4`
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`

const TeamMemberCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const MemberAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const MemberInfo = styled.div`
  flex: 1;
`

const MemberName = styled.h5`
  margin: 0 0 0.25rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
`

const MemberRole = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.85rem;
`

const MemberDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const MemberDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 14px;
  }
`

const NoTeamMembers = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0.5rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`

const ViewProjectModal = ({ isOpen, onClose, project }) => {
  const { theme } = useTheme()
  const [employees, setEmployees] = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && project) {
      fetchEmployeesAndFilterTeam()
    }
  }, [isOpen, project])

  const fetchEmployeesAndFilterTeam = async () => {
    try {
      setLoading(true)
      const response = await getemployeeList()
      const allEmployees = response.data || []
      setEmployees(allEmployees)

      // Filter team members based on project's additional_fld_list
      if (project.additional_fld_list) {
        const assignedEmployeeIds = project.additional_fld_list.split("|").filter((id) => id.trim())
        const projectTeamMembers = allEmployees.filter((emp) => assignedEmployeeIds.includes(emp.emp_id))
        setTeamMembers(projectTeamMembers)
      } else {
        setTeamMembers([])
      }
    } catch (error) {
      toast.error("Failed to fetch team member details")
      console.error("Error fetching employees:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (statusCode) => {
    switch (statusCode) {
      case "02":
        return { variant: "success", label: "Active" }
      case "03":
        return { variant: "primary", label: "Completed" }
      case "04":
        return { variant: "warning", label: "On Hold" }
      default:
        return { variant: "secondary", label: "Unknown" }
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (!isOpen || !project) return null

  const statusInfo = getStatusInfo(project.project_status)

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Project Details</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <ProjectSection>
            <ProjectHeader>
              <ProjectName>
                <FaProjectDiagram />
                {project.title}
              </ProjectName>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <ProjectCode>{project.project_code}</ProjectCode>
                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
              </div>
            </ProjectHeader>

            <ProjectDetails>
              <DetailItem>
                <FaCalendarAlt />
                <DetailLabel>Start Date:</DetailLabel>
                <DetailValue>{project.start_date}</DetailValue>
              </DetailItem>
              <DetailItem>
                <FaCalendarAlt />
                <DetailLabel>End Date:</DetailLabel>
                <DetailValue>{project.end_date || "Not specified"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <FaUser />
                <DetailLabel>Project Manager:</DetailLabel>
                <DetailValue>{project.project_manager}</DetailValue>
              </DetailItem>
              <DetailItem>
                <FaUsers />
                <DetailLabel>Team Size:</DetailLabel>
                <DetailValue>
                  {project.additional_fld_list ? project.additional_fld_list.split("|").length : 0} members
                </DetailValue>
              </DetailItem>
            </ProjectDetails>
          </ProjectSection>

          <div>
            <SectionTitle>
              <FaUsers />
              Team Members ({teamMembers.length})
            </SectionTitle>

            {loading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <p>Loading team member details...</p>
              </LoadingContainer>
            ) : teamMembers.length > 0 ? (
              <TeamGrid>
                {teamMembers.map((member) => (
                  <TeamMemberCard key={member.emp_id}>
                    <MemberHeader>
                      <MemberAvatar>{getInitials(member.name)}</MemberAvatar>
                      <MemberInfo>
                        <MemberName>{member.name}</MemberName>
                        <MemberRole>{member.designation || "Team Member"}</MemberRole>
                      </MemberInfo>
                    </MemberHeader>
                    <MemberDetails>
                      <MemberDetail>
                        <FaUser />
                        <span>ID: {member.emp_id}</span>
                      </MemberDetail>
                      {member.email && (
                        <MemberDetail>
                          <FaEnvelope />
                          <span>{member.email}</span>
                        </MemberDetail>
                      )}
                      {member.phone && (
                        <MemberDetail>
                          <FaPhone />
                          <span>{member.phone}</span>
                        </MemberDetail>
                      )}
                      {member.department && (
                        <MemberDetail>
                          <FaBuilding />
                          <span>{member.department}</span>
                        </MemberDetail>
                      )}
                    </MemberDetails>
                  </TeamMemberCard>
                ))}
              </TeamGrid>
            ) : (
              <NoTeamMembers>
                <FaUsers />
                <h4>No Team Members Assigned</h4>
                <p>This project doesn't have any team members assigned yet.</p>
              </NoTeamMembers>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default ViewProjectModal
