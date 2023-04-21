import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';  
import {  Route, Routes} from 'react-router-dom';
import Bisection from './components/Root_of_Equations/Bisection';
import FalsePosition from './components/Root_of_Equations/FalsePosition';
import OnePoint from './components/Root_of_Equations/OnePoint';
import NewtonRaphson from './components/Root_of_Equations/NewtonRaphson';
import SecantMethod from './components/Root_of_Equations/Secant';
import CramerRule from './components/Linear_Algebraic_Equations/CramerRule';
import LUDecomposition from './components/Linear_Algebraic_Equations/LUDecompose';
import Jacobi from './components/Linear_Algebraic_Equations/Jacobi';
import LinearRegression from './components/Regression/LinearRegression';
import Login from './components/Login';

class App extends Component { 
  render() {
    return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Bisection" element={<Bisection/>}/>
          <Route path="/FalsePosition" element={<FalsePosition/>} />
          <Route path="/OnePoint" element={<OnePoint/>} />
          <Route path="/NewtonRaphson" element={<NewtonRaphson/>} />
          <Route path="/SecantMethod" element={<SecantMethod/>} />
          <Route path="/CramerRule" element={<CramerRule/>} />
          <Route path="/LUDecomposition" element={<LUDecomposition/>} />
          <Route path='/Jacobi' element={<Jacobi/>} />
          <Route path='/LinearRegression' element={<LinearRegression/>} />
          <Route path='/Login' element={<Login/>} />
        </Routes>
    );
  }
}


export default App;
