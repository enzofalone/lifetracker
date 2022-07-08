import AuthContext from "../../../contexts/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";

export default function ExerciseDetail(props) {
    const { userContext } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState();
    const [exerciseItem, setExerciseItem] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { exerciseId } = useParams();
  
    useEffect(() => {
  
      const fetchExercise = async () => {
        setIsLoading(true)
        
        const { data, error } = await apiClient.fetchExerciseById(exerciseId)
  
        console.log("fetched by id:", exerciseId, " ->", data);
  
        if (data) {
          setExerciseItem(data);
        } else {
          setErrorMessage(error);
        }
  
        setIsLoading(false)
      }
  
      fetchExercise();
    }, []);
  
    if (isLoading) {
      return (
        <Loading/>
      )
    }
  
    if (errorMessage) {
      return (
        <NotFound message={errorMessage}/>
      )
    }
  
    return (
      <div className='exercise-detail content'>
        <ExerciseCard
                id={exerciseItem.id}
                key={exerciseItem.id}
                name={exerciseItem.name}
                category={exerciseItem.category}
                intensity={exerciseItem.intensity}
                duration={exerciseItem.duration} />
      </div>
    )
}
