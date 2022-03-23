import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Classroom from './Classroom';
import AddClassroomProfessor from './AddClassroomProfessor';
import AddClassroomStudent from '../components/AddClassroomStudent';
import NavBar from './NavBar';
import { Container } from 'bootstrap-4-react';

const DELETE_CLASS_URL = 'http://localhost:8080/class_enrolled/getClassEnroll/'
const Classrooms = ({ classrooms, setClassrooms }) => {

    const token = sessionStorage.getItem('token');
    const type = sessionStorage.getItem('type');
    const [isLogin, setIsLogin] = useState(token);
    const [isStudent, setIsStudent] = useState(type === "student");
    const curUserId = sessionStorage.getItem('id');

    const handleEnterClass = (id) => {
        console.log("enter into ", id);
    }

    const handleDeleteClass = async (id) => {
        const remainClass = classrooms.filter((p) => id !== p.id);
        //delete class by id in db
        try{
            const response = await fetch(DELETE_CLASS_URL + curUserId + "_" + id, {method: 'DELETE'});
            const data = await response.json();
        }
        catch (e){
            console.log(e);
        }
        
        setClassrooms(remainClass);
    }

    const clearState = () => {
        setIsLogin(false)
    }
    useEffect(() => {
        console.log(sessionStorage.getItem('id'))
       if (sessionStorage.getItem('id') == null) {
            setIsLogin(false);
       }
       else {
            setIsLogin(true);
       }

    //    if (sessionStorage.getItem('type') === 'student') {
    //         console.log(localStorage.getItem('type'));
    //         setIsStudent(true);
    //    }
    //    else if (localStorage.getItem('type') === 'professor') {
    //        console.log(localStorage.getItem('type'));
    //        setIsStudent(false);
    //    }
    }, [sessionStorage.getItem('id')]);

    return (
            <React.Fragment>
                <NavBar props={clearState} />
                <ButtonWrapper>
                    {isLogin && (isStudent && <AddClassroomStudent classrooms={classrooms} setClassrooms={setClassrooms}/>)} ||
                    {isLogin && (!isStudent && <AddClassroomProfessor classrooms={classrooms} setClassrooms={setClassrooms}/>)}
                </ButtonWrapper>
                <Wrapper>
                    <div className="row row-cols-auto row-cols-md-3" style={{margin: '0 auto', float: 'none'}}>
                        {isLogin && classrooms.map((item, index) => {  
                        return (
                            <Classroom className="shadow-lg p-3 mb-5 bg-white rounded" key={index} item = {item} handleEnterClass = {handleEnterClass} handleDeleteClass = {handleDeleteClass}/>  
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