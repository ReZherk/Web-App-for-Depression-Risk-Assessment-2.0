import styled from "styled-components"
import cerebro from "../../assets/cerebro.svg"

export const AuthTemplate = ({ title, subtitle, children, className }) => {
 return (
  <AuthContainer className={className}>
   <AuthCard>
    <LogoContainer>
     <Logo src={cerebro} alt="UNICARE Logo" />
     <LogoTitle>{title || "UNICARE"}</LogoTitle>
     <LogoSubtitle>{subtitle || "Tu plataforma de bienestar y salud mental"}</LogoSubtitle>
    </LogoContainer>

    {children}
   </AuthCard>

   <Footer>© 2025 UNICARE. Todos los derechos reservados.</Footer>
  </AuthContainer>
 )
}

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #AFD9F6;
  padding: 20px;
`

const AuthCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`

const LogoTitle = styled.h1`
  font-size: 24px;
  color: #0A3D62;
  margin: 0;
`

const LogoSubtitle = styled.p`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin: 5px 0 0 0;
`

const Footer = styled.footer`
  margin-top: 30px;
  color: #666;
  font-size: 12px;
`
