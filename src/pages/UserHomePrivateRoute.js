import React, {useState, useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AttendanceContext } from '../context/context';

const UserHomePrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useContext(AttendanceContext);
    // const isUser = isAuthenticated && token;
    const token = sessionStorage.getItem('token');

    return (
        <Route
        {...rest}
        render={() => { 
            return token ? children : <Redirect to='/login'></Redirect>;
        }}
        ></Route>
    );
};
export default UserHomePrivateRoute;