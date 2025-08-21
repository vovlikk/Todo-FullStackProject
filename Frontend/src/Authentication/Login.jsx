import { useState,useEffect } from "react";
import '../Authentication/AuthenticationCss/Login.css'
import jwtDecode from "jwt-decode";

function WelcomePageLogin({onClose}){
    const[userName,setUserName] = useState('');
    const[Password,setPassword] = useState('');
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(null);

    async function Login(e) {
        e.preventDefault();
        setUserName('');
        setPassword('');
        setError(null);
        setLoading(true);
        const info = {username:userName,password:Password}
        try{
            const response = await fetch('',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(info)
            });

            if(!response.ok){
                const text = await response.text();
                throw new Error("Fail to login"+ text )
            }

            const data = await response.json();
            localStorage.setItem('token',data.token)


            const dekode = jwtDecode(data.token);
            const roles = de

        }

        catch(err){
            setError("Fail to login" + err.message)
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className="Welcome-Page-Login-Overlay" onClick={onClose}>
            <div className="Welcome-Page-Section" onClick={(e) => e.stopPropagation()}>
            <form className="welcome-page-form" onSubmit={Login}>
                <input type="text" placeholder="Enter your UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="password" placeholder="Enter your Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {loading && <div>Loading...</div>}
                {error && <div style={{color:"red"}}>Error {error}</div>}
            </form>
            </div>
        </div>
    )

}

export default WelcomePageLogin;