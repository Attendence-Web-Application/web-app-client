import React, {useState} from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateClassForm from "./CreateClassForm";

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
}))

const SEARCH_CLASS_URL = 'http://localhost:8080/class/getClass/';
const CREATE_CLASS_URL = 'http://localhost:8080/class/createClass';
const AddClassroomProfessor = ({classrooms, setClassrooms}) => {
    const [isShow, setIsShow] = useState(false);
    const classes = useStyles();

    const handleClick = () => {
        setIsShow(true);
    }

    
    const fetchDataByNumber = async (number, title, start, end) => { 

        try {
            const response = await fetch(SEARCH_CLASS_URL + number, {mode: 'cors'});
            const data = await response.json();
            let classData;
            if (data.length === 0) { //if the course doesn't exist, insert a new class
                const params = {
                    method: 'POST',
                    body: JSON.stringify({ number: number, title: title, start_date: start, end_date: end}),
                    headers: { 'Content-Type': 'application/json' },
                }
                const createResponse = await fetch(CREATE_CLASS_URL, params);
                const newData = await createResponse.json();
                classData = newData;
            }
            else {
                classData = data[0];
            }
            //insert into class_enrolled table
            
            //update ui
            setClassrooms(arr => [...arr, classData]);
            // setClassrooms(data)
            //use localStorage
            }
            catch (e) {
                console.log(e)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const newClassNumber = event.target.elements.classNumber.value;
        const newClassTitle = event.target.elements.classTitle.value;
        const newStartDate = event.target.elements.startDate.value;
        const newEndDate = event.target.elements.endDate.value;
        console.log(newStartDate);
        fetchDataByNumber(newClassNumber, newClassTitle, newStartDate, newEndDate);
        // console.log(event.target.elements.classNumber.value);
        // console.log(event.target.elements.classTitle.value);
        // console.log(event.target.elements.startDate.value);
        // console.log(event.target.elements.endDate.value);
        // //check code 

        // //if same, add one more classroom in the page and database
        // if (newClassroom !== '' && newClassroom !== null) {
        //     const newClass = {
        //     name:newClassroom,
        //     age:100,
        //     id:5
        //     }
        //     setClassrooms(arr => [...arr, newClass]);
        // }
        
        // //change status
        setIsShow(false);

    }

    return (
        <>
            <Wrapper>
                <p style={{color: 'white', marginLeft: '10vw', fontSize: 18 + 'px', marginTop: 20 + 'px', float: "left"}}>Your Classrooms</p>
                <button type="button" class="btn btn-dark" style={{marginRight: '10vw', marginTop: 20 + 'px', float: "right"}} onClick={handleClick}>Create New Classroom</button>
            </Wrapper>
            <DialogWrapper>
                <Dialog open={isShow} onClose={!isShow} className="dialog_box">
                    <div style={{width: 500, margin: '0 auto'}}>
                        <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Create a New Class"}</DialogTitle>
                        {/* <DialogContent>
                        </DialogContent> */}
                        {/* <DialogActions className={classes.alignItemsAndJustifyContentForm} style={{backgroundColor: '#3d3c40', marginBottom: '0px'}}> */}
                            <CreateClassForm className={classes.alignItemsAndJustifyContentForm} handleSubmit={handleSubmit}/>
                        {/* </DialogActions> */}
                    </div>
                </Dialog>
            </DialogWrapper>
        </>
    );
}

const Wrapper = styled.main`
  .login{
    text-decoration:none;
    transition: 0.3s;
    color: white;
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