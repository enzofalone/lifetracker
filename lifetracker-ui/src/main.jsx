import React from "react"
import ReactDOM from "react-dom"
import { App } from "components"
import "./globals.css"
import { AuthProvider } from './contexts/auth';
import { NutritionContextProvider } from "./contexts/nutrition"
import { ActivityContextProvider } from "./contexts/activity";
import { ExerciseContextProvider } from "./contexts/exercise";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NutritionContextProvider>
        <ExerciseContextProvider>
        <ActivityContextProvider>
          
          <App/>
        </ActivityContextProvider>
        </ExerciseContextProvider>
      </NutritionContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
