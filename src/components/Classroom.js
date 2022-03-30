import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import '../index.css'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  alignItemsAndJustifyContentTitle: {
    width: 400 + 'px',
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: '#3d3c40',
    color: 'white',
  },
  alignItemsAndJustifyContentText: {
    width: 400 + 'px',
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: '#3d3c40',
    color: 'white',
    paddingTop: 20 + 'px',
    paddingBottom: 20 + 'px',
  },
  alignItemsAndJustifyContentButton: {
    width: 400 + 'px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#313033',
    color: 'white',
  },
  dialogContentText: {
    color: '#797881',
  }
}))

const Classroom = ({item, handleEnterClass, handleDeleteClass}) => {
    const [open, setOpen] = useState(false)
    console.log('item', item)
    const {id, number, title} = item;
    console.log('id', id);
    //delete class from page and db when choose delete in pop up dialog
    const handleToDelete = () => {
        setOpen(false)
        handleDeleteClass(id)
    }
    const classes = useStyles();
    return (
        <section className="card text-white bg-secondary mb-3" style={{height: 13 + 'em', width: 18 + 'em', margin: 20 + 'px', borderRadius: '20px 20px 20px 20px'}}>
            <div className="card-body">
                <h5 className="card-title">{number}</h5>
                <h5 className="card-subtitle" style={{paddingBottom:5 + 'px'}}>{title}</h5>
                {/* <h6 className="card-subtitle">{title}</h6> */}
                <Container>
                    <button type="button" className="btn-enter"><Link to={{pathname: "/professorClassroom", state: {classNumber: number, classId: id}}} className="link">Enter</Link></button>
                    <button type="button" onClick={() => {setOpen(true)}} className="btn-delete">Delete</button>
                </Container>
            </div>
            <Dialog open={open} onClose={!open || handleToDelete}>
                <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Delete Classroom"}</DialogTitle>
                <DialogContent className={classes.alignItemsAndJustifyContentTitle}>
                    <DialogContentText className={classes.alignItemsAndJustifyContentText}>
                        Do you want to delete classroom {title} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.alignItemsAndJustifyContentButton}>
                <Wrapper>
                    <div className='del_classroom_button_div'>
                        <button className='form-btn left' onClick={handleToDelete}>DELETE</button>
                        <button className='form-btn right' onClick={() => {setOpen(false)}}>CANCEL</button>
                    </div>
                </Wrapper>
                </DialogActions>
            </Dialog>
        </section>
    );
}

const Wrapper = styled.main`
  .del_classroom_button_div{
      background-color: #313033;
      text-align:center;
      margin-bottom: 0px;
  }
  .del_classroom_button_div button:hover{
      transition: 0.6s;
      background: #6167f3;
      color: white;
  }
  .form-btn{
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
  .left{
      margin-right:10px;
  }
  .right{
      margin-left: 10px;
  }
`
const Container = styled.main`
  margin: 0;
  width: 100%;
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  .btn-enter{
    float: left;
    margin-left: 30px;
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

  .btn-delete{
    float: right;
    margin-right: 30px;
    background-color: #313033;
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
  .link{
    color:white;
    text-decoration: none;;
  }
`
export default Classroom;