import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SpeedInsights } from "@vercel/speed-insights/react"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <SpeedInsights />
    <App />
  </React.StrictMode>
)
