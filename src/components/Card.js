import styled from "styled-components"

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${(props) =>
    props.hoverable &&
    `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
  `}
  
  ${(props) =>
    props.variant === "primary" &&
    `
    border-top: 4px solid ${props.theme.colors.primary};
  `}
  
  ${(props) =>
    props.variant === "secondary" &&
    `
    border-top: 4px solid ${props.theme.colors.secondary};
  `}
  
  ${(props) =>
    props.variant === "accent" &&
    `
    border-top: 4px solid ${props.theme.colors.accent};
  `}
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
  }
`

const CardBody = styled.div``

const CardFooter = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Card = ({ title, children, footer, variant, hoverable = true, headerAction, ...props }) => {
  return (
    <CardContainer variant={variant} hoverable={hoverable} {...props}>
      {(title || headerAction) && (
        <CardHeader>
          {title && <h3>{title}</h3>}
          {headerAction}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  )
}

export default Card

