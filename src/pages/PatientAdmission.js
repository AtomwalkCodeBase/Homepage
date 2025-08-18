import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaSignOutAlt,
  FaChevronDown,
  FaUser,
  FaBed,
  FaUserNurse,
  FaCreditCard,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import Layout from '../components/Layout';
import BedAllocation from '../components/BedAllocation';
import NurseAllocation from '../components/NurseAllocation';
import Payment from '../components/Payment';
import Button from '../components/Button';
import { getCustomerListView, getProcessListView, getemployeeList, postProject2, createAddressPost } from '../services/productServices';
import { useTheme } from '../context/ThemeContext';
import { toast } from "react-toastify"

const CONTROL_HEIGHT = '42px';

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  position: relative;
  height: 4px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  z-index: 1;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: 2px;
  z-index: 2;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.3s ease;
  background: ${({ theme, completed, current }) => completed
    ? theme.colors.success
    : current
      ? theme.colors.primary
      : theme.colors.backgroundAlt};
  color: ${({ theme, completed, current }) => (completed || current) ? 'white' : theme.colors.textLight};
  border: 2px solid ${({ theme, completed, current }) => completed
    ? theme.colors.success
    : current
      ? theme.colors.primary
      : theme.colors.border};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme, completed, current }) => completed
    ? theme.colors.success
    : current
      ? theme.colors.primary
      : theme.colors.textLight};
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};
  height: ${CONTROL_HEIGHT};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-right: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  appearance: none;
  width: 100%;
  height: ${CONTROL_HEIGHT};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textLight};
  transition: ${({ theme }) => theme.transitions.fast};
  
  ${Select}:focus + & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.md};
    & > * { width: 100%; }
  }
`;

const PatientAdmission = () => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [showRelativeDetails, setShowRelativeDetails] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    code: '',
    template: '',
    admissionDate: '',
    admissionSource: '',
    assignedDoctor: '',
    relationToPatient: '',
    relativeName: '',
    mobileNumber: '',
    address_line_1: '',
    address_line_2: '',
    pincode: '',
    idProofType: 'Adhaar card',
    idProofNumber: ''
  });

  const [bedData, setBedData] = useState(null);
  const [nurseData, setNurseData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [lockedSteps, setLockedSteps] = useState({ 1: false, 2: false, 3: false });
  const [customerList, setCustomerList] = useState([]);
  const [processList, setProcessList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const steps = [
    { id: 1, label: 'Patient Details', icon: FaUser },
    { id: 2, label: 'Bed Allocation', icon: FaBed },
    { id: 3, label: 'Nurse Allocation', icon: FaUserNurse },
    { id: 4, label: 'Payment details', icon: FaCreditCard }
  ];

  // Warn on page unload/refresh if steps are not completed
  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      if (currentStep < 4) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => window.removeEventListener('beforeunload', beforeUnloadHandler);
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If patient ID is selected, automatically fill the patient name
    if (name === 'patientId' && value) {
      const selectedCustomer = customerList.find(customer => customer.id === parseInt(value));
      if (selectedCustomer) {
        setFormData(prev => ({
          ...prev,
          patientName: selectedCustomer.name
        }));
      }
    }
  };

  // Helper function to format date as DD-MM-YYYY
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSaveAndProceed = async () => {
    // Validate required fields for patient details
    if (!formData.patientId || !formData.template || !formData.assignedDoctor || !formData.admissionDate) {
      toast.warning('Please select a patient ID, cause of admission, assigned doctor, and admission date.');
      return;
    }

    // Find selected entities
    const selectedCustomer = customerList.find(c => c.id === parseInt(formData.patientId));
    const selectedProcess = processList.find(p => p.process_id === formData.template);

    // Prepare project_data for API
    const project_data = {
      name: String(formData.patientName || (selectedCustomer ? selectedCustomer.name : '')),
      project_code: "",
      start_date: formData.admissionDate ? formatDateForAPI(formData.admissionDate) : '',
      end_date: formData.dischargeDate ? formatDateForAPI(formData.dischargeDate) : '',
      call_mode: 'ADD_PROJECT',
      employee_list: '',
      emp_id: String(formData.assignedDoctor),
      project_status: '02',
      customer_id: Number(formData.patientId),
      process_id: String(selectedProcess ? selectedProcess.process_id : formData.template),
    };

    try {
      setLoading(true);
      const response = await postProject2(project_data);
      
      if (response && response.status === 200) {
        const apiProjectCode = response?.data?.project_code || response?.project_code || response?.data?.data?.project_code || '';
        if (!apiProjectCode) {
          console.warn('Project code not found in response. Response shape:', response);
        }
        setGeneratedCode(apiProjectCode);
        setFormData(prev => ({ ...prev, code: apiProjectCode }));
        toast.success('Patient details saved successfully!');
        console.log("Project data:", response)
        setShowRelativeDetails(true);
      } else {
        toast.error('Failed to save patient details.');
      }
    } catch (error) {
      toast.error('Error saving patient details: ' + (error?.response?.data?.message || error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    // If we're on step 1 and moving to step 2, save relative details
    if (currentStep === 1 && showRelativeDetails) {
      // Validate required fields for relative details
      if (!formData.relationToPatient || !formData.relativeName || !formData.address_line_1 || !formData.mobileNumber) {
        toast.warning('Please fill in all required fields: Relation to Patient, Name, Address Line 1, and Mobile Number.');
        return;
      }

      // Prepare address data for API
      const address_data = {
        customer_id: parseInt(formData.patientId),
        name: formData.relativeName,
        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2 || '',
        pin_code: formData.pincode || '',
        mobile_number: formData.mobileNumber,
        location: formData.relationToPatient
      };

      try {
        setLoading(true);
        const response = await createAddressPost(address_data);
        
        if (response && response.status === 200) {
          toast.success('Relative details saved successfully!');
          setLockedSteps(prev => ({ ...prev, 1: true }));
          setCurrentStep(currentStep + 1);
        } else {
          toast.error('Failed to save relative details.');
        }
      } catch (error) {
        console.error('Address API Error:', error);
        toast.error('Error saving relative details: ' + (error?.response?.data?.message || error?.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinueFromStep1 = () => {
    setCurrentStep(2);
  };

  const handleBedAllocationComplete = (data) => {
    setBedData(data);
    toast.success('Bed allocated successfully!');
    setLockedSteps(prev => ({ ...prev, 2: true }));
    setCurrentStep(3);
  };

  const handleNurseAllocationComplete = (data) => {
    setNurseData(data);
    toast.success('Nurse allocated successfully!');
    setLockedSteps(prev => ({ ...prev, 3: true }));
    setCurrentStep(4);
  };

  const handlePaymentComplete = (data) => {
    setPaymentData(data);
    toast.success('Payment completed! Patient admission successful.');
    // Here you can redirect to a success page or dashboard
  };

  // Fetch customer, process, and employee lists on component mount
  useEffect(() => {
    const fetchCustomerList = async () => {
      setLoading(true);
      try {
        const response = await getCustomerListView();
        if (response && response.data) {
          setCustomerList(response.data);
        }
      } catch (error) {
        console.error('Error fetching customer list:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProcessList = async () => {
      setProcessLoading(true);
      try {
        const response = await getProcessListView();
        let processData = [];
        if (response && response.data) {
          processData = Array.isArray(response.data) ? response.data : [response.data];
        } else if (response && Array.isArray(response)) {
          processData = response;
        }
        setProcessList(processData);
      } catch (error) {
        console.error('Error fetching process list:', error);
      } finally {
        setProcessLoading(false);
      }
    };

    const fetchEmployeeList = async () => {
      setLoading(true);
      try {
        const response = await getemployeeList();
        if (response && response.data) {
          setEmployeeList(response.data);
        }
      } catch (error) {
        console.error('Error fetching employee list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerList();
    fetchProcessList();
    fetchEmployeeList();
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
          <fieldset disabled={lockedSteps[1]} style={{ border: 'none', padding: 0, margin: 0 }}>
            <SectionTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Patient Details</span>
              {generatedCode && (
                <span style={{ fontSize: '0.9rem', color: theme.colors.textLight, fontWeight: 400 }}>
                  Registration number: {generatedCode}
                </span>
              )}
            </SectionTitle>
            
            {/* Patient Admission Section */}
            <FormGrid>
              <FormGroup>
                <Label>Patient ID</Label>
                <SelectWrapper>
                  <Select name="patientId" value={formData.patientId} onChange={handleInputChange}>
                    <option value="">Select Patient ID</option>
                    {loading ? (
                      <option value="" disabled>Loading...</option>
                    ) : (
                      customerList.map((customer, index) => (
                        <option key={index} value={customer.id}>
                          {customer.id} - {customer.name}
                        </option>
                      ))
                    )}
                  </Select>
                  <SelectIcon>
                    <FaChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Patient Name</Label>
                <Input
                  type="text"
                  name="patientName"
                  placeholder="Patient Name"
                  value={formData.patientName}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Cause of admission</Label>
                <SelectWrapper>
                  <Select name="template" value={formData.template} onChange={handleInputChange}>
                    <option value="">Select cause of admission</option>
                    {processLoading ? (
                      <option value="" disabled>Loading...</option>
                    ) : processList.length > 0 ? (
                      processList.map((process, index) => (
                        <option key={index} value={process.process_id}>
                          {process.process_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No templates available</option>
                    )}
                  </Select>
                  <SelectIcon>
                    <FaChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Admission Date</Label>
                <Input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Admission Source</Label>
                <SelectWrapper>
                  <Select name="admissionSource" value={formData.admissionSource} onChange={handleInputChange}>
                    <option value="select">Select source</option>
                    <option value="Emergency">Emergency</option>
                    <option value="OPD">OPD</option>
                    <option value="Referral">Referral</option>
                  </Select>
                  <SelectIcon>
                    <FaChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Assign Doctor</Label>
                <SelectWrapper>
                  <Select name="assignedDoctor" value={formData.assignedDoctor} onChange={handleInputChange}>
                    <option value="">Select doctor</option>
                    {loading ? (
                      <option value="" disabled>Loading...</option>
                    ) : (
                      employeeList.map((employee, index) => (
                        <option key={index} value={employee.emp_id}>
                          {employee.name}
                        </option>
                      ))
                    )}
                  </Select>
                  <SelectIcon>
                    <FaChevronDown />
                  </SelectIcon>
                </SelectWrapper>
              </FormGroup>
            </FormGrid>

            {/* Save & Proceed button for patient details */}
            {!showRelativeDetails && !lockedSteps[1] && (
              <ActionButtons>
                <div className="right">
                  <Button 
                    variant="primary" 
                    size="md" 
                    onClick={handleSaveAndProceed} 
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Save & Proceed'}
                  </Button>
                </div>
              </ActionButtons>
            )}

            {/* Relative Details Section - shown after Save & Proceed */}
            {showRelativeDetails && !lockedSteps[1] && (
              <>
                <SectionTitle>Relative Details</SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <Label>Relation to Patient</Label>
                    <Input
                      type="text"
                      name="relationToPatient"
                      placeholder="Enter relation to patient"
                      value={formData.relationToPatient}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="relativeName"
                      placeholder="Enter name"
                      value={formData.relativeName}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Mobile Number</Label>
                    <Input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Enter mobile number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Address Line 1</Label>
                    <Input
                      type="text"
                      name="address_line_1"
                      placeholder="Enter address line 1"
                      value={formData.address_line_1}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Address Line 2</Label>
                    <Input
                      type="text"
                      name="address_line_2"
                      placeholder="Enter address line 2 (optional)"
                      value={formData.address_line_2}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Pincode</Label>
                    <Input
                      type="text"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength="6"
                    />
                  </FormGroup>
                </FormGrid>

                <ActionButtons>
                  <div className="right">
                    <Button 
                      variant="primary" 
                      size="md" 
                      onClick={handleNextStep} 
                      disabled={loading}
                    >
                      Next
                    </Button>
                  </div>
                </ActionButtons>
              </>
            )}
          </fieldset>
          {lockedSteps[1] && (
            <ActionButtons>
              <div className="left">
                <Button variant="secondary" size="md" onClick={handleBackStep}>
                  Back
                </Button>
              </div>
              <div className="right">
                <Button variant="primary" size="md" onClick={handleContinueFromStep1}>
                  Next
                </Button>
              </div>
            </ActionButtons>
          )}
          </>
        );

      case 2:
        return <BedAllocation onNext={handleBedAllocationComplete} onBack={handleBackStep} readOnly={lockedSteps[2]} patientData={formData} bedData={bedData} />;

      case 3:
        return <NurseAllocation onNext={handleNurseAllocationComplete} onBack={handleBackStep} readOnly={lockedSteps[3]} projectCode={generatedCode} patientData={formData} bedData={bedData} nurseData={nurseData} />;

      case 4:
        return <Payment onSubmit={handlePaymentComplete} onBack={handleBackStep} patientData={formData} bedData={bedData} nurseData={nurseData} />;

      default:
        return null;
    }
  };

  return (
    <Layout title="Patient Admission">
      <DashboardContainer>
        <FormContainer>
          {/* Progress Indicator */}
          <ProgressContainer>
            <StepsContainer>
              {steps.map((step) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                return (
                  <StepContainer key={step.id}>
                    <StepCircle completed={isCompleted} current={isCurrent}>
                      {isCompleted ? <FaCheck /> : step.id}
                    </StepCircle>
                    <StepLabel completed={isCompleted} current={isCurrent}>
                      {step.label}
                    </StepLabel>
                  </StepContainer>
                );
              })}
            </StepsContainer>
            <ProgressBar>
              <ProgressLine />
              <ProgressFill progress={(currentStep - 1) * 33.33} />
            </ProgressBar>
          </ProgressContainer>

          {/* Step Content */}
          {renderStepContent()}
        </FormContainer>
      </DashboardContainer>
    </Layout>
  );
};

export default PatientAdmission;