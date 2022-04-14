import React, { useEffect, useState } from 'react';
import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TablePagination,
  useEventCallback,
} from '@material-ui/core';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import AttendanceDetailByUser from './AttendanceDetailByUser';
import {
  FIND_ALL_USER,
  FIND_ALL_STUDENT_BY_CLASS_ID,
  CHECK_IN_BY_USER_ID_URL,
  BY_ROLL_CALL_ID_URL,
} from '../utils/api';

//read the check in history of a student in classroom
const StudentCheckInTable = ({ classNumber, classId, record, setRecord }) => {
  const curUserId = parseInt(sessionStorage.getItem('id'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [popup, setPopup] = useState(null);

  console.log(record);

  const columns = [
    { id: 'ID', label: 'ID' },
    { id: 'Time', label: 'Time' },
    { id: 'Status', label: 'Status' },
    { id: 'Check In', label: 'Check In' },
  ];

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  //attend which session
  const handleCheckIn = async (id, userId, status) => {
    if (!status) {
      try {
        let checkInDate = new Date();

        await fetch(
          CHECK_IN_BY_USER_ID_URL + userId + BY_ROLL_CALL_ID_URL + id,
          {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: {
                rollCallId: id,
                userId: userId,
              },
              check_status: true,
              check_time: checkInDate,
            }),
          }
        );
        // refresh the page
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log("all students info: ", studentRecord);
  return (
    <Wrapper>
      <TableContainer className="table_container">
        <Table>
          <TableHead className="table_head">
            <TableRow>
              {columns.map((column) => (
                <TableCell className="table_cell" key={column.id}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {
            <TableBody className="table_body">
              {record
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <>
                      <TableRow className="body_row" key={row.id}>
                        {columns.map((column) => {
                          const value = column;
                          if (value.id === 'ID')
                            return (
                              <TableCell className="table_cell">
                                {row.id.rollCallId}
                              </TableCell>
                            );
                          else if (value.id === 'Time')
                            return (
                              <TableCell className="table_cell">
                                {row.check_time}
                              </TableCell>
                            );
                          else if (value.id === 'Status')
                            return (
                              <TableCell className="table_cell">
                                {row.check_status === true ? '✅' : '❌'}
                              </TableCell>
                            );
                          else
                            return (
                              <TableCell className="table_cell">
                                <button
                                  className="table_btn"
                                  onClick={() =>
                                    handleCheckIn(
                                      row.id.rollCallId,
                                      curUserId,
                                      row.check_status
                                    )
                                  }
                                >
                                  Check
                                </button>
                              </TableCell>
                            );
                        })}
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          }
          {popup}
        </Table>
      </TableContainer>
      <TablePagination
        className="table_pagination"
        rowsPerPageOptions={[10, 25, 50]}
        count={record.length}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background-color: white;
  margin: auto;
  width: 100%;
  .table_container {
    max-height: 50vh;
  }
  .table_head {
    background-color: #6167f3;
    position: sticky;
    top: 0;
  }
  .table_body {
    background-color: #1f2021;
  }
  .table_cell {
    border: solid #4f5154;
    min-width: 30px;
    text-align: center;
    color: white;
    border-width: 1px 0px 1px 0px;
  }
  .table_btn {
    background-color: #6167f3;
    color: white;
    border-radius: 3px;
    border-style: solid;
    border: none;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 6px;
    padding-bottom: 6px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  .table_pagination {
    background-color: #1e1e1e;
    color: white;
  }
  .body_row: hover {
    background-color: #353a3f;
  }
`;
export default StudentCheckInTable;
