import styled from "styled-components"
import { Icon } from "../atomos/Icon"
import { Title } from "../atomos/Typography"

export const Header = ({ title, onMenuClick, className }) => {
 return (
  <StyledHeader className={className}>
   <MenuButton onClick={onMenuClick}>
    <Icon name="menu" size="large" />
   </MenuButton>

   {title && <PageTitle>{title}</PageTitle>}

   <NotificationButton>
    <Icon name="bell" size="large" />
   </NotificationButton>
  </StyledHeader>
 )
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0A3D62;
  padding: 5px;
`

const NotificationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0A3D62;
  padding: 5px;
`

const PageTitle = styled(Title)`
  margin: 0;
`
