import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import RollCall from '../components/RollCall';
import Tabs from '../components/Tabs';
import { FIND_ROLL_CALL_BY_CLASS_URL } from '../utils/api';

const ProfessorClassroom = () => {
  const token = sessionStorage.getItem('token');
  const type = sessionStorage.getItem('type');
  const location = useLocation();

  const classNumber = location.state.classNumber;
  const classId = location.state.classId;
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const curUserId = parseInt(sessionStorage.getItem('id'));
  // const tabContent = ['Attendence Records', 'Student Attendence Rate']

  const fetchRollCallByClass = async (classId) => {
    try {
      const response = await fetch(FIND_ROLL_CALL_BY_CLASS_URL + classId, {
        mode: 'cors',
      });
      const data = await response.json();
      console.log('all rollcall of class ', classId);
      setRecord(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setRecord([]);
    fetchRollCallByClass(classId);
  }, [curUserId]);

  return (
    !isLoading && (
      <Wrapper>
        <h1 className="title" style={{ color: 'white' }}>
          professor
        </h1>
        <NavBar />
        <RollCall classId={classId} setRecord={setRecord} />
        <Tabs
          classNumber={classNumber}
          classId={classId}
          record={record}
        ></Tabs>
      </Wrapper>
    )
  );
};

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
`;
export default ProfessorClassroom;
