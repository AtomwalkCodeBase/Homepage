import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { Building2, MapPin } from 'lucide-react'
import styled from 'styled-components';
import { CalendarEvent } from 'react-bootstrap-icons';
import { formatDate } from './utils/utils';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { FaFileAlt, FaPlus, FaRegMoneyBillAlt, FaTimes, FaUpload } from 'react-icons/fa';
import { FaRegPenToSquare } from 'react-icons/fa6';
import Modal from '../../components/modals/Modal';
import { toast } from 'react-toastify';
import { FiFileText } from 'react-icons/fi';
import { postAllocationData } from '../../services/productServices';

const Item = styled.div`
  display: flex;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.85rem'};
  color: ${({ theme }) => theme.colors?.text || '#000'};
`;

// const Label = styled.div`
//   color: ${({ theme }) => theme.colors?.textLight || '#666'};
//   font-size: ${({ theme }) => theme.fontSizes?.xs || '0.75rem'};
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing?.xs || '0.25rem'};
//   margin-bottom: ${({ theme }) => theme.spacing?.xs || '0.2rem'};
// `;

const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.875rem'};
  color: ${({ theme }) => theme.colors?.text || '#333333'};
  font-weight: 500;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: ${props => props.theme.colors.text};
`;

const Required = styled.span`
  color: ${props => props.theme.colors.error};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s;

  &:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     transform: none;
   }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  min-height: 20px;
  resize: vertical;
  font-family: inherit;
  font-size: 0.95rem;

    &:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     transform: none;
   }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;
const FileUploadContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.background};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight}22;
  }
`;
const FileUploadContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FileUploadIcon = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 8px;
  flex-shrink: 0;
`;

const FileUploadTextWrapper = styled.div`
  flex: 1;
`;

const FileUploadText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.15rem;
`;

const FileUploadHint = styled.div`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const FileInput = styled.input`
  display: none;

    &:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     transform: none;
   }
`;

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${props => props.theme.colors.text};
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;


const OPEActual = ({ data, refreshActivities }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [opeData, setOpeData] = useState(null);
    const [opeMode, setOpeMode] = useState("");
    const actualData = data?.filter(activity => activity.is_ope_actual === true);

  const getStatusLabelVariant = (status, hasOPEAmount) => {
  if (!status) {
    return { variant: "secondary", status_label: "Unknown" };
  }

  const key = status.toUpperCase().replace(/\s+/g, "_");

  const statusMap = {
    A: { variant: hasOPEAmount ? "info" : "warning",       status_label: hasOPEAmount ? "OPE Given" : 'OPE Pending' },
    F: { variant: "success",    status_label: "F&A Approved" },
    P: { variant: "info",    status_label: "Planned" },
    B: { variant: "success",    status_label: "Ready for Billing" },
    S: { variant: "success",      status_label: "Submitted to BO" },
    H: { variant: "error",      status_label: "Rejected" },
    X: { variant: "error",    status_label: "Cancelled" },
  };

  return ( statusMap[key] || { variant: "secondary", status_label: status } );
  };

  const handleClick = (item, mode) => {
    setOpeData(item);
    setOpeMode(mode)
    setIsOpen(true);
  }

    const handleClose = () => {
    setIsOpen(false);
    setOpeData(null);
    setOpeMode("");
  };

  return (
    <>
     {actualData.length === 0 || !actualData ? 
<EmptyState>No OPE record found.</EmptyState>
     
    : actualData.map((item) => {
      const opeAmount = item?.original_A?.ope_amt || item?.original_P?.ope_amt || "0.00";
      const hasOPEAmount = opeAmount && opeAmount !== "0.00";
     const {variant , status_label} = getStatusLabelVariant(item.order_item_status, hasOPEAmount)
     const Mode = item.ope_amt === "0.00" ? "ADD" : "UPDATE";
    //  console.log("cust", item.customer_name, Mode, item.ope_amt)

    return(
     <Card key={item.a_id} hoverable={false}>
        <div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
         <h1 style={{ fontWeight: 600, fontSize: '0.95rem', }}>
           <Building2 size={18} style={{ marginRight: "0.5rem" }} />
           {item.customer_name}
         </h1>
         <Badge variant={variant}>{status_label}</Badge>
         </div>
         <div style={{ fontSize: '0.8rem', color: '#666' }}>
           {item.project_code} /<MapPin size={14} /> {item.store_name}
         </div>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Item>
          <Label><CalendarEvent size={14} />Actual Date: -</Label>
          <DetailValue>{item.actual_start_date ? `${formatDate(item.actual_start_date)} to ${formatDate(item.actual_end_date)}` : "Not started"}</DetailValue>
        </Item>
       {hasOPEAmount && <Item>
          <Label><FaRegMoneyBillAlt size={14} />OPE Amount: -</Label>
          <DetailValue>{item.ope_amt}</DetailValue>
        </Item>}
        
       {(item.order_item_status === "A" && item.a_id) && <Button size="sm" onClick={() => handleClick(item, Mode)}>
         {Mode === "ADD" ? <><FaPlus /> Add </>: <><FaRegPenToSquare /> UPDATE </> }
        </Button> }
        </div>

     </Card>
    )})}
    {
      isOpen && <OPEMODLE isOpen={isOpen} data={opeData} opeMode={opeMode} onClose={handleClose} refreshActivities={refreshActivities} />
    }
    </>
  )
}

export default OPEActual

const OPEMODLE = ({data, isOpen, opeMode, onClose, refreshActivities }) => {
    const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
      ope_amount: "",
      claim_remarks: "",
      file: null
    })

      useEffect(() => {
    if (data && opeMode === "UPDATE") {
      setFormData({
        ope_amount: data.ope_amt || "",
        claim_remarks: data.claim_remarks || "",
        file: null
      });
    }
  }, [data, opeMode]);

      const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 5MB");
          return;
        }
    
        handleChange("file", file);
      };
    
      const removeFile = () => { setFormData((prev) => ({ ...prev, file: null, })) }

        const handleSubmit = async () => {

    try {

      setIsLoading(true);

      const payload = new FormData();

      payload.append("a_id", data.a_id);
      payload.append("emp_id", data.original_A.emp_id);
      payload.append("ope_amt", formData.ope_amount);
      payload.append("remarks", formData.claim_remarks);
      payload.append("call_mode", "CLAIM_UPDATE");

      if (formData.file) {
        payload.append("claim_file", formData.file);
      }

      
      // for (let [key, value] of payload.entries()) {
      //   console.log(key, value);
      // }

      const res = await postAllocationData(payload);

      // const res = {status: 200}

      if (res?.status === 200) {

        toast.success(
          opeMode === "ADD"
            ? "OPE Added Successfully"
            : "OPE Updated Successfully"
        );

        refreshActivities?.();
        onClose();
      }

    } catch (error) {
      const backendMessage =error?.response?.data?.error || error?.response?.data?.message  ||"";
      toast.error(backendMessage || "Unable to submit OPE");
    } finally {
      setIsLoading(false);
    }
  };

  return(<Modal onClose={onClose}>
      <div style={{ padding: "0.2rem" }}>
                                <h4 style={{ textAlign: "left", marginBottom: "1rem" }}>{opeMode=== "ADD" ? "ADD" : "UPDATE"} OPE Actual</h4>
     <FormGroup>
                    <Label>OPE Amount <Required>*</Required></Label>
                    <Input type="number" min={0} value={formData.ope_amount} onChange={(e) => handleChange("ope_amount", e.target.value)} placeholder="Enter OPE Amount" />
                  </FormGroup>
    
                  <FormGroup>
                    <Label>
                      <FiFileText /> Remarks(Optional)"
                    </Label>
                    <TextArea
                      value={formData.claim_remarks}
                      onChange={e => handleChange('claim_remarks', e.target.value)}
                      placeholder="Add any notes..."
                    // disabled={isRetainerUpdate}
                    />
                  </FormGroup>
    
                  <FormGroup>
                    <Label>
                      Receipts/Attachments
                    </Label>
                    <FileUploadContainer onClick={() => document.getElementById("file-upload").click()}>
                      <FileInput
                        id={"file-upload"}
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,.pdf,"
                      // required={activity.original_P.is_file_applicable} 
                      // disabled={isRetainerUpdate}
                      />
                      <FileUploadContent>
                        <FileUploadIcon>
                          <FaUpload />
                        </FileUploadIcon>
                        <FileUploadTextWrapper>
                          <FileUploadText>Click to upload file</FileUploadText>
                          <FileUploadHint>JPG, PNG, PDF, EXCEL, WORD • Max 5MB</FileUploadHint>
                        </FileUploadTextWrapper>
                      </FileUploadContent>
                    </FileUploadContainer>
    
                    {formData.file && (
                      <UploadedFile>
                        {formData.file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(formData.file)}
                            alt="preview"
                            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }}
                          />
                        ) : (
                          <FaFileAlt color={(theme) => theme.color.text} />
                        )}
                        <span title={formData.file.name}>{formData.file.name}</span>
                        <button type="button" onClick={() => removeFile(1)}>
                          <FaTimes />
                        </button>
                      </UploadedFile>
                    )}
                  </FormGroup>
                  </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px",  marginTop: "1.5rem" }}>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button  variant="primary" type="submit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? "Submitting..." : opeMode === "ADD" ? <><FaPlus /> Add </> : <><FaRegPenToSquare /> UPDATE </>}
            </Button>
          </div>
  </Modal>)
}