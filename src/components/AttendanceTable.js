import React, {useState} from "react";
import styled from 'styled-components';
import { Table, TableContainer, TableRow, TableCell, TableBody, TablePagination } from "@material-ui/core";
import { TableHead } from "@material-ui/core";

const columns = [
    {id: "Session Time", label: "Session Time"},
    {id: "Check Time", label: "Check Time"},
    {id: "Check Status", label: "Check Status"}
];
const AttendanceTable = ({attendanceRecord, record}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const getExpireTime = (id) => {
        return record.filter((row) => row.id === id).expire_time;
        // console.log("id", id, record.filter((row) => row.id === id));
    }

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
                            {columns.map((column) => (
                                <TableCell className="table_cell" key = {column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className="table_body">
                        {attendanceRecord.map((row) => {
                            console.log("row within", row);
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
            <TablePagination className="table_pagination" rowsPerPageOptions={[2, 25, 100]} count={attendanceRecord.length} component="div" rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage }/>
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