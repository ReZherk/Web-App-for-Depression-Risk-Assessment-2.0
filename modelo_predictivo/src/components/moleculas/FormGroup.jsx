import styled from "styled-components";
import { Text } from "../atomos/Typography";

export const FormGroup = ({ label, children, error, required, className }) => {

 /*
 Acciones que ocurren dentro de return:
 -Si la propiedad label existe, renderiza un -FormLabel- con el texto de la etiqueta.
 -Si required es true, agrega un <RequiredMark>*</RequiredMark> para indicar que el campo es obligatorio.
 -Dentro del grupo del formulario, se insertan los elementos hijos (children)
 - Si hay un mensaje de error (error), lo muestra dentro de <ErrorMessage>.
 */

 return (
  <StyledFormGroup className={className}>
   {label && (
    <FormLabel>
     {label} {required && <RequiredMark>*</RequiredMark>}
    </FormLabel>
   )}
   {children}
   {error && <ErrorMessage>{error}</ErrorMessage>}
  </StyledFormGroup>
 )
}

const StyledFormGroup = styled.div`
 display: flex;
 flex-direction: column;
 margin-bottom: 15px;
`

const FormLabel = styled.label`
font-size: 14px;
color: #0A3D62;
margin-bottom: 5px;
font-weight: 500;
`

const RequiredMark = styled.span`
  color: #e53e3e;
`

const ErrorMessage = styled(Text)`
  color: #e53e3e;
  font-size: 12px;
  margin-top: 5px;
`
