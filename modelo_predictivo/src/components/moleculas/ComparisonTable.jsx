import styled from "styled-components"
import { calculatePHQ9Score } from "../../utils/phq9-score"

export function ComparisonTable({ monthlyData, months }) {
 const getComparisonData = () => {
  return months
   .filter((month) => monthlyData[month]?.completed)
   .map((month) => {
    const data = monthlyData[month]
    const aiResult = data.results
    const manualResult = calculatePHQ9Score(data.responses)

    const aiHasDepression = aiResult.result === 1
    const manualHasDepression = manualResult.score >= 10
    const matches = aiHasDepression === manualHasDepression

    return {
     month,
     aiPrediction: `${Math.round(aiResult.percentage)}% (${aiResult.interpretation?.includes("TIENE") ? "Con" : "Sin"})`,
     manualScoreFormatted: `${manualResult.score} (${manualResult.level})`,
     matches,
     aiPercentage: aiResult.percentage,
     manualScore: manualResult.score,
    }
   })
 }

 const comparisonData = getComparisonData()
 const accuracy =
  comparisonData.length > 0
   ? Math.round((comparisonData.filter((d) => d.matches).length / comparisonData.length) * 100)
   : 0

 return (
  <Container>
   <GuideSection>
    <GuideTitle>📚 INTERPRETACIÓN PHQ-9</GuideTitle>
    <GuideText>
     Puntuación Total: <strong>0-4</strong> (Mínima) | <strong>5-9</strong> (Leve) | <strong>10-14</strong>{" "}
     (Moderada) | <strong>15-19</strong> (Mod. Severa) | <strong>20-27</strong> (Severa)
    </GuideText>
   </GuideSection>

   <Table>
    <TableHeader>
     <HeaderCell>MES</HeaderCell>
     <HeaderCell>IA PREDICCIÓN</HeaderCell>
     <HeaderCell>PHQ-9 MANUAL</HeaderCell>
     <HeaderCell>DIFERENCIA</HeaderCell>
    </TableHeader>
    <TableBody>
     {comparisonData.map(({ month, aiPrediction, manualScore, matches }) => (
      <TableRow key={month}>
       <Cell>{month}</Cell>
       <Cell>{aiPrediction}</Cell>
       <Cell>{manualScore}</Cell>
       <Cell>
        <StatusBadge matches={matches}>{matches ? "✅ Coincide" : "⚠️ Difiere"}</StatusBadge>
       </Cell>
      </TableRow>
     ))}
    </TableBody>
   </Table>

   <AccuracySection>
    <AccuracyTitle>📊 PRECISIÓN DEL MODELO</AccuracyTitle>
    <AccuracyValue>
     Coincidencias: {comparisonData.filter((d) => d.matches).length}/{comparisonData.length} ({accuracy}%)
    </AccuracyValue>
   </AccuracySection>
  </Container>
 )
}

const Container = styled.div`
  width: 100%;
`

const GuideSection = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`

const GuideTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #0A3D62;
  font-size: 16px;
`

const GuideText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`

const TableHeader = styled.thead`
  background: #0A3D62;
  color: white;
`

const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:hover {
    background: #f8f9fa;
  }
`

const Cell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #333;
`

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => (props.matches ? "#d4edda" : "#fff3cd")};
  color: ${(props) => (props.matches ? "#155724" : "#856404")};
`

const AccuracySection = styled.div`
  background: #e9ecef;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
`

const AccuracyTitle = styled.h4`
  margin: 0 0 5px 0;
  color: #0A3D62;
  font-size: 16px;
`

const AccuracyValue = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
`
