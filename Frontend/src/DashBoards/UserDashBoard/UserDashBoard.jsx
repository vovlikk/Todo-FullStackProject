import { useState,useEffect } from "react";

function UserDashBoard(){
    const[user,setUser] = useState([]);
    
    useEffect(()=>{
        const fetchuser = async () =>{
            try{
                const token = localStorage.getItem('token');
                const response = await fetch('',{
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                });
                if(!response.ok){
                   throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUser(data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchuser();
    },[])

    return(
        <div>
            <h3>fff</h3>
        </div>
    )
}

export default UserDashBoard;