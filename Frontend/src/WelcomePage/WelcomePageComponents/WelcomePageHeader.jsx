import { useState } from 'react';
import WelcomeLogin from '../../Authentication/Login';
import WelcomeRegister from '../../Authentication/Register';
import WelcomeSupportForm from './WelcomeSupportForm';
import '../WelcomePageComponentsCss/WelcomePageHeader.css'

function WelcomePageHeader({onClose}){
    const[activeModal,setActiveModal] = useState(null);
    
    return(
        <div onClick={onClose}>
            <header className='Welcomepage-header'>
                <div className='Welcome-header-section'>
                <div className='Welcomepage-header-logo'>
                <h3>Your To do list</h3>
                </div>

                <div className='Welcomepage-header-button'>
                <button onClick={() => setActiveModal("login")}>Login</button>
                <button onClick={() => setActiveModal("register")}>Register</button>
                <button onClick={() => setActiveModal("support")}>Support Form</button>
                </div>
                </div>
    
            </header>
           
      {activeModal  == "login"&& (
        <WelcomeLogin onClose={() => setActiveModal(false)} />
      )}

      
      {activeModal == "register" && (
        <WelcomeRegister onClose={() => setActiveModal(false)} />
      )}
      {activeModal == "support"&& (
        <WelcomeSupportForm onClose={()=>setActiveModal(false)} />
      )}
        </div>
    )
}

export default WelcomePageHeader;