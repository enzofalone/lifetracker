import './NutritionOverview.css'

import apiClient from "../../../services/apiClient";
import NutritionCard from '../NutritionCard/NutritionCard'
import React from "react";
import NutritionContext from "../../../contexts/nutrition";
import { Navigate, NavLink } from 'react-router-dom';
import NutritionFeed from '../NutritionFeed/NutritionFeed';

export default function NutritionOverview(props) {
  const { nutritionContext } = React.useContext(NutritionContext);
  const [nutritions, setNutritions] = nutritionContext;
  
  return (
    <div className="nutrition-overview">
      <div className="content">
        <div className="headline">
          <section>
            <h1>Nutrition</h1>
          </section>
          <section>
            <NavLink to='/nutrition/create' className="record-button" style={{ backgroundColor: '#8B8000' }}>Record Nutrition</NavLink>
          </section>
        </div>
        <NutritionFeed nutritions={nutritions}/>
      </div>
    </div>
  )
}