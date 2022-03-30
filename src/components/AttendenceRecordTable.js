import React, {useEffect, useState} from "react";
import { Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, TablePagination } from "@material-ui/core";
import { useLocation } from "react-router";
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import AttendanceDetailBySession from "./AttendanceDetailBySession";


const FIND_STUDENT_ID_URL = 'http://localhost:8080/class_enrolled/getClassEnroll/user';
const FIND_ROLL_CALL_ID_URL = 'http://localhost:8080/attendanceRecord/user/';
const FIND_ROLL_CALL_URL = 'http://localhost:8080/rollCall/';
const FIND_ALL_USER_BY_ROLLCALL_ID = "http://localhost:8080/attendanceRecord/rollCall/";
const FIND_STUDENT = "http://localhost:8080/user/";
//get all ROLL_CALL_ID from "attendence_record" table, using  ROLL_CALL_ID to search in "roll_call" table, find the correpsonding class_id
const AttendenceRecordTable = ({classNumber, classId, record}) => {
    const curUserId = parseInt(sessionStorage.getItem("id"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [isShow, setIsShow] = useState(false);
    const [popup, setPopup] = useState(null);

    var enterId = -1;
    const columns = [
        {id: 'ID', label: 'ID'},
        {id: 'Expire Time', label: 'Expire Time', minWidth: 50},
        {id: 'Count', label: 'Count', minWidth: 50},
        {id: 'Rate', label: 'Attendance Rate', minWidht:50},
        {id: 'Detail', label: 'Detail', minWidth: 50},
    ];

    const handleEnterDetail = (rollcallId) => {
        setPopup(<AttendanceDetailBySession setPopup = {setPopup} rollCallId={rollcallId}/>)
    }
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    }
    // useEffect(() => {
    //     setRecord([]);
    //    fetchAllRollCallByUser(curUserId);
    // }, [curUserId]);

    return (
        <Wrapper>
            <TableContainer className="table_container">
                <Table>
                    <TableHead className="table_head">
                        <TableRow>
                            {
                              columns.map((column) => (
                                <TableCell className="table_cell" key={column.id} >
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
                                            if (value.id == 'ID') return (<TableCell className="table_cell">{row.id}</TableCell>);
                                            else if (value.id == 'Expire Time') return (<TableCell className="table_cell">{row.expired_times}</TableCell>);
                                            else if (value.id == 'Count') return (<TableCell className="table_cell">{row.attendance_count}</TableCell>);
                                            else if (value.id == 'Rate') return (<TableCell className="table_cell">{row.attendance_rate}</TableCell>);
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
    )
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
export default AttendenceRecordTable;