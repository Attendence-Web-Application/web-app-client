import React, { useState, useContext, useReducer, useEffect } from 'react'
import TestList from '../components/TestList'
import { Container } from 'bootstrap-4-react';
import NavBar from '../components/NavBar';

const ProfessorHomePage = () => {
  const [user, setUser] = useState('');
  const [test, setTest] = useState([]);
  
  useEffect(() => {
        const users = localStorage.getItem('user');
        console.log("user", users);
        setUser(user);
    }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/getAll', {mode:'cors'});
      const data = await response.json();
      setTest(data)
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])


  return (
    <Container>
      <React.Fragment>
        <h1>home</h1>
        <NavBar/>
        <TestList test={test} setTest={setTest}  />
      </React.Fragment>

    </Container>

  )
}



export default ProfessorHomePage
