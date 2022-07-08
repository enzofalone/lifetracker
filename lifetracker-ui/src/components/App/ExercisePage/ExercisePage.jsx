import { Navigate, Route, Routes } from "react-router-dom"
import ExerciseDetail from "../ExerciseDetail/ExerciseDetail"
import ExerciseNew from "../ExerciseNew/ExerciseNew"
import ExerciseOverview from "../ExerciseOverview/ExerciseOverview"

export default function ExercisePage(props) {
    return (
        <div className="exercise-page">
            {!props.user.email && (<Navigate to='/forbidden' replace={true} />)}
          <Routes>
            <Route
              path='/'
              element={<ExerciseOverview/>} />
            <Route
              path='/create'
              element={<ExerciseNew/>} />
            <Route
              path='/id/:exerciseId'
              element={<ExerciseDetail/>} />
          </Routes>
        </div>
      )
}