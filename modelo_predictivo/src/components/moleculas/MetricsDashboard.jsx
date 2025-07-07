import styled from "styled-components"
import { MetricCard } from "../atomos/MetricCard"
import { PredictionCard } from "../atomos/PredictionCard"

export function MetricsDashboard({ progressData, prediction }) {
 const { totalEvaluations, averagePercentage, bestMonth, worstMonth, riskDistribution } = progressData

 return (
  <Container>
   <MetricsGrid>
    <MetricCard
     icon="📊"
     title="Evaluaciones Completadas"
     value={`${totalEvaluations}/12`}
     subtitle="Este año"
     color="#0A3D62"
    />

    <MetricCard
     icon="⭐"
     title="Promedio General"
     value={`${averagePercentage}%`}
     subtitle="Nivel de riesgo"
     color="#17a2b8"
    />

    <MetricCard
     icon="🎯"
     title="Mejor Mes"
     value={bestMonth ? `${bestMonth.month}` : "N/A"}
     subtitle={bestMonth ? `${Math.round(bestMonth.percentage)}%` : "Sin datos"}
     color="#28a745"
    />

    <MetricCard
     icon="⚠️"
     title="Peor Mes"
     value={worstMonth ? `${worstMonth.month}` : "N/A"}
     subtitle={worstMonth ? `${Math.round(worstMonth.percentage)}%` : "Sin datos"}
     color="#dc3545"
    />
   </MetricsGrid>

   <PredictionSection>
    <PredictionCard {...prediction} />
   </PredictionSection>

   <RiskDistribution>
    <RiskTitle>📈 Distribución de Riesgo</RiskTitle>
    <RiskBars>
     <RiskBar>
      <RiskLabel>🟢 Bajo Riesgo</RiskLabel>
      <RiskValue>{riskDistribution.low} meses</RiskValue>
     </RiskBar>
     <RiskBar>
      <RiskLabel>🟡 Riesgo Moderado</RiskLabel>
      <RiskValue>{riskDistribution.medium} meses</RiskValue>
     </RiskBar>
     <RiskBar>
      <RiskLabel>🔴 Alto Riesgo</RiskLabel>
      <RiskValue>{riskDistribution.high} meses</RiskValue>
     </RiskBar>
    </RiskBars>
   </RiskDistribution>
  </Container>
 )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`

const PredictionSection = styled.div`
  max-width: 400px;
`

const RiskDistribution = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const RiskTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #0A3D62;
  font-size: 18px;
`

const RiskBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const RiskBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
`

const RiskLabel = styled.span`
  font-size: 14px;
  color: #333;
`

const RiskValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A3D62;
`
