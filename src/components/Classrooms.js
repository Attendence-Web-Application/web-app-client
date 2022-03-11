import React, { useState } from 'react';
import styled from 'styled-components'
import Classroom from './Classroom';
const Classrooms = ({ classrooms, setClassrooms }) => {

    const addTest = (e) => {
        e.preventDefault()
        fetch('http://localhost:8081/add1', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: 8, name: "testadd8", age: 120 })
        }).then(() => {
            console.log("new test add");
        })
    }

    return (
        // <Wrapper>
        //     {test.map((item, index) => {
        //     return (
        //         <div key={index} className="testBorder">
        //             <p>id: {item.id}</p>
        //             <p>name: {item.name}</p>
        //             <p>age: {item.age}</p>
        //             <button onClick={addTest}>add</button>
        //         </div>
        //     )
        // })}
        // </Wrapper>

        // <Classroom/>
        // <Wrapper>
            <div class="row row-cols-3">
                {classrooms.map((item, index) => {  
                return (
                    <Classroom key={index} item = {item}/>  
                ) 
            })}
            </div>
        // </Wrapper>
      
    );
}

const Wrapper = styled.main`
  .testBorder{
    border: 2px solid black;
    margin-top: 10px;
  }
`
 
export default Classrooms;