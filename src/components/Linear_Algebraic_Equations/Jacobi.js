import React from 'react'
import Nav_Bar from '../Nav_Bar'
import './Style/CramerRule.css';
import {useState} from 'react';
import { Table } from 'antd';
import axios from 'axios';


export default function Jacobi() {
    const topic = "Jacobi Rule"
    let [row, setrow] = useState(5);
    let [col, setcol] = useState(5);
    let [button_state, setbutton_state] = useState(false);

    let [matrixA, setMatrixA] = useState([])
    let [matrixB, setMatrixB] = useState([])
    let [matrixC, setMatrixC] = useState([])
    const [ans, setans] = useState([]);



    const initialA = (row, column, event) => {
        let copy = [...matrixA];
        copy[row][column] = + event.target.value;
        setMatrixA(copy);
    };

    const initialB = (row, column, event) => {
        let copy = [...matrixB];
        copy[row][column] = + event.target.value;
        setMatrixB(copy);
    };

    const initialC = (row, column, event) => {
        let copy = [...matrixC];
        copy[row][column] = + event.target.value;
        setMatrixC(copy);
    };





    if (button_state === true) { // set row and col
        setMatrixA(Array.from({length: row}, () => Array.from({length: col}, () => null)));
        setMatrixB(Array.from({length: 1}, () => Array.from({length: row}, () => null)));
        setMatrixC(Array.from({length: 1}, () => Array.from({length: row}, () => null)));
        setbutton_state(false);
    }

    const column = [
        { title: 'X', dataIndex: 'x', key: 'x' },
        { title: 'Value', dataIndex: 'value', key: 'value' },
    ]

    const Jacobian = () => {
        axios.post('http://localhost:5000/api/Jacobi',{
            matrixA:matrixA,
            matrixB:matrixB,
            matrixC:matrixC,
        })
        .then(res => {
            setans(res.data.Temp_Ans)
            console.log(ans);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <Nav_Bar/>
            <div className='container'>
                <h1>{topic}</h1>
                <div className='container'>
                    <label className='form-label'>Number of Equations</label>
                    <input type="text" className="form-control"
                        value={row}
                        onChange={
                            e => setrow(e.target.value)
                    }></input>
                    <label className='form-label'>Number of Variables</label>
                    <input type="text" className="form-control"
                        value={col}
                        onChange={
                            e => setcol(e.target.value)
                    }></input>
                    <button className="btn btn-primary"
                        onClick={
                            () => setbutton_state(true)
                    }>Submit</button>
                </div>
                <div className='container'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <table>
                                <h1>Matrix A</h1>
                                    <tbody> {
                                        matrixA.map((row, rowIndex) => (
                                            <tr key={rowIndex} >
                                                {
                                                row.map((column, columnIndex) => (
                                                    <td key={columnIndex}><input type="number"onChange={(e) => initialA(rowIndex, columnIndex, e)} style={{margin: 5}}/></td>))
                                            }</tr>
                                        ))
                                    }</tbody>
                                </table>
                            </div>
                            <div className='col'>
                            
                            <table>
                            <h1>Matrix B</h1>
                                       <tbody>{
                                        matrixB.map((row, rowIndex) => (
                                            <tr key={rowIndex} style={{padding: 10}}>
                                                {
                                                row.map((column, columnIndex) => (
                                                    <tr key={columnIndex}>
                                                        <input type="number"onChange={(e) => initialB(rowIndex, columnIndex, e)} style={{margin: 6}}/>
                                                        </tr>))
                                            } </tr>
                                        ))
                                    }</tbody>
                                </table>

                            </div>
                            <div className='col'>
                            <table>
                            <h1>Initial X</h1>
                                       <tbody>{
                                        matrixC.map((row, rowIndex) => (
                                            <tr key={rowIndex} style={{padding: 10}}>
                                                {
                                                row.map((column, columnIndex) => (
                                                    <tr key={columnIndex}>
                                                        <input type="number"onChange={(e) => initialC(rowIndex, columnIndex, e)} style={{margin: 6}}/>
                                                        </tr>))
                                            } </tr>
                                        ))
                                    }</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                
                </div>
                
                <div className='container'>
                    <button className="btn btn-primary"onClick={ () => Jacobian()}>Submit</button>
                    </div>
                <div className='container'>
                <h2>Output</h2>
                <Table columns={column} dataSource={ans}/>
            
                </div>
            </div>
        </div>
    )
}
