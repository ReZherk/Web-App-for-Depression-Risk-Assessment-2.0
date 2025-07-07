import styled from "styled-components"

export function MetricCard({ icon, title, value, subtitle, color = "#0A3D62" }) {
 return (
  <Card>
   <IconContainer color={color}>{icon}</IconContainer>
   <Content>
    <Title>{title}</Title>
    <Value color={color}>{value}</Value>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
   </Content>
  </Card>
 )
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 24px;
`

const Content = styled.div`
  flex: 1;
`

const Title = styled.h4`
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`

const Value = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.color};
  margin-bottom: 2px;
`

const Subtitle = styled.div`
  font-size: 12px;
  color: #888;
`
