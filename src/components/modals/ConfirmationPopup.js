import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for the popup
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-top: 0;
  color: #333;
  font-size: 20px;
`;

const Message = styled.p`
  margin: 16px 0;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const CancelButton = styled(Button)`
  background-color: #f1f1f1;
  color: #333;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${props => props.approve ? '#28a745' : '#dc3545'};
  color: white;
  
  &:hover {
    background-color: ${props => props.approve ? 'rgb(86, 230, 119)' : '#dc3545'};
  }
`;

// Confirmation Popup Component
const ConfirmationPopup = ({ isOpen, onClose, onConfirm,approve,timesheet }) => {
  const [remark, setRemark] = useState('');

  if (!isOpen) return null;

  return (
    <Overlay>
      <PopupContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title style={{ margin: 0 }}>Confirmation</Title>
          <button
            onClick={onClose}
            style={{
              fontSize: '25px',
              cursor: 'pointer',
              color:approve?'rgb(24, 228, 44)': 'rgb(228, 24, 24)',
              padding: 0,
              marginLeft: '16px',
              lineHeight: 1,
            }}
            aria-label="Close"
          >
            ❌
          </button>
        </div>
     {timesheet?
        <Message>Are you sure you want to {approve?"Approve":"Reject"}</Message>
        :<Message>Do you want to {approve?"Approve":"cancel"} your leave?</Message>}
      
        <Input
          type="text"
          placeholder="Remark"
          // value={remark}
          onChange={e => setRemark(e.target.value)}
        />
        <ButtonGroup>
          <CancelButton onClick={onClose}>No, keep it</CancelButton>
         {timesheet?<SubmitButton approve={approve}  onClick={() => onConfirm(remark,approve?"APPROVE":"REJECT")}>Yes,{approve?"Approve":"Reject"}</SubmitButton>:
         <SubmitButton approve={approve}  onClick={() => onConfirm(remark,approve?"Approved":"cancelled")}>Yes,{approve?"Approve":"cancel"}</SubmitButton>}
        </ButtonGroup>
      </PopupContainer>
    </Overlay>
  );
};
export default ConfirmationPopup;