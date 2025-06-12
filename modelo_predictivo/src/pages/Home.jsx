import styled from "styled-components"
import { DashboardTemplate } from "../components/templates/DashboardTemplate"
import { MoodSelector } from "../components/moleculas/MoodSelector"
import { ContentCard } from "../components/moleculas/ContentCard"
import cerebro from "../assets/cerebro.svg"

export function Home() {
  const handleMoodSelect = (moodId) => {
    console.log("Mood seleccionado:", moodId)
  }

  return (
    <DashboardTemplate title="BIENVENIDO MARIO ARMAS">
      <WelcomeMessage>¡Nos alegra acompañarte nuevamente!</WelcomeMessage>

      <MoodSelector onSelect={handleMoodSelect} />

      <ContentGrid>
        <ContentCard title="FRASE DEL DÍA">
          <p>Solo un pequeño pensamiento positivo por la mañana puede cambiar todo tu día.</p>
        </ContentCard>

        <ContentCard title="¿No sabes por dónde empezar?">
          <p>Mira este video corto y descubre cómo aprovechar al máximo UNICARE.</p>
          <VideoPlaceholder>
            <img src={cerebro || "/placeholder.svg"} alt="Video thumbnail" />
          </VideoPlaceholder>
        </ContentCard>
      </ContentGrid>
    </DashboardTemplate>
  )
}

const WelcomeMessage = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0 30px 0;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 120px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 15px;
  
  img {
    width: 40px;
    height: 40px;
    opacity: 0.5;
  }
`