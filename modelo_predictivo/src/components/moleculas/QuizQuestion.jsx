import { useState } from 'react'
import styled from 'styled-components'

export function QuizQuestion({ question, options, onAnswer }) {
 const [selectedIndex, setSelectedIndex] = useState(null)
 const [submitted, setSubmitted] = useState(false)

 const handleSubmit = () => {
  setSubmitted(true)
  const selectedValue = options[selectedIndex].value
  onAnswer(selectedValue) // Devuelve el valor de la respuesta



 }

 return (
  <Card>
   <QuestionText>{question}</QuestionText>
   <OptionsContainer>
    {options.map((opt, index) => (
     <OptionLabel key={index} $selected={selectedIndex === index} $submitted={submitted}>
      <input
       type="radio"
       name={question}
       disabled={submitted}
       onChange={() => setSelectedIndex(index)}
      />
      {opt.label}
     </OptionLabel>
    ))}
   </OptionsContainer>
   {!submitted && (
    <SubmitButton onClick={handleSubmit} disabled={selectedIndex === null}>
     Confirmar
    </SubmitButton>
   )}
   {submitted && (
    <ResultText>
     ✅ Respuesta guardada con valor: {options[selectedIndex].value}
    </ResultText>
   )}
  </Card>
 )
}


const Card = styled.div`
  background-color: #e8f4fd;
  border: 2px solid #b3dcf9;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`

const QuestionText = styled.h3`
  font-size: 18px;
  color: #0a3d62;
  margin-bottom: 15px;
`

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`

const OptionLabel = styled.label`
  background-color: ${({ $selected, $submitted }) =>
  $submitted ? ($selected ? '#d1ecf1' : '#f8f9fa') : $selected ? '#cce5ff' : 'white'};
  border: 2px solid ${({ $selected }) => ($selected ? '#3399ff' : '#ddd')};
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  cursor: ${({ $submitted }) => ($submitted ? 'default' : 'pointer')};
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $submitted }) => ($submitted ? '' : '#f0f8ff')};
  }

  input {
    margin-right: 10px;
  }
`

const SubmitButton = styled.button`
  background-color: #0a3d62;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0c4d7a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const ResultText = styled.p`
  font-weight: bold;
  color: ${({ $correct }) => ($correct ? '#28a745' : '#dc3545')};
  margin-top: 10px;
`
