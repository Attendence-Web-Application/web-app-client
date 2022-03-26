import React, {useState} from "react";
import styled from 'styled-components'
import Tab from "./Tab";
import AttendenceRecordTable from "./AttendenceRecordTable";

const Tabs = ({classNumber, classId, tabContent}) => {
    const tabValues = ['Attendence Records', 'Student Attendence Rate'];
    const [activeTab, setActiveTab] = useState(0);
    console.log(tabContent);
    const handleOnClickTab = (tab) => {
        setActiveTab(tab);
    }
    return (
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
                {/* {tabContent.map((tab, index) => {
                    if (index === activeTab) return tab;
                    else return undefined;
                })} */}
                {
                    activeTab === 0 ? <AttendenceRecordTable classNumber={classNumber} classId={classId}/> : tabContent[0]
                }
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