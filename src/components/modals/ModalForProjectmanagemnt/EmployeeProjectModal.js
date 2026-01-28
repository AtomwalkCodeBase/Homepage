import styled from "styled-components";
import Modal from "../Modal";
import { FaChevronDown, FaChevronUp, FaIdCard, FaProjectDiagram, FaTasks, FaUser } from "react-icons/fa";
import { useMemo, useState } from "react";
import Badge from "../../Badge";
import { getStatusVariant } from "../../../pages/ProjectManagement/utils/utils";

  const mapEmployeeProjectData = (rawEmployeeData) => {
  if (!rawEmployeeData) return null;

  return {
    emp_id: rawEmployeeData.emp_id,
    employee_name: rawEmployeeData.employee_name,
    color: rawEmployeeData.color,

    projects: (rawEmployeeData.projects || []).map(project => {
      const dayLogsArray = project.day_logs
        ? Object.values(project.day_logs).map(log => ({
            date: log.date,
            check_in: log.check_in || {},
            check_out:
              typeof log.check_out === "string"
                ? {}
                : log.check_out || {},
            remarks: log.remarks || "",
            effort: log.effort ?? 0,
            no_of_items: log.no_of_items ?? 0
          }))
        : [];

      return {
        ...project,
        day_logs: dayLogsArray
      };
    })
  };
};

const EmployeeProjectModal = ({ EmployeeData, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  
  const employeeData = useMemo(
    () => mapEmployeeProjectData(EmployeeData),
    [EmployeeData]
  );
  console.log(JSON.stringify(employeeData))

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const renderInfoRow = (icon, label, value) => (
    <InfoRow>
      <InfoIcon>{icon}</InfoIcon>
      <InfoLabel>{label}:</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </InfoRow>
  );

  const renderProjectDetail = (label, value) => (
    <DetailItem>
      <DetailLabel>{label}</DetailLabel>
      <DetailValue>{value || 'N/A'}</DetailValue>
    </DetailItem>
  );

  return (
    <Modal onClose={onClose} position="top">
      <ModalTitle>Employee Project Details</ModalTitle>
      
      <InfoSection>
        {renderInfoRow(<FaUser />, "Employee Name", employeeData.employee_name)}
        {renderInfoRow(<FaIdCard />, "Employee ID", employeeData.emp_id)}
        {/* {renderInfoRow(<FaCalendarAlt />, "Start Date", employeeData.startDate)} */}
        {/* {renderInfoRow(<FaCalendarAlt />, "End Date", employeeData.endDate)} */}
      </InfoSection>

      {employeeData.projects.map((project, index) => {
        const isOpen = openAccordion === index;
        
        return (
          <ProjectCard key={index}>
            <AccordionHeader 
              isOpen={isOpen}
              onClick={() => toggleAccordion(index)}
            >
              <AccordionHeaderLeft>
                <ProjectName>
                  <FaProjectDiagram />
                  {project.customer_name}
                </ProjectName>
                <ProjectMetaInfo>
                  <MetaItem>
                    <strong>Order Item Key:</strong> {project.order_item_key}
                  </MetaItem>
                </ProjectMetaInfo>
              </AccordionHeaderLeft>
              
              <AccordionHeaderRight>
                <Badge variant={getStatusVariant(project.project_period_status)}>{project.project_period_status}</Badge>
                <AccordionIcon>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </AccordionIcon>
              </AccordionHeaderRight>
            </AccordionHeader>

            <AccordionContent isOpen={isOpen}>
              <ProjectDetails>
                {renderProjectDetail("Planned Start Date", project.planned_start_date)}
                {renderProjectDetail("Planned End Date", project.planned_end_date)}
                {renderProjectDetail("Actual Start Date", project.actual_start_date)}
                {renderProjectDetail("Actual End Date", project.actual_end_date)}
                {renderProjectDetail("Audit Type", project.audit_type)}
              </ProjectDetails>

              {project.day_logs && project.day_logs.length > 0 && (
                <DayLogsSection>
                  <DayLogsTitle>
                    <FaTasks />
                    Day Logs
                  </DayLogsTitle>
                  <DayLogsTable>
                    <TableHeader>
                      <div>Date</div>
                      <div>Check-in Time</div>
                      <div>Check-out Time</div>
                      {/* <div>Remark</div> */}
                      <div>Items Audited</div>
                    </TableHeader>
                    {project.day_logs.map((log, logIndex) => (
                      <>
                      <TableRow key={logIndex}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>
                          <CheckInTime>{log.check_in.time}</CheckInTime>
                        </TableCell>
                        <TableCell>
                          <CheckOutTime>{log.check_out.time}</CheckOutTime>
                        </TableCell>
                        {/* <TableCell>{log.remarks || '-'}</TableCell> */}
                        <TableCell>{log.no_of_items}</TableCell>
                      </TableRow>
                      <div style={{padding: "0.75rem"}}>
                        Remark: {log.remarks || 'No remark found'}
                      </div>
                      </>
                    ))}
                  </DayLogsTable>
                </DayLogsSection>
              )}
            </AccordionContent>
          </ProjectCard>
        );
      })}
    </Modal>
  );
};

export default EmployeeProjectModal;

const ModalTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
`;

const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
`;

const InfoIcon = styled.span`
  color: #3498db;
  font-size: 1.1rem;
  min-width: 20px;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #34495e;
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: #7f8c8d;
`;

const ProjectCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #dee2e6;
  overflow: hidden;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  background: ${({ isOpen }) => isOpen ? '#e9ecef' : '#f8f9fa'};
  transition: background 0.2s;
  
  &:hover {
    background: #e9ecef;
  }
`;

const AccordionHeaderLeft = styled.div`
  flex: 1;
`;

const AccordionHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProjectName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectMetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #6c757d;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const AccordionIcon = styled.span`
  color: #3498db;
  font-size: 1.2rem;
  transition: transform 0.2s;
`;

const AccordionContent = styled.div`
  padding: ${({ isOpen }) => isOpen ? '1rem' : '0 1rem'};
  max-height: ${({ isOpen }) => isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background: white;
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
`;

const DetailValue = styled.span`
  color: #34495e;
`;

const DayLogsSection = styled.div`
  margin-top: 1rem;
`;

const DayLogsTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DayLogsTable = styled.div`
  background: white;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #dee2e6;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  background: #495057;
  color: white;
  padding: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid #dee2e6;
  font-size: 0.85rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f8f9fa;
  }
`;

const TableCell = styled.div`
  color: #495057;
  word-break: break-word;
`;

const CheckInTime = styled.span`
  color: #27ae60;
  font-weight: 600;
`;

const CheckOutTime = styled.span`
  color: #e74c3c;
  font-weight: 600;
`;