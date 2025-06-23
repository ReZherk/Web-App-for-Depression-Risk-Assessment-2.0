import styled from "styled-components"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FormGroup } from "../moleculas/FormGroup"
import { Input } from "../atomos/input"
import { Button } from "../atomos/Button"
import { Text } from "../atomos/Typography"
import { Icon } from "../atomos/Icon"


export const LoginForm = ({ onSubmit, className }) => {


  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  // React encapsula eventos nativos en SyntheticEvent y los pasa a handleChange.
  const handleChange = (e) => {
    // e.target = { name: "documento", value: "Lo que escribió el usuario" }
    const { name, value } = e.target;
    // Sin name, no sabrías qué propiedad modificar en formData
    //Esto dinámicamente actualiza documento o password
    setFormData({ ...formData, [name]: value });  // Actualiza el estado

  }

  //Lo que llega al "e" se genero automáticamente un objeto de evento nativo cuando
  //se preciono el INGRESAR ,este viene con toda la información relevante (target, tipo, etc).
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    //onSubmit es un evento nativo de HTML, no algo que inventamos. Todos los elementos <form> de HTML tienen este evento integrado.
    //Cuando el formulario se intente enviar (al hacer clic en el botón o presionar Enter), ejecuta la función handleSubmit que definí.

    <StyledForm onSubmit={handleSubmit} className={className}>
      <FormGroup>
        <Input
          type="text"
          placeholder="Documento de identidad"
          name="username"
          value={formData.username}
          onChange={handleChange}
          icon={<Icon name="user" size="small" />}
          required
        />
      </FormGroup>

      <FormGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={<Icon name="clipboard" size="small" />}
          rightIcon={
            <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-slash" : "eye"} size="small" />
            </PasswordToggle>
          }
          required
        />
      </FormGroup>

      <LoginButton type="submit">INGRESAR</LoginButton>
      {/*type="submit" hace que el botón envíe un formulario al presionarlo.
*/}
      <ForgotPassword to="/recuperar">¿Olvidaste tu contraseña?</ForgotPassword>

      <NoAccountText>¿Aún no tienes una cuenta?</NoAccountText>
      <RegisterLink to="/registro">REGÍSTRATE</RegisterLink>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const LoginButton = styled(Button)`
  margin-top: 10px;
`

const ForgotPassword = styled(Link)`
  text-align: center;
  color: #0A3D62;
  font-size: 12px;
  margin-top: 15px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

const NoAccountText = styled(Text)`
  text-align: center;
  color: #666;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 5px;
`

const RegisterLink = styled(Link)`
  text-align: center;
  color: #0A3D62;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`
