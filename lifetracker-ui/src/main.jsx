import React from "react"
import ReactDOM from "react-dom"
import { App } from "components"
import "./globals.css"
import {AuthProvider} from './contexts/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
