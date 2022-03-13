import React, { Component, useState, useContext, useReducer, useEffect } from 'react';
import lockerImage from '../assets/locker.png'
const NavBar = ({props}) => { //or destruct the props: {total}
    const [user, setUser] = useState('');
    const [isLogin, setLogin] = useState(false);

    const logout = () => {
        localStorage.clear();
        setUser('')
        setLogin(false);
        props();
    }
    useEffect(() => {
        const users = localStorage.getItem('user');
        if (users !== null) {
            setUser(users);
            setLogin(true);
        }
    }, []);
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <img src={lockerImage} alt="Attendence" width="25px"/>
                <a class="navbar-brand" href="#">Attendence System</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    {isLogin && <span class="nav-link active" style={{color:'white'}}>Welcome {user}!</span>}
                    {!isLogin && <span class="nav-link active" style={{color:'white'}}>Please Sign in</span>}
                    <a class="nav-link active" aria-current="page" href="#" style={{color:'white'}}>HomePage</a>
                    <a class="nav-link" href="#" style={{color:'white'}}>Profile</a>
                    {isLogin && <span class="nav-link" onClick={logout} style={{color:'white'}}>Signout</span>}
                    {!isLogin && <span class="nav-link" onClick={logout} style={{color:'white'}}>Signin</span>}
                </div>
                </div>
            </div>
        </nav>
    );
};
 
export default NavBar;