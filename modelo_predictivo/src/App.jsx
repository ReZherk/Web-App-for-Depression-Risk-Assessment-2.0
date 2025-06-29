import styled from 'styled-components';
import { GlobalStyles } from './index';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './index';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Welcome } from './pages/Welcome';
import { Evaluation } from './pages/Evaluation';
import { useUser } from './context/useUser'
import { Results } from './pages/Results'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { setUser } = useUser();

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  }
  return (
    <AppContainer>
      <GlobalStyles />
      <BrowserRouter>
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}

        <Routes>


          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/evaluacion' element={isAuthenticated ? <Evaluation /> : <Navigate to="/login" />} />
          <Route path='/resultados' element={isAuthenticated ? <Results /> : <Navigate to="/login" />} />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/welcome"} />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

const AppContainer = styled.main``

export default App
