import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Classroom from './Classroom';
import NewClassroom from './NewClassroom';
import NavBar from './NavBar';
const Classrooms = ({ classrooms, setClassrooms }) => {
    // const addTest = (e) => {
    //     e.preventDefault()
    //     fetch('http://localhost:8081/add1', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ id: 8, name: "testadd8", age: 120 })
    //     }).then(() => {
    //         console.log("new test add");
    //     })
    // }
    const [isLogin, setIsLogin] = useState(false);
    const handleEnterClass = (id) => {
        console.log("enter into ", id);
    }

    const handleDeleteClass = (id) => {
        const remainClass = classrooms.filter((p) => id !== p.id);
        setClassrooms(remainClass);
    }

    const clearState = () => {
        setIsLogin(false)
    }
    useEffect(() => {
        console.log(localStorage.getItem('user'))
       if (localStorage.getItem('user') == null) {
            setIsLogin(false);
       }
       else {
            setIsLogin(true);
       }
    });

    return (
            <React.Fragment>
                <NavBar props={clearState}/>
                <NewClassroom/>
                <div class="row row-cols-3" style={{marginTop: 80 + 'px'}}>
                    {isLogin && classrooms.map((item, index) => {  
                    return (
                        <Classroom key={index} item = {item} enterClass = {handleEnterClass} deleteClass = {handleDeleteClass}/>  
                    ) 
                })}
                </div>
            </React.Fragment>
      
    );
}
 
export default Classrooms;