
import styled from "styled-components"

export const Button = ({ children, variant = "primary", type = "button", onClick, disabled, className }) => {
  return (
    <StyledButton type={type} $variant={variant} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  border-radius: 5px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  //El elemento no debe tener borde.
  border: none;
  
  /* Variantes de botón */
  ${(props) =>
    props.$variant === "primary" &&
    `
    background-color: #0A3D62;
    color: white;
    
    &:hover {
      background-color: #0c4d7a;
    }
  `}
  
  ${(props) =>
    props.$variant === "secondary" &&
    `
    background-color: transparent;
    color: #0A3D62;
    border: 1px solid #0A3D62;
    
    &:hover {
      background-color: #f0f8ff;
    }
  `}
  
  ${(props) =>
    props.$variant === "text" &&
    `
    background-color: transparent;
    color: #0A3D62;
    padding: 8px 12px;
    
    &:hover {
      text-decoration: underline;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
