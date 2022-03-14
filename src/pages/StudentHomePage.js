import React, { useState, useContext, useReducer, useEffect } from 'react'
import { Container } from 'bootstrap-4-react';
import styled from 'styled-components'
import NavBar from '../components/NavBar';
import Classrooms from '../components/Classrooms'; 
import AddClassroomStudent from '../components/AddClassroomStudent';
const StudentHomePage = () => {
  const [user, setUser] = useState('');
  const [classrooms, setClassrooms] = useState([]);

  //read all classrooms of this professor (need to change table)
  const fetchData = async () => { 
    try {
      const response = await fetch('http://localhost:8080/getAll', {mode:'cors'});
      const data = await response.json();
      setClassrooms(data)
      //use localStorage
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
       fetchData();
        const users = localStorage.getItem('user');
        console.log("user", users);
        setUser(user);
    }, []);


  return (
    <Wrapper>
      <React.Fragment>
        {/* <NavBar/>
        <NewClassroom/> */}
        <Classrooms classrooms = {classrooms} setClassrooms = {setClassrooms} />
      </React.Fragment>
    </Wrapper>

  )
}

const Wrapper = styled.main`
  background-color: #1f2125;
  backgroundSize: 'cover',
}
`


export default StudentHomePage
