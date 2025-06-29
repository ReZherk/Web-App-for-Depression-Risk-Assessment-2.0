import styled from "styled-components";
import { Card, CardHeader, CardContent } from "../atomos/Card";


export const ContentCard = ({ title, children, className }) => {
  return (
    <StyledContentCard className={className}>
      <StyledCardHeader>{title}</StyledCardHeader>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledContentCard>
  )
}


const StyledContentCard = styled(Card)`
  height: 100%;
`

const StyledCardHeader = styled(CardHeader)`
  background-color: #0A3D62;
  color: white;
`

const StyledCardContent = styled(CardContent)`
 padding: 15px;
`