import React from 'react'
import styled from 'styled-components'
import { Container } from 'bootstrap-4-react';
import lockerImage from '../assets/locker.png'
import { VscLock } from "react-icons/vsc";

const RegisterPage = () => {
  return <Wrapper>
    <Container>
      <main className='main_section'>
        <div className='left'>
          <h2>New here?</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti impedit placeat harum vitae maxime. Nobis explicabo asperiores at recusandae illum!</p>
          <img src={lockerImage} alt="locker" className='lockerImage' />
        </div>
        <div className='mid'></div>
        <div className='right'>
          <h1>Sign in</h1>
          <div className='input_section'>
            <input type="text" placeholder='Username' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <button className='btn-signin'>SIGN IN</button>
          </div>
          
        </div>
      </main>
    </Container>
  </Wrapper>
}


const Wrapper = styled.main`
  color: white;
  background-color: #1f2125;
  height: 100vh; 

  .main_section{
    display: flex;
  }
  .left{
    flex: 1;
    margin-top: 20%;
    text-align:center;
  }
  .mid{
    flex: 0.5
  }
  .right{
    flex: 2;
    margin-top: 20%;
    text-align:center;
  }
  input {
    display: block;
    background-color: #2c3038;
    margin: 0 auto;
    margin-bottom: 1.25em;
    margin-top: 30px;
    width: 280px;
    border: none; 
    padding: 8px;
    border-radius: 10px;
    // box-shadow: rgba(255, 255, 255, 0.8) 2px 2px 10px 0px;
  }
  input:focus{
    outline: none;
    border: solid 2px rgba(94, 131, 255, 0.8);
    box-shadow: rgba(94, 131, 255, 0.8) 1px 1px 5px 0px;
  }
  
  .btn-signin{
    background-color:rgba(56, 101, 250, 0.8);
    border: none;
    outline: none;
    width: 280px;
    height: 40px;
    border-radius: 5px;
    margin-top: 10px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s;
  }
  .btn-signin:hover{
    background-color:rgba(109, 117, 255, 0.8);
  }
  
  .lockerImage{
    width: 70%;
    margin-top:10%;
    filter: drop-shadow(0px -2px 15px #fff);
  }
`

export default RegisterPage
