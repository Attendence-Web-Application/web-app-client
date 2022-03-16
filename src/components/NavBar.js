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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <img src={lockerImage} alt="Attendence" width="25px"/>
                <a className="navbar-brand" href="#">Attendence System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {isLogin && <span className="nav-link active" style={{color:'white'}}>Welcome {user}!</span>}
                    {!isLogin && <span className="nav-link active" style={{color:'white'}}>Please Sign in</span>}
                    <a className="nav-link active" aria-current="page" href="#" style={{color:'white'}}>HomePage</a>
                    <a className="nav-link" href="#" style={{color:'white'}}>Profile</a>
                    {isLogin && <span className="nav-link" onClick={logout} style={{color:'white'}}>Signout</span>}
                    {!isLogin && <span className="nav-link" onClick={logout} style={{color:'white'}}>Signin</span>}
                </div>
                </div>
            </div>
        </nav>
    );
};
 
export default NavBar;