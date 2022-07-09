import Loading from "components/App/Loading/Loading";
import { createContext, useContext, useEffect, useState } from "react"
import apiClient from "../services/apiClient";
import AuthContext from './auth';
import ExerciseContext from "./exercise";
import NutritionContext from "./nutrition";

const ActivityContext = createContext({});

export const ActivityContextProvider = ({ children }) => {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const { nutritionContext } = useContext(NutritionContext);
  const [nutritions, setNutritions] = nutritionContext;

  const [activity, setActivity] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log("fetching activity(if able)")
    const fetchActivity = async () => {
      setIsLoading(true);

      try {
        const { data, errorActivity } = await apiClient.getActivity();

        if (errorActivity) {
          setError(errorActivity);
        }

        if(data?.activity) {
          setActivity(data?.activity);
          console.log(data?.activity);
        }

        
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    if (user?.email) {
      fetchActivity();
    }

    setInitialized(true);
  }, [nutritions])

  if (error) {
    return <h1>Error occurred in ActivityContextProvider!</h1>
  }

  if (isLoading) {
    return <Loading message='Loading Activity...' />
  }

  return (
    <ActivityContext.Provider value={{activityContext: [activity, setActivity]}}>
      {children}
    </ActivityContext.Provider>
  )
}

export default ActivityContext;