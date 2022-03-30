import { DialogContent, DialogTitle } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog } from "@material-ui/core";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableSortLabel } from "bootstrap-4-react/lib/components";
import AttendanceTable from './AttendanceTable'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const FIND_ATTENDANCE_STATUS = "http://localhost:8080/attendanceRecord/user/"
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

const AttendanceDetailByUser = ({setPopup, record, uid, name}) => {

    const [attendanceRecord, setAttendanceRecord] = useState([]);
    const [isShow, setIsShow] = useState(true);

    const handleClose = () => {
        setPopup(null);
    }
    const fetchRecordByComposeId = async () => {
        try {
            //HARDCODE!!!
            // for (let i = ; i < record.length; i++) {
            for (let i = 1; i < 2; i++) {
                const response = await fetch(FIND_ATTENDANCE_STATUS + uid + "/rollcall/" + record[i].id, {mode:'cors'});
                const data = await response.json();
                setAttendanceRecord(prev => [...prev, data]);
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setAttendanceRecord([]);
        fetchRecordByComposeId();
    }, [uid]);

    const classes = useStyles();
    return (
        <Wrapper>
            <Dialog open={isShow} onClose={!isShow}>
                <IconButton className={classes.closeBtn} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
                <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>
                    {"Attendance Details of Student " + name}
                </DialogTitle>
                {attendanceRecord.length > 0 ? <AttendanceTable attendanceRecord={attendanceRecord} record={record}/> : <div>No record</div>}
            </Dialog>
        </Wrapper>
    );
}

const Wrapper = styled.main`
`
export default AttendanceDetailByUser;