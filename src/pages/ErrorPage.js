import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'bootstrap-4-react';
import errorImage from '../assets/404.png'
const ErrorPage = () => {
  return (
    <Wrapper>
      <Container class="container col-sm-10 col-sm-offset-1">
        <div>
          <h1>Oh No! Error 404</h1>
          <p>The page you are looking for not available!</p>
        </div>
        <Link to="/homepage" className="back__home">Go to Home</Link>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
  background: url(${errorImage}) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height:100vh;
  font-family: 'Poppins', sans-serif;

  .back__home{
      color: #fff !important;
      padding: 10px 20px;
      background: hsl(230, 69%, 61%);;
      margin: 20px 0;
      border-radius:20px;
      display: inline-block;
      text-decoration: none!important;
      transition: 0.5s;
  }

  .back__home:hover{
      background-color: hsl(230, 57%, 53%) !important;
  }
  h1{
    padding-top:10%;
  }
  p{
      color: grey;
  }
`

export default ErrorPage
