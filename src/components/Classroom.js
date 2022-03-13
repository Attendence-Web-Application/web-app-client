import React, { useState } from 'react';
import styled from 'styled-components'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
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

const Classroom = ({item, enterClass, deleteClass}) => {
    const [open, setOpen] = useState(false)
    const {id, name, age} = item;

    //delete class from page and db when choose delete in pop up dialog
    const handleToDelete = () => {
        setOpen(false)
        deleteClass(id)
    }
    const classes = useStyles();
    return (
        <section class="card text-white bg-secondary mb-3" style={{width: 18 + 'em', margin: 20 + 'px', borderRadius: '20px 20px 20px 20px'}}>
            <div class="card-body">
                <h5 class="card-title">{id}</h5>
                <h6 class="card-subtitle">{name}</h6>
                <Container>
                    <button type="button" onClick={enterClass} className="btn-enter" style={{float:'left', marginLeft:0 + 'px'}}>Enter</button>
                    <button type="button" onClick={() => {setOpen(true)}} class="btn-delete" style={{float:'right', marginRight:0 + 'px'}}>Delete</button>
                </Container>
            </div>
            <Dialog open={open} onClose={!open || handleToDelete}>
                <DialogTitle className={classes.alignItemsAndJustifyContentTitle}>{"Delete Classroom"}</DialogTitle>
                <DialogContent className={classes.alignItemsAndJustifyContentTitle}>
                    <DialogContentText className={classes.alignItemsAndJustifyContentText}>
                        Do you want to delete classroom {name} ?
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
// const Container = styled.div.attrs({
//     className: 'container',
// })`
//   margin: auto;
//   width: 80%;
//   padding: 10px;
// `
const Container = styled.main`
  margin: auto;
  width: 80%;
  padding: 10px;

  .btn-enter{
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
`
export default Classroom;