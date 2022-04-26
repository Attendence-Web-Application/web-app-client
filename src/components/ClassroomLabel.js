import React from "react";
import styled from 'styled-components';
import moment from 'moment';
import { FIND_ALL_ENROLL_STUDENT_URL, CREATE_ROLL_CALL_URL } from '../utils/api'


const MINUTE_TO_ADD = 10;
const ClassroomLabel = ({classNumber, classTitle, instructor}) => {
    return (
        <Wrapper>
            <p className="leftLabel">{classNumber + ' ' + classTitle}</p>
            <p className="rightLabel">Instructor: {instructor}</p>
        </Wrapper>
    );
}

const Wrapper = styled.main`
width: 100%;
margin-top: 30px;
background-color: #6167f3;
.leftLabel{
    color:white;
    margin-left: 10vw;
    font-size: 18px;
    margin-top: 20px;
    float: left;
  }
.rightLabel{
    color:white;
    margin-right: 10vw;
    font-size: 18px;
    margin-top: 20px;
    float: right;
  }
  `
export default ClassroomLabel;