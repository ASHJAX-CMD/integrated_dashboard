import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainContext from './context/MainContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  
  
  <StrictMode>
    <BrowserRouter>
    <MainContext>
    <App />
    </MainContext>
    </BrowserRouter>
  </StrictMode>,
)
