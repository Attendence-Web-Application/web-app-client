import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Loading = ({setLoading}) => {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            history.push('/');
            setLoading(false);
        }, 2000)
    }, [])
    return <Wrapper>
        <div className='section section-center'>
            <div className="loading"></div>
        </div>
        <h2>Create Successfully...</h2>
    </Wrapper>
}

const Wrapper = styled.main`
    background-color: #3E424A;
    height: 100vh; 
    
    h2{
        color:white;
        display:flex;
        justify-content: center;
        letter-spacing: 5px;
    }
    .section {
        padding: 5rem 0;
    }
    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
    .loading {
        width: 6rem;
        height: 6rem;
        margin: 0 auto;
        margin-top: 10rem;
        border-radius: 50%;
        border: 4px solid rgba(146, 204, 255, 0.8);
        border-top-color: #ccc;
        animation: spinner 0.6s linear infinite;
    }
    .section-center {
        width: 90vw;
        margin: 0 auto;
        max-width: var(--max-width);
    }
    @media screen and (min-width: 992px) {
        .section-center {
            width: 95vw;
        }
    }
`

export default Loading