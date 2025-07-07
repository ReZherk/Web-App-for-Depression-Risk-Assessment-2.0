import styled from "styled-components"

export function PredictionCard({ prediction, confidence, trend }) {
 const getTrendColor = (trend) => {
  switch (trend) {
   case "Mejorando":
    return "#28a745"
   case "Empeorando":
    return "#dc3545"
   default:
    return "#ffc107"
  }
 }

 const getTrendIcon = (trend) => {
  switch (trend) {
   case "Mejorando":
    return "📈"
   case "Empeorando":
    return "📉"
   default:
    return "📊"
  }
 }

 return (
  <Card>
   <Header>
    <Icon>🔮</Icon>
    <Title>Predicción Próximo Mes</Title>
   </Header>
   <Content>
    <PredictionValue>{prediction}</PredictionValue>
    <TrendContainer>
     <TrendBadge color={getTrendColor(trend)}>
      {getTrendIcon(trend)} {trend}
     </TrendBadge>
     <Confidence>Confianza: {confidence}</Confidence>
    </TrendContainer>
   </Content>
  </Card>
 )
}

const Card = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`

const Icon = styled.div`
  font-size: 24px;
`

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`

const Content = styled.div`
  text-align: center;
`

const PredictionValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
`

const TrendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TrendBadge = styled.span`
  background: ${(props) => props.color};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`

const Confidence = styled.span`
  font-size: 12px;
  opacity: 0.9;
`
