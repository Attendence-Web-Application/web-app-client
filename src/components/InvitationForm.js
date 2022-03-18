import React, {useState} from 'react';
import styled from 'styled-components'
const InvitationForm = ({handleSubmit}) => {
    const [classroom, setClassroom] = useState('');
    const [code, setCode] = useState('');
    const handleClassChange = (e) => {
        setClassroom(e.target.value);
    }
    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit} className='add_box'>
                <div className='user_box'>
                    {/* <label htmlFor="classroom">Class </label> */}
                    <input id="classroom" type="text" placeholder="Classroom" onChange={handleClassChange}></input>
                    <br/>
                    {/* <label htmlFor="code">Code: </label> */}
                    <input id="code" type="text" placeholder="Invitation code"onChange={handleCodeChange} ></input>
                </div>
                <div className='button_div'>
                    <button type="submit" className='form_btn submit'>Submit</button>
                    <button type="reset" className='form_btn reset'>Reset</button>
                    <button type="cancel" className='form_btn cancel'>Cancel</button>
                </div>
            </form>
        </Wrapper>
        
    );
}

const Wrapper = styled.main`
 .add_box{
     background-color: #3d3c40;
    width:500px;
 }
  .user_box{
    position: relative;
    margin: 0 auto;
  }
  .user_box input{
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
  .user_box input:focus{
      border: 1px solid #6167f3;
      border-radius: 8px;
      background: #313033;
  }
  .user_box label{
      color: #94929f;
      margin-left: 30px;
      font-size: 20px;

  }
  .button_div{
      background-color: #313033;
      text-align:center;
      margin-bottom: 0px;
  }
  .button_div button:hover{
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
export default InvitationForm;