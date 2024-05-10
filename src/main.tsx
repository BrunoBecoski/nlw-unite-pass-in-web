import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from './contexts/router-provider'
import { App } from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
