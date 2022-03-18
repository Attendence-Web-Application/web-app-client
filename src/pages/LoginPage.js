import React, { useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LoginComponent from '../components/LoginComponent'
import checklist from '../assets/checklist.png'
import thumb_up1 from '../assets/thumb-up1.png'

const LoginPage = () => {
    localStorage.clear();
    return <Wrapper>
        <img src={thumb_up1} alt="thumb_up1" className='thumb_up1' />
        <div className='left'>
            <LoginComponent />
        </div>
        <div className='right'>
            <section className='right_icon_section'>
                <img src={checklist} alt="checklist" className='icon' />
            </section>
            <section className='right_text_section'>
                <h2>Start to Record Wisely</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi optio, error autem deserunt sunt eum?</p>
            </section>
        </div>
    </Wrapper>
}

const Wrapper = styled.main`

    display: flex;
    height: 100vh;
    .thumb_up1{
        pointer-events: none;
        position: absolute;
        width: 365px;
        z-index: -1;
        transform: rotate(20deg);
    }

    .left{
        flex:1;
        text-align:center;
        justify-content: center;

        margin-top: 15vh;
    }

    .right{
        color: #1f2125;
        // background-color: #1f2125;        
        background-color: #c4f8ff;  
        flex:1;
    }
    .right_icon_section{
        display:flex;
        justify-content: center;
        margin-top: 10vh;
    }
    .right_text_section{
        text-align:center;
        margin: 0 auto;
    }
    .right_text_section p{
        margin-left: auto;
        margin-right: auto;
        width: 40vh;
    }
    .icon{
        // height:140px;
        // width:140px;
        height:500px;
        // width:400px;
        margin: 10px;
    }
    @media screen and (max-width: 1024px) {
        display: block;
        .thumb_up1{
            pointer-events: none;
            position: absolute;
            width: 200px;
            z-index: -1;
            transform: rotate(20deg);
        }
        .left{
            margin-top: 10vh;
        }
    }
`

export default LoginPage
