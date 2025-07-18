import styled from "styled-components"
import { Title } from "../atomos/Typography"
import { HeaderWithNotification } from '../moleculas/HeaderWithNotification'

export const Header = ({ title, onMenuClick, className }) => {
  return (
    <StyledHeader className={className}>
      <MenuButton onClick={onMenuClick}>

      </MenuButton>

      {title && <PageTitle>{title}</PageTitle>}

      <HeaderWithNotification />
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

const PageTitle = styled(Title)`
  margin: 0;
`
