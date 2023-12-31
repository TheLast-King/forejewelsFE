import React from 'react';
import { useState } from 'react';


import './App.css';
import Inventory from './components/inventory/EditList';
import AddInventory from './components/inventory/Add';
import LocationIP from './components/location/location';


  function App() {
    const [hoveredIndex, setHoveredIndex] = useState(null);


    const [passcode, setPasscode] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleInputChange = (event) => {
        setPasscode(event.target.value);
    };

    const handleLogin = () => {
      console.log("handlelogin")
      console.log(import.meta.env.VITE_CODE);

        if (passcode === import.meta.env.VITE_CODE) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setPasscode('');
        }
    };

    const handleMouseEnter = (index) => {
      setHoveredIndex(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredIndex(null);
    };



  



    return (
      <div>
    
      {!isAuthenticated ? (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Inventory App</h1>
          <div className="mt-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={handleInputChange}
                placeholder="Enter passcode"
                className="border border-gray-300 px-4 py-2"
              />
              <button onClick={handleLogin} className="bg-blue-500 text-white font-bold py-2 px-4 ml-2 rounded">
                Login
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Inventory />
          <AddInventory />
          {/* <LocationIP /> */}
        </div>
      )}
        
        <hr/>

     
      </div>
    );
  }

  export default App;