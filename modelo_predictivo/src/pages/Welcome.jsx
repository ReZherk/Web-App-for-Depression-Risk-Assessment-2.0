import { AuthTemplate } from "../components/templates/AuthTemplate"
import { Button } from "../components/atomos/Button"
import { Text } from "../components/atomos/Typography"
import styled from "styled-components"
import { Link } from "react-router-dom"

export function Welcome() {
  return (
    <AuthTemplate title="Bienvenido a UNICARE">
      <WelcomeText>
        UNICARE te ayuda a monitorear y mejorar tu bienestar emocional durante tu vida universitaria.
      </WelcomeText>

      <StartButton as={Link} to="/login">
        INICIAR
      </StartButton>
    </AuthTemplate>
  )
}

const WelcomeText = styled(Text)`
  text-align: center;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 30px;
`

const StartButton = styled(Button)`
  display: block;
  width: fit-content;
  background-color: #0A3D62;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  margin: 0 auto;
  padding: 12px 40px;
  font-size: 16px;
`
