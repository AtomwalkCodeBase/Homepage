import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { manualStepsData } from "../data/manulaStepsData"

import {
  FaCheckCircle,  
  FaArrowLeft,
  FaCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

// Styled components with improved visual hierarchy
const PageContainer = styled.div`
  min-height: 100vh;
  background: whitesmoke;
  background-size: 400% 400%;
  animation: gradientFlow 15s ease infinite;
  padding: 1rem;
  display: flex;
  justify-content: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const StepsContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 8rem 0 1rem; /* Increased top margin for mobile */

  @media (min-width: 640px) {
    max-width: 900px;
    margin: 5rem 0 3rem; /* Even larger top margin for desktop */
  }
`;

const HeaderGradient = styled.div`
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  padding: 1.5rem 1rem;
  color: white;
  position: relative;

  @media (min-width: 640px) {
    padding: 2rem 2rem;
  }
`;

const StepsHeader = styled.header`
  position: relative;
  z-index: 1;
`;

const StepsTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  svg {
    width: 24px;
    height: 24px;

    @media (min-width: 640px) {
      width: 28px;
      height: 28px;
    }
  }

  @media (min-width: 640px) {
    font-size: 2rem;
    gap: 1rem;
  }
`;

const StepsSubtitle = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 0;

  @media (min-width: 640px) {
    font-size: 1.05rem;
  }
`;

const StepsContent = styled.div`
  padding: 1.25rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const StepItem = styled.div`
  margin-bottom: 1.75rem;
  position: relative;
  padding-left: 3rem;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 1.45rem;
    top: 2.5rem;
    bottom: -1.75rem;
    width: 2px;
    background: #e2e8f0;
  }

  @media (min-width: 640px) {
    padding-left: 3.5rem;

    &:not(:last-child)::after {
      left: 1.7rem;
    }
  }
`;

const StepNumberContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const StepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);

  @media (min-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.1rem;
  }
`;

const StepMainContent = styled.div``;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;

  @media (min-width: 640px) {
    font-size: 1.2rem;
  }
`;

const StepDescription = styled.p`
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const StepSection = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.75rem 0;
  border-left: 3px solid #e2e8f0;
`;

const SectionTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const StepList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
`;

const StepListItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
  position: relative;
  padding-left: 1.75rem;
  list-style-type: none;

  &::before {
    content: none;
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    background: #2563eb;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  strong {
    font-weight: 600;
    color: #1e293b;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
    padding-left: 2rem;

    &::before {
      top: 0.55rem;
      width: 9px;
      height: 9px;
    }
  }
`;

const ListItemIcon = styled(FaCircle)`
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 8px;
  height: 8px;
  color: #2563eb;
  transform: translateY(-50%);

  @media (min-width: 640px) {
    width: 9px;
    height: 9px;
  }
`;

const BackButtonIcon = styled(FaArrowLeft)`
  width: 18px;
  height: 18px;
`;

const ImportantNote = styled.div`
  background: #fff7ed;
  border-radius: 6px;
  padding: 0.75rem;
  margin: 1rem 0;
  border-left: 3px solid #f97316;
  display: flex;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
    color: #f97316;
    margin-top: 0.2rem;
  }
`;

const NoteText = styled.p`
  font-size: 0.9rem;
  color: #713f12;
  margin: 0;
  line-height: 1.5;
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  color: #2563eb;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ProgressIndicator = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-weight: 600;
    color: #1e293b;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 1rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background: #f1f5f9;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9rem;
  color: #475569;
  vertical-align: top;

  strong {
    color: #1e293b;
  }

  ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }
`;

const DynamicTable = ({ columns = [], rows = [] }) => (
  <TableContainer>
    <Table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <TableHeader key={index}>{col}</TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>
                {Array.isArray(cell) ? (
                  <ul>
                    {cell.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  cell
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
);


const ManualSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [steps, setSteps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const topicParam = queryParams.get("topic");
  setTopic(topicParam || "");

  const manualSteps = manualStepsData(); 

  if (topicParam) {
    if (manualSteps[topicParam]) {
      const filteredSteps = manualSteps[topicParam].filter(
        (step) => !step.accesspath
      );
      setSteps(filteredSteps);
      return;
    }

    for (const [key, value] of Object.entries(manualSteps)) {
      if (value[0]?.accesspath === topicParam) {
        const filteredSteps = value.filter((step) => !step.accesspath);
        setTopic(key);
        setSteps(filteredSteps);
        return;
      }
    }
  }

  navigate("/manual.html");
  setSteps([]);
}, [location.search, navigate]);


  const handleBackClick = () => {
    window.history.back();
  };

  const highlight = (text) => {
    if (!searchTerm || typeof text !== "string") return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const highlightHTML = (text) => {
    if (!searchTerm || typeof text !== "string") return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const highlighted = text.replace(
      regex,
      (match) => `<span style="background-color: yellow">${match}</span>`
    );
    return highlighted;
  };

  const filteredSteps = steps.filter((step) => {
    const allText = `
    ${step.title}
    ${step.description || ""}
    ${(step.notes || []).join(" ")}
    ${(step.sections || [])
        .map(
          (sec) =>
            `${sec.title || ""} ${sec.content || ""} ${(sec.items || []).join(
              " "
            )}`
        )
        .join(" ")}
  `.toLowerCase();

    return allText.includes(searchTerm.toLowerCase());
  });

  return (
    <PageContainer>
      <StepsContainer>
        <HeaderGradient
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "1rem",
          }}
        >
          <StepsHeader style={{ flex: "1 1 60%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaCheckCircle
                  style={{ marginRight: 12, fontSize: "1.5rem" }}
                />
                <StepsTitle>{topic || "Step-by-Step Guide"}</StepsTitle>
              </div>
              <StepsSubtitle style={{ paddingLeft: 24 }}>
                Follow these instructions to{" "}
                {topic ? topic.toLowerCase() : "complete the process"}
              </StepsSubtitle>
            </div>
          </StepsHeader>
          <div style={{ flex: "1 1 40%", textAlign: "right" }}>
            <input
              type="text"
              placeholder="Search all content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                width: "100%",
                maxWidth: "300px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </HeaderGradient>

        <StepsContent>
          {filteredSteps.length > 0 ? (
            filteredSteps.map((step, index) => (
              <StepItem key={index}>
                <StepNumberContainer>
                  <StepNumber>{index + 1}</StepNumber>
                </StepNumberContainer>
                <StepMainContent>
                  <StepTitle>{highlight(step.title)}</StepTitle>
                  {step.description && (
                    <StepDescription>
                      {highlight(step.description)}
                    </StepDescription>
                  )}
                  {step.sections?.map((section, sectionIndex) => (
                    <StepSection key={sectionIndex}>
                      <SectionTitle>
                        {section.icon}
                        {highlight(section.title)}
                      </SectionTitle>
                      {section.items ? (
                        <StepList>
                          {section.items.map((item, itemIndex) => (
                            <StepListItem key={itemIndex}>
                              <ListItemIcon />
                             {typeof item === "object" && item.type === "copy" ? (
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "#1976d2",
                                  textDecoration: "none",
                                  fontWeight: 500,
                                }}
                                title="Click to copy"
                                onClick={() => {navigator.clipboard.writeText(item.value); toast.success("Mail Template copy successfully!!!")}}
                              >
                                {item.label}
                              </span>
                            ) : (
                              /* CASE 2: Existing HTML string */
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: highlightHTML(item),
                                }}
                              />
                            )}
                            </StepListItem>
                          ))}
                        </StepList>
                      ) : section.content?.type === "table" ? (
                        <DynamicTable
                          columns={section.content.columns}
                          rows={section.content.rows}
                        />
                      ) : typeof section.content === "string" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: highlightHTML(section.content),
                          }}
                        />
                      ) : (
                        section.content
                      )}

                    </StepSection>
                  ))}
                  {step.notes?.map((note, noteIndex) => (
                    <ImportantNote key={noteIndex}>
                      <MdOutlineStickyNote2 />
                      <NoteText>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightHTML(note),
                          }}
                        />
                      </NoteText>
                    </ImportantNote>
                  ))}
                </StepMainContent>
              </StepItem>
            ))
          ) : (
            <StepItem>
              <StepNumberContainer>
                <StepNumber>1</StepNumber>
              </StepNumberContainer>
              <StepMainContent>
                <StepTitle>No instructions available</StepTitle>
                <StepDescription>
                  Please select a valid topic from the manual.
                </StepDescription>
              </StepMainContent>
            </StepItem>
          )}
        </StepsContent>

        <ActionBar>
          <BackButton onClick={handleBackClick}>
            <BackButtonIcon />
            Return to Previous
          </BackButton>
          <ProgressIndicator>
            Step <span>{filteredSteps.length > 0 ? 1 : 0}</span> to{" "}
            <span>{filteredSteps.length || 1}</span>
          </ProgressIndicator>
        </ActionBar>
      </StepsContainer>
    </PageContainer>
  );
};

export default ManualSteps;
