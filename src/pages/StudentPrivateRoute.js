import React, {useState, useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AttendanceContext } from '../context/context';

const StudentPrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useContext(AttendanceContext);
    // const isUser = isAuthenticated && token;
    const token = sessionStorage.getItem('token');
    const type = sessionStorage.getItem('type');
    const isProfessor = token && type === "student";

    return (
        <Route
        {...rest}
        render={() => { 
            return isProfessor ? children : <Redirect to='/login'></Redirect>;
        }}
        ></Route>
    );
};
export default StudentPrivateRoute;