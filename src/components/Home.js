import React from 'react'
import Nav_Bar from './Nav_Bar'
import logo from "../logo.svg";
import './Home.css';

export default function home() {
  return (
    <div>
      <Nav_Bar/>
      <header className="head">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>Numerical Project</h1>   
      </header>
    </div>
  )
}
