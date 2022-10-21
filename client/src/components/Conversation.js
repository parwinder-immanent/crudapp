import { useEffect, useState } from "react";


export default function Conversation({ data, currentUserId }) {
    // let result = localStorage.getItem(('token-info'))
    // if (result !== null) {
    //     result = JSON.parse(result)
    //     console.log(result?.email);
    // }
    const [userData, setUserData] = useState(null);
    

  useEffect(() => {
    const userId = data.members.find((m) => m !== currentUserId);
    console.log(userId)
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
    getUser();
      
  }, []);

  return (
    <div className="conversation">
     <span className="onlineUsers">{userData?.name}</span>
    </div>
  );
}
