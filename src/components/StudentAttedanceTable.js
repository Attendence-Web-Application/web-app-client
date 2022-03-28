import React, {useEffect, useState} from "react";
import { Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, TablePagination, useEventCallback } from "@material-ui/core";
import { useLocation } from "react-router";
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const FIND_ROLL_CALL_ID_URL = 'http://localhost:8080/attendanceRecord/user/';
const FIND_ROLL_CALL_URL = 'http://localhost:8080/rollCall/';
const FIND_ALL_USER_BY_ROLLCALL_ID = "http://localhost:8080/attendanceRecord/rollCall/";
const FIND_STUDENT = "http://localhost:8080/user/";
const FIND_STUDENT_RATE = "http://localhost:8080/class_enrolled/getClassEnroll/"
//read all students according to class
const StudentAttendanceTable = ({classNumber, classId}) => {
    const curUserId = parseInt(sessionStorage.getItem("id"));
    const [record, setRecord] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [popup, setPopup] = useState(null);

    let oneRollCallId = -1;
    const columns = [
        {id: 'ID', label: 'ID'},
        {id: 'Name', label: 'Name'},
        {id: 'Rate', label: 'Attendance Rate'},
        {id: "Times", label: 'Attendance_Times'},
        {id: 'Detail', label: 'Detail'},
    ];

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    }

    const handleEnterDetail = (id) => {
        
    }

    const fetchAttendanceRate = async (index, classId, userId) => {
        try {
            console.log(FIND_STUDENT_RATE + userId + "_" + classId);
            const response = await fetch(FIND_STUDENT_RATE + userId + "_" + classId, {mode:'cors'});
            const data = await response.json();
            console.log('class_enrolled', data);
            const newRecord = [...record];
            newRecord[index].student_attendance_rate = data.attendance_rate;
            newRecord[index].student_attendance_time = data.attendance_times;
            setRecord(newRecord);
        }
        catch(e) {
            console.log(e);
        }
        
    }
    const fetchAllStudent = async (data) => {
        try{
            let counter = 0;
            for (let i = 0; i < data.length; i++) {
                const response = await fetch(FIND_STUDENT + data[i].id.userId, {mode:'cors'});
                const user = await response.json();
                if (user.role_id === 2) {
                    // setStudent(prev => [...prev, user]);
                    data[i].name = user.name;
                    data[i].uid = user.id;
                    setRecord(prev => [...prev, data[i]]);
                    fetchAttendanceRate(counter, classId, user.id);
                    counter++;
                    // console.log("record", record);
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
            console.log("data_", data);
            fetchAllStudent(data);
        }
        catch(e) {
            console.log(e);
        }
    }

    //find all rollcall of current class
    const fetchRollCallByClass = async (classId, IdArr) => {
        try{
            for (let i = 0; i < IdArr.length; i++) {
                const response = await fetch(FIND_ROLL_CALL_URL + IdArr[i], {mode:'cors'});
                const data = await response.json();
                
                if (data.class_id === classId) {
                    oneRollCallId = 3; //change a roll call id
                    break;
                    // setRecord((prev) => [...prev, data]);
                    // hasRecord = true;
                }
            }
            while (oneRollCallId == -1) {
                console.log("waiting");
            }
            fetchAllUser(oneRollCallId);

            // console.log("id", oneRollCallId);
            // if (oneRollCallId != -1) {
            //     console.log("come in");
            //     fetchAllUser(oneRollCallId);
            // }
            
        }
        catch(e) {
            console.log(e);
        }
    }
    //find all rollcall of current professor
    const fetchAllRollCallByUser = async (curUserId) => {
        try {
            const response = await fetch(FIND_ROLL_CALL_ID_URL + curUserId, {mode:'cors'});
            const data = await response.json(); //get the list of roll_call_id of current user
            console.log("all rollcall:", data[0])
            // const myPromise = new Promise(fetchRollCallByClass(classId, data));
            // myPromise.then(fetchAllUser(oneRollCallId));
            fetchRollCallByClass(classId, data);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setRecord([]);
        fetchAllRollCallByUser(curUserId);
    }, [curUserId]);

    console.log("record", record);
    return (
        <Wrapper>
            <TableContainer className="table_container">
                <Table>
                    <TableHead className="table_head">
                        <TableRow>
                            {
                              columns.map((column) => (
                                <TableCell className="table_cell" key={column.id}>
                                    {column.label}
                                </TableCell>
                              ))  
                            }
                        </TableRow>
                    </TableHead>
                    {
                        <TableBody className="table_body">
                        {
                             record.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                console.log("row", row);
                                return (
                                    <>
                                    <TableRow className="body_row" key={row.id}>
                                        {columns.map((column) => {
                                            const value = column;
                                            if (value.id == 'ID') return (<TableCell className="table_cell">{row.uid}</TableCell>);
                                            else if (value.id == 'Name') return (<TableCell className="table_cell">{row.name}</TableCell>);
                                            else if (value.id == 'Rate') return (<TableCell className="table_cell">{row.student_attendance_rate}</TableCell>);
                                            else if (value.id == 'Times') return (<TableCell className="table_cell">{row.student_attendance_time}</TableCell>);
                                            else return (<TableCell className="table_cell"><button className='table_btn' onClick={() => handleEnterDetail(row.id)}>Enter</button></TableCell>);
                                        })}
                                    </TableRow>
                                    
                                    </>
                                )
                            }
                        )
                        }
                    </TableBody>
                    }
                    {popup}
                </Table>
            </TableContainer>
            <TablePagination className="table_pagination" rowsPerPageOptions={[2, 25, 100]} count={record.length} component="div" rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage }/>
            
        </Wrapper>
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
export default StudentAttendanceTable;