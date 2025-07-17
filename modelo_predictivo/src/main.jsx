import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserProvider.jsx'
import { NotificationProvider } from './context/NotificationProvider.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <StrictMode>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </StrictMode>
  </UserProvider>
)
