
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';

import Login from './views/Login';
import Profile from './views/Profile';
import Register from './views/Register';

function App() {
  return (
    <Router>
      
        <Navbar />
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
    </Router>
  );
}

export default App;



































