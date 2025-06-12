import styled from "styled-components"
import { FaBars, FaBell } from "react-icons/fa"

export function Results() {
 return (
  <ResultsContainer>
   <Header>
    <MenuButton>
     <FaBars />
    </MenuButton>
    <NotificationButton>
     <FaBell />
    </NotificationButton>
   </Header>

   <PageTitle>RESULTADOS</PageTitle>

   <ContentCard>
    <CardTitle>Resultados de Evaluaciones</CardTitle>
    <CardContent>
     <p>Aquí puedes ver los resultados de tus evaluaciones recientes.</p>

     <ResultsList>
      <ResultItem>
       <ResultHeader>
        <ResultTitle>Test de Ansiedad</ResultTitle>
        <ResultDate>15/05/2025</ResultDate>
       </ResultHeader>
       <ResultScore>
        <ScoreLabel>Puntuación:</ScoreLabel>
        <ScoreValue>28/50</ScoreValue>
       </ResultScore>
       <ResultDescription>
        Tu nivel de ansiedad es moderado. Recomendamos técnicas de respiración y meditación.
       </ResultDescription>
       <ViewDetailsButton>Ver Detalles</ViewDetailsButton>
      </ResultItem>

      <ResultItem>
       <ResultHeader>
        <ResultTitle>Test de Estrés</ResultTitle>
        <ResultDate>10/05/2025</ResultDate>
       </ResultHeader>
       <ResultScore>
        <ScoreLabel>Puntuación:</ScoreLabel>
        <ScoreValue>15/40</ScoreValue>
       </ResultScore>
       <ResultDescription>
        Tu nivel de estrés es bajo. Continúa con tus actividades habituales.
       </ResultDescription>
       <ViewDetailsButton>Ver Detalles</ViewDetailsButton>
      </ResultItem>

      <ResultItem>
       <ResultHeader>
        <ResultTitle>Evaluación de Bienestar General</ResultTitle>
        <ResultDate>01/05/2025</ResultDate>
       </ResultHeader>
       <ResultScore>
        <ScoreLabel>Puntuación:</ScoreLabel>
        <ScoreValue>75/100</ScoreValue>
       </ResultScore>
       <ResultDescription>
        Tu bienestar general es bueno. Recomendamos mantener hábitos saludables.
       </ResultDescription>
       <ViewDetailsButton>Ver Detalles</ViewDetailsButton>
      </ResultItem>
     </ResultsList>
    </CardContent>
   </ContentCard>
  </ResultsContainer>
 )
}

const ResultsContainer = styled.div`
  padding: 20px;
  margin-left: 100px;
  background-color: #AFD9F6;
  min-height: 100vh;
  color: #333;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0A3D62;
`

const NotificationButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0A3D62;
`

const PageTitle = styled.h1`
  font-size: 24px;
  color: #0A3D62;
  margin-bottom: 30px;
`

const ContentCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.div`
  background-color: #0A3D62;
  color: white;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
`

const CardContent = styled.div`
  padding: 20px;
  
  p {
    margin: 0 0 20px 0;
    font-size: 14px;
    color: #555;
  }
`

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ResultItem = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const ResultTitle = styled.h3`
  font-size: 16px;
  color: #0A3D62;
  margin: 0;
`

const ResultDate = styled.span`
  font-size: 12px;
  color: #888;
`

const ResultScore = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const ScoreLabel = styled.span`
  font-size: 14px;
  color: #555;
  margin-right: 5px;
`

const ScoreValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A3D62;
`

const ResultDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
`

const ViewDetailsButton = styled.button`
  background-color: transparent;
  color: #0A3D62;
  border: 1px solid #0A3D62;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f8ff;
  }
`
