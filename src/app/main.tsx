import React from 'react'
import { createRoot } from 'react-dom/client'
import { Footer } from '@shared/ui'
import ResumePage from '@pages/ResumePage'
import './styles.css'

function App() {
  return <React.StrictMode>
    <main className="min-h-screen px-4">
      <ResumePage />
      <Footer />
    </main>
  </React.StrictMode>
}

createRoot(document.getElementById('root')!).render(<App />)
