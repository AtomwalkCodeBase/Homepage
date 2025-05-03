import styled from "styled-components"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const StatsCardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  
  ${(props) =>
    props.color === "primary" &&
    `
    background: ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primary};
  `}
  
  ${(props) =>
    props.color === "secondary" &&
    `
    background: ${props.theme.colors.secondaryLight};
    color: ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.color === "accent" &&
    `
    background: ${props.theme.colors.accentLight};
    color: ${props.theme.colors.accent};
  `}
  
  ${(props) =>
    props.color === "success" &&
    `
    background: ${props.theme.colors.success}22;
    color: ${props.theme.colors.success};
  `}
  
  ${(props) =>
    props.color === "warning" &&
    `
    background: ${props.theme.colors.warning}22;
    color: ${props.theme.colors.warning};
  `}
  
  ${(props) =>
    props.color === "error" &&
    `
    background: ${props.theme.colors.error}22;
    color: ${props.theme.colors.error};
  `}
`

const StatsContent = styled.div`
  flex: 1;
`

const StatsValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const StatsLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`

const StatsChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  
  ${(props) =>
    props.type === "increase" &&
    `
    color: ${props.theme.colors.success};
  `}
  
  ${(props) =>
    props.type === "decrease" &&
    `
    color: ${props.theme.colors.error};
  `}
  
  svg {
    margin-right: 0.25rem;
  }
`

const StatsCard = ({ icon, label, value, change, changeType = "increase", color = "primary" }) => {
  return (
    <StatsCardContainer>
      <IconContainer color={color}>{icon}</IconContainer>
      <StatsContent>
        <StatsLabel>{label}</StatsLabel>
        <StatsValue>{value}</StatsValue>
        {change && (
          <StatsChange type={changeType}>
            {changeType === "increase" ? <FaArrowUp /> : <FaArrowDown />}
            {change}
          </StatsChange>
        )}
      </StatsContent>
    </StatsCardContainer>
  )
}

export default StatsCard

