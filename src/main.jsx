import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeAndroidOptimizations } from './utils/androidOptimizations.js'

// Inicjalizacja optymalizacji Android
initializeAndroidOptimizations()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
