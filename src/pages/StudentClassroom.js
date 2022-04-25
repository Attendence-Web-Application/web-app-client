import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import RollCall from '../components/RollCall';
import Tabs from '../components/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import StudentCheckInTable from '../components/StudentCheckInTable';
import {
  FIND_ROLL_CALL_ID_BY_CLASS_URL,
  FIND_ATTENDANCE_RECORD_BY_USER_URL,
  BY_ROLL_CALL_ID_URL,
} from '../utils/api';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 15,
  },
  alignItemsAndJustifyContentTitle: {
    width: 500 + 'px',
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: '#3d3c40',
    color: 'white',
  },
  alignItemsAndJustifyContentForm: {
    width: 500 + 'px',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    backgroundColor: '#3d3c40',
    color: 'white',
  },
}));

const StudentClassroom = () => {
  const location = useLocation();
  const classNumber = location.state.classNumber;
  const classId = location.state.classId;
  const curUserId = parseInt(sessionStorage.getItem('id'));

  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);

  const fetchAttendanceRecord = async (classId, userId) => {
    console.log('classId received: ', classId);
    try {
      const response = await fetch(FIND_ROLL_CALL_ID_BY_CLASS_URL + classId, {
        mode: 'cors',
      });
      const rollCalls = await response.json();
      console.log("rollCalls: ", rollCalls)
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
              e['expired_times'] = row.expired_times
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
  const classes = useStyles();
  return (
    <>
    {!isLoading && (
      <Wrapper>
        <NavBar />
        <StudentCheckInTable
          record={record}
          setRecord={setRecord}
          setIsShow={setIsShow}
        ></StudentCheckInTable>
      </Wrapper>
    )}
    {isShow && (
        <DialogWrapper>
          <Dialog open={isShow} onClose={!isShow} className="dialog_box">
            <div style={{ width: 500, margin: '0 auto' }}>
              <DialogTitle
                className={classes.alignItemsAndJustifyContentTitle}
              >
                {'Exceed the Expired Time of This RollCall'}
              </DialogTitle>
              <DialogActions style={{ backgroundColor: '#3e3d40' }}>
                <InnerWrapper>
                  <button
                    className="confirm-btn"
                    onClick={() => setIsShow(false)}
                  >
                    OK
                  </button>
                </InnerWrapper>
              </DialogActions>
            </div>
          </Dialog>
        </DialogWrapper>
      )}
      </>
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
const InnerWrapper = styled.main`
  .confirm-btn {
    background-color: #6167f3;
    color: white;
    border-radius: 3px;
    border-style: solid;
    border: none;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
const DialogWrapper = styled.main`
  width: 500px;
  .login {
    text-decoration: none;
    transition: 0.3s;
    color: white;
  }
  .custom-flex-justify-center {
    display: flex;
    align-items: center;
    justify-content: center;
    // text-align:center;
  }
`;
export default StudentClassroom;
