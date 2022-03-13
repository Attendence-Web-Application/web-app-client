import React, { useState } from 'react';
import styled from 'styled-components'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import '../index.css'

const Container = styled.div.attrs({
    className: 'container',
})`
  margin: auto;
  width: 80%;
  padding: 10px;
`
const Classroom = ({item, enterClass, deleteClass}) => {
    const [open, setOpen] = useState(false)
    const {id, name, age} = item;

    //delete class from page and db when choose delete in pop up dialog
    const handleToDelete = () => {
        setOpen(false)
        deleteClass(id)
    }

    return (
        <section class="card text-white bg-secondary mb-3" style={{width: 18 + 'em', margin: 20 + 'px', borderRadius: '20px 20px 20px 20px'}}>
            <div class="card-body">
                <h5 class="card-title">{id}</h5>
                <h6 class="card-subtitle">{name}</h6>
                <Container>
                    <button type="button" onClick={enterClass} class="btn btn-warning" style={{float:'left', marginLeft:0 + 'px'}}>Enter</button>
                    <button type="button" onClick={() => {setOpen(true)}} class="btn btn-danger" style={{float:'right', marginRight:0 + 'px'}}>Delete</button>
                </Container>
            </div>
            <Dialog open={open} onClose={!open || handleToDelete}>
                <DialogTitle>{"Delete Classroom"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Do you want to delete classroom {name} ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleToDelete} 
                        color="primary" autoFocus>
                    Delete
                </Button>
                <Button onClick={() => {setOpen(false)}} 
                        color="primary" autoFocus>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
}

export default Classroom;