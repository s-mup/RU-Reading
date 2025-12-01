import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Genre.css'
import Genre from './Genre.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Genre />
  </StrictMode>,
)
