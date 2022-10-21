import Navbaar2 from "./Navbaar2";
import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import Message from "./Message";
import InputEmoji from "react-input-emoji";


const ChatBox = () => {
    let user = localStorage.getItem(('token-info'))
    if (user !== null) {
        user = JSON.parse(user)
        console.log(user?.id);
    }

    const [chats, setchats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage,setNewMessage]=useState([
        
    ]);

    const getdata = async (e) => {
        const res = await fetch(`/getconversation/${user.id} `, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        });
        const convos = await res.json();

        console.log(convos, "++++++++++");

        if (res.status === 500 || !convos) {

            console.log("errr");
        } else {
            setchats(convos);
            //console.log("Get Data")
        }
    }
    useEffect(() => {

        getdata();
    }, [])

console.log(currentChat,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")


    const handleSubmit = async(e) => {

        e.preventDefault();
        const message ={
            sender:  user.id,
            text: newMessage,
            conversationId: currentChat._id

        };
      
        
        const res = await fetch("/chat",{
            method:"POST",
            headers:{
                  "Content-Type":"application/json"  
                    },
                    body:JSON.stringify( message   )
                    
        });
        console.log(message,"kkkkkkkkkkkkkkkkkkkkkkkkkk")
        const data = await res.json();
        console.log(data);
        if(res.status===422 || !data){
            alert("error");
            console.log("error");
        }else{
            
            alert("data added")
            console.log(data,"dataadded")
        }
    
    }


        console.log(currentChat, "+++++++++2222222222")
        console.log(chats, "---------***************")

    return (

        <form onSubmit={(e) => handleSubmit(e)}>

            <Navbaar2 />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={user.id} />
                            </div>
                        ))}

                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div></div> 

                        <div className="chatBoxTop">
                        
                           
                            <Message chat={currentChat} currentUser={user.id} />
                        </div>

                        <div className="chatBoxBottom">
                        
                            <textarea
                                name="messageText"
                                className="chatMessageInput"
                                placeholder="write something..."
                                onChange={(e)=> setNewMessage([e.target.name] = e.target.value) }
                                value={newMessage}
                            
                            ></textarea>
                             
                            <button className="chatSubmitButton" type="submit" >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default ChatBox
