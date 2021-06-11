import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {GoGlobe} from 'react-icons/go'
function Home() {
    var [name, setname] = useState('')
    const history = useHistory()
    
    const submit=(e)=>{
        e.preventDefault()
        
        for(var i=0;i<3;i++){
            setname(name += Math.floor(Math.random()*10))
        }
        history.push(`/global/?name=${name}`)
    }
    return (
        <div className="mainbody">
            <div className="global">
                
                <h2><span><GoGlobe /></span>Global-Chat</h2>
                <p>Dear User,Welcome to <code>GLOBAL-CHAT</code>.<br />Join the chat by entering your name and start Exploring </p>
                <div className="items">
                    <form onSubmit={submit}>
                        <p>Username</p>
                <input type="text" value={name} placeholder="Enter username..." onChange={(e)=>{setname(e.target.value.trim())}} required />
                <button  type='submit'>Join Chat</button>
                    </form>
                </div>
            </div>
            
            </div>
    )
}

export default Home
