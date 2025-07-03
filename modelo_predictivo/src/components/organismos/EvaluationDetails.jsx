import styled from 'styled-components';

export function EvaluationDetails({ data, onClose }) {
 if (!data) return null;

 const { completed, results, responses } = data;

 const { result, percentage, interpretation } = results || {};

 return (
  <Overlay>
   <Modal>
    <h2>Detalles de la Evaluación</h2>

    {!completed ? (
     <Message>No has realizado esta evaluación.</Message>
    ) : (
     <>
      <DetailItem><strong>Puntuación:</strong> {result ?? "No disponible"}</DetailItem>
      <DetailItem><strong>Porcentaje:</strong> {percentage !== undefined ? `${percentage}%` : "No disponible"}</DetailItem>
      <DetailItem><strong>Interpretación:</strong> {interpretation ?? "No disponible"}</DetailItem>
      <DetailItem><strong>Respuestas:</strong> {responses?.length ? responses.join(", ") : "No disponible"}</DetailItem>
     </>
    )}

    <CloseButton onClick={onClose}>Cerrar</CloseButton>
   </Modal>
  </Overlay>
 );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
`;

const DetailItem = styled.p`
  font-size: 14px;
  margin: 10px 0;
  color: #333;
`;

const Message = styled.p`
  font-size: 16px;
  color: #b00020;
  font-weight: 500;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background-color: #0A3D62;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #07406b;
  }
`;
