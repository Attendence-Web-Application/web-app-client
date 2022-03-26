import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, TablePagination } from "@material-ui/core";
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

const columns = [
    {id: 'Name', label: 'Name'},
    {id: 'Attend', label: 'Attend'}
];

const StudentTable = ({student, record}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    }
    return (
        <Wrapper>
            <TableContainer className="table_container">
                <Table>
                    <TableHead className="table_head">
                        <TableRow>
                            {
                              columns.map((column) => (
                                <TableCell className="table_cell large_font" key={column.id} >
                                    {column.label}
                                </TableCell>
                              ))  
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody className="table_body">
                        {
                            record.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow className="body_row" key={row.id}>
                                        {columns.map((column) => {
                                            const value = column;
                                            let attend = (row.check_status == false) ? "No": "Yes";
                                            //compare check_time and expire_time
                                            console.log("index", attend);
                                            if (value.id == 'Name') return (<TableCell className="table_cell" key={index}>{student[index].name}</TableCell>);
                                            else if (value.id == "Attend") return (<TableCell className="table_cell" key={index}>{attend}</TableCell>);
                                        })}
                                    </TableRow>
                                )
                            }
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination className="table_pagination" rowsPerPageOptions={[2, 25, 100]} count={record.length} component="div" rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage }/>
        </Wrapper>
    );
}

const AttendanceDetailPage = ({isShow, setIsShow, rollCallId}) => {
    const [student, setStudent] = useState([]);
    const [record, setRecord] = useState([]);
    

    const handleClose = () => {
        setIsShow(false);
    }
    
    const fetchAllStudent = async (data) => {
        try{
            for (let i = 0; i < data.length; i++) {
                console.log('dataid', data[i].id.userId)
                const response = await fetch(FIND_STUDENT + data[i].id.userId, {mode:'cors'});
                const user = await response.json();
                if (user.role_id === 2) {
                    setStudent(prev => [...prev, user]);
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
            console.log("data", data);
            fetchAllStudent(data);
        }
        catch(e) {
            console.log(e);
        }
    }

    const classes = useStyles();
    useEffect(() => {
        setStudent([]);
        setRecord([]);
        fetchAllUser(rollCallId);
    }, [rollCallId]);
    console.log("record", record);
    return (
        isShow && <DialogWrapper>
            <Dialog open={isShow} onClose={!isShow} className="dialog_box">
                <IconButton className={classes.closeBtn} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
                
                <div style={{width: 500, margin: '0 auto'}}>
                    <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Attendance Details"}</DialogTitle>
                    {/* <DialogActions className={classes.alignItemsAndJustifyContentForm} style={{backgroundColor: '#3d3c40', marginBottom: '0px'}}> */}
                        {/* <CreateClassForm className={classes.alignItemsAndJustifyContentForm} handleSubmit={handleSubmit} handleCancel={handleCancel}/> */}
                        <StudentTable student={student} record={record}/>
                        <div></div>
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
export default AttendanceDetailPage;