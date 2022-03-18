import React, {useState} from "react";
import styled from 'styled-components'
import InvitationForm from './InvitationForm';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from '@material-ui/core/styles'
import '../index.css';


const useStyles = makeStyles(theme => ({
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
}))

const SEARCH_CLASS_URL = 'http://localhost:8080/class/getClass/';
const CHECK_ENROLL_URL = 'http://localhost:8080/class_enrolled/getClassEnroll/';
const INSERT_ENROLL_URL = 'http://localhost:8080/class_enrolled/createEnroll/';

const AddClassroomStudent = ({classrooms, setClassrooms}) => {
    const [isShowForm, setIsShowForm] = useState(false);
    const [isShowNotExist, setIsShowNotExist] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [existCourse, setExistCourse] = useState('');
    const curUserId = parseInt(localStorage.getItem('id'));
    console.log(classrooms);
    const handleClick = () => {
        setIsShowForm(true);
        console.log("change")
    }

    //insert (userId, classId) record into "class_enrolled" table
    const insertEnrollRecord = async (userId, classData) => {
        const response = await fetch(CHECK_ENROLL_URL + userId + "_" + classData.id, {mode: 'cors'});
        
        try{
            const data = await response.json();
            //if the class has been created by the professor, pop out a message
            setExistCourse(classData.number);
            setIsCreated(true);
        }
        catch (e) { 
            const params = {
                method: 'POST',
                body: JSON.stringify({ id: {classId: classData.id, userId: userId}, attendance_times: 0, attendance_rate: "0"}),
                headers: { 'Content-Type': 'application/json' },
            }

            const createResponse = await fetch(INSERT_ENROLL_URL, params);
            const newData = await createResponse.json();
            setClassrooms(arr => [...arr, classData]);
        }
    }

    const checkClassCode = async (number, code) => {
        try {
            const response = await fetch(SEARCH_CLASS_URL + number, {mode: 'cors'});
            const data = await response.json();
            if (data.length == 0) { //no such class
                setIsShowNotExist(true);
            }
            else { //check code
                insertEnrollRecord(curUserId, data[0]);
            }
        }
        catch(e) {
            console.log(e);
        }
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const newClassroom = event.target.elements.classroom.value;
        const newCode = event.target.elements.code.value;
        setExistCourse(newClassroom);
        //check code 
        checkClassCode(newClassroom, newCode);
        //change status
        setIsShowForm(false);

    }
    
    const handleMessageCancel = () => {
        setIsShowNotExist(false);
        setIsCreated(false);
    }

    const handleClickOutside = () => {
        setIsShowForm(false);
        setIsCreated(false);
    }
    const classes = useStyles();
    return (
        <>
        <Wrapper>
            <p style={{color: 'white', marginLeft: '10vw', fontSize: 18 + 'px', marginTop: 20 + 'px', float: "left"}}>Your Classrooms</p>
            <button type="button" class="btn btn-dark" id='btn-render' onClick={handleClick} style={{marginRight: '10vw', marginTop: 20 + 'px', float: "right"}}>Add New Classroom</button>
        </Wrapper>
        <DialogWrapper>
            <Dialog open={isShowForm} onClose={!isShowForm} className="dialog_box">
                <div style={{width: 500, margin: '0 auto'}}>
                    <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Enter Class and Invitation Code"}</DialogTitle>
                    {/* <DialogContent>
                    </DialogContent> */}
                    {/* <DialogActions className={classes.alignItemsAndJustifyContentForm} style={{backgroundColor: '#3d3c40', marginBottom: '0px'}}> */}
                        <InvitationForm className={classes.alignItemsAndJustifyContentForm} handleSubmit={handleSubmit}/>
                    {/* </DialogActions> */}
                </div>
            </Dialog>
        </DialogWrapper>

        <DialogWrapper>
            <Dialog open={isCreated} onClose={!isCreated} className="dialog_box">
                <div style={{width: 500, margin: '0 auto'}}>
                    <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"The class " + existCourse + " already exists"}</DialogTitle>
                    <DialogActions style={{backgroundColor:'#3e3d40'}}>
                        <Wrapper>
                            <button className="form-btn" onClick={handleMessageCancel}>OK</button>
                        </Wrapper>
                    </DialogActions>
                </div>
            </Dialog>
        </DialogWrapper>

        <DialogWrapper>
              <Dialog open={isShowNotExist} onClose={!isShowNotExist} className="dialog_box">
                  <div style={{width: 500, margin: '0 auto'}}>
                      <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"The class " + existCourse + " doesn't exists"}</DialogTitle>
                      <DialogActions style={{backgroundColor:'#3e3d40'}}>
                          <Wrapper>
                              <button className="form-btn" onClick={handleMessageCancel}>OK</button>
                          </Wrapper>
                      </DialogActions>
                  </div>
              </Dialog>
          </DialogWrapper>
      
        
        </>
    );
}

const Wrapper = styled.main`
  margin-top: 30px;
  .login{
    text-decoration:none;
    transition: 0.3s;
    color: white;
  }
  .form-btn{
    background-color: #6167f3;
    color:white;
    border-radius: 3px;
    border-style: solid;
    border:none;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  `

const DialogWrapper = styled.main`
  width: 500px;
  .login{
    text-decoration:none;
    transition: 0.3s;
    color: white;
  }
  .custom-flex-justify-center{
    display: flex;
    align-items: center;
    justify-content: center;
    // text-align:center;
  }
  `
export default AddClassroomStudent;