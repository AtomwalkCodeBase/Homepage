import { FiBriefcase, FiCalendar, FiCheck, FiCheckCircle, FiExternalLink, FiEye, FiFileText, FiImage, FiMail, FiPhone, FiShield, FiX } from "react-icons/fi";
import { theme } from "../../../styles/Theme";
import styled from "styled-components";
import { useState } from "react";
import Badge from "../../Badge";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 18, 50, 0.55);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
`;
const Modal = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.xl};
  width: 100%;
  max-width: 950px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${theme.shadows.xl};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 95vh;
    border-radius: ${theme.borderRadius.lg};
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  border-right: 1px solid ${theme.colors.border};

  @media (max-width: ${theme.breakpoints.md}) {
    border-right: none;
    border-bottom: 1px solid ${theme.colors.border};
    overflow-y: unset;
  }
`;

const RightPanel = styled.div`
  width: 300px;
  flex-shrink: 0;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  background: ${theme.colors.background};
  margin-bottom: ${theme.spacing.md};
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

const RightPanelTitle = styled.div`
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  color: ${theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding-bottom: ${theme.spacing.xs};
  border-bottom: 1px solid ${theme.colors.border};
`;

const DocPreviewArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  min-height: 0;
`;

const FileImageFull = styled.img`
  width: 100%;
  max-height: 190px;
  object-fit: contain;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.card};
  display: block;
`;

const NoFileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: 1.5px dashed ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  color: ${theme.colors.border};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  padding: ${theme.spacing.xl} 0;

  svg { font-size: 28px; }
`;

const RemarksTextarea = styled.textarea`
  width: 100%;
  padding: 10px ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  border: 1.5px solid ${theme.colors.border};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text};
  background: ${theme.colors.card};
  resize: none;
  height: 90px;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }

  &::placeholder { color: ${theme.colors.border}; }
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: ${theme.colors.card};
  z-index: 1;
  border-radius: ${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0;
`;

const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  svg { color: ${theme.colors.primary}; }
`;

const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.lg};
  border: none;
  background: ${theme.colors.backgroundAlt};
  color: ${theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.border};
    color: ${theme.colors.text};
  }
`;

// ─── Detail Profile Block ─────────────────────────────────────────────────────
const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.primaryLight}, ${theme.colors.backgroundAlt});
  border-radius: ${theme.borderRadius.xl};
`;

const LargeAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.xl};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 8px 24px ${theme.colors.shadow};
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProfileName = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  margin: 0 0 4px 0;
  color: ${theme.colors.text};
`;

const ProfileMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
  align-items: center;
`;
// ─── Verify Modal Extras ──────────────────────────────────────────────────────
const VerifyBox = styled.div`
  /* background: linear-gradient(135deg, #E6F9F0, #F0FFF7); */
  background: ${props => props.$callMode === "REJECT" ? "linear-gradient(135deg, #f9e6e8, #fff0f1)" : "linear-gradient(135deg, #E6F9F0, #F0FFF7)"};
  /* border: 1.5px dashed ${theme.colors.success}; */
  border: 1.5px dashed ${props => props.$callMode === "REJECT" ? props.theme.colors.error : props.theme.colors.success};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.md};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const VerifyIcon = styled.div`
  width: 56px;
  height: 56px;
  background: ${props => props.$callMode === "REJECT" ? props.theme.colors.error : props.theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.md};
  color: white;
  font-size: 24px;
  box-shadow: 0 8px 20px ${props => props.$callMode === "REJECT" ? `${props.theme.colors.error}40` : `${props.theme.colors.success}40`};
`;

const VerifyTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  margin: 0 0 6px 0;
  color: ${theme.colors.text};
`;

const VerifyDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  margin: 0;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
  justify-content: flex-end;
`;

const Btn = styled.button`
  padding: 10px ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 6px;

  
  &:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     transform: none;
   }

 ${({ $variant, $callMode, theme }) => {
    if ($variant === "primary") {
      return `
        background: ${theme.colors.primary};
        color: white;
        border: none;
        box-shadow: 0 4px 14px ${theme.colors.shadow};
        &:hover { background: #5854d6; transform: translateY(-1px); }
      `;
    }
    
    if ($variant === "success") {
      const color = $callMode === "REJECT" ? theme.colors.error : theme.colors.success;
      const hoverColor = $callMode === "REJECT" ? "#fb3126" : "#00a847";
      return `
        background: ${color};
        color: white;
        border: none;
        box-shadow: 0 4px 14px ${color}40;
        &:hover { background: ${hoverColor}; transform: translateY(-1px); }
      `;
    }
    
    return `
      background: transparent;
      color: ${theme.colors.textLight};
      border: 1.5px solid ${theme.colors.border};
      &:hover { border-color: ${theme.colors.text}; color: ${theme.colors.text}; }
    `;
  }}
`;
// ─── Grade Badge ──────────────────────────────────────────────────────────────
const GradeBadge = styled.span`
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  padding: 3px 10px;
  font-size: ${theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const AlreadyVerified = styled.div`
  background: #E6F9F0;
  border: 1.5px solid ${theme.colors.success};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.success};
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};

  svg { font-size: 22px; flex-shrink: 0; }
`;
const Section = styled.div``;

const SectionLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  color: ${theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.xs};
  border-bottom: 1px solid ${theme.colors.border};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.xs}) {
    grid-template-columns: 1fr;
  }
`;

// ─── Field ────────────────────────────────────────────────────────────────────
const Field = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};

  ${({ $full }) => $full && `grid-column: 1 / -1;`}
`;

const FieldIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  margin-top: 1px;
`;

const FieldContent = styled.div`
  min-width: 0;
  flex: 1;
`;

const FieldLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textLight};
  font-weight: 500;
  margin-bottom: 2px;
`;

const FieldValue = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${({ $empty }) => $empty ? theme.colors.border : theme.colors.text};
  font-weight: 600;
  word-break: break-word;
`;

const FileDocRow = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px ${theme.spacing.md};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  border-radius: ${theme.borderRadius.lg};
  transition: background ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }

  svg { flex-shrink: 0; }
  span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
const isEmpty = (val) => val === null || val === undefined || val === "";

export const VerifyModal = ({ employee, onClose, onVerify }) => {
    const [remarks, setRemarks] = useState("");
    // console.log("employee", employee)

      const isImageUrl = (url) => /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url);

      const proofType = (gNumber) => {
  if (!gNumber) return { typeName: "--", number: "--" };
  
  if (gNumber.includes("^")) {
    const parts = gNumber.split("^");
    const pType = parts[0];
    const number = parts[1] || "--";
    
    const typeMap = { "A": "Aadhar Card", "P": "Pan Card", "D": "Driving License"};
    const typeName = typeMap[pType] || "--";
    
    return { typeName, number };
  }
  return { typeName: "--", number: gNumber };
}

const GovtIDProof = proofType(employee.ref_govt_id_number)
    
return (
  <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
    <Modal>

      {/* Header */}
      <ModalHeader>
        <ModalTitle><FiShield /> {employee.call_mode === "REJECT" ? "Reject" : "Verify"} Contract</ModalTitle>
        <CloseBtn onClick={onClose}><FiX /></CloseBtn>
      </ModalHeader>

      <ModalBody>

        {/* LEFT — profile + identity */}
        <LeftPanel>
          <ProfileBlock>
            {/* <LargeAvatar>{getInitials(employee.name)}</LargeAvatar> */}
            <img src={employee.image} alt="Profile" style={{ width: "64px", height: "64px", marginRight: "1rem", borderRadius: "50%", border: "2px solid rgb(245, 247, 214)" }} />
            <ProfileInfo>
              <ProfileName>{employee.name}</ProfileName>
              <FieldValue>System Ref Id: {employee.emp_id}</FieldValue>
              <ProfileMeta>
               <Badge variant={employee.grade_level <= 1 ? "info" : "forward"}>{employee.grade_level <= 1 ? "Executive" : "Team Lead"}</Badge>
              </ProfileMeta>
            </ProfileInfo>
          </ProfileBlock>

           <Section>
                      <SectionLabel>Employee Details</SectionLabel>
                      <Grid>
                        <Field>
                                       <FieldIcon><FiBriefcase /></FieldIcon>
                                       <FieldContent>
                                         <FieldLabel>Employee ID</FieldLabel>
                                         <FieldValue>{employee.additional_ref_number || "--"}</FieldValue>
                                       </FieldContent>
                                     </Field>
          
                         <Field>
                                        <FieldIcon><FiCalendar /></FieldIcon>
                                        <FieldContent>
                                          <FieldLabel>Date of Birth</FieldLabel>
                                          <FieldValue $empty={isEmpty(employee.dob)}>{employee.dob || "--"}</FieldValue>
                                        </FieldContent>
                                      </Field>
                      </Grid>
                    </Section>
           <Section>
                      <SectionLabel>Contact Details</SectionLabel>
                      <Grid>
                        <Field>
                          <FieldIcon><FiPhone /></FieldIcon>
                          <FieldContent>
                            <FieldLabel>Mobile Number</FieldLabel>
                            <FieldValue $empty={isEmpty(employee.mobile_number)}>{employee.mobile_number || "--"}</FieldValue>
                          </FieldContent>
                        </Field>
          
                        <Field>
                          <FieldIcon><FiMail /></FieldIcon>
                          <FieldContent>
                            <FieldLabel>Email ID</FieldLabel>
                            <FieldValue $empty={isEmpty(employee.email_id)}>{employee.email_id || "--"}</FieldValue>
                          </FieldContent>
                        </Field>
                      </Grid>
                    </Section>

          <Section>
            <SectionLabel>Identity</SectionLabel>
            <Grid>
              <Field>
                    <FieldIcon><FiFileText /></FieldIcon>
                    <FieldContent>
                      <FieldLabel>Govt. ID Type</FieldLabel>
                      <FieldValue>
                        {GovtIDProof.typeName}
                      </FieldValue>
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldIcon><FiFileText /></FieldIcon>
                    <FieldContent>
                      <FieldLabel>Govt. ID Number</FieldLabel>
                      <FieldValue>
                        {GovtIDProof.number}
                      </FieldValue>
                    </FieldContent>
                  </Field>
            </Grid>
          </Section>

<Section>
           <RightPanelTitle>Uploaded Document</RightPanelTitle>

          <DocPreviewArea>
            {isEmpty(employee.emp_file_1) ? (
              <NoFileBox>
                <FiImage />
                No document uploaded
              </NoFileBox>
            ) : isImageUrl(employee.emp_file_1) ? (
              <>
                <FileImageFull src={employee.emp_file_1} alt="ID Document" />
                <FileDocRow href={employee.emp_file_1} target="_blank" rel="noopener noreferrer">
                  <FiEye /><span>Open Full Image</span><FiExternalLink />
                </FileDocRow>
              </>
            ) : (
              <FileDocRow href={employee.emp_file_1} target="_blank" rel="noopener noreferrer">
                <FiEye /><span>View Document</span><FiExternalLink />
              </FileDocRow>
            )}
          </DocPreviewArea>
          </Section>

          {/* {employee.is_verified ? (
            <AlreadyVerified>
              <FiCheckCircle />
              This employee has already been verified.
            </AlreadyVerified>
          ) : (
            <VerifyBox>
              <VerifyIcon><FiCheckCircle /></VerifyIcon>
              <VerifyTitle>Confirm Verification</VerifyTitle>
              <VerifyDesc>
                You are about to verify <strong>{employee.name}</strong>'s contract.<br />
                This action will mark the employee as verified in the system.
              </VerifyDesc>
            </VerifyBox>
          )} */}
        </LeftPanel>

        {/* RIGHT — document preview + remarks + action */}
        <RightPanel>
          {/* <RightPanelTitle>Uploaded Document</RightPanelTitle>

          <DocPreviewArea>
            {isEmpty(employee.emp_file_1) ? (
              <NoFileBox>
                <FiImage />
                No document uploaded
              </NoFileBox>
            ) : isImageUrl(employee.emp_file_1) ? (
              <>
                <FileImageFull src={employee.emp_file_1} alt="ID Document" />
                <FileDocRow href={employee.emp_file_1} target="_blank" rel="noopener noreferrer">
                  <FiEye /><span>Open Full Image</span><FiExternalLink />
                </FileDocRow>
              </>
            ) : (
              <FileDocRow href={employee.emp_file_1} target="_blank" rel="noopener noreferrer">
                <FiEye /><span>View Document</span><FiExternalLink />
              </FileDocRow>
            )}
          </DocPreviewArea> */}
           <VerifyBox $callMode={employee.call_mode}>
              <VerifyIcon $callMode={employee.call_mode}>
                {employee.call_mode === "REJECT" ? (
                  <IoMdCloseCircleOutline />
                ) : (
                  <FiCheckCircle />
                )}
              </VerifyIcon>
              <VerifyTitle>
                {employee.call_mode === "REJECT" ? "Reject Verification" : "Confirm Verification"}
              </VerifyTitle>
             <VerifyDesc>
                {employee.is_verified && employee.call_mode === "REJECT" ? (
                  <>
                    <strong>{employee.name}</strong> is already verified. Still want to reject ?<br />
                    This will change their status from verified to rejected.
                  </>
                ) : employee.is_rejected && employee.call_mode === "CONFIRM" ? (
                  <>
                    <strong>{employee.name}</strong> is already rejected. Still want to verify ?<br />
                    This will change their status from rejected to verified.
                  </>
                ) : (
                  <>
                    You are about to {employee.call_mode === "REJECT" ? "reject" : "verify"} <strong>{employee.name}</strong>'s contract.<br />
                    This action will mark the resource as {employee.call_mode === "REJECT" ? "rejected" : "verified"} in the system.
                  </>
                )}
              </VerifyDesc>
            </VerifyBox>

          
            <>
              <RightPanelTitle>Remarks</RightPanelTitle>
              <RemarksTextarea
                placeholder={employee.call_mode === "REJECT" ? "Enter reject remark" : "Enter remark before verifying..."}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </>

          <ModalFooter style={{ borderTop: "none", paddingTop: 0, flexDirection: "column", gap: "8px" }}>
              <Btn
                  $variant="success"
                  $callMode={employee.call_mode}
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => onVerify(employee, remarks)}
                disabled={!remarks.trim()}
              >
               {employee.call_mode === "REJECT" ? <><ImCross /> Reject</> : <> <FiCheck /> Confirm Verify </>}
              </Btn>
            <Btn
              style={{ width: "100%", justifyContent: "center" }}
              onClick={onClose}
            >
              Cancel
            </Btn>
          </ModalFooter>
        </RightPanel>

      </ModalBody>
    </Modal>
  </Overlay>
);
};