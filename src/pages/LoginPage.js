import React, { useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import calender from '../assets/calender.png'
import chart from '../assets/chart.png'
import thumb_up from '../assets/thumb-up.png'

const LoginPage = () => {
    const [email, setEmail] = useState('');;
    const [password, setPassword] = useState('');

    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    return <Wrapper>
        <div className='left'>
            <h1>Log in</h1>
            <form>
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
        </div>
        <div className='right'>
            <section className='right_icon_section'>
                <img src={calender} alt="locker" className='icon' />
                <img src={chart} alt="locker" className='icon' />
                <img src={thumb_up} alt="locker" className='icon' />
            </section>
            <section className='right_text_section'>
                <h2>Start to Record Wisely</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi optio, error autem deserunt sunt eum?</p>
            </section>
        </div>
    </Wrapper>
}

const Wrapper = styled.main`

    display: flex;
    height: 100vh;
    .left{
        flex:1;
        text-align:center;
        justify-content: center;
        margin-top: 18vh;
    }
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

    .right{
        color: white;
        background-color: #1f2125;        
        flex:1;
    }
    .right_icon_section{
        display:flex;
        justify-content: center;
        margin-top: 18vh;
    }
    .right_text_section{
        text-align:center;
        margin: 0 auto;
    }
    .right_text_section p{
        margin-left: auto;
        margin-right: auto;
        width: 40vh;
    }
    .icon{
        height:140px;
        width:140px;
        margin: 20px;
    }
`

export default LoginPage
