import React from 'react'

const HomePageAdmin = () => {
    const url = 'http://localhost:8000/SIM-1.jpg'
  return (
    <div>
      <h1>Home Page Admin</h1>
      <img style={{width: 1000 + 'px'}} src={url} alt="SIM" />
    </div>
  )
}

export default HomePageAdmin