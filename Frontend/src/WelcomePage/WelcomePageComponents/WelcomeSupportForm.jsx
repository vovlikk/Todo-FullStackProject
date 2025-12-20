import { useState } from "react";
import '../WelcomePageComponentsCss/WelcomeSupportForm.css'
import api from '../../Connect/Connect'

function WelcomeSupportForm({onClose}){
    const[supportSms,setSupportSms] = useState('');
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(null);

    async function SendSupport(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const info = {Title:supportSms};
        
        try{
            
            const response = await fetch(`${api}/api/Support/SendSupportSms`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    
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
        <div className="Welcome-Support-Container" onClick={onClose}>
            <form className="Welcome-Support-Form"  onSubmit={SendSupport} onClick={(e) => e.stopPropagation()}>
                <h2>Support Form</h2>
                <input 
                type="text" 
                value={supportSms} 
                placeholder="Enter your Text" 
                onChange={(e) => setSupportSms(e.target.value)} 
                maxLength={500} 
                />
                <p>{supportSms.length} / 500</p>
                <button type="submit">{loading ? "Sending" : "Send"}</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    )
}

export default WelcomeSupportForm;