import React, { useState, useContext, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import Classrooms from '../components/Classrooms'; 
import { Redirect } from 'react-router-dom';
import { AttendanceContext } from '../context/context';

const FIND_CLASS_ID_URL = 'http://localhost:8080/class_enrolled/getClassEnroll/user';
const FIND_CLASS_URL = 'http://localhost:8080/class/getClass/id'

const UserHomePage = () => {
  const { isAuthenticated } = useContext(AttendanceContext);
  const token = sessionStorage.getItem('token');
  const type = sessionStorage.getItem('type');
  const isProfessor = token && type === "professor";
  const isStudent = token && type === "student"

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
    (token ?
      (isProfessor
      && 
      <Wrapper>
        <React.Fragment>
          {/* <NavBar/>
          <NewClassroom/> */}
            <h1 className='title'>professor</h1>
            <Classrooms classrooms={classrooms} setClassrooms={setClassrooms} />
        </React.Fragment>
        </Wrapper>)
      || 
      (isStudent
        &&
      <Wrapper>
        <React.Fragment> 
          {/* <NavBar/>
          <NewClassroom/> */}
            <h1 className='title'>student</h1>
            <Classrooms classrooms={classrooms} setClassrooms={setClassrooms} />
        </React.Fragment>
      </Wrapper>)
      : 
      <Redirect to='/login'></Redirect>
    )
    

  )
}

const Wrapper = styled.main`
  background-color: #1f2125;
  backgroundSize: 'cover',
  .title{
    color:white;
  }
}
`


export default UserHomePage
