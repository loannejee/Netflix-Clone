import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import {
  BrowserRouter as Router,
  // In react-router-dom v6, "Switch" is replaced by routes "Routes"
  // Switch,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        {/* A <Switch>/<Routes> looks through its children <Route>s and renders the first one that matches the current URL. */}
        <Routes>
          {/* You also need to update the Route declaration: */}
          {/* <Route path="/" component={HomeScreen} /> */}
          <Route path="/" exact element={<HomeScreen/>} />
          <Route path="/login" element={<LoginScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
