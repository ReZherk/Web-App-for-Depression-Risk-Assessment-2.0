import styled from "styled-components"
import { Header } from "../organismos/Header"

export const DashboardTemplate = ({ title, children, className }) => {
 return (
  <DashboardContainer className={className}>
   <Header title={title} />
   <DashboardContent>{children}</DashboardContent>
  </DashboardContainer>
 )
}

const DashboardContainer = styled.div`
  padding: 20px;
  margin-left: 100px;
  background-color: #AFD9F6;
  min-height: 100vh;
  color: #333;
`

const DashboardContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
