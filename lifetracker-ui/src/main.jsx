import React from "react"
import ReactDOM from "react-dom"
import { App } from "components"
import "./globals.css"
import { AuthProvider } from './contexts/AuthProvider';
import { NutritionContextProvider } from "./contexts/nutrition"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NutritionContextProvider>
        <App />
      </NutritionContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
