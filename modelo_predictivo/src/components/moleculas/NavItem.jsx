import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"
import { Icon } from "../atomos/Icon"

export const NavItem = ({ to, icon, label, className }) => {
 const location = useLocation()  // ← Obtiene la ruta actual (ej: "/dashboard")
 const isActive = location.pathname === to  // ← Compara ruta actual con la del ítem

 return (
  <StyledNavItem $active={isActive} className={className}>
   <StyledLink to={to}>
    <Icon name={icon} />
    <NavLabel>{label}</NavLabel>
   </StyledLink>
  </StyledNavItem>
 )
}

const StyledNavItem = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.$active ? "#1E5F8C" : "transparent")};
  
  &:hover {
    background-color: #1E5F8C;
  }
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: white;
`

const NavLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  margin-top: 5px;
`
