import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ExerciseContext from "../../../contexts/exercise";
import ExerciseFeed from "../ExerciseFeed/ExerciseFeed";
import ExerciseForm from "../ExerciseForm/ExerciseForm";

export default function ExerciseOverview() {
  const { exerciseContext } = useContext(ExerciseContext);
  const [exercises, setExercises] = exerciseContext;

  return (
    <div className="exercise-new">
      <div className="content">
        <div className="headline">
          <section>
            <h1>Exercise</h1>
          </section>
          <section>
            <NavLink to='/exercise/create' className="record-button" style={{ backgroundColor: '#8B8000' }}>Record Exercise</NavLink>
          </section>
        </div>
        <ExerciseFeed exercises={exercises} />
      </div>
    </div>
  )
}