import styled from "styled-components"
import { useState } from "react"
import { FaBars, FaBell } from "react-icons/fa"
import profile from "../assets/profile.svg";

export function Profile() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    codigo: "",
    facultad: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos del perfil:", formData)
    // Aquí iría la lógica para guardar los datos
  }

  return (
    <ProfileContainer>
      <Header>
        <MenuButton>
          <FaBars />
        </MenuButton>
        <NotificationButton>
          <FaBell />
        </NotificationButton>
      </Header>

      <PageTitle>DATOS PERSONALES</PageTitle>

      <ProfileContent>
        <ProfileImageSection>
          <ProfileImage
            src={profile}
            alt="Foto de perfil"
          />
        </ProfileImageSection>

        <ProfileForm onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <FormLabel>Nombres</FormLabel>
              <FormInput
                type="text"
                name="nombres"
                placeholder="Ingresa tus nombres"
                value={formData.nombres}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Apellidos</FormLabel>
              <FormInput
                type="text"
                name="apellidos"
                placeholder="Ingresa tus apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Código de estudiante</FormLabel>
              <FormInput
                type="text"
                name="codigo"
                placeholder="Ingresa tu código de estudiante"
                value={formData.codigo}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Facultad del estudiante</FormLabel>
              <FormInput
                type="text"
                name="facultad"
                placeholder="Ingresa tu facultad"
                value={formData.facultad}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>

          <SaveButton type="submit">Guardar Cambios</SaveButton>
        </ProfileForm>
      </ProfileContent>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
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

const ProfileContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const ProfileImageSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #0A3D62;
`

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const FormLabel = styled.label`
  font-size: 14px;
  color: #0A3D62;
  margin-bottom: 5px;
  font-weight: 500;
`

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0A3D62;
  }
`

const SaveButton = styled.button`
  background-color: #0A3D62;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  align-self: center;
  
  &:hover {
    background-color: #0c4d7a;
  }
`
