import * as React from 'react';
import apiClient from '../services/apiClient';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState({});

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    // if user token exists in local storage, 
    // get token and fetch from the db
    // to see if token is valid and retrieve data
    console.log("asdasdasd")
    const fetchData = async () => {
      setIsProcessing(true);
      try {
        const { data, error } = await apiClient.fetchUserFromToken();
        if (data) {
          setUser(data.user);
          
          console.log("user logged in from local storage token!!!")
        }
        
        if (error) setError(error);
      } catch (error) {
        console.error("Fetching user from token error:", error);
        setError(error);
      }

      setInitialized(true);
      setIsProcessing(false);
    }

    const token = localStorage.getItem(apiClient.tokenName);

    if (token) {
      apiClient.setToken(token);
      console.log(token)

      fetchData();
    } else {
      setInitialized(true);
    }
  }, []);

  // check if it is still fetching data between renders
  if (!initialized) {
    return (<h1>Authenticating user...</h1>)
  }

  // check if any errors have been found in useEffect request
  if(error) {
    return (<h1>There has been an error aunthenticating the user!</h1>)
  }

  return (
    <AuthContext.Provider value={{ userContext: [user, setUser] }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;