import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, TablePagination, TableSortLabel } from "@material-ui/core";
import StudentTable from "./StudentTable";
//display all students of the class in a specific roll call according to roll_call_id, attend or not

const FIND_ALL_USER_BY_ROLLCALL_ID = "http://localhost:8080/attendanceRecord/rollCall/";
const FIND_STUDENT = "http://localhost:8080/user/";
const useStyles = makeStyles(theme => ({
  paper: {
    overflowY: 'unset',
  },
  closeBtn: {
    position: 'absolute',
    left: '90%',
    top: '0%',
    backgroundColor: '#3d3c40',
    color: 'white',
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

const AttendanceDetailBySession = ({setPopup, rollCallId}) => {
    // const [student, setStudent] = useState([]);
    const [record, setRecord] = useState([]);
    const [isShow, setIsShow] = useState(true);

    const handleClose = () => {
        setIsShow(false);
        setPopup(null);
    }
    
    const fetchAllStudent = async (data) => {
        try{
            for (let i = 0; i < data.length; i++) {
                const response = await fetch(FIND_STUDENT + data[i].id.userId, {mode:'cors'});
                const user = await response.json();
                if (user.role_id === 2) {
                    // setStudent(prev => [...prev, user]);
                    data[i].name = user.name;
                    setRecord(prev => [...prev, data[i]]);
                }
            }
        }
        catch(e) {
            console.log(e);
        } 
    }

    const fetchAllUser = async (rollCallId) => {
        try{
            const response = await fetch(FIND_ALL_USER_BY_ROLLCALL_ID + rollCallId, {mode:'cors'});
            const data = await response.json();
            fetchAllStudent(data);
        }
        catch(e) {
            console.log(e);
        }
    }

    const classes = useStyles();
    useEffect(() => {
        setRecord([]);
        fetchAllUser(rollCallId);
        // setIsLoading(false);
    }, [rollCallId]);

    return (
        <DialogWrapper>
            <Dialog open={isShow} onClose={!isShow} className="dialog_box">
                <IconButton className={classes.closeBtn} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
                
                <div style={{width: 500, margin: '0 auto'}}>
                    <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Attendance Details"}</DialogTitle>
                    {/* <DialogActions className={classes.alignItemsAndJustifyContentForm} style={{backgroundColor: '#3d3c40', marginBottom: '0px'}}> */}
                        {/* <CreateClassForm className={classes.alignItemsAndJustifyContentForm} handleSubmit={handleSubmit} handleCancel={handleCancel}/> */}
                        {record.length > 0 ? <StudentTable record={record}/> : <div>No record</div>}
                    {/* </DialogActions> */}
                </div>
            </Dialog>
        </DialogWrapper>
    );
    
}

const Wrapper = styled.main`
    background-color:white;
    margin: auto;
    width: 100%;
    .table_container{
        max-height: 50vh;
    }
    .table_head{
        background-color: #6167f3;
        position: sticky;
        top: 0;
        
    }
    .table_body{
        background-color:#1f2021;
    }
    .table_cell{
        border: solid #4f5154;
        min-width: 30px;
        text-align: center;
        color: white;
        border-width: 1px 0px 1px 0px;
        
    }
    .large_font{
        font-size: 15px;
        font-weight: bold;
        border-width: 0px 0px 0px 0px;
    }
    .table_btn{
        background-color: #6167f3;
        color:white;
        border-radius: 3px;
        border-style: solid;
        border:none;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 6px;
        padding-bottom: 6px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
    .table_pagination{
        background-color:#1e1e1e;
        color: white;
    }
    .body_row: hover{
       background-color: #353a3f;
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
.close_btn{
    position: absolute;
    left: 95%;
    top: -9%;
    color: white;
    background-color: #6167f3
}
`
export default AttendanceDetailBySession;