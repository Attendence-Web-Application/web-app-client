import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Classroom from './Classroom';
import AddClassroomProfessor from './AddClassroomProfessor';
import AddClassroomStudent from '../components/AddClassroomStudent';
import NavBar from './NavBar';
import { Container } from 'bootstrap-4-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import {
  DELETE_STUDENT_CLASS_URL,
  DELETE_PROFESSOR_CLASS_URL,
  FIND_ALL_USER_URL,
  FIND_ROLL_CALL_BY_CLASS_URL,
} from '../utils/api';

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
const Classrooms = ({ classrooms, setClassrooms }) => {
  const token = sessionStorage.getItem('token');
  const type = sessionStorage.getItem('type');
  const [isLogin, setIsLogin] = useState(token);
  const [isStudent, setIsStudent] = useState(type === 'student');
  const curUserId = sessionStorage.getItem('id');
  const [userData, setUserData] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const fetchAllUser = async () => {
    try {
      const response = await fetch(FIND_ALL_USER_URL, { mode: 'cors' });
      const data = await response.json();
      setUserData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEnterClass = (id) => {
    console.log('enter into ', id);
  };

  const deleteStudentClass = async (id) => {
    try {
      console.log(DELETE_STUDENT_CLASS_URL + curUserId + '_' + id);
      const response = await fetch(
        DELETE_STUDENT_CLASS_URL + curUserId + '_' + id,
        { mode: 'cors', method: 'DELETE' }
      );
      const data = await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProfessorClass = async (id) => {
    try {
      const response = await fetch(DELETE_PROFESSOR_CLASS_URL + id, {
        mode: 'cors',
        method: 'DELETE',
      });
      const data = await response.json();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteClass = async (id) => {
    const remainClass = classrooms.filter((p) => id !== p.id);
    if (isStudent) {
      //delete in class_enroll
      //check whether start roll call
      try {
        const response = await fetch(FIND_ROLL_CALL_BY_CLASS_URL + id, {
          mode: 'cors',
        });
        const data = await response.json();
        if (data.length == 0) {
          deleteStudentClass(id);
          setClassrooms(remainClass);
        } else {
          setIsShow(true);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      //delete in class
      deleteProfessorClass(id);
      setClassrooms(remainClass);
    }
  };

  const clearState = () => {
    setIsLogin(false);
  };
  useEffect(() => {
    console.log(sessionStorage.getItem('id'));
    fetchAllUser();
    if (sessionStorage.getItem('id') == null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [sessionStorage.getItem('id')]);

  const classes = useStyles();
  return (
    userData != null && (
      <React.Fragment>
        <NavBar props={clearState} />
        <ButtonWrapper>
          {isLogin && isStudent && (
            <AddClassroomStudent
              classrooms={classrooms}
              setClassrooms={setClassrooms}
            />
          )}{' '}
          ||
          {isLogin && !isStudent && (
            <AddClassroomProfessor
              classrooms={classrooms}
              setClassrooms={setClassrooms}
            />
          )}
        </ButtonWrapper>
        <Wrapper>
          <div
            className="row row-cols-auto row-cols-md-3"
            style={{ margin: '0 auto', float: 'none' }}
          >
            {isLogin &&
              classrooms.map((item, index) => {
                return (
                  <Classroom
                    className="shadow-lg p-3 mb-5 bg-white rounded"
                    key={index}
                    item={item}
                    isStudent={isStudent}
                    userData={userData}
                    handleEnterClass={handleEnterClass}
                    handleDeleteClass={handleDeleteClass}
                  />
                );
              })}
          </div>
        </Wrapper>
        {isShow && (
          <DialogWrapper>
            <Dialog open={isShow} onClose={!isShow} className="dialog_box">
              <div style={{ width: 500, margin: '0 auto' }}>
                <DialogTitle
                  className={classes.alignItemsAndJustifyContentTitle}
                >
                  {'Can not drop class after first roll call'}
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
      </React.Fragment>
    )
  );
};
const ButtonWrapper = styled.main`
  margin: 0 auto;
  height: 10vh;
  width: 100vw;
`;
const Wrapper = styled.main`
  margin: 0 auto;
  width: 150vh;
  height: 100vh;
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
export default Classrooms;
