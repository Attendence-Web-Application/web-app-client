import React, { useState } from "react";
import {useLocation} from "react-router-dom";
import NavBar from "../components/NavBar";
import styled from 'styled-components'
import RollCall from "../components/RollCall";
import Tabs from "../components/Tabs";
import AttendenceRecordTable from "../components/AttendenceRecordTable";
const ProfessorClassroom = () => {
    const token = sessionStorage.getItem('token');
    const type = sessionStorage.getItem('type');
    const location = useLocation();
    
    const classNumber = location.state.classNumber;
    const classId = location.state.classId;

    const curUserId = parseInt(sessionStorage.getItem("id"));
    const tabContent = ['Attendence Records', 'Student Attendence Rate']
    return (
        <Wrapper>
            <h1 className='title' style={{color: "white"}}>professor</h1>
            <NavBar/>
            <RollCall/>
            <Tabs classNumber={classNumber} classId={classId} tabContent={tabContent}>
            </Tabs>
            {/* <AttendenceRecordTable classNumber={classNumber} classId={classId}/> */}
        </Wrapper>
        
    );
}

const Wrapper = styled.main`
  background-color: #1f2125;
  backgroundSize: 'cover';
  height: 100vh;
  h1{
    color:white;
  }
  .tabs{
    margin-top:50px;
  }
}
`
export default ProfessorClassroom;