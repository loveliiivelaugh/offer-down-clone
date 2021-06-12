// refer to https://usehooks.com/useAuth to learn more about this custom hook

import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "../utils/firebase";
// import { useMongoDb } from "./useMongoDb.js";
import { useRouter } from "./useRouter.js";
//spinner --> https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";


const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response);
        return response;
      });
  };
  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response);
        return response;
      });
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };
  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };
  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  // const loggedInUser = useMongoDb();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ auth: user });
      } else {
        setUser(false);
      }
    });

    // if (user) {
    //   loggedInUser.setLoggedInUser(user);
    // }
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

//https://usehooks.com/useRequireAuth/
// A Higher Order Component for requiring authentication
// Hook (useRequireAuth.js)
export const requireAuth = (Component) => {
  return (props) => {
    const auth = useAuth();
    const router = useRouter();
    // If auth.user is false that means we're not
    // logged in and should redirect.
    useEffect(() => {
      if (auth.user === false) {
        router.push('/home');
      }
    }, [auth, router]);

    // Show loading indicator
    // We're either loading (user is null) or we're about to redirect (user is false)
    if (!auth.user) {
      return <ClipLoader />;
    }

    // Render component now that we have user
    return <Component {...props} />;
  }
}