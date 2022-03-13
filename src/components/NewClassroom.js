import React from "react";

const NewClassroom = () => {
    return (
        <div>
            <p style={{color: 'white', marginLeft: '10vw', fontSize: 18 + 'px', marginTop: 20 + 'px', float: "left"}}>Your Classrooms</p>
            <button type="button" class="btn btn-dark" style={{marginRight: '10vw', marginTop: 20 + 'px', float: "right"}}>Create New Classroom</button>
        </div>
    );
}

export default NewClassroom;