import styled from "styled-components"
import { MonthlyEvaluationItem } from "../components/organismos/MonthlyEvaluationItem"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react";
import { useUser } from '../context/useUser'
import { useFetchEvaluations } from '../hooks/useFetchEvaluations'
import { useNotification } from '../context/useNotification'
import { HeaderWithNotification } from '../components/moleculas/HeaderWithNotification'

export function Evaluation() {

  const { setHasNewEvaluation } = useNotification();
  const { user } = useUser();
  const navigate = useNavigate();

  //useMemo:Esto hace que React memorice la referencia de ese array, manteniéndola estable durante toda la vida del componente.
  const months = useMemo(() => [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ], []);

  const questionSaved = useFetchEvaluations(user.username, months);

  const handleSave = async (month, answers) => {

    const formData = {
      username: user.username,
      month: month,
      responses: answers
    }
    const res = await fetch('http://localhost:5000/api/evaluation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    console.log("Respuesta del servidor:", res)
    if (res.ok) {
      setHasNewEvaluation(true);
      alert("Datos guardados exitosamente");
      navigate('/home');
    } else {
      alert("Error:No se guardo el cuestionario");
    }
  }

  return (
    <EvaluationContainer>
      <HeaderWithNotification />
      <PageTitle>EVALUACIÓN</PageTitle>

      <ContentCard>
        <CardTitle>Evaluación de Bienestar</CardTitle>
        <CardContent>
          <p>Aquí encontrarás diferentes evaluaciones para medir tu bienestar emocional.</p>

          <EvaluationList>
            {months.map((month) => (
              <MonthlyEvaluationItem
                key={month}
                month={month}
                onSave={handleSave}
                saved={questionSaved[month]?.completed}

              />
            ))}

          </EvaluationList>
        </CardContent>
      </ContentCard>
    </EvaluationContainer>
  )
}

const EvaluationContainer = styled.div`
  padding: 20px;
  margin-left: 100px;
  background-color: #AFD9F6;
  min-height: 100vh;
  color: #333;
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

const EvaluationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`


