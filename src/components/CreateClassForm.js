import React, {useState} from "react";
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import "react-datepicker/dist/react-datepicker.css";
const CreateClassForm = ({handleSubmit, handleCancel}) => {
    const [classNumber, setClassNumber] = useState('');
    const [classTitle, setClassTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleClassChange = (e) => {
        setClassNumber(e.target.value);
    }
    const handleTitleChange = (e) => {
        setClassTitle(e.target.value);
    }
    const handleStartDate = (e) => {
        setStartDate(e);
    }
    const handleEndDate = (e) => {
        setEndDate(e);
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit} className='create_class_box'>
                <div className='input_class_box'>
                    {/* <label htmlFor="classroom">Class </label> */}
                    <input id="classNumber" type="text" placeholder="Number, e.g. CSxxxx" onChange={handleClassChange} required></input>
                    <br/>
                    {/* <label htmlFor="code">Code: </label> */}
                    <input id="classTitle" type="text" placeholder="Title" onChange={handleTitleChange} required></input>
                    <br/>
                    <DatePicker
                        selected={ startDate }
                        className="input"
                        onChange={ handleStartDate }
                        name="startDate"
                        placeholderText="Select Start Date"
                        dateFormat="yyyy-MM-dd"
                    />
                    <br/>
                    <DatePicker
                        selected={ endDate }
                        className="input"
                        onChange={ handleEndDate }
                        name="endDate"
                        placeholderText="Select End Date"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className='class_button_div'>
                    <button type="submit" className='form_btn'>Submit</button>
                    <button type="reset" className='form_btn'>Reset</button>
                    <button type="cancel" className='form_btn' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </Wrapper>
        
    );
}

const Wrapper = styled.main`
 .create_class_box{
    background-color: #3d3c40;
    width:500px;
    height: 480px;
 }
  .input_class_box{
    position: relative;
    margin: 0 auto;
    height: 400px;
    background-color: #3d3c40;
  }
  .input_class_box input{
    font-size: 20px;
    color: #fff;
    margin: 20px;
    border: none;
    border-bottom: 1px solid #4f4e52;
    outline: none;
    background: transparent;
    width:400px;
    height: 50px;
    text-indent: 10px;
  }
  .input_class_box input:focus{
      border: 1px solid #6167f3;
      border-radius: 8px;
      background: #313033;
  }
  .input_class_box label{
      color: #94929f;
      margin-left: 30px;
      font-size: 20px;

  }
  .class_button_div{
      background-color: #313033;
      text-align:center;
      margin-bottom: 0px;
      position:absolute;
      bottom:0;
      width: 500px
  }
  .class_button_div button:hover{
      transition: 0.6s;
      background: #6167f3;
      color: white;
  }
  .form_btn{
    margin: 10px;
    background-color: #3e3d40;
    color:#717078;
    border-radius: 3px;
    border-style: solid;
    border:none;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
 
//   .user_box label {
//     position: absolute;
//     top:0;
//     left: 0;
//     padding: 10px 0;
//     font-size: 16px;
//     color: #fff;
//     pointer-events: none;
//     transition: .5s;
// }
// .login-box .user_box input:focus ~ label,
// .login-box .user_box input:valid ~ label {
//   top: -20px;
//   left: 0;
//   color: #03e9f4;
//   font-size: 12px;
}
  `
export default CreateClassForm;