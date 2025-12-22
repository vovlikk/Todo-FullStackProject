import WelcomeLanding from './WelcomePage/WelcomeLanding/WelcomeLanding';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashBoard from './DashBoards/UserDashBoard/UserDashBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeLanding />} />
        <Route path="/user" element={<UserDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
