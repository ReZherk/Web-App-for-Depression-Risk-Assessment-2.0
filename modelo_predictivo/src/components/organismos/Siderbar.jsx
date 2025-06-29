import styled from "styled-components"
import { NavItem } from "../moleculas/NavItem"
import { Avatar } from "../atomos/Avatar"
import cerebro from "../../assets/cerebro.svg"
import { useUser } from "../../context/useUser"
import { useNavigate } from "react-router-dom"
import { Icon } from "../atomos/Icon"

export function Sidebar({ onLogout }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/welcome");
  }

  const navItems = [
    { to: "/home", icon: "home", label: "INICIO" },
    { to: "/perfil", icon: "user", label: "PERFIL" },
    { to: "/evaluacion", icon: "clipboard", label: "EVALUACIÓN" },
    { to: "/resultados", icon: "chart", label: "RESULTADOS" },
    { to: "/progreso", icon: "chart", label: "PROGRESO" },
  ]

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={cerebro} alt="UNICARE Logo" />
        <LogoText>UNICARE</LogoText>
      </LogoContainer>

      <UserInfo>
        <Avatar
          src="https://i.pinimg.com/236x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg"
          alt="Avatar"
          size="large"
        />
        <UserName>{user.nombre.toUpperCase()}</UserName>
      </UserInfo>

      <NavMenu>
        {navItems.map((item) => (
          <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
        ))}

        <LogoutButton onClick={handleLogout}>
          <Icon name="log-out" />
          <NavLabel>CERRAR SESION</NavLabel>
        </LogoutButton>
      </NavMenu>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  width: 100px;
  height: 100vh;
  background-color: #0A3D62;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  
  
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
`

const LogoText = styled.h1`
  font-size: 14px;
  margin: 5px 0 0 0;
  color: white;
  text-align: center;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const UserName = styled.span`
  font-size: 10px;
  color: white;
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
`

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`
const LogoutButton = styled.button`
  all: unset;/* - Elimina completamente estilos por defecto del navegador y también 
  cualquier estilo aplicado anteriormente*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  text-decoration: none;
  color: white;
  cursor: pointer;

  &:hover {
    color: #e74c3c;
  }
`;


const NavLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  margin-top: 5px;
`