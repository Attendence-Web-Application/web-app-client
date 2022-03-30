import React, {useState, useEffect} from "react";
import styled from 'styled-components'
import Tab from "./Tab";
import AttendenceRecordTable from "./AttendenceRecordTable";
import StudentAttendanceTable from "./StudentAttedanceTable";

const FIND_ROLL_CALL_ID_URL = 'http://localhost:8080/attendanceRecord/user/';
const FIND_ROLL_CALL_URL = 'http://localhost:8080/rollCall/';

const Tabs = ({classNumber, classId, tabContent}) => {
    const curUserId = parseInt(sessionStorage.getItem("id"));
    const tabValues = ['Attendence Records', 'Student Attendence Rate'];
    const [activeTab, setActiveTab] = useState(0);
    const [record, setRecord] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleOnClickTab = (tab) => {
        setActiveTab(tab);
    }

    //get all roll call record of this class
    const fetchRollCallByClass = async (classId, IdArr) => {
        try{
            for (let i = 0; i < IdArr.length; i++) {
                const response = await fetch(FIND_ROLL_CALL_URL + IdArr[i].id.rollCallId, {mode:'cors'});
                const data = await response.json();
                if (data.class_id === classId) {
                    setRecord((prev) => [...prev, data]);
                }
            }
            setIsLoading(false);
            console.log('data', record);
        }
        catch(e) {
            console.log(e);
        }
    }

    //get all roll call of this professor
    const fetchAllRollCallByUser = async (curUserId) => {
        try {
            const response = await fetch(FIND_ROLL_CALL_ID_URL + curUserId, {mode:'cors'});
            const data = await response.json(); //get the list of roll_call_id of current user
            fetchRollCallByClass(classId, data);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setRecord([]);
       fetchAllRollCallByUser(curUserId);
    }, [curUserId]);

    return (
        !isLoading && 
        <Wrapper>
            <div className="tab_list_div">
                <ul className="tab_list">
                    {tabValues.map((tab, index) => {
                        return (
                            <Tab key={index} id={index} onClickItem={handleOnClickTab} label={tab} activeTab={activeTab}/>
                        )
                    })}
                </ul>
            </div>
            <div className="tab_content">
                {activeTab === 0 ? <AttendenceRecordTable classNumber={classNumber} classId={classId} record = {record}/> : 
                    <StudentAttendanceTable classNumber={classNumber} classId={classId} record = {record}/>}
            </div>
        </Wrapper> 
    );
}

const Wrapper = styled.main`
  .tab_list_div{
    margin: auto;
    margin-top:100px;
    width: 80%;
    height: 30px;
  }
  .tab_content{
      margin: auto;
      width: 80%;
      background-color: blue;
      height: 100px;
      color:white;
  }
  .tab_list {
    margin: 10px;
    margin-left:0px;
    padding-left: 0;
    list-style-type: none;
    background-color: red;
  }
  `
export default Tabs;