import React, { useState } from 'react';
import styled from 'styled-components'

const Classroom = ({item}) => {
    const {id, name, age} = item;
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
        <section class="card" style={{width: 18 + 'em', margin: 30 + 'px'}}>
            <div class="card-body">
                <h5 class="card-title">{id}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{name}</h6>
                <h6 class="card-subtitle mb-2 text-muted">{age}</h6>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </section>
    );
}

const Wrapper = styled.main`
  .testBorder{
    border: 2px solid black;
    margin-top: 10px;
  }
`
 
export default Classroom;