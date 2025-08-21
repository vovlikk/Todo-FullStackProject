import { useState } from "react";

function WelcomeSupportForm(){
    const[supportSms,setSupportSms] = useState('');
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(null);

    async function SendSupport(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const info = {support:supportSms};
        
        try{
            const token = localStorage.getItem('token');
            const response = await fetch('',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(info)
            })

            if(!response.ok){
                const text = await response.text();
                throw new Error(text || response.statusText || response.status);
            }

            alert("Sms was succesfull sended");
            setSupportSms('');
        }
        catch(err){
            setError("Fail" + err.message)
        }

        finally{
            setLoading(false)
        }
        
    }
    return(
        <div className="Welcome-Support-Container">
            <form onSubmit={SendSupport}>
                <input type="text" value={supportSms} placeholder="Enter your Text" onChange={(e) => setSupportSms(e.target.value)} maxLength={500}  />
                <p>{supportSms.length} / 500</p>
                <button type="submit">{loading ? "Sending":"Send"}</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default WelcomeSupportForm;