import styled from "styled-components"
import { useMemo, useState, useEffect } from 'react'
import { useUser } from '../context/useUser'
import { useFetchEvaluations } from '../hooks/useFetchEvaluations'
import { EvaluationDetails } from '../components/organismos/EvaluationDetails'
import { useNotification } from '../context/useNotification'
import { HeaderWithNotification } from '../components/moleculas/HeaderWithNotification'
import { calculatePHQ9Score } from '../utils/phq9-score'
import { generateEvaluationPDF } from '../utils/pdfGenerator'
import { PsychologistAlert } from '../components/moleculas/PsychologistAlert'

export function Results() {
  const { user } = useUser();
  const { setHasNewEvaluation } = useNotification();
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showPsychAlert, setShowPsychAlert] = useState(false);
  const [severeEvaluations, setSevereEvaluations] = useState([]);

  const months = useMemo(() => [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ], []);

  useEffect(() => {
    setHasNewEvaluation(false);
  }, [setHasNewEvaluation])

  const questionSaved = useFetchEvaluations(user.username, months);

  // Calcular niveles de depresión y detectar casos severos
  const evaluationsWithScores = useMemo(() => {
    const results = {};
    const severe = [];

    months.forEach(month => {
      const evaluation = questionSaved[month];
      if (evaluation?.completed && evaluation?.responses) {
        const phq9Result = calculatePHQ9Score(evaluation.responses);
        results[month] = {
          ...evaluation,
          phq9Score: phq9Result
        };

        // Detectar casos severos o moderadamente severos
        if (phq9Result.level === "Severa" || phq9Result.level === "Mod. Severa") {
          severe.push({
            month,
            score: phq9Result.score,
            level: phq9Result.level,
            description: phq9Result.description
          });
        }
      } else {
        results[month] = evaluation;
      }
    });

    setSevereEvaluations(severe);
    return results;
  }, [questionSaved, months]);

  // Función para generar y descargar PDF
  const handleDownloadPDF = () => {
    const completedEvaluations = months
      .filter(month => evaluationsWithScores[month]?.completed)
      .map(month => ({
        month,
        score: evaluationsWithScores[month]?.phq9Score?.score || 0,
        level: evaluationsWithScores[month]?.phq9Score?.level || "Sin datos",
        description: evaluationsWithScores[month]?.phq9Score?.description || "No disponible"
      }));

    const doc = generateEvaluationPDF(completedEvaluations);
    doc.save(`evaluaciones_${user.username}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Función para abrir ventana de correo
  const handleContactPsychologist = () => {
    setShowPsychAlert(true);
  };

  return (
    <ResultsContainer>
      <HeaderWithNotification />
      <PageTitle>RESULTADOS</PageTitle>

      {/* Alerta para casos severos */}
      {severeEvaluations.length > 0 && (
        <AlertCard>
          <AlertTitle>⚠️ Atención Requerida</AlertTitle>
          <AlertMessage>
            Se han detectado niveles de depresión que requieren atención profesional.
            Te recomendamos contactar con un psicólogo.
          </AlertMessage>
          <AlertActions>
            <AlertButton onClick={handleContactPsychologist}>
              Contactar Psicólogo
            </AlertButton>
            <AlertButton secondary onClick={handleDownloadPDF}>
              Descargar Reporte PDF
            </AlertButton>
          </AlertActions>
        </AlertCard>
      )}

      <ContentCard>
        <CardTitle>Resultados de Evaluaciones</CardTitle>
        <CardContent>
          <p>Aquí puedes ver los resultados de tus evaluaciones recientes.</p>

          <ResultsList>
            {months.map((month) => {
              const evaluation = evaluationsWithScores[month];
              const hasScore = evaluation?.phq9Score;

              return (
                <ResultItem key={month} severity={hasScore?.level}>
                  <ResultHeader>
                    <ResultTitle>{`Test de ansiedad de ${month}`}</ResultTitle>
                    <ResultDate>15/05/2025</ResultDate>
                  </ResultHeader>

                  {hasScore && (
                    <ScoreSection>
                      <ScoreLabel>Puntuación:</ScoreLabel>
                      <ScoreValue severity={hasScore.level}>
                        {hasScore.score} - {hasScore.level}
                      </ScoreValue>
                      <ScoreDescription>{hasScore.description}</ScoreDescription>
                    </ScoreSection>
                  )}

                  <ViewDetailsButton onClick={() => setSelectedEvaluation(evaluation)}>
                    Ver Detalles
                  </ViewDetailsButton>
                </ResultItem>
              );
            })}
          </ResultsList>
        </CardContent>
      </ContentCard>

      {selectedEvaluation && (
        <EvaluationDetails
          data={selectedEvaluation}
          onClose={() => setSelectedEvaluation(null)}
        />
      )}

      {showPsychAlert && (
        <PsychologistAlert
          onClose={() => setShowPsychAlert(false)}
          onDownloadPDF={handleDownloadPDF}
          severeEvaluations={severeEvaluations}
        />
      )}
    </ResultsContainer>
  );
}

const ResultsContainer = styled.div`
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

const AlertCard = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const AlertTitle = styled.h3`
  color: #856404;
  margin: 0 0 10px 0;
  font-size: 18px;
`

const AlertMessage = styled.p`
  color: #856404;
  margin: 0 0 15px 0;
  font-size: 14px;
`

const AlertActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const AlertButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  
  ${props => props.secondary ? `
    background-color: #6c757d;
    color: white;
    &:hover { background-color: #5a6268; }
  ` : `
    background-color: #dc3545;
    color: white;
    &:hover { background-color: #c82333; }
  `}
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
  
  ${props => {
    if (props.severity === "Severa") {
      return `border-color: #dc3545; background-color: #fff5f5;`;
    }
    if (props.severity === "Mod. Severa") {
      return `border-color: #fd7e14; background-color: #fff8f0;`;
    }
    if (props.severity === "Moderada") {
      return `border-color: #ffc107; background-color: #fffdf0;`;
    }
    return '';
  }}
  
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

const ScoreSection = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
`

const ScoreLabel = styled.span`
  font-size: 14px;
  color: #555;
  margin-right: 10px;
`

const ScoreValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  
  ${props => {
    if (props.severity === "Severa") {
      return `color: #dc3545;`;
    }
    if (props.severity === "Mod. Severa") {
      return `color: #fd7e14;`;
    }
    if (props.severity === "Moderada") {
      return `color: #ffc107;`;
    }
    if (props.severity === "Leve") {
      return `color: #28a745;`;
    }
    return `color: #17a2b8;`;
  }}
`

const ScoreDescription = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
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