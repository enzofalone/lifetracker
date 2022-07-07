import NutritionContext from "../../../contexts/nutrition";
import React from "react";
import { NavLink } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import NutritionCard from '../NutritionCard/NutritionCard'

import './NutritionPage.css'

export default function NutritionPage(props) {
    const [errorMessage, setErrorMessage] = React.useState();

    const { nutritionContext } = React.useContext(NutritionContext);
    const [nutritions, setNutritions] = nutritionContext;

    return (
        <div className="nutrition-page">
            <div className="content">
                <div className="headline">
                    <section>
                        <h1>Nutrition</h1>
                    </section>
                    <section>
                        <NavLink to='/nutrition/create' className="record-button" style={{ backgroundColor: '#8B8000' }}>Record Nutrition</NavLink>
                    </section>
                </div>
                <div className="nutrition-body">
                    {nutritions.length > 0 ? Object.keys(nutritions).map((item) => {
                return (<NutritionCard
                            key={nutritions[item].id} 
                            name={nutritions[item].name} 
                            category={nutritions[item].category} 
                            calories={nutritions[item].calories} 
                            quantity={nutritions[item].quantity} 
                            image={nutritions[item].image} />)
            }): <></>}
                </div>
            </div>
        </div>
    )
}