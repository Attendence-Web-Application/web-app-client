import React, {useState} from "react";
import styled from 'styled-components'

const Tab = ({id, onClickItem, label, activeTab}) => {
    const [isActive, setIsActive] = useState(false);
    const [className, setClassName] = useState('tab_item');
    let className_ = 'tab_item';

    if (activeTab === id) {
        className_ = className_ + '_active';
    }

    const handleClick = () => {
        onClickItem(id);
    }
    return (
        <Wrapper>
            <li className={className_} onClick={handleClick} >
                {label}
            </li>
        </Wrapper>
        
    );
}

const Wrapper = styled.main`
  .tab_item {
    display: inline-block;
    color:white;
    list-style: none;
    float: left;
    padding-top: 2px;
    padding-left: 20px;
    padding-right: 20px;
    height: 30px;
    margin-bottom: -1px;
    background-color: #1f2125
  }

  .tab_item_active {
    padding-top: 2px;
    padding-left: 20px;
    padding-right: 20px;
    color:white;
    // border: solid #ccc;
    float: left;
    height: 30px;
    // border-width: 1px 1px 0 1px;
    background-color: #6167f3;
    border-radius: 5px 10px;
  }
  `

export default Tab;