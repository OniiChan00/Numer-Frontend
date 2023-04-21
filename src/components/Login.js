import axios from 'axios'
import React, { useState } from 'react'
import Nav_Bar from './Nav_Bar'

export default function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    function send(){
       axios.post("http://localhost:2000/createToken",{
              username: user,
              password: password
            }).then(res => {
                localStorage.setItem('token', res.data)
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
    }

  return (
    <div>    
        <Nav_Bar/>
        <div className='container'>
    <lael>username</lael>
    <input type="text" className="form-control"  onChange={e => setUser(e.target.value)}></input>
    <lael>password</lael>
    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}></input>
    <button type="button" onClick={() => send()} className='btn btn-primary'>Submit</button>
    </div>
    </div>

  )
}
