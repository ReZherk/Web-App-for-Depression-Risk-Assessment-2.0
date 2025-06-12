"use client"

import styled from "styled-components"

export const Input = ({ type = "text", placeholder, name, value, onChange, icon, rightIcon, required, className }) => {

  //Notas:
  //El operador && se utiliza para verificar si icon tiene un valor. Si lo tiene, se ejecuta el código a la derecha del operador &&.
  //El operador !! se utiliza para convertir el valor de icon en un booleano. Si icon es un valor "truthy" (es decir, no es null, undefined, 0, "", etc.), !!icon devolverá true. Si es un valor "falsy", devolverá false.

  return (
    <InputWrapper className={className}>{icon && <InputIcon>{icon}</InputIcon>}
      <StyledInput
        type={type} //El tipo de entrada, como "text", "email", "password", etc.
        placeholder={placeholder}//Texto que aparece en el campo de entrada cuando está vacío
        name={name}
        value={value}
        onChange={onChange}
        required={required} //Si `required` es `true`, el input es obligatorio; si es `false`, el usuario puede dejarlo vacío.
        $hasLeftIcon={!!icon}
        $hasRightIcon={!!rightIcon}
      />
      {rightIcon && <InputIcon>{rightIcon}</InputIcon>}
    </InputWrapper>)
}

const InputWrapper = styled.div`
position:relative; //Puede desplazarse usando top, left, right, bottom, pero sin afectar otros elementos
width:100%;
`

const StyledInput = styled.input`
width:86.9%;//estás haciendo que el elemento ocupe el 100% del ancho de su contenedor padre.
padding:12px;
border:1px solid #ddd;
border-radius:5px;
font-size:14px;
color:#333;

${(props) => props.$hasLeftIcon && `padding-left: 40px;`}
  
  ${(props) => props.$hasRightIcon && `padding-left: 40px;`}
  
  &:focus {
    outline: none;//Elimina el contorno predeterminado del navegador
    border-color: #0A3D62;
  }
  
  &::placeholder {
    color: #999;
  }

`

const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  display: flex;
  align-items: center; //El elemento se alinea verticalmente en el centro
  justify-content: center;//El elemento se alinea horizontalmente en el centro
`

const InputRightIcon = styled.div`
  position: absolute; //El elemento se posiciona en relación a su contenedor padre
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`