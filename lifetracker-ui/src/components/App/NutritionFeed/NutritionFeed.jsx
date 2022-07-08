import './NutritionFeed.css'

import { Link } from "react-router-dom"
import EmptyMessage from "../EmptyMessage/EmptyMessage"
import NutritionCard from "../NutritionCard/NutritionCard"

export default function NutritionFeed(props) {

  if (props?.nutritions?.length > 0) {
    return (
      <div className="nutrition-feed">
        {props?.nutritions?.length > 0 ? Object.keys(props?.nutritions).map((idx) => {
          return (
          <Link to={`/nutrition/id/${props.nutritions[idx].id}`}>
          <NutritionCard
            id={props.nutritions[idx].id}
            key={props.nutritions[idx].id}
            name={props.nutritions[idx].name}
            category={props.nutritions[idx].category}
            calories={props.nutritions[idx].calories}
            quantity={props.nutritions[idx].quantity}
            image={props.nutritions[idx].image} /></Link>)
        }) : <></>}
      </div>
    )
  } else {
    return(
    <EmptyMessage/>
    )
  }
}