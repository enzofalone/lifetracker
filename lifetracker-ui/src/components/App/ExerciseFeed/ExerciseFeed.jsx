import { Link } from "react-router-dom"
import EmptyMessage from "../EmptyMessage/EmptyMessage"
import ExerciseCard from "../ExerciseCard/ExerciseCard"
import "./ExerciseFeed.css"
export default function ExerciseFeed(props) {
        if (props?.exercises?.length > 0) {
        return (
          <div className="exercise-feed">
            {props?.exercises?.length > 0 ? Object.keys(props?.exercises).map((idx) => {
              return (
              <Link to={`/exercise/id/${props.exercises[idx].id}`}>
              <ExerciseCard
                id={props.exercises[idx].id}
                key={props.exercises[idx].id}
                name={props.exercises[idx].name}
                category={props.exercises[idx].category}
                intensity={props.exercises[idx].intensity}
                duration={props.exercises[idx].duration} /></Link>)
            }) : <></>}
          </div>
        )
      } else {
        return(
        <EmptyMessage/>
        )
      }
}