import AuthContext from "./auth";

import React, { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient";

const ExerciseContext = createContext({});

export const ExerciseContextProvider = ({ children }) => {
    // useContext hook
    const { userContext } = useContext(AuthContext);
    const [user, setUser] = userContext;

    // useEffect hooks
    const [exercises, setExercises] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // after component is mounted after authenticating user, fetch all the data if possible
  React.useEffect(() => {
    const fetchExercise = async () => {
      setIsLoading(true);

      try {
        const { data, errorExercise } = await apiClient.fetchExercises();

        if (errorExercise) setError(errorExercise);
        if (data?.exercises) setExercises(data?.exercises);
        console.log("fetched exercise");
        console.log(data);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
      setIsLoading(false);
    }

    // check if user is logged in
    if (user?.email) {
      fetchExercise();
    } else {
      setInitialized(true);
    }

  }, [user]);

    // check if there where any errors after doing a request
    if (error) {
        return <h1 style={{ color: "red" }}>An error has ocurred while fetching exercise items!</h1>
    }

    // check if it is loading before rendering main component
    if (isLoading) {
        return <h1 style={{ color: "white" }}>Loading exercises!</h1>
    }

    return (
        <ExerciseContext.Provider value={{exerciseContext: [exercises, setExercises]}}>
            {children}
        </ExerciseContext.Provider>
    )
}

export default ExerciseContext;