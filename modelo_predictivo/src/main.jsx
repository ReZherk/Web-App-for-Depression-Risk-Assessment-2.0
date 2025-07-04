import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserProvider.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </UserProvider>
)
