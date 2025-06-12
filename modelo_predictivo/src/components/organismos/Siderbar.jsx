import styled from "styled-components"
import { NavItem } from "../moleculas/NavItem"
import { Avatar } from "../atomos/Avatar"
import cerebro from "../../assets/cerebro.svg"

export function Sidebar() {
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
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e0OrIjAJrfy8IWMdYlsb2LupD2Egw6.png"
          alt="Avatar"
          size="large"
        />
        <UserName>MARIO ARMAS</UserName>
      </UserInfo>

      <NavMenu>
        {navItems.map((item) => (
          <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
        ))}
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
