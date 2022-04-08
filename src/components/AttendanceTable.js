import React, {useState} from "react";
import styled from 'styled-components';
import { Table, TableContainer, TableRow, TableCell, TableBody, TablePagination, TableSortLabel } from "@material-ui/core";
import { TableHead } from "@material-ui/core";

const columns = [
    {id: "Session Time", label: "Session Time"},
    {id: "Check Time", label: "Check Time"},
    {id: "Check Status", label: "Check Status"}
];

const AttendanceTable = ({attendanceRecord, record}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Session Time');
    // console.log("record", record);
    // console.log("attendanceRecord", attendanceRecord);
    const getExpireTime = (id) => {

        console.log("id", id, record.filter((row) => row.id == id));
        const row = record.filter((row) => row.id === id);
        return row.length > 0 ? row[0].expired_times : null;
        
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    }

    const createSortHandler = (property) => {
        const isAsc = orderBy === property && order == 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const customSort = (array) => {
        const keyValueArr = array.map((value, index) => [index, value]);
        keyValueArr.sort((a, b) => {
            let res;
            if (orderBy === 'Session Time') {
                const a_time = getExpireTime(a[1].id.rollCallId);
                const b_time = getExpireTime(b[1].id.rollCallId);
                res = a_time < b_time ? -1 : a_time === b_time ? 0 : 1;
            }
            else if (orderBy === 'Check Time') {
                res = a[1].check_time < b[1].check_time ? -1 : a[1].check_time === b[1].check_time ? 0 : 1;
            }
            else {
                res = a[1].check_status < b[1].check_status ? -1 : a[1].check_status === b[1].check_status ? 0 : 1;
            }
            if (order === 'desc') res = -res;
            return res;
        });

        return keyValueArr.map(ele => ele[1]);
    }

    return (
        <Wrapper>
            <TableContainer className="table_container">
                <Table>
                    <TableHead className="table_head">
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell className="table_cell large_front" key = {column.id}>
                                    <TableSortLabel className="table_cell large_front" onClick = {() => createSortHandler(column.id)} active = {orderBy === column.id} direction = {orderBy === column.id ? order : 'asc'}>
                                        {column.label}
                                    </TableSortLabel>
                                    
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className="table_body">
                        {customSort(attendanceRecord)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            console.log("row: ", row);
                            let attend = (row.check_status == false) ? "No": "Yes";
                            let checkTime = row.check_time == null ? "Not recorded" : row.check_time;
                            let getTime = getExpireTime(row.id.rollCallId);
                            let expireTime = getTime == null ? "Not recorded" : getTime;
                            return (
                                <TableRow className="body_row">
                                    {columns.map((column) => {
                                        if (column.id == 'Session Time') return (<TableCell className="table_cell">{expireTime}</TableCell>)
                                        else if (column.id == 'Check Time') return (<TableCell className="table_cell">{checkTime}</TableCell>)
                                        else return (<TableCell className="table_cell">{attend}</TableCell>)
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination className="table_pagination" rowsPerPageOptions={[10, 25, 50]} count={attendanceRecord.length} component="div" rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage }/>
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
export default AttendanceTable;