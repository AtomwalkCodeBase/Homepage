import styled, { css } from "styled-components"

const ButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.size === "sm" ? "0.5rem 1rem" : props.size === "lg" ? "0.75rem 1.5rem" : "0.625rem 1.25rem")};
  font-size: ${(props) => (props.size === "sm" ? "0.875rem" : props.size === "lg" ? "1.125rem" : "1rem")};
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  
  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}
  
  ${(props) =>
    props.variant === "primary" &&
    `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.primary}dd;
    }
    
    &:active {
      background: ${props.theme.colors.primary}ee;
    }
  `}
  
  ${(props) =>
    props.variant === "secondary" &&
    `
    background: ${props.theme.colors.secondary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.secondary}dd;
    }
    
    &:active {
      background: ${props.theme.colors.secondary}ee;
    }
  `}
  
  ${(props) =>
    props.variant === "outline" &&
    `
    background: transparent;
    color: ${props.theme.colors.primary};
    border: 1px solid ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primaryLight};
    }
    
    &:active {
      background: ${props.theme.colors.primaryLight}aa;
    }
  `}
   ${(props) =>
    props.variant === "outlines" &&
    `
    background: transparent;
    color: ${props.theme.colors.error};
    border: 1px solid ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primaryLight};
    }
    
    &:active {
      background: ${props.theme.colors.primaryLight}aa;
    }
  `}
  
  ${(props) =>
    props.variant === "ghost" &&
    `
    background: transparent;
    color: ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primaryLight};
    }
    
    &:active {
      background: ${props.theme.colors.primaryLight}aa;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${(props) => (props.iconOnly ? "0" : "0.5rem")};
  }
`

const StyledButton = styled.button`
  ${ButtonStyles}
`

const StyledLink = styled.a`
  ${ButtonStyles}
  text-decoration: none;
`

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconOnly = false,
  as = "button",
  ...props
}) => {
  if (as === "a") {
    return (
      <StyledLink variant={variant} size={size} fullWidth={fullWidth} iconOnly={iconOnly} {...props}>
        {children}
      </StyledLink>
    )
  }

  return (
    <StyledButton variant={variant} size={size} fullWidth={fullWidth} iconOnly={iconOnly} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button

