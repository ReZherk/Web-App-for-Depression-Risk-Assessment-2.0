
import { AuthTemplate } from "../components/templates/AuthTemplate"
import { LoginForm } from "../components/organismos/LoginForm"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/useUser"
export function Login({ onLogin }) {
 const navigate = useNavigate();
 const { setUser } = useUser()

 const handleLogin = async (formData) => {
  const res = await fetch('http://localhost:5000/api/login', {
   method: 'POST',
   headers: { 'Content-type': 'application/json' },
   body: JSON.stringify(formData)
  })

  console.log("Respuesta del servidor:", res)
  if (res.ok) {
   const data = await res.json();
   const userInfo = data.data;
   alert("Login exitoso");
   console.log(userInfo)
   setUser({ username: userInfo.username, nombre: userInfo.nombre_completo })
   onLogin();

   navigate('/home');//se usa para redireccionar
  } else {
   alert("Error al iniciar sesión");
  }
 };

 const handleSubmit = (formData) => {
  console.log("Datos de login:", formData)
  // Aquí iría la lógica de autenticación
  console.log(formData)
  handleLogin(formData)

 }

 return (
  //Este onSubmit es un Prop personalizada que nosotros nombramos así por convención.
  <AuthTemplate>
   <LoginForm onSubmit={handleSubmit} />{/* Se pasa la función como prop */}
  </AuthTemplate>
 )
}

