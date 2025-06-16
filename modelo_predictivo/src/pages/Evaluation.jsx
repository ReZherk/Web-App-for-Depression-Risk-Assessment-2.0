import styled from "styled-components"
import { FaBars, FaBell } from "react-icons/fa"
import { MonthlyEvaluationItem } from "../components/organismos/MonthlyEvaluationItem"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Evaluation() {
  const navigate = useNavigate();

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const [savedEvaluations, setSavedEvaluations] = useState({})
  const updateSaves = (month, answers) => {
    setSavedEvaluations((prev) => {
      const updatedEvaluations = {
        ...prev,
        [month]: { completed: true, responses: answers }
      };

      console.log(updatedEvaluations); // Ahora muestra la versión actualizada

      return updatedEvaluations;
    });
    handleSave(month, answers)
  };

  const handleSave = async (month, answers) => {

    const formData = {
      username: "testuser",
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
      alert("Datos guardados exitosamente");
      navigate('/home');
    } else {
      alert("Error:No se guardo el cuestionario");
    }
  }

  return (
    <EvaluationContainer>
      <Header>
        <MenuButton>
          <FaBars />
        </MenuButton>
        <NotificationButton>
          <FaBell />
        </NotificationButton>
      </Header>

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
                onSave={updateSaves}
                saved={savedEvaluations[month]}

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

const EvaluationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`


