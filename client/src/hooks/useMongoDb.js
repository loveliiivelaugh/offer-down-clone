import React, { useState, useEffect, useContext, useMemo, createContext } from 'react';
import { useAuth } from "./useAuth.js";
import { useRouter } from "./useRouter.js";
import Api from '../api';


export const MongoContext = createContext();

const MongoContextProvider = ({ children }) => {
  const [initialState, setInitialState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const auth = useAuth();
  console.log(auth);

  useEffect(() => {
    const fetchUser = async (user) => {
      setInitialState({ ...initialState, status: "loading" });
      
      console.log(id);

      await Api.getUser(user.uid)
        .then(response => {
          console.info(response);

          // Data we want to include from auth user object
          let finalUser = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.displayName,
            picture: user.photoURL,
          };

          setInitialState({ 
            ...initialState, 
            status: "success", 
            data: response.data[0] && finalUser
          });

        })
        .catch(error => {
          setInitialState({ ...initialState, status: "fail", error: error });
        });
    };

    if (auth.user) {
      fetchUser(auth.user.auth);
    } 

  }, [auth]);

  console.log(initialState);

  //https://www.geeksforgeeks.org/react-js-usememo-hook/#:~:text=The%20useMemo%20is%20a%20hook%20used%20in%20the,next%20time%20as%20it%20returns%20the%20cached%20result.

  // Format final user object and merge extra data from database
  const useMemoizedState = (user) => {
    useMemo(() => {
      if (!user) return user;

      // Data we want to include from auth user object
      let finalUser = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.displayName,
        picture: user.photoURL,
      };

      switch (initialState.status) {
        case "idle":
          // Return null user until we have db data to merge
          return null;
        case "loading":
          return null;
        case "error":
          // Log query error to console
          console.error(initialState.error);
          return null;
        case "success":
          // If user data doesn't exist we assume this means user just signed up and the createUser
          // function just hasn't completed. We return null to indicate a loading state.
          if (initialState.data === null) return null;

          // Merge user data from database into finalUser object
          return Object.assign(finalUser, initialState.data);

        // no default
      }

      return {finalUser, initialState};
    }, [user, initialState]);
  };


  const memoizedState = useMemoizedState(auth.user);

  console.log(initialState)
  
  return (
    <MongoContext.Provider value={initialState}>
      { children }
    </MongoContext.Provider>
    );
};


export default MongoContextProvider

