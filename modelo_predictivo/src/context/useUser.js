//useContext es un hook de React que te permite leer el valor de un contexto en cualquier componente funcional, sin necesidad de andar pasando props de componente en componente
import { useContext } from "react";
import { UserContext } from "./UserContext";

// Custom hook que permite acceder fácilmente al contexto de usuario desde cualquier componente.
// Devuelve el objeto { user, setUser } provisto por <UserProvider>.
export function useUser() {
  return useContext(UserContext);
}
