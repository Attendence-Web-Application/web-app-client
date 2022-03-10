import React, { useState } from 'react';
import styled from 'styled-components'

const TestList = ({ test, setTest }) => {

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
        <Wrapper>
            {test.map((item, index) => {
            return (
                <div key={index} className="testBorder">
                    <p>id: {item.id}</p>
                    <p>name: {item.name}</p>
                    <p>age: {item.age}</p>
                    <button onClick={addTest}>add</button>
                </div>
            )
        })}
        </Wrapper>
    );
}

const Wrapper = styled.main`
  .testBorder{
    border: 2px solid black;
    margin-top: 10px;
  }
`
 
export default TestList;