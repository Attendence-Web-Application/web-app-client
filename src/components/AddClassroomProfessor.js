import React, {useState} from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateClassForm from "./CreateClassForm";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
const useStyles = makeStyles(theme => ({
  paper: {
      borderRadius: 15,
  },
  alignItemsAndJustifyContentTitle: {
    width: 500 + 'px',
    height: 80 + 'px',
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
  alignItemsAndJustifyContentButton: {
    width: 400 + 'px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#313033',
    color: 'white',
  },
}))

const SEARCH_CLASS_URL = 'http://localhost:8080/class/getClass/';
const CREATE_CLASS_URL = 'http://localhost:8080/class/createClass';
const INSERT_ENROLL_URL = 'http://localhost:8080/class_enrolled/createEnroll/';
const CHECK_ENROLL_URL = 'http://localhost:8080/class_enrolled/getClassEnroll/';
const AddClassroomProfessor = ({classrooms, setClassrooms}) => {
    const [isShow, setIsShow] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [isExist, setIsExist] = useState(false);
    // const [newClass, setNewClass] = useState({})
    const [existCourse, setExistCourse] = useState('');
    let newClass;
    const classes = useStyles();
    const curUserId = parseInt(localStorage.getItem('id'));

    const handleClick = () => {
        setIsShow(true);
    }

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
            console.log(newData);
            setClassrooms(arr => [...arr, classData]);
        }
    }

    const postNewClass = async () => {
        try {
            const params = {
                method: 'POST',
                body: JSON.stringify({ number: newClass.number, title: newClass.title, start_date: newClass.startDate, end_date: newClass.endDate}),
                headers: { 'Content-Type': 'application/json' },
            }
            const createResponse = await fetch(CREATE_CLASS_URL, params);
            const newData = await createResponse.json();
            insertEnrollRecord(curUserId, newData);
        }
        catch (e) {
            console.log(e);
        }
        setIsExist(false);
        // setNewClass({});
    }
    
    const fetchDataByNumber = async () => { 
        try {
            console.log(SEARCH_CLASS_URL + newClass.number);
            const response = await fetch(SEARCH_CLASS_URL + newClass.number, {mode: 'cors'});
            const data = await response.json();
            
            if (data.length === 0) { //check the course number, if the course doesn't exist, insert a new class
                setIsExist(true);
                // const params = {
                //     method: 'POST',
                //     body: JSON.stringify({ number: number, title: title, start_date: start, end_date: end}),
                //     headers: { 'Content-Type': 'application/json' },
                // }
                // const createResponse = await fetch(CREATE_CLASS_URL, params);
                // const newData = await createResponse.json();
                // classData = newData;
            }
            else { //check whether info in db the same as input???
                //insert into class_enrolled table
                insertEnrollRecord(curUserId, data[0]);
            } 
        }
            catch (e) {
                console.log(e)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // //change status
        setIsShow(false);

        newClass = {"number": event.target.elements.classNumber.value,
                          "title": event.target.elements.classTitle.value,
                          "startDate": event.target.elements.startDate.value,
                          "endDate": event.target.elements.endDate.value,}
        // setNewClass(newClass);
        // console.log(newClass);
        // const newClassNumber = event.target.elements.classNumber.value;
        // const newClassTitle = event.target.elements.classTitle.value;
        // const newStartDate = event.target.elements.startDate.value;
        // const newEndDate = event.target.elements.endDate.value;
        
        // fetchDataByNumber(newClassNumber, newClassTitle, newStartDate, newEndDate);
        fetchDataByNumber();
        

    }

    const handleCancel = (event) => {
        event.preventDefault();
        setIsShow(false);
    }

    const handleMessageCancel = () => {
        setIsCreated(false);
        setExistCourse('');
    }
    return (
        <>
            <Wrapper>
                <p style={{color: 'white', marginLeft: '10vw', fontSize: 18 + 'px', marginTop: 20 + 'px', float: "left"}}>Your Classrooms</p>
                <button type="button" className="btn btn-dark" style={{marginRight: '10vw', marginTop: 20 + 'px', float: "right"}} onClick={handleClick}>Create New Classroom</button>
            </Wrapper>
            <DialogWrapper>
                <Dialog open={isShow} onClose={!isShow} className="dialog_box">
                    <div style={{width: 500, margin: '0 auto'}}>
                        <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Create a New Class"}</DialogTitle>
                        {/* <DialogContent>
                        </DialogContent> */}
                        {/* <DialogActions className={classes.alignItemsAndJustifyContentForm} style={{backgroundColor: '#3d3c40', marginBottom: '0px'}}> */}
                            <CreateClassForm className={classes.alignItemsAndJustifyContentForm} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
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
                <Dialog open={isExist} onClose={!isExist} className="dialog_box">
                    <div style={{width: 500, margin: '0 auto'}}>
                        <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"No class found!"}</DialogTitle>
                        <DialogContent className={classes.alignItemsAndJustifyContentTitle}>
                            <DialogContentText className={classes.alignItemsAndJustifyContentText}>
                                No class information find in database, do you want to add a new class?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{backgroundColor:'#3e3d40'}}>
                            <Wrapper>
                                <div className='del_classroom_button_div'>
                                    <button className='form-btn left' onClick={postNewClass}>CREATE</button>
                                    <button className='form-btn right' onClick={() => {setIsExist(false)}}>CANCEL</button>
                                </div>
                            </Wrapper>
                        </DialogActions>
                    </div>
                </Dialog>
            </DialogWrapper>
        </>
    );
}

const Wrapper = styled.main`
  .del_classroom_button_div{
      background-color: #313033;
      text-align:center;
      margin-bottom: 0px;
  }
  .del_classroom_button_div button:hover{
      transition: 0.6s;
      background: #6167f3;
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
  .left{
      margin-right: 10px;
  }
  .right{
      margin-left: 10px;
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
export default AddClassroomProfessor;