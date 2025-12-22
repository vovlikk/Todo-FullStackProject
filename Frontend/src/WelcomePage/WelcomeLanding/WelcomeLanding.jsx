import { useState } from 'react';
import WelcomePageHeader from '../WelcomePageComponents/WelcomePageHeader';
import WelcomeHome from '../WelcomePageComponents/WelcomeHome';
import WelcomeLogin from '../../Authentication/Login';
import WelcomeRegister from '../../Authentication/Register';
import WelcomeSupportForm from '../WelcomePageComponents/WelcomeSupportForm';

function WelcomeLanding() {
  const [activePage, setActivePage] = useState('home'); // home/login/register/support

  return (
    <div>
      <WelcomePageHeader setActivePage={setActivePage} />

      {activePage === 'home' && <WelcomeHome />}
      {activePage === 'login' && <WelcomeLogin />}
      {activePage === 'register' && <WelcomeRegister />}
      {activePage === 'support' && <WelcomeSupportForm />}
    </div>
  );
}

export default WelcomeLanding;
