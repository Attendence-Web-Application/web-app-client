import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Login, Register, Error, UserHome, UserHomePrivateRoute, ProfessorClassroom } from './pages'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
           <Home />
        </Route>
        <UserHomePrivateRoute path="/homepage" exact={true}>
          <UserHome />
        </UserHomePrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/professorClassroom">
          <ProfessorClassroom/>
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
