import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Classroom from './Classroom';
import AddClassroomProfessor from './AddClassroomProfessor';
import AddClassroomStudent from '../components/AddClassroomStudent';
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
    const [isStudent, setIsStudent] = useState(false);
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

       if (localStorage.getItem('type') === 'student') {
            console.log(localStorage.getItem('type'));
            setIsStudent(true);
       }
       else if (localStorage.getItem('type') === 'professor') {
           console.log(localStorage.getItem('type'));
           setIsStudent(false);
       }
    });

    return (
            <React.Fragment>
                <NavBar props={clearState}/>
                <ButtonWrapper>
                    {isLogin && (isStudent && <AddClassroomStudent classrooms={classrooms} setClassrooms={setClassrooms}/>)} ||
                    {isLogin && (!isStudent && <AddClassroomProfessor/>)}
                </ButtonWrapper>
                <Wrapper>
                    <div class="row row-cols-auto row-cols-md-3" style={{margin: '0 auto', floag: 'none'}}>
                        {isLogin && classrooms.map((item, index) => {  
                        return (
                            <Classroom class="shadow-lg p-3 mb-5 bg-white rounded" key={index} item = {item} enterClass = {handleEnterClass} deleteClass = {handleDeleteClass}/>  
                        ) 
                    })}
                    </div>
                </Wrapper>
                
            </React.Fragment>
      
    );
}
const ButtonWrapper = styled.main`
  margin: 0 auto;
//   margin-top:30px;
  height: 10vh;
  width: 100vw;
`
const Wrapper = styled.main`
  margin: 0 auto;
  width: 150vh;
  height: 100vh;
}
`
export default Classrooms;