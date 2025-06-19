import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { QuizQuestion } from '../moleculas/QuizQuestion';
import Questions from '../../data/Questions.json';



export const MonthlyEvaluationItem = ({ month, onSave, saved }) => {
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(saved)

  useEffect(() => {
    setCompleted(saved);
  }, [saved]);

  // Hook useRef que crea una referencia mutable para almacenar respuestas sin provocar re-renderizados
  const answersRef = useRef([]);

  const handleStart = () => {
    setStarted(true)
  }

  const handleComplete = () => {
    setCompleted(true)
    onSave(month, answersRef.current)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <EvaluationItem>
      <EvaluationTitle>Evaluación de {month}</EvaluationTitle>

      {completed ? (
        <p>✅ Evaluación guardada.</p>
      ) : !started ? (
        <>
          <EvaluationDescription>
            Mide tu bienestar emocional correspondiente al mes de {month}
          </EvaluationDescription>
          <StartButton onClick={handleStart}>Iniciar la evaluación</StartButton>
        </>
      ) : (
        <>
          <EvaluationDescription>
            ¿Listo para comenzar la evaluación de {month}? Haz clic en "Completar" cuando hayas terminado.
            {Questions.map((q) => (
              <QuizQuestion
                key={q.id}
                question={q.pregunta}
                options={[
                  { label: 'Nunca', value: 0 },
                  { label: 'A veces', value: 1 },
                  { label: 'A menudo', value: 2 },
                  { label: 'Siempre', value: 3 }
                ]}
                onAnswer={(valorSeleccionado) => {
                  answersRef.current.push(valorSeleccionado);
                  console.log("Valor de esta pregunta:", valorSeleccionado)
                }
                }
              />
            ))}
          </EvaluationDescription>

          <StartButton onClick={handleComplete}>Completar Evaluación</StartButton>
        </>
      )}

    </EvaluationItem>
  )
}


const EvaluationItem = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

const EvaluationTitle = styled.h3`
  font-size: 16px;
  color: #0A3D62;
  margin: 0 0 5px 0;
`
const EvaluationDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
`
const StartButton = styled.button`
  background-color: #0A3D62;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #0c4d7a;
  }
`
