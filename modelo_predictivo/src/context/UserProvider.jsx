// Importa el hook useState de React para manejar estado local
import { useState } from "react";
import { UserContext } from "./UserContext";

// Componente proveedor del contexto de usuario.
// Este envolverá tu aplicación o las partes que necesiten acceder al usuario.
export const UserProvider = ({ children }) => {
 // Crea el estado "user" con su función actualizadora "setUser"
 // Este estado podrá ser accedido por cualquier componente que consuma el contexto
 const [user, setUser] = useState(null);

 return (
  // Retorna el proveedor del contexto, pasando como valor un objeto con el usuario y su setter
  // Todo lo que esté dentro de {children} podrá acceder a este contexto
  <UserContext.Provider value={{ user, setUser }}>
   {children}
  </UserContext.Provider>
 );
};