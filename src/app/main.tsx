import React from 'react'
import { createRoot } from 'react-dom/client'
import ResumePage from '@pages/ResumePage'
import './styles.css'

function App() {
  return <ResumePage />
}

createRoot(document.getElementById('root')!).render(<App />)
