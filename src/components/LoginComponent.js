import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { Link, useHistory} from 'react-router-dom';
import { AttendanceContext } from '../context/context';

async function loginUser(email, password) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email, 
            password: password
        })
    })
    .then(data => data.json())
}

const LoginComponent = () => {
    const history = useHistory();
    const {setIsAuthenticated, setType, setToken } = useContext(AttendanceContext);
    

    const [email, setEmail] = useState('');;
    const [password, setPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const token = await loginUser(email, password);
        if (token.success === true) {
            setToken(token.token)
            setIsAuthenticated(true);
            setIsPasswordCorrect(true);
            sessionStorage.setItem('token', token.token);
            if (token.type === "professor") {
                setType(token.type);
                sessionStorage.setItem('type', token.type);
                history.push('/professorhome');
            } else if (token.type === "student") {
                setType(token.type);
                sessionStorage.setItem('type', token.type);
                history.push('/studenthome');
            }
        } else {
            setIsAuthenticated(false);
            setIsPasswordCorrect(false);
        }

    }

    

    return (
         <Wrapper className='left'>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder='@mail.com' onChange={emailChange} value={email} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder='Password' onChange={passwordChange} value={password} required />
                </div>
                <button className='btn-login' type='submit'>Log In</button>
            </form>
            <p>Don't have an account? <Link to="/register" className='register'>Register</Link></p>
            {isPasswordCorrect ? "":<p>Wrong password</p>}
        </Wrapper>
        
    );
    
}




const Wrapper = styled.main`
  .left h1{
        font-weight: 800;
    }
    .left p{
        margin-top: 3vh;
    }
    .register{
        text-decoration:none;
        transition: 0.3s;
    }
    label{
        float: left;
        font-weight: 600;
        color: #2c3038;
    }
    form div{
        margin-left: auto;
        margin-right: auto;
        width: 280px;
        margin-top:1vh;
    }
    input {
        display: block;
        background-color: #f3f3f3;
        margin: 0 auto;
        margin-bottom: 1.20em;
        width: 280px;
        border: none; 
        padding: 8px;
        border-radius: 10px;
        color: black;
        transition: 0.2s;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }
    .btn-login{
        background-color:rgba(56, 101, 250, 0.8);
        border: none;
        outline: none;
        width: 280px;
        height: 40px;
        border-radius: 5px;
        margin-top: 20px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: 0.5s;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
    .btn-login:hover{
        background-color:rgba(109, 117, 255, 0.8);
    }

`
 
export default LoginComponent;