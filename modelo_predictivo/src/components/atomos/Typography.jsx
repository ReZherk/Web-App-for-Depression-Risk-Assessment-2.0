import styled from "styled-components"

export const Title = ({ children, level = 1, color, className }) => {
 const Tag = `h${level}`
 return (
  <StyledTitle as={Tag} color={color} className={className}>
   {children}
  </StyledTitle>
 )
}

export const Text = ({ children, size = "medium", color, weight, className }) => {
 return (
  <StyledText size={size} color={color} weight={weight} className={className}>
   {children}
  </StyledText>
 )
}

const StyledTitle = styled.h1`
  color: ${(props) => props.color || "#0A3D62"};
  margin: 0 0 10px 0;
  
  ${(props) =>
  props.as === "h1" &&
  `
    font-size: 24px;
    font-weight: 700;
  `}
  
  ${(props) =>
  props.as === "h2" &&
  `
    font-size: 20px;
    font-weight: 600;
  `}
  
  ${(props) =>
  props.as === "h3" &&
  `
    font-size: 18px;
    font-weight: 600;
  `}
  
  ${(props) =>
  props.as === "h4" &&
  `
    font-size: 16px;
    font-weight: 600;
  `}
  
  ${(props) =>
  props.as === "h5" &&
  `
    font-size: 14px;
    font-weight: 600;
  `}
  
  ${(props) =>
  props.as === "h6" &&
  `
    font-size: 12px;
    font-weight: 600;
  `}
`

const StyledText = styled.p`
  color: ${(props) => props.color || "#333"};
  margin: 0;
  font-weight: ${(props) => props.weight || "normal"};
  
  ${(props) =>
  props.size === "small" &&
  `
    font-size: 12px;
  `}
  
  ${(props) =>
  props.size === "medium" &&
  `
    font-size: 14px;
  `}
  
  ${(props) =>
  props.size === "large" &&
  `
    font-size: 16px;
  `}
`