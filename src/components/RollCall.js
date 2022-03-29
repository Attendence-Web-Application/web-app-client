import React from "react";
import styled from 'styled-components';

const RollCall = () => {
    //insert a record into 
    const handleClick = () => {

    }
    return (
        <Wrapper>
            <p className="label">Your Classrooms</p>
            <button type="button" className="btn btn-dark" id='btn-render' onClick={handleClick}>Start Roll Call</button>
        </Wrapper>
    );
}

const Wrapper = styled.main`
  margin-top: 30px;
  .label{
      color:white;
      margin-left: 10vw;
      font-size: 18px;
      margin-top: 20px;
      float: left;
  }
  button{
      margin-right: 10vw;
      margin-top:20px;
      float: right;
  }
  .login{
    text-decoration:none;
    transition: 0.3s;
    color: white;
  }
  .form-btn{
    background-color: #6167f3;
    color:white;
    border-radius: 3px;
    border-style: solid;
    border:none;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  `
export default RollCall;