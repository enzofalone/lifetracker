import React from "react";
import { NavLink } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import NutritionCard from '../NutritionCard/NutritionCard'

import './NutritionPage.css'

export default function NutritionPage(props) {
    const [errorMessage, setErrorMessage] = React.useState();

    

    const getNutrition = () => {
        console.log("getNutrition", props?.nutrition);
        if (props?.nutrition.length > 0) {
            console.log("conditional check", props?.nutrition);
            props?.nutrition?.map((item) => {
                return (<NutritionCard name={item.name} category={item.category} calories={item.calories} quantity={item.quantity} image={item.image} />)
            })
        }
    }
    console.log("Nutrition Page Render", props?.nutrition);

    if (props.isFetching) {
        return (
            <h1>Loading...</h1>
        )
    }

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
                    {getNutrition()}
                </div>
            </div>
        </div>
    )
}