import React, { useEffect, useState } from "react";
import query from "query-string";
import io from "socket.io-client";
import { GoGlobe } from "react-icons/go";
import {FaUsers} from 'react-icons/fa'

let socket;
const link = 'http://localhost:3001';

function Global({ location }) {
  const [name, setname] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [globalActiveUsers, setActiveUsers] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    socket = io(link);
    const search = query.parse(location.search);
    setname(search.name);

    socket.emit("globaljoin", { user: search.name });
    socket.on("ActiveUsers", (data) => {
      setActiveUsers(data);
    });
    setloading(false);
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (data) => {
      setmessages([...messages, data]);
  const element = document.getElementById('messages')

    element.scrollTop = element.scrollHeight;
    });
  });
  const sendMessage = (e) => {
    e.preventDefault();
    if(message.trim()){
      const item = { user: name, msg: message };
      socket.emit("sendMessage", item);
      setmessage("");
      socket.on("ActiveUsers", (data) => {
      setActiveUsers(data);
    });
    }
    if(message.trim() === '/online'){
      const list = globalActiveUsers.map(item => item.user)
      var sendlist = ''
      for(var i = 0;i < list.length;i++){
        sendlist += `${i+1}.`+ list[i] + ', '
      }
      sendlist = sendlist.substring(0,sendlist.length-2)

      const item = { user: 'admin', msg: sendlist };
      socket.emit("sendMessage", item);
    }
  };
  const typing = (e) => {
    setmessage(e.target.value);
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="chatbody">
      <div className="bg"></div>
        <div className="head">
          <h2>
            <span>
              <GoGlobe />
            </span>
            Global-Chat
          </h2>
        </div>
      <div className="mainchatbody">

        <div className="left">
          <div className="title">
              <em>Your Username:</em>
              <p>{name}</p>
          </div>
          <div className="online">
            <p><span><FaUsers /></span>Online Users:</p>
            <ul>
              {globalActiveUsers.map((item) => {
                return <li key={item.id}>{item.user}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="messages" id="messages" >

            {messages.map((item, index) => {
               if(item.user !== 'admin') {
                return (
                    <div className="message" key={index}>
                      <p className="username">{item.user}</p>
                      <p className="usermessage">{item.msg}</p>
                    </div>
                  );
               }
               else{
                return (
                    <div className="adminMessage" key={index}>
                      <p className="adminusername">{item.user}</p>
                      <p className="adminusermessage">{item.msg}</p>
                    </div>
                  );
               }
              
            })}
          </div>
          <div className="send">
            <form onSubmit={sendMessage}>
              <input type="text" value={message} onChange={typing} placeholder="Type a message..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Global;
