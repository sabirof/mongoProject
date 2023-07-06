import React from 'react';
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



































// import { useEffect, useState } from 'react';
// import React from 'react';

// import './App.css';
// import Register from './views/Register';
// import Login from './views/Login'
// import Profile from './views/Profile';
// import Navbar from '../components/Navbar';
// import Homepage from '../components/Homepage'

// function App() {
//   const [count, setCount] = useState(0);

//   const getRestaurants = async () => {
//     try {
//       const response = await fetch("http://localhost:5173/api/restaurants/all");
//       const data = await response.json();
//       console.log('data', data);
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//     }
//   };

//   useEffect(() => {
//     getRestaurants();
//   }, []);

//   return (
//     <div>
//      <h1>Görüschäck</h1>
//      <hr />
//      <Register/>
//      <hr />
//      <Login/>
//      <hr />
//      <Profile/>
//     </div>

//   );
// }

// export default App;
