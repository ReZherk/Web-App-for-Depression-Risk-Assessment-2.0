import styled from 'styled-components';
import { useState } from 'react';

export function PsychologistAlert({ onClose, onDownloadPDF, severeEvaluations }) {
  const [emailSent, setEmailSent] = useState(false);

  // Información predefinida del psicólogo
  const psychologistInfo = {
    name: "Dr. María González",
    email: "dra.gonzalez@psicologia.com",
    phone: "+51 987 654 321",
    specialization: "Psicología Clínica y Terapia Cognitivo-Conductual"
  };

  // Crear el contenido del correo
  const getEmailContent = () => {
    const subject = "Solicitud de Consulta - Evaluación de Depresión";
    const body = `Estimado/a ${psychologistInfo.name},

Mi nombre es [NOMBRE DEL USUARIO] y me pongo en contacto con usted debido a los resultados de mis evaluaciones recientes de depresión.

Resultados preocupantes detectados:
${severeEvaluations.map(evaluation =>
      `• ${evaluation.month}: ${evaluation.score} puntos - ${evaluation.level} (${evaluation.description})`
    ).join('\n')}

He adjuntado un reporte detallado en PDF con todas mis evaluaciones. Me gustaría solicitar una cita para recibir orientación profesional.

Mis datos de contacto:
• Email: [SU EMAIL]
• Teléfono: [SU TELÉFONO]

Quedo atento/a a su respuesta.

Atentamente,
[NOMBRE DEL USUARIO]`;

    return { subject, body };
  };

  const handleDownloadAndSendEmail = () => {
    // Primero descargar el PDF
    onDownloadPDF();

    // Esperar un momento para que se inicie la descarga
    setTimeout(() => {
      // Luego abrir Gmail con el mensaje predefinido
      const { subject, body } = getEmailContent();
      const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${psychologistInfo.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(emailLink, '_blank');
      setEmailSent(true);
    }, 1000);
  };

  const handleOnlyDownloadPDF = () => {
    onDownloadPDF();
  };

  const copyToClipboard = async () => {
    const { subject, body } = getEmailContent();
    const fullText = `Para: ${psychologistInfo.email}\nAsunto: ${subject}\n\n${body}`;

    try {
      await navigator.clipboard.writeText(fullText);
      alert('Correo copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <Title>🩺 Contactar Psicólogo</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalContent>
          {!emailSent ? (
            <>
              <AlertSection>
                <AlertTitle>Atención Requerida</AlertTitle>
                <AlertText>
                  Tus evaluaciones muestran niveles de depresión que requieren atención profesional.
                  Te recomendamos contactar con un psicólogo especializado.
                </AlertText>

                <SevereResults>
                  <h4>Resultados preocupantes:</h4>
                  {severeEvaluations.map(evaluation => (
                    <ResultItem key={evaluation.month}>
                      <strong>{evaluation.month}:</strong> {evaluation.score} puntos - {evaluation.level}
                      <br />
                      <small>{evaluation.description}</small>
                    </ResultItem>
                  ))}
                </SevereResults>
              </AlertSection>

              <PsychologistInfo>
                <h4>Psicólogo Recomendado:</h4>
                <InfoItem><strong>Nombre:</strong> {psychologistInfo.name}</InfoItem>
                <InfoItem><strong>Email:</strong> {psychologistInfo.email}</InfoItem>
                <InfoItem><strong>Teléfono:</strong> {psychologistInfo.phone}</InfoItem>
                <InfoItem><strong>Especialización:</strong> {psychologistInfo.specialization}</InfoItem>
              </PsychologistInfo>

              <Instructions>
                <h4>¿Qué va a pasar?</h4>
                <ul>
                  <li>Se descargará automáticamente un PDF con tus resultados</li>
                  <li>Se abrirá Gmail en una nueva pestaña con el mensaje predefinido</li>
                  <li>Solo necesitarás adjuntar el PDF descargado al correo</li>
                  <li>Completar tus datos personales en el mensaje</li>
                  <li>Enviar el correo para solicitar una cita</li>
                </ul>
              </Instructions>

              <ButtonGroup>
                <PrimaryButton onClick={handleDownloadAndSendEmail}>
                  📧 Descargar PDF y Abrir Gmail
                </PrimaryButton>
                <SecondaryButton onClick={handleOnlyDownloadPDF}>
                  📄 Solo Descargar PDF
                </SecondaryButton>
                <CopyButton onClick={copyToClipboard}>
                  📋 Copiar Mensaje
                </CopyButton>
              </ButtonGroup>
            </>
          ) : (
            <SuccessMessage>
              <SuccessIcon>✅</SuccessIcon>
              <SuccessTitle>¡Correo y PDF Listos!</SuccessTitle>
              <SuccessText>
                • El PDF se ha descargado automáticamente<br />
                • Gmail se ha abierto en una nueva pestaña con el mensaje predefinido<br />
                • Solo necesitas adjuntar el PDF descargado y completar tus datos personales
              </SuccessText>

              <AttachmentInstructions>
                <h4>📎 Cómo adjuntar el PDF:</h4>
                <ol>
                  <li>En Gmail, busca el ícono de clip 📎 o "Adjuntar archivo"</li>
                  <li>Selecciona el PDF que se descargó (busca en tu carpeta de Descargas)</li>
                  <li>Completa tus datos personales en el mensaje</li>
                  <li>Haz clic en "Enviar"</li>
                </ol>
              </AttachmentInstructions>

              <ReminderText>
                <strong>Recuerda:</strong> Buscar ayuda profesional es un paso valiente y necesario.
                Un psicólogo te puede brindar las herramientas adecuadas para tu bienestar.
              </ReminderText>

              <RetryButton onClick={() => setEmailSent(false)}>
                ↩️ Volver a intentar
              </RetryButton>
            </SuccessMessage>
          )}
        </ModalContent>
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 15px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
  margin: 0;
  color: #dc3545;
  font-size: 24px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const AlertSection = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
`;

const AlertTitle = styled.h3`
  color: #856404;
  margin: 0 0 10px 0;
`;

const AlertText = styled.p`
  color: #856404;
  margin: 0 0 15px 0;
  line-height: 1.4;
`;

const SevereResults = styled.div`
  h4 {
    color: #856404;
    margin: 10px 0 5px 0;
  }
`;

const ResultItem = styled.div`
  background-color: #fff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border-left: 4px solid #dc3545;
  
  small {
    color: #666;
    font-style: italic;
  }
`;

const PsychologistInfo = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  
  h4 {
    color: #0A3D62;
    margin: 0 0 10px 0;
  }
`;

const InfoItem = styled.div`
  margin: 5px 0;
  color: #333;
  font-size: 14px;
`;

const Instructions = styled.div`
  background-color: #e7f3ff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  
  h4 {
    color: #0A3D62;
    margin: 0 0 10px 0;
  }
  
  ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
    color: #333;
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: #c82333;
  }
`;

const SecondaryButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const CopyButton = styled.button`
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: #138496;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const SuccessTitle = styled.h3`
  color: #28a745;
  margin: 0 0 15px 0;
`;

const SuccessText = styled.p`
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.8;
  text-align: left;
`;

const AttachmentInstructions = styled.div`
  background-color: #e7f3ff;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  text-align: left;
  
  h4 {
    color: #0A3D62;
    margin: 0 0 10px 0;
  }
  
  ol {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
    color: #333;
    font-size: 14px;
  }
`;

const ReminderText = styled.div`
  background-color: #e7f3ff;
  padding: 15px;
  border-radius: 10px;
  color: #0A3D62;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 20px;
`;

const RetryButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background-color: #5a6268;
  }
`;