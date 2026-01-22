"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import { FaTimes, FaChevronRight, FaChevronLeft, FaCheckCircle, FaCalendar } from "react-icons/fa"
import { getCategoryList, getProcessList, getUserList, processSampleData } from "../../services/productServices"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.card};
`

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const ModalBody = styled.div`
  padding: 24px;
`

const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  justify-content: center;
`

const Step = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active, completed, theme }) => {
        if (completed) return theme.colors.success
        if (active) return theme.colors.primary
        return theme.colors.border
    }};
  transition: all ${({ theme }) => theme.transitions.fast};
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const Select = styled.select`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  background: white;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
`

const ProcessItem = styled.div`
  padding: 12px;
  border: 2px solid ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  cursor: pointer;
  background: ${({ selected, theme }) => (selected ? theme.colors.primaryLight : "white")};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  .name {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  .names {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 4px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  .days {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.textLight};
  }
`

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.colors.card};
  justify-content: flex-end;
`

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(108, 99, 255, 0.3);
  }
`

const SecondaryButton = styled(Button)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.border};
  }
`

const SampleInfo = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const DateInput = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  background: white;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`

const AllocationModal = ({ sample, isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState(1)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [processes, setProcesses] = useState([])
    const [selectedProcesses, setSelectedProcesses] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentProcessIndex, setCurrentProcessIndex] = useState(0)
    const [processAllocations, setProcessAllocations] = useState({})

    useEffect(() => {
        if (isOpen) {
            loadCategories()
        }
    }, [isOpen])

    useEffect(() => {
        if (selectedCategory) {
            loadProcesses(selectedCategory)
        }
    }, [selectedCategory])

    const loadCategories = async () => {
        try {
            const response = await getCategoryList()
            if (response) {
                setCategories(response.data)
            }
        } catch (error) {
            console.error("[v0] Error loading categories:", error)
            toast.error("Failed to load categories")
        }
    }

    const loadProcesses = async (categoryId) => {
        try {
            const response = await getProcessList(categoryId)
            if (response) {
                setProcesses(response.data)
                setSelectedProcesses([])
            }
        } catch (error) {
            console.error("[v0] Error loading processes:", error)
            toast.error("Failed to load processes")
        }
    }

    const loadUsers = async () => {
        try {
            const response = await getUserList()
            if (response) {
                setUsers(response.data)
            }
        } catch (error) {
            console.error("[v0] Error loading users:", error)
            toast.error("Failed to load users")
        }
    }

    const handleProcessToggle = (process) => {
        setSelectedProcesses((prev) =>
            prev.some((p) => p.process_id === process.process_id)
                ? prev.filter((p) => p.process_id !== process.process_id)
                : [...prev, process],
        )
    }

    const handleNext = async () => {
        if (step === 1) {
            if (!selectedCategory) {
                toast.error("Please select a category")
                return
            }
            setStep(2)
        } else if (step === 2) {
            if (selectedProcesses.length === 0) {
                toast.error("Please select at least one process")
                return
            }
            await loadUsers()
            setCurrentProcessIndex(0)
            setStep(3)
        }
    }

    const handleProcessAllocation = (processId, userId, startDate) => {
        if (!userId || !startDate) {
            toast.error("Please select both user and start date")
            return
        }
        setProcessAllocations((prev) => ({
            ...prev,
            [processId]: { userId, startDate },
        }))

        if (currentProcessIndex < selectedProcesses.length - 1) {
            setCurrentProcessIndex((prev) => prev + 1)
        } else {
            setStep(4)
        }
    }

    const handleSubmit = async () => {
        if (Object.keys(processAllocations).length !== selectedProcesses.length) {
            toast.error("Please allocate all selected processes")
            return
        }

        try {
            setLoading(true)

            const process_list = selectedProcesses.map((process) => {
                const allocation = processAllocations[process.process_id]
                const user = users.find((u) => u.id === Number.parseInt(allocation.userId))
                return {
                    process_alias: process.process_alias,
                    by_user: user.user_name,
                    start_date: allocation.startDate,
                }
            })

            const formData = new FormData()
            formData.append("s_item_id", sample.s_item_id)
            formData.append("call_mode", "ALLOCATE")
            formData.append("by_user", users[0]?.user_name || "ASHUTOSH@LEM_002")
            formData.append("process_list", JSON.stringify(process_list))

            console.log("[v0] FormData payload:", {
                s_item_id: sample.s_item_id,
                call_mode: "ALLOCATE",
                by_user: users[0]?.user_name,
                process_list: process_list,
            })

            const response = await processSampleData(formData)
            if (response) {
                onSuccess()
            }
        } catch (error) {
            console.error("[v0] Error allocating sample:", error)
            toast.error("Failed to allocate sample")
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        if (step === 3) {
            if (currentProcessIndex > 0) {
                setCurrentProcessIndex((prev) => prev - 1)
            } else {
                setStep(2)
            }
        } else if (step === 4) {
            setStep(3)
            setCurrentProcessIndex(selectedProcesses.length - 1)
        } else {
            setStep(step - 1)
        }
    }

    if (!isOpen) return null

    const currentProcess = selectedProcesses[currentProcessIndex]
    const currentAllocation = currentProcess ? processAllocations[currentProcess.process_id] : null

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Allocate Activity</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <SampleInfo>
                        <strong>Sample:</strong> {sample.s_item_id} | <strong>Customer:</strong> {sample.customer_name}
                    </SampleInfo>

                    <StepIndicator>
                        <Step active={step === 1} completed={step > 1} />
                        <Step active={step === 2} completed={step > 2} />
                        <Step active={step === 3 || step === 4} completed={false} />
                    </StepIndicator>

                    {step === 1 && (
                        <FormSection>
                            <h3 style={{ marginTop: 0 }}>Select Category</h3>
                            <FormGroup>
                                <Select value={selectedCategory || ""} onChange={(e) => setSelectedCategory(e.target.value)}>
                                    <option value="">Choose a category...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>
                        </FormSection>
                    )}

                    {step === 2 && (
                        <FormSection>
                            <h3 style={{ marginTop: 0 }}>Select Process(es)</h3>
                            <ProcessGrid>
                                {processes.map((process) => (
                                    <ProcessItem
                                        key={process.process_id}
                                        selected={selectedProcesses.some((p) => p.process_id === process.process_id)}
                                        onClick={() => handleProcessToggle(process)}
                                    >
                                        <div className="names">{process.process_name}</div>
                                        <div className="name">{process.process_alias}</div>
                                        <div className="days">{process.planned_days} days</div>
                                        {selectedProcesses.some((p) => p.process_id === process.process_id) && (
                                            <div style={{ marginTop: "8px", color: "#4CAF50", fontSize: "18px" }}>
                                                <FaCheckCircle />
                                            </div>
                                        )}
                                    </ProcessItem>
                                ))}
                            </ProcessGrid>
                        </FormSection>
                    )}

                    {step === 3 && currentProcess && (
                        <FormSection>
                            <h3 style={{ marginTop: 0 }}>
                                Allocate Process {currentProcessIndex + 1} of {selectedProcesses.length}
                            </h3>
                            <div style={{ background: "#F0F2F5", padding: "12px", borderRadius: "8px", marginBottom: "16px", color: "#333" }}>
                                <strong>Process:</strong> {currentProcess.process_alias} ({currentProcess.planned_days} days planned)
                            </div>

                            <FormGroup>
                                <Label>Assign User</Label>
                                <Select
                                    value={currentAllocation?.userId || ""}
                                    onChange={(e) => {
                                        const userId = e.target.value
                                        setProcessAllocations((prev) => ({
                                            ...prev,
                                            [currentProcess.process_id]: {
                                                ...prev[currentProcess.process_id],
                                                userId,
                                            },
                                        }))
                                    }}
                                >
                                    <option value="">Choose a user...</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.user_nick_name || user.user_name}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>

                            <FormGroup>
                                <Label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FaCalendar /> Start Date (dd-mm-yyyy)
                                </Label>
                                <DateInput
                                    type="date"
                                    value={
                                        currentAllocation?.startDate
                                            ? (() => {
                                                const [d, m, y] = currentAllocation.startDate.split("-")
                                                return `${y}-${m}-${d}`
                                            })()
                                            : ""
                                    }
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            const [y, m, d] = e.target.value.split("-")
                                            const ddmmyyyy = `${d}-${m}-${y}`
                                            setProcessAllocations((prev) => ({
                                                ...prev,
                                                [currentProcess.process_id]: {
                                                    ...prev[currentProcess.process_id],
                                                    startDate: ddmmyyyy,
                                                },
                                            }))
                                        }
                                    }}
                                />
                            </FormGroup>

                            <div style={{ marginTop: "16px" }}>
                                <PrimaryButton
                                    onClick={() =>
                                        handleProcessAllocation(
                                            currentProcess.process_id,
                                            currentAllocation?.userId,
                                            currentAllocation?.startDate,
                                        )
                                    }
                                    disabled={!currentAllocation?.userId || !currentAllocation?.startDate}
                                >
                                    {currentProcessIndex < selectedProcesses.length - 1 ? "Next Process" : "Review Allocation"}
                                    <FaChevronRight />
                                </PrimaryButton>
                            </div>
                        </FormSection>
                    )}

                    {step === 4 && (
                        <FormSection>
                            <h3 style={{ marginTop: 0 }}>Review Allocation</h3>
                            <div
                                style={{
                                    background: "#F0F2F5",
                                    padding: "16px",
                                    borderRadius: "8px",
                                    gap: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "#333",
                                }}
                            >
                                {selectedProcesses.map((process, index) => {
                                    const allocation = processAllocations[process.process_id]
                                    const user = users.find((u) => u.id === Number.parseInt(allocation?.userId))
                                    return (
                                        <div
                                            key={process.process_id}
                                            style={{ padding: "8px", background: "white", borderRadius: "4px", fontSize: "14px" }}
                                        >
                                            <strong>
                                                {index + 1}. {process.process_name} ({process.process_alias})
                                            </strong>
                                            <div>User: {user?.user_nick_name || user?.user_name}</div>
                                            <div>Start Date: {allocation?.startDate}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </FormSection>
                    )}
                </ModalBody>

                <ModalFooter>
                    {(step > 1 || (step === 3 && currentProcessIndex > 0)) && (
                        <SecondaryButton onClick={handleBack}>
                            <FaChevronLeft /> Back
                        </SecondaryButton>
                    )}
                    {step < 4 ? (
                        <PrimaryButton onClick={handleNext}>
                            Next <FaChevronRight />
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={handleSubmit} disabled={loading}>
                            {loading ? "Allocating..." : "Allocate"}
                            {!loading && <FaCheckCircle />}
                        </PrimaryButton>
                    )}
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    )
}

export default AllocationModal
