import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { Home, Login, SignIn, Register, Test, Error, ProfessorHomePage } from './pages'


function App() {
  // const token = localStorage.getItem('accessToken');
  const token = useState("asd");

  return (
    <Router>
      {token ?
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/professorhome">
            <ProfessorHomePage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        :
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      }
    </Router>
  );
}

export default App;
