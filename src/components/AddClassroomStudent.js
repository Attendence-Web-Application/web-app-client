import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import InvitationForm from './InvitationForm'
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import { makeStyles } from '@material-ui/core/styles'
import '../index.css'
import { SEARCH_CLASS_URL, CHECK_ENROLL_URL, INSERT_ENROLL_URL, FIND_CLASS_URL, FIND_ROLL_CALL_BY_CLASS_URL } from '../utils/api'

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


const AddClassroomStudent = ({ classrooms, setClassrooms }) => {
    const [isShowForm, setIsShowForm] = useState(false)
    const [isShowNotExist, setIsShowNotExist] = useState(false)
    const [isCreated, setIsCreated] = useState(false)
    const [isShowRollCallStart, setIsShowRollCallStart] = useState(false)
    // const [existCourse, setExistCourse] = useState('');
    const curUserId = parseInt(sessionStorage.getItem('id'))
    let newClass
    console.log(classrooms)

    const handleClick = () => {
        setIsShowForm(true)
        console.log("change")
    }

    const fetchClassById = async (classId) => {
        try {
            const response = await fetch(FIND_CLASS_URL + classId, { mode: 'cors' })
            const data = await response.json()
            setClassrooms(prev => [...prev, data])
        }
        catch (e) {
            console.log(e)
        }
    }
    const checkClassInfo = async (newClass, code) => {
        //check if joined this class already
        try {
            const response = await fetch(CHECK_ENROLL_URL + curUserId + "_" + newClass.id, { mode: 'cors' })
            const data = await response.json()
            setIsCreated(true)
        }
        catch (e) {
            checkStartRollCall(newClass)
        }

    }
    const checkStartRollCall = async (newClass) => {
        //check if this class has started a roll call
        try {
            console.log(newClass)
            const response = await fetch(FIND_ROLL_CALL_BY_CLASS_URL + newClass.id, { mode: "cors" })
            const data = await response.json()
            if (data.length == 0) {
                enrollClass(newClass)
            }
            else {
                setIsShowRollCallStart(true)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const enrollClass = async (newClass) => {
        //enroll this class
        const params = {
            method: 'POST',
            body: JSON.stringify({ id: { classId: newClass.id, userId: curUserId }, attendance_times: 0, attendance_rate: "0" }),
            headers: { 'Content-Type': 'application/json' },
        }
        const createResponse = await fetch(INSERT_ENROLL_URL, params)
        const newData = await createResponse.json()
        fetchClassById(newClass.id)
    }
    const handleSubmit = (classId, classroom, instructor, code) => {
        console.log("add class button handleSubmit")
        newClass = { "id": classId, "title": classroom, "instructor": instructor }

        // setExistCourse(newClass);
        //check code 
        checkClassInfo(newClass, code)
        //change status
        setIsShowForm(false)

    }

    const handleCancel = () => {
        console.log("Cancel button cliked")
        setIsShowForm(false)
        setIsCreated(false)
    }
    const handleMessageCancel = () => {
        setIsShowNotExist(false)
        setIsCreated(false)
    }

    const handleClickOutside = () => {
        setIsShowForm(false)
        setIsCreated(false)
    }
    const handleRollCallAlertCancel = () => {
        setIsShowRollCallStart(false)
        setIsCreated(false)
    }
    useEffect(() => {
        console.log(curUserId)
    }, [])
    const classes = useStyles()
    return (
        <>
            <Wrapper>
                <p style={{ color: 'white', marginLeft: '10vw', fontSize: 18 + 'px', marginTop: 20 + 'px', float: "left" }}>Your Classrooms</p>
                <button type="button" class="btn btn-dark" id='btn-render' onClick={handleClick} style={{ marginRight: '10vw', marginTop: 20 + 'px', float: "right" }}>Add New Classroom</button>
            </Wrapper>
            <DialogWrapper>
                <Dialog open={isShowForm} onClose={!isShowForm} className="dialog_box">
                    <div style={{ width: 500, margin: '0 auto' }}>
                        <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Please select a class"}</DialogTitle>
                        {/* <DialogContent>
                    </DialogContent> */}
                        {/* <DialogActions className={classes.alignItemsAndJustifyContentForm} style={{backgroundColor: '#3d3c40', marginBottom: '0px'}}> */}
                        <InvitationForm className={classes.alignItemsAndJustifyContentForm} handleSubmit={handleSubmit} handleCancel={handleCancel} />
                        {/* </DialogActions> */}
                    </div>
                </Dialog>
            </DialogWrapper>

            {isCreated &&
                <DialogWrapper>
                    <Dialog open={isCreated} onClose={!isCreated} className="dialog_box">
                        <div style={{ width: 500, margin: '0 auto' }}>
                            <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"The class already exists"}</DialogTitle>
                            <DialogActions style={{ backgroundColor: '#3e3d40' }}>
                                <Wrapper>
                                    <button className="form-btn" onClick={handleMessageCancel}>OK</button>
                                </Wrapper>
                            </DialogActions>
                        </div>
                    </Dialog>
                </DialogWrapper>}
            {isShowRollCallStart &&
                <DialogWrapper>
                    <Dialog open={isShowRollCallStart} onClose={!isShowRollCallStart} className="dialog_box">
                        <div style={{ width: 500, margin: '0 auto' }}>
                            <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Cannot join a class that has already been roll called"}</DialogTitle>
                            <DialogActions style={{ backgroundColor: '#3e3d40' }}>
                                <Wrapper>
                                    <button className="form-btn" onClick={handleRollCallAlertCancel}>OK</button>
                                </Wrapper>
                            </DialogActions>
                        </div>
                    </Dialog>
                </DialogWrapper>}
            {/* <DialogWrapper>
              <Dialog open={isShowNotExist} onClose={!isShowNotExist} className="dialog_box">
                  <div style={{width: 500, margin: '0 auto'}}>
                      <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"The class " + existCourse + " doesn't exists"}</DialogTitle>
                      <DialogActions style={{backgroundColor:'#3e3d40'}}>
                          <Wrapper>
                              <button className="form-btn" onClick={handleMessageCancel}>OK</button>
                          </Wrapper>
                      </DialogActions>
                  </div>
              </Dialog>
          </DialogWrapper> */}


        </>
    )
}

const Wrapper = styled.main`
  margin-top: 30px;
  .login{
    text-decoration:none;
    transition: 0.3s;
    color: white;
  }
  .form-btn{
    background-color: #6167f3;
    color:white;
    border-radius: 3px;
    border-style: solid;
    border:none;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
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
export default AddClassroomStudent