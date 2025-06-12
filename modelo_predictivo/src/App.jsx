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

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }
  return (
    <AppContainer>
      <GlobalStyles />
      <BrowserRouter>
        {isAuthenticated && <Sidebar />}

        <Routes>


          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/evaluacion' element={isAuthenticated ? <Evaluation /> : <Navigate to="/login" />} />


          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/welcome"} />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

const AppContainer = styled.main``

export default App
