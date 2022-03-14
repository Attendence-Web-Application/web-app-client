import React from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AddClassroomProfessor = () => {
    return (
        <Wrapper>
            <p style={{color: 'white', marginLeft: '10vw', fontSize: 18 + 'px', marginTop: 20 + 'px', float: "left"}}>Your Classrooms</p>
            <button type="button" class="btn btn-dark" style={{marginRight: '10vw', marginTop: 20 + 'px', float: "right"}}><Link to="/createClassroom" className='login'>Create New Classroom</Link></button>
        </Wrapper>
    );
}

const Wrapper = styled.main`
  .login{
    text-decoration:none;
    transition: 0.3s;
    color: white;
  }
  `
export default AddClassroomProfessor;