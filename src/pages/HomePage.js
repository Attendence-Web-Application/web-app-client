import React, { useState } from 'react'



const HomePage = () => {
  const [home, setHome] = useState('home');
  return <h1>homepage: {home}</h1>
}

export default HomePage
