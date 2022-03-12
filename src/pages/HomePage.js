import React, { useState, useContext, useReducer, useEffect } from 'react'
import TestList from '../components/TestList'
import { Container } from 'bootstrap-4-react';
import styled from 'styled-components';


const HomePage = () => {
  const [home, setHome] = useState('home');
  const [test, setTest] = useState([]);
  
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
    <Wrapper>
      <Container>
        <h1>home</h1>
        <TestList test={test} setTest={setTest}  />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  
`


export default HomePage
