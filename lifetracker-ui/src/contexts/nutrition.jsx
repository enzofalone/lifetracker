import * as React from 'react';
import apiClient from '../services/apiClient';
import AuthContext from './AuthProvider';

const NutritionContext = React.createContext({});

export const NutritionContextProvider = ({ children }) => {
  // useContext hook
  const { userContext } = React.useContext(AuthContext);
  const [ user, setUser ] = userContext;

  // useEffect hooks
  const [nutritions, setNutritions] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  // after component is mounted after authenticating user, fetch all the data if possible
  React.useEffect(() => {
    const fetchNutrition = async () => {
      setIsLoading(true);

      try {
        const { data, errorNutrition } = await apiClient.fetchNutritions();

        if (errorNutrition) setError(errorNutrition);
        if (data?.nutritions) setNutritions(data?.nutritions);
        console.log("fetched nutrition");
        console.log(data);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
      setIsLoading(false);
    }

    // check if user is logged in
    if (user?.email) {
      fetchNutrition();
    } else {
      setInitialized(true);
    }

  }, [user]);

  // check if there where any errors after doing a request
  if (error) {
    return <h1 style={{ color: "red" }}>An error has ocurred while fetching nutrition items!</h1>
  }

  // check if it is loading before rendering main component
  if (isLoading) {
    return <h1 style={{ color: "white" }}>Loading nutrition!</h1>
  }

  // check if the nutrition data has been initialized, if not display a loading message
  return (
    <NutritionContext.Provider value={{ nutritionContext: [nutritions, setNutritions] }}>
      {children}
    </NutritionContext.Provider>
  )

}

export default NutritionContext;