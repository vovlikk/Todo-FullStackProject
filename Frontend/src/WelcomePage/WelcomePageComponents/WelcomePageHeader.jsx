import '../WelcomePageComponentsCss/WelcomePageHeader.css';

function WelcomePageHeader({ setActivePage }) {
  return (
    <header className="Welcomepage-header">
      <div className="Welcome-header-section">
        <div className="Welcomepage-header-logo">
          <h3>Your To do list</h3>
        </div>

        <div className="Welcomepage-header-button">
          <button onClick={() => setActivePage('home')}>Home</button>
          <button onClick={() => setActivePage('login')}>Login</button>
          <button onClick={() => setActivePage('register')}>Register</button>
          <button onClick={() => setActivePage('support')}>Support</button>
        </div>
      </div>
    </header>
  );
}

export default WelcomePageHeader;
