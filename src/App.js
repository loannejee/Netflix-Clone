import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import {
  BrowserRouter as Router,
  // In react-router-dom v6, "Switch" is replaced by routes "Routes"
  // Switch,
  Routes,
  Route
} from "react-router-dom";
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // implement persistence so when sign in, netflix account remembers you for a while:
  useEffect(() => {
    // when component mounts, listen to any authentication change. userAuth callback:
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        );
      } else {
        // Logged out
        dispatch(logout);
      }
    });

    // prevent data duplication stored in the local storage:
    return unsubscribe
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ?
          (<LoginScreen />)
          :
          ( // A <Switch>/<Routes> looks through its children <Route>s and renders the first one that matches the current URL. 
            <Routes>
              {/* You also need to update the Route declaration: */}
              {/* <Route path="/" component={HomeScreen} /> */}
              <Route path="/" element={<HomeScreen />}>
                <Route path="/profile" element={<ProfileScreen />} />
              </Route>
            </Routes>
          )
        }
      </Router>
    </div >
  );
}

export default App;
