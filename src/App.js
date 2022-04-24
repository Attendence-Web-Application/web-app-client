import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Login,
  Register,
  Error,
  UserHome,
  UserHomePrivateRoute,
  ProfessorClassroom,
  StudentClassroom,
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <UserHomePrivateRoute path="/homepage" exact={true}>
          <UserHome />
        </UserHomePrivateRoute>
        <Route path="/loginuser">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/professorClassroom">
          <ProfessorClassroom />
        </Route>
        <Route path="/StudentClassroom">
          <StudentClassroom />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
