import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaCreditCard,
  FaSpinner,
  FaCheck
} from 'react-icons/fa';
import { theme } from '../styles/Theme';

const FormContainer = styled.div`
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  width: 100%;
  max-width: 1200px;
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.primary};
  padding-bottom: ${theme.spacing.sm};
  text-align: left;
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.sm};
`;

const Input = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  background: ${theme.colors.backgroundAlt};
  color: ${theme.colors.text};
  transition: ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
  
  &::placeholder {
    color: ${theme.colors.textLight};
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-right: 40px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  background: ${theme.colors.backgroundAlt};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  appearance: none;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: ${theme.spacing.sm};
  pointer-events: none;
  color: ${theme.colors.textLight};
  transition: ${theme.transitions.fast};
  
  ${Select}:focus + & {
    color: ${theme.colors.primary};
  }
`;

const SummaryCard = styled.div`
  background: ${theme.colors.backgroundAlt};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const SummaryTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
    border-top: 1px solid ${theme.colors.border};
    padding-top: ${theme.spacing.sm};
    font-weight: 600;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  width: 100%;

  & > .left,
  & > .right { display: flex; gap: ${theme.spacing.lg}; align-items: center; }
`;

const SubmitButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  font-size: ${theme.fontSizes.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const Payment = ({ onSubmit, onBack, patientData, bedData, nurseData }) => {
  const [formData, setFormData] = useState({
    paymentMethod: 'Credit Card',
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    amount: '5000'
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.cardNumber || !formData.cardHolderName || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all payment details.');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare payment data
      const paymentData = {
        payment_method: formData.paymentMethod,
        card_number: formData.cardNumber,
        card_holder_name: formData.cardHolderName,
        expiry_date: formData.expiryDate,
        cvv: formData.cvv,
        amount: formData.amount,
        patient_data: patientData,
        bed_data: bedData,
        nurse_data: nurseData
      };

      console.log('Payment data:', paymentData);

      // TODO: Replace with actual API call
      // const response = await postPayment(paymentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the onSubmit function to complete the process
      onSubmit(paymentData);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <SectionTitle>Payment</SectionTitle>
      
      {/* Summary Section */}
      <SummaryCard>
        <SummaryTitle>Admission Summary</SummaryTitle>
        <SummaryItem>
          <span>Patient Name:</span>
          <span>{patientData?.patientName || 'N/A'}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Room & Bed:</span>
          <span>{bedData?.room_name} - {bedData?.bed_number}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Assigned Nurse:</span>
          <span>{nurseData?.assigned_nurse || 'N/A'}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Admission Date:</span>
          <span>{patientData?.admissionDate || 'N/A'}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Total Amount:</span>
          <span>₹{formData.amount}</span>
        </SummaryItem>
      </SummaryCard>

      <FormGrid>
        <FormGroup>
          <Label>Payment Method</Label>
          <SelectWrapper>
            <Select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="UPI">UPI</option>
            </Select>
            <SelectIcon>
              <FaCreditCard />
            </SelectIcon>
          </SelectWrapper>
        </FormGroup>

        <FormGroup>
          <Label>Card Number</Label>
          <Input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleInputChange}
            maxLength="19"
          />
        </FormGroup>

        <FormGroup>
          <Label>Card Holder Name</Label>
          <Input
            type="text"
            name="cardHolderName"
            placeholder="Enter card holder name"
            value={formData.cardHolderName}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Expiry Date</Label>
          <Input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleInputChange}
            maxLength="5"
          />
        </FormGroup>

        <FormGroup>
          <Label>CVV</Label>
          <Input
            type="password"
            name="cvv"
            placeholder="123"
            value={formData.cvv}
            onChange={handleInputChange}
            maxLength="4"
          />
        </FormGroup>

        <FormGroup>
          <Label>Amount (₹)</Label>
          <Input
            type="number"
            name="amount"
            placeholder="5000"
            value={formData.amount}
            onChange={handleInputChange}
            readOnly
          />
        </FormGroup>
      </FormGrid>

      <ActionButtons>
        <div className="left">
          <SubmitButton type="button" onClick={onBack} disabled={loading}>
            Back
          </SubmitButton>
        </div>
        <div className="right">
          <SubmitButton 
            type="button" 
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? <FaSpinner /> : <FaCheck />}
            {loading ? 'Processing Payment...' : 'Complete Admission'}
          </SubmitButton>
        </div>
      </ActionButtons>
    </FormContainer>
  );
};

export default Payment;
