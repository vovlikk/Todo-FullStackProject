import '../../User/UserDashBoardComponentsCss/UserDashBoardHeader.css'
import { useState,useEffect } from 'react';
import search from '../../User/UserDashBoardImg/Search.png'
import calendar from '../../User/UserDashBoardImg/calendar.png'
import notification from '../../User/UserDashBoardImg/notification.png'

function UserDashBoardHeader(){
    const[text,setText] = useState('');
    const[time,setTime] = useState(new Date())
    const[erorr,setError] = useState(null);

    useEffect(() =>{
        const timer = setInterval(()=>{
         setTime(new Date());   
        },1000)

        return () => clearInterval(timer);
    },[])

    async function FoundTask(e) {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`api/ff/${text}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            })
            
            if(!response.ok){
                const text = await response.text();
                throw new Error(text.message || response.status);
            }            
        }
        catch(err){
            setError(err.message);
        }
    }
    
    return(
        <div className='user-dashboard-header-container'>
            <div className='user-dashboard-header-sections'>
                <div className='user-dashboard-header-logo'>
                <h3>Dash</h3>
                <h2>board</h2>
                </div>

                <div className='user-dashboard-header-input'>
                <form onSubmit={FoundTask} className='user-dashboard-header-form'>
                    <div className="input-user-header">
                        <input
                            type="text"
                            value={text}
                            placeholder='Enter your task here...'
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button type="submit">
                            <img src={search} alt="search" />
                        </button>
                    </div>
                </form>
                </div>

                <div className='user-dashboard-header-info'>

                <div className='user-dashboard-header-info-button'>
                <button>
                    <img src={calendar} alt="" />
                </button>
                <button>
                    <img src={notification} alt="" />
                </button>
                </div>

                <div className='user-dashboard-header-info-dato'>
                <div>
                   {time.toLocaleDateString()}
                </div>
                <div className='user-dashboard-header-info-time-time'>
                    {time.toLocaleTimeString()}
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashBoardHeader;