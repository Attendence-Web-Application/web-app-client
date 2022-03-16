import React, { useState, useContext, useReducer, useEffect } from 'react'
import { Container } from 'bootstrap-4-react';
import styled from 'styled-components'
import NavBar from '../components/NavBar';
import Classrooms from '../components/Classrooms'; 

const FIND_CLASS_ID_URL = 'http://localhost:8080/class_enrolled/getClassEnroll/user';
const FIND_CLASS_URL = 'http://localhost:8080/class/getClass/id'
const ProfessorHomePage = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [classrooms, setClassrooms] = useState([]);
  const curUserId = parseInt(localStorage.getItem("id"));

  const fetchClass = async (classId) => {
      let classArr = [];
      for (let id = 0; id < classId.length; id++) {
          const response = await fetch(FIND_CLASS_URL + classId[id], {mode:'cors'});
          const data = await response.json();
          classArr.push(data);
      }
      setClassrooms(classArr);
  }

  //read all classrooms of this professor
  const fetchData = async () => { 
    try {
      const response = await fetch(FIND_CLASS_ID_URL + curUserId, {mode:'cors'});
      const data = await response.json();
      fetchClass(data);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
       fetchData();
    }, [user]);


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


export default ProfessorHomePage
