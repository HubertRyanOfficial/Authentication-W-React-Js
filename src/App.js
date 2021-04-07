import React from "react";
import "./config/styles/global.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// + config

import "./config/database/firebaseConfig";

// + config publics styles

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// * pages

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import ErrorAuth from "./pages/ErrorAuth";

// * own

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/error" component={ErrorAuth} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
