import styled from "styled-components"
import { useState } from "react"

export const MoodSelector = ({ onSelect, className }) => {
 // Estado para almacenar el ID del estado de ánimo seleccionado (null inicialmente)
 // selectedMood: Valor actual | setSelectedMood: Función para actualizarlo

 const [selectedMood, setSelectedMood] = useState(null)

 const moods = [
  { id: 1, name: "Emocionado", emoji: "😀" },
  { id: 2, name: "Alegre", emoji: "😄" },
  { id: 3, name: "Relajado", emoji: "☺️" },
  { id: 4, name: "Pensativo", emoji: "🤔" },
  { id: 5, name: "Preocupado", emoji: "😟" },
  { id: 6, name: "Triste", emoji: "😔" },
  { id: 7, name: "Aburrido", emoji: "😒" },
  { id: 8, name: "Enojado", emoji: "😠" },
 ]

 const handleSelect = (id) => {
  setSelectedMood(id)
  if (onSelect) {
   onSelect(id)//Ejecuta la función del padre
  }
 }

 return (
  <StyledMoodSelector className={className}>
   <MoodTitle>¿Cómo te sientes hoy?</MoodTitle>
   <MoodGrid>

    {moods.map((mood) => (
     <MoodItem
      // Key: Identificador único necesario para optimización de React (mejor rendimiento en listas)
      key={mood.id}

      // Selected: Determina si este ítem está seleccionado (booleano)
      // Compara el ID del mood actual con el ID guardado en el estado selectedMood
      selected={selectedMood === mood.id}

      // onClick: Maneja el evento de clic en este ítem
      // Al hacer clic, ejecuta handleSelect con el ID del mood actual
      // Usamos arrow function para pasar el parámetro mood.id correctamente
      onClick={() => handleSelect(mood.id)}
     >
      {/* Contenido del MoodItem: */}
      <MoodEmoji>{mood.emoji}</MoodEmoji> {/* Muestra el emoji del mood */}
      <MoodName>{mood.name}</MoodName>    {/* Muestra el nombre del mood */}
     </MoodItem>
    ))}
   </MoodGrid>
  </StyledMoodSelector>
 )
}

const StyledMoodSelector = styled.div`
  margin-bottom: 30px;
`

const MoodTitle = styled.h2`
  font-size: 18px;
  color: #0A3D62;
  margin-bottom: 15px;
`

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`

const MoodItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? "#0A3D62" : "white")};
  color: ${(props) => (props.selected ? "white" : "#333")};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.selected ? "#0A3D62" : "#e9f5ff")};
  }
`

const MoodEmoji = styled.div`
  font-size: 30px;
  margin-bottom: 5px;
`

const MoodName = styled.span`
  font-size: 12px;
  text-align: center;
`
