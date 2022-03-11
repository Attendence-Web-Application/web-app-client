import React, { Component, useState, useContext, useReducer, useEffect } from 'react';
import lockerImage from '../assets/locker.png'
const NavBar = (props) => { //or destruct the props: {total}
    const [user, setUser] = useState('');
    useEffect(() => {
        const users = localStorage.getItem('user');
        setUser(users);
    }, []);
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <img src={lockerImage} alt="Attendence" width="25px"/>
                <a class="navbar-brand" href="#">Attendence System</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <span class="nav-link active">Welcome {user}!</span>
                    <a class="nav-link active" aria-current="page" href="#">HomePage</a>
                    <a class="nav-link" href="#">Profile</a>
                    <a class="nav-link" href="#">Logout</a>
                </div>
                </div>
            </div>
        </nav>
    );
};
 
export default NavBar;