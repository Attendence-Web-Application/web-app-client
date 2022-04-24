import React, { useState, useContext, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import Classrooms from '../components/Classrooms';
import { Redirect } from 'react-router-dom';
import { AttendanceContext } from '../context/context';
import { FIND_CLASS_ID_URL, FIND_CLASS_URL, FIND_CLASS_BY_USER_URL } from '../utils/api';


const UserHomePage = () => {
  const { isAuthenticated } = useContext(AttendanceContext);
  const token = sessionStorage.getItem('token');
  const type = sessionStorage.getItem('type');
  const isProfessor = token && type === "professor";
  const isStudent = token && type === "student"

  // const [user, setUser] = useState(sessionStorage.getItem('user'));
  const [classrooms, setClassrooms] = useState([]);
  const curUserId = parseInt(sessionStorage.getItem("id"));

  const fetchClassById = async (classId) => {
      try {
        const response = await fetch(FIND_CLASS_URL + classId, {mode:'cors'});
        const data = await response.json();
        setClassrooms(prev => [...prev, data]);
      }
      catch (e) {
        console.log(e)
      }
  }
  const fetchStudentData = async () => {
      try {
        const response = await fetch(FIND_CLASS_ID_URL + curUserId, {mode:'cors'});
        const data = await response.json();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            fetchClassById(data[i]);
        }
      }
      catch (e) {
        console.log(e)
      }
  }

  const fetchProfessorData = async () => {
    try {
      const response = await fetch(FIND_CLASS_BY_USER_URL + curUserId, {mode:'cors'});
      const data = await response.json();
      // console.log("data", data);
      setClassrooms(data);
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
      setClassrooms([]);
       if (isStudent) {
          fetchStudentData();
       }
       else {
          fetchProfessorData();
       }

    }, [curUserId]);


  return (
    (token ?
      (isProfessor
      &&
      <Wrapper>
        <React.Fragment>
          {/* <NavBar/>
          <NewClassroom/> */}
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
            <Classrooms classrooms={classrooms} setClassrooms={setClassrooms} />
        </React.Fragment>
      </Wrapper>)
      :
      <Redirect to='/loginuser'></Redirect>
    )


  )
}

const Wrapper = styled.main`
  background-color: #1f2125;
  backgroundSize: 'cover',
  h1{
    color:white;
  }
}
`


export default UserHomePage
