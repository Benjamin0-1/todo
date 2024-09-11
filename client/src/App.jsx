import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar'; 
import CreateTask from './Pages/CreateTask';
import Home from './Pages/Home';
import Landing from './Pages/Landing';

function App() {
  return (
    <Router>
      <NavBar /> 
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Landing />} />
        </Routes>

    </Router>
  );
}

export default App;
