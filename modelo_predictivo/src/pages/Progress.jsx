"use client"

import styled from "styled-components"
import { FaBars, FaBell } from "react-icons/fa"
import { useMemo, useState } from "react"
import { useUser } from "../context/useUser"
import { useFetchEvaluations } from "../hooks/useFetchEvaluations"
import { MetricsDashboard } from "../components/moleculas/MetricsDashboard"
import { ComparisonModal } from "../components/organismos/ComparisonModal"
import { analyzeProgress } from "../utils/phq9-analysis"
import { predictNextMonth } from '../utils/phq9-prediction'

export function Progress() {
  const { user } = useUser()
  const [showComparison, setShowComparison] = useState(false)

  const months = useMemo(
    () => [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    [],
  )

  const questionSaved = useFetchEvaluations(user.username, months)

  // Calcular métricas de progreso
  const progressData = useMemo(() => {
    return analyzeProgress(questionSaved)
  }, [questionSaved])

  // Calcular predicción próximo mes
  const prediction = useMemo(() => {
    return predictNextMonth(questionSaved)
  }, [questionSaved])

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

      <MainContent>
        <MetricsDashboard progressData={progressData} prediction={prediction} />

        <ActionsSection>
          <ComparisonButton onClick={() => setShowComparison(true)}>🔍 Comparar IA vs Manual</ComparisonButton>
        </ActionsSection>
      </MainContent>

      <ComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        monthlyData={questionSaved}
        months={months}
      />
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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const ActionsSection = styled.div`
  display: flex;
  justify-content: center;
`

const ComparisonButton = styled.button`
  background: linear-gradient(135deg, #0A3D62 0%, #1e5f8b 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(10, 61, 98, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(10, 61, 98, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`
