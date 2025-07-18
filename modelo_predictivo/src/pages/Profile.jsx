import styled from "styled-components"
import { useState, useEffect } from "react"
import { FaBars, FaBell } from "react-icons/fa"
import { useUser } from "../context/useUser"
import { HeaderWithNotification } from '../components/moleculas/HeaderWithNotification'

export function Profile() {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    nom_apell: "",
    codigo: "",
    facultad: "",
  });

  useEffect(() => {
    const fetchAll = async () => {
      const username = user.username;

      try {
        const res = await fetch(`http://localhost:5000/api/datos/${username}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          console.error("Error al obtener datos:", data.message);
          return;
        }

        const data = await res.json();
        console.log("La respuesta del json es: ", data);

        const results = {
          nom_apell: data.responses.nom_apell,
          codigo: data.responses.codigo,
          facultad: data.responses.facultad,
        };

        setFormData(results);
      } catch (err) {
        console.error("Error al obtener evaluaciones:", err);
      }

    };
    fetchAll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/datos_actualizados/${user.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Datos actualizados exitosamente.");
      } else {
        alert("Error al actualizar: " + data.message);
      }
    } catch (err) {
      console.error("Error al actualizar datos:", err);
      alert("Ocurrió un error inesperado.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <ProfileContainer>
      <HeaderWithNotification />

      <PageTitle>DATOS PERSONALES</PageTitle>

      <ProfileContent>
        <ProfileImageSection>
          <ProfileImage
            src={'https://i.pinimg.com/236x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg'}
            alt="Foto de perfil"
          />
        </ProfileImageSection>

        <ProfileForm onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <FormLabel>Nombres y Apellidos</FormLabel>
              <FormInput
                type="text"
                name="nom_apell"
                placeholder="Ingresa tus nuevo nombre"
                value={formData.nom_apell}
                onChange={handleChange}
              />
            </FormGroup>
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

          </FormRow>

          <FormRow>

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
