import React from 'react'
import Nav_Bar from '../Nav_Bar'
import { Line } from 'react-chartjs-2';
import {useState} from 'react';
import Chart from 'chart.js/auto';
import {det,usolve,evaluate} from 'mathjs';

export default function Polynomial() {

    const topic = 'Linear Regression';
    const [row, setrow] = React.useState(5);
    const [button_state, setbutton_state] = React.useState(false);
    const [matrixA, setmatrixA] = React.useState([]);
    const [matrixB, setmatrixB] = React.useState([]);
    const [datax, setdatax] = React.useState([]);
    const [datay, setdatay] = React.useState([]);
    const[ ans, setans] = React.useState([]);
    const [formular_graph, setformular_graph] = React.useState([]);
    const [dataxy, setdataxy] = React.useState([]);
    const [X,setX] = React.useState([])

    /* n xi      y
       xi xi^2   yx */

    const linear_regression = () => {
      var n = row;
      var sumx = 0;
      var sumy = 0;
      var sumxy = 0;
      var sumx2 = 0;
      console.log(matrixA)
      console.log(matrixB)
      let tempx_y = [];

        for (var i = 0; i < n; i++) {
            sumx += datax[i];
            sumx2 += datax[i] * datax[i];
            sumy += datay[i];
            sumxy += datax[i] * datay[i];
            tempx_y.push({
                x: datax[i],
                y: datay[i]
            });
      
            
        }
        setdataxy(tempx_y);
        console.log(dataxy)

        //console.log(sumx)
        //console.log(sumx2)
        //console.log(sumy)
        //console.log(sumxy)
        
        var A = [[n,sumx],[sumx,sumx2]];
        var B = [sumy,sumxy];
        //console.log(A);
        //console.log(B);
        setans(usolve(A,B));
        //console.log(ans);
        var temp = [];
        // y = mx + c
        
        for(var i = 0; i < n; i++){
          let a = ans[0];
          let b = ans[1];
          let y = evaluate(a + '*' + datax[i] + '+' + b);
        
         temp.push(y);
        }
        setformular_graph(temp);
        //console.log(formular_graph);
        

        




        
    }


        
     
    //graph
    const label = ["data","fomular"]
    const data = {
        labels: datax,
        datasets: [
            {
                label: label[0],
                data: dataxy,
                type: 'scatter',
                fill: false,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)"
            },
              {
                label: label[1],
                data: formular_graph,
                fill: false,
                backgroundColor: "rgba(255,0,0,1)",
                borderColor: "rgba(255,0,0,1)"
            }

        ],
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Mode: index, intersect = false'
          },
          tooltips: {
            mode: 'index',
          }
        }
    };
    

    const initialA = (row, column, event) => {
        let copy = [...matrixA];
        copy[row][column] = + event.target.value;
        setmatrixA(copy);
    };

    const initialB = (row, column, event) => {
        let copy = [...matrixB];
        copy[row][column] = + event.target.value;
        setmatrixB(copy);
    };

    if (button_state === true) { // set row and col
        setmatrixA(Array.from({
            length: 1
        }, () => Array.from({
            length: row
        }, () => null)));
        setmatrixB(Array.from({
            length: 1
        }, () => Array.from({
            length: row
        }, () => null)));
        setbutton_state(false);
    }

    

    return (
        <div>
            <Nav_Bar/>
            <div className='container'>
                <h1>{topic}</h1>
                <div className='container'>
                    <label className='form-label'>How many X and Y</label>
                    <input type="text" className="form-control"
                        value={row}
                        onChange={
                            e => setrow(e.target.value)
                    }></input>
                     <input type="text" className="form-control"
                        value={row}
                        onChange={
                            e => setrow(e.target.value)
                    }></input>
                    <button className="btn btn-primary"
                        onClick={
                            () => {
                                setbutton_state(true)
                            }
                    }>Submit</button>
                </div>
                <div className='container'>
                <center>
                
                    <div className='row'>
                        <div className='col'>
                          
                        <table>
                                <h1>X</h1>
                                <tbody>{
                                    matrixA.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {
                                            row.map((column, columnIndex) => (
                                                <tr key={columnIndex}>
                                                    <input type="number"
                                                        onChange={
                                                            (e) => initialA(rowIndex, columnIndex, e)
                                                        }
                                                        style={
                                                            {margin: 6}
                                                        }/>
                                                </tr>
                                            ))
                                        } </tr>
                                    ))
                                }</tbody>
                            </table>
                        </div>
                        <div className='col'>

                            <table>
                                <h1>Y</h1>
                                <tbody>{
                                    matrixB.map((row, rowIndex) => (
                                        <tr key={rowIndex}
                                            style={
                                                {padding: 10}
                                        }>
                                            {
                                            row.map((column, columnIndex) => (
                                                <tr key={columnIndex}>
                                                    <input type="number"
                                                        onChange={
                                                            (e) => initialB(rowIndex, columnIndex, e)
                                                        }
                                                        style={
                                                            {margin: 6}
                                                        }/>
                                                </tr>
                                            ))
                                        } </tr>
                                    ))
                                }</tbody>
                            </table>
                        </div> 
                    </div>
                                  
                    </center> 
                </div>
                <div className='container-1'>
                        <button className="btn btn-success"  onClick={ () => {
                            let x = [];
                            let y = [];
                            for (let i = 0; i < row; i++) {
                                x.push(matrixA[0][i]);
                                y.push(matrixB[0][i]);
                            }
                            setdatax(x);
                            setdatay(y);

                            console.log(datax);
                            console.log(datay);
                            linear_regression();
                         
                        }}>Submit</button>
                    </div>
               
            </div>
            <div className='container'>
                Ans <br/>
            </div>
            <div className='container'>a = {ans[0]}<br/>b = {ans[1]}

            </div>
            <div className='container'><Line data={data} /></div>
           
        </div>
    )
}
