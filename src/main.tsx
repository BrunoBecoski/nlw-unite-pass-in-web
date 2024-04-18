import React from 'react'
import ReactDOM from 'react-dom/client'

import { UrlProvider } from './contexts/url-provider'
import { App } from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UrlProvider>
      <App />
    </UrlProvider>
  </React.StrictMode>,
)
