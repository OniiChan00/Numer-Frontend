import React from 'react'
import Nav_Bar from '../Nav_Bar'
import { useState,useEffect } from 'react'
import './Style/FalsePosition.css';
import axios from 'axios';
import { Table } from 'antd';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function FalsePosition() {
    const topic = "FalsePosition Method"
    const [equation, setEquation] = useState("");
    const [btnstate, setbtnstate] = useState(false);
    const [xl, setXl] = useState();
    const [xr, setXr] = useState();
    const [ans, setans] = useState([]);
    const[dataxm,setDataxm] = useState([]);
    const[dataerror,seterror] = useState([]);

   

    const fetchdata = async () => axios.get('http://localhost:2000/falseposition')
        .then(res => {
            console.log(res.data);
            setEquation(res.data.equation)
            setXl(res.data.xl)
            setXr(res.data.xr)
            console.log(res.data.equation)
        }
        )
        .catch(err => {
            console.log(err);
        })

        useEffect(() => {
            if(localStorage.token == undefined){
                alert("Please Login")
            }
            else{
                fetchdata();
            }
        },[])
    

    const columns = [
        { title: 'Iteration', dataIndex: 'iteration', key: 'iteration' },
        { title: 'xl', dataIndex: 'xl', key: 'xl' },
        { title: 'xm', dataIndex: 'xm', key: 'xm' },
        { title: 'xr', dataIndex: 'xr', key: 'xr' },
        { title: 'Error', dataIndex: 'Error', key: 'Error' },
    ];

     const label = ['XM','Error']
        const data = {
            labels: dataxm,
            datasets: [
                {
                    label: label[0],
                    data: dataxm,
                    fill: false,
                    backgroundColor: "rgba(75,192,192,1)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: label[1],
                    data: dataerror,
                    fill: false,
                    backgroundColor: "rgba(255,99,132,1)",
                    borderColor: "rgba(255,99,132,1)"
                }
            ]
        };

    


    const falseposition = () => {
        axios.post('http://localhost:5000/api/FalsePositionAPI',{
        xl:parseFloat(xl),
        xr:parseFloat(xr),
        equation:equation,
    })
    .then(res => {
        setans(res.data.temp_Ans)
        setbtnstate(true);
        console.log(ans);
    })
    .catch(err => {
        console.log(err);
    })
    }


    if(btnstate === true){
        let data_error = [];
        for(let i=0;i<ans.length;i++){
            data_error.push(ans[i].Error);
        }
         seterror(data_error)
        
        
        
        let data_xm = [];    
        for(let i=0;i<ans.length;i++){
            data_xm.push(ans[i].xm);
            }
        setDataxm(data_xm)
        console.log(data_error);
        console.log(data_xm);
        setbtnstate(false);
    }



  return (
    <div><Nav_Bar/>
     <div className="container">
            <h1>{topic}</h1>
                <div className='container'>
                <label className='form-label'>Equation</label>
                <input type="text" className="form-control" value={equation} onChange={e => setEquation(e.target.value)}></input>
                <label className='form-label'>xl</label>
                <input type="text" className="form-control" value={xl} onChange={e => setXl(e.target.value)}></input>
                <label className='form-label'>xr</label>
                <input type="text" className="form-control" value={xr} onChange={e => setXr(e.target.value)}></input>
                <button className="btn btn-primary" onClick={falseposition}>Submit</button>
                </div>
        </div>
        <div className='container'>
            <Table columns={columns} dataSource={ans} rowKey="iteration"/>
        </div>
        <div className='container'><Line data={data} /></div>
    </div>
  )
}
