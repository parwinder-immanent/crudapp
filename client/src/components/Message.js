import React from 'react'
import { useEffect, useState } from 'react';
import {format} from "timeago.js"

const Message = ({ chat, currentUser}) => {
 
  const [userData, setUserData]= useState(null);
  const [messages,setMessages]=useState([])
  

  useEffect(() => {
    const userId = chat?.members?.find((m) => m !== currentUser);
    console.log(userId,"fdgfg")
    const getUser = async () => {
      try {

        const conver = await fetch(`/getuser/${userId}`,{
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },

      }); 
      const user = await conver.json();
        console.log(user)
        setUserData(user);
      } catch (err) {
        console.log(err);
      }
    };
    if(chat!==null)getUser();
      
  }, [chat,currentUser]);

  useEffect(()=>{
    const fetchMessages = async ()=>{
      console.log(chat,"iiiiiiiiiiiiiii")
       try{
        
        const conver = await fetch(`/getchat/${chat._id}`,{
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
        }); 
        const user = await conver.json();
        
          console.log(user[0].conversationId,"ppppppppppppppppp")
          setMessages(user);
          console.log(user,"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
        } catch (err) {
          console.log(err);
        }
      };
      if(chat!==null) fetchMessages();
      
  }, [chat]);  
       
    
  return (
      <>
    <div className='chatMenuInput'>
      <span style={{ backgroundColor:"#ed1c40",color:"white"}}>{userData?.name}</span>
    </div>
    <div classname="messageText">
        {messages.map(( message, index ) => {
          return(
          <>
          <div className={message.sender === currentUser ? "messageSend own" : "messageText"
          } key={index}>  
           <span>{message.text}</span>
           <div className="messageBottom">{format(message.createdAt)}</div>
    
          </div>
          </>
          )
        })}
    </div>
    </>
  )
}

export default Message
  