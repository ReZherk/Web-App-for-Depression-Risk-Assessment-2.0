import styled from "styled-components"
import { FaBars, FaBell } from "react-icons/fa"

export function Progress() {
 return (
  <ProgressContainer>
   <Header>
    <MenuButton>
     <FaBars />
    </MenuButton>
    <NotificationButton>
     <FaBell />
    </NotificationButton>
   </Header>

   <PageTitle>PROGRESO</PageTitle>

   <ContentGrid>
    <ContentCard>
     <CardTitle>Progreso de Bienestar</CardTitle>
     <CardContent>
      <ChartPlaceholder>
       <p>Gráfico de progreso de bienestar</p>
      </ChartPlaceholder>
      <ChartDescription>Tu bienestar ha mejorado un 15% en los últimos 30 días.</ChartDescription>
     </CardContent>
    </ContentCard>

    <ContentCard>
     <CardTitle>Registro de Emociones</CardTitle>
     <CardContent>
      <ChartPlaceholder>
       <p>Gráfico de emociones registradas</p>
      </ChartPlaceholder>
      <ChartDescription>Has registrado principalmente emociones positivas en la última semana.</ChartDescription>
     </CardContent>
    </ContentCard>

    <ContentCard>
     <CardTitle>Objetivos de Bienestar</CardTitle>
     <CardContent>
      <GoalsList>
       <GoalItem completed={true}>
        <GoalCheckbox checked={true} readOnly />
        <GoalText>Completar evaluación inicial</GoalText>
       </GoalItem>
       <GoalItem completed={true}>
        <GoalCheckbox checked={true} readOnly />
        <GoalText>Registrar emociones por 7 días consecutivos</GoalText>
       </GoalItem>
       <GoalItem completed={false}>
        <GoalCheckbox checked={false} readOnly />
        <GoalText>Completar módulo de manejo de estrés</GoalText>
       </GoalItem>
       <GoalItem completed={false}>
        <GoalCheckbox checked={false} readOnly />
        <GoalText>Participar en una sesión de grupo</GoalText>
       </GoalItem>
      </GoalsList>
     </CardContent>
    </ContentCard>

    <ContentCard>
     <CardTitle>Recomendaciones</CardTitle>
     <CardContent>
      <RecommendationsList>
       <RecommendationItem>
        <RecommendationTitle>Técnicas de respiración</RecommendationTitle>
        <RecommendationDescription>
         Practica ejercicios de respiración profunda durante 5 minutos al día.
        </RecommendationDescription>
       </RecommendationItem>
       <RecommendationItem>
        <RecommendationTitle>Actividad física</RecommendationTitle>
        <RecommendationDescription>
         Realiza al menos 30 minutos de actividad física moderada 3 veces por semana.
        </RecommendationDescription>
       </RecommendationItem>
       <RecommendationItem>
        <RecommendationTitle>Descanso</RecommendationTitle>
        <RecommendationDescription>
         Procura dormir entre 7-8 horas diarias para mejorar tu bienestar.
        </RecommendationDescription>
       </RecommendationItem>
      </RecommendationsList>
     </CardContent>
    </ContentCard>
   </ContentGrid>
  </ProgressContainer>
 )
}

const ProgressContainer = styled.div`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
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
  font-size: 16px;
  font-weight: 600;
`

const CardContent = styled.div`
  padding: 20px;
`

const ChartPlaceholder = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  
  p {
    color: #888;
    font-size: 14px;
  }
`

const ChartDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const GoalItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${(props) => (props.completed ? 1 : 0.7)};
`

const GoalCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  accent-color: #0A3D62;
`

const GoalText = styled.span`
  font-size: 14px;
  color: #555;
`

const RecommendationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const RecommendationItem = styled.div`
  border-left: 3px solid #0A3D62;
  padding-left: 10px;
`

const RecommendationTitle = styled.h4`
  font-size: 14px;
  color: #0A3D62;
  margin: 0 0 5px 0;
`

const RecommendationDescription = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`
