import { DialogContent, DialogTitle } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog } from "@material-ui/core";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableSortLabel } from "bootstrap-4-react/lib/components";
import AttendanceTable from './AttendanceTable'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { FIND_ATTENDANCE_STATUS_URL } from '../utils/api'

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
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => {
        setPopup(null);
    }

    const fetchRecordByComposeId = async () => {
        try {
            for (let i = 0; i < record.length; i++) { //read record of each rollcall
                const response = await fetch(FIND_ATTENDANCE_STATUS_URL + uid + "/rollcall/" + record[i].id, {mode:'cors'});
                const data = await response.json();
                setAttendanceRecord(prev => [...prev, data]);
            }
            setIsLoading(false);
        }
        catch(e) {
            console.log(e);
        }
    }
    
   /*
   const fetchRecordByUser = async () => {
       try {
           console.log(FIND_ATTENDANCE_RECORD_BY_USER + uid);
            const response = await fetch(FIND_ATTENDANCE_RECORD_BY_USER + uid, {mode:'cors'});
            const data = await response.json();
            setAttendanceRecord(data);
       }
       catch(e) {

       }
   }
   */
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
                {!isLoading && attendanceRecord.length > 0 ? <AttendanceTable attendanceRecord={attendanceRecord} record={record}/> : <div>No record</div>}
            </Dialog>
        </Wrapper>
    );
}

const Wrapper = styled.main`
`
export default AttendanceDetailByUser;