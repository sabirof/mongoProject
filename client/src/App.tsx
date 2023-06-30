import { useEffect, useState } from 'react';
import React from 'react';

import './App.css';
import Register from './views/Register';
import Login from './views/Login'

function App() {
  const [count, setCount] = useState(0);

  const getRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:5173/api/restaurants/all");
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div>
     <h1>Görüschäck</h1>
     <hr />
     <Register/>
     <hr />
     <Login/>
    </div>
  );
}

export default App;
