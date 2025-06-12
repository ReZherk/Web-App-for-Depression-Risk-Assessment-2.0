import styled from "styled-components"
import "../../../styles/styles.css"

export const Card = ({ children, className }) => {
  return <StyledCard className={className}>{children}</StyledCard>
}

export const CardHeader = ({ children, className }) => {
  return <StyledCardHeader className={className}>{children}</StyledCardHeader>
}

export const CardContent = ({ children, className }) => {
  return <StyledCardContent className={className}>{children}</StyledCardContent>
}

export const CardFooter = ({ children, className }) => {
  return <StyledCardFooter className={className}>{children}</StyledCardFooter>
}

const StyledCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const StyledCardHeader = styled.div`
  background-color: #0A3D62;
  color: white;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
`

const StyledCardContent = styled.div`
  padding: 20px;
`

const StyledCardFooter = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
`
