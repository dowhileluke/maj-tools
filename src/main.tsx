import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppStateProvider } from './components/app-state-provider'
import { App } from './components/app'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </StrictMode>,
)
