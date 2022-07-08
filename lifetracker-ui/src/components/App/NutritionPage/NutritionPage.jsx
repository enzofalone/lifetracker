import NutritionDetail from "../NutritionDetail/NutritionDetail";
import NutritionOverview from "../NutritionOverview/NutritionOverview";
import NutritionNew from "../NutritionNew/NutritionNew";

import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";

import './NutritionPage.css'

export default function NutritionPage(props) {
  
  

  return (
    <div className="nutrition-page">
      {!props.user.email && (<Navigate to='/login' replace={true} />)}
      <Routes>
        <Route
          path='/'
          element={<NutritionOverview/>} />
        <Route
          path='/create'
          element={<NutritionNew/>} />
        <Route
          path='/id/:nutritionId'
          element={<NutritionDetail/>} />
      </Routes>
    </div>
  )
}