import styled from "styled-components"
import { DashboardTemplate } from "../components/templates/DashboardTemplate"
import { MoodSelector } from "../components/moleculas/MoodSelector"
import { ContentCard } from "../components/moleculas/ContentCard"
import { useUser } from "../context/useUser"
import { useState, useEffect } from 'react'
import Phrases from '../data/Phrases.json'



export function Home() {
  const [reproducir, setReproducir] = useState(false);
  const [fraseDelDia, setFraseDelDia] = useState('');
  const [mood, setMood] = useState(0)
  const { user } = useUser()

  const handleMoodSelect = (moodId) => {
    setMood(moodId)
    console.log("Mood seleccionado:", moodId)

  }

  const moodMap = {
    0: "Predeterminado",
    1: "emocionado",
    2: "alegre",
    3: "relajado",
    4: "pensativo",
    5: "preocupado",
    6: "triste",
    7: "aburrido",
    8: "enojado"
  };

  useEffect(() => {
    const moodKey = moodMap[mood];
    const phrases = Phrases[moodKey];

    if (phrases && phrases.length > 0) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setFraseDelDia(randomPhrase); // <- aquí se guarda
    } else {
      setFraseDelDia(Phrases["Predeterminado"]?.[0] || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  return (
    <DashboardTemplate title={`BIENVENIDO ${user.nombre.toUpperCase()}`}>
      <WelcomeMessage>¡Nos alegra acompañarte nuevamente!</WelcomeMessage>

      <MoodSelector onSelect={handleMoodSelect} />

      <ContentGrid>
        <ContentCard title="FRASE DEL DÍA">
          <p>{fraseDelDia}</p>
        </ContentCard>
        <ContentCard title="¿No sabes por dónde empezar?">
          <p>Mira este video corto y descubre cómo aprovechar al máximo UNICARE.</p>
          <VideoPlaceholder>
            {reproducir ? (
              <iframe
                src="https://www.youtube.com/embed/wDqArJu1Rbs?autoplay=1"
                title="YouTube"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <img
                src="https://img.youtube.com/vi/wDqArJu1Rbs/hqdefault.jpg"
                alt="Miniatura del video"
                onClick={() => setReproducir(true)}
                style={{ cursor: "pointer", width: "100%" }}
              />
            )}
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
  width: 55%; /* ¡Aquí reducimos el tamaño! */
  aspect-ratio: 16 / 9;
  margin: 15px auto 0 auto;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 15px;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;