import React, {useState} from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import InvitationForm from './InvitationForm';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
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
const AddClassroomStudent = ({classrooms, setClassrooms}) => {
    const [isShow, setIsShow] = useState(false);
    console.log(classrooms);
    const handleClick = () => {
        setIsShow(true);
        console.log("change")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newClassroom = event.target.elements.classroom.value;
        const newCode = event.target.elements.code.value;
        console.log(event.target.elements.classroom.value);
        console.log(event.target.elements.code.value);
        //check code 

        //if same, add one more classroom in the page and database
        if (newClassroom !== '' && newClassroom !== null) {
            const newClass = {
            name:newClassroom,
            age:100,
            id:5
            }
            setClassrooms(arr => [...arr, newClass]);
        }
        
        //change status
        setIsShow(false);

    }
    
    const handleCancel = () => {
        setIsShow(false);
    }

    const handleClickOutside = () => {
        setIsShow(false);
    }
    const classes = useStyles();
    return (
        <>
        <Wrapper>
            <p style={{color: 'white', marginLeft: '10vw', fontSize: 18 + 'px', marginTop: 20 + 'px', float: "left"}}>Your Classrooms</p>
            <button type="button" class="btn btn-dark" id='btn-render' onClick={handleClick} style={{marginRight: '10vw', marginTop: 20 + 'px', float: "right"}}>Add New Classroom</button>
        </Wrapper>
        <DialogWrapper>
            <Dialog open={isShow} onClose={!isShow} className="dialog_box">
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