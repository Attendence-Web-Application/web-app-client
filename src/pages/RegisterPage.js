import React, {useState} from 'react'
import styled from 'styled-components'
import { Container } from 'bootstrap-4-react';
import lockerImage from '../assets/locker.png'
import { VscLock } from "react-icons/vsc";
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { CHECK_INFO_VALID_URL, CREATE_USER_URL } from '../utils/api'


async function checkInfoValid(email, name) {
    return fetch(CHECK_INFO_VALID_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            name: name
        })
    })
    .then(data => data.json())
}

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('professor');
  const [loading, setLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);


  const usernameChange = (e) => {
    setUsername(e.target.value)
  }
  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const typeChange = (e) => {
    setType(e.target.value)
  }
  const handleCreate = async e => {
    var role_id;
    if (type === "professor") {
      role_id = 1;
    } else {
      role_id = 2;
    }
    e.preventDefault()

    const status = await checkInfoValid(email, username);
    console.log("Status", status.email, status.name);
    if (status.email && status.name) {
      fetch(CREATE_USER_URL, {
        method: 'POST',
        body: JSON.stringify({ name: username, password: password, email: email, role_id: role_id }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          }
          setLoading(true);
          return res.json()
        })
        .catch(err => {console.log(err);})
    } else if (!status.email && !status.name) {
      setUsernameValid(false);
      setEmailValid(false);
    } else if (!status.email) {
      setUsernameValid(true);
      setEmailValid(false);
    }else if (!status.name) {
      setUsernameValid(false);
      setEmailValid(true);
    }


  }
  if (loading) {
    return <Loading setLoading={setLoading} />;
  }

  return(
    <Wrapper>
      <Container>
        <main className='main_section'>
          <div className='left'>
            <h2>New here?</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti impedit placeat harum vitae maxime. Nobis explicabo asperiores at recusandae illum!</p>
            <img src={lockerImage} alt="locker" className='lockerImage' />
          </div>
          <div className='mid'></div>
          <div className='right'>
            <h1>Create new account.</h1>
            <p>Already A Member? <Link to="/loginuser" className='login'>Log In</Link></p>
            <form className='input_section'>
              <input type="text" placeholder='Username' onChange={usernameChange} value={username} required />
              {!usernameValid && <p className='error-msg'>Username is already in use.</p>}
              <input type="email" placeholder='Email' onChange={emailChange} value={email} required />
              {!emailValid && <p className='error-msg'>Email address is already in use.</p>}
              <input type="password" placeholder='Password' onChange={passwordChange} value={password} required />
              <select value={type} onChange={typeChange}>
                <option value="professor" selected>Professor</option>
                <option value="student">Student</option>
              </select>
              <button className='btn-signin' type='submit' onClick={handleCreate}>CREATE</button>
            </form>
          </div>
        </main>
      </Container>
    </Wrapper>
  )
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
    margin-top: 18%;
    text-align:center;
  }
  .login{
    text-decoration:none;
    transition: 0.3s;
  }
  form{
    margin: 0 auto;
    width: 280px;
  }
  .error-msg{
    float:left;
    color: red;
  }
  input, select {
    display: block;
    background-color: #2c3038;
    margin: 0 auto;

    margin-top: 30px;
    width: 280px;
    border: none;
    padding: 8px;
    border-radius: 10px;
    color: white;
    transition: 0.2s;
    // box-shadow: rgba(255, 255, 255, 0.8) 2px 2px 10px 0px;
  }
  input:focus, select:focus{
    outline: none;
    border: solid 2px rgba(94, 131, 255, 0.8);
    box-shadow: rgba(94, 131, 255, 0.8) 1px 1px 5px 0px;
  }
  input:hover, select:hover{
    background-color: #434950;
  }


  .btn-signin{
    background-color:rgba(56, 101, 250, 0.8);
    border: none;
    outline: none;
    width: 280px;
    height: 40px;
    border-radius: 5px;
    margin-top: 40px;
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
  @media screen and (max-width: 600px) {
    .main_section{
      display: block;
    }
}
`

export default RegisterPage
