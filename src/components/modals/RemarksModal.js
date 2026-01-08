// Updated RemarksModal.js
"use client"

import styled from "styled-components"
import { useState, useEffect } from "react"
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa"
import { toast } from "react-toastify"

const ModalOverlay = styled.div`
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
  overflow-y: auto;
  padding: 20px;
`

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: ${({ $isWide }) => ($isWide ? '800px' : '500px')};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  font-size: 0.95rem;
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.inputBg};
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight}40;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.inputBg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight}40;
  }
`

const FileInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.inputBg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const ItemList = styled.div`
  margin-top: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`

const ItemHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 10px;
  padding: 12px 15px;
  background: ${({ theme }) => theme.colors.hoverBg};
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 10px;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

const ItemName = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`

const QuantityInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SystemQuantity = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

const QuantityAdjust = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const AdjustButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`

const QCList = styled.div`
  margin-top: 15px;
`

const QCItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.inputBg};
`

const QCName = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`

const QCOptions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`

const QCOption = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 0.9rem;
   color: ${({ theme }) => theme.colors.text};
`

const RadioInput = styled.input`
  margin: 0;
 color: ${({ theme }) => theme.colors.text};
`

const QCValueInput = styled(Input)`
  flex: 1;
  max-width: 200px;
`

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 25px 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary}40;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;
`

const Button = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const PrimaryButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
  }
`

const SecondaryButton = styled(Button)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`

const RemarksModal = ({ isOpen, title, actionType, activity, onSubmit, onClose }) => {
  const [remarks, setRemarks] = useState("")
  const [refFile, setRefFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  // For START mode
  const [itemList, setItemList] = useState([])
  
  // For COMPLETED/FAILED modes
  const [qcList, setQcList] = useState([])

  useEffect(() => {
    if (activity) {
      // Initialize item list for START mode
      if (actionType === "START" && activity.event_items) {
        setItemList(activity.event_items.map(item => ({
          item_id: item.item_id,
          item_name: item.item_name,
          system_quantity: parseFloat(item.system_quantity) || 0,
          user_quantity: parseFloat(item.user_quantity) || 0,
          remarks: "",
          original_quantity: parseFloat(item.user_quantity) || 0
        })))
      }

      // Initialize QC list for COMPLETED/FAILED modes
      if ((actionType === "COMPLETED" || actionType === "FAILED") && activity.qc_checklist) {
        setQcList(activity.qc_checklist.map(qc => ({
          qc_name: qc.item || qc.qc_name,
          qc_type: qc.qc_type || "TEXT",
          qc_value: qc.qc_value || "YES/NO",
          qc_actual: ""
        })))
      }
    }
  }, [activity, actionType])

  const validateForm = () => {
    const newErrors = {}

    if (actionType === "START") {
      itemList.forEach((item, index) => {
        // if (item.user_quantity <= 0) {
        //   newErrors[`item_${index}`] = "Quantity must be greater than 0"
        // }
        if (item.user_quantity > item.system_quantity) {
          newErrors[`item_${index}`] = "Cannot exceed system quantity"
        }
      })
    }

    if (actionType === "COMPLETED" || actionType === "FAILED") {
      qcList.forEach((qc, index) => {
        if (!qc.qc_actual || qc.qc_actual.trim() === "") {
          newErrors[`qc_${index}`] = "QC value is required"
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleItemQuantityChange = (index, value) => {
    const newItemList = [...itemList]
    const parsedValue = parseFloat(value) || 0
    newItemList[index].user_quantity = parsedValue
    setItemList(newItemList)
    
    // Clear error for this item
    if (errors[`item_${index}`]) {
      const newErrors = { ...errors }
      delete newErrors[`item_${index}`]
      setErrors(newErrors)
    }
  }

  const handleAdjustQuantity = (index, delta) => {
    const newItemList = [...itemList]
    const currentQuantity = parseFloat(newItemList[index].user_quantity) || 0
    const newQuantity = Math.max(0, currentQuantity + delta)
    
    // Don't exceed system quantity
    const systemQuantity = parseFloat(newItemList[index].system_quantity) || 0
    if (newQuantity <= systemQuantity) {
      newItemList[index].user_quantity = newQuantity
      setItemList(newItemList)
      
      // Clear error for this item
      if (errors[`item_${index}`]) {
        const newErrors = { ...errors }
        delete newErrors[`item_${index}`]
        setErrors(newErrors)
      }
    }
  }

  const handleItemRemarksChange = (index, value) => {
    const newItemList = [...itemList]
    newItemList[index].remarks = value
    setItemList(newItemList)
  }

  const handleQcValueChange = (index, value) => {
    const newQcList = [...qcList]
    newQcList[index].qc_actual = value
    setQcList(newQcList)
    
    // Clear error for this QC
    if (errors[`qc_${index}`]) {
      const newErrors = { ...errors }
      delete newErrors[`qc_${index}`]
      setErrors(newErrors)
    }
  }

  const handleQcOptionSelect = (index, value) => {
    const newQcList = [...qcList]
    newQcList[index].qc_actual = value
    setQcList(newQcList)
    
    // Clear error for this QC
    if (errors[`qc_${index}`]) {
      const newErrors = { ...errors }
      delete newErrors[`qc_${index}`]
      setErrors(newErrors)
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting")
      return
    }

    setIsSubmitting(true)
    try {
      // Prepare form data
      const formData = new FormData()
      formData.append('event_id', activity.activity_id)
      formData.append('call_mode', actionType)
      formData.append('remarks', remarks)

      // Add mode-specific data
      if (actionType === "START") {
        const itemsToSend = itemList.map(item => ({
          item_id: item.item_id,
          remarks: item.remarks,
          user_quantity: item.user_quantity
        }))
        formData.append('item_list', JSON.stringify(itemsToSend))
      }

      if (actionType === "COMPLETED" || actionType === "FAILED") {
        const qcToSend = qcList.map(qc => ({
          qc_name: qc.qc_name,
          qc_actual: qc.qc_actual
        }))
        formData.append('qc_list', JSON.stringify(qcToSend))
      }

      if (actionType === "COMPLETED" && refFile) {
        formData.append('ref_file', refFile)
      }

      await onSubmit(formData)
      
      // Reset form
      setRemarks("")
      setRefFile(null)
      setItemList([])
      setQcList([])
      setErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const isWide = actionType === "START" && itemList.length > 0

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isWide={isWide}>
        <ModalHeader>
          <ModalTitle>{title || "Activity Action"}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        {/* Remarks Section */}
        <FormGroup>
          <Label>Remarks {actionType === "COMPLETED" || actionType === "FAILED" ? "(Optional)" : ""}</Label>
          <Textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder={actionType === "COMPLETED" ? 
              "Enter completion remarks..." : 
              actionType === "FAILED" ? 
              "Enter failure reason..." : 
              "Enter any remarks for starting the activity..."}
            disabled={isSubmitting}
          />
        </FormGroup>

        {/* START Mode - Item List */}
        {actionType === "START" && itemList.length > 0 && (
          <>
            <SectionTitle>Inventory Items</SectionTitle>
            <ItemList>
              <ItemHeader>
                <div>Item Name</div>
                <div>System Qty</div>
                <div>User Qty</div>
                <div>Adjust</div>
                <div>Remarks</div>
              </ItemHeader>
              {itemList.map((item, index) => (
                <ItemRow key={item.item_id}>
                  <ItemName>{item.item_name}</ItemName>
                  <SystemQuantity>{item.system_quantity}</SystemQuantity>
                  <QuantityInput
                    type="number"
                    min="0"
                    max={item.system_quantity}
                    step="0.01"
                    value={item.user_quantity}
                    onChange={(e) => handleItemQuantityChange(index, e.target.value)}
                    disabled={isSubmitting}
                  />
                  <QuantityAdjust>
                    <AdjustButton
                      onClick={() => handleAdjustQuantity(index, -1)}
                      disabled={item.user_quantity <= 0 || isSubmitting}
                    >
                      <FaMinus />
                    </AdjustButton>
                    <AdjustButton
                      onClick={() => handleAdjustQuantity(index, 1)}
                      disabled={item.user_quantity >= item.system_quantity || isSubmitting}
                    >
                      <FaPlus />
                    </AdjustButton>
                  </QuantityAdjust>
                  <Input
                    type="text"
                    placeholder="Item remarks"
                    value={item.remarks}
                    onChange={(e) => handleItemRemarksChange(index, e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors[`item_${index}`] && (
                    <ErrorMessage style={{ gridColumn: '1 / -1', marginTop: '5px' }}>
                      {errors[`item_${index}`]}
                    </ErrorMessage>
                  )}
                </ItemRow>
              ))}
            </ItemList>
          </>
        )}

        {/* COMPLETED/FAILED Modes - QC List */}
        {(actionType === "COMPLETED" || actionType === "FAILED") && qcList.length > 0 && (
          <>
            <SectionTitle>QC Checklist</SectionTitle>
            <QCList>
              {qcList.map((qc, index) => (
                <QCItem key={index}>
                  <QCName>{qc.qc_name}</QCName>
                  {qc.qc_value === "YES/NO" ? (
                    <QCOptions>
                      <QCOption>
                        <RadioInput
                          type="radio"
                          name={`qc_${index}`}
                          value="YES"
                          checked={qc.qc_actual === "YES"}
                          onChange={() => handleQcOptionSelect(index, "YES")}
                          disabled={isSubmitting}
                        />
                        YES
                      </QCOption>
                      <QCOption>
                        <RadioInput
                          type="radio"
                          name={`qc_${index}`}
                          value="NO"
                          checked={qc.qc_actual === "NO"}
                          onChange={() => handleQcOptionSelect(index, "NO")}
                          disabled={isSubmitting}
                        />
                        NO
                      </QCOption>
                      <QCOption>
                        <RadioInput
                          type="radio"
                          name={`qc_${index}`}
                          value="NA"
                          checked={qc.qc_actual === "NA"}
                          onChange={() => handleQcOptionSelect(index, "NA")}
                          disabled={isSubmitting}
                        />
                        N/A
                      </QCOption>
                    </QCOptions>
                  ) : (
                    <QCValueInput
                      type="text"
                      placeholder={`Enter ${qc.qc_name} value (e.g., ${qc.qc_value})`}
                      value={qc.qc_actual}
                      onChange={(e) => handleQcValueChange(index, e.target.value)}
                      disabled={isSubmitting}
                    />
                  )}
                  {errors[`qc_${index}`] && (
                    <ErrorMessage>{errors[`qc_${index}`]}</ErrorMessage>
                  )}
                </QCItem>
              ))}
            </QCList>
          </>
        )}

        {/* COMPLETED Mode - File Upload */}
        {actionType === "COMPLETED" && (
          <FormGroup>
            <Label>Reference File (Optional)</Label>
            <FileInput
              type="file"
              onChange={(e) => setRefFile(e.target.files[0])}
              disabled={isSubmitting}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
          </FormGroup>
        )}

        <ButtonGroup>
          <SecondaryButton onClick={onClose} disabled={isSubmitting}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : 
              actionType === "START" ? "Start Activity" :
              actionType === "COMPLETED" ? "Mark as Completed" :
              "Mark as Failed"}
          </PrimaryButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  )
}

export default RemarksModal