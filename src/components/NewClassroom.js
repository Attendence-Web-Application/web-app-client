import React from "react";

const NewClassroom = () => {
    return (
        <div>
            <span class="badge bg-secondary" style={{fontSize: 20 + 'px', marginTop: 20 + 'px', float: "left"}}>Your Classrooms</span>
            <button type="button" class="btn btn-dark" style={{marginTop: 20 + 'px', float: "right"}}>Create New Classroom</button>
        </div>
    );
}

export default NewClassroom;