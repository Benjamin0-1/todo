import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar'; 
import CreateTask from './Pages/CreateTask';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <NavBar /> {/* Navbar should be inside Router to access routing */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/create-task" element={<CreateTask />} />
        </Routes>

    </Router>
  );
}

export default App;
