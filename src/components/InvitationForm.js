import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {FIND_ALL_USER_URL, GET_ALL_TITLE, GET_USER_BY_TITLE} from '../utils/api';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const defaultClass = "Please Select Class";
const defaultInstructor = {"id": "default", "name": "Please Select Instructor"};
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
const InvitationForm = ({handleSubmit, handleCancel}) => {
    const [classroomList, setClassroomList] = useState([defaultClass]);
    const [classroom, setClassroom] = useState(defaultClass);
    const [instructor, setInstructor] = useState(defaultInstructor);
    const [code, setCode] = useState('');
    const [userList, setUserList] = useState([defaultInstructor]);
    const [userData, setUserData] = useState();
    const [isShow, setIsShow] = useState(false);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }

    const instructorChange = (e) => {
        console.log("target", e.target.options.selectedIndex);
        setInstructor(e.target.value);
    }
    const classroomChange = (e) => {
        setClassroom(e.target.value);
        fetchUser(e.target.value);
    }

    const fetchAllUser = async () => {
        try {
            const response = await fetch(FIND_ALL_USER_URL, {mode: 'cors'});
            const data = await response.json();
            setUserData(data);
        }
        catch(e) {
            console.log(e);
        }
    }
    const fetchUser = async (title) => {
        setUserList([]);
        try {
            const response = await fetch(GET_USER_BY_TITLE + title, {mode: 'cors'});
            const data = await response.json();
            console.log("userdata", data);
            console.log("userData", userData);
            for (let i = 0; i < data.length; i++) {
                console.log("usr", data[i].id, userData[data[i].user_id]);
                if (i == 0) {
                    setInstructor(userData[data[i].user_id]);
                }
                const newUser = {"id": data[i].id, "name": userData[data[i].user_id]};
                setUserList(prev => [...prev, newUser]);
            }
            
        }
        catch(e) {
            console.log(e);
        }
    }
    const fetchData = async () => {
        try {
            const response = await fetch(GET_ALL_TITLE, {mode:'cors'});
            const data = await response.json();
            // setClassroomList(data)
            // setClassroom(data[0].title)
            setClassroomList(prev => [...prev, ...data]);
            // setClassroom(data[0]);
        }
        catch (e) {
            console.log(e)
        }
    }

    const invalidInput = () => {
        setIsShow(true);
    }
    const handleValidSubmit = (e) => {
        e.preventDefault();
        const newClassroom = e.target.elements.classroom.value;
        const newInstructor = e.target.elements.instructor.value;
        const classId = userList[e.target.elements.instructor.options.selectedIndex].id;
        const newCode = e.target.elements.code.value;
        if (newClassroom === defaultClass || newInstructor === defaultInstructor) {
            invalidInput();
        }
        else {
            handleSubmit(classId, newCode);
        }

    }
    useEffect(() => {
        setClassroomList(['Please Select Class']);
        fetchAllUser();
        fetchData();
    }, [])

    const classes = useStyles();
    return (
        <Wrapper>
            <form onSubmit={handleValidSubmit} className='add_box'>
                <div className='user_box'>
                    {/* <label htmlFor="classroom">Class </label> */}
                    <select id="classroom" value={classroom} onChange={classroomChange} required>
                        {classroomList.map((classroomItem, index) => {
                            return <option value={classroomItem} key={index} disabled={classroomItem === defaultClass? true : false}>{classroomItem}</option>
                        })}
                    </select>
                    <select id="instructor" value={instructor} onChange={instructorChange} required>
                        {userList.map((instructorItem) => {
                            console.log("instructorItem", instructorItem);
                            return <option value={instructorItem.name} key={instructorItem.id} >{instructorItem.name} </option>
                        })}
                    </select>
                    <br/>
                    {/* <label htmlFor="code">Code: </label> */}
                    <input id="code" type="text" placeholder="Invitation code" onChange={handleCodeChange} ></input>
                </div>
                <div className='button_div'>
                    <button type="submit" className='form_btn submit'>Submit</button>
                    <button type="reset" className='form_btn reset'>Reset</button>
                    <button type="button" className='form_btn cancel' onClick={handleCancel}>Cancel</button>
                </div>
            </form>

            <DialogWrapper>
              <Dialog open={isShow} onClose={!isShow} className="dialog_box">
                  <div style={{width: 500, margin: '0 auto'}}>
                      <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Please select class and instructor"}</DialogTitle>
                      <DialogActions style={{backgroundColor:'#3e3d40'}}>
                          <Wrapper>
                              <button className="confirm-btn" onClick={() => setIsShow(false)}>OK</button>
                          </Wrapper>
                      </DialogActions>
                  </div>
              </Dialog>
          </DialogWrapper>
        </Wrapper>
        
    );
}

const Wrapper = styled.main`

.confirm-btn{
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
 .add_box{
     background-color: #3d3c40;
    width:500px;
 }
  .user_box{
    position: relative;
    margin: 0 auto;
  }
  .user_box input, select{
    font-size: 20px;
    color: #fff;
    margin: 20px;
    border: none;
    border-bottom: 1px solid #4f4e52;
    outline: none;
    background: transparent;
    width:400px;
    height: 50px;
    text-indent: 10px;
  }
  .user_box input:focus, select:focus{
      border: 1px solid #6167f3;
      border-radius: 8px;
      background: #313033;
  }
  .user_box label{
      color: #94929f;
      margin-left: 30px;
      font-size: 20px;

  }
  .button_div{
      background-color: #313033;
      text-align:center;
      margin-bottom: 0px;
  }
  .button_div button:hover{
      transition: 0.6s;
      background: #6167f3;
      color: white;
  }
  .form_btn{
    margin: 10px;
    background-color: #3e3d40;
    color:#717078;
    border-radius: 3px;
    border-style: solid;
    border:none;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
 
//   .user_box label {
//     position: absolute;
//     top:0;
//     left: 0;
//     padding: 10px 0;
//     font-size: 16px;
//     color: #fff;
//     pointer-events: none;
//     transition: .5s;
// }
// .login-box .user_box input:focus ~ label,
// .login-box .user_box input:valid ~ label {
//   top: -20px;
//   left: 0;
//   color: #03e9f4;
//   font-size: 12px;
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
export default InvitationForm;