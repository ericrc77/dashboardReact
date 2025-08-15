import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Declaração mínima para acessar import.meta.env em TS
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ViteImportMeta extends ImportMeta { env: any }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const viteImportMeta = import.meta as ViteImportMeta
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

// Define basename para Github Pages conforme base configurada no Vite
const basename = (viteImportMeta.env?.BASE_URL || '/').replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
  <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
