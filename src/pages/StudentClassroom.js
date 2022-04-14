import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import RollCall from '../components/RollCall';
import Tabs from '../components/Tabs';
import StudentCheckInTable from '../components/StudentCheckInTable';
import {
  FIND_ROLL_CALL_ID_BY_CLASS_URL,
  FIND_ATTENDANCE_RECORD_BY_USER_URL,
  BY_ROLL_CALL_ID_URL,
} from '../utils/api';
import axios from 'axios';

const StudentClassroom = () => {
  const location = useLocation();
  const classNumber = location.state.classNumber;
  const classId = location.state.classId;
  const curUserId = parseInt(sessionStorage.getItem('id'));

  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAttendanceRecord = async (classId, userId) => {
    console.log('classId received: ', classId);
    try {
      const response = await fetch(FIND_ROLL_CALL_ID_BY_CLASS_URL + classId, {
        mode: 'cors',
      });
      const rollCalls = await response.json();

      try {
        rollCalls.forEach(async (row) => {
          (
            await fetch(
              FIND_ATTENDANCE_RECORD_BY_USER_URL +
                userId +
                BY_ROLL_CALL_ID_URL +
                row.id
            )
          )
            .json()
            .then((e) => {
              setRecord((prev) => [...prev, e]);
            });
        });

        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAttendanceRecord(classId, curUserId);
  }, [curUserId]);

  return (
    !isLoading && (
      <Wrapper>
        <h1 className="title" style={{ color: 'white' }}>
          student
        </h1>
        <NavBar />
        <StudentCheckInTable
          record={record}
          setRecord={setRecord}
        ></StudentCheckInTable>
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
export default StudentClassroom;
