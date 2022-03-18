import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Login, Register, Error, ProfessorHomePage, StudentHomePage, ProfessorPrivateRoute, StudentPrivateRoute } from './pages'

function App() {
  return (
    <Router>
      <Switch>
        <ProfessorPrivateRoute path="/" exact={true}>
           <Home />
        </ProfessorPrivateRoute>
        <ProfessorPrivateRoute path="/professorhome" exact={true}>
          <ProfessorHomePage />
        </ProfessorPrivateRoute>
        <StudentPrivateRoute path="/studenthome" exact={true}>
          <StudentHomePage />
        </StudentPrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
